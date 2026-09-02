"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { APP_ROUTES } from "@/lib/routes";
import {
  getConsoleChromeCopy,
  getConsoleFooterLinks,
  getConsoleNavGroups,
} from "../shared/chrome-copy";
import { ASSET } from "./content";
import { ExternalLinkIcon, getNavIcon } from "../shared/icons";

interface CloudSidebarProps {
  collapsed: boolean;
  /** Nav item key to highlight — defaults to models plaza */
  activeKey?: string;
}

export function CloudSidebar({
  collapsed,
  activeKey = "models-plaza",
}: CloudSidebarProps) {
  const { targetLocale } = useLocale();
  const chrome = getConsoleChromeCopy(targetLocale);
  const navGroups = getConsoleNavGroups(targetLocale);
  const footerLinks = getConsoleFooterLinks(targetLocale);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (collapsed || !activeItemRef.current || !scrollRef.current) return;
    activeItemRef.current.scrollIntoView({ block: "nearest" });
  }, [activeKey, collapsed]);

  return (
    <aside
      className={`relative z-50 flex h-full shrink-0 flex-col bg-transparent transition-[width] duration-200 ease ${
        collapsed ? "w-20" : "w-[200px]"
      }`}
    >
      <Link
        href={APP_ROUTES.home}
        className="flex h-14 w-full shrink-0 items-center justify-center"
      >
        {collapsed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ASSET.logoMark}
            alt={chrome.brandAlt}
            className="h-8 w-8 object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ASSET.logo}
            alt={chrome.brandAlt}
            className="h-[22px] w-auto object-contain"
          />
        )}
      </Link>
      <div
        ref={scrollRef}
        className="hidden-scrollbar relative flex min-h-0 flex-1 flex-col justify-between overflow-y-auto"
      >
        <nav className="flex-1 border-slate-200 bg-transparent pb-[168px]">
          {navGroups.map((group) => (
            <div key={group.key}>
              {!collapsed && (
                <div className="flex items-center px-4 pb-2 pt-4 text-xs text-slate-400">
                  <span>{group.label}</span>
                  {group.badge ? (
                    <span className="ml-2 inline-flex h-5 items-center rounded border-none bg-[var(--sf-tint-solid)] px-[7px] text-xs leading-5 text-[var(--sf-primary)]">
                      {group.badge}
                    </span>
                  ) : null}
                </div>
              )}
              <ul>
                {group.items.map((item) => {
                  const Icon = getNavIcon(item.icon);
                  const active = item.key === activeKey;
                  return (
                    <li key={item.key} className="m-1 list-none">
                      <a
                        ref={active ? activeItemRef : undefined}
                        href={item.href ?? "#"}
                        title={item.label}
                        className={`flex h-10 items-center overflow-hidden rounded-[8px] text-sm leading-10 transition-colors duration-300 ease ${
                          active
                            ? "bg-black/[0.04] text-[var(--sf-primary)]"
                            : "text-slate-800 hover:bg-black/[0.04] hover:text-[var(--sf-primary)]"
                        } ${collapsed ? "justify-center px-0" : "px-4 pl-6"}`}
                      >
                        <Icon className="size-4 shrink-0" />
                        {!collapsed && (
                          <span className="ml-2.5 truncate">{item.label}</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {!collapsed && (
        <div
          className="fixed bottom-0 left-0 z-50 flex flex-col justify-start gap-3 p-5 pl-8 pr-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.85) 30%, rgb(255, 255, 255) 15%)",
            width: 198,
          }}
        >
          {footerLinks.map((link) => {
            const Icon = getNavIcon(link.icon);
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.key}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="flex items-center gap-2 truncate text-slate-700 hover:text-[var(--sf-cloud-primary)]"
              >
                <Icon className="size-[1em] shrink-0" />
                <span className="truncate text-xs">{link.label}</span>
                {external ? <ExternalLinkIcon className="size-3 shrink-0" /> : null}
              </a>
            );
          })}
          <div className="text-[10px] leading-4 text-slate-400">
            {chrome.footer.copyright}
          </div>
        </div>
      )}
    </aside>
  );
}
