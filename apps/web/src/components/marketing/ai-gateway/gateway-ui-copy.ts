import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME } from "@/lib/brand-colors";
import { GW_ASSETS } from "./content-base";

export const gatewayHeroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: "#5B6FE8",
  orbSecondary: "#3D4FC7",
  accent: "#5B6FE8",
  logoSrc: `${GW_ASSETS}/hero-gateway.svg`,
};

export type GatewayUiCopy = {
  logoAlt: string;
  heroTitlePrefix: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroTags: string[];
  consultCta: string;
  advantagesTitle: string;
  archSectionTitle: string;
  archIntroLine1: string;
  archIntroLine2: string;
  archAria: string;
  scenariosTitle: string;
  scenariosValueLabel: string;
  testimonialsTitle: string;
  faqTitle: string;
};

const zhCN: GatewayUiCopy = {
  logoAlt: "大模型服务网关",
  heroTitlePrefix: "私有化",
  heroTitleAccent: "大模型服务网关",
  heroSubtitle: "一处接入 · 策略路由 · 多模型协同",
  heroTags: ["集中管控", "策略路由", "流量与配额", "端到端可观测"],
  consultCta: "立即咨询",
  advantagesTitle: "核心能力",
  archSectionTitle: "八色鸫大模型服务网关技术架构",
  archIntroLine1:
    "面向企业提供统一的模型接入与调用治理能力，覆盖多模型接入、策略编排、安全防护与调用观测，",
  archIntroLine2: "助力企业更灵活、高效地使用大模型服务",
  archAria: "八色鸫大模型服务网关技术架构",
  scenariosTitle: "典型场景",
  scenariosValueLabel: "关键收益",
  testimonialsTitle: "客户声音",
  faqTitle: "常见问题",
};

const en: GatewayUiCopy = {
  logoAlt: "LLM service gateway",
  heroTitlePrefix: "Private",
  heroTitleAccent: "LLM service gateway",
  heroSubtitle: "One entry · policy routing · multi-model orchestration",
  heroTags: [
    "Central control",
    "Policy routing",
    "Traffic & quotas",
    "End-to-end observability",
  ],
  consultCta: "Contact us",
  advantagesTitle: "Core capabilities",
  archSectionTitle: "basedong LLM service gateway architecture",
  archIntroLine1:
    "Unified model access and call governance for enterprises — multi-model onboarding, policy orchestration, security, and observability.",
  archIntroLine2: "Use LLM services more flexibly and efficiently.",
  archAria: "basedong LLM service gateway architecture",
  scenariosTitle: "Typical scenarios",
  scenariosValueLabel: "Key benefits",
  testimonialsTitle: "What customers say",
  faqTitle: "FAQ",
};

const zhTW: GatewayUiCopy = {
  logoAlt: "大模型服務閘道",
  heroTitlePrefix: "私有化",
  heroTitleAccent: "大模型服務閘道",
  heroSubtitle: "一處接入 · 策略路由 · 多模型協同",
  heroTags: ["集中管控", "策略路由", "流量與配額", "端到端可觀測"],
  consultCta: "立即諮詢",
  advantagesTitle: "核心能力",
  archSectionTitle: "八色鶇大模型服務閘道技術架構",
  archIntroLine1:
    "面向企業提供統一的模型接入與調用治理能力，覆蓋多模型接入、策略編排、安全防護與調用觀測，",
  archIntroLine2: "助力企業更靈活、高效地使用大模型服務",
  archAria: "八色鶇大模型服務閘道技術架構",
  scenariosTitle: "典型場景",
  scenariosValueLabel: "關鍵收益",
  testimonialsTitle: "客戶聲音",
  faqTitle: "常見問題",
};

const fr: GatewayUiCopy = {
  logoAlt: "Passerelle de services LLM",
  heroTitlePrefix: "Privée",
  heroTitleAccent: "Passerelle de services LLM",
  heroSubtitle:
    "Un point d'entrée · routage par politique · orchestration multi-modèles",
  heroTags: [
    "Contrôle central",
    "Routage par politique",
    "Trafic & quotas",
    "Observabilité de bout en bout",
  ],
  consultCta: "Nous contacter",
  advantagesTitle: "Capacités clés",
  archSectionTitle: "Architecture passerelle LLM basedong",
  archIntroLine1:
    "Accès unifié aux modèles et gouvernance des appels pour les entreprises — onboarding multi-modèles, orchestration, sécurité et observabilité.",
  archIntroLine2: "Utilisez les services LLM plus efficacement.",
  archAria: "Architecture passerelle LLM basedong",
  scenariosTitle: "Scénarios types",
  scenariosValueLabel: "Bénéfices clés",
  testimonialsTitle: "Ce que disent les clients",
  faqTitle: "FAQ",
};

const ru: GatewayUiCopy = {
  logoAlt: "Шлюз LLM-сервисов",
  heroTitlePrefix: "Приватный",
  heroTitleAccent: "шлюз LLM-сервисов",
  heroSubtitle: "Один вход · маршрутизация · оркестрация моделей",
  heroTags: [
    "Централизованный контроль",
    "Маршрутизация",
    "Трафик и квоты",
    "Сквозная наблюдаемость",
  ],
  consultCta: "Связаться с нами",
  advantagesTitle: "Ключевые возможности",
  archSectionTitle: "Архитектура шлюза LLM basedong",
  archIntroLine1:
    "Единый доступ к моделям и управление вызовами для предприятий — подключение моделей, оркестрация политик, безопасность и наблюдаемость.",
  archIntroLine2: "Используйте LLM-сервисы гибче и эффективнее.",
  archAria: "Архитектура шлюза LLM basedong",
  scenariosTitle: "Типичные сценарии",
  scenariosValueLabel: "Ключевые выгоды",
  testimonialsTitle: "Отзывы клиентов",
  faqTitle: "FAQ",
};

const ja: GatewayUiCopy = {
  logoAlt: "大モデルサービスゲートウェイ",
  heroTitlePrefix: "プライベート",
  heroTitleAccent: "大モデルサービスゲートウェイ",
  heroSubtitle: "一箇所で接続 · ポリシールーティング · マルチモデル連携",
  heroTags: [
    "集中管理",
    "ポリシールーティング",
    "トラフィックとクォータ",
    "エンドツーエンド可観測性",
  ],
  consultCta: "お問い合わせ",
  advantagesTitle: "コア機能",
  archSectionTitle: "basedong 大モデルサービスゲートウェイ技術アーキテクチャ",
  archIntroLine1:
    "企業向けに統一されたモデル接続と呼び出しガバナンス。マルチモデル接続、ポリシー編成、セキュリティ、可観測性をカバー。",
  archIntroLine2: "より柔軟かつ効率的に大モデルサービスを活用。",
  archAria: "basedong 大モデルサービスゲートウェイ技術アーキテクチャ",
  scenariosTitle: "典型的なシーン",
  scenariosValueLabel: "主要なメリット",
  testimonialsTitle: "お客様の声",
  faqTitle: "よくある質問",
};

const vi: GatewayUiCopy = {
  logoAlt: "Cổng dịch vụ LLM",
  heroTitlePrefix: "Riêng tư",
  heroTitleAccent: "Cổng dịch vụ LLM",
  heroSubtitle: "Một điểm vào · định tuyến chính sách · điều phối đa mô hình",
  heroTags: [
    "Kiểm soát tập trung",
    "Định tuyến chính sách",
    "Lưu lượng & hạn mức",
    "Quan sát end-to-end",
  ],
  consultCta: "Liên hệ",
  advantagesTitle: "Năng lực cốt lõi",
  archSectionTitle: "Kiến trúc cổng dịch vụ LLM basedong",
  archIntroLine1:
    "Truy cập mô hình thống nhất và quản trị gọi API cho doanh nghiệp — onboarding đa mô hình, điều phối chính sách, bảo mật và quan sát.",
  archIntroLine2: "Sử dụng dịch vụ LLM linh hoạt và hiệu quả hơn.",
  archAria: "Kiến trúc cổng dịch vụ LLM basedong",
  scenariosTitle: "Kịch bản điển hình",
  scenariosValueLabel: "Lợi ích chính",
  testimonialsTitle: "Khách hàng nói gì",
  faqTitle: "Câu hỏi thường gặp",
};

const catalogs: Record<TranslatedLocale, GatewayUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getGatewayUiCopy(locale: string): GatewayUiCopy {
  return pickCatalog(locale, catalogs);
}

export function getGatewayHeroBackground(locale: string): SfGradientPalette {
  return {
    ...gatewayHeroBackgroundBase,
    logoAlt: getGatewayUiCopy(locale).logoAlt,
  };
}
