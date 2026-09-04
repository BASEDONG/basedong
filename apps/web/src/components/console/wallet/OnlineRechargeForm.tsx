"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { cn } from "@/lib/utils";
import {
  calculateEpayAmount,
  calculateStripeAmount,
  calculateWaffoAmount,
  calculateWaffoPancakeAmount,
  getTopupInfo,
  redeemCode,
  requestCreemPay,
  requestEpayPay,
  requestStripePay,
  requestWaffoPay,
  requestWaffoPancakePay,
  submitPaymentForm,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import { formatConsoleQuota } from "../shared/format-quota";
import { ASSET, amountPresets as fallbackAmounts, formatYuan } from "./content";
import {
  buildWalletPayOptions,
  type WalletPayOption,
} from "./wallet-methods";
import type { WalletUiCopy } from "./wallet-ui-copy";

interface OnlineRechargeFormProps {
  copy: WalletUiCopy;
  amount: number | "other";
  customAmount: number;
  onAmountChange: (v: number | "other") => void;
  onCustomAmountChange: (v: number) => void;
  onQuotaRefresh?: () => void;
  onToast?: (message: string, type?: "success" | "error") => void;
}

function FieldLabel({
  children,
  colon,
}: {
  children: string;
  colon: string;
}) {
  return (
    <div className="mr-2 flex h-[42px] min-w-[80px] items-center justify-center text-sm text-slate-500">
      {children}
      {colon}
    </div>
  );
}

function ChoiceBtn({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[50px] cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-base shadow-sm transition-[color,border-color,background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
        selected
          ? "border border-[rgb(74,171,240)] bg-transparent text-[rgb(74,171,240)]"
          : "border border-slate-300 bg-white text-slate-800",
      )}
    >
      {children}
    </button>
  );
}

function methodIcon(option: WalletPayOption): string | null {
  const t = option.paymentMethod.toLowerCase();
  if (t.includes("alipay")) return ASSET.alipay;
  if (t.includes("wx") || t.includes("wechat")) return ASSET.wechat;
  return null;
}

async function quotePayable(
  option: WalletPayOption,
  topupAmount: number,
): Promise<number> {
  switch (option.kind) {
    case "stripe":
      return calculateStripeAmount(topupAmount);
    case "waffo":
      return calculateWaffoAmount(topupAmount);
    case "waffo_pancake":
      return calculateWaffoPancakeAmount(topupAmount);
    case "epay":
      return calculateEpayAmount(topupAmount);
    case "creem":
      return 0;
  }
}

function openCheckoutUrl(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function OnlineRechargeForm({
  copy,
  amount,
  customAmount,
  onAmountChange,
  onCustomAmountChange,
  onQuotaRefresh,
  onToast,
}: OnlineRechargeFormProps) {
  const { targetLocale } = useLocale();
  const fieldColon = targetLocale.startsWith("zh") ? "：" : ":";
  const [agreed, setAgreed] = useState(false);
  const [payOptions, setPayOptions] = useState<WalletPayOption[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [amountOptions, setAmountOptions] = useState<number[]>([
    ...fallbackAmounts,
  ]);
  const [redemptionEnabled, setRedemptionEnabled] = useState(true);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [payable, setPayable] = useState<number | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [redeemKey, setRedeemKey] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const selected = useMemo(
    () => payOptions.find((o) => o.id === selectedId) ?? null,
    [payOptions, selectedId],
  );

  const minTopup =
    selected?.minTopup && selected.minTopup > 0 ? selected.minTopup : 1;
  const isCreem = selected?.kind === "creem";
  const effectiveAmount = amount === "other" ? customAmount : amount;
  const belowMin =
    !isCreem && effectiveAmount > 0 && effectiveAmount < minTopup;
  const canPay =
    agreed &&
    selected != null &&
    !paying &&
    (isCreem || (effectiveAmount >= minTopup && !belowMin));

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const info = await getTopupInfo();
        if (cancelled) return;
        const options = buildWalletPayOptions(info);
        setPayOptions(options);
        setSelectedId((prev) =>
          prev && options.some((o) => o.id === prev)
            ? prev
            : (options[0]?.id ?? null),
        );
        setRedemptionEnabled(info.enable_redemption !== false);
        setInfoError(null);
        const opts =
          info.amount_options && info.amount_options.length > 0
            ? info.amount_options.filter((n) => Number.isFinite(n) && n > 0)
            : [...fallbackAmounts];
        setAmountOptions(opts);
        setInfoLoaded(true);
      } catch (e) {
        if (cancelled) return;
        setPayOptions([]);
        setSelectedId(null);
        setInfoLoaded(true);
        setInfoError(
          localizeBackendError(targetLocale, e, copy.payError),
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [copy.payError, targetLocale]);

  useEffect(() => {
    if (amount === "other" || isCreem) return;
    if (!amountOptions.includes(amount) && amountOptions.length > 0) {
      onAmountChange(amountOptions[0]!);
    }
  }, [amount, amountOptions, isCreem, onAmountChange]);

  useEffect(() => {
    if (!selected || isCreem) {
      setPayable(null);
      setQuoting(false);
      return;
    }
    if (!(effectiveAmount >= minTopup)) {
      setPayable(null);
      return;
    }
    let cancelled = false;
    const handle = window.setTimeout(() => {
      void (async () => {
        setQuoting(true);
        try {
          const money = await quotePayable(selected, effectiveAmount);
          if (!cancelled) setPayable(money);
        } catch {
          if (!cancelled) setPayable(null);
        } finally {
          if (!cancelled) setQuoting(false);
        }
      })();
    }, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [effectiveAmount, isCreem, minTopup, selected]);

  const onConfirmPay = async () => {
    if (!canPay || !selected) return;
    setPayError(null);
    setPaying(true);
    try {
      switch (selected.kind) {
        case "epay": {
          const { url, params } = await requestEpayPay(
            Math.floor(effectiveAmount),
            selected.paymentMethod,
          );
          submitPaymentForm(url, params);
          break;
        }
        case "stripe": {
          const { pay_link } = await requestStripePay(
            Math.floor(effectiveAmount),
          );
          openCheckoutUrl(pay_link);
          break;
        }
        case "creem": {
          if (!selected.productId) {
            throw new Error(copy.payError);
          }
          const { checkout_url } = await requestCreemPay(selected.productId);
          openCheckoutUrl(checkout_url);
          break;
        }
        case "waffo": {
          const { payment_url } = await requestWaffoPay(
            Math.floor(effectiveAmount),
            selected.waffoIndex,
          );
          openCheckoutUrl(payment_url);
          break;
        }
        case "waffo_pancake": {
          const { checkout_url } = await requestWaffoPancakePay(
            Math.floor(effectiveAmount),
          );
          openCheckoutUrl(checkout_url);
          break;
        }
      }
    } catch (e) {
      setPayError(localizeBackendError(targetLocale, e, copy.payError));
    } finally {
      setPaying(false);
    }
  };

  const onRedeem = async () => {
    const key = redeemKey.trim();
    if (!key || redeeming) return;
    setRedeeming(true);
    try {
      const delta = await redeemCode(key);
      setRedeemKey("");
      onToast?.(
        copy.redeemSuccess(formatConsoleQuota(delta, targetLocale)),
        "success",
      );
      onQuotaRefresh?.();
    } catch (e) {
      onToast?.(
        localizeBackendError(targetLocale, e, copy.redeemFailed),
        "error",
      );
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <div className="flex max-w-[720px] flex-col gap-4">
      {redemptionEnabled ? (
        <div className={`${CONSOLE_SURFACE} bg-slate-50 p-3`}>
          <h3 className="m-0 text-sm font-semibold text-slate-700">
            {copy.redeemCenter}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              value={redeemKey}
              onChange={(e) => setRedeemKey(e.target.value)}
              placeholder={copy.redeemPlaceholder}
              aria-label={copy.redeemInputLabel}
              className="h-10 min-w-[220px] flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[rgb(74,171,240)]"
            />
            <button
              type="button"
              disabled={!redeemKey.trim() || redeeming}
              onClick={() => void onRedeem()}
              className={cn(
                !redeemKey.trim() || redeeming
                  ? "inline-flex h-10 cursor-not-allowed items-center rounded-[12px] border border-slate-300 bg-slate-50 px-4 text-sm text-slate-400"
                  : CONSOLE_PRIMARY_BTN,
              )}
            >
              {redeeming ? copy.redeemSubmitting : copy.redeemSubmit}
            </button>
          </div>
        </div>
      ) : null}

      {infoError ? (
        <p className="text-sm text-red-600" role="alert">
          {infoError}
        </p>
      ) : null}
      {infoLoaded && payOptions.length === 0 && !infoError ? (
        <p className="text-sm text-amber-700">{copy.payDisabled}</p>
      ) : null}

      {payOptions.length > 0 ? (
        <>
          {!isCreem ? (
            <div className="flex place-items-baseline">
              <FieldLabel colon={fieldColon}>{copy.payAmount}</FieldLabel>
              <div className="flex flex-1 flex-col gap-3">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {amountOptions.map((n) => (
                    <ChoiceBtn
                      key={n}
                      selected={amount === n}
                      onClick={() => onAmountChange(n)}
                    >
                      {formatYuan(n)}
                    </ChoiceBtn>
                  ))}
                  <ChoiceBtn
                    selected={amount === "other"}
                    onClick={() => onAmountChange("other")}
                  >
                    {copy.otherAmount}
                  </ChoiceBtn>
                </div>
                {minTopup > 1 ? (
                  <p className="text-xs text-slate-400">
                    ≥ {formatYuan(minTopup)}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {!isCreem && amount === "other" ? (
            <div className="flex items-center">
              <FieldLabel colon={fieldColon}>{copy.otherAmount}</FieldLabel>
              <input
                type="number"
                min={minTopup}
                step="any"
                placeholder={formatYuan(minTopup)}
                value={Number.isFinite(customAmount) ? customAmount : ""}
                onChange={(e) =>
                  onCustomAmountChange(Number.parseFloat(e.target.value) || 0)
                }
                className="h-10 w-full max-w-[280px] rounded-md border border-slate-300 bg-white px-3 text-base text-slate-800 outline-none focus:border-[rgb(74,171,240)]"
              />
            </div>
          ) : null}
          {belowMin ? (
            <p className="ml-[86px] text-sm text-amber-700">
              ≥ {formatYuan(minTopup)}
            </p>
          ) : null}

          <div className="flex items-start">
            <FieldLabel colon={fieldColon}>{copy.payMethod}</FieldLabel>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:max-w-[480px]">
              {payOptions.map((opt) => {
                const icon = methodIcon(opt);
                return (
                  <ChoiceBtn
                    key={opt.id}
                    selected={selectedId === opt.id}
                    onClick={() => setSelectedId(opt.id)}
                  >
                    {icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={icon} alt="" className="h-[18px] w-[18px]" />
                    ) : null}
                    <span className="truncate">{opt.label}</span>
                  </ChoiceBtn>
                );
              })}
            </div>
          </div>

          {!isCreem && (quoting || payable != null) ? (
            <p className="ml-[86px] text-sm text-slate-600">
              {quoting
                ? copy.quotingAmount
                : copy.payableAmount(formatYuan(payable ?? 0))}
            </p>
          ) : null}

          {payError ? (
            <p className="ml-[86px] text-sm text-red-600" role="alert">
              {payError}
            </p>
          ) : null}

          <div>
            <button
              type="button"
              disabled={!canPay}
              onClick={() => void onConfirmPay()}
              className={cn(
                "ml-[86px] w-[280px]",
                canPay
                  ? CONSOLE_PRIMARY_BTN
                  : "inline-flex h-10 cursor-not-allowed items-center justify-center rounded-[12px] border border-slate-300 bg-slate-50 px-[15px] text-base text-slate-400",
              )}
            >
              {paying ? copy.paying : copy.confirmPay}
            </button>
          </div>

          <div className="ml-[86px] flex items-center text-sm text-slate-500">
            <input
              id="wallet-agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2 size-4 cursor-pointer rounded border-slate-300 accent-[rgb(74,171,240)]"
            />
            <div>
              <label
                htmlFor="wallet-agree"
                className="cursor-pointer text-slate-500"
              >
                {copy.agreePrefix}
              </label>
              <a
                href={copy.agreeHref}
                target="_blank"
                rel="noreferrer"
                className="text-[rgb(74,171,240)] hover:underline"
              >
                {copy.agreeLink}
              </a>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
