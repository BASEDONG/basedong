export const ASSET = {
  empty: "/assets/console/invoice/images/finetune-empty.webp",
} as const;

/** Demo amounts matching empty live account extract */
export const mockAmounts = {
  invoiceable: 0,
  consumed: 0,
  debt: 0,
  invoiced: 0,
} as const;

export function formatYuan(n: number): string {
  return `￥${n.toFixed(2)}`;
}

/** Weekday local time window 10:00–19:00 (matches live `O()` gate). */
export function isInvoiceBusinessHours(now = new Date()): boolean {
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= 10 * 60 && minutes < 19 * 60;
}
