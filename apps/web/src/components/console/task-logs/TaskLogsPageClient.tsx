"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  listSelfMjLogs,
  listSelfTasks,
  type TaskLogRow,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getTaskLogsUiCopy } from "./task-logs-ui-copy";

type Kind = "drawing" | "tasks";

export function TaskLogsPageClient({ kind }: { kind: Kind }) {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getTaskLogsUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [rows, setRows] = useState<TaskLogRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const title = kind === "drawing" ? copy.drawingTitle : copy.tasksTitle;
  const activeKey = kind === "drawing" ? "drawing-logs" : "task-logs";

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const page =
        kind === "drawing" ? await listSelfMjLogs() : await listSelfTasks();
      setRows(page.items);
    } catch (e) {
      setRows([]);
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
    } finally {
      setLoading(false);
    }
  }, [copy.loadFailed, kind, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey={activeKey}
      title={title}
    >
      <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
        {error ? (
          <p className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">{copy.colId}</th>
              <th className="px-4 py-3 font-medium">{copy.colPlatform}</th>
              <th className="px-4 py-3 font-medium">{copy.colStatus}</th>
              <th className="px-4 py-3 font-medium">{copy.colProgress}</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-slate-500"
                >
                  {copy.empty}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={String(row.id ?? row.task_id ?? i)} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">
                    {row.task_id ?? row.id ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.platform ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.status ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.progress ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ConsoleShell>
  );
}
