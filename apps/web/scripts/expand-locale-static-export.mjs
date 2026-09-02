/**
 * Duplicate bare-path static HTML into Translated Locale prefixes (e.g. /en/about/).
 * Required because `output: "export"` only emits Source Locale routes; middleware
 * does not run on static hosts.
 *
 * Run after `next build` (wired in package.json).
 * Requires: node --import ./scripts/register-ts-paths.mjs --experimental-strip-types
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { resolveDocumentMetadata } = await import(
  new URL("../src/lib/document-metadata.ts", import.meta.url)
);
const { PREFIXED_LOCALES } = await import(
  new URL("../src/lib/locale.ts", import.meta.url)
);

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "out");

/** Keep in sync with LOCALIZABLE_PATHS in src/lib/locale-path.ts */
const LOCALIZABLE_PATHS = [
  "/",
  "/token-factory",
  "/reserved",
  "/enterprise",
  "/ai-gateway",
  "/models",
  "/pricing",
  "/brand",
  "/about",
  "/news",
  "/developer-talk",
  "/partner",
  "/login",
  "/legals/user-agreement",
];

function sourceHtmlPath(barePath) {
  if (barePath === "/") return join(OUT, "index.html");
  const segments = barePath.replace(/^\//, "");
  return join(OUT, segments, "index.html");
}

function targetHtmlPath(locale, barePath) {
  if (barePath === "/") return join(OUT, locale, "index.html");
  const segments = barePath.replace(/^\//, "");
  return join(OUT, locale, segments, "index.html");
}

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function patchHtmlLang(html, locale) {
  return html.replace(
    /(<html\b[^>]*\blang=")[^"]*(")/i,
    `$1${locale}$2`,
  );
}

function patchHtmlMeta(html, meta) {
  const title = escapeHtmlAttr(meta.title);
  const description = escapeHtmlAttr(meta.description);

  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  if (/<meta name="description"/i.test(out)) {
    out = out.replace(
      /<meta name="description" content="[^"]*"\/?>/i,
      `<meta name="description" content="${description}"/>`,
    );
  } else {
    out = out.replace(
      /<head>/i,
      `<head><meta name="description" content="${description}"/>`,
    );
  }

  return out;
}

function walkHtmlFiles(dir, cb) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkHtmlFiles(path, cb);
    else if (name.endsWith(".html")) cb(path);
  }
}

/** Docs API routes use their own locale prefix (/en/docs, /ja/docs), not Marketing copy. */
function patchDocsApiHtmlLang() {
  const docsLocales = [
    { prefix: "en", htmlLang: "en" },
    { prefix: "ja", htmlLang: "ja" },
  ];
  let patched = 0;

  for (const { prefix, htmlLang } of docsLocales) {
    const docsRoot = join(OUT, prefix, "docs");
    if (!existsSync(docsRoot)) continue;
    walkHtmlFiles(docsRoot, (filePath) => {
      const html = readFileSync(filePath, "utf8");
      writeFileSync(filePath, patchHtmlLang(html, htmlLang));
      patched += 1;
    });
  }

  return patched;
}

function patchLocaleHtml(html, locale, barePath) {
  const pathname =
    barePath === "/" ? `/${locale}` : `/${locale}${barePath}`;
  const meta = resolveDocumentMetadata(pathname, locale);
  if (!meta) {
    console.warn(`skip meta: no resolver for ${pathname}`);
    return patchHtmlLang(html, locale);
  }
  return patchHtmlMeta(patchHtmlLang(html, locale), meta);
}

function copyLocaleExport(locale, barePath) {
  const src = sourceHtmlPath(barePath);
  if (!existsSync(src)) {
    console.warn(`skip missing source: ${barePath} (${src})`);
    return false;
  }

  const dest = targetHtmlPath(locale, barePath);
  mkdirSync(dirname(dest), { recursive: true });

  const html = patchLocaleHtml(readFileSync(src, "utf8"), locale, barePath);
  writeFileSync(dest, html);
  return true;
}

function appendLocaleRedirects() {
  const redirectsPath = join(OUT, "_redirects");
  if (!existsSync(redirectsPath)) return;

  const lines = [readFileSync(redirectsPath, "utf8").trimEnd()];
  const existing = new Set(lines);

  for (const locale of PREFIXED_LOCALES) {
    for (const barePath of LOCALIZABLE_PATHS) {
      const bare =
        barePath === "/" ? `/${locale}` : `/${locale}${barePath}`;
      const target = barePath === "/" ? `/${locale}/` : `/${locale}${barePath}/`;
      const rule = `${bare}  ${target}  301`;
      if (!existing.has(rule)) {
        lines.push(rule);
        existing.add(rule);
      }
    }
  }

  writeFileSync(redirectsPath, `${lines.filter(Boolean).join("\n")}\n`);
}

let copied = 0;

for (const locale of PREFIXED_LOCALES) {
  for (const barePath of LOCALIZABLE_PATHS) {
    if (copyLocaleExport(locale, barePath)) copied += 1;
  }
}

appendLocaleRedirects();

const docsLangPatched = patchDocsApiHtmlLang();

console.log(
  `Expanded static export: ${copied} HTML files across ${PREFIXED_LOCALES.length} prefixed locales (with locale SEO meta).`,
);
if (docsLangPatched > 0) {
  console.log(`Patched <html lang> on ${docsLangPatched} docs API HTML files (en/ja).`);
}
