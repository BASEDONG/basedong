"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useLocale } from "@/components/shared/LocaleProvider";
import { isInternalHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const marketingButtonVariants = cva(
  "group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[12px] transition-all duration-300",
  {
    variants: {
      variant: {
        primary:
          "bd-gradient-bg text-white transition-transform hover:-translate-y-0.5",
        secondary:
          "border border-[#4AABF0] bg-white text-[#4AABF0] hover:bg-[#4AABF0] hover:text-white",
        onDark:
          "bg-white text-[#4AABF0] shadow-[0_10px_24px_rgba(58,120,180,0.22)] hover:shadow-[0_16px_34px_rgba(58,120,180,0.28)]",
      },
      size: {
        sm: "h-9 px-4 text-sm font-medium",
        md: "h-14 min-w-[160px] px-8 text-lg font-semibold",
        lg: "h-16 px-[23px] text-[24px] font-bold max-lg:scale-75",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const arrowClassNames = {
  sm: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
  md: "h-5 w-5 transition-transform duration-300 group-hover:translate-x-1",
  lg: "h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 max-lg:h-[18px] max-lg:w-[18px]",
} as const;

type MarketingButtonSize = NonNullable<
  VariantProps<typeof marketingButtonVariants>["size"]
>;

type MarketingButtonCommonProps = VariantProps<typeof marketingButtonVariants> & {
  className?: string;
  showArrow?: boolean;
  children: ReactNode;
};

type MarketingButtonAsLink = MarketingButtonCommonProps & {
  href: string;
};

type MarketingButtonAsButton = MarketingButtonCommonProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: undefined;
  };

export type MarketingButtonProps =
  | MarketingButtonAsLink
  | MarketingButtonAsButton;

type MarketingButtonLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

function MarketingButtonLink({
  href,
  className,
  children,
}: MarketingButtonLinkProps) {
  const { resolveHref } = useLocale();
  const resolved = resolveHref(href);

  if (!isInternalHref(resolved)) {
    return (
      <a href={resolved} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={resolved} className={className}>
      {children}
    </Link>
  );
}

export function MarketingButton({
  variant,
  size = "md",
  className,
  showArrow = false,
  children,
  href,
  ...props
}: MarketingButtonProps) {
  const resolvedSize = (size ?? "md") as MarketingButtonSize;
  const classes = cn(
    marketingButtonVariants({ variant, size: resolvedSize }),
    className,
  );

  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowRight className={arrowClassNames[resolvedSize]} aria-hidden />
      ) : null}
    </>
  );

  if (href) {
    return (
      <MarketingButtonLink href={href} className={classes}>
        {content}
      </MarketingButtonLink>
    );
  }

  const { type = "button", ...buttonProps } =
    props as ComponentPropsWithoutRef<"button">;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
