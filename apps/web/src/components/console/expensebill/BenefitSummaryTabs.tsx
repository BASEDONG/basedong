"use client";

import { cn } from "@/lib/utils";
import { copy, type BenefitTab } from "./content";
import {
  BalanceCoinIcon,
  CouponTicketIcon,
  PackageBoxIcon,
} from "./icons";

interface BenefitSummaryTabsProps {
  active: BenefitTab;
  onChange: (tab: BenefitTab) => void;
  /** Live 额度 from Backend getSelf; null while loading. */
  quota: number | null;
}

function ActiveTopBar() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-px top-[-1px] z-[1] h-[3px] w-full rounded-t bg-[rgb(74,171,240)]"
    />
  );
}

export function BenefitSummaryTabs({
  active,
  onChange,
  quota,
}: BenefitSummaryTabsProps) {
  const quotaText = quota === null ? "—" : String(quota);

  return (
    <div role="tablist" className="sf-benefit-tab mb-4 flex w-full items-center">
      <button
        type="button"
        role="tab"
        aria-selected={active === "balance"}
        onClick={() => onChange("balance")}
        className={cn(
          "relative flex h-[110px] flex-[1.4] cursor-pointer items-center overflow-hidden rounded-t-lg bg-white/40 text-left transition-colors duration-300",
          active === "balance"
            ? "border border-transparent border-b-[#f7f5ff]"
            : "border border-slate-200",
        )}
      >
        {active === "balance" ? <ActiveTopBar /> : null}
        <div className="flex w-full items-center overflow-hidden border-none p-6 py-4 text-slate-800">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center">
              <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                <BalanceCoinIcon className="size-6 shrink-0" />
                <span>{copy.quotaLabel}</span>
              </div>
            </div>
            <div className="flex h-10 items-baseline gap-2">
              <div className="text-[32px] font-semibold text-[var(--sf-cloud-primary)]">
                <span>{quotaText}</span>
              </div>
            </div>
          </div>
        </div>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={active === "coupon"}
        onClick={() => onChange("coupon")}
        className={cn(
          "relative ml-2.5 flex h-[110px] min-w-[200px] flex-1 cursor-pointer items-center overflow-hidden rounded-t-lg bg-white/40 text-left transition-colors duration-300",
          active === "coupon"
            ? "border border-transparent border-b-white"
            : "border border-slate-200",
        )}
      >
        {active === "coupon" ? <ActiveTopBar /> : null}
        <div className="flex w-full items-center overflow-hidden border-none p-6 py-4 text-slate-800">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
              <CouponTicketIcon className="size-6 shrink-0" />
              <span>{copy.couponLabel}</span>
            </div>
            <div className="text-sm text-slate-500">{copy.couponSuffix}</div>
          </div>
        </div>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={active === "package"}
        onClick={() => onChange("package")}
        className={cn(
          "relative ml-2.5 flex h-[110px] min-w-[200px] flex-1 cursor-pointer items-center overflow-hidden rounded-t-lg bg-white/40 text-left transition-colors duration-300",
          active === "package"
            ? "border border-transparent border-b-white"
            : "border border-slate-200",
        )}
      >
        {active === "package" ? <ActiveTopBar /> : null}
        <div className="flex w-full items-center overflow-hidden border-none p-6 py-4 text-slate-800">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
              <PackageBoxIcon className="size-6 shrink-0" />
              <span>{copy.packageLabel}</span>
            </div>
            <div className="text-sm text-slate-500">{copy.packageSuffix}</div>
          </div>
        </div>
      </button>
    </div>
  );
}
