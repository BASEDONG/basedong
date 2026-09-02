"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { isInternalHref } from "@/lib/routes";
import { useLocale } from "@/components/shared/LocaleProvider";

type NavAnchorProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function NavAnchor({ href, className, children }: NavAnchorProps) {
  const { resolveHref } = useLocale();
  const resolved = resolveHref(href);

  if (isInternalHref(resolved)) {
    return (
      <Link href={resolved} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={resolved} className={className} rel="noopener noreferrer">
      {children}
    </a>
  );
}
