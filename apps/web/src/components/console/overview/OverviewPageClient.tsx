"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getSelf,
  getSelfQuotaData,
  type QuotaDataItem,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getOverviewUiCopy } from "./overview-ui-copy";

function aggregateByModel(rows: QuotaDataItem[]) {
  const map = new Map<string, { count: number; quota: number }>();
  for (const row of rows) {
    const name = row.model_name?.trim() || "—";
    const cur = map.get(name) ?? { count: 0, quota: 0 };
    cur.count += row.count ?? 0;
    cur.quota += row.quota ?? 0;
    map.set(name, cur);
  }
  return [...map.entries()]
    .map(([model, v]) => ({ model, ...v }))
    .sort((a, b) => b.quota - a.quota)
    .slice(0, 8);
}

export function OverviewPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getOverviewUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [quota, setQuota] = useState<number | null>(null);
  const [used, setUsed] = useState<number | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [models, setModels] = useState<
    { model: string; count: number; quota: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const end = Math.floor(Date.now() / 1000);
    const start = end - 7 * 24 * 3600;
    try {
      const [self, rows] = await Promise.all([
        getSelf(),
        getSelfQuotaData({
          startTimestamp: start,
          endTimestamp: end,
          defaultTime: "hour",
        }),
      ]);
      setQuota(typeof self.quota === "number" ? self.quota : 0);
      setUsed(typeof self.used_quota === "number" ? self.used_quota : 0);
      setRequestCount(rows.reduce((n, r) => n + (r.count ?? 0), 0));
      setModels(aggregateByModel(rows));
    } catch (e) {
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
      setModels([]);
      setRequestCount(0);
    } finally {
      setLoading(false);
    }
  }, [copy.loadFailed, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="overview"
      title={copy.pageTitle}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        <p className="text-xs text-slate-400">{copy.last7Days}</p>
        {error ? (
          <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: copy.remainingQuota, value: quota },
            { label: copy.usedQuota, value: used },
            { label: copy.requests, value: requestCount },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-[8px] border border-slate-200 bg-white px-4 py-5"
            >
              <div className="text-xs text-slate-500">{card.label}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-800">
                {loading || card.value == null ? "—" : card.value}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">
            {copy.topModels}
          </h2>
          {!loading && models.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">{copy.empty}</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {models.map((row) => (
                <li
                  key={row.model}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="truncate text-slate-700">{row.model}</span>
                  <span className="shrink-0 text-slate-500">
                    ×{row.count} · {row.quota}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ConsoleShell>
  );
}
