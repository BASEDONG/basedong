import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_HEADER,
  PREFERRED_LOCALE_COOKIE,
  SOURCE_LOCALE,
  isPrefixedLocale,
  isTranslatedLocale,
} from "@/lib/locale";
import {
  isLocalizablePath,
  localeFromPathname,
  pathnameWithoutLocale,
  withLocalePrefix,
} from "@/lib/locale-path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathLocale = localeFromPathname(pathname);
  const barePath = pathnameWithoutLocale(pathname);

  // Prefixed Translated Locale: rewrite to bare path, set locale header
  if (isPrefixedLocale(pathLocale) && isLocalizablePath(barePath)) {
    const url = request.nextUrl.clone();
    url.pathname = barePath;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, pathLocale);
    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    res.headers.set(LOCALE_HEADER, pathLocale);
    return res;
  }

  // Bare localizable path: Source Locale; Preferred Translated → redirect
  if (isLocalizablePath(barePath) && pathLocale === SOURCE_LOCALE) {
    const preferred = request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value;
    if (
      preferred &&
      isTranslatedLocale(preferred) &&
      isPrefixedLocale(preferred)
    ) {
      const targetPath = withLocalePrefix(barePath, preferred);
      if (targetPath !== pathname) {
        const url = request.nextUrl.clone();
        url.pathname = targetPath;
        return NextResponse.redirect(url);
      }
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, SOURCE_LOCALE);
    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });
    res.headers.set(LOCALE_HEADER, SOURCE_LOCALE);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
