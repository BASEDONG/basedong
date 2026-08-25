import type { CSSProperties } from "react";
import { ABOUT_ASSETS, ABOUT_COPY } from "./content";

export function AboutHero() {
  return (
    <div
      className="about-hero h-[818px] w-full bg-no-repeat p-[14px] [background-size:100%_100%] max-[1024px]:bg-cover max-[1024px]:bg-center"
      style={
        {
          "--about-hero-bg": `url(${ABOUT_ASSETS.heroBg})`,
          "--about-hero-bg-mobile": `url(${ABOUT_ASSETS.heroBgMobile})`,
          backgroundImage: "var(--about-hero-bg)",
        } as CSSProperties
      }
    >
      <section className="mx-auto flex h-full max-w-[1434px] flex-col items-start justify-center max-[1024px]:translate-y-[-144px] max-[1024px]:items-center">
        <h2 className="mb-6 text-[48px] font-semibold text-[#4AABF0] max-[1024px]:text-center max-[1024px]:text-[36px]">
          {ABOUT_COPY.heroTitle}
        </h2>
        <p className="text-[24px] text-[#1e293b] max-[1024px]:text-center max-[1024px]:text-[18px]">
          {ABOUT_COPY.heroSubtitle}
        </p>
      </section>
    </div>
  );
}
