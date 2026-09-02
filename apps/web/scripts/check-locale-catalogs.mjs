/**
 * Verify Marketing + Auth locale catalogs include all Translated Locales.
 * Run: node scripts/check-locale-catalogs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const marketing = path.join(root, "src/components/marketing");

const LOCALES = [
  "zh-cn.ts",
  "en.ts",
  "zh-tw.ts",
  "fr.ts",
  "ru.ts",
  "ja.ts",
  "vi.ts",
  "ko.ts",
  "de.ts",
  "es.ts",
  "pt-br.ts",
  "ar.ts",
  "hi.ts",
  "id.ts",
];
const INDEX_EXPORTS = [
  "zhCN",
  "en",
  "zhTW",
  "fr",
  "ru",
  "ja",
  "vi",
  "ko",
  "de",
  "es",
  "ptBR",
  "ar",
  "hi",
  "id",
];

const TARGET_LOCALE_MARKERS = [
  '"zh-CN"',
  "en:",
  '"zh-TW"',
  "ja:",
  "fr:",
  "ru:",
  "vi:",
  "ko:",
  "de:",
  "es:",
  '"pt-BR"',
  "ar:",
  "hi:",
  "id:",
];

let failed = false;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

function ok(msg) {
  console.log(`ok  ${msg}`);
}

function checkContentLocalesDir(relDir) {
  const dir = path.join(marketing, relDir, "content-locales");
  if (!fs.existsSync(dir)) {
    fail(`missing directory ${relDir}/content-locales`);
    return;
  }
  for (const file of LOCALES) {
    if (!fs.existsSync(path.join(dir, file))) {
      fail(`${relDir}/content-locales/${file} missing`);
    }
  }
  const indexPath = path.join(dir, "index.ts");
  if (!fs.existsSync(indexPath)) {
    fail(`${relDir}/content-locales/index.ts missing`);
    return;
  }
  const index = fs.readFileSync(indexPath, "utf8");
  for (const exp of INDEX_EXPORTS) {
    if (!index.includes(`export { ${exp} }`)) {
      fail(`${relDir}/content-locales/index.ts missing export ${exp}`);
    }
  }
  ok(`${relDir}/content-locales (14 files + index)`);
}

function walkContentLocales(base, prefix = "") {
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(base, entry.name);
    if (entry.name === "content-locales") {
      checkContentLocalesDir(path.relative(marketing, path.dirname(full)).replace(/\\/g, "/"));
      continue;
    }
    walkContentLocales(full, rel);
  }
}

walkContentLocales(marketing);

const uiCopyFiles = [
  "pricing/pricing-ui-copy.ts",
  "enterprise/enterprise-ui-copy.ts",
  "ai-gateway/gateway-ui-copy.ts",
  "shared/chrome-copy.ts",
];

for (const rel of uiCopyFiles) {
  const text = fs.readFileSync(path.join(marketing, rel), "utf8");
  for (const loc of TARGET_LOCALE_MARKERS) {
    if (!text.includes(loc)) {
      fail(`${rel} may missing locale marker ${loc}`);
    }
  }
  ok(`${rel}`);
}

const metaPath = path.join(root, "src/lib/marketing-page-metadata.ts");
const meta = fs.readFileSync(metaPath, "utf8");
const localeBlockCount = (meta.match(/"zh-CN":/g) ?? []).length;
if (localeBlockCount < 10) {
  fail(`marketing-page-metadata.ts expected >=10 zh-CN blocks, found ${localeBlockCount}`);
} else {
  ok(`marketing-page-metadata.ts (${localeBlockCount} zh-CN entries)`);
}
for (const loc of TARGET_LOCALE_MARKERS) {
  if (!meta.includes(loc)) {
    fail(`marketing-page-metadata.ts missing ${loc}`);
  }
}

const authMeta = fs.readFileSync(path.join(root, "src/lib/auth-page-metadata.ts"), "utf8");
for (const loc of TARGET_LOCALE_MARKERS) {
  if (!authMeta.includes(loc)) {
    fail(`auth-page-metadata.ts missing ${loc}`);
  }
}
ok("auth-page-metadata.ts");

const authContent = fs.readFileSync(
  path.join(root, "src/components/auth/login/content.ts"),
  "utf8",
);
if (!authContent.includes("const AUTH_COPY")) {
  fail("auth/login/content.ts missing AUTH_COPY");
} else {
  ok("auth/login/content.ts inline AUTH_COPY");
}
for (const marker of TARGET_LOCALE_MARKERS) {
  if (!authContent.includes(marker)) {
    fail(`auth/login/content.ts missing Target locale marker ${marker}`);
  }
}

const languagesPath = path.join(root, "src/lib/languages.ts");
const languages = fs.readFileSync(languagesPath, "utf8");
for (const marker of TARGET_LOCALE_MARKERS) {
  if (!languages.includes(marker)) {
    fail(`languages.ts may missing Target locale ${marker}`);
  }
}
if (languages.includes("consoleOnly: true")) {
  fail("languages.ts still has consoleOnly: true entries");
}
ok("languages.ts Target Locale entries (Graduation)");

const localeRegistry = fs.readFileSync(path.join(root, "src/lib/locale.ts"), "utf8");
if (!localeRegistry.includes("TARGET_LOCALES") || !localeRegistry.includes("TRANSLATED_LOCALES")) {
  fail("locale.ts missing TARGET_LOCALES or TRANSLATED_LOCALES");
}
if (!localeRegistry.includes("CONSOLE_LOCALES = []")) {
  fail("locale.ts CONSOLE_LOCALES should be empty after Graduation");
} else {
  ok("locale.ts Graduation registry");
}

if (failed) {
  console.error("\nLocale catalog check failed.");
  process.exit(1);
}

console.log("\nAll locale catalog checks passed.");
