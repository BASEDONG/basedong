"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { CardGradientBackground } from "./CardGradientBackground";
import { IndustryIllustration } from "./IndustryIllustration";
import { getHomeContent } from "./content";
import {
  ScenarioAccordion,
  type ScenarioAccordionItem,
} from "@/components/marketing/shared/ScenarioAccordion";
import { Card } from "@/components/ui/card";

export function IndustrySolutions() {
  const { locale } = useLocale();
  const { industrySection, industryItems } = getHomeContent(locale);

  const accordionItems: ScenarioAccordionItem[] = useMemo(
    () =>
      industryItems.map((item) => ({
        key: item.illustration,
        background: item.background,
        renderOverlay: () => (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-[0.18] md:opacity-[0.2]">
            <IndustryIllustration variant={item.illustration} />
          </div>
        ),
        renderCollapsed: () => (
          <h3 className="text-[22px] font-semibold text-[#161722] [writing-mode:vertical-rl]">
            {item.title}
          </h3>
        ),
        renderExpanded: () => (
          <>
            <h3
              className="mb-4 text-[32px] font-bold text-[#161722]"
              style={{ color: item.background.accent }}
            >
              {item.title}
            </h3>
            <p className="text-[16px] leading-7 text-[#57627f]">{item.description}</p>
          </>
        ),
      })),
    [industryItems],
  );

  return (
    <section className="w-full pb-[110px]">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        {industrySection.title}
      </h3>

      <ScenarioAccordion items={accordionItems} collapsedWidth={176} />

      <div className="mx-auto flex max-w-[457px] flex-col gap-4 px-3.5 md:hidden">
        {industryItems.map((item) => (
          <Card
            key={item.illustration}
            variant="elevated"
            size="md"
            className="relative h-[438px] cursor-pointer select-none"
          >
            <CardGradientBackground {...item.background} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
              <IndustryIllustration variant={item.illustration} />
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
          </Card>
        ))}
      </div>
    </section>
  );
}
