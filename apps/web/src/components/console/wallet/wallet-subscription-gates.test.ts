import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAffiliateInviteLink,
  clampTransferQuota,
  hasActiveSubscription,
  isSubscriptionSectionVisible,
  subscriptionBalanceCost,
} from "./wallet-subscription-gates.ts";

test("isSubscriptionSectionVisible needs plans or history", () => {
  assert.equal(isSubscriptionSectionVisible([], null), false);
  assert.equal(
    isSubscriptionSectionVisible([{ plan: { id: 1 } }], null),
    true,
  );
  assert.equal(
    isSubscriptionSectionVisible([], {
      all_subscriptions: [{ subscription: { id: 9, status: "expired" } }],
    }),
    true,
  );
});

test("hasActiveSubscription checks active rows only", () => {
  assert.equal(hasActiveSubscription(null), false);
  assert.equal(
    hasActiveSubscription({
      subscriptions: [{ subscription: { status: "expired" } }],
    }),
    false,
  );
  assert.equal(
    hasActiveSubscription({
      subscriptions: [{ subscription: { status: "active" } }],
    }),
    true,
  );
});

test("subscriptionBalanceCost uses quota_per_unit", () => {
  assert.equal(subscriptionBalanceCost(2, 500_000), 1_000_000);
  assert.equal(subscriptionBalanceCost(1.1, 500_000), 550_000);
});

test("buildAffiliateInviteLink points at login with aff", () => {
  assert.equal(
    buildAffiliateInviteLink("https://example.com/", "ABC"),
    "https://example.com/login?aff=ABC",
  );
});

test("clampTransferQuota never exceeds pending", () => {
  assert.equal(clampTransferQuota(100, 40), 40);
  assert.equal(clampTransferQuota(0, 40), 0);
  assert.equal(clampTransferQuota(10, 0), 0);
});
