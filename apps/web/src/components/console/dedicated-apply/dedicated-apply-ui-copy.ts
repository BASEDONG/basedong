import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type DedicatedApplyUiCopy = {
  pageTitle: string;
  hero: {
    titlePrefix: string;
    titleHighlight: string;
  };
  heroFeatures: readonly [string, string, string, string];
  productIntro: {
    heading: string;
    paragraphs: readonly { prefix: string; highlight: string; suffix: string }[];
  };
  betaApply: {
    title: string;
    line1Prefix: string;
    orgBold: string;
    line1Mid: string;
    personalBold: string;
    line1Suffix: string;
    orgActionBold: string;
    line1End: string;
  };
  audience: {
    heading: string;
    cards: readonly { title: string; description: string }[];
  };
  gettingStarted: {
    heading: string;
    subtitle: string;
    steps: readonly { title: string; description: string }[];
  };
  capabilities: {
    heading: string;
    footnote: string;
    cards: readonly { title: string; items: readonly string[] }[];
  };
};

const zhCN: DedicatedApplyUiCopy = {
  pageTitle: "GPU 云函数",
  hero: {
    titlePrefix: "弹性 GPU 服务 · ",
    titleHighlight: "公测开放申请",
  },
  heroFeatures: ["极致弹性", "高速推理", "多芯支持", "企业级高可用"],
  productIntro: {
    heading: "产品说明",
    paragraphs: [
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
          "是八色鸫面向 AI 推理场景打造的一站式推理部署平台，支持多种芯片与主流框架。用户可一键部署，极速启动，享受极致弹性与企业级高可用。帮助开发者与企业以更高效率、更低成本将推理服务部署到云端算力之上，加速 AI 应用从开发到生产落地。",
      },
    ],
  },
  betaApply: {
    title: "公测体验申请",
    line1Prefix: "本次公测 ",
    orgBold: "优先面向企业认证的组织账户",
    line1Mid: " 开放\n您当前为 ",
    personalBold: "个人账户",
    line1Suffix: "，建议 ",
    orgActionBold: "先创建组织并完成企业认证 ",
    line1End: "后再申请公测",
  },
  audience: {
    heading: "适用对象",
    cards: [
      {
        title: "Agent /智能体应用公司",
        description: "提供推理服务，支撑多 Agent 协同与任务执行",
      },
      {
        title: "互联网平台",
        description: "高并发低延迟推理、定制化部署",
      },
      {
        title: "传统企业",
        description: "合规保障、内部知识问答与流程自动化",
      },
      {
        title: "科研机构/ AI 模型公司",
        description: "提供推理算力支持，满足模型评测与规模化应用需求",
      },
      {
        title: "技术负责人",
        description: "架构性能调优、规模化推理与成本控制",
      },
      {
        title: "产品与创新负责人",
        description: "MVP 敏捷验证、快速试错与 API 交付",
      },
    ],
  },
  gettingStarted: {
    heading: "开始使用",
    subtitle: "只需 3 步，即可完成 GPU 云函数的部署与调用",
    steps: [
      {
        title: "申请开通功能",
        description: "开通后在控制台可访问「GPU 云函数」和「镜像仓库」。",
      },
      {
        title: "创建并部署云函数",
        description:
          "选择合适的「组织模板」或「公共模板」并配置 GPU 资源，完成部署。你也可以推送私有镜像，部署任意服务。",
      },
      {
        title: "调用服务",
        description:
          "部署完成后获取「公网 API 端点」，通过 HTTP/WebSocket/gRPC 请求调用。",
      },
    ],
  },
  capabilities: {
    heading: "产品能力",
    footnote: "*即将上线功能",
    cards: [
      {
        title: "快速构建与部署",
        items: [
          "AI 推理服务一键部署，支持 PD 分离、多机并行",
          "多种主流框架与任意 ComfyUI 工作流模板，分钟级部署",
          "支持函数式资源声明，快速融入 CI/CD",
          "支持私有镜像推送部署，或基于公共模版一键部署",
        ],
      },
      {
        title: "高性能推理优化",
        items: [
          "深度优化 LLM、ComfyUI 工作流，支持同步 / 异步 / 流式不同请求服务方式",
          "一键部署基于八色鸫 SiliconBoost 加速的海量模型",
          "自研推理引擎与算子优化，多芯环境高性能推理",
          "ComfyUI 节点专项优化，显著缩短生成耗时",
        ],
      },
      {
        title: "极致弹性与成本控制",
        items: [
          "随需配置 GPU 规格，提供丰富且经验证的扩缩容指标及策略",
          "支持闲时自动挂起（Scale to 0）",
          "提供 Reserved*、On-demand、Spot* 等计费模式",
          "支持多种 GPU（NVIDIA、昇腾、沐曦、摩尔线程等）跨芯调度",
        ],
      },
      {
        title: "企业级高可用",
        items: [
          "多区域、多集群部署，自动实现跨区域负载均衡",
          "多芯支持，满足不同硬件环境下的推理需求",
          "多层安全隔离与加密机制，满足行业级合规要求",
          "支持纳管企业自有算力，构建私有弹性 GPU 集群",
        ],
      },
    ],
  },
};

const en: DedicatedApplyUiCopy = {
  pageTitle: "GPU Cloud Functions",
  hero: {
    titlePrefix: "Elastic GPU · ",
    titleHighlight: "Beta access open",
  },
  heroFeatures: [
    "Extreme elasticity",
    "High-speed inference",
    "Multi-chip support",
    "Enterprise-grade HA",
  ],
  productIntro: {
    heading: "Product overview",
    paragraphs: [
      {
        prefix:
          "To better serve enterprise users, we are now opening beta access for ",
        highlight: "Elastic GPU",
        suffix:
          ". This beta aims to provide high-performance, reliable GPU compute for AI inference, deep learning, scientific computing, graphics rendering, and other workloads.",
      },
      {
        prefix: "",
        highlight: "Elastic GPU",
        suffix:
          " is basedong's one-stop inference deployment platform for AI inference, supporting multiple chips and mainstream frameworks. Deploy with one click, start instantly, and enjoy extreme elasticity with enterprise-grade high availability. Help developers and enterprises deploy inference to cloud compute faster and at lower cost, accelerating AI apps from development to production.",
      },
    ],
  },
  betaApply: {
    title: "Beta access request",
    line1Prefix: "This beta is ",
    orgBold: "primarily open to enterprise-verified organization accounts",
    line1Mid: ", now open\nYou currently have a ",
    personalBold: "personal account",
    line1Suffix: ". We recommend ",
    orgActionBold: "creating an organization and completing enterprise verification ",
    line1End: "before applying for beta access.",
  },
  audience: {
    heading: "Who it's for",
    cards: [
      {
        title: "Agent / AI agent companies",
        description:
          "Run inference services supporting multi-agent collaboration and task execution",
      },
      {
        title: "Internet platforms",
        description: "High-concurrency, low-latency inference with custom deployment",
      },
      {
        title: "Traditional enterprises",
        description:
          "Compliance, internal knowledge Q&A, and workflow automation",
      },
      {
        title: "Research institutes / AI model companies",
        description:
          "Inference compute for model evaluation and scaled production use",
      },
      {
        title: "Technical leaders",
        description: "Architecture tuning, scaled inference, and cost control",
      },
      {
        title: "Product & innovation leaders",
        description: "Agile MVP validation, rapid iteration, and API delivery",
      },
    ],
  },
  gettingStarted: {
    heading: "Getting started",
    subtitle: "Deploy and invoke GPU Cloud Functions in just 3 steps",
    steps: [
      {
        title: "Request access",
        description:
          'After approval, access "GPU Cloud Functions" and "Image Registry" in the console.',
      },
      {
        title: "Create and deploy a function",
        description:
          'Choose an organization or public template, configure GPU resources, and deploy. You can also push a private image to deploy any service.',
      },
      {
        title: "Invoke your service",
        description:
          'After deployment, use the public API endpoint via HTTP, WebSocket, or gRPC.',
      },
    ],
  },
  capabilities: {
    heading: "Capabilities",
    footnote: "*Coming soon",
    cards: [
      {
        title: "Fast build & deploy",
        items: [
          "One-click AI inference deployment with PD disaggregation and multi-node parallelism",
          "Mainstream frameworks and any ComfyUI workflow template — deploy in minutes",
          "Function-style resource declarations for easy CI/CD integration",
          "Push private images or deploy from public templates with one click",
        ],
      },
      {
        title: "High-performance inference",
        items: [
          "Deep optimization for LLMs and ComfyUI workflows — sync, async, and streaming modes",
          "One-click deployment of models accelerated by basedong SiliconBoost",
          "In-house inference engine and operator optimizations for multi-chip performance",
          "ComfyUI node optimizations that significantly reduce generation time",
        ],
      },
      {
        title: "Elasticity & cost control",
        items: [
          "Configure GPU specs on demand with proven scaling metrics and policies",
          "Automatic idle suspend (Scale to 0)",
          "Reserved*, On-demand, and Spot* billing modes",
          "Cross-chip scheduling across NVIDIA, Ascend, MetaX, Moore Threads, and more",
        ],
      },
      {
        title: "Enterprise-grade HA",
        items: [
          "Multi-region, multi-cluster deployment with automatic cross-region load balancing",
          "Multi-chip support for diverse hardware environments",
          "Multi-layer security isolation and encryption for industry compliance",
          "Bring your own compute to build a private elastic GPU cluster",
        ],
      },
    ],
  },
};

const zhTW: DedicatedApplyUiCopy = {
  ...zhCN,
  pageTitle: "GPU 雲函數",
  hero: {
    titlePrefix: "彈性 GPU 服務 · ",
    titleHighlight: "公測開放申請",
  },
  heroFeatures: ["極致彈性", "高速推理", "多芯支援", "企業級高可用"],
  productIntro: {
    heading: "產品說明",
    paragraphs: [
      {
        prefix: "為了更好地服務企業級使用者，我們現正式開放",
        highlight: "「彈性 GPU」",
        suffix:
          "服務公測申請。本次公測旨在為企業使用者提供高效能、穩定可靠的 GPU 算力支援，助力 AI 推理、深度學習、科學計算、圖形渲染等業務場景的發展。",
      },
      {
        prefix: "",
        highlight: "「彈性 GPU」",
        suffix:
          "是八色鴝面向 AI 推理場景打造的一站式推理部署平台，支援多種晶片與主流框架。使用者可一鍵部署，極速啟動，享受極致彈性與企業級高可用。幫助開發者與企業以更高效率、更低成本將推理服務部署到雲端算力之上，加速 AI 應用從開發到生產落地。",
      },
    ],
  },
  betaApply: {
    title: "公測體驗申請",
    line1Prefix: "本次公測 ",
    orgBold: "優先面向企業認證的組織帳戶",
    line1Mid: " 開放\n您目前為 ",
    personalBold: "個人帳戶",
    line1Suffix: "，建議 ",
    orgActionBold: "先建立組織並完成企業認證 ",
    line1End: "後再申請公測",
  },
  audience: {
    heading: "適用對象",
    cards: [
      {
        title: "Agent / 智能體應用公司",
        description: "提供推理服務，支撐多 Agent 協同與任務執行",
      },
      {
        title: "網際網路平台",
        description: "高並發低延遲推理、客製化部署",
      },
      {
        title: "傳統企業",
        description: "合規保障、內部知識問答與流程自動化",
      },
      {
        title: "科研機構 / AI 模型公司",
        description: "提供推理算力支援，滿足模型評測與規模化應用需求",
      },
      {
        title: "技術負責人",
        description: "架構效能調優、規模化推理與成本控制",
      },
      {
        title: "產品與創新負責人",
        description: "MVP 敏捷驗證、快速試錯與 API 交付",
      },
    ],
  },
  gettingStarted: {
    heading: "開始使用",
    subtitle: "只需 3 步，即可完成 GPU 雲函數的部署與呼叫",
    steps: [
      {
        title: "申請開通功能",
        description: "開通後在控制台可存取「GPU 雲函數」和「映像倉庫」。",
      },
      {
        title: "建立並部署雲函數",
        description:
          "選擇合適的「組織範本」或「公共範本」並設定 GPU 資源，完成部署。你也可以推送私有映像，部署任意服務。",
      },
      {
        title: "呼叫服務",
        description:
          "部署完成後取得「公網 API 端點」，透過 HTTP/WebSocket/gRPC 請求呼叫。",
      },
    ],
  },
  capabilities: {
    heading: "產品能力",
    footnote: "*即將上線功能",
    cards: [
      {
        title: "快速建構與部署",
        items: [
          "AI 推理服務一鍵部署，支援 PD 分離、多機並行",
          "多種主流框架與任意 ComfyUI 工作流範本，分鐘級部署",
          "支援函數式資源宣告，快速融入 CI/CD",
          "支援私有映像推送部署，或基於公共範本一鍵部署",
        ],
      },
      {
        title: "高效能推理優化",
        items: [
          "深度優化 LLM、ComfyUI 工作流，支援同步 / 非同步 / 串流不同請求服務方式",
          "一鍵部署基於八色鴝 SiliconBoost 加速的海量模型",
          "自研推理引擎與算子優化，多芯環境高效能推理",
          "ComfyUI 節點專項優化，顯著縮短生成耗時",
        ],
      },
      {
        title: "極致彈性與成本控制",
        items: [
          "隨需設定 GPU 規格，提供豐富且經驗證的擴縮容指標及策略",
          "支援閒時自動掛起（Scale to 0）",
          "提供 Reserved*、On-demand、Spot* 等計費模式",
          "支援多種 GPU（NVIDIA、昇騰、沐曦、摩爾執行緒等）跨芯調度",
        ],
      },
      {
        title: "企業級高可用",
        items: [
          "多區域、多叢集部署，自動實現跨區域負載均衡",
          "多芯支援，滿足不同硬體環境下的推理需求",
          "多層安全隔離與加密機制，滿足行業級合規要求",
          "支援納管企業自有算力，建構私有彈性 GPU 叢集",
        ],
      },
    ],
  },
};

function fromEn(partial: Partial<DedicatedApplyUiCopy>): DedicatedApplyUiCopy {
  return {
    ...en,
    ...partial,
    hero: { ...en.hero, ...partial.hero },
    productIntro: {
      ...en.productIntro,
      ...partial.productIntro,
      paragraphs: partial.productIntro?.paragraphs ?? en.productIntro.paragraphs,
    },
    betaApply: { ...en.betaApply, ...partial.betaApply },
    audience: {
      ...en.audience,
      ...partial.audience,
      cards: partial.audience?.cards ?? en.audience.cards,
    },
    gettingStarted: {
      ...en.gettingStarted,
      ...partial.gettingStarted,
      steps: partial.gettingStarted?.steps ?? en.gettingStarted.steps,
    },
    capabilities: {
      ...en.capabilities,
      ...partial.capabilities,
      cards: partial.capabilities?.cards ?? en.capabilities.cards,
    },
    heroFeatures: partial.heroFeatures ?? en.heroFeatures,
  };
}

const ja = fromEn({ pageTitle: "GPU クラウド関数" });
const fr = fromEn({ pageTitle: "Fonctions cloud GPU" });
const ru = fromEn({ pageTitle: "Облачные GPU-функции" });
const vi = fromEn({ pageTitle: "Hàm đám mây GPU" });
const ko = fromEn({ pageTitle: "GPU 클라우드 함수" });
const de = fromEn({ pageTitle: "GPU-Cloud-Funktionen" });
const es = fromEn({ pageTitle: "Funciones cloud GPU" });
const ptBR = fromEn({ pageTitle: "Funções cloud GPU" });
const ar = fromEn({ pageTitle: "دوال GPU السحابية" });
const hi = fromEn({ pageTitle: "GPU क्लाउड फ़ंक्शन" });
const id = fromEn({ pageTitle: "Fungsi cloud GPU" });

const DEDICATED_APPLY_UI_COPY: Record<TargetLocale, DedicatedApplyUiCopy> = {
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

export function getDedicatedApplyUiCopy(locale: string): DedicatedApplyUiCopy {
  return pickTargetCatalog(locale, DEDICATED_APPLY_UI_COPY);
}
