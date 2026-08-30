/** Backend (apps/api) control-plane / Relay origin for the static Web SPA. */
export function getApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE?.trim() ?? "";
  return raw.replace(/\/$/, "");
}

/**
 * OpenAI-compatible Relay base URL (same origin as control-plane in apps/api).
 * Clients call `{relayBase}/v1/chat/completions` with an API Key.
 */
export function getRelayBase(): string {
  return getApiBase();
}

export function assertApiBase(): string {
  const base = getApiBase();
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE is not set. Point it at apps/api (e.g. http://localhost:3000).",
    );
  }
  return base;
}
