import type { TalkStrings } from "../content-types";

const categoryLabels = {
  全部: "すべて",
  技术实践: "技術実践",
  平台活动: "プラットフォームイベント",
  用户故事: "ユーザストーリー",
  用户测评: "ユーザーレビュー",
} as const;

const tagLabels = {
  技术实践: "技術実践",
  平台活动: "プラットフォームイベント",
  用户故事: "ユーザストーリー",
  用户测评: "ユーザーレビュー",
  市场活动: "マーケティングイベント",
} as const;

const articles = {
  b56thjrf4dfpzg1wynejke5j: {
    title: "OPC 南川：スーパー個体の大胆な探索｜開発者の声",
    excerpt:
      "AI 時代は「スーパー個体」の想像を広げ、OPC（一人会社）を実践する人も増えています。南川さんは「手工川スタジオ」主宰として数十の AI プロダクトを作り、 hype を追わず急いで収益化もしません。basedong が一人会社の機会・参入障壁・苦しさと喜びについて語ってもらいました。",
  },
  qc68kpityh6nwvth6yv1zaei: {
    title: "OpenCode 速習：19万スター、ブラウザを操るエージェント",
    excerpt:
      "Claude Code や Codex では第三者モデルの接続は Router や環境変数の設定が面倒です。\nOpenCode はそれを箱から出してすぐ使える形に。basedong を含むプロバイダを選び、Key を入れるだけです。",
  },
  e3okr78ulcbd36ggdxswgbpy: {
    title: "Codex 速習：週間500万超、100以上のモデルを自由に",
    excerpt:
      "OpenAI の GPT-5.6 発表で Codex デスクトップが新版 ChatGPT クライアントに統合される一方、Codex ブランド・CLI・IDE 拡張・クラウドは独立。同日 Codex CLI 0.144.1 も更新されました。",
  },
  crkywf0secr2axnazev9ay0f: {
    title: "31K スター：エビより「人」を雇う OpenHuman",
    excerpt:
      "「エビ」ブームの次はパーソナル助手 OpenHuman。OpenHuman で basedong API を設定する方法を紹介します。",
  },
  rtlosvhg5hy6p112rlrigoo7: {
    title: "basedong MaaS プラットフォーム2周年キャンペーン",
    excerpt:
      "basedong MaaS 2周年記念。チャージで最大1,000元分のクーポン。いつもありがとうございます！",
  },
  hiwf5yfr6b790jmog9a6xlsb: {
    title: "Harness Engineering 実践と Skills 磨き｜開発者の声",
    excerpt:
      "元 PM で現 AI 開発者の姬閣閣（プロダクト二姐）が Book2Skills プロジェクトを通じて Harness Engineering を実践へ落とし込んだ過程を語ります。",
  },
  ecqutah37y0fsgn53j7gfus4: {
    title: "BYOK ガイド：100+ AI ツール、100+ モデルに直結",
    excerpt:
      "近百の独立アプリと開発ツールが BYOK で basedong に深く接続済み。API Key を取得し、最適なモデルを慣れたツールへ。",
  },
  edmojkiwvenrby4mzq5kizl9: {
    title: "美大生からエビ飼育へ：25年の越境ノート｜開発者の声",
    excerpt:
      "厳波さんは25年かけ美術から AI 実践者へ。AI は魔法ではなく能力増幅器で、価値は使う人次第—学び続ける日常の AI 実践者像を語ります。",
  },
  zc516s5lixvrjuvo6soc81mz: {
    title: "1日4時間、「ロブスター」チームを育てる｜開発者の声",
    excerpt:
      "OneOneTalk CTO の彭超さんは、1+6「エビ」の AI チームに毎日4時間。コーディング、情報収集、WeChat 記事など日常業務を任せています。",
  },
  jt2by9g3v7aa6dgjotmrcfoh: {
    title: "エビだけでなく、WeChat でも Claude Code",
    excerpt:
      "WeChat ClawBot は OpenClaw を簡単にし、任意の AI Agent へつなぐ入口。Claude Code を ClawBot に載せるのも驚くほど簡単です。",
  },
  pkivkufhheggmeskcfhh8kh9: {
    title: "「ロブスター」集い：初の Meetup",
    excerpt:
      "OpenClaw を入れた後、どう育て何ができる？3月21日（土）14:00–16:30、北京・清華科技園で「エビ飼い」向け初 Meetup。",
  },
  wd6etweavt2nfbydjsx1a6z8: {
    title: "エビメモ：ソフトを OpenClaw Add-on に｜開発者の声",
    excerpt:
      "basedong パートナー WiseFlow は2024年に人気 OSS として登場。OpenClaw によりアーキテクチャを大きく組み替えた思考とトレードオフを趙澤明さんが語ります。",
  },
  a58mvaz20e3bw6qhx8joewaw: {
    title: "「ロブスター」育成：OpenClaw 入門ガイド",
    excerpt:
      "Windows 向け詳細インストール（Mac 追記付き）。OpenClaw は権限が広いため隔離環境での実行を推奨します。",
  },
  wzj6xzbdvzsytjnqno7fxyp1: {
    title: "1日10億 Tokens：AI 実干家の4つの学び｜開発者の声",
    excerpt:
      "Cowork や OpenClaw など Agents が本当に動き、Token 消費の話題も増えています。1日約10億 Tokens の胥克謙さんが四つの心得を共有。",
  },
  wln8c6grxkh11brde838wfxd: {
    title: "クラウドネイティブから AI へ｜開発者の声",
    excerpt:
      "LangChain Ambassador の海立さんが、技術の波の中で経験を移し、持続的に成長する3つの現実的戦略を紹介。",
  },
  o8zq301umaf89v5bcxyltbav: {
    title: "basedong × Next AI Draw.io：20K Star、一言で図表",
    excerpt:
      "Next AI Draw.io は会話のように図を作るツール。basedong との連携でモデル能力が強化されました。",
  },
  od7wj9rr23p95uhihmhrombp: {
    title: "basedong「リファラルアンバassador」開始",
    excerpt:
      "「友達招待ボーナス」をアップグレード。友達を招待して全プラットフォーム共通クーポンを獲得。",
  },
  zx3caanoshbvxbudsq5x1nbz: {
    title: "ユーザーレビュー｜DeepSeek-OCR、使った？",
    excerpt:
      "シニア開発者が DeepSeek-OCR で工業 CAD 図面認識の課題を検証。",
  },
  nddw0hghm23vbkfcz4y99glc: {
    title: "ユーザーストーリー｜Easy：娘への AI 絵本",
    excerpt:
      "basedong は AI 構築者のリアルなストーリーを記録し、知識と経験の共鳴を広げます。",
  },
  evdjqa744e2bim1wwcrzwix2: {
    title: "Gemini-CLI を DeepSeek で動かす",
    excerpt:
      "オープン Gemini-CLI 上に basedong API で DeepSeek を接続—国内開発者向け CLI 代替案。",
  },
  swbnccchf5esxedxq01s4vr5: {
    title: "【終了】basedong 1周年：2つのサプライズ",
    excerpt:
      "basedong 1周年に感謝を込め、2つの支援キャンペーンを開始します。",
  },
} as const;

export const ja: TalkStrings = {
  pageTitle: "開発者の声",
  heroLogoAlt: "開発者の声",
  pageSubtitle: "開発者のリアルな実践とインサイト",
  shareCtaLabel: "あなたの実践を共有",
  submitCtaTitle: "投稿して、より多くのユーザーに実践を届けましょう",
  submitCtaLabel: "今すぐ投稿",
  featuredReadMore: "もっと見る",
  categoryLabels,
  tagLabels,
  articles,
};
