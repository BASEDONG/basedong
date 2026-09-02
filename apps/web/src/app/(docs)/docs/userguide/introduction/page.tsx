import { redirect } from "next/navigation";

import { APP_ROUTES, DOCS_CENTER_ENABLED } from "@/lib/routes";

/** Legacy SiliconFlow introduction path → local API docs overview. */
export default function IntroductionPage() {
  if (!DOCS_CENTER_ENABLED) {
    redirect(APP_ROUTES.home);
  }
  redirect(APP_ROUTES.docsIntroduction);
}
