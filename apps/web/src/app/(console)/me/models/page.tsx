import { Suspense } from "react";
import { ModelsPageClient } from "@/components/console/models/ModelsPageClient";

export default function ModelsPage() {
  return (
    <Suspense fallback={null}>
      <ModelsPageClient />
    </Suspense>
  );
}
