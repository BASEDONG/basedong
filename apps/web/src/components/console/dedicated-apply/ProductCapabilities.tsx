"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { capabilityCardStyles } from "./content";
import { getDedicatedApplyUiCopy } from "./dedicated-apply-ui-copy";
import { cn } from "@/lib/utils";

export function ProductCapabilities() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getDedicatedApplyUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-[24px] font-semibold leading-[32px] tracking-[-0.144px] text-[#1e293b]">
        {copy.capabilities.heading}
      </p>
      <div className="grid grid-cols-2 gap-10">
        {copy.capabilities.cards.map((card, index) => {
          const style = capabilityCardStyles[index];
          return (
            <div
              key={card.title}
              className={cn(
                "flex flex-col gap-4 rounded-[12px] p-6",
                style.bg,
                style.padRight && "pr-0",
              )}
            >
              <p className="text-[20px] font-semibold leading-[28px] tracking-[-0.1px] text-[#1e293b]">
                {card.title}
              </p>
              <ul className="list-disc text-[16px] font-normal leading-[28px] text-[#475569]">
                {card.items.map((item) => (
                  <li key={item} className="ms-6 leading-[28px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="text-right text-sm font-semibold text-slate-500">
        {copy.capabilities.footnote}
      </div>
    </div>
  );
}
