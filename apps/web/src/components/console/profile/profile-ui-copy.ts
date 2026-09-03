import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type ProfileUiCopy = {
  pageTitle: string;
  sectionProfile: string;
  sectionPassword: string;
  sectionSecurity: string;
  sectionSessions: string;
  username: string;
  displayName: string;
  originalPassword: string;
  newPassword: string;
  save: string;
  changePassword: string;
  saved: string;
  passwordChanged: string;
  loadFailed: string;
  saveFailed: string;
  passwordFailed: string;
  twoFaLabel: string;
  twoFaOn: string;
  twoFaOff: string;
  twoFaUnknown: string;
  twoFaLocked: string;
  securityNote: string;
  sessionsUnavailable: string;
  sessionsEmpty: string;
  sessionsRevoked: string;
  revokeOthers: string;
  revokeSession: string;
  sessionCurrent: string;
};

const zhCN: ProfileUiCopy = {
  pageTitle: "个人资料",
  sectionProfile: "基本资料",
  sectionPassword: "修改密码",
  sectionSecurity: "双因素认证",
  sectionSessions: "登录会话",
  username: "用户名",
  displayName: "显示名称",
  originalPassword: "当前密码",
  newPassword: "新密码",
  save: "保存",
  changePassword: "更新密码",
  saved: "已保存",
  passwordChanged: "密码已更新",
  loadFailed: "加载个人资料失败",
  saveFailed: "保存失败",
  passwordFailed: "修改密码失败",
  twoFaLabel: "状态",
  twoFaOn: "已启用",
  twoFaOff: "未启用",
  twoFaUnknown: "暂不可用",
  twoFaLocked: "已锁定",
  securityNote:
    "Passkey / OAuth 绑定等高级能力将在 Backend 启用时开放设置入口；此处先展示已可探测的安全状态。",
  sessionsUnavailable: "无法加载会话列表（可能需要浏览器会话 Cookie）",
  sessionsEmpty: "暂无其他会话",
  sessionsRevoked: "已吊销其他会话",
  revokeOthers: "吊销其他会话",
  revokeSession: "吊销",
  sessionCurrent: "当前",
};

const en: ProfileUiCopy = {
  pageTitle: "Profile",
  sectionProfile: "Basics",
  sectionPassword: "Password",
  sectionSecurity: "Two-factor authentication",
  sectionSessions: "Sessions",
  username: "Username",
  displayName: "Display name",
  originalPassword: "Current password",
  newPassword: "New password",
  save: "Save",
  changePassword: "Update password",
  saved: "Saved",
  passwordChanged: "Password updated",
  loadFailed: "Failed to load profile",
  saveFailed: "Failed to save",
  passwordFailed: "Failed to change password",
  twoFaLabel: "Status",
  twoFaOn: "Enabled",
  twoFaOff: "Disabled",
  twoFaUnknown: "Unavailable",
  twoFaLocked: "Locked",
  securityNote:
    "Passkey / OAuth binding controls appear when those Backend features are enabled.",
  sessionsUnavailable:
    "Could not load sessions (browser session cookie may be required)",
  sessionsEmpty: "No sessions listed",
  sessionsRevoked: "Other sessions revoked",
  revokeOthers: "Revoke others",
  revokeSession: "Revoke",
  sessionCurrent: "Current",
};

const CATALOG: Record<TargetLocale, ProfileUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": {
    ...zhCN,
    pageTitle: "個人資料",
    sectionProfile: "基本資料",
    sectionPassword: "修改密碼",
    sectionSecurity: "雙因素認證",
    sectionSessions: "登入工作階段",
    username: "使用者名稱",
    displayName: "顯示名稱",
    save: "儲存",
    saved: "已儲存",
  },
  ja: {
    ...en,
    pageTitle: "プロフィール",
    sectionProfile: "基本情報",
    sectionPassword: "パスワード",
    sectionSecurity: "二要素認証",
    sectionSessions: "セッション",
    username: "ユーザー名",
    displayName: "表示名",
    save: "保存",
    saved: "保存しました",
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

export function getProfileUiCopy(locale: string): ProfileUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
