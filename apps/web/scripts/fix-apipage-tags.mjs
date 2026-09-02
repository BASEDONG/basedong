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
let n = 0;
for (const f of walk(root)) {
  let t = readFileSync(f, "utf8");
  const before = t;
  t = t.replace(/<APIPage\s+spec="([^"]+)"[^>]*\/>/g, '<APIPage spec="$1" />');
  if (t !== before) {
    writeFileSync(f, t);
    n++;
  }
}
console.log(`fixed ${n} mdx files`);
