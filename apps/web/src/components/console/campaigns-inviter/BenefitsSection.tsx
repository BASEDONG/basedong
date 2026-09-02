"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ASSET } from "./content";
import { getCampaignsInviterUiCopy } from "./campaigns-inviter-ui-copy";

const BENEFIT_ICONS = [ASSET.icon1, ASSET.icon2, ASSET.icon3] as const;

export function BenefitsSection() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getCampaignsInviterUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="mt-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET.text2}
        alt="inviter-banner-text"
        className="mx-auto mb-[20px] h-[56px]"
      />
      <div className="flex justify-center gap-[40px]">
        {copy.benefitCards.map((card, index) => (
          <div
            key={card.title}
            className="h-[240px] w-[33%] rounded-[16px] border border-[rgb(224,208,251)]"
            style={{
              backgroundImage: `url(${ASSET.cardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center pt-[48px]">
              <div className="mb-[16px] flex size-[72px] items-center justify-center rounded-[8px] bg-[var(--sf-cloud-primary-10-solid)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BENEFIT_ICONS[index]} alt="inviter-banner-img" />
              </div>
              <div className="text-xl font-semibold text-[rgb(88,28,135)]">
                {card.title}
              </div>
              <div className="text-slate-500">
                {card.multiLine ? (
                  <div>
                    <div>{card.lines[0]}</div>
                    <div className="flex justify-center text-xs text-slate-500">
                      {card.lines[1]}
                    </div>
                  </div>
                ) : (
                  card.lines[0]
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
