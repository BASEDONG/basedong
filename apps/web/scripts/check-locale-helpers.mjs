/**
 * Unit checks for Target / Translated Locale helpers (seam for #25, Graduation #35).
 * Run: node scripts/check-locale-helpers.mjs
 */
import assert from "node:assert/strict";
import {
  CONSOLE_LOCALES,
  FALLBACK_LOCALE,
  TARGET_LOCALES,
  TRANSLATED_LOCALES,
  catalogLocale,
  isConsoleLocale,
  isTargetLocale,
  isTranslatedLocale,
  marketingContentLocale,
  targetCatalogLocale,
} from "../src/lib/locale.ts";

assert.equal(TARGET_LOCALES.length, 14);
assert.equal(TRANSLATED_LOCALES.length, 14);
assert.equal(CONSOLE_LOCALES.length, 0);
assert.ok(isTargetLocale("ko"));
assert.ok(isTranslatedLocale("ko"));
assert.ok(!isConsoleLocale("de"));
assert.equal(catalogLocale("ko"), "ko");
assert.equal(targetCatalogLocale("ko"), "ko");
assert.equal(marketingContentLocale("ko", "en"), "ko");
assert.equal(marketingContentLocale("en", "zh-CN"), "en");
assert.ok(isTranslatedLocale("ja"));
assert.equal(catalogLocale("unknown"), FALLBACK_LOCALE);

console.log("ok  locale helper checks (14 Target = Translated, 0 Console)");
