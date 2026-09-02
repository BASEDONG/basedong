"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { ASSET } from "./content";
import { getDedicatedApplyUiCopy } from "./dedicated-apply-ui-copy";

export function ApplyHero() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getDedicatedApplyUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <Card
      variant="surface"
      className="relative h-[200px] items-center justify-center rounded-lg border-[rgba(74,171,240,0.2)] px-16"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSET.hero} alt="" className="absolute left-0" />
      <h1 className="relative z-10 whitespace-nowrap text-[36px] font-extrabold leading-[48px] tracking-[-0.58px] text-[#1e293b]">
        {copy.hero.titlePrefix}
        <span className="text-[#4AABF0]">{copy.hero.titleHighlight}</span>🔥
      </h1>
      <p className="relative z-10 mt-4 flex w-[500px] justify-between text-center text-[16px] leading-[28px] text-[#475569]">
        {copy.heroFeatures.flatMap((label, i) =>
          i === 0
            ? [<span key={label}>{label}</span>]
            : [
                <span key={`sep-${label}`} className="text-[#94a3b8]">
                  |
                </span>,
                <span key={label}>{label}</span>,
              ],
        )}
      </p>
    </Card>
  );
}
