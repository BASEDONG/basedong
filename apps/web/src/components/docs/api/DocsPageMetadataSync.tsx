"use client";

import { useEffect } from "react";

import type { DocsLocale } from "@/lib/docs-locale";
import { DOCS_HTML_LANG } from "@/lib/docs-locale";

function setMetaDescription(content: string) {
  let el = document.querySelector('meta[name="description"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "description");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function DocsPageMetadataSync({
  docsLocale,
  title,
  description,
}: {
  docsLocale: DocsLocale;
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.documentElement.lang = DOCS_HTML_LANG[docsLocale];
    document.title = title;
    setMetaDescription(description);
  }, [docsLocale, title, description]);

  return null;
}
