"use client";

import { useState } from "react";
import type { FilterOption, FilterSection } from "./content-types";
import { getMatchKey } from "./models-ui-copy";

const LOGO_BASE = "/assets/console/models/images/logos";

const SERIES_LOGOS: Record<string, string> = {
  DeepSeek: `${LOGO_BASE}/DeepSeek.svg`,
  Qwen: `${LOGO_BASE}/Tongyi.svg`,
  智谱: `${LOGO_BASE}/zhipu.svg`,
  Kimi: `${LOGO_BASE}/moonshotai_new.png`,
  蚂蚁百灵: `${LOGO_BASE}/ling.png`,
  阶跃星辰: `${LOGO_BASE}/Stepfun.svg`,
  MiniMax: `${LOGO_BASE}/minimax-color.svg`,
  Wan: `${LOGO_BASE}/Tongyi.svg`,
};

interface ModelsFilterPanelProps {
  sections: FilterSection[];
  selectedChips: Set<string>;
  onToggleChip: (id: string) => void;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 cursor-pointer text-slate-400 transition-transform duration-500 ${
        open ? "rotate-0" : "-rotate-90"
      }`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FilterChip({
  option,
  selected,
  onToggle,
  withLogo,
}: {
  option: FilterOption;
  selected: boolean;
  onToggle: () => void;
  withLogo?: boolean;
}) {
  const matchKey = getMatchKey(option);
  const logo = withLogo ? SERIES_LOGOS[matchKey] : undefined;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex h-6 w-full cursor-pointer select-none items-center justify-center rounded-[12px] border text-sm ${
        selected
          ? "border-[var(--sf-primary)] bg-[var(--sf-tint)] text-[var(--sf-primary)]"
          : "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      <span className="flex items-center justify-center">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="mr-1 w-[14px]" />
        ) : null}
        {option.label}
      </span>
    </button>
  );
}

function FilterSectionBlock({
  section,
  selectedChips,
  onToggleChip,
}: {
  section: FilterSection;
  selectedChips: Set<string>;
  onToggleChip: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const moreOption = section.options.find((o) => o.id === "series-更多");
  const chips = section.options.filter((o) => o.id !== "series-更多");

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{section.label}</span>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label="toggle">
          <ChevronIcon open={open} />
        </button>
      </div>
      {open ? (
        <>
          <div className="grid grid-cols-2 gap-3 text-black/75">
            {chips.map((option) => (
              <FilterChip
                key={option.id}
                option={option}
                selected={selectedChips.has(option.id)}
                onToggle={() => onToggleChip(option.id)}
                withLogo={section.id === "series"}
              />
            ))}
          </div>
          {moreOption ? (
            <button
              type="button"
              onClick={() => onToggleChip(moreOption.id)}
              className="cursor-pointer text-xs text-[var(--sf-cloud-primary)]"
            >
              {moreOption.label}
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export function ModelsFilterPanel({
  sections,
  selectedChips,
  onToggleChip,
}: ModelsFilterPanelProps) {
  return (
    <aside className="hidden-scrollbar flex h-full w-[260px] shrink-0 flex-col gap-5 overflow-y-auto px-3 py-5 pl-0 pt-0">
      {sections.map((section) => (
        <FilterSectionBlock
          key={section.id}
          section={section}
          selectedChips={selectedChips}
          onToggleChip={onToggleChip}
        />
      ))}
    </aside>
  );
}
