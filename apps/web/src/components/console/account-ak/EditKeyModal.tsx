"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ApiKeysUiCopy } from "./account-ak-ui-copy";
import { CloseCircleIcon, CloseIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

interface EditKeyModalProps {
  open: boolean;
  copy: ApiKeysUiCopy;
  initialDescription: string;
  onClose: () => void;
  onSave: (description: string) => void;
}

export function EditKeyModal({
  open,
  copy,
  initialDescription,
  onClose,
  onSave,
}: EditKeyModalProps) {
  const titleId = useId();
  const inputId = useId();
  const helpId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialDescription);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!open) {
      setFocused(false);
      return;
    }
    setValue(initialDescription);
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
  }, [open, initialDescription, onClose]);

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
                id={titleId}
                className="m-0 text-base font-semibold leading-6 text-[rgb(30,41,59)]"
              >
                {copy.editModal.title}
              </h2>
            </div>

            <div className="mb-2">
              <label
                htmlFor={inputId}
                className="mb-2 inline-flex text-sm leading-[22px] text-[rgb(30,41,59)] after:ml-0.5 after:mr-2 after:content-[':']"
              >
                {copy.editModal.label}
              </label>
              <div
                className={`inline-flex h-8 w-full items-center rounded-md border bg-white px-[11px] py-1 transition-[border-color,box-shadow] ${
                  focused
                    ? "border-[rgb(74,171,240)] shadow-[0_0_0_2px_rgba(74,171,240,0.1)]"
                    : "border-[rgb(203,213,225)]"
                }`}
              >
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSave(value.trim());
                    }
                  }}
                  placeholder={copy.editModal.placeholder}
                  aria-describedby={helpId}
                  className="h-[22px] w-full border-0 bg-transparent p-0 text-sm leading-[22px] text-[rgb(30,41,59)] outline-none placeholder:text-[rgb(148,163,184)]"
                />
                {value ? (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label="close-circle"
                    onClick={() => {
                      setValue("");
                      inputRef.current?.focus();
                    }}
                    className="ml-1 inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 text-[rgb(148,163,184)] transition-colors hover:text-[rgb(100,116,139)]"
                  >
                    <CloseCircleIcon className="size-3.5" />
                  </button>
                ) : null}
              </div>
              <div
                id={helpId}
                className="min-h-2 text-sm leading-[22px] text-[rgb(100,116,139)]"
              >
                {copy.editModal.help}
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-[rgb(203,213,225)] bg-white px-[15px] text-sm leading-[22px] text-[rgb(30,41,59)] shadow-[0_2px_0_rgba(0,0,0,0.02)] transition-colors hover:border-[rgb(74,171,240)] hover:text-[rgb(74,171,240)]"
              >
                {copy.editModal.cancel}
              </button>
              <button
                type="button"
                onClick={() => onSave(value.trim())}
                className="ml-2 inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-transparent bg-[rgb(74,171,240)] px-[15px] text-sm leading-[22px] text-white shadow-[0_2px_0_0_rgba(74,171,240,0.06)] transition-[background] duration-200 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:bg-[#5b21e6]"
              >
                {copy.editModal.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
