import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";

/** Legacy SiliconFlow path → 调用记录 */
export default function BillsRedirectPage() {
  redirect(APP_ROUTES.consoleLogs);
}
