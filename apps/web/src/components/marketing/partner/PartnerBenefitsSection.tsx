"use client";

import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPartnerContent } from "./content";
import type { PartnerBenefit } from "./content-types";
import { PartnerSectionIntro } from "./PartnerSectionIntro";

function BenefitCard({
  num,
  title,
  description,
  icon,
  featured,
}: PartnerBenefit) {
  return (
    <Card
      variant="feature"
      className={cn(
        "relative min-h-[268px] overflow-visible rounded-xl bg-white/45 px-9 pb-[34px] pt-[54px] transition-all duration-500 ease-out hover:-translate-y-[6px] hover:bg-white hover:shadow-[0_24px_70px_rgba(74,171,240,0.12)]",
        featured
          ? "border-[#B99BFF] shadow-[0_12px_40px_rgba(74,171,240,0.08)]"
          : "border-[#D8DEE8]",
      )}
    >
      <div className="absolute -top-[22px] left-[-12px] flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#4AABF0] text-[18px] font-bold text-white shadow-[0_10px_24px_rgba(74,171,240,0.32)]">
        {num}
      </div>
      <MarketingIconBadge
        icon={icon}
        size="md"
        bg="#EEF6FE"
        className="mb-8 transition-transform duration-500 group-hover:scale-110"
      />
      <h3 className="mb-[18px] text-[17px] font-bold leading-[26px] text-[#172033]">
        {title}
      </h3>
      <p className="text-[14px] font-medium leading-[25px] text-[#667085]">
        {description}
      </p>
    </Card>
  );
}

export function PartnerBenefitsSection() {
  const { locale } = useLocale();
  const content = getPartnerContent(locale);

  return (
    <div
      className="w-full bg-cover bg-no-repeat py-20"
      style={{ backgroundImage: `url(${content.assets.sectionBg})` }}
    >
      <div className="sf-content">
        <section>
          <PartnerSectionIntro
            label={content.benefitsSectionLabel}
            title={content.benefitsSectionTitle}
            subtitle={content.benefitsSectionSubtitle}
            titleClassName="text-[#101828]"
            subtitleClassName="leading-7"
          />
          <div className="mt-[52px] grid grid-cols-4 gap-[36px] max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1">
            {content.partnerBenefits.map((benefit, index) => (
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
