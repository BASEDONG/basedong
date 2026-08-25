export const PARTNER_ASSETS = {
  heroBg: "/assets/marketing/partner/images/hero-bg.png",
  sectionBg:
    "/assets/marketing/reserved/images/bg-section-3.svg",
} as const;

export const APPLY_URL =
  "https://siliconflow.feishu.cn/share/base/form/shrcnFexyHcMNEntvR08shp8Tbd";

export const MORE_CASES_URL =
  "https://docs.siliconflow.cn/cn/usercases/use-siliconcloud-in-ClaudeCode";

export type HighlightItem = {
  label: string;
  text: string;
};

export type PartnershipMode = {
  audience: string;
  title: string;
  icon: "users" | "code" | "broadcast" | "layers" | "database" | "graduation";
  targetLabel: string;
  target: string;
  methodLabel: string;
  method: string;
  incentives: HighlightItem[];
};

export const partnershipModes: PartnershipMode[] = [
  {
    audience: "个人用户",
    title: "使用心得征集",
    icon: "users",
    targetLabel: "适用对象：",
    target: "对模型、Agent、Coding、工作流有深度体验的极客玩家。",
    methodLabel: "合作方式：",
    method:
      "提交官方未收录的热门项目在 BYOK（Bring Your Own Key）模式下的硅基流动配置教程或实践案例。",
    incentives: [
      {
        label: "官方推荐：",
        text: "优质内容将收录至官网场景示例专区，并在官方社媒渠道持续推广。",
      },
      {
        label: "代金券奖励：",
        text: "达标文章可获平台代金券，配套演示视频可叠加额外奖励。",
      },
    ],
  },
  {
    audience: "开源开发者",
    title: "重点项目 PR 贡献",
    icon: "code",
    targetLabel: "适用对象：",
    target: "具备开发能力、热衷开源社区建设的开发者。",
    methodLabel: "合作方式：",
    method: "向热门开源项目提交硅基流动大模型接入 PR 并被合并。",
    incentives: [
      {
        label: "贡献礼包：",
        text: "平台代金券 + 硅基流动限量周边。",
      },
      {
        label: "官方支持：",
        text: "官方提供 GitHub 任务清单、标准接入说明及 API 兼容示例代码。",
      },
    ],
  },
  {
    audience: "创作者 / KOL",
    title: "内容传播与教学",
    icon: "broadcast",
    targetLabel: "适用对象：",
    target: "在技术社区或社交媒体具有影响力的技术博主、创作者或讲师。",
    methodLabel: "合作方式：",
    method:
      "发布平台测评、实战教程，或在课程 / 训练营中使用硅基流动平台进行教学。",
    incentives: [
      {
        label: "资源护航：",
        text: "官方提供课程素材包支持及专属资源扶持。",
      },
      {
        label: "流量扶持：",
        text: "优质内容可获得官方全渠道流量推荐，提升个人 / 品牌知名度。",
      },
    ],
  },
  {
    audience: "AI 应用 / 工具",
    title: "产品深度接入",
    icon: "layers",
    targetLabel: "适用对象：",
    target: "接入硅基流动 API 的应用开发团队或工具类产品。",
    methodLabel: "合作方式：",
    method: "产品支持 BYOK 模式接入，并提供快捷配置入口。",
    incentives: [
      {
        label: "资源倾斜：",
        text: "获取模型体验额度，符合条件者可申请提升免费模型 Rate Limits。",
      },
      {
        label: "联合推广：",
        text: "获得官方社媒、社区、专题页或专项活动中的联合曝光机会。",
      },
    ],
  },
  {
    audience: "模型厂商",
    title: "高效上架与分发",
    icon: "database",
    targetLabel: "适用对象：",
    target: "寻求低成本部署并快速触达开发者的模型提供方。",
    methodLabel: "合作方式：",
    method: "基于 GPU 云函数合作部署，通过官方审核后上架。",
    incentives: [
      {
        label: "高效分发：",
        text: '合规项目可入驻"模型广场"触达精准开发者。',
      },
      {
        label: "成本优化：",
        text: "享受部署资源折扣券，降低厂商运维与推广成本。",
      },
    ],
  },
  {
    audience: "科研团队 / 公益",
    title: "学术与公益赋能",
    icon: "graduation",
    targetLabel: "适用对象：",
    target: "高校实验室、科研团队及非营利性公益项目。",
    methodLabel: "合作方式：",
    method: "将平台 API 能力应用于学术研究、公益项目或技术活动。",
    incentives: [
      {
        label: "专项资源支持：",
        text: "提供 Tokens 体验额度，符合条件可免费调用模型 API。",
      },
    ],
  },
];

export type PartnerBenefit = {
  num: string;
  title: string;
  description: string;
  icon: "layers" | "wrench" | "trending" | "shield";
  featured?: boolean;
};

export const partnerBenefits: PartnerBenefit[] = [
  {
    num: "01",
    title: "灵活且丰富的模型能力赋能",
    icon: "layers",
    description:
      "平台汇聚百余款主流开源大模型，提供统一的 API 调用方案与多种架构支持。助力合作伙伴快速集成顶尖 AI 能力，满足不同业务场景下的多元化模型选型需求。",
    featured: true,
  },
  {
    num: "02",
    title: "全方位技术协作与算力扶持",
    icon: "wrench",
    description:
      "提供专业的 API 技术指导与专项 Tokens 扶持，从技术对接方案到算力成本优化，全方位帮助合作伙伴降低研发门槛，助力项目在各阶段都能高效启动并稳健运行。",
  },
  {
    num: "03",
    title: "深度联合推广与流量加持",
    icon: "trending",
    description:
      "依托官网文档场景案例、开发者社区及官方社交矩阵，为优质项目提供多渠道流量推荐，通过联合活动与专题推广持续放大合作伙伴的行业影响力。",
  },
  {
    num: "04",
    title: "生态深度共建",
    icon: "shield",
    description:
      "基于硅基流动生态伙伴合作机制，为符合条件的长期共建伙伴提供优先参与平台内测、技术闭门会等特权。与合作伙伴共同探索 AI 生态的长期价值，实现深度战略协同。",
  },
];

export type PartnerCase = {
  title: string;
  image: string;
};

export const partnerCases: PartnerCase[] = [
  {
    title: "中文原生 IDE",
    image:
      "/assets/marketing/partner/images/partner-logo-06.png",
  },
  {
    title: 'AI 编程工具的"配置管家"',
    image:
      "/assets/marketing/partner/images/partner-logo-15.png",
  },
  {
    title: "开源的即时通信机器人平台",
    image:
      "/assets/marketing/partner/images/partner-logo-17.png",
  },
  {
    title: "基于 LLM 大模型的开源 AI 知识库构建平台",
    image:
      "/assets/marketing/partner/images/partner-logo-18.png",
  },
  {
    title: "图原生智能体系统",
    image:
      "/assets/marketing/partner/images/partner-logo-04.png",
  },
  {
    title: "可以免费使用且功能开放的 AI 翻译插件",
    image:
      "/assets/marketing/partner/images/partner-logo-11.png",
  },
  {
    title: "AI 驱动的图表创建工具",
    image:
      "/assets/marketing/partner/images/partner-logo-09.png",
  },
  {
    title: "一站式智能开发平台",
    image:
      "/assets/marketing/partner/images/partner-logo-08.png",
  },
  {
    title: "双语对照网页翻译插件",
    image:
      "/assets/marketing/partner/images/partner-logo-20.png",
  },
  {
    title: "开源的一站式 Agent 聊天机器人平台及开发框架",
    image:
      "/assets/marketing/partner/images/partner-logo-14.png",
  },
  {
    title: "社区驱动的多智能体金融应用产品",
    image:
      "/assets/marketing/partner/images/partner-logo-10.png",
  },
  {
    title: "图谱引导的 SFT 数据生成框架，植物领域 SOTA",
    image:
      "/assets/marketing/partner/images/partner-logo-01.png",
  },
  {
    title: "跨端的 Markdown 笔记应用",
    image:
      "/assets/marketing/partner/images/partner-logo-13.png",
  },
  {
    title: "专为语言学习者设计的全能工具",
    image:
      "/assets/marketing/partner/images/partner-logo-19.png",
  },
  {
    title: "AI 时代先进生产力平台",
    image:
      "/assets/marketing/partner/images/partner-logo-02.png",
  },
  {
    title: "支持 MCP 和 Agent 的 Vibe workflow 平台",
    image:
      "/assets/marketing/partner/images/partner-logo-03.png",
  },
  {
    title: "开源 AI 编程代理",
    image:
      "/assets/marketing/partner/images/partner-logo-12.png",
  },
  {
    title: "开源的大语言模型应用开发平台",
    image:
      "/assets/marketing/partner/images/partner-logo-07.png",
  },
  {
    title: "支持多模型服务的桌面客户端",
    image:
      "/assets/marketing/partner/images/partner-logo-16.png",
  },
  {
    title: "AI powered 下一代 DevOps 平台",
    image:
      "/assets/marketing/partner/images/partner-logo-05.png",
  },
];
