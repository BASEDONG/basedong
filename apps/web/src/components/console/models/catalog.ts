import { BRAND } from "@/lib/assets";
import type { PricingCatalog } from "@/lib/backend/client";
import {
  endpointToTypeTags,
  featureTagsFromPricing,
  vendorIcon,
  vendorName,
} from "@/lib/backend/catalog";
import type { ModelCardData } from "./content-types";

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
