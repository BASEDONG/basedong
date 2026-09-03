"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  changeSelfPassword,
  getSelf,
  getTwoFactorStatus,
  listUserSessions,
  revokeOtherSessions,
  revokeUserSession,
  updateSelfProfile,
  type TwoFactorStatus,
  type UserSessionRow,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { ConsoleShell } from "../shared/ConsoleShell";
import { getProfileUiCopy } from "./profile-ui-copy";

function formatTs(sec?: number) {
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function ProfilePageClient() {
  const { targetLocale } = useLocale();
  const copy = useMemo(() => getProfileUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFa, setTwoFa] = useState<TwoFactorStatus | null>(null);
  const [sessions, setSessions] = useState<UserSessionRow[]>([]);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
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
    try {
      setTwoFa(await getTwoFactorStatus());
    } catch {
      setTwoFa(null);
    }
    try {
      setSessions(await listUserSessions());
      setSessionsError(null);
    } catch (e) {
      setSessions([]);
      setSessionsError(
        localizeBackendError(targetLocale, e, copy.sessionsUnavailable),
      );
    }
  }, [copy.loadFailed, copy.sessionsUnavailable, targetLocale]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onSaveProfile = async () => {
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

  const onChangePassword = async () => {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await changeSelfPassword({
        username: username.trim(),
        display_name: displayName.trim(),
        original_password: originalPassword,
        password: newPassword,
      });
      setOriginalPassword("");
      setNewPassword("");
      setNotice(copy.passwordChanged);
    } catch (e) {
      setError(localizeBackendError(targetLocale, e, copy.passwordFailed));
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
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        {error ? (
          <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="rounded-[8px] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {notice}
          </p>
        ) : null}

        <section className="rounded-[8px] border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-800">
            {copy.sectionProfile}
          </h2>
          <label className="mt-4 block text-xs text-slate-500">
            {copy.username}
          </label>
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
            onClick={() => void onSaveProfile()}
            className="mt-4 inline-flex h-10 items-center rounded-[8px] bg-[#4AABF0] px-5 text-[13px] font-semibold text-white hover:bg-[#3A9BD8] disabled:opacity-60"
          >
            {copy.save}
          </button>
        </section>

        <section className="rounded-[8px] border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-800">
            {copy.sectionPassword}
          </h2>
          <label className="mt-4 block text-xs text-slate-500">
            {copy.originalPassword}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={originalPassword}
            onChange={(e) => setOriginalPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="mt-4 block text-xs text-slate-500">
            {copy.newPassword}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            type="button"
            disabled={saving || !originalPassword || !newPassword}
            onClick={() => void onChangePassword()}
            className="mt-4 inline-flex h-10 items-center rounded-[8px] border border-slate-300 bg-white px-5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {copy.changePassword}
          </button>
        </section>

        <section className="rounded-[8px] border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-800">
            {copy.sectionSecurity}
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            {copy.twoFaLabel}:{" "}
            {twoFa == null
              ? copy.twoFaUnknown
              : twoFa.enabled
                ? copy.twoFaOn
                : copy.twoFaOff}
            {twoFa?.locked ? ` (${copy.twoFaLocked})` : null}
          </p>
          <p className="mt-2 text-xs text-slate-400">{copy.securityNote}</p>
        </section>

        <section className="rounded-[8px] border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-800">
              {copy.sectionSessions}
            </h2>
            <button
              type="button"
              className="text-xs font-semibold text-[#4AABF0]"
              onClick={() => {
                void (async () => {
                  try {
                    await revokeOtherSessions();
                    setNotice(copy.sessionsRevoked);
                    await refresh();
                  } catch (e) {
                    setError(
                      localizeBackendError(
                        targetLocale,
                        e,
                        copy.sessionsUnavailable,
                      ),
                    );
                  }
                })();
              }}
            >
              {copy.revokeOthers}
            </button>
          </div>
          {sessionsError ? (
            <p className="mt-3 text-sm text-slate-500">{sessionsError}</p>
          ) : sessions.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">{copy.sessionsEmpty}</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {sessions.map((s, i) => {
                const sid = s.sid ?? s.id ?? String(i);
                return (
                  <li
                    key={sid}
                    className="flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-slate-700">
                        {s.user_agent ?? sid}
                        {s.current ? ` · ${copy.sessionCurrent}` : ""}
                      </div>
                      <div className="text-xs text-slate-400">
                        {s.ip ?? "—"} · {formatTs(s.last_seen_at ?? s.created_at)}
                      </div>
                    </div>
                    {!s.current ? (
                      <button
                        type="button"
                        className="shrink-0 text-xs text-red-600"
                        onClick={() => {
                          void (async () => {
                            try {
                              await revokeUserSession(sid);
                              await refresh();
                            } catch (e) {
                              setError(
                                localizeBackendError(
                                  targetLocale,
                                  e,
                                  copy.sessionsUnavailable,
                                ),
                              );
                            }
                          })();
                        }}
                      >
                        {copy.revokeSession}
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </ConsoleShell>
  );
}
