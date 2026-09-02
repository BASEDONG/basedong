"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getDedicatedApplyUiCopy } from "./dedicated-apply-ui-copy";

export function BetaApplyPanel() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getDedicatedApplyUiCopy(targetLocale),
    [targetLocale],
  );
  const { betaApply: b } = copy;
  const [line1Tail, line2Head] = b.line1Mid.split("\n");

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col gap-2 rounded-lg border border-[rgba(74,171,240,0.2)] bg-[rgba(255,255,255,0.3)] p-6 pr-0">
        <h3 className="text-[20px] font-semibold leading-[28px] tracking-[-0.1px] text-[#4AABF0]">
          {b.title}
        </h3>
        <div className="flex flex-col gap-4">
          <div className="text-[14px] leading-[24px] text-[#334155]">
            {b.line1Prefix}
            <span className="font-bold">{b.orgBold}</span>
            {line1Tail}
            <br />
            {line2Head}
            <span className="font-bold">{b.personalBold}</span>
            {b.line1Suffix}
            <span className="font-bold">{b.orgActionBold}</span>
            {b.line1End}
          </div>
        </div>
      </div>
    </div>
  );
}
