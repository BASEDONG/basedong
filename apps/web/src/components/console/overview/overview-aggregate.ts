/** Pure aggregators for Console overview (`/api/data/self` + `/api/data/flow/self`). */

export type TimeGranularity = "hour" | "day" | "week";

export const OVERVIEW_MAX_RANGE_DAYS = 30;
export const OVERVIEW_PRESET_DAYS = [1, 7, 14, 29] as const;

export type QuotaRowLike = {
  model_name?: string;
  created_at?: number;
  token_used?: number;
  count?: number;
  quota?: number;
};

export type FlowRowLike = {
  token_id?: number;
  token_name?: string;
  use_group?: string;
  model_name?: string;
  token_used?: number;
  count?: number;
  quota?: number;
};

export type DashboardStats = {
  totalQuota: number;
  totalCount: number;
  totalTokens: number;
};

export type TimeBucket = {
  start: number;
  quota: number;
  count: number;
  tokens: number;
};

export type NamedRank = {
  name: string;
  count: number;
  quota: number;
  tokens: number;
};

/** Unix range for a rolling preset ending at `nowSec` (inclusive window length in days). */
export function resolvePresetRange(
  days: number,
  nowSec = Math.floor(Date.now() / 1000),
): { start: number; end: number } {
  const safeDays = Math.max(1, Math.floor(days));
  return {
    start: nowSec - safeDays * 24 * 3600,
    end: nowSec,
  };
}

/** Client-side guard matching Backend ≈30-day cap. */
export function isValidOverviewRange(start: number, end: number): boolean {
  if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
  if (end < start) return false;
  const span = end - start;
  return span <= OVERVIEW_MAX_RANGE_DAYS * 24 * 3600;
}

export function calculateDashboardStats(data: QuotaRowLike[]): DashboardStats {
  return data.reduce(
    (acc, item) => ({
      totalQuota: acc.totalQuota + (Number(item.quota) || 0),
      totalCount: acc.totalCount + (Number(item.count) || 0),
      totalTokens: acc.totalTokens + (Number(item.token_used) || 0),
    }),
    { totalQuota: 0, totalCount: 0, totalTokens: 0 },
  );
}

function bucketStart(ts: number, granularity: TimeGranularity): number {
  const d = new Date(ts * 1000);
  if (granularity === "hour") {
    d.setMinutes(0, 0, 0);
    return Math.floor(d.getTime() / 1000);
  }
  d.setHours(0, 0, 0, 0);
  if (granularity === "day") {
    return Math.floor(d.getTime() / 1000);
  }
  // week: local week starting Sunday
  d.setDate(d.getDate() - d.getDay());
  return Math.floor(d.getTime() / 1000);
}

export function bucketByGranularity(
  data: QuotaRowLike[],
  granularity: TimeGranularity,
): TimeBucket[] {
  const map = new Map<number, TimeBucket>();
  for (const row of data) {
    const ts = Number(row.created_at) || 0;
    if (!ts) continue;
    const start = bucketStart(ts, granularity);
    const cur = map.get(start) ?? {
      start,
      quota: 0,
      count: 0,
      tokens: 0,
    };
    cur.quota += Number(row.quota) || 0;
    cur.count += Number(row.count) || 0;
    cur.tokens += Number(row.token_used) || 0;
    map.set(start, cur);
  }
  return [...map.values()].sort((a, b) => a.start - b.start);
}

export function aggregateByModel(
  data: QuotaRowLike[],
  limit = 8,
): NamedRank[] {
  const map = new Map<string, NamedRank>();
  for (const row of data) {
    const name = row.model_name?.trim() || "—";
    const cur = map.get(name) ?? {
      name,
      count: 0,
      quota: 0,
      tokens: 0,
    };
    cur.count += Number(row.count) || 0;
    cur.quota += Number(row.quota) || 0;
    cur.tokens += Number(row.token_used) || 0;
    map.set(name, cur);
  }
  return [...map.values()]
    .sort((a, b) => b.quota - a.quota)
    .slice(0, Math.max(0, limit));
}

function rankByKey(
  data: FlowRowLike[],
  keyOf: (row: FlowRowLike) => string,
  limit: number,
): NamedRank[] {
  const map = new Map<string, NamedRank>();
  for (const row of data) {
    const name = keyOf(row).trim() || "—";
    const cur = map.get(name) ?? {
      name,
      count: 0,
      quota: 0,
      tokens: 0,
    };
    cur.count += Number(row.count) || 0;
    cur.quota += Number(row.quota) || 0;
    cur.tokens += Number(row.token_used) || 0;
    map.set(name, cur);
  }
  return [...map.values()]
    .sort((a, b) => b.quota - a.quota)
    .slice(0, Math.max(0, limit));
}

export function buildFlowTokenRanks(
  data: FlowRowLike[],
  limit = 8,
): NamedRank[] {
  return rankByKey(
    data,
    (row) =>
      row.token_name?.trim() ||
      (row.token_id != null ? `Key #${row.token_id}` : ""),
    limit,
  );
}

export function buildFlowModelRanks(
  data: FlowRowLike[],
  limit = 8,
): NamedRank[] {
  return rankByKey(data, (row) => row.model_name ?? "", limit);
}
