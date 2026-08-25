"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import {
  ChevronDownIcon,
  CloseIcon,
  CloudMenuIcon,
  DocsExternalIcon,
  EnterpriseMenuIcon,
  GatewayMenuIcon,
  MenuIcon,
  ReservedMenuIcon,
  TokenFactoryMenuIcon,
} from "@/components/marketing/shared/icons";
import { MarketingLanguageSwitcher } from "@/components/marketing/shared/MarketingLanguageSwitcher";
import { NavAnchor } from "@/components/marketing/shared/NavAnchor";
import { SfBackToTop } from "@/components/marketing/shared/SfBackToTop";
import { APP_ROUTES, RESERVED_PAGE_ENABLED } from "@/lib/routes";
import { BRAND } from "@/lib/assets";
import { cn } from "@/lib/utils";

type MenuLink = {
  label: string;
  href: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

const productGroups: { title: string; items: MenuLink[] }[] = [
  {
    title: "AI Cloud",
    items: [
      {
        label: "大模型云服务",
        href: APP_ROUTES.consoleModels,
        Icon: CloudMenuIcon,
      },
      {
        label: "AI 算力运营服务",
        href: APP_ROUTES.tokenFactory,
        Icon: TokenFactoryMenuIcon,
      },
      ...(RESERVED_PAGE_ENABLED
        ? [
            {
              label: "预留实例",
              href: APP_ROUTES.reserved,
              Icon: ReservedMenuIcon,
            },
          ]
        : []),
    ],
  },
  {
    title: "私有化 MaaS",
    items: [
      {
        label: "私有化大模型服务平台",
        href: APP_ROUTES.enterprise,
        Icon: EnterpriseMenuIcon,
      },
      {
        label: "私有化大模型服务网关",
        href: APP_ROUTES.aiGateway,
        Icon: GatewayMenuIcon,
      },
    ],
  },
];

const aboutMenu: MenuLink[] = [
  { label: "公司介绍", href: APP_ROUTES.about },
  { label: "品牌理念", href: APP_ROUTES.brand },
  { label: "企业动态", href: APP_ROUTES.news },
  { label: "开发者说", href: APP_ROUTES.developerTalk },
];

const navLinks = [
  { label: "模型", href: APP_ROUTES.models },
  { label: "价格", href: APP_ROUTES.pricing },
  {
    label: "文档",
    href: APP_ROUTES.docsIntroduction,
    external: true,
  },
  { label: "生态合作", href: APP_ROUTES.partner },
];

function ProductDropdown({ pathname }: { pathname: string }) {
  return (
    <div className="rounded-[16px] bg-white shadow-xl">
      <div className="p-5">
        {productGroups.map((group) => (
          <div key={group.title} className="mb-[18px] min-w-[220px] last:mb-0">
            <div className="mb-2.5 text-sm font-semibold text-[#4AABF0]">{group.title}</div>
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
                  {item.Icon ? <item.Icon /> : null}
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

function AboutDropdown({ pathname }: { pathname: string }) {
  return (
    <div className="w-max min-w-[124px] rounded-[16px] bg-white shadow-xl">
      <div className="flex w-max flex-col gap-[6px] px-[6px] py-[20px]">
        {aboutMenu.map((item) => (
          <NavAnchor
            key={item.href}
            href={item.href}
            className={cn(
              "block whitespace-nowrap rounded-[20px] px-[28px] py-[8px] text-[14px] leading-none text-slate-800 transition-colors hover:bg-[#EEF6FE]",
              pathname === item.href &&
                "rounded-lg bg-[#4AABF0]/10 font-medium text-[#4AABF0]",
            )}
          >
            {item.label}
          </NavAnchor>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<"product" | "about" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isProductActive =
    openMenu === "product" ||
    pathname === APP_ROUTES.tokenFactory ||
    (RESERVED_PAGE_ENABLED && pathname === APP_ROUTES.reserved) ||
    pathname === APP_ROUTES.enterprise ||
    pathname === APP_ROUTES.aiGateway;
  const isAboutActive =
    openMenu === "about" ||
    pathname === APP_ROUTES.brand ||
    pathname === APP_ROUTES.about ||
    pathname === APP_ROUTES.news ||
    pathname === APP_ROUTES.developerTalk;

  return (
    <>
    <header className="fixed left-0 top-0 z-50 w-full bg-white/72 px-4 py-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 max-[960px]:bg-white/95 max-[960px]:px-4 max-[960px]:py-2.5 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="relative flex h-[46px] items-center"
            aria-label="八色鸫 首页"
          >
            <Image
              src={BRAND.logo}
              alt="八色鸫 basedong"
              width={158}
              height={32}
              className="h-8 w-[158px]"
              priority
            />
          </Link>

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
                产品
                <ChevronDownIcon />
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
                <ProductDropdown pathname={pathname} />
              </div>
            </div>

            {navLinks.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1 text-base text-slate-800 transition-colors duration-150 hover:text-[#4AABF0]",
                  pathname === link.href && "text-[#4AABF0]",
                )}
              >
                {link.label}
                {"external" in link && link.external ? <DocsExternalIcon /> : null}
              </NavAnchor>
            ))}

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
                关于
                <ChevronDownIcon />
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
                <AboutDropdown pathname={pathname} />
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <MarketingLanguageSwitcher />
          <a
            href={APP_ROUTES.login}
            className="bd-gradient-bg hidden h-[39px] w-[68px] items-center justify-center rounded-[120px] text-[18px] text-white lg:flex"
          >
            登录
          </a>
          <button
            type="button"
            aria-label="菜单"
            className="flex h-9 w-9 items-center justify-center rounded border border-black/10 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
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
              <p className="mb-1 text-sm font-semibold text-[#4AABF0]">{group.title}</p>
              {group.items.map((item) => (
                <NavAnchor
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-1.5 pl-3 text-sm",
                    pathname === item.href
                      ? "font-medium text-[#4AABF0]"
                      : "text-slate-800",
                  )}
                >
                  {item.label}
                </NavAnchor>
              ))}
            </div>
          ))}
          {navLinks.map((link) => (
            <NavAnchor
              key={link.href}
              href={link.href}
              className={cn(
                "block py-1.5 pl-3 text-sm",
                pathname === link.href
                  ? "font-medium text-[#4AABF0]"
                  : "text-slate-800",
              )}
            >
              {link.label}
            </NavAnchor>
          ))}
          <p className="font-medium">关于</p>
          {aboutMenu.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              className={cn(
                "block whitespace-nowrap py-1.5 pl-3 text-sm",
                pathname === item.href
                  ? "font-medium text-[#4AABF0]"
                  : "text-slate-600",
              )}
            >
              {item.label}
            </NavAnchor>
          ))}
          <a
            href={APP_ROUTES.login}
            className="bd-gradient-bg mt-2 inline-flex h-10 w-fit items-center justify-center rounded-full px-5 text-white"
          >
            登录
          </a>
        </div>
      </div>
    </header>
    <SfBackToTop />
    </>
  );
}
