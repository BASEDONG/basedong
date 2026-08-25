import type {
  FilterSection,
  FooterLink,
  ModelCardData,
  NavGroup,
} from "./content-types";
import { BRAND } from "@/lib/assets";
import modelsJson from "./models-data.json";

export const modelsData = modelsJson as ModelCardData[];

export const navGroups: NavGroup[] = [
  {
    key: "models",
    label: "模型",
    items: [
      {
        key: "models-plaza",
        label: "模型广场",
        icon: "ModelsPlazaIcon",
        href: "/me/models",
      },
      {
        key: "batches",
        label: "批量推理",
        icon: "BatchesIcon",
        href: "/me/batches",
      },
    ],
  },
  {
    key: "playground",
    label: "体验中心",
    items: [
      {
        key: "chat",
        label: "文本对话",
        icon: "ChatIcon",
        href: "/me/playground/chat",
      },
      {
        key: "image",
        label: "图像生成",
        icon: "ImageIcon",
        href: "/me/playground/image",
      },
      {
        key: "video",
        label: "视频生成",
        icon: "VideoIcon",
        href: "/me/playground/video",
      },
      {
        key: "tts",
        label: "语音合成",
        icon: "MicIcon",
        href: "/me/playground/text-to-speech",
      },
    ],
  },
  {
    key: "gpu",
    label: "弹性 GPU",
    badge: "Beta",
    items: [
      {
        key: "gpu-fn",
        label: "GPU 云函数",
        icon: "GpuIcon",
        href: "/me/dedicated/apply",
      },
    ],
  },
  {
    key: "account",
    label: "账户管理",
    items: [
      {
        key: "ak",
        label: "API 密钥",
        icon: "KeyIcon",
        href: "/me/account/ak",
      },
      {
        key: "wallet",
        label: "余额充值",
        icon: "WalletIcon",
        href: "/me/expensebill",
      },
      { key: "bills", label: "费用明细", icon: "BillsIcon", href: "/me/bills" },
      { key: "invoice", label: "发票开具", icon: "InvoiceIcon", href: "/me/invoice" },
    ],
  },
  {
    key: "campaigns",
    label: "活动中心",
    items: [
      {
        key: "inviter",
        label: "推荐官计划",
        icon: "InviterIcon",
        href: "/me/campaigns/inviter",
      },
      {
        key: "invitation",
        label: "我的邀请记录",
        icon: "ShareIcon",
        href: "/me/invitation",
      },
    ],
  },
];

export const footerLinks: FooterLink[] = [
  {
    key: "docs",
    label: "文档中心",
    href: "https://api-docs.siliconflow.cn/",
    icon: "DocsIcon",
  },
  {
    key: "ticket",
    label: "工单反馈",
    href: "#",
    icon: "TicketIcon",
  },
  {
    key: "biz",
    label: "商务合作",
    href: "#",
    icon: "BizIcon",
  },
];

export const icpText = "© 八色鸫人工智能科技（福建省泉州市）有限责任公司 2026 版权所有";

export const filterSections: FilterSection[] = [
  {
    id: "type",
    label: "类型",
    options: [
      { id: "type-对话", label: "对话" },
      { id: "type-生图", label: "生图" },
      { id: "type-视频", label: "视频" },
      { id: "type-语音", label: "语音" },
      { id: "type-嵌入", label: "嵌入" },
      { id: "type-重排序", label: "重排序" },
    ],
  },
  {
    id: "tag",
    label: "标签",
    options: [
      { id: "tag-视觉", label: "视觉" },
      { id: "tag-MoE", label: "MoE" },
      { id: "tag-推理", label: "推理" },
      { id: "tag-Tools", label: "Tools" },
      { id: "tag-FIM", label: "FIM" },
      { id: "tag-Math", label: "Math" },
      { id: "tag-Coder", label: "Coder" },
    ],
  },
  {
    id: "series",
    label: "系列 / 厂商",
    options: [
      { id: "series-DeepSeek", label: "DeepSeek" },
      { id: "series-Qwen", label: "Qwen" },
      { id: "series-智谱", label: "智谱" },
      { id: "series-Kimi", label: "Kimi" },
      { id: "series-蚂蚁百灵", label: "蚂蚁百灵" },
      { id: "series-阶跃星辰", label: "阶跃星辰" },
      { id: "series-MiniMax", label: "MiniMax" },
      { id: "series-Wan", label: "Wan" },
      { id: "series-更多", label: "更多" },
    ],
  },
  {
    id: "context",
    label: "上下文",
    options: [
      { id: "ctx-8K", label: "≥ 8K" },
      { id: "ctx-16K", label: "≥ 16K" },
      { id: "ctx-32K", label: "≥ 32K" },
      { id: "ctx-128K", label: "≥ 128K" },
    ],
  },
  {
    id: "spec",
    label: "规格",
    options: [
      { id: "spec-lt10", label: "10B 以下" },
      { id: "spec-10-50", label: "10 ~ 50B" },
      { id: "spec-50-100", label: "50 ~ 100B" },
      { id: "spec-gt100", label: "100B 以上" },
    ],
  },
  {
    id: "date",
    label: "发布日期",
    options: [
      { id: "date-30", label: "近 30 天" },
      { id: "date-90", label: "近 90 天" },
    ],
  },
];

export const ASSET = {
  logo: BRAND.logo,
  logoMark: BRAND.logoMark,
  campaign:
    "/assets/console/models/images/header-campaigns-inviter.webp",
  avatar:
    "/assets/console/models/images/avatar.jpeg",
} as const;
