"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/routes";
import {
  getOAuthSessionStorage,
  OAUTH_BIND_CALLBACK_MESSAGE,
  OAUTH_BIND_RESULT_MESSAGE,
  resolveOAuthCallbackMode,
  TELEGRAM_BIND_RESULT_MESSAGE,
  type OAuthBindResultMessage,
} from "@/components/console/profile/oauth-bind";

export function OAuthCallbackClient() {
  const params = useParams<{ provider: string }>();
  const search = useSearchParams();
  const provider = params.provider ?? "";
  const [message, setMessage] = useState("…");

  useEffect(() => {
    if (typeof window === "undefined" || !provider) return;

    const code = search.get("code") ?? "";
    const state = search.get("state") ?? "";
    const error = search.get("error") ?? undefined;
    const errorDescription = search.get("error_description") ?? undefined;
    const telegramBind = search.get("telegram_bind");
    const flowToken = search.get("flow_token");
    const errorCode = search.get("error_code");

    if (provider === "telegram" && telegramBind) {
      const opener = window.opener;
      if (
        opener &&
        !opener.closed &&
        flowToken &&
        (telegramBind === "success" || telegramBind === "error")
      ) {
        opener.postMessage(
          {
            type: TELEGRAM_BIND_RESULT_MESSAGE,
            flow_token: flowToken,
            success: telegramBind === "success",
            code: errorCode ?? undefined,
          },
          window.location.origin,
        );
        setMessage("Done — you can close this window.");
        window.close();
        return;
      }
      setMessage("Telegram binding could not notify the original window.");
      return;
    }

    const mode = resolveOAuthCallbackMode(
      provider,
      state,
      window.opener,
      getOAuthSessionStorage(window),
    );

    if (mode !== "bind") {
      setMessage("OAuth login is not available here. Return to sign-in.");
      return;
    }

    const opener = window.opener;
    if (!opener || opener.closed) {
      setMessage("Binding window is no longer available.");
      return;
    }

    let closedTimer: number | undefined;
    const onResult = (event: MessageEvent<unknown>) => {
      if (event.origin !== window.location.origin || event.source !== opener) {
        return;
      }
      const result = event.data as Partial<OAuthBindResultMessage> | null;
      if (
        !result ||
        result.type !== OAUTH_BIND_RESULT_MESSAGE ||
        result.provider !== provider ||
        result.state !== state
      ) {
        return;
      }
      if (result.success) {
        setMessage("Bound — closing…");
        window.close();
        return;
      }
      setMessage(result.message || "Binding failed.");
      closedTimer = window.setTimeout(() => window.close(), 1500);
    };

    window.addEventListener("message", onResult);
    const timeout = window.setTimeout(() => {
      setMessage("Binding timed out. Please try again.");
      closedTimer = window.setTimeout(() => window.close(), 1500);
    }, 30_000);

    opener.postMessage(
      {
        type: OAUTH_BIND_CALLBACK_MESSAGE,
        provider,
        code: code || undefined,
        state,
        error,
        errorDescription,
      },
      window.location.origin,
    );

    return () => {
      window.removeEventListener("message", onResult);
      window.clearTimeout(timeout);
      if (closedTimer !== undefined) window.clearTimeout(closedTimer);
    };
  }, [provider, search]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <p className="text-sm text-slate-700">{message}</p>
      <Link
        href={APP_ROUTES.consoleProfile}
        className="text-sm text-[rgb(74,171,240)]"
      >
        Back to profile
      </Link>
    </main>
  );
}
