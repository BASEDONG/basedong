"use client";

import { Check } from "lucide-react";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function PartnershipSection() {
  const { locale } = useLocale();
  const {
    consultUrl,
    partnershipTitle,
    partnershipBenefitsHeading,
    partnershipCards,
  } = getTokenFactoryContent(locale);

  return (
    <section className="w-full bg-white py-[110px]">
      <h2 className="mb-8 bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px]">
        {partnershipTitle}
      </h2>

      <div className="sf-content">
        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {partnershipCards.map((card) => (
            <Card
              key={card.title}
              variant="feature"
              className="relative rounded-[20px] border-[#D7DEE8] bg-white px-[38px] pb-[30px] pt-[34px] max-[1280px]:px-7 max-[1280px]:pb-6 max-[1280px]:pt-7 max-md:px-[22px] max-md:pb-5 max-md:pt-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[20px] bg-[linear-gradient(180deg,rgba(124,58,237,0.02)_0%,rgba(124,58,237,0.01)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="relative z-[1]">
                <h3 className="mb-2 flex items-center gap-2 text-[24px] font-semibold leading-[30px] text-[#1F2937]">
                  <MarketingIconBadge
                    icon={card.icon}
                    size="sm"
                    bg={card.iconBg}
                  />
                  <span>{card.title}</span>
                </h3>
                <p className="mb-10 text-[18px] leading-[30px] text-slate-500 max-[1280px]:text-[16px] max-[1280px]:leading-7 max-md:text-[14px] max-md:leading-[26px]">
                  {card.description}
                </p>
                <div>
                  <p className="text-[16px] font-semibold leading-6 text-slate-400">
                    {card.partnerLabel}
                  </p>
                  <p className="mt-2.5 text-[18px] leading-[30px] text-slate-500">
                    {card.partners}
                  </p>
                </div>
                <div className="my-7 h-px w-full bg-[#E9EEF5]" />
                <div>
                  <h4 className="text-[20px] font-semibold leading-[26px] text-slate-800">
                    {partnershipBenefitsHeading}
                  </h4>
                  <div className="mt-[18px] space-y-3.5">
                    {card.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2.5">
                        <span className="mt-[5px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#4AABF01A]">
                          <Check className="h-2.5 w-2.5 text-[#4AABF0]" strokeWidth={2.5} aria-hidden />
                        </span>
                        <p className="text-[16px] leading-6 text-slate-600 max-md:text-[14px]">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <MarketingButton
                  href={consultUrl}
                  size="sm"
                  className="mt-8 h-[52px] min-w-0 px-6 text-[16px] font-semibold"
                >
                  {card.cta}
                </MarketingButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
