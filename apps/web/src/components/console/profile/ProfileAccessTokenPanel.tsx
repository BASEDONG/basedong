"use client";

import { useState } from "react";
import { generateAccessToken } from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import type { ProfileUiCopy } from "./profile-ui-copy";

type Props = {
  copy: ProfileUiCopy;
  targetLocale: string;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
};

export function ProfileAccessTokenPanel({
  copy,
  targetLocale,
  onNotice,
  onError,
}: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onGenerate = async () => {
    setBusy(true);
    try {
      const value = await generateAccessToken();
      setToken(value);
      onNotice(copy.accessTokenGenerated ?? "Generated");
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setBusy(false);
    }
  };

  const onCopy = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      onNotice(copy.accessTokenCopied ?? "Copied");
    } catch {
      onError(copy.saveFailed);
    }
  };

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionAccessToken ?? "Access Token"}
      </h2>
      <p className="mt-2 text-xs text-slate-500">
        {copy.accessTokenHint}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void onGenerate()}
          className={CONSOLE_PRIMARY_BTN}
        >
          {copy.accessTokenGenerate ?? "Generate"}
        </button>
        {token ? (
          <button
            type="button"
            onClick={() => void onCopy()}
            className="inline-flex h-10 items-center rounded-[12px] border border-slate-300 bg-white px-4 text-sm text-slate-700"
          >
            {copy.accessTokenCopy ?? "Copy"}
          </button>
        ) : null}
      </div>
      {token ? (
        <pre className="mt-3 overflow-x-auto rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800">
          {token}
        </pre>
      ) : null}
    </section>
  );
}
