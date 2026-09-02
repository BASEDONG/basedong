import { APP_ROUTES, isInternalHref, resolveLocalHref as resolveLocalHrefBase } from "@/lib/routes";
import {
  SOURCE_LOCALE,
  catalogLocale,
  isPrefixedLocale,
  type Locale,
} from "@/lib/locale";

const NON_LOCALIZABLE_PREFIXES = [
  "/me",
  "/docs",
  "/share",
  "/_next",
  "/assets",
  "/api",
] as const;

const LOCALIZABLE_PATHS = new Set<string>([
  APP_ROUTES.home,
  APP_ROUTES.tokenFactory,
  APP_ROUTES.reserved,
  APP_ROUTES.enterprise,
  APP_ROUTES.aiGateway,
  APP_ROUTES.models,
  APP_ROUTES.pricing,
  APP_ROUTES.brand,
  APP_ROUTES.about,
  APP_ROUTES.news,
  APP_ROUTES.developerTalk,
  APP_ROUTES.partner,
  APP_ROUTES.login,
  APP_ROUTES.userAgreement,
]);

export function pathnameWithoutLocale(pathname: string): string {
  const cleaned = pathname.replace(/\/$/, "") || "/";
  const segments = cleaned.split("/");
  if (segments.length >= 2 && isPrefixedLocale(segments[1])) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return cleaned === "" ? "/" : cleaned;
}

export function localeFromPathname(pathname: string): Locale {
  const cleaned = pathname.replace(/\/$/, "") || "/";
  const segments = cleaned.split("/");
  if (segments.length >= 2 && isPrefixedLocale(segments[1])) {
    return segments[1];
  }
  return SOURCE_LOCALE;
}

function splitPath(pathname: string): {
  path: string;
  search: string;
  hash: string;
} {
  const hashIdx = pathname.indexOf("#");
  const withHash = hashIdx >= 0 ? pathname.slice(0, hashIdx) : pathname;
  const hash = hashIdx >= 0 ? pathname.slice(hashIdx) : "";
  const qIdx = withHash.indexOf("?");
  if (qIdx >= 0) {
    return {
      path: withHash.slice(0, qIdx) || "/",
      search: withHash.slice(qIdx),
      hash,
    };
  }
  return { path: withHash || "/", search: "", hash };
}

export function isLocalizablePath(pathname: string): boolean {
  const path = pathnameWithoutLocale(pathname);
  if (
    NON_LOCALIZABLE_PREFIXES.some(
      (p) => path === p || path.startsWith(`${p}/`),
    )
  ) {
    return false;
  }
  if (LOCALIZABLE_PATHS.has(path)) return true;
  if (path.startsWith("/legals/")) return true;
  if (path.startsWith("/news/")) return true;
  return false;
}

/**
 * Apply Locale prefix to an already-local path.
 * Non-localizable paths (console/docs/forms) stay bare.
 */
export function withLocalePrefix(pathname: string, locale: Locale): string {
  if (!pathname || !isInternalHref(pathname)) return pathname;

  const { path, search, hash } = splitPath(pathname);
  const bare = pathnameWithoutLocale(path);
  if (!isLocalizablePath(bare)) {
    return `${bare}${search}${hash}`;
  }

  const effective = catalogLocale(locale);
  if (!isPrefixedLocale(effective)) {
    return `${bare}${search}${hash}`;
  }

  const prefixed = bare === "/" ? `/${effective}` : `/${effective}${bare}`;
  return `${prefixed}${search}${hash}`;
}

/**
 * Resolve external/clone URLs to local paths, then apply Locale prefix
 * for Marketing/Auth. Console/Docs/Forms stay bare.
 */
export function resolveLocalHref(
  href: string,
  locale: Locale = SOURCE_LOCALE,
): string {
  const local = resolveLocalHrefBase(href);
  if (!isInternalHref(local)) return local;
  return withLocalePrefix(local, locale);
}

export { resolveLocalHrefBase };
