"use client";

import type { LucideIcon } from "lucide-react";
import { Code, Database, Layers, Radio, Users } from "lucide-react";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getPartnerContent } from "./content";

const floatingIcons: {
  icon: LucideIcon;
  className: string;
  delay: string;
}[] = [
  {
    icon: Users,
    className:
      "absolute left-[14%] top-[39%] max-[1180px]:left-[5%] max-[1180px]:top-[24%] max-[960px]:left-[8%] max-[960px]:top-[16%]",
    delay: "0s",
  },
  {
    icon: Code,
    className:
      "absolute left-[34%] top-[54%] max-[1180px]:left-[8%] max-[1180px]:top-[64%] max-[960px]:left-[10%] max-[960px]:top-[76%]",
    delay: "1.2s",
  },
  {
    icon: Radio,
    className:
      "absolute right-[20%] top-[50%] max-[1180px]:right-[5%] max-[1180px]:top-[24%] max-[960px]:right-[8%] max-[960px]:top-[16%]",
    delay: "0.6s",
  },
  {
    icon: Layers,
    className:
      "absolute right-[34%] top-[60%] max-[1180px]:right-[8%] max-[1180px]:top-[64%] max-[960px]:right-[10%] max-[960px]:top-[76%]",
    delay: "1.8s",
  },
  {
    icon: Database,
    className:
      "absolute left-[48%] top-[78%] -translate-x-1/2 max-[1180px]:top-[18%] max-[960px]:hidden",
    delay: "2.4s",
  },
];

function FloatingBadge({
  icon: Icon,
  className,
  delay,
}: {
  icon: LucideIcon;
  className: string;
  delay: string;
}) {
  return (
    <div className={className}>
      <div
        className="partner-hero-float flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#FCE4EE] shadow-[0_14px_36px_rgba(232,107,154,0.18)]"
        style={{ animationDelay: delay }}
      >
        <Icon className="h-6 w-6 text-[#E86B9A]" strokeWidth={2} aria-hidden />
      </div>
    </div>
  );
}

export function PartnerHero() {
  const { locale } = useLocale();
  const content = getPartnerContent(locale);

  return (
    <div className="relative flex h-[818px] w-full items-center justify-center overflow-hidden">
      <HeroSlideBackground {...content.heroBackground} />
      <section className="sf-content relative flex h-full flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          {floatingIcons.map((item) => (
            <FloatingBadge key={item.className} {...item} />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-[40px] max-[960px]:gap-[32px]">
          <GatewayReveal variant="soft">
            <h1 className="text-[64px] font-bold leading-[1.18] text-black max-[1180px]:text-[56px] max-[960px]:text-center max-[960px]:text-[42px]">
              {content.heroBrandName}
              <span className="relative inline-block bg-[linear-gradient(180deg,#E86B9A_0%,#D63D8E_100%)] bg-clip-text text-transparent">
                {content.heroTitleAccent}
              </span>
            </h1>
          </GatewayReveal>

          <GatewayReveal variant="soft" delayMs={80}>
            <p className="max-w-[786px] text-center text-[20px] leading-[1.8] text-slate-600 max-[1180px]:text-lg max-[960px]:text-base">
              {content.heroSubtitle}
            </p>
          </GatewayReveal>

          <GatewayReveal variant="pop" delayMs={140}>
            <MarketingButton
              href={content.applyUrl}
              size="lg"
              showArrow
              className="w-[188px] font-semibold max-[1180px]:scale-90 max-[960px]:h-14 max-[960px]:w-[164px] max-[960px]:text-[20px]"
            >
              {content.heroCta}
            </MarketingButton>
          </GatewayReveal>
        </div>
      </section>
    </div>
  );
}
