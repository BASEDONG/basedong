"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getPricingCatalog,
  getUserModels,
  type PricingEndpointInfo,
} from "@/lib/backend/client";
import {
  extractCapabilityKeys,
} from "@/lib/backend/model-tags";
import { ConsoleShell } from "../shared/ConsoleShell";
import { enabledModelsToCards, pricingToModelCards } from "./catalog";
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

function matchesType(model: ModelCardData, matchKey: string): boolean {
  return model.typeTags.includes(matchKey);
}

function matchesTag(model: ModelCardData, matchKey: string): boolean {
  const key = matchKey.toLowerCase();
  return model.featureTags.some((tag) => tag.toLowerCase() === key);
}

function matchesSeries(model: ModelCardData, matchKey: string): boolean {
  return model.provider === matchKey;
}

function matchesContext(model: ModelCardData, matchKey: string): boolean {
  const max = model.contextK ?? 0;
  if (max <= 0) return false;
  if (matchKey === "≥ 128K") return max >= 128;
  if (matchKey === "≥ 256K") return max >= 256;
  if (matchKey === "≥ 512K") return max >= 512;
  if (matchKey === "≥ 1M") return max >= 1000;
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
      const haystack = `${model.title} ${model.provider} ${model.description}`.toLowerCase();
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const targetModelId = searchParams.get("target")?.trim() || "";
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
  const [endpointMap, setEndpointMap] = useState<
    Record<string, PricingEndpointInfo>
  >({});
  const [catalogNote, setCatalogNote] = useState<string | null>(null);

  const filterSections = useMemo(() => {
    const capabilityKeys = extractCapabilityKeys(
      catalog.map((m) => m.featureTags),
    );
    const typeKeys = [
      ...new Set(catalog.flatMap((m) => m.typeTags)),
    ];
    const vendors = [
      ...new Set(
        catalog
          .map((m) => m.provider.trim())
          .filter((name) => name.length > 0 && name !== "Backend"),
      ),
    ].sort((a, b) => a.localeCompare(b));
    return getFilterSections(targetLocale, {
      capabilityKeys,
      vendors,
      typeKeys,
    });
  }, [catalog, targetLocale]);

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
          setEndpointMap(pricing.supported_endpoint ?? {});
        }
        if (cards.length === 0 && enabled.length > 0) {
          cards = enabledModelsToCards(enabled);
          setEndpointMap({});
        }
        if (cards.length > 0) {
          setCatalog(cards);
          setCatalogNote(null);
          return;
        }
        setCatalog([]);
        setEndpointMap({});
        setCatalogNote(ui.emptyCatalog);
      } catch {
        if (cancelled) return;
        setCatalog([]);
        setEndpointMap({});
        setCatalogNote(ui.catalogError);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ui.emptyCatalog, ui.catalogError]);

  useEffect(() => {
    if (!targetModelId || catalog.length === 0) return;
    const match = catalog.find(
      (m) => m.id.toLowerCase() === targetModelId.toLowerCase(),
    );
    if (match) setSelectedModel(match);
  }, [catalog, targetModelId]);

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

  function handleCloseDrawer() {
    setSelectedModel(null);
    if (!targetModelId) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete("target");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
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
            endpointMap={endpointMap}
            onClose={handleCloseDrawer}
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
