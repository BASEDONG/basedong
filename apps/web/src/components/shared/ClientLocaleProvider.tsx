"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LocaleProvider } from "@/components/shared/LocaleProvider";
import { DocumentMetadataSync } from "@/components/shared/DocumentMetadataSync";
import { catalogLocale } from "@/lib/locale";
import { localeFromPathname } from "@/lib/locale-path";

export function ClientLocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = catalogLocale(localeFromPathname(pathname));

  return (
    <LocaleProvider locale={locale}>
      <DocumentMetadataSync />
      {children}
    </LocaleProvider>
  );
}
