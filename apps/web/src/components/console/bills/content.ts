export const pageTitle = "费用明细";

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
  "弹性 GPU",
  "弹性 GPU 实例规格",
  "文本模型 · 批量推理",
  "文本模型 · 微调训练",
  "图片模型 · 在线推理",
  "语音模型 · 在线推理",
  "文本模型 · 在线推理",
  "视频模型 · 在线推理",
  "推理加速",
] as const;

export type CascaderNode = {
  label: string;
  value: string;
  children?: CascaderNode[];
};

/** Ant Cascader tree for 计费维度 (multi) */
export const dimensionCascaderOptions: CascaderNode[] = [
  {
    label: "全部地域",
    value: "全部地域",
    children: [
      { label: "广东一区", value: "广东一区" },
      { label: "上海一区", value: "上海一区" },
    ],
  },
  {
    label: "全部付费类型",
    value: "全部付费类型",
    children: [
      { label: "按需模式", value: "按需模式" },
      { label: "抢占模式", value: "抢占模式" },
    ],
  },
];

/** Sample 计费项 options (API returns empty when no usage in range) */
export const billingItemOptions = [
  "输入 Tokens",
  "输出 Tokens",
  "缓存命中 Tokens",
] as const;

export const allocationDimensionOptions = [
  "模型服务视图",
  "自定义视图",
] as const;

export const detailHeaders = [
  "计费周期",
  "费用流水ID",
  "费用发生时间",
  "计费项",
  "计费项原始用量",
  "资源包抵扣用量",
  "资源包抵扣后余量",
  "用量单位",
  "计费项单价",
  "计费金额",
  "折扣优惠金额",
  "代金券抵扣金额",
  "账单金额",
  "操作",
] as const;

export const allocationHeaders = [
  "API Key",
  "API Key 描述",
  "模型名称",
  "原始用量",
  "抵扣用量",
  "用量单位",
  "折扣优惠金额",
  "代金券抵扣金额",
  "账单金额",
] as const;

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
  emptyDetail: "暂无数据",
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
