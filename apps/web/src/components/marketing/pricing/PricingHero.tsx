"use client";

import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getPricingHeroBackground,
  getPricingUiCopy,
} from "./pricing-ui-copy";

export function PricingHero() {
  const { locale } = useLocale();
  const hero = getPricingUiCopy(locale);
  const heroBackground = getPricingHeroBackground(locale);
  const accentStyle = { color: heroBackground.accent };

  return (
    <section className="relative h-[818px] w-full overflow-hidden">
      <HeroSlideBackground {...heroBackground} />
      <div className="sf-content relative z-10 flex h-full flex-col items-start justify-center max-[960px]:items-center">
        <p className="text-[64px] font-semibold leading-[96px] text-slate-800 max-[960px]:text-center max-[960px]:text-[36px] max-[960px]:leading-[1.3]">
          {hero.titleBefore}
        </p>
        <p
          className="mb-10 text-[64px] font-semibold leading-[96px] max-[960px]:mb-7 max-[960px]:text-center max-[960px]:text-[36px] max-[960px]:leading-[1.3]"
          style={accentStyle}
        >
          {hero.titleHighlight}
          {hero.titleAfter}
        </p>
        <p className="mb-10 max-w-[720px] text-[20px] leading-[30px] text-slate-800 max-[960px]:mb-7 max-[960px]:text-center max-[960px]:text-[16px]">
          {hero.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-start gap-[30px] text-[14px] text-[#57627f] max-[960px]:justify-center max-[600px]:gap-4 lg:text-[18px]">
          {hero.features.map((tag, index) => (
            <span
              key={tag}
              className="flex items-center gap-[30px] max-[600px]:gap-4"
            >
              <span>{tag}</span>
              {index < hero.features.length - 1 ? (
                <i
                  aria-hidden="true"
                  className="inline-block h-[22px] w-px bg-[#9AA6B8]"
                />
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
