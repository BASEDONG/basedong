import type { Advantage, NavItem, ProductBlock, TocItem } from "./content-types";

export const docsOrigin = "https://docs.basedong.local";
export const logoHref = "/";

export const pageMeta = {
  breadcrumb: "使用指南",
  title: "平台简介",
  description:
    "basedong 平台简介：通过 basedong-api Relay 按词元计费调用大模型，使用 API Key 鉴权。",
};

export const overview =
  "basedong 面向开发者提供 OpenAI 兼容的模型 Relay。将客户端 Base URL 指向 basedong-api 源站（例如 http://localhost:3000 或生产 Relay 域名），使用 Console 签发的 API Key 调用 /v1/chat/completions 等接口；用量按词元扣减额度。客户 Console 在 basedong Web，运维 Admin 使用 basedong-api 原版后台。";

export const products: ProductBlock[] = [
  {
    id: "开箱即用的大模型-api",
    title: "开箱即用的大模型 API",
    bullets: [
      "覆盖语言、语音、图片、视频、向量等场景和模态",
      "兼容 OpenAI、Anthropic 对话协议，无缝接入各类工具",
    ],
  },
  {
    id: "预留实例",
    title: "预留实例",
    bullets: [
      "面向企业核心 AI 推理场景",
      "算力独占、精度保障、成本优化的一站式专属 AI 服务解决方案",
    ],
  },
  {
    id: "高效能模型推理加速服务",
    title: "高效能模型推理加速服务",
    bullets: ["主流开源模型适配与自研模型接入", "极低时延，极致速度、极限性能"],
  },
  {
    id: "私有化部署",
    title: "私有化部署",
    bullets: [
      "企业级私有化方案，涵盖网关、推理全链路",
      "一站式解决模型部署、性能优化、运维服务痛点",
    ],
  },
];

export const advantages: Advantage[] = [
  {
    title: "高速推理",
    bullets: [
      "专有推理引擎可将推理延迟最高降低 70%，并将吞吐量提升 3 至 5 倍",
      "自研高效算子和优化框架，推理加速引擎全球第一梯队",
      "极致提升吞吐能力，全面支持高吞吐场景的业务需求",
      "显著优化计算延迟，为低延迟场景提供卓越性能保障",
    ],
  },
  {
    title: "高性价比",
    bullets: [
      "动态量化技术可降低 60% 至 80% 的推理计算需求，最大化 Token 生产效率",
      "端到端极致优化，推理和部署成本显著降低",
      "提供灵活按需付费模式，减少资源浪费，精准控制预算",
      "支持国产异构 GPU 部署，基于企业已有投资，节省企业投入",
    ],
  },
  {
    title: "高稳定性",
    bullets: [
      "企业级 SLA 保障，经过开发者验证，保证高可靠稳定运行",
      "提供完善的监控和容错机制，保障服务能力",
      "提供专业技术支持，满足企业级场景需求，确保服务高可用性",
    ],
  },
  {
    title: "高智能",
    bullets: [
      "提供多种先进模型服务，包括大语言模型、音视频等多模态模型",
      "智能扩展功能，灵活适配业务规模，满足多种服务需求",
      "智能成本分析，为业务优化提供支持，助力成本管控与效益提升",
    ],
  },
  {
    title: "高安全性",
    bullets: [
      "支持 BYOC 部署，全面保护数据隐私与业务安全",
      "计算隔离/网络隔离/存储隔离，保障数据安全",
      "符合行业标准与合规要求，全面满足企业级用户的安全需求",
    ],
  },
  {
    title: "高扩展性",
    bullets: [
      "动态扩容支持弹性业务模型，无缝适配多种复杂场景",
      "一键部署自定义模型，轻松应对规模化挑战",
      "灵活架构设计，满足多样化任务需求，支持混合云部署",
    ],
  },
];

export const scenarios: { title: string; text: string }[] = [
  {
    title: "Agent & Coding",
    text: "一键接入主流 Agent 与 Coding 应用，占领 AI 生产力高地",
  },
  { title: "AI 应用开发", text: "快速集成大模型能力，构建智能应用" },
  { title: "内容创作", text: "利用文本、图像、视频生成模型辅助创作" },
  {
    title: "企业智能化",
    text: "通过私有化部署和预留实例满足企业核心推理需求",
  },
  {
    title: "行业解决方案",
    text: "覆盖互联网、教育、政务、智算中心、AI 硬件等领域",
  },
];

export const contactEmail = "basedong@88.com";

export const moreLinks: { label: string; href: string }[] = [
  { label: "八色鸫平台", href: "/me/models" },
  { label: "八色鸫官网", href: "/" },
  { label: "预留实例", href: "/reserved" },
  {
    label: "企业级 MaaS 平台（私有化）",
    href: "/enterprise",
  },
  {
    label: "私有化大模型服务网关",
    href: "/ai-gateway",
  },
  {
    label: "AI 算力运营服务",
    href: "/token-factory",
  },
];

export const nextPage = {
  title: "快速上手",
  description:
    "新用户快速入门指南，从注册登录到获取 API Key 并完成首次模型调用的完整流程。",
  href: "/docs/api",
};

export const tocItems: TocItem[] = [
  {
    "id": "概述",
    "title": "概述",
    "depth": 2
  },
  {
    "id": "核心产品矩阵",
    "title": "核心产品矩阵",
    "depth": 2
  },
  {
    "id": "开箱即用的大模型-api",
    "title": "开箱即用的大模型 API",
    "depth": 3
  },
  {
    "id": "预留实例",
    "title": "预留实例",
    "depth": 3
  },
  {
    "id": "高效能模型推理加速服务",
    "title": "高效能模型推理加速服务",
    "depth": 3
  },
  {
    "id": "私有化部署",
    "title": "私有化部署",
    "depth": 3
  },
  {
    "id": "平台优势",
    "title": "平台优势",
    "depth": 2
  },
  {
    "id": "适用场景",
    "title": "适用场景",
    "depth": 2
  },
  {
    "id": "联系我们",
    "title": "联系我们",
    "depth": 2
  },
  {
    "id": "更多",
    "title": "更多",
    "depth": 2
  }
];

export const navItems: NavItem[] = [
  {
    "type": "folder",
    "label": "使用指南",
    "defaultOpen": true,
    "children": [
      {
        "type": "link",
        "label": "平台简介",
        "href": "/docs/userguide/introduction",
        "active": true
      },
      {
        "type": "link",
        "label": "快速上手",
        "href": "/docs/api",
        "active": false
      },
      {
        "type": "section",
        "label": "对话模型",
        "children": [
          {
            "type": "link",
            "label": "开始使用",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "流式输出",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "推理模型",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "Function Calling",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "JSON 模式",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "多模态输入",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "前缀续写",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "FIM 补全",
            "href": "/docs/api",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "多模态生成",
        "children": [
          {
            "type": "link",
            "label": "图片生成",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "视频生成",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "语音合成",
            "href": "/docs/api",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "功能特性",
        "children": [
          {
            "type": "link",
            "label": "模型微调",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "批量推理",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "Rate Limits",
            "href": "/docs/api",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "常见问题",
        "children": [
          {
            "type": "link",
            "label": "实名认证",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "API 请求错误排查",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "模型问题排查",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "财务相关",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "账户相关",
            "href": "/docs/api",
            "active": false
          },
          {
            "type": "link",
            "label": "上架合作",
            "href": "/docs/api",
            "active": false
          }
        ]
      }
    ]
  },
  {
    "type": "folder",
    "label": "场景示例",
    "defaultOpen": false,
    "children": [
      {
        "type": "link",
        "label": "Claude Code",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "DeepSeek Harness",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "CC Switch",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Codex",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Cline",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Continue",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Qoder",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Kilo Code",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "OpenCode",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Dify",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "TRAE",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Tyrion",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Zadig",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "轻流无代码开发平台",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "translate.js",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "微服务编排框架 Juggle",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "LangBot",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "CodeWave",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Refly",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "NoBase",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "AstrBot",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "LazyLLM",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "LazyCraft",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "ClawX",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Bob 翻译",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "沉浸式翻译",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Para 翻译",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "PDFMathTranslate Next",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Trancy",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "精挑翻译",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "轻量翻译",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "ChatHub",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Chatbox",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "NextChat",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Cherry Studio",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "eechat",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "问道",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "却惑几菩提",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Chatika",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "RikkaHub",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "清雅",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Open Course",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "说点啥",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "302.AI",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "麦悠电台",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Obsidian Copilot",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "NoteGen",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "ToMemo",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Sider",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "飞书多维表格",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "minbricks 智能小说编辑器",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "DeepStudent",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "飞速 MarkDown",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Next AI Draw.io",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Snaptium",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "OpenManus",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Chat2Graph",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "DB-GPT",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "FastGPT",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "MindSearch",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "wiseflow AI 首席情报官",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "MarketAssistant",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "Deep Research Web UI",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "ValueCell",
        "href": "/docs/api"
      },
      {
        "type": "link",
        "label": "社区场景与应用",
        "href": "/docs/api"
      }
    ]
  },
  {
    "type": "folder",
    "label": "API手册",
    "defaultOpen": true,
    "children": [
      {
        "type": "section",
        "label": "文本系列",
        "children": [
          {
            "type": "link",
            "label": "创建对话请求(OpenAI)",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "创建对话请求(Anthropic)",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "创建嵌入请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "创建重排序请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "图像系列",
        "children": [
          {
            "type": "link",
            "label": "创建图片生成请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "语音系列",
        "children": [
          {
            "type": "link",
            "label": "上传参考音频",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "创建文本转语音请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "获取参考音频列表",
            "href": "/docs/api",
            "method": "GET",
            "active": false
          },
          {
            "type": "link",
            "label": "删除参考音频",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "创建语音转文本请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "视频系列",
        "children": [
          {
            "type": "link",
            "label": "创建视频生成请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "获取视频生成链接请求",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "批量处理",
        "children": [
          {
            "type": "link",
            "label": "获取文件列表",
            "href": "/docs/api",
            "method": "GET",
            "active": false
          },
          {
            "type": "link",
            "label": "上传文件",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "获取batch任务列表",
            "href": "/docs/api",
            "method": "GET",
            "active": false
          },
          {
            "type": "link",
            "label": "创建batch任务",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          },
          {
            "type": "link",
            "label": "获取batch任务详情",
            "href": "/docs/api",
            "method": "GET",
            "active": false
          },
          {
            "type": "link",
            "label": "取消batch任务",
            "href": "/docs/api",
            "method": "POST",
            "active": false
          }
        ]
      },
      {
        "type": "section",
        "label": "平台系列",
        "children": [
          {
            "type": "link",
            "label": "获取用户模型列表",
            "href": "/docs/api",
            "method": "GET",
            "active": false
          }
        ]
      }
    ]
  },
  {
    "type": "folder",
    "label": "条款与协议",
    "defaultOpen": false,
    "children": [
      {
        "type": "link",
        "label": "平台使用协议",
        "href": "/legals/user-agreement"
      },
      {
        "type": "link",
        "label": "隐私政策",
        "href": "/legals/user-agreement"
      },
      {
        "type": "link",
        "label": "隐私政策摘要",
        "href": "/legals/user-agreement"
      },
      {
        "type": "link",
        "label": "个人信息收集清单",
        "href": "/legals/user-agreement"
      },
      {
        "type": "link",
        "label": "账户主体变更协议",
        "href": "/legals/user-agreement"
      },
      {
        "type": "link",
        "label": "用户充值协议",
        "href": "/legals/user-agreement"
      },
      {
        "type": "link",
        "label": "第三方共享信息清单和第三方 SDK 目录",
        "href": "/legals/user-agreement"
      }
    ]
  },
  {
    "type": "link",
    "label": "更新公告",
    "href": "/docs/api",
    "active": false
  },
  {
    "type": "section",
    "label": "更多",
    "children": [
      {
        "type": "link",
        "label": "八色鸫平台",
        "href": "/me/models",
        "active": false
      },
      {
        "type": "link",
        "label": "八色鸫官网",
        "href": "/",
        "active": false
      },
      {
        "type": "link",
        "label": "预留实例",
        "href": "/reserved",
        "active": false
      },
      {
        "type": "link",
        "label": "企业级 MaaS 平台（私有化）",
        "href": "/enterprise",
        "active": false
      },
      {
        "type": "link",
        "label": "私有化大模型服务网关",
        "href": "/ai-gateway",
        "active": false
      },
      {
        "type": "link",
        "label": "AI 算力运营服务",
        "href": "/token-factory",
        "active": false
      }
    ]
  }
];
