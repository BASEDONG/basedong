import type { ReservedStrings } from "../content-types";

export const zhCN: ReservedStrings = {
  pageTitle: "八色鸫预留实例服务｜大模型预留算力与企业级推理部署",
  pageDescription:
    "锁定算力，支撑关键业务稳定运行。可预期性能 · 高用量场景更优成本结构 · 企业级 SLA 保障",
  heroLogoAlt: "预留实例服务",
  heroTitle: "锁定算力",
  heroTitleAccent: "支撑关键业务稳定运行",
  heroSubtitle: "可预期性能 · 高用量场景更优成本结构 · 企业级 SLA 保障",
  consultCta: "预约咨询",
  whyBadge: "WHY RESERVED",
  whyTitle: "为什么选择预留实例服务",
  whySubtitle:
    "面向企业核心推理场景，提供独占算力、精度保障与成本优化的一站式解决方案。",
  whyCards: [
    {
      title: "专属预留算力",
      items: [
        "为核心业务预留专属算力资源，在高峰期依然保持稳定服务能力。",
        "避免共享资源环境下的算力竞争，保障关键业务持续运行。",
      ],
    },
    {
      title: "模型精度保障",
      items: [
        "部署过程中，依托自研高性能推理框架进行适配优化，确保推理效果与原厂一致。",
        "确保推理智能水平稳定，让关键业务场景持续获得高质量输出。",
      ],
    },
    {
      title: "成本可控与规模化优势",
      items: [
        "按固定周期规划费用，避免按量计费随调用量波动带来的成本不确定性。",
        "在稳定高负载等特定场景下，具备更优的成本结构，助力企业实现长期预算可控与成本优化。",
      ],
    },
    {
      title: "企业级 SLA 性能护航",
      items: [
        "提供企业级服务等级保障，确保关键推理任务稳定运行。",
        "支持长期稳定负载与核心业务系统接入。",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "预留实例参考性能与价格",
  pricingSubtitle:
    "预留实例支持多种算力规格，可根据模型类型、并发需求与业务规模灵活配置。以下展示部分模型在不同实例规格下的参考性能与定价。",
  highPerfTitle: "高性能实例规格",
  standardTitle: "标准版实例规格",
  pricingNote1:
    "折合单价是基于上表 TPM、按每月 30 天、总体利用率 50% 的基准进行折算。",
  pricingNote2:
    "性能数据基于典型推理参数测试：输入 24k tokens，输出 1k tokens，缓存命中率 80%。",
  pricingFootCtaBefore: "上述为示例规格，更多模型规格及定制部署方案欢迎",
  pricingFootCtaAfter: "。",
  costReferenceLabel: "费用参考",
  priceLabel: "价格",
  unitPriceLabel: "折合单价",
  perfReferenceLabel: "性能参考",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "企业级交付与运行保障",
  deliverySteps: [
    {
      title: "快速部署交付",
      description:
        "标准预留实例通常在 1–7 个工作日内完成部署，支持快速接入现有业务系统，缩短业务上线周期。",
    },
    {
      title: "部署与性能优化",
      description:
        "平台负责完成模型部署与性能验证，提供推理性能调优支持，保障业务稳定接入。",
    },
    {
      title: "弹性扩展能力",
      description:
        "支持根据业务规模进行算力扩展与规格调整，满足业务增长及阶段性流量变化需求。",
    },
    {
      title: "服务等级保障（SLA）",
      description:
        "提供明确的服务等级协议与运行保障机制，支持长期稳定负载与企业级业务接入。",
    },
  ],
  ctaBadge: "支持专属定制",
  ctaTitle: "开启专属算力\n加速业务增长",
  ctaBody:
    "支持更多模型预留实例部署方案，我们的专家团队将根据您的业务需求，提供更贴合场景的定制化解决方案与报价建议。",
  ctaCardTitle: "获取更多模型预留实例信息",
  ctaCardBody: "欢迎预约咨询，获取详细规格、部署方案与报价信息",
  ctaButton: "立即咨询",
  highPerfModels: [
    {
      description:
        "适用于企业级智能体开发、复杂任务规划与多步骤执行、软件工程自动化、长文档分析及代码生成等场景。",
      price: "¥ 772,200 /组/月",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "1000 万",
    },
    {
      description:
        "适用于企业级多模态智能体开发、视觉内容理解与分析、设计稿/界面生成代码、复杂任务自动化执行等场景。",
      price: "¥ 772,200 /组/月",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "400 万",
    },
    {
      description:
        "适用于企业级长文档与知识库分析、智能客服与内容生成、复杂业务流程自动化、企业应用智能化升级等场景。",
      price: "¥ 386,100 /组/月",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "500 万",
    },
    {
      description:
        "适用于企业级复杂推理与决策分析、代码生成与软件开发辅助、智能体工具调用、数据分析与自动化流程执行等场景。",
      price: "¥ 772,200 /组/月",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "1250 万",
    },
  ],
  standardModels: [
    {
      description:
        "适用于企业级多模态智能体开发、视觉内容理解与分析、设计稿/界面生成代码、复杂任务自动化执行等场景。",
      price: "¥ 486,000 /组/月",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "530 万",
    },
    {
      description:
        "适用于企业级长文档与知识库分析、智能客服与内容生成、复杂业务流程自动化、企业应用智能化升级等场景。",
      price: "¥ 486,000 /组/月",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "900 万",
    },
    {
      description:
        "适用于企业级复杂推理与决策分析、代码生成与软件开发辅助、智能体工具调用、数据分析与自动化流程执行等场景。",
      price: "¥ 486,000 /组/月",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "1080 万",
    },
  ],
};
