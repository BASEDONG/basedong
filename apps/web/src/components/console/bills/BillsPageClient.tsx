"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getUsageSelfStat,
  listUsageLogs,
  USAGE_LOG_TYPE_CONSUME,
  type UsageLog,
  type UsageStat,
} from "@/lib/backend/client";
import { ConsoleShell } from "../shared/ConsoleShell";
import { BillsAmountSummary } from "./BillsAmountSummary";
import { BillsDataTable } from "./BillsDataTable";
import { BillsFilterBar } from "./BillsFilterBar";
import { BillsToolbar } from "./BillsToolbar";
import {
  copy,
  formatDateISO,
  pageTitle,
  type PeriodType,
  type ViewMode,
} from "./content";

function dayStartUnix(isoDate: string): number {
  return Math.floor(new Date(`${isoDate}T00:00:00`).getTime() / 1000);
}

function dayEndUnix(isoDate: string): number {
  return Math.floor(new Date(`${isoDate}T23:59:59`).getTime() / 1000);
}

export function BillsPageClient() {
  const today = formatDateISO(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [period, setPeriod] = useState<PeriodType>("day");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [products, setProducts] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [billingItems, setBillingItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("detail");
  const [allocationDimension, setAllocationDimension] =
    useState<string>("模型服务视图");
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
        }),
        getUsageSelfStat({
          type: USAGE_LOG_TYPE_CONSUME,
          startTimestamp,
          endTimestamp,
        }),
      ]);
      setRows(page.items);
      setTotal(page.total);
      setStat(selfStat);
    } catch (e) {
      setRows([]);
      setTotal(0);
      setStat({ quota: 0, rpm: 0, tpm: 0 });
      setError(e instanceof Error ? e.message : "加载用量失败");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="bills"
      title={pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
    >
      <div className="flex w-full min-w-[1000px] flex-col">
        <p className="mb-3 text-sm text-slate-500">{copy.usageHint}</p>
        <BillsFilterBar
          period={period}
          onPeriodChange={setPeriod}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          products={products}
          onProductsChange={setProducts}
          dimensions={dimensions}
          onDimensionsChange={setDimensions}
          billingItems={billingItems}
          onBillingItemsChange={setBillingItems}
        />
        <BillsAmountSummary
          stat={stat}
          loading={loading}
          onRefresh={() => void refresh()}
        />
        {error ? (
          <p className="mb-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <BillsToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          allocationDimension={allocationDimension}
          onAllocationDimensionChange={setAllocationDimension}
          onOpenExportRecords={() => undefined}
          onExport={() => undefined}
        />
        <BillsDataTable
          viewMode={viewMode}
          rows={rows}
          total={total}
          loading={loading}
        />
      </div>
    </ConsoleShell>
  );
}
