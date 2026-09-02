"use client";

import { HeroSlideBackground } from "@/components/marketing/home/HeroSlideBackground";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getModelsContent } from "./content";

export function ModelsHero() {
  const { locale } = useLocale();
  const page = getModelsContent(locale);
  const accentStyle = { color: page.heroBackground.accent };

  return (
    <section className="relative h-[818px] w-full overflow-hidden">
      <HeroSlideBackground {...page.heroBackground} />
      <div className="sf-content relative z-10 flex h-full flex-col items-start justify-center max-[960px]:items-center">
        <p className="text-[64px] font-semibold leading-[96px] text-slate-800 max-[960px]:text-center max-[960px]:text-[36px] max-[960px]:leading-[1.3]">
          {page.heroTitleLine1}
        </p>
        <p
          className="mb-10 text-[64px] font-semibold leading-[96px] max-[960px]:mb-7 max-[960px]:text-center max-[960px]:text-[36px] max-[960px]:leading-[1.3]"
          style={accentStyle}
        >
          {page.heroTitleLine2}
        </p>
        <p className="max-w-[720px] text-[20px] leading-[30px] text-slate-800 max-[960px]:text-center max-[960px]:text-[16px]">
          {page.heroSubtitle}
        </p>
      </div>
    </section>
  );
}
