import type { TargetLocale } from "@/lib/locale";
import { TARGET_LOCALES } from "@/lib/locale";

export type SiteLanguage = {
  code: TargetLocale;
  nativeLabel: string;
  searchAliases: string[];
};

export const DEFAULT_LANGUAGE_CODE = "zh-CN" satisfies TargetLocale;

function lang(
  code: TargetLocale,
  nativeLabel: string,
  ...searchAliases: string[]
): SiteLanguage {
  return { code, nativeLabel, searchAliases };
}

const LANGUAGE_BY_CODE: Record<TargetLocale, SiteLanguage> = {
  "zh-CN": lang("zh-CN", "简体中文", "简体中文", "Chinese Simplified"),
  "zh-TW": lang(
    "zh-TW",
    "繁體中文",
    "繁体中文",
    "Chinese Traditional",
  ),
  en: lang("en", "English", "英语", "英文"),
  fr: lang("fr", "Français", "法语", "French"),
  ru: lang("ru", "Русский", "俄语", "Russian"),
  ja: lang("ja", "日本語", "日语", "Japanese", "日本"),
  vi: lang("vi", "Tiếng Việt", "越南语", "Vietnamese"),
  ko: lang("ko", "한국어", "韩语", "Korean", "한国"),
  de: lang("de", "Deutsch", "德语", "German"),
  es: lang("es", "Español", "西班牙语", "Spanish"),
  "pt-BR": lang(
    "pt-BR",
    "Português (Brasil)",
    "Portuguese",
    "Brazil",
    "葡萄牙语",
  ),
  ar: lang("ar", "العربية", "阿拉伯语", "Arabic"),
  hi: lang("hi", "हिन्दी", "印地语", "Hindi"),
  id: lang("id", "Bahasa Indonesia", "印尼语", "Indonesian"),
};

const PINNED: TargetLocale[] = ["zh-CN", "zh-TW", "en"];

export const SITE_LANGUAGES: SiteLanguage[] = [
  ...PINNED.map((code) => LANGUAGE_BY_CODE[code]),
  ...TARGET_LOCALES.filter((code) => !PINNED.includes(code)).map(
    (code) => LANGUAGE_BY_CODE[code],
  ),
];

/** @deprecated alias — use SITE_LANGUAGES */
export type MarketingLanguage = SiteLanguage;

/** @deprecated alias */
export const MARKETING_LANGUAGES: SiteLanguage[] = SITE_LANGUAGES;
