import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import {
  ABOUT_ASSETS,
  CERTIFICATION_IMAGE_BASE,
  heroBackgroundBase,
  TIMELINE_ITEM_BASE,
} from "./content-base";
import { en, fr, ja, ru, vi, zhCN, zhTW, ko, de, es, ptBR, ar, hi, id } from "./content-locales";
import type { AboutContent, AboutStrings } from "./content-types";

export type { AboutContent, AboutStrings } from "./content-types";
export type { TimelineItem, Certification } from "./content-base";
export { ABOUT_ASSETS } from "./content-base";

function buildAboutContent(strings: AboutStrings): AboutContent {
  const {
    heroLogoAlt,
    timelineItems: timelineStrings,
    certifications: certStrings,
    ...copy
  } = strings;

  return {
    heroBackground: {
      ...heroBackgroundBase,
      logoAlt: heroLogoAlt,
    },
    assets: ABOUT_ASSETS,
    ...copy,
    timelineItems: TIMELINE_ITEM_BASE.map((base, i) => ({
      ...base,
      ...timelineStrings[i]!,
    })),
    certifications: CERTIFICATION_IMAGE_BASE.map((image, i) => ({
      image,
      ...certStrings[i]!,
    })),
  };
}

const ABOUT_STRINGS: Partial<Record<TranslatedLocale, AboutStrings>> & {
  "zh-CN": AboutStrings;
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

export function getAboutContent(locale: string): AboutContent {
  return buildAboutContent(pickCatalog(locale, ABOUT_STRINGS));
}
