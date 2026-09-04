"use client";

import { SITE_LANGUAGES } from "@/lib/languages";
import { isTargetLocale, type Locale } from "@/lib/locale";
import { CONSOLE_SURFACE } from "../shared/console-ui";
import type { ProfileUiCopy } from "./profile-ui-copy";

type Props = {
  copy: ProfileUiCopy;
  preferredLocale: Locale;
  onLocaleChange: (code: Locale) => void;
};

export function ProfileLanguagePanel({
  copy,
  preferredLocale,
  onLocaleChange,
}: Props) {
  const value = isTargetLocale(preferredLocale)
    ? preferredLocale
    : SITE_LANGUAGES[0]?.code ?? "zh-CN";

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionLanguage}
      </h2>
      <p className="mt-2 text-xs text-slate-500">{copy.languageHint}</p>
      <label className="mt-3 block text-xs text-slate-500">
        {copy.languageLabel}
      </label>
      <select
        className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
        value={value}
        onChange={(e) => onLocaleChange(e.target.value)}
      >
        {SITE_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </section>
  );
}
