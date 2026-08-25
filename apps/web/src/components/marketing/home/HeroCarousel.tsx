"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowForwardIcon } from "@/components/marketing/shared/icons";
import type { SfHeroSlide } from "@/types/siliconflow-cn-10b89bdc";
import { heroSlides } from "./content";
import { HeroSlideBackground } from "./HeroSlideBackground";
import { cn } from "@/lib/utils";

const AUTO_PLAY_INTERVAL_MS = 5000;
const RESUME_DELAY_MS = 20000;

function HeroCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bd-gradient-bg flex h-16 items-center justify-center gap-2 rounded-[12px] px-[23px] text-[24px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 max-lg:scale-75"
    >
      {label}
      <ArrowForwardIcon />
    </a>
  );
}

function SlideContent({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  background,
  layout = "inline",
}: SfHeroSlide) {
  const accentStyle = { color: background.accent };

  if (layout === "centered") {
    return (
      <section className="mx-auto flex h-full max-w-[1434px] flex-col items-center justify-center px-6 text-center">
        <p className="mb-8 text-[36px] font-semibold lg:mb-8 lg:text-[64px]">
          {eyebrow} <span style={accentStyle}>{title}</span>
        </p>
        <p className="mb-[46px] text-[18px] lg:text-[32px]">{description}</p>
        <HeroCta href={ctaHref} label={ctaLabel} />
      </section>
    );
  }

  if (layout === "stacked") {
    return (
      <section className="mx-auto flex h-full max-w-[1434px] flex-col items-start justify-center pl-[46px] max-lg:items-center max-lg:px-6">
        <p className="text-[36px] font-semibold lg:text-[64px]">{eyebrow}</p>
        <p
          className="mb-5 text-center text-[36px] font-semibold lg:mb-10 lg:text-[64px]"
          style={accentStyle}
        >
          {title}
        </p>
        <p className="mb-7 text-center text-[16px] lg:mb-[54px] lg:text-left lg:text-[20px]">
          {description}
        </p>
        <HeroCta href={ctaHref} label={ctaLabel} />
      </section>
    );
  }

  return (
    <section className="mx-auto flex h-full max-w-[1434px] flex-col items-start justify-center pl-[46px] max-lg:items-center max-lg:px-6">
      <p className="mb-6 text-center text-[36px] font-semibold lg:mb-6 lg:text-left lg:text-[64px]">
        {eyebrow}{" "}
        <span style={accentStyle}>{title}</span>
      </p>
      <p className="mb-7 text-center text-[16px] lg:mb-8 lg:text-left lg:text-[20px]">
        {description}
      </p>
      <HeroCta href={ctaHref} label={ctaLabel} />
    </section>
  );
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoPlayPaused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, AUTO_PLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoPlayPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  function selectSlide(i: number) {
    setIndex(i);
    setAutoPlayPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoPlayPaused(false);
      resumeTimeoutRef.current = null;
    }, RESUME_DELAY_MS);
  }

  return (
    <section
      className="relative mb-[110px] h-[588px] w-full overflow-hidden lg:h-[760px] min-[1571px]:h-[888px]"
      aria-roledescription="carousel"
      aria-label="首页重点内容"
    >
      {heroSlides.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <HeroSlideBackground {...item.background} />
          <div className="relative z-10 h-full" aria-live={i === index ? "polite" : "off"}>
            <SlideContent {...item} />
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 z-30 flex w-full items-center justify-center gap-3">
        {heroSlides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-label={`切换到 ${item.tabLabel}`}
            aria-selected={i === index}
            className="h-1 w-8 cursor-pointer transition-colors duration-300"
            style={{
              backgroundColor: i === index ? item.background.accent : "#e3e3e3",
            }}
            onClick={() => selectSlide(i)}
          />
        ))}
      </div>
    </section>
  );
}
