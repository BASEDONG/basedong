"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { copy } from "./content";

interface ApplyInvoiceButtonProps {
  canApply?: boolean;
  onApply?: () => void;
}

export function ApplyInvoiceButton({
  canApply = false,
  onApply,
}: ApplyInvoiceButtonProps) {
  const [tip, setTip] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => {
        if (!canApply) setTip(true);
      }}
      onMouseLeave={() => setTip(false)}
    >
      <button
        type="button"
        disabled={!canApply}
        onClick={() => {
          if (canApply) onApply?.();
        }}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-[15px] text-sm font-normal transition-colors",
          canApply
            ? "cursor-pointer border border-transparent bg-[rgb(74,171,240)] text-white shadow-[0_2px_0_rgba(74,171,240,0.06)] hover:bg-[rgb(147,84,255)] active:bg-[rgb(79,25,207)]"
            : "cursor-not-allowed border border-slate-300 bg-slate-50 text-slate-400",
        )}
      >
        <span>{copy.applyEmoji} </span>
        {copy.applyButton}
      </button>
      {tip && !canApply ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-50 max-w-[320px] rounded-[6px] bg-[rgba(2,5,23,0.85)] px-2 py-1.5 text-sm leading-5 text-white shadow-md"
        >
          {copy.outsideHoursTooltip}
        </div>
      ) : null}
    </div>
  );
}
