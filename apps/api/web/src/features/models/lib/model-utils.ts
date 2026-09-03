/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { type TFunction } from 'i18next'

import { formatTimestampToDate } from '@/lib/format'

import { getNameRuleConfig, getQuotaTypeConfig } from '../constants'
import type { NameRule, Model } from '../types'

// ============================================================================
// Time Formatting
// ============================================================================

/**
 * Format timestamp to standard date string (YYYY-MM-DD HH:mm:ss)
 */
export function formatTimestamp(timestamp: number): string {
  if (!timestamp || timestamp === 0) return '-'
  return formatTimestampToDate(timestamp)
}

/**
 * Format relative time
 */
export function formatRelativeTime(timestamp: number): string {
  if (!timestamp || timestamp === 0) return 'Never'

  const now = Date.now()
  const time = timestamp * 1000
  const diff = now - time

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
}

// ============================================================================
// Tags Parsing
// ============================================================================

/**
 * Parse tags string to array
 */
export function parseModelTags(tags: string | undefined): string[] {
  if (!tags) return []
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

/**
 * Format tags array to string
 */
export function formatTagsString(tags: string[]): string {
  return tags.join(',')
}

// ============================================================================
// Catalog Control Tags — context window (bsCtx{n} thousands of tokens)
// ============================================================================

const BS_CTX_NUMERIC = /^bsctx(\d+)$/i
/** Legacy enum-style tokens: bsCtx128k, bsCtx1m, … */
const BS_CTX_LEGACY_UNIT = /^bsctx(\d+(?:\.\d+)?)(k|m)$/i

export function writeBsContextTag(contextK: number): string {
  return `bsCtx${Math.floor(contextK)}`
}

export function formatContextKLabel(contextK: number): string {
  const n = Math.floor(contextK)
  if (n <= 0) return ''
  if (n >= 1000 && n % 1000 === 0) return `${n / 1000}M`
  return `${n}K`
}

export function isBsContextTag(tag: string): boolean {
  return BS_CTX_NUMERIC.test(tag.trim())
}

export function isLegacyBsContextTag(tag: string): boolean {
  return BS_CTX_LEGACY_UNIT.test(tag.trim())
}

/** Legacy freeform size tags still dual-read (`128K`, `1M`). */
export function parseLegacyContextK(token: string): number | null {
  const normalized = token.trim().toUpperCase().replace(/\s+/g, '')
  const match = normalized.match(/^(\d+(?:\.\d+)?)(K|M)$/)
  if (!match) return null
  const value = Number(match[1])
  if (Number.isNaN(value)) return null
  return match[2] === 'M' ? value * 1000 : value
}

export function isLegacyContextToken(tag: string): boolean {
  return parseLegacyContextK(tag) !== null
}

export function isContextControlOrLegacyTag(tag: string): boolean {
  return (
    isBsContextTag(tag) ||
    isLegacyBsContextTag(tag) ||
    isLegacyContextToken(tag)
  )
}

export function contextKFromSingleTag(tag: string): number | null {
  const trimmed = tag.trim()
  const numeric = trimmed.match(BS_CTX_NUMERIC)
  if (numeric) {
    const n = Number(numeric[1])
    return Number.isFinite(n) && n > 0 ? n : null
  }
  const legacy = trimmed.match(BS_CTX_LEGACY_UNIT)
  if (legacy) {
    const value = Number(legacy[1])
    if (!Number.isFinite(value) || value <= 0) return null
    return legacy[2].toLowerCase() === 'm' ? value * 1000 : value
  }
  return parseLegacyContextK(trimmed)
}

/** Max context window in thousands of tokens (`bsCtx{n}` preferred). */
export function extractContextKFromTags(tags: string[]): number | null {
  let best = 0
  for (const tag of tags) {
    const k = contextKFromSingleTag(tag)
    if (k !== null && k > best) best = k
  }
  return best > 0 ? best : null
}

/** Strip context control + legacy size tags, then optionally set one `bsCtx{n}`. */
export function applyContextKToTags(
  tags: string[],
  contextK: number | null
): string[] {
  const without = tags.filter((t) => !isContextControlOrLegacyTag(t))
  if (contextK === null || !(contextK > 0)) return without
  return [...without, writeBsContextTag(contextK)]
}

/** @deprecated Use extractContextKFromTags. */
export function extractContextKeyFromTags(tags: string[]): string | null {
  const k = extractContextKFromTags(tags)
  return k === null ? null : writeBsContextTag(k)
}

/** @deprecated Use applyContextKToTags. */
export function applyContextKeyToTags(
  tags: string[],
  contextKey: string | null
): string[] {
  if (!contextKey) return applyContextKToTags(tags, null)
  const k = contextKFromSingleTag(contextKey)
  return applyContextKToTags(tags, k)
}

// ============================================================================
// Catalog Control Tags — modality (bsText / bsImage / …)
// ============================================================================

/**
 * Generation modality control tokens (same contract as customer Web).
 * Prefer media over text when several are present.
 */
export const BS_MODALITY_OPTIONS = [
  { key: 'bsText', labelKey: 'Text' },
  { key: 'bsImage', labelKey: 'Image' },
  { key: 'bsVideo', labelKey: 'Video' },
  { key: 'bsAudio', labelKey: 'Audio' },
] as const

export type BsModalityTagKey = (typeof BS_MODALITY_OPTIONS)[number]['key']

const BS_MODALITY_KEY_SET = new Set<string>(
  BS_MODALITY_OPTIONS.map((o) => o.key.toLowerCase())
)

/** Media modalities win over text when multiple bs* modality tags exist. */
const BS_MODALITY_PRIORITY: BsModalityTagKey[] = [
  'bsImage',
  'bsVideo',
  'bsAudio',
  'bsText',
]

export function isBsModalityTag(tag: string): boolean {
  return BS_MODALITY_KEY_SET.has(tag.trim().toLowerCase())
}

export function extractModalityKeyFromTags(
  tags: string[]
): BsModalityTagKey | null {
  const keys = new Set(tags.map((t) => t.trim().toLowerCase()))
  for (const key of BS_MODALITY_PRIORITY) {
    if (keys.has(key.toLowerCase())) return key
  }
  return null
}

/** Strip modality control tags, then optionally set one `bs*` modality token. */
export function applyModalityKeyToTags(
  tags: string[],
  modalityKey: BsModalityTagKey | null
): string[] {
  const without = tags.filter((t) => !isBsModalityTag(t))
  if (!modalityKey) return without
  return [...without, modalityKey]
}

/**
 * Normalize catalog control tags on save: rewrite legacy context sizes to
 * canonical `bsCtx*`, keep a single modality + context token, rewrite
 * multimodal markers to `bsCapMultimodal`, and drop freeform / retired tags.
 */
export function normalizeCatalogControlTags(tags: string[]): string[] {
  const contextK = extractContextKFromTags(tags)
  const modalityKey = extractModalityKeyFromTags(tags)
  const multimodal = extractMultimodalFromTags(tags)
  let next = applyContextKToTags(tags, contextK)
  next = applyModalityKeyToTags(next, modalityKey)
  next = applyMultimodalToTags(next, multimodal)
  // Closed vocabulary: only control tokens survive.
  return next.filter(
    (t) =>
      isBsModalityTag(t) || isBsContextTag(t) || isBsCapabilityTag(t)
  )
}

// ============================================================================
// Catalog Control Tags — multimodal (bsCapMultimodal)
// ============================================================================

export const BS_CAP_MULTIMODAL = 'bsCapMultimodal' as const

export type BsCapabilityTagKey = typeof BS_CAP_MULTIMODAL

/** @deprecated Prefer Multimodal checkbox; kept for call-site compatibility. */
export const BS_CAPABILITY_OPTIONS = [
  {
    key: BS_CAP_MULTIMODAL,
    capability: 'multimodal',
    legacy: 'Multimodal',
    labelKey: 'Multimodal',
  },
] as const

const BS_CAPABILITY_KEY_SET = new Set<string>([BS_CAP_MULTIMODAL.toLowerCase()])

const MULTIMODAL_LEGACY = new Set([
  'bscapvision',
  'bscapaudio',
  'vision',
  'audio',
  'multimodal',
  '多模态',
  '多模態',
])

const RETIRED_CAPABILITY = new Set([
  'bscapreasoning',
  'bscaptools',
  'bscapfiles',
  'bscapopenweights',
  'bscapvision',
  'bscapaudio',
  'reasoning',
  'tools',
  'files',
  'open weights',
  'vision',
  'audio',
  'multimodal',
  '多模态',
  '多模態',
])

export function isBsCapabilityTag(tag: string): boolean {
  return BS_CAPABILITY_KEY_SET.has(tag.trim().toLowerCase())
}

export function isLegacyCapabilityTag(tag: string): boolean {
  return RETIRED_CAPABILITY.has(tag.trim().toLowerCase())
}

export function isCapabilityControlOrLegacyTag(tag: string): boolean {
  return isBsCapabilityTag(tag) || isLegacyCapabilityTag(tag)
}

export function extractMultimodalFromTags(tags: string[]): boolean {
  for (const tag of tags) {
    const lower = tag.trim().toLowerCase()
    if (BS_CAPABILITY_KEY_SET.has(lower) || MULTIMODAL_LEGACY.has(lower)) {
      return true
    }
  }
  return false
}

/** @deprecated Use extractMultimodalFromTags. */
export function extractCapabilityKeysFromTags(
  tags: string[]
): BsCapabilityTagKey[] {
  return extractMultimodalFromTags(tags) ? [BS_CAP_MULTIMODAL] : []
}

export function applyMultimodalToTags(
  tags: string[],
  multimodal: boolean
): string[] {
  const without = tags.filter((t) => !isCapabilityControlOrLegacyTag(t))
  return multimodal ? [...without, BS_CAP_MULTIMODAL] : without
}

/** @deprecated Use applyMultimodalToTags. */
export function applyCapabilityKeysToTags(
  tags: string[],
  capabilityKeys: readonly BsCapabilityTagKey[]
): string[] {
  return applyMultimodalToTags(tags, capabilityKeys.includes(BS_CAP_MULTIMODAL))
}

/** Any catalog control token or dual-read legacy size/capability word. */
export function isCatalogControlOrLegacyTag(tag: string): boolean {
  return (
    isBsModalityTag(tag) ||
    isContextControlOrLegacyTag(tag) ||
    isCapabilityControlOrLegacyTag(tag)
  )
}

/** Human-readable badges for Admin Models list (control tokens only). */
export function formatCatalogTagsForDisplay(tags: string[]): string[] {
  const normalized = normalizeCatalogControlTags(tags)
  const labels: string[] = []
  const modality = extractModalityKeyFromTags(normalized)
  if (modality) {
    const opt = BS_MODALITY_OPTIONS.find((o) => o.key === modality)
    labels.push(opt?.labelKey ?? modality)
  }
  const contextK = extractContextKFromTags(normalized)
  if (contextK !== null) {
    labels.push(formatContextKLabel(contextK))
  }
  if (extractMultimodalFromTags(normalized)) {
    labels.push('Multimodal')
  }
  return labels
}

// ============================================================================
// Endpoints Parsing
// ============================================================================

/**
 * Parse endpoints JSON string
 */
export function parseEndpoints(
  endpoints: string | undefined
): Record<string, unknown> | unknown[] | null {
  if (!endpoints || endpoints.trim() === '') return null

  try {
    return JSON.parse(endpoints)
  } catch {
    return null
  }
}

/**
 * Format endpoints to display
 */
export function formatEndpointsDisplay(
  endpoints: string | undefined
): string[] {
  const parsed = parseEndpoints(endpoints)
  if (!parsed) return []

  if (typeof parsed === 'object' && !Array.isArray(parsed)) {
    return Object.keys(parsed)
  }

  if (Array.isArray(parsed)) {
    return parsed.map(String)
  }

  return []
}

// ============================================================================
// Name Rule Utils
// ============================================================================

/**
 * Get name rule label
 */
export function getNameRuleLabelByRule(rule: NameRule, t: TFunction): string {
  const config = getNameRuleConfig(t)
  return config[rule]?.label || '-'
}

/**
 * Get name rule config by rule
 */
export function getNameRuleConfigByRule(rule: NameRule, t: TFunction) {
  const config = getNameRuleConfig(t)
  return config[rule] || config[0]
}

// ============================================================================
// Quota Type Utils
// ============================================================================

/**
 * Format quota types array
 */
export function formatQuotaTypes(
  quotaTypes: number[] | undefined,
  t: TFunction
): string {
  if (!quotaTypes || quotaTypes.length === 0) return '-'
  const config = getQuotaTypeConfig(t)
  return quotaTypes.map((qt) => config[qt]?.label || String(qt)).join(', ')
}

// ============================================================================
// Model Validation
// ============================================================================

/**
 * Validate model name
 */
export function validateModelName(name: string): boolean {
  return name.trim().length > 0
}

/**
 * Validate endpoints JSON
 */
export function validateEndpointsJSON(endpoints: string): boolean {
  if (!endpoints || endpoints.trim() === '') return true

  try {
    JSON.parse(endpoints)
    return true
  } catch {
    return false
  }
}

// ============================================================================
// Model Status Utils
// ============================================================================

/**
 * Check if model is enabled
 */
export function isModelEnabled(model: Model): boolean {
  return model.status === 1
}

/**
 * Check if model syncs with official
 */
export function isModelSyncOfficial(model: Model): boolean {
  return model.sync_official === 1
}
