import type { ClientErrorKey } from "@/components/console/shared/backend-error-ui-copy";
import { assertApiBase } from "./config";
import { clearAccessToken, getAccessToken, setAccessToken } from "./session";

export type { ClientErrorKey };

export type BackendUser = {
  id?: number;
  username?: string;
  display_name?: string;
  quota?: number;
  used_quota?: number;
};

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

async function parseEnvelope<T>(res: Response): Promise<ApiEnvelope<T>> {
  const json = (await res.json()) as ApiEnvelope<T>;
  return json;
}

export class BackendError extends Error {
  readonly clientKey?: ClientErrorKey;

  constructor(message: string, clientKey?: ClientErrorKey) {
    super(message);
    this.name = "BackendError";
    this.clientKey = clientKey;
  }
}

export async function backendFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const base = assertApiBase();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getAccessToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const envelope = await parseEnvelope<T>(res);
  if (!res.ok || !envelope.success) {
    throw new BackendError(envelope.message || `HTTP ${res.status}`);
  }
  return envelope.data as T;
}

type LoginData = {
  access_token: string;
  token_type?: string;
  user?: BackendUser;
};

/** Public Backend flags used by Auth (from GET /api/status). */
export type PublicAuthStatus = {
  email_verification?: boolean;
  turnstile_check?: boolean;
  turnstile_site_key?: string;
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
  setAccessToken(data.access_token);
  return data;
}

export type RegisterInput = {
  username: string;
  password: string;
  email?: string;
  verificationCode?: string;
  turnstile?: string;
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
    await backendFetch<unknown>("/api/user/auth/logout", { method: "POST" });
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
  unlimited_quota?: boolean;
};

type PageData<T> = {
  items?: T[];
  total?: number;
  page?: number;
  page_size?: number;
};

export async function listApiKeys(
  page = 1,
  size = 100,
): Promise<BackendApiKey[]> {
  const data = await backendFetch<PageData<BackendApiKey>>(
    `/api/token/?p=${page}&size=${size}`,
    { method: "GET" },
  );
  return data?.items ?? [];
}

export async function createApiKey(name: string): Promise<void> {
  await backendFetch<unknown>("/api/token/", {
    method: "POST",
    body: JSON.stringify({
      name,
      remain_quota: 0,
      expired_time: -1,
      unlimited_quota: true,
      model_limits_enabled: false,
      model_limits: "",
      allow_ips: "",
      group: "",
    }),
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

export async function updateApiKeyName(
  id: number,
  name: string,
): Promise<void> {
  const current = await backendFetch<BackendApiKey>(`/api/token/${id}`, {
    method: "GET",
  });
  await backendFetch<unknown>("/api/token/", {
    method: "PUT",
    body: JSON.stringify({
      id,
      name,
      remain_quota: current.remain_quota ?? 0,
      expired_time: current.expired_time ?? -1,
      unlimited_quota: current.unlimited_quota ?? true,
      model_limits_enabled: false,
      model_limits: "",
      allow_ips: "",
      group: "",
      status: current.status ?? 1,
    }),
  });
}

export async function deleteApiKey(id: number): Promise<void> {
  await backendFetch<unknown>(`/api/token/${id}`, { method: "DELETE" });
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

export type TopupInfo = {
  enable_online_topup?: boolean;
  pay_methods?: TopupPayMethod[];
  min_topup?: number;
  amount_options?: number[];
  payment_compliance_confirmed?: boolean;
};

export async function getTopupInfo(): Promise<TopupInfo> {
  return backendFetch<TopupInfo>("/api/user/topup/info", { method: "GET" });
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
  const base = assertApiBase();
  const headers = new Headers({ "Content-Type": "application/json" });
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${base}/api/user/pay`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ amount, payment_method: paymentMethod }),
  });
  const json = (await res.json()) as {
    message?: string;
    data?: Record<string, string> | string;
    url?: string;
  };
  if (json.message !== "success" || !json.url || !json.data || typeof json.data === "string") {
    const detail =
      typeof json.data === "string"
        ? json.data
        : json.message && json.message !== "success"
          ? json.message
          : `HTTP ${res.status}`;
    throw new BackendError(
      detail || "拉起支付失败",
      detail ? undefined : "paymentStartFailed",
    );
  }
  return { url: json.url, params: json.data };
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

export async function listTopUps(
  page = 1,
  pageSize = 20,
): Promise<TopUpRecord[]> {
  const data = await backendFetch<PageData<TopUpRecord>>(
    `/api/user/topup/self?p=${page}&page_size=${pageSize}`,
    { method: "GET" },
  );
  return data?.items ?? [];
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

export type PricingCatalog = {
  items: PricingItem[];
  vendors: PricingVendor[];
  group_ratio?: Record<string, number>;
};

/** Public/auth pricing catalog used by model plaza. */
export async function getPricingCatalog(): Promise<PricingCatalog> {
  const base = assertApiBase();
  const headers = new Headers();
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${base}/api/pricing`, {
    method: "GET",
    headers,
    credentials: "include",
  });
  const json = (await res.json()) as {
    success?: boolean;
    message?: string;
    data?: PricingItem[];
    vendors?: PricingVendor[];
    group_ratio?: Record<string, number>;
  };
  if (!res.ok || !json.success) {
    throw new BackendError(json.message || `HTTP ${res.status}`);
  }
  return {
    items: Array.isArray(json.data) ? json.data : [],
    vendors: Array.isArray(json.vendors) ? json.vendors : [],
    group_ratio:
      json.group_ratio && typeof json.group_ratio === "object"
        ? json.group_ratio
        : undefined,
  };
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
}): Promise<PlaygroundChatResult> {
  const base = assertApiBase();
  const headers = new Headers({ "Content-Type": "application/json" });
  const token = getAccessToken();
  if (!token) {
    throw new BackendError("未登录，请先登录后再使用在线体验", "playgroundNotLoggedIn");
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
    }),
  });

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string; code?: string; type?: string };
    message?: string;
  };

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
    throw new BackendError(msg);
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

export type TaskLogRow = {
  id?: number | string;
  task_id?: string;
  platform?: string;
  status?: string;
  progress?: string;
  submit_time?: number;
  finish_time?: number;
  fail_reason?: string;
  quota?: number;
};

async function listSelfPagedTasks(
  path: string,
  params: { page?: number; pageSize?: number } = {},
): Promise<{ items: TaskLogRow[]; total: number }> {
  const q = new URLSearchParams();
  q.set("p", String(params.page ?? 1));
  q.set("page_size", String(params.pageSize ?? 50));
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
} = {}): Promise<{ items: TaskLogRow[]; total: number }> {
  return listSelfPagedTasks("/api/mj/self", params);
}

export async function listSelfTasks(params: {
  page?: number;
  pageSize?: number;
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


