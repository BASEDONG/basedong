"use client";

import type { FormEvent } from "react";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingCategoryId } from "./content-types";
import { ASSET, pricingData } from "./content";

const CATEGORIES: PricingCategoryId[] = ["全部", "对话", "生图", "语音", "视频"];

type PricingHeroProps = {
  category: PricingCategoryId;
  searchInput: string;
  onCategoryChange: (c: PricingCategoryId) => void;
  onSearchInputChange: (v: string) => void;
  onSearch: () => void;
};

function PricingBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <path d="M6 11h.01" />
    </svg>
  );
}

export function PricingHero({
  category,
  searchInput,
  onCategoryChange,
  onSearchInputChange,
  onSearch,
}: PricingHeroProps) {
  const { hero } = pricingData;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch();
  }

  return (
    <section
      className="relative flex h-[818px] items-center justify-center overflow-hidden border-b border-[#E8EDF5] bg-[#F7FBFF] bg-cover bg-no-repeat px-4 pb-[120px]"
      style={{ backgroundImage: `url(${ASSET}/hero-bg.png)` }}
    >
      <div className="pointer-events-none absolute right-[-12%] top-[-30%] h-[720px] w-[720px] rounded-full border border-[#CDBBFF]/50" />
      <div className="pointer-events-none absolute right-[-18%] top-[-16%] h-[560px] w-[560px] rounded-full border border-[#CDBBFF]/40" />
      <span className="absolute left-[32%] top-[34%] h-2 w-2 rounded-full bg-[#8B5CF6]/60" />
      <span className="absolute right-[37%] top-[31%] h-2 w-2 rounded-full bg-[#8B5CF6]/40" />

      <div className="relative mx-auto flex max-w-[960px] flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D8CCFF] bg-white/75 px-4 py-2 text-[16px] font-semibold text-[#4AABF0] shadow-sm max-[800px]:text-[14px]">
          <PricingBadgeIcon />
          {hero.eyebrow}
        </div>

        <h1 className="mb-5 text-center text-[64px] font-black leading-tight tracking-normal text-slate-900 max-[800px]:text-[48px] md:text-[58px]">
          {hero.titleBefore}
          <span className="text-[#4AABF0]">{hero.titleHighlight}</span>
        </h1>

        <p className="mb-8 max-w-[980px] text-[20px] leading-7 text-slate-500 max-[800px]:text-[14px] max-[1180px]:max-w-[96%] md:text-[18px]">
          {hero.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="relative w-full max-w-[980px]">
          <div className="flex h-[56px] items-center gap-3 rounded-[8px] border border-[#E3E8F1] bg-white px-4 shadow-[0_12px_30px_rgba(44,64,108,0.12)]">
            <Search className="h-[18px] w-[18px] shrink-0 text-slate-400" aria-hidden />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              placeholder={hero.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="hidden h-[40px] items-center gap-2 rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white transition duration-150 hover:bg-[#5d20d8] md:flex"
            >
              <Search className="h-[15px] w-[15px]" aria-hidden />
              搜索
            </button>
          </div>
        </form>

        <div className="mt-7 flex flex-wrap justify-center gap-6 text-[13px] text-slate-500">
          {hero.features.map((f) => (
            <span key={f} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-[#4AABF0]" aria-hidden />
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-[1440px] rounded-t-[16px] bg-white/78 px-4 pt-6 shadow-[0_-10px_34px_rgba(44,64,108,0.08)] backdrop-blur md:px-7">
          <div className="flex flex-wrap items-end gap-3">
            {CATEGORIES.map((id) => {
              const active = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onCategoryChange(id)}
                  className={cn(
                    "h-[42px] min-w-[58px] rounded-t-[6px] rounded-b-none border border-b-0 px-5 text-[14px] font-semibold transition duration-150 max-[400px]:min-w-[58px] max-[800px]:min-w-[66px] md:min-w-[88px]",
                    active
                      ? "border-[#4AABF0] bg-[#4AABF0] text-white"
                      : "border-[#DDE5F0] bg-white text-slate-600 hover:border-[#BBA5FF] hover:text-[#4AABF0]",
                  )}
                >
                  {id}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
