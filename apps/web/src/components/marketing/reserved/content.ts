import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  CONSULT_URL,
  DELIVERY_STEP_BASE,
  heroBackgroundBase,
  HIGH_PERF_MODEL_BASE,
  RV_ASSETS,
  STANDARD_MODEL_BASE,
  WHY_CARD_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW } from "./content-locales";
import type { ReservedContent, ReservedStrings } from "./content-types";

export type {
  ReservedContent,
  ReservedDeliveryStep,
  ReservedPricingModel,
  ReservedStrings,
  ReservedWhyCard,
} from "./content-types";
export { CONSULT_URL, RV_ASSETS } from "./content-base";

function buildReservedContent(strings: ReservedStrings): ReservedContent {
  return {
    pageTitle: strings.pageTitle,
    pageDescription: strings.pageDescription,
    heroBackground: {
      ...heroBackgroundBase,
      logoAlt: strings.heroLogoAlt,
    },
    consultUrl: CONSULT_URL,
    assets: RV_ASSETS,
    heroTitle: strings.heroTitle,
    heroTitleAccent: strings.heroTitleAccent,
    heroSubtitle: strings.heroSubtitle,
    consultCta: strings.consultCta,
    whyBadge: strings.whyBadge,
    whyTitle: strings.whyTitle,
    whySubtitle: strings.whySubtitle,
    whyCards: WHY_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.whyCards[i]!,
    })),
    pricingBadge: strings.pricingBadge,
    pricingTitle: strings.pricingTitle,
    pricingSubtitle: strings.pricingSubtitle,
    highPerfTitle: strings.highPerfTitle,
    standardTitle: strings.standardTitle,
    pricingNote1: strings.pricingNote1,
    pricingNote2: strings.pricingNote2,
    pricingFootCtaBefore: strings.pricingFootCtaBefore,
    pricingFootCtaAfter: strings.pricingFootCtaAfter,
    costReferenceLabel: strings.costReferenceLabel,
    priceLabel: strings.priceLabel,
    unitPriceLabel: strings.unitPriceLabel,
    perfReferenceLabel: strings.perfReferenceLabel,
    deliveryBadge: strings.deliveryBadge,
    deliveryTitle: strings.deliveryTitle,
    deliverySteps: DELIVERY_STEP_BASE.map((base, i) => ({
      ...base,
      ...strings.deliverySteps[i]!,
    })),
    ctaBadge: strings.ctaBadge,
    ctaTitle: strings.ctaTitle,
    ctaBody: strings.ctaBody,
    ctaCardTitle: strings.ctaCardTitle,
    ctaCardBody: strings.ctaCardBody,
    ctaButton: strings.ctaButton,
    highPerformanceModels: HIGH_PERF_MODEL_BASE.map((base, i) => ({
      ...base,
      ...strings.highPerfModels[i]!,
    })),
    standardModels: STANDARD_MODEL_BASE.map((base, i) => ({
      ...base,
      ...strings.standardModels[i]!,
    })),
  };
}

const RESERVED_STRINGS: Partial<Record<TranslatedLocale, ReservedStrings>> & {
  "zh-CN": ReservedStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getReservedContent(locale: string): ReservedContent {
  return buildReservedContent(pickCatalog(locale, RESERVED_STRINGS));
}
