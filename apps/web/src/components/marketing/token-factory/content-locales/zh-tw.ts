import type { TokenFactoryStrings } from "../content-types";

export const zhTW: TokenFactoryStrings = {
  heroLogoAlt: "AI 算力營運平台",
  heroBrandName: "八色鴝",
  heroTitle: "AI 算力營運平台",
  heroSubtitle: "把閒置或自有算力，快速變成可持續運轉的 Token 產能",
  heroTags: ["GPU 彈性編排", "Token 產能", "多架構相容", "按量計費"],
  heroCta: "預約溝通",
  featuresTitle: "穩定、可擴展的 Token 產能",
  featuresSubtitle: "讓硬體投入持續變成可計量的 AI 生產力",
  featureCards: [
    {
      title: "面向真實業務場景",
      description:
        "涵蓋程式助手、智能體、對話與企業應用等高並發場景，為線上業務提供可持續、可計量的 Token 供給。",
    },
    {
      title: "多架構彈性編排",
      description:
        "將不同架構、不同規格的算力納入同一調度平面，動態分配與秒級伸縮，讓叢集產能保持高效運轉。",
    },
    {
      title: "單位算力吞吐提升",
      description:
        "依托開源推理引擎深度優化推理鏈路，在同等硬體條件下提高單卡 Token 產出，放大既有投資回報。",
    },
    {
      title: "主流 GPU 統一接入",
      description:
        "面向各類主流 GPU 與 AI 加速卡提供統一接入能力，不綁定單一硬體廠商，便於按需擴展 Token 產能。",
    },
  ],
  architectureBadge: "能力棧",
  architectureTitleLine1: "從硬體資源",
  architectureTitleLine2: "到可用服務",
  architectureBodyPrefix:
    "八色鴝以完整的算力營運棧，幫助各類主流 GPU 資源快速形成穩定、可對外交付的",
  architectureBodySuffix: "能力。",
  architectureLayers: [
    {
      title: "業務應用與終端客戶",
      subtitle: "智能體 · 程式助手 · 企業系統",
    },
    {
      title: "推理服務層",
      subtitle: "開放介面 · 模型供給 · 服務治理",
    },
    {
      title: "算力營運層",
      subtitle: "加速引擎 · 統一調度 · 運維保障",
    },
    {
      title: "底層算力資源",
      subtitle: "主流 GPU · AI 加速卡 · 企業叢集",
    },
  ],
  partnershipTitle: "多種合作路徑",
  partnershipBenefitsHeading: "價值收益",
  partnershipCards: [
    {
      title: "算力盤活與服務化",
      description:
        "適合已有自建 GPU 叢集的組織：提升推理效率、降低運維負擔，或把閒置產能轉化為對外 Token 服務收入。",
      partnerLabel: "常見合作對象",
      partners: "自建算力的政企單位、網際網路公司、金融機構、通信營運商等",
      benefits: [
        "同等算力支撐更大業務規模，推理效率明顯提升",
        "充分發揮 GPU 性能，降低跨廠商適配成本",
        "資料可留在自有環境，滿足安全與合規要求",
        "閒置產能可對外服務化，從成本中心轉為收益來源",
      ],
      cta: "了解算力盤活",
    },
    {
      title: "聯合營運",
      description:
        "適合已掌握算力資產、希望盡快對外提供 Token 服務的夥伴，與八色鴝一起面向終端客戶交付。",
      partnerLabel: "常見合作對象",
      partners: "資料中心營運方、區域智算平台、GPU 雲廠商、硬體與加速卡廠商等",
      benefits: [
        "快速具備 Token 交付能力，無需從零組建技術棧",
        "同等硬體條件下顯著提升推理吞吐",
        "按實際用量分成，合作模式清晰可核算",
        "依托八色鴝產品與市場能力協同獲客",
      ],
      cta: "了解聯合營運",
    },
  ],
  whyChooseTitle: "為什麼選擇八色鴝",
  whyCards: [
    {
      prefix: "更低的",
      title: "落地與營運成本",
      description:
        "無需自建整套推理與調度體系，即可快速形成 Token 生產與交付能力，縮短從硬體資源到可變現產能的路徑。",
    },
    {
      prefix: "更穩定的",
      title: "需求對接能力",
      description:
        "內建豐富模型供給與廣泛開發者、企業客戶網路，產能可快速對接真實用量，降低空置與閒置風險。",
    },
    {
      prefix: "更高的",
      title: "單卡產出效率",
      description:
        "推理引擎與系統級優化協同發力，在不增加硬體投入的前提下提高單位 GPU 的 Token 產出，擴大收益空間。",
    },
    {
      prefix: "更高的",
      title: "叢集利用率",
      description:
        "統一調度與彈性分配，把分散、異構的算力收攏為產能池，減少空轉與閒置，讓 Token 供給持續高效運轉。",
    },
  ],
  ecosystemTitle: "適配主流 GPU 生態",
  ecosystemSubtitle:
    "不綁定單一硬體廠商，持續適配主流 GPU 與 AI 加速卡，按業務需要擴展可用算力版圖",
  gpuVendors: [
    { alt: "NVIDIA（英偉達）" },
    { alt: "Intel（英特爾）" },
    { alt: "Ascend（昇騰）" },
    { alt: "MetaX（沐曦）" },
    { alt: "Enflame（燧原）" },
  ],
  testimonialsTitle: "合作夥伴怎麼說",
  testimonials: [
    {
      title: "某網際網路公司",
      quote:
        "叢集原先只服務內部業務，優化後發現仍有大量閒置產能。八色鴝協助我們將這部分資源對外服務化，如今每月都能穩定產生服務收入，資產角色也隨之改變。",
      role: "AI 平台負責人",
    },
    {
      title: "某區域智算平台",
      quote:
        "我們負責園區與政務側的算力建設專案。接入八色鴝後，GPU 叢集利用率明顯提升，並面向園區企業形成了穩定的 Token 供給能力，算力資產開始持續產生回報。",
      role: "營運負責人",
    },
    {
      title: "某金融機構",
      quote:
        "自有 GPU 資源長期面臨推理效率與運維成本壓力。上線八色鴝算力營運服務後，同樣硬體下吞吐接近翻倍，團隊日常運維負擔也明顯減輕。",
      role: "基礎設施負責人",
    },
  ],
  ctaTitle: "把算力變成可交付的 Token 產能",
  ctaSubtitle:
    "若您已有 GPU 資源，並希望建立 Token 服務與變現能力，歡迎與我們進一步溝通。",
  ctaButton: "獲取算力營運方案",
};
