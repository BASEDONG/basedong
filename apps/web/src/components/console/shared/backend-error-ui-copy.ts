import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

/** Keys for errors thrown directly in `lib/backend/client.ts`. */
export type ClientErrorKey =
  | "loginMissingToken"
  | "missingApiKeySecret"
  | "redeemCodeEmpty"
  | "redeemMissingQuotaDelta"
  | "paymentStartFailed"
  | "playgroundNotLoggedIn"
  | "playgroundEmptyContent";

export type BackendErrorUiCopy = {
  clientErrors: Record<ClientErrorKey, string>;
  /** Exact Backend `message` strings (Chinese or English source). */
  backendMessages: Record<string, string>;
  insufficientQuotaPrefix: string;
  insufficientUserQuotaPrefix: string;
  tokenLimitReached: (max: string) => string;
  httpError: (status: string) => string;
  unknownError: string;
};

const zhCN: BackendErrorUiCopy = {
  clientErrors: {
    loginMissingToken: "登录响应缺少 access_token",
    missingApiKeySecret: "响应中缺少 API Key 密钥",
    redeemCodeEmpty: "兑换码不能为空",
    redeemMissingQuotaDelta: "兑换响应缺少额度增量",
    paymentStartFailed: "拉起支付失败",
    playgroundNotLoggedIn: "未登录，请先登录后再使用在线体验",
    playgroundEmptyContent: "模型未返回有效内容",
  },
  backendMessages: {
    "兑换失败，请稍后重试": "兑换失败，请稍后重试",
    "未登录": "未登录",
    "not authenticated": "未登录",
    "拉起支付失败": "拉起支付失败",
    "参数错误": "参数错误",
    "充值金额过低": "充值金额过低",
    "额度不足": "额度不足",
    "充值失败，请稍后重试": "充值失败，请稍后重试",
    "无效的令牌": "无效的令牌",
    "无权进行此操作，权限不足": "无权进行此操作，权限不足",
    "用户已被封禁": "用户已被封禁",
    "管理员关闭了新用户注册": "管理员关闭了新用户注册",
    "Redemption failed, please try again later": "兑换失败，请稍后重试",
    "Insufficient quota": "额度不足",
    insufficient_user_quota: "额度不足",
    "Top-up failed, please try again later": "充值失败，请稍后重试",
    "No Authorization header": "未提供授权信息",
    "Invalid Bearer token": "无效的 Bearer 令牌",
    "Payment failed, please try again later": "充值失败，请稍后重试",
    "发送过于频繁，请稍后再试": "发送过于频繁，请稍后再试",
    "Turnstile 校验失败，请刷新重试！": "人机验证失败，请刷新重试",
    "获取用户分组失败": "获取用户分组失败",
    "充值额度必须大于 0": "充值额度必须大于 0",
  },
  insufficientQuotaPrefix: "额度不足",
  insufficientUserQuotaPrefix: "用户额度不足",
  tokenLimitReached: (max) => `已达到最大 API Key 数量限制 (${max})`,
  httpError: (status) => `请求失败 (HTTP ${status})`,
  unknownError: "操作失败，请稍后重试",
};

const en: BackendErrorUiCopy = {
  clientErrors: {
    loginMissingToken: "Login response is missing access_token",
    missingApiKeySecret: "API Key secret missing from response",
    redeemCodeEmpty: "Redemption code cannot be empty",
    redeemMissingQuotaDelta: "Redemption response missing quota delta",
    paymentStartFailed: "Failed to start payment",
    playgroundNotLoggedIn: "Not signed in — log in to use Playground",
    playgroundEmptyContent: "Model returned no usable content",
  },
  backendMessages: {
    "兑换失败，请稍后重试": "Redemption failed. Please try again later.",
    "未登录": "Not signed in",
    "not authenticated": "Not signed in",
    "拉起支付失败": "Failed to start payment",
    "参数错误": "Invalid parameters",
    "充值金额过低": "Top-up amount is too low",
    "额度不足": "Insufficient quota",
    "充值失败，请稍后重试": "Top-up failed. Please try again later.",
    "无效的令牌": "Invalid token",
    "无权进行此操作，权限不足": "Unauthorized — insufficient privileges",
    "用户已被封禁": "Your account has been banned",
    "管理员关闭了新用户注册": "New user registration is disabled",
    "Redemption failed, please try again later":
      "Redemption failed. Please try again later.",
    "Insufficient quota": "Insufficient quota",
    insufficient_user_quota: "Insufficient quota",
    "Top-up failed, please try again later":
      "Top-up failed. Please try again later.",
    "No Authorization header": "No Authorization header",
    "Invalid Bearer token": "Invalid Bearer token",
    "Payment failed, please try again later":
      "Top-up failed. Please try again later.",
    "发送过于频繁，请稍后再试": "Sending too frequently. Try again later.",
    "Turnstile 校验失败，请刷新重试！":
      "Human verification failed. Refresh and try again.",
    "获取用户分组失败": "Failed to load user group",
    "充值额度必须大于 0": "Top-up amount must be greater than 0",
  },
  insufficientQuotaPrefix: "Insufficient quota",
  insufficientUserQuotaPrefix: "Insufficient user quota",
  tokenLimitReached: (max) => `Maximum API Key limit reached (${max})`,
  httpError: (status) => `Request failed (HTTP ${status})`,
  unknownError: "Something went wrong. Please try again later.",
};

const zhTW: BackendErrorUiCopy = {
  ...zhCN,
  clientErrors: {
    loginMissingToken: "登入回應缺少 access_token",
    missingApiKeySecret: "回應中缺少 API Key 密鑰",
    redeemCodeEmpty: "兌換碼不能為空",
    redeemMissingQuotaDelta: "兌換回應缺少額度增量",
    paymentStartFailed: "拉起支付失敗",
    playgroundNotLoggedIn: "未登入，請先登入後再使用線上體驗",
    playgroundEmptyContent: "模型未返回有效內容",
  },
  backendMessages: {
    ...zhCN.backendMessages,
    "兑换失败，请稍后重试": "兌換失敗，請稍後重試",
    "未登录": "未登入",
    "拉起支付失败": "拉起支付失敗",
    "参数错误": "參數錯誤",
    "充值金额过低": "充值金額過低",
    "额度不足": "額度不足",
    "充值失败，请稍后重试": "充值失敗，請稍後重試",
    "无效的令牌": "無效的令牌",
    "无权进行此操作，权限不足": "無權進行此操作，權限不足",
    "用户已被封禁": "使用者已被封禁",
    "管理员关闭了新用户注册": "管理員關閉了新使用者註冊",
    "发送过于频繁，请稍后再试": "發送過於頻繁，請稍後再試",
    "Turnstile 校验失败，请刷新重试！": "人機驗證失敗，請刷新重試",
    "获取用户分组失败": "取得使用者分組失敗",
    "充值额度必须大于 0": "充值額度必須大於 0",
  },
  insufficientQuotaPrefix: "額度不足",
  insufficientUserQuotaPrefix: "使用者額度不足",
  tokenLimitReached: (max) => `已達最大 API Key 數量限制 (${max})`,
  httpError: (status) => `請求失敗 (HTTP ${status})`,
  unknownError: "操作失敗，請稍後重試",
};

type BackendErrorFromEn = Omit<Partial<BackendErrorUiCopy>, "clientErrors"> & {
  clientErrors?: Partial<BackendErrorUiCopy["clientErrors"]>;
};

function fromEn(partial: BackendErrorFromEn): BackendErrorUiCopy {
  return {
    ...en,
    ...partial,
    clientErrors: { ...en.clientErrors, ...partial.clientErrors },
    backendMessages: { ...en.backendMessages, ...partial.backendMessages },
  };
}

const ja = fromEn({
  clientErrors: {
    playgroundNotLoggedIn: "未ログインです。Playground を使うにはログインしてください",
  },
  backendMessages: {
    "兑换失败，请稍后重试": "引き換えに失敗しました。後でもう一度お試しください。",
    "额度不足": "枠が不足しています",
  },
  insufficientQuotaPrefix: "枠不足",
  unknownError: "操作に失敗しました。後でもう一度お試しください。",
});

const fr = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Échec de l'échange. Réessayez plus tard.",
    "额度不足": "Quota insuffisant",
  },
});

const ru = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Активация не удалась. Попробуйте позже.",
    "额度不足": "Недостаточно квоты",
  },
});

const vi = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Đổi thất bại. Vui lòng thử lại sau.",
    "额度不足": "Không đủ hạn mức",
  },
});

const ko = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "교환에 실패했습니다. 나중에 다시 시도하세요.",
    "额度不足": "할당량 부족",
  },
});

const de = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Einlösung fehlgeschlagen. Bitte später erneut versuchen.",
    "额度不足": "Unzureichendes Kontingent",
  },
});

const es = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Canje fallido. Inténtelo más tarde.",
    "额度不足": "Cuota insuficiente",
  },
});

const ptBR = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Resgate falhou. Tente novamente mais tarde.",
    "额度不足": "Cota insuficiente",
  },
});

const ar = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "فشل الاسترداد. يرجى المحاولة لاحقًا.",
    "额度不足": "الحصة غير كافية",
  },
});

const hi = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "रिडीम विफल। बाद में पुनः प्रयास करें।",
    "额度不足": "अपर्याप्त कोटा",
  },
});

const id = fromEn({
  backendMessages: {
    "兑换失败，请稍后重试": "Penukaran gagal. Coba lagi nanti.",
    "额度不足": "Kuota tidak cukup",
  },
});

const BACKEND_ERROR_UI_COPY: Record<TargetLocale, BackendErrorUiCopy> = {
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

export function getBackendErrorUiCopy(locale: string): BackendErrorUiCopy {
  return pickTargetCatalog(locale, BACKEND_ERROR_UI_COPY);
}
