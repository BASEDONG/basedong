"use client";

import { useState } from "react";
import type { FilterOption, FilterSection } from "./content-types";
import { getMatchKey } from "./models-ui-copy";

const LOGO_BASE = "/assets/console/models/images/logos";

/** Logos keyed by upstream-style English vendor names (case-insensitive lookup). */
const SERIES_LOGOS: Record<string, string> = {
  anthropic: `${LOGO_BASE}/anthropic.svg`,
  openai: `${LOGO_BASE}/openai.svg`,
  xai: `${LOGO_BASE}/xai.svg`,
  google: `${LOGO_BASE}/google.svg`,
  deepseek: `${LOGO_BASE}/DeepSeek.svg`,
  minimax: `${LOGO_BASE}/minimax-color.svg`,
  bytedance: `${LOGO_BASE}/ByteDance.svg`,
  qwen: `${LOGO_BASE}/Tongyi.svg`,
  alibaba: `${LOGO_BASE}/Tongyi.svg`,
  "z.ai": `${LOGO_BASE}/zhipu.svg`,
  zhipu: `${LOGO_BASE}/zhipu.svg`,
};

function seriesLogo(matchKey: string): string | undefined {
  return SERIES_LOGOS[matchKey.trim().toLowerCase()];
}

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
  const logo = withLogo ? seriesLogo(matchKey) : undefined;

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
      <span className="flex items-center justify-center truncate px-1">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="mr-1 w-[14px] shrink-0" />
        ) : null}
        <span className="truncate">{option.label}</span>
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

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{section.label}</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="toggle"
        >
          <ChevronIcon open={open} />
        </button>
      </div>
      {open ? (
        <div className="grid grid-cols-2 gap-3 text-black/75">
          {section.options.map((option) => (
            <FilterChip
              key={option.id}
              option={option}
              selected={selectedChips.has(option.id)}
              onToggle={() => onToggleChip(option.id)}
              withLogo={section.id === "series"}
            />
          ))}
        </div>
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
