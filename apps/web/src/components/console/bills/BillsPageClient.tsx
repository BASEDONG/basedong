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
import { ConsoleShell } from "../shared/ConsoleShell";
import { getBillsUiCopy } from "./bills-ui-copy";
import { getCallLogFilterCopy } from "./call-log-filter-copy";
import { BillsAmountSummary } from "./BillsAmountSummary";
import { formatDateISO } from "./content";

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

/** 调用记录 — usage-log filters (time / model / API Key name), not SiliconFlow billing chrome. */
export function BillsPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getBillsUiCopy(targetLocale), [targetLocale]);
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
  const [appliedModel, setAppliedModel] = useState("");
  const [appliedToken, setAppliedToken] = useState("");
  const [rows, setRows] = useState<UsageLog[]>([]);
  const [total, setTotal] = useState(0);
  const [stat, setStat] = useState<UsageStat>({ quota: 0, rpm: 0, tpm: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTimestamp = dayStartUnix(startDate);
    const endTimestamp = dayEndUnix(endDate);
    try {
      const [page, selfStat] = await Promise.all([
        listUsageLogs({
          page: 1,
          pageSize: 100,
          type: USAGE_LOG_TYPE_CONSUME,
          startTimestamp,
          endTimestamp,
          modelName: appliedModel || undefined,
          tokenName: appliedToken || undefined,
        }),
        getUsageSelfStat({
          type: USAGE_LOG_TYPE_CONSUME,
          startTimestamp,
          endTimestamp,
          modelName: appliedModel || undefined,
        }),
      ]);
      setRows(page.items);
      setTotal(page.total);
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
    appliedModel,
    appliedToken,
    copy.loadFailed,
    endDate,
    startDate,
    targetLocale,
  ]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onSearch = () => {
    setAppliedModel(modelName.trim());
    setAppliedToken(tokenName.trim());
  };

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="call-logs"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
    >
      <div className="flex w-full min-w-[900px] flex-col gap-3">
        <p className="text-sm text-slate-500">{filters.usageHint}</p>
        <div className="flex flex-wrap items-end gap-3 rounded-[8px] border border-slate-200 bg-white p-4">
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
              className="mt-1 block h-10 min-w-[160px] rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="text-xs text-slate-500">
            {filters.apiKeyName}
            <input
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder={filters.apiKeyNamePlaceholder}
              className="mt-1 block h-10 min-w-[160px] rounded-[6px] border border-slate-300 px-3 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={onSearch}
            className="h-10 rounded-[6px] bg-[#4AABF0] px-4 text-sm font-semibold text-white hover:bg-[#3A9BD8]"
          >
            {filters.search}
          </button>
        </div>

        <BillsAmountSummary
          copy={copy}
          stat={stat}
          loading={loading}
          onRefresh={() => void refresh()}
        />
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">{filters.colTime}</th>
                <th className="px-4 py-3 font-medium">{filters.colModel}</th>
                <th className="px-4 py-3 font-medium">{filters.colApiKey}</th>
                <th className="px-4 py-3 font-medium">{filters.colQuota}</th>
                <th className="px-4 py-3 font-medium">{filters.colTokens}</th>
              </tr>
            </thead>
            <tbody>
              {!loading && rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    {filters.empty}
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-slate-100 text-slate-700"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      {formatTs(row.created_at)}
                    </td>
                    <td className="px-4 py-3">{row.model_name ?? "—"}</td>
                    <td className="px-4 py-3">{row.token_name ?? "—"}</td>
                    <td className="px-4 py-3">{row.quota ?? 0}</td>
                    <td className="px-4 py-3">
                      {(row.prompt_tokens ?? 0) + (row.completion_tokens ?? 0)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="border-t border-slate-100 px-4 py-2 text-xs text-slate-400">
            {filters.totalRows(total)}
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
