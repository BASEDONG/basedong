export const pageTitle = "账单";

export const ASSET = {
  empty: "/assets/console/bills/images/no-gpus.svg",
} as const;

export type PeriodType = "month" | "day" | "minute";
export type ViewMode = "detail" | "allocation";

export const periodOptions: { value: PeriodType; label: string }[] = [
  { value: "month", label: "按月" },
  { value: "day", label: "按天" },
  { value: "minute", label: "按分钟" },
];

export const productOptions = [
  "文本模型 · 在线推理",
] as const;

export type CascaderNode = {
  label: string;
  value: string;
  children?: CascaderNode[];
};

export const dimensionCascaderOptions: CascaderNode[] = [];

export const billingItemOptions = [
  "输入词元",
  "输出词元",
] as const;

export const allocationDimensionOptions = [
  "模型服务视图",
  "自定义视图",
] as const;

/** Usage log columns (Backend /api/log/self). */
export const detailHeaders = [
  "时间",
  "请求 ID",
  "模型",
  "API Key",
  "输入词元",
  "输出词元",
  "扣减额度",
  "耗时",
] as const;

export const allocationHeaders = detailHeaders;

export const copy = {
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
  totalCount: (n: number) => `共 ${n} 条用量记录`,
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
} as const;

export const exportRecordHeaders = [
  copy.exportColTime,
  copy.exportColName,
  copy.exportColStatus,
  copy.exportColAction,
] as const;

export type AmountSummary = {
  bill: number;
  charge: number;
  discount: number;
  coupon: number;
};

export const defaultAmounts: AmountSummary = {
  bill: 0,
  charge: 0,
  discount: 0,
  coupon: 0,
};

export function formatYuan(n: number) {
  return `¥ ${n.toFixed(2)}`;
}

export function formatDateISO(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
