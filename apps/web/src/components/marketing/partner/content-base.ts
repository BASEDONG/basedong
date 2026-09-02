import { APP_ROUTES } from "@/lib/routes";
import { BRAND_THEME } from "@/lib/brand-colors";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import type { LucideIcon } from "lucide-react";
import {
  Code,
  Database,
  GraduationCap,
  Layers,
  Radio,
  Shield,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

export const PARTNER_ASSETS = {
  sectionBg: "/assets/marketing/reserved/images/bg-section-3.svg",
} as const;

export const APPLY_URL = APP_ROUTES.formBusiness;
export const MORE_CASES_URL = APP_ROUTES.docsIntroduction;

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: "#E86B9A",
  orbSecondary: "#F2A2B3",
  accent: "#E86B9A",
  logoSrc: "/assets/marketing/partner/images/hero-visual.svg",
};

export type PartnershipModeBase = {
  icon: LucideIcon;
};

export const PARTNERSHIP_MODE_BASE: PartnershipModeBase[] = [
  { icon: Users },
  { icon: Code },
  { icon: Radio },
  { icon: Layers },
  { icon: Database },
  { icon: GraduationCap },
];

export type PartnerBenefitBase = {
  icon: LucideIcon;
  featured?: boolean;
};

export const PARTNER_BENEFIT_BASE: PartnerBenefitBase[] = [
  { icon: Layers, featured: true },
  { icon: Wrench },
  { icon: TrendingUp },
  { icon: Shield },
];

export const PARTNER_CASE_IMAGES = [
  "/assets/marketing/partner/images/partner-logo-06.png",
  "/assets/marketing/partner/images/partner-logo-15.png",
  "/assets/marketing/partner/images/partner-logo-17.png",
  "/assets/marketing/partner/images/partner-logo-18.png",
  "/assets/marketing/partner/images/partner-logo-04.png",
  "/assets/marketing/partner/images/partner-logo-11.png",
  "/assets/marketing/partner/images/partner-logo-09.png",
  "/assets/marketing/partner/images/partner-logo-08.png",
  "/assets/marketing/partner/images/partner-logo-20.png",
  "/assets/marketing/partner/images/partner-logo-14.png",
  "/assets/marketing/partner/images/partner-logo-10.png",
  "/assets/marketing/partner/images/partner-logo-01.png",
  "/assets/marketing/partner/images/partner-logo-13.png",
  "/assets/marketing/partner/images/partner-logo-19.png",
  "/assets/marketing/partner/images/partner-logo-02.png",
  "/assets/marketing/partner/images/partner-logo-03.png",
  "/assets/marketing/partner/images/partner-logo-12.png",
  "/assets/marketing/partner/images/partner-logo-07.png",
  "/assets/marketing/partner/images/partner-logo-16.png",
  "/assets/marketing/partner/images/partner-logo-05.png",
] as const;
