"use client";

import { useState } from "react";
import { updateUserSettings } from "@/lib/backend/client";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import type { ProfileUiCopy } from "./profile-ui-copy";
import {
  toUpdateUserSettingsPayload,
  type NotifyType,
  type UserSettingsForm,
} from "./profile-settings";

type Props = {
  copy: ProfileUiCopy;
  targetLocale: string;
  settings: UserSettingsForm;
  onSettingsChange: (next: UserSettingsForm) => void;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
  onSaved?: () => void;
};

const NOTIFY_OPTIONS: { value: NotifyType; labelKey: keyof ProfileUiCopy }[] = [
  { value: "email", labelKey: "notifyEmail" },
  { value: "webhook", labelKey: "notifyWebhook" },
  { value: "bark", labelKey: "notifyBark" },
  { value: "gotify", labelKey: "notifyGotify" },
];

export function ProfileSettingsPanel({
  copy,
  targetLocale,
  settings,
  onSettingsChange,
  onNotice,
  onError,
  onSaved,
}: Props) {
  const [saving, setSaving] = useState(false);

  const patch = <K extends keyof UserSettingsForm>(
    key: K,
    value: UserSettingsForm[K],
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await updateUserSettings(toUpdateUserSettingsPayload(settings));
      onNotice(copy.settingsSaved);
      onSaved?.();
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.settingsFailed));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionSettings}
      </h2>

      <p className="mt-3 text-xs text-slate-500">{copy.notifyMethod}</p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {NOTIFY_OPTIONS.map((opt) => {
          const selected = settings.notify_type === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => patch("notify_type", opt.value)}
              className={`rounded-[8px] border px-3 py-2 text-sm ${
                selected
                  ? "border-[rgb(74,171,240)] text-[rgb(74,171,240)]"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {copy[opt.labelKey]}
            </button>
          );
        })}
      </div>

      <label className="mt-4 block text-xs text-slate-500">
        {copy.quotaThreshold}
      </label>
      <input
        type="number"
        min={1}
        className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
        value={settings.quota_warning_threshold}
        onChange={(e) =>
          patch("quota_warning_threshold", Number(e.target.value) || 0)
        }
      />
      <p className="mt-1 text-xs text-slate-400">{copy.quotaThresholdHint}</p>

      {settings.notify_type === "email" ? (
        <>
          <label className="mt-4 block text-xs text-slate-500">
            {copy.notificationEmail}
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.notification_email}
            onChange={(e) => patch("notification_email", e.target.value)}
          />
          <p className="mt-1 text-xs text-slate-400">
            {copy.notificationEmailHint}
          </p>
        </>
      ) : null}

      {settings.notify_type === "webhook" ? (
        <>
          <label className="mt-4 block text-xs text-slate-500">
            {copy.webhookUrl}
          </label>
          <input
            type="url"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.webhook_url}
            onChange={(e) => patch("webhook_url", e.target.value)}
          />
          <label className="mt-3 block text-xs text-slate-500">
            {copy.webhookSecret}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.webhook_secret}
            onChange={(e) => patch("webhook_secret", e.target.value)}
            autoComplete="off"
          />
        </>
      ) : null}

      {settings.notify_type === "bark" ? (
        <>
          <label className="mt-4 block text-xs text-slate-500">
            {copy.barkUrl}
          </label>
          <input
            type="url"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.bark_url}
            onChange={(e) => patch("bark_url", e.target.value)}
          />
        </>
      ) : null}

      {settings.notify_type === "gotify" ? (
        <>
          <label className="mt-4 block text-xs text-slate-500">
            {copy.gotifyUrl}
          </label>
          <input
            type="url"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.gotify_url}
            onChange={(e) => patch("gotify_url", e.target.value)}
          />
          <label className="mt-3 block text-xs text-slate-500">
            {copy.gotifyToken}
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.gotify_token}
            onChange={(e) => patch("gotify_token", e.target.value)}
            autoComplete="off"
          />
          <label className="mt-3 block text-xs text-slate-500">
            {copy.gotifyPriority}
          </label>
          <input
            type="number"
            min={0}
            max={10}
            className="mt-1 w-full rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
            value={settings.gotify_priority}
            onChange={(e) =>
              patch("gotify_priority", Number(e.target.value) || 0)
            }
          />
        </>
      ) : null}

      <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={settings.accept_unset_model_ratio_model}
          onChange={(e) =>
            patch("accept_unset_model_ratio_model", e.target.checked)
          }
        />
        {copy.acceptUnsetRatio}
      </label>
      <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={settings.record_ip_log}
          onChange={(e) => patch("record_ip_log", e.target.checked)}
        />
        {copy.recordIpLog}
      </label>

      <button
        type="button"
        disabled={saving}
        onClick={() => void onSave()}
        className={`mt-4 ${CONSOLE_PRIMARY_BTN}`}
      >
        {copy.saveSettings}
      </button>
    </section>
  );
}
