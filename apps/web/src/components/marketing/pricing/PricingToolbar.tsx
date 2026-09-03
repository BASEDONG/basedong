"use client";

import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import type { PricingCategoryId } from "./content-types";
import { getPricingUiCopy } from "./pricing-ui-copy";

type PricingToolbarProps = {
  category: PricingCategoryId;
  categories: readonly PricingCategoryId[];
  searchInput: string;
  onCategoryChange: (c: PricingCategoryId) => void;
  onSearchInputChange: (v: string) => void;
  onSearch: () => void;
};

export function PricingToolbar({
  category,
  categories,
  searchInput,
  onCategoryChange,
  onSearchInputChange,
  onSearch,
}: PricingToolbarProps) {
  const { locale } = useLocale();
  const ui = getPricingUiCopy(locale);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch();
  }

  return (
    <div className="bg-white py-6">
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="flex h-[48px] items-center gap-3 rounded-[8px] border border-[#E3E8F1] bg-white px-4">
          <Search
            className="h-[18px] w-[18px] shrink-0 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder={ui.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="hidden h-[36px] items-center gap-2 rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white transition duration-150 hover:bg-[#3A9BD8] md:flex"
          >
            <Search className="h-[15px] w-[15px]" aria-hidden />
            {ui.search}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {categories.map((id) => {
          const active = category === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onCategoryChange(id)}
              className={cn(
                "h-[40px] min-w-[58px] rounded-[8px] border px-5 text-[14px] font-semibold transition duration-150 md:min-w-[88px]",
                active
                  ? "border-[#4AABF0] bg-[#4AABF0] text-white"
                  : "border-[#DDE5F0] bg-white text-slate-600 hover:border-[#4AABF0] hover:text-[#4AABF0]",
              )}
            >
              {ui.categoryLabels[id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
