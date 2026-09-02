import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import { getPricingUiCopy } from "@/components/marketing/pricing/pricing-ui-copy";
import { getReservedContent } from "@/components/marketing/reserved/content";
import { getUserAgreementContent } from "@/components/marketing/legals/user-agreement/content";
import { metadataBrandSuffix } from "@/lib/marketing-page-locale";

type PageMeta = { title: string; description: string };

type PageMetaCatalog = Partial<Record<TranslatedLocale, PageMeta>> & {
  "zh-CN": PageMeta;
};

const HOME: PageMetaCatalog = {
  "zh-CN": {
    title: "八色鸫 - 一个 API，调用 100+ 主流模型",
    description:
      "八色鸫专注于提供高效能、低成本的多品类 AI 模型服务，助力开发者和企业聚焦产品创新。",
  },
  en: {
    title: "basedong — One API for 100+ leading models",
    description:
      "High-performance, cost-efficient AI model services so developers and teams can focus on building products.",
  },
  "zh-TW": {
    title: "八色鸫 - 一個 API，調用 100+ 主流模型",
    description:
      "八色鸫專注於提供高效能、低成本的多品類 AI 模型服務，助力開發者和企業聚焦產品創新。",
  },
  fr: {
    title: "basedong — Une API pour 100+ modèles leaders",
    description:
      "Des services de modèles IA performants et économiques pour que les équipes se concentrent sur le produit.",
  },
  ru: {
    title: "basedong — один API для 100+ ведущих моделей",
    description:
      "Высокопроизводительные и доступные AI-модели, чтобы команды фокусировались на продукте.",
  },
  ja: {
    title: "basedong — 100+ 主流モデルを 1 つの API で",
    description:
      "高性能・低コストの AI モデルサービスで、開発とプロダクトに集中できます。",
  },
  vi: {
    title: "basedong — Một API cho 100+ model hàng đầu",
    description:
      "Dịch vụ model AI hiệu năng cao, chi phí hợp lý để đội ngũ tập trung vào sản phẩm.",
  },
};

const ABOUT: PageMetaCatalog = {
  "zh-CN": {
    title: "公司介绍 - 八色鸫",
    description:
      "八色鸫致力于提供高效能、低成本的多品类 AI 模型服务，做所有人的 AI。",
  },
  en: {
    title: "About us | basedong",
    description:
      "Efficient, affordable multi-category AI model services — AI for everyone.",
  },
  "zh-TW": {
    title: "公司介紹 - 八色鸫",
    description:
      "八色鸫致力於提供高效能、低成本的多品類 AI 模型服務，做所有人的 AI。",
  },
  fr: {
    title: "À propos | basedong",
    description:
      "Des services de modèles IA performants et accessibles — l'IA pour tous.",
  },
  ru: {
    title: "О компании | basedong",
    description:
      "Эффективные и доступные AI-модели — искусственный интеллект для всех.",
  },
  ja: {
    title: "会社概要 | basedong",
    description:
      "高性能・低コストの多品类 AI モデルサービス — すべての人のための AI。",
  },
  vi: {
    title: "Giới thiệu | basedong",
    description:
      "Dịch vụ model AI hiệu năng cao, chi phí hợp lý — AI cho mọi người.",
  },
};

const BRAND: PageMetaCatalog = {
  "zh-CN": {
    title: "品牌解读 - 八色鸫",
    description:
      "八色鸫品牌：使命愿景、价值观、品牌关系与使用规范，做所有人的 AI。",
  },
  en: {
    title: "Brand | basedong",
    description:
      "Mission, values, brand relationships, and usage guidelines — AI for everyone.",
  },
  "zh-TW": {
    title: "品牌解讀 - 八色鸫",
    description:
      "八色鸫品牌：使命願景、價值觀、品牌關係與使用規範，做所有人的 AI。",
  },
  fr: {
    title: "Marque | basedong",
    description:
      "Mission, valeurs, relations de marque et règles d'usage — l'IA pour tous.",
  },
  ru: {
    title: "Бренд | basedong",
    description:
      "Миссия, ценности, отношения бренда и правила использования — AI для всех.",
  },
  ja: {
    title: "ブランド | basedong",
    description:
      "ミッション、価値観、ブランド関係、利用規範 — すべての人のための AI。",
  },
  vi: {
    title: "Thương hiệu | basedong",
    description:
      "Sứ mệnh, giá trị, quan hệ thương hiệu và hướng dẫn sử dụng — AI cho mọi người.",
  },
};

const DEVELOPER_TALK: PageMetaCatalog = {
  "zh-CN": {
    title: "技术实践与用户故事 - 八色鸫",
    description: "来自开发者的真实实践与洞察",
  },
  en: {
    title: "Developer Talk | basedong",
    description: "Real-world practices and insights from developers",
  },
  "zh-TW": {
    title: "技術實踐與用戶故事 - 八色鸫",
    description: "來自開發者的真實實踐與洞察",
  },
  fr: {
    title: "Developer Talk | basedong",
    description: "Pratiques et retours d'expérience de développeurs",
  },
  ru: {
    title: "Developer Talk | basedong",
    description: "Практика и инсайты от разработчиков",
  },
  ja: {
    title: "開発者の声 | basedong",
    description: "開発者によるリアルな実践とインサイト",
  },
  vi: {
    title: "Developer Talk | basedong",
    description: "Thực hành và góc nhìn thật từ developer",
  },
};

const NEWS: PageMetaCatalog = {
  "zh-CN": {
    title: "最新资讯、产品与活动 - 八色鸫",
    description:
      "了解八色鸫最新企业动态、模型上新、生态合作、客户案例与市场活动。",
  },
  en: {
    title: "News, products & events | basedong",
    description:
      "Company updates, new models, partnerships, customer stories, and events.",
  },
  "zh-TW": {
    title: "最新資訊、產品與活動 - 八色鸫",
    description:
      "了解八色鸫最新企業動態、模型上新、生態合作、客戶案例與市場活動。",
  },
  fr: {
    title: "Actualités, produits et événements | basedong",
    description:
      "Actualités, nouveaux modèles, partenariats, cas clients et événements.",
  },
  ru: {
    title: "Новости, продукты и события | basedong",
    description:
      "Новости компании, новые модели, партнёрства, кейсы и мероприятия.",
  },
  ja: {
    title: "最新情報・製品・イベント | basedong",
    description:
      "企業ニュース、新モデル、パートナーシップ、導入事例、イベント情報。",
  },
  vi: {
    title: "Tin tức, sản phẩm & sự kiện | basedong",
    description:
      "Tin công ty, model mới, đối tác, case study và sự kiện.",
  },
};

const PARTNER: PageMetaCatalog = {
  "zh-CN": {
    title: "合作伙伴生态 - 八色鸫",
    description:
      "依托开放稳定高效的大模型 API 能力，链接模型厂商与创新应用，与全球伙伴共建开放、共赢的 AI 生态价值共同体。",
  },
  en: {
    title: "Partner ecosystem | basedong",
    description:
      "Open, stable LLM APIs linking model vendors and apps — building a global AI ecosystem together.",
  },
  "zh-TW": {
    title: "合作夥伴生態 - 八色鸫",
    description:
      "依托開放穩定高效的大模型 API 能力，連結模型廠商與創新應用，與全球夥伴共建開放、共贏的 AI 生態價值共同體。",
  },
  fr: {
    title: "Écosystème partenaires | basedong",
    description:
      "API LLM ouvertes et fiables — relier éditeurs de modèles et applications dans un écosystème mondial.",
  },
  ru: {
    title: "Партнёрская экосистема | basedong",
    description:
      "Открытые LLM API — связываем вендоров моделей и приложения в глобальной экосистеме.",
  },
  ja: {
    title: "パートナーエコシステム | basedong",
    description:
      "安定した LLM API でモデルベンダーとアプリをつなぎ、共創する AI エコシステム。",
  },
  vi: {
    title: "Hệ sinh thái đối tác | basedong",
    description:
      "API LLM ổn định — kết nối vendor model và ứng dụng trong hệ sinh thái AI toàn cầu.",
  },
};

const MODELS: PageMetaCatalog = {
  "zh-CN": {
    title: "模型｜八色鸫",
    description:
      "想用的 AI 模型，全都在这。统一接口，三行接入；目录来自 basedong Backend。",
  },
  en: {
    title: "Models | basedong",
    description:
      "The AI models you need, in one place. Unified API, three lines to integrate — catalog from basedong Backend.",
  },
  "zh-TW": {
    title: "模型｜八色鸫",
    description:
      "想用的 AI 模型，全都在這。統一介面，三行接入；目錄來自 basedong Backend。",
  },
  fr: {
    title: "Modèles | basedong",
    description:
      "Les modèles IA dont vous avez besoin. API unifiée, intégration en trois lignes — catalogue Backend basedong.",
  },
  ru: {
    title: "Модели | basedong",
    description:
      "Нужные AI-модели в одном месте. Единый API, три строки интеграции — каталог Backend basedong.",
  },
  ja: {
    title: "モデル | basedong",
    description:
      "必要な AI モデルを一覧。統一 API、3 行で接続 — Backend カタログから取得。",
  },
  vi: {
    title: "Mô hình | basedong",
    description:
      "Model AI bạn cần, tập trung một chỗ. API thống nhất, 3 dòng tích hợp — từ Backend basedong.",
  },
};

const AI_GATEWAY: PageMetaCatalog = {
  "zh-CN": {
    title: "八色鸫大模型服务网关｜多模型统一接入与智能调度",
    description:
      "八色鸫大模型服务网关，一站打通多供应商模型接入、统一 API 管理、智能路由与成本管控，降低大模型服务接入与运维复杂度。",
  },
  en: {
    title: "LLM service gateway | basedong",
    description:
      "Unified multi-vendor model access, API governance, smart routing, and cost control — simpler LLM ops.",
  },
  "zh-TW": {
    title: "八色鸫大模型服務網關｜多模型統一接入與智能調度",
    description:
      "八色鸫大模型服務網關，一站打通多供應商模型接入、統一 API 管理、智能路由與成本管控，降低大模型服務接入與運維複雜度。",
  },
  fr: {
    title: "Passerelle de services LLM | basedong",
    description:
      "Accès multi-fournisseurs, gouvernance API, routage intelligent et maîtrise des coûts.",
  },
  ru: {
    title: "Шлюз LLM-сервисов | basedong",
    description:
      "Единый доступ к моделям, управление API, умный роутинг и контроль затрат.",
  },
  ja: {
    title: "LLM サービスゲートウェイ | basedong",
    description:
      "マルチベンダー接続、API 統合管理、スマートルーティング、コスト管理を一元化。",
  },
  vi: {
    title: "Gateway dịch vụ LLM | basedong",
    description:
      "Truy cập đa vendor, quản trị API, định tuyến thông minh và kiểm soát chi phí.",
  },
};

const TOKEN_FACTORY: PageMetaCatalog = {
  "zh-CN": {
    title: "八色鸫 AI 算力运营平台",
    description: "适配主流 GPU，把自有算力快速变成可持续运转的 Token 产能",
  },
  en: {
    title: "AI compute operations platform | basedong",
    description:
      "Turn your GPU capacity into sustained Token output — compatible with mainstream hardware.",
  },
  "zh-TW": {
    title: "八色鸫 AI 算力運營平台",
    description: "適配主流 GPU，把自有算力快速變成可持續運轉的 Token 產能",
  },
  fr: {
    title: "Plateforme d'exploitation compute IA | basedong",
    description:
      "Transformez votre GPU en production Token durable — compatible matériel mainstream.",
  },
  ru: {
    title: "Платформа AI compute | basedong",
    description:
      "Превратите GPU в устойчивую Token-мощность — поддержка mainstream-железа.",
  },
  ja: {
    title: "AI 算力運用プラットフォーム | basedong",
    description:
      "主流 GPU を持続的な Token 产能に — 自社算力を素早くサービス化。",
  },
  vi: {
    title: "Nền tảng vận hành compute AI | basedong",
    description:
      "Biến GPU thành năng suất Token bền vững — tương thích phần cứng phổ biến.",
  },
};

const ENTERPRISE: PageMetaCatalog = {
  "zh-CN": {
    title: "八色鸫企业级MaaS平台",
    description:
      "面向企业的大模型 MaaS 能力平台，贯通算力统一调度、模型训练微调、推理服务部署与业务场景落地，提供端到端闭环能力。",
  },
  en: {
    title: "Enterprise MaaS platform | basedong",
    description:
      "Enterprise LLM MaaS — unified compute, fine-tuning, inference deployment, and scenario delivery end to end.",
  },
  "zh-TW": {
    title: "八色鸫企業級 MaaS 平台",
    description:
      "面向企業的大模型 MaaS 能力平台，貫通算力統一調度、模型訓練微調、推理服務部署與業務場景落地，提供端到端閉環能力。",
  },
  fr: {
    title: "Plateforme MaaS entreprise | basedong",
    description:
      "MaaS LLM entreprise — compute unifié, fine-tuning, déploiement inference et scénarios métier de bout en bout.",
  },
  ru: {
    title: "Enterprise MaaS | basedong",
    description:
      "Корпоративный LLM MaaS — compute, fine-tuning, inference и сценарии end-to-end.",
  },
  ja: {
    title: "エンタープライズ MaaS | basedong",
    description:
      "企業向け LLM MaaS — 算力統合、ファインチューニング、推論デプロイ、業務シナリオまで一気通貫。",
  },
  vi: {
    title: "Nền tảng MaaS doanh nghiệp | basedong",
    description:
      "MaaS LLM doanh nghiệp — compute, fine-tune, triển khai inference và kịch bản end-to-end.",
  },
};

const STATIC_CATALOGS = {
  home: HOME,
  about: ABOUT,
  brand: BRAND,
  "developer-talk": DEVELOPER_TALK,
  news: NEWS,
  partner: PARTNER,
  models: MODELS,
  "ai-gateway": AI_GATEWAY,
  "token-factory": TOKEN_FACTORY,
  enterprise: ENTERPRISE,
} as const;

export type MarketingPageKey = keyof typeof STATIC_CATALOGS;

export function getMarketingPageMetadata(
  page: MarketingPageKey,
  locale: string,
): PageMeta {
  return pickCatalog(locale, STATIC_CATALOGS[page]);
}

export function getPricingPageMetadata(locale: string): PageMeta {
  const ui = getPricingUiCopy(locale);
  return { title: ui.pageTitle, description: ui.pageDescription };
}

export function getReservedPageMetadata(locale: string): PageMeta {
  const c = getReservedContent(locale);
  return { title: c.pageTitle, description: c.pageDescription };
}

export function getUserAgreementPageMetadata(locale: string): PageMeta {
  const c = getUserAgreementContent(locale);
  const brand = metadataBrandSuffix(locale);
  return {
    title: `${c.pageTitle} - ${brand}`,
    description: c.pageTitle,
  };
}
