"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { Card, cardVariants } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MORE_SERIES_HREF, getModelsContent } from "./content";
import type { SeriesCardData } from "./content-types";

function SeriesCard({
  series,
  exploreSeries,
}: {
  series: SeriesCardData;
  exploreSeries: string;
}) {
  return (
    <Card
      variant="feature"
      size="lg"
      interactive="lift"
      className="relative min-h-[312px] w-full border-transparent max-md:min-h-[348px]"
      style={{ backgroundColor: series.bg }}
    >
      <h4 className="mb-5 flex items-center">
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg">
          <Image
            src={series.logo}
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain"
            unoptimized
          />
        </div>
        <span className="text-2xl font-semibold text-slate-800">
          {series.name}
        </span>
      </h4>
      <p className="mb-4 line-clamp-5 text-base text-slate-600">
        {series.description}
      </p>
      <div className="absolute bottom-16 left-8 flex max-w-full flex-wrap gap-2 max-md:left-4">
        {series.models.map((model) => (
          <span
            key={model}
            className="rounded-lg bg-white px-2.5 py-1 text-xs text-slate-800"
          >
            {model}
          </span>
        ))}
      </div>
      <a
        href={series.exploreHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 left-0 flex w-full cursor-pointer items-center justify-between px-8 pt-6 font-semibold text-slate-800 max-md:px-4"
      >
        <span>{exploreSeries}</span>
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </Card>
  );
}

export function ModelsSeries() {
  const { locale } = useLocale();
  const page = getModelsContent(locale);

  return (
    <section className="sf-content pb-[120px] pt-20">
      <h3 className="mb-4 text-2xl font-semibold text-slate-800">
        {page.seriesTitle}
      </h3>
      <div className="grid w-full grid-cols-3 gap-8 max-xl:grid-cols-2 max-lg:grid-cols-1">
        {page.series.map((series) => (
          <SeriesCard
            key={series.name}
            series={series}
            exploreSeries={page.exploreSeries}
          />
        ))}
        <a
          href={MORE_SERIES_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            cardVariants({
              variant: "feature",
              size: "lg",
              interactive: "lift",
            }),
            "relative flex min-h-[312px] w-full cursor-pointer items-center justify-center border-transparent bg-[#02F6F70D] text-lg text-[#4AABF0]",
          )}
        >
          {page.moreSeries}
        </a>
      </div>
    </section>
  );
}
