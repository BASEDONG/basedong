"use client";

import { useEffect, useRef, useState } from "react";
import { deleteModalCopy } from "./content";
import { CloseIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

interface ConfirmDeleteModalProps {
  open: boolean;
  expectedSuffix: string;
  onClose: () => void;
  onConfirm: () => void;
  onMismatch: () => void;
}

export function ConfirmDeleteModal({
  open,
  expectedSuffix,
  onClose,
  onConfirm,
  onMismatch,
}: ConfirmDeleteModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!open) {
      setValue("");
      setFocused(false);
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function submit() {
    if (value.trim() !== expectedSuffix) {
      onMismatch();
      return;
    }
    onConfirm();
  }

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
            aria-labelledby="ak-delete-title"
            className="pointer-events-auto relative w-full max-w-[520px] rounded-[8px] bg-white px-6 py-5 text-[rgb(30,41,59)] shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded text-[rgb(100,116,139)] transition-colors hover:bg-black/[0.06] hover:text-[rgb(30,41,59)]"
            >
              <CloseIcon className="size-[14px]" />
            </button>

            <div className="mb-2 pr-8">
              <h2
                id="ak-delete-title"
                className="m-0 text-base font-semibold leading-6 text-[rgb(30,41,59)]"
              >
                {deleteModalCopy.title}
              </h2>
            </div>

            <div
              role="alert"
              className="flex rounded-[8px] border border-[rgb(255,229,143)] bg-[rgb(255,251,230)] px-3 py-2 text-sm leading-[22px] text-[rgb(30,41,59)]"
            >
              <div>{deleteModalCopy.warning}</div>
            </div>

            <div className="my-3 text-sm leading-[22px] text-[rgb(51,65,85)]">
              {deleteModalCopy.promptBefore}{" "}
              <span className="mr-2 inline-block rounded border border-[rgb(145,202,255)] bg-[rgb(230,244,255)] px-[7px] text-xs leading-5 text-[rgb(9,88,217)]">
                {expectedSuffix}
              </span>
              {deleteModalCopy.promptAfter}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              className={`box-border h-8 w-full rounded-md border bg-white px-[11px] py-1 text-sm leading-[22px] text-[rgb(30,41,59)] outline-none transition-[border-color,box-shadow] ${
                focused
                  ? "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.1)]"
                  : "border-[rgb(203,213,225)]"
              }`}
            />

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-[rgb(203,213,225)] bg-white px-[15px] text-sm leading-[22px] text-[rgb(30,41,59)] shadow-[0_2px_0_rgba(0,0,0,0.02)] transition-colors hover:border-[rgb(74,171,240)] hover:text-[rgb(74,171,240)]"
              >
                {deleteModalCopy.cancel}
              </button>
              <button
                type="button"
                onClick={submit}
                className="ml-2 inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-transparent bg-[rgb(255,77,79)] px-[15px] text-sm leading-[22px] text-white shadow-[0_2px_0_rgba(255,38,5,0.06)] transition-[background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:bg-[#d9363e]"
              >
                {deleteModalCopy.confirm}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
