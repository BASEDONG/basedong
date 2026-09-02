/**

 * Sync New API AI-model docs (MDX + OpenAPI) into apps/web/content/docs-api.

 *

 * Source: QuantumNous/new-api-docs-v1 (zh / en / ja)

 * Usage: node scripts/sync-newapi-docs.mjs

 */

import { execFileSync } from "node:child_process";

import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";

import { dirname, join, relative } from "node:path";

import { fileURLToPath } from "node:url";



const __dirname = dirname(fileURLToPath(import.meta.url));

const ROOT = join(__dirname, "..");

const OUT = join(ROOT, "content", "docs-api");

const REPO = "QuantumNous/new-api-docs-v1";

const REF = "main";

const DOCS_LOCALES = ["zh", "en", "ja"];



function ghRaw(path) {

  return execFileSync(

    "gh",

    ["api", `repos/${REPO}/contents/${path}?ref=${REF}`, "-H", "Accept: application/vnd.github.raw"],

    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },

  );

}



function listTree() {

  const raw = execFileSync(

    "gh",

    ["api", `repos/${REPO}/git/trees/${REF}?recursive=1`],

    { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },

  );

  return JSON.parse(raw).tree;

}



function localDocsPrefix(locale) {

  return locale === "zh" ? "/docs/" : `/${locale}/docs/`;

}



function rewriteContent(text, locale) {

  let out = text;



  for (const loc of DOCS_LOCALES) {

    const target = localDocsPrefix(loc);

    out = out.replaceAll(`/${loc}/docs/`, target);

    out = out.replaceAll(`href="/${loc}/docs/`, `href="${target}`);

  }



  out = out.replaceAll(

    "New API 提供完整的 RESTful API 接口",

    "basedong Relay 提供完整的 RESTful API 接口",

  );

  out = out.replaceAll("New API 完整接口文档", "basedong AI 模型接口文档");

  out = out.replaceAll(

    "New API provides a complete set of RESTful API interfaces",

    "basedong Relay provides a complete set of RESTful API interfaces",

  );

  out = out.replaceAll(

    "New API Complete API Documentation",

    "basedong AI Model API Documentation",

  );

  out = out.replaceAll("New API", "basedong");



  out = out.replaceAll("openapi/generated/ai-model/", "openapi/ai-model/");

  out = out.replace(

    /<APIPage\s+document=\{"([^"]+)"\}/g,

    '<APIPage spec="$1"',

  );

  out = out.replace(

    /<APIPage\s+document="([^"]+)"/g,

    '<APIPage spec="$1"',

  );

  out = out.replace(/\s+operations=\{[^}]*\}+/g, "");

  out = out.replace(/\s+operations=\{\[[\s\S]*?\]\}/g, "");

  out = out.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, "");

  out = out.replace(/\n{3,}/g, "\n\n");

  out = normalizeApiPageTags(out);

  return out;

}



function normalizeApiPageTags(text) {

  return text.replace(

    /<APIPage\s+spec="([^"]+)"[^>]*\/>/g,

    '<APIPage spec="$1" />',

  );

}



const MANAGEMENT_MARKERS = [

  "## 管理接口",

  "## Management APIs",

  "## 管理API",

  "## 管理 API",

];



function stripManagementSection(mdx, locale) {

  let out = mdx;

  for (const marker of MANAGEMENT_MARKERS) {

    const idx = out.indexOf(marker);

    if (idx !== -1) {

      out = out.slice(0, idx).trimEnd() + "\n";

      break;

    }

  }



  if (locale === "zh") {

    out = out.replace(

      /分为 \*\*AI 模型接口\*\* 和 \*\*管理接口\*\* 两大类。您可以通过这些接口实现 AI 能力调用和系统管理功能。/,

      "通过 **AI 模型接口** 调用聊天、嵌入、图像、音频、视频等能力（兼容 OpenAI API 格式）。",

    );

  } else if (locale === "en") {

    out = out.replace(

      /categorized into AI Model APIs and Management APIs\. You can use these interfaces to invoke AI capabilities and perform system management functions\./,

      "Invoke chat, embeddings, images, audio, video, and more through **AI Model APIs** (OpenAI-compatible).",

    );

    out = out.replace(

      /categorized into \*\*AI Model APIs\*\* and \*\*Management APIs\*\*\. You can use these interfaces to invoke AI capabilities and perform system management functions\./,

      "Invoke chat, embeddings, images, audio, video, and more through **AI Model APIs** (OpenAI-compatible).",

    );

  }



  return out;

}



function ensureDir(filePath) {

  mkdirSync(dirname(filePath), { recursive: true });

}



function writeOut(relPath, content) {

  const dest = join(OUT, relPath);

  ensureDir(dest);

  writeFileSync(dest, content, "utf8");

}



function syncBlob(remotePath, localRel, locale) {

  const raw = ghRaw(remotePath);

  writeOut(localRel, rewriteContent(raw, locale));

  console.log("  +", localRel);

}



console.log("Syncing New API docs →", relative(ROOT, OUT));



if (existsSync(OUT)) {

  rmSync(OUT, { recursive: true, force: true });

}

mkdirSync(OUT, { recursive: true });



const tree = listTree();

const manifestLocales = {};



for (const locale of DOCS_LOCALES) {

  const prefix = `content/docs/${locale}/api/`;

  console.log(`\n[${locale}]`);



  {

    const remote = `${prefix}index.mdx`;

    let body = rewriteContent(ghRaw(remote), locale);

    body = stripManagementSection(body, locale);

    writeOut(`${locale}/index.mdx`, body);

    console.log(`  + ${locale}/index.mdx (management section stripped)`);

  }



  try {

    const raw = rewriteContent(ghRaw(`${prefix}meta.json`), locale);

    const meta = JSON.parse(raw);

    if (Array.isArray(meta.pages)) {

      meta.pages = meta.pages.filter((p) => p !== "management");

    }

    writeOut(`${locale}/meta.json`, JSON.stringify(meta, null, 2) + "\n");

    console.log(`  + ${locale}/meta.json (management page removed)`);

  } catch {

    console.log(`  ~ ${locale}/meta.json skipped`);

  }



  const aiModelFiles = tree.filter(

    (t) =>

      t.type === "blob" &&

      t.path.startsWith(`${prefix}ai-model/`) &&

      (t.path.endsWith(".mdx") || t.path.endsWith(".json")),

  );



  for (const f of aiModelFiles) {

    const localRel = `${locale}/` + f.path.replace(prefix, "");

    syncBlob(f.path, localRel, locale);

  }



  const mdxSlugs = aiModelFiles

    .filter((f) => f.path.endsWith(".mdx"))

    .map((f) =>

      f.path.replace(`${prefix}ai-model/`, "").replace(/\.mdx$/, ""),

    )

    .sort();



  manifestLocales[locale] = { aiModelPages: mdxSlugs };

  console.log(`  ${mdxSlugs.length} AI model MDX pages`);

}



const openapiFiles = tree.filter(

  (t) =>

    t.type === "blob" &&

    t.path.startsWith("openapi/generated/ai-model/") &&

    t.path.endsWith(".json"),

);



console.log(`\nSyncing ${openapiFiles.length} OpenAPI JSON files…`);

for (const f of openapiFiles) {

  const localRel = f.path.replace("openapi/generated/", "openapi/");

  let raw = ghRaw(f.path);

  try {

    const parsed = JSON.parse(raw);

    raw = JSON.stringify(parsed);

  } catch {

    // keep raw

  }

  writeOut(localRel, raw);

  console.log("  +", localRel);

}



writeOut(

  "manifest.json",

  JSON.stringify(

    {

      source: `${REPO}@${REF}`,

      syncedAt: new Date().toISOString(),

      locales: DOCS_LOCALES,

      pagesByLocale: manifestLocales,

    },

    null,

    2,

  ) + "\n",

);



const totalPages = Object.values(manifestLocales).reduce(

  (sum, entry) => sum + entry.aiModelPages.length,

  0,

);

console.log(`\nDone. ${DOCS_LOCALES.length} locales, ${totalPages} MDX pages total.`);


