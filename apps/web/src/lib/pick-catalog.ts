import type { TargetLocale, TranslatedLocale } from "@/lib/locale";
import { catalogLocale, targetCatalogLocale } from "@/lib/locale";

/**
 * Pick a per-Locale Marketing/Auth catalog module. Missing locales fall back to Source (zh-CN).
 */
export function pickCatalog<T>(
  locale: string,
  catalogs: Partial<Record<TranslatedLocale, T>> & { "zh-CN": T },
): T {
  const key = catalogLocale(locale);
  return catalogs[key] ?? catalogs["zh-CN"];
}

/**
 * Pick a per-Locale Target catalog module (Auth minimal, Console). Missing → Source.
 */
export function pickTargetCatalog<T>(
  locale: string,
  catalogs: Partial<Record<TargetLocale, T>> & { "zh-CN": T },
): T {
  const key = targetCatalogLocale(locale);
  return catalogs[key] ?? catalogs["zh-CN"];
}
