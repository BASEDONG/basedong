import type { NewsPageContent } from "./content-types";

const IMG = "/assets/marketing/news/images";

export const NEWS_CONTENT: NewsPageContent = {
  pageTitle: "企业动态",
  heroBg: `${IMG}/blog-bg1.png`,
  featured: {
    title: "硅基流动上线高速版 Kimi K2.7 Code",
    excerpt:
      "“想得更少、写得更好”：能看会做，既能理解录屏中的操作流程，也能一口气完成跨文件的项目开发。",
    category: "模型上新",
    date: "2026-06-18",
    href: "https://siliconflow.cn/news/jpzbb473y9ksb0ostdiejnkk",
    cover: `${IMG}/featured-kimi.png`,
  },
  categories: [
    "全部",
    "荣誉奖项",
    "企业动态",
    "模型上新",
    "市场活动",
    "客户案例",
    "生态合作",
    "企业AI实践",
  ],
  totalPages: 15,
  pageSize: 10,
  articles: [
    {
      id: "iejarphf9lqgywte36eowzo6",
      title: "数家科技 × 算家计算 × 硅基流动：算力联合运营，共建 Token 工厂",
      excerpt:
        "近日，硅基流动与贵州数家科技有限公司（简称“数家科技”）、贵州算家计算服务有限公司（简称“算家计算”）达成算力联合运营合作。",
      category: "生态合作",
      date: "2026-08-13",
      href: "https://siliconflow.cn/news/iejarphf9lqgywte36eowzo6",
      thumb: `${IMG}/thumb-0.png`,
    },
    {
      id: "tteguv6arblns7n7wwu60qy5",
      title: "硅基流动荣登“IDC 中国 AI 50 强”榜单",
      excerpt:
        "7 月 30 日，全球知名的科技市场研究机构 IDC 正式发布“2026 IDC 中国 AI 50 强”榜单，硅基流动凭借在 AI 基础设施领域的技术实力与商业化落地能力入选。",
      category: "荣誉奖项",
      date: "2026-07-31",
      href: "https://siliconflow.cn/news/tteguv6arblns7n7wwu60qy5",
      thumb: `${IMG}/thumb-1.png`,
    },
    {
      id: "yxn60w9116uqgow8qmj2frsl",
      title: "周鸿祎、李开复来硅基流动串门了｜直击 WAIC",
      excerpt:
        "7 月 17 日到 20 日，上海热气腾腾，2026 世界人工智能大会如期而至。硅基流动也布置了自己的展位，与参展观众、客户、媒体朋友来了场硬核面基。",
      category: "企业动态",
      date: "2026-07-21",
      href: "https://siliconflow.cn/news/yxn60w9116uqgow8qmj2frsl",
      thumb: `${IMG}/thumb-2.jpeg`,
    },
    {
      id: "agd6v0r0omgx1ymzxrj9jagy",
      title: "宇信科技与硅基流动达成战略合作，加速金融智能化升级",
      excerpt:
        "宇信科技与硅基流动近日达成战略合作，双方将依托各自在金融行业场景与 AI 基础设施领域的深厚积累，联合打造适配金融业务的 AI 综合解决方案，全面赋能金融机构智能化体系建设与落地应用。",
      category: "生态合作",
      date: "2026-07-14",
      href: "https://siliconflow.cn/news/agd6v0r0omgx1ymzxrj9jagy",
      thumb: `${IMG}/thumb-3.png`,
    },
    {
      id: "ct2w1w4jrodh14vwcw96rxyo",
      title:
        "“国产芯片+国产模型+国产推理引擎”，大型央企航空集团全栈国产化 AI 算力基座建设实践",
      excerpt:
        "基于国产芯片私有化部署国产大模型，对企业自身的 AI 算力基础设施建设与运营带来巨大考验：如何提升算力利用效率与 Token 供给能力，进而保障 AI 系统的高性能与持续演进能力？",
      category: "客户案例",
      date: "2026-07-06",
      href: "https://siliconflow.cn/news/ct2w1w4jrodh14vwcw96rxyo",
      thumb: `${IMG}/thumb-4.png`,
    },
    {
      id: "bapiztk1gu3cqrwju1okix7g",
      title: "硅基流动参与共建“京算 Token 工厂”，筑牢首都算力底座",
      excerpt:
        "硅基流动成为“京算 Token 工厂”核心共建伙伴，携手筑牢首都数字算力底座，为首都数字经济发展注入新动能。",
      category: "生态合作",
      date: "2026-07-05",
      href: "https://siliconflow.cn/news/bapiztk1gu3cqrwju1okix7g",
      thumb: `${IMG}/thumb-5.png`,
    },
    {
      id: "fdedihyzxgbu7yfcerf2q2lu",
      title: "山东移动与硅基流动达成战略合作，共推数字经济高质量发展",
      excerpt:
        "近日，中国移动通信集团山东有限公司（简称“山东移动”）与硅基流动举行战略合作协议签约仪式。双方将围绕算力服务、业务协同、生态共建三大方向展开深度合作，共同为“数字山东”建设和全省数字经济高质量发展注入强劲动能。",
      category: "生态合作",
      date: "2026-07-03",
      href: "https://siliconflow.cn/news/fdedihyzxgbu7yfcerf2q2lu",
      thumb: `${IMG}/thumb-6.jpg`,
    },
    {
      id: "jmeqt0sd1q3ciq04g2qd7xfg",
      title: "贵州移动 × 硅基流动：深度共建大型算力集群，加速产业数字化发展",
      excerpt:
        "近日，硅基流动与中国移动通信集团贵州有限公司（简称“贵州移动”）正式签署《智算算力服务深度合作协议》。此次签约标志着双方在智能计算领域的战略合作全面启动，将共同致力于构建高效、可靠的算力服务体系。",
      category: "生态合作",
      date: "2026-07-02",
      href: "https://siliconflow.cn/news/jmeqt0sd1q3ciq04g2qd7xfg",
      thumb: `${IMG}/thumb-7.png`,
    },
    {
      id: "k7r7cjt5fkxyfroe3thsnqtd",
      title: "硅基流动上线美团 LongCat-2.0",
      excerpt:
        "硅基流动已上线美团今天发布的 LongCat-2.0，总参数 1.6T，平均激活约 48B，动态范围 33B 到 56B，原生支持 1M 超长上下文。这是首个在五万张国产算力卡上完成全流程训练与推理的万亿参数模型。",
      category: "模型上新",
      date: "2026-06-30",
      href: "https://siliconflow.cn/news/k7r7cjt5fkxyfroe3thsnqtd",
      thumb: `${IMG}/thumb-8.png`,
    },
    {
      id: "wxoo1kd98f2ydxnnyihzv3x9",
      title: "硅基流动亮相 AICon，Token 供应平台助推 Agentic AI 规模化落地",
      excerpt:
        "硅基流动亮相 2026 AICon 上海站，公司展位呈现了完整的“Token 供应平台”产品矩阵，与众多参会开发者与企业代表进行了深度交流。",
      category: "市场活动",
      date: "2026-06-29",
      href: "https://siliconflow.cn/news/wxoo1kd98f2ydxnnyihzv3x9",
      thumb: `${IMG}/thumb-9.jpg`,
    },
  ],
  filterExtras: {
    荣誉奖项: [
      {
        id: "tteguv6arblns7n7wwu60qy5",
        title: "硅基流动荣登“IDC 中国 AI 50 强”榜单",
        excerpt:
          "7 月 30 日，全球知名的科技市场研究机构 IDC 正式发布“2026 IDC 中国 AI 50 强”榜单，硅基流动凭借在 AI 基础设施领域的技术实力与商业化落地能力入选。",
        category: "荣誉奖项",
        date: "2026-07-31",
        href: "https://siliconflow.cn/news/tteguv6arblns7n7wwu60qy5",
        thumb: `${IMG}/honor-0.png`,
      },
      {
        id: "fbfvrxlms2fgthtxnzggrg7b",
        title: "硅基流动荣登“预见·2026”人工智能产品卓越企业 TOP 20",
        excerpt:
          "1 月 22 日，“预见·2026”榜单正式揭晓。硅基流动凭借其在人工智能基础设施领域的持续创新、可靠的产品与商业化能力，成功入选并获评为 “人工智能产品卓越企业 TOP 20”。",
        category: "荣誉奖项",
        date: "2026-01-27",
        href: "https://siliconflow.cn/news/fbfvrxlms2fgthtxnzggrg7b",
        thumb: `${IMG}/honor-1.png`,
      },
      {
        id: "knjxu87y68uuvjzeqp5r5uqq",
        title: "硅基流动荣登“2025 创业邦 100 未来独角兽”榜单",
        excerpt:
          "1 月 15 日，第 18 届创业邦年会揭晓了“2025创业邦 100 未来独角兽”榜单，硅基流动凭借在 AI 基础设施领域的技术创新与高成长潜力，从 300 余家报名企业中脱颖而出并成功入选。",
        category: "荣誉奖项",
        date: "2026-01-19",
        href: "https://siliconflow.cn/news/knjxu87y68uuvjzeqp5r5uqq",
        thumb: `${IMG}/honor-2.png`,
      },
      {
        id: "e7zpqgllgfn1mrfq1yw6lm5s",
        title: "硅基流动荣获 InfoQ 2025“AI 基础设施卓越奖”",
        excerpt: "硅基流动荣获 2025 年度 AI 基础设施卓越奖。",
        category: "荣誉奖项",
        date: "2025-12-26",
        href: "https://siliconflow.cn/news/e7zpqgllgfn1mrfq1yw6lm5s",
        thumb: `${IMG}/honor-3.jpeg`,
      },
      {
        id: "hjliq094e4jvw6scke6f0iwz",
        title: "硅基流动企业级 MaaS 荣膺 AIIA 模型服务标杆案例",
        excerpt:
          "硅基流动的“企业级 MaaS 平台”与华为、蚂蚁集团等企业成为获得年度模型服务（MaaS）专项标杆案例的八家领先企业及机构之一。",
        category: "荣誉奖项",
        date: "2025-09-23",
        href: "https://siliconflow.cn/news/hjliq094e4jvw6scke6f0iwz",
        thumb: `${IMG}/honor-4.png`,
      },
      {
        id: "dsjglm4diutrngvh2weypzhv",
        title: "硅基流动荣登《麻省理工科技评论》“50家聪明公司”",
        excerpt:
          "9 月 12 日，在 EmTech China 2025 全球新兴科技峰会上，硅基流动（SiliconFlow）与阿里巴巴、华为、深度求索等入选新一届《麻省理工科技评论》年度“50 家聪明公司”。",
        category: "荣誉奖项",
        date: "2025-09-16",
        href: "https://siliconflow.cn/news/dsjglm4diutrngvh2weypzhv",
        thumb: `${IMG}/honor-5.png`,
      },
      {
        id: "wwd368rw8xud0sprc7eu1029",
        title: "硅基流动 SiliconCloud 荣登 AI 产品榜 “2025 AI MVP TOP 50”榜单",
        excerpt:
          "硅基流动 SiliconCloud 凭借卓越的技术优势和持续的创新能力，荣登 AI 产品榜 “2025 AI MVP TOP 50”榜单。",
        category: "荣誉奖项",
        date: "2025-08-04",
        href: "https://siliconflow.cn/news/wwd368rw8xud0sprc7eu1029",
        thumb: `${IMG}/honor-6.png`,
      },
      {
        id: "hu6j13i7aokzbp02bty3k6zk",
        title: "硅基流动荣膺北京市“数字基础技术标杆企业”",
        excerpt:
          "硅基流动入选《2024 北京市数字经济标杆企业评价报告》，荣获\"数字基础技术标杆企业\"称号。",
        category: "荣誉奖项",
        date: "2025-07-10",
        href: "https://siliconflow.cn/news/hu6j13i7aokzbp02bty3k6zk",
        thumb: `${IMG}/honor-7.png`,
      },
      {
        id: "qy96pn32h4p6px88wpllfftk",
        title: "硅基流动荣登 2025 AI Cloud 100 China 榜单",
        excerpt:
          "硅基流动凭借在 GenAI 云基础设施方向的领先技术实力与持续增长的商业化表现，荣登靖亚资本发布的 “2025 AI Cloud 100 China” 榜单。",
        category: "荣誉奖项",
        date: "2025-06-30",
        href: "https://siliconflow.cn/news/qy96pn32h4p6px88wpllfftk",
        thumb: `${IMG}/honor-8.jpg`,
      },
    ],
  },
};

export function resolveNewsArticles(
  category: (typeof NEWS_CONTENT.categories)[number],
) {
  if (category === "全部") return NEWS_CONTENT.articles;
  const extras = NEWS_CONTENT.filterExtras[category];
  if (extras && extras.length > 0) return extras;
  return NEWS_CONTENT.articles.filter((a) => a.category === category);
}
