import { Suspense } from "react";
import { ExpenseBillPageClient } from "@/components/console/expensebill/ExpenseBillPageClient";

export default function ExpenseBillPage() {
  return (
    <Suspense fallback={null}>
      <ExpenseBillPageClient />
    </Suspense>
  );
}
