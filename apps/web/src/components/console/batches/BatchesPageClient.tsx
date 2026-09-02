"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { BatchesEmptyState } from "./BatchesEmptyState";
import { BatchesToolbar } from "./BatchesToolbar";
import { getBatchesUiCopy } from "./batches-ui-copy";
import { CreateBatchDrawer } from "./CreateBatchDrawer";

export function BatchesPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getBatchesUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="batches"
      title={copy.pageTitle}
      mainClassName="z-50 flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-2.5 pt-2"
      overlay={
        <CreateBatchDrawer
          open={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      }
    >
      <div className="full min-w-[900px]">
        <div className="full flex flex-col overflow-hidden">
          <div className="w-full shrink-0 overflow-hidden">
            <BatchesToolbar onCreate={() => setCreateOpen(true)} />
          </div>
          <div className="hidden-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto">
            <div
              id="sf-batch-list-scrollable"
              className="no-scrollbar flex h-full w-full flex-1 flex-col gap-3 space-y-3 overflow-y-scroll"
            >
              <BatchesEmptyState />
            </div>
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
