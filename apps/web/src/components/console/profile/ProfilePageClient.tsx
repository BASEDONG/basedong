"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import {
  changeSelfPassword,
  getPublicAuthStatus,
  getSelf,
  getTwoFactorStatus,
  listUserSessions,
  revokeOtherSessions,
  revokeUserSession,
  updateSelfProfile,
  type BackendUser,
  type PublicAuthStatus,
  type TwoFactorStatus,
  type UserSessionRow,
} from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import type { Locale } from "@/lib/locale";
import { ConsoleEmptyState } from "../shared/ConsoleEmptyState";
import { ConsoleShell } from "../shared/ConsoleShell";
import { MessageToast } from "../shared/MessageToast";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import {
  formatConsoleCount,
  formatConsoleQuota,
} from "../shared/format-quota";
import { notifySelfUpdated } from "../shared/self-events";
import { ProfileAccessTokenPanel } from "./ProfileAccessTokenPanel";
import { ProfileBindingsPanel } from "./ProfileBindingsPanel";
import { ProfileCheckinPanel } from "./ProfileCheckinPanel";
import { ProfileDeleteAccountPanel } from "./ProfileDeleteAccountPanel";
import { ProfileLanguagePanel } from "./ProfileLanguagePanel";
import { ProfileSecurityPanels } from "./ProfileSecurityPanels";
import { ProfileSettingsPanel } from "./ProfileSettingsPanel";
import { isCheckinVisible } from "./profile-gates";
import { getProfileUiCopy } from "./profile-ui-copy";
import {
  settingsFormFromSelfSetting,
  type UserSettingsForm,
} from "./profile-settings";
import {
  profileHeaderStats,
  type ProfileHeaderStats,
} from "./profile-stats";

function formatTs(sec?: number) {
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function ProfilePageClient() {
  const { targetLocale, preferredLocale, setPreferredLocale } = useLocale();
  const copy = useMemo(() => getProfileUiCopy(targetLocale), [targetLocale]);
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [self, setSelf] = useState<BackendUser | null>(null);
  const [authStatus, setAuthStatus] = useState<PublicAuthStatus | null>(null);
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stats, setStats] = useState<ProfileHeaderStats | null>(null);
  const [settings, setSettings] = useState<UserSettingsForm>(() =>
    settingsFormFromSelfSetting(),
  );
  const [twoFa, setTwoFa] = useState<TwoFactorStatus | null>(null);
  const [sessions, setSessions] = useState<UserSessionRow[]>([]);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
    },
    [],
  );

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const me = await getSelf();
      setSelf(me);
      setUsername(me.username ?? "");
      setDisplayName(me.display_name ?? "");
      setStats(profileHeaderStats(me));
      setSettings(settingsFormFromSelfSetting(me.setting));
    } catch (e) {
      setSelf(null);
      setStats(null);
      setError(localizeBackendError(targetLocale, e, copy.loadFailed));
    }
    try {
      setAuthStatus(await getPublicAuthStatus());
    } catch {
      setAuthStatus(null);
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
    try {
      await updateSelfProfile({
        username: username.trim(),
        display_name: displayName.trim(),
      });
      showToast(copy.saved);
      notifySelfUpdated();
      await refresh();
    } catch (e) {
      showToast(
        localizeBackendError(targetLocale, e, copy.saveFailed),
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const onChangePassword = async () => {
    setSaving(true);
    setError(null);
    try {
      await changeSelfPassword({
        username: username.trim(),
        display_name: displayName.trim(),
        original_password: originalPassword,
        password: newPassword,
      });
      setOriginalPassword("");
      setNewPassword("");
      showToast(copy.passwordChanged);
    } catch (e) {
      showToast(
        localizeBackendError(targetLocale, e, copy.passwordFailed),
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const onLocaleChange = (code: Locale) => {
    setPreferredLocale(code);
    showToast(copy.languageSaved);
  };

  return (
    <ConsoleShell
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      activeKey="profile"
      title={copy.pageTitle}
      overlay={
        <MessageToast
          open={toast !== null}
          type={toast?.type ?? "success"}
          message={toast?.message ?? ""}
          onClose={() => setToast(null)}
        />
      }
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        {error ? (
          <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {stats ? (
          <section className={`${CONSOLE_SURFACE} overflow-hidden`}>
            <div className="border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-800">
                {copy.sectionStats}
              </h2>
            </div>
            <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="px-4 py-3">
                <div className="text-xs text-slate-500">{copy.statQuota}</div>
                <div className="mt-1 font-mono text-lg font-semibold text-slate-800">
                  {formatConsoleQuota(stats.quota, targetLocale)}
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="text-xs text-slate-500">
                  {copy.statUsedQuota}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold text-slate-800">
                  {formatConsoleQuota(stats.usedQuota, targetLocale)}
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="text-xs text-slate-500">
                  {copy.statRequests}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold text-slate-800">
                  {formatConsoleCount(stats.requestCount, targetLocale)}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className={`${CONSOLE_SURFACE} p-4`}>
          <h2 className="text-sm font-semibold text-slate-800">
            {copy.sectionProfile}
          </h2>
          <label className="mt-3 block text-xs text-slate-500">
            {copy.username}
          </label>
          <input
            className="mt-1 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
            value={username}
            disabled
            readOnly
          />
          <label className="mt-3 block text-xs text-slate-500">
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
            className={`mt-3 ${CONSOLE_PRIMARY_BTN}`}
          >
            {copy.save}
          </button>
        </section>

        <ProfileLanguagePanel
          copy={copy}
          preferredLocale={preferredLocale}
          onLocaleChange={onLocaleChange}
        />

        {stats ? (
          <ProfileSettingsPanel
            copy={copy}
            targetLocale={targetLocale}
            settings={settings}
            onSettingsChange={setSettings}
            onNotice={(msg) => showToast(msg)}
            onError={(msg) => showToast(msg, "error")}
            onSaved={() => void refresh()}
          />
        ) : null}

        <section className={`${CONSOLE_SURFACE} p-4`}>
          <h2 className="text-sm font-semibold text-slate-800">
            {copy.sectionPassword}
          </h2>
          <label className="mt-3 block text-xs text-slate-500">
            {copy.originalPassword}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={originalPassword}
            onChange={(e) => setOriginalPassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="mt-3 block text-xs text-slate-500">
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
            className="mt-3 inline-flex h-10 items-center rounded-[12px] border border-slate-300 bg-white px-5 text-base text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {copy.changePassword}
          </button>
        </section>

        <ProfileAccessTokenPanel
          copy={copy}
          targetLocale={targetLocale}
          onNotice={(msg) => showToast(msg)}
          onError={(msg) => showToast(msg, "error")}
        />

        {isCheckinVisible(authStatus) ? (
          <ProfileCheckinPanel
            copy={copy}
            targetLocale={targetLocale}
            onNotice={(msg) => showToast(msg)}
            onError={(msg) => showToast(msg, "error")}
            onQuotaMaybeChanged={() => {
              notifySelfUpdated();
              void refresh();
            }}
          />
        ) : null}

        <ProfileBindingsPanel
          copy={copy}
          targetLocale={targetLocale}
          self={self}
          onNotice={(msg) => showToast(msg)}
          onError={(msg) => showToast(msg, "error")}
          onBound={() => {
            notifySelfUpdated();
            void refresh();
          }}
        />

        <ProfileSecurityPanels
          copy={copy}
          targetLocale={targetLocale}
          twoFa={twoFa}
          onNotice={(msg) => showToast(msg)}
          onError={(msg) => showToast(msg, "error")}
          onTwoFaChange={() => void refresh()}
        />

        <section className={`${CONSOLE_SURFACE} p-4`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-800">
              {copy.sectionSessions}
            </h2>
            <button
              type="button"
              className="text-xs font-semibold text-[rgb(74,171,240)]"
              onClick={() => {
                void (async () => {
                  try {
                    await revokeOtherSessions();
                    showToast(copy.sessionsRevoked);
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
            <p className="mt-2 text-sm text-slate-500">{sessionsError}</p>
          ) : sessions.length === 0 ? (
            <div className="mt-1">
              <ConsoleEmptyState message={copy.sessionsEmpty} />
            </div>
          ) : (
            <ul className="mt-2 divide-y divide-slate-100">
              {sessions.map((s, i) => {
                const sid = s.sid ?? s.id ?? String(i);
                return (
                  <li
                    key={sid}
                    className="flex items-center justify-between gap-3 py-2.5 text-sm"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-slate-700">
                        {s.user_agent ?? sid}
                        {s.current ? ` · ${copy.sessionCurrent}` : ""}
                      </div>
                      <div className="text-xs text-slate-400">
                        {s.ip ?? "—"} ·{" "}
                        {formatTs(s.last_seen_at ?? s.created_at)}
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

        {username ? (
          <ProfileDeleteAccountPanel
            copy={copy}
            targetLocale={targetLocale}
            username={username}
            onNotice={(msg) => showToast(msg)}
            onError={(msg) => showToast(msg, "error")}
          />
        ) : null}
      </div>
    </ConsoleShell>
  );
}
