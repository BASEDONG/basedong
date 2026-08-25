export const FORM_TITLE = "硅基流动工单系统-新";

export const FORM_DESCRIPTION =
  "非常感谢您使用硅基流动，工单回复内容可通过邮箱查收或在平台点击工单查询，工单结果接收时间为：工作日9:30-18:30，感谢您的理解与支持。";

export const PROBLEM_HINT =
  "为更好解决您的问题，还请您详细描述您遇到的问题";

export const CATEGORY_OPTIONS = [
  "账号注销",
  "访问官网",
  "登录账号",
  "平台活动相关",
  "技术咨询",
  "个人认证",
  "企业认证",
  "充值相关",
  "奖励金额【赠金/代金券】",
  "费用账单相关",
  "开具发票",
  "退款相关",
  "使用投诉",
] as const;

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

export const ASSET_BASE =
  "/assets/forms/support/images";
