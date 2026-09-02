"use client";

import { FilterIcon, SearchIcon } from "../shared/icons";

interface ModelsToolbarProps {
  filterOpen: boolean;
  onToggleFilter: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  hideFiltersLabel: string;
  showFiltersLabel: string;
  searchPlaceholder: string;
}

export function ModelsToolbar({
  filterOpen,
  onToggleFilter,
  searchQuery,
  onSearchChange,
  hideFiltersLabel,
  showFiltersLabel,
  searchPlaceholder,
}: ModelsToolbarProps) {
  return (
    <div className="relative mb-3 flex gap-3 px-0 pt-0">
      <button
        type="button"
        onClick={onToggleFilter}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[12px] border border-slate-300 bg-white px-[15px] text-base text-slate-700 shadow-[rgba(0,0,0,0.02)_0_2px_0_0] hover:border-slate-400"
      >
        <FilterIcon className="size-4" />
        <span>{filterOpen ? hideFiltersLabel : showFiltersLabel}</span>
      </button>

      <div className="flex h-10 w-full max-w-[500px]">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="h-10 min-w-0 flex-1 rounded-l-[12px] rounded-r-none border border-r-0 border-slate-300 bg-white px-[11px] text-base text-slate-800 outline-none placeholder:text-slate-400 focus:border-[var(--sf-primary)] focus:z-10"
        />
        <button
          type="button"
          aria-label="search"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-l-none rounded-r-[12px] border border-slate-300 bg-white text-slate-500 hover:text-slate-700"
        >
          <SearchIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
