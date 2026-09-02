"use client";

import { useMemo, useState } from "react";
import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import {
  AccordionDetailFade,
  ScenarioAccordion,
  type ScenarioAccordionItem,
} from "@/components/marketing/shared/ScenarioAccordion";
import { SCENARIO_ILLUSTRATIONS } from "@/components/marketing/shared/illustration-assets";
import { MarketingIllustration } from "@/components/marketing/shared/MarketingIllustration";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getEnterpriseContent } from "./content";
import { getEnterpriseUiCopy } from "./enterprise-ui-copy";
import { ScenarioDetailIllustration } from "./ScenarioDetailIllustration";

export function ApplicationScenariosSection() {
  const { locale } = useLocale();
  const ui = getEnterpriseUiCopy(locale);
  const { scenarios } = getEnterpriseContent(locale);
  const [active, setActive] = useState(0);
  const activeScenario = scenarios[active]!;

  const accordionItems: ScenarioAccordionItem[] = useMemo(() => {
    const list = getEnterpriseContent(locale).scenarios;
    return list.map((item) => ({
        key: item.id,
        background: item.background,
        renderOverlay: () => (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-[0.18] md:opacity-[0.2]">
            <MarketingIllustration src={SCENARIO_ILLUSTRATIONS[item.id]} />
          </div>
        ),
        renderCollapsed: () => (
          <h3 className="text-[16px] font-semibold text-[#161722] [writing-mode:vertical-rl] md:text-[18px]">
            {item.tab}
          </h3>
        ),
        renderExpanded: () => (
          <>
            <h3
              className="mb-4 text-[24px] font-bold text-[#161722] md:text-[28px]"
              style={{ color: item.background.accent }}
            >
              {item.title}
            </h3>
            <p className="text-[15px] leading-7 text-[#57627f]">
              {item.description}
            </p>
          </>
        ),
      }));
  }, [locale]);

  return (
    <section className="mb-[110px] w-full pb-[20px]">
      <h3 className="mb-12 px-3.5 text-center text-[32px] font-bold md:mb-16 md:text-[48px]">
        {ui.scenariosTitle}
      </h3>

      <ScenarioAccordion items={accordionItems} onActiveChange={setActive} />

      <div className="sf-content mt-8 hidden md:block">
        <Card variant="surface" size="lg" className="w-full">
          <div className="mb-6 text-[20px] font-semibold text-[#161722]">
            {ui.scenariosValueLabel}
          </div>
          <AccordionDetailFade activeKey={activeScenario.id}>
            <ul className="space-y-4">
              {activeScenario.advantages.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[16px] leading-8 text-[#57627f]"
                >
                  <span
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: activeScenario.background.accent }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ScenarioDetailIllustration scenario={activeScenario} />
            </div>
          </AccordionDetailFade>
        </Card>
      </div>

      <div className="mx-auto flex max-w-[457px] flex-col gap-4 px-3.5 md:hidden">
        {scenarios.map((item) => (
          <Card key={item.id} variant="elevated" size="md" className="relative">
            <CardGradientBackground {...item.background} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
              <MarketingIllustration src={SCENARIO_ILLUSTRATIONS[item.id]} />
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
                {ui.scenariosValueLabel}
              </div>
              <ul className="mb-6 space-y-2">
                {item.advantages.map((adv) => (
                  <li
                    key={adv}
                    className="flex gap-2 text-[14px] leading-7 text-[#57627f]"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.background.accent }}
                    />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
              <ScenarioDetailIllustration scenario={item} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
