"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import type { PricingCategoryId, PricingChip } from "./content-types";
import { getPricingUiCopy } from "./pricing-ui-copy";
import { PricingHero } from "./PricingHero";
import { PricingTable } from "./PricingTable";
import { PricingToolbar } from "./PricingToolbar";
import { PricingVendorChips } from "./PricingVendorChips";
import { getPricingCatalog } from "@/lib/backend/client";
import {
  PRICING_SECTION_KEYS,
  pricingSectionHasModels,
  pricingToMarketingSections,
  type MarketingPricingView,
} from "@/lib/backend/catalog";

type LoadState = "loading" | "ready" | "empty" | "error";

export function PricingPageClient() {
  const { locale } = useLocale();
  const ui = getPricingUiCopy(locale);
  const emptySections = useMemo(
    () =>
      ({
        文本: {
          title: ui.chatTitle,
          headers: [],
          priceColumns: 3,
          groups: [],
        },
        图像: {
          title: ui.imageTitle,
          headers: [],
          priceColumns: 1,
          groups: [],
        },
        语音: {
          title: ui.audioTitle,
          headers: [],
          priceColumns: 1,
          groups: [],
        },
        视频: {
          title: ui.videoTitle,
          headers: [],
          priceColumns: 1,
          groups: [],
        },
      }) satisfies MarketingPricingView["sections"],
    [ui],
  );

  const [category, setCategory] = useState<PricingCategoryId>("全部");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [activeVendor, setActiveVendor] = useState<string | null>(null);

  const [view, setView] = useState<MarketingPricingView>({
    chips: [],
    sections: emptySections,
  });
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const catalog = await getPricingCatalog();
        if (cancelled) return;
        if (catalog.items.length === 0) {
          setView({ chips: [], sections: emptySections });
          setLoadState("empty");
          return;
        }
        setView(pricingToMarketingSections(catalog, locale));
        setLoadState("ready");
      } catch {
        if (cancelled) return;
        setView({ chips: [], sections: emptySections });
        setLoadState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [emptySections, locale]);

  const categoryTabs = useMemo((): PricingCategoryId[] => {
    if (loadState !== "ready") return ["全部"];
    const present = PRICING_SECTION_KEYS.filter((k) =>
      pricingSectionHasModels(view.sections, k),
    );
    return ["全部", ...present];
  }, [loadState, view.sections]);

  useEffect(() => {
    if (category === "全部") return;
    if (!categoryTabs.includes(category)) {
      setCategory("全部");
      setActiveVendor(null);
    }
  }, [category, categoryTabs]);

  const visibleSectionKeys = useMemo(() => {
    if (loadState !== "ready") return [];
    const keys =
      category === "全部"
        ? [...PRICING_SECTION_KEYS]
        : PRICING_SECTION_KEYS.filter((k) => k === category);
    return keys.filter((k) =>
      view.sections[k].groups.some((g) => g.models.length > 0),
    );
  }, [category, loadState, view]);

  const chips = useMemo(() => {
    if (loadState !== "ready") return [];
    const base = view.chips.filter((c) => c.name !== "Backend");
    if (category === "全部") return base;
    if (!pricingSectionHasModels(view.sections, category)) return base;
    const vendors = new Set(
      view.sections[category].groups.map((g) => g.vendor),
    );
    return base.filter((c) => vendors.has(c.name));
  }, [category, loadState, view]);

  function onSelectChip(chip: PricingChip) {
    setActiveVendor(chip.name);
    const el = document.getElementById(chip.providerId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const statusMessage =
    loadState === "loading"
      ? ui.loading
      : loadState === "empty"
        ? ui.empty
        : loadState === "error"
          ? ui.error
          : null;

  return (
    <>
      <PricingHero />

      <section className="sf-content relative pb-[72px]">
        {statusMessage ? (
          <p
            className="mb-6 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600"
            role="status"
          >
            {statusMessage}
          </p>
        ) : null}

        {loadState === "ready" ? (
          <>
            <PricingToolbar
              category={category}
              categories={categoryTabs}
              searchInput={searchInput}
              onCategoryChange={(c) => {
                setCategory(c);
                setActiveVendor(null);
              }}
              onSearchInputChange={setSearchInput}
              onSearch={() => setQuery(searchInput.trim())}
            />
            <PricingVendorChips
              chips={chips}
              activeVendor={activeVendor}
              onSelect={onSelectChip}
            />
            <div className="space-y-9 pt-7">
              {visibleSectionKeys.length === 0 ? (
                <p className="text-sm text-slate-500">{ui.emptyCategory}</p>
              ) : (
                visibleSectionKeys.map((key) => (
                  <PricingTable
                    key={key}
                    section={view.sections[key]}
                    query={query}
                  />
                ))
              )}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
