"use client";

import { Card } from "@/components/ui/card";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getReservedContent } from "./content";
import type { ReservedPricingModel } from "./content-types";
import { ScrollReveal } from "./ScrollReveal";

type PricingModelCardProps = {
  model: ReservedPricingModel;
  delay?: number;
};

export function PricingModelCard({ model, delay = 0 }: PricingModelCardProps) {
  const { locale } = useLocale();
  const c = getReservedContent(locale);

  return (
    <ScrollReveal delay={delay} y={28}>
      <Card
        variant="accent"
        className="relative mx-auto min-h-[604px] w-full max-w-[676px] rounded-[18px] px-12 py-8 max-[1280px]:max-w-full max-[960px]:h-auto max-[960px]:px-6 max-[960px]:py-6"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,171,240,0.10),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[18px] shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 group-hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="mb-2.5 inline-flex min-h-7 min-w-20 items-center justify-center rounded-full border border-[#4AABF0]/10 bg-[#F1ECFF] px-3 py-1 text-[12px] font-semibold tracking-[0.02em] text-[#4AABF0]">
            {model.brand}
          </div>
          <h3 className="mb-2.5 break-words text-[24px] font-semibold leading-[1.35] text-slate-900">
            {model.model}
          </h3>
          <p className="mb-8 min-h-[84px] break-words text-[17px] leading-[1.8] text-slate-500 max-[960px]:min-h-0 max-[960px]:text-[16px]">
            {model.description}
          </p>

          <Card
            variant="surface"
            className="mb-5 rounded-[14px] border-slate-100 bg-slate-50/70 p-[18px]"
          >
            <p className="mb-3.5 text-[14px] font-semibold text-[#4AABF0]">
              {c.costReferenceLabel}
            </p>
            <div className="mb-3 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <span className="text-[15px] text-slate-500">{c.priceLabel}</span>
              <span className="rounded-lg bg-[#F1ECFF] px-2.5 py-1 text-[14px] font-semibold text-[#4AABF0] shadow-sm">
                {model.price}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-0.5">
              <span className="text-[15px] text-slate-500">
                {c.unitPriceLabel} <span className="text-red-500">*</span>
              </span>
              <span className="text-[15px] font-medium text-slate-800">
                {model.unitPrice}
              </span>
            </div>
          </Card>

          <Card
            variant="surface"
            className="rounded-[14px] border-slate-100 p-[18px]"
          >
            <p className="mb-3.5 text-[14px] font-semibold text-[#4AABF0]">
              {c.perfReferenceLabel} <span className="text-red-500">**</span>
            </p>
            <div className="space-y-1.5">
              {[
                { label: "TPM", value: model.tpm },
                { label: "TTFT", value: model.ttft },
                { label: "TPS", value: model.tps },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between border border-transparent py-2.5 hover:border-y-slate-200"
                >
                  <span className="text-[15px] text-slate-500">{metric.label}</span>
                  <span className="text-[15px] font-medium text-slate-800">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-0 bg-[#4AABF0]/80 transition-all duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      </Card>
    </ScrollReveal>
  );
}
