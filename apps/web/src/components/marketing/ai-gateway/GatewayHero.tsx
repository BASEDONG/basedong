"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  GitBranch,
  KeyRound,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CONSULT_URL, heroFloatPills, heroTags } from "./content";
import { GatewayReveal } from "./GatewayReveal";

const floatIconMap = {
  key: KeyRound,
  route: Route,
  activity: Activity,
  shield: ShieldCheck,
} as const;

export function GatewayHero() {
  return (
    <div
      className="h-[818px] w-full bg-cover bg-no-repeat max-[1180px]:h-auto max-[1180px]:min-h-[780px]"
      style={{
        backgroundImage:
          "url(/assets/marketing/ai-gateway/images/bg-section-3.svg)",
      }}
    >
      <div className="relative h-full overflow-hidden max-[1180px]:py-10">
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 max-[1180px]:flex-col max-[1180px]:justify-center max-[1180px]:gap-[54px]">
          <section className="w-[610px] shrink-0 max-[1180px]:w-full max-[1180px]:text-center">
            <GatewayReveal variant="soft" delayMs={40}>
              <div className="mb-[22px] inline-flex h-[39px] items-center gap-2 rounded-full bg-[#EEF6FE]/70 px-[18px] text-[16px] font-semibold text-[#4AABF0] shadow-[0_8px_24px_rgba(74,171,240,0.08)]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                新一代企业 AI 基础设施
              </div>
            </GatewayReveal>

            <GatewayReveal variant="soft" delayMs={120}>
              <h1 className="mb-[42px] text-[56px] font-bold leading-[1.12] tracking-[-1px] text-[#6428F4] max-[1280px]:text-[48px] max-[960px]:mb-7 max-[960px]:text-[38px]">
                私有化大模型服务网关
              </h1>
            </GatewayReveal>

            <GatewayReveal variant="soft" delayMs={200}>
              <div className="mb-[42px] flex items-center gap-[30px] text-[18px] text-[#556070] max-[1180px]:justify-center max-[960px]:flex-wrap max-[960px]:gap-4 max-[600px]:text-[14px]">
                {heroTags.map((tag, index) => (
                  <span
                    key={tag}
                    className="flex items-center gap-[30px] max-[960px]:gap-4"
                  >
                    <span>{tag}</span>
                    {index < heroTags.length - 1 ? (
                      <i
                        aria-hidden="true"
                        className="inline-block h-[22px] w-px bg-[#9AA6B8]"
                      />
                    ) : null}
                  </span>
                ))}
              </div>
            </GatewayReveal>

            <GatewayReveal variant="soft" delayMs={280}>
              <Link
                href={CONSULT_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-[62px] items-center gap-[18px] rounded-lg bg-[linear-gradient(90deg,#2D235F_0%,#742DFF_100%)] px-6 text-[24px] font-bold text-white shadow-[0_18px_32px_rgba(74,171,240,0.22)] transition-all duration-300 ease-out hover:shadow-[0_22px_42px_rgba(74,171,240,0.32)]"
              >
                预约咨询
                <ArrowRight
                  className="h-[30px] w-[30px] transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </GatewayReveal>
          </section>

          <GatewayReveal
            variant="slide"
            delayMs={180}
            className="relative mx-auto h-[470px] w-full max-w-[640px] overflow-visible max-[1180px]:h-[430px] max-[960px]:h-[360px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-1/2 h-28 -translate-y-1/2 rounded-full bg-[#4AABF0]/[0.07] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute left-[18%] right-[18%] top-[20%] h-[60%] rounded-full border border-[#4AABF033]"
            />
            <div
              aria-hidden="true"
              className="absolute left-[28%] right-[28%] top-[9%] h-[82%] rounded-full border border-slate-300"
            />
            <GitBranch
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-[#4AABF0]/10 md:h-80 md:w-80"
              strokeWidth={0.7}
            />

            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4AABF0]/20 bg-white/90 shadow-[0_18px_45px_rgba(74,171,240,0.20)] backdrop-blur">
              <div className="absolute inset-2 rounded-full bg-[#F3EDFF]" />
              <div className="absolute inset-5 rounded-full border border-[#4AABF0]/15" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <BrainCircuit className="h-10 w-10 text-[#4AABF0]" />
                <span className="text-sm font-bold text-[#111827] md:text-[20px]">
                  AI Gateway
                </span>
                <span className="rounded-full bg-[#4AABF0]/[0.08] px-3 py-1 text-[11px] font-semibold text-[#4AABF0]">
                  统一调度
                </span>
              </div>
            </div>

            {heroFloatPills.map((pill) => {
              const Icon = floatIconMap[pill.icon];
              return (
                <div key={pill.label} className={`absolute ${pill.position}`}>
                  <div className="animate-float flex min-w-20 items-center gap-2 rounded-full border border-[#E5E7EB]/80 bg-white/90 px-3 py-2 backdrop-blur">
                    <Icon className="h-4 w-4 text-[#4AABF0]" />
                    <span className="text-xs font-semibold text-[#111827]">
                      {pill.label}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="absolute left-[12%] top-[43%] flex h-[38px] items-center rounded-full bg-white/90 px-[14px] shadow-[0_12px_26px_rgba(58,49,118,0.10)] backdrop-blur">
              <span className="text-xs font-semibold text-[#7A8190]">
                企业应用 / Agent
              </span>
            </div>
            <div className="absolute right-[10%] top-[43%] flex h-[38px] items-center rounded-full bg-white/90 px-[14px] shadow-[0_12px_26px_rgba(58,49,118,0.10)] backdrop-blur max-[600px]:right-[5%]">
              <span className="text-xs font-semibold text-[#7A8190]">
                多模型服务
              </span>
            </div>
          </GatewayReveal>
        </div>
      </div>
    </div>
  );
}
