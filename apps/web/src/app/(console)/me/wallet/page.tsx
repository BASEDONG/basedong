import { Suspense } from "react";
import { ExpenseBillPageClient } from "@/components/console/expensebill/ExpenseBillPageClient";

export default function WalletPage() {
  return (
    <Suspense fallback={null}>
      <ExpenseBillPageClient />
    </Suspense>
  );
}
