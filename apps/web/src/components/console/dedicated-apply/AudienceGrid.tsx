"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { audienceIcons } from "./content";
import { getDedicatedApplyUiCopy } from "./dedicated-apply-ui-copy";
import { getAudienceIcon } from "./icons";

export function AudienceGrid() {
  const { targetLocale } = useLocale();
  const copy = useMemo(
    () => getDedicatedApplyUiCopy(targetLocale),
    [targetLocale],
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[24px] font-semibold leading-[32px] tracking-[-0.14px] text-[#1e293b]">
        {copy.audience.heading}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {copy.audience.cards.map((card, index) => {
          const Icon = getAudienceIcon(audienceIcons[index]);
          return (
            <Card
              key={card.title}
              variant="surface"
              className="flex-row gap-4 rounded-lg border-[#e2e8f0] bg-[rgba(255,255,255,0.3)] p-4"
            >
              <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(74,171,240,0.1)]">
                <Icon className="text-[#4AABF0]" />
              </div>
              <div className="flex flex-col gap-1 leading-[24px]">
                <p className="text-[16px] font-medium text-[#1e293b]">
                  {card.title}
                </p>
                <p className="text-[14px] text-[#64748b]">{card.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
