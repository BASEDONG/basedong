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

const ko: EnterpriseUiCopy = {
  logoAlt: "엔터프라이즈 LLM 서비스 플랫폼",
  brandName: "basedong",
  heroTitleAccent: "엔터프라이즈 MaaS 플랫폼",
  heroSubtitle: "풀스택 AI, 한곳에서 제공",
  heroTags: [
    "더 나은 ROI",
    "프로덕션급 고처리량",
    "신규 모델 빠른 온보딩",
    "다중 소스 연산 통합 거버넌스",
    "멀티 벤더 하드웨어",
  ],
  consultCta: "상담 예약",
  advantagesTitle: "제품 장점",
  introSummary:
    "basedong 엔터프라이즈 LLM 플랫폼은 글로벌 조직이 이기종 연산 거버넌스, 학습, 추론, 애플리케이션을 아우르도록 지원합니다. 더 낮은 TCO, 더 빠른 납기, 더 높은 성능과 안정적인 품질로 파일럿에서 프로덕션까지 지원합니다.",
  introTitle: "플랫폼 개요",
  archSectionTitle: "basedong 엔터프라이즈 플랫폼 아키텍처",
  archAria: "basedong 엔터프라이즈 플랫폼 아키텍처",
  scenariosTitle: "산업 및 시나리오",
  scenariosSubtitle: "에너지, AI 센터, 교통, 제조, 통신사 등 핵심 산업 경로",
  scenariosValueLabel: "비즈니스 가치",
  testimonialsTitle: "고객 사례",
  faqTitle: "FAQ",
};

const de: EnterpriseUiCopy = {
  logoAlt: "Enterprise-LLM-Serviceplattform",
  brandName: "basedong",
  heroTitleAccent: "Enterprise-MaaS-Plattform",
  heroSubtitle: "Full-Stack-KI — alles aus einer Hand",
  heroTags: [
    "Besserer ROI",
    "Produktions-Durchsatz",
    "Schnelles Modell-Onboarding",
    "Einheitliche Multi-Source-Compute-Governance",
    "Multi-Vendor-Hardware",
  ],
  consultCta: "Beratung buchen",
  advantagesTitle: "Produktvorteile",
  introSummary:
    "Die Enterprise-LLM-Plattform von basedong unterstützt globale Organisationen bei heterogener Compute-Governance, Training, Inferenz und Anwendungen — mit niedrigerem TCO, schnellerer Lieferung und zuverlässiger Qualität vom Pilot bis zur Produktion.",
  introTitle: "Plattformübersicht",
  archSectionTitle: "basedong Enterprise-Plattformarchitektur",
  archAria: "basedong Enterprise-Plattformarchitektur",
  scenariosTitle: "Branchen & Szenarien",
  scenariosSubtitle:
    "Wege für Energie, KI-Zentren, Transport, Fertigung und Carrier",
  scenariosValueLabel: "Geschäftswert",
  testimonialsTitle: "Kundenstimmen",
  faqTitle: "FAQ",
};

const es: EnterpriseUiCopy = {
  logoAlt: "Plataforma de servicios LLM empresarial",
  brandName: "basedong",
  heroTitleAccent: "Plataforma MaaS empresarial",
  heroSubtitle: "IA full-stack, entregada en un solo lugar",
  heroTags: [
    "Mejor ROI",
    "Rendimiento de producción",
    "Incorporación rápida de modelos",
    "Gobernanza unificada de cómputo",
    "Hardware multivendor",
  ],
  consultCta: "Reservar consulta",
  advantagesTitle: "Ventajas del producto",
  introSummary:
    "La plataforma LLM empresarial de basedong ayuda a organizaciones globales a cubrir gobernanza de cómputo heterogéneo, entrenamiento, inferencia y aplicaciones — con menor TCO, entrega más rápida y calidad confiable del piloto a producción.",
  introTitle: "Resumen de la plataforma",
  archSectionTitle: "Arquitectura de plataforma empresarial basedong",
  archAria: "Arquitectura de plataforma empresarial basedong",
  scenariosTitle: "Industrias y escenarios",
  scenariosSubtitle:
    "Rutas para energía, centros de IA, transporte, manufactura y operadores",
  scenariosValueLabel: "Valor de negocio",
  testimonialsTitle: "Historias de clientes",
  faqTitle: "FAQ",
};

const ptBR: EnterpriseUiCopy = {
  logoAlt: "Plataforma de serviços LLM empresarial",
  brandName: "basedong",
  heroTitleAccent: "Plataforma MaaS empresarial",
  heroSubtitle: "IA full-stack, entregue em um só lugar",
  heroTags: [
    "Melhor ROI",
    "Throughput de produção",
    "Onboarding rápido de modelos",
    "Governança unificada de computação",
    "Hardware multivendor",
  ],
  consultCta: "Agendar consulta",
  advantagesTitle: "Vantagens do produto",
  introSummary:
    "A plataforma LLM empresarial basedong ajuda organizações globais a cobrir governança de computação heterogênea, treinamento, inferência e aplicações — com TCO menor, entrega mais rápida e qualidade confiável do piloto à produção.",
  introTitle: "Visão geral da plataforma",
  archSectionTitle: "Arquitetura da plataforma empresarial basedong",
  archAria: "Arquitetura da plataforma empresarial basedong",
  scenariosTitle: "Indústrias e cenários",
  scenariosSubtitle:
    "Caminhos para energia, centros de IA, transporte, manufatura e operadoras",
  scenariosValueLabel: "Valor de negócio",
  testimonialsTitle: "Histórias de clientes",
  faqTitle: "FAQ",
};

const ar: EnterpriseUiCopy = {
  logoAlt: "منصة خدمات LLM للمؤسسات",
  brandName: "basedong",
  heroTitleAccent: "منصة MaaS للمؤسسات",
  heroSubtitle: "ذكاء اصطناعي متكامل، يُسلّم من مكان واحد",
  heroTags: [
    "عائد استثمار أفضل",
    "إنتاجية على مستوى الإنتاج",
    "إدماج سريع للنماذج الجديدة",
    "حوكمة موحدة للحوسبة متعددة المصادر",
    "أجهزة متعددة الموردين",
  ],
  consultCta: "حجز استشارة",
  advantagesTitle: "مزايا المنتج",
  introSummary:
    "تساعد منصة LLM للمؤسسات basedong المنظمات العالمية على تغطية حوكمة الحوسبة غير المتجانسة والتدريب والاستدلال والتطبيقات — بتكلفة إجمالية أقل وتسليم أسرع وجودة موثوقة من التجريب إلى الإنتاج.",
  introTitle: "نظرة عامة على المنصة",
  archSectionTitle: "بنية منصة basedong للمؤسسات",
  archAria: "بنية منصة basedong للمؤسسات",
  scenariosTitle: "القطاعات والسيناريوهات",
  scenariosSubtitle:
    "مسارات للطاقة ومراكز الذكاء الاصطناعي والنقل والتصنيع والمشغلين",
  scenariosValueLabel: "القيمة التجارية",
  testimonialsTitle: "قصص العملاء",
  faqTitle: "الأسئلة الشائعة",
};

const hi: EnterpriseUiCopy = {
  logoAlt: "एंटरप्राइज LLM सेवा प्लेटफ़ॉर्म",
  brandName: "basedong",
  heroTitleAccent: "एंटरप्राइज MaaS प्लेटफ़ॉर्म",
  heroSubtitle: "फुल-स्टैक AI, एक ही स्थान पर",
  heroTags: [
    "बेहतर ROI",
    "प्रोडक्शन-ग्रेड थ्रूपुट",
    "नए मॉडल की तेज़ ऑनबोर्डिंग",
    "एकीकृत मल्टी-सोर्स कंप्यूट गवर्नेंस",
    "मल्टी-वेंडर हार्डवेयर",
  ],
  consultCta: "परामर्श बुक करें",
  advantagesTitle: "उत्पाद लाभ",
  introSummary:
    "basedong का एंटरप्राइज LLM प्लेटफ़ॉर्म वैश्विक संगठनों को हेटेरोजीनस कंप्यूट गवर्नेंस, प्रशिक्षण, इन्फ़रेंस और एप्लिकेशन कवर करने में मदद करता है — कम TCO, तेज़ डिलीवरी और पायलट से प्रोडक्शन तक विश्वसनीय गुणवत्ता।",
  introTitle: "प्लेटफ़ॉर्म अवलोकन",
  archSectionTitle: "basedong एंटरप्राइज प्लेटफ़ॉर्म आर्किटेक्चर",
  archAria: "basedong एंटरप्राइज प्लेटफ़ॉर्म आर्किटेक्चर",
  scenariosTitle: "उद्योग और परिदृश्य",
  scenariosSubtitle:
    "ऊर्जा, AI केंद्र, परिवहन, विनिर्माण और ऑपरेटर के लिए मार्ग",
  scenariosValueLabel: "व्यावसायिक मूल्य",
  testimonialsTitle: "ग्राहक कहानियाँ",
  faqTitle: "FAQ",
};

const id: EnterpriseUiCopy = {
  logoAlt: "Platform layanan LLM enterprise",
  brandName: "basedong",
  heroTitleAccent: "Platform MaaS enterprise",
  heroSubtitle: "AI full-stack, diserahkan di satu tempat",
  heroTags: [
    "ROI lebih baik",
    "Throughput tingkat produksi",
    "Onboarding model baru cepat",
    "Tata kelola komputasi multi-sumber terpadu",
    "Perangkat keras multi-vendor",
  ],
  consultCta: "Jadwalkan konsultasi",
  advantagesTitle: "Keunggulan produk",
  introSummary:
    "Platform LLM enterprise basedong membantu organisasi global mencakup tata kelola komputasi heterogen, pelatihan, inferensi, dan aplikasi — dengan TCO lebih rendah, pengiriman lebih cepat, dan kualitas andal dari pilot ke produksi.",
  introTitle: "Ikhtisar platform",
  archSectionTitle: "Arsitektur platform enterprise basedong",
  archAria: "Arsitektur platform enterprise basedong",
  scenariosTitle: "Industri & skenario",
  scenariosSubtitle:
    "Jalur untuk energi, pusat AI, transportasi, manufaktur, dan operator",
  scenariosValueLabel: "Nilai bisnis",
  testimonialsTitle: "Kisah pelanggan",
  faqTitle: "FAQ",
};

const catalogs: Record<TranslatedLocale, EnterpriseUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
  ko,
  de,
  es,
  "pt-BR": ptBR,
  ar,
  hi,
  id,
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
