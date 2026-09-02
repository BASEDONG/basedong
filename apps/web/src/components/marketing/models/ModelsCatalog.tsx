"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import { FILTER_ALL, getModelsContent } from "./content";
import type { ModelCardData } from "./content-types";
import { ModelCard } from "./ModelCard";

type Props = {
  models: ModelCardData[];
  typeFilter: string;
  vendorFilter: string;
  sceneFilter: string;
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
};

export function ModelsCatalog({
  models,
  typeFilter,
  vendorFilter,
  sceneFilter,
  searchQuery,
  page,
  onPageChange,
}: Props) {
  const { locale } = useLocale();
  const pageCopy = getModelsContent(locale);
  const [reversed, setReversed] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = models.filter((m) => {
      if (typeFilter !== FILTER_ALL && m.type !== typeFilter) return false;
      if (vendorFilter !== FILTER_ALL && m.vendor !== vendorFilter) return false;
      if (sceneFilter !== FILTER_ALL && !m.sceneTags.includes(sceneFilter)) {
        return false;
      }
      if (!q) return true;
      const hay = [m.modelId, m.vendor, m.description, ...m.sceneTags, ...m.features]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    if (reversed) list = [...list].reverse();
    return list;
  }, [models, typeFilter, vendorFilter, sceneFilter, searchQuery, reversed]);

  const pageSize = pageCopy.pageSize;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const pages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let start = Math.max(1, currentPage - 2);
    let end = start + 4;
    if (end > totalPages) {
      end = totalPages;
      start = end - 4;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);


  return (
    <div className="overflow-hidden pb-20">
      <section className="sf-content">
        <div className="mb-[30px] flex items-center justify-between max-md:mb-[15px] max-md:flex-col max-md:items-start">
          <h3 className="text-2xl font-semibold text-slate-800">
            {pageCopy.catalogTitle}
          </h3>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setReversed(false);
                onPageChange(1);
              }}
              className="flex cursor-pointer items-center gap-1.5 text-sm text-slate-800"
            >
              {pageCopy.sortDefault}
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => {
                setReversed((v) => !v);
                onPageChange(1);
              }}
              className={cn(
                "flex items-center gap-1 text-sm text-slate-800",
                reversed && "text-[#4AABF0]",
              )}
            >
              <ArrowDown className="h-4 w-4" aria-hidden />
              {pageCopy.sortReverse}
            </button>
          </div>
        </div>

        <div className="mb-[60px] grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-lg:grid-cols-1">
          {pageItems.map((model) => (
            <ModelCard key={model.modelId} model={model} />
          ))}
        </div>

        <ul className="mt-8 flex list-none items-center justify-center gap-2 p-0 text-sm text-black/88">
          <li>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-black/25 disabled:cursor-not-allowed"
              aria-label={pageCopy.paginationPrev}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
          </li>
          {pages.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                className={cn(
                  "flex h-8 min-w-8 items-center justify-center rounded-md border px-1.5 font-normal transition",
                  currentPage === p
                    ? "border-[#4AABF0] bg-white font-semibold text-[#4AABF0]"
                    : "border-transparent bg-white text-black/88 hover:border-[#4AABF0] hover:text-[#4AABF0]",
                )}
              >
                {p}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent disabled:cursor-not-allowed disabled:text-black/25"
              aria-label={pageCopy.paginationNext}
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </li>
          <li className="ml-2">
            <span className="inline-flex h-8 items-center rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-black/88">
              {pageCopy.pageSizeLabel}
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
