"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandAvatar } from "@/components/marketing/shared/BrandAvatar";
import { logout, getSelf } from "@/lib/backend/client";
import { APP_ROUTES } from "@/lib/routes";
import { BellIcon, MenuFoldIcon, MenuUnfoldIcon } from "../shared/icons";

interface CloudTopBarProps {
  onToggleCollapse: () => void;
  title?: string;
  /** When 0 or omitted as explicit 0, badge is hidden. Default 1 matches most console pages. */
  notificationCount?: number;
  /** Sidebar collapsed — swaps fold/unfold icon to match live console. */
  collapsed?: boolean;
}

const AVATAR_MENU = [
  { label: "API 密钥", href: APP_ROUTES.consoleAccountAk },
  { label: "充值", href: APP_ROUTES.consoleExpenseBill },
  { label: "账单", href: APP_ROUTES.consoleBills },
] as const;

const NOTIFICATION = {
  title: "《隐私政策》更新",
  date: "2026-06-29",
  body: "为了更好地保护您的个人信息与隐私安全，提供更优质、安全的服务，我们根据最新法律法规要求，制定并上线了全新的《隐私政策》。本次上线的《隐私政策》详细说明了以下核心内容：我们如何收集、使用和保护您的个人信息；我们与第三方共享信息的具体情况；您如何行使查阅、更正、删除个人信息以及注销账号等权利。我们强烈建议您仔细阅读更新版 《隐私政策》 的全部内容。如您继续使用我们的服务，即表示您已充分阅读、理解并同意受该政策的约束。我们将一如既往地坚守安全底线，为您提供安全可靠的服务体验。感谢您对八色鸫的信任与支持！",
};

const CONSOLE_AVATAR_SEED = "basedong-console-user";

export function CloudTopBar({
  onToggleCollapse,
  title = "模型广场",
  notificationCount = 1,
  collapsed = false,
}: CloudTopBarProps) {
  const router = useRouter();
  const [bellOpen, setBellOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [quotaLabel, setQuotaLabel] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    void (async () => {
      try {
        const self = await getSelf();
        if (typeof self.quota === "number") {
          setQuotaLabel(`额度 ${self.quota}`);
        }
      } catch {
        // ignore — RequireAuth already gates the page
      }
    })();
  }, []);

  useEffect(() => {
    if (!bellOpen && !avatarOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setBellOpen(false);
        setAvatarOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBellOpen(false);
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [bellOpen, avatarOpen]);

  async function onLogout() {
    setAvatarOpen(false);
    await logout();
    router.replace(APP_ROUTES.loginEmail);
  }

  return (
    <header
      ref={rootRef}
      className="relative z-50 flex h-[56px] items-center justify-between bg-white/72 p-0 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label="menu-fold"
        className="flex h-[56px] cursor-pointer items-center justify-center pl-4 pr-3 text-xs font-medium text-zinc-500 transition-colors duration-500 hover:text-black"
      >
        {collapsed ? (
          <MenuUnfoldIcon className="size-4" />
        ) : (
          <MenuFoldIcon className="size-4" />
        )}
      </button>

      <div className="flex h-full flex-1 items-center justify-between">
        <div className="flex items-center gap-4 whitespace-nowrap">
          <div className="text-lg font-bold text-slate-700">{title}</div>
          {quotaLabel ? (
            <div className="text-sm font-normal text-slate-500">{quotaLabel}</div>
          ) : null}
        </div>

        <div className="flex h-full items-center gap-3 pr-3">
          <div className="relative">
            <button
              type="button"
              aria-label="notifications"
              aria-expanded={bellOpen}
              onClick={() => {
                setBellOpen((v) => !v);
                setAvatarOpen(false);
              }}
              className="relative flex size-8 cursor-pointer items-center justify-center text-[#475569]"
            >
              <BellIcon className="size-4" />
              {notificationCount > 0 ? (
                <sup className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff4d4f] px-1 text-[10px] leading-none text-white">
                  {notificationCount}
                </sup>
              ) : null}
            </button>

            {bellOpen ? (
              <div className="sf-chat-dropdown-enter absolute top-[calc(100%+8px)] right-0 z-[70] w-[360px] rounded-lg bg-white p-4 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <div className="text-sm font-medium text-slate-800">
                    {NOTIFICATION.title}
                  </div>
                  <div className="shrink-0 text-xs text-slate-400">
                    {NOTIFICATION.date}
                  </div>
                </div>
                <div className="max-h-[240px] overflow-y-auto text-xs leading-5 text-slate-600">
                  {NOTIFICATION.body}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="avatar"
              aria-expanded={avatarOpen}
              onClick={() => {
                setAvatarOpen((v) => !v);
                setBellOpen(false);
              }}
              className="relative flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-full"
            >
              <BrandAvatar name={CONSOLE_AVATAR_SEED} size={32} />
            </button>

            {avatarOpen ? (
              <div className="sf-chat-dropdown-enter absolute top-[calc(100%+8px)] right-0 z-[70] min-w-[160px] overflow-hidden rounded-lg bg-white py-1 shadow-[0_6px_16px_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]">
                {AVATAR_MENU.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--sf-cloud-primary)]"
                    onClick={() => setAvatarOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--sf-cloud-primary)]"
                  onClick={() => void onLogout()}
                >
                  退出登录
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
