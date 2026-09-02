"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsPaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function NewsPagination({
  page,
  totalPages,
  pageSize,
  onPageChange,
}: NewsPaginationProps) {
  const pages = buildPageList(page, totalPages);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex h-8 items-center justify-center gap-4 text-sm text-[#030712]">
      <ul className="m-0 flex list-none items-center p-0">
        <li className="mr-2">
          <button
            type="button"
            disabled={!canPrev}
            aria-label="Previous Page"
            onClick={() => canPrev && onPageChange(page - 1)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-[6px] border-0 bg-transparent text-black/88",
              !canPrev && "cursor-not-allowed opacity-40",
              canPrev && "cursor-pointer hover:text-[#4AABF0]",
            )}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
        </li>
        {pages.map((item, index) => {
          if (item === "…") {
            return (
              <li key={`ellipsis-${index}`} className="mr-2">
                <span className="inline-flex h-8 w-8 items-center justify-center text-black/25">
                  •••
                </span>
              </li>
            );
          }
          const active = item === page;
          return (
            <li key={item} className="mr-2">
              <button
                type="button"
                onClick={() => onPageChange(item)}
                className={cn(
                  "inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-[6px] border border-transparent px-1.5 text-sm text-black/88",
                  active &&
                    "border-[#4AABF0] font-semibold text-[#4AABF0]",
                )}
              >
                {item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            disabled={!canNext}
            aria-label="Next Page"
            onClick={() => canNext && onPageChange(page + 1)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-[6px] border-0 bg-transparent text-black/88",
              !canNext && "cursor-not-allowed opacity-40",
              canNext && "cursor-pointer hover:text-[#4AABF0]",
            )}
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </li>
      </ul>
      <div className="inline-flex h-8 min-w-[101px] items-center justify-between rounded-[6px] border border-[#d9d9d9] bg-white px-[11px] text-sm text-black/88">
        <span>{pageSize} / page</span>
        <ChevronDown className="ml-1 h-3 w-3 text-black/25" aria-hidden />
      </div>
    </div>
  );
}

function buildPageList(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 4) {
    return [1, 2, 3, 4, 5, "…", totalPages];
  }
  if (page >= totalPages - 3) {
    return [
      1,
      "…",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [1, "…", page - 1, page, page + 1, "…", totalPages];
}
