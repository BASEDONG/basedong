import type { ReservedStrings } from "../content-types";

export const ptBR: ReservedStrings = {
  pageTitle: "Instâncias reservadas | basedong",
  pageDescription:
    "Garanta capacidade para cargas críticas. Performance previsível, melhor economia unitária em escala, SLA enterprise.",
  heroLogoAlt: "Instâncias reservadas",
  heroTitle: "Garanta capacidade",
  heroTitleAccent: "Mantenha cargas críticas rodando",
  heroSubtitle:
    "Performance previsível · Melhor economia unitária em escala · SLA enterprise",
  consultCta: "Agendar consulta",
  whyBadge: "WHY RESERVED",
  whyTitle: "Por que instâncias reservadas",
  whySubtitle:
    "Capacidade dedicada, fidelidade do modelo e controle de custo para cargas de inferência enterprise.",
  whyCards: [
    {
      title: "Capacidade reservada dedicada",
      items: [
        "Reserve compute para cargas core para que pico de tráfego seja previsível.",
        "Evite contenção em pools compartilhados e mantenha apps críticas online.",
      ],
    },
    {
      title: "Fidelidade do modelo",
      items: [
        "Nosso stack de inferência é ajustado no deploy para corresponder a baselines do vendor.",
        "Qualidade de inteligência estável para cenários que não toleram drift.",
      ],
    },
    {
      title: "Custo previsível em escala",
      items: [
        "Preço de prazo fixo em vez de oscilações de uso na cobrança pay-as-you-go.",
        "Melhor economia para cargas altas estáveis e orçamento de longo prazo.",
      ],
    },
    {
      title: "SLA enterprise",
      items: [
        "Níveis de serviço que mantêm jobs de inferência críticos rodando com confiabilidade.",
        "Feito para carga sustentada e sistemas de negócio em produção.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Preços e performance de referência",
  pricingSubtitle:
    "Instâncias reservadas vêm em vários tamanhos. Configure por modelo, concorrência e escala. Abaixo specs de exemplo e preços de referência.",
  highPerfTitle: "Tier de alta performance",
  standardTitle: "Tier padrão",
  pricingNote1:
    "Preço unitário efetivo deriva do TPM acima, assumindo 30 dias por mês e 50% de utilização geral.",
  pricingNote2:
    "Figuras de performance usam configurações típicas de inferência: 24k tokens de entrada, 1k de saída, 80% de cache hit rate.",
  pricingFootCtaBefore:
    "Estas são specs de exemplo. Para mais modelos ou deploy customizado, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Referência de custo",
  priceLabel: "Preço",
  unitPriceLabel: "Preço unitário efetivo",
  perfReferenceLabel: "Referência de performance",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Entrega e operações enterprise",
  deliverySteps: [
    {
      title: "Deploy rápido",
      description:
        "Instâncias reservadas padrão fazem deploy em 1–7 dias úteis e conectam rapidamente a sistemas existentes.",
    },
    {
      title: "Deploy e tuning",
      description:
        "Cuidamos de deploy, validação e tuning de inferência para suas cargas pousarem suavemente.",
    },
    {
      title: "Escala elástica",
      description:
        "Expanda capacidade ou redimensione specs conforme tráfego cresce ou muda sazonalmente.",
    },
    {
      title: "Garantias SLA",
      description:
        "Níveis de serviço claros e salvaguardas operacionais para cargas enterprise de longa duração.",
    },
  ],
  ctaBadge: "Deploys customizados disponíveis",
  ctaTitle: "Capacidade dedicada\npara crescimento",
  ctaBody:
    "Suportamos mais opções de deploy reservado. Nossa equipe adaptará specs, rollout e preços à sua carga.",
  ctaCardTitle: "Obter mais detalhes de instâncias reservadas",
  ctaCardBody: "Agende consulta para specs, opções de deploy e preços",
  ctaButton: "Fale conosco",
  highPerfModels: [
    {
      description:
        "Agents enterprise, planejamento multi-etapa, automação de software, análise de documentos longos e geração de código.",
      price: "¥ 772.200 / grupo / mês",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Agents multimodais, compreensão visual, design-to-code e automação de tarefas complexas.",
      price: "¥ 772.200 / grupo / mês",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Análise de documentos longos e bases de conhecimento, bots de suporte, geração de conteúdo e automação de workflows.",
      price: "¥ 386.100 / grupo / mês",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Raciocínio complexo, assistência de código, agents com ferramentas, analytics e workflows automatizados.",
      price: "¥ 772.200 / grupo / mês",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "12.5M",
    },
  ],
  standardModels: [
    {
      description:
        "Agents multimodais, compreensão visual, design-to-code e automação de tarefas complexas.",
      price: "¥ 486.000 / grupo / mês",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "5.3M",
    },
    {
      description:
        "Análise de documentos longos e bases de conhecimento, bots de suporte, geração de conteúdo e automação de workflows.",
      price: "¥ 486.000 / grupo / mês",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Raciocínio complexo, assistência de código, agents com ferramentas, analytics e workflows automatizados.",
      price: "¥ 486.000 / grupo / mês",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "10.8M",
    },
  ],
};
