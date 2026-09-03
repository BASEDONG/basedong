import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type ProfileUiCopy = {
  pageTitle: string;
  username: string;
  displayName: string;
  save: string;
  saved: string;
  loadFailed: string;
  saveFailed: string;
  securityNote: string;
};

const zhCN: ProfileUiCopy = {
  pageTitle: "个人资料",
  username: "用户名",
  displayName: "显示名称",
  save: "保存",
  saved: "已保存",
  loadFailed: "加载个人资料失败",
  saveFailed: "保存失败",
  securityNote:
    "安全选项（双因素、会话、Passkey、OAuth 绑定等）将在后续对等能力中逐步开放；请以 Backend 已启用的能力为准。",
};

const en: ProfileUiCopy = {
  pageTitle: "Profile",
  username: "Username",
  displayName: "Display name",
  save: "Save",
  saved: "Saved",
  loadFailed: "Failed to load profile",
  saveFailed: "Failed to save",
  securityNote:
    "Security options (2FA, sessions, passkey, OAuth) will expand as Backend capabilities are enabled.",
};

const CATALOG: Record<TargetLocale, ProfileUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": { ...zhCN, pageTitle: "個人資料", username: "使用者名稱", displayName: "顯示名稱", save: "儲存", saved: "已儲存", loadFailed: "載入個人資料失敗", saveFailed: "儲存失敗", securityNote: "安全選項將依 Backend 已啟用能力逐步開放。" },
  ja: { ...en, pageTitle: "プロフィール", username: "ユーザー名", displayName: "表示名", save: "保存", saved: "保存しました", loadFailed: "プロフィールの読み込みに失敗しました", saveFailed: "保存に失敗しました", securityNote: "セキュリティ機能は Backend の設定に応じて順次対応します。" },
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

export function getProfileUiCopy(locale: string): ProfileUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
