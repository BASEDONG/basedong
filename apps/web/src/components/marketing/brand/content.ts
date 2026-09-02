import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  BRAND_ASSETS,
  heroBackgroundBase,
  SWATCH_BASE,
  VALUE_CARD_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW } from "./content-locales";
import type { BrandContent, BrandStrings } from "./content-types";

export type { BrandContent, BrandStrings } from "./content-types";
export { BRAND_ASSETS } from "./content-base";

function buildBrandContent(strings: BrandStrings): BrandContent {
  const { heroLogoAlt, swatches: swatchStrings, values: valueStrings, ...copy } =
    strings;

  return {
    heroBackground: {
      ...heroBackgroundBase,
      logoAlt: heroLogoAlt,
    },
    assets: BRAND_ASSETS,
    ...copy,
    values: VALUE_CARD_BASE.map((base, i) => ({
      ...base,
      ...valueStrings[i]!,
    })),
    swatches: SWATCH_BASE.map((base, i) => ({
      ...base,
      ...swatchStrings[i]!,
    })),
  };
}

const BRAND_STRINGS: Partial<Record<TranslatedLocale, BrandStrings>> & {
  "zh-CN": BrandStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getBrandContent(locale: string): BrandContent {
  return buildBrandContent(pickCatalog(locale, BRAND_STRINGS));
}
