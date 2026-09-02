import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  ARCHITECTURE_LAYER_BASE,
  CONSULT_URL,
  FEATURE_CARD_BASE,
  GPU_VENDOR_BASE,
  PARTNERSHIP_CARD_BASE,
  TESTIMONIAL_BASE,
  TF_ASSETS,
  WHY_CARD_BASE,
  heroBackgroundBase,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW } from "./content-locales";
import type { TokenFactoryContent, TokenFactoryStrings } from "./content-types";

export type { TokenFactoryContent, TokenFactoryStrings } from "./content-types";
export { CONSULT_URL, TF_ASSETS } from "./content-base";

function buildTokenFactoryContent(
  strings: TokenFactoryStrings,
): TokenFactoryContent {
  return {
    heroBackground: {
      ...heroBackgroundBase,
      logoAlt: strings.heroLogoAlt,
    },
    consultUrl: CONSULT_URL,
    assets: TF_ASSETS,
    heroBrandName: strings.heroBrandName,
    heroTitle: strings.heroTitle,
    heroSubtitle: strings.heroSubtitle,
    heroTags: strings.heroTags,
    heroCta: strings.heroCta,
    featuresTitle: strings.featuresTitle,
    featuresSubtitle: strings.featuresSubtitle,
    featureCards: FEATURE_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.featureCards[i]!,
    })),
    architectureBadge: strings.architectureBadge,
    architectureTitleLine1: strings.architectureTitleLine1,
    architectureTitleLine2: strings.architectureTitleLine2,
    architectureBodyPrefix: strings.architectureBodyPrefix,
    architectureBodySuffix: strings.architectureBodySuffix,
    architectureLayers: ARCHITECTURE_LAYER_BASE.map((base, i) => ({
      ...base,
      ...strings.architectureLayers[i]!,
    })),
    partnershipTitle: strings.partnershipTitle,
    partnershipBenefitsHeading: strings.partnershipBenefitsHeading,
    partnershipCards: PARTNERSHIP_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.partnershipCards[i]!,
    })),
    whyChooseTitle: strings.whyChooseTitle,
    whyCards: WHY_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.whyCards[i]!,
    })),
    ecosystemTitle: strings.ecosystemTitle,
    ecosystemSubtitle: strings.ecosystemSubtitle,
    gpuVendors: GPU_VENDOR_BASE.map((base, i) => ({
      ...base,
      ...strings.gpuVendors[i]!,
    })),
    testimonialsTitle: strings.testimonialsTitle,
    testimonials: TESTIMONIAL_BASE.map((base, i) => ({
      ...base,
      ...strings.testimonials[i]!,
    })),
    ctaTitle: strings.ctaTitle,
    ctaSubtitle: strings.ctaSubtitle,
    ctaButton: strings.ctaButton,
  };
}

const TOKEN_FACTORY_STRINGS: Partial<
  Record<TranslatedLocale, TokenFactoryStrings>
> & {
  "zh-CN": TokenFactoryStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getTokenFactoryContent(locale: string): TokenFactoryContent {
  return buildTokenFactoryContent(pickCatalog(locale, TOKEN_FACTORY_STRINGS));
}
