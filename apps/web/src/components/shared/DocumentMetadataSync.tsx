"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/shared/LocaleProvider";
import { resolveConsoleDocumentMetadata } from "@/lib/console-page-metadata";
import { resolveDocumentMetadata } from "@/lib/document-metadata";
import { catalogLocale, targetCatalogLocale } from "@/lib/locale";
import { localeFromPathname, pathnameWithoutLocale } from "@/lib/locale-path";

function setMetaDescription(content: string) {
  let el = document.querySelector('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function DocumentMetadataSync() {
  const pathname = usePathname();
  const { preferredLocale } = useLocale();

  useEffect(() => {
    const bare = pathnameWithoutLocale(pathname);
    const isConsole = bare === "/me" || bare.startsWith("/me/");
    const locale = isConsole
      ? targetCatalogLocale(preferredLocale)
      : catalogLocale(localeFromPathname(pathname));

    document.documentElement.lang = locale;

    const meta = isConsole
      ? resolveConsoleDocumentMetadata(bare, locale)
      : resolveDocumentMetadata(pathname, locale);
    if (!meta) return;

    document.title = meta.title;
    setMetaDescription(meta.description);
  }, [pathname, preferredLocale]);

  return null;
}
