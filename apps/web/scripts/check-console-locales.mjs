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

const accountAuth = requireFile(
  "src/components/console/account-authentication/account-authentication-ui-copy.ts",
);
if (accountAuth) {
  requireMarkers("account-authentication-ui-copy.ts", accountAuth);
  for (const key of ["getAuthUiCopy", "pageTitle", "successAlert", "statusCard"]) {
    if (!accountAuth.includes(key)) {
      fail(`account-authentication-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/account-authentication/account-authentication-ui-copy.ts (14 locales)");
}

const bills = requireFile("src/components/console/bills/bills-ui-copy.ts");
if (bills) {
  requireMarkers("bills-ui-copy.ts", bills);
  for (const key of ["getBillsUiCopy", "pageTitle", "detailHeaders", "loadFailed"]) {
    if (!bills.includes(key)) fail(`bills-ui-copy.ts missing ${key}`);
  }
  ok("console/bills/bills-ui-copy.ts (14 locales)");
}

const expensebill = requireFile(
  "src/components/console/expensebill/expensebill-ui-copy.ts",
);
if (expensebill) {
  requireMarkers("expensebill-ui-copy.ts", expensebill);
  for (const key of ["getExpenseBillUiCopy", "pageTitle", "recordHeaders", "confirmPay"]) {
    if (!expensebill.includes(key)) {
      fail(`expensebill-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/expensebill/expensebill-ui-copy.ts (14 locales)");
}

const invoice = requireFile("src/components/console/invoice/invoice-ui-copy.ts");
if (invoice) {
  requireMarkers("invoice-ui-copy.ts", invoice);
  for (const key of ["getInvoiceUiCopy", "pageTitle", "noticeLines", "drawer"]) {
    if (!invoice.includes(key)) fail(`invoice-ui-copy.ts missing ${key}`);
  }
  ok("console/invoice/invoice-ui-copy.ts (14 locales)");
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
    "notConnectedImage",
    "notConnectedVideo",
    "notConnectedTts",
  ]) {
    if (!playground.includes(key)) {
      fail(`playground-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/shared/playground-ui-copy.ts (14 locales)");
}

const batches = requireFile("src/components/console/batches/batches-ui-copy.ts");
if (batches) {
  requireMarkers("batches-ui-copy.ts", batches);
  for (const key of ["getBatchesUiCopy", "pageTitle", "createTask", "priceFeatures"]) {
    if (!batches.includes(key)) fail(`batches-ui-copy.ts missing ${key}`);
  }
  ok("console/batches/batches-ui-copy.ts (14 locales)");
}

const invitation = requireFile(
  "src/components/console/invitation/invitation-ui-copy.ts",
);
if (invitation) {
  requireMarkers("invitation-ui-copy.ts", invitation);
  for (const key of ["getInvitationUiCopy", "pageTitle", "tableColumns", "empty"]) {
    if (!invitation.includes(key)) fail(`invitation-ui-copy.ts missing ${key}`);
  }
  ok("console/invitation/invitation-ui-copy.ts (14 locales)");
}

const inviter = requireFile(
  "src/components/console/campaigns-inviter/campaigns-inviter-ui-copy.ts",
);
if (inviter) {
  requireMarkers("campaigns-inviter-ui-copy.ts", inviter);
  for (const key of [
    "getCampaignsInviterUiCopy",
    "pageTitle",
    "rulesHtml",
    "recordsSummary",
  ]) {
    if (!inviter.includes(key)) fail(`campaigns-inviter-ui-copy.ts missing ${key}`);
  }
  ok("console/campaigns-inviter/campaigns-inviter-ui-copy.ts (14 locales)");
}

const realName = requireFile(
  "src/components/console/campaigns-real-name/campaigns-real-name-ui-copy.ts",
);
if (realName) {
  requireMarkers("campaigns-real-name-ui-copy.ts", realName);
  for (const key of [
    "getCampaignsRealNameUiCopy",
    "pageTitle",
    "rulesHtml",
    "rulesHeading",
  ]) {
    if (!realName.includes(key)) fail(`campaigns-real-name-ui-copy.ts missing ${key}`);
  }
  ok("console/campaigns-real-name/campaigns-real-name-ui-copy.ts (14 locales)");
}

const dedicatedApply = requireFile(
  "src/components/console/dedicated-apply/dedicated-apply-ui-copy.ts",
);
if (dedicatedApply) {
  requireMarkers("dedicated-apply-ui-copy.ts", dedicatedApply);
  for (const key of [
    "getDedicatedApplyUiCopy",
    "pageTitle",
    "heroFeatures",
    "capabilities",
  ]) {
    if (!dedicatedApply.includes(key)) {
      fail(`dedicated-apply-ui-copy.ts missing ${key}`);
    }
  }
  ok("console/dedicated-apply/dedicated-apply-ui-copy.ts (14 locales)");
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

const meta = requireFile("src/lib/console-page-metadata.ts");
if (meta) {
  for (const key of [
    "getConsoleModelsPageMetadata",
    "getConsoleAccountAkPageMetadata",
    "getConsoleAccountAuthPageMetadata",
    "getConsoleBillsPageMetadata",
    "getConsoleExpenseBillPageMetadata",
    "getConsoleInvoicePageMetadata",
    "getConsolePlaygroundChatPageMetadata",
    "getConsolePlaygroundImagePageMetadata",
    "getConsolePlaygroundVideoPageMetadata",
    "getConsolePlaygroundTtsPageMetadata",
    "getConsoleBatchesPageMetadata",
    "getConsoleInvitationPageMetadata",
    "getConsoleCampaignInviterPageMetadata",
    "getConsoleCampaignRealNamePageMetadata",
    "getConsoleDedicatedApplyPageMetadata",
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
