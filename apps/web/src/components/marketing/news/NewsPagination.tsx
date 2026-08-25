"use client";

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
            <ChevronLeftIcon />
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
            <ChevronRightIcon />
          </button>
        </li>
      </ul>
      <div className="inline-flex h-8 min-w-[101px] items-center justify-between rounded-[6px] border border-[#d9d9d9] bg-white px-[11px] text-sm text-black/88">
        <span>{pageSize} / page</span>
        <ChevronDownIcon />
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

function ChevronLeftIcon() {
  return (
    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden>
      <path d="M765.7 486.8L314.9 134.7A8 8 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.86 31.86 0 000-50.4z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      width="12"
      height="12"
      fill="rgba(0,0,0,0.25)"
      aria-hidden
      className="ml-1"
    >
      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
    </svg>
  );
}
