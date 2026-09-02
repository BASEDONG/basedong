import type { Metadata } from "next";
import { SOURCE_LOCALE } from "@/lib/locale";

type PageMeta = { title: string; description: string };

/** Build-time metadata for `output: "export"` (defaults to source locale). */
export function staticPageMetadata(
  resolve: (locale: string) => PageMeta,
  locale: string = SOURCE_LOCALE,
): Metadata {
  const meta = resolve(locale);
  return { title: meta.title, description: meta.description };
}
