"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";

/** Legacy 八色鸫 email path — redirect to locale-free /login. */
export default function LegacyZhLoginEmailRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(APP_ROUTES.login);
  }, [router]);
  return null;
}
