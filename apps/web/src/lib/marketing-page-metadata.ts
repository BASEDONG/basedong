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
  ko: {
    title: "basedong — 100+ 주요 모델을 하나의 API로",
    description:
      "고성능·저비용 AI 모델 서비스로 개발팀이 제품 구축에 집중할 수 있습니다.",
  },
  de: {
    title: "basedong — Eine API für 100+ führende Modelle",
    description:
      "Leistungsstarke, kosteneffiziente KI-Modellservices, damit Teams sich auf Produkte konzentieren können.",
  },
  es: {
    title: "basedong — Una API para más de 100 modelos líderes",
    description:
      "Servicios de modelos IA de alto rendimiento y bajo costo para que los equipos se enfoquen en el producto.",
  },
  "pt-BR": {
    title: "basedong — Uma API para mais de 100 modelos líderes",
    description:
      "Serviços de modelos IA de alto desempenho e baixo custo para equipes focarem no produto.",
  },
  ar: {
    title: "basedong — واجهة API واحدة لأكثر من 100 نموذج رائد",
    description:
      "خدمات نماذج ذكاء اصطناعي عالية الأداء ومنخفضة التكلفة حتى تركز الفرق على بناء المنتجات.",
  },
  hi: {
    title: "basedong — 100+ प्रमुख मॉडल के लिए एक API",
    description:
      "उच्च प्रदर्शन, किफ़ायती AI मॉडल सेवाएँ ताकि टीमें उत्पाद निर्माण पर ध्यान दे सकें।",
  },
  id: {
    title: "basedong — Satu API untuk 100+ model terkemuka",
    description:
      "Layanan model AI berkinerja tinggi dan hemat biaya agar tim fokus membangun produk.",
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
  ko: {
    title: "회사 소개 | basedong",
    description:
      "고성능·저비용 다품종 AI 모델 서비스 — 모두를 위한 AI.",
  },
  de: {
    title: "Über uns | basedong",
    description:
      "Effiziente, erschwingliche KI-Modellservices — KI für alle.",
  },
  es: {
    title: "Acerca de | basedong",
    description:
      "Servicios de modelos IA eficientes y asequibles — IA para todos.",
  },
  "pt-BR": {
    title: "Sobre | basedong",
    description:
      "Serviços de modelos IA eficientes e acessíveis — IA para todos.",
  },
  ar: {
    title: "حول | basedong",
    description:
      "خدمات نماذج ذكاء اصطناعي فعّالة ومنخفضة التكلفة — ذكاء اصطناعي للجميع.",
  },
  hi: {
    title: "परिचय | basedong",
    description:
      "कुशल, किफ़ायती बहु-श्रेणी AI मॉडल सेवाएँ — सभी के लिए AI।",
  },
  id: {
    title: "Tentang | basedong",
    description:
      "Layanan model AI efisien dan terjangkau — AI untuk semua orang.",
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
  ko: {
    title: "브랜드 | basedong",
    description:
      "미션, 가치, 브랜드 관계 및 사용 가이드라인 — 모두를 위한 AI.",
  },
  de: {
    title: "Marke | basedong",
    description:
      "Mission, Werte, Markenbeziehungen und Nutzungsrichtlinien — KI für alle.",
  },
  es: {
    title: "Marca | basedong",
    description:
      "Misión, valores, relaciones de marca y pautas de uso — IA para todos.",
  },
  "pt-BR": {
    title: "Marca | basedong",
    description:
      "Missão, valores, relações de marca e diretrizes de uso — IA para todos.",
  },
  ar: {
    title: "العلامة | basedong",
    description:
      "المهمة والقيم وعلاقات العلامة وإرشادات الاستخدام — ذكاء اصطناعي للجميع.",
  },
  hi: {
    title: "ब्रांड | basedong",
    description:
      "मिशन, मूल्य, ब्रांड संबंध और उपयोग दिशानिर्देश — सभी के लिए AI।",
  },
  id: {
    title: "Merek | basedong",
    description:
      "Misi, nilai, hubungan merek, dan panduan penggunaan — AI untuk semua orang.",
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
  ko: {
    title: "개발자 이야기 | basedong",
    description: "개발자의 실제 실천과 인사이트",
  },
  de: {
    title: "Developer Talk | basedong",
    description: "Praxis und Einblicke von Entwicklern",
  },
  es: {
    title: "Developer Talk | basedong",
    description: "Prácticas e ideas reales de desarrolladores",
  },
  "pt-BR": {
    title: "Developer Talk | basedong",
    description: "Práticas e insights reais de desenvolvedores",
  },
  ar: {
    title: "قصص المطورين | basedong",
    description: "ممارسات ورؤى حقيقية من المطورين",
  },
  hi: {
    title: "डेवलपर टॉक | basedong",
    description: "डेवलपरों से वास्तविक अभ्यास और अंतर्दृष्टि",
  },
  id: {
    title: "Cerita Developer | basedong",
    description: "Praktik dan wawasan nyata dari developer",
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
  ko: {
    title: "뉴스, 제품 및 이벤트 | basedong",
    description:
      "기업 소식, 신규 모델, 파트너십, 고객 사례 및 이벤트.",
  },
  de: {
    title: "Neuigkeiten, Produkte & Events | basedong",
    description:
      "Unternehmensupdates, neue Modelle, Partnerschaften, Kundenstorys und Events.",
  },
  es: {
    title: "Noticias, productos y eventos | basedong",
    description:
      "Actualizaciones corporativas, nuevos modelos, alianzas, casos de clientes y eventos.",
  },
  "pt-BR": {
    title: "Notícias, produtos e eventos | basedong",
    description:
      "Atualizações da empresa, novos modelos, parcerias, cases de clientes e eventos.",
  },
  ar: {
    title: "الأخبار والمنتجات والفعاليات | basedong",
    description:
      "تحديثات الشركة ونماذج جديدة وشراكات وقصص عملاء وفعاليات.",
  },
  hi: {
    title: "समाचार, उत्पाद और कार्यक्रम | basedong",
    description:
      "कंपनी अपडेट, नए मॉडल, साझेदारी, ग्राहक कहानियाँ और कार्यक्रम।",
  },
  id: {
    title: "Berita, produk & acara | basedong",
    description:
      "Pembaruan perusahaan, model baru, kemitraan, kisah pelanggan, dan acara.",
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
  ko: {
    title: "파트너 생태계 | basedong",
    description:
      "개방적이고 안정적인 LLM API로 모델 벤더와 앱을 연결 — 글로벌 AI 생태계를 함께 구축.",
  },
  de: {
    title: "Partner-Ökosystem | basedong",
    description:
      "Offene, stabile LLM-APIs — verbinden Modellanbieter und Apps in einem globalen KI-Ökosystem.",
  },
  es: {
    title: "Ecosistema de socios | basedong",
    description:
      "APIs LLM abiertas y estables — conectando proveedores de modelos y apps en un ecosistema global de IA.",
  },
  "pt-BR": {
    title: "Ecossistema de parceiros | basedong",
    description:
      "APIs LLM abertas e estáveis — conectando fornecedores de modelos e apps em um ecossistema global de IA.",
  },
  ar: {
    title: "نظام الشركاء | basedong",
    description:
      "واجهات LLM مفتوحة ومستقرة — ربط موردي النماذج والتطبيقات في نظام ذكاء اصطناعي عالمي.",
  },
  hi: {
    title: "पार्टनर इकोसिस्टम | basedong",
    description:
      "खुले, स्थिर LLM API — मॉडल विक्रेताओं और ऐप्स को वैश्विक AI इकोसिस्टम में जोड़ना।",
  },
  id: {
    title: "Ekosistem mitra | basedong",
    description:
      "API LLM terbuka dan stabil — menghubungkan vendor model dan aplikasi dalam ekosistem AI global.",
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
  ko: {
    title: "모델 | basedong",
    description:
      "필요한 AI 모델을 한곳에서. 통합 API, 3줄로 연동 — basedong Backend 카탈로그.",
  },
  de: {
    title: "Modelle | basedong",
    description:
      "Die AI-Modelle, die Sie brauchen, an einem Ort. Einheitliche API, drei Zeilen Integration — Katalog aus basedong Backend.",
  },
  es: {
    title: "Modelos | basedong",
    description:
      "Los modelos IA que necesitas, en un solo lugar. API unificada, tres líneas para integrar — catálogo de basedong Backend.",
  },
  "pt-BR": {
    title: "Modelos | basedong",
    description:
      "Os modelos IA que você precisa, em um só lugar. API unificada, três linhas para integrar — catálogo do Backend basedong.",
  },
  ar: {
    title: "النماذج | basedong",
    description:
      "نماذج الذكاء الاصطناعي التي تحتاجها في مكان واحد. API موحدة، ثلاث أسطر للتكامل — من قائمة Backend basedong.",
  },
  hi: {
    title: "मॉडल | basedong",
    description:
      "आपके ज़रूरी AI मॉडल, एक ही स्थान पर। एकीकृत API, तीन पंक्तियों में इंटीग्रेशन — basedong Backend कैटलॉग।",
  },
  id: {
    title: "Model | basedong",
    description:
      "Model AI yang Anda butuhkan, di satu tempat. API terpadu, tiga baris integrasi — katalog dari Backend basedong.",
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
  ko: {
    title: "LLM 서비스 게이트웨이 | basedong",
    description:
      "멀티 벤더 모델 접속, API 거버넌스, 스마트 라우팅, 비용 관리를 통합 — 더 간단한 LLM 운영.",
  },
  de: {
    title: "LLM-Service-Gateway | basedong",
    description:
      "Einheitlicher Multi-Vendor-Modellzugang, API-Governance, Smart Routing und Kostenkontrolle — einfachere LLM-Ops.",
  },
  es: {
    title: "Gateway de servicios LLM | basedong",
    description:
      "Acceso multi-proveedor unificado, gobernanza API, enrutamiento inteligente y control de costos — operaciones LLM más simples.",
  },
  "pt-BR": {
    title: "Gateway de serviços LLM | basedong",
    description:
      "Acesso multi-vendor unificado, governança de API, roteamento inteligente e controle de custos — ops LLM mais simples.",
  },
  ar: {
    title: "بوابة خدمات LLM | basedong",
    description:
      "وصول موحد متعدد الموردين، حوكمة API، توجيه ذكي، ومراقبة التكلفة — عمليات LLM أبسط.",
  },
  hi: {
    title: "LLM सेवा गेटवे | basedong",
    description:
      "एकीकृत मल्टी-वेंडर मॉडल एक्सेस, API गवर्नेंस, स्मार्ट रूटिंग और लागत नियंत्रण — सरल LLM ऑप्स।",
  },
  id: {
    title: "Gateway layanan LLM | basedong",
    description:
      "Akses model multi-vendor terpadu, tata kelola API, routing cerdas, dan kontrol biaya — ops LLM lebih sederhana.",
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
  ko: {
    title: "AI 연산 운영 플랫폼 | basedong",
    description:
      "주류 GPU와 호환 — 자체 연산을 지속 가능한 Token 생산력으로 전환.",
  },
  de: {
    title: "AI-Compute-Betriebsplattform | basedong",
    description:
      "Verwandeln Sie GPU-Kapazität in nachhaltige Token-Produktion — kompatibel mit Mainstream-Hardware.",
  },
  es: {
    title: "Plataforma de operaciones de cómputo IA | basedong",
    description:
      "Convierte tu capacidad GPU en producción Token sostenida — compatible con hardware mainstream.",
  },
  "pt-BR": {
    title: "Plataforma de operações de computação IA | basedong",
    description:
      "Transforme sua capacidade GPU em produção Token sustentável — compatível com hardware mainstream.",
  },
  ar: {
    title: "منصة عمليات الحوسبة للذكاء الاصطناعي | basedong",
    description:
      "حوّل قدرة GPU إلى إنتاج Token مستدام — متوافق مع الأجهزة الشائعة.",
  },
  hi: {
    title: "AI कंप्यूट ऑपरेशंस प्लेटफ़ॉर्म | basedong",
    description:
      "अपनी GPU क्षमता को स्थायी Token आउटपुट में बदलें — मुख्यधारा हार्डवेयर के साथ संगत।",
  },
  id: {
    title: "Platform operasi komputasi AI | basedong",
    description:
      "Ubah kapasitas GPU menjadi output Token berkelanjutan — kompatibel dengan perangkat keras mainstream.",
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
  ko: {
    title: "엔터프라이즈 MaaS 플랫폼 | basedong",
    description:
      "엔터프라이즈 LLM MaaS — 통합 연산, 파인튜닝, 추론 배포, 시나리오 전달을 end-to-end로.",
  },
  de: {
    title: "Enterprise-MaaS-Plattform | basedong",
    description:
      "Enterprise LLM MaaS — einheitliche Compute, Fine-Tuning, Inferenz-Deployment und Szenarien end-to-end.",
  },
  es: {
    title: "Plataforma MaaS empresarial | basedong",
    description:
      "MaaS LLM empresarial — cómputo unificado, fine-tuning, despliegue de inferencia y escenarios de extremo a extremo.",
  },
  "pt-BR": {
    title: "Plataforma MaaS empresarial | basedong",
    description:
      "MaaS LLM empresarial — computação unificada, fine-tuning, implantação de inferência e cenários ponta a ponta.",
  },
  ar: {
    title: "منصة MaaS للمؤسسات | basedong",
    description:
      "MaaS LLM للمؤسسات — حوسبة موحدة، ضبط دقيق، نشر الاستدلال، وتسليم السيناريوهات من طرف إلى طرف.",
  },
  hi: {
    title: "एंटरप्राइज MaaS प्लेटफ़ॉर्म | basedong",
    description:
      "एंटरप्राइज LLM MaaS — एकीकृत कंप्यूट, fine-tuning, inference तैनाती और end-to-end परिदृश्य।",
  },
  id: {
    title: "Platform MaaS enterprise | basedong",
    description:
      "MaaS LLM enterprise — komputasi terpadu, fine-tuning, deployment inferensi, dan skenario end-to-end.",
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
