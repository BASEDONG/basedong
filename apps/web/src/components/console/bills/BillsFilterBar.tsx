"use client";

import {
  copy,
  periodOptions,
  type PeriodType,
} from "./content";
import { BillsRangePicker } from "./BillsRangePicker";
import { ChevronDownIcon } from "./icons";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsFilterBarProps {
  period: PeriodType;
  onPeriodChange: (v: PeriodType) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  /** Kept for call-site compatibility; unused (Backend has no product filter). */
  products?: string[];
  onProductsChange?: (v: string[]) => void;
  dimensions?: string[];
  onDimensionsChange?: (v: string[]) => void;
  billingItems?: string[];
  onBillingItemsChange?: (v: string[]) => void;
}

function PeriodSelect({
  value,
  onChange,
}: {
  value: PeriodType;
  onChange: (v: PeriodType) => void;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const label = periodOptions.find((o) => o.value === value)?.label ?? "按天";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 min-w-[88px] items-center justify-between gap-1 rounded-l-[6px] border border-r-0 border-slate-300 bg-white px-3 text-sm text-slate-700",
          open && "border-[rgb(74,171,240)]",
        )}
      >
        {label}
        <ChevronDownIcon className="size-3 text-slate-400" />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 min-w-full rounded-md border border-slate-200 bg-white py-1 shadow-md"
        >
          {periodOptions.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                className="flex w-full px-3 py-1.5 text-left text-sm hover:bg-slate-50"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function BillsFilterBar({
  period,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: BillsFilterBarProps) {
  return (
    <div className="mb-0 flex flex-wrap gap-4" style={{ fontFamily: antFont }}>
      <div className="mb-4 flex h-10 min-w-fit items-stretch">
        <PeriodSelect value={period} onChange={onPeriodChange} />
        <BillsRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </div>
      <p className="mb-4 flex h-10 items-center text-xs text-slate-400">
        {copy.filterHint}
      </p>
    </div>
  );
}
