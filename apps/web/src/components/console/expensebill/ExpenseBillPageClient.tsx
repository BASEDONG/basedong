"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ConsoleShell } from "../shared/ConsoleShell";
import { AutoRechargeForm } from "./AutoRechargeForm";
import { BalanceWarningModal, type WarningMode } from "./BalanceWarningModal";
import { BenefitSummaryTabs } from "./BenefitSummaryTabs";
import { CouponPackagePanel } from "./CouponPackagePanel";
import { OnlineRechargeForm } from "./OnlineRechargeForm";
import { RechargeMethodTabs } from "./RechargeMethodTabs";
import { RechargeRecordsTable } from "./RechargeRecordsTable";
import {
  defaultAmount,
  defaultAutoAmount,
  defaultAutoThreshold,
  pageTitle,
  type BenefitTab,
  type RechargeMethod,
  type SegmentFilter,
} from "./content";

function tabFromSearch(raw: string | null): BenefitTab {
  if (raw === "coupon") return "coupon";
  if (raw === "package") return "package";
  return "balance";
}

function searchFromTab(tab: BenefitTab): string | null {
  if (tab === "coupon") return "coupon";
  if (tab === "package") return "package";
  return null;
}

export function ExpenseBillPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [collapsed, setCollapsed] = useState(false);
  const [benefit, setBenefit] = useState<BenefitTab>(() =>
    tabFromSearch(searchParams.get("tab")),
  );
  const [method, setMethod] = useState<RechargeMethod>("online");
  const [amount, setAmount] = useState<number | "other">(defaultAmount);
  const [customAmount, setCustomAmount] = useState(50);
  const [autoThreshold, setAutoThreshold] = useState<number | "other">(
    defaultAutoThreshold,
  );
  const [autoAmount, setAutoAmount] = useState<number | "other">(
    defaultAutoAmount,
  );
  const [segment, setSegment] = useState<SegmentFilter>("all");
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMode, setWarningMode] = useState<WarningMode>("auto");
  const [warningThreshold, setWarningThreshold] = useState(1);

  useEffect(() => {
    setBenefit(tabFromSearch(searchParams.get("tab")));
  }, [searchParams]);

  const onBenefitChange = useCallback(
    (tab: BenefitTab) => {
      setBenefit(tab);
      const next = new URLSearchParams(searchParams.toString());
      const q = searchFromTab(tab);
      if (q) next.set("tab", q);
      else next.delete("tab");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="wallet"
      title={pageTitle}
      notificationCount={0}
      textTone="black"
      mainClassName="z-50 min-h-0 flex-1 overflow-y-auto px-5 pb-2.5 pt-2 text-black"
      overlay={
        <BalanceWarningModal
          open={warningOpen}
          mode={warningMode}
          threshold={warningThreshold}
          onClose={() => setWarningOpen(false)}
          onConfirm={(mode, threshold) => {
            setWarningMode(mode);
            setWarningThreshold(threshold);
            setWarningOpen(false);
          }}
        />
      }
    >
      <div className="flex h-full w-full min-w-[1000px] flex-col gap-2">
        <BenefitSummaryTabs active={benefit} onChange={onBenefitChange} />

        <div className="hidden-scrollbar h-full flex-1 overflow-auto">
          <div className="flex h-full flex-col gap-6">
            {benefit === "balance" ? (
              <div className="flex flex-col">
                <RechargeMethodTabs
                  method={method}
                  onChange={setMethod}
                  warningEnabled={warningMode !== "off"}
                  onWarningClick={() => setWarningOpen(true)}
                />
                <div
                  className={cn(
                    "justify-start overflow-hidden rounded-md border border-dashed border-slate-300 px-6 py-5 min-h-[392px] flex-1",
                  )}
                >
                  {method === "online" ? (
                    <OnlineRechargeForm
                      amount={amount}
                      customAmount={customAmount}
                      onAmountChange={setAmount}
                      onCustomAmountChange={setCustomAmount}
                    />
                  ) : null}
                  {method === "auto" ? (
                    <AutoRechargeForm
                      threshold={autoThreshold}
                      amount={autoAmount}
                      onThresholdChange={(v) => {
                        setAutoThreshold(v);
                        if (
                          typeof v === "number" &&
                          typeof autoAmount === "number" &&
                          autoAmount <= v
                        ) {
                          const next =
                            [20, 50, 100].find((n) => n > v) ?? 20;
                          setAutoAmount(next);
                        }
                      }}
                      onAmountChange={setAutoAmount}
                    />
                  ) : null}
                </div>
              </div>
            ) : (
              <CouponPackagePanel
                filter={segment}
                onFilterChange={setSegment}
              />
            )}

            {benefit === "balance" ? <RechargeRecordsTable /> : null}
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
