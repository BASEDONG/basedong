import { createAPIPage } from "fumadocs-openapi/ui";
import type { OperationItem } from "fumadocs-openapi/ui";

import { openapi } from "@/lib/docs-openapi";

import client from "./api-page.client";

const FumaAPIPage = createAPIPage(openapi, { client });

const HTTP_METHODS = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
]);

async function discoverOperations(document: string): Promise<OperationItem[]> {
  const schemas = await openapi.getSchemas();
  const processed = schemas[document];
  if (!processed) return [];

  const paths = (processed.dereferenced as { paths?: Record<string, Record<string, unknown>> })
    .paths;
  if (!paths) return [];

  const out: OperationItem[] = [];
  for (const [p, item] of Object.entries(paths)) {
    if (!item || typeof item !== "object") continue;
    for (const method of Object.keys(item)) {
      if (!HTTP_METHODS.has(method)) continue;
      out.push({
        path: p,
        method: method as OperationItem["method"],
      });
    }
  }
  return out;
}

/**
 * Thin wrapper around fumadocs-openapi createAPIPage.
 * Accepts `spec` (sync rewrite) as alias for official `document` prop.
 * Auto-discovers operations when omitted (avoids MDX `{model}` path-param breakage).
 */
export async function APIPage(props: {
  /** Vendored MDX prop — path relative to content/docs-api */
  spec?: string;
  /** Upstream fumadocs prop name */
  document?: string;
  operations?: OperationItem[];
  showTitle?: boolean;
  showDescription?: boolean;
}) {
  const document = props.spec ?? props.document;

  if (!document) {
    return (
      <p className="text-sm text-[#737373]">
        缺少 OpenAPI 文档路径（请使用 spec 或 document）。
      </p>
    );
  }

  const operations =
    props.operations?.length
      ? props.operations
      : await discoverOperations(document);

  if (!operations.length) {
    return (
      <div className="not-prose my-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        无法加载 OpenAPI 或未找到 operation：<code>{document}</code>
      </div>
    );
  }

  return (
    <FumaAPIPage
      document={document}
      operations={operations}
      showTitle={props.showTitle}
      showDescription={props.showDescription}
    />
  );
}
