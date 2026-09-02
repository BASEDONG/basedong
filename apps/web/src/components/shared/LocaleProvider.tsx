"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  FALLBACK_LOCALE,
  PREFERRED_LOCALE_COOKIE,
  PREFERRED_LOCALE_STORAGE_KEY,
  SOURCE_LOCALE,
  catalogLocale,
  isTargetLocale,
  isTranslatedLocale,
  marketingContentLocale,
  targetCatalogLocale,
  type Locale,
  type TargetLocale,
  type TranslatedLocale,
} from "@/lib/locale";
import { resolveLocalHref, withLocalePrefix } from "@/lib/locale-path";

type LocaleContextValue = {
  /** Pathname-derived Translated Locale (URL). */
  pathnameLocale: TranslatedLocale;
  /** Locale for Marketing/Auth translated catalogs (Console Locale → Fallback). */
  locale: TranslatedLocale;
  preferredLocale: Locale;
  /** Preferred Locale when it is a Target Locale. */
  targetLocale: TargetLocale;
  setPreferredLocale: (code: Locale) => void;
  href: (path: string) => string;
  resolveHref: (href: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function persistPreferred(code: Locale) {
  try {
    localStorage.setItem(PREFERRED_LOCALE_STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${PREFERRED_LOCALE_COOKIE}=${encodeURIComponent(code)};path=/;max-age=${maxAge};samesite=lax`;
}

function readStoredPreferred(): Locale | null {
  try {
    return localStorage.getItem(PREFERRED_LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function LocaleProvider({
  locale: pathnameLocaleProp,
  preferredLocale: preferredProp,
  children,
}: {
  locale: TranslatedLocale;
  preferredLocale?: Locale;
  children: ReactNode;
}) {
  const pathnameLocale = catalogLocale(pathnameLocaleProp);

  const [preferredLocale, setPreferredState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return preferredProp ?? pathnameLocale;
    }
    const stored = readStoredPreferred();
    if (stored && isTargetLocale(stored)) return stored;
    return preferredProp ?? pathnameLocale;
  });

  const setPreferredLocale = useCallback((code: Locale) => {
    setPreferredState(code);
    persistPreferred(code);
  }, []);

  const contentLocale = marketingContentLocale(preferredLocale, pathnameLocale);
  const targetLocale = targetCatalogLocale(preferredLocale);

  const value = useMemo<LocaleContextValue>(
    () => ({
      pathnameLocale,
      locale: contentLocale,
      preferredLocale,
      targetLocale,
      setPreferredLocale,
      href: (path: string) =>
        withLocalePrefix(path, marketingContentLocale(preferredLocale, pathnameLocale)),
      resolveHref: (href: string) =>
        resolveLocalHref(
          href,
          marketingContentLocale(preferredLocale, pathnameLocale),
        ),
    }),
    [pathnameLocale, contentLocale, preferredLocale, targetLocale, setPreferredLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      pathnameLocale: FALLBACK_LOCALE,
      locale: FALLBACK_LOCALE,
      preferredLocale: SOURCE_LOCALE,
      targetLocale: SOURCE_LOCALE,
      setPreferredLocale: persistPreferred,
      href: (path: string) => withLocalePrefix(path, FALLBACK_LOCALE),
      resolveHref: (href: string) => resolveLocalHref(href, FALLBACK_LOCALE),
    };
  }
  return ctx;
}

export { isTranslatedLocale, persistPreferred };
