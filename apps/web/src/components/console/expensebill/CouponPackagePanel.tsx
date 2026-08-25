"use client";

import { cn } from "@/lib/utils";
import { ASSET, copy, type SegmentFilter } from "./content";
import { PlusIcon } from "./icons";

interface CouponPackagePanelProps {
  filter: SegmentFilter;
  onFilterChange: (f: SegmentFilter) => void;
}

export function CouponPackagePanel({
  filter,
  onFilterChange,
}: CouponPackagePanelProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div
          role="radiogroup"
          aria-label="segmented control"
          className="inline-flex h-9 w-[180px] rounded-md bg-slate-50 p-1 text-sm font-normal text-slate-800"
        >
          {(
            [
              ["all", copy.segmentAll],
              ["available", copy.segmentAvailable],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={filter === key}
              onClick={() => onFilterChange(key)}
              className={cn(
                "flex h-full flex-1 cursor-pointer items-center justify-center rounded text-sm transition-colors",
                filter === key
                  ? "bg-white font-medium text-slate-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-800",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md border-none bg-[rgb(74,171,240)] px-[15px] text-sm text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-colors hover:bg-[#5b21e6]"
        >
          <PlusIcon className="size-3.5" />
          {copy.redeemCenter}
        </button>
      </div>

      <div className="h-full flex-1 overflow-hidden">
        <div className="mt-[5%] flex flex-1 items-start justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSET.empty} alt="" width={320} height={240} />
        </div>
      </div>
    </div>
  );
}
