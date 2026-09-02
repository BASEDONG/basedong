import {
  docsApiIndexGenerateMetadata,
  docsApiIndexPage,
} from "@/components/docs/api/DocsApiPageViews";

export function generateMetadata() {
  return docsApiIndexGenerateMetadata("ja");
}

export default function DocsApiJaPage() {
  return docsApiIndexPage("ja");
}
