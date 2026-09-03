import assert from "node:assert/strict";
import test from "node:test";

import {
  CONSOLE_OFFLINE_PATHS,
  isConsoleOfflinePath,
} from "./console-offline.ts";
import { APP_ROUTES } from "./routes.ts";

test("multimodal playground shells are Console 下线页", () => {
  assert.equal(isConsoleOfflinePath("/me/playground/image"), true);
  assert.equal(isConsoleOfflinePath("/me/playground/video"), true);
  assert.equal(isConsoleOfflinePath("/me/playground/text-to-speech"), true);
  assert.equal(isConsoleOfflinePath("/me/playground/image/"), true);
});

test("SiliconFlow-gap routes are Console 下线页", () => {
  for (const path of [
    APP_ROUTES.consoleInvoice,
    APP_ROUTES.consoleBatches,
    APP_ROUTES.consoleInvitation,
    APP_ROUTES.consoleCampaignInviter,
    APP_ROUTES.consoleCampaignRealName,
    APP_ROUTES.consoleAccountAuthentication,
    APP_ROUTES.consoleDedicatedApply,
  ]) {
    assert.equal(isConsoleOfflinePath(path), true, path);
  }
});

test("live Console surfaces are not 下线页", () => {
  for (const path of [
    APP_ROUTES.consoleModels,
    APP_ROUTES.consolePlaygroundChat,
    APP_ROUTES.consoleAccountAk,
    APP_ROUTES.consoleExpenseBill,
    APP_ROUTES.consoleBills,
  ]) {
    assert.equal(isConsoleOfflinePath(path), false, path);
  }
});

test("CONSOLE_OFFLINE_PATHS lists every multimodal + gap route once", () => {
  assert.equal(new Set(CONSOLE_OFFLINE_PATHS).size, CONSOLE_OFFLINE_PATHS.length);
  assert.ok(CONSOLE_OFFLINE_PATHS.includes(APP_ROUTES.consolePlaygroundImage));
  assert.ok(CONSOLE_OFFLINE_PATHS.includes(APP_ROUTES.consoleBatches));
});
