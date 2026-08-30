"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getPricingCatalog, getUserModels } from "@/lib/backend/client";
import { ConsoleShell } from "../shared/ConsoleShell";
import {
  enabledModelsToCards,
  pricingToModelCards,
} from "./catalog";
import { filterSections, modelsData } from "./content";
import type { FilterOption, FilterSection, ModelCardData } from "./content-types";
import { ModelDetailDrawer } from "./ModelDetailDrawer";
import { ModelGrid } from "./ModelGrid";
import { ModelsFilterPanel } from "./ModelsFilterPanel";
import { ModelsToolbar } from "./ModelsToolbar";
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

function matchesType(model: ModelCardData, label: string): boolean {
  return model.typeTags.includes(label);
}

function matchesTag(model: ModelCardData, label: string): boolean {
  const aliases = TAG_ALIASES[label] ?? [label];
  const haystack = model.featureTags.join(" ").toLowerCase();
  return aliases.some((alias) => haystack.includes(alias.toLowerCase()));
}

function matchesSeries(model: ModelCardData, label: string): boolean {
  if (label === "更多") return true;
  const aliases = SERIES_ALIASES[label] ?? [label];
  const haystack = `${model.title} ${model.provider}`.toLowerCase();
  return aliases.some((alias) => haystack.includes(alias.toLowerCase()));
}

function matchesContext(model: ModelCardData, label: string): boolean {
  const max = maxContextK(model);
  if (max <= 0) return false;
  if (label === "≥ 8K") return max >= 8;
  if (label === "≥ 16K") return max >= 16;
  if (label === "≥ 32K") return max >= 32;
  if (label === "≥ 128K") return max >= 128;
  return false;
}

function matchesSpec(model: ModelCardData, label: string): boolean {
  const max = maxParamB(model);
  if (max <= 0) return false;
  if (label === "10B 以下") return max < 10;
  if (label === "10 ~ 50B") return max >= 10 && max <= 50;
  if (label === "50 ~ 100B") return max > 50 && max <= 100;
  if (label === "100B 以上") return max > 100;
  return false;
}

function matchesDate(model: ModelCardData, label: string): boolean {
  if (!model.badge) return false;
  if (label === "近 30 天" || label === "近 90 天") {
    return /new/i.test(model.badge);
  }
  return false;
}

function matchesOption(
  model: ModelCardData,
  section: FilterSection,
  option: FilterOption,
): boolean {
  switch (section.id) {
    case "type":
      return matchesType(model, option.label);
    case "tag":
      return matchesTag(model, option.label);
    case "series":
      return matchesSeries(model, option.label);
    case "context":
      return matchesContext(model, option.label);
    case "spec":
      return matchesSpec(model, option.label);
    case "date":
      return matchesDate(model, option.label);
    default:
      return true;
  }
}

function filterModels(
  all: ModelCardData[],
  searchQuery: string,
  selectedChips: Set<string>,
): ModelCardData[] {
  const selectedBySection = filterSections
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
  const [catalog, setCatalog] = useState<ModelCardData[]>(modelsData);
  const [catalogSource, setCatalogSource] = useState<"backend" | "static">(
    "static",
  );
  const [catalogNote, setCatalogNote] = useState<string | null>(null);

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
          setCatalogSource("backend");
          setCatalogNote(null);
          return;
        }
        setCatalog(modelsData);
        setCatalogSource("static");
        setCatalogNote(
          "Backend 暂无可用模型目录，当前显示静态占位列表。配置 Channel 后将优先展示 Backend 目录。",
        );
      } catch {
        if (cancelled) return;
        setCatalog(modelsData);
        setCatalogSource("static");
        setCatalogNote("无法连接 Backend 模型目录，当前显示静态占位列表。");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setShowScrollTop(false);
    mainRef.current?.scrollTo({ top: 0 });
    gridScrollRef.current?.scrollTo({ top: 0 });
  }, [filterOpen]);

  const filtered = useMemo(
    () => filterModels(catalog, searchQuery, selectedChips),
    [catalog, searchQuery, selectedChips],
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
      title="模型广场"
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
              className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
              role="status"
            >
              {catalogNote}
              {catalogSource === "static"
                ? " （后续以 Backend /api/pricing 与 /api/user/models 为准）"
                : null}
            </p>
          ) : null}
          {filterOpen ? (
            <div className="flex h-full min-h-0 w-full overflow-hidden">
              <ModelsFilterPanel
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
                />
                <div
                  ref={gridScrollRef}
                  className="hidden-scrollbar min-h-0 flex-1 overflow-y-auto"
                  onScroll={(e) =>
                    onScrollableScroll(e.currentTarget.scrollTop)
                  }
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
