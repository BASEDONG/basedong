import type { HomeStrings } from "../content-types";

export const ja: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong 提供開始",
      title: "GPT-5.6",
      description:
        "GPT-5.6 ファミリー — Sol（フラッグシップ）、Terra（バランス）、Luna（高速）— はコーディング、エージェント、知識労働、科学推論で最先端の性能を提供。プラットフォームですぐ利用可能。",
      ctaLabel: "今すぐ試す",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Anthropic 最新フラッグシップ",
      title: "Opus 5",
      description:
        "Opus 5 はコーディング、エージェント、プロフェッショナルライティングを大幅強化。高複雑度・長期タスク向けに、より正確なアウトプットを提供。",
      ctaLabel: "今すぐ試す",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "期間限定無料",
      title: "Auto モデル",
      description:
        "インテリジェントルーティングが最適なモデルを選択し、速度・コスト・品質のバランスを動的に調整。期間限定無料 — 大規模モデルへゼロハードル。",
      ctaLabel: "今すぐ試す",
      logoAlt: "Auto モデル",
    },
    {
      tabLabel: "デプロイ",
      eyebrow: "エンタープライズ級",
      title: "大規模モデルサービスデプロイ",
      description:
        "プライベートデプロイとクラウドの弾力スケール — モデル適応、推論加速、運用サポートでミッションクリティカルなワークロードを支えます。",
      ctaLabel: "詳しく見る",
      logoAlt: "大規模モデルサービスデプロイ",
    },
  ],
  productMatrix: {
    title: "構想から本番まで支えるフルスタック製品",
    subtitle: "開発者と企業向けの統合アクセス — AI とビジネスをより速く接続",
  },
  productCards: [
    {
      title: "オンプレミスプライベートデプロイ",
      description:
        "コンプライアンスとデータ主権が必要な企業向け — 本番対応のプライベート構成、性能チューニング、クラスタデプロイ、継続運用。",
      ctaLabel: "詳しく見る",
    },
    {
      title: "推論性能最適化サービス",
      description:
        "オープンソース推論エンジン上で、主要オープンモデルとカスタムモデルに対応 — 選定からチューニング、本番運用まで。",
      ctaLabel: "お問い合わせ",
    },
    {
      title: "無料 Auto モデル",
      description:
        "インテリジェントルーティングが速度・コスト・品質をバランス。期間限定無料 — 大規模モデルへゼロハードル。",
      ctaLabel: "今すぐ試す",
    },
    {
      title: "統合大規模モデル API",
      description:
        "テキスト、音声、画像、動画を単一 API で — 従量課金で迅速に統合・イテレーション。",
      ctaLabel: "始める",
    },
  ],
  whySection: {
    title: "basedong を選ぶ理由",
  },
  whyHighlightCards: [
    {
      title: "高コスパ",
      textBlocks: [
        {
          lines: [[{ text: "エンドツーエンド" }, { text: "コスト管理", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "Auto モデル" }, { text: "期間限定無料", emphasis: true }],
            [{ text: "スマートルーティングで速度とコストを動的に最適化" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "推論・デプロイ費用を最大", value: "40%" },
        { prefix: "Auto モデル期間限定無料 — 導入コスト", value: "ゼロ" },
      ],
      footnotes: [
        [{ text: "従量課金で透明な精算、支出が見通しやすい" }],
        [{ text: "異種計算資源を疎結合 — 主要 AI アクセラレータをシームレスにスケジュール" }],
        [
          { text: "コスト敏感なアプリに安定・予測可能な" },
          { text: "コスト性能", emphasis: true },
        ],
      ],
    },
    {
      title: "高安定性",
      textBlocks: [
        {
          lines: [[{ text: "マルチノード" }, { text: "冗長化", emphasis: true }]],
        },
        {
          lines: [
            [{ text: "監視・アラート・自己修復", emphasis: true }],
            [{ text: "長期にわたるサービス安定性を継続保障" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "マルチノード冗長 — フェイルオーバー", value: "秒級" },
        { prefix: "エンタープライズサポート —", value: "SLA", suffix: "要件に対応" },
      ],
      footnotes: [
        [{ text: "高並行・大規模バッチ推論ワークロードに対応" }],
        [{ text: "多数の開発者が実戦検証 — 本番で安定" }],
        [
          { text: "ミッションクリティカル向けに安定・予測可能な" },
          { text: "サービス性能", emphasis: true },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "高拡張性",
      description:
        "トラフィック変動に弾力スケール。カスタムモデルを迅速に本番投入 — 柔軟なアーキテクチャ、ハイブリッド・マルチクラウド対応。",
    },
    {
      title: "高セキュリティ",
      description:
        "BYOC オプション — データは自社ドメイン内。計算・ネットワーク・ストレージの三層分離、業界規格とコンプライアンス対応。",
    },
    {
      title: "高知能",
      description:
        "最先端 LLM と音声・動画などマルチモーダル API をワンストップ。ビジネス成長に合わせてスケール、使用量と費用を可視化。",
    },
    {
      title: "高可用性",
      description:
        "世界中の開発者が本番で検証。監視・アラート・自己修復とエンタープライズサポートで SLA 要件に対応。",
    },
  ],
  industrySection: {
    title: "多業界シナリオに対応した柔軟な導入ソリューション",
  },
  industryItems: [
    {
      title: "AI ハードウェア",
      description:
        "AI モバイル端末、推論一体型、エンボディド AI 向け — エッジ・クラウド連携のレイテンシ低減、応答性向上。",
    },
    {
      title: "行政",
      description:
        "高スループット・低レイテンシ推論でスマート行政、公共安全、産業アップグレードを支援 — ベンダーロックインなしのコスパの良い生成 AI。",
    },
    {
      title: "AI コンピュートセンター",
      description:
        "リソーススケジューリングと配分を最適化し、学習と大規模推論デプロイを加速。",
    },
    {
      title: "教育",
      description:
        "スマートティーチングアシスタント — 複数モデルで個別学習パスを計画、即時 Q&A で教師と学生の体験を向上。",
    },
    {
      title: "インターネット",
      description:
        "プラットフォーム向けコンテンツ生成とパーソナライズ — ホットスワップ、推論加速、GPU 利用率向上、UX と運用効率の最適化。",
    },
  ],
  partners: {
    title: "多数の顧客とエコシステムパートナー",
    ctaPrimaryDesc: "数分でモデル API を有効化",
    ctaPrimaryButton: "トライアル開始",
    ctaSecondaryDesc: "専用プランが必要ですか？お問い合わせ",
    ctaSecondaryButton: "要件を送信",
  },
  heroCarousel: {
    ariaLabel: "ホームページのハイライト",
    switchTabLabel: (tabLabel) => `${tabLabel} に切り替え`,
  },
};
