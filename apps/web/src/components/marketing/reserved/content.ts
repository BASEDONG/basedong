export const RV_ASSETS =
  "/assets/marketing/reserved/images";

export const CONSULT_URL =
  "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb?from=navigation";

export const whyCards = [
  {
    title: "专属预留算力",
    items: [
      "为核心业务预留专属算力资源，在高峰期依然保持稳定服务能力。",
      "避免共享资源环境下的算力竞争，保障关键业务持续运行。",
    ],
    bg: `${RV_ASSETS}/why-bg-1.png`,
    icon: `${RV_ASSETS}/why-icon-1.svg`,
  },
  {
    title: "模型精度保障",
    items: [
      "部署过程中，依托自研高性能推理框架进行适配优化，确保推理效果与原厂一致。",
      "确保推理智能水平稳定，让关键业务场景持续获得高质量输出。",
    ],
    bg: `${RV_ASSETS}/why-bg-2.png`,
    icon: `${RV_ASSETS}/why-icon-2.svg`,
  },
  {
    title: "成本可控与规模化优势",
    items: [
      "按固定周期规划费用，避免按量计费随调用量波动带来的成本不确定性。",
      "在稳定高负载等特定场景下，具备更优的成本结构，助力企业实现长期预算可控与成本优化。",
    ],
    bg: `${RV_ASSETS}/why-bg-3.png`,
    icon: `${RV_ASSETS}/why-icon-3.svg`,
  },
  {
    title: "企业级 SLA 性能护航",
    items: [
      "提供企业级服务等级保障，确保关键推理任务稳定运行。",
      "支持长期稳定负载与核心业务系统接入。",
    ],
    bg: `${RV_ASSETS}/why-bg-4.png`,
    icon: `${RV_ASSETS}/why-icon-4.svg`,
  },
] as const;

export type PricingModel = {
  brand: string;
  model: string;
  description: string;
  price: string;
  unitPrice: string;
  tpm: string;
  ttft: string;
  tps: string;
};

export const highPerformanceModels: PricingModel[] = [
  {
    brand: "Zai",
    model: "zai-org/GLM-5.1",
    description:
      "适用于企业级智能体开发、复杂任务规划与多步骤执行、软件工程自动化、长文档分析及代码生成等场景。",
    price: "¥ 772,200 /组/月",
    unitPrice: "¥ 3.575 / M tokens",
    tpm: "1000 万",
    ttft: "1500 ms",
    tps: "30",
  },
  {
    brand: "Kimi",
    model: "moonshotai/Kimi-K2.6",
    description:
      "适用于企业级多模态智能体开发、视觉内容理解与分析、设计稿/界面生成代码、复杂任务自动化执行等场景。",
    price: "¥ 772,200 /组/月",
    unitPrice: "¥ 8.938 / M tokens",
    tpm: "400 万",
    ttft: "1500 ms",
    tps: "30",
  },
  {
    brand: "MiniMax",
    model: "MiniMaxAI/MiniMax-M2.5",
    description:
      "适用于企业级长文档与知识库分析、智能客服与内容生成、复杂业务流程自动化、企业应用智能化升级等场景。",
    price: "¥ 386,100 /组/月",
    unitPrice: "¥ 3.575 / M tokens",
    tpm: "500 万",
    ttft: "500 ms",
    tps: "30",
  },
  {
    brand: "deepseek",
    model: "deepseek-ai/DeepSeek-V3.2",
    description:
      "适用于企业级复杂推理与决策分析、代码生成与软件开发辅助、智能体工具调用、数据分析与自动化流程执行等场景。",
    price: "¥ 772,200 /组/月",
    unitPrice: "¥ 2.86 / M tokens",
    tpm: "1250 万",
    ttft: "1600 ms",
    tps: "45",
  },
];

export const standardModels: PricingModel[] = [
  {
    brand: "Kimi",
    model: "moonshotai/Kimi-K2.6",
    description:
      "适用于企业级多模态智能体开发、视觉内容理解与分析、设计稿/界面生成代码、复杂任务自动化执行等场景。",
    price: "¥ 486,000 /组/月",
    unitPrice: "¥ 4.25 / M tokens",
    tpm: "530 万",
    ttft: "2100 ms",
    tps: "20",
  },
  {
    brand: "MiniMax",
    model: "MiniMaxAI/MiniMax-M2.5",
    description:
      "适用于企业级长文档与知识库分析、智能客服与内容生成、复杂业务流程自动化、企业应用智能化升级等场景。",
    price: "¥ 486,000 /组/月",
    unitPrice: "¥ 2.50 / M tokens",
    tpm: "900 万",
    ttft: "1300 ms",
    tps: "21",
  },
  {
    brand: "deepseek",
    model: "deepseek-ai/DeepSeek-V3.2",
    description:
      "适用于企业级复杂推理与决策分析、代码生成与软件开发辅助、智能体工具调用、数据分析与自动化流程执行等场景。",
    price: "¥ 486,000 /组/月",
    unitPrice: "¥ 2.08 / M tokens",
    tpm: "1080 万",
    ttft: "1900 ms",
    tps: "22",
  },
];

export const deliverySteps = [
  {
    num: "1",
    title: "快速部署交付",
    description:
      "标准预留实例通常在 1–7 个工作日内完成部署，支持快速接入现有业务系统，缩短业务上线周期。",
    icon: `${RV_ASSETS}/delivery-icon-1.svg`,
  },
  {
    num: "2",
    title: "部署与性能优化",
    description:
      "平台负责完成模型部署与性能验证，提供推理性能调优支持，保障业务稳定接入。",
    icon: `${RV_ASSETS}/delivery-icon-2.svg`,
  },
  {
    num: "3",
    title: "弹性扩展能力",
    description:
      "支持根据业务规模进行算力扩展与规格调整，满足业务增长及阶段性流量变化需求。",
    icon: `${RV_ASSETS}/delivery-icon-3.svg`,
  },
  {
    num: "4",
    title: "服务等级保障（SLA）",
    description:
      "提供明确的服务等级协议与运行保障机制，支持长期稳定负载与企业级业务接入。",
    icon: `${RV_ASSETS}/delivery-icon-4.svg`,
  },
] as const;
