"use client";

import type { ComponentType } from "react";
import { GatewayReveal } from "@/components/marketing/ai-gateway/GatewayReveal";
import { partnershipModes } from "./content";
import {
  BroadcastIcon,
  CodeIcon,
  DatabaseIcon,
  GraduationIcon,
  LayersIcon,
  UsersIcon,
} from "./icons";
import type { PartnershipMode } from "./content";
import { PartnerSectionIntro } from "./PartnerSectionIntro";

const modeIcons: Record<
  PartnershipMode["icon"],
  ComponentType<{ className?: string }>
> = {
  users: UsersIcon,
  code: CodeIcon,
  broadcast: BroadcastIcon,
  layers: LayersIcon,
  database: DatabaseIcon,
  graduation: GraduationIcon,
};

function PartnershipCard({
  audience,
  title,
  icon,
  targetLabel,
  target,
  methodLabel,
  method,
  incentives,
}: PartnershipMode) {
  const Icon = modeIcons[icon];

  return (
    <article className="group relative h-[527px] min-h-[420px] overflow-hidden rounded-[14px] border border-[#E6D9FF] bg-white px-8 py-8 transition-all duration-300 hover:shadow-[0_14px_40px_rgba(74,171,240,0.12)]">
      <div className="absolute left-8 right-8 top-0 h-1 rounded-full bg-[#4AABF0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(74,171,240,0.12)_0%,rgba(255,255,255,0.96)_42%,rgba(255,255,255,1)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-[28px] flex items-center gap-[14px]">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#EEF6FE] text-[#4AABF0]">
            <Icon />
          </div>
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
            <p className="mb-1 font-bold text-[#111827]">核心激励</p>
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
    </article>
  );
}

export function PartnershipModesSection() {
  return (
    <div className="bg-white py-[110px]">
      <div className="mx-auto max-w-[1440px] px-6 max-[1180px]:max-w-full max-[960px]:px-4">
        <section>
          <PartnerSectionIntro
            label="PARTNERSHIP"
            title="灵活多样的合作模式"
            subtitle="面向不同类型的伙伴，提供多种合作路径。"
          />
          <div className="mt-[40px] grid grid-cols-3 gap-[36px] max-[1280px]:grid-cols-2 max-[960px]:grid-cols-1">
            {partnershipModes.map((mode, index) => (
              <GatewayReveal
                key={mode.title}
                variant="card"
                delayMs={index * 60}
                className="h-full"
              >
                <PartnershipCard {...mode} />
              </GatewayReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
