"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getInvoiceUiCopy } from "./invoice-ui-copy";
import { ApplyInvoiceButton } from "./ApplyInvoiceButton";
import { ApplyInvoiceDrawer } from "./ApplyInvoiceDrawer";
import { isInvoiceBusinessHours } from "./content";
import { InvoiceNoticeAlert } from "./InvoiceNoticeAlert";
import { InvoiceRecordsEmpty } from "./InvoiceRecordsEmpty";

export function InvoicePageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getInvoiceUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [canApply, setCanApply] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setCanApply(isInvoiceBusinessHours());
    sync();
    const id = window.setInterval(sync, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const openDrawer = useCallback(() => {
    if (!isInvoiceBusinessHours()) {
      setCanApply(false);
      setToast(copy.outsideHoursToast);
      window.setTimeout(() => setToast(null), 3000);
      return;
    }
    setDrawerOpen(true);
  }, [copy.outsideHoursToast]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="invoice"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <>
          <ApplyInvoiceDrawer
            copy={copy}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
          {toast ? (
            <div className="pointer-events-none fixed left-1/2 top-8 z-[1100] -translate-x-1/2 rounded-md bg-white px-4 py-2.5 text-sm text-slate-800 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
              {toast}
            </div>
          ) : null}
        </>
      }
    >
      <div className="min-w-[900px]">
        <div className="full flex flex-col overflow-hidden">
          <div className="w-full overflow-hidden">
            <div className="flex justify-between">
              <ApplyInvoiceButton
                copy={copy}
                canApply={canApply}
                onApply={openDrawer}
              />
            </div>
            <div className="mt-3">
              <InvoiceNoticeAlert copy={copy} />
            </div>
          </div>
          <InvoiceRecordsEmpty copy={copy} />
        </div>
      </div>
    </ConsoleShell>
  );
}
