import type { TranslatedLocale } from "@/lib/locale";
import { pickCatalog } from "@/lib/pick-catalog";
import type { PricingCategoryId } from "./content-types";
import type { SfGradientPalette } from "@/types/siliconflow-cn-10b89bdc";
import { BRAND_THEME } from "@/lib/brand-colors";

export const ASSET = "/assets/marketing/pricing/images";

export const heroBackgroundBase: Omit<SfGradientPalette, "logoAlt"> = {
  base: BRAND_THEME.cardSurface,
  orbPrimary: "#A67C52",
  orbSecondary: "#8B6340",
  accent: "#A67C52",
  logoSrc: `${ASSET}/hero-visual.svg`,
};

export type PricingUiCopy = {
  logoAlt: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  searchPlaceholder: string;
  search: string;
  features: string[];
  categoryLabels: Record<PricingCategoryId, string>;
  chatTitle: string;
  imageTitle: string;
  audioTitle: string;
  videoTitle: string;
  chatHeaders: readonly [string, string, string, string, string];
  mediaHeaders: readonly [string, string, string];
  loading: string;
  empty: string;
  emptyCategory: string;
  error: string;
  free: string;
  expandMore: (count: number) => string;
  pageTitle: string;
  pageDescription: string;
};

const zhCN: PricingUiCopy = {
  logoAlt: "价格",
  titleBefore: "模型怎么选，",
  titleHighlight: "先看清价格",
  titleAfter: "",
  subtitle: "输入、输出与缓存命中，一屏对比主流厂商成本，选型更有底。",
  searchPlaceholder: "搜索模型名称 / DisplayName / modelId",
  search: "搜索",
  features: ["实时价格同步", "仅展示可用模型", "按厂商快速定位"],
  categoryLabels: {
    全部: "全部",
    对话: "对话",
    生图: "生图",
    语音: "语音",
    视频: "视频",
  },
  chatTitle: "对话模型",
  imageTitle: "生图模型",
  audioTitle: "语音模型",
  videoTitle: "视频模型",
  chatHeaders: ["厂商", "模型", "输入", "输出", "缓存"],
  mediaHeaders: ["厂商", "模型", "输出价格"],
  loading: "正在加载模型目录…",
  empty:
    "暂无上架模型。管理员在 Backend 配置 Channel 与模型目录后，这里会显示真实价格。",
  emptyCategory: "当前分类下暂无模型。",
  error: "无法连接模型目录服务，请稍后重试。",
  free: "免费",
  expandMore: (n) => `展开更多 ${n} 个模型`,
  pageTitle: "价格｜八色鸫",
  pageDescription:
    "面向生产选型的模型价格页：对比零售模型的输入、输出与缓存命中成本，价格由 basedong Backend 目录提供。",
};

const en: PricingUiCopy = {
  logoAlt: "Pricing",
  titleBefore: "Choosing a model?",
  titleHighlight: "Start with pricing",
  titleAfter: "",
  subtitle:
    "Compare input, output, and cache-hit costs across leading providers in one view.",
  searchPlaceholder: "Search model name / DisplayName / modelId",
  search: "Search",
  features: [
    "Live price sync",
    "Available models only",
    "Jump by provider",
  ],
  categoryLabels: {
    全部: "All",
    对话: "Chat",
    生图: "Image",
    语音: "Audio",
    视频: "Video",
  },
  chatTitle: "Chat models",
  imageTitle: "Image models",
  audioTitle: "Audio models",
  videoTitle: "Video models",
  chatHeaders: ["Provider", "Model", "Input", "Output", "Cache"],
  mediaHeaders: ["Provider", "Model", "Output price"],
  loading: "Loading model catalog…",
  empty:
    "No models listed yet. After an admin configures Channels and the model catalog in Backend, prices will appear here.",
  emptyCategory: "No models in this category.",
  error: "Could not reach the model catalog service. Please try again later.",
  free: "Free",
  expandMore: (n) => `Show ${n} more models`,
  pageTitle: "Pricing | basedong",
  pageDescription:
    "Compare input, output, and cache-hit costs for production model selection. Prices come from the basedong Backend catalog.",
};

const zhTW: PricingUiCopy = {
  logoAlt: "價格",
  titleBefore: "模型怎麼選，",
  titleHighlight: "先看清價格",
  titleAfter: "",
  subtitle: "輸入、輸出與快取命中，一屏對比主流廠商成本，選型更有底。",
  searchPlaceholder: "搜尋模型名稱 / DisplayName / modelId",
  search: "搜尋",
  features: ["即時價格同步", "僅展示可用模型", "依廠商快速定位"],
  categoryLabels: {
    全部: "全部",
    对话: "對話",
    生图: "生圖",
    语音: "語音",
    视频: "影片",
  },
  chatTitle: "對話模型",
  imageTitle: "生圖模型",
  audioTitle: "語音模型",
  videoTitle: "影片模型",
  chatHeaders: ["廠商", "模型", "輸入", "輸出", "快取"],
  mediaHeaders: ["廠商", "模型", "輸出價格"],
  loading: "正在載入模型目錄…",
  empty:
    "暫無上架模型。管理員在 Backend 設定 Channel 與模型目錄後，這裡會顯示真實價格。",
  emptyCategory: "目前分類下暫無模型。",
  error: "無法連線模型目錄服務，請稍後重試。",
  free: "免費",
  expandMore: (n) => `展開更多 ${n} 個模型`,
  pageTitle: "價格｜八色鸫",
  pageDescription:
    "面向生產選型的模型價格頁：對比零售模型的輸入、輸出與快取命中成本，價格由 basedong Backend 目錄提供。",
};

const fr: PricingUiCopy = {
  logoAlt: "Tarifs",
  titleBefore: "Choisir un modèle ?",
  titleHighlight: "Commencez par les prix",
  titleAfter: "",
  subtitle:
    "Comparez les coûts d'entrée, de sortie et de cache des principaux fournisseurs en un coup d'œil.",
  searchPlaceholder: "Rechercher nom / DisplayName / modelId",
  search: "Rechercher",
  features: [
    "Prix synchronisés",
    "Modèles disponibles uniquement",
    "Accès rapide par fournisseur",
  ],
  categoryLabels: {
    全部: "Tout",
    对话: "Chat",
    生图: "Image",
    语音: "Audio",
    视频: "Vidéo",
  },
  chatTitle: "Modèles de chat",
  imageTitle: "Modèles d'image",
  audioTitle: "Modèles audio",
  videoTitle: "Modèles vidéo",
  chatHeaders: ["Fournisseur", "Modèle", "Entrée", "Sortie", "Cache"],
  mediaHeaders: ["Fournisseur", "Modèle", "Prix de sortie"],
  loading: "Chargement du catalogue…",
  empty:
    "Aucun modèle pour l'instant. Après configuration des Channels et du catalogue dans Backend, les prix apparaîtront ici.",
  emptyCategory: "Aucun modèle dans cette catégorie.",
  error: "Impossible de joindre le catalogue. Réessayez plus tard.",
  free: "Gratuit",
  expandMore: (n) => `Afficher ${n} modèles de plus`,
  pageTitle: "Tarifs | basedong",
  pageDescription:
    "Comparez les coûts d'entrée, de sortie et de cache pour choisir un modèle en production. Tarifs issus du catalogue Backend basedong.",
};

const ru: PricingUiCopy = {
  logoAlt: "Цены",
  titleBefore: "Выбираете модель?",
  titleHighlight: "Начните с цен",
  titleAfter: "",
  subtitle:
    "Сравните стоимость ввода, вывода и cache-hit у ведущих провайдеров на одном экране.",
  searchPlaceholder: "Поиск имени / DisplayName / modelId",
  search: "Поиск",
  features: [
    "Актуальные цены",
    "Только доступные модели",
    "Быстрый переход по вендору",
  ],
  categoryLabels: {
    全部: "Все",
    对话: "Чат",
    生图: "Изображения",
    语音: "Аудио",
    视频: "Видео",
  },
  chatTitle: "Чат-модели",
  imageTitle: "Модели изображений",
  audioTitle: "Аудиомодели",
  videoTitle: "Видеомодели",
  chatHeaders: ["Провайдер", "Модель", "Ввод", "Вывод", "Кэш"],
  mediaHeaders: ["Провайдер", "Модель", "Цена вывода"],
  loading: "Загрузка каталога…",
  empty:
    "Пока нет моделей. После настройки Channel и каталога в Backend здесь появятся цены.",
  emptyCategory: "В этой категории пока нет моделей.",
  error: "Не удалось связаться с каталогом. Попробуйте позже.",
  free: "Бесплатно",
  expandMore: (n) => `Ещё ${n} моделей`,
  pageTitle: "Цены | basedong",
  pageDescription:
    "Сравнение стоимости ввода, вывода и cache-hit для выбора модели в production. Цены из каталога Backend basedong.",
};

const ja: PricingUiCopy = {
  logoAlt: "料金",
  titleBefore: "モデル選びは、",
  titleHighlight: "まず価格から",
  titleAfter: "",
  subtitle:
    "入力・出力・キャッシュヒットのコストを主要ベンダー横断で比較できます。",
  searchPlaceholder: "モデル名 / DisplayName / modelId を検索",
  search: "検索",
  features: [
    "価格をリアルタイム同期",
    "利用可能なモデルのみ表示",
    "ベンダーから素早く探す",
  ],
  categoryLabels: {
    全部: "すべて",
    对话: "対話",
    生图: "画像",
    语音: "音声",
    视频: "動画",
  },
  chatTitle: "対話モデル",
  imageTitle: "画像モデル",
  audioTitle: "音声モデル",
  videoTitle: "動画モデル",
  chatHeaders: ["ベンダー", "モデル", "入力", "出力", "キャッシュ"],
  mediaHeaders: ["ベンダー", "モデル", "出力価格"],
  loading: "モデル一覧を読み込み中…",
  empty:
    "掲載モデルがありません。Backend で Channel とカタログを設定すると価格が表示されます。",
  emptyCategory: "このカテゴリにはモデルがありません。",
  error: "カタログに接続できません。後でもう一度お試しください。",
  free: "無料",
  expandMore: (n) => `さらに ${n} 件のモデルを表示`,
  pageTitle: "料金 | basedong",
  pageDescription:
    "本番選定向けのモデル料金ページ。入力・出力・キャッシュヒットコストを比較。価格は basedong Backend カタログから取得。",
};

const vi: PricingUiCopy = {
  logoAlt: "Bảng giá",
  titleBefore: "Chọn mô hình?",
  titleHighlight: "Bắt đầu từ giá",
  titleAfter: "",
  subtitle:
    "So sánh chi phí input, output và cache-hit của các nhà cung cấp hàng đầu trên một màn hình.",
  searchPlaceholder: "Tìm tên mô hình / DisplayName / modelId",
  search: "Tìm kiếm",
  features: [
    "Đồng bộ giá theo thời gian thực",
    "Chỉ hiện mô hình khả dụng",
    "Định vị nhanh theo vendor",
  ],
  categoryLabels: {
    全部: "Tất cả",
    对话: "Chat",
    生图: "Ảnh",
    语音: "Âm thanh",
    视频: "Video",
  },
  chatTitle: "Mô hình chat",
  imageTitle: "Mô hình ảnh",
  audioTitle: "Mô hình âm thanh",
  videoTitle: "Mô hình video",
  chatHeaders: ["Nhà cung cấp", "Mô hình", "Input", "Output", "Cache"],
  mediaHeaders: ["Nhà cung cấp", "Mô hình", "Giá output"],
  loading: "Đang tải danh mục mô hình…",
  empty:
    "Chưa có mô hình. Sau khi admin cấu hình Channel và danh mục trên Backend, giá sẽ hiện ở đây.",
  emptyCategory: "Chưa có mô hình trong danh mục này.",
  error: "Không kết nối được dịch vụ danh mục. Vui lòng thử lại sau.",
  free: "Miễn phí",
  expandMore: (n) => `Hiện thêm ${n} mô hình`,
  pageTitle: "Bảng giá | basedong",
  pageDescription:
    "So sánh chi phí input, output và cache-hit khi chọn mô hình production. Giá từ danh mục Backend basedong.",
};

const ko: PricingUiCopy = {
  logoAlt: "요금",
  titleBefore: "모델 선택,",
  titleHighlight: "먼저 가격부터",
  titleAfter: "",
  subtitle:
    "입력·출력·캐시 히트 비용을 주요 벤더와 한 화면에서 비교하세요.",
  searchPlaceholder: "모델 이름 / DisplayName / modelId 검색",
  search: "검색",
  features: [
    "실시간 가격 동기화",
    "사용 가능한 모델만 표시",
    "벤더별 빠른 탐색",
  ],
  categoryLabels: {
    全部: "전체",
    对话: "대화",
    生图: "이미지",
    语音: "음성",
    视频: "동영상",
  },
  chatTitle: "대화 모델",
  imageTitle: "이미지 모델",
  audioTitle: "음성 모델",
  videoTitle: "동영상 모델",
  chatHeaders: ["벤더", "모델", "입력", "출력", "캐시"],
  mediaHeaders: ["벤더", "모델", "출력 가격"],
  loading: "모델 카탈로그 로딩 중…",
  empty:
    "등록된 모델이 없습니다. Backend에서 Channel과 모델 카탈로그를 설정하면 가격이 표시됩니다.",
  emptyCategory: "이 카테고리에 모델이 없습니다.",
  error: "모델 카탈로그 서비스에 연결할 수 없습니다. 나중에 다시 시도해 주세요.",
  free: "무료",
  expandMore: (n) => `${n}개 모델 더 보기`,
  pageTitle: "요금 | basedong",
  pageDescription:
    "프로덕션 모델 선택을 위한 가격 페이지. 입력·출력·캐시 히트 비용 비교. basedong Backend 카탈로그 기준.",
};

const de: PricingUiCopy = {
  logoAlt: "Preise",
  titleBefore: "Modell wählen?",
  titleHighlight: "Mit Preisen beginnen",
  titleAfter: "",
  subtitle:
    "Vergleichen Sie Input-, Output- und Cache-Hit-Kosten führender Anbieter auf einen Blick.",
  searchPlaceholder: "Modellname / DisplayName / modelId suchen",
  search: "Suchen",
  features: [
    "Live-Preissynchronisation",
    "Nur verfügbare Modelle",
    "Schnell nach Anbieter filtern",
  ],
  categoryLabels: {
    全部: "Alle",
    对话: "Chat",
    生图: "Bild",
    语音: "Audio",
    视频: "Video",
  },
  chatTitle: "Chat-Modelle",
  imageTitle: "Bildmodelle",
  audioTitle: "Audiomodelle",
  videoTitle: "Videomodelle",
  chatHeaders: ["Anbieter", "Modell", "Input", "Output", "Cache"],
  mediaHeaders: ["Anbieter", "Modell", "Output-Preis"],
  loading: "Modellkatalog wird geladen…",
  empty:
    "Noch keine Modelle gelistet. Nach Konfiguration von Channels und Katalog im Backend erscheinen hier Preise.",
  emptyCategory: "Keine Modelle in dieser Kategorie.",
  error: "Modellkatalog nicht erreichbar. Bitte später erneut versuchen.",
  free: "Kostenlos",
  expandMore: (n) => `${n} weitere Modelle anzeigen`,
  pageTitle: "Preise | basedong",
  pageDescription:
    "Input-, Output- und Cache-Hit-Kosten für die Produktionsmodellauswahl. Preise aus dem basedong Backend-Katalog.",
};

const es: PricingUiCopy = {
  logoAlt: "Precios",
  titleBefore: "¿Elegir un modelo?",
  titleHighlight: "Empieza por el precio",
  titleAfter: "",
  subtitle:
    "Compara costos de entrada, salida y caché de los principales proveedores en una vista.",
  searchPlaceholder: "Buscar nombre / DisplayName / modelId",
  search: "Buscar",
  features: [
    "Sincronización de precios en vivo",
    "Solo modelos disponibles",
    "Salto rápido por proveedor",
  ],
  categoryLabels: {
    全部: "Todos",
    对话: "Chat",
    生图: "Imagen",
    语音: "Audio",
    视频: "Video",
  },
  chatTitle: "Modelos de chat",
  imageTitle: "Modelos de imagen",
  audioTitle: "Modelos de audio",
  videoTitle: "Modelos de video",
  chatHeaders: ["Proveedor", "Modelo", "Entrada", "Salida", "Caché"],
  mediaHeaders: ["Proveedor", "Modelo", "Precio de salida"],
  loading: "Cargando catálogo de modelos…",
  empty:
    "Aún no hay modelos. Tras configurar Channels y el catálogo en Backend, los precios aparecerán aquí.",
  emptyCategory: "No hay modelos en esta categoría.",
  error: "No se pudo conectar al catálogo. Inténtelo más tarde.",
  free: "Gratis",
  expandMore: (n) => `Mostrar ${n} modelos más`,
  pageTitle: "Precios | basedong",
  pageDescription:
    "Compara costos de entrada, salida y caché para selección de modelos en producción. Precios del catálogo Backend basedong.",
};

const ptBR: PricingUiCopy = {
  logoAlt: "Preços",
  titleBefore: "Escolhendo um modelo?",
  titleHighlight: "Comece pelo preço",
  titleAfter: "",
  subtitle:
    "Compare custos de entrada, saída e cache-hit dos principais provedores em uma tela.",
  searchPlaceholder: "Buscar nome / DisplayName / modelId",
  search: "Buscar",
  features: [
    "Sincronização de preços em tempo real",
    "Somente modelos disponíveis",
    "Ir rápido por provedor",
  ],
  categoryLabels: {
    全部: "Todos",
    对话: "Chat",
    生图: "Imagem",
    语音: "Áudio",
    视频: "Vídeo",
  },
  chatTitle: "Modelos de chat",
  imageTitle: "Modelos de imagem",
  audioTitle: "Modelos de áudio",
  videoTitle: "Modelos de vídeo",
  chatHeaders: ["Provedor", "Modelo", "Entrada", "Saída", "Cache"],
  mediaHeaders: ["Provedor", "Modelo", "Preço de saída"],
  loading: "Carregando catálogo de modelos…",
  empty:
    "Nenhum modelo listado ainda. Após configurar Channels e catálogo no Backend, os preços aparecerão aqui.",
  emptyCategory: "Nenhum modelo nesta categoria.",
  error: "Não foi possível acessar o catálogo. Tente novamente mais tarde.",
  free: "Grátis",
  expandMore: (n) => `Mostrar mais ${n} modelos`,
  pageTitle: "Preços | basedong",
  pageDescription:
    "Compare custos de entrada, saída e cache-hit para seleção de modelos em produção. Preços do catálogo Backend basedong.",
};

const ar: PricingUiCopy = {
  logoAlt: "الأسعار",
  titleBefore: "اختيار نموذج؟",
  titleHighlight: "ابدأ بالأسعار",
  titleAfter: "",
  subtitle:
    "قارن تكاليف الإدخال والإخراج وضربات الذاكرة المؤقتة عبر المزودين الرئيسيين في شاشة واحدة.",
  searchPlaceholder: "بحث اسم النموذج / DisplayName / modelId",
  search: "بحث",
  features: [
    "مزامنة الأسعار مباشرة",
    "النماذج المتاحة فقط",
    "انتقال سريع حسب المزود",
  ],
  categoryLabels: {
    全部: "الكل",
    对话: "محادثة",
    生图: "صورة",
    语音: "صوت",
    视频: "فيديو",
  },
  chatTitle: "نماذج المحادثة",
  imageTitle: "نماذج الصور",
  audioTitle: "نماذج الصوت",
  videoTitle: "نماذج الفيديو",
  chatHeaders: ["المزود", "النموذج", "إدخال", "إخراج", "ذاكرة مؤقتة"],
  mediaHeaders: ["المزود", "النموذج", "سعر الإخراج"],
  loading: "جارٍ تحميل قائمة النماذج…",
  empty:
    "لا توجد نماذج بعد. بعد إعداد Channels والقائمة في Backend، ستظهر الأسعار هنا.",
  emptyCategory: "لا توجد نماذج في هذه الفئة.",
  error: "تعذّر الاتصال بخدمة القائمة. يرجى المحاولة لاحقًا.",
  free: "مجاني",
  expandMore: (n) => `عرض ${n} نماذج إضافية`,
  pageTitle: "الأسعار | basedong",
  pageDescription:
    "قارن تكاليف الإدخال والإخراج وضربات الذاكرة المؤقتة لاختيار النماذج في الإنتاج. الأسعار من قائمة Backend basedong.",
};

const hi: PricingUiCopy = {
  logoAlt: "मूल्य",
  titleBefore: "मॉडल चुन रहे हैं?",
  titleHighlight: "पहले मूल्य देखें",
  titleAfter: "",
  subtitle:
    "एक स्क्रीन पर प्रमुख विक्रेताओं के input, output और cache-hit लागत की तुलना करें।",
  searchPlaceholder: "मॉडल नाम / DisplayName / modelId खोजें",
  search: "खोजें",
  features: [
    "लाइव मूल्य सिंक",
    "केवल उपलब्ध मॉडल",
    "विक्रेता के अनुसार तेज़ नेविगेशन",
  ],
  categoryLabels: {
    全部: "सभी",
    对话: "चैट",
    生图: "छवि",
    语音: "ऑडियो",
    视频: "वीडियो",
  },
  chatTitle: "चैट मॉडल",
  imageTitle: "छवि मॉडल",
  audioTitle: "ऑडियो मॉडल",
  videoTitle: "वीडियो मॉडल",
  chatHeaders: ["विक्रेता", "मॉडल", "इनपुट", "आउटपुट", "कैश"],
  mediaHeaders: ["विक्रेता", "मॉडल", "आउटपुट मूल्य"],
  loading: "मॉडल कैटलॉग लोड हो रहा है…",
  empty:
    "अभी कोई मॉडल सूचीबद्ध नहीं। Backend में Channel और कैटलॉग कॉन्फ़िगर करने के बाद यहाँ मूल्य दिखेंगे।",
  emptyCategory: "इस श्रेणी में कोई मॉडल नहीं।",
  error: "मॉडल कैटलॉग सेवा तक पहुँच नहीं सकी। बाद में पुनः प्रयास करें।",
  free: "मुफ़्त",
  expandMore: (n) => `${n} और मॉडल दिखाएँ`,
  pageTitle: "मूल्य | basedong",
  pageDescription:
    "प्रोडक्शन मॉडल चयन के लिए input, output और cache-hit लागत की तुलना। basedong Backend कैटलॉग से मूल्य।",
};

const id: PricingUiCopy = {
  logoAlt: "Harga",
  titleBefore: "Memilih model?",
  titleHighlight: "Mulai dari harga",
  titleAfter: "",
  subtitle:
    "Bandingkan biaya input, output, dan cache-hit dari vendor terkemuka dalam satu layar.",
  searchPlaceholder: "Cari nama model / DisplayName / modelId",
  search: "Cari",
  features: [
    "Sinkronisasi harga langsung",
    "Hanya model tersedia",
    "Lompat cepat per vendor",
  ],
  categoryLabels: {
    全部: "Semua",
    对话: "Chat",
    生图: "Gambar",
    语音: "Audio",
    视频: "Video",
  },
  chatTitle: "Model chat",
  imageTitle: "Model gambar",
  audioTitle: "Model audio",
  videoTitle: "Model video",
  chatHeaders: ["Vendor", "Model", "Input", "Output", "Cache"],
  mediaHeaders: ["Vendor", "Model", "Harga output"],
  loading: "Memuat katalog model…",
  empty:
    "Belum ada model. Setelah admin mengonfigurasi Channel dan katalog di Backend, harga akan muncul di sini.",
  emptyCategory: "Tidak ada model dalam kategori ini.",
  error: "Tidak dapat terhubung ke layanan katalog. Coba lagi nanti.",
  free: "Gratis",
  expandMore: (n) => `Tampilkan ${n} model lagi`,
  pageTitle: "Harga | basedong",
  pageDescription:
    "Bandingkan biaya input, output, dan cache-hit untuk pemilihan model produksi. Harga dari katalog Backend basedong.",
};

const catalogs: Record<TranslatedLocale, PricingUiCopy> = {
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

export function getPricingUiCopy(locale: string): PricingUiCopy {
  return pickCatalog(locale, catalogs);
}

export function getPricingSectionMeta(locale: string): Record<
  Exclude<PricingCategoryId, "全部">,
  { title: string; headers: string[]; priceColumns: number }
> {
  const ui = getPricingUiCopy(locale);
  return {
    对话: {
      title: ui.chatTitle,
      headers: [...ui.chatHeaders],
      priceColumns: 3,
    },
    生图: {
      title: ui.imageTitle,
      headers: [...ui.mediaHeaders],
      priceColumns: 1,
    },
    语音: {
      title: ui.audioTitle,
      headers: [...ui.mediaHeaders],
      priceColumns: 1,
    },
    视频: {
      title: ui.videoTitle,
      headers: [...ui.mediaHeaders],
      priceColumns: 1,
    },
  };
}

export function getPricingHeroBackground(locale: string): SfGradientPalette {
  return {
    ...heroBackgroundBase,
    logoAlt: getPricingUiCopy(locale).logoAlt,
  };
}
