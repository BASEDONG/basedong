"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPricingCatalog } from "@/lib/backend/client";
import {
  pricingToMarketingModelCards,
  resolveHotModels,
} from "@/lib/backend/catalog";
import {
  billingFilterOptions,
  endpointFilterOptions,
  vendorFilterOptions,
  type FilterChipOption,
} from "@/lib/backend/pricing-filters";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getModelsContent } from "./content";
import type { ModelCardData } from "./content-types";
import { ModelsCatalog } from "./ModelsCatalog";
import { ModelsHero } from "./ModelsHero";
import { ModelsSeries } from "./ModelsSeries";
import { ModelsToolbar } from "./ModelsToolbar";

type LoadState = "loading" | "ready" | "empty" | "error";

export function ModelsPageClient() {
  const { locale } = useLocale();
  const pageCopy = getModelsContent(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const vendorFilter = searchParams.get("vendor") || "";
  const billingFilter = searchParams.get("billing") || "";
  const endpointFilter = searchParams.get("endpoint") || "";
  const appliedQuery = searchParams.get("q") || "";
  const page = Math.max(1, Number(searchParams.get("page") || "1") || 1);

  const [searchInput, setSearchInput] = useState(appliedQuery);
  const [models, setModels] = useState<ModelCardData[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [searchSeed, setSearchSeed] = useState(appliedQuery);
  if (appliedQuery !== searchSeed) {
    setSearchSeed(appliedQuery);
    setSearchInput(appliedQuery);
  }

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const catalog = await getPricingCatalog();
        if (cancelled) return;
        const cards = pricingToMarketingModelCards(catalog, locale);
        if (cards.length === 0) {
          setModels([]);
          setLoadState("empty");
          return;
        }
        setModels(cards);
        setLoadState("ready");
      } catch {
        if (cancelled) return;
        setModels([]);
        setLoadState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const filterModels = useMemo(
    () =>
      models.map((m) => ({
        vendor: m.vendor,
        quotaType: m.quotaType,
        endpoints: m.endpoints ?? [],
      })),
    [models],
  );

  const vendorOptions = useMemo(
    () => vendorFilterOptions(filterModels, pageCopy.filterAll),
    [filterModels, pageCopy.filterAll],
  );

  const billingOptions = useMemo(
    () =>
      billingFilterOptions(filterModels, {
        all: pageCopy.filterAll,
        token: pageCopy.billingTokenLabel,
        request: pageCopy.billingRequestLabel,
      }),
    [
      filterModels,
      pageCopy.billingRequestLabel,
      pageCopy.billingTokenLabel,
      pageCopy.filterAll,
    ],
  );

  const endpointOptions = useMemo(
    () =>
      endpointFilterOptions(
        filterModels,
        pageCopy.filterAll,
        pageCopy.endpointDisplayLabel,
      ),
    [filterModels, pageCopy.endpointDisplayLabel, pageCopy.filterAll],
  );

  const hotModels = useMemo(
    () =>
      resolveHotModels(
        pageCopy.hotModels,
        models.map((m) => m.modelId),
      ),
    [models, pageCopy.hotModels],
  );

  const replaceQuery = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === "") {
          next.delete(key);
          continue;
        }
        next.set(key, value);
      }

      // Drop legacy / unused filter params
      next.delete("type");
      next.delete("scene");
      next.delete("tag");

      const pageVal = next.get("page");
      if (!pageVal || pageVal === "1") {
        next.delete("page");
        next.delete("pageSize");
      } else {
        next.set("pageSize", "20");
      }

      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const onFilter =
    (key: "vendor" | "billing" | "endpoint") =>
    (option: FilterChipOption) => {
      replaceQuery({ [key]: option.value || null, page: "1" });
    };

  const onSearch = useCallback(() => {
    const q = searchInput.trim();
    replaceQuery({ q: q || null, page: "1" });
  }, [replaceQuery, searchInput]);

  const onHotModel = useCallback(
    (name: string) => {
      setSearchInput(name);
      replaceQuery({ q: name, page: "1" });
    },
    [replaceQuery],
  );

  const onPageChange = useCallback(
    (p: number) => {
      replaceQuery({ page: p <= 1 ? null : String(p) });
    },
    [replaceQuery],
  );

  const statusMessage =
    loadState === "loading"
      ? pageCopy.statusLoading
      : loadState === "empty"
        ? pageCopy.statusEmpty
        : loadState === "error"
          ? pageCopy.statusError
          : null;

  return (
    <>
      <ModelsHero />
      {statusMessage ? (
        <div className="sf-content pt-4">
          <p
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600"
            role="status"
          >
            {statusMessage}
          </p>
        </div>
      ) : null}
      {loadState === "ready" ? (
        <>
          <ModelsToolbar
            vendorFilter={vendorFilter}
            billingFilter={billingFilter}
            endpointFilter={endpointFilter}
            searchQuery={searchInput}
            vendorOptions={vendorOptions}
            billingOptions={billingOptions}
            endpointOptions={endpointOptions}
            hotModels={hotModels}
            onVendorFilter={onFilter("vendor")}
            onBillingFilter={onFilter("billing")}
            onEndpointFilter={onFilter("endpoint")}
            onSearchQuery={setSearchInput}
            onSearch={onSearch}
            onHotModel={onHotModel}
          />
          <ModelsCatalog
            models={models}
            vendorFilter={vendorFilter}
            billingFilter={billingFilter}
            endpointFilter={endpointFilter}
            searchQuery={appliedQuery}
            page={page}
            onPageChange={onPageChange}
          />
          <ModelsSeries />
        </>
      ) : null}
    </>
  );
}
