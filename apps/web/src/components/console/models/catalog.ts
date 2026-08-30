import { BRAND } from "@/lib/assets";
import type { PricingCatalog, PricingItem } from "@/lib/backend/client";
import type { ModelCardData } from "./content-types";

function endpointToTypeTags(endpoints?: string[]): string[] {
  if (!endpoints?.length) return ["对话"];
  const tags = new Set<string>();
  for (const ep of endpoints) {
    const lower = ep.toLowerCase();
    if (lower.includes("image") || lower.includes("图像")) tags.add("生图");
    else if (lower.includes("audio") || lower.includes("speech") || lower.includes("tts"))
      tags.add("语音");
    else if (lower.includes("video")) tags.add("视频");
    else if (lower.includes("embed")) tags.add("嵌入");
    else if (lower.includes("rerank")) tags.add("重排序");
    else tags.add("对话");
  }
  return tags.size ? [...tags] : ["对话"];
}

function featureTagsFromPricing(item: PricingItem): string[] {
  if (!item.tags?.trim()) return [];
  return item.tags
    .split(/[,，|/\s]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function vendorName(
  item: PricingItem,
  vendors: PricingCatalog["vendors"],
): string {
  if (item.owner_by?.trim()) return item.owner_by.trim();
  if (item.vendor_id != null) {
    const v = vendors.find((x) => x.id === item.vendor_id);
    if (v?.name) return v.name;
  }
  return "Backend";
}

function vendorIcon(
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

/** Map Backend pricing (+ optional enabled model filter) to plaza cards. */
export function pricingToModelCards(
  catalog: PricingCatalog,
  enabledModels?: string[],
): ModelCardData[] {
  const enabled =
    enabledModels && enabledModels.length > 0
      ? new Set(enabledModels)
      : null;

  const cards: ModelCardData[] = [];
  for (const item of catalog.items) {
    const name = item.model_name?.trim();
    if (!name) continue;
    if (enabled && !enabled.has(name)) continue;
    cards.push({
      id: name,
      title: name,
      provider: vendorName(item, catalog.vendors),
      description: item.description?.trim() || "来自 Backend 模型目录",
      logo: vendorIcon(item, catalog.vendors),
      badge: null,
      deprecated: false,
      typeTags: endpointToTypeTags(item.supported_endpoint_types),
      featureTags: featureTagsFromPricing(item),
    });
  }
  return cards;
}

/** When pricing is empty, build minimal cards from enabled model names. */
export function enabledModelsToCards(models: string[]): ModelCardData[] {
  return models.map((name) => ({
    id: name,
    title: name,
    provider: "Backend",
    description: "当前用户分组可用的模型",
    logo: BRAND.logoMark,
    badge: null,
    deprecated: false,
    typeTags: ["对话"],
    featureTags: [],
  }));
}
