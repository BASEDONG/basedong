export const ASSET = {
  alipay: "/assets/console/wallet/images/zfb.svg",
  wechat: "/assets/console/wallet/images/order-wx.svg",
  empty: "/assets/console/wallet/images/finetune-empty.webp",
} as const;

export const amountPresets = [10, 50, 100, 1000, 2000, 5000, 10000] as const;
export const defaultAmount = 100;

export function formatYuan(n: number) {
  return `¥ ${n}`;
}
