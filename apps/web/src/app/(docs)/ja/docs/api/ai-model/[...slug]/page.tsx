import {
  docsApiEndpointGenerateMetadata,
  docsApiEndpointPage,
  docsApiStaticSlugs,
} from "@/components/docs/api/DocsApiPageViews";

export function generateStaticParams() {
  return docsApiStaticSlugs("ja");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return docsApiEndpointGenerateMetadata("ja", slug);
}

export default async function DocsApiJaEndpointPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return docsApiEndpointPage("ja", slug);
}
