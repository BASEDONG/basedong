"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getSelf,
  getSelfFlowQuotaData,
  getSelfQuotaData,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { cn } from "@/lib/utils";
import { ConsoleEmptyState } from "../shared/ConsoleEmptyState";
import { ConsoleShell } from "../shared/ConsoleShell";
import {
  CONSOLE_PRIMARY_BTN_COMPACT,
  CONSOLE_SURFACE,
} from "../shared/console-ui";
import {
  formatConsoleCount,
  formatConsoleQuota,
} from "../shared/format-quota";
import {
  OVERVIEW_PRESET_DAYS,
  aggregateByModel,
  bucketByGranularity,
  buildFlowModelRanks,
  buildFlowTokenRanks,
  calculateDashboardStats,
  isValidOverviewRange,
  resolvePresetRange,
  type NamedRank,
  type TimeBucket,
  type TimeGranularity,
} from "./overview-aggregate";
import { getOverviewUiCopy } from "./overview-ui-copy";

function toDateInputValue(sec: number): string {
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function fromDateInputValue(value: string, endOfDay: boolean): number {
  const [y, m, day] = value.split("-").map((x) => Number(x));
  if (!y || !m || !day) return NaN;
  const d = endOfDay
    ? new Date(y, m - 1, day, 23, 59, 59)
    : new Date(y, m - 1, day, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

function formatBucketLabel(start: number, locale: string): string {
  return new Date(start * 1000).toLocaleString(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function TrendBars({
  buckets,
  locale,
  empty,
}: {
  buckets: TimeBucket[];
  locale: string;
  empty: string;
}) {
  if (buckets.length === 0) {
    return <ConsoleEmptyState message={empty} />;
  }
  const max = Math.max(...buckets.map((b) => b.quota), 1);
  return (
    <div className="mt-3 flex h-36 items-end gap-1">
      {buckets.map((b) => {
        const h = Math.max(4, Math.round((b.quota / max) * 100));
        return (
          <div
            key={b.start}
            className="group relative flex min-w-0 flex-1 flex-col items-center justify-end"
            title={`${formatBucketLabel(b.start, locale)} · ${b.quota}`}
          >
            <div
              className="w-full max-w-[28px] rounded-t bg-[rgb(74,171,240)]/80 transition-colors group-hover:bg-[rgb(74,171,240)]"
              style={{ height: `${Math.max(4, (h / 100) * 128)}px` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function RankList({
  rows,
  locale,
  empty,
}: {
  rows: NamedRank[];
  locale: string;
  empty: string;
}) {
  if (rows.length === 0) {
    return <ConsoleEmptyState message={empty} />;
  }
  const max = Math.max(...rows.map((r) => r.quota), 1);
  return (
    <ul className="mt-2 space-y-2">
      {rows.map((row) => (
        <li key={row.name} className="text-sm">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="truncate text-slate-700">{row.name}</span>
            <span className="shrink-0 text-slate-500">
              ×{formatConsoleCount(row.count, locale)} ·{" "}
              {formatConsoleQuota(row.quota, locale)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded bg-slate-100">
            <div
              className="h-full rounded bg-[rgb(74,171,240)]/70"
              style={{ width: `${Math.round((row.quota / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * 用量概览 — self balance + data/self density + light flow/self ranks.
 */
export function OverviewPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getOverviewUiCopy(targetLocale), [targetLocale]);

  const initial = resolvePresetRange(7);
  const [collapsed, setCollapsed] = useState(false);
  const [presetDays, setPresetDays] = useState<number | "custom">(7);
  const [granularity, setGranularity] = useState<TimeGranularity>("hour");
  const [startTs, setStartTs] = useState(initial.start);
  const [endTs, setEndTs] = useState(initial.end);
  const [draftStart, setDraftStart] = useState(toDateInputValue(initial.start));
  const [draftEnd, setDraftEnd] = useState(toDateInputValue(initial.end));

  const [balanceQuota, setBalanceQuota] = useState<number | null>(null);
  const [balanceUsed, setBalanceUsed] = useState<number | null>(null);
  const [rangeStats, setRangeStats] = useState({
    totalQuota: 0,
    totalCount: 0,
    totalTokens: 0,
  });
  const [buckets, setBuckets] = useState<TimeBucket[]>([]);
  const [models, setModels] = useState<NamedRank[]>([]);
  const [flowKeys, setFlowKeys] = useState<NamedRank[]>([]);
  const [flowModels, setFlowModels] = useState<NamedRank[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [rangeError, setRangeError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const applyPreset = (days: number) => {
    const range = resolvePresetRange(days);
    setPresetDays(days);
    setStartTs(range.start);
    setEndTs(range.end);
    setDraftStart(toDateInputValue(range.start));
    setDraftEnd(toDateInputValue(range.end));
    setRangeError(null);
  };

  const applyCustom = () => {
    const start = fromDateInputValue(draftStart, false);
    const end = fromDateInputValue(draftEnd, true);
    if (!isValidOverviewRange(start, end)) {
      setRangeError(copy.rangeInvalid);
      return;
    }
    setPresetDays("custom");
    setStartTs(start);
    setEndTs(end);
    setRangeError(null);
  };

  const refresh = useCallback(async () => {
    if (!isValidOverviewRange(startTs, endTs)) {
      setRangeError(copy.rangeInvalid);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [self, rows, flow] = await Promise.all([
        getSelf(),
        getSelfQuotaData({
          startTimestamp: startTs,
          endTimestamp: endTs,
          defaultTime: granularity,
        }),
        getSelfFlowQuotaData({
          startTimestamp: startTs,
          endTimestamp: endTs,
          defaultTime: granularity,
        }),
      ]);
      setBalanceQuota(typeof self.quota === "number" ? self.quota : 0);
      setBalanceUsed(typeof self.used_quota === "number" ? self.used_quota : 0);
      setRangeStats(calculateDashboardStats(rows));
      setBuckets(bucketByGranularity(rows, granularity));
      setModels(aggregateByModel(rows));
      setFlowKeys(buildFlowTokenRanks(flow));
      setFlowModels(buildFlowModelRanks(flow));
    } catch (e) {
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
      setRangeStats({ totalQuota: 0, totalCount: 0, totalTokens: 0 });
      setBuckets([]);
      setModels([]);
      setFlowKeys([]);
      setFlowModels([]);
    } finally {
      setLoading(false);
    }
  }, [
    copy.loadFailed,
    copy.rangeInvalid,
    endTs,
    granularity,
    startTs,
    targetLocale,
  ]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const emptyMsg = copy.emptyRange;
  const hasRangeData = rangeStats.totalCount > 0 || rangeStats.totalQuota > 0;

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="overview"
      title={copy.pageTitle}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
        <div className={`${CONSOLE_SURFACE} flex flex-col gap-3 p-3`}>
          <div className="flex flex-wrap items-center gap-2">
            {OVERVIEW_PRESET_DAYS.map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => applyPreset(days)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs",
                  presetDays === days
                    ? "border-[rgb(74,171,240)] text-[rgb(74,171,240)]"
                    : "border-slate-200 text-slate-600",
                )}
              >
                {copy.presetDays(days)}
              </button>
            ))}
            <span className="mx-1 h-4 w-px bg-slate-200" />
            {(
              [
                ["hour", copy.granularityHour],
                ["day", copy.granularityDay],
                ["week", copy.granularityWeek],
              ] as const
            ).map(([g, label]) => (
              <button
                key={g}
                type="button"
                onClick={() => setGranularity(g)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs",
                  granularity === g
                    ? "border-[rgb(74,171,240)] text-[rgb(74,171,240)]"
                    : "border-slate-200 text-slate-600",
                )}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className={`ms-auto ${CONSOLE_PRIMARY_BTN_COMPACT}`}
              disabled={loading}
              onClick={() => void refresh()}
            >
              {loading ? "…" : copy.refresh}
            </button>
          </div>
          <div className="flex flex-wrap items-end gap-2 text-xs text-slate-600">
            <label className="flex flex-col gap-1">
              <span>{copy.startDate}</span>
              <input
                type="date"
                value={draftStart}
                onChange={(e) => {
                  setDraftStart(e.target.value);
                  setPresetDays("custom");
                }}
                className="rounded-md border border-slate-200 px-2 py-1"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span>{copy.endDate}</span>
              <input
                type="date"
                value={draftEnd}
                onChange={(e) => {
                  setDraftEnd(e.target.value);
                  setPresetDays("custom");
                }}
                className="rounded-md border border-slate-200 px-2 py-1"
              />
            </label>
            <button
              type="button"
              onClick={applyCustom}
              className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-700"
            >
              {copy.applyRange}
            </button>
          </div>
          {rangeError ? (
            <p className="text-xs text-amber-700" role="alert">
              {rangeError}
            </p>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <section className={`${CONSOLE_SURFACE} overflow-hidden`}>
          <div className="border-b border-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
            {copy.balanceSection}
          </div>
          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-3">
              <div className="text-xs text-slate-500">{copy.remainingQuota}</div>
              <div className="mt-1 text-xl font-semibold text-slate-800">
                {loading || balanceQuota == null
                  ? "—"
                  : formatConsoleQuota(balanceQuota, targetLocale)}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs text-slate-500">{copy.usedQuota}</div>
              <div className="mt-1 text-xl font-semibold text-slate-800">
                {loading || balanceUsed == null
                  ? "—"
                  : formatConsoleQuota(balanceUsed, targetLocale)}
              </div>
            </div>
          </div>
        </section>

        <section className={`${CONSOLE_SURFACE} overflow-hidden`}>
          <div className="border-b border-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
            {copy.rangeSection}
          </div>
          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-3">
              <div className="text-xs text-slate-500">{copy.rangeQuota}</div>
              <div className="mt-1 text-xl font-semibold text-slate-800">
                {loading
                  ? "—"
                  : formatConsoleQuota(rangeStats.totalQuota, targetLocale)}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs text-slate-500">{copy.rangeRequests}</div>
              <div className="mt-1 text-xl font-semibold text-slate-800">
                {loading
                  ? "—"
                  : formatConsoleCount(rangeStats.totalCount, targetLocale)}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs text-slate-500">{copy.rangeTokens}</div>
              <div className="mt-1 text-xl font-semibold text-slate-800">
                {loading
                  ? "—"
                  : formatConsoleCount(rangeStats.totalTokens, targetLocale)}
              </div>
            </div>
          </div>
        </section>

        <div className={`${CONSOLE_SURFACE} p-4`}>
          <h2 className="text-sm font-semibold text-slate-700">
            {copy.trendTitle}
          </h2>
          {!loading && !hasRangeData ? (
            <ConsoleEmptyState message={emptyMsg} />
          ) : (
            <TrendBars
              buckets={buckets}
              locale={targetLocale}
              empty={emptyMsg}
            />
          )}
        </div>

        <div className={`${CONSOLE_SURFACE} p-4`}>
          <h2 className="text-sm font-semibold text-slate-700">
            {copy.topModels}
          </h2>
          {!loading ? (
            <RankList rows={models} locale={targetLocale} empty={emptyMsg} />
          ) : null}
        </div>

        <section className={`${CONSOLE_SURFACE} p-4`}>
          <h2 className="text-sm font-semibold text-slate-700">
            {copy.flowSection}
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-medium text-slate-500">
                {copy.flowByKey}
              </h3>
              {!loading ? (
                <RankList
                  rows={flowKeys}
                  locale={targetLocale}
                  empty={emptyMsg}
                />
              ) : null}
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-500">
                {copy.flowByModel}
              </h3>
              {!loading ? (
                <RankList
                  rows={flowModels}
                  locale={targetLocale}
                  empty={emptyMsg}
                />
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </ConsoleShell>
  );
}
