import { redirect } from "next/navigation";
import { APP_ROUTES, INVOICE_ENABLED } from "@/lib/routes";
import { InvoicePageClient } from "@/components/console/invoice/InvoicePageClient";

/** 发票 is out of Backend product scope — keep route unreachable. */
export default function InvoicePage() {
  if (!INVOICE_ENABLED) {
    redirect(APP_ROUTES.consoleExpenseBill);
  }
  return <InvoicePageClient />;
}
