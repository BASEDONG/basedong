/** Build provider authorize URLs (redirect_uri = this origin `/oauth/:slug`). */

export function buildGitHubOAuthUrl(clientId: string, state: string): string {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", "user:email");
  return url.toString();
}

export function buildDiscordOAuthUrl(clientId: string, state: string): string {
  const url = new URL("https://discord.com/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set(
    "redirect_uri",
    `${window.location.origin}/oauth/discord`,
  );
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "identify+openid");
  url.searchParams.set("state", state);
  return url.toString();
}

export function buildOIDCOAuthUrl(
  authUrl: string,
  clientId: string,
  state: string,
): string {
  const url = new URL(authUrl);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", `${window.location.origin}/oauth/oidc`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid profile email");
  url.searchParams.set("state", state);
  return url.toString();
}

export function buildLinuxDOOAuthUrl(clientId: string, state: string): string {
  const url = new URL("https://connect.linux.do/oauth2/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("state", state);
  return url.toString();
}

export function buildCustomOAuthUrl(
  authorizationEndpoint: string,
  clientId: string,
  slug: string,
  state: string,
  scopes?: string,
): string {
  const url = new URL(authorizationEndpoint);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set(
    "redirect_uri",
    `${window.location.origin}/oauth/${slug}`,
  );
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);
  if (scopes) url.searchParams.set("scope", scopes);
  return url.toString();
}
