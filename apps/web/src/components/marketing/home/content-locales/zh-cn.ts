import type { HomeStrings } from "../content-types";

export const zhCN: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "八色鸫正式上线",
      title: "GPT-5.6",
      description:
        "GPT-5.6 模型家族包含 Sol（旗舰）、Terra（均衡）、Luna（高速）三档，在编码、智能体、知识工作与科学推理等场景达到前沿水平，现已可在平台调用。",
      ctaLabel: "立即试用",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Anthropic 最新旗舰",
      title: "Opus 5",
      description:
        "Opus 5 在编码、智能体与专业写作上全面升级，面向高复杂度、长周期任务，提供更精准的专业产出能力。",
      ctaLabel: "立即试用",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "限时免费",
      title: "Auto 模型",
      description:
        "智能路由自动选型，在速度、成本与效果之间动态平衡；限时免费体验，零门槛接入大模型能力。",
      ctaLabel: "立即试用",
      logoAlt: "Auto 模型",
    },
    {
      tabLabel: "模型部署",
      eyebrow: "企业级能力",
      title: "大模型服务部署",
      description:
        "支持私有化部署与云端弹性扩缩，覆盖模型适配、推理加速与运维保障，支撑关键业务稳定运行。",
      ctaLabel: "了解详情",
      logoAlt: "大模型服务部署",
    },
  ],
  productMatrix: {
    title: "覆盖全链路的产品体系，支撑 AI 应用从构想到上线",
    subtitle: "为开发者与企业提供一体化接入能力，快速打通 AI 与业务场景",
  },
  productCards: [
    {
      title: "本地私有化部署",
      description:
        "面向有合规与数据主权要求的企业，提供可落地的私有化方案，覆盖性能调优、集群部署与持续运维，灵活匹配各类业务场景。",
      ctaLabel: "了解详情",
    },
    {
      title: "模型推理性能优化服务",
      description:
        "依托开源推理引擎，兼容主流开源模型及客户自研模型，覆盖选型适配、部署调优到线上运维的全流程，显著提升推理效率。",
      ctaLabel: "联系我们",
    },
    {
      title: "免费的 Auto 模型",
      description:
        "智能路由自动选型，在速度、成本与效果之间动态平衡；限时免费体验，零门槛接入大模型能力。",
      ctaLabel: "立即试用",
    },
    {
      title: "一体化大模型 API 服务",
      description:
        "涵盖文本、语音、图像与视频等模态，统一 API 入口、按量计费，帮助团队快速完成能力接入与产品迭代。",
      ctaLabel: "立即体验",
    },
  ],
  whySection: {
    title: "为什么选择八色鸫",
  },
  whyHighlightCards: [
    {
      title: "高性价比",
      textBlocks: [
        {
          lines: [[{ text: "全链路" }, { text: "成本治理", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "Auto 模型" }, { text: "限时免费", emphasis: true }],
            [{ text: "智能路由选型，速度与成本动态平衡" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "推理与部署支出最多可降低", value: "40%" },
        { prefix: "Auto 模型限时免费，接入成本降至", value: "零" },
      ],
      footnotes: [
        [{ text: "按量计费透明结算，支出清晰可预期" }],
        [{ text: "高度解耦异构算力，无缝调度主流 AI 芯片" }],
        [
          { text: "为成本敏感型应用提供稳定、可预期的" },
          { text: "费用表现", emphasis: true },
        ],
      ],
    },
    {
      title: "高稳定性",
      textBlocks: [
        {
          lines: [[{ text: "多节点" }, { text: "冗余保障", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "监控告警与故障自愈", emphasis: true }],
            [{ text: "持续保障服务长期稳定可用" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "多节点冗余，故障切换可达", value: "秒级" },
        { prefix: "企业级技术支持随时响应，满足", value: "SLA", suffix: "要求" },
      ],
      footnotes: [
        [{ text: "从容应对高并发、大批量推理 workload" }],
        [{ text: "经大量开发者实战检验，服务长期稳定可用" }],
        [
          { text: "为业务关键提供稳定、可预期的" },
          { text: "服务表现", emphasis: true },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "高扩展性",
      description:
        "弹性扩缩容应对流量波动，适配各类复杂业务形态。自定义模型快速上线，从容应对规模化部署需求。架构灵活可扩展，兼顾多元任务场景，支持混合云与多云部署。",
    },
    {
      title: "高安全性",
      description:
        "BYOC 模式可选，数据不离域，隐私与业务安全有保障。计算、网络、存储三层隔离，筑牢数据安全防线。遵循行业规范与合规标准，满足企业级安全与审计要求。",
    },
    {
      title: "高智能",
      description:
        "汇集前沿大语言模型与音视频等多模态能力，一站式调用。弹性伸缩随业务体量增长，从容覆盖多样化应用场景。用量与费用可视化分析，辅助决策、精准把控投入产出。",
    },
    {
      title: "高可用性",
      description:
        "经大量开发者实战检验，服务长期稳定可用。配套监控告警与故障自愈机制，持续保障服务可用性。企业级技术支持团队随时响应，满足关键业务对 SLA 的要求。",
    },
  ],
  industrySection: {
    title: "深耕多行业场景，按需定制灵活落地方案",
  },
  industryItems: [
    {
      title: "AI 硬件",
      description:
        "面向 AI 移动终端、推理一体机与具身智能等场景，降低端云协同链路时延，提升整体响应体验。",
    },
    {
      title: "政务",
      description:
        "以高吞吐、低延迟的推理能力，为智慧政务、公共安全与产业升级等场景提供高性价比的生成式 AI 方案，兼容异构算力与多种部署形态，不绑定特定芯片厂商或硬件生态。",
    },
    {
      title: "智算中心",
      description:
        "优化算力资源调度与分配，加速 AI 模型训练迭代与大规模推理服务部署。",
    },
    {
      title: "教育",
      description:
        "打造智能教学助手，通过多模型协同规划个性化学习路径，即时答疑辅导，显著提升教学效率与学生体验。",
    },
    {
      title: "互联网",
      description:
        "为互联网平台提供智能内容生成与个性化推荐能力，支持模型热切换与推理加速，提升 GPU 利用率，突破性能瓶颈，全面优化用户体验与运营效率。",
    },
  ],
  partners: {
    title: "众多客户与生态伙伴",
    ctaPrimaryDesc: "几分钟即可开通模型 API",
    ctaPrimaryButton: "开始试用",
    ctaSecondaryDesc: "需要专属方案？联系我们",
    ctaSecondaryButton: "提交需求",
  },
  heroCarousel: {
    ariaLabel: "首页重点内容",
    switchTabLabel: (tabLabel) => `切换到 ${tabLabel}`,
  },
};
