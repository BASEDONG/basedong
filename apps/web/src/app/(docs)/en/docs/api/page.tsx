import {
  docsApiIndexGenerateMetadata,
  docsApiIndexPage,
} from "@/components/docs/api/DocsApiPageViews";

export function generateMetadata() {
  return docsApiIndexGenerateMetadata("en");
}

export default function DocsApiEnPage() {
  return docsApiIndexPage("en");
}
