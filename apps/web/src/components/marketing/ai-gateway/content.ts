import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  ADVANTAGE_CARD_BASE,
  SCENARIO_BASE,
  TESTIMONIAL_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW, ko, de, es, ptBR, ar, hi, id } from "./content-locales";
import type { GatewayContent, GatewayStrings } from "./content-types";

export type {
  FaqItem,
  GatewayAdvantageCard,
  GatewayArchLayer,
  GatewayContent,
  GatewayStrings,
  Scenario,
} from "./content-types";
export { CONSULT_URL, GW_ASSETS } from "./content-base";

function buildGatewayContent(strings: GatewayStrings): GatewayContent {
  return {
    archLayers: strings.archLayers,
    advantages: ADVANTAGE_CARD_BASE.map((base, i) => ({
      ...base,
      ...strings.advantageCards[i]!,
    })),
    scenarios: SCENARIO_BASE.map((base, i) => {
      const copy = strings.scenarios[i]!;
      return {
        id: base.id,
        gridCols: base.gridCols,
        background: base.background,
        tab: copy.tab,
        title: copy.title,
        paragraphs: copy.paragraphs,
        cards: copy.cards,
      };
    }),
    testimonials: TESTIMONIAL_BASE.map((base, i) => ({
      ...strings.testimonials[i]!,
      avatarSeed: base.avatarSeed,
    })),
    faqs: strings.faqItems,
  };
}

const GATEWAY_STRINGS: Partial<Record<TranslatedLocale, GatewayStrings>> & {
  "zh-CN": GatewayStrings;
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

export function getGatewayContent(locale: string): GatewayContent {
  return buildGatewayContent(pickCatalog(locale, GATEWAY_STRINGS));
}
