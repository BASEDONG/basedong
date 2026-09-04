"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAffiliateCode,
  transferAffiliateQuota,
  type BackendUser,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import {
  formatConsoleCount,
  formatConsoleQuota,
} from "../shared/format-quota";
import {
  buildAffiliateInviteLink,
  clampTransferQuota,
} from "./wallet-subscription-gates";
import type { WalletUiCopy } from "./wallet-ui-copy";

type Props = {
  copy: WalletUiCopy;
  targetLocale: string;
  self: BackendUser | null;
  complianceConfirmed: boolean;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
  onTransferred: () => void;
};

export function AffiliateRewardsCard({
  copy,
  targetLocale,
  self,
  complianceConfirmed,
  onNotice,
  onError,
  onTransferred,
}: Props) {
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [transferAmount, setTransferAmount] = useState("");
  const [busy, setBusy] = useState(false);

  const refreshCode = useCallback(async () => {
    setLoading(true);
    try {
      const aff = await getAffiliateCode();
      setCode(aff);
      setLink(buildAffiliateInviteLink(window.location.origin, aff));
    } catch (e) {
      setCode("");
      setLink("");
      onError(
        localizeBackendError(
          targetLocale,
          e,
          copy.affLoadFailed ?? "Failed to load affiliate",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, [copy.affLoadFailed, onError, targetLocale]);

  useEffect(() => {
    void refreshCode();
  }, [refreshCode]);

  const pending = self?.aff_quota ?? 0;
  const history = self?.aff_history_quota ?? 0;
  const invites = self?.aff_count ?? 0;

  const onCopy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      onNotice(copy.affCopied ?? "Copied");
    } catch {
      onError(copy.affLoadFailed ?? "Copy failed");
    }
  };

  const onTransfer = async () => {
    const amount = clampTransferQuota(Number(transferAmount), pending);
    if (amount <= 0) {
      onError(copy.affTransferInvalid ?? "Invalid amount");
      return;
    }
    if (!complianceConfirmed) {
      onError(copy.affTransferBlocked ?? "Transfer unavailable");
      return;
    }
    setBusy(true);
    try {
      await transferAffiliateQuota(amount);
      setTransferAmount("");
      onNotice(copy.affTransferSuccess ?? "Transferred");
      onTransferred();
    } catch (e) {
      onError(
        localizeBackendError(
          targetLocale,
          e,
          copy.affTransferFailed ?? "Transfer failed",
        ),
      );
    } finally {
      setBusy(false);
    }
  };

  if (loading && !code) {
    return (
      <section className={`${CONSOLE_SURFACE} p-4`}>
        <h2 className="text-sm font-semibold text-slate-800">
          {copy.sectionAffiliate ?? "Referral"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">…</p>
      </section>
    );
  }

  if (!code) return null;

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionAffiliate ?? "Referral"}
      </h2>
      <p className="mt-1 text-xs text-slate-500">{copy.affHint}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-[10px] uppercase text-slate-400">
            {copy.affPending}
          </div>
          <div className="mt-0.5 font-mono text-sm font-semibold text-slate-800">
            {formatConsoleQuota(pending, targetLocale)}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-400">
            {copy.affHistory}
          </div>
          <div className="mt-0.5 font-mono text-sm font-semibold text-slate-800">
            {formatConsoleQuota(history, targetLocale)}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-400">
            {copy.affInvites}
          </div>
          <div className="mt-0.5 font-mono text-sm font-semibold text-slate-800">
            {formatConsoleCount(invites, targetLocale)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          readOnly
          value={link}
          className="min-w-0 flex-1 rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700"
        />
        <button
          type="button"
          onClick={() => void onCopy()}
          className="rounded-[8px] border border-slate-300 bg-white px-3 text-sm text-slate-700"
        >
          {copy.affCopyLink}
        </button>
      </div>
      {pending > 0 ? (
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <div className="min-w-[8rem] flex-1">
            <label className="text-xs text-slate-500">
              {copy.affTransferLabel}
            </label>
            <input
              type="number"
              min={1}
              max={pending}
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder={String(pending)}
              className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="button"
            disabled={busy || !complianceConfirmed}
            onClick={() => void onTransfer()}
            className={`${CONSOLE_PRIMARY_BTN} disabled:opacity-50`}
            title={
              complianceConfirmed
                ? undefined
                : (copy.affTransferBlocked ?? undefined)
            }
          >
            {copy.affTransferSubmit}
          </button>
        </div>
      ) : null}
    </section>
  );
}
