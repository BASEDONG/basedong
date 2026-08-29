const ACCESS_KEY = "basedong_access_token";

/** Short-lived Backend access JWT (Bearer). Refresh cookies need same-site; see docs/backend. */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ACCESS_KEY);
}

export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (!token) {
    sessionStorage.removeItem(ACCESS_KEY);
    return;
  }
  sessionStorage.setItem(ACCESS_KEY, token);
}

export function clearAccessToken(): void {
  setAccessToken(null);
}
