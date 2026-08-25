"use client";

import { useEffect } from "react";
import { CheckCircleIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

interface BillsToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  durationMs?: number;
}

export function BillsToast({
  open,
  message,
  onClose,
  durationMs = 3000,
}: BillsToastProps) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(t);
  }, [open, durationMs, onClose, message]);

  if (!open) return null;

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-4 z-[1100] -translate-x-1/2"
      style={{ fontFamily: antFont }}
      role="status"
    >
      <div className="pointer-events-auto inline-flex items-center gap-2 rounded-[8px] bg-white px-3 py-[9px] text-sm leading-[22px] text-[#1E293B] shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
        <CheckCircleIcon className="size-4 shrink-0 text-[rgb(82,196,26)]" />
        <span className="whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}
