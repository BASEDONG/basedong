import type { ClientErrorKey } from "@/components/console/shared/backend-error-ui-copy";
import { assertApiBase } from "./config";
import {
  applyAuthSession,
  clearAccessToken,
  getAccessToken,
  getSessionSid,
  setAccessToken,
} from "./session";

export type { ClientErrorKey };

export type BackendUser = {
  id?: number;
  username?: string;
  display_name?: string;
  email?: string;
  github_id?: string;
  discord_id?: string;
  oidc_id?: string;
  wechat_id?: string;
  telegram_id?: string;
  linux_do_id?: string;
  quota?: number;
  used_quota?: number;
  request_count?: number;
  aff_code?: string;
  aff_count?: number;
  aff_quota?: number;
  aff_history_quota?: number;
  /** JSON string of user settings (notify prefs, etc.). */
  setting?: string;
};

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  code?: string;
  data?: T;
};

async function parseEnvelope<T>(res: Response): Promise<ApiEnvelope<T>> {
  const json = (await res.json()) as ApiEnvelope<T>;
  return json;
}

export class BackendError extends Error {
  readonly clientKey?: ClientErrorKey;
  readonly status?: number;
  readonly code?: string;

  constructor(
    message: string,
    clientKey?: ClientErrorKey,
    status?: number,
    code?: string,
  ) {
    super(message);
    this.name = "BackendError";
    this.clientKey = clientKey;
    this.status = status;
    this.code = code;
  }
}

const STALE_AUTH_CODES = new Set([
  "AUTH_TOKEN_EXPIRED",
  "AUTH_SESSION_REVOKED",
  "AUTH_UNAUTHORIZED",
]);

function isStaleAuthResponse(status: number, code?: string): boolean {
  if (status !== 401) return false;
  return !code || STALE_AUTH_CODES.has(code);
}

export type RefreshOutcome =
  | { kind: "authenticated" }
  | { kind: "anonymous" }
  | { kind: "transient_error" };

type AuthBundleData = {
  access_token?: string;
  session?: { sid?: string } | null;
};

let refreshPromise: Promise<RefreshOutcome> | null = null;

/**
 * Rotate access JWT via HttpOnly Refresh Cookie (upstream new-api pattern).
 * Same-site Web↔API required for the cookie to be sent (SameSite=Strict).
 */
export async function refreshAuthentication(): Promise<RefreshOutcome> {
  if (!refreshPromise) {
    refreshPromise = (async (): Promise<RefreshOutcome> => {
      try {
        const base = assertApiBase();
        const headers = new Headers();
        const sid = getSessionSid();
        if (sid) headers.set("X-Auth-Session", sid);
        const res = await fetch(`${base}/api/user/auth/refresh`, {
          method: "POST",
          headers,
          credentials: "include",
        });
        const envelope = await parseEnvelope<AuthBundleData>(res);
        if (
          res.ok &&
          envelope.success &&
          envelope.data?.access_token &&
          typeof envelope.data.access_token === "string"
        ) {
          applyAuthSession({
            access_token: envelope.data.access_token,
            session: envelope.data.session,
          });
          return { kind: "authenticated" };
        }
        if (res.status === 401 || res.status === 409) {
          clearAccessToken();
          return { kind: "anonymous" };
        }
        return { kind: "transient_error" };
      } catch {
        return { kind: "transient_error" };
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

/** Console cold start: restore memory JWT from Refresh Cookie when same-site. */
export async function ensureAuthSession(): Promise<boolean> {
  if (getAccessToken()) return true;
  const outcome = await refreshAuthentication();
  return outcome.kind === "authenticated" && Boolean(getAccessToken());
}

type BackendFetchOptions = RequestInit & {
  /** Skip 401→refresh→retry (e.g. the refresh call itself). */
  skipAuthRefresh?: boolean;
};

export async function backendFetch<T>(
  path: string,
  init: BackendFetchOptions = {},
): Promise<T> {
  const { skipAuthRefresh, ...reqInit } = init;
  const base = assertApiBase();

  async function once(): Promise<{
    res: Response;
    envelope: ApiEnvelope<T>;
  }> {
    const headers = new Headers(reqInit.headers);
    if (!headers.has("Content-Type") && reqInit.body) {
      headers.set("Content-Type", "application/json");
    }
    const token = getAccessToken();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const res = await fetch(`${base}${path}`, {
      ...reqInit,
      headers,
      credentials: "include",
    });
    const envelope = await parseEnvelope<T>(res);
    return { res, envelope };
  }

  let { res, envelope } = await once();

  if (
    !skipAuthRefresh &&
    isStaleAuthResponse(res.status, envelope.code) &&
    getAccessToken()
  ) {
    const outcome = await refreshAuthentication();
    if (outcome.kind === "authenticated") {
      ({ res, envelope } = await once());
    } else if (outcome.kind === "anonymous") {
      // Token cleared; caller may retry anonymously for optional-auth routes.
    }
  }

  if (!res.ok || !envelope.success) {
    throw new BackendError(
      envelope.message || `HTTP ${res.status}`,
      undefined,
      res.status,
      envelope.code,
    );
  }
  return envelope.data as T;
}

type LoginData = {
  access_token: string;
  token_type?: string;
  user?: BackendUser;
  session?: { sid?: string } | null;
};

/** Public Backend flags used by Auth (from GET /api/status). */
export type CustomOAuthProviderInfo = {
  id?: number;
  name?: string;
  slug?: string;
  icon?: string;
  client_id?: string;
  authorization_endpoint?: string;
  scopes?: string;
};

export type PublicAuthStatus = {
  email_verification?: boolean;
  turnstile_check?: boolean;
  turnstile_site_key?: string;
  checkin_enabled?: boolean;
  github_oauth?: boolean;
  github_client_id?: string;
  discord_oauth?: boolean;
  discord_client_id?: string;
  linuxdo_oauth?: boolean;
  linuxdo_client_id?: string;
  telegram_oauth?: boolean;
  telegram_bot_name?: string;
  wechat_login?: boolean;
  wechat_qrcode?: string;
  oidc_enabled?: boolean;
  oidc_client_id?: string;
  oidc_authorization_endpoint?: string;
  oidc_display_name?: string;
  passkey_login?: boolean;
  server_address?: string;
  quota_per_unit?: number;
  custom_oauth_providers?: CustomOAuthProviderInfo[];
};

function withTurnstileQuery(path: string, turnstile?: string): string {
  if (!turnstile) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}turnstile=${encodeURIComponent(turnstile)}`;
}

export async function getPublicAuthStatus(): Promise<PublicAuthStatus> {
  return backendFetch<PublicAuthStatus>("/api/status", { method: "GET" });
}

export async function sendEmailVerification(
  email: string,
  turnstile?: string,
): Promise<void> {
  const q = new URLSearchParams({ email });
  if (turnstile) q.set("turnstile", turnstile);
  await backendFetch<unknown>(`/api/verification?${q.toString()}`, {
    method: "GET",
  });
}

export async function login(
  username: string,
  password: string,
  turnstile?: string,
): Promise<LoginData> {
  const data = await backendFetch<LoginData>(
    withTurnstileQuery("/api/user/login", turnstile),
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
    },
  );
  if (!data?.access_token) {
    throw new BackendError("Login response missing access_token", "loginMissingToken");
  }
  applyAuthSession({
    access_token: data.access_token,
    session: data.session,
  });
  return data;
}

export type RegisterInput = {
  username: string;
  password: string;
  email?: string;
  verificationCode?: string;
  turnstile?: string;
  /** Inviter affiliate code (Backend field `aff_code`). */
  affCode?: string;
};

export async function register(input: RegisterInput): Promise<void> {
  const body: Record<string, string> = {
    username: input.username,
    password: input.password,
  };
  if (input.email) body.email = input.email;
  if (input.verificationCode) {
    body.verification_code = input.verificationCode;
  }
  if (input.affCode) body.aff_code = input.affCode.trim();
  await backendFetch<unknown>(
    withTurnstileQuery("/api/user/register", input.turnstile),
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
}

export async function logout(): Promise<void> {
  try {
    // Cookie-only logout: do not send Bearer / X-Auth-Session. Backend AuthLogout
    // skips ClearRefreshCookie when those disagree with the refresh cookie SID, which
    // left local sessions restorable after "logout" via POST /api/user/auth/refresh.
    const base = assertApiBase();
    await fetch(`${base}/api/user/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Still clear local session if Backend is unreachable or cookie refresh fails cross-origin.
  }
  clearAccessToken();
}

export async function getSelf(): Promise<BackendUser> {
  return backendFetch<BackendUser>("/api/user/self", { method: "GET" });
}

export type BackendApiKey = {
  id: number;
  name: string;
  key: string;
  created_time: number;
  expired_time?: number;
  status?: number;
  remain_quota?: number;
  used_quota?: number;
  unlimited_quota?: boolean;
  accessed_time?: number;
  model_limits_enabled?: boolean;
  model_limits?: string;
  allow_ips?: string;
  group?: string;
};

export type ApiKeyWriteInput = {
  name: string;
  remain_quota?: number;
  expired_time?: number;
  unlimited_quota?: boolean;
  model_limits_enabled?: boolean;
  model_limits?: string;
  allow_ips?: string;
  group?: string;
  status?: number;
};

export type ApiKeyListResult = {
  items: BackendApiKey[];
  total: number;
  page: number;
  pageSize: number;
};

type PageData<T> = {
  items?: T[];
  total?: number;
  page?: number;
  page_size?: number;
};

function apiKeyWriteBody(input: ApiKeyWriteInput) {
  const modelLimits = (input.model_limits ?? "").trim();
  return {
    name: input.name.trim(),
    remain_quota: input.remain_quota ?? 0,
    expired_time: input.expired_time ?? -1,
    unlimited_quota: input.unlimited_quota ?? true,
    model_limits_enabled:
      input.model_limits_enabled ?? Boolean(modelLimits),
    model_limits: modelLimits,
    allow_ips: (input.allow_ips ?? "").trim(),
    group: (input.group ?? "").trim(),
    ...(input.status != null ? { status: input.status } : {}),
  };
}

export async function listApiKeys(options?: {
  page?: number;
  size?: number;
  keyword?: string;
}): Promise<ApiKeyListResult> {
  const page = options?.page ?? 1;
  const size = options?.size ?? 10;
  const keyword = options?.keyword?.trim() ?? "";
  const q = new URLSearchParams({
    p: String(page),
    size: String(size),
  });
  const path = keyword
    ? `/api/token/search?${q.toString()}&keyword=${encodeURIComponent(keyword)}`
    : `/api/token/?${q.toString()}`;
  const data = await backendFetch<PageData<BackendApiKey>>(path, {
    method: "GET",
  });
  return {
    items: data?.items ?? [],
    total: typeof data?.total === "number" ? data.total : 0,
    page: typeof data?.page === "number" ? data.page : page,
    pageSize: typeof data?.page_size === "number" ? data.page_size : size,
  };
}

export async function createApiKey(input: string | ApiKeyWriteInput): Promise<void> {
  const body =
    typeof input === "string"
      ? apiKeyWriteBody({ name: input })
      : apiKeyWriteBody(input);
  await backendFetch<unknown>("/api/token/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function fetchApiKeySecret(id: number): Promise<string> {
  const data = await backendFetch<{ key: string }>(`/api/token/${id}/key`, {
    method: "POST",
  });
  if (!data?.key) {
    throw new BackendError("Missing API Key secret in response", "missingApiKeySecret");
  }
  return data.key;
}

export async function fetchApiKeySecretsBatch(
  ids: number[],
): Promise<Record<number, string>> {
  const data = await backendFetch<{ keys?: Record<string, string> }>(
    "/api/token/batch/keys",
    {
      method: "POST",
      body: JSON.stringify({ ids }),
    },
  );
  const out: Record<number, string> = {};
  for (const [k, v] of Object.entries(data?.keys ?? {})) {
    const id = Number(k);
    if (Number.isFinite(id) && typeof v === "string") out[id] = v;
  }
  return out;
}

export async function updateApiKey(
  id: number,
  input: ApiKeyWriteInput,
): Promise<void> {
  await backendFetch<unknown>("/api/token/", {
    method: "PUT",
    body: JSON.stringify({ id, ...apiKeyWriteBody(input) }),
  });
}

/** Rename while preserving advanced fields from GET /api/token/:id. */
export async function updateApiKeyName(
  id: number,
  name: string,
): Promise<void> {
  const current = await backendFetch<BackendApiKey>(`/api/token/${id}`, {
    method: "GET",
  });
  await updateApiKey(id, {
    name,
    remain_quota: current.remain_quota ?? 0,
    expired_time: current.expired_time ?? -1,
    unlimited_quota: current.unlimited_quota ?? true,
    model_limits_enabled: current.model_limits_enabled ?? false,
    model_limits: current.model_limits ?? "",
    allow_ips: current.allow_ips ?? "",
    group: current.group ?? "",
    status: current.status ?? 1,
  });
}

export async function deleteApiKey(id: number): Promise<void> {
  await backendFetch<unknown>(`/api/token/${id}`, { method: "DELETE" });
}

export async function batchDeleteApiKeys(ids: number[]): Promise<void> {
  await backendFetch<unknown>("/api/token/batch", {
    method: "POST",
    body: JSON.stringify({ ids }),
  });
}

/** Enable (1) or disable (2) an API Key via status_only update. */
export async function setApiKeyStatus(
  id: number,
  status: 1 | 2,
): Promise<void> {
  const current = await backendFetch<BackendApiKey>(`/api/token/${id}`, {
    method: "GET",
  });
  await backendFetch<unknown>("/api/token/?status_only=true", {
    method: "PUT",
    body: JSON.stringify({
      id,
      name: current.name,
      status,
      remain_quota: current.remain_quota ?? 0,
      expired_time: current.expired_time ?? -1,
      unlimited_quota: current.unlimited_quota ?? true,
    }),
  });
}

export async function getUserGroups(): Promise<string[]> {
  const data = await backendFetch<unknown>("/api/user/self/groups", {
    method: "GET",
  });
  if (Array.isArray(data) && data.every((x) => typeof x === "string")) {
    return data as string[];
  }
  if (data && typeof data === "object") {
    const keys = Object.keys(data as Record<string, unknown>);
    if (keys.length > 0) return keys;
  }
  return [];
}

export type TwoFactorStatus = {
  enabled?: boolean;
  locked?: boolean;
  backup_codes_remaining?: number;
};

export async function getTwoFactorStatus(): Promise<TwoFactorStatus> {
  const data = await backendFetch<TwoFactorStatus>("/api/user/2fa/status", {
    method: "GET",
  });
  return data ?? {};
}

export type TwoFactorSetup = {
  secret: string;
  qr_code_data: string;
  backup_codes: string[];
};

function applyAuthRotation(data: unknown): void {
  if (
    data &&
    typeof data === "object" &&
    "access_token" in data &&
    typeof (data as { access_token?: unknown }).access_token === "string"
  ) {
    setAccessToken((data as { access_token: string }).access_token);
  }
}

export async function setupTwoFactor(): Promise<TwoFactorSetup> {
  const data = await backendFetch<TwoFactorSetup>("/api/user/2fa/setup", {
    method: "POST",
  });
  if (!data?.secret) {
    throw new BackendError("2FA setup response incomplete");
  }
  return data;
}

export async function enableTwoFactor(code: string): Promise<void> {
  const data = await backendFetch<unknown>("/api/user/2fa/enable", {
    method: "POST",
    body: JSON.stringify({ code: code.trim() }),
  });
  applyAuthRotation(data);
}

export async function disableTwoFactor(code: string): Promise<void> {
  const data = await backendFetch<unknown>("/api/user/2fa/disable", {
    method: "POST",
    body: JSON.stringify({ code: code.trim() }),
  });
  applyAuthRotation(data);
}

export type PasskeyStatus = {
  enabled?: boolean;
  last_used_at?: string | number | null;
};

export async function getPasskeyStatus(): Promise<PasskeyStatus> {
  try {
    const data = await backendFetch<PasskeyStatus>("/api/user/passkey", {
      method: "GET",
    });
    return data ?? { enabled: false };
  } catch {
    return { enabled: false };
  }
}

export type PasskeyRegisterBegin = {
  flow_token?: string;
  options?: unknown;
  publicKey?: unknown;
};

export async function beginPasskeyRegister(
  proofToken?: string,
): Promise<PasskeyRegisterBegin> {
  const headers = new Headers();
  if (proofToken) headers.set("X-Security-Proof", proofToken);
  const data = await backendFetch<PasskeyRegisterBegin>(
    "/api/user/passkey/register/begin",
    { method: "POST", headers },
  );
  return data ?? {};
}

export async function finishPasskeyRegister(input: {
  flowToken: string;
  credential: Record<string, unknown>;
  proofToken?: string;
}): Promise<void> {
  const headers = new Headers();
  if (input.proofToken) headers.set("X-Security-Proof", input.proofToken);
  const data = await backendFetch<unknown>("/api/user/passkey/register/finish", {
    method: "POST",
    headers,
    body: JSON.stringify({
      flow_token: input.flowToken,
      credential: input.credential,
    }),
  });
  applyAuthRotation(data);
}

export async function deletePasskey(proofToken?: string): Promise<void> {
  const headers = new Headers();
  if (proofToken) headers.set("X-Security-Proof", proofToken);
  const data = await backendFetch<unknown>("/api/user/passkey", {
    method: "DELETE",
    headers,
  });
  applyAuthRotation(data);
}

export async function createPasskeySecurityProof(
  scope: string,
): Promise<string> {
  const begin = await backendFetch<{
    flow_token?: string;
    options?: unknown;
  }>("/api/user/passkey/verify/begin", {
    method: "POST",
    body: JSON.stringify({ scope }),
  });
  const flowToken = begin?.flow_token;
  if (!flowToken) {
    throw new BackendError("Passkey verify flow missing");
  }
  const { prepareCredentialRequestOptions, buildAssertionResult } =
    await import("./passkey-webauthn");
  const publicKey = prepareCredentialRequestOptions(begin.options ?? begin);
  const credential = (await navigator.credentials.get({
    publicKey,
  })) as PublicKeyCredential | null;
  const assertion = buildAssertionResult(credential);
  if (!assertion) {
    throw new BackendError("Passkey verify cancelled");
  }
  const data = await backendFetch<{ proof_token?: string }>(
    "/api/user/passkey/verify/finish",
    {
      method: "POST",
      body: JSON.stringify({
        flow_token: flowToken,
        credential: assertion,
      }),
    },
  );
  if (!data?.proof_token) {
    throw new BackendError("Passkey proof missing");
  }
  return data.proof_token;
}

export async function createSecurityProof(input: {
  method: "2fa";
  code: string;
  scope: string;
}): Promise<string> {
  const data = await backendFetch<{ proof_token?: string }>("/api/verify", {
    method: "POST",
    body: JSON.stringify({
      method: input.method,
      code: input.code.trim(),
      scope: input.scope,
    }),
  });
  if (!data?.proof_token) {
    throw new BackendError("Verification proof missing");
  }
  return data.proof_token;
}

export type OAuthBinding = {
  provider_id?: number;
  provider_name?: string;
  provider_slug?: string;
  provider_icon?: string;
  provider_user_id?: string;
};

export async function listOAuthBindings(): Promise<OAuthBinding[]> {
  try {
    const data = await backendFetch<OAuthBinding[] | { items?: OAuthBinding[] }>(
      "/api/user/oauth/bindings",
      { method: "GET" },
    );
    if (Array.isArray(data)) return data;
    return data?.items ?? [];
  } catch {
    return [];
  }
}

export async function unbindOAuth(providerId: number): Promise<void> {
  await backendFetch<unknown>(
    `/api/user/oauth/bindings/${encodeURIComponent(String(providerId))}`,
    { method: "DELETE" },
  );
}

/** Create OAuth CSRF state; intent=bind requires logged-in session. */
export async function createOAuthFlow(
  provider: string,
  intent: "login" | "bind",
): Promise<string> {
  const data = await backendFetch<string | { flow_token?: string }>(
    "/api/oauth/state",
    {
      method: "POST",
      body: JSON.stringify({ provider, intent }),
    },
  );
  if (typeof data === "string" && data) return data;
  if (data && typeof data === "object" && typeof data.flow_token === "string") {
    return data.flow_token;
  }
  throw new BackendError("Failed to initialize OAuth");
}

/** Complete OAuth (login or bind) after provider redirect. */
export async function completeOAuth(
  provider: string,
  params: {
    state: string;
    code?: string;
    error?: string;
    error_description?: string;
  },
): Promise<{ success: boolean; message?: string }> {
  const q = new URLSearchParams({ state: params.state });
  if (params.code) q.set("code", params.code);
  if (params.error) q.set("error", params.error);
  if (params.error_description) {
    q.set("error_description", params.error_description);
  }
  const base = assertApiBase();
  const headers = new Headers();
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const sid = getSessionSid();
  if (sid) headers.set("X-Auth-Session", sid);
  const res = await fetch(
    `${base}/api/oauth/${encodeURIComponent(provider)}?${q.toString()}`,
    { method: "GET", headers, credentials: "include" },
  );
  const json = (await res.json()) as {
    success?: boolean;
    message?: string;
  };
  return {
    success: Boolean(json.success),
    message: json.message,
  };
}

export async function bindEmail(email: string, code: string): Promise<void> {
  await backendFetch<unknown>("/api/oauth/email/bind", {
    method: "POST",
    body: JSON.stringify({ email: email.trim(), code: code.trim() }),
  });
}

export async function bindWeChat(code: string): Promise<void> {
  await backendFetch<unknown>("/api/oauth/wechat/bind", {
    method: "POST",
    body: JSON.stringify({ code: code.trim() }),
  });
}

export type TelegramBindFlow = {
  flow_token: string;
  callback_url: string;
  expires_at?: number;
};

export async function startTelegramBind(): Promise<TelegramBindFlow> {
  const data = await backendFetch<TelegramBindFlow>(
    "/api/oauth/telegram/bind/start",
    { method: "POST" },
  );
  if (!data?.flow_token || !data?.callback_url) {
    throw new BackendError("Telegram bind flow missing");
  }
  return data;
}

/** Regenerate system Access Token (previous token invalidated). */
export async function generateAccessToken(): Promise<string> {
  const data = await backendFetch<string>("/api/user/token", {
    method: "GET",
  });
  if (typeof data !== "string" || !data) {
    throw new BackendError("Access Token missing in response");
  }
  return data;
}

/** Delete the current user account. */
export async function deleteSelfAccount(): Promise<void> {
  await backendFetch<unknown>("/api/user/self", { method: "DELETE" });
  clearAccessToken();
}

export type CheckinRecord = {
  checkin_date?: string;
  quota_awarded?: number;
};

export type CheckinStatus = {
  enabled?: boolean;
  min_quota?: number;
  max_quota?: number;
  stats?: {
    checked_in_today?: boolean;
    total_checkins?: number;
    total_quota?: number;
    checkin_count?: number;
    records?: CheckinRecord[];
  };
};

export async function getCheckinStatus(
  month?: string,
): Promise<CheckinStatus> {
  const q = month ? `?month=${encodeURIComponent(month)}` : "";
  return backendFetch<CheckinStatus>(`/api/user/checkin${q}`, {
    method: "GET",
  });
}

export async function postCheckin(turnstile?: string): Promise<{
  quota_awarded?: number;
  checkin_date?: string;
}> {
  const path = withTurnstileQuery("/api/user/checkin", turnstile);
  return backendFetch<{ quota_awarded?: number; checkin_date?: string }>(
    path,
    { method: "POST" },
  );
}

export type UserSessionRow = {
  id?: string;
  sid?: string;
  created_at?: number;
  last_seen_at?: number;
  user_agent?: string;
  ip?: string;
  current?: boolean;
};

export async function listUserSessions(): Promise<UserSessionRow[]> {
  const data = await backendFetch<
    UserSessionRow[] | { items?: UserSessionRow[]; sessions?: UserSessionRow[] }
  >("/api/user/sessions", { method: "GET" });
  if (Array.isArray(data)) return data;
  return data?.items ?? data?.sessions ?? [];
}

export async function revokeUserSession(sid: string): Promise<void> {
  await backendFetch<unknown>(`/api/user/sessions/${encodeURIComponent(sid)}`, {
    method: "DELETE",
  });
}

export async function revokeOtherSessions(): Promise<void> {
  await backendFetch<unknown>("/api/user/sessions/revoke-others", {
    method: "POST",
  });
}

export async function changeSelfPassword(input: {
  username: string;
  original_password: string;
  password: string;
  display_name?: string;
}): Promise<void> {
  await backendFetch<unknown>("/api/user/self", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: input.username,
      display_name: input.display_name ?? "",
      original_password: input.original_password,
      password: input.password,
    }),
  });
}

/** Redeem an Admin-issued 兑换码; returns 额度 credited (not new balance). */
export async function redeemCode(key: string): Promise<number> {
  const trimmed = key.trim();
  if (!trimmed) {
    throw new BackendError("兑换码不能为空", "redeemCodeEmpty");
  }
  const data = await backendFetch<number>("/api/user/topup", {
    method: "POST",
    body: JSON.stringify({ key: trimmed }),
  });
  if (typeof data !== "number") {
    throw new BackendError("兑换响应缺少额度增量", "redeemMissingQuotaDelta");
  }
  return data;
}

export type TopupPayMethod = {
  name: string;
  type: string;
  color?: string;
  min_topup?: string;
};

export type CreemProduct = {
  productId: string;
  name: string;
  price: number;
  currency: string;
  quota: number;
};

export type WaffoPayMethod = {
  name?: string;
  icon?: string;
  payMethodType?: string;
  payMethodName?: string;
};

export type TopupInfo = {
  enable_online_topup?: boolean;
  enable_stripe_topup?: boolean;
  enable_creem_topup?: boolean;
  enable_waffo_topup?: boolean;
  enable_waffo_pancake_topup?: boolean;
  enable_redemption?: boolean;
  pay_methods?: TopupPayMethod[];
  creem_products?: CreemProduct[];
  waffo_pay_methods?: WaffoPayMethod[];
  min_topup?: number;
  stripe_min_topup?: number;
  waffo_min_topup?: number;
  waffo_pancake_min_topup?: number;
  amount_options?: number[];
  payment_compliance_confirmed?: boolean;
};

export async function getTopupInfo(): Promise<TopupInfo> {
  return backendFetch<TopupInfo>("/api/user/topup/info", { method: "GET" });
}

type MessageSuccessJson<T> = {
  message?: string;
  data?: T | string;
  url?: string;
  code?: string;
};

/**
 * Payment amount/pay endpoints often return `{ message: "success", data }`
 * instead of `{ success: true }`, so they cannot use backendFetch.
 */
async function messageSuccessFetch<T>(
  path: string,
  body: unknown,
  mapData: (json: MessageSuccessJson<T>, status: number) => T,
): Promise<T> {
  const base = assertApiBase();

  async function once(): Promise<{
    res: Response;
    json: MessageSuccessJson<T>;
  }> {
    const headers = new Headers({ "Content-Type": "application/json" });
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(`${base}${path}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as MessageSuccessJson<T>;
    return { res, json };
  }

  let { res, json } = await once();
  if (isStaleAuthResponse(res.status, json.code) && getAccessToken()) {
    const outcome = await refreshAuthentication();
    if (outcome.kind === "authenticated") {
      ({ res, json } = await once());
    }
  }

  if (json.message !== "success") {
    const detail =
      typeof json.data === "string"
        ? json.data
        : json.message && json.message !== "success"
          ? json.message
          : `HTTP ${res.status}`;
    throw new BackendError(
      detail || "请求失败",
      undefined,
      res.status,
      json.code,
    );
  }

  try {
    return mapData(json, res.status);
  } catch (e) {
    if (e instanceof BackendError) throw e;
    throw new BackendError(
      typeof json.data === "string" ? json.data : `HTTP ${res.status}`,
      undefined,
      res.status,
      json.code,
    );
  }
}

function parsePayMoney(data: unknown, status: number): number {
  const raw =
    typeof data === "string" || typeof data === "number" ? String(data) : "";
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) {
    throw new BackendError("金额计算失败", undefined, status);
  }
  return n;
}

/** Quote payable money for EPay (易支付) top-up amount. */
export async function calculateEpayAmount(amount: number): Promise<number> {
  return messageSuccessFetch<number>(
    "/api/user/amount",
    { amount: Math.floor(amount) },
    (json, status) => parsePayMoney(json.data, status),
  );
}

export async function calculateStripeAmount(amount: number): Promise<number> {
  return messageSuccessFetch<number>(
    "/api/user/stripe/amount",
    { amount: Math.floor(amount) },
    (json, status) => parsePayMoney(json.data, status),
  );
}

export async function calculateWaffoAmount(amount: number): Promise<number> {
  return messageSuccessFetch<number>(
    "/api/user/waffo/amount",
    { amount: Math.floor(amount) },
    (json, status) => parsePayMoney(json.data, status),
  );
}

export async function calculateWaffoPancakeAmount(
  amount: number,
): Promise<number> {
  return messageSuccessFetch<number>(
    "/api/user/waffo-pancake/amount",
    { amount: Math.floor(amount) },
    (json, status) => parsePayMoney(json.data, status),
  );
}

export type EpayPayResult = {
  url: string;
  params: Record<string, string>;
};

/**
 * Start EPay checkout. Upstream returns `{ message: "success", data, url }`
 * (not `{ success: true }`), so this path cannot use backendFetch.
 */
export async function requestEpayPay(
  amount: number,
  paymentMethod: string,
): Promise<EpayPayResult> {
  return messageSuccessFetch<EpayPayResult>(
    "/api/user/pay",
    { amount: Math.floor(amount), payment_method: paymentMethod },
    (json, status) => {
      if (!json.url || !json.data || typeof json.data === "string") {
        throw new BackendError(
          typeof json.data === "string" ? json.data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        url: json.url,
        params: json.data as unknown as Record<string, string>,
      };
    },
  );
}

export async function requestStripePay(
  amount: number,
): Promise<{ pay_link: string }> {
  return messageSuccessFetch<{ pay_link: string }>(
    "/api/user/stripe/pay",
    { amount: Math.floor(amount), payment_method: "stripe" },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { pay_link?: string }).pay_link !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return { pay_link: (data as { pay_link: string }).pay_link };
    },
  );
}

export async function requestCreemPay(
  productId: string,
): Promise<{ checkout_url: string }> {
  return messageSuccessFetch<{ checkout_url: string }>(
    "/api/user/creem/pay",
    { product_id: productId, payment_method: "creem" },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { checkout_url?: string }).checkout_url !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        checkout_url: (data as { checkout_url: string }).checkout_url,
      };
    },
  );
}

export async function requestWaffoPay(
  amount: number,
  payMethodIndex?: number,
): Promise<{ payment_url: string }> {
  return messageSuccessFetch<{ payment_url: string }>(
    "/api/user/waffo/pay",
    {
      amount: Math.floor(amount),
      ...(payMethodIndex != null ? { pay_method_index: payMethodIndex } : {}),
    },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { payment_url?: string }).payment_url !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        payment_url: (data as { payment_url: string }).payment_url,
      };
    },
  );
}

export async function requestWaffoPancakePay(
  amount: number,
): Promise<{ checkout_url: string }> {
  return messageSuccessFetch<{ checkout_url: string }>(
    "/api/user/waffo-pancake/pay",
    { amount: Math.floor(amount) },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { checkout_url?: string }).checkout_url !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        checkout_url: (data as { checkout_url: string }).checkout_url,
      };
    },
  );
}

/** POST a hidden form to the EPay gateway (stock new-api wallet pattern). */
export function submitPaymentForm(
  url: string,
  params: Record<string, string>,
): void {
  const form = document.createElement("form");
  form.action = url;
  form.method = "POST";
  const ua = navigator.userAgent;
  const isSafari = ua.includes("Safari") && !ua.includes("Chrome");
  if (!isSafari) form.target = "_blank";
  for (const [key, value] of Object.entries(params)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

export type TopUpRecord = {
  id: number;
  trade_no: string;
  amount: number;
  money: number;
  status: string;
  create_time: number;
  complete_time?: number;
  payment_method?: string;
};

export type TopUpListResult = {
  items: TopUpRecord[];
  total: number;
  page: number;
  pageSize: number;
};

export async function listTopUps(
  page = 1,
  pageSize = 20,
  keyword = "",
): Promise<TopUpListResult> {
  const q = new URLSearchParams({
    p: String(page),
    page_size: String(pageSize),
  });
  const trimmed = keyword.trim();
  if (trimmed) q.set("keyword", trimmed);
  const data = await backendFetch<PageData<TopUpRecord>>(
    `/api/user/topup/self?${q.toString()}`,
    { method: "GET" },
  );
  return {
    items: data?.items ?? [],
    total: typeof data?.total === "number" ? data.total : 0,
    page: typeof data?.page === "number" ? data.page : page,
    pageSize:
      typeof data?.page_size === "number" ? data.page_size : pageSize,
  };
}

/** Ensure / return the current user's affiliate invite code. */
export async function getAffiliateCode(): Promise<string> {
  const data = await backendFetch<string>("/api/user/aff", { method: "GET" });
  if (typeof data !== "string" || !data.trim()) {
    throw new BackendError("Affiliate code missing");
  }
  return data.trim();
}

/** Transfer pending affiliate quota into wallet balance. */
export async function transferAffiliateQuota(quota: number): Promise<void> {
  const amount = Math.floor(quota);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new BackendError("Invalid transfer amount");
  }
  await backendFetch<unknown>("/api/user/aff_transfer", {
    method: "POST",
    body: JSON.stringify({ quota: amount }),
  });
}

export type SubscriptionPlan = {
  id: number;
  title?: string;
  subtitle?: string;
  price_amount?: number;
  currency?: string;
  duration_unit?: string;
  duration_value?: number;
  custom_seconds?: number;
  enabled?: boolean;
  sort_order?: number;
  allow_balance_pay?: boolean;
  max_purchase_per_user?: number;
  total_amount?: number;
  stripe_price_id?: string;
  creem_product_id?: string;
  waffo_pancake_product_id?: string;
  upgrade_group?: string;
  downgrade_group?: string;
};

export type SubscriptionPlanRecord = {
  plan: SubscriptionPlan;
};

export type UserSubscription = {
  id?: number;
  plan_id?: number;
  status?: string;
  source?: string;
  start_time?: number;
  end_time?: number;
  amount_total?: number;
  amount_used?: number;
  next_reset_time?: number;
};

export type UserSubscriptionRecord = {
  subscription: UserSubscription;
};

export type BillingPreference =
  | "subscription_first"
  | "wallet_first"
  | "subscription_only"
  | "wallet_only"
  | string;

export type SelfSubscriptionData = {
  billing_preference?: BillingPreference;
  subscriptions?: UserSubscriptionRecord[];
  all_subscriptions?: UserSubscriptionRecord[];
};

export async function getSubscriptionPlans(): Promise<SubscriptionPlanRecord[]> {
  try {
    const data = await backendFetch<SubscriptionPlanRecord[] | null>(
      "/api/subscription/plans",
      { method: "GET" },
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getSubscriptionSelf(): Promise<SelfSubscriptionData> {
  return backendFetch<SelfSubscriptionData>("/api/subscription/self", {
    method: "GET",
  });
}

export async function updateSubscriptionPreference(
  preference: BillingPreference,
): Promise<BillingPreference> {
  const data = await backendFetch<{ billing_preference?: string }>(
    "/api/subscription/self/preference",
    {
      method: "PUT",
      body: JSON.stringify({ billing_preference: preference }),
    },
  );
  return data?.billing_preference ?? preference;
}

export async function paySubscriptionBalance(planId: number): Promise<void> {
  await messageSuccessFetch<unknown>(
    "/api/subscription/balance/pay",
    { plan_id: planId },
    () => null,
  );
}

export async function paySubscriptionStripe(
  planId: number,
): Promise<{ pay_link: string }> {
  return messageSuccessFetch<{ pay_link: string }>(
    "/api/subscription/stripe/pay",
    { plan_id: planId },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { pay_link?: string }).pay_link !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return { pay_link: (data as { pay_link: string }).pay_link };
    },
  );
}

export async function paySubscriptionCreem(
  planId: number,
): Promise<{ checkout_url: string }> {
  return messageSuccessFetch<{ checkout_url: string }>(
    "/api/subscription/creem/pay",
    { plan_id: planId },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { checkout_url?: string }).checkout_url !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        checkout_url: (data as { checkout_url: string }).checkout_url,
      };
    },
  );
}

export async function paySubscriptionWaffoPancake(
  planId: number,
): Promise<{ checkout_url: string }> {
  return messageSuccessFetch<{ checkout_url: string }>(
    "/api/subscription/waffo-pancake/pay",
    { plan_id: planId },
    (json, status) => {
      const data = json.data;
      if (
        !data ||
        typeof data === "string" ||
        typeof (data as { checkout_url?: string }).checkout_url !== "string"
      ) {
        throw new BackendError(
          typeof data === "string" ? data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        checkout_url: (data as { checkout_url: string }).checkout_url,
      };
    },
  );
}

export async function paySubscriptionEpay(
  planId: number,
  paymentMethod: string,
): Promise<EpayPayResult> {
  return messageSuccessFetch<EpayPayResult>(
    "/api/subscription/epay/pay",
    { plan_id: planId, payment_method: paymentMethod },
    (json, status) => {
      if (!json.url || !json.data || typeof json.data === "string") {
        throw new BackendError(
          typeof json.data === "string" ? json.data : "拉起支付失败",
          "paymentStartFailed",
          status,
          json.code,
        );
      }
      return {
        url: json.url,
        params: json.data as unknown as Record<string, string>,
      };
    },
  );
}

/** Models enabled for the current 用户's groups (Backend catalog). */
export async function getUserModels(): Promise<string[]> {
  const data = await backendFetch<string[] | unknown>("/api/user/models", {
    method: "GET",
  });
  if (Array.isArray(data) && data.every((x) => typeof x === "string")) {
    return data as string[];
  }
  return [];
}

export type PricingItem = {
  model_name: string;
  description?: string;
  icon?: string;
  tags?: string;
  vendor_id?: number;
  owner_by?: string;
  enable_groups?: string[];
  supported_endpoint_types?: string[];
  /** 0 = ratio (per-token), 1 = fixed per-call price */
  quota_type?: number;
  model_ratio?: number;
  completion_ratio?: number;
  model_price?: number;
  cache_ratio?: number | null;
};

export type PricingVendor = {
  id?: number;
  name?: string;
  icon?: string;
};

export type PricingEndpointInfo = {
  path?: string;
  method?: string;
};

export type PricingCatalog = {
  items: PricingItem[];
  vendors: PricingVendor[];
  group_ratio?: Record<string, number>;
  /** Endpoint type → path/method map from `/api/pricing`. */
  supported_endpoint?: Record<string, PricingEndpointInfo>;
};

type PricingEnvelope = {
  success?: boolean;
  message?: string;
  code?: string;
  data?: PricingItem[];
  vendors?: PricingVendor[];
  group_ratio?: Record<string, number>;
  supported_endpoint?: Record<string, PricingEndpointInfo>;
};

function pricingCatalogFromEnvelope(json: PricingEnvelope): PricingCatalog {
  return {
    items: Array.isArray(json.data) ? json.data : [],
    vendors: Array.isArray(json.vendors) ? json.vendors : [],
    group_ratio:
      json.group_ratio && typeof json.group_ratio === "object"
        ? json.group_ratio
        : undefined,
    supported_endpoint:
      json.supported_endpoint && typeof json.supported_endpoint === "object"
        ? json.supported_endpoint
        : undefined,
  };
}

/**
 * Public/optional-auth pricing catalog (upstream `/api/pricing` + TryUserAuth).
 * Mirrors new-api: attach memory JWT when present; on stale auth refresh once;
 * if session is gone, fall back to anonymous (no Bearer) so marketing pages stay public.
 */
export async function getPricingCatalog(): Promise<PricingCatalog> {
  const base = assertApiBase();

  async function fetchPricing(withToken: boolean): Promise<{
    res: Response;
    json: PricingEnvelope;
  }> {
    const headers = new Headers();
    if (withToken) {
      const token = getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    const res = await fetch(`${base}/api/pricing`, {
      method: "GET",
      headers,
      credentials: "include",
    });
    const json = (await res.json()) as PricingEnvelope;
    return { res, json };
  }

  let withToken = Boolean(getAccessToken());
  let { res, json } = await fetchPricing(withToken);

  if (withToken && isStaleAuthResponse(res.status, json.code)) {
    const outcome = await refreshAuthentication();
    if (outcome.kind === "authenticated") {
      ({ res, json } = await fetchPricing(true));
    } else if (outcome.kind === "anonymous") {
      ({ res, json } = await fetchPricing(false));
    } else {
      // Transient refresh failure with a dead access JWT: drop Bearer like a cold start.
      clearAccessToken();
      ({ res, json } = await fetchPricing(false));
    }
  }

  if (!res.ok || !json.success) {
    throw new BackendError(
      json.message || `HTTP ${res.status}`,
      undefined,
      res.status,
      json.code,
    );
  }
  return pricingCatalogFromEnvelope(json);
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type PlaygroundChatResult = {
  content: string;
};

/**
 * Session-auth playground Relay (same billing as /v1). Uses JWT from login —
 * not an API Key. Non-streaming for SPA simplicity.
 */
export async function playgroundChat(args: {
  model: string;
  messages: ChatMessage[];
  group?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  top_k?: number;
  frequency_penalty?: number;
}): Promise<PlaygroundChatResult> {
  const base = assertApiBase();

  if (!getAccessToken()) {
    const ok = await ensureAuthSession();
    if (!ok) {
      throw new BackendError(
        "未登录，请先登录后再使用在线体验",
        "playgroundNotLoggedIn",
      );
    }
  }

  async function once(): Promise<{
    res: Response;
    json: {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string; code?: string; type?: string };
      message?: string;
      code?: string;
    };
  }> {
    const headers = new Headers({ "Content-Type": "application/json" });
    const token = getAccessToken();
    if (!token) {
      throw new BackendError(
        "未登录，请先登录后再使用在线体验",
        "playgroundNotLoggedIn",
      );
    }
    headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(`${base}/pg/chat/completions`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({
        model: args.model,
        messages: args.messages,
        stream: false,
        group: args.group ?? "default",
        temperature: args.temperature,
        max_tokens: args.max_tokens ?? 1024,
        top_p: args.top_p,
        top_k: args.top_k,
        frequency_penalty: args.frequency_penalty,
      }),
    });
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string; code?: string; type?: string };
      message?: string;
      code?: string;
    };
    return { res, json };
  }

  let { res, json } = await once();
  const authCode = json.code || json.error?.code;
  if (isStaleAuthResponse(res.status, authCode) && getAccessToken()) {
    const outcome = await refreshAuthentication();
    if (outcome.kind === "authenticated") {
      ({ res, json } = await once());
    }
  }

  if (!res.ok || json.error) {
    const msg =
      json.error?.message ||
      json.message ||
      `HTTP ${res.status}`;
    const code = json.error?.code || "";
    if (
      code === "insufficient_user_quota" ||
      /quota|额度/i.test(msg)
    ) {
      throw new BackendError(`额度不足：${msg}`);
    }
    throw new BackendError(msg, undefined, res.status, authCode);
  }

  const content = json.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new BackendError("模型未返回有效内容", "playgroundEmptyContent");
  }
  return { content };
}

/** Consume = 2 in basedong-api model.LogTypeConsume */
export const USAGE_LOG_TYPE_CONSUME = 2;

export type UsageLog = {
  id: number;
  created_at: number;
  type: number;
  content?: string;
  token_name?: string;
  model_name?: string;
  quota?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  use_time?: number;
  is_stream?: boolean;
  request_id?: string;
  group?: string;
};

export type UsageLogPage = {
  items: UsageLog[];
  total: number;
  page: number;
  page_size: number;
};

export async function listUsageLogs(params: {
  page?: number;
  pageSize?: number;
  type?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  modelName?: string;
  tokenName?: string;
  group?: string;
  requestId?: string;
} = {}): Promise<UsageLogPage> {
  const q = new URLSearchParams();
  q.set("p", String(params.page ?? 1));
  q.set("page_size", String(params.pageSize ?? 50));
  if (params.type != null) q.set("type", String(params.type));
  if (params.startTimestamp != null) {
    q.set("start_timestamp", String(params.startTimestamp));
  }
  if (params.endTimestamp != null) {
    q.set("end_timestamp", String(params.endTimestamp));
  }
  if (params.modelName) q.set("model_name", params.modelName);
  if (params.tokenName) q.set("token_name", params.tokenName);
  if (params.group) q.set("group", params.group);
  if (params.requestId) q.set("request_id", params.requestId);

  const data = await backendFetch<{
    items?: UsageLog[];
    total?: number;
    page?: number;
    page_size?: number;
  }>(`/api/log/self?${q.toString()}`, { method: "GET" });

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? params.page ?? 1,
    page_size: data?.page_size ?? params.pageSize ?? 50,
  };
}

export type UsageStat = {
  quota: number;
  rpm: number;
  tpm: number;
};

export async function getUsageSelfStat(params: {
  type?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  modelName?: string;
  tokenName?: string;
  group?: string;
} = {}): Promise<UsageStat> {
  const q = new URLSearchParams();
  if (params.type != null) q.set("type", String(params.type));
  if (params.startTimestamp != null) {
    q.set("start_timestamp", String(params.startTimestamp));
  }
  if (params.endTimestamp != null) {
    q.set("end_timestamp", String(params.endTimestamp));
  }
  if (params.modelName) q.set("model_name", params.modelName);
  if (params.tokenName) q.set("token_name", params.tokenName);
  if (params.group) q.set("group", params.group);
  const qs = q.toString();
  const data = await backendFetch<UsageStat>(
    `/api/log/self/stat${qs ? `?${qs}` : ""}`,
    { method: "GET" },
  );
  return {
    quota: data?.quota ?? 0,
    rpm: data?.rpm ?? 0,
    tpm: data?.tpm ?? 0,
  };
}

export type QuotaDataItem = {
  model_name?: string;
  created_at?: number;
  token_used?: number;
  count?: number;
  quota?: number;
};

export async function getSelfQuotaData(params: {
  startTimestamp: number;
  endTimestamp: number;
  defaultTime?: string;
}): Promise<QuotaDataItem[]> {
  const q = new URLSearchParams();
  q.set("start_timestamp", String(params.startTimestamp));
  q.set("end_timestamp", String(params.endTimestamp));
  if (params.defaultTime) q.set("default_time", params.defaultTime);
  const data = await backendFetch<QuotaDataItem[]>(
    `/api/data/self?${q.toString()}`,
    { method: "GET" },
  );
  return Array.isArray(data) ? data : [];
}

export type FlowQuotaDataItem = {
  token_id?: number;
  token_name?: string;
  use_group?: string;
  model_name?: string;
  token_used?: number;
  count?: number;
  quota?: number;
};

export async function getSelfFlowQuotaData(params: {
  startTimestamp: number;
  endTimestamp: number;
  defaultTime?: string;
}): Promise<FlowQuotaDataItem[]> {
  const q = new URLSearchParams();
  q.set("start_timestamp", String(params.startTimestamp));
  q.set("end_timestamp", String(params.endTimestamp));
  if (params.defaultTime) q.set("default_time", params.defaultTime);
  const data = await backendFetch<FlowQuotaDataItem[]>(
    `/api/data/flow/self?${q.toString()}`,
    { method: "GET" },
  );
  return Array.isArray(data) ? data : [];
}

export type TaskLogRow = {
  id?: number | string;
  task_id?: string;
  mj_id?: string;
  platform?: string;
  action?: string;
  status?: string;
  progress?: string;
  submit_time?: number;
  finish_time?: number;
  fail_reason?: string;
  quota?: number;
};

async function listSelfPagedTasks(
  path: string,
  params: {
    page?: number;
    pageSize?: number;
    startTimestamp?: number;
    endTimestamp?: number;
    taskId?: string;
    mjId?: string;
    platform?: string;
    status?: string;
  } = {},
): Promise<{ items: TaskLogRow[]; total: number }> {
  const q = new URLSearchParams();
  q.set("p", String(params.page ?? 1));
  q.set("page_size", String(params.pageSize ?? 50));
  if (params.startTimestamp != null) {
    q.set("start_timestamp", String(params.startTimestamp));
  }
  if (params.endTimestamp != null) {
    q.set("end_timestamp", String(params.endTimestamp));
  }
  if (params.taskId) q.set("task_id", params.taskId);
  if (params.mjId) q.set("mj_id", params.mjId);
  if (params.platform) q.set("platform", params.platform);
  if (params.status) q.set("status", params.status);
  const data = await backendFetch<{
    items?: TaskLogRow[];
    data?: TaskLogRow[];
    total?: number;
  }>(`${path}?${q.toString()}`, { method: "GET" });
  const items = data?.items ?? data?.data ?? [];
  return {
    items: Array.isArray(items) ? items : [],
    total: data?.total ?? (Array.isArray(items) ? items.length : 0),
  };
}

export async function listSelfMjLogs(params: {
  page?: number;
  pageSize?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  mjId?: string;
} = {}): Promise<{ items: TaskLogRow[]; total: number }> {
  return listSelfPagedTasks("/api/mj/self", params);
}

export async function listSelfTasks(params: {
  page?: number;
  pageSize?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  taskId?: string;
  platform?: string;
  status?: string;
} = {}): Promise<{ items: TaskLogRow[]; total: number }> {
  return listSelfPagedTasks("/api/task/self", params);
}

export async function updateSelfProfile(input: {
  username: string;
  display_name?: string;
}): Promise<void> {
  await backendFetch<unknown>("/api/user/self", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: input.username,
      display_name: input.display_name ?? "",
    }),
  });
}

export type UpdateUserSettingsInput = {
  notify_type: string;
  quota_warning_threshold: number;
  notification_email?: string;
  webhook_url?: string;
  webhook_secret?: string;
  bark_url?: string;
  gotify_url?: string;
  gotify_token?: string;
  gotify_priority?: number;
  accept_unset_model_ratio_model: boolean;
  record_ip_log: boolean;
};

/** PUT /api/user/setting — notification prefs and related flags. */
export async function updateUserSettings(
  input: UpdateUserSettingsInput,
): Promise<void> {
  await backendFetch<unknown>("/api/user/setting", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

