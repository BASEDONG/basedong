import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";

const ASSET = "/assets/marketing/brand" as const;

export const BRAND_ASSETS = {
  heroBg: `${ASSET}/images/brand_hero_bg.png`,
  arrowDown: `${ASSET}/images/arrow-down.svg`,
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
  logoZip:
    "https://static02.siliconflow.cn/www/cn/res/20260615/SiliconFlow_LOGO.zip",
} as const;

export const BRAND_COPY = {
  heroTitle: "八色鸫 品牌焕新",
  heroSubtitle: "焕新，不止是品牌标识。更是一种通向未来的方式。",
  logoBirthTitle: "新标志的诞生",
  logoBirthBody:
    "八色方块，象征多元与可能。我们的品牌升级不仅仅是视觉元素的改变，更是理念与使命的深化。",
  missionBadge: "MISSION AND VISION",
  missionHeading: "使命与愿景",
  missionLines: ["做所有人的 AI。", "让世界因 AI 更美好"] as const,
  missionBody:
    "我们坚信，人工通用智能 (AGI) 将成为人类历史上最具变革力的技术突破之一。我们的愿景是推动 AGI 的发展与普及，推动这一强大技术能够公平、安全地惠及全人类。在这个愿景的指引下，我们致力于创造一个因 AI 而更加美好、平等、繁荣的世界。",
  valuesBadge: "OUR VAULES",
  valuesHeading: "我们的价值观",
  values: [
    {
      title: "01 以人为本",
      body: "始终将人的需求、体验与成长置于技术发展的核心，确保我们的每一项创新都是为了提升人类福祉。",
      bg: "#F7F9FC",
    },
    {
      title: "02 开放合作",
      body: "拥抱多元思想，打破边界限制，通过广泛的跨领域协作创造超越单一视角的综合价值。",
      bg: `${LOGO_COLORS.cyan}22`,
    },
    {
      title: "03 实事求是",
      body: "基于事实与数据做决策，勇于面对真相，不回避挑战，以务实态度解决实际问题。",
      bg: `${LOGO_COLORS.blue}22`,
    },
    {
      title: "04 创新卓越",
      body: "不满足于现状，持续探索未知领域，追求卓越品质，用突破性思维重新定义可能。",
      bg: `${LOGO_COLORS.orange}22`,
    },
  ] as const,
  relationshipBadge: "RELATIONSHIP",
  relationshipHeading: "得力帮手 可靠伙伴",
  relationshipParas: [
    "作为得力帮手，我们提供超越期望的解决方案，让你的团队更高效专注。",
    "作为可靠伙伴，我们恪守承诺，保持透明沟通，建立长期互信。",
    "我们的成功标准是你能清晰看到我们为你创造的实际价值。携手同行，共创非凡",
  ] as const,
  guidelinesTitle: "使用规范",
  guidelinesSubtitle: "遵循品牌使用规范，确保品牌形象的一致性和专业性",
  downloadLabel: "下载 Logo 资源包",
  gradientLabel: "主渐变（冷暖对话）",
  swatches: [
    { name: "青柠", hex: LOGO_COLORS.lime, rgb: "R181 G217 B76" },
    { name: "橙", hex: LOGO_COLORS.orange, rgb: "R255 G145 B66" },
    { name: "粉", hex: LOGO_COLORS.pink, rgb: "R242 G162 B179" },
    { name: "青", hex: LOGO_COLORS.cyan, rgb: "R93 G205 B232" },
    { name: "红", hex: LOGO_COLORS.red, rgb: "R232 G64 B64" },
    { name: "蓝", hex: LOGO_COLORS.blue, rgb: "R74 G171 B240" },
    { name: "黄", hex: LOGO_COLORS.yellow, rgb: "R240 G192 B48" },
    { name: "品红", hex: LOGO_COLORS.magenta, rgb: "R232 G72 B160" },
    {
      name: "主渐变",
      hex: BRAND_THEME.primary,
      rgb: "交互主色 fallback",
      variant: "gradient" as const,
      gradient: BRAND_THEME.primaryGradient,
    },
    {
      name: "白",
      hex: "#FFFFFF",
      rgb: "R255 G255 B255",
      variant: "white" as const,
    },
    {
      name: "黑",
      hex: "#000000",
      rgb: "R0 G0 B0",
      variant: "black" as const,
    },
  ] as const,
};
