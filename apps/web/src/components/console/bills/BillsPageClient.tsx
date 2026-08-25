"use client";

import { useState } from "react";
import { ConsoleShell } from "../shared/ConsoleShell";
import { BillsAmountSummary } from "./BillsAmountSummary";
import { BillsDataTable } from "./BillsDataTable";
import { BillsFilterBar } from "./BillsFilterBar";
import { BillsToast } from "./BillsToast";
import { BillsToolbar } from "./BillsToolbar";
import { ExportRecordsModal } from "./ExportRecordsModal";
import {
  allocationDimensionOptions,
  copy,
  defaultAmounts,
  formatDateISO,
  pageTitle,
  type PeriodType,
  type ViewMode,
} from "./content";

export function BillsPageClient() {
  const today = formatDateISO(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [period, setPeriod] = useState<PeriodType>("day");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [products, setProducts] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [billingItems, setBillingItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("allocation");
  const [allocationDimension, setAllocationDimension] = useState<string>(
    allocationDimensionOptions[0],
  );
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="bills"
      title={pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <>
          <ExportRecordsModal
            open={exportModalOpen}
            onClose={() => setExportModalOpen(false)}
          />
          <BillsToast
            open={toastOpen}
            message={copy.exportToast}
            onClose={() => setToastOpen(false)}
          />
        </>
      }
    >
      <div className="flex w-full min-w-[1000px] flex-col">
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
        <BillsAmountSummary amounts={defaultAmounts} />
        <BillsToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          allocationDimension={allocationDimension}
          onAllocationDimensionChange={setAllocationDimension}
          onOpenExportRecords={() => setExportModalOpen(true)}
          onExport={() => setToastOpen(true)}
        />
        <BillsDataTable viewMode={viewMode} />
      </div>
    </ConsoleShell>
  );
}
