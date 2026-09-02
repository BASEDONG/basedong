import { DocsMdx } from "./DocsMdx";
import type { DocsDoc } from "./load-content";
import { getDocsUiCopy } from "./docs-ui-copy";
import type { DocsLocale } from "@/lib/docs-locale";

export function DocsMdxArticle({
  docsLocale,
  doc,
  breadcrumb,
}: {
  docsLocale: DocsLocale;
  doc: DocsDoc;
  breadcrumb?: string;
}) {
  const ui = getDocsUiCopy(docsLocale);

  return (
    <article className="flex min-w-0 w-full flex-col gap-6 px-4 pt-8 md:mx-auto md:px-6 xl:px-12 xl:pt-12">
      <div className="flex items-center gap-1.5 text-[15px] text-[#737373]">
        <span className="truncate font-medium text-[#4AABF0]">
          {breadcrumb ?? ui.apiReference}
        </span>
      </div>

      <h1 className="text-3xl font-semibold leading-9 text-[#0a0a0a]">
        {doc.title}
      </h1>
      {doc.description ? (
        <p className="mb-4 text-lg leading-7 text-[#737373]">{doc.description}</p>
      ) : null}

      <div className="prose max-w-none pb-10 text-base leading-7 text-[color-mix(in_oklab,#0a0a0a_90%,transparent)]">
        <DocsMdx source={doc.body} />
      </div>
    </article>
  );
}
