import type { EnterpriseStrings } from "../content-types";

export const en: EnterpriseStrings = {
  introCards: [
    {
      title: "Unified ops for compute, models, and apps",
      description:
        "Observe, tune, and reclaim compute, models, and applications from one plane — keeping long-term operations stable and sustainable.",
    },
    {
      title: "Visual console plus standard APIs",
      description:
        "A visual control plane alongside standard APIs lowers the technical bar and connects quickly to diverse business scenarios.",
    },
    {
      title: "Mainstream models ready out of the box, deeply tunable",
      description:
        "Pre-built solutions for leading open models, continuously optimized across training and inference — shortening the path from selection to production.",
    },
    {
      title: "Multi-architecture compute pooling and smart scheduling",
      description:
        "Unified access and intelligent scheduling across GPU, NPU, and multi-vendor compute — no single-chip lock-in — so organizations get consistent performance and ops on existing hardware investments.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Industry applications",
      modules: [
        "Internet",
        "Education",
        "Finance",
        "Telecom",
        "Government",
        "AI compute",
        "Energy",
      ],
    },
    {
      kind: "divider",
      title: "API / Applications",
    },
    {
      kind: "section",
      title: "Model application development",
      modules: [
        "Developer toolchain",
        "App debug and release",
        "Prompt engineering",
        "Agent",
        "RAG",
        "Application frameworks",
        "Vector databases",
      ],
    },
    {
      kind: "section",
      title: "Model deployment and inference",
      modules: [
        "Model management",
        "Monitoring",
        "Resource configuration",
        "Video generation",
        "End-to-end optimization",
        "Inference acceleration",
        "Model deployment",
      ],
    },
    {
      kind: "section",
      title: "Model training and tuning",
      modules: [
        "Job management",
        "Performance tuning",
        "Model alignment",
        "Fine-tuning",
        "Model training",
        "Data processing",
        "Data ingestion",
      ],
    },
    {
      kind: "vendors",
      title: "Models",
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
    {
      kind: "section",
      title: "Compute resource management",
      modules: [
        "User and system administration",
        "Job scheduling",
        "Workflow scheduling",
        "Containerized compute management",
        "Compute pooling",
        "Compute quotas",
        "Heterogeneous resource adaptation",
      ],
    },
    {
      kind: "vendors",
      title: "Chips",
      vendors: [
        "NVIDIA",
        "Ascend",
        "AMD",
        "Cambricon",
        "Intel",
        "Hygon",
        "Moore Threads",
        "MetaX",
        "Enflame",
        "Kunlun",
      ],
    },
  ],
  advantageCards: [
    {
      title: "Secure · End-to-end protection, audit-ready compliance",
      description:
        "End-to-end data security and compliance — sharply lower leakage risk. Real-time threat blocking with 99%+ content safety accuracy.",
    },
    {
      title: "Cost control · Spend wisely, amplify ROI",
      description:
        "Fine-grained compute and memory scheduling cuts unit compute cost. Lossless dynamic quantization reduces per-inference compute use.",
    },
    {
      title: "Easy to use · Low learning curve for everyone",
      description:
        "Unified heterogeneous compute view with automated deployment and scheduling. Visual setup in under 3 minutes. 30+ templates — launch without manual tuning.",
    },
    {
      title: "Right fit · Data-driven selection balancing quality and safety",
      description:
        "Tag-based model catalog for fast shortlisting. 20+ core benchmark metrics built in to support decisions.",
    },
    {
      title: "Stable at scale · Production-grade performance for core loads",
      description:
        "Deep inference optimization: up to 70% lower latency, 3–5× throughput. Smart load balancing across compute and model services. Second-scale elasticity balancing performance and cost.",
    },
    {
      title: "Fast rollout · Shorter delivery, agile response to business",
      description:
        "100+ mainstream models pre-integrated and ready to use. Continuously updated model images with priority for new releases. Toolchain spans training, inference, fine-tuning, and deployment.",
    },
  ],
  scenarios: [
    {
      tab: "Energy",
      title: "Energy",
      description:
        "Built on large-and-small model collaboration, delivering AI services from training and fine-tuning through application deployment — driving digital transformation and operational efficiency in energy.",
      advantages: [
        "Intelligent equipment fault diagnosis: fuse logs and operating conditions to shorten detection and resolution cycles",
        "Power anomaly and load analysis: spot abnormal patterns to support dispatch and energy-saving decisions",
        "Procurement and ops knowledge assistants: industry knowledge stays on the intranet — production data never leaves the domain",
      ],
    },
    {
      tab: "AI compute center platform",
      title: "AI compute center platform",
      description:
        "Heterogeneous compute fusion enables cross-architecture unified scheduling and elastic supply — solving large-scale governance, open-model integration, and high-concurrency AI service stability while improving deployment and delivery speed.",
      advantages: [
        "Multi-tenant quotas plus cross-datacenter scheduling — elastic compute supply per project for external customers",
        "Model marketplace access with multi-version gray release — tenants self-select models and shorten delivery",
        "Rate limiting, circuit breaking, and horizontal scaling — high-concurrency external APIs with committed availability",
      ],
    },
    {
      tab: "Transportation",
      title: "Transportation",
      description:
        "Combines edge CV models for real-time processing with cloud multimodal LLM semantic understanding — building intelligent traffic management that semantically assesses accidents, violations, and complex events and generates response recommendations.",
      advantages: [
        "Structured handling recommendations for accidents and violations — faster frontline assessment and dispatch",
        "Edge-cloud collaboration cuts false positives and misses — stable response times even at peak traffic",
        "Private-network local deployment meets traffic compliance — continuously integrate new multimodal fine-tunes",
      ],
    },
    {
      tab: "Enterprise heterogeneous compute platform",
      title: "Enterprise heterogeneous compute platform",
      description:
        "Supports enterprise digital and intelligent transformation with a full chain from compute governance through model training to inference deployment — high-performance scheduling and modular architecture so compute and AI apps work together smoothly.",
      advantages: [
        "Unified multi-brand GPU / NPU access and pooling — utilization, queues, and quotas across datacenters in one view",
        "Shared resource pools and scheduling for training and inference — peak/off-peak balancing, less idle capacity and duplicate spend",
        "Standard OpenAPI integration with existing DevOps and business systems — new models without rebuilding from scratch",
      ],
    },
    {
      tab: "Telecom operators",
      title: "Telecom operators",
      description:
        "High-performance inference engine for high-concurrency, low-latency operations — minimal changes to existing systems, unlocking heterogeneous compute value and accelerating commercial AI capabilities.",
      advantages: [
        "Operational SLAs and elastic capacity for customer-facing high-concurrency, low-latency calls",
        "Minimal API / gateway changes to integrate live BSS / OSS and proprietary models",
        "Activate multi-vendor accelerator inventory — shorten time to commercial AI services",
      ],
    },
    {
      tab: "Manufacturing",
      title: "Manufacturing",
      description:
        "Large models parse complex test and production data, automatically identifying key patterns and anomalies — faster analysis, better decisions, and relief from slow, error-prone manual review.",
      advantages: [
        "Automated parsing of test and QC data — critical anomalies flagged in minutes, fewer misses and rework",
        "Results write back to MES / QC / scheduling nodes — less manual monitoring, faster closed loops",
        "Hot model updates without downtime — roll out new capabilities while production lines keep running",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Enterprise heterogeneous compute platform",
      training: {
        title: "Large model training",
        steps: ["Data preprocessing", "Development and training", "Training optimization"],
      },
      inference: {
        title: "Large model inference",
        steps: ["Model selection", "Model evaluation", "Rapid deployment"],
      },
      apps: {
        title: "Enterprise intelligent application scenarios",
        items: [
          "Intelligent proposal drafting",
          "Development and training",
          "Intelligent data Q&A",
          "Intelligent decision support",
          "Intelligent procurement",
          "Intelligent quoting",
        ],
      },
      apiUp: "Model API calls",
      apiDown: "Standardized interfaces",
      platform: "Heterogeneous compute governance",
      supportLeft: "Elastic scaling",
      supportRight: "High-concurrency calls",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "AI compute center platform",
      leftAudience: "For enterprise users",
      rightAudience: "For developer users",
      axisLeft: "Power AI applications",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Model invocation",
        "Dedicated instances",
        "Model fine-tuning",
        "Model hosting",
        "Multi-model integration",
        "Free trial",
        "Low-cost calls",
        "Rapid integration",
      ],
      modelServiceTitle: "Model services — rich large-model supply",
      models: [
        "Text models",
        "Speech models",
        "Image models",
        "Video models",
        "Code models",
        "Data models",
        "OCR models",
        "Embedding",
      ],
      sidePanels: ["Experience center", "Token billing"],
      integrateBar: "More commercial and open-source capabilities integrated",
      poolTitle: "Heterogeneous compute resource pool",
      vendors: [
        "NVIDIA",
        "AMD",
        "Ascend",
        "MetaX",
        "Enflame",
        "Hygon",
        "Iluvatar CoreX",
        "Cambricon",
        "Kunlun",
      ],
    },
    energy: {
      layout: "industryFunnel",
      title: "Energy",
      topMode: "apps",
      topItems: [
        "Intelligent solar plant after-sales support",
        "Intelligent power equipment fault diagnosis",
        "Intelligent wind project quoting",
        "Intelligent solar raw-material procurement",
        "Intelligent meeting minutes generation",
        "Intelligent commercial and industrial power anomaly analysis",
      ],
      hub: "MaaS platform",
      arc: [
        "Agent application development",
        "Knowledge management",
        "Inference and MaaS services",
        "Model training / fine-tuning",
      ],
      left: "Heterogeneous governance",
      right: "Inference acceleration",
      platform: "Multi-type GPUs",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Manufacturing",
      topMode: "service",
      topTitle: "Private model-as-a-service",
      topItems: [
        "Complex test data stream analysis",
        "Key information and anomaly pattern recognition",
        "Improved analysis efficiency and decision quality",
      ],
      hub: "Large and small model collaboration",
      left: "Large models",
      right: "Machine learning models",
      engine: "Inference acceleration engine",
      platform: "Multi-type GPUs",
    },
    transport: {
      layout: "transportFlow",
      title: "Transportation",
      trainingTitle: "Large model training platform",
      trainingSteps: [
        "Traffic data",
        "Model training",
        "Model evaluation",
        "Model deployment",
      ],
      edgeTitle: "Edge compute devices",
      edgeChip: "On-device large models",
      centerTitle: "Central inference platform",
      businessTitle: "Business application platform",
      flowEdgeToCenter: "Small-model recognition data",
      flowModelDown: "Model distribution",
      flowDataUp: "Data backflow",
      flowToBusiness: "Large-model secondary recognition",
      flowFromBusiness: "Business review data",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Telecom operators",
      topMode: "service",
      topTitle: "Private model-as-a-service",
      topItems: ["Low latency", "High throughput", "Long context"],
      hub: "Models",
      left: "Proprietary large models",
      right: "Open-source large models",
      engine: "Inference acceleration engine",
      platform: "Multi-type GPUs",
    },
  },
  testimonials: [
    {
      title: "A major energy enterprise",
      body: "We successfully deployed an industry-specific large model on the platform. Strong heterogeneous compute management and large-and-small model collaboration delivered measurable efficiency gains in intelligent fault diagnosis, procurement assistance, and power anomaly analysis. Private deployment keeps core business data secure and compliant, and the platform's long-term stability provides a reliable AI foundation for digital transformation — driving key processes toward smarter, more precise operations.",
      role: "Head of digital transformation",
    },
    {
      title: "A transportation IT enterprise",
      body: "While building a cloud-edge collaborative intelligent traffic system, basedong's large-model platform brought reliable cognitive intelligence to our solutions. Its ability to learn vertical scenario data and support multimodal tasks lets it align with industry terminology and business context. We have deployed intelligent decision-support applications that improve efficiency and response speed in fault assessment and command dispatch. Local deployment performance, ease of integration, and scenario customization match our business requirements well.",
      role: "Head of solutions",
    },
    {
      title: "A cloud compute service provider",
      body: "We partnered with basedong to build an enterprise-facing compute service platform. Its hardware-agnostic inference framework and multi-vendor compute orchestration let us maintain service stability while moving beyond single-GPU vendor lock-in — flexibly scheduling workloads across diverse accelerators. Inference acceleration, dynamic routing, and memory optimization significantly improved cluster utilization and lowered downstream inference costs. Flexible support for multiple model architectures helps us serve increasingly diverse large-model needs.",
      role: "Head of platform engineering",
    },
    {
      title: "A software and systems integration firm",
      body: "basedong's enterprise large-model platform strongly supports our work across industries. Unified development interfaces, flexible fine-tuning, and a complete toolchain have significantly shortened delivery cycles in finance, government, education, and other sectors. High inference efficiency and convenient private deployment lower implementation barriers for customers. Their engineering team responds quickly and collaborates effectively at critical milestones — an important partner in building intelligent service capabilities.",
      role: "Head of integration services",
    },
  ],
  faqItems: [
    {
      question: "How long does deployment to production typically take? What ongoing support is available?",
      answer:
        "For customers' existing mainstream accelerators and mixed compute environments, we provide validated standardized deployment plans — typical delivery is measured in weeks. basedong offers full-lifecycle technical support including deployment, training, operations assurance, and continuous version upgrades — keeping the platform stable and aligned with leading technology.",
    },
    {
      question: "Does the platform support deep vertical industry scenarios?",
      answer:
        "Yes. Beyond general large-model capabilities, the platform supports combining industry knowledge to build domain-specific models. In power, oil and gas, manufacturing, and other sectors, we have successfully deployed fault diagnosis, safety production, R&D assistance, and operations optimization — with toolchain support for industry data processing, model fine-tuning, and application integration.",
    },
    {
      question: "Can it support large-scale research, build, and use deployments?",
      answer:
        "Yes. basedong's private MaaS platform is designed for large-scale enterprise AI enablement. We have helped multiple energy enterprises achieve scaled rollouts — with 10,000-card heterogeneous scheduling, high-concurrency stability guarantees, and fine-grained resource management supporting the full chain from model R&D and agent development to massive endpoint inference.",
    },
    {
      question: "Can business users deploy AI applications independently?",
      answer:
        "Yes. The platform provides end-to-end visual workflows — from model selection, deployment, and testing through service launch — all via graphical interfaces, greatly lowering the barrier. Business users can independently invoke models and build applications after brief training, putting AI capability directly in the hands of frontline teams.",
    },
    {
      question: "How is data security ensured under private deployment?",
      answer:
        "Private deployment ensures all data and models run inside the enterprise environment. We also provide defense-in-depth: multi-tenant resource isolation, fine-grained access control, full-chain operation auditing, and real-time content safety detection — meeting stringent security and compliance requirements in finance, energy, government, and other regulated industries.",
    },
    {
      question: "How do you balance performance and cost?",
      answer:
        "Our high-performance inference engine (with PD separation, KV Cache quantization, and more) significantly improves throughput and reduces latency — lowering compute per task. Smart service gateways and second-scale elastic scaling dynamically allocate resources based on live load, avoiding idle compute. Together, these deliver better total cost of ownership while keeping critical workloads stable.",
    },
    {
      question: "How do you efficiently select models across multiple business scenarios?",
      answer:
        "The platform includes a tagged model marketplace — filter by task type, modality, parameter count, and more. More importantly, use our evaluation toolchain with your business data to compare candidate models on quality and performance, then apply one-click tuning for low-cost adaptation — scientifically locking in the best fit and reducing trial-and-error cost.",
    },
    {
      question: "Which chips are supported? Can performance stay stable across vendors?",
      answer:
        "The platform uses a hardware-agnostic architecture supporting NVIDIA, AMD, and other mainstream GPUs plus diverse NPUs and accelerators — with no lock-in to any single chip vendor. A unified inference framework and compute orchestration run stably in existing or mixed-vendor hardware environments, with adaptation and optimization for 100+ mainstream models. In practice with multinational customers, the platform delivers efficient, stable production inference across multi-region, multi-vendor compute environments.",
    },
    {
      question: "What key dimensions should guide private MaaS selection?",
      answer: `Evaluate across five dimensions:

① Technical agility (rich model library, fast new-model onboarding);
② Selection precision (evaluation and optimization tools using your own data);
③ Production-grade performance (inference latency, throughput, resource elasticity);
④ Security and compliance (multi-tenant isolation, audit logs, content filtering, and other enterprise protections);
⑤ Ease of use and operability (visual interfaces and unified scheduling that lower the barrier).`,
    },
    {
      question: "When should an enterprise build private MaaS?",
      answer: `Consider private MaaS when your organization faces any of the following:

① Business involves sensitive data (energy production, financial transactions, R&D data) with strict requirements to keep data on the corporate network;
② AI must scale to many business endpoints or scenarios with extremely high inference performance and stability requirements;
③ Heterogeneous compute of different brands and architectures across regions or business units needs unified governance and efficient utilization;
④ You want to keep pace with AI advances but lack an engineering team for ongoing model adaptation and optimization.`,
    },
  ],
};
