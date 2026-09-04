"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { listTopUps, type TopUpRecord } from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleEmptyState } from "../shared/ConsoleEmptyState";
import {
  CONSOLE_PRIMARY_BTN,
  CONSOLE_SURFACE,
  CONSOLE_THEAD,
} from "../shared/console-ui";
import type { WalletUiCopy } from "./wallet-ui-copy";
import { SyncIcon } from "./icons";

const PAGE_SIZE = 20;

function formatTime(ts: number, locale: string): string {
  if (!ts) return "—";
  const d = new Date(ts * 1000);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(locale, { hour12: false });
}

function statusLabel(copy: WalletUiCopy, status: string): string {
  if (status === "pending") return copy.statusPending;
  if (status === "success") return copy.statusSuccess;
  return copy.statusOther;
}

function channelLabel(copy: WalletUiCopy, method?: string): string {
  if (!method) return "—";
  const m = method.toLowerCase();
  if (m === "alipay") return copy.alipay;
  if (m === "wxpay" || m === "wechat") return copy.wechatPay;
  if (m === "stripe") return "Stripe";
  if (m === "creem") return "Creem";
  if (m === "waffo") return "Waffo";
  if (m === "waffo_pancake") return "Waffo Pancake";
  return method;
}

interface RechargeRecordsTableProps {
  copy: WalletUiCopy;
  locale: string;
  refreshToken?: number;
}

export function RechargeRecordsTable({
  copy,
  locale,
  refreshToken = 0,
}: RechargeRecordsTableProps) {
  const { targetLocale } = useLocale();
  const [rows, setRows] = useState<TopUpRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [draftKeyword, setDraftKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listTopUps(page, PAGE_SIZE, keyword);
      setRows(result.items);
      setTotal(result.total);
    } catch (e) {
      setRows([]);
      setTotal(0);
      setError(
        localizeBackendError(targetLocale, e, copy.recordsLoadFailed),
      );
    } finally {
      setLoading(false);
    }
  }, [copy.recordsLoadFailed, keyword, page, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh, refreshToken]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
  const canPrev = page > 1 && !loading;
  const canNext = page < totalPages && !loading;

  const onSearch = () => {
    setPage(1);
    setKeyword(draftKeyword.trim());
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="m-0 text-sm font-semibold text-slate-700">
          {copy.recordsTitle}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={draftKeyword}
            onChange={(e) => setDraftKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            placeholder={copy.recordsKeywordPlaceholder}
            aria-label={copy.recordsKeywordPlaceholder}
            className="h-8 min-w-[160px] rounded-md border border-slate-300 bg-white px-2 text-sm outline-none focus:border-[rgb(74,171,240)]"
          />
          <button
            type="button"
            onClick={onSearch}
            className={`${CONSOLE_PRIMARY_BTN} !h-8 !px-3 !text-xs`}
          >
            {copy.recordsSearch}
          </button>
          <button
            type="button"
            aria-label={copy.recordsTitle}
            disabled={loading}
            onClick={() => void refresh()}
            className="flex size-4 cursor-pointer items-center justify-center text-slate-400 transition-colors hover:text-[rgb(74,171,240)] disabled:opacity-50"
          >
            <SyncIcon className="size-4" />
          </button>
        </div>
      </div>

      {error ? (
        <p
          className="mb-3 rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className={`${CONSOLE_SURFACE} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm text-[rgb(30,41,59)]">
            <thead>
              <tr className={`border-b border-slate-200 ${CONSOLE_THEAD} text-left`}>
                <th className="px-4 py-3 font-semibold">{copy.recordHeaders[0]}</th>
                <th className="px-2 py-3 font-semibold">{copy.recordHeaders[1]}</th>
                <th className="px-2 py-3 font-semibold">{copy.recordHeaders[2]}</th>
                <th className="px-2 py-3 font-semibold">{copy.recordHeaders[3]}</th>
                <th className="px-2 py-3 pr-6 text-right font-semibold">
                  {copy.recordHeaders[4]}
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && !error && rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-0">
                    <ConsoleEmptyState message={copy.empty} />
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-xs">{row.trade_no}</td>
                    <td className="px-2 py-3">
                      {formatTime(row.create_time, locale)}
                    </td>
                    <td className="px-2 py-3">
                      {channelLabel(copy, row.payment_method)}
                    </td>
                    <td className="px-2 py-3">
                      {statusLabel(copy, row.status)}
                    </td>
                    <td className="px-2 py-3 pr-6 text-right">
                      ¥ {Number(row.money).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
          <span>{copy.recordsTotal(total)}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border border-slate-200 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copy.recordsPrev}
            </button>
            <span>{copy.recordsPage(page, totalPages)}</span>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border border-slate-200 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copy.recordsNext}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
