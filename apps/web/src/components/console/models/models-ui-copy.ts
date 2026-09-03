import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import type { FilterOption, FilterSection } from "./content-types";

/** Locale-agnostic filter structure; labels come from ModelsUiCopy. */
export type FilterOptionBase = {
  id: string;
  /** Chinese Source key used for matching against Backend tags / filter logic. */
  matchKey: string;
};

export type FilterSectionBase = {
  id: string;
  options: FilterOptionBase[];
};

export const FILTER_SECTIONS_BASE: FilterSectionBase[] = [
  {
    id: "type",
    options: [
      { id: "type-文本", matchKey: "文本" },
      { id: "type-图像", matchKey: "图像" },
      { id: "type-视频", matchKey: "视频" },
      { id: "type-语音", matchKey: "语音" },
    ],
  },
  {
    id: "context",
    options: [
      { id: "ctx-128K", matchKey: "≥ 128K" },
      { id: "ctx-256K", matchKey: "≥ 256K" },
      { id: "ctx-512K", matchKey: "≥ 512K" },
      { id: "ctx-1M", matchKey: "≥ 1M" },
    ],
  },
];

/** Canonical capability keys (lowercase) → display labels. */
export type CapabilityLabelKey = "multimodal";

export type ModelsUiCopy = {
  pageTitle: string;
  hideFilters: string;
  showFilters: string;
  searchPlaceholder: string;
  loadingCatalog: string;
  emptyCatalog: string;
  catalogError: string;
  drawer: {
    closeOverlay: string;
    close: string;
    copy: string;
    apiDocs: string;
    description: string;
    provider: string;
    pricing: string;
    context: string;
    capabilities: string;
    priceInput: string;
    priceOutput: string;
    priceCache: string;
    priceUnavailable: string;
    access: string;
    codeSamples: string;
    replaceApiKeyHint: string;
  };
  sectionLabels: Record<string, string>;
  optionLabels: Record<string, string>;
  capabilityLabels: Record<CapabilityLabelKey, string>;
};

function zhCNLabels(): Pick<
  ModelsUiCopy,
  "sectionLabels" | "optionLabels" | "capabilityLabels"
> {
  return {
    sectionLabels: {
      type: "类型",
      tag: "能力",
      series: "系列 / 厂商",
      context: "上下文",
    },
    optionLabels: Object.fromEntries(
      FILTER_SECTIONS_BASE.flatMap((s) =>
        s.options.map((o) => [o.id, o.matchKey]),
      ),
    ),
    capabilityLabels: {
      multimodal: "多模态",
    },
  };
}

const zhCN: ModelsUiCopy = {
  pageTitle: "模型广场",
  hideFilters: "隐藏筛选器",
  showFilters: "展开筛选器",
  searchPlaceholder: "请输入模型名称",
  loadingCatalog: "正在加载模型目录…",
  emptyCatalog:
    "暂无可用模型。请管理员在 Backend 配置 Channel 与模型目录后再试。",
  catalogError: "无法连接 Backend 模型目录，请稍后重试。",
  drawer: {
    closeOverlay: "关闭遮罩",
    close: "关闭",
    copy: "复制",
    apiDocs: "API 文档",
    description: "介绍",
    provider: "提供商",
    pricing: "价格",
    context: "上下文",
    capabilities: "能力",
    priceInput: "输入",
    priceOutput: "输出",
    priceCache: "缓存",
    priceUnavailable: "价格信息暂未公布",
    access: "接入",
    codeSamples: "调用示例",
    replaceApiKeyHint: "将 <YOUR_API_KEY> 替换为控制台中的 API Key。",
  },
  ...zhCNLabels(),
};

const enCapabilityLabels: Record<CapabilityLabelKey, string> = {
  multimodal: "Multimodal",
};

const en: ModelsUiCopy = {
  pageTitle: "Model plaza",
  hideFilters: "Hide filters",
  showFilters: "Show filters",
  searchPlaceholder: "Search model name",
  loadingCatalog: "Loading model catalog…",
  emptyCatalog:
    "No models available. Ask an admin to configure Backend channels and the model catalog.",
  catalogError: "Could not reach the Backend model catalog. Try again later.",
  drawer: {
    closeOverlay: "Close overlay",
    close: "Close",
    copy: "Copy",
    apiDocs: "API docs",
    description: "Description",
    provider: "Provider",
    pricing: "Pricing",
    context: "Context",
    capabilities: "Capabilities",
    priceInput: "Input",
    priceOutput: "Output",
    priceCache: "Cache",
    priceUnavailable: "Pricing not published yet",
    access: "Access",
    codeSamples: "Code samples",
    replaceApiKeyHint: "Replace <YOUR_API_KEY> with an API Key from the console.",
  },
  sectionLabels: {
    type: "Type",
    tag: "Capabilities",
    series: "Series / vendor",
    context: "Context",
  },
  optionLabels: {
    "type-文本": "Text",
    "type-图像": "Image",
    "type-视频": "Video",
    "type-语音": "Speech",
    "ctx-128K": "≥ 128K",
    "ctx-256K": "≥ 256K",
    "ctx-512K": "≥ 512K",
    "ctx-1M": "≥ 1M",
  },
  capabilityLabels: enCapabilityLabels,
};

const zhTW: ModelsUiCopy = {
  ...zhCN,
  pageTitle: "模型廣場",
  hideFilters: "隱藏篩選器",
  showFilters: "展開篩選器",
  searchPlaceholder: "請輸入模型名稱",
  loadingCatalog: "正在載入模型目錄…",
  emptyCatalog:
    "暫無可用模型。請管理員在 Backend 設定 Channel 與模型目錄後再試。",
  catalogError: "無法連線 Backend 模型目錄，請稍後重試。",
  drawer: {
    closeOverlay: "關閉遮罩",
    close: "關閉",
    copy: "複製",
    apiDocs: "API 文件",
    description: "介紹",
    provider: "提供商",
    pricing: "價格",
    context: "上下文",
    capabilities: "能力",
    priceInput: "輸入",
    priceOutput: "輸出",
    priceCache: "快取",
    priceUnavailable: "價格資訊暫未公佈",
    access: "接入",
    codeSamples: "呼叫範例",
    replaceApiKeyHint: "將 <YOUR_API_KEY> 替換為控制台中的 API Key。",
  },
  sectionLabels: {
    type: "類型",
    tag: "能力",
    series: "系列 / 廠商",
    context: "上下文",
  },
  optionLabels: {
    ...zhCN.optionLabels,
    "type-文本": "文本",
    "type-图像": "圖像",
    "type-视频": "影片",
    "type-语音": "語音",


  },
  capabilityLabels: {
    multimodal: "多模態",
  },
};

function fromEn(
  partial: Omit<Partial<ModelsUiCopy>, "drawer" | "capabilityLabels"> &
    Pick<ModelsUiCopy, "pageTitle" | "sectionLabels" | "optionLabels"> & {
      drawer?: Partial<ModelsUiCopy["drawer"]>;
      capabilityLabels?: Partial<ModelsUiCopy["capabilityLabels"]>;
    },
): ModelsUiCopy {
  return {
    ...en,
    ...partial,
    drawer: { ...en.drawer, ...partial.drawer },
    capabilityLabels: {
      ...en.capabilityLabels,
      ...partial.capabilityLabels,
    },
  };
}

const ja = fromEn({
  pageTitle: "モデル広場",
  hideFilters: "フィルターを隠す",
  showFilters: "フィルターを表示",
  searchPlaceholder: "モデル名を入力",
  loadingCatalog: "モデル一覧を読み込み中…",
  emptyCatalog:
    "利用可能なモデルがありません。管理者に Backend の Channel とモデル一覧の設定を依頼してください。",
  catalogError: "Backend のモデル一覧に接続できません。後でもう一度お試しください。",
  drawer: {
    closeOverlay: "オーバーレイを閉じる",
    close: "閉じる",
    copy: "コピー",
    description: "説明",
  },
  sectionLabels: {
    type: "タイプ",
    tag: "機能",
    series: "シリーズ / ベンダー",
    context: "コンテキスト",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "テキスト",
    "type-图像": "画像",
    "type-视频": "動画",
    "type-语音": "音声",


  },
});

const fr = fromEn({
  pageTitle: "Place des modèles",
  hideFilters: "Masquer les filtres",
  showFilters: "Afficher les filtres",
  searchPlaceholder: "Nom du modèle",
  loadingCatalog: "Chargement du catalogue…",
  emptyCatalog:
    "Aucun modèle disponible. Demandez à un administrateur de configurer les canaux Backend.",
  catalogError: "Impossible d'atteindre le catalogue Backend. Réessayez plus tard.",
  drawer: {
    closeOverlay: "Fermer le calque",
    close: "Fermer",
    copy: "Copier",
    description: "Description",
  },
  sectionLabels: {
    type: "Type",
    tag: "Capabilities",
    series: "Série / éditeur",
    context: "Contexte",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Text",
    "type-图像": "Image",
    "type-视频": "Vidéo",
    "type-语音": "Parole",


  },
});

const ru = fromEn({
  pageTitle: "Площадка моделей",
  hideFilters: "Скрыть фильтры",
  showFilters: "Показать фильтры",
  searchPlaceholder: "Название модели",
  loadingCatalog: "Загрузка каталога…",
  emptyCatalog:
    "Нет доступных моделей. Попросите администратора настроить каналы Backend.",
  catalogError: "Не удалось подключиться к каталогу Backend. Попробуйте позже.",
  drawer: {
    closeOverlay: "Закрыть оверлей",
    close: "Закрыть",
    copy: "Копировать",
    description: "Описание",
  },
  sectionLabels: {
    type: "Тип",
    tag: "Возможности",
    series: "Серия / вендор",
    context: "Контекст",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Текст",
    "type-图像": "Изображение",
    "type-视频": "Видео",
    "type-语音": "Речь",


  },
});

const vi = fromEn({
  pageTitle: "Quảng trường mô hình",
  hideFilters: "Ẩn bộ lọc",
  showFilters: "Hiện bộ lọc",
  searchPlaceholder: "Tên mô hình",
  loadingCatalog: "Đang tải danh mục mô hình…",
  emptyCatalog:
    "Chưa có mô hình. Yêu cầu quản trị viên cấu hình Channel Backend.",
  catalogError: "Không kết nối được danh mục Backend. Thử lại sau.",
  drawer: {
    closeOverlay: "Đóng lớp phủ",
    close: "Đóng",
    copy: "Sao chép",
    description: "Mô tả",
  },
  sectionLabels: {
    type: "Loại",
    tag: "Khả năng",
    series: "Dòng / nhà cung cấp",
    context: "Ngữ cảnh",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Text",
    "type-图像": "Ảnh",
    "type-视频": "Video",
    "type-语音": "Giọng nói",
  },
});

const ko = fromEn({
  pageTitle: "모델 광장",
  hideFilters: "필터 숨기기",
  showFilters: "필터 표시",
  searchPlaceholder: "모델 이름 검색",
  loadingCatalog: "모델 목록을 불러오는 중…",
  emptyCatalog:
    "사용 가능한 모델이 없습니다. 관리자에게 Backend 채널 설정을 요청하세요.",
  catalogError: "Backend 모델 목록에 연결할 수 없습니다. 나중에 다시 시도하세요.",
  drawer: {
    closeOverlay: "오버레이 닫기",
    close: "닫기",
    copy: "복사",
    description: "소개",
  },
  sectionLabels: {
    type: "유형",
    tag: "기능",
    series: "시리즈 / 벤더",
    context: "컨텍스트",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "텍스트",
    "type-图像": "이미지",
    "type-视频": "비디오",
    "type-语音": "음성",


  },
});

const de = fromEn({
  pageTitle: "Modellplatz",
  hideFilters: "Filter ausblenden",
  showFilters: "Filter anzeigen",
  searchPlaceholder: "Modellname suchen",
  loadingCatalog: "Modellkatalog wird geladen…",
  emptyCatalog:
    "Keine Modelle verfügbar. Bitten Sie einen Admin, Backend-Kanäle zu konfigurieren.",
  catalogError: "Backend-Modellkatalog nicht erreichbar. Später erneut versuchen.",
  drawer: {
    closeOverlay: "Overlay schließen",
    close: "Schließen",
    copy: "Kopieren",
    description: "Beschreibung",
  },
  sectionLabels: {
    type: "Typ",
    tag: "Capabilities",
    series: "Serie / Anbieter",
    context: "Kontext",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Text",
    "type-图像": "Bild",
    "type-视频": "Video",
    "type-语音": "Sprache",
  },
});

const es = fromEn({
  pageTitle: "Plaza de modelos",
  hideFilters: "Ocultar filtros",
  showFilters: "Mostrar filtros",
  searchPlaceholder: "Nombre del modelo",
  loadingCatalog: "Cargando catálogo…",
  emptyCatalog:
    "No hay modelos. Pida a un administrador configurar canales Backend.",
  catalogError: "No se pudo conectar al catálogo Backend. Inténtelo más tarde.",
  drawer: {
    closeOverlay: "Cerrar superposición",
    close: "Cerrar",
    copy: "Copiar",
    description: "Descripción",
  },
  sectionLabels: {
    type: "Tipo",
    tag: "Capacidades",
    series: "Serie / proveedor",
    context: "Contexto",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Text",
    "type-图像": "Imagen",
    "type-视频": "Vídeo",
    "type-语音": "Voz",
  },
});

const ptBR = fromEn({
  pageTitle: "Praça de modelos",
  hideFilters: "Ocultar filtros",
  showFilters: "Mostrar filtros",
  searchPlaceholder: "Nome do modelo",
  loadingCatalog: "Carregando catálogo…",
  emptyCatalog:
    "Nenhum modelo disponível. Peça a um admin para configurar canais Backend.",
  catalogError: "Não foi possível acessar o catálogo Backend. Tente mais tarde.",
  drawer: {
    closeOverlay: "Fechar sobreposição",
    close: "Fechar",
    copy: "Copiar",
    description: "Descrição",
  },
  sectionLabels: {
    type: "Tipo",
    tag: "Capabilities",
    series: "Série / fornecedor",
    context: "Contexto",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Text",
    "type-图像": "Imagem",
    "type-视频": "Vídeo",
    "type-语音": "Fala",
  },
});

const ar = fromEn({
  pageTitle: "ساحة النماذج",
  hideFilters: "إخفاء عوامل التصفية",
  showFilters: "إظهار عوامل التصفية",
  searchPlaceholder: "اسم النموذج",
  loadingCatalog: "جارٍ تحميل كتالوج النماذج…",
  emptyCatalog:
    "لا توجد نماذج متاحة. اطلب من المسؤول تهيئة قنوات Backend.",
  catalogError: "تعذّر الوصول إلى كتالوج Backend. حاول لاحقًا.",
  drawer: {
    closeOverlay: "إغلاق الطبقة",
    close: "إغلاق",
    copy: "نسخ",
    description: "الوصف",
  },
  sectionLabels: {
    type: "النوع",
    tag: "القدرات",
    series: "السلسلة / المورد",
    context: "السياق",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "نص",
    "type-图像": "صورة",
    "type-视频": "فيديو",
    "type-语音": "كلام",


  },
});

const hi = fromEn({
  pageTitle: "मॉडल प्लाज़ा",
  hideFilters: "फ़िल्टर छिपाएँ",
  showFilters: "फ़िल्टर दिखाएँ",
  searchPlaceholder: "मॉडल नाम खोजें",
  loadingCatalog: "मॉडल सूची लोड हो रही है…",
  emptyCatalog:
    "कोई मॉडल उपलब्ध नहीं। व्यवस्थापक से Backend चैनल कॉन्फ़िगर करने को कहें।",
  catalogError: "Backend मॉडल सूची से कनेक्ट नहीं हो सका। बाद में पुनः प्रयास करें।",
  drawer: {
    closeOverlay: "ओवरले बंद करें",
    close: "बंद करें",
    copy: "कॉपी",
    description: "परिचय",
  },
  sectionLabels: {
    type: "प्रकार",
    tag: "क्षमताएँ",
    series: "श्रृंखला / विक्रेता",
    context: "संदर्भ",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "पाठ",
    "type-图像": "छवि",
    "type-视频": "वीडियो",
    "type-语音": "वाणी",
  },
});

const id = fromEn({
  pageTitle: "Plaza model",
  hideFilters: "Sembunyikan filter",
  showFilters: "Tampilkan filter",
  searchPlaceholder: "Nama model",
  loadingCatalog: "Memuat katalog model…",
  emptyCatalog:
    "Tidak ada model. Minta admin mengonfigurasi channel Backend.",
  catalogError: "Tidak dapat menghubungi katalog Backend. Coba lagi nanti.",
  drawer: {
    closeOverlay: "Tutup overlay",
    close: "Tutup",
    copy: "Salin",
    description: "Deskripsi",
  },
  sectionLabels: {
    type: "Jenis",
    tag: "Kemampuan",
    series: "Seri / vendor",
    context: "Konteks",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-文本": "Teks",
    "type-图像": "Gambar",
    "type-视频": "Video",
    "type-语音": "Ucapan",
  },
});

const MODELS_UI_COPY: Record<TargetLocale, ModelsUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  ja,
  fr,
  ru,
  vi,
  ko,
  de,
  es,
  "pt-BR": ptBR,
  ar,
  hi,
  id,
};

export function getModelsUiCopy(locale: string): ModelsUiCopy {
  return pickTargetCatalog(locale, MODELS_UI_COPY);
}

export type FilterSectionsDynamic = {
  capabilityKeys?: string[];
  vendors?: string[];
  /** Present catalog type tags (文本 / 图像 / …); omit empty types. */
  typeKeys?: string[];
};

function capabilityOptionId(key: string): string {
  return `tag-${key}`;
}

function seriesOptionId(vendor: string): string {
  return `series-${vendor}`;
}

export function getCapabilityLabel(copy: ModelsUiCopy, key: string): string {
  const k = key.toLowerCase() as CapabilityLabelKey;
  return copy.capabilityLabels[k] ?? key;
}

export function getFilterSections(
  locale: string,
  dynamic: FilterSectionsDynamic = {},
): FilterSection[] {
  const copy = getModelsUiCopy(locale);
  const sections: FilterSection[] = [];

  const typeSection = FILTER_SECTIONS_BASE.find((s) => s.id === "type");
  if (typeSection) {
    const present = new Set(dynamic.typeKeys ?? []);
    const typeOptions =
      present.size > 0
        ? typeSection.options.filter((option) => present.has(option.matchKey))
        : typeSection.options;
    if (typeOptions.length > 0) {
      sections.push({
        id: "type",
        label: copy.sectionLabels.type ?? "type",
        options: typeOptions.map(
          (option): FilterOption & { matchKey: string } => ({
            id: option.id,
            matchKey: option.matchKey,
            label: copy.optionLabels[option.id] ?? option.matchKey,
          }),
        ),
      });
    }
  }

  const capabilityKeys = dynamic.capabilityKeys ?? [];
  if (capabilityKeys.length > 0) {
    sections.push({
      id: "tag",
      label: copy.sectionLabels.tag ?? "tag",
      options: capabilityKeys.map((key) => ({
        id: capabilityOptionId(key),
        matchKey: key,
        label: getCapabilityLabel(copy, key),
      })),
    });
  }

  const vendors = dynamic.vendors ?? [];
  if (vendors.length > 0) {
    sections.push({
      id: "series",
      label: copy.sectionLabels.series ?? "series",
      options: vendors.map((vendor) => ({
        id: seriesOptionId(vendor),
        matchKey: vendor,
        label: vendor,
      })),
    });
  }

  const contextSection = FILTER_SECTIONS_BASE.find((s) => s.id === "context");
  if (contextSection) {
    sections.push({
      id: "context",
      label: copy.sectionLabels.context ?? "context",
      options: contextSection.options.map(
        (option): FilterOption & { matchKey: string } => ({
          id: option.id,
          matchKey: option.matchKey,
          label: copy.optionLabels[option.id] ?? option.matchKey,
        }),
      ),
    });
  }

  return sections;
}

export function getMatchKey(
  option: FilterOption & { matchKey?: string },
): string {
  if (option.matchKey) return option.matchKey;
  const base = FILTER_SECTIONS_BASE.flatMap((s) => s.options).find(
    (o) => o.id === option.id,
  );
  return base?.matchKey ?? option.label;
}

/** Display label for a Chinese type matchKey (文本 / 图像 / …). */
export function getTypeTagLabel(copy: ModelsUiCopy, typeKey: string): string {
  return copy.optionLabels[`type-${typeKey}`] ?? typeKey;
}
