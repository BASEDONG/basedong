import {
  docsApiEndpointGenerateMetadata,
  docsApiEndpointPage,
  docsApiStaticSlugs,
} from "@/components/docs/api/DocsApiPageViews";

export function generateStaticParams() {
  return docsApiStaticSlugs("en");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return docsApiEndpointGenerateMetadata("en", slug);
}

export default async function DocsApiEnEndpointPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return docsApiEndpointPage("en", slug);
}
