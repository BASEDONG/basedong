"use client";

import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getReservedContent } from "./content";
import { ScrollReveal } from "./ScrollReveal";

export function DeliverySlaSection() {
  const { locale } = useLocale();
  const c = getReservedContent(locale);

  return (
    <div className="relative w-full bg-white pb-[204px] pt-[110px] max-[960px]:pb-24 max-[960px]:pt-[72px]">
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${c.assets}/bg-section-3.svg)` }}
        aria-hidden="true"
      />
      <section className="relative z-10">
        <p className="mb-6 text-center text-[18px] text-[#4AABF0]">
          {c.deliveryBadge}
        </p>
        <h2 className="mb-4 text-center text-[48px] font-semibold text-slate-800 max-[960px]:text-[36px]">
          {c.deliveryTitle}
        </h2>

        <div className="sf-content mt-[60px]">
          <div className="flex flex-col gap-9">
            {c.deliverySteps.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 100} y={24}>
                <div className="flex items-start gap-4">
                  <div className="relative flex w-10 shrink-0 justify-center">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#4AABF0] text-[16px] font-semibold text-white shadow-md">
                      {step.num}
                      {index < c.deliverySteps.length - 1 ? (
                        <div
                          className="absolute left-1/2 top-10 h-[102px] w-0.5 -translate-x-1/2"
                          style={{
                            background:
                              "linear-gradient(to bottom, #4AABF033 0%, #4AABF000 100%)",
                          }}
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  </div>
                  <Card
                    variant="ghost"
                    interactive="outline"
                    className="min-h-[104px] flex-1 bg-white px-5 py-7"
                  >
                    <div className="flex items-start gap-4">
                      <MarketingIconBadge
                        icon={step.icon}
                        size="sm"
                        bg="#4AABF01A"
                      />
                      <div>
                        <h3 className="mb-1.5 text-[18px] font-semibold text-slate-800">
                          {step.title}
                        </h3>
                        <p className="text-[14px] leading-[1.6] text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
