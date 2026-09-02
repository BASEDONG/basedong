import { BRAND } from "@/lib/assets";

export const ASSET = {
  logo: BRAND.logoWhite,
  logoMark: BRAND.logoMark,
  campaign:
    "/assets/console/dedicated-apply/images/header-campaigns-inviter.webp",
  hero:
    "/assets/console/dedicated-apply/images/faas-1.webp",
} as const;

export const navActiveKey = "gpu-fn";

export const audienceIcons = [
  "building",
  "globe",
  "store",
  "mountain",
  "userCheck",
  "lightbulb",
] as const;

export const gettingStartedIcons = [
  "keyRound",
  "squareTerminal",
  "rocket",
] as const;

export const capabilityCardStyles = [
  { bg: "bg-[#d6f2ff]", padRight: false },
  { bg: "bg-[#f1f1ff]", padRight: false },
  { bg: "bg-[#f1f1ff]", padRight: true },
  { bg: "bg-[#f1fff9]", padRight: false },
] as const;
