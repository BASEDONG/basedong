import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Cards({ children }: { children?: ReactNode }) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">{children}</div>
  );
}

export function Card({
  title,
  description,
  href,
  icon,
}: {
  title?: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
}) {
  const body = (
    <>
      <div className="mb-2 flex items-center gap-2">
        {icon ? (
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#4AABF0]/10 text-[#4AABF0] [&_svg]:size-4">
            {icon}
          </span>
        ) : null}
        <span className="font-semibold text-[#0a0a0a]">{title}</span>
      </div>
      {description ? (
        <p className="text-sm leading-6 text-[#737373]">{description}</p>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <div className="rounded-lg border border-[#9e9e9e]/20 p-4">{body}</div>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-lg border border-[#9e9e9e]/20 p-4 transition-colors hover:border-[#4AABF0]/40 hover:bg-[#4AABF0]/5"
    >
      {body}
    </Link>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="not-prose my-6 rounded-lg border border-[#4AABF0]/30 bg-[#4AABF0]/5 px-4 py-3 text-sm leading-6 text-[#0a0a0a]">
      {title ? (
        <p className="mb-1 font-semibold text-[#4AABF0]">{title}</p>
      ) : null}
      <div className="text-[#0a0a0a]/90 [&_a]:font-medium [&_a]:text-[#4AABF0] [&_a]:underline">
        {children}
      </div>
    </div>
  );
}

export function MethodPill({
  method,
  className,
}: {
  method: string;
  className?: string;
}) {
  const upper = method.toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 font-mono text-xs font-semibold",
        upper === "POST"
          ? "bg-blue-50 text-blue-700"
          : upper === "DELETE"
            ? "bg-red-50 text-red-700"
            : "bg-emerald-50 text-emerald-700",
        className,
      )}
    >
      {upper}
    </span>
  );
}
