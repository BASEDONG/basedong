"use client";

import { copy, recordHeaders } from "./content";
import { EmptyDataIcon, SyncIcon } from "./icons";

export function RechargeRecordsTable() {
  return (
    <div className="mb-[60px]">
      <div className="mb-3 mr-1 mt-4 flex justify-between pl-6 pr-4">
        <h3 className="m-0 flex items-center justify-between text-lg font-semibold text-slate-700">
          <span>{copy.recordsTitle}</span>
        </h3>
        <button
          type="button"
          aria-label="sync"
          className="flex size-4 cursor-pointer items-center justify-center text-slate-400 transition-colors hover:text-[rgb(74,171,240)]"
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
                  <span className="pl-4">{recordHeaders[0]}</span>
                </th>
                <th className="px-2 py-3 font-semibold">{recordHeaders[1]}</th>
                <th className="px-2 py-3 font-semibold">{recordHeaders[2]}</th>
                <th className="px-2 py-3 font-semibold">{recordHeaders[3]}</th>
                <th className="px-2 py-3 pr-6 text-right font-semibold">
                  {recordHeaders[4]}
                </th>
                <th className="px-2 py-3 pl-4 font-semibold">
                  {recordHeaders[5]}
                </th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
