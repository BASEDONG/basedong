"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MODELS, MODELS_PAGE } from "./content";
import { ModelCard } from "./ModelCard";

type Props = {
  typeFilter: string;
  sceneFilter: string;
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
};

function ChevronDownIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
    </svg>
  );
}

export function ModelsCatalog({
  typeFilter,
  sceneFilter,
  searchQuery,
  page,
  onPageChange,
}: Props) {
  const [reversed, setReversed] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = MODELS.filter((m) => {
      if (typeFilter !== "全部" && m.type !== typeFilter) return false;
      if (sceneFilter !== "全部" && !m.sceneTags.includes(sceneFilter)) {
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
  }, [typeFilter, sceneFilter, searchQuery, reversed]);

  const pageSize = MODELS_PAGE.pageSize;
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
    <div className="overflow-hidden px-8 pb-20">
      <section className="mx-auto w-full max-w-[1434px]">
        <div className="mb-[30px] flex items-center justify-between max-md:mb-[15px] max-md:flex-col max-md:items-start">
          <h3 className="text-2xl font-semibold text-slate-800">
            {MODELS_PAGE.catalogTitle}
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
              按默认排序
              <ChevronDownIcon />
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
              <ArrowDownIcon />
              倒序
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
              aria-label="Previous Page"
            >
              <ArrowLeftIcon />
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
              aria-label="Next Page"
            >
              <ArrowRightIcon />
            </button>
          </li>
          <li className="ml-2">
            <span className="inline-flex h-8 items-center rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-black/88">
              20 / page
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
