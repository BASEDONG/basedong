/** 八色鸫 logo palette — single source of truth for brand colors. */
export const LOGO_COLORS = {
  lime: "#B5D94C",
  orange: "#FF9142",
  pink: "#F2A2B3",
  cyan: "#5DCDE8",
  red: "#E84040",
  blue: "#4AABF0",
  yellow: "#F0C030",
  magenta: "#E848A0",
} as const;

/** Ordered as in the logo icon grid (top row L→R, bottom row L→R). */
export const LOGO_COLOR_LIST = [
  LOGO_COLORS.lime,
  LOGO_COLORS.orange,
  LOGO_COLORS.pink,
  LOGO_COLORS.cyan,
  LOGO_COLORS.red,
  LOGO_COLORS.blue,
  LOGO_COLORS.yellow,
  LOGO_COLORS.magenta,
] as const;

/** Primary theme tokens — gradient B (冷暖对话) + solid fallback. */
export const BRAND_THEME = {
  primary: LOGO_COLORS.blue,
  primaryHover: "#3A9AE0",
  primaryGradient:
    "linear-gradient(135deg, #5DCDE8 0%, #4AABF0 35%, #E848A0 70%, #FF9142 100%)",
  primaryGradientHover:
    "linear-gradient(135deg, #4EC0DE 0%, #3A9AE0 35%, #D43D90 70%, #E88238 100%)",
  /** Full 8-color spectrum — hero titles, brand moments. */
  primaryGradientHero:
    "linear-gradient(90deg, #B5D94C 0%, #FF9142 14%, #F2A2B3 28%, #5DCDE8 42%, #4AABF0 57%, #F0C030 71%, #E848A0 85%, #E84040 100%)",
  /** Logo top row — brand page accents. */
  primaryGradientTopRow:
    "linear-gradient(90deg, #B5D94C 0%, #FF9142 33%, #F2A2B3 66%, #5DCDE8 100%)",
  tint: "rgba(74, 171, 240, 0.1)",
  tintSolid: "#EEF6FE",
  ink: "#1E293B",
  inkDeep: "#0A0A0A",
  /** Card / panel surface for soft-blob backgrounds */
  cardSurface: "#ffffff",
} as const;

/** CSS custom-property names (set on `.sf-site`, `.sf-cloud-console`, `.sf-docs`). */
export const BRAND_CSS_VARS = {
  primary: "--sf-primary",
  primaryHover: "--sf-primary-hover",
  primaryGradient: "--sf-primary-gradient",
  primaryGradientHover: "--sf-primary-gradient-hover",
  primaryGradientHero: "--sf-primary-gradient-hero",
  tint: "--sf-tint",
  tintSolid: "--sf-tint-solid",
} as const;
