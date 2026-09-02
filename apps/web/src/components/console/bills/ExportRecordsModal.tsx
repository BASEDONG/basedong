"use client";

import { useEffect, useId, useMemo } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  getBillsUiCopy,
  getExportRecordHeaders,
} from "./bills-ui-copy";
import { CloseIcon, EmptySimpleIcon, InfoCircleIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface ExportRecordsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportRecordsModal({ open, onClose }: ExportRecordsModalProps) {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getBillsUiCopy(targetLocale), [targetLocale]);
  const exportRecordHeaders = useMemo(
    () => getExportRecordHeaders(targetLocale),
    [targetLocale],
  );
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]" style={{ fontFamily: antFont }}>
      <div
        className="absolute inset-0 bg-[rgba(2,6,23,0.45)]"
        onClick={onClose}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 overflow-auto">
        <div className="flex min-h-full items-start justify-center px-4 pb-8 pt-[100px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="pointer-events-auto relative w-full max-w-[800px] rounded-[8px] bg-white px-6 py-5 text-[#1E293B] shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded text-[#64748B] transition-colors hover:bg-black/[0.06] hover:text-[#1E293B]"
            >
              <CloseIcon />
            </button>

            <h2
              id={titleId}
              className="m-0 mb-4 pr-8 text-base font-semibold leading-6 text-[#1E293B]"
            >
              {copy.exportModalTitle}
            </h2>

            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-[8px] border border-[#FFE58F] bg-[#FFFBE6] px-3 py-2 text-sm leading-[22px] text-slate-700"
            >
              <InfoCircleIcon className="mt-0.5 shrink-0 text-[#FAAD14]" />
              <span>{copy.exportModalAlert}</span>
            </div>

            <div className="overflow-hidden rounded-t-[8px]">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    {exportRecordHeaders.map((h, i) => (
                      <th
                        key={h}
                        className={`h-[55px] border-b border-[#E2E8F0] px-4 text-left text-sm font-semibold text-[#1E293B] ${
                          i === 0
                            ? "rounded-tl-[8px]"
                            : i === exportRecordHeaders.length - 1
                              ? "rounded-tr-[8px]"
                              : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={exportRecordHeaders.length} className="p-4">
                      <div className="flex flex-col items-center justify-center gap-2 py-10 text-[#94A3B8]">
                        <EmptySimpleIcon />
                        <p className="m-0 text-sm leading-[22px]">
                          {copy.noData}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
