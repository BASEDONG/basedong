import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

import type {
  NavItem,
  NavLink,
  NavMethod,
  NavSection,
  TocItem,
} from "./content-types";
import { getDocsUiCopy } from "./docs-ui-copy";
import {
  DEFAULT_DOCS_LOCALE,
  type DocsLocale,
  docsApiBasePath,
  isDocsLocale,
} from "@/lib/docs-locale";

const CONTENT_BASE_CANDIDATES = [
  join(process.cwd(), "content", "docs-api"),
  join(process.cwd(), "apps", "web", "content", "docs-api"),
];

function contentBase(): string {
  for (const c of CONTENT_BASE_CANDIDATES) {
    if (existsSync(c)) return c;
  }
  return CONTENT_BASE_CANDIDATES[0];
}

const CONTENT_BASE = contentBase();

export type DocsDoc = {
  title: string;
  description?: string;
  body: string;
  method?: NavMethod;
};

type MetaFile = {
  title?: string;
  pages?: string[];
};

function localeContentRoot(locale: DocsLocale): string {
  const localized = join(CONTENT_BASE, locale);
  if (existsSync(localized)) return localized;
  if (locale === DEFAULT_DOCS_LOCALE && existsSync(join(CONTENT_BASE, "index.mdx"))) {
    return CONTENT_BASE;
  }
  return localized;
}

function readMeta(dir: string): MetaFile | null {
  const metaPath = join(dir, "meta.json");
  if (!existsSync(metaPath)) return null;
  try {
    return JSON.parse(readFileSync(metaPath, "utf8")) as MetaFile;
  } catch {
    return null;
  }
}

function readMetaTitle(dir: string): string | null {
  return readMeta(dir)?.title ?? null;
}

export function loadDocsMdx(locale: DocsLocale, relPath: string): DocsDoc {
  const abs = join(localeContentRoot(locale), relPath);
  const raw = readFileSync(abs, "utf8");
  const { data, content } = matter(raw);
  const openapi = data._openapi as { method?: string } | undefined;
  const method = openapi?.method?.toUpperCase() as NavMethod | undefined;
  return {
    title: (data.title as string) ?? relPath,
    description: data.description as string | undefined,
    body: content.trim(),
    method:
      method === "GET" || method === "POST" || method === "DELETE" || method === "PUT"
        ? method
        : undefined,
  };
}

export function listAiModelSlugs(locale: DocsLocale = DEFAULT_DOCS_LOCALE): string[] {
  const manifestPath = join(CONTENT_BASE, "manifest.json");
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      pagesByLocale?: Record<string, { aiModelPages?: string[] }>;
      aiModelPages?: string[];
    };
    const fromLocale = manifest.pagesByLocale?.[locale]?.aiModelPages;
    if (fromLocale?.length) return fromLocale;
    if (locale === DEFAULT_DOCS_LOCALE && manifest.aiModelPages?.length) {
      return manifest.aiModelPages;
    }
  }
  return walkMdx(locale, "ai-model").map((p) =>
    p.replace(/^ai-model\//, "").replace(/\.mdx$/, ""),
  );
}

function walkMdx(locale: DocsLocale, relDir: string): string[] {
  const abs = join(localeContentRoot(locale), relDir);
  if (!existsSync(abs)) return [];
  const out: string[] = [];
  for (const name of readdirSync(abs, { withFileTypes: true })) {
    const child = join(relDir, name.name);
    if (name.isDirectory()) out.push(...walkMdx(locale, child));
    else if (name.name.endsWith(".mdx")) out.push(child.replace(/\\/g, "/"));
  }
  return out;
}

function endpointHref(locale: DocsLocale, slug: string): string {
  return `${docsApiBasePath(locale)}/ai-model/${slug}`;
}

function overviewHref(locale: DocsLocale): string {
  return docsApiBasePath(locale);
}

export function buildDocsNav(locale: DocsLocale = DEFAULT_DOCS_LOCALE): NavItem[] {
  const ui = getDocsUiCopy(locale);
  const root = join(localeContentRoot(locale), "ai-model");
  if (!existsSync(root)) {
    return [
      {
        type: "folder",
        label: ui.apiReference,
        defaultOpen: true,
        children: [{ type: "link", label: ui.overview, href: overviewHref(locale) }],
      },
    ];
  }

  const children: Array<NavLink | NavSection> = [
    { type: "link", label: ui.overview, href: overviewHref(locale) },
    ...collectDirNav(locale, root, "ai-model"),
  ];

  return [
    {
      type: "folder",
      label: readMetaTitle(root) ?? ui.apiReference,
      defaultOpen: true,
      children,
    },
  ];
}

function listOrderedEntries(dir: string): string[] {
  const meta = readMeta(dir);
  const entries = readdirSync(dir, { withFileTypes: true });
  const dirs = new Set(
    entries.filter((e) => e.isDirectory()).map((e) => e.name),
  );
  const mdx = new Set(
    entries
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
      .map((e) => e.name.replace(/\.mdx$/, "")),
  );

  if (meta?.pages?.length) {
    const ordered: string[] = [];
    for (const page of meta.pages) {
      if (page.startsWith("...")) continue;
      if (dirs.has(page) || mdx.has(page)) ordered.push(page);
    }
    for (const name of [...dirs].sort((a, b) => a.localeCompare(b, "zh"))) {
      if (!ordered.includes(name)) ordered.push(name);
    }
    for (const name of [...mdx].sort((a, b) => a.localeCompare(b, "zh"))) {
      if (!ordered.includes(name)) ordered.push(name);
    }
    return ordered;
  }

  return [
    ...[...dirs].sort((a, b) => a.localeCompare(b, "zh")),
    ...[...mdx].sort((a, b) => a.localeCompare(b, "zh")),
  ];
}

function collectDirNav(
  locale: DocsLocale,
  dir: string,
  relPrefix: string,
): Array<NavLink | NavSection> {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const byName = new Map(dirents.map((d) => [d.name, d]));
  const items: Array<NavLink | NavSection> = [];

  for (const name of listOrderedEntries(dir)) {
    const asDir = byName.get(name);
    if (asDir?.isDirectory()) {
      const childAbs = join(dir, name);
      const childRel = `${relPrefix}/${name}`.replace(/\\/g, "/");
      const nested = collectDirNav(locale, childAbs, childRel);
      if (!nested.length) continue;
      items.push({
        type: "section",
        label: readMetaTitle(childAbs) ?? name,
        children: nested,
      });
      continue;
    }

    const mdxName = `${name}.mdx`;
    if (!byName.get(mdxName)?.isFile()) continue;
    const childRel = `${relPrefix}/${mdxName}`.replace(/\\/g, "/");
    const slug = childRel
      .replace(/^ai-model\//, "")
      .replace(/\.mdx$/, "");
    const doc = loadDocsMdx(locale, childRel);
    items.push({
      type: "link",
      label: doc.title,
      href: endpointHref(locale, slug),
      method: doc.method,
    });
  }

  return items;
}

export function extractTocFromMdx(body: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /^(#{2,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const depth = m[1].length === 2 ? 2 : 3;
    const title = m[2].replace(/[#*`]/g, "").trim();
    const id = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff-]/g, "");
    if (title) items.push({ id, title, depth });
  }
  return items;
}

export function resolveDocsLocale(code: string | undefined): DocsLocale {
  return code && isDocsLocale(code) ? code : DEFAULT_DOCS_LOCALE;
}
