/** Normalize Backend topup/info into selectable wallet pay options. */

export type TopupPayMethodLike = {
  name?: string;
  type?: string;
  color?: string;
  min_topup?: string;
};

export type CreemProductLike = {
  productId: string;
  name: string;
  price: number;
  currency: string;
  quota: number;
};

export type WaffoPayMethodLike = {
  name?: string;
  payMethodType?: string;
  payMethodName?: string;
};

export type TopupInfoLike = {
  enable_online_topup?: boolean;
  enable_stripe_topup?: boolean;
  enable_creem_topup?: boolean;
  enable_waffo_topup?: boolean;
  enable_waffo_pancake_topup?: boolean;
  pay_methods?: TopupPayMethodLike[];
  creem_products?: CreemProductLike[];
  waffo_pay_methods?: WaffoPayMethodLike[];
  stripe_min_topup?: number;
  waffo_min_topup?: number;
  waffo_pancake_min_topup?: number;
  min_topup?: number;
};

export type WalletPayKind =
  | "epay"
  | "stripe"
  | "creem"
  | "waffo"
  | "waffo_pancake";

export type WalletPayOption = {
  id: string;
  kind: WalletPayKind;
  /** Gateway payment_method string for amount/pay APIs. */
  paymentMethod: string;
  label: string;
  productId?: string;
  /** Index into topup/info `waffo_pay_methods` when kind is waffo. */
  waffoIndex?: number;
  minTopup?: number;
};

function isEpayType(type: string): boolean {
  const t = type.toLowerCase();
  if (!t) return false;
  if (t === "stripe" || t === "creem" || t === "waffo" || t === "waffo_pancake") {
    return false;
  }
  return true;
}

/**
 * Build pay options from topup/info flags.
 * EPay channel list comes from `pay_methods` (excluding stripe/creem/waffo types).
 * Card / international gateways appear only when their enable_* flags are true.
 */
export function buildWalletPayOptions(info: TopupInfoLike): WalletPayOption[] {
  const out: WalletPayOption[] = [];

  if (info.enable_online_topup) {
    for (const m of info.pay_methods ?? []) {
      const type = (m.type || "").trim();
      if (!type || !isEpayType(type)) continue;
      const id = type.toLowerCase();
      if (out.some((o) => o.id === id)) continue;
      out.push({
        id,
        kind: "epay",
        paymentMethod: type,
        label: (m.name || type).trim() || type,
        minTopup: info.min_topup,
      });
    }
  }

  if (info.enable_stripe_topup) {
    out.push({
      id: "stripe",
      kind: "stripe",
      paymentMethod: "stripe",
      label: "Stripe",
      minTopup: info.stripe_min_topup ?? info.min_topup,
    });
  }

  if (info.enable_creem_topup) {
    for (const p of info.creem_products ?? []) {
      if (!p?.productId) continue;
      out.push({
        id: `creem:${p.productId}`,
        kind: "creem",
        paymentMethod: "creem",
        label: p.name || p.productId,
        productId: p.productId,
      });
    }
  }

  if (info.enable_waffo_topup) {
    const waffoMethods = info.waffo_pay_methods ?? [];
    if (waffoMethods.length === 0) {
      out.push({
        id: "waffo",
        kind: "waffo",
        paymentMethod: "waffo",
        label: "Waffo",
        minTopup: info.waffo_min_topup ?? info.min_topup,
      });
    } else {
      waffoMethods.forEach((m, index) => {
        out.push({
          id: `waffo:${index}`,
          kind: "waffo",
          paymentMethod: "waffo",
          label: (m.name || m.payMethodName || `Waffo ${index + 1}`).trim(),
          waffoIndex: index,
          minTopup: info.waffo_min_topup ?? info.min_topup,
        });
      });
    }
  }

  if (info.enable_waffo_pancake_topup) {
    out.push({
      id: "waffo_pancake",
      kind: "waffo_pancake",
      paymentMethod: "waffo_pancake",
      label: "Waffo Pancake",
      minTopup: info.waffo_pancake_min_topup ?? info.min_topup,
    });
  }

  return out;
}
