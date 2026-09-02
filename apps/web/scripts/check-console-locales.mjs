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

const meta = requireFile("src/lib/console-page-metadata.ts");
if (meta) {
  if (!meta.includes("getConsoleModelsPageMetadata")) {
    fail("console-page-metadata.ts missing models metadata");
  } else {
    ok("console-page-metadata.ts");
  }
}

if (failed) {
  console.error("\nConsole locale catalog check failed.");
  process.exit(1);
}

console.log("\nAll console locale catalog checks passed.");
