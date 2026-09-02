"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { gettingStartedIcons } from "./content";
import { getDedicatedApplyUiCopy } from "./dedicated-apply-ui-copy";
import { getStepIcon } from "./icons";

const CONNECTOR_STYLE = {
  background:
    "linear-gradient(70deg, rgba(74, 171, 240), 0) 0%, rgba(74, 171, 240), 0.2) 100%)",
} as const;

export function GettingStarted() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getDedicatedApplyUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[24px] font-semibold leading-[32px] tracking-[-0.144px] text-[#1e293b]">
        {copy.gettingStarted.heading}
      </p>
      <p className="min-w-full text-[16px] font-normal leading-[28px] text-[#1e293b]">
        {copy.gettingStarted.subtitle}
      </p>
      <div className="flex w-full gap-4">
        <div className="flex shrink-0 flex-col items-center">
          {[1, 2, 3].map((num, index) => (
            <div key={num} className="contents">
              <div className="flex size-[32px] items-center justify-center rounded-[8px] bg-[#4AABF0]">
                <span className="text-[14px] font-medium leading-normal text-white">
                  {num}
                </span>
              </div>
              {index < 2 ? (
                <div
                  className="flex h-[78px] w-[1px] items-center justify-center"
                  style={CONNECTOR_STYLE}
                />
              ) : (
                <div
                  className="flex h-[50px] w-[1px] items-center justify-center"
                  style={CONNECTOR_STYLE}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6">
          {copy.gettingStarted.steps.map((step, index) => {
            const Icon = getStepIcon(gettingStartedIcons[index]);
            return (
              <Card
                key={step.title}
                variant="surface"
                interactive="outline"
                className="cursor-pointer flex-row gap-4 rounded-lg border-[#e2e8f0] bg-[rgba(255,255,255,0.3)] p-4 hover:border-[rgba(74,171,240,0.5)] hover:shadow-[0px_4px_4px_0px_rgba(74,171,240,0.1)]"
              >
                <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[rgba(74,171,240,0.1)]">
                  <Icon className="text-[#4AABF0]" width={16} height={16} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-[16px] font-medium leading-[24px] text-[#1e293b]">
                    {step.title}
                  </p>
                  <p className="text-[14px] leading-[24px] text-[#64748b]">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
