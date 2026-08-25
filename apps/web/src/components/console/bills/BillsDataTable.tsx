import {
  ASSET,
  allocationHeaders,
  copy,
  detailHeaders,
  type ViewMode,
} from "./content";
import { cn } from "@/lib/utils";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsDataTableProps {
  viewMode: ViewMode;
}

/** Column max-widths from original ant-table (allocation view) */
const allocationColClass: Record<string, string> = {
  "API Key 描述": "max-w-[120px] overflow-hidden text-ellipsis",
};

export function BillsDataTable({ viewMode }: BillsDataTableProps) {
  const headers =
    viewMode === "detail" ? detailHeaders : allocationHeaders;
  const emptyText =
    viewMode === "detail" ? copy.emptyDetail : copy.emptyAllocation;
  const isAllocation = viewMode === "allocation";

  return (
    <div
      className="relative w-full overflow-x-auto"
      style={{ fontFamily: antFont }}
    >
      {/* ant-table-ping-right edge shadow when horizontally scrollable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-black/[0.06] to-transparent"
      />
      <div className="overflow-hidden rounded-t-[8px] bg-white">
        <table
          className={cn(
            "w-full border-collapse text-sm",
            isAllocation ? "min-w-[1200px]" : "min-w-max",
          )}
        >
          <thead>
            <tr className="bg-[#F8FAFC]">
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "h-[55px] border-b border-[#E2E8F0] px-4 text-left text-sm font-semibold leading-[22px] text-[#1E293B]",
                    !isAllocation && "whitespace-nowrap",
                    isAllocation && allocationColClass[h],
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
            <tr>
              <td colSpan={headers.length} className="p-4 text-[#94A3B8]">
                <div className="h-[452px]">
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-slate-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ASSET.empty}
                      alt="empty image"
                      width={320}
                      height={320}
                      className="h-[320px] w-[320px] object-contain"
                    />
                    <p className="m-0 text-sm leading-[22px] text-slate-500">
                      {emptyText}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
