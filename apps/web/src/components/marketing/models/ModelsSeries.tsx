import Image from "next/image";
import {
  MODELS_PAGE,
  MORE_SERIES_HREF,
  SERIES,
  type SeriesCardData,
} from "./content";

function ArrowRightIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z" />
    </svg>
  );
}

function SeriesCard({ series }: { series: SeriesCardData }) {
  return (
    <div
      className="relative min-h-[312px] w-full max-w-[458px] shrink-0 rounded-[8px] px-8 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] max-md:min-h-[348px] max-md:px-4"
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
        <span>探索系列</span>
        <ArrowRightIcon />
      </a>
    </div>
  );
}

export function ModelsSeries() {
  return (
    <section className="mx-auto max-w-[1434px] px-8 pb-[120px] pt-20">
      <h3 className="mb-4 text-2xl font-semibold text-slate-800">
        {MODELS_PAGE.seriesTitle}
      </h3>
      <div className="grid w-full grid-cols-3 gap-8 max-xl:grid-cols-2 max-lg:grid-cols-1">
        {SERIES.map((series) => (
          <SeriesCard key={series.name} series={series} />
        ))}
        <a
          href={MORE_SERIES_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex min-h-[312px] w-full max-w-[458px] cursor-pointer items-center justify-center rounded-[8px] bg-[#02F6F70D] px-8 py-6 text-lg text-[#4AABF0] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          {MODELS_PAGE.moreSeries}
        </a>
      </div>
    </section>
  );
}

