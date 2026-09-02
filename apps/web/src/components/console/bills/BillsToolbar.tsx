"use client";

import { cn } from "@/lib/utils";
import type { BillsUiCopy } from "./bills-ui-copy";
import { getAllocationDimensionKeys } from "./bills-ui-copy";
import type { ViewMode } from "./content";
import { BillsSelect } from "./BillsSelect";
import { ExportIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsToolbarProps {
  copy: BillsUiCopy;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  allocationDimension: string;
  onAllocationDimensionChange: (v: string) => void;
  onOpenExportRecords: () => void;
  onExport: () => void;
}

export function BillsToolbar({
  copy,
  viewMode,
  onViewModeChange,
  allocationDimension,
  onAllocationDimensionChange,
  onOpenExportRecords,
  onExport,
}: BillsToolbarProps) {
  const allocationKeys = getAllocationDimensionKeys();

  return (
    <div
      className="flex min-w-max flex-wrap items-start gap-6"
      style={{ fontFamily: antFont }}
    >
      <div className="mb-4 flex h-10 items-center">
        <div
          role="radiogroup"
          aria-label="segmented control"
          className="inline-flex h-9 w-[156px] items-center rounded-[6px] bg-[#F8FAFC] p-1 text-[#64748B]"
        >
          {(
            [
              { key: "detail" as const, label: copy.viewDetail },
              { key: "allocation" as const, label: copy.viewAllocation },
            ] as const
          ).map((item) => {
            const selected = viewMode === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onViewModeChange(item.key)}
                className={cn(
                  "flex h-7 flex-1 cursor-pointer items-center justify-center rounded text-sm leading-7 transition-colors",
                  selected
                    ? "bg-white text-[#1E293B] shadow-sm"
                    : "bg-transparent text-[#64748B]",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "allocation" ? (
        <div className="mb-4 flex h-10 items-start">
          <div className="mr-3 mt-2 whitespace-nowrap text-sm leading-[22px] text-[#1E293B]">
            {copy.allocationLabel}
          </div>
          <BillsSelect
            value={allocationDimension}
            options={allocationKeys}
            labels={copy.allocationDimensionLabels}
            placeholder={
              copy.allocationDimensionLabels[allocationKeys[0] ?? ""] ??
              allocationKeys[0] ??
              ""
            }
            emptyText={copy.noData}
            onChange={(v) => {
              if (v) onAllocationDimensionChange(v);
            }}
            widthClass="w-[140px]"
          />
        </div>
      ) : null}

      <div className="mb-4 ml-auto flex h-10 items-center gap-0">
        <button
          type="button"
          onClick={onOpenExportRecords}
          className="flex h-8 cursor-pointer items-center rounded-[6px] px-[15px] text-sm leading-[22px] text-[#1E293B] underline"
        >
          {copy.exportRecords}
        </button>
        <button
          type="button"
          onClick={onExport}
          className="flex h-8 cursor-pointer items-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-[15px] text-sm leading-[22px] text-[#1E293B] shadow-[0_2px_0_0_rgba(0,0,0,0.02)] hover:border-[rgb(74,171,240)] hover:text-[rgb(74,171,240)]"
        >
          <ExportIcon className="text-current" />
          {copy.export}
        </button>
      </div>
    </div>
  );
}
