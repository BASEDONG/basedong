"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { getSelf, updateSelfProfile } from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getProfileUiCopy } from "./profile-ui-copy";

export function ProfilePageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getProfileUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const self = await getSelf();
      setUsername(self.username ?? "");
      setDisplayName(self.display_name ?? "");
    } catch (e) {
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
    }
  }, [copy.loadFailed, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await updateSelfProfile({
        username: username.trim(),
        display_name: displayName.trim(),
      });
      setNotice(copy.saved);
      await refresh();
    } catch (e) {
      setError(localizeBackendError(targetLocale, e, copy.saveFailed));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="profile"
      title={copy.pageTitle}
    >
      <div className="mx-auto w-full max-w-xl rounded-[8px] border border-slate-200 bg-white p-6">
        {error ? (
          <p className="mb-4 rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="mb-4 rounded-[8px] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {notice}
          </p>
        ) : null}
        <label className="block text-xs text-slate-500">{copy.username}</label>
        <input
          className="mt-1 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
          value={username}
          disabled
          readOnly
        />
        <label className="mt-4 block text-xs text-slate-500">
          {copy.displayName}
        </label>
        <input
          className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm text-slate-800"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button
          type="button"
          disabled={saving}
          onClick={() => void onSave()}
          className="mt-6 inline-flex h-10 items-center rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white hover:bg-[#3A9BD8] disabled:opacity-60"
        >
          {copy.save}
        </button>
        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          {copy.securityNote}
        </p>
      </div>
    </ConsoleShell>
  );
}
