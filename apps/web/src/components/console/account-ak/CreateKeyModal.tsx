"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ApiKeyWriteInput } from "@/lib/backend/client";
import { CONSOLE_PRIMARY_BTN_COMPACT } from "../shared/console-ui";
import type { ApiKeysUiCopy } from "./account-ak-ui-copy";
import { CloseIcon } from "./icons";

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

interface CreateKeyModalProps {
  open: boolean;
  copy: ApiKeysUiCopy;
  onClose: () => void;
  onCreate: (input: ApiKeyWriteInput) => void;
}

export function CreateKeyModal({
  open,
  copy,
  onClose,
  onCreate,
}: CreateKeyModalProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [unlimited, setUnlimited] = useState(true);
  const [remainQuota, setRemainQuota] = useState(0);
  const [group, setGroup] = useState("");
  const [modelLimits, setModelLimits] = useState("");
  const [allowIps, setAllowIps] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setUnlimited(true);
      setRemainQuota(0);
      setGroup("");
      setModelLimits("");
      setAllowIps("");
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

  const submit = () => {
    const trimmed = name.trim() || `key-${Date.now()}`;
    onCreate({
      name: trimmed,
      unlimited_quota: unlimited,
      remain_quota: unlimited ? 0 : Math.max(0, Math.floor(remainQuota)),
      expired_time: -1,
      group: group.trim(),
      model_limits: modelLimits.trim(),
      model_limits_enabled: Boolean(modelLimits.trim()),
      allow_ips: allowIps.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[1000]" style={{ fontFamily: antFont }}>
      <div
        className="absolute inset-0 bg-[rgba(2,6,23,0.45)]"
        onClick={onClose}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 overflow-auto">
        <div className="flex min-h-full items-start justify-center px-4 pb-8 pt-[80px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="pointer-events-auto relative w-full max-w-[560px] rounded-[8px] bg-white px-6 py-5 text-[rgb(30,41,59)] shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded text-[rgb(100,116,139)] hover:bg-black/[0.06]"
            >
              <CloseIcon className="size-[14px]" />
            </button>

            <h2
              id={titleId}
              className="m-0 mb-3 pr-8 text-base font-semibold"
            >
              {copy.createModal.title}
            </h2>

            <label className="mb-1 block text-sm">{copy.createModal.label}</label>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.createModal.placeholder}
              className="mb-1 h-8 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[rgb(74,171,240)]"
            />
            <p className="mb-3 text-xs text-slate-500">{copy.createModal.help}</p>

            <label className="mb-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={unlimited}
                onChange={(e) => setUnlimited(e.target.checked)}
              />
              {copy.createModal.unlimitedQuota ?? "Unlimited quota"}
            </label>
            {!unlimited ? (
              <div className="mb-3">
                <label className="mb-1 block text-sm">
                  {copy.createModal.remainQuota ?? "Quota"}
                </label>
                <input
                  type="number"
                  min={0}
                  value={remainQuota}
                  onChange={(e) =>
                    setRemainQuota(Number.parseInt(e.target.value, 10) || 0)
                  }
                  className="h-8 w-full rounded-md border border-slate-300 px-3 text-sm"
                />
              </div>
            ) : null}

            <label className="mb-1 block text-sm">
              {copy.createModal.group ?? "Group"}
            </label>
            <input
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder={copy.createModal.groupPlaceholder}
              className="mb-3 h-8 w-full rounded-md border border-slate-300 px-3 text-sm"
            />

            <label className="mb-1 block text-sm">
              {copy.createModal.modelLimits ?? "Model allowlist"}
            </label>
            <input
              value={modelLimits}
              onChange={(e) => setModelLimits(e.target.value)}
              className="mb-1 h-8 w-full rounded-md border border-slate-300 px-3 text-sm"
            />
            <p className="mb-3 text-xs text-slate-500">
              {copy.createModal.modelLimitsHelp}
            </p>

            <label className="mb-1 block text-sm">
              {copy.createModal.allowIps ?? "IP allowlist"}
            </label>
            <textarea
              value={allowIps}
              onChange={(e) => setAllowIps(e.target.value)}
              rows={3}
              className="mb-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <p className="mb-4 text-xs text-slate-500">
              {copy.createModal.allowIpsHelp}
            </p>
            <p className="mb-4 text-xs text-slate-400">
              {copy.createModal.expiredNever ?? copy.neverExpire ?? "Never expires"}
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 items-center rounded-md border border-slate-300 px-[15px] text-sm"
              >
                {copy.createModal.cancel}
              </button>
              <button
                type="button"
                onClick={submit}
                className={CONSOLE_PRIMARY_BTN_COMPACT}
              >
                {copy.createModal.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
