import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { storysetTargets } from "./storyset-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const STORYSET_ACCENT = "#BA68C8";
const STORYSET_ACCENT_ALT = "#FFA8A7";

const onlyFilter = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

function recolorSvg(svg, color) {
  let out = svg;
  const replacements = [
    [STORYSET_ACCENT, color],
    [STORYSET_ACCENT.toLowerCase(), color],
    [STORYSET_ACCENT_ALT, color],
    [STORYSET_ACCENT_ALT.toLowerCase(), color],
    ['fill="currentColor"', `fill="${color}"`],
    ['stroke="currentColor"', `stroke="${color}"`],
  ];
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  out = out.replace(/\swidth="[^"]*"/, "");
  out = out.replace(/\sheight="[^"]*"/, "");
  return out;
}

async function fetchStorysetPage(slug, style = "amico") {
  const url = `https://storyset.com/illustration/${slug}/${style}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const html = await res.text();
  if (!html.includes("freepiklabs")) return null;
  const match = html.match(/https:\/\/stories\.freepiklabs\.com[^"'\s>]+\.svg/i);
  return match?.[0] ?? null;
}

async function resolveSvgUrl(slug, fallbacks = [], style = "amico") {
  for (const candidate of [slug, ...fallbacks]) {
    const url = await fetchStorysetPage(candidate, style);
    if (url) return { url, slug: candidate };
  }
  return null;
}

const targets = onlyFilter
  ? storysetTargets.filter((t) => t.out.includes(onlyFilter))
  : storysetTargets;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let failed = 0;
/** @type {Map<string, string[]>} */
const sourceHashes = new Map();

for (const t of targets) {
  const resolved = await resolveSvgUrl(t.slug, t.fallbacks ?? [], t.style ?? "amico");
  if (!resolved) {
    console.error(`MISSING slug: ${t.slug} -> ${t.out}`);
    failed += 1;
    continue;
  }

  if (resolved.slug !== t.slug) {
    console.warn(`FALLBACK ${t.slug} -> ${resolved.slug} (${t.out})`);
  }

  const response = await page.goto(resolved.url, {
    referer: "https://storyset.com/",
    timeout: 60_000,
  });
  if (!response?.ok()) {
    console.error(`DOWNLOAD FAIL ${resolved.url} (${response?.status()})`);
    failed += 1;
    continue;
  }

  const raw = await response.text();
  const colored = recolorSvg(raw, t.color);
  const outPath = path.join(root, t.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, colored, "utf8");

  const hash = createHash("sha256").update(raw).digest("hex").slice(0, 12);
  const group = sourceHashes.get(hash) ?? [];
  group.push(`${resolved.slug} -> ${t.out}`);
  sourceHashes.set(hash, group);

  console.log(`OK ${resolved.slug} -> ${t.out} (${t.color})`);
}

await browser.close();

const collisions = [...sourceHashes.entries()].filter(([, paths]) => paths.length > 1);
if (collisions.length > 0) {
  console.error("\nCONTENT COLLISIONS (identical Storyset source written to multiple paths):");
  for (const [hash, paths] of collisions) {
    console.error(`  ${hash}:`);
    for (const p of paths) console.error(`    - ${p}`);
  }
  failed += collisions.length;
}

if (failed > 0) process.exitCode = 1;
