"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  listSelfMjLogs,
  listSelfTasks,
  type TaskLogRow,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleEmptyState } from "../shared/ConsoleEmptyState";
import { ConsoleShell } from "../shared/ConsoleShell";
import {
  CONSOLE_PRIMARY_BTN_COMPACT,
  CONSOLE_SURFACE,
  CONSOLE_THEAD,
} from "../shared/console-ui";
import { formatDateISO } from "../call-logs/content";
import { getTaskLogsUiCopy } from "./task-logs-ui-copy";

type Kind = "drawing" | "tasks";

const PAGE_SIZE = 20;

function dayStartUnix(isoDate: string): number {
  return Math.floor(new Date(`${isoDate}T00:00:00`).getTime() / 1000);
}

function dayEndUnix(isoDate: string): number {
  return Math.floor(new Date(`${isoDate}T23:59:59`).getTime() / 1000);
}

function statusBadgeClass(status: string | undefined): string {
  const s = (status ?? "").toLowerCase();
  if (s.includes("success") || s.includes("done") || s === "completed") {
    return "bg-emerald-50 text-emerald-700";
  }
  if (s.includes("fail") || s.includes("error")) {
    return "bg-red-50 text-red-700";
  }
  if (s.includes("run") || s.includes("pend") || s.includes("progress")) {
    return "bg-sky-50 text-sky-700";
  }
  return "bg-slate-100 text-slate-600";
}

function formatSubmitTime(sec: number | undefined, locale: string): string {
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(locale, { hour12: false });
}

export function TaskLogsPageClient({ kind }: { kind: Kind }) {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getTaskLogsUiCopy(targetLocale), [targetLocale]);
  const today = formatDateISO(new Date());
  const weekAgo = formatDateISO(new Date(Date.now() - 6 * 24 * 3600 * 1000));

  const [collapsed, setCollapsed] = useState(false);
  const [startDate, setStartDate] = useState(weekAgo);
  const [endDate, setEndDate] = useState(today);
  const [idQuery, setIdQuery] = useState("");
  const [appliedStart, setAppliedStart] = useState(weekAgo);
  const [appliedEnd, setAppliedEnd] = useState(today);
  const [appliedId, setAppliedId] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<TaskLogRow[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const title = kind === "drawing" ? copy.drawingTitle : copy.tasksTitle;
  const activeKey = kind === "drawing" ? "drawing-logs" : "task-logs";

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTimestamp = dayStartUnix(appliedStart);
    const endTimestamp = dayEndUnix(appliedEnd);
    try {
      const result =
        kind === "drawing"
          ? await listSelfMjLogs({
              page,
              pageSize: PAGE_SIZE,
              startTimestamp,
              endTimestamp,
              mjId: appliedId || undefined,
            })
          : await listSelfTasks({
              page,
              pageSize: PAGE_SIZE,
              startTimestamp,
              endTimestamp,
              taskId: appliedId || undefined,
            });
      setRows(result.items);
      setTotal(result.total);
    } catch (e) {
      setRows([]);
      setTotal(0);
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
    } finally {
      setLoading(false);
    }
  }, [
    appliedEnd,
    appliedId,
    appliedStart,
    copy.loadFailed,
    kind,
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
    setAppliedId(idQuery.trim());
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey={activeKey}
      title={title}
    >
      <div className={`${CONSOLE_SURFACE} mb-3 flex flex-wrap items-end gap-3 p-3`}>
        <label className="text-xs text-slate-500">
          {copy.startDate}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block h-9 rounded-md border border-slate-300 px-2 text-sm"
          />
        </label>
        <label className="text-xs text-slate-500">
          {copy.endDate}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block h-9 rounded-md border border-slate-300 px-2 text-sm"
          />
        </label>
        <label className="text-xs text-slate-500">
          {kind === "drawing" ? copy.mjId : copy.taskId}
          <input
            value={idQuery}
            onChange={(e) => setIdQuery(e.target.value)}
            placeholder={
              kind === "drawing" ? copy.mjIdPlaceholder : copy.taskIdPlaceholder
            }
            className="mt-1 block h-9 min-w-[180px] rounded-md border border-slate-300 px-2 text-sm"
          />
        </label>
        <button
          type="button"
          className={CONSOLE_PRIMARY_BTN_COMPACT}
          onClick={onSearch}
        >
          {copy.search}
        </button>
        <button
          type="button"
          className={`ms-auto ${CONSOLE_PRIMARY_BTN_COMPACT}`}
          disabled={loading}
          onClick={() => void refresh()}
        >
          {loading ? "…" : copy.refresh}
        </button>
      </div>

      <div className={`${CONSOLE_SURFACE} overflow-hidden`}>
        {error ? (
          <p className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className={`${CONSOLE_THEAD} text-xs text-slate-500`}>
              <tr>
                <th className="px-4 py-3 font-medium">{copy.colId}</th>
                <th className="px-4 py-3 font-medium">{copy.colTime}</th>
                <th className="px-4 py-3 font-medium">{copy.colPlatform}</th>
                <th className="px-4 py-3 font-medium">{copy.colStatus}</th>
                <th className="px-4 py-3 font-medium">{copy.colProgress}</th>
                <th className="px-4 py-3 font-medium">{copy.colFailReason}</th>
              </tr>
            </thead>
            <tbody>
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-0">
                    <ConsoleEmptyState message={copy.empty} />
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={String(row.id ?? row.task_id ?? i)}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">
                      {row.mj_id ?? row.task_id ?? row.id ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                      {formatSubmitTime(row.submit_time, targetLocale)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.platform ?? row.action ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${statusBadgeClass(row.status)}`}
                      >
                        {row.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.progress ?? "—"}
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-3 text-slate-500">
                      {row.fail_reason || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
          <span>{copy.totalRows(total)}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border border-slate-200 px-2 py-1 disabled:opacity-40"
            >
              {copy.prevPage}
            </button>
            <span>{copy.pageOf(page, totalPages)}</span>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border border-slate-200 px-2 py-1 disabled:opacity-40"
            >
              {copy.nextPage}
            </button>
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
