export const GW_ASSETS =
  "/assets/marketing/ai-gateway/images";

export const CONSULT_URL =
  "/share/base/form/shrcn2G8XKaFfNasfwD1lgDUbcb";

export const heroTags = [
  "统一管理",
  "智能路由",
  "限流限额",
  "全链路可观测",
] as const;

export const heroFloatPills = [
  { label: "鉴权", position: "left-[3%] top-[20%]", icon: "key" as const },
  { label: "路由", position: "right-[0%] top-[22%]", icon: "route" as const },
  {
    label: "观测",
    position: "left-[8%] bottom-[18%]",
    icon: "activity" as const,
  },
  {
    label: "安全",
    position: "right-[4%] bottom-[18%]",
    icon: "shield" as const,
  },
] as const;

export const gatewayFeatures = [
  "统一接口",
  "智能路由",
  "Fallback",
  "限流、配额",
  "可观测",
  "审计日志",
  "鉴权",
  "计费",
  "多租户",
  "权限精控",
] as const;

export const advantages = [
  {
    num: "01",
    title: "多模型统一接入",
    description:
      "一站式接入并标准化调用不同供应商模型，告别点状管理，轻松驾驭多供应商生态。",
  },
  {
    num: "02",
    title: "灵活可配置的路由策略",
    description:
      "结合流量特征与大模型服务特征的智能动态路由、负载均衡、故障转移等调度策略，保障服务稳定性和业务侧SLA要求。",
  },
  {
    num: "03",
    title: "精细治理",
    description:
      "支持按用户、API Key、项目、组织等维度配置模型权限、流量与配额管理，实现模型调用的精细治理。",
  },
  {
    num: "04",
    title: "精确成本核算",
    description:
      "提供消费用户、API Key、项目、组织、模型、算力全链路成本穿透，实现精确成本核算。",
  },
  {
    num: "05",
    title: "全链路模型观测",
    description:
      "提供模型调用量、性能等指标的多维度观测，支撑企业通过指标进行精准的模型治理、模型生命周期管理及路由策略调整。",
  },
  {
    num: "06",
    title: "企业级数据安全防护",
    description:
      "通过双向脱敏实时过滤隐私风险，联动敏感内容拦截与审计日志，保障每一笔大模型业务都合规受控、全程留痕。",
  },
] as const;

export type ScenarioIcon =
  | "building"
  | "zap"
  | "shield"
  | "activity"
  | "chart";

export type Scenario = {
  id: string;
  tab: string;
  title: string;
  paragraphs: [string, string];
  icon: ScenarioIcon;
  gridCols: 2 | 3;
  cards: { title: string; subtitle: string }[];
};

export const scenarios: Scenario[] = [
  {
    id: "platform",
    tab: "企业级大模型能力中台",
    title: "企业级大模型能力中台",
    paragraphs: [
      "企业多个部门和业务中引入大模型能力时，模型接入方式、权限和调用策略往往分散，增加了统一管理和运维的复杂度。",
      "大模型服务网关提供统一的模型接入与调用管理能力，帮助企业集中管理模型资源，为上层应用和 Agent 提供一致、可控的大模型访问入口。",
    ],
    icon: "building",
    gridCols: 3,
    cards: [
      { title: "统一API接口", subtitle: "接入效率提升" },
      { title: "权限精细管控", subtitle: "管理成本降低" },
      { title: "多租户隔离", subtitle: "增加安全稳定性" },
    ],
  },
  {
    id: "cost",
    tab: "高频交互成本优化",
    title: "高频交互成本优化",
    paragraphs: [
      "在 AI 客服、搜索问答等高频交互场景中，大模型调用成本和响应时延直接影响业务体验和运营效率。",
      "通过大模型服务网关的缓存与路由能力，企业可以在保证效果的前提下，优化模型调用成本，并提升高频请求的响应性能。",
    ],
    icon: "zap",
    gridCols: 2,
    cards: [
      { title: "成本实时监控", subtitle: "成本降低" },
      { title: "配额动态管理", subtitle: "调用效率提升" },
    ],
  },
  {
    id: "stability",
    tab: "关键业务稳定运行",
    title: "关键业务稳定运行",
    paragraphs: [
      "当企业核心业务依赖单一模型服务时，模型限流、性能波动或服务异常可能直接影响业务连续性。",
      "大模型服务网关支持多模型路由与容灾策略配置，在模型异常或性能下降时实现自动切换，保障业务稳定运行。",
    ],
    icon: "shield",
    gridCols: 2,
    cards: [
      { title: "故障自动转移", subtitle: "故障恢复时间" },
      { title: "实时健康检查", subtitle: "服务可用性增加" },
    ],
  },
  {
    id: "multi",
    tab: "多模型并行使用",
    title: "多模型并行使用",
    paragraphs: [
      "不同模型在能力、性能和成本上的表现存在差异，企业通常需要为不同业务场景配置不同的模型调用策略。",
      "大模型服务网关支持基于策略的模型路由与调度，帮助企业灵活管理多模型使用方式，提升整体运行效率。",
    ],
    icon: "activity",
    gridCols: 3,
    cards: [
      { title: "智能模型路由", subtitle: "运营效率增加" },
      { title: "模型动态切换", subtitle: "切换成本为 0" },
      { title: "A/B 测试支持", subtitle: "降低复杂度" },
    ],
  },
  {
    id: "observe",
    tab: "统一观测与调用治理",
    title: "统一观测与调用治理",
    paragraphs: [
      "当模型调用分布在多个应用和系统中时，调用情况难以集中观测，问题定位和优化成本较高。",
      "大模型服务网关提供统一的调用日志与运行指标，帮助企业集中查看模型使用情况，支持持续优化与治理。",
    ],
    icon: "chart",
    gridCols: 2,
    cards: [
      { title: "多维度分析", subtitle: "报表生成" },
      { title: "异常警告", subtitle: "实时监控" },
    ],
  },
];

export const testimonials = [
  {
    title: "某集团型国企",
    body: "集团大模型应用逐步覆盖多家分子公司后，权限分级、限流限额、组织与项目用量统计等治理需求快速增加，传统 API 网关已难支撑。硅基流动大模型服务网关从运营治理与高可靠部署两方面提供支撑，满足多组织精细化管理、跨集群高可用、故障快速降级及全链路观测需求，显著提升了模型运营、成本统计与算力优化效率。",
    role: "平台运维负责人",
    avatar: `${GW_ASSETS}/avatar-1.svg`,
  },
  {
    title: "某大型金融机构",
    body: "随着大模型在对客、对公等核心业务场景全面推广，金融机构对不同场景的时延、并发、吞吐等提出了更高要求。硅基流动大模型网关可基于业务类型、上下文长度等进行智能路由，保障差异化服务目标；同时支持样本采样、A/B 测试、效果评估、灰度发布、版本切换等模型运营能力，使模型迭代与发布更加科学有序。",
    role: "模型运营负责人",
    avatar: `${GW_ASSETS}/avatar-2.svg`,
  },
] as const;

export type FaqItem = {
  question: string;
  answer:
    | { type: "paragraphs"; paragraphs: string[] }
    | { type: "list"; intro: string; items: string[]; outro?: string }
    | {
        type: "rich-list";
        intro: string;
        items: { label: string; text: string }[];
      };
};

export const faqs: FaqItem[] = [
  {
    question: "企业为什么需要大模型服务网关？",
    answer: {
      type: "list",
      intro:
        "随着企业在业务中引入多个大模型（自研模型、开源模型、第三方 API），常见问题迅速显现：",
      items: [
        "模型来源多样，接口协议不一致，导致接入成本高",
        "各应用端各自调用大模型，调用链路分散，缺乏统一管理、审计及观测",
        "不同应用侧对大模型服务 SLA 要求不一，难以整体满足",
        "企业内大模型使用量、使用成本难以计量和测算，决策缺乏有力数据",
      ],
      outro: "使用大模型服务网关，能够集中解决以上问题。",
    },
  },
  {
    question: "为什么企业已经有了大模型 API 服务，还需要大模型服务网关？",
    answer: {
      type: "paragraphs",
      paragraphs: [
        "直接调用 API 仅解决了“连通”问题，而网关解决的是“治理”问题。当企业应用规模扩大后，会面临成本失控、安全合规、模型供应商锁定（Vendor Lock-in）等挑战。网关作为统一中间层，能帮助企业实现成本精细化管控、全链路安全防护和多模型灵活切换，是 AI 应用从“试点”走向“生产”的必经之路。",
      ],
    },
  },
  {
    question: "大模型服务网关会增加网络开销吗？",
    answer: {
      type: "paragraphs",
      paragraphs: [
        "高性能的网关（如基于云原生架构构建）带来的网络损耗通常在毫秒级，对用户几乎无感。相反，通过网关多种智能化的流量调度策略，应用侧对 SLA 的要求会更好的得到保障，同时通过合理的调度，能进一步提升整个模型服务体系的吞吐。",
      ],
    },
  },
  {
    question: "如何通过网关控制大模型的使用成本？",
    answer: {
      type: "rich-list",
      intro: "大模型服务网关提供多维度的成本控制手段：",
      items: [
        {
          label: "Token 配额管理：",
          text: "为不同团队或项目设置消费限额，防止预算超支。",
        },
        {
          label: "智能路由：",
          text: "根据任务复杂度自动选择性价比最高的模型（如简单任务路由至轻量模型）。",
        },
        {
          label: "请求缓存：",
          text: "减少不必要的重复调用，直接节省 Token 支出。",
        },
      ],
    },
  },
  {
    question: "大模型服务网关支持私有化部署吗？",
    answer: {
      type: "paragraphs",
      paragraphs: [
        "为了满足金融、政府等行业对数据安全的极高要求，我们的企业级大模型服务网关支持私有化部署（On-Premise）。所有数据处理和模型转发均在企业内网完成，确保核心资产绝对安全。",
      ],
    },
  },
  {
    question: "大模型服务网关如何保障内容生成的合规性？",
    answer: {
      type: "paragraphs",
      paragraphs: [
        "大模型服务网关集成了双向内容审查机制：在请求侧拦截敏感输入，在响应侧过滤违规输出。支持自定义敏感词库和合规策略，确保 AI 生成内容符合法律法规及企业品牌准则。",
      ],
    },
  },
];
