/** Shared pricing-catalog filter helpers (aligned with New API pricing sidebar). */

import {
  ENDPOINT_MODALITY_IDS,
  type EndpointModality,
} from "@/lib/backend/catalog";
import { parseTags } from "@/lib/backend/model-tags";

export function countBy<T>(items: T[], pred: (item: T) => boolean): number {
  let n = 0;
  for (const item of items) {
    if (pred(item)) n += 1;
  }
  return n;
}

/** All unique tags from models (lowercase), New API extractAllTags style. */
export function extractAllTags(tagLists: Array<string[] | string | undefined>): string[] {
  const tagSet = new Set<string>();
  for (const raw of tagLists) {
    const tags = Array.isArray(raw) ? raw : parseTags(raw);
    for (const tag of tags) {
      tagSet.add(tag.toLowerCase());
    }
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

export { ENDPOINT_MODALITY_IDS, type EndpointModality };

/** Alias: marketing endpoint filter uses modality ids. */
export const ENDPOINT_TYPE_IDS = ENDPOINT_MODALITY_IDS;

export type EndpointTypeId = EndpointModality;

/** Source-locale default labels; UI copy may override. */
export const ENDPOINT_TYPE_DEFAULT_LABELS: Record<EndpointTypeId, string> = {
  文本: "文本",
  图像: "图像",
  视频: "视频",
  语音: "语音",
};

export type FilterChipOption = {
  value: string;
  label: string;
  count: number;
};

export function vendorFilterOptions(
  models: Array<{ vendor: string }>,
  allLabel: string,
): FilterChipOption[] {
  const names = [
    ...new Set(
      models
        .map((m) => m.vendor.trim())
        .filter((v) => v.length > 0 && v !== "Backend"),
    ),
  ].sort((a, b) => a.localeCompare(b));

  return [
    { value: "", label: allLabel, count: models.length },
    ...names.map((name) => ({
      value: name,
      label: name,
      count: countBy(models, (m) => m.vendor === name),
    })),
  ];
}

export function tagFilterOptions(
  models: Array<{ tags: string[] }>,
  allLabel: string,
): FilterChipOption[] {
  const tags = extractAllTags(models.map((m) => m.tags));
  return [
    { value: "", label: allLabel, count: models.length },
    ...tags.map((tag) => ({
      value: tag,
      label: tag,
      count: countBy(models, (m) =>
        m.tags.some((t) => t.toLowerCase() === tag),
      ),
    })),
  ];
}

export type BillingFilterValue = "token" | "request";

export function billingFilterOptions(
  models: Array<{ quotaType: number | undefined }>,
  labels: { all: string; token: string; request: string },
): FilterChipOption[] {
  const tokenCount = countBy(models, (m) => m.quotaType === 0);
  const requestCount = countBy(models, (m) => m.quotaType === 1);
  const options: FilterChipOption[] = [
    { value: "", label: labels.all, count: models.length },
  ];
  if (tokenCount > 0) {
    options.push({ value: "token", label: labels.token, count: tokenCount });
  }
  if (requestCount > 0) {
    options.push({
      value: "request",
      label: labels.request,
      count: requestCount,
    });
  }
  return options;
}

export function endpointFilterOptions(
  models: Array<{ endpoints: string[] }>,
  allLabel: string,
  labelFor: (id: string) => string,
): FilterChipOption[] {
  const present = new Map<string, number>();
  for (const id of ENDPOINT_MODALITY_IDS) {
    const n = countBy(models, (m) => m.endpoints.includes(id));
    if (n > 0) present.set(id, n);
  }

  return [
    { value: "", label: allLabel, count: models.length },
    ...ENDPOINT_MODALITY_IDS.filter((id) => present.has(id)).map((id) => ({
      value: id,
      label: labelFor(id),
      count: present.get(id) ?? 0,
    })),
  ];
}
