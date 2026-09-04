"use client";

import { useEffect } from "react";
import { CheckCircleIcon, CloseCircleIcon } from "./icons";

export type ToastType = "success" | "error" | "info";

interface MessageToastProps {
  open: boolean;
  type?: ToastType;
  message: string;
  onClose: () => void;
  durationMs?: number;
}

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

export function MessageToast({
  open,
  type = "success",
  message,
  onClose,
  durationMs = 3000,
}: MessageToastProps) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(t);
  }, [open, durationMs, onClose, message]);

  if (!open) return null;

  const iconColor =
    type === "success"
      ? "rgb(82, 196, 26)"
      : type === "error"
        ? "rgb(255, 77, 79)"
        : "rgb(74, 171, 240)";

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-4 z-[1100] -translate-x-1/2"
      style={{ fontFamily: antFont }}
      role="status"
    >
      <div className="pointer-events-auto inline-flex items-center gap-2 rounded-[8px] bg-white px-3 py-[9px] text-sm leading-[22px] text-[rgb(30,41,59)] shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
        <span
          className="inline-flex size-4 shrink-0 items-center justify-center"
          style={{ color: iconColor }}
          aria-hidden
        >
          {type === "error" ? (
            <CloseCircleIcon className="size-4" />
          ) : (
            <CheckCircleIcon className="size-4" />
          )}
        </span>
        <span className="whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}
