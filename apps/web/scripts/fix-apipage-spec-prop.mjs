import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".mdx")) acc.push(p);
  }
  return acc;
}

const root = join(process.cwd(), "content", "docs-api");
const files = walk(root);
let n = 0;
for (const f of files) {
  let t = readFileSync(f, "utf8");
  const before = t;
  t = t.replaceAll("openapi/generated/ai-model/", "openapi/ai-model/");
  t = t.replace(
    /<APIPage\s+document=\{"([^"]+)"\}/g,
    '<APIPage spec="$1"',
  );
  t = t.replace(/<APIPage\s+document="([^"]+)"/g, '<APIPage spec="$1"');
  if (t !== before) {
    writeFileSync(f, t);
    n++;
  }
}
console.log(`rewrote ${n} of ${files.length} mdx files`);
const sample = join(
  root,
  "ai-model",
  "audio",
  "geminirelayv1beta-383836364.mdx",
);
console.log(
  readFileSync(sample, "utf8")
    .split("\n")
    .filter((l) => l.includes("APIPage"))
    .join("\n"),
);
