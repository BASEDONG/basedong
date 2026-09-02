import {
  docsApiIndexGenerateMetadata,
  docsApiIndexPage,
} from "@/components/docs/api/DocsApiPageViews";

export function generateMetadata() {
  return docsApiIndexGenerateMetadata("zh");
}

export default function DocsApiPage() {
  return docsApiIndexPage("zh");
}
