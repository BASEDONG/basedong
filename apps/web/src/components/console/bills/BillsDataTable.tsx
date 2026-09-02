"use client";

import type { UsageLog } from "@/lib/backend/client";
import type { BillsUiCopy } from "./bills-ui-copy";
import { ASSET, type ViewMode } from "./content";
import { cn } from "@/lib/utils";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsDataTableProps {
  copy: BillsUiCopy;
  viewMode: ViewMode;
  rows: UsageLog[];
  total: number;
  loading?: boolean;
}

function formatTime(ts: number): string {
  if (!ts) return "—";
  const d = new Date(ts * 1000);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("zh-CN", { hour12: false });
}

export function BillsDataTable({
  copy,
  viewMode,
  rows,
  total,
  loading,
}: BillsDataTableProps) {
  if (viewMode === "allocation") {
    return (
      <div className="rounded-[8px] border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
        {copy.allocationUnsupported}
      </div>
    );
  }

  const headers = copy.detailHeaders;
  const empty = !loading && rows.length === 0;

  return (
    <div
      className="relative w-full overflow-x-auto"
      style={{ fontFamily: antFont }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-black/[0.06] to-transparent"
      />
      <div className="mb-2 text-xs text-slate-400">
        {loading ? copy.loading : copy.totalCount(total)}
      </div>
      <div className="overflow-hidden rounded-t-[8px] bg-white">
        <table className="w-full min-w-max border-collapse text-sm">
          <thead>
            <tr className="bg-[#F8FAFC]">
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "h-[55px] whitespace-nowrap border-b border-[#E2E8F0] px-4 text-left text-sm font-semibold leading-[22px] text-[#1E293B]",
                    i === 0 && "rounded-tl-[8px]",
                    i === headers.length - 1 && "rounded-tr-[8px]",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {empty ? (
              <tr>
                <td colSpan={headers.length} className="p-4 text-[#94A3B8]">
                  <div className="flex h-[320px] flex-col items-center justify-center gap-4 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSET.empty}
                      alt=""
                      width={240}
                      height={240}
                      className="h-[240px] w-[240px] object-contain"
                    />
                    <p className="m-0 text-sm leading-[22px] text-slate-500">
                      {copy.emptyDetail}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {formatTime(row.created_at)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">
                    {row.request_id || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {row.model_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {row.token_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {row.prompt_tokens ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {row.completion_tokens ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-900">
                    {row.quota ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                    {row.use_time ?? 0}s
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
