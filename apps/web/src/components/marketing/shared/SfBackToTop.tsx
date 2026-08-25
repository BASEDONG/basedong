"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const VISIBILITY_Y = 400;

function VerticalAlignTopIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="64 64 896 896"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
      <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z" />
    </svg>
  );
}

/** Matches original ant FloatButton (back-to-top): fade 0.2s, show after scrollY ≥ 400. */
export function SfBackToTop() {
  const [visible, setVisible] = useState(false);

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
      aria-label="回到顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-12 right-6 z-[1000] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[rgba(0,0,0,0.88)] shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)] transition-[opacity,background-color] duration-200 ease-linear",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/[0.06]">
        <VerticalAlignTopIcon className="text-[18px]" />
      </span>
    </button>
  );
}
