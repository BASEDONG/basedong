"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import { getSelf } from "@/lib/backend/client";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getWalletUiCopy } from "./wallet-ui-copy";
import { OnlineRechargeForm } from "./OnlineRechargeForm";
import { RechargeRecordsTable } from "./RechargeRecordsTable";
import { defaultAmount } from "./content";

/**
 * 钱包 — only Backend-backed 充值 paths (online pay + redemption inside the form).
 * SiliconFlow voucher/package/auto-recharge shells are omitted.
 */
export function WalletPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getWalletUiCopy(targetLocale), [targetLocale]);

  const [collapsed, setCollapsed] = useState(false);
  const [amount, setAmount] = useState<number | "other">(defaultAmount);
  const [customAmount, setCustomAmount] = useState(50);
  const [quota, setQuota] = useState<number | null>(null);

  const refreshQuota = useCallback(async () => {
    try {
      const self = await getSelf();
      setQuota(typeof self.quota === "number" ? self.quota : 0);
    } catch {
      setQuota(null);
    }
  }, []);

  useEffect(() => {
    void refreshQuota();
  }, [refreshQuota]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="wallet"
      title={copy.pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
    >
      <div className="flex h-full w-full min-w-[1000px] flex-col gap-4">
        <div className="rounded-[8px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
          {copy.pageTitle}
          {quota != null ? ` Â· ${quota}` : null}
        </div>
        <div
          className={cn(
            "justify-start overflow-hidden rounded-md border border-dashed border-slate-300 px-6 py-5 min-h-[392px]",
          )}
        >
          <OnlineRechargeForm
            copy={copy}
            amount={amount}
            customAmount={customAmount}
            onAmountChange={setAmount}
            onCustomAmountChange={setCustomAmount}
          />
        </div>
        <RechargeRecordsTable copy={copy} />
      </div>
    </ConsoleShell>
  );
}
