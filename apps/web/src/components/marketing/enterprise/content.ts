import type {

  SfFeatureCard,

  SfGradientPalette,

  SfIndustryItem,

  SfProductCard,

} from "@/types/siliconflow-cn-10b89bdc";

import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";



export const ENT_ASSETS = "/assets/marketing/enterprise/images";

const HERO_LOGOS = "/assets/marketing/home/images/hero-logos";



export const CONSULT_URL =

  "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb";



export const heroBackground: SfGradientPalette = {

  base: BRAND_THEME.cardSurface,

  orbPrimary: LOGO_COLORS.yellow,

  orbSecondary: LOGO_COLORS.orange,

  accent: LOGO_COLORS.orange,

  logoSrc: `${HERO_LOGOS}/deployment.svg`,

  logoAlt: "企业级大模型服务平台",

};



export const heroTags = [

  "多厂商算力兼容",

  "多源算力统一治理",

  "新模型快速接入",

  "生产级稳定高吞吐",

  "更优投入产出比",

];



export const introSummary =

  "八色鸫企业级大模型服务平台，面向跨国组织与企业客户构建覆盖异构算力治理、模型训练、推理上线与场景应用的完整能力链路。以更低总体成本、更短交付周期、更优运行性能与更可靠的服务质量，支撑大模型应用从试点到规模化生产，满足研发、测试与运营全阶段需求。";



export const introCards: SfProductCard[] = [

  {

    title: "多架构算力池化与智能调度",

    description:

      "兼容 GPU、NPU 等多架构、多品牌算力的统一接入与智能调度，不绑定单一芯片厂商，帮助组织在现有硬件投资上获得一致的性能与运维体验。",

    ctaLabel: "",

    ctaHref: "",

    illustration: "deploy",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.yellow,

      orbSecondary: LOGO_COLORS.orange,

      accent: LOGO_COLORS.orange,

    },

  },

  {

    title: "主流模型开箱即用与深度调优",

    description:

      "预置主流开源大模型成熟方案，针对训练与推理链路持续优化，缩短从选型到上线的路径。",

    ctaLabel: "",

    ctaHref: "",

    illustration: "inference",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.cyan,

      orbSecondary: LOGO_COLORS.blue,

      accent: LOGO_COLORS.blue,

    },

  },

  {

    title: "图形化配置与标准 API 双通道",

    description:

      "可视化控制台配合标准 API，降低技术门槛，快速对接多种业务场景。",

    ctaLabel: "",

    ctaHref: "",

    illustration: "api",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.magenta,

      orbSecondary: LOGO_COLORS.pink,

      accent: LOGO_COLORS.magenta,

    },

  },

  {

    title: "算力·模型·应用一体化运维",

    description:

      "对算力、模型与应用进行统一观测、调优与回收，保障长期稳定、可持续运营。",

    ctaLabel: "",

    ctaHref: "",

    illustration: "auto",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.lime,

      orbSecondary: "#10a37f",

      accent: "#059669",

    },

  },

];



export type EnterpriseArchLayer =
  | {
      kind: "apps";
      title: string;
      modules: string[];
    }
  | {
      kind: "divider";
      title: string;
    }
  | {
      kind: "section";
      title: string;
      modules: string[];
    }
  | {
      kind: "vendors";
      title: string;
      vendors: string[];
    };

/** Structured rebuild of the former arch-layer-*.svg stack. */
export const enterpriseArchLayers: EnterpriseArchLayer[] = [
  {
    kind: "apps",
    title: "行业应用",
    modules: ["能源", "智算", "政府", "通信", "金融", "教育", "互联网"],
  },
  {
    kind: "divider",
    title: "API / 应用",
  },
  {
    kind: "section",
    title: "模型应用开发支撑",
    modules: [
      "向量数据库",
      "应用开发框架",
      "RAG",
      "Agent",
      "Prompt 工程",
      "应用调试与发布",
      "开发工具链",
    ],
  },
  {
    kind: "section",
    title: "模型部署与推理",
    modules: [
      "模型部署",
      "推理加速",
      "端到端优化",
      "视频生成",
      "资源配置",
      "监控管理",
      "模型管理",
    ],
  },
  {
    kind: "section",
    title: "模型训练与调优",
    modules: [
      "数据接入",
      "数据处理",
      "模型训练",
      "模型微调",
      "模型对齐",
      "性能调优",
      "任务管理",
    ],
  },
  {
    kind: "vendors",
    title: "模型",
    vendors: [
      "DeepSeek",
      "Kimi",
      "Qwen",
      "智谱",
      "Wan",
      "MiniMax",
      "阶跃星辰",
    ],
  },
  {
    kind: "section",
    title: "算力资源管理",
    modules: [
      "异构资源适配与管理",
      "算力配额管理",
      "算力资源池化管理",
      "算力资源容器化管理",
      "任务流调度管理",
      "作业管理调度",
      "用户与系统管理",
    ],
  },
  {
    kind: "vendors",
    title: "芯片",
    vendors: [
      "NVIDIA",
      "AMD",
      "Ascend",
      "XPU",
      "沐曦",
      "摩尔线程",
      "燧原",
      "海光",
      "寒武纪",
      "昆仑芯",
    ],
  },
];



export const advantageCards: SfFeatureCard[] = [

  {

    title: "快上线 · 缩短交付，敏捷响应业务",

    illustration: "scalability",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.orange,

      orbSecondary: LOGO_COLORS.yellow,

      accent: "#ea580c",

    },

    items: [

      "预集成 100+ 主流大模型，开箱即用",

      "模型镜像持续更新，新版本优先支持",

      "工具链覆盖训练、推理、微调、部署全环节",

    ],

  },

  {

    title: "稳运行 · 生产级性能，扛住核心负载",

    illustration: "stability",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.blue,

      orbSecondary: "#6366f1",

      accent: "#4f46e5",

    },

    items: [

      "推理框架深度优化：延迟最高降 70%，吞吐提升 3–5 倍",

      "算力与模型服务智能负载均衡",

      "秒级弹性伸缩，在性能与成本间动态平衡",

    ],

  },

  {

    title: "选对型 · 科学选型，兼顾效果与安全",

    illustration: "intelligence",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.magenta,

      orbSecondary: LOGO_COLORS.pink,

      accent: LOGO_COLORS.magenta,

    },

    items: [

      "模型仓库支持标签检索，快速锁定候选",

      "内置 20+ 项核心性能评测指标，辅助决策",

    ],

  },

  {

    title: "控成本 · 精打细算，放大 ROI",

    illustration: "scalability",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.cyan,

      orbSecondary: LOGO_COLORS.lime,

      accent: LOGO_COLORS.blue,

    },

    items: [

      "计算与显存精细调度，单位算力成本显著下降",

      "无损动态量化，降低单次推理算力消耗",

    ],

  },

  {

    title: "好上手 · 低学习成本，人人可用",

    illustration: "scalability",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.pink,

      orbSecondary: LOGO_COLORS.magenta,

      accent: LOGO_COLORS.magenta,

    },

    items: [

      "异构算力统一视图，自动化部署与调度",

      "可视化操作，3 分钟内完成基础配置",

      "30+ 预置模板，免手工调参即可启动",

    ],

  },

  {

    title: "守安全 · 全链路防护，合规可审计",

    illustration: "security",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.lime,

      orbSecondary: "#10a37f",

      accent: "#059669",

    },

    items: [

      "端到端数据安全与合规体系，泄露风险大幅降低",

      "实时威胁拦截，内容安全识别准确率 99%+",

    ],

  },

];



export type EnterpriseScenario = SfIndustryItem & {

  id: string;

  tab: string;

  advantages: string[];

  image: string;

};



export const scenarios: EnterpriseScenario[] = [

  {

    id: "enterprise",

    tab: "企业级异构算力纳管平台",

    title: "企业级异构算力纳管平台",

    description:

      "服务企业数字化与智能化升级，打通算力治理、模型训练到推理部署的完整服务链；以高性能调度与模块化架构，让算力资源与 AI 应用高效协同、平滑对接。",

    advantages: [

      "全链路一站式能力，覆盖算力纳管、模型训练与推理部署",

      "大模型快速上线、弹性扩缩与高并发调用，满足多场景实时响应",

      "标准化开放接口，便于与现有系统集成与持续演进",

    ],

    illustration: "compute",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.cyan,

      orbSecondary: LOGO_COLORS.blue,

      accent: LOGO_COLORS.blue,

    },

    image: `${ENT_ASSETS}/scenario-1.svg`,

  },

  {

    id: "aicenter",

    tab: "智算中心开放平台",

    title: "智算中心开放平台",

    description:

      "基于异构算力融合能力，实现跨架构资源统一调度与弹性供给，解决大规模算力治理、开源模型集成与高并发 AI 服务稳定性问题，提升部署与交付效率。",

    advantages: [

      "多类智算资源统一管控，调度灵活高效",

      "集成前沿开源模型，多场景快速适配",

      "高可用与弹性扩展，保障服务稳定运行",

    ],

    illustration: "ai-hardware",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.magenta,

      orbSecondary: LOGO_COLORS.pink,

      accent: LOGO_COLORS.magenta,

    },

    image: `${ENT_ASSETS}/scenario-2.svg`,

  },

  {

    id: "energy",

    tab: "能源行业",

    title: "能源行业",

    description:

      "以大小模型协同为核心，为能源企业提供覆盖训练、微调到应用部署的 AI 服务能力，推动产业数字化与运营效能提升。",

    advantages: [

      "训练—推理—部署一体化，模型快速上线与灵活调用",

      "适配重工业场景，保障关键系统稳定运行",

      "兼容 GPU、NPU 等多类算力，降低部署与运维成本",

    ],

    illustration: "government",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.lime,

      orbSecondary: LOGO_COLORS.yellow,

      accent: LOGO_COLORS.lime,

    },

    image: `${ENT_ASSETS}/scenario-3.svg`,

  },

  {

    id: "manufacturing",

    tab: "制造行业",

    title: "制造行业",

    description:

      "借助大模型解析复杂试验与生产数据，自动识别关键模式与异常，提升分析速度与决策质量，缓解人工分析慢、易遗漏的痛点。",

    advantages: [

      "高性能大参数量推理，满足制造场景智能识别需求",

      "模型能力嵌入业务流程，推动产线智能化与自动化",

      "支持热更新与快速部署，保障产线连续运行",

    ],

    illustration: "compute",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.orange,

      orbSecondary: LOGO_COLORS.yellow,

      accent: LOGO_COLORS.orange,

    },

    image: `${ENT_ASSETS}/scenario-4.svg`,

  },

  {

    id: "transport",

    tab: "交通行业",

    title: "交通行业",

    description:

      "融合边缘 CV 小模型实时处理与云端多模态大模型语义理解，构建智能交通管理方案，对事故、违法等复杂事件进行语义级研判并生成处置建议，提升执法智能化与响应速度。",

    advantages: [

      "本地高性能部署，满足安全与合规要求",

      "图文混合深度理解，适配复杂交通事件识别与分析",

      "可集成最新多模态微调成果，保持平台可演进",

    ],

    illustration: "internet",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.blue,

      orbSecondary: LOGO_COLORS.cyan,

      accent: LOGO_COLORS.blue,

    },

    image: `${ENT_ASSETS}/scenario-5.svg`,

  },

  {

    id: "carrier",

    tab: "运营商",

    title: "运营商",

    description:

      "面向高并发、低时延运营场景的高性能推理引擎，以最小改造接入现有系统，释放异构算力价值，加速智能化能力商用。",

    advantages: [

      "运营级 SLA 保障，服务响应高效稳定",

      "低改造成本接入自有模型体系",

      "即插即用，缩短上线周期",

      "兼容主流异构算力环境，盘活既有硬件投资",

    ],

    illustration: "ai-hardware",

    background: {

      base: BRAND_THEME.cardSurface,

      orbPrimary: LOGO_COLORS.pink,

      orbSecondary: LOGO_COLORS.magenta,

      accent: LOGO_COLORS.magenta,

    },

    image: `${ENT_ASSETS}/scenario-6.svg`,

  },

];



export const testimonials = [

  {

    company: "某云算力服务企业",

    quote:

      "我们与八色鸫协同建设面向企业客户的算力服务平台。借助其硬件无关的推理框架与多厂商算力编排能力，我们得以在保持服务稳定性的同时，逐步摆脱单一 GPU 厂商绑定，将工作负载灵活调度至多种加速器之上。推理加速、动态路由与显存优化显著提升了集群整体利用率，也降低了下游客户的推理成本。对多种模型架构的灵活支持，让我们能够服务更加多元化的大模型需求。",

    image: `${ENT_ASSETS}/testimonial-1.jpg`,

  },

  {

    company: "某软件与系统集成企业",

    quote:

      "八色鸫的大模型服务平台为我们服务各行业客户提供了有力支撑。统一的开发接口、灵活的模型微调能力以及完整的工具链，显著缩短了我们在金融、政务、教育等场景中的方案交付周期。推理效率高、私有化部署便捷，降低了客户侧的实施门槛。其技术团队响应及时，在关键节点与我们高效协同，已成为我们构建智能化服务能力的重要伙伴。",

    image: `${ENT_ASSETS}/testimonial-2.jpg`,

  },

  {

    company: "某交通信息化企业",

    quote:

      "在构建云边协同的智能交通体系过程中，八色鸫的大模型平台为我们的解决方案注入了可靠的认知智能能力。平台对垂直场景数据的学习能力以及多模态任务支持，使其能够贴合行业术语与业务语境。我们已落地智能辅助决策类应用，在故障研判与指挥调度等环节提升了效率与响应速度。本地化部署的性能、易集成性以及场景化定制能力，很好地匹配了我们的业务要求。",

    image: `${ENT_ASSETS}/testimonial-3.jpg`,

  },

  {

    company: "某能源企业",

    quote:

      "我们基于平台成功部署了面向本行业的专属大模型。出色的异构算力管理能力与大小模型协同架构，在故障智能诊断、采购辅助、用电异常分析等场景中带来了可感知的效率提升。私有化部署保障了核心业务的数据安全与合规可控，平台长期运行的稳定性为数字化升级提供了可靠的 AI 底座，推动关键业务流程向更智能、更精准的方向演进。",

    image: `${ENT_ASSETS}/testimonial-4.jpg`,

  },

];



export const faqItems = [

  {

    question: "什么情况下企业适合建设私有化 MaaS？",

    answer: `当您的组织面临以下任一情况时，适合考虑建设私有化 MaaS 平台：



① 业务涉及敏感数据（如能源生产、金融交易、研发数据），对数据留在企业内网有严格要求；

② 需要将 AI 能力规模化部署至众多业务终端或场景，对推理性能与稳定性有极高要求；

③ 在多个地区或业务单元拥有不同品牌、不同架构的异构算力，需要统一纳管与高效利用；

④ 希望快速跟进 AI 技术发展，但缺乏持续进行模型适配和优化的工程团队。`,

  },

  {

    question: "选型私有化 MaaS 应看哪些关键维度？",

    answer: `建议从五个维度综合评估：



① 技术敏捷性（模型库是否丰富、新模型引入是否快速）；

② 选型精准度（是否提供基于自身数据的模型评估与优化工具）；

③ 生产级性能（推理延迟、吞吐量及资源弹性能力）；

④ 安全合规性（是否具备多租户隔离、审计日志、内容过滤等企业级防护）；

⑤ 易用与可运维性（是否提供可视化界面与统一调度，降低使用门槛）。`,

  },

  {

    question: "平台支持哪些芯片？能否在不同厂商硬件上发挥稳定性能？",

    answer:

      "平台采用硬件无关的架构设计，支持 NVIDIA、AMD 等主流 GPU 以及各类 NPU / 加速器，不对任何单一芯片厂商形成绑定。通过统一的推理框架与算力编排能力，可在客户现有或混合采购的硬件环境中稳定运行，并完成 100+ 款主流模型的适配与优化。在多家跨国客户的实践中，平台已在多区域、多厂商算力环境下实现高效、稳定的生产级推理服务。",

  },

  {

    question: "多业务场景下如何高效选型模型？",

    answer:

      "平台内置标签化模型广场，您可按任务类型、模态、参数量等维度筛选。更重要的是，可通过自研测评工具链，使用您的业务数据对多个候选模型进行效果与性能对比，并结合一键调优功能进行低成本适配，从而科学、高效地锁定最合适的模型，降低试错成本。",

  },

  {

    question: "怎样在性能与成本之间取得平衡？",

    answer:

      "我们通过自研高性能推理引擎（集成 PD 分离、KV Cache 量化等技术）显著提升吞吐、降低延迟，减少单次任务算力消耗。同时，智能服务网关与秒级弹性扩缩容机制，能根据实时负载动态调度资源，避免算力闲置。这套组合拳在保障关键业务稳定性的同时，实现了更优的总体拥有成本（TCO）。",

  },

  {

    question: "私有化部署下数据安全如何保障？",

    answer:

      "平台基于私有化部署，确保所有数据与模型运行于企业内部环境。同时，我们构建了端到端纵深防御体系，包括多租户资源隔离、细粒度权限控制、全链路操作审计以及实时内容安全检测，满足金融、能源、政务等行业对数据安全与合规审计的严苛要求。",

  },

  {

    question: "业务人员能否独立完成 AI 应用部署？",

    answer:

      "可以。平台提供全流程可视化操作界面，从模型选择、部署、测试到服务上线，均可通过图形化界面完成，极大降低了使用门槛。业务人员经过简单培训即可自主完成模型调用与应用搭建，让 AI 能力真正赋能一线业务创新。",

  },

  {

    question: "能否支撑大规模「研·建·用」落地？",

    answer:

      "可以。八色鸫私有化 MaaS 平台正是为大规模、企业级 AI 赋能而设计。我们已助力多家能源企业成功实践规模化落地，平台具备万卡级异构算力统一调度能力、高并发稳定服务保障以及精细化资源管理，能够支撑从模型研发、智能体开发到海量终端推理的完整规模化应用链条。",

  },

  {

    question: "是否具备行业纵深场景能力？",

    answer:

      "是的。平台不仅提供通用大模型能力，更支持与行业知识结合，构建垂直领域专用模型。在电力、油气、制造等行业，我们已成功落地故障诊断、安全生产、研发辅助、运维优化等场景，通过平台工具链可高效完成行业数据的处理、模型精调与应用集成。",

  },

  {

    question: "从部署到上线通常需要多久？后续支持如何？",

    answer:

      "针对客户现有的主流加速器与混合算力环境，我们提供经过验证的标准化部署方案，典型交付周期以周为单位计算。八色鸫提供专业的全程技术支撑服务，包括部署实施、技术培训、运维保障及持续的版本升级服务，确保平台稳定运行并与前沿技术同步。",

  },

];


