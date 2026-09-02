import Image from "next/image";

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
};

export function BrandLogo({
  size = "nav",
  variant = "color",
  className,
  priority,
  alt = "basedong",
}: BrandLogoProps) {
  const dims = SIZES[size];
  const src = variant === "white" ? BRAND.logoWhite : BRAND.logo;

  return (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      className={cn(dims.className, className)}
      priority={priority}
    />
  );
}
