"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ASSET } from "./content";
import { getCampaignsInviterUiCopy } from "./campaigns-inviter-ui-copy";

export function StepsSection() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsInviterUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="mt-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET.text1}
        alt="inviter-banner-text"
        className="mx-auto my-[16px] h-[56px]"
      />
      <div className="flex h-[120px] w-full items-center justify-center gap-[32px] rounded-t-[16px] bg-[var(--sf-cloud-primary-10-solid)] px-[12px]">
        {copy.steps.map((step, index) => (
          <div key={step.num} className="contents">
            <div>
              <span
                className={`mr-[8px] inline-block text-center text-5xl font-extrabold ${
                  step.tone === "primary"
                    ? "text-[var(--sf-cloud-primary)]"
                    : "text-slate-800"
                }`}
              >
                {step.num}
              </span>
              <span
                className={`text-xl font-semibold ${
                  step.tone === "primary"
                    ? "text-[var(--sf-cloud-primary)]"
                    : "text-slate-800"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < copy.steps.length - 1 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ASSET.arrow}
                alt="inviter-arrow"
                className="h-[24px] w-[20px]"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
