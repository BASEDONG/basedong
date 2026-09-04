import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type ProfileUiCopy = {
  pageTitle: string;
  sectionProfile: string;
  sectionPassword: string;
  sectionStats: string;
  sectionSettings: string;
  sectionLanguage: string;
  sectionSecurity: string;
  sectionPasskey: string;
  sectionOauth: string;
  sectionSessions: string;
  username: string;
  displayName: string;
  originalPassword: string;
  newPassword: string;
  save: string;
  changePassword: string;
  saved: string;
  passwordChanged: string;
  settingsSaved: string;
  languageSaved: string;
  loadFailed: string;
  saveFailed: string;
  passwordFailed: string;
  settingsFailed: string;
  statQuota: string;
  statUsedQuota: string;
  statRequests: string;
  notifyMethod: string;
  notifyEmail: string;
  notifyWebhook: string;
  notifyBark: string;
  notifyGotify: string;
  quotaThreshold: string;
  quotaThresholdHint: string;
  notificationEmail: string;
  notificationEmailHint: string;
  webhookUrl: string;
  webhookSecret: string;
  barkUrl: string;
  gotifyUrl: string;
  gotifyToken: string;
  gotifyPriority: string;
  acceptUnsetRatio: string;
  recordIpLog: string;
  saveSettings: string;
  languageHint: string;
  languageLabel: string;
  twoFaLabel: string;
  twoFaOn: string;
  twoFaOff: string;
  twoFaUnknown: string;
  twoFaLocked: string;
  twoFaEnable: string;
  twoFaDisable: string;
  twoFaSetupTitle: string;
  twoFaScanHint: string;
  twoFaSecretLabel: string;
  twoFaBackupTitle: string;
  twoFaCodeLabel: string;
  twoFaConfirmEnable: string;
  twoFaConfirmDisable: string;
  twoFaEnabled: string;
  twoFaDisabled: string;
  twoFaCancel: string;
  twoFaNext: string;
  passkeyOn: string;
  passkeyOff: string;
  passkeyUnsupported: string;
  passkeyRegister: string;
  passkeyRemove: string;
  passkeyRegistered: string;
  passkeyRemoved: string;
  passkeyProofHint: string;
  passkeyUnavailable: string;
  oauthEmpty: string;
  oauthUnavailable: string;
  oauthUnbind: string;
  oauthUnbound: string;
  oauthBindNote: string;
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
  sectionStats: "账户概览",
  sectionSettings: "设置与偏好",
  sectionLanguage: "语言偏好",
  sectionSecurity: "双因素认证",
  sectionPasskey: "Passkey",
  sectionOauth: "第三方绑定",
  sectionSessions: "登录会话",
  username: "用户名",
  displayName: "显示名称",
  originalPassword: "当前密码",
  newPassword: "新密码",
  save: "保存",
  changePassword: "更新密码",
  saved: "已保存",
  passwordChanged: "密码已更新",
  settingsSaved: "设置已保存",
  languageSaved: "语言已更新",
  loadFailed: "加载个人资料失败",
  saveFailed: "保存失败",
  passwordFailed: "修改密码失败",
  settingsFailed: "保存设置失败",
  statQuota: "余额",
  statUsedQuota: "累计用量",
  statRequests: "请求数",
  notifyMethod: "通知方式",
  notifyEmail: "邮件",
  notifyWebhook: "Webhook",
  notifyBark: "Bark",
  notifyGotify: "Gotify",
  quotaThreshold: "额度预警阈值",
  quotaThresholdHint: "余额低于该值时发送通知",
  notificationEmail: "通知邮箱",
  notificationEmailHint: "留空则使用账户邮箱",
  webhookUrl: "Webhook URL",
  webhookSecret: "Webhook 密钥",
  barkUrl: "Bark URL",
  gotifyUrl: "Gotify URL",
  gotifyToken: "Gotify Token",
  gotifyPriority: "Gotify 优先级",
  acceptUnsetRatio: "接受未配置倍率的模型",
  recordIpLog: "在调用记录中记录 IP",
  saveSettings: "保存设置",
  languageHint: "与站点语言切换器相同：更改后控制台文案会立即切换。",
  languageLabel: "界面语言",
  twoFaLabel: "状态",
  twoFaOn: "已启用",
  twoFaOff: "未启用",
  twoFaUnknown: "暂不可用",
  twoFaLocked: "已锁定",
  twoFaEnable: "启用双因素认证",
  twoFaDisable: "关闭双因素认证",
  twoFaSetupTitle: "设置双因素认证",
  twoFaScanHint: "使用认证器 App 扫描二维码，或手动输入密钥。",
  twoFaSecretLabel: "密钥",
  twoFaBackupTitle: "请妥善保存备用码（只显示一次）",
  twoFaCodeLabel: "验证码",
  twoFaConfirmEnable: "确认启用",
  twoFaConfirmDisable: "确认关闭",
  twoFaEnabled: "双因素认证已启用",
  twoFaDisabled: "双因素认证已关闭",
  twoFaCancel: "取消",
  twoFaNext: "下一步",
  passkeyOn: "已绑定",
  passkeyOff: "未绑定",
  passkeyUnsupported: "当前设备或浏览器不支持 Passkey",
  passkeyRegister: "注册 Passkey",
  passkeyRemove: "解除 Passkey",
  passkeyRegistered: "Passkey 已注册",
  passkeyRemoved: "Passkey 已解除",
  passkeyProofHint: "已启用双因素时，请先输入验证码再注册或解除 Passkey。",
  passkeyUnavailable: "Passkey 暂不可用（管理员可能未启用）",
  oauthEmpty: "暂无第三方绑定",
  oauthUnavailable: "无法加载第三方绑定",
  oauthUnbind: "解绑",
  oauthUnbound: "已解绑",
  oauthBindNote:
    "新增绑定需走 Backend 已配置的 OAuth 提供方流程；此处可查看并解绑现有绑定。",
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
  sectionStats: "Account overview",
  sectionSettings: "Settings & preferences",
  sectionLanguage: "Language preference",
  sectionSecurity: "Two-factor authentication",
  sectionPasskey: "Passkey",
  sectionOauth: "Linked accounts",
  sectionSessions: "Sessions",
  username: "Username",
  displayName: "Display name",
  originalPassword: "Current password",
  newPassword: "New password",
  save: "Save",
  changePassword: "Update password",
  saved: "Saved",
  passwordChanged: "Password updated",
  settingsSaved: "Settings saved",
  languageSaved: "Language updated",
  loadFailed: "Failed to load profile",
  saveFailed: "Failed to save",
  passwordFailed: "Failed to change password",
  settingsFailed: "Failed to save settings",
  statQuota: "Balance",
  statUsedQuota: "Total usage",
  statRequests: "Requests",
  notifyMethod: "Notification method",
  notifyEmail: "Email",
  notifyWebhook: "Webhook",
  notifyBark: "Bark",
  notifyGotify: "Gotify",
  quotaThreshold: "Quota warning threshold",
  quotaThresholdHint: "Notify when balance falls below this value",
  notificationEmail: "Notification email",
  notificationEmailHint: "Leave empty to use account email",
  webhookUrl: "Webhook URL",
  webhookSecret: "Webhook secret",
  barkUrl: "Bark URL",
  gotifyUrl: "Gotify URL",
  gotifyToken: "Gotify token",
  gotifyPriority: "Gotify priority",
  acceptUnsetRatio: "Accept models without configured ratios",
  recordIpLog: "Record IP in call logs",
  saveSettings: "Save settings",
  languageHint:
    "Same as the site language switcher: Console copy updates as soon as you change it.",
  languageLabel: "Interface language",
  twoFaLabel: "Status",
  twoFaOn: "Enabled",
  twoFaOff: "Disabled",
  twoFaUnknown: "Unavailable",
  twoFaLocked: "Locked",
  twoFaEnable: "Enable 2FA",
  twoFaDisable: "Disable 2FA",
  twoFaSetupTitle: "Set up two-factor authentication",
  twoFaScanHint:
    "Scan the QR code with an authenticator app, or enter the secret.",
  twoFaSecretLabel: "Secret",
  twoFaBackupTitle: "Save these backup codes (shown once)",
  twoFaCodeLabel: "Verification code",
  twoFaConfirmEnable: "Confirm enable",
  twoFaConfirmDisable: "Confirm disable",
  twoFaEnabled: "Two-factor authentication enabled",
  twoFaDisabled: "Two-factor authentication disabled",
  twoFaCancel: "Cancel",
  twoFaNext: "Next",
  passkeyOn: "Registered",
  passkeyOff: "Not registered",
  passkeyUnsupported: "This device or browser does not support Passkey",
  passkeyRegister: "Register Passkey",
  passkeyRemove: "Remove Passkey",
  passkeyRegistered: "Passkey registered",
  passkeyRemoved: "Passkey removed",
  passkeyProofHint:
    "When 2FA is on, enter a verification code before registering or removing a Passkey.",
  passkeyUnavailable: "Passkey is unavailable (may be disabled by Admin)",
  oauthEmpty: "No linked accounts",
  oauthUnavailable: "Could not load linked accounts",
  oauthUnbind: "Unbind",
  oauthUnbound: "Unbound",
  oauthBindNote:
    "New links use Backend-configured OAuth providers; here you can review and unbind existing ones.",
  sessionsUnavailable:
    "Could not load sessions (browser session cookie may be required)",
  sessionsEmpty: "No sessions listed",
  sessionsRevoked: "Other sessions revoked",
  revokeOthers: "Revoke others",
  revokeSession: "Revoke",
  sessionCurrent: "Current",
};

const zhTW: ProfileUiCopy = {
  ...zhCN,
  pageTitle: "個人資料",
  sectionProfile: "基本資料",
  sectionPassword: "修改密碼",
  sectionStats: "帳戶概覽",
  sectionSettings: "設定與偏好",
  sectionLanguage: "語言偏好",
  sectionSecurity: "雙因素認證",
  sectionSessions: "登入工作階段",
  sectionOauth: "第三方綁定",
  username: "使用者名稱",
  displayName: "顯示名稱",
  save: "儲存",
  saved: "已儲存",
  settingsSaved: "設定已儲存",
  languageSaved: "語言已更新",
  saveSettings: "儲存設定",
};

const ja: ProfileUiCopy = {
  ...en,
  pageTitle: "プロフィール",
  sectionProfile: "基本情報",
  sectionPassword: "パスワード",
  sectionStats: "アカウント概要",
  sectionSettings: "設定と設定項目",
  sectionLanguage: "言語設定",
  sectionSecurity: "二要素認証",
  sectionSessions: "セッション",
  sectionOauth: "外部連携",
  username: "ユーザー名",
  displayName: "表示名",
  save: "保存",
  saved: "保存しました",
  settingsSaved: "設定を保存しました",
  languageSaved: "言語を更新しました",
  saveSettings: "設定を保存",
};

const fr = en;
const ru = en;
const vi = en;
const ko = en;
const de = en;
const es = en;
const ar = en;
const hi = en;
const id = en;

const CATALOG: Record<TargetLocale, ProfileUiCopy> = {
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
  "pt-BR": en,
  ar,
  hi,
  id,
};

export function getProfileUiCopy(locale: string): ProfileUiCopy {
  return pickTargetCatalog(locale, CATALOG);
}
