import type { HomeStrings } from "../content-types";

export const zhTW: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "八色鶇正式上線",
      title: "GPT-5.6",
      description:
        "GPT-5.6 模型家族包含 Sol（旗艦）、Terra（均衡）、Luna（高速）三檔，在編碼、智慧體、知識工作與科學推理等場景達到前沿水準，現已可在平台呼叫。",
      ctaLabel: "立即試用",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Anthropic 最新旗艦",
      title: "Opus 5",
      description:
        "Opus 5 在編碼、智慧體與專業寫作上全面升級，面向高複雜度、長週期任務，提供更精準的專業產出能力。",
      ctaLabel: "立即試用",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "限時免費",
      title: "Auto 模型",
      description:
        "智慧路由自動選型，在速度、成本與效果之間動態平衡；限時免費體驗，零門檻接入大模型能力。",
      ctaLabel: "立即試用",
      logoAlt: "Auto 模型",
    },
    {
      tabLabel: "模型部署",
      eyebrow: "企業級能力",
      title: "大模型服務部署",
      description:
        "支援私有化部署與雲端彈性擴縮，涵蓋模型適配、推理加速與運維保障，支撐關鍵業務穩定運行。",
      ctaLabel: "了解詳情",
      logoAlt: "大模型服務部署",
    },
  ],
  productMatrix: {
    title: "覆蓋全鏈路的產品體系，支撐 AI 應用從構想到上線",
    subtitle: "為開發者與企業提供一體化接入能力，快速打通 AI 與業務場景",
  },
  productCards: [
    {
      title: "本地私有化部署",
      description:
        "面向有合規與資料主權要求的企業，提供可落地的私有化方案，涵蓋效能調優、叢集部署與持續運維，靈活匹配各類業務場景。",
      ctaLabel: "了解詳情",
    },
    {
      title: "模型推理效能優化服務",
      description:
        "依托開源推理引擎，相容主流開源模型及客戶自研模型，涵蓋選型適配、部署調優到線上運維的全流程，顯著提升推理效率。",
      ctaLabel: "聯絡我們",
    },
    {
      title: "免費的 Auto 模型",
      description:
        "智慧路由自動選型，在速度、成本與效果之間動態平衡；限時免費體驗，零門檻接入大模型能力。",
      ctaLabel: "立即試用",
    },
    {
      title: "一體化大模型 API 服務",
      description:
        "涵蓋文字、語音、圖像與影片等模態，統一 API 入口、按量計費，幫助團隊快速完成能力接入與產品迭代。",
      ctaLabel: "立即體驗",
    },
  ],
  whySection: {
    title: "為什麼選擇八色鶇",
  },
  whyHighlightCards: [
    {
      title: "高性價比",
      textBlocks: [
        {
          lines: [[{ text: "全鏈路" }, { text: "成本治理", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "Auto 模型" }, { text: "限時免費", emphasis: true }],
            [{ text: "智慧路由選型，速度與成本動態平衡" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "推理與部署支出最多可降低", value: "40%" },
        { prefix: "Auto 模型限時免費，接入成本降至", value: "零" },
      ],
      footnotes: [
        [{ text: "按量計費透明結算，支出清晰可預期" }],
        [{ text: "高度解耦異構算力，無縫調度主流 AI 晶片" }],
        [
          { text: "為成本敏感型應用提供穩定、可預期的" },
          { text: "費用表現", emphasis: true },
        ],
      ],
    },
    {
      title: "高穩定性",
      textBlocks: [
        {
          lines: [[{ text: "多節點" }, { text: "冗餘保障", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "監控告警與故障自愈", emphasis: true }],
            [{ text: "持續保障服務長期穩定可用" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "多節點冗餘，故障切換可達", value: "秒級" },
        { prefix: "企業級技術支援隨時響應，滿足", value: "SLA", suffix: "要求" },
      ],
      footnotes: [
        [{ text: "從容應對高並發、大批量推理 workload" }],
        [{ text: "經大量開發者實戰檢驗，服務長期穩定可用" }],
        [
          { text: "為業務關鍵提供穩定、可預期的" },
          { text: "服務表現", emphasis: true },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "高擴展性",
      description:
        "彈性擴縮容應對流量波動，適配各類複雜業務形態。自訂模型快速上線，從容應對規模化部署需求。架構靈活可擴展，兼顧多元任務場景，支援混合雲與多雲部署。",
    },
    {
      title: "高安全性",
      description:
        "BYOC 模式可選，資料不離域，隱私與業務安全有保障。計算、網路、儲存三層隔離，築牢資料安全防線。遵循行業規範與合規標準，滿足企業級安全與審計要求。",
    },
    {
      title: "高智慧",
      description:
        "匯集前沿大語言模型與音視訊等多模態能力，一站式呼叫。彈性伸縮隨業務體量增長，從容覆蓋多樣化應用場景。用量與費用視覺化分析，輔助決策、精準把控投入產出。",
    },
    {
      title: "高可用性",
      description:
        "經大量開發者實戰檢驗，服務長期穩定可用。配套監控告警與故障自愈機制，持續保障服務可用性。企業級技術支援團隊隨時響應，滿足關鍵業務對 SLA 的要求。",
    },
  ],
  industrySection: {
    title: "深耕多行業場景，按需定製靈活落地方案",
  },
  industryItems: [
    {
      title: "AI 硬體",
      description:
        "面向 AI 行動終端、推理一體機與具身智慧等場景，降低端雲協同鏈路時延，提升整體回應體驗。",
    },
    {
      title: "政務",
      description:
        "以高吞吐、低延遲的推理能力，為智慧政務、公共安全與產業升級等場景提供高性價比的生成式 AI 方案，相容異構算力與多種部署形態，不綁定特定晶片廠商或硬體生態。",
    },
    {
      title: "智算中心",
      description:
        "優化算力資源調度與分配，加速 AI 模型訓練迭代與大規模推理服務部署。",
    },
    {
      title: "教育",
      description:
        "打造智慧教學助手，透過多模型協同規劃個人化學習路徑，即時答疑輔導，顯著提升教學效率與學生體驗。",
    },
    {
      title: "網際網路",
      description:
        "為網際網路平台提供智慧內容生成與個人化推薦能力，支援模型熱切換與推理加速，提升 GPU 利用率，突破效能瓶頸，全面優化使用者體驗與營運效率。",
    },
  ],
  partners: {
    title: "眾多客戶與生態夥伴",
    ctaPrimaryDesc: "幾分鐘即可開通模型 API",
    ctaPrimaryButton: "開始試用",
    ctaSecondaryDesc: "需要專屬方案？聯絡我們",
    ctaSecondaryButton: "提交需求",
  },
  heroCarousel: {
    ariaLabel: "首頁重點內容",
    switchTabLabel: (tabLabel) => `切換到 ${tabLabel}`,
  },
};
