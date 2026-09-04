import assert from "node:assert/strict";
import test from "node:test";

import {
  OVERVIEW_MAX_RANGE_DAYS,
  aggregateByModel,
  bucketByGranularity,
  buildFlowModelRanks,
  buildFlowTokenRanks,
  calculateDashboardStats,
  isValidOverviewRange,
  resolvePresetRange,
} from "./overview-aggregate.ts";

test("resolvePresetRange rolls back N days from now", () => {
  const now = 1_700_000_000;
  assert.deepEqual(resolvePresetRange(7, now), {
    start: now - 7 * 24 * 3600,
    end: now,
  });
});

test("isValidOverviewRange rejects inverted or >30d windows", () => {
  assert.equal(isValidOverviewRange(100, 200), true);
  assert.equal(isValidOverviewRange(200, 100), false);
  const start = 0;
  const end = (OVERVIEW_MAX_RANGE_DAYS + 1) * 24 * 3600;
  assert.equal(isValidOverviewRange(start, end), false);
  assert.equal(
    isValidOverviewRange(0, OVERVIEW_MAX_RANGE_DAYS * 24 * 3600),
    true,
  );
});

test("calculateDashboardStats sums quota/count/tokens", () => {
  assert.deepEqual(
    calculateDashboardStats([
      { quota: 10, count: 2, token_used: 100 },
      { quota: 5, count: 1, token_used: 50 },
    ]),
    { totalQuota: 15, totalCount: 3, totalTokens: 150 },
  );
  assert.deepEqual(calculateDashboardStats([]), {
    totalQuota: 0,
    totalCount: 0,
    totalTokens: 0,
  });
});

test("bucketByGranularity groups by day", () => {
  // 2024-01-01 10:00 and 18:00 local → same day bucket
  const a = Math.floor(new Date(2024, 0, 1, 10).getTime() / 1000);
  const b = Math.floor(new Date(2024, 0, 1, 18).getTime() / 1000);
  const c = Math.floor(new Date(2024, 0, 2, 9).getTime() / 1000);
  const buckets = bucketByGranularity(
    [
      { created_at: a, quota: 1, count: 1, token_used: 10 },
      { created_at: b, quota: 2, count: 1, token_used: 20 },
      { created_at: c, quota: 4, count: 2, token_used: 40 },
    ],
    "day",
  );
  assert.equal(buckets.length, 2);
  assert.equal(buckets[0]?.quota, 3);
  assert.equal(buckets[1]?.quota, 4);
});

test("aggregateByModel ranks by quota and respects limit", () => {
  const ranks = aggregateByModel(
    [
      { model_name: "a", quota: 1, count: 1, token_used: 1 },
      { model_name: "b", quota: 9, count: 2, token_used: 2 },
      { model_name: "a", quota: 3, count: 1, token_used: 1 },
    ],
    1,
  );
  assert.deepEqual(ranks, [
    { name: "b", count: 2, quota: 9, tokens: 2 },
  ]);
});

test("buildFlowTokenRanks and buildFlowModelRanks", () => {
  const rows = [
    {
      token_id: 1,
      token_name: "prod",
      model_name: "m1",
      quota: 5,
      count: 1,
      token_used: 10,
    },
    {
      token_id: 1,
      token_name: "prod",
      model_name: "m2",
      quota: 3,
      count: 1,
      token_used: 5,
    },
    {
      token_id: 2,
      model_name: "m1",
      quota: 1,
      count: 1,
      token_used: 1,
    },
  ];
  assert.equal(buildFlowTokenRanks(rows, 1)[0]?.name, "prod");
  assert.equal(buildFlowModelRanks(rows, 1)[0]?.name, "m1");
  assert.equal(buildFlowTokenRanks(rows)[1]?.name, "Key #2");
});
