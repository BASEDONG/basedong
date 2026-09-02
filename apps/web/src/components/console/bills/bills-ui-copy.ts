import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import type { PeriodType } from "./content";

export type BillsUiCopy = {
  pageTitle: string;
  periodLabels: Record<PeriodType, string>;
  allocationDimensionLabels: Record<string, string>;
  detailHeaders: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  productPlaceholder: string;
  dimensionPlaceholder: string;
  itemPlaceholder: string;
  startPlaceholder: string;
  endPlaceholder: string;
  allocationLabel: string;
  viewDetail: string;
  viewAllocation: string;
  exportRecords: string;
  export: string;
  emptyAllocation: string;
  emptyDetail: string;
  allocationUnsupported: string;
  usageHint: string;
  filterHint: string;
  quotaUsed: string;
  rpm: string;
  tpm: string;
  refresh: string;
  loading: string;
  totalCount: (n: number) => string;
  billAmount: string;
  chargeAmount: string;
  discountAmount: string;
  couponAmount: string;
  selectAll: string;
  exportModalTitle: string;
  exportModalAlert: string;
  exportToast: string;
  exportColTime: string;
  exportColName: string;
  exportColStatus: string;
  exportColAction: string;
  noData: string;
  loadFailed: string;
};

const zhCN: BillsUiCopy = {
  pageTitle: "账单",
  periodLabels: { month: "按月", day: "按天", minute: "按分钟" },
  allocationDimensionLabels: {
    模型服务视图: "模型服务视图",
    自定义视图: "自定义视图",
  },
  detailHeaders: [
    "时间",
    "请求 ID",
    "模型",
    "API Key",
    "输入词元",
    "输出词元",
    "扣减额度",
    "耗时",
  ],
  productPlaceholder: "请选择产品",
  dimensionPlaceholder: "请选择计费维度",
  itemPlaceholder: "请选择计费项",
  startPlaceholder: "开始时间",
  endPlaceholder: "结束时间",
  allocationLabel: "分摊维度",
  viewDetail: "明细",
  viewAllocation: "分摊",
  exportRecords: "查看导出记录",
  export: "导出",
  emptyAllocation: "请选择分摊维度进行查询",
  emptyDetail: "所选时间范围内暂无用量记录",
  allocationUnsupported:
    "分摊视图依赖 Backend 暂未提供的聚合账单能力；请使用「明细」查看词元用量与额度扣减。",
  usageHint:
    "账单明细来自 Backend 用量日志：按词元消耗扣减额度。Playground 与 API Key 调用均会计入。",
  filterHint: "按日期筛选用量日志（Backend /api/log/self）",
  quotaUsed: "区间扣减额度",
  rpm: "RPM",
  tpm: "TPM（词元/分）",
  refresh: "刷新",
  loading: "加载中…",
  totalCount: (n) => `共 ${n} 条用量记录`,
  billAmount: "账单金额",
  chargeAmount: "计费金额",
  discountAmount: "折扣优惠金额",
  couponAmount: "代金券抵扣金额",
  selectAll: "全部",
  exportModalTitle: "导出记录",
  exportModalAlert: "文件保留 7 天，请及时下载",
  exportToast: "文件正在导出，可在「导出记录」中查看进度并下载",
  exportColTime: "创建时间",
  exportColName: "任务名称",
  exportColStatus: "状态",
  exportColAction: "操作",
  noData: "暂无数据",
  loadFailed: "加载用量失败",
};

const en: BillsUiCopy = {
  pageTitle: "Bills",
  periodLabels: { month: "By month", day: "By day", minute: "By minute" },
  allocationDimensionLabels: {
    模型服务视图: "Model service view",
    自定义视图: "Custom view",
  },
  detailHeaders: [
    "Time",
    "Request ID",
    "Model",
    "API Key",
    "Input units",
    "Output units",
    "Quota used",
    "Duration",
  ],
  productPlaceholder: "Select product",
  dimensionPlaceholder: "Select billing dimension",
  itemPlaceholder: "Select billing item",
  startPlaceholder: "Start date",
  endPlaceholder: "End date",
  allocationLabel: "Allocation dimension",
  viewDetail: "Detail",
  viewAllocation: "Allocation",
  exportRecords: "Export history",
  export: "Export",
  emptyAllocation: "Select an allocation dimension to query",
  emptyDetail: "No usage records in the selected range",
  allocationUnsupported:
    "Allocation view requires aggregated billing not yet provided by Backend; use Detail for usage units and quota deductions.",
  usageHint:
    "Bill detail comes from Backend usage logs: quota is deducted by usage units consumed. Playground and API Key calls are included.",
  filterHint: "Filter usage logs by date (Backend /api/log/self)",
  quotaUsed: "Quota used in range",
  rpm: "RPM",
  tpm: "TPM (units/min)",
  refresh: "Refresh",
  loading: "Loading…",
  totalCount: (n) => `${n} usage record${n === 1 ? "" : "s"}`,
  billAmount: "Bill amount",
  chargeAmount: "Charge amount",
  discountAmount: "Discount",
  couponAmount: "Coupon applied",
  selectAll: "All",
  exportModalTitle: "Export history",
  exportModalAlert: "Files are kept for 7 days — download promptly",
  exportToast: "Export started — check Export history for progress",
  exportColTime: "Created",
  exportColName: "Task name",
  exportColStatus: "Status",
  exportColAction: "Action",
  noData: "No data",
  loadFailed: "Failed to load usage",
};

const zhTW: BillsUiCopy = {
  ...zhCN,
  pageTitle: "帳單",
  periodLabels: { month: "按月", day: "按天", minute: "按分鐘" },
  allocationDimensionLabels: {
    模型服务视图: "模型服務視圖",
    自定义视图: "自訂視圖",
  },
  detailHeaders: [
    "時間",
    "請求 ID",
    "模型",
    "API Key",
    "輸入詞元",
    "輸出詞元",
    "扣減額度",
    "耗時",
  ],
  productPlaceholder: "請選擇產品",
  dimensionPlaceholder: "請選擇計費維度",
  itemPlaceholder: "請選擇計費項",
  startPlaceholder: "開始時間",
  endPlaceholder: "結束時間",
  allocationLabel: "分攤維度",
  viewDetail: "明細",
  viewAllocation: "分攤",
  exportRecords: "查看匯出記錄",
  export: "匯出",
  emptyAllocation: "請選擇分攤維度進行查詢",
  emptyDetail: "所選時間範圍內暫無用量記錄",
  allocationUnsupported:
    "分攤視圖依賴 Backend 暫未提供的聚合帳單能力；請使用「明細」查看詞元用量與額度扣減。",
  usageHint:
    "帳單明細來自 Backend 用量日誌：按詞元消耗扣減額度。Playground 與 API Key 呼叫均會計入。",
  filterHint: "按日期篩選用量日誌（Backend /api/log/self）",
  quotaUsed: "區間扣減額度",
  tpm: "TPM（詞元/分）",
  loading: "載入中…",
  totalCount: (n) => `共 ${n} 條用量記錄`,
  billAmount: "帳單金額",
  chargeAmount: "計費金額",
  discountAmount: "折扣優惠金額",
  couponAmount: "代金券抵扣金額",
  selectAll: "全部",
  exportModalTitle: "匯出記錄",
  exportModalAlert: "檔案保留 7 天，請及時下載",
  exportToast: "檔案正在匯出，可在「匯出記錄」中查看進度並下載",
  exportColTime: "建立時間",
  exportColName: "任務名稱",
  exportColStatus: "狀態",
  exportColAction: "操作",
  noData: "暫無資料",
  loadFailed: "載入用量失敗",
};

function fromEn(partial: Partial<BillsUiCopy>): BillsUiCopy {
  return {
    ...en,
    ...partial,
    periodLabels: { ...en.periodLabels, ...partial.periodLabels },
    allocationDimensionLabels: {
      ...en.allocationDimensionLabels,
      ...partial.allocationDimensionLabels,
    },
    detailHeaders: partial.detailHeaders ?? en.detailHeaders,
  };
}

const ja = fromEn({
  pageTitle: "請求書",
  periodLabels: { month: "月別", day: "日別", minute: "分別" },
  allocationDimensionLabels: {
    模型服务视图: "モデルサービスビュー",
    自定义视图: "カスタムビュー",
  },
  detailHeaders: [
    "時刻",
    "リクエスト ID",
    "モデル",
    "API Key",
    "入力単位",
    "出力単位",
    "差引枠",
    "所要時間",
  ],
  viewDetail: "明細",
  viewAllocation: "按分",
  usageHint:
    "請求明細は Backend 利用ログから取得。利用単位に応じて枠が差し引かれます。",
  quotaUsed: "期間差引枠",
  tpm: "TPM（単位/分）",
  loading: "読み込み中…",
  totalCount: (n) => `利用記録 ${n} 件`,
  refresh: "更新",
  loadFailed: "利用量の読み込みに失敗しました",
});

const fr = fromEn({
  pageTitle: "Factures",
  periodLabels: { month: "Par mois", day: "Par jour", minute: "Par minute" },
  allocationDimensionLabels: {
    模型服务视图: "Vue service modèle",
    自定义视图: "Vue personnalisée",
  },
  detailHeaders: [
    "Heure",
    "ID requête",
    "Modèle",
    "API Key",
    "Unités entrée",
    "Unités sortie",
    "Quota déduit",
    "Durée",
  ],
  loadFailed: "Échec du chargement de l'utilisation",
});

const ru = fromEn({
  pageTitle: "Счета",
  periodLabels: { month: "По месяцам", day: "По дням", minute: "По минутам" },
  allocationDimensionLabels: {
    模型服务视图: "Представление модели",
    自定义视图: "Пользовательское",
  },
  detailHeaders: [
    "Время",
    "ID запроса",
    "Модель",
    "API Key",
    "Вход. ед.",
    "Выход. ед.",
    "Списано",
    "Длительность",
  ],
  loadFailed: "Не удалось загрузить использование",
});

const vi = fromEn({
  pageTitle: "Hóa đơn",
  periodLabels: { month: "Theo tháng", day: "Theo ngày", minute: "Theo phút" },
  allocationDimensionLabels: {
    模型服务视图: "Khung dịch vụ mô hình",
    自定义视图: "Khung tùy chỉnh",
  },
  loadFailed: "Không tải được mức sử dụng",
});

const ko = fromEn({
  pageTitle: "청구서",
  periodLabels: { month: "월별", day: "일별", minute: "분별" },
  allocationDimensionLabels: {
    模型服务视图: "모델 서비스 보기",
    自定义视图: "사용자 보기",
  },
  detailHeaders: [
    "시간",
    "요청 ID",
    "모델",
    "API Key",
    "입력 단위",
    "출력 단위",
    "차감 한도",
    "소요 시간",
  ],
  loadFailed: "사용량을 불러오지 못했습니다",
});

const de = fromEn({
  pageTitle: "Rechnungen",
  periodLabels: { month: "Monatlich", day: "Täglich", minute: "Minütlich" },
  allocationDimensionLabels: {
    模型服务视图: "Modellservice-Ansicht",
    自定义视图: "Benutzerdefiniert",
  },
  loadFailed: "Nutzung konnte nicht geladen werden",
});

const es = fromEn({
  pageTitle: "Facturas",
  periodLabels: { month: "Por mes", day: "Por día", minute: "Por minuto" },
  allocationDimensionLabels: {
    模型服务视图: "Vista de servicio",
    自定义视图: "Vista personalizada",
  },
  loadFailed: "No se pudo cargar el uso",
});

const ptBR = fromEn({
  pageTitle: "Faturas",
  periodLabels: { month: "Por mês", day: "Por dia", minute: "Por minuto" },
  allocationDimensionLabels: {
    模型服务视图: "Visão do serviço",
    自定义视图: "Visão personalizada",
  },
  loadFailed: "Falha ao carregar uso",
});

const ar = fromEn({
  pageTitle: "الفواتير",
  periodLabels: { month: "شهريًا", day: "يوميًا", minute: "بالدقيقة" },
  allocationDimensionLabels: {
    模型服务视图: "عرض خدمة النموذج",
    自定义视图: "عرض مخصص",
  },
  loadFailed: "تعذّر تحميل الاستخدام",
});

const hi = fromEn({
  pageTitle: "बिल",
  periodLabels: { month: "महीने के अनुसार", day: "दिन के अनुसार", minute: "मिनट के अनुसार" },
  allocationDimensionLabels: {
    模型服务视图: "मॉडल सेवा दृश्य",
    自定义视图: "कस्टम दृश्य",
  },
  loadFailed: "उपयोग लोड नहीं हो सका",
});

const id = fromEn({
  pageTitle: "Tagihan",
  periodLabels: { month: "Per bulan", day: "Per hari", minute: "Per menit" },
  allocationDimensionLabels: {
    模型服务视图: "Tampilan layanan model",
    自定义视图: "Tampilan kustom",
  },
  loadFailed: "Gagal memuat penggunaan",
});

const BILLS_UI_COPY: Record<TargetLocale, BillsUiCopy> = {
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

export function getBillsUiCopy(locale: string): BillsUiCopy {
  return pickTargetCatalog(locale, BILLS_UI_COPY);
}

export function getPeriodOptions(locale: string) {
  const copy = getBillsUiCopy(locale);
  return (["month", "day", "minute"] as const).map((value) => ({
    value,
    label: copy.periodLabels[value],
  }));
}

export function getAllocationDimensionKeys(): readonly string[] {
  return ["模型服务视图", "自定义视图"] as const;
}

export function labelAllocationDimension(
  locale: string,
  key: string,
): string {
  const copy = getBillsUiCopy(locale);
  return copy.allocationDimensionLabels[key] ?? key;
}

export function getExportRecordHeaders(
  locale: string,
): [string, string, string, string] {
  const copy = getBillsUiCopy(locale);
  return [
    copy.exportColTime,
    copy.exportColName,
    copy.exportColStatus,
    copy.exportColAction,
  ];
}
