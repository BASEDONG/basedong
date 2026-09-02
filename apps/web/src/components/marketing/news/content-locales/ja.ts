import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "すべて",
  荣誉奖项: "受賞・表彰",
  企业动态: "企業ニュース",
  模型上新: "新モデル",
  市场活动: "イベント",
  客户案例: "導入事例",
  生态合作: "エコシステム連携",
  企业AI实践: "企業 AI 実践",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "数家科技 × 算家計算 × basedong：算力共同運営で Token ファクトリーを共創",
    excerpt:
      "basedong は貴州の数家科技および算家計算と算力共同運営のパートナーシップを締結しました。",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong が「IDC 中国 AI 50 強」に選出",
    excerpt:
      "7 月 30 日、IDC が「2026 IDC 中国 AI 50 強」を発表。basedong は AI インフラの技術力と商用化能力で選出されました。",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "周鴻禕氏・李開復氏が basedong を訪問｜WAIC 現地レポート",
    excerpt:
      "7 月 17〜20 日、上海で 2026 世界人工知能大会が開催。basedong は自社ブースを出展し、来場者・顧客・メディアと交流しました。",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title: "宇信科技と basedong が戦略提携、金融 AI 化を加速",
    excerpt:
      "宇信科技と basedong は戦略提携を締結。金融シーンと AI インフラの知見を融合し、金融機関向け AI ソリューションを共同提供します。",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "国産チップ＋国産モデル＋国産推論エンジン：大型国営航空グループのフルスタック AI 算力基盤",
    excerpt:
      "国産チップ上に国産大規模モデルをプライベート展開する際、算力効率と Token 供給能力を高め、高性能と継続的進化を両立する課題に直面します。",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title: "basedong が「京算 Token ファクトリー」共同構築に参画",
    excerpt:
      "basedong は「京算 Token ファクトリー」の中核パートナーとして、首都圏のデジタル算力基盤強化に貢献します。",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title: "山東移動と basedong が戦略提携、デジタル経済を推進",
    excerpt:
      "山東移動と basedong は算力サービス、業務連携、エコシステム共創の 3 方向で深い協力に合意しました。",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title: "貴州移動 × basedong：大規模算力クラスターで産業 DX を加速",
    excerpt:
      "basedong と貴州移動は智算算力サービスに関する深度協力協定に署名し、効率的で信頼性の高い算力サービス体系の構築を目指します。",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong が美团 LongCat-2.0 を提供開始",
    excerpt:
      "basedong は美团の LongCat-2.0 を提供開始。総パラメータ 1.6T、平均活性化約 48B、動的範囲 33B〜56B、ネイティブ 1M コンテキスト。国産算力カード 5 万枚で完結した初の兆パラメータモデルです。",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong が AICon に登場、Token 供給プラットフォームが Agentic AI 普及を後押し",
    excerpt:
      "AICon 2026 上海で basedong は Token 供給プラットフォームの製品群を展示し、開発者・企業担当者と深く交流しました。",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title: "basedong が「Foresee 2026」AI 製品卓越企業 TOP 20 に選出",
    excerpt:
      "1 月 22 日発表の「Foresee 2026」で、basedong は AI インフラ分野の継続的イノベーションと商用化能力が評価され TOP 20 に選ばれました。",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong が「2025 CYZONE 100 Future Unicorns」に選出",
    excerpt:
      "1 月 15 日、300 社以上の応募から basedong が AI インフラの技術革新と高い成長性で選出されました。",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong が InfoQ 2025「AI インフラ卓越賞」を受賞",
    excerpt: "basedong は 2025 年度 AI インフラ卓越賞を受賞しました。",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "basedong エンタープライズ MaaS が AIIA モデルサービス標竿案例に",
    excerpt:
      "basedong のエンタープライズ MaaS プラットフォームは、Huawei や Ant Group などとともに MaaS 部門の標竿案例 8 社の一つに選ばれました。",
  },
  dsjglm4diutrngvh2weypzhv: {
    title: "basedong が MIT Technology Review「50 Smart Companies」に選出",
    excerpt:
      "9 月 12 日 EmTech China 2025 で、basedong は Alibaba、Huawei、DeepSeek などとともに同リストに選出されました。",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong が「2025 AI MVP TOP 50」にランクイン",
    excerpt:
      "basedong は技術力と継続的イノベーションで AI MVP TOP 50 2025 に選出されました。",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title: "basedong が北京市「デジタル基盤技術標竿企業」に認定",
    excerpt:
      "basedong は『2024 北京市デジタル経済標竿企業評価報告』に選出され、デジタル基盤技術標竿企業に認定されました。",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong が 2025 AI Cloud 100 China にランクイン",
    excerpt:
      "basedong は GenAI クラウドインフラの技術力と商用成長で Jingya Capital の AI Cloud 100 China 2025 に選出されました。",
  },
} as const;

export const ja: NewsStrings = {
  pageTitle: "企業ニュース",
  heroLogoAlt: "最新ニュース",
  categoryFilterTitle: "カテゴリ",
  featuredReadMore: "続きを読む",
  categoryLabels,
  featured: {
    title: "basedong が高速版 Kimi K2.7 Code を提供開始",
    excerpt:
      "「考える量を減らし、より良く書く」：画面録画の操作フローを理解し、複数ファイルにまたがる開発も一気通貫でこなします。",
  },
  articles,
};
