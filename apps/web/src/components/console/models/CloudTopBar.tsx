"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandAvatar } from "@/components/marketing/shared/BrandAvatar";
import { MarketingLanguageSwitcher } from "@/components/marketing/shared/MarketingLanguageSwitcher";
import { useLocale } from "@/components/shared/LocaleProvider";
import { logout, getSelf } from "@/lib/backend/client";
import { APP_ROUTES, consoleHref } from "@/lib/routes";
import { getConsoleChromeCopy } from "../shared/chrome-copy";
import { formatConsoleQuota } from "../shared/format-quota";
import { subscribeSelfUpdated } from "../shared/self-events";
import { MenuFoldIcon, MenuUnfoldIcon } from "../shared/icons";

interface CloudTopBarProps {
  onToggleCollapse: () => void;
  title?: string;
  collapsed?: boolean;
}

const FALLBACK_AVATAR_SEED = "basedong-console-user";

export function CloudTopBar({
  onToggleCollapse,
  title,
  collapsed = false,
}: CloudTopBarProps) {
  const router = useRouter();
  const { targetLocale } = useLocale();
  const chrome = getConsoleChromeCopy(targetLocale);
  const pageTitle = title ?? chrome.pageTitles.modelsPlaza;
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [quotaLabel, setQuotaLabel] = useState<string | null>(null);
  const [userLabel, setUserLabel] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  const avatarMenu = [
    { label: chrome.nav.apiKeys, href: consoleHref(APP_ROUTES.consoleAccountAk) },
    { label: chrome.nav.wallet, href: consoleHref(APP_ROUTES.consoleWallet) },
    { label: chrome.nav.callLogs, href: consoleHref(APP_ROUTES.consoleLogs) },
    { label: chrome.nav.profile, href: consoleHref(APP_ROUTES.consoleProfile) },
  ] as const;

  const avatarSeed = userLabel?.trim() || FALLBACK_AVATAR_SEED;

  const refreshSelf = useCallback(async () => {
    try {
      const self = await getSelf();
      if (typeof self.quota === "number") {
        setQuotaLabel(
          chrome.topbar.quota(formatConsoleQuota(self.quota, targetLocale)),
        );
      }
      const name =
        (typeof self.display_name === "string" && self.display_name.trim()) ||
        (typeof self.username === "string" && self.username.trim()) ||
        null;
      setUserLabel(name);
    } catch {
      // ignore — RequireAuth already gates the page
    }
  }, [chrome.topbar, targetLocale]);

  useEffect(() => {
    void refreshSelf();
  }, [refreshSelf]);

  useEffect(() => subscribeSelfUpdated(() => void refreshSelf()), [refreshSelf]);

  useEffect(() => {
    if (!avatarOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAvatarOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [avatarOpen]);

  async function onLogout() {
    setAvatarOpen(false);
    await logout();
    router.replace(consoleHref(APP_ROUTES.login));
  }

  return (
    <header
      ref={rootRef}
      className="relative z-[60] flex h-[56px] shrink-0 items-center justify-between bg-white/72 p-0 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label={chrome.topbar.menuFold}
        className="flex h-[56px] cursor-pointer items-center justify-center ps-4 pe-3 text-xs font-medium text-zinc-500 transition-colors duration-500 hover:text-black"
      >
        {collapsed ? (
          <MenuUnfoldIcon className="size-4" />
        ) : (
          <MenuFoldIcon className="size-4" />
        )}
      </button>

      <div className="flex h-full flex-1 items-center justify-between">
        <div className="flex items-center gap-4 whitespace-nowrap">
          <div className="text-lg font-bold text-slate-700">{pageTitle}</div>
          {quotaLabel ? (
            <div className="text-sm font-normal text-slate-500">{quotaLabel}</div>
          ) : null}
        </div>

        <div className="flex h-full items-center gap-3 pe-3">
          <MarketingLanguageSwitcher navigateOnSelect={false} />

          <div className="relative">
            <button
              type="button"
              aria-label={chrome.topbar.avatar}
              aria-expanded={avatarOpen}
              onClick={() => setAvatarOpen((v) => !v)}
              className="relative flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-full"
            >
              <BrandAvatar name={avatarSeed} size={32} />
            </button>

            {avatarOpen ? (
              <div className="sf-chat-dropdown-enter absolute top-[calc(100%+8px)] end-0 z-[70] min-w-[160px] overflow-hidden rounded-lg bg-white py-1 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                {userLabel ? (
                  <div className="border-b border-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                    {userLabel}
                  </div>
                ) : null}
                {avatarMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--sf-cloud-primary)]"
                    onClick={() => setAvatarOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-start text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--sf-cloud-primary)]"
                  onClick={() => void onLogout()}
                >
                  {chrome.topbar.logout}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
