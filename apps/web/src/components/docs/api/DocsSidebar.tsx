"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  ChevronDownIcon,
  LanguagesIcon,
  PanelLeftIcon,
  SearchIcon,
} from "@/components/docs/shared/icons";
import { BrandLogo } from "@/components/shared/BrandLogo";
import {
  DOCS_LOCALES,
  DOCS_LOCALE_LABELS,
  type DocsLocale,
  switchDocsApiPath,
} from "@/lib/docs-locale";
import { cn } from "@/lib/utils";

import { logoHref } from "./brand";
import type { NavFolder, NavItem, NavLink, NavMethod, NavSection } from "./content-types";
import { getDocsUiCopy } from "./docs-ui-copy";

function MethodBadge({ method }: { method: NavMethod }) {
  return (
    <span
      className={cn(
        "ms-auto shrink-0 text-nowrap font-mono text-xs font-medium",
        method === "POST"
          ? "text-blue-600"
          : method === "DELETE"
            ? "text-red-600"
            : "text-green-600",
      )}
    >
      {method}
    </span>
  );
}

function NavRail({ active }: { active?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-y-3 start-2.5 z-[2] w-px md:inset-y-2",
        active ? "bg-[#4AABF0]" : "bg-transparent",
      )}
    />
  );
}

function NavLinkRow({
  item,
  indented = true,
  indentClass,
  active,
}: {
  item: NavLink;
  indented?: boolean;
  indentClass?: string;
  active: boolean;
}) {
  const className = cn(
    "relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-sm [overflow-wrap:anywhere] transition-colors md:py-1.5 [&_svg]:size-4 [&_svg]:shrink-0",
    indented ? (indentClass ?? "ps-6") : "px-2",
    active
      ? "bg-[color-mix(in_oklab,#4AABF0_10%,transparent)] text-[#4AABF0]"
      : "text-[#737373] hover:bg-[#e6e6e6]/50 hover:text-[#171717]/80",
  );

  return (
    <Link
      href={item.href}
      className={className}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
    >
      {indented ? <NavRail active={active} /> : null}
      <span className="min-w-0 flex-1">{item.label}</span>
      {item.method ? <MethodBadge method={item.method} /> : null}
    </Link>
  );
}

function SectionBlock({
  section,
  pathname,
  depth = 0,
  first = false,
  groupRail = true,
}: {
  section: NavSection;
  pathname: string;
  depth?: number;
  first?: boolean;
  groupRail?: boolean;
}) {
  const pad =
    depth === 0 ? "ps-6" : depth === 1 ? "ps-8" : "ps-10";
  const linkIndent =
    depth === 0 ? "ps-6" : depth === 1 ? "ps-10" : "ps-12";

  return (
    <div>
      <p
        className={cn(
          "mb-1.5 inline-flex items-center gap-2 px-2 text-sm font-medium text-[#0a0a0a] empty:mb-0",
          pad,
          first ? "mt-0" : depth === 0 ? "mt-6" : "mt-3",
        )}
      >
        {section.label}
      </p>
      <div className="relative flex flex-col">
        {groupRail && depth === 0 ? (
          <div className="absolute inset-y-1 start-2.5 w-px bg-[rgba(158,158,158,0.2)]" />
        ) : null}
        {section.children.map((child, index) => {
          if (child.type === "section") {
            return (
              <SectionBlock
                key={child.label}
                section={child}
                pathname={pathname}
                depth={depth + 1}
                first={index === 0}
                groupRail={false}
              />
            );
          }
          return (
            <NavLinkRow
              key={child.href + child.label}
              item={child}
              indented
              indentClass={linkIndent}
              active={pathname === child.href}
            />
          );
        })}
      </div>
    </div>
  );
}

function FolderBlock({
  folder,
  pathname,
}: {
  folder: NavFolder;
  pathname: string;
}) {
  const [open, setOpen] = useState(folder.defaultOpen);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex w-full flex-row items-center gap-2 rounded-lg p-2 text-start text-sm text-[#0a0a0a] [overflow-wrap:anywhere] transition-colors hover:bg-[#e6e6e6]/50 hover:text-[#171717]/80 md:py-1.5 [&_svg]:size-4 [&_svg]:shrink-0"
      >
        <span className="min-w-0 flex-1">{folder.label}</span>
        <ChevronDownIcon
          className={cn(
            "ms-auto size-4 shrink-0 transition-transform",
            open ? "rotate-0" : "-rotate-90",
          )}
        />
      </button>
      {open ? (
        <div className="relative flex flex-col">
          {folder.children.length > 0 ? (
            <div className="absolute inset-y-1 start-2.5 w-px bg-[rgba(158,158,158,0.2)]" />
          ) : null}
          {folder.children.map((child, index) => {
            if (child.type === "link") {
              return (
                <NavLinkRow
                  key={child.href + child.label}
                  item={child}
                  indented
                  active={pathname === child.href}
                />
              );
            }
            return (
              <SectionBlock
                key={child.label}
                section={child}
                pathname={pathname}
                first={index === 0}
                groupRail={false}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function renderItem(item: NavItem, pathname: string) {
  if (item.type === "folder") {
    return <FolderBlock key={item.label} folder={item} pathname={pathname} />;
  }
  if (item.type === "section") {
    return (
      <SectionBlock
        key={item.label}
        section={item}
        pathname={pathname}
        depth={0}
        groupRail={false}
      />
    );
  }
  return (
    <NavLinkRow
      key={item.href + item.label}
      item={item}
      indented={false}
      active={pathname === item.href}
    />
  );
}

function DocsLanguageSwitcher({
  docsLocale,
  pathname,
}: {
  docsLocale: DocsLocale;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ui = getDocsUiCopy(docsLocale);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={ui.switchLanguage}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center gap-1.5 rounded-md p-1.5 text-sm text-[#0a0a0a] transition-colors hover:bg-[#e6e6e6] hover:text-[#171717]"
      >
        <LanguagesIcon className="size-4" />
        <span className="text-xs font-medium">{DOCS_LOCALE_LABELS[docsLocale]}</span>
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close language menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute bottom-full end-0 z-20 mb-2 min-w-[9rem] rounded-lg border border-[#9e9e9e]/20 bg-white py-1 shadow-lg"
          >
            {DOCS_LOCALES.map((locale) => (
              <Link
                key={locale}
                role="menuitem"
                href={switchDocsApiPath(pathname, locale)}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm transition-colors hover:bg-[#e6e6e6]/70",
                  locale === docsLocale
                    ? "font-medium text-[#4AABF0]"
                    : "text-[#0a0a0a]",
                )}
                aria-current={locale === docsLocale ? "true" : undefined}
              >
                {DOCS_LOCALE_LABELS[locale]}
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function DocsSidebar({
  docsLocale,
  items,
  className,
  onNavigate,
}: {
  docsLocale: DocsLocale;
  items: NavItem[];
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const ui = getDocsUiCopy(docsLocale);

  return (
    <aside
      id="nd-sidebar"
      className={cn(
        "flex h-full w-full flex-col border-[#9e9e9e]/20 bg-white text-sm text-[#0a0a0a] md:border-e",
        className,
      )}
    >
      <div className="flex flex-col gap-3 p-4 pb-2">
        <div className="flex max-md:hidden">
          <a
            href={logoHref}
            className="inline-flex items-center gap-2.5 text-[15px] font-medium"
          >
            <BrandLogo size="nav" priority />
          </a>
          <button
            type="button"
            aria-label="Collapse Sidebar"
            className="mb-auto ms-auto inline-flex items-center justify-center rounded-md p-1.5 text-[#737373] transition-colors hover:bg-[#e6e6e6] hover:text-[#171717] max-md:hidden [&_svg]:size-[18px]"
          >
            <PanelLeftIcon />
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-full items-center gap-2 rounded-lg border border-[#9e9e9e]/20 bg-[#ededed]/50 p-1.5 ps-2 text-sm text-[#737373] transition-colors hover:bg-[#e6e6e6] hover:text-[#171717]"
        >
          <SearchIcon className="size-4 shrink-0" />
          <span>{ui.search}</span>
          <span className="ms-auto inline-flex gap-0.5">
            <kbd className="rounded-md border border-[#9e9e9e]/20 bg-white px-1.5 text-sm leading-[22px]">
              Ctrl
            </kbd>
            <kbd className="rounded-md border border-[#9e9e9e]/20 bg-white px-1.5 text-sm leading-[22px]">
              K
            </kbd>
          </span>
        </button>
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:thin]"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a") && onNavigate) onNavigate();
        }}
      >
        <div className="flex flex-col pb-2">
          {items.map((item) => renderItem(item, pathname))}
        </div>
      </nav>

      <div className="relative flex flex-col border-t border-[#9e9e9e]/20 px-4 py-3">
        <div className="flex items-center justify-end">
          <DocsLanguageSwitcher docsLocale={docsLocale} pathname={pathname} />
        </div>
      </div>
    </aside>
  );
}
