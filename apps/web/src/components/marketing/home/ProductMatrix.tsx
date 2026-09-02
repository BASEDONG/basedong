"use client";

import { useLocale } from "@/components/shared/LocaleProvider";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { Card } from "@/components/ui/card";
import { CardGradientBackground } from "./CardGradientBackground";
import { ProductCardIllustration } from "./ProductCardIllustration";
import { getHomeContent } from "./content";

export function ProductMatrix() {
  const { locale } = useLocale();
  const { productMatrix, productCards } = getHomeContent(locale);

  return (
    <section className="mb-[110px] w-full">
      <h3 className="mb-2 px-3.5 text-center text-[38px] font-bold md:mb-2 md:text-[48px]">
        {productMatrix.title}
      </h3>
      <p className="mb-16 px-9 text-center text-[20px] md:text-[24px]">
        {productMatrix.subtitle}
      </p>

      <div className="sf-content mb-[120px] grid grid-cols-1 gap-[31px] md:grid-cols-2">
        {productCards.map((card) => (
          <Card
            key={card.illustration}
            variant="elevated"
            className="relative min-h-[380px] max-w-full px-8 py-12 md:px-12 md:py-[60px]"
          >
            <CardGradientBackground {...card.background} />
            <h3
              className="relative z-10 mb-3 text-[28px] font-semibold leading-[1.5] text-[#161722] md:text-[32px]"
              style={{ color: card.background.accent }}
            >
              {card.title}
            </h3>
            <p className="relative z-10 max-w-[520px] text-[16px] leading-[1.5] text-[#161722] md:text-[18px]">
              {card.description}
            </p>
            <MarketingButton
              href={card.ctaHref}
              size="sm"
              className="absolute bottom-[50px] left-[33px] z-10 h-12 w-[120px] min-w-0 px-0 text-[16px]"
            >
              {card.ctaLabel}
            </MarketingButton>
            <div className="pointer-events-none absolute bottom-[-12px] right-[-16px] z-[1] h-[160px] w-[180px] opacity-[0.18] md:bottom-[-16px] md:right-[-20px] md:h-[185px] md:w-[220px] md:opacity-[0.2]">
              <ProductCardIllustration variant={card.illustration} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
