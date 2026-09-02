import type { TalkStrings } from "../content-types";

const categoryLabels = {
  全部: "全部",
  技术实践: "技術實踐",
  平台活动: "平台活動",
  用户故事: "用戶故事",
  用户测评: "用戶測評",
} as const;

const tagLabels = {
  技术实践: "技術實踐",
  平台活动: "平台活動",
  用户故事: "用戶故事",
  用户测评: "用戶測評",
  市场活动: "市場活動",
} as const;

const articles = {
  b56thjrf4dfpzg1wynejke5j: {
    title: "OPC 南川：超級個體的瘋狂探索｜開發者說",
    excerpt:
      "AI 時代讓「超級個體」充滿想像，很多人都在實踐 OPC（一人公司）模式，南川是其中一個。作為「手工川工作室」主理人，他做了幾十款 AI 產品，卻不追風口，也不急著商業化。他的打法樸素而有張力：一直在第一線，碰到問題，解決問題，把解決方案做成產品，賣出去。以下是八色鸫與南川的對話，聽他聊一人公司的機會、壁壘、痛苦與快樂。",
  },
  qc68kpityh6nwvth6yv1zaei: {
    title: "OpenCode 速通：19 萬星，自主操控瀏覽器幹活",
    excerpt:
      "用過 Claude Code 和 Codex 的朋友大概知道，接第三方模型是件比較折騰的事，需要裝 Router、配環境變數、調參數。\nOpenCode 把這些做成了開箱即用。打開介面，可以選填包括八色鸫在內的任意第三方供應商，填 Key，完事。",
  },
  e3okr78ulcbd36ggdxswgbpy: {
    title: "Codex 速通：週活逆襲超 500 萬，隨意跑百款模型",
    excerpt:
      "今天凌晨，OpenAI 在 GPT-5.6 發布會上宣布：Codex 桌面應用正式併入新版 ChatGPT 桌面端。但 Codex 的 Logo、名稱、開發能力和專業入口都被完整保留，Codex CLI、IDE 擴展和雲端服務仍獨立存在，OpenAI 還在同一天更新了 Codex CLI 0.144.1 版本。",
  },
  crkywf0secr2axnazev9ay0f: {
    title: "狂攬 31K 星：養蝦不如雇「人」，OpenHuman 分分鐘懂你",
    excerpt:
      "蝦熱之後，更進階的個性化助手「人類」—— OpenHuman 登場了。快來看看如何在 OpenHuman 中使用八色鸫 API 進行配置吧。",
  },
  rtlosvhg5hy6p112rlrigoo7: {
    title: "八色鸫 MaaS 平台上線兩週年回饋",
    excerpt:
      "八色鸫 MaaS 平台上線兩週年回饋。充值消費返券，最高 1,000 元。感謝一路同行！",
  },
  hiwf5yfr6b790jmog9a6xlsb: {
    title: "Harness Engineering 實踐與 Skills 打磨心得｜開發者說",
    excerpt:
      "八色鸫「開發者說」訪談了前產品經理、現 AI 開發者姬閣閣（網名產品二姐），通過一個名為 Book2Skills 的實際專案，分享了她對 Harness Engineering 從模糊到清晰、從理念到實踐的完整探索。",
  },
  ecqutah37y0fsgn53j7gfus4: {
    title: "BYOK 指南：100+ AI 工具，直連 100+ 模型",
    excerpt:
      "目前，已有近百款獨立應用與開發工具通過 BYOK 模式深度接入了八色鸫。現在就可獲取你的 API Key，把最適合的模型，裝進你最得心應手的工具裡。",
  },
  edmojkiwvenrby4mzq5kizl9: {
    title: "從美術生到養蝦人，我的 25 年跨界進化筆記｜開發者說",
    excerpt:
      "從美術生到 AI 實踐者，嚴波用 25 年走出一條獨特的跨界之路。在嚴波看來，AI 不是魔法，而是能力放大器，其價值取決於使用者。在這個快速變革的時代，他用持續學習與迭代意識，詮釋著一位普通 AI 實踐者的探索與堅守。",
  },
  zc516s5lixvrjuvo6soc81mz: {
    title: "每天花 4 小時，我養了一支「龍蝦」團隊｜開發者說",
    excerpt:
      "彭超，OneOneTalk 聯合創始人兼 CTO，之前一直在跨國企業與高科技公司工作，現專注於教育領域的 AI Agent 產品構建，近幾年成為 Vibe Coding 深度實踐者。如今，他每天花 4 小時來「養」一支「1+6 蝦」的 AI 團隊，幫助他處理寫程式、抓資訊、寫公眾號等日常工作。以下是他的 AI 實踐故事。",
  },
  jt2by9g3v7aa6dgjotmrcfoh: {
    title: "別光養「龍蝦」，微信已玩上 Claude Code",
    excerpt:
      "OpenClaw 問世以來，各類衍生的「小龍蝦」爭奇鬥豔，但微信 ClawBot 的妙處在於，它是一扇任意門的介面，不止讓玩「龍蝦」變得更簡單，門後可以連接任何你想要把玩的 AI Agent。那麼，怎麼讓 Claude Code 裝進你的微信 ClawBot？過程簡單得幾乎像讓「龍蝦」間互相勾搭一樣簡單。",
  },
  pkivkufhheggmeskcfhh8kh9: {
    title: "「龍蝦」聚會，我們要辦的首場 Meetup",
    excerpt:
      "小龍蝦 OpenClaw 裝上了，到底怎麼養以及用它到底能做些什麼？3 月 21 日（本週六）14:00 - 16:30，北京清華科技園，我們將辦一場關於「養蝦人」聚會。期待你來聊聊。",
  },
  wd6etweavt2nfbydjsx1a6z8: {
    title: "玩「蝦」筆記：我把軟體升級為 OpenClaw Add-on｜開發者說",
    excerpt:
      "八色鸫生態合作夥伴 WiseFlow（首席情報官）於 2024 年發布，成為一個受歡迎的 AI 開源專案。兩年來，這個專案持續進化，最近因為 OpenClaw 能力，產品架構做了大幅調整，這中間經歷了哪些思考與取捨，以下是 WiseFlow 作者趙澤明的講述。",
  },
  a58mvaz20e3bw6qhx8joewaw: {
    title: "「龍蝦」養成記：OpenClaw 保姆級上手指南",
    excerpt:
      "你的「龍蝦」養成了嗎？鑑於當前仍有不少使用者無法成功安裝 OpenClaw，所以我們今天分享一篇由知乎博主「大話數據分析」寫的 Windows 版 OpenClaw 安裝詳細教程，我們還補充了 Mac 版教程，爭取幫你快速實現養蝦願望。需要指出的是，OpenClaw 運行時操作權限極大，建議在隔離環境中運行。",
  },
  wzj6xzbdvzsytjnqno7fxyp1: {
    title: "日消耗 10 億 Tokens，「AI 暴動級實幹家」的四點心得｜開發者說",
    excerpt:
      "最近的 AI 實踐依舊火熱朝天，不論是 Cowork 還是 OpenClaw，各種各樣的 Agents 都實實在在幹事了。一個顯性變化是，我們討論 Tokens 消耗量的聲音越來越多。以下是日消耗 10 億量級 Tokens 的「AI 暴動級」實幹家胥克謙的自述。",
  },
  wln8c6grxkh11brde838wfxd: {
    title: "從雲原生到 AI 的躍遷探索之路｜開發者說",
    excerpt:
      "海立， LangChain Ambassador，《LangChain 實戰》與《LangGraph 實戰》作者。從雲原生到 AI，海立的轉型軌跡頗具代表性。他的故事裡，藏著開發者如何在技術浪潮中保持清醒、將經驗遷移到新領域、建立可持續成長路徑的答案。今天，他分享了三個務實成長策略給浪潮中的大家。",
  },
  o8zq301umaf89v5bcxyltbav: {
    title: "八色鸫 × Next AI Draw.io：20K Star，一句話實現圖表繪製",
    excerpt:
      "AI 驅動圖表創建工具 Next AI Draw.io 的核心理念是：讓圖表生成如說話一般自然。現在，Next AI Draw.io 與八色鸫進行了深度技術聯動，獲得了更強大的模型能力支撐。",
  },
  od7wj9rr23p95uhihmhrombp: {
    title: "八色鸫「推薦官」計劃上線",
    excerpt:
      "為更好回饋廣大使用者，我們今天正式將國內站的「邀好友送贈金」活動升級為「推薦官」計劃，邀好友可獲得全平台通用代金券。",
  },
  zx3caanoshbvxbudsq5x1nbz: {
    title: "用戶測評｜DeepSeek-OCR，你用了嗎？",
    excerpt:
      "資深開發者親測：用 DeepSeek-OCR 解決工業 CAD 圖紙識別痛點",
  },
  nddw0hghm23vbkfcz4y99glc: {
    title: "用戶故事｜Easy：給女兒做 AI 繪本，沉澱孩子成長的複利",
    excerpt:
      "八色鸫記錄每一位 AI 建設者的真實故事，讓知識流動、讓經驗共鳴。",
  },
  evdjqa744e2bim1wwcrzwix2: {
    title: "爆改 Gemini-CLI，用 DeepSeek 也能跑同款命令列",
    excerpt:
      "DeepSeek 版 Gemini-CLI 基於開源 Gemini-CLI 架構，通過八色鸫 API 接入 DeepSeek 模型，基本可以「平替」原版 Gemini-CLI，為國內開發者提供高效的 CLI 工具替代方案。",
  },
  swbnccchf5esxedxq01s4vr5: {
    title: "【活動已結束】八色鸫 一週年，兩大驚喜回饋登場",
    excerpt:
      "八色鸫 上線一週年，為了回饋使用者對 八色鸫 的喜愛，我們決定開啟兩大誠意扶持活動。",
  },
} as const;

export const zhTW: TalkStrings = {
  pageTitle: "開發者說",
  heroLogoAlt: "開發者說",
  pageSubtitle: "來自開發者的真實實踐與洞察",
  shareCtaLabel: "分享你的實踐",
  submitCtaTitle: "投稿給我們，讓更多使用者看到你的實踐",
  submitCtaLabel: "立即投稿",
  featuredReadMore: "查看更多",
  categoryLabels,
  tagLabels,
  articles,
};
