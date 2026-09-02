"use client";

import { Check } from "lucide-react";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getReservedContent } from "./content";
import { ScrollReveal } from "./ScrollReveal";

export function WhyReservedSection() {
  const { locale } = useLocale();
  const c = getReservedContent(locale);

  return (
    <section className="w-full bg-white py-[110px] max-[960px]:py-[72px]">
      <p className="mb-[24px] text-center text-[18px] leading-[27px] text-[#4AABF0]">
        {c.whyBadge}
      </p>
      <h2 className="mb-[24px] text-center text-[48px] font-semibold leading-[72px] text-slate-800 max-[960px]:text-[36px]">
        {c.whyTitle}
      </h2>
      <p className="mb-[24px] text-center text-[18px] leading-[27px] text-slate-800 max-[960px]:text-[16px]">
        {c.whySubtitle}
      </p>

      <div className="sf-content grid grid-cols-2 gap-[24px] max-[960px]:grid-cols-1">
        {c.whyCards.map((card, index) => (
          <ScrollReveal key={card.title} delay={index * 80} className="h-full">
            <Card
              variant="accent"
              className="relative h-full max-w-[688px] max-[960px]:min-w-full max-[960px]:max-w-full"
            >
              <div
                className="absolute inset-0 opacity-[0.92]"
                style={{
                  backgroundImage: `url(${card.bg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,171,240,0.10),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[#4AABF0]/10 transition-all duration-300 group-hover:ring-4"
                aria-hidden="true"
              />
              <div className="relative z-10 p-[32px]">
                <MarketingIconBadge
                  icon={card.icon}
                  size="xl"
                  bg="#4AABF01A"
                  className="mb-[20px] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                />
                <h3 className="mb-[16px] pr-[12px] text-[22px] font-semibold leading-[1.35] text-slate-900">
                  {card.title}
                </h3>
                <ul className="space-y-[12px]">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start text-[15px] leading-[1.75] text-slate-600"
                    >
                      <span className="mr-[10px] mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4AABF0]/10">
                        <Check className="h-3.5 w-3.5 text-[#4AABF0]" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(74,171,240,0.10)]"
                aria-hidden="true"
              />
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
