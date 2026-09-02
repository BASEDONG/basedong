"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getChromeCopy } from "@/components/marketing/shared/chrome-copy";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";

const VISIBILITY_Y = 400;

/** Matches original ant FloatButton (back-to-top): fade 0.2s, show after scrollY ≥ 400. */
export function SfBackToTop() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLocale();
  const ariaLabel = getChromeCopy(locale).backToTop;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY >= VISIBILITY_Y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-12 right-6 z-[1000] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[rgba(0,0,0,0.88)] shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)] transition-[opacity,background-color] duration-200 ease-linear",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/[0.06]">
        <ArrowUp className="h-[18px] w-[18px]" aria-hidden />
      </span>
    </button>
  );
}
