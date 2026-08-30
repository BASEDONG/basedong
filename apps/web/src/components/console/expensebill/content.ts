export const pageTitle = "充值";

export const ASSET = {
  alipay: "/assets/console/expensebill/images/zfb.svg",
  wechat: "/assets/console/expensebill/images/order-wx.svg",
  empty: "/assets/console/expensebill/images/finetune-empty.webp",
} as const;

export type BenefitTab = "balance" | "coupon" | "package";
export type RechargeMethod = "online" | "auto";
export type SegmentFilter = "all" | "available";

export const benefitSummary = {
  balance: 0,
  overdraft: 0,
  coupons: 0,
  packages: 0,
} as const;

export const amountPresets = [10, 50, 100, 1000, 2000, 5000, 10000] as const;
export const defaultAmount = 100;

export const autoThresholdPresets = [5, 10, 20, 50] as const;
export const autoAmountPresets = [10, 20, 50, 100] as const;
export const defaultAutoThreshold = 10;
export const defaultAutoAmount = 20;

export const recordHeaders = [
  "编号",
  "时间",
  "充值渠道",
  "状态",
  "金额",
  "操作",
] as const;

export const copy = {
  balanceLabel: "余额",
  overdraftSuffix: (n: number) => `（剩余可透支额度 ¥ ${n}）`,
  couponLabel: "代金券",
  couponSuffix: "张可用",
  packageLabel: "资源包",
  packageSuffix: "个生效中",
  online: "在线充值",
  auto: "自动充值",
  autoOff: "未开启",
  corporate: "对公转账汇款",
  warningOn: "余额预警已开启 (去设置)",
  warningOffChip: "余额预警已关闭 (去设置)",
  warningModalTitle: "余额预警设置",
  warningRule1: "余额预警包括自动、自定义、关闭三种模式：",
  warningRule1a:
    "若设置为自动，当账户剩余可用额度（包括充值余额和透支额度）低于近 7 日 API 调用产生的充值余额平均日消费时自动预警",
  warningRule1b:
    "若设置为自定义，当账户剩余可用额度（包括充值余额和透支额度）低于设置阈值时自动预警",
  warningRule2: "余额预警将在北京时间每天上午 10 点发送预警短信及邮件通知",
  warningRule3Before: "首次完成在线充值时，系统按",
  warningRule3Bold: "自动模式",
  warningRule3After: "开启余额预警",
  warningThresholdLabel: "预警阈值：",
  warningAuto: "自动",
  warningCustom: "自定义",
  warningOff: "关闭预警",
  warningYuan: "元",
  warningCancel: "取 消",
  warningOk: "确 定",
  payAmount: "支付金额",
  payMethod: "支付方式",
  otherAmount: "其它金额",
  alipay: "支付宝",
  otherPay: "其他支付方式",
  wechatPay: "微信支付",
  wechatShort: "微信",
  captcha: "点击完成验证",
  captchaSuccess: "验证成功",
  confirmPay: "确认支付",
  paying: "跳转支付中…",
  payDisabled:
    "在线充值暂未开通。请管理员在 Backend 确认支付合规并配置易支付（PayAddress / EpayId / EpayKey / PayMethods）。",
  payError: "拉起支付失败，请稍后重试",
  agreePrefix: "我已知悉充值资金不支持直接开具发票，确认支付即代表同意本平台",
  agreeLink: "「充值协议」",
  agreeHref: "https://api-docs.siliconflow.cn/docs/legals/recharge-policy",
  recordsTitle: "充值退款记录",
  statusPending: "待支付",
  statusSuccess: "已完成",
  statusOther: "已关闭",
  empty: "暂无数据",
  segmentAll: "全部",
  segmentAvailable: "可用",
  redeemCenter: "兑换中心",
  redeemInputLabel: "兑换码",
  redeemPlaceholder: "请输入管理员发放的兑换码",
  redeemSubmit: "兑换",
  redeemSubmitting: "兑换中…",
  redeemCancel: "取消",
  redeemSuccess: (n: number) => `兑换成功，额度 +${n}`,
  redeemFailed: "兑换失败，请检查兑换码是否有效",
  quotaLabel: "额度",
  autoTitle: "开通支付宝自动充值",
  autoAlerts: [
    "该功能由支付宝提供，签约后授权平台在用户余额低于设定阈值时自动充值，可随时取消",
    "签约后平台每 10 分钟检测一次余额，默认不在夜间（22:00 ~ 次日 08:00）执行（开通后可调整）",
    "自动充值执行前 10 分钟，系统将向您发送短信通知",
  ],
  thresholdLabel: "设定阈值",
  rechargeAmountLabel: "充值金额",
  otherAmountShort: "其他金额",
  thresholdHint: "当余额低于阈值时自动触发充值，范围 ¥ 5 ~ ¥ 1000",
  amountHint: "必须大于设定阈值，上限 ¥ 2000；每日累计 ¥ 6,000，每月累计 ¥ 100,000",
  autoPreview: (threshold: number, amount: number) =>
    `余额 < ¥ ${threshold} 时，自动充值 ¥ ${amount}`,
  signNow: "立即签约",
} as const;

export function formatYuan(n: number) {
  return `¥ ${n}`;
}
