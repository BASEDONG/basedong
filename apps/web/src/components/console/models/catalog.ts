import { BRAND } from "@/lib/assets";
import type { PricingCatalog } from "@/lib/backend/client";
import {
  featureTagsFromPricing,
  formatRetailPrice,
  pricingItemToTypeTags,
  vendorIcon,
  vendorName,
  contextLabelFromPricing,
  contextKFromPricing,
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
    const retail = formatRetailPrice(item);
    const hasPrice =
      retail.input !== "—" || retail.output !== "—" || retail.unit !== "—";
    const contextK = contextKFromPricing(item);
    cards.push({
      id: name,
      title: name,
      provider: vendorName(item, catalog.vendors),
      description: item.description?.trim() ?? "",
      logo: vendorIcon(item, catalog.vendors),
      badge: null,
      deprecated: false,
      typeTags: pricingItemToTypeTags(item),
      featureTags: featureTagsFromPricing(item),
      endpointTypes: item.supported_endpoint_types?.filter(Boolean) ?? [],
      context: contextLabelFromPricing(item),
      contextK,
      retailPrice: hasPrice ? retail : undefined,
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
    description: "",
    logo: BRAND.logoMark,
    badge: null,
    deprecated: false,
    typeTags: ["文本"],
    featureTags: [],
    context: null,
    contextK: 0,
  }));
}
