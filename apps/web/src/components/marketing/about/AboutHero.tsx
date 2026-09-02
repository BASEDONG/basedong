"use client";

import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getAboutContent } from "./content";

export function AboutHero() {
  const { locale } = useLocale();
  const { heroBackground, heroTitle, heroSubtitle } = getAboutContent(locale);
  const accentStyle = { color: heroBackground.accent };

  return (
    <div className="relative h-[818px] w-full overflow-hidden">
      <HeroSlideBackground {...heroBackground} />
      <section className="sf-content relative z-10 flex h-full flex-col items-start justify-center max-[1024px]:translate-y-[-144px] max-[1024px]:items-center">
        <h2
          className="mb-6 text-[48px] font-semibold max-[1024px]:text-center max-[1024px]:text-[36px]"
          style={accentStyle}
        >
          {heroTitle}
        </h2>
        <p className="text-[24px] text-[#1e293b] max-[1024px]:text-center max-[1024px]:text-[18px]">
          {heroSubtitle}
        </p>
      </section>
    </div>
  );
}
