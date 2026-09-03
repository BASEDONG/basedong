/** Set false to hide the reserved-instances marketing page and its nav links. */
export const RESERVED_PAGE_ENABLED = false;

/** Set false to hide the partner (生态合作) marketing page and its nav links. */
export const PARTNER_PAGE_ENABLED = false;

/** Set false to hide the About menu (关于) and its linked marketing pages. */
export const ABOUT_MENU_ENABLED = false;

/** Set false to hide docs center links in marketing nav and console sidebar. */
export const DOCS_CENTER_ENABLED = true;

/** 发票 is not supported by basedong Backend — keep Console entry hidden. */
export const INVOICE_ENABLED = false;

/** Canonical in-app routes (URL paths stay stable across restructures). */
export const APP_ROUTES = {
  home: "/",
  tokenFactory: "/token-factory",
  reserved: "/reserved",
  enterprise: "/enterprise",
  aiGateway: "/ai-gateway",
  models: "/models",
  pricing: "/pricing",
  brand: "/brand",
  about: "/about",
  news: "/news",
  developerTalk: "/developer-talk",
  partner: "/partner",
  /** Local docs shell; content adapted from New API AI model APIs. */
  docsIntroduction: "/docs/api",
  login: "/login",
  /** @deprecated Use APP_ROUTES.login — email is the only auth path now. */
  loginEmail: "/login",
  consoleModels: "/me/models",
  consoleBatches: "/me/batches",
  /** @deprecated Prefer consoleLogs — kept for redirect. */
  consoleBills: "/me/bills",
  consoleInvoice: "/me/invoice",
  /** @deprecated Prefer consoleWallet — kept for redirect. */
  consoleExpenseBill: "/me/expensebill",
  consoleInvitation: "/me/invitation",
  consoleAccountAk: "/me/account/ak",
  consoleAccountAuthentication: "/me/account/authentication",
  consoleDedicatedApply: "/me/dedicated/apply",
  consoleCampaignInviter: "/me/campaigns/inviter",
  consoleCampaignRealName: "/me/campaigns/real-name",
  consolePlaygroundChat: "/me/playground/chat",
  consolePlaygroundImage: "/me/playground/image",
  consolePlaygroundTts: "/me/playground/text-to-speech",
  consolePlaygroundVideo: "/me/playground/video",
  consoleOverview: "/me/overview",
  consoleLogs: "/me/logs",
  consoleLogsDrawing: "/me/logs/drawing",
  consoleLogsTasks: "/me/logs/tasks",
  consoleWallet: "/me/wallet",
  consoleProfile: "/me/profile",
  formBusiness: "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb",
  formSupport: "/share/base/form/shrcnDiK9EIkGN3sK0PepqN1Ppb",
  /** 用户使用声明与合规使用协议（短链文案多为「用户协议」） */
  userAgreement: "/legals/user-agreement",
} as const;

const ABOUT_MENU_ROUTES = new Set<string>([
  APP_ROUTES.about,
  APP_ROUTES.brand,
  APP_ROUTES.news,
  APP_ROUTES.developerTalk,
]);

export function isMarketingRouteEnabled(href: string): boolean {
  if (!RESERVED_PAGE_ENABLED && href === APP_ROUTES.reserved) return false;
  if (!PARTNER_PAGE_ENABLED && href === APP_ROUTES.partner) return false;
  if (!ABOUT_MENU_ENABLED && ABOUT_MENU_ROUTES.has(href)) return false;
  if (!DOCS_CENTER_ENABLED && href === APP_ROUTES.docsIntroduction) return false;
  return true;
}

export function filterEnabledLinks<T extends { href: string }>(links: T[]): T[] {
  return links.filter((link) => isMarketingRouteEnabled(link.href));
}

/** @deprecated Use APP_ROUTES */
export const CLONED_ROUTES = APP_ROUTES;

export function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

const LOCAL_FORM_PATHS: Record<string, string> = {
  shrcn2G8XKaFfNasfwD1lgDUbcb: APP_ROUTES.formBusiness,
  shrcnDiK9EIkGN3sK0PepqN1Ppb: APP_ROUTES.formSupport,
  /** Uncloned Feishu forms → nearest local form */
  shrcnFexyHcMNEntvR08shp8Tbd: APP_ROUTES.formBusiness,
  shrcnsVyHOdT78tTRfUQo2KtO7f: APP_ROUTES.formBusiness,
  shrcnGqeuLHP7ByyGXcS1Gls9hd: APP_ROUTES.formBusiness,
  shrcnN8lrKXCbYJQScKDTNsAuHc: APP_ROUTES.formSupport,
};

const MARKETING_PATH_MAP: Record<string, string> = {
  "/": APP_ROUTES.home,
  "/token-factory": APP_ROUTES.tokenFactory,
  "/reserved": APP_ROUTES.reserved,
  "/enterprise": APP_ROUTES.enterprise,
  "/ai-gateway": APP_ROUTES.aiGateway,
  "/models": APP_ROUTES.models,
  "/pricing": APP_ROUTES.pricing,
  "/brand": APP_ROUTES.brand,
  "/about": APP_ROUTES.about,
  "/news": APP_ROUTES.news,
  "/developer-talk": APP_ROUTES.developerTalk,
  "/partner": APP_ROUTES.partner,
};

function hostKey(href: string): string {
  try {
    const u = new URL(href);
    return `${u.hostname}${u.pathname.replace(/\/$/, "") || "/"}`;
  } catch {
    return href;
  }
}

function mapCloudPath(pathname: string): string | null {
  if (!pathname || pathname === "/" || pathname === "/models") {
    return APP_ROUTES.consoleModels;
  }
  if (pathname.startsWith("/me/") || pathname.startsWith("/account/")) {
    return pathname.replace(/^\/account/, "/me/account");
  }
  return null;
}

function mapDocsPath(pathname: string): string | null {
  if (!pathname || pathname === "/" || pathname === "/docs") {
    return APP_ROUTES.docsIntroduction;
  }
  if (
    pathname.includes("/legals/terms-of-service") ||
    pathname.includes("/legals/privacy-policy") ||
    pathname.includes("/legals/recharge-policy")
  ) {
    return APP_ROUTES.userAgreement;
  }
  // SiliconFlow guide/API trees are not mirrored — collapse to local docs hub
  if (pathname.startsWith("/docs/")) {
    return APP_ROUTES.docsIntroduction;
  }
  return null;
}

function mapMarketingLegalPath(pathname: string): string | null {
  if (
    pathname.includes("/legals/terms-of-service") ||
    pathname.includes("/legals/privacy-policy") ||
    pathname.includes("/cn/legals/")
  ) {
    return APP_ROUTES.userAgreement;
  }
  return null;
}

function mapFeishuForm(pathname: string): string | null {
  const match = pathname.match(/\/share\/base\/form\/([^/?]+)/);
  if (!match) return null;
  const local = LOCAL_FORM_PATHS[match[1]];
  return local ?? null;
}

/**
 * Rewrite known SiliconFlow clone-origin URLs to local app paths.
 * Unmapped URLs stay external unless a host mapper returns a local path.
 */
export function resolveLocalHref(href: string): string {
  if (!href || isInternalHref(href)) return href;

  const trimmed = href.trim();
  if (!trimmed.startsWith("http")) return href;

  const url = new URL(trimmed);
  const host = url.hostname.toLowerCase();
  const path = url.pathname.replace(/\/$/, "") || "/";

  if (host === "siliconflow.cn" || host === "www.siliconflow.cn") {
    const legal = mapMarketingLegalPath(path);
    if (legal) return legal;
    const local = MARKETING_PATH_MAP[path];
    if (local) return local;
    if (path.startsWith("/news")) return APP_ROUTES.news;
    if (path.startsWith("/developer-talk")) return APP_ROUTES.developerTalk;
    return href;
  }

  if (host === "docs.siliconflow.cn") {
    const legal = mapMarketingLegalPath(path);
    if (legal) return legal;
    return APP_ROUTES.docsIntroduction;
  }

  if (host === "cloud.siliconflow.cn") {
    const local = mapCloudPath(path);
    if (local) return local;
    return href;
  }

  if (host === "account.siliconflow.cn") {
    if (path.startsWith("/zh/login") || path.startsWith("/login")) {
      return APP_ROUTES.login;
    }
    if (path.includes("/user/settings") || path.includes("/zh/user")) {
      return APP_ROUTES.consoleAccountAk;
    }
    return href;
  }

  if (host === "api-docs.siliconflow.cn") {
    const legal = mapDocsPath(path);
    if (legal) return legal;
    // SF guide/API paths are not mirrored 1:1 — send users to local docs hub
    return APP_ROUTES.docsIntroduction;
  }

  if (host === "siliconflow.feishu.cn") {
    const local = mapFeishuForm(path);
    if (local) return local;
    return href;
  }

  void hostKey;
  return href;
}
