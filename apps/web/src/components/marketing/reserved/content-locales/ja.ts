import type { ReservedStrings } from "../content-types";

export const ja: ReservedStrings = {
  pageTitle: "予約インスタンス | basedong",
  pageDescription:
    "重要業務向けに算力を確保。予測可能な性能、高用量で有利なコスト、エンタープライズ SLA。",
  heroLogoAlt: "予約インスタンス",
  heroTitle: "算力を確保",
  heroTitleAccent: "重要業務を安定稼働",
  heroSubtitle:
    "予測可能な性能 · 高用量で有利なコスト · エンタープライズ SLA",
  consultCta: "相談予約",
  whyBadge: "WHY RESERVED",
  whyTitle: "予約インスタンスを選ぶ理由",
  whySubtitle:
    "エンタープライズ推論向けに、専有算力・精度保証・コスト最適化をワンストップで提供。",
  whyCards: [
    {
      title: "専有予約算力",
      items: [
        "コア業務向けに算力を予約し、ピーク時も安定したサービス能力を維持。",
        "共有プールでの競合を避け、重要業務を継続稼働。",
      ],
    },
    {
      title: "モデル精度の保障",
      items: [
        "自社高性能推論フレームワークでデプロイ時に最適化し、ベンダー同等の品質を確保。",
        "推論品質を安定させ、重要シナリオで高品質な出力を維持。",
      ],
    },
    {
      title: "コスト管理とスケールメリット",
      items: [
        "固定期間の料金設計で、従量課金の変動リスクを回避。",
        "安定高負荷シナリオではより有利なコスト構造で、長期予算を管理。",
      ],
    },
    {
      title: "エンタープライズ SLA",
      items: [
        "重要推論タスクを安定稼働させるサービスレベルを提供。",
        "長期安定負荷と本番業務システムへの接続に対応。",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "参考性能と価格",
  pricingSubtitle:
    "モデル種別・並行数・規模に応じて柔軟に構成可能。以下は一部モデルの参考性能と価格です。",
  highPerfTitle: "高性能インスタンス",
  standardTitle: "標準インスタンス",
  pricingNote1:
    "実効単価は上記 TPM から、月 30 日・全体利用率 50% を前提に換算。",
  pricingNote2:
    "性能データは典型推論条件：入力 24k tokens、出力 1k tokens、キャッシュヒット率 80%。",
  pricingFootCtaBefore: "上記は参考仕様です。他モデルやカスタム展開は",
  pricingFootCtaAfter: "ください。",
  costReferenceLabel: "費用参考",
  priceLabel: "価格",
  unitPriceLabel: "実効単価",
  perfReferenceLabel: "性能参考",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "エンタープライズ提供と運用保障",
  deliverySteps: [
    {
      title: "迅速デプロイ",
      description:
        "標準予約インスタンスは通常 1–7 営業日で展開。既存システムへ素早く接続。",
    },
    {
      title: "デプロイと性能最適化",
      description:
        "モデル展開・性能検証・推論チューニングをプラットフォームが担当。",
    },
    {
      title: "弾力的な拡張",
      description:
        "事業規模に応じた算力拡張とスペック調整で、成長や季節変動に対応。",
    },
    {
      title: "SLA 保障",
      description:
        "明確な SLA と運用保障で、長期安定負荷のエンタープライズ業務を支援。",
    },
  ],
  ctaBadge: "専用カスタム対応",
  ctaTitle: "専有算力で\n成長を加速",
  ctaBody:
    "より多くの予約インスタンス展開に対応。専門チームが要件に合わせたソリューションと見積を提案。",
  ctaCardTitle: "予約インスタンスの詳細を取得",
  ctaCardBody: "相談予約で仕様・展開案・見積をご確認ください",
  ctaButton: "今すぐ相談",
  highPerfModels: [
    {
      description:
        "エンタープライズエージェント、複雑タスク計画、ソフトウェア自動化、長文分析、コード生成。",
      price: "¥ 772,200 / グループ / 月",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "1000 万",
    },
    {
      description:
        "マルチモーダルエージェント、視覚理解、デザインからコード、複雑タスク自動化。",
      price: "¥ 772,200 / グループ / 月",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "400 万",
    },
    {
      description:
        "長文・ナレッジベース分析、カスタマーサポート、コンテンツ生成、業務自動化。",
      price: "¥ 386,100 / グループ / 月",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "500 万",
    },
    {
      description:
        "複雑推論、コード支援、ツール利用エージェント、分析、自動化ワークフロー。",
      price: "¥ 772,200 / グループ / 月",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "1250 万",
    },
  ],
  standardModels: [
    {
      description:
        "マルチモーダルエージェント、視覚理解、デザインからコード、複雑タスク自動化。",
      price: "¥ 486,000 / グループ / 月",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "530 万",
    },
    {
      description:
        "長文・ナレッジベース分析、カスタマーサポート、コンテンツ生成、業務自動化。",
      price: "¥ 486,000 / グループ / 月",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "900 万",
    },
    {
      description:
        "複雑推論、コード支援、ツール利用エージェント、分析、自動化ワークフロー。",
      price: "¥ 486,000 / グループ / 月",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "1080 万",
    },
  ],
};
