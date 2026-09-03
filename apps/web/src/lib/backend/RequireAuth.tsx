"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { APP_ROUTES } from "@/lib/routes";
import { ensureAuthSession } from "./client";

/**
 * Client-side Console gate: require a Backend access JWT in memory.
 * On cold load, try Refresh Cookie restore (same-site) like upstream new-api.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const ok = await ensureAuthSession();
      if (cancelled) return;
      if (!ok) {
        router.replace(APP_ROUTES.login);
        return;
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
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
