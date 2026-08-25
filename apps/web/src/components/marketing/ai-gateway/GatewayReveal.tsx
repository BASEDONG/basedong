"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "soft" | "card" | "pop" | "slide" | "fade";

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
  /** Once visible, stay visible (default true). */
  once?: boolean;
};

const HIDDEN: Record<RevealVariant, string> = {
  soft: "translate-y-[18px] scale-100 opacity-0 blur-[8px]",
  card: "translate-y-7 scale-[0.98] opacity-0 blur-[10px]",
  pop: "translate-y-0 scale-[0.94] opacity-0 blur-[10px]",
  slide: "translate-x-9 scale-100 opacity-0 blur-[10px]",
  fade: "translate-y-0 scale-100 opacity-0 blur-0",
};

const VISIBLE =
  "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0";

/** Matches Framer Motion's default ease feel on the live site. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function GatewayReveal({
  children,
  className,
  delayMs = 0,
  variant = "soft",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    const show = () => {
      if (revealed && once) return;
      revealed = true;
      window.setTimeout(() => setVisible(true), delayMs);
    };
    const hide = () => {
      if (once) return;
      setVisible(false);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
        else hide();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    // Immediate check for above-the-fold / already in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) show();

    return () => io.disconnect();
  }, [delayMs, once]);

  const style: CSSProperties = {
    transitionProperty: "opacity, filter, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: EASE,
    willChange: "opacity, filter, transform",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transform-gpu",
        visible ? VISIBLE : HIDDEN[variant],
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
