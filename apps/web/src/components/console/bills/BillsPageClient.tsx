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
import { BillsAmountSummary } from "./BillsAmountSummary";
import { BillsDataTable } from "./BillsDataTable";
import { BillsFilterBar } from "./BillsFilterBar";
import { BillsToolbar } from "./BillsToolbar";
import {
  DEFAULT_ALLOCATION_DIMENSION,
  formatDateISO,
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
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getBillsUiCopy(targetLocale), [targetLocale]);
  const today = formatDateISO(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [period, setPeriod] = useState<PeriodType>("day");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [products, setProducts] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [billingItems, setBillingItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("detail");
  const [allocationDimension, setAllocationDimension] = useState<string>(
    DEFAULT_ALLOCATION_DIMENSION,
  );
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
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
    } finally {
      setLoading(false);
    }
  }, [copy.loadFailed, startDate, endDate, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="bills"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
    >
      <div className="flex w-full min-w-[1000px] flex-col">
        <p className="mb-3 text-sm text-slate-500">{copy.usageHint}</p>
        <BillsFilterBar
          copy={copy}
          locale={targetLocale}
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
          copy={copy}
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
          copy={copy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          allocationDimension={allocationDimension}
          onAllocationDimensionChange={setAllocationDimension}
          onOpenExportRecords={() => undefined}
          onExport={() => undefined}
        />
        <BillsDataTable
          copy={copy}
          viewMode={viewMode}
          rows={rows}
          total={total}
          loading={loading}
        />
      </div>
    </ConsoleShell>
  );
}
