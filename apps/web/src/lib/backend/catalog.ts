import { BRAND } from "@/lib/assets";
import { APP_ROUTES } from "@/lib/routes";
import type { PricingCatalog, PricingItem } from "@/lib/backend/client";
import type {
  PricingChip,
  PricingSection,
  PricingCategoryId,
} from "@/components/marketing/pricing/content-types";
import { getPricingSectionMeta } from "@/components/marketing/pricing/pricing-ui-copy";
import type { ModelCardData } from "@/components/marketing/models/content-types";
import { contextLabelFromTags, parseTags, bsModalityKeyFromTags, capabilityKeysFromTags, maxContextKFromTags } from "@/lib/backend/model-tags";

export type CatalogTypeTag = "文本" | "图像" | "语音" | "视频";

const PRICING_SECTION_KEYS = ["文本", "图像", "语音", "视频"] as const;
type PricingSectionKey = (typeof PRICING_SECTION_KEYS)[number];

const INITIAL_VISIBLE = 5;

const BS_MODALITY_TO_TYPE: Record<
  NonNullable<ReturnType<typeof bsModalityKeyFromTags>>,
  CatalogTypeTag
> = {
  bstext: "文本",
  bsimage: "图像",
  bsvideo: "视频",
  bsaudio: "语音",
};

/** Alias: marketing endpoint filter uses the same modality keys. */
export type EndpointModality = CatalogTypeTag;

export const ENDPOINT_MODALITY_IDS = PRICING_SECTION_KEYS;

/** @deprecated Prefer using CatalogTypeTag directly; kept for call sites. */
export function typeTagToEndpointModality(
  tag: CatalogTypeTag | string,
): EndpointModality {
  switch (tag) {
    case "生图":
    case "图像":
      return "图像";
    case "视频":
      return "视频";
    case "语音":
      return "语音";
    case "文本":
    case "对话":
    case "嵌入":
    case "重排序":
    default:
      return "文本";
  }
}

export function endpointToTypeTags(endpoints?: string[]): CatalogTypeTag[] {
  if (!endpoints?.length) return ["文本"];
  const tags = new Set<CatalogTypeTag>();
  for (const ep of endpoints) {
    const lower = ep.toLowerCase();
    if (lower.includes("image") || lower.includes("图像") || lower.includes("生图"))
      tags.add("图像");
    else if (
      lower.includes("audio") ||
      lower.includes("speech") ||
      lower.includes("tts")
    )
      tags.add("语音");
    else if (lower.includes("video")) tags.add("视频");
    else tags.add("文本"); // chat / embed / rerank / …
  }
  return tags.size ? [...tags] : ["文本"];
}

/**
 * Catalog type for a pricing row.
 * Explicit admin modality tags (`bsImage`, …) win — never infer from freeform
 * tags that merely contain "image"/"video". Otherwise fall back to
 * `supported_endpoint_types` (default 文本).
 */
export function pricingItemToTypeTags(item: PricingItem): CatalogTypeTag[] {
  const modality = bsModalityKeyFromTags(item.tags);
  if (modality) return [BS_MODALITY_TO_TYPE[modality]];
  return endpointToTypeTags(item.supported_endpoint_types);
}

/** Modality keys for marketing endpoint-type filters. */
export function pricingItemEndpoints(item: PricingItem): EndpointModality[] {
  return pricingItemToTypeTags(item);
}

/**
 * Differentiating chips for plaza cards.
 * Only live capability keys (currently `multimodal`). Freeform / retired
 * tokens and raw control tags are never shown.
 */
export function featureTagsFromPricing(item: PricingItem): string[] {
  return capabilityKeysFromTags(parseTags(item.tags));
}

/** Context display label from raw pricing tags (`bsCtx*` preferred, legacy K/M fallback). */
export function contextLabelFromPricing(item: PricingItem): string | null {
  return contextLabelFromTags(parseTags(item.tags));
}

/** Context window in thousands of tokens from raw pricing tags. */
export function contextKFromPricing(item: PricingItem): number {
  return maxContextKFromTags(parseTags(item.tags));
}

export function vendorName(
  item: PricingItem,
  vendors: PricingCatalog["vendors"],
): string {
  if (item.vendor_id != null) {
    const v = vendors.find((x) => x.id === item.vendor_id);
    if (v?.name?.trim()) return v.name.trim();
  }
  if (item.owner_by?.trim()) return item.owner_by.trim();
  return "Backend";
}

/** Resolve model/vendor icon from Backend catalog.
 * Values are `@lobehub/icons` keys (e.g. `OpenAI`, `DeepSeek.Color`) or a
 * fallback asset path — render with `CatalogIcon`, not `<img src>`.
 */
export function vendorIcon(
  item: PricingItem,
  vendors: PricingCatalog["vendors"],
): string {
  if (item.icon?.trim()) return item.icon.trim();
  if (item.vendor_id != null) {
    const v = vendors.find((x) => x.id === item.vendor_id);
    if (v?.icon?.trim()) return v.icon.trim();
  }
  return BRAND.logoMark;
}

export type RetailPriceDisplay = {
  input: string;
  output: string;
  cache: string;
  /** Single-column media/fixed price */
  unit: string;
};

function formatUsd(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let digits = 2;
  if (abs > 0 && abs < 0.01) digits = 4;
  else if (abs > 0 && abs < 0.1) digits = 3;
  const s = n.toFixed(digits).replace(/\.?0+$/, "");
  return `$${s}`;
}

/** new-api USD formula: input ≈ model_ratio * 2 per 1M tokens (group ratio 1). */
export function formatRetailPrice(item: PricingItem): RetailPriceDisplay {
  const dash = "—";
  if (item.quota_type === 1) {
    const price =
      item.model_price != null && Number.isFinite(item.model_price)
        ? formatUsd(item.model_price)
        : dash;
    return { input: dash, output: price, cache: dash, unit: price };
  }

  const ratio = item.model_ratio;
  if (ratio == null || !Number.isFinite(ratio)) {
    return { input: dash, output: dash, cache: dash, unit: dash };
  }

  const inputUsd = ratio * 2;
  const completion =
    item.completion_ratio != null && Number.isFinite(item.completion_ratio)
      ? item.completion_ratio
      : 1;
  const outputUsd = inputUsd * completion;
  const cacheUsd =
    item.cache_ratio != null && Number.isFinite(item.cache_ratio)
      ? inputUsd * Number(item.cache_ratio)
      : NaN;

  const input = formatUsd(inputUsd);
  const output = formatUsd(outputUsd);
  const cache = Number.isFinite(cacheUsd) ? formatUsd(cacheUsd) : dash;
  return { input, output, cache, unit: output };
}

function slugVendor(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function vendorProviderId(vendor: string): string {
  return `pricing-vendor-${slugVendor(vendor) || "unknown"}`;
}

function primaryPricingSection(
  tags: CatalogTypeTag[],
): PricingSectionKey {
  for (const key of PRICING_SECTION_KEYS) {
    if (tags.includes(key)) return key;
  }
  return "文本";
}

function modelDetailHref(modelId: string): string {
  return `${APP_ROUTES.consoleModels}?target=${encodeURIComponent(modelId)}`;
}

export type MarketingPricingView = {
  chips: PricingChip[];
  sections: Record<PricingSectionKey, PricingSection>;
};

/** Map Backend catalog → marketing /pricing tables + vendor chips. */
export function pricingToMarketingSections(
  catalog: PricingCatalog,
  locale = "zh-CN",
): MarketingPricingView {
  const sectionMeta = getPricingSectionMeta(locale);
  const sections = Object.fromEntries(
    PRICING_SECTION_KEYS.map((key) => {
      const meta = sectionMeta[key];
      return [
        key,
        {
          title: meta.title,
          headers: meta.headers,
          priceColumns: meta.priceColumns,
          groups: [] as PricingSection["groups"],
        } satisfies PricingSection,
      ];
    }),
  ) as Record<PricingSectionKey, PricingSection>;

  type GroupAcc = {
    vendor: string;
    logo: string;
    models: PricingSection["groups"][number]["models"];
  };
  const groupsBySection = new Map<
    PricingSectionKey,
    Map<string, GroupAcc>
  >();
  for (const key of PRICING_SECTION_KEYS) {
    groupsBySection.set(key, new Map());
  }

  const chipByVendor = new Map<string, PricingChip>();

  for (const item of catalog.items) {
    const name = item.model_name?.trim();
    if (!name) continue;

    const vendor = vendorName(item, catalog.vendors);
    const logo = vendorIcon(item, catalog.vendors);
    const tags = pricingItemToTypeTags(item);
    const sectionKey = primaryPricingSection(tags);
    const prices = formatRetailPrice(item);
    const isChat = sectionKey === "文本";

    const model = {
      displayName: name,
      modelId: name,
      href: modelDetailHref(name),
      tiers: [
        {
          label: null,
          values: isChat
            ? [prices.input, prices.output, prices.cache]
            : [prices.unit],
        },
      ],
    };

    const sectionGroups = groupsBySection.get(sectionKey)!;
    let group = sectionGroups.get(vendor);
    if (!group) {
      group = { vendor, logo, models: [] };
      sectionGroups.set(vendor, group);
    }
    group.models.push(model);

    if (!chipByVendor.has(vendor)) {
      chipByVendor.set(vendor, {
        name: vendor,
        logo,
        providerId: vendorProviderId(vendor),
      });
    }
  }

  for (const key of PRICING_SECTION_KEYS) {
    const sectionGroups = groupsBySection.get(key)!;
    sections[key].groups = [...sectionGroups.values()].map((g) => ({
      providerId: vendorProviderId(g.vendor),
      vendor: g.vendor,
      logo: g.logo,
      models: g.models,
      initialVisible: INITIAL_VISIBLE,
    }));
  }

  return {
    chips: [...chipByVendor.values()],
    sections,
  };
}

export function pricingSectionHasModels(
  sections: MarketingPricingView["sections"],
  category: PricingCategoryId,
): boolean {
  const keys =
    category === "全部"
      ? [...PRICING_SECTION_KEYS]
      : PRICING_SECTION_KEYS.filter((k) => k === category);
  return keys.some((k) => sections[k].groups.some((g) => g.models.length > 0));
}

/** Map Backend catalog → marketing /models cards. */
export function pricingToMarketingModelCards(
  catalog: PricingCatalog,
  locale = "zh-CN",
): ModelCardData[] {
  const cards: ModelCardData[] = [];
  for (const item of catalog.items) {
    const name = item.model_name?.trim();
    if (!name) continue;
    const tags = pricingItemToTypeTags(item);
    const type = (tags[0] ?? "文本") as ModelCardData["type"];
    const prices = formatRetailPrice(item);
    const featureTags = featureTagsFromPricing(item);
    const vendor = vendorName(item, catalog.vendors);
    cards.push({
      modelId: name,
      vendor,
      type,
      description: item.description?.trim() ?? "",
      logo: vendorIcon(item, catalog.vendors),
      sceneTags: featureTags,
      features: featureTags,
      inputPrice: prices.input === "—" ? "" : prices.input,
      outputPrice: prices.output === "—" ? "" : prices.output,
      context: contextLabelFromPricing(item) ?? "—",
      size: "—",
      published: "",
      publishedAt: "",
      quotaType: item.quota_type,
      endpoints: pricingItemEndpoints(item),
      vendorId: item.vendor_id,
    });
  }
  return cards;
}

export function resolveHotModels(
  curated: readonly string[],
  catalogIds: string[],
  limit = 5,
): string[] {
  const idSet = new Set(catalogIds);
  const fromCurated = curated.filter((id) => idSet.has(id));
  if (fromCurated.length > 0) return fromCurated.slice(0, limit);
  return catalogIds.slice(0, limit);
}

export { PRICING_SECTION_KEYS };
