/**
 * Verify vendored API docs have matching page sets across zh / en / ja.
 * Run: node scripts/check-docs-locales.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "content", "docs-api", "manifest.json");
const DOCS_LOCALES = ["zh", "en", "ja"];

let failed = false;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

function ok(msg) {
  console.log(`ok  ${msg}`);
}

if (!fs.existsSync(manifestPath)) {
  fail("content/docs-api/manifest.json missing — run npm run sync:docs");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const pagesByLocale = manifest.pagesByLocale ?? {};

for (const locale of DOCS_LOCALES) {
  const localeDir = path.join(root, "content", "docs-api", locale);
  if (!fs.existsSync(localeDir)) {
    fail(`content/docs-api/${locale}/ missing`);
  }
  if (!pagesByLocale[locale]?.aiModelPages) {
    fail(`manifest.pagesByLocale.${locale}.aiModelPages missing`);
  }
}

const slugSets = DOCS_LOCALES.map((locale) => {
  const slugs = pagesByLocale[locale]?.aiModelPages ?? [];
  return { locale, slugs: new Set(slugs), count: slugs.length };
});

const reference = slugSets[0];
for (const entry of slugSets.slice(1)) {
  if (entry.count !== reference.count) {
    fail(
      `page count mismatch: ${reference.locale}=${reference.count}, ${entry.locale}=${entry.count}`,
    );
  }
  for (const slug of reference.slugs) {
    if (!entry.slugs.has(slug)) {
      fail(`slug "${slug}" in ${reference.locale} but missing in ${entry.locale}`);
    }
  }
  for (const slug of entry.slugs) {
    if (!reference.slugs.has(slug)) {
      fail(`slug "${slug}" in ${entry.locale} but missing in ${reference.locale}`);
    }
  }
}

if (!failed) {
  ok(
    `docs-api locales aligned (${reference.count} AI model pages × ${DOCS_LOCALES.length})`,
  );
}

process.exit(failed ? 1 : 0);
