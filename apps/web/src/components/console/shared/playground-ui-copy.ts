import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type PlaygroundUiCopy = {
  pageTitles: {
    chat: string;
    image: string;
    video: string;
    tts: string;
  };
  feeBannerBefore: string;
  modelDetails: string;
  promptPlaceholder: string;
  disclaimerBefore: string;
  termsLink: string;
  disclaimerAfter: string;
  /** Chat-only trailing note about usage units / 词元. */
  disclaimerUsageUnits: string;
  noModels: string;
  selectModel: string;
  configureChannel: string;
  callingRelay: string;
  selectModelFirst: string;
  requestFailed: string;
  errorPrefix: string;
  modelLabel: string;
  groupLabel?: string;
  selectGroup?: string;
  noGroups?: string;
  paramMaxTokens: string;
  paramTemperature: string;
  paramTopP: string;
  paramTopK: string;
  paramFrequencyPenalty: string;
  clearChatAria: string;
};

const zhCN: PlaygroundUiCopy = {
  pageTitles: {
    chat: "对话",
    image: "图像生成",
    video: "视频生成",
    tts: "语音",
  },
  feeBannerBefore: "在线体验将按照用量产生费用，详见",
  modelDetails: "模型详情",
  promptPlaceholder: "请输入提示词...",
  disclaimerBefore: "内容由人工智能生成，可能不完全准确，仅供参考。请遵守平台",
  termsLink: "用户协议",
  disclaimerAfter: "及适用的法律法规",
  disclaimerUsageUnits: "。用量将按词元扣减额度。",
  noModels: "暂无可用模型",
  selectModel: "选择模型",
  configureChannel: "请先在 Admin 配置 Channel",
  callingRelay: "正在调用 Relay…",
  selectModelFirst: "请先选择可用模型",
  requestFailed: "请求失败，请稍后重试",
  errorPrefix: "（错误）",
  modelLabel: "模型",
  groupLabel: "分组",
  selectGroup: "选择分组",
  noGroups: "暂无可用分组",
  paramMaxTokens: "最大词元",
  paramTemperature: "温度",
  paramTopP: "Top-P",
  paramTopK: "Top-K",
  paramFrequencyPenalty: "频率惩罚",
  clearChatAria: "清空对话",
};

const en: PlaygroundUiCopy = {
  pageTitles: {
    chat: "Chat",
    image: "Image generation",
    video: "Video generation",
    tts: "Speech",
  },
  feeBannerBefore: "Playground usage is billed. See",
  modelDetails: "model details",
  promptPlaceholder: "Enter a prompt…",
  disclaimerBefore:
    "Content is AI-generated and may be inaccurate. For reference only. Please follow the platform",
  termsLink: "User Agreement",
  disclaimerAfter: "and applicable laws",
  disclaimerUsageUnits: ". Quota is deducted by usage units consumed.",
  noModels: "No models available",
  selectModel: "Select a model",
  configureChannel: "Configure a Channel in Admin first",
  callingRelay: "Calling Relay…",
  selectModelFirst: "Select an available model first",
  requestFailed: "Request failed. Try again later.",
  errorPrefix: "(Error) ",
  modelLabel: "Model",
  groupLabel: "Group",
  selectGroup: "Select a group",
  noGroups: "No groups available",
  paramMaxTokens: "Max tokens",
  paramTemperature: "Temperature",
  paramTopP: "Top-P",
  paramTopK: "Top-K",
  paramFrequencyPenalty: "Frequency penalty",
  clearChatAria: "Clear chat",
};

const zhTW: PlaygroundUiCopy = {
  ...zhCN,
  pageTitles: {
    chat: "對話",
    image: "圖像生成",
    video: "影片生成",
    tts: "語音",
  },
  feeBannerBefore: "線上體驗將按照用量產生費用，詳見",
  modelDetails: "模型詳情",
  promptPlaceholder: "請輸入提示詞...",
  disclaimerBefore: "內容由人工智慧生成，可能不完全準確，僅供參考。請遵守平台",
  termsLink: "使用者協議",
  disclaimerAfter: "及適用的法律法規",
  disclaimerUsageUnits: "。用量將按詞元扣減額度。",
  noModels: "暫無可用模型",
  selectModel: "選擇模型",
  configureChannel: "請先在 Admin 設定 Channel",
  callingRelay: "正在呼叫 Relay…",
  selectModelFirst: "請先選擇可用模型",
  requestFailed: "請求失敗，請稍後重試",
  errorPrefix: "（錯誤）",
  modelLabel: "模型",
  paramMaxTokens: "最大詞元",
  paramTemperature: "溫度",
  paramTopP: "Top-P",
  paramTopK: "Top-K",
  paramFrequencyPenalty: "頻率懲罰",
  clearChatAria: "清空對話",
};

function fromEn(partial: Partial<PlaygroundUiCopy>): PlaygroundUiCopy {
  return {
    ...en,
    ...partial,
    pageTitles: { ...en.pageTitles, ...partial.pageTitles },
  };
}

const ja = fromEn({
  pageTitles: {
    chat: "チャット",
    image: "画像生成",
    video: "動画生成",
    tts: "音声",
  },
  feeBannerBefore: "オンライン体験は利用量に応じて課金されます。詳細は",
  modelDetails: "モデル詳細",
  promptPlaceholder: "プロンプトを入力…",
  disclaimerBefore:
    "内容は AI により生成され、必ずしも正確ではありません。参考情報です。プラットフォームの",
  termsLink: "利用規約",
  disclaimerAfter: "および適用法令を遵守してください",
  disclaimerUsageUnits: "。枠は利用単位に応じて差し引かれます。",
  noModels: "利用可能なモデルがありません",
  selectModel: "モデルを選択",
  configureChannel: "先に Admin で Channel を設定してください",
  callingRelay: "Relay を呼び出し中…",
  selectModelFirst: "先に利用可能なモデルを選択してください",
  requestFailed: "リクエストに失敗しました。後でもう一度お試しください。",
  errorPrefix: "（エラー）",



});

const fr = fromEn({
  pageTitles: {
    chat: "Chat",
    image: "Génération d'images",
    video: "Génération vidéo",
    tts: "Parole",
  },
  feeBannerBefore: "L'expérience en ligne est facturée. Voir",
  modelDetails: "détails du modèle",
  promptPlaceholder: "Saisir une invite…",
  disclaimerBefore:
    "Contenu généré par IA, pouvant être inexact. À titre indicatif. Respectez",
  termsLink: "les Conditions d'utilisation",
  disclaimerAfter: "et les lois applicables",
  disclaimerUsageUnits: ". Le quota est déduit selon les unités d'utilisation.",
  noModels: "Aucun modèle disponible",
  selectModel: "Sélectionner un modèle",
  configureChannel: "Configurez d'abord un Channel dans Admin",
  callingRelay: "Appel du Relay…",
  selectModelFirst: "Sélectionnez d'abord un modèle disponible",
  requestFailed: "Échec de la requête. Réessayez plus tard.",
  errorPrefix: "(Erreur) ",



});

const ru = fromEn({
  pageTitles: {
    chat: "Чат",
    image: "Генерация изображений",
    video: "Генерация видео",
    tts: "Речь",
  },
  feeBannerBefore: "Онлайн-опыт тарифицируется. См.",
  modelDetails: "сведения о модели",
  promptPlaceholder: "Введите подсказку…",
  disclaimerBefore:
    "Контент создан ИИ и может быть неточным. Только для справки. Соблюдайте",
  termsLink: "Пользовательское соглашение",
  disclaimerAfter: "и применимые законы",
  disclaimerUsageUnits: ". Квота списывается по единицам использования.",
  noModels: "Нет доступных моделей",
  selectModel: "Выберите модель",
  configureChannel: "Сначала настройте Channel в Admin",
  callingRelay: "Вызов Relay…",
  selectModelFirst: "Сначала выберите доступную модель",
  requestFailed: "Запрос не выполнен. Попробуйте позже.",
  errorPrefix: "(Ошибка) ",



});

const vi = fromEn({
  pageTitles: {
    chat: "Trò chuyện",
    image: "Tạo ảnh",
    video: "Tạo video",
    tts: "Giọng nói",
  },
  feeBannerBefore: "Trải nghiệm trực tuyến được tính phí. Xem",
  modelDetails: "chi tiết mô hình",
  promptPlaceholder: "Nhập prompt…",
  disclaimerBefore:
    "Nội dung do AI tạo, có thể không chính xác, chỉ để tham khảo. Hãy tuân thủ",
  termsLink: "Thỏa thuận người dùng",
  disclaimerAfter: "và luật áp dụng",
  disclaimerUsageUnits: ". Hạn mức bị trừ theo đơn vị sử dụng.",
  noModels: "Chưa có mô hình",
  selectModel: "Chọn mô hình",
  configureChannel: "Hãy cấu hình Channel trong Admin trước",
  callingRelay: "Đang gọi Relay…",
  selectModelFirst: "Hãy chọn mô hình trước",
  requestFailed: "Yêu cầu thất bại. Thử lại sau.",
  errorPrefix: "(Lỗi) ",



});

const ko = fromEn({
  pageTitles: {
    chat: "채팅",
    image: "이미지 생성",
    video: "비디오 생성",
    tts: "음성",
  },
  feeBannerBefore: "온라인 체험은 사용량에 따라 과금됩니다. 자세한 내용:",
  modelDetails: "모델 상세",
  promptPlaceholder: "프롬프트를 입력하세요…",
  disclaimerBefore:
    "콘텐츠는 AI가 생성하며 정확하지 않을 수 있습니다. 참고용입니다. 플랫폼",
  termsLink: "이용약관",
  disclaimerAfter: "및 관련 법령을 준수하세요",
  disclaimerUsageUnits: ". 한도는 이용 단위에 따라 차감됩니다.",
  noModels: "사용 가능한 모델 없음",
  selectModel: "모델 선택",
  configureChannel: "먼저 Admin에서 Channel을 구성하세요",
  callingRelay: "Relay 호출 중…",
  selectModelFirst: "먼저 사용 가능한 모델을 선택하세요",
  requestFailed: "요청에 실패했습니다. 나중에 다시 시도하세요.",
  errorPrefix: "(오류) ",



});

const de = fromEn({
  pageTitles: {
    chat: "Chat",
    image: "Bildgenerierung",
    video: "Videogenerierung",
    tts: "Sprache",
  },
  feeBannerBefore: "Online-Nutzung wird abgerechnet. Siehe",
  modelDetails: "Modelldetails",
  promptPlaceholder: "Prompt eingeben…",
  disclaimerBefore:
    "Inhalte sind KI-generiert und können ungenau sein. Nur zur Orientierung. Bitte beachten Sie die",
  termsLink: "Nutzungsbedingungen",
  disclaimerAfter: "und geltende Gesetze",
  disclaimerUsageUnits:
    ". Das Kontingent wird nach verbrauchten Nutzungseinheiten abgezogen.",
  noModels: "Keine Modelle verfügbar",
  selectModel: "Modell auswählen",
  configureChannel: "Konfigurieren Sie zuerst einen Channel in Admin",
  callingRelay: "Relay wird aufgerufen…",
  selectModelFirst: "Wählen Sie zuerst ein verfügbares Modell",
  requestFailed: "Anfrage fehlgeschlagen. Später erneut versuchen.",
  errorPrefix: "(Fehler) ",



});

const es = fromEn({
  pageTitles: {
    chat: "Chat",
    image: "Generación de imágenes",
    video: "Generación de vídeo",
    tts: "Voz",
  },
  feeBannerBefore: "La experiencia en línea se factura. Ver",
  modelDetails: "detalles del modelo",
  promptPlaceholder: "Escriba un prompt…",
  disclaimerBefore:
    "Contenido generado por IA; puede ser inexacto. Solo referencia. Cumpla el",
  termsLink: "Acuerdo de usuario",
  disclaimerAfter: "y las leyes aplicables",
  disclaimerUsageUnits: ". La cuota se descuenta por unidades de uso.",
  noModels: "No hay modelos",
  selectModel: "Seleccionar modelo",
  configureChannel: "Configure primero un Channel en Admin",
  callingRelay: "Llamando a Relay…",
  selectModelFirst: "Seleccione primero un modelo disponible",
  requestFailed: "La solicitud falló. Inténtelo más tarde.",
  errorPrefix: "(Error) ",



});

const ptBR = fromEn({
  pageTitles: {
    chat: "Chat",
    image: "Geração de imagens",
    video: "Geração de vídeo",
    tts: "Fala",
  },
  feeBannerBefore: "A experiência online é cobrada. Veja",
  modelDetails: "detalhes do modelo",
  promptPlaceholder: "Digite um prompt…",
  disclaimerBefore:
    "Conteúdo gerado por IA; pode ser impreciso. Apenas referência. Cumpra o",
  termsLink: "Contrato do usuário",
  disclaimerAfter: "e as leis aplicáveis",
  disclaimerUsageUnits: ". A cota é debitada por unidades de uso.",
  noModels: "Nenhum modelo disponível",
  selectModel: "Selecionar modelo",
  configureChannel: "Configure primeiro um Channel no Admin",
  callingRelay: "Chamando Relay…",
  selectModelFirst: "Selecione primeiro um modelo disponível",
  requestFailed: "Falha na solicitação. Tente mais tarde.",
  errorPrefix: "(Erro) ",



});

const ar = fromEn({
  pageTitles: {
    chat: "محادثة",
    image: "توليد الصور",
    video: "توليد الفيديو",
    tts: "كلام",
  },
  feeBannerBefore: "تُحتسب تجربة الاستخدام عبر الإنترنت. راجع",
  modelDetails: "تفاصيل النموذج",
  promptPlaceholder: "أدخل مطالبة…",
  disclaimerBefore:
    "المحتوى من إنشاء الذكاء الاصطناعي وقد يكون غير دقيق. للمرجع فقط. التزم بـ",
  termsLink: "اتفاقية المستخدم",
  disclaimerAfter: "والقوانين المعمول بها",
  disclaimerUsageUnits: ". تُخصم الحصة حسب وحدات الاستخدام.",
  noModels: "لا توجد نماذج متاحة",
  selectModel: "اختر نموذجًا",
  configureChannel: "قم بتهيئة Channel في Admin أولًا",
  callingRelay: "جارٍ استدعاء Relay…",
  selectModelFirst: "اختر نموذجًا متاحًا أولًا",
  requestFailed: "فشل الطلب. حاول لاحقًا.",
  errorPrefix: "(خطأ) ",



});

const hi = fromEn({
  pageTitles: {
    chat: "चैट",
    image: "छवि निर्माण",
    video: "वीडियो निर्माण",
    tts: "वाणी",
  },
  feeBannerBefore: "ऑनलाइन अनुभव बिल किया जाता है। देखें",
  modelDetails: "मॉडल विवरण",
  promptPlaceholder: "प्रॉम्प्ट दर्ज करें…",
  disclaimerBefore:
    "सामग्री AI-जनित है और गलत हो सकती है। केवल संदर्भ के लिए। प्लेटफ़ॉर्म",
  termsLink: "उपयोगकर्ता समझौता",
  disclaimerAfter: "और लागू कानूनों का पालन करें",
  disclaimerUsageUnits: "। कोटा उपयोग इकाइयों के अनुसार कटता है।",
  noModels: "कोई मॉडल उपलब्ध नहीं",
  selectModel: "मॉडल चुनें",
  configureChannel: "पहले Admin में Channel कॉन्फ़िगर करें",
  callingRelay: "Relay कॉल हो रहा है…",
  selectModelFirst: "पहले उपलब्ध मॉडल चुनें",
  requestFailed: "अनुरोध विफल। बाद में पुनः प्रयास करें।",
  errorPrefix: "(त्रुटि) ",



});

const id = fromEn({
  pageTitles: {
    chat: "Obrolan",
    image: "Pembuatan gambar",
    video: "Pembuatan video",
    tts: "Ucapan",
  },
  feeBannerBefore: "Pengalaman online dikenakan biaya. Lihat",
  modelDetails: "detail model",
  promptPlaceholder: "Masukkan prompt…",
  disclaimerBefore:
    "Konten dibuat AI dan mungkin tidak akurat. Hanya referensi. Patuhi",
  termsLink: "Perjanjian Pengguna",
  disclaimerAfter: "dan hukum yang berlaku",
  disclaimerUsageUnits: ". Kuota dipotong sesuai unit penggunaan.",
  noModels: "Tidak ada model tersedia",
  selectModel: "Pilih model",
  configureChannel: "Konfigurasi Channel di Admin terlebih dahulu",
  callingRelay: "Memanggil Relay…",
  selectModelFirst: "Pilih model yang tersedia terlebih dahulu",
  requestFailed: "Permintaan gagal. Coba lagi nanti.",
  errorPrefix: "(Kesalahan) ",



});

const PLAYGROUND_UI_COPY: Record<TargetLocale, PlaygroundUiCopy> = {
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

export function getPlaygroundUiCopy(locale: string): PlaygroundUiCopy {
  return pickTargetCatalog(locale, PLAYGROUND_UI_COPY);
}
