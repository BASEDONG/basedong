/**
 * OAuth bind popup handshake (upstream new-api pattern).
 * Popup is stamped while still same-origin, then navigates to the IdP.
 * Callback page posts code/state back to the opener for Bearer-authenticated
 * completion — the popup has no in-memory Access JWT.
 */

export const OAUTH_BIND_CALLBACK_MESSAGE = "oauth:binding:callback";
export const OAUTH_BIND_RESULT_MESSAGE = "oauth:binding:result";
export const TELEGRAM_BIND_RESULT_MESSAGE = "telegram:binding:result";

const OAUTH_BIND_FLOW_KEY_PREFIX = "oauth_bind_flow:";

export type OAuthModeStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

export function getOAuthSessionStorage(
  owner: { sessionStorage: OAuthModeStorage } | null | undefined,
): OAuthModeStorage | null {
  try {
    return owner?.sessionStorage ?? null;
  } catch {
    return null;
  }
}

export function markOAuthBindPopup(
  storage: OAuthModeStorage | null | undefined,
  provider: string,
  state: string,
): boolean {
  if (!storage || !provider || !state) return false;
  try {
    const key = `${OAUTH_BIND_FLOW_KEY_PREFIX}${provider}`;
    storage.setItem(key, state);
    return storage.getItem(key) === state;
  } catch {
    return false;
  }
}

export function resolveOAuthCallbackMode(
  provider: string,
  state: string,
  opener: { closed: boolean } | null | undefined,
  storage: OAuthModeStorage | null | undefined,
): "login" | "bind" {
  if (!opener || opener.closed || !storage || !state) return "login";
  try {
    const marked = storage.getItem(`${OAUTH_BIND_FLOW_KEY_PREFIX}${provider}`);
    return marked === state ? "bind" : "login";
  } catch {
    return "login";
  }
}

export type OAuthBindCallbackMessage = {
  type: typeof OAUTH_BIND_CALLBACK_MESSAGE;
  provider: string;
  state: string;
  code?: string;
  error?: string;
  errorDescription?: string;
};

export type OAuthBindResultMessage = {
  type: typeof OAUTH_BIND_RESULT_MESSAGE;
  provider: string;
  state: string;
  success: boolean;
  message?: string;
};
