"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getSelf,
  getTopupInfo,
  type BackendUser,
  type TopupInfo,
} from "@/lib/backend/client";
import { ConsoleShell } from "../shared/ConsoleShell";
import { MessageToast } from "../shared/MessageToast";
import { CONSOLE_SURFACE } from "../shared/console-ui";
import {
  formatConsoleCount,
  formatConsoleQuota,
} from "../shared/format-quota";
import { notifySelfUpdated } from "../shared/self-events";
import {
  profileHeaderStats,
  type ProfileHeaderStats,
} from "../profile/profile-stats";
import { AffiliateRewardsCard } from "./AffiliateRewardsCard";
import { getWalletUiCopy } from "./wallet-ui-copy";
import { OnlineRechargeForm } from "./OnlineRechargeForm";
import { RechargeRecordsTable } from "./RechargeRecordsTable";
import { SubscriptionPlansCard } from "./SubscriptionPlansCard";
import { defaultAmount } from "./content";

/**
 * 钱包 — recharge + subscription/aff (when Backend offers) + redeem + history.
 */
export function WalletPageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getWalletUiCopy(targetLocale), [targetLocale]);

  const [collapsed, setCollapsed] = useState(false);
  const [amount, setAmount] = useState<number | "other">(defaultAmount);
  const [customAmount, setCustomAmount] = useState(50);
  const [self, setSelf] = useState<BackendUser | null>(null);
  const [stats, setStats] = useState<ProfileHeaderStats | null>(null);
  const [topupInfo, setTopupInfo] = useState<TopupInfo | null>(null);
  const [recordsTick, setRecordsTick] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const refreshSelf = useCallback(async () => {
    try {
      const me = await getSelf();
      setSelf(me);
      setStats(profileHeaderStats(me));
      notifySelfUpdated();
    } catch {
      setSelf(null);
      setStats(null);
    }
  }, []);

  const refreshTopup = useCallback(async () => {
    try {
      setTopupInfo(await getTopupInfo());
    } catch {
      setTopupInfo(null);
    }
  }, []);

  const refreshAfterReturn = useCallback(() => {
    void refreshSelf();
    void refreshTopup();
    setRecordsTick((n) => n + 1);
  }, [refreshSelf, refreshTopup]);

  useEffect(() => {
    void refreshSelf();
    void refreshTopup();
  }, [refreshSelf, refreshTopup]);

  // Payment gateways return the user to /me/wallet; refresh when the tab is focused again.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        refreshAfterReturn();
      }
    };
    window.addEventListener("focus", refreshAfterReturn);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", refreshAfterReturn);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshAfterReturn]);

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="wallet"
      title={copy.pageTitle}
      textTone="black"
      mainClassName="min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <MessageToast
          open={toast !== null}
          type={toast?.type ?? "success"}
          message={toast?.message ?? ""}
          onClose={() => setToast(null)}
        />
      }
    >
      <div className="flex w-full flex-col gap-3">
        {stats ? (
          <section className={`${CONSOLE_SURFACE} overflow-hidden`}>
            <div className="border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-800">
                {copy.sectionStats}
              </h2>
            </div>
            <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="px-4 py-3">
                <div className="text-xs text-slate-500">{copy.statQuota}</div>
                <div className="mt-1 font-mono text-lg font-semibold text-slate-800">
                  {formatConsoleQuota(stats.quota, targetLocale)}
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="text-xs text-slate-500">
                  {copy.statUsedQuota}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold text-slate-800">
                  {formatConsoleQuota(stats.usedQuota, targetLocale)}
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="text-xs text-slate-500">
                  {copy.statRequests}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold text-slate-800">
                  {formatConsoleCount(stats.requestCount, targetLocale)}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <div className={`${CONSOLE_SURFACE} px-4 py-3`}>
          <OnlineRechargeForm
            copy={copy}
            amount={amount}
            customAmount={customAmount}
            onAmountChange={setAmount}
            onCustomAmountChange={setCustomAmount}
            onQuotaRefresh={() => void refreshSelf()}
            onToast={(message, type = "success") =>
              setToast({ message, type })
            }
          />
        </div>

        <SubscriptionPlansCard
          copy={copy}
          targetLocale={targetLocale}
          topupInfo={topupInfo}
          userQuota={self?.quota ?? 0}
          onNotice={(message) => setToast({ message, type: "success" })}
          onError={(message) => setToast({ message, type: "error" })}
          onPurchaseSuccess={() => {
            void refreshSelf();
            setRecordsTick((n) => n + 1);
          }}
        />

        <AffiliateRewardsCard
          copy={copy}
          targetLocale={targetLocale}
          self={self}
          complianceConfirmed={Boolean(
            topupInfo?.payment_compliance_confirmed,
          )}
          onNotice={(message) => setToast({ message, type: "success" })}
          onError={(message) => setToast({ message, type: "error" })}
          onTransferred={() => void refreshSelf()}
        />

        <RechargeRecordsTable
          copy={copy}
          locale={targetLocale}
          refreshToken={recordsTick}
        />
      </div>
    </ConsoleShell>
  );
}
