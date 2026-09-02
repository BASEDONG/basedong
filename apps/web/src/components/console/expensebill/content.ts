export const ASSET = {
  alipay: "/assets/console/expensebill/images/zfb.svg",
  wechat: "/assets/console/expensebill/images/order-wx.svg",
  empty: "/assets/console/expensebill/images/finetune-empty.webp",
} as const;

export type BenefitTab = "balance" | "coupon" | "package";
export type RechargeMethod = "online" | "auto";
export type SegmentFilter = "all" | "available";

export const benefitSummary = {
  balance: 0,
  overdraft: 0,
  coupons: 0,
  packages: 0,
} as const;

export const amountPresets = [10, 50, 100, 1000, 2000, 5000, 10000] as const;
export const defaultAmount = 100;

export const autoThresholdPresets = [5, 10, 20, 50] as const;
export const autoAmountPresets = [10, 20, 50, 100] as const;
export const defaultAutoThreshold = 10;
export const defaultAutoAmount = 20;

export function formatYuan(n: number) {
  return `¥ ${n}`;
}
