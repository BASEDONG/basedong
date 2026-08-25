export const ABOUT_ASSETS = {
  heroBg: "/assets/marketing/about/images/section-1-bg.png",
  heroBgMobile:
    "/assets/marketing/about/images/s1-bg-mobile.png",
  introIllustration:
    "/assets/marketing/about/images/section-2-1.svg",
  timelineBg:
    "/assets/marketing/about/images/section-2-2.svg",
  timelineRock:
    "/assets/marketing/about/images/section-2-rock.svg",
  honorsBg:
    "/assets/marketing/about/images/section-3-bg.png",
  iso: [
    "/assets/marketing/about/images/iso-1.png",
    "/assets/marketing/about/images/iso-2.png",
    "/assets/marketing/about/images/iso-3.png",
    "/assets/marketing/about/images/iso-4.png",
  ],
  honors: Array.from(
    { length: 12 },
    (_, i) =>
      `/assets/marketing/about/images/honor-${i + 1}.png`,
  ),
} as const;

export const ABOUT_COPY = {
  heroTitle: "做所有人的 AI。",
  heroSubtitle: "让生成式人工智能惠及开发者和终端用户",
  introTitle: "硅基流动",
  introParagraphs: [
    "硅基流动（SiliconFlow）成立于2023年，是国内领先的独立生态词元（Token）供应平台。作为AI技术栈的关键系统软件支柱，硅基流动连接算力资源、AI 模型与上层应用，致力于将分散、异构的算力资源转化为标准化、可扩展的词元服务，让任何一个算力中心都能成为高效的 Token 工厂。",
    "产品服务方面，硅基流动打造全场景服务体系，覆盖不同用户需求：面向开发者与中小企业，提供低门槛、按量计费的无服务器词元服务，灵活适配轻量化使用场景；面向高性能、高稳定性需求的企业客户，提供专属实例服务，保障算力预留与稳定输出；面向大型机构及数据安全敏感场景，提供本地部署解决方案，支持大模型服务平台落地客户自有数据中心。同时，平台推出AI算力联合运营服务，依托完善的算力运营体系，助力各类算力资源快速搭建稳定的Token服务能力。",
    "技术能力方面，平台支持超170款主流AI模型，深度适配NVIDIA、AMD等国际主流芯片，以及昇腾、沐曦、摩尔线程等国产主流芯片。凭借自研推理加速引擎、异构算力资源编排等全栈工程技术，使国产硬件的推理性能可与国际先进算力媲美。",
    "生态建设方面，硅基流动坚守独立、开放的平台定位，专注底层服务、不开发模型、不涉足终端应用，携手芯片厂商、模型开发者、工具链及应用开发者共建开放生态。LangChain、Dify、Cherry Studio等近百款主流开发工具已预置其为内置模型服务商。截至2026年4月，平台已累计服务超1000万注册用户、13000余家企业客户，业务覆盖AI、互联网、金融、能源、电信等多个关键行业。",
  ],
  timelineTitle: "发展历程",
  certsTitle: "权威认证",
  honorsTitle: "荣誉资质",
} as const;

export type TimelineSide = "date-left" | "date-right";

export type TimelineItem = {
  date: string;
  events: string[];
  /** Desktop: date on left (events right) vs date on right (events left) */
  side: TimelineSide;
  /** Show rock icon on the center dot (desktop: SiliconCloud row; mobile: 2025-06) */
  rock?: boolean;
};

/** Alternating zigzag rows — exact order from live site */
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    date: "2026 年 6 月",
    events: ["完成 B 轮融资"],
    side: "date-left",
  },
  {
    date: "2026 年 4 月",
    events: ["平台注册用户超 1000 万"],
    side: "date-right",
  },
  {
    date: "2025 年 12 月",
    events: ["服务企业客户 10000 +", "上线模型 150 +"],
    side: "date-left",
  },
  {
    date: "2025 年 9 月",
    events: ["私有化 MaaS 解决方案发布"],
    side: "date-right",
  },
  {
    date: "2025 年 6 月",
    events: [
      "完成数亿元人民币 A 轮融资",
      "SiliconFlow 品牌焕新",
      "国际站上线，加速全球化发展",
    ],
    side: "date-left",
    rock: true, // mobile rock marker
  },
  {
    date: "2025 年 4 月",
    events: [
      "上线基于昇腾云 CloudMatrix 384 超节点的 DeepSeek-R1",
      "面向企业客户提供私有部署服务",
    ],
    side: "date-right",
  },
  {
    date: "2025 年 2 月",
    events: ["完成人民币 Pre-A 轮融资"],
    side: "date-left",
  },
  {
    date: "2025 年 2 月",
    events: ["携手华为云联合推出基于昇腾云的 DeepSeek R1 & V3 推理服务"],
    side: "date-right",
  },
  {
    date: "2024 年 7 月",
    events: ["完成天使+ 轮融资"],
    side: "date-left",
  },
  {
    date: "2024 年 5 月",
    events: ["SiliconCloud 平台上线"],
    side: "date-right",
    rock: true, // desktop rock marker
  },
  {
    date: "2024 年 1 月",
    events: ["完成 5000 万元天使轮融资"],
    side: "date-left",
  },
  {
    date: "2023 年 8 月",
    events: ["硅基流动公司成立"],
    side: "date-right",
  },
];

export const CERTIFICATIONS = [
  { label: "信息安全管理体系", image: ABOUT_ASSETS.iso[0] },
  { label: "系统信息安全等级保护（三级）", image: ABOUT_ASSETS.iso[1] },
  { label: "质量管理体系认证", image: ABOUT_ASSETS.iso[2] },
  { label: "信息技术服务管理体系认证", image: ABOUT_ASSETS.iso[3] },
] as const;
