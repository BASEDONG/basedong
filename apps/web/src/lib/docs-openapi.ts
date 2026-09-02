import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

import { createOpenAPI } from "fumadocs-openapi/server";

const CONTENT_ROOT_CANDIDATES = [
  path.join(process.cwd(), "content", "docs-api"),
  path.join(process.cwd(), "apps", "web", "content", "docs-api"),
];

function resolveContentRoot(): string {
  for (const c of CONTENT_ROOT_CANDIDATES) {
    if (existsSync(c)) return c;
  }
  return CONTENT_ROOT_CANDIDATES[0];
}

async function walkJsonFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(current: string) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) {
        await walk(full);
      } else if (e.isFile() && e.name.toLowerCase().endsWith(".json")) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

/**
 * OpenAPI server for /docs/api.
 * Schema keys match MDX `spec="openapi/ai-model/..."` (relative to content/docs-api).
 * No proxyUrl — Try-it Send may fail CORS; docs still render params/examples/responses.
 */
export const openapi = createOpenAPI({
  async input() {
    const root = resolveContentRoot();
    const openapiDir = path.join(root, "openapi");
    const files = await walkJsonFiles(openapiDir);
    if (files.length === 0) {
      throw new Error(
        `No OpenAPI JSON under ${openapiDir}. Run: npm run sync:docs`,
      );
    }
    const entries = await Promise.all(
      files.map(async (abs) => {
        const key = path
          .relative(root, abs)
          .split(path.sep)
          .join("/");
        const raw = await readFile(abs, "utf8");
        return [key, JSON.parse(raw)] as const;
      }),
    );
    return Object.fromEntries(entries);
  },
});
