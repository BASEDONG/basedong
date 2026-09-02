import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME } from "@/lib/brand-colors";
import { APP_ROUTES } from "@/lib/routes";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Coins,
  Cpu,
  Gauge,
  Handshake,
  Layers,
  Network,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

export const TF_ASSETS = "/assets/marketing/token-factory/images";

export const TF_ECOSYSTEM_ASSETS =
  "/assets/marketing/token-factory/images/ecosystem";

export const CONSULT_URL = APP_ROUTES.formBusiness;

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  /** Lime — compute / throughput; one green slot only */
  orbPrimary: "#B5D94C",
  orbSecondary: "#8FBF2E",
  accent: "#9BC53D",
  logoSrc: `${TF_ASSETS}/hero-visual.svg`,
};

export type FeatureCardBase = {
  image: string;
  icon: LucideIcon;
  border: string;
  bg: string;
  iconBg: string;
};

export const FEATURE_CARD_BASE: FeatureCardBase[] = [
  {
    image: `${TF_ASSETS}/feature-card-4.svg`,
    icon: Bot,
    border: "#B4F5C5",
    bg: "#F2FFF6",
    iconBg: "#E7FDEC",
  },
  {
    image: `${TF_ASSETS}/feature-card-3.svg`,
    icon: Network,
    border: "#67E8F9",
    bg: "#F0FEFF",
    iconBg: "#E0FAFE",
  },
  {
    image: `${TF_ASSETS}/feature-card-2.svg`,
    icon: Gauge,
    border: "#DDE3EA",
    bg: "#FAFBFD",
    iconBg: "#EEF2F7",
  },
  {
    image: `${TF_ASSETS}/feature-card-1.svg`,
    icon: Cpu,
    border: "#C4A7FF",
    bg: "#F7F2FF",
    iconBg: "#EDE3FF",
  },
];

export type ArchitectureLayerBase = {
  icon: LucideIcon;
  iconBg: string;
};

export const ARCHITECTURE_LAYER_BASE: ArchitectureLayerBase[] = [
  { icon: Rocket, iconBg: "#F4EEFF" },
  { icon: Zap, iconBg: "#F4EEFF" },
  { icon: Target, iconBg: "#F4EEFF" },
  { icon: Cpu, iconBg: "#F4EEFF" },
];

export type PartnershipCardBase = {
  icon: LucideIcon;
  iconBg: string;
};

export const PARTNERSHIP_CARD_BASE: PartnershipCardBase[] = [
  { icon: Layers, iconBg: "#EDE9FE" },
  { icon: Handshake, iconBg: "#EDE9FE" },
];

export type WhyCardBase = {
  image: string;
  icon: LucideIcon;
  border: string;
  bg: string;
  iconBg: string;
};

export const WHY_CARD_BASE: WhyCardBase[] = [
  {
    image: `${TF_ASSETS}/why-card-4.svg`,
    icon: Coins,
    border: "#D7DCE5",
    bg: "#F8FAFC",
    iconBg: "#EEF2F7",
  },
  {
    image: `${TF_ASSETS}/why-card-3.svg`,
    icon: Handshake,
    border: "#C4B5FD",
    bg: "#F5F3FF",
    iconBg: "#EDE9FE",
  },
  {
    image: `${TF_ASSETS}/why-card-2.svg`,
    icon: Zap,
    border: "#93C5FD",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    image: `${TF_ASSETS}/why-card-1.svg`,
    icon: Layers,
    border: "#C4B5FD",
    bg: "#F5F3FF",
    iconBg: "#EDE9FE",
  },
];

export type TestimonialBase = {
  avatarSeed: string;
  bg: string;
};

export const TESTIMONIAL_BASE: TestimonialBase[] = [
  {
    avatarSeed: "token-factory-internet-ai-lead",
    bg: "rgba(74, 171, 240, 0.05)",
  },
  {
    avatarSeed: "token-factory-compute-platform-lead",
    bg: "rgba(2, 246, 247, 0.10)",
  },
  {
    avatarSeed: "token-factory-finance-infra-lead",
    bg: "#F8FAFC",
  },
];

export type GpuVendorBase = {
  id: string;
  name: string;
  logo: string;
};

export const GPU_VENDOR_BASE: GpuVendorBase[] = [
  {
    id: "nvidia",
    name: "NVIDIA",
    logo: `${TF_ECOSYSTEM_ASSETS}/nvidia.svg`,
  },
  {
    id: "intel",
    name: "Intel",
    logo: `${TF_ECOSYSTEM_ASSETS}/intel.svg`,
  },
  {
    id: "ascend",
    name: "Ascend",
    logo: `${TF_ECOSYSTEM_ASSETS}/ascend.svg`,
  },
  {
    id: "metax",
    name: "MetaX",
    logo: `${TF_ECOSYSTEM_ASSETS}/metax.svg`,
  },
  {
    id: "enflame",
    name: "Enflame",
    logo: `${TF_ECOSYSTEM_ASSETS}/enflame.svg`,
  },
];
