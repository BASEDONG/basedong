import type {
  SfFeatureCard,
  SfHeroSlide,
  SfIndustryItem,
  SfProductCard,
  SfWhyHighlightCard,
} from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";

const A = "/assets/marketing/home/images";
const HERO_LOGOS = `${A}/hero-logos`;
export const SF_SHARED = "/assets/marketing/shared";

export const heroSlides: SfHeroSlide[] = [
  {
    id: "gpt-5-6",
    tabLabel: "GPT-5.6",
    eyebrow: "八色鸫正式上线",
    title: "GPT-5.6",
    description:
      "GPT-5.6 模型家族包含 Sol（旗舰）、Terra（均衡）、Luna（高速）三档，在编码、智能体、知识工作与科学推理等场景达到前沿水平，现已可在平台调用。",
    ctaLabel: "立即试用",
    ctaHref: "/me/models",
    background: {
      base: "linear-gradient(135deg, #b8e6d4 0%, #8fd4b8 22%, #eef9f4 52%, #ffffff 100%)",
      orbPrimary: "#10a37f",
      orbSecondary: "#1a7f64",
      accent: "#0d8a6a",
      logoSrc: `${HERO_LOGOS}/gpt-5-6.svg`,
      logoAlt: "GPT-5.6",
    },
  },
  {
    id: "opus-5",
    tabLabel: "Opus 5",
    eyebrow: "Anthropic 最新旗舰",
    title: "Opus 5",
    description:
      "Opus 5 在编码、智能体与专业写作上全面升级，面向高复杂度、长周期任务，提供更精准的专业产出能力。",
    ctaLabel: "立即试用",
    ctaHref: "/me/models",
    background: {
      base: "linear-gradient(135deg, #f5e6d8 0%, #e8d4c0 22%, #faf6f2 52%, #ffffff 100%)",
      orbPrimary: "#d4a574",
      orbSecondary: "#c4956a",
      accent: "#a67c52",
      logoSrc: `${HERO_LOGOS}/opus-5.svg`,
      logoAlt: "Opus 5",
    },
  },
  {
    id: "auto-free",
    tabLabel: "Auto",
    eyebrow: "限时免费",
    title: "Auto 模型",
    description:
      "智能路由自动选型，在速度、成本与效果之间动态平衡；限时免费体验，零门槛接入大模型能力。",
    ctaLabel: "立即试用",
    ctaHref: "/me/models",
    layout: "centered",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
      logoSrc: `${HERO_LOGOS}/auto.svg`,
      logoAlt: "Auto 模型",
    },
  },
  {
    id: "deployment",
    tabLabel: "模型部署",
    eyebrow: "企业级能力",
    title: "大模型服务部署",
    description:
      "支持私有化部署与云端弹性扩缩，覆盖模型适配、推理加速与运维保障，支撑关键业务稳定运行。",
    ctaLabel: "了解详情",
    ctaHref: "/enterprise",
    layout: "stacked",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.yellow,
      orbSecondary: LOGO_COLORS.orange,
      accent: LOGO_COLORS.orange,
      logoSrc: `${HERO_LOGOS}/deployment.svg`,
      logoAlt: "大模型服务部署",
    },
  },
];

export const productCards: SfProductCard[] = [
  {
    title: "一体化大模型 API 服务",
    description:
      "涵盖文本、语音、图像与视频等模态，统一 API 入口、按量计费，帮助团队快速完成能力接入与产品迭代。",
    ctaLabel: "立即体验",
    ctaHref: "/me/models",
    illustration: "api",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
    },
  },
  {
    title: "免费的 Auto 模型",
    description:
      "智能路由自动选型，在速度、成本与效果之间动态平衡；限时免费体验，零门槛接入大模型能力。",
    ctaLabel: "立即试用",
    ctaHref: "/me/models",
    illustration: "auto",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: LOGO_COLORS.cyan,
      accent: "#7ab82e",
    },
  },
  {
    title: "模型推理性能优化服务",
    description:
      "依托开源推理引擎，兼容主流开源模型及客户自研模型，覆盖选型适配、部署调优到线上运维的全流程，显著提升推理效率。",
    ctaLabel: "联系我们",
    ctaHref:
      "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb",
    illustration: "inference",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#8b5cf6",
      orbSecondary: LOGO_COLORS.magenta,
      accent: "#7c3aed",
    },
  },
  {
    title: "本地私有化部署",
    description:
      "面向有合规与数据主权要求的企业，提供可落地的私有化方案，覆盖性能调优、集群部署与持续运维，灵活匹配各类业务场景。",
    ctaLabel: "了解详情",
    ctaHref: "/enterprise",
    illustration: "deploy",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.yellow,
      orbSecondary: LOGO_COLORS.orange,
      accent: LOGO_COLORS.orange,
    },
  },
];

export const whyHighlightCards: SfWhyHighlightCard[] = [
  {
    title: "高速推理",
    textBlocks: [
      {
        lines: [[{ text: "开源推理引擎", emphasis: true }]],
      },
      {
        lines: [
          [{ text: "多节点冗余保障，" }],
          [{ text: "保障高并发稳定输出", emphasis: true }],
        ],
        className: "mb-8",
      },
    ],
    stats: [
      { prefix: "端到端延迟最多可压缩", value: "70%" },
      { prefix: "吞吐性能深度优化，处理能力可提升至原来的", value: "3-5 倍" },
    ],
    footnotes: [
      [{ text: "从容应对高并发、大批量推理 workload" }],
      [{ text: "有效缩短单次推理耗时" }],
      [{ text: "为时延敏感型应用提供稳定、可预期的" }, { text: "响应表现", emphasis: true }],
    ],
    illustration: "inference-speed",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#8b5cf6",
      orbSecondary: LOGO_COLORS.blue,
      accent: "#7c3aed",
    },
  },
  {
    title: "高性价比",
    textBlocks: [
      {
        lines: [
          [{ text: "全链路" }, { text: "成本治理", emphasis: true }],
          [{ text: "推理与部署支出明显下降" }],
        ],
        className: "mb-8",
      },
      {
        lines: [
          [
            { text: "弹性计费" },
            { text: "按需结算", emphasis: true },
          ],
          [{ text: "避免资源闲置，支出更可控" }],
        ],
        className: "mb-4",
      },
      {
        lines: [
          [{ text: "高度解耦", emphasis: true }, { text: "异构算力架构" }],
          [{ text: "无缝调度主流 AI 芯片，不受单一硬件生态限制" }],
        ],
      },
    ],
    illustration: "heterogeneous-chips",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.lime,
      accent: LOGO_COLORS.blue,
    },
  },
];

export const featureCards: SfFeatureCard[] = [
  {
    title: "高稳定性",
    illustration: "stability",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.blue,
      orbSecondary: "#6366f1",
      accent: "#4f46e5",
    },
    items: [
      "经大量开发者实战检验，服务长期稳定可用。",
      "配套监控告警与故障自愈机制，持续保障服务可用性。",
      "企业级技术支持团队随时响应，满足关键业务对 SLA 的要求。",
    ],
  },
  {
    title: "高智能",
    illustration: "intelligence",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.magenta,
      orbSecondary: LOGO_COLORS.pink,
      accent: LOGO_COLORS.magenta,
    },
    items: [
      "汇集前沿大语言模型与音视频等多模态能力，一站式调用。",
      "弹性伸缩随业务体量增长，从容覆盖多样化应用场景。",
      "用量与费用可视化分析，辅助决策、精准把控投入产出。",
    ],
  },
  {
    title: "高安全性",
    illustration: "security",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: "#10a37f",
      accent: "#059669",
    },
    items: [
      "BYOC 模式可选，数据不离域，隐私与业务安全有保障。",
      "计算、网络、存储三层隔离，筑牢数据安全防线。",
      "遵循行业规范与合规标准，满足企业级安全与审计要求。",
    ],
  },
  {
    title: "高扩展性",
    illustration: "scalability",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.orange,
      orbSecondary: LOGO_COLORS.yellow,
      accent: "#ea580c",
    },
    items: [
      "弹性扩缩容应对流量波动，适配各类复杂业务形态。",
      "自定义模型快速上线，从容应对规模化部署需求。",
      "架构灵活可扩展，兼顾多元任务场景，支持混合云与多云部署。",
    ],
  },
];

export const industryItems: SfIndustryItem[] = [
  {
    title: "互联网",
    description:
      "为互联网平台提供智能内容生成与个性化推荐能力，支持模型热切换与推理加速，提升 GPU 利用率，突破性能瓶颈，全面优化用户体验与运营效率。",
    illustration: "internet",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.cyan,
      orbSecondary: LOGO_COLORS.blue,
      accent: LOGO_COLORS.blue,
    },
  },
  {
    title: "教育",
    description:
      "打造智能教学助手，通过多模型协同规划个性化学习路径，即时答疑辅导，显著提升教学效率与学生体验。",
    illustration: "education",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.lime,
      orbSecondary: LOGO_COLORS.cyan,
      accent: "#7ab82e",
    },
  },
  {
    title: "政务",
    description:
      "以高吞吐、低延迟的推理能力，为智慧政务、公共安全与产业升级等场景提供高性价比的生成式 AI 方案，兼容异构算力与多种部署形态，不绑定特定芯片厂商或硬件生态。",
    illustration: "government",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: "#8b5cf6",
      orbSecondary: LOGO_COLORS.magenta,
      accent: "#7c3aed",
    },
  },
  {
    title: "智算中心",
    description:
      "优化算力资源调度与分配，加速 AI 模型训练迭代与大规模推理服务部署。",
    illustration: "compute",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.yellow,
      orbSecondary: LOGO_COLORS.orange,
      accent: LOGO_COLORS.orange,
    },
  },
  {
    title: "AI 硬件",
    description:
      "面向 AI 移动终端、推理一体机与具身智能等场景，降低端云协同链路时延，提升整体响应体验。",
    illustration: "ai-hardware",
    background: {
      base: BRAND_THEME.cardSurface,
      orbPrimary: LOGO_COLORS.magenta,
      orbSecondary: LOGO_COLORS.pink,
      accent: LOGO_COLORS.magenta,
    },
  },
];

export { logoRow1, logoRow2, logoRow3 } from "./partner-logos";

export const partnersBg = `${A}/partners-bg.svg`;
