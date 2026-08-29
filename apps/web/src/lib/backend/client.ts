import { assertApiBase } from "./config";
import { clearAccessToken, getAccessToken, setAccessToken } from "./session";

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
  constructor(message: string) {
    super(message);
    this.name = "BackendError";
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

export async function login(
  username: string,
  password: string,
): Promise<LoginData> {
  const data = await backendFetch<LoginData>("/api/user/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  if (!data?.access_token) {
    throw new BackendError("Login response missing access_token");
  }
  setAccessToken(data.access_token);
  return data;
}

export async function register(
  username: string,
  password: string,
): Promise<void> {
  await backendFetch<unknown>("/api/user/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
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
