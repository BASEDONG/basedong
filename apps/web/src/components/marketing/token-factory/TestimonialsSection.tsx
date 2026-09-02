"use client";

import { Quote } from "lucide-react";
import { BrandAvatar } from "@/components/marketing/shared/BrandAvatar";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getTokenFactoryContent } from "./content";

export function TestimonialsSection() {
  const { locale } = useLocale();
  const { testimonialsTitle, testimonials } = getTokenFactoryContent(locale);

  return (
    <section className="w-full bg-white py-40 max-md:py-24">
      <h2 className="mb-6 bg-[linear-gradient(180deg,#3A9AE0_9.58%,#4AABF0_50.21%)] bg-clip-text text-center text-[48px] font-semibold leading-[1.5] text-transparent max-[1280px]:text-[38px] max-[960px]:text-[28px]">
        {testimonialsTitle}
      </h2>

      <div className="sf-content grid grid-cols-3 gap-6 max-[1280px]:grid-cols-1">
        {testimonials.map((item) => (
          <Card
            key={item.title}
            variant="feature"
            size="lg"
            className="relative min-h-[360px] justify-between rounded-lg border-white/40 shadow-sm backdrop-blur will-change-transform"
            style={{ backgroundColor: item.bg }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 28%, rgba(255,255,255,0) 60%)",
              }}
            />
            <div>
              <h3 className="mb-4 flex items-center justify-between text-[28px] font-semibold text-slate-800">
                {item.title}
                <Quote className="h-8 w-8 text-[#4AABF0]/15" aria-hidden />
              </h3>
              <p className="text-[16px] leading-[1.75] text-slate-600">
                {item.quote}
              </p>
            </div>
            <div className="relative z-10 mt-8 flex items-center">
              <BrandAvatar
                name={item.avatarSeed}
                size={24}
                className="mr-2 shrink-0 overflow-hidden rounded-full"
              />
              <span className="text-[14px] text-slate-500">{item.role}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
