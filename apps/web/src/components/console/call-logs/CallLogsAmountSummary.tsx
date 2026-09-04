"use client";

import { useLocale } from "@/components/shared/LocaleProvider";
import type { UsageStat } from "@/lib/backend/client";
import { CONSOLE_SURFACE } from "../shared/console-ui";
import {
  formatConsoleCount,
  formatConsoleQuota,
} from "../shared/format-quota";
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
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-medium leading-5 text-slate-500">{label}</div>
      <div
        className={
          accent
            ? "text-2xl font-semibold leading-8 tracking-tight text-[rgb(74,171,240)]"
            : "text-2xl font-semibold leading-8 tracking-tight text-slate-800"
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
  const { targetLocale } = useLocale();
  return (
    <div
      className={`${CONSOLE_SURFACE} mb-1 flex items-end justify-between gap-6 px-6 py-4`}
    >
      <div className="flex flex-wrap gap-10">
        <Metric
          label={copy.quotaUsed}
          value={
            loading ? "…" : formatConsoleQuota(stat.quota, targetLocale)
          }
          accent
        />
        <Metric
          label={copy.rpm}
          value={loading ? "…" : formatConsoleCount(stat.rpm, targetLocale)}
        />
        <Metric
          label={copy.tpm}
          value={loading ? "…" : formatConsoleCount(stat.tpm, targetLocale)}
        />
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
