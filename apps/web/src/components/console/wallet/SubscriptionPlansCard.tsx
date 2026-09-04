"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getPublicAuthStatus,
  getSubscriptionPlans,
  getSubscriptionSelf,
  paySubscriptionBalance,
  paySubscriptionCreem,
  paySubscriptionEpay,
  paySubscriptionStripe,
  paySubscriptionWaffoPancake,
  submitPaymentForm,
  updateSubscriptionPreference,
  type BillingPreference,
  type SelfSubscriptionData,
  type SubscriptionPlan,
  type SubscriptionPlanRecord,
  type TopupInfo,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import { formatConsoleQuota } from "../shared/format-quota";
import { buildWalletPayOptions } from "./wallet-methods";
import {
  BILLING_PREFERENCES,
  hasActiveSubscription,
  isSubscriptionSectionVisible,
  subscriptionBalanceCost,
} from "./wallet-subscription-gates";
import type { WalletUiCopy } from "./wallet-ui-copy";

type Props = {
  copy: WalletUiCopy;
  targetLocale: string;
  topupInfo: TopupInfo | null;
  userQuota: number;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
  onPurchaseSuccess: () => void;
};

function preferenceLabel(copy: WalletUiCopy, value: string): string {
  switch (value) {
    case "subscription_first":
      return copy.prefSubscriptionFirst ?? value;
    case "wallet_first":
      return copy.prefWalletFirst ?? value;
    case "subscription_only":
      return copy.prefSubscriptionOnly ?? value;
    case "wallet_only":
      return copy.prefWalletOnly ?? value;
    default:
      return value;
  }
}

function formatPlanPrice(plan: SubscriptionPlan): string {
  const amount = Number(plan.price_amount ?? 0).toFixed(2);
  return `${plan.currency ?? "USD"} ${amount}`;
}

export function SubscriptionPlansCard({
  copy,
  targetLocale,
  topupInfo,
  userQuota,
  onNotice,
  onError,
  onPurchaseSuccess,
}: Props) {
  const [plans, setPlans] = useState<SubscriptionPlanRecord[]>([]);
  const [self, setSelf] = useState<SelfSubscriptionData | null>(null);
  const [quotaPerUnit, setQuotaPerUnit] = useState(500_000);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onNoticeRef = useRef(onNotice);
  onNoticeRef.current = onNotice;

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [planList, selfData, status] = await Promise.all([
        getSubscriptionPlans(),
        getSubscriptionSelf().catch(() => null),
        getPublicAuthStatus().catch(() => null),
      ]);
      setPlans(planList);
      setSelf(selfData);
      if (typeof status?.quota_per_unit === "number" && status.quota_per_unit > 0) {
        setQuotaPerUnit(status.quota_per_unit);
      }
    } catch (e) {
      setPlans([]);
      setSelf(null);
      onErrorRef.current(
        localizeBackendError(
          targetLocale,
          e,
          copy.subLoadFailed ?? "Failed to load subscriptions",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [copy.subLoadFailed, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onPreference = async (value: BillingPreference) => {
    setBusy(true);
    try {
      const next = await updateSubscriptionPreference(value);
      setSelf((prev) => ({ ...(prev ?? {}), billing_preference: next }));
      onNoticeRef.current(copy.prefSaved ?? "Saved");
    } catch (e) {
      onErrorRef.current(
        localizeBackendError(targetLocale, e, copy.prefFailed ?? "Failed"),
      );
    } finally {
      setBusy(false);
    }
  };

  const payOptions = topupInfo ? buildWalletPayOptions(topupInfo) : [];
  const epayOptions = payOptions.filter((o) => o.kind === "epay");
  const enableStripe = Boolean(topupInfo?.enable_stripe_topup);
  const enableCreem = Boolean(topupInfo?.enable_creem_topup);
  const enableWaffoPancake = Boolean(topupInfo?.enable_waffo_pancake_topup);
  const enableOnline = Boolean(topupInfo?.enable_online_topup);

  const purchaseCountFor = (planId: number) =>
    (self?.all_subscriptions ?? []).filter(
      (row) => row.subscription?.plan_id === planId,
    ).length;

  const startPurchase = async (
    plan: SubscriptionPlan,
    method:
      | { kind: "balance" }
      | { kind: "stripe" }
      | { kind: "creem" }
      | { kind: "waffo_pancake" }
      | { kind: "epay"; paymentMethod: string },
  ) => {
    setBuyingId(plan.id);
    try {
      if (method.kind === "balance") {
        await paySubscriptionBalance(plan.id);
        onNotice(copy.subPurchaseSuccess ?? "Purchased");
        onPurchaseSuccess();
        await refresh();
        return;
      }
      if (method.kind === "stripe") {
        const { pay_link } = await paySubscriptionStripe(plan.id);
        window.open(pay_link, "_blank", "noopener,noreferrer");
        onNotice(copy.subPayOpened ?? "Payment opened");
        return;
      }
      if (method.kind === "creem") {
        const { checkout_url } = await paySubscriptionCreem(plan.id);
        window.open(checkout_url, "_blank", "noopener,noreferrer");
        onNotice(copy.subPayOpened ?? "Payment opened");
        return;
      }
      if (method.kind === "waffo_pancake") {
        const { checkout_url } = await paySubscriptionWaffoPancake(plan.id);
        onNotice(copy.subPayRedirect ?? "Redirecting…");
        window.location.href = checkout_url;
        return;
      }
      const result = await paySubscriptionEpay(plan.id, method.paymentMethod);
      submitPaymentForm(result.url, result.params);
      onNotice(copy.subPayOpened ?? "Payment opened");
    } catch (e) {
      onError(
        localizeBackendError(
          targetLocale,
          e,
          copy.subPurchaseFailed ?? "Purchase failed",
        ),
      );
    } finally {
      setBuyingId(null);
    }
  };

  if (loading) {
    return (
      <section className={`${CONSOLE_SURFACE} p-4`}>
        <h2 className="text-sm font-semibold text-slate-800">
          {copy.sectionSubscription ?? "Subscriptions"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">…</p>
      </section>
    );
  }

  if (!isSubscriptionSectionVisible(plans, self)) return null;

  const active = hasActiveSubscription(self);
  const preference = self?.billing_preference ?? "wallet_first";

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionSubscription ?? "Subscriptions"}
      </h2>
      <p className="mt-1 text-xs text-slate-500">{copy.subHint}</p>

      <div className="mt-3">
        <label className="text-xs text-slate-500">{copy.billingPreference}</label>
        <select
          className="mt-1 w-full max-w-xs rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
          value={preference}
          disabled={busy}
          onChange={(e) => void onPreference(e.target.value)}
        >
          {BILLING_PREFERENCES.map((value) => {
            const needsActive =
              value === "subscription_first" || value === "subscription_only";
            return (
              <option key={value} value={value} disabled={needsActive && !active}>
                {preferenceLabel(copy, value)}
              </option>
            );
          })}
        </select>
      </div>

      {(self?.subscriptions ?? []).length > 0 ? (
        <ul className="mt-3 space-y-2">
          {(self?.subscriptions ?? []).map((row) => {
            const sub = row.subscription;
            const total = sub.amount_total ?? 0;
            const used = sub.amount_used ?? 0;
            return (
              <li
                key={sub.id ?? `${sub.plan_id}-${sub.start_time}`}
                className="rounded-[8px] border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
              >
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-slate-800">
                    {copy.subActiveLabel} · plan #{sub.plan_id}
                  </span>
                  <span className="text-xs text-slate-500">{sub.status}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {formatConsoleQuota(used, targetLocale)} /{" "}
                  {formatConsoleQuota(total, targetLocale)}
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      {plans.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">{copy.subNoPlans}</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {plans.map((rec) => {
            const plan = rec.plan;
            const limit = plan.max_purchase_per_user ?? 0;
            const count = purchaseCountFor(plan.id);
            const limitReached = limit > 0 && count >= limit;
            const balanceCost = subscriptionBalanceCost(
              plan.price_amount ?? 0,
              quotaPerUnit,
            );
            const allowBalance = plan.allow_balance_pay !== false;
            const buying = buyingId === plan.id;
            const hasStripe = enableStripe && Boolean(plan.stripe_price_id);
            const hasCreem = enableCreem && Boolean(plan.creem_product_id);
            const hasWaffo =
              enableWaffoPancake && Boolean(plan.waffo_pancake_product_id);
            const hasEpay = enableOnline && epayOptions.length > 0;

            return (
              <li
                key={plan.id}
                className="rounded-[8px] border border-slate-200 px-3 py-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {plan.title || `Plan #${plan.id}`}
                    </div>
                    {plan.subtitle ? (
                      <p className="mt-0.5 text-xs text-slate-500">
                        {plan.subtitle}
                      </p>
                    ) : null}
                    <p className="mt-1 font-mono text-sm text-slate-700">
                      {formatPlanPrice(plan)}
                    </p>
                  </div>
                </div>
                {limitReached ? (
                  <p className="mt-2 text-xs text-amber-700">
                    {copy.subLimitReached}
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {allowBalance ? (
                      <button
                        type="button"
                        disabled={
                          buying || userQuota < balanceCost || balanceCost <= 0
                        }
                        onClick={() =>
                          void startPurchase(plan, { kind: "balance" })
                        }
                        className={`${CONSOLE_PRIMARY_BTN} disabled:opacity-50`}
                      >
                        {copy.subPayBalance} (
                        {formatConsoleQuota(balanceCost, targetLocale)})
                      </button>
                    ) : null}
                    {hasStripe ? (
                      <button
                        type="button"
                        disabled={buying}
                        onClick={() =>
                          void startPurchase(plan, { kind: "stripe" })
                        }
                        className="rounded-[12px] border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                      >
                        Stripe
                      </button>
                    ) : null}
                    {hasCreem ? (
                      <button
                        type="button"
                        disabled={buying}
                        onClick={() =>
                          void startPurchase(plan, { kind: "creem" })
                        }
                        className="rounded-[12px] border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                      >
                        Creem
                      </button>
                    ) : null}
                    {hasWaffo ? (
                      <button
                        type="button"
                        disabled={buying}
                        onClick={() =>
                          void startPurchase(plan, { kind: "waffo_pancake" })
                        }
                        className="rounded-[12px] border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                      >
                        Waffo
                      </button>
                    ) : null}
                    {hasEpay
                      ? epayOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={buying}
                            onClick={() =>
                              void startPurchase(plan, {
                                kind: "epay",
                                paymentMethod: opt.paymentMethod,
                              })
                            }
                            className="rounded-[12px] border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                          >
                            {opt.label}
                          </button>
                        ))
                      : null}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
