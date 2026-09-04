/** Visibility helpers for wallet subscription + affiliate panels. */

import type {
  SelfSubscriptionData,
  SubscriptionPlanRecord,
} from "@/lib/backend/client";

export const BILLING_PREFERENCES = [
  "subscription_first",
  "wallet_first",
  "subscription_only",
  "wallet_only",
] as const;

export type KnownBillingPreference = (typeof BILLING_PREFERENCES)[number];

export function isSubscriptionSectionVisible(
  plans: SubscriptionPlanRecord[],
  self: SelfSubscriptionData | null,
): boolean {
  if (plans.length > 0) return true;
  return (self?.all_subscriptions?.length ?? 0) > 0;
}

export function hasActiveSubscription(
  self: SelfSubscriptionData | null,
): boolean {
  return (self?.subscriptions ?? []).some(
    (row) => row.subscription?.status === "active",
  );
}

export function subscriptionBalanceCost(
  priceAmount: number,
  quotaPerUnit: number,
): number {
  const unit = quotaPerUnit > 0 ? quotaPerUnit : 500_000;
  return Math.max(0, Math.ceil(Number(priceAmount || 0) * unit));
}

export function buildAffiliateInviteLink(
  origin: string,
  affCode: string,
): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/login?aff=${encodeURIComponent(affCode)}`;
}

export function clampTransferQuota(
  requested: number,
  pending: number,
): number {
  if (!Number.isFinite(requested) || requested <= 0) return 0;
  if (!Number.isFinite(pending) || pending <= 0) return 0;
  return Math.min(Math.floor(requested), Math.floor(pending));
}
