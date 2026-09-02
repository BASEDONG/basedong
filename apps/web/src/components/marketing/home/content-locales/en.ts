import type { HomeStrings } from "../content-types";

export const en: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong is live",
      title: "GPT-5.6",
      description:
        "The GPT-5.6 family — Sol (flagship), Terra (balanced), and Luna (fast) — delivers frontier performance for coding, agents, knowledge work, and scientific reasoning. Available on the platform now.",
      ctaLabel: "Try now",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Anthropic's latest flagship",
      title: "Opus 5",
      description:
        "Opus 5 is a major upgrade for coding, agents, and professional writing — built for complex, long-running tasks with sharper, more reliable outputs.",
      ctaLabel: "Try now",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "Limited-time free",
      title: "Auto models",
      description:
        "Intelligent routing picks the right model and balances speed, cost, and quality. Try it free for a limited time — zero barrier to large-model capabilities.",
      ctaLabel: "Try now",
      logoAlt: "Auto models",
    },
    {
      tabLabel: "Deployment",
      eyebrow: "Enterprise-grade",
      title: "Model service deployment",
      description:
        "Private deployment and elastic cloud scaling — model adaptation, inference acceleration, and ops support to keep mission-critical workloads running.",
      ctaLabel: "Learn more",
      logoAlt: "Model service deployment",
    },
  ],
  productMatrix: {
    title: "Full-stack products from idea to production",
    subtitle:
      "Unified access for developers and enterprises — connect AI to your business faster",
  },
  productCards: [
    {
      title: "On-premises private deployment",
      description:
        "For enterprises with compliance and data-sovereignty requirements: production-ready private setups, performance tuning, cluster deployment, and ongoing ops for every scenario.",
      ctaLabel: "Learn more",
    },
    {
      title: "Inference performance optimization",
      description:
        "Built on open inference engines, compatible with mainstream open models and custom models — from selection and tuning through production ops for higher throughput.",
      ctaLabel: "Contact us",
    },
    {
      title: "Free Auto models",
      description:
        "Intelligent routing balances speed, cost, and quality. Limited-time free access — zero barrier to large-model capabilities.",
      ctaLabel: "Try now",
    },
    {
      title: "Unified large-model API",
      description:
        "Text, speech, image, and video in one API — pay as you go so teams can integrate capabilities and ship faster.",
      ctaLabel: "Get started",
    },
  ],
  whySection: {
    title: "Why basedong",
  },
  whyHighlightCards: [
    {
      title: "High value",
      textBlocks: [
        {
          lines: [
            [{ text: "End-to-end" }, { text: "cost control", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Auto models" }, { text: "free for a limited time", emphasis: true }],
            [{ text: "Smart routing balances speed and cost" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Cut inference and deployment spend by up to", value: "40%" },
        { prefix: "Auto models free for a limited time — onboarding cost", value: "zero" },
      ],
      footnotes: [
        [{ text: "Transparent pay-as-you-go billing with predictable spend" }],
        [{ text: "Decoupled heterogeneous compute — schedule mainstream AI accelerators seamlessly" }],
        [
          { text: "Stable, predictable" },
          { text: "cost performance", emphasis: true },
          { text: " for cost-sensitive apps" },
        ],
      ],
    },
    {
      title: "High reliability",
      textBlocks: [
        {
          lines: [
            [{ text: "Multi-node" }, { text: "redundancy", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Monitoring, alerts, and self-healing", emphasis: true }],
            [{ text: "Keep services stable over the long run" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Multi-node redundancy — failover in", value: "seconds" },
        { prefix: "Enterprise support on demand, meeting", value: "SLA", suffix: "requirements" },
      ],
      footnotes: [
        [{ text: "Handle high concurrency and large batch inference workloads" }],
        [{ text: "Battle-tested by developers — stable in production" }],
        [
          { text: "Stable, predictable" },
          { text: "service performance", emphasis: true },
          { text: " for critical workloads" },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "Highly scalable",
      description:
        "Elastic scaling for traffic spikes and complex workloads. Ship custom models quickly and scale deployments with flexible architecture — hybrid and multi-cloud ready.",
    },
    {
      title: "Highly secure",
      description:
        "Optional BYOC — data stays in your domain. Compute, network, and storage isolation with industry compliance for enterprise security and audit requirements.",
    },
    {
      title: "Highly capable",
      description:
        "Frontier LLMs plus audio, video, and multimodal APIs in one place. Scale with your business and track usage and spend with clear analytics.",
    },
    {
      title: "Highly available",
      description:
        "Proven in production by developers worldwide. Monitoring, alerts, and self-healing plus enterprise support for SLA-critical workloads.",
    },
  ],
  industrySection: {
    title: "Industry solutions tailored to your deployment needs",
  },
  industryItems: [
    {
      title: "AI hardware",
      description:
        "For AI mobile devices, inference appliances, and embodied intelligence — lower edge-cloud latency and improve responsiveness.",
    },
    {
      title: "Government",
      description:
        "High-throughput, low-latency inference for smart government, public safety, and industrial upgrade — cost-effective generative AI on heterogeneous compute without vendor lock-in.",
    },
    {
      title: "AI compute centers",
      description:
        "Optimize scheduling and allocation to accelerate training and large-scale inference deployment.",
    },
    {
      title: "Education",
      description:
        "Intelligent teaching assistants with multi-model planning for personalized learning paths, instant Q&A, and better outcomes for teachers and students.",
    },
    {
      title: "Internet",
      description:
        "Content generation and personalization for platforms — hot-swappable models, inference acceleration, higher GPU utilization, and better UX and ops efficiency.",
    },
  ],
  partners: {
    title: "Customers and ecosystem partners",
    ctaPrimaryDesc: "Enable model APIs in minutes",
    ctaPrimaryButton: "Start trial",
    ctaSecondaryDesc: "Need a custom plan? Contact us",
    ctaSecondaryButton: "Submit request",
  },
  heroCarousel: {
    ariaLabel: "Homepage highlights",
    switchTabLabel: (tabLabel) => `Switch to ${tabLabel}`,
  },
};
