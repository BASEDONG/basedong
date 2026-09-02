/** Docs site locales — aligned with upstream new-api-docs-v1 (zh / en / ja). */

export const DOCS_LOCALES = ["zh", "en", "ja"] as const;
export type DocsLocale = (typeof DOCS_LOCALES)[number];
export const DEFAULT_DOCS_LOCALE: DocsLocale = "zh";

const DOCS_LOCALE_SET = new Set<string>(DOCS_LOCALES);

export function isDocsLocale(code: string): code is DocsLocale {
  return DOCS_LOCALE_SET.has(code);
}

/** Bare Chinese docs paths; en/ja use a URL prefix like upstream docs.newapi.pro. */
export function docsApiBasePath(locale: DocsLocale): string {
  return locale === "zh" ? "/docs/api" : `/${locale}/docs/api`;
}

export function docsLocaleFromPathname(pathname: string): DocsLocale {
  const cleaned = pathname.replace(/\/$/, "") || "/";
  if (cleaned === "/en/docs" || cleaned.startsWith("/en/docs/")) return "en";
  if (cleaned === "/ja/docs" || cleaned.startsWith("/ja/docs/")) return "ja";
  return "zh";
}

/** Same API page in another docs locale (preserves slug after /docs/api). */
export function switchDocsApiPath(pathname: string, target: DocsLocale): string {
  const current = docsLocaleFromPathname(pathname);
  const fromBase = docsApiBasePath(current);
  const toBase = docsApiBasePath(target);
  if (pathname === fromBase || pathname.startsWith(`${fromBase}/`)) {
    return toBase + pathname.slice(fromBase.length);
  }
  return toBase;
}

export const DOCS_LOCALE_LABELS: Record<DocsLocale, string> = {
  zh: "中文",
  en: "English",
  ja: "日本語",
};

/** `<html lang>` for docs routes (Marketing uses BCP-47 catalog locales). */
export const DOCS_HTML_LANG: Record<DocsLocale, string> = {
  zh: "zh-CN",
  en: "en",
  ja: "ja",
};
