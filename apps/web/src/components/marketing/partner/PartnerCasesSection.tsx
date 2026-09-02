"use client";

import Image from "next/image";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getPartnerContent } from "./content";
import { PartnerSectionIntro } from "./PartnerSectionIntro";

function PartnerCaseCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Card
      variant="ghost"
      className="h-[102px] cursor-pointer select-none justify-between rounded-md border-transparent bg-[#F1ECFF] px-5 py-[18px]"
    >
      <div className="flex h-[38px] items-center">
        <Image
          src={image}
          alt=""
          width={200}
          height={38}
          className="h-[38px] w-auto max-w-full object-contain object-left"
        />
      </div>
      <p className="truncate text-[14px] leading-[22px] text-[#667085]">
        {title}
      </p>
    </Card>
  );
}

export function PartnerCasesSection() {
  const { locale } = useLocale();
  const content = getPartnerContent(locale);

  return (
    <div className="bg-white py-[110px]">
      <div className="sf-content">
        <section>
          <GatewayReveal variant="soft">
            <PartnerSectionIntro
              label={content.casesSectionLabel}
              title={content.casesSectionTitle}
              subtitle={content.casesSectionSubtitle}
              titleClassName="text-[#101828]"
              subtitleClassName="mb-[46px] leading-7"
            />
          </GatewayReveal>
          <div className="grid grid-cols-4 gap-x-6 gap-y-[22px] max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1">
            {content.partnerCases.map((item, index) => (
              <GatewayReveal
                key={item.title}
                variant="card"
                delayMs={(index % 4) * 40}
                className="h-full"
              >
                <PartnerCaseCard {...item} />
              </GatewayReveal>
            ))}
          </div>
          <div className="mt-[34px] flex justify-center">
            <MarketingButton
              href={content.moreCasesUrl}
              size="sm"
              showArrow
              className="h-[42px] min-w-0 px-6 text-[14px] shadow-[0_10px_24px_rgba(58,97,255,0.28)] hover:scale-[1.04] hover:shadow-[0_14px_32px_rgba(58,97,255,0.38)]"
            >
              {content.moreCasesLabel}
            </MarketingButton>
          </div>
        </section>
      </div>
    </div>
  );
}
