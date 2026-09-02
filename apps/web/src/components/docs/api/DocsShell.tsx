import type { ReactNode } from "react";

import type { NavItem, TocItem } from "./content-types";
import { DocsMobileHeader } from "./DocsMobileHeader";
import { DocsSidebar } from "./DocsSidebar";
import { DocsToc } from "./DocsToc";
import type { DocsLocale } from "@/lib/docs-locale";

export function DocsShell({
  children,
  docsLocale,
  navItems,
  tocItems,
  mobileTitle,
}: {
  children: ReactNode;
  docsLocale: DocsLocale;
  navItems: NavItem[];
  tocItems: TocItem[];
  mobileTitle?: string;
}) {
  return (
    <div className="sf-docs relative min-h-screen bg-white text-[#0a0a0a]">
      <DocsMobileHeader
        docsLocale={docsLocale}
        title={mobileTitle}
        navItems={navItems}
      />

      <aside className="fixed inset-y-0 start-0 z-20 hidden w-[var(--fd-sidebar-width,286px)] flex-col border-e border-[#9e9e9e]/20 bg-white max-md:hidden md:flex md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px]">
        <DocsSidebar
          docsLocale={docsLocale}
          items={navItems}
          className="h-full border-e-0"
        />
      </aside>

      <main
        id="nd-docs-layout"
        className="flex min-h-screen flex-1 flex-col pt-14 transition-[margin] md:ms-[var(--fd-sidebar-width,286px)] md:pt-0 md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px] xl:[--fd-toc-width:286px]"
      >
        <div id="nd-page" className="mx-auto flex w-full min-w-0 flex-1">
          <div className="min-w-0 flex-1 pt-[41px] md:pt-[41px] xl:pt-0">
            {children}
          </div>
          <DocsToc items={tocItems} />
        </div>
      </main>
    </div>
  );
}
