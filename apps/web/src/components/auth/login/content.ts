import { BRAND } from "@/lib/assets";

export const ASSET = {
  loginBg: "/assets/auth/login/images/login.png",
  authDecor: "/assets/auth/login/images/auth-bg-rb.svg",
  logoWhite: BRAND.logoWhite,
  logoBlack: BRAND.logo,
} as const;

export const LINKS = {
  terms: "https://api-docs.siliconflow.cn/docs/legals/terms-of-service",
  privacy: "https://api-docs.siliconflow.cn/docs/legals/privacy-policy",
  phoneLogin: "/zh/login",
  emailLogin: "/zh/login/email",
} as const;

export const COPY = {
  title: "欢迎登录 八色鸫",
  brandName: "八色鸫",
  tagline: "做所有人的 AI。",
  feature1: "1 个 API，100+ 主流模型轻松调用",
  feature2Lead: "低延迟",
  feature2Mid: "高并发",
  feature2Tail: "高性价比",
  claim1: "中国最大的",
  claim2: "独立词元供应平台",
  claimUsers: "超 1,000 万用户、13,000 家企业客户的选择",
  footnote: "* 按2025年的词元年吞吐量计",
  phonePlaceholder: "您的手机号",
  smsPlaceholder: "短信验证码",
  invitePlaceholder: "邀请码（仅支持手机注册，选填）",
  emailPlaceholder: "账号邮箱",
  emailCodePlaceholder: "验证码",
  usernamePlaceholder: "用户名",
  passwordPlaceholder: "密码",
  getCode: "获取验证码",
  agreePrefix: "我同意",
  termsLabel: "平台使用协议",
  and: "和",
  privacyLabel: "隐私政策",
  registerLogin: "注册 / 登录",
  login: "登录",
  register: "注册",
  submitting: "请稍候…",
  needAgree: "请先同意平台使用协议和隐私政策",
  authFailed: "登录失败，请检查用户名和密码",
  phoneBackendHint: "短信登录尚未对接 Backend，请使用用户名密码：",
  keepLogin: "30天内保持登录",
  wechatLogin: "微信登录",
  emailLogin: "邮箱登录",
  smsLogin: "短信登录",
  countryCode: "+86",
  lang: "CN",
} as const;
