"use client";

import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getReservedContent } from "./content";

export function ReservedHero() {
  const { locale } = useLocale();
  const c = getReservedContent(locale);
  const accentStyle = { color: c.heroBackground.accent };

  return (
    <section className="relative h-[818px] w-full overflow-hidden">
      <HeroSlideBackground {...c.heroBackground} />
      <div className="sf-content relative z-10 flex h-full flex-col items-start justify-center max-[960px]:items-center">
        <p className="text-[64px] font-semibold leading-[96px] text-slate-800 max-[960px]:text-[36px] max-[960px]:leading-[1.3]">
          {c.heroTitle}
        </p>
        <p
          className="mb-10 text-[64px] font-semibold leading-[96px] max-[960px]:mb-5 max-[960px]:text-[36px] max-[960px]:leading-[1.3]"
          style={accentStyle}
        >
          {c.heroTitleAccent}
        </p>
        <p className="mb-[54px] text-[20px] leading-[30px] text-slate-800 max-[960px]:mb-7 max-[960px]:text-center max-[960px]:text-[16px]">
          {c.heroSubtitle}
        </p>
        <MarketingButton href={c.consultUrl} size="lg" showArrow>
          {c.consultCta}
        </MarketingButton>
      </div>
    </section>
  );
}
