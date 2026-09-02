"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove?: (widgetId: string) => void;
    };
  }
}

const SCRIPT_ID = "cf-turnstile-api";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileWidgetProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
};

export function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
  className,
}: TurnstileWidgetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  }, [onVerify, onExpire]);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (cancelled || !hostRef.current || !window.turnstile) return;
      if (widgetIdRef.current && window.turnstile.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* empty */
        }
        widgetIdRef.current = null;
      }
      hostRef.current.innerHTML = "";
      try {
        widgetIdRef.current = window.turnstile.render(hostRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerifyRef.current(token),
          "error-callback": () => onExpireRef.current?.(),
          "expired-callback": () => onExpireRef.current?.(),
        });
      } catch {
        /* empty */
      }
    };

    if (window.turnstile) {
      mount();
    } else {
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
      if (window.turnstile) mount();
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* empty */
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={hostRef} className={className} />;
}
