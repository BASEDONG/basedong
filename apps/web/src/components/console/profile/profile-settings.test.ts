import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_QUOTA_WARNING_THRESHOLD,
  normalizeNotifyType,
  parseUserSettings,
  toUpdateUserSettingsPayload,
  type UserSettingsForm,
} from "./profile-settings.ts";
import { profileHeaderStats } from "./profile-stats.ts";

test("parseUserSettings returns empty object for missing or invalid JSON", () => {
  assert.deepEqual(parseUserSettings(undefined), {});
  assert.deepEqual(parseUserSettings(""), {});
  assert.deepEqual(parseUserSettings("{not-json"), {});
});

test("parseUserSettings reads notify fields from Backend setting JSON", () => {
  const parsed = parseUserSettings(
    JSON.stringify({
      notify_type: "webhook",
      quota_warning_threshold: 1000,
      webhook_url: "https://example.com/hook",
      webhook_secret: "s3cret",
      record_ip_log: true,
    }),
  );
  assert.equal(parsed.notify_type, "webhook");
  assert.equal(parsed.quota_warning_threshold, 1000);
  assert.equal(parsed.webhook_url, "https://example.com/hook");
  assert.equal(parsed.webhook_secret, "s3cret");
  assert.equal(parsed.record_ip_log, true);
});

test("normalizeNotifyType falls back to email for unknown values", () => {
  assert.equal(normalizeNotifyType("email"), "email");
  assert.equal(normalizeNotifyType("bark"), "bark");
  assert.equal(normalizeNotifyType("nope"), "email");
  assert.equal(normalizeNotifyType(undefined), "email");
});

test("toUpdateUserSettingsPayload applies defaults and keeps notify channel fields", () => {
  const form: UserSettingsForm = {
    notify_type: "gotify",
    quota_warning_threshold: 0,
    notification_email: "",
    webhook_url: "",
    webhook_secret: "",
    bark_url: "",
    gotify_url: "https://gotify.example",
    gotify_token: "token",
    gotify_priority: 7,
    accept_unset_model_ratio_model: true,
    record_ip_log: false,
  };
  const payload = toUpdateUserSettingsPayload(form);
  assert.equal(payload.notify_type, "gotify");
  assert.equal(payload.quota_warning_threshold, DEFAULT_QUOTA_WARNING_THRESHOLD);
  assert.equal(payload.gotify_url, "https://gotify.example");
  assert.equal(payload.gotify_token, "token");
  assert.equal(payload.gotify_priority, 7);
  assert.equal(payload.accept_unset_model_ratio_model, true);
  assert.equal(payload.record_ip_log, false);
});

test("profileHeaderStats maps self quota fields with zero defaults", () => {
  assert.deepEqual(
    profileHeaderStats({
      quota: 12_000,
      used_quota: 3_000,
      request_count: 42,
    }),
    { quota: 12_000, usedQuota: 3_000, requestCount: 42 },
  );
  assert.deepEqual(profileHeaderStats({}), {
    quota: 0,
    usedQuota: 0,
    requestCount: 0,
  });
});
