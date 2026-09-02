"use client";

import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getPartnerContent } from "./content";

export function PartnerCtaSection() {
  const { locale } = useLocale();
  const content = getPartnerContent(locale);

  return (
    <div
      className="w-full bg-cover bg-no-repeat py-[96px] max-[960px]:py-16"
      style={{ backgroundImage: `url(${content.assets.sectionBg})` }}
    >
      <div className="sf-content">
        <GatewayReveal variant="pop" className="h-full">
          <Card
            variant="promo"
            className="relative w-full border-transparent bg-[linear-gradient(110deg,#4AABF0_0%,#5DCDE8_48%,#E848A0_100%)] px-6 py-[98px] text-center shadow-[0_28px_80px_rgba(74,171,240,0.18)] backdrop-blur-none max-[960px]:rounded-[20px] max-[960px]:px-[18px] max-[960px]:py-14"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 28% 23%, rgba(255,255,255,0.18), transparent 34%)",
              }}
            />

            <h2 className="relative z-10 mb-[18px] text-[56px] font-semibold leading-[1.2] tracking-[-0.02em] max-[1280px]:text-[48px] max-[960px]:text-[28px]">
              {content.ctaTitle}
            </h2>

            <p className="relative z-10 mx-auto mb-[34px] max-w-[80%] text-[20px] font-normal leading-[1.7] text-white/90 max-[1280px]:text-lg max-[960px]:text-base">
              {content.ctaSubtitle}
            </p>

            <MarketingButton
              href={content.applyUrl}
              variant="onDark"
              size="sm"
              showArrow
              className="relative z-10 mx-auto min-w-[184px] px-8 text-[16px]"
            >
              {content.ctaButton}
            </MarketingButton>
          </Card>
        </GatewayReveal>
      </div>
    </div>
  );
}
