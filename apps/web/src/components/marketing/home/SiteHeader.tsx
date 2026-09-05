"use client";

import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Box,
  Building,
  Building2,
  ChevronDown,
  Cloud,
  Cpu,
  Menu,
  MessagesSquare,
  Network,
  Newspaper,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { MarketingButton } from "@/components/marketing/shared/MarketingButton";
import { MarketingIconBadge } from "@/components/marketing/shared/MarketingIconBadge";
import { MarketingLanguageSwitcher } from "@/components/marketing/shared/MarketingLanguageSwitcher";
import { NavAnchor } from "@/components/marketing/shared/NavAnchor";
import { SfBackToTop } from "@/components/marketing/shared/SfBackToTop";
import {
  getChromeCopy,
  type ChromeCopy,
} from "@/components/marketing/shared/chrome-copy";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useLocale } from "@/components/shared/LocaleProvider";
import { pathnameWithoutLocale } from "@/lib/locale-path";
import {
  ABOUT_MENU_ENABLED,
  APP_ROUTES,
  DOCS_CENTER_ENABLED,
  PARTNER_PAGE_ENABLED,
  RESERVED_PAGE_ENABLED,
} from "@/lib/routes";
import { cn } from "@/lib/utils";

type MenuLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

function buildProductGroups(c: ChromeCopy): { title: string; items: MenuLink[] }[] {
  return [
    {
      title: "AI Cloud",
      items: [
        { label: c.nav.cloudMaas, href: APP_ROUTES.consoleModels, icon: Cloud },
        {
          label: c.nav.tokenFactory,
          href: APP_ROUTES.tokenFactory,
          icon: Cpu,
        },
        ...(RESERVED_PAGE_ENABLED
          ? [{ label: c.nav.reserved, href: APP_ROUTES.reserved, icon: Box }]
          : []),
      ],
    },
    {
      title: c.nav.privateMaas,
      items: [
        {
          label: c.nav.privatePlatform,
          href: APP_ROUTES.enterprise,
          icon: Building2,
        },
        {
          label: c.nav.privateGateway,
          href: APP_ROUTES.aiGateway,
          icon: Network,
        },
      ],
    },
  ];
}

function buildAboutMenu(c: ChromeCopy): MenuLink[] {
  if (!ABOUT_MENU_ENABLED) return [];
  return [
    { label: c.nav.company, href: APP_ROUTES.about, icon: Building },
    { label: c.nav.brand, href: APP_ROUTES.brand, icon: Sparkles },
    { label: c.nav.news, href: APP_ROUTES.news, icon: Newspaper },
    {
      label: c.nav.developerTalk,
      href: APP_ROUTES.developerTalk,
      icon: MessagesSquare,
    },
  ];
}

function buildNavLinks(c: ChromeCopy) {
  return [
    { label: c.nav.models, href: APP_ROUTES.models },
    { label: c.nav.pricing, href: APP_ROUTES.pricing },
    ...(DOCS_CENTER_ENABLED
      ? [{ label: c.nav.docs, href: APP_ROUTES.docsIntroduction }]
      : []),
    ...(PARTNER_PAGE_ENABLED
      ? [{ label: c.nav.partner, href: APP_ROUTES.partner }]
      : []),
  ];
}

function MenuItemIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <MarketingIconBadge
      icon={Icon}
      size="sm"
      bg="#4AABF01A"
      className="shrink-0"
    />
  );
}

function ProductDropdown({
  pathname,
  groups,
}: {
  pathname: string;
  groups: { title: string; items: MenuLink[] }[];
}) {
  return (
    <div className="rounded-[16px] bg-white shadow-xl">
      <div className="p-5">
        {groups.map((group) => (
          <div key={group.title} className="mb-[18px] min-w-[220px] last:mb-0">
            <div className="mb-2.5 text-sm font-semibold text-[#4AABF0]">
              {group.title}
            </div>
            <div className="flex flex-col gap-1.5">
              {group.items.map((item) => (
                <NavAnchor
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 text-sm text-slate-800 transition-colors hover:bg-[#EEF6FE]",
                    pathname === item.href &&
                      "rounded-lg bg-[#4AABF0]/10 px-2.5 py-2 font-medium text-[#4AABF0]",
                  )}
                >
                  <MenuItemIcon icon={item.icon} />
                  {item.label}
                </NavAnchor>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutDropdown({
  pathname,
  aboutMenu,
}: {
  pathname: string;
  aboutMenu: MenuLink[];
}) {
  return (
    <div className="w-max min-w-[180px] rounded-[16px] bg-white shadow-xl">
      <div className="flex w-max flex-col gap-[6px] px-[6px] py-[20px]">
        {aboutMenu.map((item) => (
          <NavAnchor
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 whitespace-nowrap rounded-[20px] px-3.5 py-2 text-[14px] leading-none text-slate-800 transition-colors hover:bg-[#EEF6FE]",
              pathname === item.href &&
                "rounded-lg bg-[#4AABF0]/10 font-medium text-[#4AABF0]",
            )}
          >
            <MenuItemIcon icon={item.icon} />
            {item.label}
          </NavAnchor>
        ))}
      </div>
    </div>
  );
}

function MobileMenuLink({
  item,
  pathname,
}: {
  item: MenuLink;
  pathname: string;
}) {
  return (
    <NavAnchor
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 py-1.5 pl-3 text-sm",
        pathname === item.href
          ? "font-medium text-[#4AABF0]"
          : "text-slate-800",
      )}
    >
      <MenuItemIcon icon={item.icon} />
      {item.label}
    </NavAnchor>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const barePath = pathnameWithoutLocale(pathname);
  const { locale, href } = useLocale();
  const c = getChromeCopy(locale);
  const productGroups = useMemo(() => buildProductGroups(c), [c]);
  const aboutMenu = useMemo(() => buildAboutMenu(c), [c]);
  const navLinks = useMemo(() => buildNavLinks(c), [c]);

  const [openMenu, setOpenMenu] = useState<"product" | "about" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isProductActive =
    openMenu === "product" ||
    barePath === APP_ROUTES.tokenFactory ||
    (RESERVED_PAGE_ENABLED && barePath === APP_ROUTES.reserved) ||
    barePath === APP_ROUTES.enterprise ||
    barePath === APP_ROUTES.aiGateway;
  const isAboutActive =
    openMenu === "about" ||
    barePath === APP_ROUTES.brand ||
    barePath === APP_ROUTES.about ||
    barePath === APP_ROUTES.news ||
    barePath === APP_ROUTES.developerTalk;

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full bg-white/72 px-4 py-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 max-[960px]:bg-white/95 max-[960px]:px-4 max-[960px]:py-2.5 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BrandLogo
              size="nav"
              priority
              alt={c.brandAlt}
              href={href(APP_ROUTES.home)}
              linkClassName="relative flex h-[46px] items-center"
              aria-label={c.homeAria}
            />

            <nav className="hidden items-center gap-9 pl-20 lg:flex">
              <div
                className="relative shrink-0"
                onMouseEnter={() => setOpenMenu("product")}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "flex cursor-pointer items-center gap-1 text-base text-slate-800 transition-colors duration-150 hover:text-[#4AABF0]",
                    isProductActive && "text-[#4AABF0]",
                  )}
                >
                  {c.nav.products}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
                <div
                  className={cn(
                    "absolute left-0 top-full z-50 w-max origin-top pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    openMenu === "product"
                      ? "pointer-events-auto opacity-100 [transform:scaleY(1)]"
                      : "pointer-events-none opacity-0 [transform:scaleY(0.8)]",
                  )}
                  aria-hidden={openMenu !== "product"}
                >
                  <ProductDropdown pathname={barePath} groups={productGroups} />
                </div>
              </div>

              {navLinks.map((link) => (
                <NavAnchor
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-base text-slate-800 transition-colors duration-150 hover:text-[#4AABF0]",
                    barePath === link.href && "text-[#4AABF0]",
                  )}
                >
                  {link.label}
                  {"external" in link && link.external ? (
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  ) : null}
                </NavAnchor>
              ))}

              {ABOUT_MENU_ENABLED ? (
                <div
                  className="relative shrink-0"
                  onMouseEnter={() => setOpenMenu("about")}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex cursor-pointer items-center gap-1 text-base text-slate-800 transition-colors duration-150 hover:text-[#4AABF0]",
                      isAboutActive && "text-[#4AABF0]",
                    )}
                  >
                    {c.nav.about}
                    <ChevronDown className="h-4 w-4" aria-hidden />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 w-max origin-top pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      openMenu === "about"
                        ? "pointer-events-auto opacity-100 [transform:scaleY(1)]"
                        : "pointer-events-none opacity-0 [transform:scaleY(0.8)]",
                    )}
                    aria-hidden={openMenu !== "about"}
                  >
                    <AboutDropdown pathname={barePath} aboutMenu={aboutMenu} />
                  </div>
                </div>
              ) : null}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <MarketingLanguageSwitcher />
            <MarketingButton
              href={APP_ROUTES.login}
              size="sm"
              className="hidden lg:flex"
            >
              {c.nav.login}
            </MarketingButton>
            <button
              type="button"
              aria-label={c.menuAria}
              className="flex h-9 w-9 items-center justify-center rounded border border-black/10 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "border-t border-black/5 bg-white px-4 py-4 lg:hidden",
            mobileOpen ? "block" : "hidden",
          )}
        >
          <div className="flex flex-col gap-3 text-base text-slate-800">
            {productGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-1 text-sm font-semibold text-[#4AABF0]">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <MobileMenuLink
                    key={item.href}
                    item={item}
                    pathname={barePath}
                  />
                ))}
              </div>
            ))}
            {navLinks.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                className={cn(
                  "block py-1.5 pl-3 text-sm",
                  barePath === link.href
                    ? "font-medium text-[#4AABF0]"
                    : "text-slate-800",
                )}
              >
                {link.label}
              </NavAnchor>
            ))}
            {ABOUT_MENU_ENABLED ? (
              <>
                <p className="font-medium">{c.nav.about}</p>
                {aboutMenu.map((item) => (
                  <MobileMenuLink
                    key={item.href}
                    item={item}
                    pathname={barePath}
                  />
                ))}
              </>
            ) : null}
            <MarketingButton
              href={APP_ROUTES.login}
              size="sm"
              className="mt-2 w-fit"
            >
              {c.nav.login}
            </MarketingButton>
          </div>
        </div>
      </header>
      <SfBackToTop />
    </>
  );
}
