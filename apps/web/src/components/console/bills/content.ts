export const ASSET = {
  empty: "/assets/console/bills/images/no-gpus.svg",
} as const;

export type PeriodType = "month" | "day" | "minute";
export type ViewMode = "detail" | "allocation";

export type CascaderNode = {
  label: string;
  value: string;
  children?: CascaderNode[];
};

export const dimensionCascaderOptions: CascaderNode[] = [];

/** Locale-agnostic allocation dimension keys (Chinese source). */
export const DEFAULT_ALLOCATION_DIMENSION = "模型服务视图";

export type AmountSummary = {
  bill: number;
  charge: number;
  discount: number;
  coupon: number;
};

export const defaultAmounts: AmountSummary = {
  bill: 0,
  charge: 0,
  discount: 0,
  coupon: 0,
};

export function formatYuan(n: number) {
  return `¥ ${n.toFixed(2)}`;
}

export function formatDateISO(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
