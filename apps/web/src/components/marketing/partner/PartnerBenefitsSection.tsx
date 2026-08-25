"use client";

import type { ComponentType } from "react";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { partnerBenefits, PARTNER_ASSETS } from "./content";
import type { PartnerBenefit } from "./content";
import {
  LayersIcon,
  ShieldIcon,
  TrendingUpIcon,
  WrenchIcon,
} from "./icons";
import { PartnerSectionIntro } from "./PartnerSectionIntro";
import { cn } from "@/lib/utils";

const benefitIcons: Record<
  PartnerBenefit["icon"],
  ComponentType<{ className?: string }>
> = {
  layers: LayersIcon,
  wrench: WrenchIcon,
  trending: TrendingUpIcon,
  shield: ShieldIcon,
};

function BenefitCard({
  num,
  title,
  description,
  icon,
  featured,
}: PartnerBenefit) {
  const Icon = benefitIcons[icon];

  return (
    <article
      className={cn(
        "group relative min-h-[268px] rounded-[12px] border bg-white/45 px-9 pb-[34px] pt-[54px] transition-all duration-500 ease-out hover:-translate-y-[6px] hover:bg-white hover:shadow-[0_24px_70px_rgba(74,171,240,0.12)]",
        featured
          ? "border-[#B99BFF] shadow-[0_12px_40px_rgba(74,171,240,0.08)]"
          : "border-[#D8DEE8]",
      )}
    >
      <div className="absolute -top-[22px] left-[-12px] flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#4AABF0] text-[18px] font-bold text-white shadow-[0_10px_24px_rgba(74,171,240,0.32)]">
        {num}
      </div>
      <Icon className="mb-8 text-2xl text-[#7A3CFF] transition-transform duration-500 group-hover:scale-110" />
      <h3 className="mb-[18px] text-[17px] font-bold leading-[26px] text-[#172033]">
        {title}
      </h3>
      <p className="text-[14px] font-medium leading-[25px] text-[#667085]">
        {description}
      </p>
    </article>
  );
}

export function PartnerBenefitsSection() {
  return (
    <div
      className="w-full bg-cover bg-no-repeat px-6 py-20 max-[960px]:px-4"
      style={{ backgroundImage: `url(${PARTNER_ASSETS.sectionBg})` }}
    >
      <div className="mx-auto max-w-[1440px] px-6 max-[1180px]:max-w-full max-[960px]:px-0">
        <section>
          <PartnerSectionIntro
            label="PARTNER BENEFITS"
            title="伙伴权益"
            subtitle="根据合作类型，平台将提供多种资源支持，助力合作伙伴快速成长。"
            titleClassName="text-[#101828]"
            subtitleClassName="leading-7"
          />
          <div className="mt-[52px] grid grid-cols-4 gap-[36px] max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1">
            {partnerBenefits.map((benefit, index) => (
              <GatewayReveal
                key={benefit.num}
                variant="card"
                delayMs={index * 80}
                className="h-full"
              >
                <BenefitCard {...benefit} />
              </GatewayReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
