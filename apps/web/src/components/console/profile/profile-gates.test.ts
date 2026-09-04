import assert from "node:assert/strict";
import test from "node:test";

import {
  currentCheckinMonth,
  enabledBuiltinBindProviders,
  enabledCustomOAuthProviders,
  isCheckinVisible,
} from "./profile-gates.ts";

test("isCheckinVisible follows checkin_enabled", () => {
  assert.equal(isCheckinVisible(null), false);
  assert.equal(isCheckinVisible({}), false);
  assert.equal(isCheckinVisible({ checkin_enabled: true }), true);
});

test("enabledBuiltinBindProviders always includes email and status flags", () => {
  assert.deepEqual(enabledBuiltinBindProviders(null), []);
  assert.deepEqual(enabledBuiltinBindProviders({}), ["email"]);
  assert.deepEqual(
    enabledBuiltinBindProviders({
      wechat_login: true,
      github_oauth: true,
      telegram_oauth: true,
    }),
    ["email", "wechat", "telegram", "github"],
  );
});

test("enabledCustomOAuthProviders drops incomplete providers", () => {
  assert.deepEqual(enabledCustomOAuthProviders(null), []);
  assert.equal(
    enabledCustomOAuthProviders({
      custom_oauth_providers: [
        {
          slug: "corp",
          client_id: "id",
          authorization_endpoint: "https://example.com/auth",
          name: "Corp",
        },
        { slug: "bad" },
      ],
    }).length,
    1,
  );
});

test("currentCheckinMonth formats YYYY-MM", () => {
  assert.equal(
    currentCheckinMonth(new Date(2024, 0, 15)),
    "2024-01",
  );
});
