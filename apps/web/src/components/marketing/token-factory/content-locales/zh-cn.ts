import type { TokenFactoryStrings } from "../content-types";

export const zhCN: TokenFactoryStrings = {
  heroLogoAlt: "AI 算力运营平台",
  heroBrandName: "八色鸫",
  heroTitle: "AI 算力运营平台",
  heroSubtitle: "把闲置或自有算力，快速变成可持续运转的 Token 产能",
  heroTags: ["GPU 弹性编排", "Token 产能", "多架构兼容", "按量计费"],
  heroCta: "预约沟通",
  featuresTitle: "稳定、可扩展的 Token 产能",
  featuresSubtitle: "让硬件投入持续变成可计量的 AI 生产力",
  featureCards: [
    {
      title: "面向真实业务场景",
      description:
        "覆盖编程助手、智能体、对话与企业应用等高并发场景，为线上业务提供可持续、可计量的 Token 供给。",
    },
    {
      title: "多架构弹性编排",
      description:
        "将不同架构、不同规格的算力纳入同一调度平面，动态分配与秒级伸缩，让集群产能保持高效运转。",
    },
    {
      title: "单位算力吞吐提升",
      description:
        "依托开源推理引擎深度优化推理链路，在同等硬件条件下提高单卡 Token 产出，放大既有投资回报。",
    },
    {
      title: "主流 GPU 统一接入",
      description:
        "面向各类主流 GPU 与 AI 加速卡提供统一接入能力，不绑定单一硬件厂商，便于按需扩展 Token 产能。",
    },
  ],
  architectureBadge: "能力栈",
  architectureTitleLine1: "从硬件资源",
  architectureTitleLine2: "到可用服务",
  architectureBodyPrefix:
    "八色鸫以完整的算力运营栈，帮助各类主流 GPU 资源快速形成稳定、可对外交付的",
  architectureBodySuffix: "能力。",
  architectureLayers: [
    {
      title: "业务应用与终端客户",
      subtitle: "智能体 · 编程助手 · 企业系统",
    },
    {
      title: "推理服务层",
      subtitle: "开放接口 · 模型供给 · 服务治理",
    },
    {
      title: "算力运营层",
      subtitle: "加速引擎 · 统一调度 · 运维保障",
    },
    {
      title: "底层算力资源",
      subtitle: "主流 GPU · AI 加速卡 · 企业集群",
    },
  ],
  partnershipTitle: "多种合作路径",
  partnershipBenefitsHeading: "价值收益",
  partnershipCards: [
    {
      title: "算力盘活与服务化",
      description:
        "适合已有自建 GPU 集群的组织：提升推理效率、降低运维负担，或把闲置产能转化为对外 Token 服务收入。",
      partnerLabel: "常见合作对象",
      partners: "自建算力的政企单位、互联网公司、金融机构、通信运营商等",
      benefits: [
        "同等算力支撑更大业务规模，推理效率明显提升",
        "充分发挥 GPU 性能，降低跨厂商适配成本",
        "数据可留在自有环境，满足安全与合规要求",
        "闲置产能可对外服务化，从成本中心转为收益来源",
      ],
      cta: "了解算力盘活",
    },
    {
      title: "联合运营",
      description:
        "适合已掌握算力资产、希望尽快对外提供 Token 服务的伙伴，与八色鸫一起面向终端客户交付。",
      partnerLabel: "常见合作对象",
      partners: "数据中心运营方、区域智算平台、GPU 云厂商、硬件与加速卡厂商等",
      benefits: [
        "快速具备 Token 交付能力，无需从零组建技术栈",
        "同等硬件条件下显著提升推理吞吐",
        "按实际用量分成，合作模式清晰可核算",
        "依托八色鸫产品与市场能力协同获客",
      ],
      cta: "了解联合运营",
    },
  ],
  whyChooseTitle: "为什么选择八色鸫",
  whyCards: [
    {
      prefix: "更低的",
      title: "落地与运营成本",
      description:
        "无需自建整套推理与调度体系，即可快速形成 Token 生产与交付能力，缩短从硬件资源到可变现产能的路径。",
    },
    {
      prefix: "更稳定的",
      title: "需求对接能力",
      description:
        "内置丰富模型供给与广泛开发者、企业客户网络，产能可快速对接真实用量，降低空置与闲置风险。",
    },
    {
      prefix: "更高的",
      title: "单卡产出效率",
      description:
        "推理引擎与系统级优化协同发力，在不增加硬件投入的前提下提高单位 GPU 的 Token 产出，扩大收益空间。",
    },
    {
      prefix: "更高的",
      title: "集群利用率",
      description:
        "统一调度与弹性分配，把分散、异构的算力收拢为产能池，减少空转与闲置，让 Token 供给持续高效运转。",
    },
  ],
  ecosystemTitle: "适配主流 GPU 生态",
  ecosystemSubtitle:
    "不绑定单一硬件厂商，持续适配主流 GPU 与 AI 加速卡，按业务需要扩展可用算力版图",
  gpuVendors: [
    { alt: "NVIDIA（英伟达）" },
    { alt: "Intel（英特尔）" },
    { alt: "Ascend（昇腾）" },
    { alt: "MetaX（沐曦）" },
    { alt: "Enflame（燧原）" },
  ],
  testimonialsTitle: "合作伙伴怎么说",
  testimonials: [
    {
      title: "某互联网公司",
      quote:
        "集群原先只服务内部业务，优化后发现仍有大量闲置产能。八色鸫协助我们将这部分资源对外服务化，如今每月都能稳定产生服务收入，资产角色也随之改变。",
      role: "AI 平台负责人",
    },
    {
      title: "某区域智算平台",
      quote:
        "我们负责园区与政务侧的算力建设项目。接入八色鸫后，GPU 集群利用率明显提升，并面向园区企业形成了稳定的 Token 供给能力，算力资产开始持续产生回报。",
      role: "运营负责人",
    },
    {
      title: "某金融机构",
      quote:
        "自有 GPU 资源长期面临推理效率与运维成本压力。上线八色鸫算力运营服务后，同样硬件下吞吐接近翻倍，团队日常运维负担也明显减轻。",
      role: "基础设施负责人",
    },
  ],
  ctaTitle: "把算力变成可交付的 Token 产能",
  ctaSubtitle:
    "若您已有 GPU 资源，并希望建立 Token 服务与变现能力，欢迎与我们进一步沟通。",
  ctaButton: "获取算力运营方案",
};
