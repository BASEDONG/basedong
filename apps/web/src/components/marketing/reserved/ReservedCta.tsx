"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { cardVariants } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import { getReservedContent } from "./content";

export function ReservedCta() {
  const { locale } = useLocale();
  const c = getReservedContent(locale);
  const [ctaTitleLine1, ctaTitleLine2 = ""] = c.ctaTitle.split("\n");

  return (
    <div className="bg-[#4AABF0]">
      <section className="relative isolate overflow-hidden bg-[#4AABF0] px-6 py-[88px] max-[960px]:px-4 max-[960px]:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
            maskImage:
              "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.92) 46%, rgba(0,0,0,0.55) 72%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.92) 46%, rgba(0,0,0,0.55) 72%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-[120px] -top-[120px] z-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[-60px] top-1/2 z-0 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[#02F6F7]/12 blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[180px] bg-gradient-to-t from-black/10 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-[1] mx-auto flex max-w-[1280px] items-center justify-between gap-14 max-[960px]:flex-col max-[960px]:items-stretch max-[960px]:gap-7">
          <div className="max-w-[560px] max-[960px]:max-w-full">
            <div className="mb-[18px] inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[14px] font-medium text-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.06)] backdrop-blur-[8px]">
              <span className="mr-1.5 text-[16px] leading-none text-[#02F6F7]">
                •
              </span>
              {c.ctaBadge}
            </div>
            <h2 className="mb-4 text-[48px] font-semibold leading-[1.18] tracking-[-0.03em] text-white max-[960px]:text-[28px] max-[960px]:leading-[1.28]">
              {ctaTitleLine1}
              <br />
              {ctaTitleLine2}
            </h2>
            <p className="max-w-[520px] text-[18px] leading-[1.85] text-white max-[960px]:max-w-full max-[960px]:text-[15px] max-[960px]:leading-[1.75]">
              {c.ctaBody}
            </p>
          </div>

          <Link
            href={c.consultUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              cardVariants({ variant: "promo", interactive: "raise" }),
              "relative block w-full max-w-[580px] p-7 max-[960px]:max-w-full max-[960px]:rounded-[20px] max-[960px]:p-5",
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_38%,rgba(255,255,255,0)_100%)]" />
              <div className="absolute -right-10 -top-10 h-[140px] w-[140px] rounded-full bg-[#02F6F7]/12 blur-[50px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/20 max-[960px]:rounded-[20px]" />

            <div className="relative z-[1] flex items-start gap-[18px]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/15 bg-white/15 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:scale-[1.06] group-hover:bg-white/20 group-hover:shadow-[0_14px_32px_rgba(2,246,247,0.14)] max-[960px]:h-10 max-[960px]:w-10 max-[960px]:rounded-xl">
                <MessageCircle className="h-[18px] w-[18px] max-[960px]:h-4 max-[960px]:w-4" aria-hidden />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2.5 text-[30px] font-semibold leading-[1.32] tracking-[-0.02em] text-white max-[960px]:text-[20px] max-[960px]:leading-[1.4]">
                  {c.ctaCardTitle}
                </div>
                <div className="text-[18px] leading-[1.8] text-white max-[960px]:text-[14px] max-[960px]:leading-[1.7]">
                  {c.ctaCardBody}
                </div>

                <div className="mt-[22px] flex items-center justify-between gap-4 border-t border-white/10 pt-[18px] max-[960px]:mt-[18px] max-[960px]:pt-3.5">
                  <div className="text-[14px] leading-[1.6] text-white/60 max-[960px]:text-[12px]" />
                  <div className="inline-flex items-center gap-2 text-[15px] font-medium text-white max-[960px]:text-[13px]">
                    {c.ctaButton}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
