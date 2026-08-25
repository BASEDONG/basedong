export type AssetZone = "marketing" | "console" | "auth" | "docs" | "forms";

/** Build a public asset base path for a zone/page pair. */
export function assetBase(zone: AssetZone, page: string): string {
  return `/assets/${zone}/${page}`;
}

/** 八色鸫 / basedong brand lockups (outlined SVG paths). */
export const BRAND = {
  logo: "/assets/brand/shared/logo.svg",
  logoWhite: "/assets/brand/shared/logo-white.svg",
  logoMark: "/assets/brand/shared/logo-mark.svg",
  logoIcon: "/assets/brand/shared/logo-icon.svg",
} as const;
