/**
 * Unit checks for Target / Console Locale helpers (seam for #25).
 * Run: node scripts/check-locale-helpers.mjs
 */
import assert from "node:assert/strict";
import {
  CONSOLE_LOCALES,
  FALLBACK_LOCALE,
  TARGET_LOCALES,
  catalogLocale,
  isConsoleLocale,
  isTargetLocale,
  isTranslatedLocale,
  marketingContentLocale,
  targetCatalogLocale,
} from "../src/lib/locale.ts";

assert.equal(TARGET_LOCALES.length, 14);
assert.equal(CONSOLE_LOCALES.length, 7);
assert.ok(isTargetLocale("ko"));
assert.ok(isConsoleLocale("de"));
assert.ok(!isConsoleLocale("en"));
assert.equal(catalogLocale("ko"), FALLBACK_LOCALE);
assert.equal(targetCatalogLocale("ko"), "ko");
assert.equal(marketingContentLocale("ko", "en"), FALLBACK_LOCALE);
assert.equal(marketingContentLocale("en", "zh-CN"), "en");
assert.ok(isTranslatedLocale("ja"));
assert.equal(catalogLocale("unknown"), FALLBACK_LOCALE);

console.log("ok  locale helper checks (14 Target, 7 Console)");
