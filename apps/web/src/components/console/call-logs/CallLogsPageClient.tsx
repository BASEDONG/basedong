"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getUsageSelfStat,
  listUsageLogs,
  USAGE_LOG_TYPE_CONSUME,
  type UsageLog,
  type UsageStat,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleEmptyState } from "../shared/ConsoleEmptyState";
import { ConsoleShell } from "../shared/ConsoleShell";
import {
  CONSOLE_PRIMARY_BTN_COMPACT,
  CONSOLE_SURFACE,
  CONSOLE_THEAD,
} from "../shared/console-ui";
import {
  formatConsoleCount,
  formatConsoleQuota,
} from "../shared/format-quota";
import { getCallLogsUiCopy } from "./call-logs-ui-copy";
import { getCallLogFilterCopy } from "./call-log-filter-copy";
import { CallLogsAmountSummary } from "./CallLogsAmountSummary";
import { formatDateISO } from "./content";

const PAGE_SIZE = 20;

function dayStartUnix(isoDate: string): number {
  return Math.floor(new Date(`${isoDate}T00:00:00`).getTime() / 1000);
}

function dayEndUnix(isoDate: string): number {
  return Math.floor(new Date(`${isoDate}T23:59:59`).getTime() / 1000);
}

function formatTs(sec: number) {
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** 调用记录 — usage-log filters + stats against /api/log/self. */
export function CallLogsPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getCallLogsUiCopy(targetLocale), [targetLocale]);
  const filters = useMemo(
    () => getCallLogFilterCopy(targetLocale),
    [targetLocale],
  );
  const today = formatDateISO(new Date());
  const weekAgo = formatDateISO(new Date(Date.now() - 6 * 24 * 3600 * 1000));

  const [collapsed, setCollapsed] = useState(false);
  const [startDate, setStartDate] = useState(weekAgo);
  const [endDate, setEndDate] = useState(today);
  const [modelName, setModelName] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [group, setGroup] = useState("");
  const [requestId, setRequestId] = useState("");
  const [appliedStart, setAppliedStart] = useState(weekAgo);
  const [appliedEnd, setAppliedEnd] = useState(today);
  const [appliedModel, setAppliedModel] = useState("");
  const [appliedToken, setAppliedToken] = useState("");
  const [appliedGroup, setAppliedGroup] = useState("");
  const [appliedRequestId, setAppliedRequestId] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<UsageLog[]>([]);
  const [total, setTotal] = useState(0);
  const [stat, setStat] = useState<UsageStat>({ quota: 0, rpm: 0, tpm: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTimestamp = dayStartUnix(appliedStart);
    const endTimestamp = dayEndUnix(appliedEnd);
    try {
      const [pageData, selfStat] = await Promise.all([
        listUsageLogs({
          page,
          pageSize: PAGE_SIZE,
          type: USAGE_LOG_TYPE_CONSUME,
          startTimestamp,
          endTimestamp,
          modelName: appliedModel || undefined,
          tokenName: appliedToken || undefined,
          group: appliedGroup || undefined,
          requestId: appliedRequestId || undefined,
        }),
        getUsageSelfStat({
          type: USAGE_LOG_TYPE_CONSUME,
          startTimestamp,
          endTimestamp,
          modelName: appliedModel || undefined,
          tokenName: appliedToken || undefined,
          group: appliedGroup || undefined,
        }),
      ]);
      setRows(pageData.items);
      setTotal(pageData.total);
      setStat(selfStat);
    } catch (e) {
      setRows([]);
      setTotal(0);
      setStat({ quota: 0, rpm: 0, tpm: 0 });
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
    } finally {
      setLoading(false);
    }
  }, [
    appliedEnd,
    appliedGroup,
    appliedModel,
    appliedRequestId,
    appliedStart,
    appliedToken,
    copy.loadFailed,
    page,
    targetLocale,
  ]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onSearch = () => {
    setPage(1);
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    setAppliedModel(modelName.trim());
    setAppliedToken(tokenName.trim());
    setAppliedGroup(group.trim());
    setAppliedRequestId(requestId.trim());
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="call-logs"
      title={copy.pageTitle}
      textTone="black"
      mainClassName="min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
    >
      <div className="flex w-full flex-col gap-3">
        <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          {filters.usageHint}
        </p>
        <div className={`${CONSOLE_SURFACE} flex flex-wrap items-end gap-3 p-4`}>
          <label className="text-xs text-slate-500">
            {filters.startDate}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block h-10 rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            {filters.endDate}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block h-10 rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            {filters.modelName}
            <input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder={filters.modelNamePlaceholder}
              className="mt-1 block h-10 min-w-[140px] rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            {filters.apiKeyName}
            <input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder={filters.apiKeyNamePlaceholder}
              className="mt-1 block h-10 min-w-[140px] rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            {filters.group}
            <input
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder={filters.groupPlaceholder}
              className="mt-1 block h-10 min-w-[120px] rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            {filters.requestId}
            <input
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              placeholder={filters.requestIdPlaceholder}
              className="mt-1 block h-10 min-w-[160px] rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={onSearch}
            className={CONSOLE_PRIMARY_BTN_COMPACT}
          >
            {filters.search}
          </button>
        </div>

        <CallLogsAmountSummary
          copy={copy}
          stat={stat}
          loading={loading}
          onRefresh={() => void refresh()}
        />
        {error ? (
          <p
            className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className={`${CONSOLE_SURFACE} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className={`${CONSOLE_THEAD} text-xs text-slate-500`}>
                <tr>
                  <th className="px-4 py-3 font-medium">{filters.colTime}</th>
                  <th className="px-4 py-3 font-medium">{filters.colModel}</th>
                  <th className="px-4 py-3 font-medium">{filters.colApiKey}</th>
                  <th className="px-4 py-3 font-medium">{filters.colGroup}</th>
                  <th className="px-4 py-3 font-medium">{filters.colQuota}</th>
                  <th className="px-4 py-3 font-medium">{filters.colTokens}</th>
                  <th className="px-4 py-3 font-medium">{filters.colDuration}</th>
                  <th className="px-4 py-3 font-medium">{filters.colRequestId}</th>
                </tr>
              </thead>
              <tbody>
                {!loading && rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-0">
                      <ConsoleEmptyState message={filters.empty} />
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => {
                    const tokens =
                      (row.prompt_tokens ?? 0) + (row.completion_tokens ?? 0);
                    return (
                      <tr
                        key={row.id}
                        className="border-t border-slate-100 text-slate-700"
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          {formatTs(row.created_at)}
                        </td>
                        <td className="px-4 py-3">{row.model_name ?? "—"}</td>
                        <td className="px-4 py-3">{row.token_name ?? "—"}</td>
                        <td className="px-4 py-3">{row.group ?? "—"}</td>
                        <td className="px-4 py-3">
                          {formatConsoleQuota(row.quota ?? 0, targetLocale)}
                        </td>
                        <td className="px-4 py-3">
                          {formatConsoleCount(tokens, targetLocale)}
                        </td>
                        <td className="px-4 py-3">
                          {row.use_time != null
                            ? formatConsoleCount(row.use_time, targetLocale)
                            : "—"}
                        </td>
                        <td className="max-w-[160px] truncate px-4 py-3 font-mono text-xs">
                          {row.request_id ?? "—"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-2 text-xs text-slate-400">
            <span>{filters.totalRows(total)}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border border-slate-200 px-2 py-1 disabled:opacity-40"
              >
                {filters.prevPage}
              </button>
              <span>{filters.pageOf(page, totalPages)}</span>
              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border border-slate-200 px-2 py-1 disabled:opacity-40"
              >
                {filters.nextPage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
