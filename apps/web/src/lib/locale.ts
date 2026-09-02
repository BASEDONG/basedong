/** BCP-47 Locale codes for customer Web (not Admin i18next codes). */

export const SOURCE_LOCALE = "zh-CN" as const;
export const FALLBACK_LOCALE = SOURCE_LOCALE;

/** Locales with complete Marketing + Auth catalogs (launch set). */
export const TRANSLATED_LOCALES = [
  "zh-CN",
  "en",
  "zh-TW",
  "fr",
  "ru",
  "ja",
  "vi",
] as const;

/** Full customer Web Target Locale Set (ADR 0006). */
export const TARGET_LOCALES = [
  "zh-CN",
  "en",
  "zh-TW",
  "ja",
  "fr",
  "ru",
  "vi",
  "ko",
  "de",
  "es",
  "pt-BR",
  "ar",
  "hi",
  "id",
] as const;

/** Locales with Console catalog but not yet full Marketing + Auth (until Graduation). */
export const CONSOLE_LOCALES = [
  "ko",
  "de",
  "es",
  "pt-BR",
  "ar",
  "hi",
  "id",
] as const;

export type TranslatedLocale = (typeof TRANSLATED_LOCALES)[number];
export type TargetLocale = (typeof TARGET_LOCALES)[number];
export type ConsoleLocale = (typeof CONSOLE_LOCALES)[number];
export type Locale = string;

export const LOCALE_HEADER = "x-bd-locale";
export const PREFERRED_LOCALE_COOKIE = "bd_preferred_locale";
export const PREFERRED_LOCALE_STORAGE_KEY = "bd_preferred_locale";

const TRANSLATED_SET = new Set<string>(TRANSLATED_LOCALES);
const TARGET_SET = new Set<string>(TARGET_LOCALES);
const CONSOLE_SET = new Set<string>(CONSOLE_LOCALES);

/** Prefixed Translated Locales (Source uses bare paths). */
export const PREFIXED_LOCALES = TRANSLATED_LOCALES.filter(
  (l) => l !== SOURCE_LOCALE,
);

export function isTranslatedLocale(code: string): code is TranslatedLocale {
  return TRANSLATED_SET.has(code);
}

export function isTargetLocale(code: string): code is TargetLocale {
  return TARGET_SET.has(code);
}

export function isConsoleLocale(code: string): code is ConsoleLocale {
  return CONSOLE_SET.has(code);
}

/** Marketing + Auth catalog locale (Translated only; unknown → Fallback). */
export function catalogLocale(code: string): TranslatedLocale {
  return isTranslatedLocale(code) ? code : FALLBACK_LOCALE;
}

/** Target catalog locale (Console + Auth minimal; unknown → Fallback). */
export function targetCatalogLocale(code: string): TargetLocale {
  return isTargetLocale(code) ? code : FALLBACK_LOCALE;
}

/**
 * Marketing page copy locale: Console Locales fall back to Source;
 * otherwise prefer user's Translated choice, else pathname locale.
 */
export function marketingContentLocale(
  preferred: string,
  pathnameLocale: string,
): TranslatedLocale {
  if (isConsoleLocale(preferred)) return FALLBACK_LOCALE;
  if (isTranslatedLocale(preferred)) return preferred;
  return catalogLocale(pathnameLocale);
}

export function isPrefixedLocale(code: string): boolean {
  return isTranslatedLocale(code) && code !== SOURCE_LOCALE;
}
