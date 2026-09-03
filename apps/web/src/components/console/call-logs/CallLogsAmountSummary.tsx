"use client";

import type { UsageStat } from "@/lib/backend/client";
import type { CallLogsUiCopy } from "./call-logs-ui-copy";

interface CallLogsAmountSummaryProps {
  copy: CallLogsUiCopy;
  stat: UsageStat;
  loading?: boolean;
  onRefresh?: () => void;
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[12px] font-medium leading-5 text-[#64748B]">
        {label}
      </div>
      <div
        className={
          accent
            ? "font-Inter text-[24px] font-semibold leading-8 tracking-[-0.144px] text-[#4AABF0]"
            : "font-Inter text-[24px] font-semibold leading-8 tracking-[-0.144px] text-[#1E293B]"
        }
      >
        {value}
      </div>
    </div>
  );
}

export function CallLogsAmountSummary({
  copy,
  stat,
  loading,
  onRefresh,
}: CallLogsAmountSummaryProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-6 rounded-[8px] bg-white px-6 py-4">
      <div className="flex flex-wrap gap-10">
        <Metric
          label={copy.quotaUsed}
          value={loading ? "…" : stat.quota}
          accent
        />
        <Metric label={copy.rpm} value={loading ? "…" : stat.rpm} />
        <Metric label={copy.tpm} value={loading ? "…" : stat.tpm} />
      </div>
      {onRefresh ? (
        <button
          type="button"
          onClick={onRefresh}
          className="shrink-0 text-sm text-[rgb(74,171,240)] hover:underline"
        >
          {copy.refresh}
        </button>
      ) : null}
    </div>
  );
}
