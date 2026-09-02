import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "全部",
  荣誉奖项: "荣誉奖项",
  企业动态: "企业动态",
  模型上新: "模型上新",
  市场活动: "市场活动",
  客户案例: "客户案例",
  生态合作: "生态合作",
  企业AI实践: "企业AI实践",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title: "数家科技 × 算家计算 × 八色鸫：算力联合运营，共建 Token 工厂",
    excerpt:
      "近日，八色鸫与贵州数家科技有限公司（简称“数家科技”）、贵州算家计算服务有限公司（简称“算家计算”）达成算力联合运营合作。",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "八色鸫荣登“IDC 中国 AI 50 强”榜单",
    excerpt:
      "7 月 30 日，全球知名的科技市场研究机构 IDC 正式发布“2026 IDC 中国 AI 50 强”榜单，八色鸫凭借在 AI 基础设施领域的技术实力与商业化落地能力入选。",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "周鸿祎、李开复来八色鸫串门了｜直击 WAIC",
    excerpt:
      "7 月 17 日到 20 日，上海热气腾腾，2026 世界人工智能大会如期而至。八色鸫也布置了自己的展位，与参展观众、客户、媒体朋友来了场硬核面基。",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title: "宇信科技与八色鸫达成战略合作，加速金融智能化升级",
    excerpt:
      "宇信科技与八色鸫近日达成战略合作，双方将依托各自在金融行业场景与 AI 基础设施领域的深厚积累，联合打造适配金融业务的 AI 综合解决方案，全面赋能金融机构智能化体系建设与落地应用。",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "“国产芯片+国产模型+国产推理引擎”，大型央企航空集团全栈国产化 AI 算力基座建设实践",
    excerpt:
      "基于国产芯片私有化部署国产大模型，对企业自身的 AI 算力基础设施建设与运营带来巨大考验：如何提升算力利用效率与 Token 供给能力，进而保障 AI 系统的高性能与持续演进能力？",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title: "八色鸫参与共建“京算 Token 工厂”，筑牢首都算力底座",
    excerpt:
      "八色鸫成为“京算 Token 工厂”核心共建伙伴，携手筑牢首都数字算力底座，为首都数字经济发展注入新动能。",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title: "山东移动与八色鸫达成战略合作，共推数字经济高质量发展",
    excerpt:
      "近日，中国移动通信集团山东有限公司（简称“山东移动”）与八色鸫举行战略合作协议签约仪式。双方将围绕算力服务、业务协同、生态共建三大方向展开深度合作，共同为“数字山东”建设和全省数字经济高质量发展注入强劲动能。",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title: "贵州移动 × 八色鸫：深度共建大型算力集群，加速产业数字化发展",
    excerpt:
      "近日，八色鸫与中国移动通信集团贵州有限公司（简称“贵州移动”）正式签署《智算算力服务深度合作协议》。此次签约标志着双方在智能计算领域的战略合作全面启动，将共同致力于构建高效、可靠的算力服务体系。",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "八色鸫上线美团 LongCat-2.0",
    excerpt:
      "八色鸫已上线美团今天发布的 LongCat-2.0，总参数 1.6T，平均激活约 48B，动态范围 33B 到 56B，原生支持 1M 超长上下文。这是首个在五万张国产算力卡上完成全流程训练与推理的万亿参数模型。",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title: "八色鸫亮相 AICon，Token 供应平台助推 Agentic AI 规模化落地",
    excerpt:
      "八色鸫亮相 2026 AICon 上海站，公司展位呈现了完整的“Token 供应平台”产品矩阵，与众多参会开发者与企业代表进行了深度交流。",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title: "八色鸫荣登“预见·2026”人工智能产品卓越企业 TOP 20",
    excerpt:
      "1 月 22 日，“预见·2026”榜单正式揭晓。八色鸫凭借其在人工智能基础设施领域的持续创新、可靠的产品与商业化能力，成功入选并获评为 “人工智能产品卓越企业 TOP 20”。",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "八色鸫荣登“2025 创业邦 100 未来独角兽”榜单",
    excerpt:
      "1 月 15 日，第 18 届创业邦年会揭晓了“2025创业邦 100 未来独角兽”榜单，八色鸫凭借在 AI 基础设施领域的技术创新与高成长潜力，从 300 余家报名企业中脱颖而出并成功入选。",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "八色鸫荣获 InfoQ 2025“AI 基础设施卓越奖”",
    excerpt: "八色鸫荣获 2025 年度 AI 基础设施卓越奖。",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "八色鸫企业级 MaaS 荣膺 AIIA 模型服务标杆案例",
    excerpt:
      "八色鸫的“企业级 MaaS 平台”与华为、蚂蚁集团等企业成为获得年度模型服务（MaaS）专项标杆案例的八家领先企业及机构之一。",
  },
  dsjglm4diutrngvh2weypzhv: {
    title: "八色鸫荣登《麻省理工科技评论》“50家聪明公司”",
    excerpt:
      "9 月 12 日，在 EmTech China 2025 全球新兴科技峰会上，八色鸫与阿里巴巴、华为、深度求索等入选新一届《麻省理工科技评论》年度“50 家聪明公司”。",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "八色鸫 荣登 AI 产品榜 “2025 AI MVP TOP 50”榜单",
    excerpt:
      "八色鸫 凭借卓越的技术优势和持续的创新能力，荣登 AI 产品榜 “2025 AI MVP TOP 50”榜单。",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title: "八色鸫荣膺北京市“数字基础技术标杆企业”",
    excerpt:
      "八色鸫入选《2024 北京市数字经济标杆企业评价报告》，荣获\"数字基础技术标杆企业\"称号。",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "八色鸫荣登 2025 AI Cloud 100 China 榜单",
    excerpt:
      "八色鸫凭借在 GenAI 云基础设施方向的领先技术实力与持续增长的商业化表现，荣登靖亚资本发布的 “2025 AI Cloud 100 China” 榜单。",
  },
} as const;

export const zhCN: NewsStrings = {
  pageTitle: "企业动态",
  heroLogoAlt: "最新资讯",
  categoryFilterTitle: "类别",
  featuredReadMore: "查看更多",
  categoryLabels,
  featured: {
    title: "八色鸫上线高速版 Kimi K2.7 Code",
    excerpt:
      "“想得更少、写得更好”：能看会做，既能理解录屏中的操作流程，也能一口气完成跨文件的项目开发。",
  },
  articles,
};
