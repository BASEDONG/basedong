"use client";

import { useState } from "react";
import { CardGradientBackground } from "./CardGradientBackground";
import { IndustryIllustration } from "./IndustryIllustration";
import { industryItems } from "./content";
import { cn } from "@/lib/utils";

function IndustryPanel({
  item,
  expanded,
  onActivate,
}: {
  item: (typeof industryItems)[number];
  expanded: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      className={cn(
        "relative h-full shrink-0 cursor-default overflow-hidden border-r border-white/60 transition-[width] duration-500 ease-out last:border-r-0",
        expanded ? "w-[695px]" : "w-[176px]",
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
        <IndustryIllustration variant={item.illustration} palette={item.background} />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center px-6 py-8">
        {expanded ? (
          <div className="max-w-[420px]">
            <h3
              className="mb-4 text-[32px] font-bold text-[#161722]"
              style={{ color: item.background.accent }}
            >
              {item.title}
            </h3>
            <p className="text-[16px] leading-7 text-[#57627f]">{item.description}</p>
          </div>
        ) : (
          <h3 className="text-[22px] font-semibold text-[#161722] [writing-mode:vertical-rl]">
            {item.title}
          </h3>
        )}
      </div>
    </div>
  );
}

export function IndustrySolutions() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full pb-[110px]">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        深耕多行业场景，按需定制灵活落地方案
      </h3>

      {/* Desktop accordion */}
      <div className="mx-auto hidden h-[406px] max-w-[1397px] overflow-hidden rounded-[8px] border border-[#eceef3] md:flex">
        {industryItems.map((item, i) => (
          <IndustryPanel
            key={item.title}
            item={item}
            expanded={i === active}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      {/* Mobile stacked cards */}
      <div className="mx-auto flex max-w-[457px] flex-col gap-4 px-3.5 md:hidden">
        {industryItems.map((item) => (
          <div
            key={item.title}
            className="relative h-[438px] cursor-pointer select-none overflow-hidden rounded-[8px] border border-[#eceef3] px-[25px] py-[30px]"
          >
            <CardGradientBackground {...item.background} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
              <IndustryIllustration variant={item.illustration} palette={item.background} />
            </div>
            <div className="relative z-10">
              <h3
                className="mb-4 text-[28px] font-bold text-[#161722]"
                style={{ color: item.background.accent }}
              >
                {item.title}
              </h3>
              <p className="text-[15px] leading-7 text-[#57627f]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
