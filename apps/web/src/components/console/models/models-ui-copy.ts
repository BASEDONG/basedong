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
      { id: "type-对话", matchKey: "对话" },
      { id: "type-生图", matchKey: "生图" },
      { id: "type-视频", matchKey: "视频" },
      { id: "type-语音", matchKey: "语音" },
      { id: "type-嵌入", matchKey: "嵌入" },
      { id: "type-重排序", matchKey: "重排序" },
    ],
  },
  {
    id: "tag",
    options: [
      { id: "tag-视觉", matchKey: "视觉" },
      { id: "tag-推理", matchKey: "推理" },
      { id: "tag-代码", matchKey: "代码" },
      { id: "tag-旗舰", matchKey: "旗舰" },
      { id: "tag-轻量", matchKey: "轻量" },
      { id: "tag-聊天", matchKey: "聊天" },
      { id: "tag-图像", matchKey: "图像" },
    ],
  },
  {
    id: "series",
    options: [
      { id: "series-Anthropic", matchKey: "Anthropic" },
      { id: "series-OpenAI", matchKey: "OpenAI" },
      { id: "series-xAI", matchKey: "xAI" },
      { id: "series-Google", matchKey: "Google" },
      { id: "series-字节跳动", matchKey: "字节跳动" },
      { id: "series-智谱", matchKey: "智谱" },
      { id: "series-Moonshot", matchKey: "Moonshot" },
      { id: "series-MiniMax", matchKey: "MiniMax" },
      { id: "series-更多", matchKey: "更多" },
    ],
  },
  {
    id: "context",
    options: [
      { id: "ctx-8K", matchKey: "≥ 8K" },
      { id: "ctx-16K", matchKey: "≥ 16K" },
      { id: "ctx-32K", matchKey: "≥ 32K" },
      { id: "ctx-128K", matchKey: "≥ 128K" },
    ],
  },
  {
    id: "spec",
    options: [
      { id: "spec-lt10", matchKey: "10B 以下" },
      { id: "spec-10-50", matchKey: "10 ~ 50B" },
      { id: "spec-50-100", matchKey: "50 ~ 100B" },
      { id: "spec-gt100", matchKey: "100B 以上" },
    ],
  },
  {
    id: "date",
    options: [
      { id: "date-30", matchKey: "近 30 天" },
      { id: "date-90", matchKey: "近 90 天" },
    ],
  },
];

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
    unsupported: string;
    onlineInference: string;
    batchInference: string;
    fineTune: string;
    tryOnline: string;
    apiDocs: string;
    pricingInfo: string;
  };
  sectionLabels: Record<string, string>;
  optionLabels: Record<string, string>;
};

function zhCNLabels(): Pick<ModelsUiCopy, "sectionLabels" | "optionLabels"> {
  return {
    sectionLabels: {
      type: "类型",
      tag: "标签",
      series: "系列 / 厂商",
      context: "上下文",
      spec: "规格",
      date: "发布日期",
    },
    optionLabels: Object.fromEntries(
      FILTER_SECTIONS_BASE.flatMap((s) =>
        s.options.map((o) => [o.id, o.matchKey]),
      ),
    ),
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
    unsupported: "暂未支持",
    onlineInference: "在线推理",
    batchInference: "批量推理",
    fineTune: "微调训练",
    tryOnline: "在线体验",
    apiDocs: "API 文档",
    pricingInfo: "价格信息",
  },
  ...zhCNLabels(),
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
    unsupported: "Not supported yet",
    onlineInference: "Online inference",
    batchInference: "Batch inference",
    fineTune: "Fine-tuning",
    tryOnline: "Try online",
    apiDocs: "API docs",
    pricingInfo: "Pricing",
  },
  sectionLabels: {
    type: "Type",
    tag: "Tags",
    series: "Series / vendor",
    context: "Context",
    spec: "Size",
    date: "Release date",
  },
  optionLabels: {
    "type-对话": "Chat",
    "type-生图": "Image",
    "type-视频": "Video",
    "type-语音": "Speech",
    "type-嵌入": "Embedding",
    "type-重排序": "Rerank",
    "tag-视觉": "Vision",
    "tag-推理": "Reasoning",
    "tag-代码": "Code",
    "tag-旗舰": "Flagship",
    "tag-轻量": "Lightweight",
    "tag-聊天": "Chat",
    "tag-图像": "Image",
    "series-Anthropic": "Anthropic",
    "series-OpenAI": "OpenAI",
    "series-xAI": "xAI",
    "series-Google": "Google",
    "series-字节跳动": "ByteDance",
    "series-智谱": "Zhipu",
    "series-Moonshot": "Moonshot",
    "series-MiniMax": "MiniMax",
    "series-更多": "More",
    "ctx-8K": "≥ 8K",
    "ctx-16K": "≥ 16K",
    "ctx-32K": "≥ 32K",
    "ctx-128K": "≥ 128K",
    "spec-lt10": "Under 10B",
    "spec-10-50": "10 ~ 50B",
    "spec-50-100": "50 ~ 100B",
    "spec-gt100": "Over 100B",
    "date-30": "Last 30 days",
    "date-90": "Last 90 days",
  },
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
    unsupported: "暫未支援",
    onlineInference: "線上推理",
    batchInference: "批次推理",
    fineTune: "微調訓練",
    tryOnline: "線上體驗",
    apiDocs: "API 文件",
    pricingInfo: "價格資訊",
  },
  sectionLabels: {
    type: "類型",
    tag: "標籤",
    series: "系列 / 廠商",
    context: "上下文",
    spec: "規格",
    date: "發佈日期",
  },
  optionLabels: {
    ...zhCN.optionLabels,
    "type-对话": "對話",
    "type-生图": "生圖",
    "type-视频": "影片",
    "type-语音": "語音",
    "type-嵌入": "嵌入",
    "type-重排序": "重排序",
    "tag-视觉": "視覺",
    "tag-推理": "推理",
    "tag-代码": "程式碼",
    "tag-旗舰": "旗艦",
    "tag-轻量": "輕量",
    "tag-聊天": "聊天",
    "tag-图像": "圖像",
    "series-字节跳动": "字節跳動",
    "series-智谱": "智譜",
    "series-更多": "更多",
    "spec-lt10": "10B 以下",
    "spec-gt100": "100B 以上",
    "date-30": "近 30 天",
    "date-90": "近 90 天",
  },
};

function fromEn(
  partial: Omit<Partial<ModelsUiCopy>, "drawer"> &
    Pick<ModelsUiCopy, "pageTitle" | "sectionLabels" | "optionLabels"> & {
      drawer?: Partial<ModelsUiCopy["drawer"]>;
    },
): ModelsUiCopy {
  return {
    ...en,
    ...partial,
    drawer: { ...en.drawer, ...partial.drawer },
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
    unsupported: "未対応",
    onlineInference: "オンライン推論",
    batchInference: "バッチ推論",
    fineTune: "ファインチューニング",
  },
  sectionLabels: {
    type: "タイプ",
    tag: "タグ",
    series: "シリーズ / ベンダー",
    context: "コンテキスト",
    spec: "規模",
    date: "公開日",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "チャット",
    "type-生图": "画像",
    "type-视频": "動画",
    "type-语音": "音声",
    "type-嵌入": "埋め込み",
    "type-重排序": "リランク",
    "tag-视觉": "ビジョン",
    "tag-推理": "推論",
    "tag-代码": "コード",
    "tag-旗舰": "フラッグシップ",
    "tag-轻量": "軽量",
    "tag-聊天": "チャット",
    "tag-图像": "画像",
    "series-字节跳动": "ByteDance",
    "series-智谱": "Zhipu",
    "series-更多": "その他",
    "spec-lt10": "10B 未満",
    "spec-gt100": "100B 超",
    "date-30": "過去 30 日",
    "date-90": "過去 90 日",
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
    unsupported: "Pas encore pris en charge",
    onlineInference: "Inférence en ligne",
    batchInference: "Inférence par lot",
    fineTune: "Fine-tuning",
  },
  sectionLabels: {
    type: "Type",
    tag: "Tags",
    series: "Série / éditeur",
    context: "Contexte",
    spec: "Taille",
    date: "Date de sortie",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Chat",
    "type-生图": "Image",
    "type-视频": "Vidéo",
    "type-语音": "Parole",
    "type-嵌入": "Embedding",
    "type-重排序": "Rerank",
    "tag-视觉": "Vision",
    "tag-推理": "Raisonnement",
    "tag-代码": "Code",
    "tag-旗舰": "Phare",
    "tag-轻量": "Léger",
    "tag-聊天": "Chat",
    "tag-图像": "Image",
    "series-更多": "Plus",
    "spec-lt10": "Moins de 10B",
    "spec-gt100": "Plus de 100B",
    "date-30": "30 derniers jours",
    "date-90": "90 derniers jours",
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
    unsupported: "Пока не поддерживается",
    onlineInference: "Онлайн-инференс",
    batchInference: "Пакетный инференс",
    fineTune: "Дообучение",
  },
  sectionLabels: {
    type: "Тип",
    tag: "Теги",
    series: "Серия / вендор",
    context: "Контекст",
    spec: "Размер",
    date: "Дата выхода",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Чат",
    "type-生图": "Изображение",
    "type-视频": "Видео",
    "type-语音": "Речь",
    "type-嵌入": "Эмбеддинг",
    "type-重排序": "Реранк",
    "tag-视觉": "Зрение",
    "tag-推理": "Рассуждение",
    "tag-代码": "Код",
    "tag-旗舰": "Флагман",
    "tag-轻量": "Лёгкая",
    "tag-聊天": "Чат",
    "tag-图像": "Изображение",
    "series-更多": "Ещё",
    "spec-lt10": "Менее 10B",
    "spec-gt100": "Более 100B",
    "date-30": "За 30 дней",
    "date-90": "За 90 дней",
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
    unsupported: "Chưa hỗ trợ",
    onlineInference: "Suy luận trực tuyến",
    batchInference: "Suy luận hàng loạt",
    fineTune: "Fine-tune",
  },
  sectionLabels: {
    type: "Loại",
    tag: "Thẻ",
    series: "Dòng / nhà cung cấp",
    context: "Ngữ cảnh",
    spec: "Quy mô",
    date: "Ngày phát hành",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Chat",
    "type-生图": "Ảnh",
    "type-视频": "Video",
    "type-语音": "Giọng nói",
    "series-更多": "Thêm",
    "spec-lt10": "Dưới 10B",
    "spec-gt100": "Trên 100B",
    "date-30": "30 ngày qua",
    "date-90": "90 ngày qua",
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
    unsupported: "아직 지원되지 않음",
    onlineInference: "온라인 추론",
    batchInference: "배치 추론",
    fineTune: "파인튜닝",
  },
  sectionLabels: {
    type: "유형",
    tag: "태그",
    series: "시리즈 / 벤더",
    context: "컨텍스트",
    spec: "규모",
    date: "출시일",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "채팅",
    "type-生图": "이미지",
    "type-视频": "비디오",
    "type-语音": "음성",
    "type-嵌入": "임베딩",
    "type-重排序": "리랭크",
    "tag-视觉": "비전",
    "tag-推理": "추론",
    "tag-代码": "코드",
    "tag-旗舰": "플래그십",
    "tag-轻量": "경량",
    "tag-聊天": "채팅",
    "tag-图像": "이미지",
    "series-更多": "더보기",
    "spec-lt10": "10B 미만",
    "spec-gt100": "100B 이상",
    "date-30": "최근 30일",
    "date-90": "최근 90일",
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
    unsupported: "Noch nicht unterstützt",
    onlineInference: "Online-Inferenz",
    batchInference: "Batch-Inferenz",
    fineTune: "Fine-Tuning",
  },
  sectionLabels: {
    type: "Typ",
    tag: "Tags",
    series: "Serie / Anbieter",
    context: "Kontext",
    spec: "Größe",
    date: "Veröffentlichung",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Chat",
    "type-生图": "Bild",
    "type-视频": "Video",
    "type-语音": "Sprache",
    "tag-视觉": "Vision",
    "tag-推理": "Reasoning",
    "tag-代码": "Code",
    "tag-旗舰": "Flagschiff",
    "tag-轻量": "Leicht",
    "series-更多": "Mehr",
    "spec-lt10": "Unter 10B",
    "spec-gt100": "Über 100B",
    "date-30": "Letzte 30 Tage",
    "date-90": "Letzte 90 Tage",
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
    unsupported: "Aún no compatible",
    onlineInference: "Inferencia en línea",
    batchInference: "Inferencia por lotes",
    fineTune: "Ajuste fino",
  },
  sectionLabels: {
    type: "Tipo",
    tag: "Etiquetas",
    series: "Serie / proveedor",
    context: "Contexto",
    spec: "Tamaño",
    date: "Fecha de lanzamiento",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Chat",
    "type-生图": "Imagen",
    "type-视频": "Vídeo",
    "type-语音": "Voz",
    "tag-视觉": "Visión",
    "tag-推理": "Razonamiento",
    "tag-代码": "Código",
    "tag-旗舰": "Flagship",
    "tag-轻量": "Ligero",
    "series-更多": "Más",
    "spec-lt10": "Menos de 10B",
    "spec-gt100": "Más de 100B",
    "date-30": "Últimos 30 días",
    "date-90": "Últimos 90 días",
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
    unsupported: "Ainda não suportado",
    onlineInference: "Inferência online",
    batchInference: "Inferência em lote",
    fineTune: "Fine-tuning",
  },
  sectionLabels: {
    type: "Tipo",
    tag: "Tags",
    series: "Série / fornecedor",
    context: "Contexto",
    spec: "Tamanho",
    date: "Data de lançamento",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Chat",
    "type-生图": "Imagem",
    "type-视频": "Vídeo",
    "type-语音": "Fala",
    "tag-视觉": "Visão",
    "tag-推理": "Raciocínio",
    "tag-代码": "Código",
    "tag-旗舰": "Flagship",
    "tag-轻量": "Leve",
    "series-更多": "Mais",
    "spec-lt10": "Abaixo de 10B",
    "spec-gt100": "Acima de 100B",
    "date-30": "Últimos 30 dias",
    "date-90": "Últimos 90 dias",
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
    unsupported: "غير مدعوم بعد",
    onlineInference: "استدلال عبر الإنترنت",
    batchInference: "استدلال دفعي",
    fineTune: "ضبط دقيق",
  },
  sectionLabels: {
    type: "النوع",
    tag: "الوسوم",
    series: "السلسلة / المورد",
    context: "السياق",
    spec: "الحجم",
    date: "تاريخ الإصدار",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "محادثة",
    "type-生图": "صورة",
    "type-视频": "فيديو",
    "type-语音": "كلام",
    "type-嵌入": "تضمين",
    "type-重排序": "إعادة ترتيب",
    "tag-视觉": "رؤية",
    "tag-推理": "استدلال",
    "tag-代码": "شفرة",
    "tag-旗舰": "رائد",
    "tag-轻量": "خفيف",
    "tag-聊天": "محادثة",
    "tag-图像": "صورة",
    "series-更多": "المزيد",
    "spec-lt10": "أقل من 10B",
    "spec-gt100": "أكثر من 100B",
    "date-30": "آخر 30 يومًا",
    "date-90": "آخر 90 يومًا",
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
    unsupported: "अभी समर्थित नहीं",
    onlineInference: "ऑनलाइन अनुमान",
    batchInference: "बैच अनुमान",
    fineTune: "फाइन-ट्यूनिंग",
  },
  sectionLabels: {
    type: "प्रकार",
    tag: "टैग",
    series: "श्रृंखला / विक्रेता",
    context: "संदर्भ",
    spec: "आकार",
    date: "रिलीज़ तिथि",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "चैट",
    "type-生图": "छवि",
    "type-视频": "वीडियो",
    "type-语音": "वाणी",
    "tag-视觉": "दृष्टि",
    "tag-推理": "तर्क",
    "tag-代码": "कोड",
    "tag-旗舰": "फ्लैगशिप",
    "tag-轻量": "हल्का",
    "series-更多": "और",
    "spec-lt10": "10B से कम",
    "spec-gt100": "100B से अधिक",
    "date-30": "पिछले 30 दिन",
    "date-90": "पिछले 90 दिन",
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
    unsupported: "Belum didukung",
    onlineInference: "Inferensi online",
    batchInference: "Inferensi batch",
    fineTune: "Fine-tuning",
  },
  sectionLabels: {
    type: "Jenis",
    tag: "Tag",
    series: "Seri / vendor",
    context: "Konteks",
    spec: "Ukuran",
    date: "Tanggal rilis",
  },
  optionLabels: {
    ...en.optionLabels,
    "type-对话": "Obrolan",
    "type-生图": "Gambar",
    "type-视频": "Video",
    "type-语音": "Ucapan",
    "tag-视觉": "Visi",
    "tag-推理": "Penalaran",
    "tag-代码": "Kode",
    "tag-旗舰": "Flagship",
    "tag-轻量": "Ringan",
    "series-更多": "Lainnya",
    "spec-lt10": "Di bawah 10B",
    "spec-gt100": "Di atas 100B",
    "date-30": "30 hari terakhir",
    "date-90": "90 hari terakhir",
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

export function getFilterSections(locale: string): FilterSection[] {
  const copy = getModelsUiCopy(locale);
  return FILTER_SECTIONS_BASE.map((section) => ({
    id: section.id,
    label: copy.sectionLabels[section.id] ?? section.id,
    options: section.options.map(
      (option): FilterOption & { matchKey: string } => ({
        id: option.id,
        matchKey: option.matchKey,
        label: copy.optionLabels[option.id] ?? option.matchKey,
      }),
    ),
  }));
}

export function getMatchKey(option: FilterOption & { matchKey?: string }): string {
  if (option.matchKey) return option.matchKey;
  const base = FILTER_SECTIONS_BASE.flatMap((s) => s.options).find(
    (o) => o.id === option.id,
  );
  return base?.matchKey ?? option.label;
}
