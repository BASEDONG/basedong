import type { ReservedStrings } from "../content-types";

export const es: ReservedStrings = {
  pageTitle: "Instancias reservadas | basedong",
  pageDescription:
    "Asegura capacidad para cargas críticas. Rendimiento predecible, mejor economía unitaria a escala, SLA empresarial.",
  heroLogoAlt: "Instancias reservadas",
  heroTitle: "Asegura capacidad",
  heroTitleAccent: "Mantén cargas críticas en marcha",
  heroSubtitle:
    "Rendimiento predecible · Mejor economía unitaria a escala · SLA empresarial",
  consultCta: "Reservar consulta",
  whyBadge: "WHY RESERVED",
  whyTitle: "Por qué instancias reservadas",
  whySubtitle:
    "Capacidad dedicada, fidelidad del modelo y control de costos para cargas de inferencia empresariales.",
  whyCards: [
    {
      title: "Capacidad reservada dedicada",
      items: [
        "Reserva cómputo para cargas core para que el tráfico pico sea predecible.",
        "Evita contención en pools compartidos y mantén apps críticas en línea.",
      ],
    },
    {
      title: "Fidelidad del modelo",
      items: [
        "Nuestro stack de inferencia se ajusta durante el despliegue para coincidir con baselines del vendor.",
        "Calidad de inteligencia estable para escenarios que no toleran drift.",
      ],
    },
    {
      title: "Costo predecible a escala",
      items: [
        "Precios a plazo fijo en lugar de variaciones de uso en facturación pay-as-you-go.",
        "Mejor economía para cargas altas estables y presupuestación a largo plazo.",
      ],
    },
    {
      title: "SLA empresarial",
      items: [
        "Niveles de servicio que mantienen trabajos de inferencia críticos funcionando de forma fiable.",
        "Diseñado para carga sostenida y sistemas de negocio en producción.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Precios y rendimiento de referencia",
  pricingSubtitle:
    "Las instancias reservadas vienen en varios tamaños. Configura por modelo, concurrencia y escala. Abajo specs de ejemplo y precios de referencia.",
  highPerfTitle: "Nivel de alto rendimiento",
  standardTitle: "Nivel estándar",
  pricingNote1:
    "El precio unitario efectivo se deriva del TPM arriba, asumiendo 30 días por mes y 50 % de utilización general.",
  pricingNote2:
    "Las cifras de rendimiento usan ajustes típicos de inferencia: 24k tokens de entrada, 1k de salida, 80 % de cache hit rate.",
  pricingFootCtaBefore:
    "Estas son specs de ejemplo. Para más modelos o despliegue personalizado, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Referencia de costo",
  priceLabel: "Precio",
  unitPriceLabel: "Precio unitario efectivo",
  perfReferenceLabel: "Referencia de rendimiento",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Entrega y operaciones empresariales",
  deliverySteps: [
    {
      title: "Despliegue rápido",
      description:
        "Las instancias reservadas estándar se despliegan en 1–7 días hábiles y se conectan rápido a sistemas existentes.",
    },
    {
      title: "Despliegue y ajuste",
      description:
        "Gestionamos despliegue, validación y ajuste de inferencia para que tus cargas aterricen sin fricción.",
    },
    {
      title: "Escalado elástico",
      description:
        "Expande capacidad o redimensiona specs conforme crece el tráfico o cambia estacionalmente.",
    },
    {
      title: "Garantías SLA",
      description:
        "Niveles de servicio claros y salvaguardas operativas para cargas empresariales de larga duración.",
    },
  ],
  ctaBadge: "Despliegues personalizados disponibles",
  ctaTitle: "Capacidad dedicada\npara crecer",
  ctaBody:
    "Soportamos más opciones de despliegue reservado. Nuestro equipo adaptará specs, rollout y precios a tu carga.",
  ctaCardTitle: "Obtener más detalles de instancias reservadas",
  ctaCardBody: "Reserva consulta para specs, opciones de despliegue y precios",
  ctaButton: "Contáctanos",
  highPerfModels: [
    {
      description:
        "Agents empresariales, planificación multi-paso, automatización de software, análisis de documentos largos y generación de código.",
      price: "¥ 772,200 / grupo / mes",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Agents multimodales, comprensión visual, design-to-code y automatización de tareas complejas.",
      price: "¥ 772,200 / grupo / mes",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Análisis de documentos largos y bases de conocimiento, bots de soporte, generación de contenido y automatización de workflows.",
      price: "¥ 386,100 / grupo / mes",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Razonamiento complejo, asistencia de código, agents con herramientas, analytics y workflows automatizados.",
      price: "¥ 772,200 / grupo / mes",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "12.5M",
    },
  ],
  standardModels: [
    {
      description:
        "Agents multimodales, comprensión visual, design-to-code y automatización de tareas complejas.",
      price: "¥ 486,000 / grupo / mes",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "5.3M",
    },
    {
      description:
        "Análisis de documentos largos y bases de conocimiento, bots de soporte, generación de contenido y automatización de workflows.",
      price: "¥ 486,000 / grupo / mes",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Razonamiento complejo, asistencia de código, agents con herramientas, analytics y workflows automatizados.",
      price: "¥ 486,000 / grupo / mes",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "10.8M",
    },
  ],
};
