/** Locale-grouped 额度 integer for Console displays (no Admin currency conversion). */
export function formatConsoleQuota(n: number, locale: string): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString(locale);
}

/** Locale-grouped count / 词元-style integers. */
export function formatConsoleCount(n: number, locale: string): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString(locale);
}
