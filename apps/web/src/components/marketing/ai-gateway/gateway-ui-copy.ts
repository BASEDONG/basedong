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

const ko: GatewayUiCopy = {
  logoAlt: "LLM 서비스 게이트웨이",
  heroTitlePrefix: "프라이빗",
  heroTitleAccent: "LLM 서비스 게이트웨이",
  heroSubtitle: "단일 진입 · 정책 라우팅 · 멀티 모델 오케스트레이션",
  heroTags: [
    "중앙 제어",
    "정책 라우팅",
    "트래픽 및 할당량",
    "엔드투엔드 관측성",
  ],
  consultCta: "문의하기",
  advantagesTitle: "핵심 역량",
  archSectionTitle: "basedong LLM 서비스 게이트웨이 아키텍처",
  archIntroLine1:
    "기업을 위한 통합 모델 접속 및 호출 거버넌스 — 멀티 모델 온보딩, 정책 오케스트레이션, 보안, 관측성.",
  archIntroLine2: "LLM 서비스를 더 유연하고 효율적으로 활용하세요.",
  archAria: "basedong LLM 서비스 게이트웨이 아키텍처",
  scenariosTitle: "대표 시나리오",
  scenariosValueLabel: "핵심 이점",
  testimonialsTitle: "고객의 목소리",
  faqTitle: "FAQ",
};

const de: GatewayUiCopy = {
  logoAlt: "LLM-Service-Gateway",
  heroTitlePrefix: "Privates",
  heroTitleAccent: "LLM-Service-Gateway",
  heroSubtitle: "Ein Einstieg · Policy-Routing · Multi-Modell-Orchestrierung",
  heroTags: [
    "Zentrale Steuerung",
    "Policy-Routing",
    "Traffic & Kontingente",
    "End-to-End-Observability",
  ],
  consultCta: "Kontakt",
  advantagesTitle: "Kernfunktionen",
  archSectionTitle: "basedong LLM-Service-Gateway-Architektur",
  archIntroLine1:
    "Einheitlicher Modellzugang und Aufruf-Governance für Unternehmen — Multi-Modell-Onboarding, Policy-Orchestrierung, Sicherheit und Observability.",
  archIntroLine2: "LLM-Services flexibler und effizienter nutzen.",
  archAria: "basedong LLM-Service-Gateway-Architektur",
  scenariosTitle: "Typische Szenarien",
  scenariosValueLabel: "Zentrale Vorteile",
  testimonialsTitle: "Kundenstimmen",
  faqTitle: "FAQ",
};

const es: GatewayUiCopy = {
  logoAlt: "Gateway de servicios LLM",
  heroTitlePrefix: "Privado",
  heroTitleAccent: "Gateway de servicios LLM",
  heroSubtitle:
    "Un punto de entrada · enrutamiento por políticas · orquestación multi-modelo",
  heroTags: [
    "Control central",
    "Enrutamiento por políticas",
    "Tráfico y cuotas",
    "Observabilidad de extremo a extremo",
  ],
  consultCta: "Contáctanos",
  advantagesTitle: "Capacidades clave",
  archSectionTitle: "Arquitectura del gateway de servicios LLM basedong",
  archIntroLine1:
    "Acceso unificado a modelos y gobernanza de llamadas para empresas — incorporación multi-modelo, orquestación de políticas, seguridad y observabilidad.",
  archIntroLine2: "Use servicios LLM de forma más flexible y eficiente.",
  archAria: "Arquitectura del gateway de servicios LLM basedong",
  scenariosTitle: "Escenarios típicos",
  scenariosValueLabel: "Beneficios clave",
  testimonialsTitle: "Lo que dicen los clientes",
  faqTitle: "FAQ",
};

const ptBR: GatewayUiCopy = {
  logoAlt: "Gateway de serviços LLM",
  heroTitlePrefix: "Privado",
  heroTitleAccent: "Gateway de serviços LLM",
  heroSubtitle:
    "Um ponto de entrada · roteamento por política · orquestração multi-modelo",
  heroTags: [
    "Controle central",
    "Roteamento por política",
    "Tráfego e cotas",
    "Observabilidade ponta a ponta",
  ],
  consultCta: "Fale conosco",
  advantagesTitle: "Capacidades principais",
  archSectionTitle: "Arquitetura do gateway de serviços LLM basedong",
  archIntroLine1:
    "Acesso unificado a modelos e governança de chamadas para empresas — onboarding multi-modelo, orquestração de políticas, segurança e observabilidade.",
  archIntroLine2: "Use serviços LLM com mais flexibilidade e eficiência.",
  archAria: "Arquitetura do gateway de serviços LLM basedong",
  scenariosTitle: "Cenários típicos",
  scenariosValueLabel: "Benefícios principais",
  testimonialsTitle: "O que os clientes dizem",
  faqTitle: "FAQ",
};

const ar: GatewayUiCopy = {
  logoAlt: "بوابة خدمات LLM",
  heroTitlePrefix: "خاصة",
  heroTitleAccent: "بوابة خدمات LLM",
  heroSubtitle: "نقطة دخول واحدة · توجيه بالسياسات · تنسيق متعدد النماذج",
  heroTags: [
    "تحكم مركزي",
    "توجيه بالسياسات",
    "حركة المرور والحصص",
    "قابلية الملاحظة من طرف إلى طرف",
  ],
  consultCta: "اتصل بنا",
  advantagesTitle: "القدرات الأساسية",
  archSectionTitle: "بنية بوابة خدمات LLM basedong",
  archIntroLine1:
    "وصول موحد للنماذج وحوكمة الاستدعاءات للمؤسسات — إدماج متعدد النماذج، تنسيق السياسات، الأمان، وقابلية الملاحظة.",
  archIntroLine2: "استخدم خدمات LLM بمرونة وكفاءة أكبر.",
  archAria: "بنية بوابة خدمات LLM basedong",
  scenariosTitle: "سيناريوهات نموذجية",
  scenariosValueLabel: "الفوائد الرئيسية",
  testimonialsTitle: "ما يقوله العملاء",
  faqTitle: "الأسئلة الشائعة",
};

const hi: GatewayUiCopy = {
  logoAlt: "LLM सेवा गेटवे",
  heroTitlePrefix: "प्राइवेट",
  heroTitleAccent: "LLM सेवा गेटवे",
  heroSubtitle: "एक प्रवेश · नीति रूटिंग · मल्टी-मॉडल ऑर्केस्ट्रेशन",
  heroTags: [
    "केंद्रीय नियंत्रण",
    "नीति रूटिंग",
    "ट्रैफ़िक और कोटा",
    "एंड-टू-एंड observability",
  ],
  consultCta: "संपर्क करें",
  advantagesTitle: "मुख्य क्षमताएँ",
  archSectionTitle: "basedong LLM सेवा गेटवे आर्किटेक्चर",
  archIntroLine1:
    "उद्यमों के लिए एकीकृत मॉडल एक्सेस और कॉल गवर्नेंस — मल्टी-मॉडल ऑनबोर्डिंग, नीति ऑर्केस्ट्रेशन, सुरक्षा और observability।",
  archIntroLine2: "LLM सेवाओं का अधिक लचीले और कुशलता से उपयोग करें।",
  archAria: "basedong LLM सेवा गेटवे आर्किटेक्चर",
  scenariosTitle: "विशिष्ट परिदृश्य",
  scenariosValueLabel: "मुख्य लाभ",
  testimonialsTitle: "ग्राहक क्या कहते हैं",
  faqTitle: "FAQ",
};

const id: GatewayUiCopy = {
  logoAlt: "Gateway layanan LLM",
  heroTitlePrefix: "Privat",
  heroTitleAccent: "Gateway layanan LLM",
  heroSubtitle:
    "Satu titik masuk · routing kebijakan · orkestrasi multi-model",
  heroTags: [
    "Kontrol terpusat",
    "Routing kebijakan",
    "Lalu lintas & kuota",
    "Observabilitas end-to-end",
  ],
  consultCta: "Hubungi kami",
  advantagesTitle: "Kemampuan inti",
  archSectionTitle: "Arsitektur gateway layanan LLM basedong",
  archIntroLine1:
    "Akses model terpadu dan tata kelola panggilan untuk perusahaan — onboarding multi-model, orkestrasi kebijakan, keamanan, dan observabilitas.",
  archIntroLine2: "Gunakan layanan LLM dengan lebih fleksibel dan efisien.",
  archAria: "Arsitektur gateway layanan LLM basedong",
  scenariosTitle: "Skenario khas",
  scenariosValueLabel: "Manfaat utama",
  testimonialsTitle: "Apa kata pelanggan",
  faqTitle: "FAQ",
};

const catalogs: Record<TranslatedLocale, GatewayUiCopy> = {
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

export function getGatewayUiCopy(locale: string): GatewayUiCopy {
  return pickCatalog(locale, catalogs);
}

export function getGatewayHeroBackground(locale: string): SfGradientPalette {
  return {
    ...gatewayHeroBackgroundBase,
    logoAlt: getGatewayUiCopy(locale).logoAlt,
  };
}
