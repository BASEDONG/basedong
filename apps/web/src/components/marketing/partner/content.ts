import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  APPLY_URL,
  heroBackgroundBase,
  MORE_CASES_URL,
  PARTNER_ASSETS,
  PARTNER_BENEFIT_BASE,
  PARTNER_CASE_IMAGES,
  PARTNERSHIP_MODE_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW } from "./content-locales";
import type { PartnerContent, PartnerStrings } from "./content-types";

export type {
  HighlightItem,
  PartnerBenefit,
  PartnerCase,
  PartnerContent,
  PartnerStrings,
  PartnershipMode,
} from "./content-types";
export { APPLY_URL, MORE_CASES_URL, PARTNER_ASSETS } from "./content-base";

function buildPartnerContent(strings: PartnerStrings): PartnerContent {
  const {
    heroLogoAlt,
    partnershipModes: modeStrings,
    partnerBenefits: benefitStrings,
    partnerCases: caseStrings,
    ...copy
  } = strings;

  return {
    heroBackground: { ...heroBackgroundBase, logoAlt: heroLogoAlt },
    applyUrl: APPLY_URL,
    moreCasesUrl: MORE_CASES_URL,
    assets: PARTNER_ASSETS,
    ...copy,
    partnershipModes: PARTNERSHIP_MODE_BASE.map((base, i) => ({
      ...base,
      ...modeStrings[i]!,
    })),
    partnerBenefits: PARTNER_BENEFIT_BASE.map((base, i) => ({
      ...base,
      ...benefitStrings[i]!,
    })),
    partnerCases: PARTNER_CASE_IMAGES.map((image, i) => ({
      image,
      ...caseStrings[i]!,
    })),
  };
}

const PARTNER_STRINGS: Partial<Record<TranslatedLocale, PartnerStrings>> & {
  "zh-CN": PartnerStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getPartnerContent(locale: string): PartnerContent {
  return buildPartnerContent(pickCatalog(locale, PARTNER_STRINGS));
}
