import type { ReservedStrings } from "../content-types";

export const hi: ReservedStrings = {
  pageTitle: "Reserved instances | basedong",
  pageDescription:
    "महत्वपूर्ण workloads के लिए capacity lock करें। Predictable performance, scale पर बेहतर unit economics, enterprise SLA।",
  heroLogoAlt: "Reserved instances",
  heroTitle: "Capacity lock करें",
  heroTitleAccent: "महत्वपूर्ण workloads चालू रखें",
  heroSubtitle:
    "Predictable performance · Scale पर बेहतर unit economics · Enterprise SLA",
  consultCta: "परामर्श बुक करें",
  whyBadge: "WHY RESERVED",
  whyTitle: "Reserved instances क्यों",
  whySubtitle:
    "Enterprise inference workloads के लिए dedicated capacity, model fidelity और cost control।",
  whyCards: [
    {
      title: "Dedicated reserved capacity",
      items: [
        "Core workloads के लिए compute reserve करें ताकि peak traffic predictable रहे।",
        "Shared pools पर contention से बचें और mission-critical apps online रखें।",
      ],
    },
    {
      title: "Model fidelity",
      items: [
        "Deployment के दौरान हमारा inference stack vendor baselines से match करने के लिए tune होता है।",
        "Drift सहन न करने वाले scenarios के लिए stable intelligence quality।",
      ],
    },
    {
      title: "Scale पर predictable cost",
      items: [
        "Pay-as-you-go billing पर usage swings के बजाय fixed-term pricing।",
        "Steady high-load workloads और long-term budgeting के लिए बेहतर economics।",
      ],
    },
    {
      title: "Enterprise SLA",
      items: [
        "Service levels जो critical inference jobs reliably चलाते हैं।",
        "Sustained load और production business systems के लिए built।",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Reference pricing और performance",
  pricingSubtitle:
    "Reserved instances कई sizes में आते हैं। Model, concurrency और scale से configure करें। नीचे sample specs और reference pricing।",
  highPerfTitle: "High-performance tier",
  standardTitle: "Standard tier",
  pricingNote1:
    "Effective unit price ऊपर TPM से derive होता है, 30 days per month और 50% overall utilization मानकर।",
  pricingNote2:
    "Performance figures typical inference settings use करते हैं: 24k input tokens, 1k output tokens, 80% cache hit rate।",
  pricingFootCtaBefore:
    "ये sample specs हैं। अधिक models या custom deployment के लिए, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Cost reference",
  priceLabel: "Price",
  unitPriceLabel: "Effective unit price",
  perfReferenceLabel: "Performance reference",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Enterprise delivery और operations",
  deliverySteps: [
    {
      title: "Fast deployment",
      description:
        "Standard reserved instances 1–7 business days में deploy होते हैं और existing systems में quickly plug in होते हैं।",
    },
    {
      title: "Deployment और tuning",
      description:
        "हम deployment, validation और inference tuning handle करते हैं ताकि workloads smoothly land हों।",
    },
    {
      title: "Elastic scaling",
      description:
        "Traffic grow हो या seasonally shift हो तो capacity expand या specs resize करें।",
    },
    {
      title: "SLA guarantees",
      description:
        "Long-running enterprise workloads के लिए clear service levels और operational safeguards।",
    },
  ],
  ctaBadge: "Custom deployments available",
  ctaTitle: "Dedicated capacity\nविकास के लिए",
  ctaBody:
        "हम अधिक reserved deployment options support करते हैं। हमारी team specs, rollout और pricing आपके workload के अनुसार tailor करेगी।",
  ctaCardTitle: "अधिक reserved instance details प्राप्त करें",
  ctaCardBody: "Specs, deployment options और pricing के लिए consultation बुक करें",
  ctaButton: "हमसे बात करें",
  highPerfModels: [
    {
      description:
        "Enterprise agents, multi-step planning, software automation, long-document analysis, और code generation।",
      price: "¥ 772,200 / group / month",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Multimodal agents, vision understanding, design-to-code, और complex task automation।",
      price: "¥ 772,200 / group / month",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Long-document और knowledge-base analysis, support bots, content generation, और workflow automation।",
      price: "¥ 386,100 / group / month",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Complex reasoning, code assistance, tool-using agents, analytics, और automated workflows।",
      price: "¥ 772,200 / group / month",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "12.5M",
    },
  ],
  standardModels: [
    {
      description:
        "Multimodal agents, vision understanding, design-to-code, और complex task automation।",
      price: "¥ 486,000 / group / month",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "5.3M",
    },
    {
      description:
        "Long-document और knowledge-base analysis, support bots, content generation, और workflow automation।",
      price: "¥ 486,000 / group / month",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Complex reasoning, code assistance, tool-using agents, analytics, और automated workflows।",
      price: "¥ 486,000 / group / month",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "10.8M",
    },
  ],
};
