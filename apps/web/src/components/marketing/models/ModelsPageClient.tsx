"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPricingCatalog } from "@/lib/backend/client";
import {
  pricingToMarketingModelCards,
  resolveHotModels,
} from "@/lib/backend/catalog";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getModelsContent } from "./content";
import type { ModelCardData, ModelType } from "./content-types";
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

  const typeFilter = searchParams.get("type") || "全部";
  const vendorFilter = searchParams.get("vendor") || "全部";
  const sceneFilter = searchParams.get("scene") || "全部";
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

  const vendorOptions = useMemo(() => {
    const names = [...new Set(models.map((m) => m.vendor).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b, "zh"),
    );
    return ["全部", ...names];
  }, [models]);

  const typeOptions = useMemo(() => {
    const present = new Set(models.map((m) => m.type));
    const closed = pageCopy.typeOptions.filter(
      (t) => t === "全部" || present.has(t as Exclude<ModelType, "全部">),
    );
    return closed.length > 1 ? closed : (["全部"] as ModelType[]);
  }, [models, pageCopy.typeOptions]);

  const sceneOptions = useMemo(() => {
    const tags = new Set<string>();
    for (const m of models) {
      for (const t of m.sceneTags) tags.add(t);
    }
    const dynamic = [...tags].sort((a, b) => a.localeCompare(b, "zh"));
    return ["全部", ...dynamic];
  }, [models]);

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
        if (value === null || value === "" || value === "全部") {
          next.delete(key);
          continue;
        }
        next.set(key, value);
      }

      const hasQ = Boolean(next.get("q"));
      const pageVal = next.get("page");

      if (hasQ && (!pageVal || pageVal === "1")) {
        next.set("page", "1");
        next.delete("pageSize");
      } else if (!pageVal || pageVal === "1") {
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

  const onTypeFilter = useCallback(
    (v: string) => {
      replaceQuery({ type: v === "全部" ? null : v, page: "1" });
    },
    [replaceQuery],
  );

  const onVendorFilter = useCallback(
    (v: string) => {
      replaceQuery({ vendor: v === "全部" ? null : v, page: "1" });
    },
    [replaceQuery],
  );

  const onSceneFilter = useCallback(
    (v: string) => {
      replaceQuery({ scene: v === "全部" ? null : v, page: "1" });
    },
    [replaceQuery],
  );

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
      replaceQuery({ page: String(p) });
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
            typeFilter={typeFilter}
            vendorFilter={vendorFilter}
            sceneFilter={sceneFilter}
            searchQuery={searchInput}
            typeOptions={typeOptions}
            vendorOptions={vendorOptions}
            sceneOptions={sceneOptions}
            hotModels={hotModels}
            onTypeFilter={onTypeFilter}
            onVendorFilter={onVendorFilter}
            onSceneFilter={onSceneFilter}
            onSearchQuery={setSearchInput}
            onSearch={onSearch}
            onHotModel={onHotModel}
          />
          <ModelsCatalog
            models={models}
            typeFilter={typeFilter}
            vendorFilter={vendorFilter}
            sceneFilter={sceneFilter}
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
