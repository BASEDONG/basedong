import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function resolveTsPath(relativePath) {
  const base = join(ROOT, "src", relativePath);
  if (existsSync(`${base}.ts`)) return `${base}.ts`;
  if (existsSync(`${base}.tsx`)) return `${base}.tsx`;
  if (existsSync(join(base, "index.ts"))) return join(base, "index.ts");
  return `${base}.ts`;
}

/** Resolve `@/` imports for Node scripts (build-time only). */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = resolveTsPath(specifier.slice(2));
    return nextResolve(pathToFileURL(target).href, context);
  }

  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    context.parentURL?.startsWith("file:")
  ) {
    const fromDir = dirname(fileURLToPath(context.parentURL));
    const base = join(fromDir, specifier);
    if (existsSync(`${base}.ts`)) {
      return nextResolve(pathToFileURL(`${base}.ts`).href, context);
    }
    if (existsSync(`${base}.tsx`)) {
      return nextResolve(pathToFileURL(`${base}.tsx`).href, context);
    }
    if (existsSync(join(base, "index.ts"))) {
      return nextResolve(pathToFileURL(join(base, "index.ts")).href, context);
    }
  }

  return nextResolve(specifier, context);
}
