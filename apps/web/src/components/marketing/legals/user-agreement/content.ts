import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import { en, fr, ja, ru, vi, zhCN, zhTW, ko, de, es, ptBR, ar, hi, id } from "./content-locales";
import type {
  UserAgreementContent,
  UserAgreementStrings,
} from "./content-types";

export type {
  AgreementSection,
  UserAgreementContent,
  UserAgreementStrings,
} from "./content-types";

const CATALOGS: Partial<Record<TranslatedLocale, UserAgreementStrings>> & {
  "zh-CN": UserAgreementStrings;
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

export function getUserAgreementContent(
  locale: string,
): UserAgreementContent {
  return pickCatalog(locale, CATALOGS);
}
