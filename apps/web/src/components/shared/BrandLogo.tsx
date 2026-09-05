import Image from "next/image";
import Link from "next/link";

import { BRAND } from "@/lib/assets";
import { cn } from "@/lib/utils";

const SIZES = {
  nav: {
    width: 160,
    height: 32,
    className: "h-8 w-auto",
  },
  hero: {
    width: 220,
    height: 44,
    className: "h-auto w-[220px]",
  },
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZES;
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
  alt?: string;
  /** When set, wrap the mark in a link (e.g. home). Omit when a parent already links. */
  href?: string;
  linkClassName?: string;
  "aria-label"?: string;
};

export function BrandLogo({
  size = "nav",
  variant = "color",
  className,
  priority,
  alt = "basedong",
  href,
  linkClassName,
  "aria-label": ariaLabel,
}: BrandLogoProps) {
  const dims = SIZES[size];
  const src = variant === "white" ? BRAND.logoWhite : BRAND.logo;

  const image = (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      className={cn(dims.className, className)}
      priority={priority}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className={linkClassName} aria-label={ariaLabel ?? alt}>
      {image}
    </Link>
  );
}
