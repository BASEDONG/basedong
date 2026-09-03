/**
 * Short-lived Backend access JWT — memory only (matches upstream new-api Admin UI).
 * Refresh Cookie (HttpOnly, SameSite=Strict on `/api/user/auth`) restores the session
 * across reloads when Web and Backend are same-site; see apps/api/docs/basedong.md.
 */
const LEGACY_ACCESS_KEY = "basedong_access_token";

let accessToken: string | null = null;
let sessionSid: string | null = null;
let legacyCleared = false;

function clearLegacySessionStorage(): void {
  if (legacyCleared || typeof window === "undefined") return;
  legacyCleared = true;
  try {
    sessionStorage.removeItem(LEGACY_ACCESS_KEY);
  } catch {
    // ignore quota / private-mode failures
  }
}

export function getAccessToken(): string | null {
  clearLegacySessionStorage();
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  clearLegacySessionStorage();
  accessToken = token && token.trim() ? token.trim() : null;
}

export function getSessionSid(): string | null {
  return sessionSid;
}

export function setSessionSid(sid: string | null): void {
  sessionSid = sid && sid.trim() ? sid.trim() : null;
}

export function clearAccessToken(): void {
  accessToken = null;
  sessionSid = null;
  clearLegacySessionStorage();
}

export function applyAuthSession(bundle: {
  access_token: string;
  session?: { sid?: string } | null;
}): void {
  setAccessToken(bundle.access_token);
  const sid = bundle.session?.sid;
  setSessionSid(typeof sid === "string" ? sid : null);
}
