import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";
import type { PriceRow } from "./content";

export type BatchesUiCopy = {
  pageTitle: string;
  createTask: string;
  referenceDocs: string;
  drawerTitle: string;
  closeOverlay: string;
  close: string;
  copy: string;
  taskName: string;
  taskNamePlaceholder: string;
  taskDesc: string;
  taskDescPlaceholder: string;
  inputFile: string;
  selectInputFile: string;
  noData: string;
  uploadDataset: string;
  taskModel: string;
  feature: string;
  price: string;
  tokens: string;
  completionWindow: string;
  hours: string;
  priceDisclaimer: string;
  completionNotes: readonly string[];
  priceFeatures: {
    cachedInput: string;
    input: string;
    output: string;
  };
};

const zhCN: BatchesUiCopy = {
  pageTitle: "批量推理",
  createTask: "新建批量推理任务",
  referenceDocs: "参考文档",
  drawerTitle: "新建批量推理任务",
  closeOverlay: "关闭遮罩",
  close: "关闭",
  copy: "复制",
  taskName: "任务名称",
  taskNamePlaceholder: "任务名称",
  taskDesc: "任务描述",
  taskDescPlaceholder: "任务描述",
  inputFile: "输入文件",
  selectInputFile: "请选择输入文件",
  noData: "暂无数据",
  uploadDataset: "上传新的数据集（jsonl 文件）",
  taskModel: "任务模型",
  feature: "功能",
  price: "价格",
  tokens: "Tokens",
  completionWindow: "完成时间窗口",
  hours: "小时",
  priceDisclaimer:
    "实际执行价格以任务执行时每个请求实际完成时间的实时生效价格为准",
  completionNotes: [
    "完成时间窗口从任务创建开始计算；",
    "若任务在设定时间窗口内未能开始，或未能全部执行完毕，该任务将被自动终止并置为超时（expired）状态，输入文件中未处理的请求将被置为失败，您可以在失败文件中获得具体的明细信息；",
  ],
  priceFeatures: {
    cachedInput: "缓存命中 tokens",
    input: "输入 tokens",
    output: "输出 tokens",
  },
};

const en: BatchesUiCopy = {
  pageTitle: "Batch inference",
  createTask: "New batch job",
  referenceDocs: "Documentation",
  drawerTitle: "New batch job",
  closeOverlay: "Close overlay",
  close: "Close",
  copy: "Copy",
  taskName: "Job name",
  taskNamePlaceholder: "Job name",
  taskDesc: "Description",
  taskDescPlaceholder: "Description",
  inputFile: "Input file",
  selectInputFile: "Select an input file",
  noData: "No data",
  uploadDataset: "Upload a new dataset (.jsonl)",
  taskModel: "Model",
  feature: "Feature",
  price: "Price",
  tokens: "Tokens",
  completionWindow: "Completion window",
  hours: "hours",
  priceDisclaimer:
    "Actual pricing applies at the time each request completes during job execution.",
  completionNotes: [
    "The completion window starts when the job is created.",
    "If the job does not start or finish within the window, it is marked expired; unprocessed requests in the input file fail and details appear in the failure output.",
  ],
  priceFeatures: {
    cachedInput: "Cached input tokens",
    input: "Input tokens",
    output: "Output tokens",
  },
};

const zhTW: BatchesUiCopy = {
  ...zhCN,
  pageTitle: "批量推理",
  createTask: "新建批量推理任務",
  referenceDocs: "參考文件",
  drawerTitle: "新建批量推理任務",
  closeOverlay: "關閉遮罩",
  close: "關閉",
  copy: "複製",
  taskName: "任務名稱",
  taskNamePlaceholder: "任務名稱",
  taskDesc: "任務描述",
  taskDescPlaceholder: "任務描述",
  inputFile: "輸入檔案",
  selectInputFile: "請選擇輸入檔案",
  noData: "暫無資料",
  uploadDataset: "上傳新的資料集（jsonl 檔案）",
  taskModel: "任務模型",
  feature: "功能",
  price: "價格",
  completionWindow: "完成時間窗口",
  hours: "小時",
  priceDisclaimer:
    "實際執行價格以任務執行時每個請求實際完成時間的即時生效價格為準",
  completionNotes: [
    "完成時間窗口從任務建立開始計算；",
    "若任務在設定時間窗口內未能開始，或未能全部執行完畢，該任務將被自動終止並置為逾時（expired）狀態，輸入檔案中未處理的請求將被置為失敗，您可以在失敗檔案中獲得具體的明細資訊；",
  ],
  priceFeatures: {
    cachedInput: "快取命中 tokens",
    input: "輸入 tokens",
    output: "輸出 tokens",
  },
};

function fromEn(partial: Partial<BatchesUiCopy>): BatchesUiCopy {
  return {
    ...en,
    ...partial,
    priceFeatures: { ...en.priceFeatures, ...partial.priceFeatures },
    completionNotes: partial.completionNotes ?? en.completionNotes,
  };
}

const ja = fromEn({
  pageTitle: "バッチ推論",
  createTask: "新規バッチジョブ",
  referenceDocs: "ドキュメント",
  noData: "データなし",
  uploadDataset: "新しいデータセットをアップロード（.jsonl）",
});

const fr = fromEn({
  pageTitle: "Inférence par lot",
  createTask: "Nouveau job batch",
  referenceDocs: "Documentation",
});

const ru = fromEn({
  pageTitle: "Пакетный вывод",
  createTask: "Новая пакетная задача",
  referenceDocs: "Документация",
});

const vi = fromEn({
  pageTitle: "Suy luận hàng loạt",
  createTask: "Tạo job batch mới",
  referenceDocs: "Tài liệu",
});

const ko = fromEn({
  pageTitle: "배치 추론",
  createTask: "새 배치 작업",
  referenceDocs: "문서",
});

const de = fromEn({
  pageTitle: "Batch-Inferenz",
  createTask: "Neuer Batch-Job",
  referenceDocs: "Dokumentation",
});

const es = fromEn({
  pageTitle: "Inferencia por lotes",
  createTask: "Nuevo trabajo batch",
  referenceDocs: "Documentación",
});

const ptBR = fromEn({
  pageTitle: "Inferência em lote",
  createTask: "Novo job em lote",
  referenceDocs: "Documentação",
});

const ar = fromEn({
  pageTitle: "استنتاج دفعي",
  createTask: "مهمة دفعية جديدة",
  referenceDocs: "الوثائق",
});

const hi = fromEn({
  pageTitle: "बैच इन्फ़रेंस",
  createTask: "नया बैच जॉब",
  referenceDocs: "दस्तावेज़",
});

const id = fromEn({
  pageTitle: "Inferensi batch",
  createTask: "Job batch baru",
  referenceDocs: "Dokumentasi",
});

const BATCHES_UI_COPY: Record<TargetLocale, BatchesUiCopy> = {
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

export function getBatchesUiCopy(locale: string): BatchesUiCopy {
  return pickTargetCatalog(locale, BATCHES_UI_COPY);
}

export function getDefaultPriceRows(locale: string): PriceRow[] {
  const copy = getBatchesUiCopy(locale);
  return [
    {
      feature: copy.priceFeatures.cachedInput,
      pricePerK: 0,
      meterId: "batch.cached-input-tokens",
    },
    {
      feature: copy.priceFeatures.input,
      pricePerK: 0,
      meterId: "batch.input-tokens",
    },
    {
      feature: copy.priceFeatures.output,
      pricePerK: 0,
      meterId: "batch.output-tokens",
    },
  ];
}
