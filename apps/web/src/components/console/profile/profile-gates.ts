/** Status → which Profile #66 panels / bind providers are visible. */

import type {
  CustomOAuthProviderInfo,
  PublicAuthStatus,
} from "@/lib/backend/client";

export type BuiltinBindProvider =
  | "email"
  | "wechat"
  | "telegram"
  | "github"
  | "discord"
  | "linuxdo"
  | "oidc";

export function isCheckinVisible(status: PublicAuthStatus | null): boolean {
  return Boolean(status?.checkin_enabled);
}

export function enabledBuiltinBindProviders(
  status: PublicAuthStatus | null,
): BuiltinBindProvider[] {
  if (!status) return [];
  const out: BuiltinBindProvider[] = [];
  // Email bind is always offered when verification exists, else still useful for account linking.
  out.push("email");
  if (status.wechat_login) out.push("wechat");
  if (status.telegram_oauth) out.push("telegram");
  if (status.github_oauth) out.push("github");
  if (status.discord_oauth) out.push("discord");
  if (status.linuxdo_oauth) out.push("linuxdo");
  if (status.oidc_enabled) out.push("oidc");
  return out;
}

export function enabledCustomOAuthProviders(
  status: PublicAuthStatus | null,
): CustomOAuthProviderInfo[] {
  const list = status?.custom_oauth_providers ?? [];
  return list.filter(
    (p) =>
      Boolean(p?.slug) &&
      Boolean(p?.client_id) &&
      Boolean(p?.authorization_endpoint),
  );
}

export function currentCheckinMonth(
  now = new Date(),
): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
