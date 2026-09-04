import assert from "node:assert/strict";
import test from "node:test";

import {
  buildWalletPayOptions,
  type TopupInfoLike,
  type WalletPayOption,
} from "./wallet-methods.ts";

test("buildWalletPayOptions returns empty when nothing enabled", () => {
  assert.deepEqual(buildWalletPayOptions({}), []);
  assert.deepEqual(
    buildWalletPayOptions({
      enable_online_topup: false,
      enable_stripe_topup: false,
      enable_creem_topup: false,
    }),
    [],
  );
});

test("buildWalletPayOptions keeps epay methods from pay_methods when online topup on", () => {
  const info: TopupInfoLike = {
    enable_online_topup: true,
    pay_methods: [
      { name: "支付宝", type: "alipay" },
      { name: "微信", type: "wxpay" },
      { name: "Stripe", type: "stripe" },
    ],
  };
  const opts = buildWalletPayOptions(info);
  assert.deepEqual(
    opts.map((o) => o.id),
    ["alipay", "wxpay"],
  );
  assert.equal(opts[0]?.kind, "epay");
});

test("buildWalletPayOptions appends stripe/creem/waffo when flags on", () => {
  const info: TopupInfoLike = {
    enable_online_topup: false,
    enable_stripe_topup: true,
    enable_creem_topup: true,
    enable_waffo_topup: true,
    waffo_pay_methods: [{ name: "Card" }, { name: "Local" }],
    creem_products: [
      {
        productId: "prod_1",
        name: "Starter",
        price: 10,
        currency: "USD",
        quota: 1000,
      },
    ],
  };
  const opts = buildWalletPayOptions(info);
  const ids = opts.map((o: WalletPayOption) => o.id);
  assert.ok(ids.includes("stripe"));
  assert.ok(ids.includes("creem:prod_1"));
  assert.deepEqual(
    opts.filter((o) => o.kind === "waffo").map((o) => o.id),
    ["waffo:0", "waffo:1"],
  );
});

test("buildWalletPayOptions hides creem when enabled but no products", () => {
  const opts = buildWalletPayOptions({
    enable_creem_topup: true,
    creem_products: [],
  });
  assert.equal(
    opts.find((o) => o.kind === "creem"),
    undefined,
  );
});
