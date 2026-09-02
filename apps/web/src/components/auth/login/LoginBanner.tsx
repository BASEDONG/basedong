"use client";

import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getAuthCopy, heroBackground } from "./content";

export function LoginBanner() {
  const { targetLocale } = useLocale();
  const copy = getAuthCopy(targetLocale);

  return (
    <div className="relative hidden min-h-0 flex-1 lg:block">
      <HeroSlideBackground {...heroBackground} logoAlt={copy.subtitle} />
      <div className="relative z-10 flex h-full flex-col px-14 py-14 text-slate-800">
        <BrandLogo size="hero" priority />
        <section className="mt-16 max-w-[28rem]">
          <h1 className="text-[48px] font-semibold leading-[1.25] tracking-tight">
            {copy.brandName}
          </h1>
          <p className="mt-3 bg-[linear-gradient(135deg,#5DCDE8_0%,#4AABF0_35%,#E848A0_70%,#FF9142_100%)] bg-clip-text text-[36px] font-semibold leading-[1.35] text-transparent">
            {copy.tagline}
          </p>
          <p className="mt-6 text-[20px] leading-8 text-slate-600">
            {copy.subtitle}
          </p>
        </section>
      </div>
    </div>
  );
}
