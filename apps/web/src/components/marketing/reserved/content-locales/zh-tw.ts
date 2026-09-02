import type { ReservedStrings } from "../content-types";

export const zhTW: ReservedStrings = {
  pageTitle: "八色鸫預留實例服務｜大模型預留算力與企業級推理部署",
  pageDescription:
    "鎖定算力，支撐關鍵業務穩定運行。可預期性能 · 高用量場景更優成本結構 · 企業級 SLA 保障",
  heroLogoAlt: "預留實例服務",
  heroTitle: "鎖定算力",
  heroTitleAccent: "支撐關鍵業務穩定運行",
  heroSubtitle: "可預期性能 · 高用量場景更優成本結構 · 企業級 SLA 保障",
  consultCta: "預約諮詢",
  whyBadge: "WHY RESERVED",
  whyTitle: "為什麼選擇預留實例服務",
  whySubtitle:
    "面向企業核心推理場景，提供獨占算力、精度保障與成本優化的一站式解決方案。",
  whyCards: [
    {
      title: "專屬預留算力",
      items: [
        "為核心業務預留專屬算力資源，在高峰期依然保持穩定服務能力。",
        "避免共享資源環境下的算力競爭，保障關鍵業務持續運行。",
      ],
    },
    {
      title: "模型精度保障",
      items: [
        "部署過程中，依托自研高性能推理框架進行適配優化，確保推理效果與原廠一致。",
        "確保推理智能水準穩定，讓關鍵業務場景持續獲得高品質輸出。",
      ],
    },
    {
      title: "成本可控與規模化優勢",
      items: [
        "按固定週期規劃費用，避免按量計費隨調用量波動帶來的成本不確定性。",
        "在穩定高負載等特定場景下，具備更優的成本結構，助力企業實現長期預算可控與成本優化。",
      ],
    },
    {
      title: "企業級 SLA 性能護航",
      items: [
        "提供企業級服務等級保障，確保關鍵推理任務穩定運行。",
        "支持長期穩定負載與核心業務系統接入。",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "預留實例參考性能與價格",
  pricingSubtitle:
    "預留實例支持多種算力規格，可根據模型類型、並發需求與業務規模靈活配置。以下展示部分模型在不同實例規格下的參考性能與定價。",
  highPerfTitle: "高性能實例規格",
  standardTitle: "標準版實例規格",
  pricingNote1:
    "折合單價是基於上表 TPM、按每月 30 天、總體利用率 50% 的基準進行折算。",
  pricingNote2:
    "性能數據基於典型推理參數測試：輸入 24k tokens，輸出 1k tokens，快取命中率 80%。",
  pricingFootCtaBefore: "上述為示例規格，更多模型規格及定制部署方案歡迎",
  pricingFootCtaAfter: "。",
  costReferenceLabel: "費用參考",
  priceLabel: "價格",
  unitPriceLabel: "折合單價",
  perfReferenceLabel: "性能參考",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "企業級交付與運行保障",
  deliverySteps: [
    {
      title: "快速部署交付",
      description:
        "標準預留實例通常在 1–7 個工作日內完成部署，支持快速接入現有業務系統，縮短業務上線週期。",
    },
    {
      title: "部署與性能優化",
      description:
        "平台負責完成模型部署與性能驗證，提供推理性能調優支持，保障業務穩定接入。",
    },
    {
      title: "彈性擴展能力",
      description:
        "支持根據業務規模進行算力擴展與規格調整，滿足業務增長及階段性流量變化需求。",
    },
    {
      title: "服務等級保障（SLA）",
      description:
        "提供明確的服務等級協議與運行保障機制，支持長期穩定負載與企業級業務接入。",
    },
  ],
  ctaBadge: "支持專屬定制",
  ctaTitle: "開啟專屬算力\n加速業務增長",
  ctaBody:
    "支持更多模型預留實例部署方案，我們的專家團隊將根據您的業務需求，提供更貼合場景的定制化解決方案與報價建議。",
  ctaCardTitle: "獲取更多模型預留實例信息",
  ctaCardBody: "歡迎預約諮詢，獲取詳細規格、部署方案與報價信息",
  ctaButton: "立即諮詢",
  highPerfModels: [
    {
      description:
        "適用於企業級智能體開發、複雜任務規劃與多步驟執行、軟件工程自動化、長文檔分析及代碼生成等場景。",
      price: "¥ 772,200 /組/月",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "1000 萬",
    },
    {
      description:
        "適用於企業級多模態智能體開發、視覺內容理解與分析、設計稿/界面生成代碼、複雜任務自動化執行等場景。",
      price: "¥ 772,200 /組/月",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "400 萬",
    },
    {
      description:
        "適用於企業級長文檔與知識庫分析、智能客服與內容生成、複雜業務流程自動化、企業應用智能化升級等場景。",
      price: "¥ 386,100 /組/月",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "500 萬",
    },
    {
      description:
        "適用於企業級複雜推理與決策分析、代碼生成與軟件開發輔助、智能體工具調用、數據分析與自動化流程執行等場景。",
      price: "¥ 772,200 /組/月",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "1250 萬",
    },
  ],
  standardModels: [
    {
      description:
        "適用於企業級多模態智能體開發、視覺內容理解與分析、設計稿/界面生成代碼、複雜任務自動化執行等場景。",
      price: "¥ 486,000 /組/月",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "530 萬",
    },
    {
      description:
        "適用於企業級長文檔與知識庫分析、智能客服與內容生成、複雜業務流程自動化、企業應用智能化升級等場景。",
      price: "¥ 486,000 /組/月",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "900 萬",
    },
    {
      description:
        "適用於企業級複雜推理與決策分析、代碼生成與軟件開發輔助、智能體工具調用、數據分析與自動化流程執行等場景。",
      price: "¥ 486,000 /組/月",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "1080 萬",
    },
  ],
};
