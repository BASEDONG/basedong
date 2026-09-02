"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getCampaignsRealNameUiCopy } from "./campaigns-real-name-ui-copy";

function RulesSpeakerIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block text-2xl text-primary"
      height="1em"
      width="1em"
      aria-hidden
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
    </svg>
  );
}

export function RulesSection() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsRealNameUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="mt-8 h-auto w-full items-center rounded-[8px] border border-slate-200 px-14 py-14">
      <div className="flex items-center gap-1">
        <span className="text-xl font-semibold text-primary">{copy.rulesHeading}</span>
        <RulesSpeakerIcon />
      </div>
      <div
        className="real-name-rules-md mt-4 text-slate-800"
        dangerouslySetInnerHTML={{ __html: copy.rulesHtml }}
      />
    </div>
  );
}
