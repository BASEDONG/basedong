"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { BackendError, redeemCode } from "@/lib/backend/client";
import { ASSET, type SegmentFilter } from "./content";
import type { ExpenseBillUiCopy } from "./expensebill-ui-copy";
import { PlusIcon } from "./icons";

interface CouponPackagePanelProps {
  copy: ExpenseBillUiCopy;
  filter: SegmentFilter;
  onFilterChange: (f: SegmentFilter) => void;
  onRedeemed?: (quotaAdded: number) => void;
}

export function CouponPackagePanel({
  copy,
  filter,
  onFilterChange,
  onRedeemed,
}: CouponPackagePanelProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setOkMsg(null);
    setBusy(true);
    try {
      const added = await redeemCode(code);
      setOkMsg(copy.redeemSuccess(added));
      setCode("");
      onRedeemed?.(added);
    } catch (err) {
      setError(
        err instanceof BackendError
          ? err.message || copy.redeemFailed
          : copy.redeemFailed,
      );
    } finally {
      setBusy(false);
    }
  }

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
          onClick={() => {
            setOpen(true);
            setError(null);
            setOkMsg(null);
          }}
          className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md border-none bg-[rgb(74,171,240)] px-[15px] text-sm text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-colors hover:bg-[#5b21e6]"
        >
          <PlusIcon className="size-3.5" />
          {copy.redeemCenter}
        </button>
      </div>

      {open ? (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4"
        >
          <label className="text-sm font-medium text-slate-800">
            {copy.redeemInputLabel}
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={copy.redeemPlaceholder}
              autoComplete="off"
              className="mt-1.5 block h-9 w-full max-w-md rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[rgb(74,171,240)]"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          ) : null}
          {okMsg ? (
            <p className="text-sm text-emerald-600" role="status">
              {okMsg}
            </p>
          ) : null}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy || !code.trim()}
              className="inline-flex h-8 cursor-pointer items-center rounded-md bg-[rgb(74,171,240)] px-4 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? copy.redeemSubmitting : copy.redeemSubmit}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 cursor-pointer items-center rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-700"
            >
              {copy.redeemCancel}
            </button>
          </div>
        </form>
      ) : (
        <div className="h-full flex-1 overflow-hidden">
          <div className="mt-[5%] flex flex-1 items-start justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSET.empty} alt="" width={320} height={240} />
          </div>
        </div>
      )}
    </div>
  );
}
