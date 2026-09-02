const HOME = "apps/web/public/assets/marketing/home/images";
const TF = "apps/web/public/assets/marketing/token-factory/images";
const ENT = "apps/web/public/assets/marketing/enterprise/images";
const GW = "apps/web/public/assets/marketing/ai-gateway/images";
const ABOUT = "apps/web/public/assets/marketing/about/images";
const PARTNER = "apps/web/public/assets/marketing/partner/images";
const PRICING = "apps/web/public/assets/marketing/pricing/images";
const MODELS = "apps/web/public/assets/marketing/models/images";
const NEWS = "apps/web/public/assets/marketing/news/images";
const DEVTALK = "apps/web/public/assets/marketing/developer-talk/images";
const BRAND = "apps/web/public/assets/marketing/brand/images";
const RESERVED = "apps/web/public/assets/marketing/reserved/images";
const ILL = `${HOME}/illustrations`;
const SCENARIO = `${ENT}/scenarios`;

/**
 * @typedef {{ slug: string; fallbacks?: string[]; style?: string; out: string; color: string }} StorysetTarget
 *
 * Rule: every primary `slug` must be unique across this list.
 * Fallbacks are emergency-only and must not collide with any primary slug.
 */

/** @type {StorysetTarget[]} */
export const storysetTargets = [
  // —— Heroes ——
  { slug: "artificial-intelligence", out: `${HOME}/hero-logos/gpt-5-6.svg`, color: "#0d8a6a" },
  { slug: "research-paper", out: `${HOME}/hero-logos/opus-5.svg`, color: "#a67c52" },
  { slug: "filter", out: `${HOME}/hero-logos/auto.svg`, color: "#4AABF0" }, // Auto 智能选型
  { slug: "building", out: `${HOME}/hero-logos/deployment.svg`, color: "#FF9142" }, // 部署
  { slug: "secure-server", out: `${GW}/hero-gateway.svg`, color: "#4AABF0" },
  { slug: "server-status", out: `${ENT}/hero-maas.svg`, color: "#FF9142" },
  { slug: "data-processing", out: `${TF}/hero-visual.svg`, color: "#4AABF0" },

  // —— Home product cards ——
  { slug: "security", out: `${ILL}/product-deploy.svg`, color: "#FF9142" }, // 私有化部署
  { slug: "fast-loading", out: `${ILL}/product-inference.svg`, color: "#7c3aed" }, // 推理性能
  { slug: "select-option", out: `${ILL}/product-auto.svg`, color: "#7ab82e" }, // Auto 选型
  { slug: "connected", out: `${ILL}/product-api.svg`, color: "#4AABF0" }, // 一体化 API

  // —— Home industry ——
  { slug: "social-dashboard", out: `${ILL}/industry-internet.svg`, color: "#4AABF0" },
  { slug: "online-learning", out: `${ILL}/industry-education.svg`, color: "#7ab82e" },
  { slug: "city-hall", out: `${ILL}/industry-government.svg`, color: "#7c3aed" },
  { slug: "server", out: `${ILL}/industry-compute.svg`, color: "#FF9142" },
  { slug: "robotics", out: `${ILL}/industry-ai-hardware.svg`, color: "#d946ef" },

  // —— Home why highlights ——
  { slug: "piggy-bank", out: `${ILL}/why-cost-value.svg`, color: "#4AABF0" }, // 高性价比
  { slug: "maintenance", out: `${ILL}/why-stability.svg`, color: "#7c3aed" }, // 高稳定性

  // —— Home WhyChoose：扩展 / 安全 / 智能 / 可用 ——
  { slug: "cloud-hosting", out: `${HOME}/why-card-1.svg`, color: "#ea580c" },
  { slug: "private-data", out: `${HOME}/why-card-2.svg`, color: "#059669" },
  { slug: "visionary-technology", out: `${HOME}/why-card-3.svg`, color: "#E848A0" },
  { slug: "active-support", out: `${HOME}/why-card-4.svg`, color: "#4f46e5" },

  // —— Token Factory WhyChoose：利用率 / 单卡产出 / 需求对接 / 成本 ——
  { slug: "cloud-sync", out: `${TF}/why-card-1.svg`, color: "#7c3aed" },
  { slug: "metrics", out: `${TF}/why-card-2.svg`, color: "#4AABF0" },
  { slug: "business-deal", out: `${TF}/why-card-3.svg`, color: "#7c3aed" },
  { slug: "savings", out: `${TF}/why-card-4.svg`, color: "#64748b" },

  // —— Token Factory feature：GPU 接入 / 吞吐 / 编排 / 业务场景 ——
  { slug: "printed-circuit-board", out: `${TF}/feature-card-1.svg`, color: "#8B6AD6" }, // GPU
  { slug: "progress-overview", out: `${TF}/feature-card-2.svg`, color: "#4AABF0" },
  { slug: "real-time-sync", out: `${TF}/feature-card-3.svg`, color: "#0891B2" },
  { slug: "chat-bot", out: `${TF}/feature-card-4.svg`, color: "#10a37f" },

  // —— AI Gateway：路由 / 成本 / 合规 / 接入 / 观测 / 治理 ——
  { slug: "directions", out: `${GW}/advantage-card-1.svg`, color: "#E848A0" }, // 路由
  { slug: "wallet", out: `${GW}/advantage-card-2.svg`, color: "#B5D94C" },
  { slug: "gdpr", out: `${GW}/advantage-card-3.svg`, color: "#E84040" },
  { slug: "online-connection", out: `${GW}/advantage-card-4.svg`, color: "#4AABF0" }, // 多源接入
  { slug: "dashboard", out: `${GW}/advantage-card-5.svg`, color: "#4AABF0" },
  { slug: "control-panel", out: `${GW}/advantage-card-6.svg`, color: "#FF9142" },

  // —— Enterprise advantages：安全 / 成本 / 上手 / 选型 / 稳运行 / 快上线 ——
  { slug: "vault", out: `${ENT}/advantage-card-1.svg`, color: "#059669" },
  { slug: "finance", out: `${ENT}/advantage-card-2.svg`, color: "#4AABF0" },
  { slug: "click-here", out: `${ENT}/advantage-card-3.svg`, color: "#E848A0" },
  { slug: "checklist", out: `${ENT}/advantage-card-4.svg`, color: "#E848A0" },
  { slug: "speed-test", out: `${ENT}/advantage-card-5.svg`, color: "#4f46e5" },
  { slug: "rocket", out: `${ENT}/advantage-card-6.svg`, color: "#ea580c" },

  // —— Enterprise scenarios（独立路径，不与首页 industry 共用）——
  { slug: "renewable-energy", out: `${SCENARIO}/energy.svg`, color: "#7ab82e" },
  { slug: "analysis", out: `${SCENARIO}/aicenter.svg`, color: "#d946ef" }, // 智算中心
  { slug: "navigation", out: `${SCENARIO}/transport.svg`, color: "#4AABF0" },
  { slug: "processing", out: `${SCENARIO}/enterprise.svg`, color: "#0d9488" }, // 算力纳管
  { slug: "5g", out: `${SCENARIO}/carrier.svg`, color: "#d946ef" },
  { slug: "factory", out: `${SCENARIO}/manufacturing.svg`, color: "#FF9142" },

  // —— About ——
  { slug: "team", out: `${ABOUT}/section-2-1.svg`, color: "#4AABF0" },

  // —— Secondary page heroes ——
  { slug: "partnership", out: `${PARTNER}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "credit-card", out: `${PRICING}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "online-article", out: `${MODELS}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "business-plan", out: `${ABOUT}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "newsletter", out: `${NEWS}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "coding", out: `${DEVTALK}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "design-process", out: `${BRAND}/hero-visual.svg`, color: "#4AABF0" },
  { slug: "schedule", out: `${RESERVED}/hero-visual.svg`, color: "#4AABF0" },
];

const primarySlugs = storysetTargets.map((t) => t.slug);
const dupPrimaries = primarySlugs.filter((s, i) => primarySlugs.indexOf(s) !== i);
if (dupPrimaries.length > 0) {
  throw new Error(`Duplicate primary Storyset slugs: ${[...new Set(dupPrimaries)].join(", ")}`);
}

const outPaths = storysetTargets.map((t) => t.out);
const dupOuts = outPaths.filter((p, i) => outPaths.indexOf(p) !== i);
if (dupOuts.length > 0) {
  throw new Error(`Duplicate output paths: ${[...new Set(dupOuts)].join(", ")}`);
}
