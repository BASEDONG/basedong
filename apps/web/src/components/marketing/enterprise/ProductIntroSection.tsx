"use client";

import { CardGradientBackground } from "@/components/marketing/home/CardGradientBackground";
import { ProductCardIllustration } from "@/components/marketing/home/ProductCardIllustration";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card } from "@/components/ui/card";
import { getEnterpriseContent } from "./content";
import { EnterprisePlatformArchitecture } from "./EnterprisePlatformArchitecture";
import { getEnterpriseUiCopy } from "./enterprise-ui-copy";

export function ProductIntroSection() {
  const { locale } = useLocale();
  const ui = getEnterpriseUiCopy(locale);
  const { introCards, archLayers } = getEnterpriseContent(locale);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-2 px-3.5 text-center text-[38px] font-bold md:text-[48px]">
        {ui.introTitle}
      </h3>
      <p className="mx-auto mb-16 max-w-[1290px] px-9 text-center text-[18px] text-[#57627f] md:text-[20px]">
        {ui.introSummary}
      </p>

      <div className="sf-content mb-[74px] grid grid-cols-1 gap-[31px] md:grid-cols-2">
        {introCards.map((card) => (
          <Card
            key={card.title}
            variant="elevated"
            className="relative min-h-[280px] max-w-full px-8 py-12 md:px-12 md:py-[56px]"
          >
            <CardGradientBackground {...card.background} />
            <h3
              className="relative z-10 mb-3 text-[24px] font-semibold leading-[1.5] text-[#161722] md:text-[28px]"
              style={{ color: card.background.accent }}
            >
              {card.title}
            </h3>
            <p className="relative z-10 max-w-[520px] text-[16px] leading-[1.5] text-[#57627f] md:text-[18px]">
              {card.description}
            </p>
            <div className="pointer-events-none absolute bottom-[-12px] right-[-16px] z-[1] h-[160px] w-[180px] opacity-[0.18] md:bottom-[-16px] md:right-[-20px] md:h-[185px] md:w-[220px] md:opacity-[0.2]">
              <ProductCardIllustration variant={card.illustration} />
            </div>
          </Card>
        ))}
      </div>

      <h3 className="mb-10 px-3.5 text-center text-[32px] font-bold md:mb-12 md:text-[48px]">
        {ui.archSectionTitle}
      </h3>
      <div className="sf-content">
        <Card variant="surface" size="md" className="w-full">
          <EnterprisePlatformArchitecture
            archAria={ui.archAria}
            layers={archLayers}
          />
        </Card>
      </div>
    </section>
  );
}
