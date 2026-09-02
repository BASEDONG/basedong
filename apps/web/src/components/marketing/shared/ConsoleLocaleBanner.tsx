"use client";

import { isConsoleLocale } from "@/lib/locale";
import { getLocaleUiCopy } from "@/lib/locale-ui-copy";
import { useLocale } from "@/components/shared/LocaleProvider";

export function ConsoleLocaleBanner() {
  const { preferredLocale } = useLocale();

  if (!isConsoleLocale(preferredLocale)) {
    return null;
  }

  const copy = getLocaleUiCopy(preferredLocale);

  return (
    <div
      role="status"
      className="border-b border-amber-200/80 bg-amber-50 px-4 py-2.5 text-center text-sm leading-relaxed text-amber-950"
      dir="auto"
    >
      {copy.consoleLocaleMarketingBanner}
    </div>
  );
}
