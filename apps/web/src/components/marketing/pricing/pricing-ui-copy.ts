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

const catalogs: Record<TranslatedLocale, PricingUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
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
