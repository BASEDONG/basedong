"use client";

import Link from "next/link";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { APPLY_URL, PARTNER_ASSETS } from "./content";
import {
  ArrowRightIcon,
  BroadcastIcon,
  HeroCodeIcon,
  HeroDatabaseIcon,
  HeroUsersIcon,
  LayersIcon,
} from "./icons";
import { cn } from "@/lib/utils";

const floatingIcons = [
  {
    icon: HeroUsersIcon,
    className:
      "absolute left-[14%] top-[39%] max-[1180px]:left-[5%] max-[1180px]:top-[24%] max-[960px]:left-[8%] max-[960px]:top-[16%]",
    delay: "0s",
  },
  {
    icon: HeroCodeIcon,
    className:
      "absolute left-[34%] top-[54%] max-[1180px]:left-[8%] max-[1180px]:top-[64%] max-[960px]:left-[10%] max-[960px]:top-[76%]",
    delay: "1.2s",
  },
  {
    icon: BroadcastIcon,
    className:
      "absolute right-[20%] top-[50%] max-[1180px]:right-[5%] max-[1180px]:top-[24%] max-[960px]:right-[8%] max-[960px]:top-[16%]",
    delay: "0.6s",
    strokeIcon: true,
  },
  {
    icon: LayersIcon,
    className:
      "absolute right-[34%] top-[60%] max-[1180px]:right-[8%] max-[1180px]:top-[64%] max-[960px]:right-[10%] max-[960px]:top-[76%]",
    delay: "1.8s",
    strokeIcon: true,
  },
  {
    icon: HeroDatabaseIcon,
    className:
      "absolute left-[48%] top-[78%] -translate-x-1/2 max-[1180px]:top-[18%] max-[960px]:hidden",
    delay: "2.4s",
  },
] as const;

function FloatingBadge({
  icon: Icon,
  className,
  delay,
  strokeIcon = false,
}: {
  icon: (typeof floatingIcons)[number]["icon"];
  className: string;
  delay: string;
  strokeIcon?: boolean;
}) {
  return (
    <div className={className}>
      <div
        className="partner-hero-float flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#D7E4FF] shadow-[0_14px_36px_rgba(74,171,240,0.14)]"
        style={{ animationDelay: delay }}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          {strokeIcon ? (
            <Icon className="text-[#4AABF0]" size={24} />
          ) : (
            <Icon />
          )}
        </div>
      </div>
    </div>
  );
}

export function PartnerHero() {
  return (
    <div
      className="flex h-[818px] w-full items-center justify-center bg-cover bg-[center_bottom] bg-no-repeat px-6 max-[960px]:px-4"
      style={{ backgroundImage: `url(${PARTNER_ASSETS.heroBg})` }}
    >
      <section className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          {floatingIcons.map((item) => (
            <FloatingBadge key={item.className} {...item} />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-[40px] max-[960px]:gap-[32px]">
          <GatewayReveal variant="soft">
            <h1 className="text-[64px] font-bold leading-[1.18] text-black max-[1180px]:text-[56px] max-[960px]:text-center max-[960px]:text-[42px]">
              硅基流动
              <span className="relative inline-block bg-[linear-gradient(180deg,#4AABF0_0%,#E848A0_100%)] bg-clip-text text-transparent">
                生态共建计划
              </span>
            </h1>
          </GatewayReveal>

          <GatewayReveal variant="soft" delayMs={80}>
            <p className="max-w-[786px] text-center text-[20px] leading-[1.8] text-slate-600 max-[1180px]:text-lg max-[960px]:text-base">
              依托开放稳定高效的大模型 API
              能力，链接模型厂商与创新应用，与全球伙伴共建开放、共赢的 AI
              生态价值共同体。
            </p>
          </GatewayReveal>

          <GatewayReveal variant="pop" delayMs={140}>
            <Link
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group flex h-16 w-[188px] items-center justify-center rounded-[10px]",
                "bd-gradient-bg text-[24px] font-semibold text-white",
                "max-[1180px]:scale-90 max-[960px]:h-14 max-[960px]:w-[164px] max-[960px]:text-[20px]",
              )}
            >
              <span>立即加入</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon
                  size={20}
                  className="max-[960px]:h-4 max-[960px]:w-4"
                />
              </span>
            </Link>
          </GatewayReveal>
        </div>
      </section>
    </div>
  );
}
