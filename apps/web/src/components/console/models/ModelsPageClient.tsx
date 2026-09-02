"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getPricingCatalog, getUserModels } from "@/lib/backend/client";
import { ConsoleShell } from "../shared/ConsoleShell";
import {
  enabledModelsToCards,
  pricingToModelCards,
} from "./catalog";
import type { FilterOption, FilterSection, ModelCardData } from "./content-types";
import { ModelDetailDrawer } from "./ModelDetailDrawer";
import { ModelGrid } from "./ModelGrid";
import { ModelsFilterPanel } from "./ModelsFilterPanel";
import { ModelsToolbar } from "./ModelsToolbar";
import {
  getFilterSections,
  getMatchKey,
  getModelsUiCopy,
} from "./models-ui-copy";
import { ScrollTopIcon } from "../shared/icons";

const SERIES_ALIASES: Record<string, string[]> = {
  Anthropic: ["anthropic", "claude"],
  OpenAI: ["openai", "gpt", "codex"],
  xAI: ["xai", "grok"],
  Google: ["google", "gemini"],
  字节跳动: ["字节", "doubao", "bytedance"],
  智谱: ["智谱", "zai", "glm", "zhipu"],
  Moonshot: ["moonshot", "kimi"],
  MiniMax: ["minimax"],
};

const TAG_ALIASES: Record<string, string[]> = {
  视觉: ["视觉", "多模态"],
  推理: ["推理"],
  代码: ["代码", "coder"],
  旗舰: ["旗舰"],
  轻量: ["轻量"],
  聊天: ["聊天"],
  图像: ["图像", "生图"],
};

function parseContextTokens(tag: string): number | null {
  const normalized = tag.trim().toUpperCase().replace(/\s+/g, "");
  const match = normalized.match(/^(\d+(?:\.\d+)?)(K|M)$/);
  if (!match) return null;
  const value = Number(match[1]);
  if (Number.isNaN(value)) return null;
  return match[2] === "M" ? value * 1000 : value;
}

function maxContextK(model: ModelCardData): number {
  let max = 0;
  for (const tag of model.featureTags) {
    const tokens = parseContextTokens(tag);
    if (tokens !== null && tokens > max) max = tokens;
  }
  return max;
}

function parseParamB(tag: string): number | null {
  const normalized = tag.trim().toUpperCase().replace(/\s+/g, "");
  const match = normalized.match(/^(\d+(?:\.\d+)?)(B|T)$/);
  if (!match) return null;
  const value = Number(match[1]);
  if (Number.isNaN(value)) return null;
  return match[2] === "T" ? value * 1000 : value;
}

function maxParamB(model: ModelCardData): number {
  let max = 0;
  for (const tag of model.featureTags) {
    const params = parseParamB(tag);
    if (params !== null && params > max) max = params;
  }
  return max;
}

function matchesType(model: ModelCardData, matchKey: string): boolean {
  return model.typeTags.includes(matchKey);
}

function matchesTag(model: ModelCardData, matchKey: string): boolean {
  const aliases = TAG_ALIASES[matchKey] ?? [matchKey];
  const haystack = model.featureTags.join(" ").toLowerCase();
  return aliases.some((alias) => haystack.includes(alias.toLowerCase()));
}

function matchesSeries(model: ModelCardData, matchKey: string): boolean {
  if (matchKey === "更多") return true;
  const aliases = SERIES_ALIASES[matchKey] ?? [matchKey];
  const haystack = `${model.title} ${model.provider}`.toLowerCase();
  return aliases.some((alias) => haystack.includes(alias.toLowerCase()));
}

function matchesContext(model: ModelCardData, matchKey: string): boolean {
  const max = maxContextK(model);
  if (max <= 0) return false;
  if (matchKey === "≥ 8K") return max >= 8;
  if (matchKey === "≥ 16K") return max >= 16;
  if (matchKey === "≥ 32K") return max >= 32;
  if (matchKey === "≥ 128K") return max >= 128;
  return false;
}

function matchesSpec(model: ModelCardData, matchKey: string): boolean {
  const max = maxParamB(model);
  if (max <= 0) return false;
  if (matchKey === "10B 以下") return max < 10;
  if (matchKey === "10 ~ 50B") return max >= 10 && max <= 50;
  if (matchKey === "50 ~ 100B") return max > 50 && max <= 100;
  if (matchKey === "100B 以上") return max > 100;
  return false;
}

function matchesDate(model: ModelCardData, matchKey: string): boolean {
  if (!model.badge) return false;
  if (matchKey === "近 30 天" || matchKey === "近 90 天") {
    return /new/i.test(model.badge);
  }
  return false;
}

function matchesOption(
  model: ModelCardData,
  section: FilterSection,
  option: FilterOption,
): boolean {
  const matchKey = getMatchKey(option);
  switch (section.id) {
    case "type":
      return matchesType(model, matchKey);
    case "tag":
      return matchesTag(model, matchKey);
    case "series":
      return matchesSeries(model, matchKey);
    case "context":
      return matchesContext(model, matchKey);
    case "spec":
      return matchesSpec(model, matchKey);
    case "date":
      return matchesDate(model, matchKey);
    default:
      return true;
  }
}

function filterModels(
  all: ModelCardData[],
  searchQuery: string,
  selectedChips: Set<string>,
  sections: FilterSection[],
): ModelCardData[] {
  const selectedBySection = sections
    .map((section) => ({
      section,
      options: section.options.filter((option) => selectedChips.has(option.id)),
    }))
    .filter((entry) => entry.options.length > 0);

  const q = searchQuery.trim().toLowerCase();

  return all.filter((model) => {
    if (q) {
      const haystack =
        `${model.title} ${model.provider} ${model.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    for (const { section, options } of selectedBySection) {
      const anyMatch = options.some((option) =>
        matchesOption(model, section, option),
      );
      if (!anyMatch) return false;
    }

    return true;
  });
}

export function ModelsPageClient() {
  const { targetLocale } = useLocale();
  const ui = getModelsUiCopy(targetLocale);
  const filterSections = useMemo(
    () => getFilterSections(targetLocale),
    [targetLocale],
  );
  const mainRef = useRef<HTMLElement>(null);
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChips, setSelectedChips] = useState<Set<string>>(
    () => new Set(),
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelCardData | null>(
    null,
  );
  const [catalog, setCatalog] = useState<ModelCardData[]>([]);
  const [catalogNote, setCatalogNote] = useState<string | null>(null);

  useEffect(() => {
    setCatalogNote(ui.loadingCatalog);
  }, [ui.loadingCatalog]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setCollapsed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [pricing, enabled] = await Promise.all([
          getPricingCatalog().catch(() => null),
          getUserModels().catch(() => [] as string[]),
        ]);
        if (cancelled) return;

        let cards: ModelCardData[] = [];
        if (pricing && pricing.items.length > 0) {
          cards = pricingToModelCards(
            pricing,
            enabled.length ? enabled : undefined,
          );
        }
        if (cards.length === 0 && enabled.length > 0) {
          cards = enabledModelsToCards(enabled);
        }
        if (cards.length > 0) {
          setCatalog(cards);
          setCatalogNote(null);
          return;
        }
        setCatalog([]);
        setCatalogNote(ui.emptyCatalog);
      } catch {
        if (cancelled) return;
        setCatalog([]);
        setCatalogNote(ui.catalogError);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ui.emptyCatalog, ui.catalogError]);

  useEffect(() => {
    setShowScrollTop(false);
    mainRef.current?.scrollTo({ top: 0 });
    gridScrollRef.current?.scrollTo({ top: 0 });
  }, [filterOpen]);

  const filtered = useMemo(
    () => filterModels(catalog, searchQuery, selectedChips, filterSections),
    [catalog, searchQuery, selectedChips, filterSections],
  );

  function handleToggleChip(id: string) {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleScrollTop() {
    const target = filterOpen ? gridScrollRef.current : mainRef.current;
    target?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onScrollableScroll(scrollTop: number) {
    setShowScrollTop(scrollTop > 240);
  }

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="models-plaza"
      title={ui.pageTitle}
      mainRef={mainRef}
      mainClassName={`relative z-0 min-h-0 flex-1 px-5 pb-2.5 pt-2 ${
        filterOpen
          ? "flex overflow-hidden"
          : "hidden-scrollbar overflow-y-auto"
      }`}
      onMainScroll={filterOpen ? undefined : onScrollableScroll}
      overlay={
        <>
          <ModelDetailDrawer
            model={selectedModel}
            onClose={() => setSelectedModel(null)}
          />
          {showScrollTop ? (
            <button
              type="button"
              onClick={handleScrollTop}
              className="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg ring-1 ring-slate-200 transition hover:text-[var(--sf-primary)] hover:shadow-xl"
              aria-label="vertical-align-top"
            >
              <ScrollTopIcon className="size-4" />
            </button>
          ) : null}
        </>
      }
    >
      {catalogNote ? (
        <p
          className="mb-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
          role="status"
        >
          {catalogNote}
        </p>
      ) : null}
      {filterOpen ? (
        <div className="flex h-full min-h-0 w-full overflow-hidden">
          <ModelsFilterPanel
            sections={filterSections}
            selectedChips={selectedChips}
            onToggleChip={handleToggleChip}
          />
          <div className="my-2 mr-3 hidden w-px shrink-0 self-stretch bg-slate-200 lg:block" />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col pt-0">
            <ModelsToolbar
              filterOpen={filterOpen}
              onToggleFilter={() => setFilterOpen((v) => !v)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              hideFiltersLabel={ui.hideFilters}
              showFiltersLabel={ui.showFilters}
              searchPlaceholder={ui.searchPlaceholder}
            />
            <div
              ref={gridScrollRef}
              className="hidden-scrollbar min-h-0 flex-1 overflow-y-auto"
              onScroll={(e) => onScrollableScroll(e.currentTarget.scrollTop)}
            >
              <ModelGrid
                models={filtered}
                filterOpen={filterOpen}
                onSelectModel={setSelectedModel}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col pt-0">
          <ModelsToolbar
            filterOpen={filterOpen}
            onToggleFilter={() => setFilterOpen((v) => !v)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            hideFiltersLabel={ui.hideFilters}
            showFiltersLabel={ui.showFilters}
            searchPlaceholder={ui.searchPlaceholder}
          />
          <ModelGrid
            models={filtered}
            filterOpen={filterOpen}
            onSelectModel={setSelectedModel}
          />
        </div>
      )}
    </ConsoleShell>
  );
}
