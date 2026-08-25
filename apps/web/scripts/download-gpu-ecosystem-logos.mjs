/**
 * Download GPU ecosystem logos as-is from official vendor URLs.
 * No remapping, rasterization, or pixel post-processing.
 * Failed downloads are skipped (do not invent / redraw logos).
 *
 * Run: node apps/web/scripts/download-gpu-ecosystem-logos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.join(__dirname, "gpu-ecosystem-sources.json");
const OUT_DIR = path.join(
  __dirname,
  "../public/assets/marketing/token-factory/images/ecosystem",
);

fs.mkdirSync(OUT_DIR, { recursive: true });
const sources = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

async function download(entry) {
  const dest = path.join(OUT_DIR, entry.file);
  const res = await fetch(entry.url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; basedong-asset-sync/1.0; +https://siliconflow.cn)",
      Referer: entry.referer ?? entry.homepage,
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 80) throw new Error(`too small (${buf.length})`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

for (const entry of sources) {
  try {
    const bytes = await download(entry);
    console.log(`✓ ${entry.id} → ${entry.file} (${bytes}b)`);
  } catch (e) {
    console.warn(`✗ ${entry.id}: ${e.message ?? e} — skip (do not invent)`);
  }
}

console.log("\nDone. Only official originals; failed entries stay omitted.");
