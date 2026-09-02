import { getLoginPageMetadata } from "@/lib/auth-page-metadata";
import {
  getMarketingPageMetadata,
  getPricingPageMetadata,
  getReservedPageMetadata,
  getUserAgreementPageMetadata,
} from "@/lib/marketing-page-metadata";
import { pathnameWithoutLocale } from "@/lib/locale-path";
import { APP_ROUTES } from "@/lib/routes";

type PageMeta = { title: string; description: string };
type MetaResolver = (locale: string) => PageMeta;

const RESOLVERS: Record<string, MetaResolver> = {
  [APP_ROUTES.home]: (locale) => getMarketingPageMetadata("home", locale),
  [APP_ROUTES.about]: (locale) => getMarketingPageMetadata("about", locale),
  [APP_ROUTES.brand]: (locale) => getMarketingPageMetadata("brand", locale),
  [APP_ROUTES.news]: (locale) => getMarketingPageMetadata("news", locale),
  [APP_ROUTES.developerTalk]: (locale) =>
    getMarketingPageMetadata("developer-talk", locale),
  [APP_ROUTES.partner]: (locale) => getMarketingPageMetadata("partner", locale),
  [APP_ROUTES.models]: (locale) => getMarketingPageMetadata("models", locale),
  [APP_ROUTES.tokenFactory]: (locale) =>
    getMarketingPageMetadata("token-factory", locale),
  [APP_ROUTES.aiGateway]: (locale) =>
    getMarketingPageMetadata("ai-gateway", locale),
  [APP_ROUTES.enterprise]: (locale) =>
    getMarketingPageMetadata("enterprise", locale),
  [APP_ROUTES.reserved]: (locale) => getReservedPageMetadata(locale),
  [APP_ROUTES.pricing]: (locale) => getPricingPageMetadata(locale),
  [APP_ROUTES.login]: (locale) => getLoginPageMetadata(locale),
  [APP_ROUTES.userAgreement]: (locale) =>
    getUserAgreementPageMetadata(locale),
};

export function resolveDocumentMetadata(
  pathname: string,
  locale: string,
): PageMeta | null {
  const bare = pathnameWithoutLocale(pathname);
  const resolver = RESOLVERS[bare];
  return resolver ? resolver(locale) : null;
}
