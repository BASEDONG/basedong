"use client";

import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function TokenFactoryHero() {
  const { locale } = useLocale();
  const {
    heroBackground,
    heroBrandName,
    heroTitle,
    heroSubtitle,
    heroTags,
    heroCta,
    consultUrl,
  } = getTokenFactoryContent(locale);
  const accentStyle = { color: heroBackground.accent };

  return (
    <section className="relative mb-[110px] h-[588px] w-full overflow-hidden lg:h-[760px] min-[1571px]:h-[888px]">
      <HeroSlideBackground {...heroBackground} />
      <div className="relative z-10 h-full">
        <section className="mx-auto flex h-full max-w-[var(--sf-content-max)] flex-col items-start justify-center pl-[46px] max-lg:items-center max-lg:px-6">
          <p className="text-[36px] font-semibold lg:text-[64px]">{heroBrandName}</p>
          <p
            className="mb-5 text-center text-[36px] font-semibold lg:mb-6 lg:text-[64px]"
            style={accentStyle}
          >
            {heroTitle}
          </p>
          <p className="mb-6 text-center text-[16px] text-[#161722] lg:mb-8 lg:text-left lg:text-[24px]">
            {heroSubtitle}
          </p>

          <div className="mb-7 flex flex-wrap items-center justify-center gap-[30px] text-[14px] text-[#57627f] max-[600px]:gap-4 lg:mb-[54px] lg:justify-start lg:text-[18px]">
            {heroTags.map((tag, index) => (
              <span
                key={tag}
                className="flex items-center gap-[30px] max-[600px]:gap-4"
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

          <MarketingButton href={consultUrl} size="lg" showArrow>
            {heroCta}
          </MarketingButton>
        </section>
      </div>
    </section>
  );
}
