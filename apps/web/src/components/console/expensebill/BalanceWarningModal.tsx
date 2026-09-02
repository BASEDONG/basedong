"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { ExpenseBillUiCopy } from "./expensebill-ui-copy";
import { CloseIcon } from "./icons";

export type WarningMode = "auto" | "custom" | "off";

interface BalanceWarningModalProps {
  copy: ExpenseBillUiCopy;
  open: boolean;
  mode: WarningMode;
  threshold: number;
  onClose: () => void;
  onConfirm: (mode: WarningMode, threshold: number) => void;
}

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

function AntRadio({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border",
        checked
          ? "border-[rgb(74,171,240)] bg-[rgb(74,171,240)]"
          : "border-slate-300 bg-white",
      )}
    >
      {checked ? (
        <span className="block size-1.5 rounded-full bg-white" />
      ) : null}
    </span>
  );
}

export function BalanceWarningModal({
  copy,
  open,
  mode,
  threshold,
  onClose,
  onConfirm,
}: BalanceWarningModalProps) {
  const titleId = useId();
  const [draftMode, setDraftMode] = useState<WarningMode>(mode);
  const [draftThreshold, setDraftThreshold] = useState(threshold);
  const [thresholdText, setThresholdText] = useState(
    threshold.toFixed(2),
  );

  useEffect(() => {
    if (!open) return;
    setDraftMode(mode);
    setDraftThreshold(threshold);
    setThresholdText(threshold.toFixed(2));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, mode, threshold, onClose]);

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
            className="pointer-events-auto relative w-full max-w-[520px] rounded-[8px] bg-white px-6 py-5 text-sm leading-[22px] text-[rgb(30,41,59)] shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded text-slate-500 transition-colors hover:bg-black/[0.06] hover:text-slate-800"
            >
              <CloseIcon className="size-[14px]" />
            </button>

            <div className="mb-2 pr-8">
              <h2
                id={titleId}
                className="m-0 text-base font-semibold leading-6 text-[rgb(30,41,59)]"
              >
                {copy.warningModalTitle}
              </h2>
            </div>

            <div>
              <ul className="ml-4 space-y-2 text-slate-700">
                <li className="list-disc">
                  {copy.warningRule1}
                  <ul className="ml-5 mt-1 space-y-1">
                    <li className="list-disc">{copy.warningRule1a}</li>
                    <li className="list-disc">{copy.warningRule1b}</li>
                  </ul>
                </li>
                <li className="list-disc">{copy.warningRule2}</li>
                <li className="list-disc">
                  {copy.warningRule3Before}
                  <span className="font-semibold">{copy.warningRule3Bold}</span>
                  {copy.warningRule3After}
                </li>
              </ul>

              <div className="pb-3">
                <span>{copy.warningThresholdLabel}</span>
                <div
                  role="radiogroup"
                  className="ml-3 mt-5 flex flex-wrap items-center gap-2"
                >
                  <label
                    className="inline-flex cursor-pointer items-center gap-2 text-sm text-[rgb(30,41,59)]"
                    onClick={() => setDraftMode("auto")}
                  >
                    <input
                      type="radio"
                      name="warning-mode"
                      className="sr-only"
                      checked={draftMode === "auto"}
                      onChange={() => setDraftMode("auto")}
                    />
                    <AntRadio checked={draftMode === "auto"} />
                    <span>{copy.warningAuto}</span>
                  </label>

                  <label
                    className="inline-flex cursor-pointer items-center gap-2 text-sm text-[rgb(30,41,59)]"
                    onClick={() => setDraftMode("custom")}
                  >
                    <input
                      type="radio"
                      name="warning-mode"
                      className="sr-only"
                      checked={draftMode === "custom"}
                      onChange={() => setDraftMode("custom")}
                    />
                    <AntRadio checked={draftMode === "custom"} />
                    <span className="flex items-center">
                      {copy.warningCustom}
                      {draftMode === "custom" ? (
                        <span className="ml-2 inline-flex h-6 w-[100px] overflow-hidden rounded border border-slate-300">
                          <input
                            type="number"
                            min={1}
                            step={0.01}
                            value={thresholdText}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setThresholdText(e.target.value);
                              const n = Number.parseFloat(e.target.value);
                              if (Number.isFinite(n) && n >= 1) {
                                setDraftThreshold(n);
                              }
                            }}
                            onBlur={() => {
                              const n = Number.parseFloat(thresholdText);
                              const next =
                                Number.isFinite(n) && n >= 1 ? n : 1;
                              setDraftThreshold(next);
                              setThresholdText(next.toFixed(2));
                            }}
                            className="h-full w-full min-w-0 border-0 px-2 text-sm leading-6 text-[rgb(30,41,59)] outline-none"
                          />
                          <span className="flex shrink-0 items-center border-l border-slate-300 bg-[rgba(0,0,0,0.02)] px-2 text-sm text-[rgb(30,41,59)]">
                            {copy.warningYuan}
                          </span>
                        </span>
                      ) : null}
                    </span>
                  </label>

                  <label
                    className="inline-flex cursor-pointer items-center gap-2 text-sm text-[rgb(30,41,59)]"
                    onClick={() => setDraftMode("off")}
                  >
                    <input
                      type="radio"
                      name="warning-mode"
                      className="sr-only"
                      checked={draftMode === "off"}
                      onChange={() => setDraftMode("off")}
                    />
                    <AntRadio checked={draftMode === "off"} />
                    <span>{copy.warningOff}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white px-[15px] text-sm text-[rgb(30,41,59)] hover:border-[rgb(74,171,240)] hover:text-[rgb(74,171,240)]"
              >
                {copy.warningCancel}
              </button>
              <button
                type="button"
                onClick={() => onConfirm(draftMode, draftThreshold)}
                className="ml-2 inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-transparent bg-[rgb(74,171,240)] px-[15px] text-sm text-white hover:bg-[#5b21e6]"
              >
                {copy.warningOk}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
