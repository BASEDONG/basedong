import { APP_ROUTES } from "@/lib/routes";

/**
 * `/me/*` paths that basedong does not offer. Direct visits show Console 下线页;
 * they must not appear in Console sidebar chrome.
 */
export const CONSOLE_OFFLINE_PATHS = [
  APP_ROUTES.consolePlaygroundImage,
  APP_ROUTES.consolePlaygroundVideo,
  APP_ROUTES.consolePlaygroundTts,
  APP_ROUTES.consoleInvoice,
  APP_ROUTES.consoleBatches,
  APP_ROUTES.consoleInvitation,
  APP_ROUTES.consoleCampaignInviter,
  APP_ROUTES.consoleCampaignRealName,
  APP_ROUTES.consoleAccountAuthentication,
  APP_ROUTES.consoleDedicatedApply,
] as const;

export type ConsoleOfflinePath = (typeof CONSOLE_OFFLINE_PATHS)[number];

const OFFLINE_SET = new Set<string>(CONSOLE_OFFLINE_PATHS);

/** True when pathname (no query/hash; optional trailing slash) is a Console 下线页. */
export function isConsoleOfflinePath(pathname: string): boolean {
  const bare = pathname.replace(/\/+$/, "") || "/";
  return OFFLINE_SET.has(bare);
}
