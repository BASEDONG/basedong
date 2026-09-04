"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSelfAccount } from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { APP_ROUTES } from "@/lib/routes";
import { CONSOLE_SURFACE } from "../shared/console-ui";
import type { ProfileUiCopy } from "./profile-ui-copy";

type Props = {
  copy: ProfileUiCopy;
  targetLocale: string;
  username: string;
  onError: (msg: string) => void;
  onNotice: (msg: string) => void;
};

export function ProfileDeleteAccountPanel({
  copy,
  targetLocale,
  username,
  onError,
  onNotice,
}: Props) {
  const router = useRouter();
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const onDelete = async () => {
    if (confirm.trim() !== username) {
      onError(copy.deleteMismatch ?? "Mismatch");
      return;
    }
    setBusy(true);
    try {
      await deleteSelfAccount();
      onNotice(copy.deleteDone ?? "Deleted");
      router.replace(APP_ROUTES.login ?? "/login");
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`${CONSOLE_SURFACE} border-red-100 p-4`}>
      <h2 className="text-sm font-semibold text-red-700">
        {copy.sectionDelete ?? "Delete account"}
      </h2>
      <p className="mt-2 text-xs text-slate-500">{copy.deleteHint}</p>
      <label className="mt-3 block text-xs text-slate-500">
        {copy.deleteConfirmLabel}
      </label>
      <input
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder={copy.deleteConfirmPlaceholder}
        className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
        autoComplete="off"
      />
      <button
        type="button"
        disabled={busy || !confirm.trim()}
        onClick={() => void onDelete()}
        className="mt-3 inline-flex h-10 items-center rounded-[12px] border border-red-200 bg-red-50 px-4 text-sm text-red-700 disabled:opacity-50"
      >
        {copy.deleteSubmit ?? "Delete"}
      </button>
    </section>
  );
}
