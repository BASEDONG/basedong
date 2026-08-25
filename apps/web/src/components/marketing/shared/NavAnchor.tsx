import Link from "next/link";
import type { ReactNode } from "react";
import { isInternalHref, resolveLocalHref } from "@/lib/routes";

type NavAnchorProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function NavAnchor({ href, className, children }: NavAnchorProps) {
  const resolved = resolveLocalHref(href);

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
