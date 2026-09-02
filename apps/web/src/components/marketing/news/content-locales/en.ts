import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "All",
  荣誉奖项: "Honors & Awards",
  企业动态: "Company News",
  模型上新: "New Models",
  市场活动: "Events",
  客户案例: "Customer Stories",
  生态合作: "Ecosystem Partnerships",
  企业AI实践: "Enterprise AI in Practice",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: Joint compute operations to build Token factories",
    excerpt:
      "basedong has entered a joint compute operations partnership with Guizhou Shujia Technology Co., Ltd. (Shujia Tech) and Guizhou Suanjia Computing Services Co., Ltd. (Suanjia Compute).",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong named to the IDC China AI 50 list",
    excerpt:
      "On July 30, IDC released the 2026 IDC China AI 50 list. basedong was selected for its technical strength and commercial traction in AI infrastructure.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi and Kai-Fu Lee visit basedong | WAIC highlights",
    excerpt:
      "From July 17–20, the 2026 World Artificial Intelligence Conference took place in Shanghai. basedong hosted its own booth and met visitors, customers, and media on site.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies and basedong form strategic partnership to accelerate financial AI",
    excerpt:
      "Yusys Technologies and basedong have signed a strategic partnership. The two sides will combine deep experience in financial scenarios and AI infrastructure to deliver integrated AI solutions for financial institutions.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Domestic chips + domestic models + domestic inference engine: A major state-owned aviation group’s full-stack AI compute practice",
    excerpt:
      "Privately deploying domestic large models on domestic chips raises hard questions for enterprise AI infrastructure: how to improve utilization and token supply while keeping systems high-performing and evolvable?",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong joins the Beijing “Jingsuan Token Factory” to strengthen the capital’s compute foundation",
    excerpt:
      "basedong is a core co-builder of the Beijing “Jingsuan Token Factory,” helping strengthen the capital’s digital compute base and inject new momentum into its digital economy.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile and basedong sign strategic partnership to advance the digital economy",
    excerpt:
      "China Mobile Communications Group Shandong Co., Ltd. (Shandong Mobile) and basedong have signed a strategic cooperation agreement covering compute services, business collaboration, and ecosystem co-building for Digital Shandong.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: Deep co-build of large compute clusters to accelerate digital industry",
    excerpt:
      "basedong and China Mobile Communications Group Guizhou Co., Ltd. (Guizhou Mobile) signed a deep intelligent-compute cooperation agreement, launching full strategic collaboration to build efficient, reliable compute services.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong launches Meituan LongCat-2.0",
    excerpt:
      "basedong now offers Meituan’s newly released LongCat-2.0 — 1.6T total parameters, ~48B average activation, dynamic range 33B–56B, and native 1M context. It is the first trillion-parameter model trained and inferred end-to-end on 50,000 domestic accelerator cards.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong at AICon: Token supply platform powers scaled Agentic AI adoption",
    excerpt:
      "At AICon 2026 Shanghai, basedong showcased its full Token supply platform product matrix and held in-depth discussions with developers and enterprise attendees.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong named to the “Foresee 2026” Top 20 AI product excellence list",
    excerpt:
      "On January 22, the “Foresee 2026” list was announced. basedong was recognized among the Top 20 AI product excellence companies for sustained innovation and reliable commercialization in AI infrastructure.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong named to CYZONE’s 2025 100 Future Unicorns list",
    excerpt:
      "At CYZONE’s 18th annual conference on January 15, basedong was selected from 300+ applicants for innovation and high-growth potential in AI infrastructure.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong wins InfoQ 2025 AI Infrastructure Excellence Award",
    excerpt: "basedong received the 2025 AI Infrastructure Excellence Award.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "basedong enterprise MaaS honored as AIIA model-service benchmark case",
    excerpt:
      "basedong’s enterprise MaaS platform was one of eight benchmark cases in the annual model-as-a-service (MaaS) category, alongside Huawei, Ant Group, and other leaders.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title:
      "basedong named to MIT Technology Review’s 50 Smart Companies",
    excerpt:
      "On September 12 at EmTech China 2025, basedong joined Alibaba, Huawei, DeepSeek, and others on MIT Technology Review’s annual 50 Smart Companies list.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong on the 2025 AI MVP TOP 50 list",
    excerpt:
      "basedong was recognized on the AI Product Rankings 2025 AI MVP TOP 50 list for technical excellence and sustained innovation.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong named a Beijing digital foundational technology benchmark enterprise",
    excerpt:
      "basedong was selected in the 2024 Beijing Digital Economy Benchmark Enterprise Evaluation Report as a digital foundational technology benchmark enterprise.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong on the 2025 AI Cloud 100 China list",
    excerpt:
      "basedong was named to Jingya Capital’s 2025 AI Cloud 100 China list for leading GenAI cloud infrastructure technology and growing commercial performance.",
  },
} as const;

export const en: NewsStrings = {
  pageTitle: "Company News",
  heroLogoAlt: "Latest news",
  categoryFilterTitle: "Category",
  featuredReadMore: "Read more",
  categoryLabels,
  featured: {
    title: "basedong launches high-speed Kimi K2.7 Code",
    excerpt:
      "“Think less, write better”: it can see and do — understanding workflows from screen recordings and completing cross-file project development in one pass.",
  },
  articles,
};
