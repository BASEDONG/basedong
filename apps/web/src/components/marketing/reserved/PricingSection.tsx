"use client";

import Link from "next/link";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getReservedContent } from "./content";
import type { ReservedPricingModel } from "./content-types";
import { PricingModelCard } from "./PricingModelCard";

function ModelGroup({
  title,
  models,
  startDelay = 0,
}: {
  title: string;
  models: ReservedPricingModel[];
  startDelay?: number;
}) {
  return (
    <div className="mb-12">
      <h3 className="mb-4 text-[24px] font-semibold leading-[1.35] text-slate-600 max-[960px]:text-[20px]">
        {title}
      </h3>
      <div className="mx-auto grid grid-cols-2 gap-12 max-[960px]:grid-cols-1">
        {models.map((model, index) => (
          <PricingModelCard
            key={`${title}-${model.model}`}
            model={model}
            delay={startDelay + index * 80}
          />
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  const { locale } = useLocale();
  const c = getReservedContent(locale);

  return (
    <section className="w-full bg-white pb-[110px] pt-[50px]">
      <p className="mb-6 text-center text-[18px] text-[#4AABF0]">
        {c.pricingBadge}
      </p>
      <h2 className="mb-6 text-center text-[48px] font-semibold text-slate-800 max-[960px]:text-[36px]">
        {c.pricingTitle}
      </h2>
      <p className="mx-auto mb-6 max-w-[642px] text-center text-[18px] text-slate-800 max-[960px]:text-[16px]">
        {c.pricingSubtitle}
      </p>

      <div className="sf-content mb-12">
        <ModelGroup title={c.highPerfTitle} models={c.highPerformanceModels} />
        <ModelGroup
          title={c.standardTitle}
          models={c.standardModels}
          startDelay={320}
        />
      </div>

      <div className="sf-content space-y-4 rounded-tl-lg rounded-tr-lg border-b border-b-slate-300 bg-slate-50 px-6 py-4 text-[18px] leading-8 text-slate-700">
        <p>
          <span className="text-red-500">*</span> {c.pricingNote1}
        </p>
        <p>
          <span className="text-red-500">**</span> {c.pricingNote2}
        </p>
        <p>
          {c.pricingFootCtaBefore}
          <Link
            href={c.consultUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#4AABF0]"
          >
            {c.consultCta}
          </Link>
          {c.pricingFootCtaAfter}
        </p>
      </div>
    </section>
  );
}
