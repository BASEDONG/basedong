import type { GatewayStrings } from "../content-types";

export const en: GatewayStrings = {
  archLayers: [
    {
      kind: "apps",
      title: "AI applications",
      modules: [
        "Agent",
        "RAG",
        "Conversational apps",
        "Workflows",
        "Batch inference",
        "Embedding retrieval",
        "Multimodal",
      ],
    },
    {
      kind: "divider",
      title: "API / Calls",
    },
    {
      kind: "section",
      title: "LLM inference service gateway",
      modules: [
        "Unified API",
        "Authentication",
        "Observability",
        "Billing",
        "Multi-tenancy",
        "Fallback",
        "Fine-grained access",
        "Policy routing",
        "Audit logs",
        "Rate limits & quotas",
      ],
    },
    {
      kind: "parallel-vendors",
      left: {
        title: "Third-party LLM inference services",
        vendors: [
          "DeepSeek",
          "Qwen",
          "Llama",
          "GLM",
          "Mistral",
          "InternLM",
          "Gemma",
          "Kimi",
        ],
      },
      right: {
        title: "Private MaaS platform",
        vendors: ["Private models", "Fine-tuned models"],
      },
    },
  ],
  advantageCards: [
    {
      title: "Orchestratable routing policies",
      description:
        "Configure dynamic routing, load balancing, and failover based on traffic and model service characteristics — keeping availability and business SLAs on track.",
    },
    {
      title: "Full-chain cost accounting",
      description:
        "Trace costs across end users, API keys, projects, organizations, models, and compute — reconstructing the full cost structure for precise accounting.",
    },
    {
      title: "Enterprise security and compliance",
      description:
        "Bidirectional redaction lowers privacy risk in real time, paired with sensitive-content blocking and audit logs so LLM workloads stay compliant and fully traceable.",
    },
    {
      title: "Unified multi-source model access",
      description:
        "Standardized integration with vendor models — centralized onboarding and invocation, replacing fragmented integrations and simplifying multi-vendor management.",
    },
    {
      title: "End-to-end model observability",
      description:
        "Multi-dimensional views of call volume, performance, and more — giving enterprises the data they need for model governance, lifecycle management, and routing tuning.",
    },
    {
      title: "Fine-grained governance",
      description:
        "Set model permissions, traffic, and quotas by user, API key, project, organization, and more — every call stays controlled and manageable.",
    },
  ],
  scenarios: [
    {
      tab: "Enterprise LLM capability platform",
      title: "Enterprise LLM capability platform",
      paragraphs: [
        "When multiple departments and business lines adopt LLMs at once, access patterns, permissions, and call policies tend to diverge — driving up unified management and ops cost.",
        "The LLM service gateway provides a single entry for access and call governance, centrally scheduling model resources and giving upstream apps and Agents a consistent, controlled channel.",
      ],
      cards: [
        { title: "Unified API", subtitle: "Faster onboarding" },
        { title: "Fine-grained access control", subtitle: "Easier management" },
        { title: "Multi-tenant isolation", subtitle: "Stronger security" },
      ],
    },
    {
      tab: "Multi-model orchestration",
      title: "Multi-model orchestration",
      paragraphs: [
        "Models differ in capability, performance, and cost — enterprises often need per-scenario call policies.",
        "The LLM service gateway routes and schedules by policy, making multi-model use more flexible and overall efficiency higher.",
      ],
      cards: [
        { title: "Intelligent model routing", subtitle: "More efficient ops" },
        { title: "Dynamic model switching", subtitle: "Zero switching cost" },
        { title: "A/B test support", subtitle: "Lower complexity" },
      ],
    },
    {
      tab: "Centralized observability and call governance",
      title: "Centralized observability and call governance",
      paragraphs: [
        "When model calls are scattered across apps and systems, it is hard to see the full picture — troubleshooting and optimization take longer.",
        "The LLM service gateway aggregates call logs and runtime metrics so enterprises can monitor usage in one place and keep improving governance.",
      ],
      cards: [
        { title: "Multi-dimensional analytics", subtitle: "Report output" },
        { title: "Anomaly alerts", subtitle: "Real-time monitoring" },
      ],
    },
    {
      tab: "High-frequency interaction: lower cost, faster response",
      title: "High-frequency interaction: lower cost, faster response",
      paragraphs: [
        "In high-frequency scenarios like intelligent customer service and search Q&A, call cost and latency directly hurt experience and operational efficiency.",
        "With caching and routing, enterprises can cut call cost without sacrificing quality and speed up high-frequency requests.",
      ],
      cards: [
        { title: "Real-time cost visibility", subtitle: "Controlled spend" },
        { title: "Dynamic quota adjustment", subtitle: "More efficient calls" },
      ],
    },
    {
      tab: "Mission-critical availability",
      title: "Mission-critical availability",
      paragraphs: [
        "If core business depends on a single model service, rate limits, performance jitter, or outages can disrupt continuity.",
        "The LLM service gateway supports multi-model routing and disaster-recovery policies — automatically switching on failure or degradation to keep business stable.",
      ],
      cards: [
        { title: "Automatic failover", subtitle: "Faster recovery" },
        { title: "Real-time health checks", subtitle: "Higher availability" },
      ],
    },
  ],
  testimonials: [
    {
      title: "Education",
      body: "As LLMs roll out in smart teaching, learning analytics, and intelligent Q&A, schools and teaching apps connect in parallel — driving demand for tiered permissions, call auditing, and usage tracking. The basedong LLM service gateway strengthens unified access and fine-grained governance, supporting consolidated campus management, compliant content review, and end-to-end observability — significantly improving model ops efficiency and teaching service stability.",
      role: "Head of teaching platform",
    },
    {
      title: "Offshore oil platforms",
      body: "With LLMs deployed for remote offshore ops, drilling data analysis, and safety compliance, latency, concurrency, and continuity requirements are higher than ever. Deployed on containerized edge data centers, the basedong LLM gateway routes intelligently by task type and context length, with automatic failover, edge high availability, and end-to-end observability — making model services for critical offshore workloads more stable and predictable.",
      role: "Head of platform operations",
    },
  ],
  faqItems: [
    {
      question: "Why do enterprises need an LLM service gateway?",
      answer: {
        type: "list",
        intro:
          "When enterprises use in-house, open-source, and third-party API models at the same time, these problems appear quickly:",
        items: [
          "Mixed model sources and protocols drive up integration cost",
          "Apps call models independently — fragmented chains with no unified management, audit, or observability",
          "Different apps have different SLA requirements that are hard to coordinate",
          "Usage and cost are hard to measure — decisions lack reliable data",
        ],
        outro: "An LLM service gateway addresses these challenges centrally.",
      },
    },
    {
      question: "We already have LLM APIs — why add a service gateway?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Direct API calls solve connectivity; the gateway solves control. As scale grows, runaway cost, security and compliance gaps, and vendor lock-in emerge. As a unified middle layer, the gateway helps enterprises control spend, protect the full chain, and switch models flexibly — a key step from AI pilots to production.",
        ],
      },
    },
    {
      question: "Can the LLM service gateway be deployed on-premises?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "For finance, government, and other sectors with strict data security requirements, the enterprise LLM service gateway supports on-premise deployment. Data processing and model forwarding stay inside the corporate network, protecting core assets.",
        ],
      },
    },
    {
      question: "How does the gateway control LLM usage cost?",
      answer: {
        type: "rich-list",
        intro: "The LLM service gateway provides multi-dimensional cost controls:",
        items: [
          {
            label: "Token quota management:",
            text: "Set spending caps for teams or projects to avoid budget overruns.",
          },
          {
            label: "Intelligent routing:",
            text: "Automatically pick the right model by task complexity (simple tasks can use lighter models).",
          },
          {
            label: "Request caching:",
            text: "Reduce duplicate calls and save Token spend directly.",
          },
        ],
      },
    },
    {
      question: "How does the gateway keep generated content compliant?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Built-in bidirectional content review: block sensitive inputs on the request side and filter non-compliant outputs on the response side. Custom word lists and compliance policies help AI-generated content meet regulations and brand standards.",
        ],
      },
    },
    {
      question: "Will adding the gateway slow down requests?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Built on cloud-native high-performance architecture, extra network overhead is typically in the millisecond range — barely noticeable to users. Intelligent traffic scheduling makes app-side SLAs easier to meet, and smart orchestration can further boost overall model service throughput.",
        ],
      },
    },
  ],
};
