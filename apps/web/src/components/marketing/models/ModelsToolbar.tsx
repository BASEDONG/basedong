"use client";

import type { KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/components/shared/LocaleProvider";
import type { FilterChipOption } from "@/lib/backend/pricing-filters";
import { cn } from "@/lib/utils";
import { getModelsContent } from "./content";

type Props = {
  vendorFilter: string;
  billingFilter: string;
  endpointFilter: string;
  searchQuery: string;
  vendorOptions: readonly FilterChipOption[];
  billingOptions: readonly FilterChipOption[];
  endpointOptions: readonly FilterChipOption[];
  hotModels: readonly string[];
  onVendorFilter: (v: FilterChipOption) => void;
  onBillingFilter: (v: FilterChipOption) => void;
  onEndpointFilter: (v: FilterChipOption) => void;
  onSearchQuery: (v: string) => void;
  onSearch: () => void;
  onHotModel: (name: string) => void;
};

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[8px] border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-[#4AABF0] bg-[#EEF7FD] text-[#4AABF0]"
          : "border-[#DDE5F0] bg-white text-slate-600 hover:border-[#4AABF0] hover:text-[#4AABF0]",
      )}
    >
      {label}
      {typeof count === "number" ? (
        <span className="ml-1 font-normal opacity-70">({count})</span>
      ) : null}
    </button>
  );
}

function FilterRow({
  label,
  options,
  activeValue,
  onSelect,
}: {
  label: string;
  options: readonly FilterChipOption[];
  activeValue: string;
  onSelect: (option: FilterChipOption) => void;
}) {
  if (options.length <= 1) return null;
  return (
    <div className="mb-4 flex gap-4 last:mb-0 max-md:flex-col max-md:gap-2">
      <span className="h-8 whitespace-nowrap text-sm font-semibold leading-8 text-slate-700">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterChip
            key={option.value || "__all__"}
            label={option.label}
            count={option.value ? option.count : undefined}
            active={activeValue === option.value}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}

export function ModelsToolbar({
  vendorFilter,
  billingFilter,
  endpointFilter,
  searchQuery,
  vendorOptions,
  billingOptions,
  endpointOptions,
  hotModels,
  onVendorFilter,
  onBillingFilter,
  onEndpointFilter,
  onSearchQuery,
  onSearch,
  onHotModel,
}: Props) {
  const { locale } = useLocale();
  const page = getModelsContent(locale);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="sf-content bg-white py-6">
      <div className="mb-5 flex h-[48px] items-center gap-3 rounded-[8px] border border-[#E3E8F1] bg-white px-4">
        <Search className="h-[18px] w-[18px] shrink-0 text-slate-400" aria-hidden />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder={page.searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={onSearch}
          className="hidden h-[36px] items-center gap-2 rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white transition duration-150 hover:bg-[#3A9BD8] md:flex"
        >
          <Search className="h-[15px] w-[15px]" aria-hidden />
          {page.searchButton}
        </button>
      </div>

      {hotModels.length > 0 ? (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-800">
            {page.hotLabel}
          </span>
          {hotModels.map((model) => (
            <button
              key={model}
              type="button"
              onClick={() => onHotModel(model)}
              className="rounded-[8px] border border-[#DDE5F0] bg-white px-3 py-1 text-xs text-slate-700 transition hover:border-[#4AABF0] hover:text-[#4AABF0]"
            >
              {model}
            </button>
          ))}
        </div>
      ) : null}

      <FilterRow
        label={page.vendorLabel}
        options={vendorOptions}
        activeValue={vendorFilter}
        onSelect={onVendorFilter}
      />
      <FilterRow
        label={page.billingLabel}
        options={billingOptions}
        activeValue={billingFilter}
        onSelect={onBillingFilter}
      />
      <FilterRow
        label={page.endpointLabel}
        options={endpointOptions}
        activeValue={endpointFilter}
        onSelect={onEndpointFilter}
      />
    </div>
  );
}
