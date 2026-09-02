import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME } from "@/lib/brand-colors";
import type { AboutContent } from "./content-types";

export type TimelineSide = "date-left" | "date-right";

export type TimelineItemBase = {
  id: string;
  side: TimelineSide;
  rockDesktop?: boolean;
  rockMobile?: boolean;
};

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  /** Periwinkle — about; soft indigo away from gateway */
  orbPrimary: "#6E7CF0",
  orbSecondary: "#8B9AF5",
  accent: "#6E7CF0",
  logoSrc: "/assets/marketing/about/images/hero-visual.svg",
};

export const ABOUT_ASSETS = {
  introIllustration: "/assets/marketing/about/images/section-2-1.svg",
  timelineBg: "/assets/marketing/token-factory/images/bg-section-3.svg",
  timelineRock: "/assets/marketing/about/images/section-2-rock.svg",
  honorsBg: "/assets/marketing/about/images/section-3-bg.png",
  iso: [
    "/assets/marketing/about/images/iso-1.png",
    "/assets/marketing/about/images/iso-2.png",
    "/assets/marketing/about/images/iso-3.png",
    "/assets/marketing/about/images/iso-4.png",
  ],
  honors: Array.from(
    { length: 12 },
    (_, i) => `/assets/marketing/about/images/honor-${i + 1}.png`,
  ),
} as const;

/** Alternating zigzag rows — exact order from live site */
export const TIMELINE_ITEM_BASE: TimelineItemBase[] = [
  { id: "2026-06", side: "date-left" },
  { id: "2026-04", side: "date-right" },
  { id: "2025-12", side: "date-left" },
  { id: "2025-09", side: "date-right" },
  { id: "2025-06", side: "date-left", rockMobile: true },
  { id: "2025-04", side: "date-right" },
  { id: "2025-02-a", side: "date-left" },
  { id: "2025-02-b", side: "date-right" },
  { id: "2024-07", side: "date-left" },
  { id: "2024-05", side: "date-right", rockDesktop: true },
  { id: "2024-01", side: "date-left" },
  { id: "2023-08", side: "date-right" },
];

export const CERTIFICATION_IMAGE_BASE = [
  ABOUT_ASSETS.iso[0],
  ABOUT_ASSETS.iso[1],
  ABOUT_ASSETS.iso[2],
  ABOUT_ASSETS.iso[3],
] as const;

export type TimelineItem = AboutContent["timelineItems"][number];

export type Certification = AboutContent["certifications"][number];
