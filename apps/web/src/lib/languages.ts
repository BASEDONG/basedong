import type { TargetLocale } from "@/lib/locale";
import { TARGET_LOCALES, isConsoleLocale } from "@/lib/locale";

export type SiteLanguage = {
  code: TargetLocale;
  nativeLabel: string;
  searchAliases: string[];
  /** True when Marketing/Auth catalogs are not yet complete (Console Locale). */
  consoleOnly: boolean;
};

export const DEFAULT_LANGUAGE_CODE = "zh-CN" satisfies TargetLocale;

function lang(
  code: TargetLocale,
  nativeLabel: string,
  consoleOnly: boolean,
  ...searchAliases: string[]
): SiteLanguage {
  return { code, nativeLabel, consoleOnly, searchAliases };
}

const LANGUAGE_BY_CODE: Record<TargetLocale, SiteLanguage> = {
  "zh-CN": lang("zh-CN", "简体中文", false, "简体中文", "Chinese Simplified"),
  "zh-TW": lang(
    "zh-TW",
    "繁體中文",
    false,
    "繁体中文",
    "Chinese Traditional",
  ),
  en: lang("en", "English", false, "英语", "英文"),
  fr: lang("fr", "Français", false, "法语", "French"),
  ru: lang("ru", "Русский", false, "俄语", "Russian"),
  ja: lang("ja", "日本語", false, "日语", "Japanese", "日本"),
  vi: lang("vi", "Tiếng Việt", false, "越南语", "Vietnamese"),
  ko: lang("ko", "한국어", true, "韩语", "Korean", "한国"),
  de: lang("de", "Deutsch", true, "德语", "German"),
  es: lang("es", "Español", true, "西班牙语", "Spanish"),
  "pt-BR": lang(
    "pt-BR",
    "Português (Brasil)",
    true,
    "葡萄牙语",
    "Portuguese",
    "Brazil",
  ),
  ar: lang("ar", "العربية", true, "阿拉伯语", "Arabic"),
  hi: lang("hi", "हिन्दी", true, "印地语", "Hindi"),
  id: lang("id", "Bahasa Indonesia", true, "印尼语", "Indonesian"),
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

export function isConsoleOnlyLanguage(code: string): boolean {
  return isConsoleLocale(code);
}
