import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type TaskLogsUiCopy = {
  drawingTitle: string;
  tasksTitle: string;
  empty: string;
  loadFailed: string;
  colId: string;
  colStatus: string;
  colPlatform: string;
  colProgress: string;
};

const zhCN: TaskLogsUiCopy = {
  drawingTitle: "绘图记录",
  tasksTitle: "异步任务",
  empty: "暂无记录。",
  loadFailed: "加载失败",
  colId: "任务 ID",
  colStatus: "状态",
  colPlatform: "平台",
  colProgress: "进度",
};

const en: TaskLogsUiCopy = {
  drawingTitle: "Drawing records",
  tasksTitle: "Async tasks",
  empty: "No records yet.",
  loadFailed: "Failed to load",
  colId: "Task ID",
  colStatus: "Status",
  colPlatform: "Platform",
  colProgress: "Progress",
};

const CATALOG: Record<TargetLocale, TaskLogsUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": { ...zhCN, drawingTitle: "繪圖記錄", tasksTitle: "非同步任務", empty: "暫無記錄。", loadFailed: "載入失敗" },
  ja: { ...en, drawingTitle: "描画記録", tasksTitle: "非同期タスク", empty: "記録がありません。", loadFailed: "読み込みに失敗しました" },
  fr: en,
  ru: en,
  vi: en,
  ko: en,
  de: en,
  es: en,
  "pt-BR": en,
  ar: en,
  hi: en,
  id: en,
};

export function getTaskLogsUiCopy(locale: string): TaskLogsUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
