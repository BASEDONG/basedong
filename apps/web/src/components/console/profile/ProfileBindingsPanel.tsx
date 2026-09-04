"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  bindEmail,
  bindWeChat,
  completeOAuth,
  createOAuthFlow,
  getPublicAuthStatus,
  sendEmailVerification,
  startTelegramBind,
  type BackendUser,
  type CustomOAuthProviderInfo,
  type PublicAuthStatus,
} from "@/lib/backend/client";
import { assertApiBase } from "@/lib/backend/config";
import { localizeBackendError } from "@/lib/backend/localize-error";
import { CONSOLE_PRIMARY_BTN, CONSOLE_SURFACE } from "../shared/console-ui";
import {
  enabledBuiltinBindProviders,
  enabledCustomOAuthProviders,
} from "./profile-gates";
import type { ProfileUiCopy } from "./profile-ui-copy";
import {
  getOAuthSessionStorage,
  markOAuthBindPopup,
  OAUTH_BIND_CALLBACK_MESSAGE,
  OAUTH_BIND_RESULT_MESSAGE,
  TELEGRAM_BIND_RESULT_MESSAGE,
  type OAuthBindCallbackMessage,
} from "./oauth-bind";
import {
  buildCustomOAuthUrl,
  buildDiscordOAuthUrl,
  buildGitHubOAuthUrl,
  buildLinuxDOOAuthUrl,
  buildOIDCOAuthUrl,
} from "./oauth-urls";

type Props = {
  copy: ProfileUiCopy;
  targetLocale: string;
  self: BackendUser | null;
  onNotice: (msg: string) => void;
  onError: (msg: string) => void;
  onBound: () => void;
};

type PendingOAuth = {
  provider: string;
  state: string;
  popup: Window;
  stopCloseWatcher: () => void;
};

function watchPopupClosed(popup: Window, onClosed: () => void): () => void {
  const id = window.setInterval(() => {
    if (popup.closed) {
      window.clearInterval(id);
      onClosed();
    }
  }, 500);
  return () => window.clearInterval(id);
}

export function ProfileBindingsPanel({
  copy,
  targetLocale,
  self,
  onNotice,
  onError,
  onBound,
}: Props) {
  const [status, setStatus] = useState<PublicAuthStatus | null>(null);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [wechatCode, setWechatCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [telegramReady, setTelegramReady] = useState(false);
  const telegramHost = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<PendingOAuth | null>(null);

  const clearPending = useCallback((expected?: PendingOAuth) => {
    const pending = pendingRef.current;
    if (!pending || (expected && pending !== expected)) return;
    pending.stopCloseWatcher();
    pendingRef.current = null;
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        setStatus(await getPublicAuthStatus());
      } catch {
        setStatus({});
      }
    })();
  }, []);

  useEffect(() => {
    const onMessage = async (event: MessageEvent<unknown>) => {
      if (event.origin !== window.location.origin) return;
      const message = event.data as Partial<OAuthBindCallbackMessage> | null;
      const pending = pendingRef.current;
      if (
        !message ||
        message.type !== OAUTH_BIND_CALLBACK_MESSAGE ||
        !pending ||
        message.provider !== pending.provider ||
        message.state !== pending.state ||
        event.source !== pending.popup
      ) {
        return;
      }

      clearPending(pending);
      let success = false;
      let resultMessage = copy.bindFailed ?? "Failed";
      try {
        const result = await completeOAuth(message.provider, {
          state: message.state,
          code: message.code,
          error: message.error,
          error_description: message.errorDescription,
        });
        success = result.success;
        resultMessage = result.message || resultMessage;
        if (success) {
          onNotice(copy.bindSuccess ?? "Bound");
          onBound();
        } else {
          onError(resultMessage);
        }
      } catch (e) {
        resultMessage = localizeBackendError(
          targetLocale,
          e,
          copy.bindFailed ?? "Failed",
        );
        onError(resultMessage);
      }

      pending.popup.postMessage(
        {
          type: OAUTH_BIND_RESULT_MESSAGE,
          provider: message.provider,
          state: message.state,
          success,
          message: resultMessage,
        },
        window.location.origin,
      );
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [
    clearPending,
    copy.bindFailed,
    copy.bindSuccess,
    onBound,
    onError,
    onNotice,
    targetLocale,
  ]);

  useEffect(
    () => () => {
      const pending = pendingRef.current;
      clearPending(pending ?? undefined);
      if (pending && !pending.popup.closed) pending.popup.close();
    },
    [clearPending],
  );

  const startOAuthBinding = async (
    provider: string,
    buildUrl: (state: string) => string,
  ) => {
    const previous = pendingRef.current;
    if (previous) {
      clearPending(previous);
      if (!previous.popup.closed) previous.popup.close();
    }

    const popup = window.open("", "_blank");
    if (!popup) {
      onError(copy.bindFailed ?? "Popup blocked");
      return;
    }
    const pending: PendingOAuth = {
      provider,
      state: "",
      popup,
      stopCloseWatcher: () => undefined,
    };
    pending.stopCloseWatcher = watchPopupClosed(popup, () =>
      clearPending(pending),
    );
    pendingRef.current = pending;

    try {
      const state = await createOAuthFlow(provider, "bind");
      if (pendingRef.current !== pending || popup.closed) return;
      if (
        !markOAuthBindPopup(getOAuthSessionStorage(popup), provider, state)
      ) {
        throw new Error("bind stamp failed");
      }
      pending.state = state;
      popup.location.replace(buildUrl(state));
    } catch (e) {
      const isCurrent = pendingRef.current === pending;
      clearPending(pending);
      popup.close();
      if (isCurrent) {
        onError(
          localizeBackendError(targetLocale, e, copy.bindFailed ?? "Failed"),
        );
      }
    }
  };

  const onSendEmailCode = async () => {
    if (!email.trim().includes("@")) {
      onError(copy.bindFailed ?? "Invalid email");
      return;
    }
    setBusy(true);
    try {
      await sendEmailVerification(email.trim());
      onNotice(copy.bindSendCode ?? "Sent");
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.bindFailed ?? "Failed"));
    } finally {
      setBusy(false);
    }
  };

  const onBindEmail = async () => {
    setBusy(true);
    try {
      await bindEmail(email, emailCode);
      setEmailCode("");
      onNotice(copy.bindSuccess ?? "Bound");
      onBound();
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.bindFailed ?? "Failed"));
    } finally {
      setBusy(false);
    }
  };

  const onBindWechat = async () => {
    setBusy(true);
    try {
      await bindWeChat(wechatCode);
      setWechatCode("");
      onNotice(copy.bindSuccess ?? "Bound");
      onBound();
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.bindFailed ?? "Failed"));
    } finally {
      setBusy(false);
    }
  };

  const startTelegram = async () => {
    const bot = status?.telegram_bot_name;
    if (!bot) {
      onError(copy.bindFailed ?? "Failed");
      return;
    }
    setBusy(true);
    setTelegramReady(false);
    try {
      const flow = await startTelegramBind();
      const apiBase = assertApiBase();
      const authUrl = new URL(flow.callback_url, `${apiBase}/`).toString();
      const host = telegramHost.current;
      if (!host) return;
      host.replaceChildren();
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", bot.replace(/^@/, ""));
      script.setAttribute("data-size", "large");
      script.setAttribute("data-auth-url", authUrl);
      script.setAttribute("data-request-access", "write");
      host.appendChild(script);
      setTelegramReady(true);

      const onTgMessage = (event: MessageEvent<unknown>) => {
        if (event.origin !== window.location.origin) return;
        const result = event.data as {
          type?: string;
          flow_token?: string;
          success?: boolean;
        } | null;
        if (
          !result ||
          result.type !== TELEGRAM_BIND_RESULT_MESSAGE ||
          result.flow_token !== flow.flow_token
        ) {
          return;
        }
        window.removeEventListener("message", onTgMessage);
        if (result.success) {
          onNotice(copy.bindSuccess ?? "Bound");
          onBound();
        } else {
          onError(copy.bindFailed ?? "Failed");
        }
      };
      window.addEventListener("message", onTgMessage);
    } catch (e) {
      onError(localizeBackendError(targetLocale, e, copy.bindFailed ?? "Failed"));
    } finally {
      setBusy(false);
    }
  };

  const builtins = enabledBuiltinBindProviders(status);
  const customs = enabledCustomOAuthProviders(status);

  const bindRow = (
    label: string,
    bound: boolean,
    boundValue: string | undefined,
    action: ReactNode,
  ) => (
    <li className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="text-sm font-medium text-slate-800">{label}</div>
        <div className="mt-0.5 text-xs text-slate-500">
          {bound ? boundValue || "—" : "—"}
        </div>
      </div>
      <div className="shrink-0">{bound ? null : action}</div>
    </li>
  );

  return (
    <section className={`${CONSOLE_SURFACE} p-4`}>
      <h2 className="text-sm font-semibold text-slate-800">
        {copy.sectionBindings ?? "Account bindings"}
      </h2>
      <p className="mt-2 text-xs text-slate-500">{copy.oauthBindNote}</p>
      <ul className="mt-2">
        {builtins.includes("email")
          ? bindRow(
              copy.bindEmail ?? "Email",
              Boolean(self?.email),
              self?.email,
              <div className="flex max-w-sm flex-col gap-2">
                <input
                  className="rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex gap-2">
                  <input
                    className="min-w-0 flex-1 rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
                    placeholder={copy.bindEmailCode}
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                  />
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void onSendEmailCode()}
                    className="shrink-0 rounded-[8px] border border-slate-300 px-3 text-xs text-slate-700"
                  >
                    {copy.bindSendCode}
                  </button>
                </div>
                <button
                  type="button"
                  disabled={busy || !email.trim() || !emailCode.trim()}
                  onClick={() => void onBindEmail()}
                  className={CONSOLE_PRIMARY_BTN}
                >
                  {copy.bindSubmit}
                </button>
              </div>,
            )
          : null}

        {builtins.includes("wechat")
          ? bindRow(
              copy.bindWechat ?? "WeChat",
              Boolean(self?.wechat_id),
              self?.wechat_id,
              <div className="flex max-w-sm flex-col gap-2">
                {status?.wechat_qrcode ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={status.wechat_qrcode}
                    alt="WeChat QR"
                    className="h-28 w-28 rounded border border-slate-200"
                  />
                ) : null}
                <input
                  className="rounded-[8px] border border-slate-200 px-3 py-2 text-sm"
                  placeholder={copy.bindWechatCode}
                  value={wechatCode}
                  onChange={(e) => setWechatCode(e.target.value)}
                />
                <button
                  type="button"
                  disabled={busy || !wechatCode.trim()}
                  onClick={() => void onBindWechat()}
                  className={CONSOLE_PRIMARY_BTN}
                >
                  {copy.bindSubmit}
                </button>
              </div>,
            )
          : null}

        {builtins.includes("telegram")
          ? bindRow(
              copy.bindTelegram ?? "Telegram",
              Boolean(self?.telegram_id),
              self?.telegram_id,
              <div className="flex flex-col items-start gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void startTelegram()}
                  className={CONSOLE_PRIMARY_BTN}
                >
                  {copy.bindTelegramStart}
                </button>
                <div
                  ref={telegramHost}
                  className={telegramReady ? "min-h-10" : "hidden"}
                />
              </div>,
            )
          : null}

        {builtins.includes("github")
          ? bindRow(
              copy.bindGithub ?? "GitHub",
              Boolean(self?.github_id),
              self?.github_id,
              <button
                type="button"
                disabled={busy || !status?.github_client_id}
                onClick={() => {
                  const id = status?.github_client_id;
                  if (!id) return;
                  void startOAuthBinding("github", (state) =>
                    buildGitHubOAuthUrl(id, state),
                  );
                }}
                className={CONSOLE_PRIMARY_BTN}
              >
                {copy.bindGithub}
              </button>,
            )
          : null}

        {builtins.includes("discord")
          ? bindRow(
              copy.bindDiscord ?? "Discord",
              Boolean(self?.discord_id),
              self?.discord_id,
              <button
                type="button"
                disabled={busy || !status?.discord_client_id}
                onClick={() => {
                  const id = status?.discord_client_id;
                  if (!id) return;
                  void startOAuthBinding("discord", (state) =>
                    buildDiscordOAuthUrl(id, state),
                  );
                }}
                className={CONSOLE_PRIMARY_BTN}
              >
                {copy.bindDiscord}
              </button>,
            )
          : null}

        {builtins.includes("linuxdo")
          ? bindRow(
              copy.bindLinuxdo ?? "LinuxDo",
              Boolean(self?.linux_do_id),
              self?.linux_do_id,
              <button
                type="button"
                disabled={busy || !status?.linuxdo_client_id}
                onClick={() => {
                  const id = status?.linuxdo_client_id;
                  if (!id) return;
                  void startOAuthBinding("linuxdo", (state) =>
                    buildLinuxDOOAuthUrl(id, state),
                  );
                }}
                className={CONSOLE_PRIMARY_BTN}
              >
                {copy.bindLinuxdo}
              </button>,
            )
          : null}

        {builtins.includes("oidc")
          ? bindRow(
              status?.oidc_display_name || (copy.bindOidc ?? "OIDC"),
              Boolean(self?.oidc_id),
              self?.oidc_id,
              <button
                type="button"
                disabled={
                  busy ||
                  !status?.oidc_client_id ||
                  !status?.oidc_authorization_endpoint
                }
                onClick={() => {
                  const clientId = status?.oidc_client_id;
                  const auth = status?.oidc_authorization_endpoint;
                  if (!clientId || !auth) return;
                  void startOAuthBinding("oidc", (state) =>
                    buildOIDCOAuthUrl(auth, clientId, state),
                  );
                }}
                className={CONSOLE_PRIMARY_BTN}
              >
                {copy.bindOidc}
              </button>,
            )
          : null}

        {customs.map((p: CustomOAuthProviderInfo) =>
          bindRow(
            p.name || p.slug || (copy.bindCustom ?? "OAuth"),
            false,
            undefined,
            <button
              type="button"
              disabled={busy || !p.slug || !p.client_id || !p.authorization_endpoint}
              onClick={() => {
                if (!p.slug || !p.client_id || !p.authorization_endpoint) return;
                void startOAuthBinding(p.slug, (state) =>
                  buildCustomOAuthUrl(
                    p.authorization_endpoint!,
                    p.client_id!,
                    p.slug!,
                    state,
                    p.scopes,
                  ),
                );
              }}
              className={CONSOLE_PRIMARY_BTN}
            >
              {copy.bindCustom} {p.name || p.slug}
            </button>,
          ),
        )}
      </ul>
    </section>
  );
}
