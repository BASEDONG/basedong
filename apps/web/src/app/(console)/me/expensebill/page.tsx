import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";

/** Legacy SiliconFlow path → 钱包 */
export default function ExpenseBillRedirectPage() {
  redirect(APP_ROUTES.consoleWallet);
}
