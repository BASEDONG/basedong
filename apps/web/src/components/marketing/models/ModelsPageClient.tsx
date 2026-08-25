"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ModelsCatalog } from "./ModelsCatalog";
import { ModelsHero } from "./ModelsHero";
import { ModelsSeries } from "./ModelsSeries";

export function ModelsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeFilter = searchParams.get("type") || "全部";
  const sceneFilter = searchParams.get("scene") || "全部";
  const appliedQuery = searchParams.get("q") || "";
  const page = Math.max(1, Number(searchParams.get("page") || "1") || 1);

  const [searchInput, setSearchInput] = useState(appliedQuery);

  useEffect(() => {
    setSearchInput(appliedQuery);
  }, [appliedQuery]);

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

      // Mirror original:
      // - filters only: ?type=… / ?scene=…
      // - search/hot: keep page=1, no pageSize
      // - page>1: page + pageSize=20
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

  return (
    <>
      <ModelsHero
        typeFilter={typeFilter}
        sceneFilter={sceneFilter}
        searchQuery={searchInput}
        onTypeFilter={onTypeFilter}
        onSceneFilter={onSceneFilter}
        onSearchQuery={setSearchInput}
        onSearch={onSearch}
        onHotModel={onHotModel}
      />
      <ModelsCatalog
        typeFilter={typeFilter}
        sceneFilter={sceneFilter}
        searchQuery={appliedQuery}
        page={page}
        onPageChange={onPageChange}
      />
      <ModelsSeries />
    </>
  );
}
