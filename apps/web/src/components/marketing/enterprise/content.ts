import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  ADVANTAGE_CARD_BASE,
  INTRO_CARD_BASE,
  SCENARIO_BASE,
  TESTIMONIAL_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW } from "./content-locales";
import type {
  EnterpriseContent,
  EnterpriseStrings,
} from "./content-types";

export type {
  EnterpriseAdvantageCard,
  EnterpriseArchLayer,
  EnterpriseContent,
  EnterpriseScenario,
  EnterpriseStrings,
  ScenarioDiagramSpec,
} from "./content-types";
export type { ScenarioDetailVariant } from "@/components/marketing/shared/illustration-assets";
export { CONSULT_URL, ENT_ASSETS } from "./content-base";

function buildEnterpriseContent(strings: EnterpriseStrings): EnterpriseContent {
  return {
    introCards: INTRO_CARD_BASE.map((base, i) => {
      const copy = strings.introCards[i]!;
      return {
        ...copy,
        ctaLabel: "",
        ctaHref: "",
        illustration: base.illustration,
        background: base.background,
      };
    }),
    archLayers: strings.archLayers,
    advantageCards: ADVANTAGE_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.advantageCards[i]!,
    })),
    scenarios: SCENARIO_BASE.map((base, i) => {
      const copy = strings.scenarios[i]!;
      return {
        id: base.id,
        background: base.background,
        tab: copy.tab,
        title: copy.title,
        description: copy.description,
        advantages: copy.advantages,
      };
    }),
    scenarioDiagramSpecs: strings.scenarioDiagramSpecs,
    testimonials: TESTIMONIAL_BASE.map((base, i) => ({
      ...strings.testimonials[i]!,
      avatarSeed: base.avatarSeed,
    })),
    faqItems: strings.faqItems,
  };
}

const ENTERPRISE_STRINGS: Partial<Record<TranslatedLocale, EnterpriseStrings>> & {
  "zh-CN": EnterpriseStrings;
} = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getEnterpriseContent(locale: string): EnterpriseContent {
  return buildEnterpriseContent(pickCatalog(locale, ENTERPRISE_STRINGS));
}
