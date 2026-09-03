"use client";

import { useCallback, useEffect, useState } from "react";
import { listTopUps, type TopUpRecord } from "@/lib/backend/client";
import type { WalletUiCopy } from "./wallet-ui-copy";
import { EmptyDataIcon, SyncIcon } from "./icons";

function formatTime(ts: number): string {
  if (!ts) return "â€”";
  const d = new Date(ts * 1000);
  if (Number.isNaN(d.getTime())) return "â€”";
  return d.toLocaleString("zh-CN", { hour12: false });
}

function statusLabel(copy: WalletUiCopy, status: string): string {
  if (status === "pending") return copy.statusPending;
  if (status === "success") return copy.statusSuccess;
  return copy.statusOther;
}

function channelLabel(copy: WalletUiCopy, method?: string): string {
  if (method === "alipay") return copy.alipay;
  if (method === "wxpay") return copy.wechatPay;
  return method || "â€”";
}

interface RechargeRecordsTableProps {
  copy: WalletUiCopy;
}

export function RechargeRecordsTable({ copy }: RechargeRecordsTableProps) {
  const [rows, setRows] = useState<TopUpRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await listTopUps(1, 50));
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="mb-[60px]">
      <div className="mb-3 mr-1 mt-4 flex justify-between pl-6 pr-4">
        <h3 className="m-0 flex items-center justify-between text-lg font-semibold text-slate-700">
          <span>{copy.recordsTitle}</span>
        </h3>
        <button
          type="button"
          aria-label="sync"
          disabled={loading}
          onClick={() => void refresh()}
          className="flex size-4 cursor-pointer items-center justify-center text-slate-400 transition-colors hover:text-[rgb(74,171,240)] disabled:opacity-50"
        >
          <SyncIcon className="size-4" />
        </button>
      </div>

      <div className="export-record-table overflow-hidden">
        <div className="overflow-hidden rounded-t-lg bg-white">
          <table className="w-full border-collapse text-sm text-[rgb(30,41,59)]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-2 py-3 font-semibold">
                  <span className="pl-4">{copy.recordHeaders[0]}</span>
                </th>
                <th className="px-2 py-3 font-semibold">{copy.recordHeaders[1]}</th>
                <th className="px-2 py-3 font-semibold">{copy.recordHeaders[2]}</th>
                <th className="px-2 py-3 font-semibold">{copy.recordHeaders[3]}</th>
                <th className="px-2 py-3 pr-6 text-right font-semibold">
                  {copy.recordHeaders[4]}
                </th>
                <th className="px-2 py-3 pl-4 font-semibold">
                  {copy.recordHeaders[5]}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-0">
                    <div className="mx-2 my-8 flex flex-col items-center justify-center text-sm text-slate-500">
                      <div className="mb-2 h-10">
                        <EmptyDataIcon />
                      </div>
                      <div>{copy.empty}</div>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-2 py-3">
                      <span className="pl-4 font-mono text-xs">
                        {row.trade_no}
                      </span>
                    </td>
                    <td className="px-2 py-3">{formatTime(row.create_time)}</td>
                    <td className="px-2 py-3">
                      {channelLabel(copy, row.payment_method)}
                    </td>
                    <td className="px-2 py-3">{statusLabel(copy, row.status)}</td>
                    <td className="px-2 py-3 pr-6 text-right">
                      Â¥ {Number(row.money).toFixed(2)}
                    </td>
                    <td className="px-2 py-3 pl-4 text-slate-400">â€”</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
