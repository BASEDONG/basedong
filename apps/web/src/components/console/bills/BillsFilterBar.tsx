"use client";

import {
  billingItemOptions,
  copy,
  dimensionCascaderOptions,
  periodOptions,
  productOptions,
  type PeriodType,
} from "./content";
import { BillsCascader } from "./BillsCascader";
import { BillsRangePicker } from "./BillsRangePicker";
import { BillsMultiSelect } from "./BillsSelect";
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
  products: string[];
  onProductsChange: (v: string[]) => void;
  dimensions: string[];
  onDimensionsChange: (v: string[]) => void;
  billingItems: string[];
  onBillingItemsChange: (v: string[]) => void;
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
    <div ref={rootRef} className="relative z-0 w-20 shrink-0">
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex h-10 w-full cursor-pointer items-center justify-between rounded-l-[8px] rounded-r-none border border-[#CBD5E1] bg-white px-[11px] text-base leading-[25px] text-[#1E293B] hover:z-[1] hover:border-[rgb(74,171,240)]",
          open && "z-[1] border-[rgb(74,171,240)]",
        )}
      >
        <span className="truncate">{label}</span>
        <ChevronDownIcon className="ml-1 size-3 shrink-0 text-[#94A3B8]" />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 z-[100] mt-1 w-[120px] overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white py-1 shadow-[0_6px_16px_0_rgba(0,0,0,0.08)]"
        >
          {periodOptions.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={cn(
                  "flex w-full cursor-pointer px-3 py-[5px] text-left text-sm hover:bg-black/[0.04]",
                  opt.value === value &&
                    "bg-[rgba(74,171,240,0.1)] text-[rgb(74,171,240)]",
                )}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
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
  products,
  onProductsChange,
  dimensions,
  onDimensionsChange,
  billingItems,
  onBillingItemsChange,
}: BillsFilterBarProps) {
  const itemOptions = products.length > 0 ? billingItemOptions : [];

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

      <div className="mb-4">
        <BillsMultiSelect
          values={products}
          options={productOptions}
          placeholder={copy.productPlaceholder}
          allLabel={copy.selectAll}
          onChange={onProductsChange}
        />
      </div>

      <div className="mb-4">
        <BillsCascader
          values={dimensions}
          options={dimensionCascaderOptions}
          placeholder={copy.dimensionPlaceholder}
          onChange={onDimensionsChange}
        />
      </div>

      <div className="mb-4">
        <BillsMultiSelect
          values={billingItems}
          options={itemOptions}
          placeholder={copy.itemPlaceholder}
          allLabel={copy.selectAll}
          onChange={onBillingItemsChange}
          widthClass="w-[280.8px]"
          emptyText={copy.noData}
        />
      </div>
    </div>
  );
}
