/**
 * Verify Console shared + models locale catalogs include all Target Locales.
 * Run: node scripts/check-console-locales.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TARGET_MARKERS = [
  '"zh-CN"',
  "en,",
  '"zh-TW"',
  "ja,",
  "fr,",
  "ru,",
  "vi,",
  "ko,",
  "de,",
  "es,",
  '"pt-BR"',
  "ar,",
  "hi,",
  "id,",
];

let failed = false;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

function ok(msg) {
  console.log(`ok  ${msg}`);
}

function requireFile(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    fail(`missing ${rel}`);
    return null;
  }
  return fs.readFileSync(full, "utf8");
}

function requireMarkers(rel, text, markers = TARGET_MARKERS) {
  for (const marker of markers) {
    if (!text.includes(marker)) {
      fail(`${rel} missing locale marker ${marker}`);
    }
  }
}

const chrome = requireFile("src/components/console/shared/chrome-copy.ts");
if (chrome) {
  requireMarkers("chrome-copy.ts", chrome);
  for (const key of [
    "getConsoleChromeCopy",
    "getConsoleNavGroups",
    "getConsoleFooterLinks",
    "pageTitles",
  ]) {
    if (!chrome.includes(key)) fail(`chrome-copy.ts missing ${key}`);
  }
  ok("console/shared/chrome-copy.ts (14 locales)");
}

const modelsUi = requireFile("src/components/console/models/models-ui-copy.ts");
if (modelsUi) {
  requireMarkers("models-ui-copy.ts", modelsUi);
  for (const key of [
    "getModelsUiCopy",
    "getFilterSections",
    "FILTER_SECTIONS_BASE",
    "pageTitle",
  ]) {
    if (!modelsUi.includes(key)) fail(`models-ui-copy.ts missing ${key}`);
  }
  ok("console/models/models-ui-copy.ts (14 locales)");
}

const topbar = requireFile("src/components/console/models/CloudTopBar.tsx");
if (topbar) {
  if (!topbar.includes("navigateOnSelect={false}")) {
    fail("CloudTopBar must use MarketingLanguageSwitcher with navigateOnSelect={false}");
  } else {
    ok("CloudTopBar Console language switcher (no URL prefix)");
  }
}

const accountAk = requireFile(
  "src/components/console/account-ak/account-ak-ui-copy.ts",
);
if (accountAk) {
  requireMarkers("account-ak-ui-copy.ts", accountAk);
  for (const key of ["getApiKeysUiCopy", "pageTitle", "warningMessage", "toasts"]) {
    if (!accountAk.includes(key)) fail(`account-ak-ui-copy.ts missing ${key}`);
  }
  ok("console/account-ak/account-ak-ui-copy.ts (14 locales)");
}

const callLogs = requireFile("src/components/console/call-logs/call-logs-ui-copy.ts");
if (callLogs) {
  requireMarkers("call-logs-ui-copy.ts", callLogs);
  for (const key of ["getCallLogsUiCopy", "pageTitle", "quotaUsed", "loadFailed"]) {
    if (!callLogs.includes(key)) fail(`call-logs-ui-copy.ts missing ${key}`);
  }
  ok("console/call-logs/call-logs-ui-copy.ts (14 locales)");
}

const wallet = requireFile(
  "src/components/console/wallet/wallet-ui-copy.ts",
);
if (wallet) {
  requireMarkers("wallet-ui-copy.ts", wallet);
  for (const key of ["getWalletUiCopy", "pageTitle", "recordHeaders", "confirmPay"]) {
    if (!wallet.includes(key)) {
      fail(`wallet-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/wallet/wallet-ui-copy.ts (14 locales)");
}

const offline = requireFile(
  "src/components/console/offline/offline-ui-copy.ts",
);
if (offline) {
  requireMarkers("offline-ui-copy.ts", offline);
  for (const key of ["getConsoleOfflineUiCopy", "pageTitle", "heading", "ctaLabel"]) {
    if (!offline.includes(key)) fail(`offline-ui-copy.ts missing ${key}`);
  }
  ok("console/offline/offline-ui-copy.ts (14 locales)");
}

const playground = requireFile(
  "src/components/console/shared/playground-ui-copy.ts",
);
if (playground) {
  requireMarkers("playground-ui-copy.ts", playground);
  for (const key of [
    "getPlaygroundUiCopy",
    "pageTitles",
    "promptPlaceholder",
    "clearChatAria",
    "paramMaxTokens",
  ]) {
    if (!playground.includes(key)) {
      fail(`playground-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/shared/playground-ui-copy.ts (14 locales)");
}

const backendError = requireFile(
  "src/components/console/shared/backend-error-ui-copy.ts",
);
if (backendError) {
  requireMarkers("backend-error-ui-copy.ts", backendError);
  for (const key of [
    "getBackendErrorUiCopy",
    "clientErrors",
    "backendMessages",
  ]) {
    if (!backendError.includes(key)) {
      fail(`backend-error-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/shared/backend-error-ui-copy.ts (14 locales)");
}

const localizeError = requireFile("src/lib/backend/localize-error.ts");
if (localizeError) {
  for (const key of [
    "localizeBackendError",
    "ClientErrorKey",
    "BackendError",
  ]) {
    if (!localizeError.includes(key)) {
      fail(`localize-error.ts missing ${key}`);
    }
  }
  ok("lib/backend/localize-error.ts");
}

const localeRtl = requireFile("src/lib/locale.ts");
if (localeRtl) {
  for (const key of ["RTL_LOCALES", "isRtlLocale"]) {
    if (!localeRtl.includes(key)) {
      fail(`locale.ts missing ${key}`);
    }
  }
  ok("locale.ts RTL helpers (ar)");
}

const docSync = requireFile("src/components/shared/DocumentMetadataSync.tsx");
if (docSync) {
  if (!docSync.includes("document.documentElement.dir")) {
    fail("DocumentMetadataSync must set document.documentElement.dir");
  }
  if (!docSync.includes("isRtlLocale")) {
    fail("DocumentMetadataSync must use isRtlLocale");
  }
  ok("DocumentMetadataSync Console dir=rtl sync");
}

const rtlClasses = requireFile(
  "src/components/console/shared/console-rtl-classes.ts",
);
if (rtlClasses) {
  for (const key of ["consoleEndDrawerTranslate", "CONSOLE_END_DRAWER_SHELL"]) {
    if (!rtlClasses.includes(key)) {
      fail(`console-rtl-classes.ts missing ${key}`);
    }
  }
  ok("console/shared/console-rtl-classes.ts");
}

const globalsCss = requireFile("src/app/globals.css");
if (globalsCss) {
  if (
    !globalsCss.includes('html[dir="rtl"]') ||
    !globalsCss.includes(".sf-cloud-console")
  ) {
    fail("globals.css missing Console RTL rules");
  }
  ok("globals.css Console RTL overrides");
}

const consoleShell = requireFile("src/components/console/shared/ConsoleShell.tsx");
if (consoleShell) {
  if (!consoleShell.includes("flex-row-reverse") || !consoleShell.includes("isRtl")) {
    fail("ConsoleShell must mirror layout when isRtl");
  }
  ok("ConsoleShell RTL layout mirroring");
}

const profile = requireFile(
  "src/components/console/profile/profile-ui-copy.ts",
);
if (profile) {
  requireMarkers("profile-ui-copy.ts", profile);
  for (const key of [
    "getProfileUiCopy",
    "pageTitle",
    "sectionStats",
    "sectionSettings",
    "sectionLanguage",
    "statQuota",
    "saveSettings",
  ]) {
    if (!profile.includes(key)) fail(`profile-ui-copy.ts missing ${key}`);
  }
  ok("console/profile/profile-ui-copy.ts (14 locales)");
}

const meta = requireFile("src/lib/console-page-metadata.ts");
if (meta) {
  for (const key of [
    "getConsoleModelsPageMetadata",
    "getConsoleAccountAkPageMetadata",
    "getConsoleOfflinePageMetadata",
    "getConsoleCallLogsPageMetadata",
    "getConsoleWalletPageMetadata",
    "getConsolePlaygroundChatPageMetadata",
    "getConsolePlaygroundImagePageMetadata",
    "getConsolePlaygroundVideoPageMetadata",
    "getConsolePlaygroundTtsPageMetadata",
  ]) {
    if (!meta.includes(key)) {
      fail(`console-page-metadata.ts missing ${key}`);
    }
  }
  ok("console-page-metadata.ts (models + account + billing + playground + remaining)");
}

if (failed) {
  console.error("\nConsole locale catalog check failed.");
  process.exit(1);
}

console.log("\nAll console locale catalog checks passed.");
