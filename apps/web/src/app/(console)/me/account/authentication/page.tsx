import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";

export default function AuthenticationPage() {
  redirect(APP_ROUTES.consoleModels);
}
