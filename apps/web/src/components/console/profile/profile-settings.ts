/** User settings form + Backend PUT /api/user/setting payload helpers. */

export const DEFAULT_QUOTA_WARNING_THRESHOLD = 500_000;

export type NotifyType = "email" | "webhook" | "bark" | "gotify";

export type UserSettingsForm = {
  notify_type: NotifyType;
  quota_warning_threshold: number;
  notification_email: string;
  webhook_url: string;
  webhook_secret: string;
  bark_url: string;
  gotify_url: string;
  gotify_token: string;
  gotify_priority: number;
  accept_unset_model_ratio_model: boolean;
  record_ip_log: boolean;
};

export type UpdateUserSettingsPayload = {
  notify_type: NotifyType;
  quota_warning_threshold: number;
  notification_email?: string;
  webhook_url?: string;
  webhook_secret?: string;
  bark_url?: string;
  gotify_url?: string;
  gotify_token?: string;
  gotify_priority?: number;
  accept_unset_model_ratio_model: boolean;
  record_ip_log: boolean;
};

const NOTIFY_TYPES = new Set<NotifyType>([
  "email",
  "webhook",
  "bark",
  "gotify",
]);

export function normalizeNotifyType(value: unknown): NotifyType {
  return typeof value === "string" && NOTIFY_TYPES.has(value as NotifyType)
    ? (value as NotifyType)
    : "email";
}

/** Parse Backend `user.setting` JSON into a loose settings bag. */
export function parseUserSettings(
  settingsJson?: string,
): Partial<UserSettingsForm> & Record<string, unknown> {
  if (!settingsJson) return {};
  try {
    return JSON.parse(settingsJson) as Partial<UserSettingsForm> &
      Record<string, unknown>;
  } catch {
    return {};
  }
}

export function settingsFormFromSelfSetting(
  settingsJson?: string,
): UserSettingsForm {
  const parsed = parseUserSettings(settingsJson);
  return {
    notify_type: normalizeNotifyType(parsed.notify_type),
    quota_warning_threshold:
      typeof parsed.quota_warning_threshold === "number" &&
      parsed.quota_warning_threshold > 0
        ? parsed.quota_warning_threshold
        : DEFAULT_QUOTA_WARNING_THRESHOLD,
    notification_email:
      typeof parsed.notification_email === "string"
        ? parsed.notification_email
        : "",
    webhook_url:
      typeof parsed.webhook_url === "string" ? parsed.webhook_url : "",
    webhook_secret:
      typeof parsed.webhook_secret === "string" ? parsed.webhook_secret : "",
    bark_url: typeof parsed.bark_url === "string" ? parsed.bark_url : "",
    gotify_url:
      typeof parsed.gotify_url === "string" ? parsed.gotify_url : "",
    gotify_token:
      typeof parsed.gotify_token === "string" ? parsed.gotify_token : "",
    gotify_priority:
      typeof parsed.gotify_priority === "number" ? parsed.gotify_priority : 5,
    accept_unset_model_ratio_model: Boolean(
      parsed.accept_unset_model_ratio_model,
    ),
    record_ip_log: Boolean(parsed.record_ip_log),
  };
}

export function toUpdateUserSettingsPayload(
  form: UserSettingsForm,
): UpdateUserSettingsPayload {
  const threshold =
    form.quota_warning_threshold > 0
      ? form.quota_warning_threshold
      : DEFAULT_QUOTA_WARNING_THRESHOLD;
  return {
    notify_type: normalizeNotifyType(form.notify_type),
    quota_warning_threshold: threshold,
    notification_email: form.notification_email || undefined,
    webhook_url: form.webhook_url || undefined,
    webhook_secret: form.webhook_secret || undefined,
    bark_url: form.bark_url || undefined,
    gotify_url: form.gotify_url || undefined,
    gotify_token: form.gotify_token || undefined,
    gotify_priority: form.gotify_priority,
    accept_unset_model_ratio_model: form.accept_unset_model_ratio_model,
    record_ip_log: form.record_ip_log,
  };
}
