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
  noData: string;
  noModels: string;
  selectModel: string;
  configureChannel: string;
  callingRelay: string;
  selectModelFirst: string;
  requestFailed: string;
  errorPrefix: string;
  thinkingOff: string;
  thinkingOn: string;
  enableThinking: string;
  addCompareModel: string;
  notConnectedImage: string;
  notConnectedVideo: string;
  notConnectedTts: string;
  addImage: string;
  speed: string;
  gain: string;
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
  noData: "无数据",
  noModels: "暂无可用模型",
  selectModel: "选择模型",
  configureChannel: "请先在 Admin 配置 Channel",
  callingRelay: "正在调用 Relay…",
  selectModelFirst: "请先选择可用模型",
  requestFailed: "请求失败，请稍后重试",
  errorPrefix: "（错误）",
  thinkingOff: "关闭",
  thinkingOn: "开启",
  enableThinking: "Enable Thinking",
  addCompareModel: "添加对比模型",
  notConnectedImage:
    "图像生成尚未接入 basedong Relay。请使用对话 Playground，或通过 API Key 调用已支持的 /v1 接口。",
  notConnectedVideo:
    "视频生成尚未接入 basedong Relay。请使用对话 Playground，或通过 API Key 调用已支持的 /v1 接口。",
  notConnectedTts:
    "语音合成尚未接入 basedong Relay。请使用对话 Playground，或通过 API Key 调用已支持的 /v1 接口。",
  addImage: "Add Image",
  speed: "倍速",
  gain: "音量增益 (dB)",
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
  noData: "No data",
  noModels: "No models available",
  selectModel: "Select a model",
  configureChannel: "Configure a Channel in Admin first",
  callingRelay: "Calling Relay…",
  selectModelFirst: "Select an available model first",
  requestFailed: "Request failed. Try again later.",
  errorPrefix: "(Error) ",
  thinkingOff: "Off",
  thinkingOn: "On",
  enableThinking: "Enable Thinking",
  addCompareModel: "Compare models",
  notConnectedImage:
    "Image generation is not yet connected to the basedong Relay. Use Chat Playground, or call supported /v1 APIs with an API Key.",
  notConnectedVideo:
    "Video generation is not yet connected to the basedong Relay. Use Chat Playground, or call supported /v1 APIs with an API Key.",
  notConnectedTts:
    "Speech synthesis is not yet connected to the basedong Relay. Use Chat Playground, or call supported /v1 APIs with an API Key.",
  addImage: "Add Image",
  speed: "Speed",
  gain: "Volume gain (dB)",
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
  noData: "無資料",
  noModels: "暫無可用模型",
  selectModel: "選擇模型",
  configureChannel: "請先在 Admin 設定 Channel",
  callingRelay: "正在呼叫 Relay…",
  selectModelFirst: "請先選擇可用模型",
  requestFailed: "請求失敗，請稍後重試",
  errorPrefix: "（錯誤）",
  thinkingOff: "關閉",
  thinkingOn: "開啟",
  addCompareModel: "新增對比模型",
  notConnectedImage:
    "圖像生成尚未接入 basedong Relay。請使用對話 Playground，或透過 API Key 呼叫已支援的 /v1 介面。",
  notConnectedVideo:
    "影片生成尚未接入 basedong Relay。請使用對話 Playground，或透過 API Key 呼叫已支援的 /v1 介面。",
  notConnectedTts:
    "語音合成尚未接入 basedong Relay。請使用對話 Playground，或透過 API Key 呼叫已支援的 /v1 介面。",
  speed: "倍速",
  gain: "音量增益 (dB)",
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
  noData: "データなし",
  noModels: "利用可能なモデルがありません",
  selectModel: "モデルを選択",
  configureChannel: "先に Admin で Channel を設定してください",
  callingRelay: "Relay を呼び出し中…",
  selectModelFirst: "先に利用可能なモデルを選択してください",
  requestFailed: "リクエストに失敗しました。後でもう一度お試しください。",
  errorPrefix: "（エラー）",
  thinkingOff: "オフ",
  thinkingOn: "オン",
  addCompareModel: "比較モデルを追加",
  notConnectedImage:
    "画像生成はまだ basedong Relay に接続されていません。チャット Playground を使うか、API Key で対応済み /v1 API を呼び出してください。",
  notConnectedVideo:
    "動画生成はまだ basedong Relay に接続されていません。チャット Playground を使うか、API Key で対応済み /v1 API を呼び出してください。",
  notConnectedTts:
    "音声合成はまだ basedong Relay に接続されていません。チャット Playground を使うか、API Key で対応済み /v1 API を呼び出してください。",
  addImage: "画像を追加",
  speed: "速度",
  gain: "音量ゲイン (dB)",
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
  noData: "Aucune donnée",
  noModels: "Aucun modèle disponible",
  selectModel: "Sélectionner un modèle",
  configureChannel: "Configurez d'abord un Channel dans Admin",
  callingRelay: "Appel du Relay…",
  selectModelFirst: "Sélectionnez d'abord un modèle disponible",
  requestFailed: "Échec de la requête. Réessayez plus tard.",
  errorPrefix: "(Erreur) ",
  thinkingOff: "Désactivé",
  thinkingOn: "Activé",
  addCompareModel: "Comparer des modèles",
  notConnectedImage:
    "La génération d'images n'est pas encore connectée au Relay basedong. Utilisez le Chat Playground ou les API /v1 prises en charge avec une API Key.",
  notConnectedVideo:
    "La génération vidéo n'est pas encore connectée au Relay basedong. Utilisez le Chat Playground ou les API /v1 prises en charge avec une API Key.",
  notConnectedTts:
    "La synthèse vocale n'est pas encore connectée au Relay basedong. Utilisez le Chat Playground ou les API /v1 prises en charge avec une API Key.",
  addImage: "Ajouter une image",
  speed: "Vitesse",
  gain: "Gain volume (dB)",
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
  noData: "Нет данных",
  noModels: "Нет доступных моделей",
  selectModel: "Выберите модель",
  configureChannel: "Сначала настройте Channel в Admin",
  callingRelay: "Вызов Relay…",
  selectModelFirst: "Сначала выберите доступную модель",
  requestFailed: "Запрос не выполнен. Попробуйте позже.",
  errorPrefix: "(Ошибка) ",
  thinkingOff: "Выкл.",
  thinkingOn: "Вкл.",
  addCompareModel: "Сравнить модели",
  notConnectedImage:
    "Генерация изображений ещё не подключена к Relay basedong. Используйте чат Playground или поддерживаемые /v1 API с API Key.",
  notConnectedVideo:
    "Генерация видео ещё не подключена к Relay basedong. Используйте чат Playground или поддерживаемые /v1 API с API Key.",
  notConnectedTts:
    "Синтез речи ещё не подключён к Relay basedong. Используйте чат Playground или поддерживаемые /v1 API с API Key.",
  addImage: "Добавить изображение",
  speed: "Скорость",
  gain: "Усиление громкости (дБ)",
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
  noData: "Không có dữ liệu",
  noModels: "Chưa có mô hình",
  selectModel: "Chọn mô hình",
  configureChannel: "Hãy cấu hình Channel trong Admin trước",
  callingRelay: "Đang gọi Relay…",
  selectModelFirst: "Hãy chọn mô hình trước",
  requestFailed: "Yêu cầu thất bại. Thử lại sau.",
  errorPrefix: "(Lỗi) ",
  thinkingOff: "Tắt",
  thinkingOn: "Bật",
  addCompareModel: "So sánh mô hình",
  notConnectedImage:
    "Tạo ảnh chưa kết nối basedong Relay. Dùng Chat Playground hoặc gọi API /v1 hỗ trợ bằng API Key.",
  notConnectedVideo:
    "Tạo video chưa kết nối basedong Relay. Dùng Chat Playground hoặc gọi API /v1 hỗ trợ bằng API Key.",
  notConnectedTts:
    "Tổng hợp giọng nói chưa kết nối basedong Relay. Dùng Chat Playground hoặc gọi API /v1 hỗ trợ bằng API Key.",
  addImage: "Thêm ảnh",
  speed: "Tốc độ",
  gain: "Khuếch đại âm lượng (dB)",
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
  noData: "데이터 없음",
  noModels: "사용 가능한 모델 없음",
  selectModel: "모델 선택",
  configureChannel: "먼저 Admin에서 Channel을 구성하세요",
  callingRelay: "Relay 호출 중…",
  selectModelFirst: "먼저 사용 가능한 모델을 선택하세요",
  requestFailed: "요청에 실패했습니다. 나중에 다시 시도하세요.",
  errorPrefix: "(오류) ",
  thinkingOff: "끔",
  thinkingOn: "켬",
  addCompareModel: "비교 모델 추가",
  notConnectedImage:
    "이미지 생성은 아직 basedong Relay에 연결되지 않았습니다. 채팅 Playground를 사용하거나 API Key로 지원되는 /v1 API를 호출하세요.",
  notConnectedVideo:
    "비디오 생성은 아직 basedong Relay에 연결되지 않았습니다. 채팅 Playground를 사용하거나 API Key로 지원되는 /v1 API를 호출하세요.",
  notConnectedTts:
    "음성 합성은 아직 basedong Relay에 연결되지 않았습니다. 채팅 Playground를 사용하거나 API Key로 지원되는 /v1 API를 호출하세요.",
  addImage: "이미지 추가",
  speed: "배속",
  gain: "음량 게인 (dB)",
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
  noData: "Keine Daten",
  noModels: "Keine Modelle verfügbar",
  selectModel: "Modell auswählen",
  configureChannel: "Konfigurieren Sie zuerst einen Channel in Admin",
  callingRelay: "Relay wird aufgerufen…",
  selectModelFirst: "Wählen Sie zuerst ein verfügbares Modell",
  requestFailed: "Anfrage fehlgeschlagen. Später erneut versuchen.",
  errorPrefix: "(Fehler) ",
  thinkingOff: "Aus",
  thinkingOn: "An",
  addCompareModel: "Modelle vergleichen",
  notConnectedImage:
    "Bildgenerierung ist noch nicht mit dem basedong Relay verbunden. Nutzen Sie den Chat-Playground oder unterstützte /v1-APIs mit einem API Key.",
  notConnectedVideo:
    "Videogenerierung ist noch nicht mit dem basedong Relay verbunden. Nutzen Sie den Chat-Playground oder unterstützte /v1-APIs mit einem API Key.",
  notConnectedTts:
    "Sprachsynthese ist noch nicht mit dem basedong Relay verbunden. Nutzen Sie den Chat-Playground oder unterstützte /v1-APIs mit einem API Key.",
  addImage: "Bild hinzufügen",
  speed: "Geschwindigkeit",
  gain: "Lautstärke-Gain (dB)",
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
  noData: "Sin datos",
  noModels: "No hay modelos",
  selectModel: "Seleccionar modelo",
  configureChannel: "Configure primero un Channel en Admin",
  callingRelay: "Llamando a Relay…",
  selectModelFirst: "Seleccione primero un modelo disponible",
  requestFailed: "La solicitud falló. Inténtelo más tarde.",
  errorPrefix: "(Error) ",
  thinkingOff: "Desactivado",
  thinkingOn: "Activado",
  addCompareModel: "Comparar modelos",
  notConnectedImage:
    "La generación de imágenes aún no está conectada al Relay basedong. Use el Chat Playground o las API /v1 compatibles con una API Key.",
  notConnectedVideo:
    "La generación de vídeo aún no está conectada al Relay basedong. Use el Chat Playground o las API /v1 compatibles con una API Key.",
  notConnectedTts:
    "La síntesis de voz aún no está conectada al Relay basedong. Use el Chat Playground o las API /v1 compatibles con una API Key.",
  addImage: "Añadir imagen",
  speed: "Velocidad",
  gain: "Ganancia de volumen (dB)",
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
  noData: "Sem dados",
  noModels: "Nenhum modelo disponível",
  selectModel: "Selecionar modelo",
  configureChannel: "Configure primeiro um Channel no Admin",
  callingRelay: "Chamando Relay…",
  selectModelFirst: "Selecione primeiro um modelo disponível",
  requestFailed: "Falha na solicitação. Tente mais tarde.",
  errorPrefix: "(Erro) ",
  thinkingOff: "Desligado",
  thinkingOn: "Ligado",
  addCompareModel: "Comparar modelos",
  notConnectedImage:
    "A geração de imagens ainda não está conectada ao Relay basedong. Use o Chat Playground ou as APIs /v1 suportadas com uma API Key.",
  notConnectedVideo:
    "A geração de vídeo ainda não está conectada ao Relay basedong. Use o Chat Playground ou as APIs /v1 suportadas com uma API Key.",
  notConnectedTts:
    "A síntese de fala ainda não está conectada ao Relay basedong. Use o Chat Playground ou as APIs /v1 suportadas com uma API Key.",
  addImage: "Adicionar imagem",
  speed: "Velocidade",
  gain: "Ganho de volume (dB)",
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
  noData: "لا توجد بيانات",
  noModels: "لا توجد نماذج متاحة",
  selectModel: "اختر نموذجًا",
  configureChannel: "قم بتهيئة Channel في Admin أولًا",
  callingRelay: "جارٍ استدعاء Relay…",
  selectModelFirst: "اختر نموذجًا متاحًا أولًا",
  requestFailed: "فشل الطلب. حاول لاحقًا.",
  errorPrefix: "(خطأ) ",
  thinkingOff: "إيقاف",
  thinkingOn: "تشغيل",
  addCompareModel: "مقارنة النماذج",
  notConnectedImage:
    "توليد الصور غير متصل بعد بـ Relay basedong. استخدم محادثة Playground أو واجهات /v1 المدعومة بمفتاح API.",
  notConnectedVideo:
    "توليد الفيديو غير متصل بعد بـ Relay basedong. استخدم محادثة Playground أو واجهات /v1 المدعومة بمفتاح API.",
  notConnectedTts:
    "تحويل النص إلى كلام غير متصل بعد بـ Relay basedong. استخدم محادثة Playground أو واجهات /v1 المدعومة بمفتاح API.",
  addImage: "إضافة صورة",
  speed: "السرعة",
  gain: "كسب الصوت (ديسيبل)",
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
  noData: "कोई डेटा नहीं",
  noModels: "कोई मॉडल उपलब्ध नहीं",
  selectModel: "मॉडल चुनें",
  configureChannel: "पहले Admin में Channel कॉन्फ़िगर करें",
  callingRelay: "Relay कॉल हो रहा है…",
  selectModelFirst: "पहले उपलब्ध मॉडल चुनें",
  requestFailed: "अनुरोध विफल। बाद में पुनः प्रयास करें।",
  errorPrefix: "(त्रुटि) ",
  thinkingOff: "बंद",
  thinkingOn: "चालू",
  addCompareModel: "मॉडल तुलना करें",
  notConnectedImage:
    "छवि निर्माण अभी basedong Relay से जुड़ा नहीं है। चैट Playground उपयोग करें या API Key से समर्थित /v1 API कॉल करें।",
  notConnectedVideo:
    "वीडियो निर्माण अभी basedong Relay से जुड़ा नहीं है। चैट Playground उपयोग करें या API Key से समर्थित /v1 API कॉल करें।",
  notConnectedTts:
    "वाक् संश्लेषण अभी basedong Relay से जुड़ा नहीं है। चैट Playground उपयोग करें या API Key से समर्थित /v1 API कॉल करें।",
  addImage: "छवि जोड़ें",
  speed: "गति",
  gain: "वॉल्यूम गेन (dB)",
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
  noData: "Tidak ada data",
  noModels: "Tidak ada model tersedia",
  selectModel: "Pilih model",
  configureChannel: "Konfigurasi Channel di Admin terlebih dahulu",
  callingRelay: "Memanggil Relay…",
  selectModelFirst: "Pilih model yang tersedia terlebih dahulu",
  requestFailed: "Permintaan gagal. Coba lagi nanti.",
  errorPrefix: "(Kesalahan) ",
  thinkingOff: "Mati",
  thinkingOn: "Nyala",
  addCompareModel: "Bandingkan model",
  notConnectedImage:
    "Pembuatan gambar belum terhubung ke Relay basedong. Gunakan Chat Playground atau panggil API /v1 yang didukung dengan API Key.",
  notConnectedVideo:
    "Pembuatan video belum terhubung ke Relay basedong. Gunakan Chat Playground atau panggil API /v1 yang didukung dengan API Key.",
  notConnectedTts:
    "Sintesis ucapan belum terhubung ke Relay basedong. Gunakan Chat Playground atau panggil API /v1 yang didukung dengan API Key.",
  addImage: "Tambah gambar",
  speed: "Kecepatan",
  gain: "Gain volume (dB)",
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
