export const TF_ASSETS =
  "/assets/marketing/token-factory/images";

export const CONSULT_URL =
  "https://siliconflow.feishu.cn/share/base/form/shrcnsVyHOdT78tTRfUQo2KtO7f";

export const featureCards = [
  {
    title: "主流 GPU 统一接入",
    description:
      "面向各类主流 GPU 与 AI 加速卡提供统一接入能力，不绑定单一硬件厂商，便于按需扩展 Token 产能。",
    image: `${TF_ASSETS}/feature-card-1.svg`,
    icon: `${TF_ASSETS}/feature-icon-1.svg`,
    border: "#C4A7FF",
    bg: "#F7F2FF",
    iconBg: "#EDE3FF",
  },
  {
    title: "单位算力吞吐提升",
    description:
      "自研推理加速引擎深度优化推理链路，在同等硬件条件下提高单卡 Token 产出，放大既有投资回报。",
    image: `${TF_ASSETS}/feature-card-2.svg`,
    icon: `${TF_ASSETS}/feature-icon-2.svg`,
    border: "#DDE3EA",
    bg: "#FAFBFD",
    iconBg: "#EEF2F7",
  },
  {
    title: "多架构弹性编排",
    description:
      "将不同架构、不同规格的算力纳入同一调度平面，动态分配与秒级伸缩，让集群产能保持高效运转。",
    image: `${TF_ASSETS}/feature-card-3.svg`,
    icon: `${TF_ASSETS}/feature-icon-3.svg`,
    border: "#67E8F9",
    bg: "#F0FEFF",
    iconBg: "#E0FAFE",
  },
  {
    title: "面向真实业务场景",
    description:
      "覆盖编程助手、智能体、对话与企业应用等高并发场景，为线上业务提供可持续、可计量的 Token 供给。",
    image: `${TF_ASSETS}/feature-card-4.svg`,
    icon: `${TF_ASSETS}/feature-icon-4.svg`,
    border: "#B4F5C5",
    bg: "#F2FFF6",
    iconBg: "#E7FDEC",
  },
] as const;

export const architectureLayers = [
  {
    emoji: "🚀",
    title: "业务应用与终端客户",
    subtitle: "智能体 · 编程助手 · 企业系统",
    emojiBg: "#F4EEFF",
  },
  {
    emoji: "⚡",
    title: "推理服务层",
    subtitle: "开放接口 · 模型供给 · 服务治理",
    emojiBg: "#F4EEFF",
  },
  {
    emoji: "🎯",
    title: "算力运营层",
    subtitle: "加速引擎 · 统一调度 · 运维保障",
    emojiBg: "#F4EEFF",
  },
  {
    emoji: "💎",
    title: "底层算力资源",
    subtitle: "主流 GPU · AI 加速卡 · 企业集群",
    emojiBg: "#F4EEFF",
  },
] as const;

export const partnershipCards = [
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
] as const;

export const whyCards = [
  {
    prefix: "更高的",
    title: "集群利用率",
    description:
      "统一调度与弹性分配，把分散、异构的算力收拢为产能池，减少空转与闲置，让 Token 供给持续高效运转。",
    image: `${TF_ASSETS}/why-card-1.svg`,
    icon: `${TF_ASSETS}/why-icon-1.svg`,
    border: "#C4B5FD",
    bg: "#F5F3FF",
    iconBg: "#EDE9FE",
  },
  {
    prefix: "更高的",
    title: "单卡产出效率",
    description:
      "推理引擎与系统级优化协同发力，在不增加硬件投入的前提下提高单位 GPU 的 Token 产出，扩大收益空间。",
    image: `${TF_ASSETS}/why-card-2.svg`,
    icon: `${TF_ASSETS}/why-icon-2.svg`,
    border: "#D7DCE5",
    bg: "#F8FAFC",
    iconBg: "#EEF2F7",
  },
  {
    prefix: "更稳定的",
    title: "需求对接能力",
    description:
      "内置丰富模型供给与广泛开发者、企业客户网络，产能可快速对接真实用量，降低空置与闲置风险。",
    image: `${TF_ASSETS}/why-card-3.svg`,
    icon: `${TF_ASSETS}/why-icon-3.svg`,
    border: "#C4B5FD",
    bg: "#F5F3FF",
    iconBg: "#EDE9FE",
  },
  {
    prefix: "更低的",
    title: "落地与运营成本",
    description:
      "无需自建整套推理与调度体系，即可快速形成 Token 生产与交付能力，缩短从硬件资源到可变现产能的路径。",
    image: `${TF_ASSETS}/why-card-4.svg`,
    icon: `${TF_ASSETS}/why-icon-4.svg`,
    border: "#D7DCE5",
    bg: "#F8FAFC",
    iconBg: "#EDE9FE",
  },
] as const;

export const testimonials = [
  {
    title: "某区域智算平台",
    quote:
      "我们负责园区与政务侧的算力建设项目。接入八色鸫后，GPU 集群利用率明显提升，并面向园区企业形成了稳定的 Token 供给能力，算力资产开始持续产生回报。",
    role: "运营负责人",
    avatar: `${TF_ASSETS}/testimonial-avatar-1.svg`,
    bg: "rgba(2, 246, 247, 0.10)",
  },
  {
    title: "某金融机构",
    quote:
      "自有 GPU 资源长期面临推理效率与运维成本压力。上线八色鸫算力运营服务后，同样硬件下吞吐接近翻倍，团队日常运维负担也明显减轻。",
    role: "基础设施负责人",
    avatar: `${TF_ASSETS}/testimonial-avatar-2.svg`,
    bg: "#F8FAFC",
  },
  {
    title: "某互联网公司",
    quote:
      "集群原先只服务内部业务，优化后发现仍有大量闲置产能。八色鸫协助我们将这部分资源对外服务化，如今每月都能稳定产生服务收入，资产角色也随之改变。",
    role: "AI 平台负责人",
    avatar: `${TF_ASSETS}/testimonial-avatar-3.svg`,
    bg: "rgba(74, 171, 240, 0.05)",
  },
] as const;
