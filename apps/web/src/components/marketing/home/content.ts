import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  FEATURE_CARD_BASE,
  HERO_SLIDE_BASE,
  INDUSTRY_ITEM_BASE,
  partnersBg,
  PRODUCT_CARD_BASE,
  SF_SHARED,
  WHY_HIGHLIGHT_CARD_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW, ko, de, es, ptBR, ar, hi, id } from "./content-locales";
import type { HomeContent, HomeStrings } from "./content-types";

export type { HomeContent, HomeStrings } from "./content-types";
export { SF_SHARED, partnersBg };
export { logoRow1, logoRow2, logoRow3 } from "./partner-logos";

function buildHomeContent(strings: HomeStrings): HomeContent {
  return {
    heroSlides: HERO_SLIDE_BASE.map((base, i) => {
      const copy = strings.heroSlides[i]!;
      return {
        id: base.id,
        ctaHref: base.ctaHref,
        layout: base.layout,
        tabLabel: copy.tabLabel,
        eyebrow: copy.eyebrow,
        title: copy.title,
        description: copy.description,
        ctaLabel: copy.ctaLabel,
        background: {
          ...base.background,
          logoAlt: copy.logoAlt,
        },
      };
    }),
    productMatrix: strings.productMatrix,
    productCards: PRODUCT_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.productCards[i]!,
    })),
    whySection: strings.whySection,
    whyHighlightCards: WHY_HIGHLIGHT_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.whyHighlightCards[i]!,
    })),
    featureCards: FEATURE_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.featureCards[i]!,
    })),
    industrySection: strings.industrySection,
    industryItems: INDUSTRY_ITEM_BASE.map((base, i) => ({
      ...base,
      ...strings.industryItems[i]!,
    })),
    partners: strings.partners,
    heroCarousel: strings.heroCarousel,
  };
}

const HOME_STRINGS: Partial<Record<TranslatedLocale, HomeStrings>> & {
  "zh-CN": HomeStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
  ko: ko,
  de: de,
  es: es,
  "pt-BR": ptBR,
  ar: ar,
  hi: hi,
  id: id,
};

export function getHomeContent(locale: string): HomeContent {
  return buildHomeContent(pickCatalog(locale, HOME_STRINGS));
}
