"use client";

import Image from "next/image";
import { useState } from "react";
import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import { IndustryIllustration } from "@/components/marketing/home/IndustryIllustration";
import { cn } from "@/lib/utils";
import type { EnterpriseScenario } from "./content";
import { scenarios } from "./content";

function ScenarioPanel({
  item,
  expanded,
  onActivate,
}: {
  item: EnterpriseScenario;
  expanded: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      className={cn(
        "relative h-full shrink-0 cursor-default overflow-hidden border-r border-white/60 transition-[width] duration-500 ease-out last:border-r-0",
        expanded ? "w-[420px]" : "w-[140px]",
      )}
      onMouseEnter={onActivate}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate();
      }}
    >
      <CardGradientBackground {...item.background} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-[0.18] md:opacity-[0.2]">
        <IndustryIllustration
          variant={item.illustration}
          palette={item.background}
        />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center px-4 py-8">
        {expanded ? (
          <div className="max-w-[360px]">
            <h3
              className="mb-4 text-[24px] font-bold text-[#161722] md:text-[28px]"
              style={{ color: item.background.accent }}
            >
              {item.title}
            </h3>
            <p className="text-[15px] leading-7 text-[#57627f]">
              {item.description}
            </p>
          </div>
        ) : (
          <h3 className="text-[16px] font-semibold text-[#161722] [writing-mode:vertical-rl] md:text-[18px]">
            {item.tab}
          </h3>
        )}
      </div>
    </div>
  );
}

export function ApplicationScenariosSection() {
  const [active, setActive] = useState(0);
  const activeScenario = scenarios[active];

  return (
    <section className="mb-[110px] w-full pb-[20px]">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        行业与场景
      </h3>

      {/* Desktop accordion */}
      <div className="mx-auto hidden h-[406px] max-w-[1397px] overflow-hidden rounded-[8px] border border-[#eceef3] md:flex">
        {scenarios.map((item, i) => (
          <ScenarioPanel
            key={item.id}
            item={item}
            expanded={i === active}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      {/* Active scenario detail — desktop */}
      <div className="mx-auto mt-8 hidden max-w-[1397px] px-3.5 md:block">
        <div className="flex items-start gap-12 rounded-[12px] border border-[#eceef3] p-8 lg:p-12">
          <div className="min-w-0 flex-1">
            <h4
              className="mb-6 text-[28px] font-bold text-[#161722]"
              style={{ color: activeScenario.background.accent }}
            >
              {activeScenario.title}
            </h4>
            <p className="mb-8 text-[16px] leading-8 text-[#57627f]">
              {activeScenario.description}
            </p>
            <div className="mb-4 text-[20px] font-semibold text-[#161722]">
              落地价值
            </div>
            <ul className="space-y-3">
              {activeScenario.advantages.map((item) => (
                <li key={item} className="flex gap-2 text-[15px] leading-7 text-[#57627f]">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: activeScenario.background.accent }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full max-w-[480px] shrink-0 items-center justify-center">
            <Image
              src={activeScenario.image}
              alt=""
              width={480}
              height={300}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="mx-auto flex max-w-[457px] flex-col gap-4 px-3.5 md:hidden">
        {scenarios.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-[8px] border border-[#eceef3] px-[25px] py-[30px]"
          >
            <CardGradientBackground {...item.background} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
              <IndustryIllustration
                variant={item.illustration}
                palette={item.background}
              />
            </div>
            <div className="relative z-10">
              <h3
                className="mb-4 text-[28px] font-bold text-[#161722]"
                style={{ color: item.background.accent }}
              >
                {item.title}
              </h3>
              <p className="mb-6 text-[15px] leading-7 text-[#57627f]">
                {item.description}
              </p>
              <div className="mb-3 text-[18px] font-semibold text-[#161722]">
                落地价值
              </div>
              <ul className="mb-6 space-y-2">
                {item.advantages.map((adv) => (
                  <li key={adv} className="flex gap-2 text-[14px] leading-7 text-[#57627f]">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.background.accent }}
                    />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
              <Image
                src={item.image}
                alt=""
                width={400}
                height={240}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
