/** BCP-47 Locale codes for customer Web (not Admin i18next codes). */

export const SOURCE_LOCALE = "zh-CN" as const;
export const FALLBACK_LOCALE = SOURCE_LOCALE;

/** Full customer Web Target Locale Set (ADR 0006, graduated ADR 0007). */
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

/** Locales with complete Marketing + Auth catalogs (equals Target after Graduation). */
export const TRANSLATED_LOCALES = TARGET_LOCALES;

/** @deprecated Post-Graduation (ADR 0007): empty; kept for type compatibility. */
export const CONSOLE_LOCALES = [] as const;

/** Locales that require right-to-left document and layout mirroring. */
export const RTL_LOCALES = ["ar"] as const;

export type RtlLocale = (typeof RTL_LOCALES)[number];

export type TranslatedLocale = (typeof TRANSLATED_LOCALES)[number];
export type TargetLocale = (typeof TARGET_LOCALES)[number];
export type ConsoleLocale = never;
export type Locale = string;

export const LOCALE_HEADER = "x-bd-locale";
export const PREFERRED_LOCALE_COOKIE = "bd_preferred_locale";
export const PREFERRED_LOCALE_STORAGE_KEY = "bd_preferred_locale";

const TRANSLATED_SET = new Set<string>(TRANSLATED_LOCALES);
const TARGET_SET = new Set<string>(TARGET_LOCALES);
const RTL_SET = new Set<string>(RTL_LOCALES);

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

/** @deprecated Post-Graduation: always false. */
export function isConsoleLocale(code: string): code is ConsoleLocale {
  void code;
  return false;
}

export function isRtlLocale(code: string): code is RtlLocale {
  return RTL_SET.has(code);
}

/** Marketing + Auth catalog locale (Translated only; unknown → Fallback). */
export function catalogLocale(code: string): TranslatedLocale {
  return isTranslatedLocale(code) ? code : FALLBACK_LOCALE;
}

/** Target catalog locale (Auth minimal, Console). Unknown → Fallback. */
export function targetCatalogLocale(code: string): TargetLocale {
  return isTargetLocale(code) ? code : FALLBACK_LOCALE;
}

/**
 * Marketing page copy locale: prefer user's Translated choice, else pathname locale.
 */
export function marketingContentLocale(
  preferred: string,
  pathnameLocale: string,
): TranslatedLocale {
  if (isTranslatedLocale(preferred)) return preferred;
  return catalogLocale(pathnameLocale);
}

export function isPrefixedLocale(code: string): boolean {
  return isTranslatedLocale(code) && code !== SOURCE_LOCALE;
}
