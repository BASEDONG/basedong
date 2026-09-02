"use client";

import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getPartnerContent } from "./content";
import type { PartnershipMode } from "./content-types";
import { PartnerSectionIntro } from "./PartnerSectionIntro";

function PartnershipCard({
  audience,
  title,
  icon,
  targetLabel,
  target,
  methodLabel,
  method,
  incentives,
  coreIncentiveLabel,
}: PartnershipMode & { coreIncentiveLabel: string }) {
  return (
    <Card
      variant="feature"
      interactive="lift"
      className="relative h-[527px] min-h-[420px] rounded-[14px] border-[#E6D9FF] bg-white px-8 py-8"
    >
      <div className="absolute left-8 right-8 top-0 h-1 rounded-full bg-[#4AABF0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(74,171,240,0.12)_0%,rgba(255,255,255,0.96)_42%,rgba(255,255,255,1)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-[28px] flex items-center gap-[14px]">
          <MarketingIconBadge icon={icon} size="lg" bg="#EEF6FE" />
          <p className="text-[15px] font-bold text-[#4AABF0]">{audience}</p>
        </div>

        <h3 className="mb-[26px] text-[22px] font-bold">{title}</h3>

        <div className="text-[14px] leading-6 text-[#667085]">
          <div className="mb-4">
            <p className="mb-1 font-bold text-[#111827]">{targetLabel}</p>
            <p className="min-h-12 max-[960px]:min-h-0">{target}</p>
          </div>
          <div className="mb-4">
            <p className="mb-1 font-bold text-[#111827]">{methodLabel}</p>
            <p className="min-h-[72px] max-[960px]:min-h-0">{method}</p>
          </div>
          <div>
            <p className="mb-1 font-bold text-[#111827]">{coreIncentiveLabel}</p>
            <div className="space-y-2">
              {incentives.map((item) => (
                <p key={item.label}>
                  <span className="font-bold text-[#4AABF0]">{item.label}</span>
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PartnershipModesSection() {
  const { locale } = useLocale();
  const content = getPartnerContent(locale);

  return (
    <div className="bg-white py-[110px]">
      <div className="sf-content">
        <section>
          <PartnerSectionIntro
            label={content.modesSectionLabel}
            title={content.modesSectionTitle}
            subtitle={content.modesSectionSubtitle}
          />
          <div className="mt-[40px] grid grid-cols-3 gap-[36px] max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1">
            {content.partnershipModes.map((mode, index) => (
              <GatewayReveal
                key={mode.title}
                variant="card"
                delayMs={index * 60}
                className="h-full"
              >
                <PartnershipCard
                  {...mode}
                  coreIncentiveLabel={content.coreIncentiveLabel}
                />
              </GatewayReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
