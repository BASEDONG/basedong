"use client";

import Avatar from "boring-avatars";
import { LOGO_COLOR_LIST } from "@/lib/brand-colors";

type BrandAvatarProps = {
  name: string;
  size?: number;
  className?: string;
};

export function BrandAvatar({ name, size = 32, className }: BrandAvatarProps) {
  return (
    <div className={className}>
      <Avatar
        size={size}
        name={name}
        variant="beam"
        colors={[...LOGO_COLOR_LIST]}
        square={false}
      />
    </div>
  );
}
