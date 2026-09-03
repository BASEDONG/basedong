import assert from "node:assert/strict";
import test from "node:test";

import { getConsoleNavGroups } from "../components/console/shared/chrome-copy.ts";
import { APP_ROUTES } from "./routes.ts";
import { isConsoleOfflinePath } from "./console-offline.ts";

test("Console nav IA matches agreed groups and canonical hrefs", () => {
  const groups = getConsoleNavGroups("zh-CN");
  assert.deepEqual(
    groups.map((g) => g.key),
    ["models", "playground", "console", "records", "personal"],
  );
  const hrefs = groups.flatMap((g) => g.items.map((i) => i.href));
  assert.ok(hrefs.includes(APP_ROUTES.consoleModels));
  assert.ok(hrefs.includes(APP_ROUTES.consolePlaygroundChat));
  assert.ok(hrefs.includes(APP_ROUTES.consoleOverview));
  assert.ok(hrefs.includes(APP_ROUTES.consoleAccountAk));
  assert.ok(hrefs.includes(APP_ROUTES.consoleLogs));
  assert.ok(hrefs.includes(APP_ROUTES.consoleLogsDrawing));
  assert.ok(hrefs.includes(APP_ROUTES.consoleLogsTasks));
  assert.ok(hrefs.includes(APP_ROUTES.consoleWallet));
  assert.ok(hrefs.includes(APP_ROUTES.consoleProfile));
  assert.equal(hrefs.includes(APP_ROUTES.consolePlaygroundImage), false);
  assert.equal(hrefs.includes(APP_ROUTES.consoleBills), false);
  assert.equal(hrefs.includes(APP_ROUTES.consoleExpenseBill), false);
});

test("new live Console paths are not 下线页", () => {
  for (const path of [
    APP_ROUTES.consoleOverview,
    APP_ROUTES.consoleLogs,
    APP_ROUTES.consoleLogsDrawing,
    APP_ROUTES.consoleLogsTasks,
    APP_ROUTES.consoleWallet,
    APP_ROUTES.consoleProfile,
  ]) {
    assert.equal(isConsoleOfflinePath(path), false, path);
  }
});
