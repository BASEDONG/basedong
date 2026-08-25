import { BRAND } from "@/lib/assets";

export const pageTitle = "GPU 云函数";

export const ASSET = {
  logo: BRAND.logoWhite,
  logoMark: BRAND.logoMark,
  campaign:
    "/assets/console/dedicated-apply/images/header-campaigns-inviter.webp",
  avatar:
    "/assets/console/dedicated-apply/images/avatar.jpeg",
  hero:
    "/assets/console/dedicated-apply/images/faas-1.webp",
} as const;

export const navActiveKey = "gpu-fn";

export const heroFeatures = [
  "极致弹性",
  "高速推理",
  "多芯支持",
  "企业级高可用",
] as const;

export const productParagraphs = [
  {
    prefix: "为了更好地服务企业级用户，我们现正式开放",
    highlight: "「弹性 GPU」",
    suffix:
      "服务公测申请。本次公测旨在为企业用户提供高性能、稳定可靠的 GPU 算力支持，助力 AI 推理、深度学习、科学计算、图形渲染等业务场景的发展。",
  },
  {
    prefix: "",
    highlight: "「弹性 GPU」",
    suffix:
      "是硅基流动面向 AI 推理场景打造的一站式推理部署平台，支持多种芯片与主流框架。用户可一键部署，极速启动，享受极致弹性与企业级高可用。帮助开发者与企业以更高效率、更低成本将推理服务部署到云端算力之上，加速 AI 应用从开发到生产落地。",
  },
] as const;

export const audienceCards = [
  {
    icon: "building" as const,
    title: "Agent /智能体应用公司",
    description: "提供推理服务，支撑多 Agent 协同与任务执行",
  },
  {
    icon: "globe" as const,
    title: "互联网平台",
    description: "高并发低延迟推理、定制化部署",
  },
  {
    icon: "store" as const,
    title: "传统企业",
    description: "合规保障、内部知识问答与流程自动化",
  },
  {
    icon: "mountain" as const,
    title: "科研机构/ AI 模型公司",
    description: "提供推理算力支持，满足模型评测与规模化应用需求",
  },
  {
    icon: "userCheck" as const,
    title: "技术负责人",
    description: "架构性能调优、规模化推理与成本控制",
  },
  {
    icon: "lightbulb" as const,
    title: "产品与创新负责人",
    description: "MVP 敏捷验证、快速试错与 API 交付",
  },
] as const;

export const gettingStartedSteps = [
  {
    icon: "keyRound" as const,
    title: "申请开通功能",
    description: "开通后在控制台可访问「GPU 云函数」和「镜像仓库」。",
  },
  {
    icon: "squareTerminal" as const,
    title: "创建并部署云函数",
    description:
      "选择合适的「组织模板」或「公共模板」并配置 GPU 资源，完成部署。你也可以推送私有镜像，部署任意服务。",
  },
  {
    icon: "rocket" as const,
    title: "调用服务",
    description:
      "部署完成后获取「公网 API 端点」，通过 HTTP/WebSocket/gRPC 请求调用。",
  },
] as const;

export const capabilityCards = [
  {
    title: "快速构建与部署",
    bg: "bg-[#d6f2ff]",
    padRight: false,
    items: [
      "AI 推理服务一键部署，支持 PD 分离、多机并行",
      "多种主流框架与任意 ComfyUI 工作流模板，分钟级部署",
      "支持函数式资源声明，快速融入 CI/CD",
      "支持私有镜像推送部署，或基于公共模版一键部署",
    ],
  },
  {
    title: "高性能推理优化",
    bg: "bg-[#f1f1ff]",
    padRight: false,
    items: [
      "深度优化 LLM、ComfyUI 工作流，支持同步 / 异步 / 流式不同请求服务方式",
      "一键部署基于硅基流动 SiliconBoost 加速的海量模型",
      "自研推理引擎与算子优化，多芯环境高性能推理",
      "ComfyUI 节点专项优化，显著缩短生成耗时",
    ],
  },
  {
    title: "极致弹性与成本控制",
    bg: "bg-[#f1f1ff]",
    padRight: true,
    items: [
      "随需配置 GPU 规格，提供丰富且经验证的扩缩容指标及策略",
      "支持闲时自动挂起（Scale to 0）",
      "提供 Reserved*、On-demand、Spot* 等计费模式",
      "支持多种 GPU（NVIDIA、昇腾、沐曦、摩尔线程等）跨芯调度",
    ],
  },
  {
    title: "企业级高可用",
    bg: "bg-[#f1fff9]",
    padRight: false,
    items: [
      "多区域、多集群部署，自动实现跨区域负载均衡",
      "多芯支持，满足不同硬件环境下的推理需求",
      "多层安全隔离与加密机制，满足行业级合规要求",
      "支持纳管企业自有算力，构建私有弹性 GPU 集群",
    ],
  },
] as const;
