import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "全部",
  荣誉奖项: "榮譽獎項",
  企业动态: "企業動態",
  模型上新: "模型上新",
  市场活动: "市場活動",
  客户案例: "客戶案例",
  生态合作: "生態合作",
  企业AI实践: "企業 AI 實踐",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title: "數家科技 × 算家計算 × 八色鸫：算力聯合營運，共建 Token 工廠",
    excerpt:
      "近日，八色鸫與貴州數家科技有限公司（簡稱「數家科技」）、貴州算家計算服務有限公司（簡稱「算家計算」）達成算力聯合營運合作。",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "八色鸫榮登「IDC 中國 AI 50 強」榜單",
    excerpt:
      "7 月 30 日，全球知名的科技市場研究機構 IDC 正式發布「2026 IDC 中國 AI 50 強」榜單，八色鸫憑藉在 AI 基礎設施領域的技術實力與商業化落地能力入選。",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "周鴻禕、李開復來八色鸫串門了｜直擊 WAIC",
    excerpt:
      "7 月 17 日到 20 日，上海熱氣騰騰，2026 世界人工智慧大會如期而至。八色鸫也布置了自己的展位，與參展觀眾、客戶、媒體朋友來了場硬核面基。",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title: "宇信科技與八色鸫達成戰略合作，加速金融智能化升級",
    excerpt:
      "宇信科技與八色鸫近日達成戰略合作，雙方將依託各自在金融業場景與 AI 基礎設施領域的深厚積累，聯合打造適配金融業務的 AI 綜合解決方案，全面賦能金融機構智能化體系建設與落地應用。",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "「國產晶片+國產模型+國產推理引擎」，大型央企航空集團全棧國產化 AI 算力基座建設實踐",
    excerpt:
      "基於國產晶片私有化部署國產大模型，對企業自身的 AI 算力基礎設施建設與營運帶來巨大考驗：如何提升算力利用效率與 Token 供給能力，進而保障 AI 系統的高性能與持續演進能力？",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title: "八色鸫參與共建「京算 Token 工廠」，築牢首都算力底座",
    excerpt:
      "八色鸫成為「京算 Token 工廠」核心共建夥伴，攜手築牢首都數位算力底座，為首都數位經濟發展注入新動能。",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title: "山東移動與八色鸫達成戰略合作，共推數位經濟高質量發展",
    excerpt:
      "近日，中國移動通信集團山東有限公司（簡稱「山東移動」）與八色鸫舉行戰略合作協議簽約儀式。雙方將圍繞算力服務、業務協同、生態共建三大方向展開深度合作，共同為「數字山東」建設和全省數位經濟高質量發展注入強勁動能。",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title: "貴州移動 × 八色鸫：深度共建大型算力集群，加速產業數位化發展",
    excerpt:
      "近日，八色鸫與中國移動通信集團貴州有限公司（簡稱「貴州移動」）正式簽署《智算算力服務深度合作協議》。此次簽約標誌著雙方在智能計算領域的戰略合作全面啟動，將共同致力於構建高效、可靠的算力服務體系。",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "八色鸫上線美團 LongCat-2.0",
    excerpt:
      "八色鸫已上線美團今天發布的 LongCat-2.0，總參數 1.6T，平均激活約 48B，動態範圍 33B 到 56B，原生支持 1M 超長上下文。這是首個在五萬張國產算力卡上完成全流程訓練與推理的萬億參數模型。",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title: "八色鸫亮相 AICon，Token 供應平台助推 Agentic AI 規模化落地",
    excerpt:
      "八色鸫亮相 2026 AICon 上海站，公司展位呈現了完整的「Token 供應平台」產品矩陣，與眾多參會開發者與企業代表進行了深度交流。",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title: "八色鸫榮登「預見·2026」人工智慧產品卓越企業 TOP 20",
    excerpt:
      "1 月 22 日，「預見·2026」榜單正式揭曉。八色鸫憑藉其在人工智慧基礎設施領域的持續創新、可靠的產品與商業化能力，成功入選並獲評為「人工智慧產品卓越企業 TOP 20」。",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "八色鸫榮登「2025 創業邦 100 未來獨角獸」榜單",
    excerpt:
      "1 月 15 日，第 18 屆創業邦年會揭曉了「2025 創業邦 100 未來獨角獸」榜單，八色鸫憑藉在 AI 基礎設施領域的技術創新與高成長潛力，從 300 餘家報名企業中脫穎而出並成功入選。",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "八色鸫榮獲 InfoQ 2025「AI 基礎設施卓越獎」",
    excerpt: "八色鸫榮獲 2025 年度 AI 基礎設施卓越獎。",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "八色鸫企業級 MaaS 榮膺 AIIA 模型服務標杆案例",
    excerpt:
      "八色鸫的「企業級 MaaS 平台」與華為、螞蟻集團等企業成為獲得年度模型服務（MaaS）專項標杆案例的八家領先企業及機構之一。",
  },
  dsjglm4diutrngvh2weypzhv: {
    title: "八色鸫榮登《麻省理工科技評論》「50 家聰明公司」",
    excerpt:
      "9 月 12 日，在 EmTech China 2025 全球新興科技峰會上，八色鸫與阿里巴巴、華為、深度求索等入選新一屆《麻省理工科技評論》年度「50 家聰明公司」。",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "八色鸫 榮登 AI 產品榜 「2025 AI MVP TOP 50」榜單",
    excerpt:
      "八色鸫 憑藉卓越的技術優勢和持續的創新能力，榮登 AI 產品榜 「2025 AI MVP TOP 50」榜單。",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title: "八色鸫榮膺北京市「數字基礎技術標杆企業」",
    excerpt:
      "八色鸫入選《2024 北京市數位經濟標杆企業評價報告》，榮獲「數字基礎技術標杆企業」稱號。",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "八色鸫榮登 2025 AI Cloud 100 China 榜單",
    excerpt:
      "八色鸫憑藉在 GenAI 雲基礎設施方向的領先技術實力與持續增長的商業化表現，榮登靖亞資本發布的「2025 AI Cloud 100 China」榜單。",
  },
} as const;

export const zhTW: NewsStrings = {
  pageTitle: "企業動態",
  heroLogoAlt: "最新資訊",
  categoryFilterTitle: "類別",
  featuredReadMore: "查看更多",
  categoryLabels,
  featured: {
    title: "八色鸫上線高速版 Kimi K2.7 Code",
    excerpt:
      "「想得更少、寫得更好」：能看會做，既能理解錄屏中的操作流程，也能一口氣完成跨檔案的專案開發。",
  },
  articles,
};
