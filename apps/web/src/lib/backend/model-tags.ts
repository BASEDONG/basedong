/** Parse upstream New API / llm-metadata `tags` strings (e.g. "bsCapMultimodal,bsCtx127"). */

export function parseTags(tags?: string): string[] {
  if (!tags?.trim()) return [];
  return tags
    .split(/[,;|]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Admin-controlled modality tags (case-insensitive).
 *
 * Why the `bs` prefix: upstream / metadata tags often contain words like
 * `Vision`, `image`, or `video` to mean multimodal *understanding*, not that
 * the model is an image/video *generation* product. Only these explicit tokens
 * mark generation modality for catalog type / pricing sections:
 * - bsText  → text / chat (default when absent is also text)
 * - bsImage → image generation
 * - bsVideo → video generation
 * - bsAudio → audio generation
 *
 * Do not infer modality from freeform tag substrings.
 */
export const BS_MODALITY_TAG_KEYS = [
  "bstext",
  "bsimage",
  "bsvideo",
  "bsaudio",
] as const;

export type BsModalityTagKey = (typeof BS_MODALITY_TAG_KEYS)[number];

export function isBsModalityTag(tag: string): boolean {
  const key = tag.trim().toLowerCase();
  return (BS_MODALITY_TAG_KEYS as readonly string[]).includes(key);
}

/** Prefer media over text when multiple bs* tags are present. */
export function bsModalityKeyFromTags(
  tags: string[] | string | undefined,
): BsModalityTagKey | null {
  const parsed = Array.isArray(tags) ? tags : parseTags(tags);
  const keys = new Set(parsed.map((t) => t.trim().toLowerCase()));
  if (keys.has("bsimage")) return "bsimage";
  if (keys.has("bsvideo")) return "bsvideo";
  if (keys.has("bsaudio")) return "bsaudio";
  if (keys.has("bstext")) return "bstext";
  return null;
}

/**
 * Context-window control tags: `bsCtx{n}` where n is thousands of tokens
 * (e.g. bsCtx127 → 127K, bsCtx1000 → 1M). Any positive integer is valid.
 * Frontend formats the number for display; filters compare the numeric value.
 */

const BS_CTX_NUMERIC = /^bsctx(\d+)$/i
/** Legacy enum-style tokens still dual-read: bsCtx128k, bsCtx1m, … */
const BS_CTX_LEGACY_UNIT = /^bsctx(\d+(?:\.\d+)?)(k|m)$/i

/** Write canonical control token for a context window in thousands of tokens. */
export function writeBsContextTag(contextK: number): string {
  const n = Math.floor(contextK)
  return `bsCtx${n}`
}

/**
 * Format thousands-of-tokens for display (locale-agnostic symbols).
 * Exact multiples of 1000 → Nm (e.g. 1000 → 1M); otherwise → nK.
 */
export function formatContextKLabel(contextK: number): string {
  const n = Math.floor(contextK)
  if (n <= 0) return ""
  if (n >= 1000 && n % 1000 === 0) return `${n / 1000}M`
  return `${n}K`
}

export function isBsContextTag(tag: string): boolean {
  return BS_CTX_NUMERIC.test(tag.trim())
}

export function isLegacyBsContextTag(tag: string): boolean {
  return BS_CTX_LEGACY_UNIT.test(tag.trim())
}

/** Any basedong catalog control token (not shown raw as a customer chip). */
export function isBsControlTag(tag: string): boolean {
  return (
    isBsModalityTag(tag) ||
    isBsContextTag(tag) ||
    isLegacyBsContextTag(tag) ||
    isBsCapabilityTag(tag)
  )
}

/** Parse one tag → thousands of tokens, or null. */
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
    return legacy[2].toLowerCase() === "m" ? value * 1000 : value
  }
  return parseLegacyContextK(trimmed)
}

/**
 * Max context window in thousands of tokens from tags.
 * Prefers `bsCtx{n}`; dual-reads legacy `bsCtx128k` / `1M`.
 */
export function maxContextKFromTags(tags: string[]): number {
  let max = 0
  for (const tag of tags) {
    const k = contextKFromSingleTag(tag)
    if (k !== null && k > max) max = k
  }
  return max
}

/** @deprecated Use maxContextKFromTags; returns write token for the max K if any. */
export function bsContextKeyFromTags(
  tags: string[] | string | undefined,
): string | null {
  const parsed = Array.isArray(tags) ? tags : parseTags(tags)
  const k = maxContextKFromTags(parsed)
  return k > 0 ? writeBsContextTag(k) : null
}

/** Legacy freeform context token (`128K`, `1M`) → thousands of tokens. */
export function parseLegacyContextK(token: string): number | null {
  const normalized = token.trim().toUpperCase().replace(/\s+/g, "")
  const match = normalized.match(/^(\d+(?:\.\d+)?)(K|M)$/)
  if (!match) return null
  const value = Number(match[1])
  if (Number.isNaN(value)) return null
  return match[2] === "M" ? value * 1000 : value
}

/** @deprecated Prefer contextKFromSingleTag. */
export function parseContextK(token: string): number | null {
  return contextKFromSingleTag(token)
}

export function isLegacyContextToken(token: string): boolean {
  return parseLegacyContextK(token) !== null
}

export function isContextToken(token: string): boolean {
  return (
    isBsContextTag(token) ||
    isLegacyBsContextTag(token) ||
    isLegacyContextToken(token)
  )
}

/** Display label from tags (`127K`, `1M`, …), or null if unset. */
export function contextLabelFromTags(tags: string[]): string | null {
  const k = maxContextKFromTags(tags)
  if (k <= 0) return null
  return formatContextKLabel(k)
}

/**
 * Differentiating capability chips only.
 * Reasoning / tools are assumed default and are not catalog tags.
 */
export const CAPABILITY_TAG_KEYS = ["multimodal"] as const;

export type CapabilityTagKey = (typeof CAPABILITY_TAG_KEYS)[number];

export const BS_CAPABILITY_OPTIONS = [
  {
    key: "bscapmultimodal",
    write: "bsCapMultimodal",
    capability: "multimodal" as const,
  },
] as const;

export type BsCapabilityTagKey = (typeof BS_CAPABILITY_OPTIONS)[number]["write"];

const BS_CAPABILITY_KEY_SET = new Set<string>(
  BS_CAPABILITY_OPTIONS.map((o) => o.key),
);

/** Former capability tokens → multimodal (understanding) or ignored. */
const MULTIMODAL_LEGACY = new Set([
  "bscapvision",
  "bscapaudio",
  "vision",
  "audio",
  "multimodal",
  "多模态",
  "多模態",
]);

/** Retired capability control tokens (stripped on read for chips; not multimodal). */
const RETIRED_CAPABILITY = new Set([
  "bscapreasoning",
  "bscaptools",
  "bscapfiles",
  "bscapopenweights",
  "reasoning",
  "tools",
  "files",
  "open weights",
]);

export function isBsCapabilityTag(tag: string): boolean {
  return BS_CAPABILITY_KEY_SET.has(tag.trim().toLowerCase());
}

export function isRetiredCapabilityTag(tag: string): boolean {
  return RETIRED_CAPABILITY.has(tag.trim().toLowerCase());
}

/** Legacy words / retired vision-audio tokens that mean multimodal. */
export function isLegacyMultimodalTag(tag: string): boolean {
  return MULTIMODAL_LEGACY.has(tag.trim().toLowerCase());
}

export function isLegacyCapabilityTag(tag: string): boolean {
  return (
    isLegacyMultimodalTag(tag) ||
    RETIRED_CAPABILITY.has(tag.trim().toLowerCase())
  );
}

/**
 * Canonical capability keys from tags.
 * Only `multimodal` is a live catalog capability; Vision/Audio dual-read into it.
 */
export function capabilityKeysFromTags(tags: string[]): CapabilityTagKey[] {
  for (const tag of tags) {
    const lower = tag.trim().toLowerCase();
    if (BS_CAPABILITY_KEY_SET.has(lower) || MULTIMODAL_LEGACY.has(lower)) {
      return ["multimodal"];
    }
  }
  return [];
}

export function capabilityTags(parsed: string[]): string[] {
  return capabilityKeysFromTags(parsed);
}

export function extractCapabilityKeys(tagLists: string[][]): string[] {
  const found = new Set<string>();
  for (const tags of tagLists) {
    for (const key of capabilityKeysFromTags(tags)) {
      found.add(key);
    }
  }
  return CAPABILITY_TAG_KEYS.filter((k) => found.has(k));
}
