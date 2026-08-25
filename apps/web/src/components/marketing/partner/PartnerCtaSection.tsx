"use client";

import Link from "next/link";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { APPLY_URL, PARTNER_ASSETS } from "./content";
import { ArrowRightIcon } from "./icons";

export function PartnerCtaSection() {
  return (
    <div
      className="w-full bg-cover bg-no-repeat px-6 py-[96px] max-[960px]:px-4 max-[960px]:py-16"
      style={{ backgroundImage: `url(${PARTNER_ASSETS.sectionBg})` }}
    >
      <div className="mx-auto max-w-[1440px]">
        <GatewayReveal variant="pop" className="h-full">
          <section className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[linear-gradient(110deg,#4AABF0_0%,#5DCDE8_48%,#E848A0_100%)] px-6 py-[98px] text-center text-white shadow-[0_28px_80px_rgba(74,171,240,0.18)] max-[960px]:rounded-[20px] max-[960px]:px-[18px] max-[960px]:py-14">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 28% 23%, rgba(255,255,255,0.18), transparent 34%)",
              }}
            />

            <h2 className="relative z-10 mb-[18px] text-[56px] font-semibold leading-[1.2] tracking-[-0.02em] max-[1280px]:text-[48px] max-[960px]:text-[28px]">
              加入硅基流动生态共建计划
            </h2>

            <p className="relative z-10 mx-auto mb-[34px] max-w-[80%] text-[20px] font-normal leading-[1.7] text-white/90 max-[1280px]:text-lg max-[960px]:text-base">
              与开发者、应用团队和研究机构一起，共同推动 AI 技术落地。
            </p>

            <Link
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative z-10 mx-auto inline-flex h-[48px] min-w-[184px] items-center justify-center gap-[12px] rounded-full bg-white px-8 text-[16px] font-semibold text-[#4AABF0] shadow-[0_10px_24px_rgba(58,120,180,0.22)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(58,120,180,0.28)]"
            >
              提交合作申请
              <ArrowRightIcon
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </section>
        </GatewayReveal>
      </div>
    </div>
  );
}
