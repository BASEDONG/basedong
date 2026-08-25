"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  autoAmountPresets,
  autoThresholdPresets,
  copy,
  formatYuan,
} from "./content";
import { AlipayCircleIcon, InfoCircleIcon } from "./icons";

interface AutoRechargeFormProps {
  threshold: number | "other";
  amount: number | "other";
  onThresholdChange: (v: number | "other") => void;
  onAmountChange: (v: number | "other") => void;
}

function FieldLabel({ children }: { children: string }) {
  return (
    <div className="mr-4 flex h-[50px] min-w-[80px] items-center justify-center text-sm text-slate-500">
      {children}：
    </div>
  );
}

function ChoiceButton({
  selected,
  disabled,
  onClick,
  children,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-[50px] w-[100px] items-center justify-center rounded-md border px-3 py-6 text-base shadow-sm transition-[color,border-color,background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
        disabled && "cursor-not-allowed opacity-50",
        !disabled && "cursor-pointer",
        selected
          ? "border-[rgb(74,171,240)] bg-transparent text-[rgb(74,171,240)]"
          : "border-slate-300 bg-white text-slate-800",
      )}
    >
      {children}
    </button>
  );
}

export function AutoRechargeForm({
  threshold,
  amount,
  onThresholdChange,
  onAmountChange,
}: AutoRechargeFormProps) {
  const thresholdNum = typeof threshold === "number" ? threshold : 10;
  const amountNum = typeof amount === "number" ? amount : 20;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="m-0 text-base font-semibold text-slate-700">
        {copy.autoTitle}
      </h3>

      <div
        role="alert"
        className="rounded-lg border border-[#ffe58f] bg-[#fffbe6] px-6 py-2"
      >
        <ul className="m-0 list-disc px-4 text-sm text-slate-700">
          {copy.autoAlerts.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-start">
        <FieldLabel>{copy.thresholdLabel}</FieldLabel>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-4">
            {autoThresholdPresets.map((n) => (
              <ChoiceButton
                key={n}
                selected={threshold === n}
                onClick={() => onThresholdChange(n)}
              >
                {formatYuan(n)}
              </ChoiceButton>
            ))}
            <ChoiceButton
              selected={threshold === "other"}
              onClick={() => onThresholdChange("other")}
            >
              {copy.otherAmountShort}
            </ChoiceButton>
          </div>
          <div className="flex items-center gap-1 pl-1 text-xs text-slate-400">
            <InfoCircleIcon className="size-3.5 text-[14px]" />
            {copy.thresholdHint}
          </div>
        </div>
      </div>

      <div className="flex items-start">
        <FieldLabel>{copy.rechargeAmountLabel}</FieldLabel>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-4">
            {autoAmountPresets.map((n) => (
              <ChoiceButton
                key={n}
                selected={amount === n}
                disabled={typeof threshold === "number" && n <= threshold}
                onClick={() => onAmountChange(n)}
              >
                {formatYuan(n)}
              </ChoiceButton>
            ))}
            <ChoiceButton
              selected={amount === "other"}
              onClick={() => onAmountChange("other")}
            >
              {copy.otherAmountShort}
            </ChoiceButton>
          </div>
          <div className="flex items-center gap-1 pl-1 text-xs text-slate-400">
            <InfoCircleIcon className="size-3.5 text-[14px]" />
            {copy.amountHint}
          </div>
        </div>
      </div>

      <div className="ml-[88px] flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-md bg-[rgb(74,171,240)]/10 px-2 py-1 text-xs text-[rgb(74,171,240)]">
          <InfoCircleIcon className="size-3.5 text-[14px]" />
          {copy.autoPreview(thresholdNum, amountNum)}
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-[296px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-[rgb(74,171,240)] px-[15px] text-base text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] hover:bg-[#5b21e6]"
        >
          <AlipayCircleIcon className="size-4" />
          {copy.signNow}
        </button>
      </div>
    </div>
  );
}
