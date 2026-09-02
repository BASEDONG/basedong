import type { ReservedStrings } from "../content-types";

export const en: ReservedStrings = {
  pageTitle: "Reserved instances | basedong",
  pageDescription:
    "Lock in capacity for critical workloads. Predictable performance, better unit economics at scale, enterprise SLA.",
  heroLogoAlt: "Reserved instances",
  heroTitle: "Lock in capacity",
  heroTitleAccent: "Keep critical workloads running",
  heroSubtitle:
    "Predictable performance · Better unit economics at scale · Enterprise SLA",
  consultCta: "Book a consultation",
  whyBadge: "WHY RESERVED",
  whyTitle: "Why reserved instances",
  whySubtitle:
    "Dedicated capacity, model fidelity, and cost control for enterprise inference workloads.",
  whyCards: [
    {
      title: "Dedicated reserved capacity",
      items: [
        "Reserve compute for core workloads so peak traffic stays predictable.",
        "Avoid contention on shared pools and keep mission-critical apps online.",
      ],
    },
    {
      title: "Model fidelity",
      items: [
        "Our inference stack is tuned during deployment to match vendor baselines.",
        "Stable intelligence quality for scenarios that cannot tolerate drift.",
      ],
    },
    {
      title: "Predictable cost at scale",
      items: [
        "Fixed-term pricing instead of usage swings on pay-as-you-go billing.",
        "Better economics for steady high-load workloads and long-term budgeting.",
      ],
    },
    {
      title: "Enterprise SLA",
      items: [
        "Service levels that keep critical inference jobs running reliably.",
        "Built for sustained load and production business systems.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Reference pricing and performance",
  pricingSubtitle:
    "Reserved instances come in multiple sizes. Configure by model, concurrency, and scale. Below are sample specs and reference pricing.",
  highPerfTitle: "High-performance tier",
  standardTitle: "Standard tier",
  pricingNote1:
    "Effective unit price is derived from the TPM above, assuming 30 days per month and 50% overall utilization.",
  pricingNote2:
    "Performance figures use typical inference settings: 24k input tokens, 1k output tokens, 80% cache hit rate.",
  pricingFootCtaBefore:
    "These are sample specs. For more models or custom deployment, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Cost reference",
  priceLabel: "Price",
  unitPriceLabel: "Effective unit price",
  perfReferenceLabel: "Performance reference",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Enterprise delivery and operations",
  deliverySteps: [
    {
      title: "Fast deployment",
      description:
        "Standard reserved instances deploy in 1–7 business days and plug into existing systems quickly.",
    },
    {
      title: "Deployment and tuning",
      description:
        "We handle deployment, validation, and inference tuning so your workloads land smoothly.",
    },
    {
      title: "Elastic scaling",
      description:
        "Expand capacity or resize specs as traffic grows or shifts seasonally.",
    },
    {
      title: "SLA guarantees",
      description:
        "Clear service levels and operational safeguards for long-running enterprise workloads.",
    },
  ],
  ctaBadge: "Custom deployments available",
  ctaTitle: "Dedicated capacity\nfor growth",
  ctaBody:
    "We support more reserved deployment options. Our team will tailor specs, rollout, and pricing to your workload.",
  ctaCardTitle: "Get more reserved instance details",
  ctaCardBody: "Book a consultation for specs, deployment options, and pricing",
  ctaButton: "Talk to us",
  highPerfModels: [
    {
      description:
        "Enterprise agents, multi-step planning, software automation, long-document analysis, and code generation.",
      price: "¥ 772,200 / group / month",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Multimodal agents, vision understanding, design-to-code, and complex task automation.",
      price: "¥ 772,200 / group / month",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Long-document and knowledge-base analysis, support bots, content generation, and workflow automation.",
      price: "¥ 386,100 / group / month",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Complex reasoning, code assistance, tool-using agents, analytics, and automated workflows.",
      price: "¥ 772,200 / group / month",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "12.5M",
    },
  ],
  standardModels: [
    {
      description:
        "Multimodal agents, vision understanding, design-to-code, and complex task automation.",
      price: "¥ 486,000 / group / month",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "5.3M",
    },
    {
      description:
        "Long-document and knowledge-base analysis, support bots, content generation, and workflow automation.",
      price: "¥ 486,000 / group / month",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Complex reasoning, code assistance, tool-using agents, analytics, and automated workflows.",
      price: "¥ 486,000 / group / month",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "10.8M",
    },
  ],
};
