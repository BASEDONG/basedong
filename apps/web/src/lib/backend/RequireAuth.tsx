"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { APP_ROUTES } from "@/lib/routes";
import { getAccessToken } from "./session";

/** Client-side Console gate: require a Backend access token in sessionStorage. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace(APP_ROUTES.login);
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex h-dvh items-center justify-center text-sm text-slate-500">
        正在验证登录…
      </div>
    );
  }

  return children;
}
