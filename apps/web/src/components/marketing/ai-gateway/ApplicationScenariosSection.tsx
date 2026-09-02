"use client";

import { useMemo, useState } from "react";
import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import {
  AccordionDetailFade,
  ScenarioAccordion,
  type ScenarioAccordionItem,
} from "@/components/marketing/shared/ScenarioAccordion";
import { getGatewayContent } from "./content";
import type { Scenario } from "./content-types";
import { getGatewayUiCopy } from "./gateway-ui-copy";

function MetricCards({ item }: { item: Scenario }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        item.gridCols === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {item.cards.map((card) => (
        <Card key={card.title} variant="surface" size="sm">
          <h4
            className="mb-2 text-[18px] font-semibold text-[#161722]"
            style={{ color: item.background.accent }}
          >
            {card.title}
          </h4>
          <p className="text-[14px] text-[#57627f]">{card.subtitle}</p>
        </Card>
      ))}
    </div>
  );
}

export function ApplicationScenariosSection() {
  const { locale } = useLocale();
  const ui = getGatewayUiCopy(locale);
  const { scenarios } = getGatewayContent(locale);
  const [active, setActive] = useState(0);
  const activeScenario = scenarios[active]!;

  const accordionItems: ScenarioAccordionItem[] = useMemo(() => {
    const list = getGatewayContent(locale).scenarios;
    return list.map((item) => ({
      key: item.id,
      background: item.background,
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
          <p className="mb-3 text-[15px] leading-7 text-[#57627f]">
            {item.paragraphs[0]}
          </p>
          <p className="text-[15px] leading-7 text-[#57627f]">
            {item.paragraphs[1]}
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

      <div className="hidden md:block">
        <ScenarioAccordion items={accordionItems} onActiveChange={setActive} />

        <div className="sf-content mt-8">
          <Card variant="surface" size="lg" className="w-full">
            <div className="mb-6 text-[20px] font-semibold text-[#161722]">
              {ui.scenariosValueLabel}
            </div>
            <AccordionDetailFade activeKey={activeScenario.id}>
              <MetricCards item={activeScenario} />
            </AccordionDetailFade>
          </Card>
        </div>
      </div>

      <div className="mx-auto flex max-w-[457px] flex-col gap-4 px-3.5 md:hidden">
        {scenarios.map((item) => (
          <Card
            key={item.id}
            variant="elevated"
            size="md"
            className="relative"
          >
            <CardGradientBackground {...item.background} />
            <div className="relative z-10">
              <h3
                className="mb-4 text-[28px] font-bold text-[#161722]"
                style={{ color: item.background.accent }}
              >
                {item.title}
              </h3>
              <p className="mb-3 text-[15px] leading-7 text-[#57627f]">
                {item.paragraphs[0]}
              </p>
              <p className="mb-6 text-[15px] leading-7 text-[#57627f]">
                {item.paragraphs[1]}
              </p>
              <div className="mb-3 text-[18px] font-semibold text-[#161722]">
                {ui.scenariosValueLabel}
              </div>
              <MetricCards item={item} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
