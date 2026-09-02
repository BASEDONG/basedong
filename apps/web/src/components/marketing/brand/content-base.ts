import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";

const ASSET = "/assets/marketing/brand" as const;

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  /** Brand magenta — brand story moment */
  orbPrimary: LOGO_COLORS.pink,
  orbSecondary: LOGO_COLORS.magenta,
  accent: LOGO_COLORS.magenta,
  logoSrc: `${ASSET}/images/hero-visual.svg`,
};

export const BRAND_ASSETS = {
  heroVisual: `${ASSET}/images/hero-visual.svg`,
  s2bg: `${ASSET}/images/s2bg.png`,
  videoCover: `${ASSET}/images/video_cover.png`,
  logoVideo: `${ASSET}/videos/logo.mp4`,
  s3bg: `${ASSET}/images/s3bg.png`,
  s4: `${ASSET}/images/s4.png`,
  relationshipBg: `${ASSET}/images/relationship_bg.png`,
  s5_01: `${ASSET}/images/s5-01.png`,
  s5_02: `${ASSET}/images/s5-02.png`,
  s5_04: `${ASSET}/images/s5-04.png`,
  s5_05: `${ASSET}/images/s5-05.png`,
  logoZip: "/assets/marketing/brand/images/hero-visual.svg",
} as const;

export const VALUE_CARD_BASE = [
  { bg: "#F7F9FC" },
  { bg: `${LOGO_COLORS.cyan}22` },
  { bg: `${LOGO_COLORS.blue}22` },
  { bg: `${LOGO_COLORS.orange}22` },
] as const;

export type BrandSwatchBase = {
  hex: string;
  rgb: string;
  variant?: "gradient" | "white" | "black";
  gradient?: string;
};

export const SWATCH_BASE: BrandSwatchBase[] = [
  { hex: LOGO_COLORS.lime, rgb: "R181 G217 B76" },
  { hex: LOGO_COLORS.orange, rgb: "R255 G145 B66" },
  { hex: LOGO_COLORS.pink, rgb: "R242 G162 B179" },
  { hex: LOGO_COLORS.cyan, rgb: "R93 G205 B232" },
  { hex: LOGO_COLORS.red, rgb: "R232 G64 B64" },
  { hex: LOGO_COLORS.blue, rgb: "R74 G171 B240" },
  { hex: LOGO_COLORS.yellow, rgb: "R240 G192 B48" },
  { hex: LOGO_COLORS.magenta, rgb: "R232 G72 B160" },
  {
    hex: BRAND_THEME.primary,
    rgb: "交互主色 fallback",
    variant: "gradient",
    gradient: BRAND_THEME.primaryGradient,
  },
  { hex: "#FFFFFF", rgb: "R255 G255 B255", variant: "white" },
  { hex: "#000000", rgb: "R0 G0 B0", variant: "black" },
];
