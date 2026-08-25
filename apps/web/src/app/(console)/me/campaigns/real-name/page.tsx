import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";

export default function RealNameCampaignPage() {
  redirect(APP_ROUTES.consoleModels);
}
