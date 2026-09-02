import {
  docsApiEndpointGenerateMetadata,
  docsApiEndpointPage,
  docsApiStaticSlugs,
} from "@/components/docs/api/DocsApiPageViews";

export function generateStaticParams() {
  return docsApiStaticSlugs("zh");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return docsApiEndpointGenerateMetadata("zh", slug);
}

export default async function DocsApiEndpointPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return docsApiEndpointPage("zh", slug);
}
