import modelsData from "./models-data.json";
import type { ModelCardData, ModelType, SeriesCardData } from "./content-types";

export type { ModelCardData, ModelType, SeriesCardData };

const ASSET =
  "/assets/marketing/models/images";

export const MODELS_PAGE = {
  heroTitle: "你要的 AI 模型，这里都有",
  heroSubtitle: "1 个 API，3 行代码，100+ 主流模型轻松调用",
  searchPlaceholder: "搜索模型名称、模型厂商、应用场景",
  hotLabel: "热门模型",
  hotModels: [
    "DeepSeek-V4-Pro",
    "Qwen3-VL-32B-Instruct",
    "GLM-5.1",
    "Kimi-K2.6",
    "MiniMax-M2.5",
  ],
  typeLabel: "模型类型",
  typeOptions: [
    "全部",
    "对话",
    "生图",
    "嵌入",
    "重排序",
    "语音",
    "视频",
  ] as ModelType[],
  sceneLabel: "应用场景",
  sceneOptions: [
    "全部",
    "RAG",
    "通用助手",
    "旗舰全能",
    "文案创作",
    "长文本处理",
    "数学推理",
    "Vibe Coding",
    "快速响应",
    "多模态理解 / 识别",
    "语音合成",
    "语音交互",
    "语音识别",
    "图像生成",
    "图像编辑",
    "视频生成",
    "AIGC 内容创作",
    "游戏互动",
    "角色扮演",
    "内容翻译",
    "领域知识综合",
  ],
  catalogTitle: "发现并使用最适合你的 AI 模型",
  sortDefault: "按默认排序",
  sortReverse: "倒序",
  seriesTitle: "按系列探索，快速找到你需要的模型",
  moreSeries: "更多系列 / 厂商查询",
  heroBg: `${ASSET}/hero-bg.png`,
  pageSize: 20,
} as const;

export const MODELS = modelsData as ModelCardData[];

export const CLOUD_MODELS_URL = "/me/modelsmodels";
export const CLOUD_ME_MODELS_URL = "/me/modelsme/models";
export const MORE_SERIES_HREF = CLOUD_ME_MODELS_URL;

export function modelDetailHref(modelId: string): string {
  return `${CLOUD_MODELS_URL}?target=${encodeURIComponent(modelId)}`;
}

export const SERIES: SeriesCardData[] = [
  {
    name: "DeepSeek",
    description:
      "由深度求索团队打造的面向高强度推理与复杂应用的通用大模型系列。强调数学、代码与复杂问题求解能力，在长链路推理、工具调用与专业任务上表现突出，适用于科研、开发、智能体等高要求场景的大模型。",
    models: ["DeepSeek-V3.2", "DeepSeek-V3.1-Terminus", "DeepSeek-R1"],
    logo: `${ASSET}/logo-deepseek.svg`,
    bg: "#EEF5FF",
    exploreHref: `${CLOUD_ME_MODELS_URL}?mfs=deepseek-ai`,
  },
  {
    name: "Qwen",
    description:
      "通义大模型体系，提供全尺寸、全模态、多场景的通义系列大模型，适配千行百业落地 AI 大模型。",
    models: ["Qwen3 系列", "Qwen3-VL 系列", "Qwen-Image 系列"],
    logo: `${ASSET}/logo-tongyi.svg`,
    bg: "#F6F0FF",
    exploreHref: `${CLOUD_ME_MODELS_URL}?mfs=Qwen`,
  },
  {
    name: "智谱",
    description:
      "GLM 通用大模型系列。在中文理解与生成、跨语言对话与知识问答中能力突出，并在结构化输出、工具调用与代码生成等任务上具备良好泛化能力，适用内容生产、企业知识检索与办公自动化等多类应用场景。",
    models: ["GLM-5.1", "GLM-4.7", "GLM-Z1-32B-0414"],
    logo: `${ASSET}/logo-zhipu.svg`,
    bg: "#FFF8DB",
    exploreHref: `${CLOUD_ME_MODELS_URL}?mfs=zai`,
  },
  {
    name: "Kimi",
    description:
      "由 Moonshot AI 打造的通用大模型体系。聚焦长上下文理解与高质量推理能力，覆盖文本、多模态、复杂推理等多维度，在信息检索、复杂问答与知识整合等场景中表现突出，适用于智能助手、知识工作流等多样化需求。",
    models: ["Kimi-K2.6"],
    logo: `${ASSET}/logo-moonshotai.png`,
    bg: "#F0FFF4",
    exploreHref: `${CLOUD_ME_MODELS_URL}?mfs=moonshotai`,
  },
  {
    name: "MiniMax",
    description:
      "MiniMax M1 / M2 是 MiniMax 的两款各有侧重的文本模型。其中 M1 是大规模混合架构的推理模型，支持 100W 上下文输入，以及 8W 的输出；M2 是一款专为 Agent 和编程能力而生的模型，交错思维链让模型拥有强大的 Agent 的能力。",
    models: ["MiniMax-M2.5"],
    logo: `${ASSET}/logo-minimax.svg`,
    bg: "#FFF0F3",
    exploreHref: `${CLOUD_ME_MODELS_URL}?mfs=MiniMaxAI`,
  },
];
