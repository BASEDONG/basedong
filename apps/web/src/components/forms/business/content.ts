import { APP_ROUTES } from "@/lib/routes";

export const FORM_TITLE = "八色鸫 - 商务需求反馈表";

export const ASSET_BASE =
  "/assets/forms/business/images";

export const ECOSYSTEM_FORM_URL = APP_ROUTES.formBusiness;

export const COMPUTE_FORM_URL = APP_ROUTES.formBusiness;

export const PRIVACY_POLICY_URL = APP_ROUTES.userAgreement;

export const SERVICE_USAGE_OPTIONS = [
  "公有云模型 API（按 Tokens 付费）",
  "云端企业云函数服务（按卡时付费）",
  "云端企业预留实例（按固定周期付费）",
  "本地私有化部署（企业级大模型服务平台）",
  "本地私有化部署（大模型推理服务网关）",
  "大模型一体机",
] as const;

export const AI_TASK_OPTIONS = [
  "Agent",
  "AI coding（编程）",
  "图像生成",
  "视频生成",
  "工作流自动化",
  "模型微调",
  "其他",
] as const;

export const CHANNEL_OPTIONS = [
  "社交媒体（如微博/微信/抖音/小红书等）",
  "社区/论坛（如知乎/CSDN/GitHub等）",
  "市场活动（如线下展会/线上直播等）",
  "搜索引擎（如百度/谷歌/必应等）",
  "他人推荐（如朋友/同事/KOL推荐等）",
  "其他",
] as const;

export type ServiceUsageOption = (typeof SERVICE_USAGE_OPTIONS)[number];
export type AiTaskOption = (typeof AI_TASK_OPTIONS)[number];
export type ChannelOption = (typeof CHANNEL_OPTIONS)[number];

export interface TextFieldConfig {
  type: "text";
  number: number;
  label: string;
  required: boolean;
  hint: string;
  placeholder: string;
}

export interface MultiSelectFieldConfig {
  type: "multi-select";
  number: number;
  label: string;
  required: boolean;
  options: readonly string[];
}

export type FormFieldConfig = TextFieldConfig | MultiSelectFieldConfig;

export const FORM_FIELDS: FormFieldConfig[] = [
  {
    type: "text",
    number: 1,
    label: "您的姓名",
    required: true,
    hint: "请输入您的姓名",
    placeholder: "请输入内容",
  },
  {
    type: "text",
    number: 2,
    label: "您的联系电话",
    required: true,
    hint: "请输入您的手机号或座机，以便我们和您取得联系",
    placeholder: "请输入内容",
  },
  {
    type: "text",
    number: 3,
    label: "请输入企业/组织名称",
    required: true,
    hint: "请填写您所在的企业或组织名称，以便于我们更好的为您服务。",
    placeholder: "请输入内容",
  },
  {
    type: "text",
    number: 4,
    label: "您的企业邮箱",
    required: true,
    hint: "请输入您的企业邮箱",
    placeholder: "请输入内容",
  },
  {
    type: "multi-select",
    number: 5,
    label: "您预期通过哪种方式使用我们的服务",
    required: true,
    options: SERVICE_USAGE_OPTIONS,
  },
  {
    type: "multi-select",
    number: 6,
    label: "您希望 AI 模型帮您完成的任务或业务场景",
    required: true,
    options: AI_TASK_OPTIONS,
  },
  {
    type: "multi-select",
    number: 7,
    label: "您是通过哪种渠道了解到我们的",
    required: false,
    options: CHANNEL_OPTIONS,
  },
  {
    type: "text",
    number: 8,
    label: "是否有其他需求",
    required: false,
    hint: "",
    placeholder: "请输入内容",
  },
];
