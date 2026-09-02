"use client";

import { ChevronDown } from "lucide-react";
import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getBrandContent } from "./content";

export function BrandHero() {
  const { locale } = useLocale();
  const { heroBackground, heroTitle, heroSubtitle } = getBrandContent(locale);
  const accentStyle = { color: heroBackground.accent };

  return (
    <section className="relative flex h-[818px] w-full flex-col items-center justify-center overflow-hidden">
      <HeroSlideBackground {...heroBackground} />
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <h2 className="mb-[20px] text-center text-[60px] leading-[90px] font-bold text-[#1e293b] max-[1024px]:text-[40px] max-[1024px]:leading-[60px]">
          {heroTitle}
        </h2>
        <p className="mb-[50px] text-center text-[32px] leading-[48px] text-[#1e293b] max-[1024px]:max-w-[250px] max-[1024px]:text-[20px] max-[1024px]:leading-[30px]">
          {heroSubtitle}
        </p>
        <ChevronDown
          className="sf-brand-bounce mx-auto h-[54px] w-[54px]"
          style={accentStyle}
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </section>
  );
}
