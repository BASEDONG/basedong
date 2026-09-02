import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME, LOGO_COLORS } from "@/lib/brand-colors";
import { ENT_ASSETS } from "./content";

export const enterpriseHeroBackgroundBase: Omit<
  SfGradientPalette,
  "logoAlt"
> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: LOGO_COLORS.yellow,
  orbSecondary: LOGO_COLORS.orange,
  accent: LOGO_COLORS.orange,
  logoSrc: `${ENT_ASSETS}/hero-maas.svg`,
};

export type EnterpriseUiCopy = {
  logoAlt: string;
  brandName: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroTags: string[];
  consultCta: string;
  advantagesTitle: string;
  introSummary: string;
  introTitle: string;
  archSectionTitle: string;
  archAria: string;
  scenariosTitle: string;
  scenariosSubtitle: string;
  scenariosValueLabel: string;
  testimonialsTitle: string;
  faqTitle: string;
};

const zhCN: EnterpriseUiCopy = {
  logoAlt: "企业级大模型服务平台",
  brandName: "八色鸫",
  heroTitleAccent: "企业级 MaaS 平台",
  heroSubtitle: "全栈 AI 能力，一站交付",
  heroTags: [
    "更优投入产出比",
    "生产级稳定高吞吐",
    "新模型快速接入",
    "多源算力统一治理",
    "多厂商算力兼容",
  ],
  consultCta: "预约方案咨询",
  advantagesTitle: "产品优势",
  introSummary:
    "八色鸫企业级大模型服务平台，面向跨国组织与企业客户构建覆盖异构算力治理、模型训练、推理上线与场景应用的完整能力链路。以更低总体成本、更短交付周期、更优运行性能与更可靠的服务质量，支撑大模型应用从试点到规模化生产，满足研发、测试与运营全阶段需求。",
  introTitle: "平台概览",
  archSectionTitle: "八色鸫企业级平台技术架构",
  archAria: "八色鸫企业级平台技术架构",
  scenariosTitle: "行业与场景",
  scenariosSubtitle: "覆盖能源、智算、交通、制造与运营商等关键行业落地路径",
  scenariosValueLabel: "落地价值",
  testimonialsTitle: "客户证言",
  faqTitle: "常见问题",
};

const en: EnterpriseUiCopy = {
  logoAlt: "Enterprise LLM service platform",
  brandName: "basedong",
  heroTitleAccent: "Enterprise MaaS platform",
  heroSubtitle: "Full-stack AI, delivered in one place",
  heroTags: [
    "Better ROI",
    "Production-grade throughput",
    "Fast new-model onboarding",
    "Unified multi-source compute",
    "Multi-vendor hardware",
  ],
  consultCta: "Book a consult",
  advantagesTitle: "Product advantages",
  introSummary:
    "basedong’s enterprise LLM platform helps global organizations cover heterogeneous compute governance, training, inference, and applications — with lower TCO, faster delivery, stronger performance, and reliable quality from pilot to production.",
  introTitle: "Platform overview",
  archSectionTitle: "basedong enterprise platform architecture",
  archAria: "basedong enterprise platform architecture",
  scenariosTitle: "Industries & scenarios",
  scenariosSubtitle:
    "Paths for energy, AI centers, transport, manufacturing, and carriers",
  scenariosValueLabel: "Business value",
  testimonialsTitle: "Customer stories",
  faqTitle: "FAQ",
};

const zhTW: EnterpriseUiCopy = {
  logoAlt: "企業級大模型服務平台",
  brandName: "八色鶇",
  heroTitleAccent: "企業級 MaaS 平台",
  heroSubtitle: "全棧 AI 能力，一站交付",
  heroTags: [
    "更優投入產出比",
    "生產級穩定高吞吐",
    "新模型快速接入",
    "多源算力統一治理",
    "多廠商算力相容",
  ],
  consultCta: "預約方案諮詢",
  advantagesTitle: "產品優勢",
  introSummary:
    "八色鶇企業級大模型服務平台，面向跨國組織與企業客戶構建涵蓋異構算力治理、模型訓練、推理上線與場景應用的完整能力鏈路。以更低總體成本、更短交付週期、更優運行性能與更可靠的服務品質，支撐大模型應用從試點到規模化生產。",
  introTitle: "平台概覽",
  archSectionTitle: "八色鶇企業級平台技術架構",
  archAria: "八色鶇企業級平台技術架構",
  scenariosTitle: "行業與場景",
  scenariosSubtitle: "覆蓋能源、智算、交通、製造與電信等關鍵行業落地路徑",
  scenariosValueLabel: "落地價值",
  testimonialsTitle: "客戶證言",
  faqTitle: "常見問題",
};

const fr: EnterpriseUiCopy = {
  logoAlt: "Plateforme LLM entreprise",
  brandName: "basedong",
  heroTitleAccent: "Plateforme MaaS entreprise",
  heroSubtitle: "IA full-stack, livrée en un seul endroit",
  heroTags: [
    "Meilleur ROI",
    "Débit de production",
    "Nouveaux modèles rapides",
    "Gouvernance multi-sources",
    "Matériel multi-fournisseurs",
  ],
  consultCta: "Réserver une consultation",
  advantagesTitle: "Avantages",
  introSummary:
    "La plateforme LLM entreprise basedong aide les organisations mondiales à couvrir gouvernance de calcul hétérogène, entraînement, inférence et applications — avec un TCO plus bas, une livraison plus rapide et des performances fiables du pilote à la production.",
  introTitle: "Vue d'ensemble",
  archSectionTitle: "Architecture plateforme entreprise basedong",
  archAria: "Architecture plateforme entreprise basedong",
  scenariosTitle: "Secteurs & cas d'usage",
  scenariosSubtitle:
    "Parcours pour l'énergie, les centres IA, le transport, l'industrie et les opérateurs",
  scenariosValueLabel: "Valeur métier",
  testimonialsTitle: "Témoignages",
  faqTitle: "FAQ",
};

const ru: EnterpriseUiCopy = {
  logoAlt: "Корпоративная LLM-платформа",
  brandName: "basedong",
  heroTitleAccent: "Корпоративная MaaS-платформа",
  heroSubtitle: "Полный стек ИИ — в одном решении",
  heroTags: [
    "Лучший ROI",
    "Промышленная пропускная способность",
    "Быстрый онбординг моделей",
    "Единое управление ресурсами",
    "Мультивендорное железо",
  ],
  consultCta: "Заказать консультацию",
  advantagesTitle: "Преимущества",
  introSummary:
    "Корпоративная LLM-платформа basedong помогает глобальным организациям закрыть управление гетерогенными ресурсами, обучение, инференс и приложения — с меньшим TCO, быстрой поставкой и надёжным качеством от пилота до продакшена.",
  introTitle: "Обзор платформы",
  archSectionTitle: "Архитектура корпоративной платформы basedong",
  archAria: "Архитектура корпоративной платформы basedong",
  scenariosTitle: "Отрасли и сценарии",
  scenariosSubtitle:
    "Пути для энергетики, ИИ-центров, транспорта, производства и операторов",
  scenariosValueLabel: "Бизнес-ценность",
  testimonialsTitle: "Отзывы клиентов",
  faqTitle: "FAQ",
};

const ja: EnterpriseUiCopy = {
  logoAlt: "エンタープライズ大モデルサービス基盤",
  brandName: "basedong",
  heroTitleAccent: "エンタープライズ MaaS プラットフォーム",
  heroSubtitle: "フルスタック AI を一括提供",
  heroTags: [
    "より良い ROI",
    "本番級の高スループット",
    "新モデルの迅速導入",
    "多ソース計算の統一管理",
    "マルチベンダー対応",
  ],
  consultCta: "方案相談を予約",
  advantagesTitle: "製品の強み",
  introSummary:
    "basedong のエンタープライズ LLM プラットフォームは、異種計算のガバナンスから学習・推論・応用までを一気通貫で支え、低い TCO・短い納期・高い性能でパイロットから本番まで支援します。",
  introTitle: "プラットフォーム概要",
  archSectionTitle: "basedong エンタープライズ基盤アーキテクチャ",
  archAria: "basedong エンタープライズ基盤アーキテクチャ",
  scenariosTitle: "業界とシーン",
  scenariosSubtitle: "エネルギー、智算、交通、製造、通信向けの導入パス",
  scenariosValueLabel: "導入価値",
  testimonialsTitle: "お客様の声",
  faqTitle: "よくある質問",
};

const vi: EnterpriseUiCopy = {
  logoAlt: "Nền tảng LLM doanh nghiệp",
  brandName: "basedong",
  heroTitleAccent: "Nền tảng MaaS doanh nghiệp",
  heroSubtitle: "AI full-stack, giao trong một chỗ",
  heroTags: [
    "ROI tốt hơn",
    "Throughput cấp production",
    "Onboard mô hình nhanh",
    "Quản trị tính toán đa nguồn",
    "Phần cứng đa vendor",
  ],
  consultCta: "Đặt tư vấn",
  advantagesTitle: "Ưu điểm sản phẩm",
  introSummary:
    "Nền tảng LLM doanh nghiệp basedong giúp tổ chức toàn cầu bao phủ quản trị tính toán dị thể, huấn luyện, suy luận và ứng dụng — với TCO thấp hơn, giao nhanh hơn và chất lượng ổn định từ pilot đến production.",
  introTitle: "Tổng quan nền tảng",
  archSectionTitle: "Kiến trúc nền tảng doanh nghiệp basedong",
  archAria: "Kiến trúc nền tảng doanh nghiệp basedong",
  scenariosTitle: "Ngành & kịch bản",
  scenariosSubtitle:
    "Lộ trình cho năng lượng, trung tâm AI, giao thông, sản xuất và nhà mạng",
  scenariosValueLabel: "Giá trị triển khai",
  testimonialsTitle: "Khách hàng nói gì",
  faqTitle: "Câu hỏi thường gặp",
};

const catalogs: Record<TranslatedLocale, EnterpriseUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
};

export function getEnterpriseUiCopy(locale: string): EnterpriseUiCopy {
  return pickCatalog(locale, catalogs);
}

export function getEnterpriseHeroBackground(
  locale: string,
): SfGradientPalette {
  return {
    ...enterpriseHeroBackgroundBase,
    logoAlt: getEnterpriseUiCopy(locale).logoAlt,
  };
}
