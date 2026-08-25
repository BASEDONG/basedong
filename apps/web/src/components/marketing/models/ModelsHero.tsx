"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { MODELS_PAGE } from "./content";

type Props = {
  typeFilter: string;
  sceneFilter: string;
  searchQuery: string;
  onTypeFilter: (v: string) => void;
  onSceneFilter: (v: string) => void;
  onSearchQuery: (v: string) => void;
  onSearch: () => void;
  onHotModel: (name: string) => void;
};

function SparklesIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-md text-xs border transition",
        active
          ? "border-[#7B61FF] bg-[#F3F0FF] text-[#4AABF0]"
          : "border-slate-200 bg-white text-slate-600 hover:border-[#7B61FF]",
      )}
    >
      {label}
    </button>
  );
}

export function ModelsHero({
  typeFilter,
  sceneFilter,
  searchQuery,
  onTypeFilter,
  onSceneFilter,
  onSearchQuery,
  onSearch,
  onHotModel,
}: Props) {
  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <section
      className="relative w-full h-[818px] max-md:h-auto max-md:min-h-[1100px] bg-cover bg-center bg-no-repeat px-8 pt-[144px] max-md:pb-[220px]"
      style={{ backgroundImage: `url(${MODELS_PAGE.heroBg})` }}
    >
      <h2 className="text-center text-[60px] max-md:text-[30px] font-bold mb-8 bg-[linear-gradient(90deg,#E848A0_19.71%,#4AABF0_50.34%,#4AABF0_80.6%)] bg-clip-text text-transparent">
        {MODELS_PAGE.heroTitle}
      </h2>

      <p className="text-slate-800 text-center text-[18px] max-md:text-[14px] font-semibold mb-8">
        {MODELS_PAGE.heroSubtitle}
      </p>

      <div className="mx-auto mb-8 flex h-10 w-[630px] max-md:w-full items-center rounded-[8px] bg-white px-1 shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder={MODELS_PAGE.searchPlaceholder}
          className="flex-1 border-none bg-transparent px-3 text-sm outline-none"
        />
        <button
          type="button"
          onClick={onSearch}
          className="flex h-8 items-center gap-1.5 rounded-[8px] bg-gradient-to-r from-[#7B61FF] to-[#4AABF0] px-[18px] text-sm font-medium text-white transition hover:opacity-90"
        >
          <SparklesIcon />
          搜索
        </button>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
        <span className="text-sm font-semibold text-slate-800">
          {MODELS_PAGE.hotLabel}
        </span>
        {MODELS_PAGE.hotModels.map((model) => (
          <button
            key={model}
            type="button"
            onClick={() => onHotModel(model)}
            className="rounded border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 transition hover:border-[#7B61FF]"
          >
            {model}
          </button>
        ))}
      </div>

      <div className="absolute left-0 bottom-[42px] w-full flex justify-center overflow-hidden px-8 max-md:static max-md:mt-10 max-md:overflow-visible max-md:px-0">
        <div className="max-w-[1434px] w-full py-5 max-md:py-0">
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-2">
            <span className="h-8 whitespace-nowrap text-sm font-semibold leading-8 text-slate-700">
              {MODELS_PAGE.typeLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {MODELS_PAGE.typeOptions.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={typeFilter === option}
                  onClick={() => onTypeFilter(option)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 max-md:flex-col max-md:gap-2">
            <span className="h-8 whitespace-nowrap text-sm font-semibold leading-8 text-slate-700">
              {MODELS_PAGE.sceneLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {MODELS_PAGE.sceneOptions.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={sceneFilter === option}
                  onClick={() => onSceneFilter(option)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
