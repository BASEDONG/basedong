import { notFound, redirect } from "next/navigation";

import type { Metadata } from "next";

import { DocsMdxArticle } from "@/components/docs/api/DocsMdxArticle";
import { DocsPageMetadataSync } from "@/components/docs/api/DocsPageMetadataSync";
import { DocsShell } from "@/components/docs/api/DocsShell";
import { getDocsUiCopy } from "@/components/docs/api/docs-ui-copy";
import {
  buildDocsNav,
  extractTocFromMdx,
  listAiModelSlugs,
  loadDocsMdx,
} from "@/components/docs/api/load-content";
import type { DocsLocale } from "@/lib/docs-locale";
import { getDocsApiPageMetadata } from "@/lib/docs-page-metadata";
import { APP_ROUTES, DOCS_CENTER_ENABLED } from "@/lib/routes";

function docsPageMeta(docsLocale: DocsLocale, pageTitle: string, description?: string) {
  return getDocsApiPageMetadata(docsLocale, pageTitle, description);
}

export async function docsApiIndexGenerateMetadata(
  docsLocale: DocsLocale,
): Promise<Metadata> {
  const doc = loadDocsMdx(docsLocale, "index.mdx");
  const meta = docsPageMeta(docsLocale, doc.title, doc.description);
  return { title: meta.title, description: meta.description };
}

export async function docsApiEndpointGenerateMetadata(
  docsLocale: DocsLocale,
  slug: string[],
): Promise<Metadata> {
  const joined = slug.join("/");
  const doc = loadDocsMdx(docsLocale, `ai-model/${joined}.mdx`);
  const meta = docsPageMeta(docsLocale, doc.title, doc.description);
  return { title: meta.title, description: meta.description };
}

export function docsApiIndexPage(docsLocale: DocsLocale) {
  if (!DOCS_CENTER_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  const ui = getDocsUiCopy(docsLocale);
  const doc = loadDocsMdx(docsLocale, "index.mdx");
  const navItems = buildDocsNav(docsLocale);
  const tocItems = extractTocFromMdx(doc.body);
  const pageMeta = docsPageMeta(docsLocale, doc.title, doc.description);

  return (
    <>
      <DocsPageMetadataSync
        docsLocale={docsLocale}
        title={pageMeta.title}
        description={pageMeta.description}
      />
      <DocsShell
      docsLocale={docsLocale}
      navItems={navItems}
      tocItems={tocItems}
      mobileTitle={doc.title}
    >
      <DocsMdxArticle docsLocale={docsLocale} doc={doc} breadcrumb={ui.apiReference} />
    </DocsShell>
    </>
  );
}

export function docsApiEndpointPage(docsLocale: DocsLocale, slug: string[]) {
  if (!DOCS_CENTER_ENABLED) {
    redirect(APP_ROUTES.home);
  }

  const joined = slug.join("/");
  let doc;
  try {
    doc = loadDocsMdx(docsLocale, `ai-model/${joined}.mdx`);
  } catch {
    notFound();
  }

  const ui = getDocsUiCopy(docsLocale);
  const navItems = buildDocsNav(docsLocale);
  const tocItems = extractTocFromMdx(doc.body);
  const pageMeta = docsPageMeta(docsLocale, doc.title, doc.description);

  return (
    <>
      <DocsPageMetadataSync
        docsLocale={docsLocale}
        title={pageMeta.title}
        description={pageMeta.description}
      />
      <DocsShell
      docsLocale={docsLocale}
      navItems={navItems}
      tocItems={tocItems}
      mobileTitle={doc.title}
    >
      <DocsMdxArticle
        docsLocale={docsLocale}
        doc={doc}
        breadcrumb={`${ui.apiReference} / ${doc.title}`}
      />
    </DocsShell>
    </>
  );
}

export function docsApiStaticSlugs(docsLocale: DocsLocale) {
  return listAiModelSlugs(docsLocale).map((slug) => ({
    slug: slug.split("/"),
  }));
}
