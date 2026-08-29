/** Backend (basedong-api) control-plane base URL for the static Web SPA. */
export function getApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE?.trim() ?? "";
  return raw.replace(/\/$/, "");
}

export function assertApiBase(): string {
  const base = getApiBase();
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE is not set. Point it at basedong-api (e.g. http://localhost:3000).",
    );
  }
  return base;
}
