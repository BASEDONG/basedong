import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type TaskLogsUiCopy = {
  drawingTitle: string;
  tasksTitle: string;
  empty: string;
  loadFailed: string;
  colId: string;
  colTime: string;
  colStatus: string;
  colPlatform: string;
  colProgress: string;
  colFailReason: string;
  refresh: string;
  startDate: string;
  endDate: string;
  search: string;
  mjId: string;
  mjIdPlaceholder: string;
  taskId: string;
  taskIdPlaceholder: string;
  prevPage: string;
  nextPage: string;
  pageOf: (page: number, totalPages: number) => string;
  totalRows: (n: number) => string;
};

const zhCN: TaskLogsUiCopy = {
  drawingTitle: "绘图记录",
  tasksTitle: "异步任务",
  empty: "暂无记录。",
  loadFailed: "加载失败",
  colId: "任务 ID",
  colTime: "提交时间",
  colStatus: "状态",
  colPlatform: "平台",
  colProgress: "进度",
  colFailReason: "失败原因",
  refresh: "刷新",
  startDate: "开始日期",
  endDate: "结束日期",
  search: "查询",
  mjId: "MJ ID",
  mjIdPlaceholder: "mj_id",
  taskId: "任务 ID",
  taskIdPlaceholder: "task_id",
  prevPage: "上一页",
  nextPage: "下一页",
  pageOf: (page, totalPages) => `${page} / ${totalPages}`,
  totalRows: (n) => `共 ${n} 条`,
};

const en: TaskLogsUiCopy = {
  drawingTitle: "Drawing records",
  tasksTitle: "Async tasks",
  empty: "No records yet.",
  loadFailed: "Failed to load",
  colId: "Task ID",
  colTime: "Submitted",
  colStatus: "Status",
  colPlatform: "Platform",
  colProgress: "Progress",
  colFailReason: "Failure reason",
  refresh: "Refresh",
  startDate: "Start date",
  endDate: "End date",
  search: "Search",
  mjId: "MJ ID",
  mjIdPlaceholder: "mj_id",
  taskId: "Task ID",
  taskIdPlaceholder: "task_id",
  prevPage: "Prev",
  nextPage: "Next",
  pageOf: (page, totalPages) => `${page} / ${totalPages}`,
  totalRows: (n) => `${n} total`,
};

const CATALOG: Record<TargetLocale, TaskLogsUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": {
    ...zhCN,
    drawingTitle: "繪圖記錄",
    tasksTitle: "非同步任務",
    empty: "暫無記錄。",
    loadFailed: "載入失敗",
    colTime: "提交時間",
    colFailReason: "失敗原因",
    refresh: "重新整理",
    startDate: "開始日期",
    endDate: "結束日期",
    search: "查詢",
    prevPage: "上一頁",
    nextPage: "下一頁",
    totalRows: (n) => `共 ${n} 筆`,
  },
  ja: {
    ...en,
    drawingTitle: "描画記録",
    tasksTitle: "非同期タスク",
    empty: "記録がありません。",
    loadFailed: "読み込みに失敗しました",
    colTime: "送信時刻",
    colFailReason: "失敗理由",
    refresh: "更新",
    startDate: "開始日",
    endDate: "終了日",
    search: "検索",
  },
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
  const base = pickTargetCatalog(locale, CATALOG);
  return {
    ...en,
    ...base,
    pageOf: base.pageOf ?? en.pageOf,
    totalRows: base.totalRows ?? en.totalRows,
  };
}
