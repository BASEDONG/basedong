import type { HomeStrings } from "../content-types";

export const es: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong ya está disponible",
      title: "GPT-5.6",
      description:
        "La familia GPT-5.6 — Sol (insignia), Terra (equilibrado) y Luna (rápido) — ofrece rendimiento de vanguardia para programación, agentes, trabajo del conocimiento y razonamiento científico. Disponible en la plataforma ahora.",
      ctaLabel: "Probar ahora",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "El último flagship de Anthropic",
      title: "Opus 5",
      description:
        "Opus 5 es una gran mejora para programación, agentes y escritura profesional — diseñado para tareas complejas y de larga duración con resultados más precisos y fiables.",
      ctaLabel: "Probar ahora",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "Gratis por tiempo limitado",
      title: "Modelos Auto",
      description:
        "El enrutamiento inteligente elige el modelo adecuado y equilibra velocidad, coste y calidad. Pruébalo gratis por tiempo limitado — acceso sin barreras a capacidades de modelos grandes.",
      ctaLabel: "Probar ahora",
      logoAlt: "Modelos Auto",
    },
    {
      tabLabel: "Despliegue",
      eyebrow: "Nivel empresarial",
      title: "Despliegue de servicios de modelos",
      description:
        "Despliegue privado y escalado elástico en la nube — adaptación de modelos, aceleración de inferencia y soporte operativo para cargas de trabajo críticas.",
      ctaLabel: "Más información",
      logoAlt: "Despliegue de servicios de modelos",
    },
  ],
  productMatrix: {
    title: "Productos de extremo a extremo, de la idea a producción",
    subtitle:
      "Acceso unificado para desarrolladores y empresas — conecta la IA con tu negocio más rápido",
  },
  productCards: [
    {
      title: "Despliegue privado on-premises",
      description:
        "Para empresas con requisitos de cumplimiento y soberanía de datos: configuraciones privadas listas para producción, ajuste de rendimiento, despliegue en clúster y operaciones continuas.",
      ctaLabel: "Más información",
    },
    {
      title: "Optimización del rendimiento de inferencia",
      description:
        "Basado en motores de inferencia open source, compatible con modelos abiertos habituales y modelos propios — desde selección y ajuste hasta operaciones en producción para mayor rendimiento.",
      ctaLabel: "Contáctanos",
    },
    {
      title: "Modelos Auto gratuitos",
      description:
        "El enrutamiento inteligente equilibra velocidad, coste y calidad. Acceso gratuito por tiempo limitado — sin barreras para capacidades de modelos grandes.",
      ctaLabel: "Probar ahora",
    },
    {
      title: "API unificada de modelos grandes",
      description:
        "Texto, voz, imagen y vídeo en una sola API — pago por uso para que los equipos integren capacidades y lancen productos más rápido.",
      ctaLabel: "Empezar",
    },
  ],
  whySection: {
    title: "Por qué basedong",
  },
  whyHighlightCards: [
    {
      title: "Alto valor",
      textBlocks: [
        {
          lines: [
            [{ text: "Control de costes" }, { text: "de extremo a extremo", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Modelos Auto" }, { text: "gratis por tiempo limitado", emphasis: true }],
            [{ text: "Enrutamiento inteligente equilibra velocidad y coste" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Reduce el gasto en inferencia y despliegue hasta un", value: "40%" },
        { prefix: "Modelos Auto gratis por tiempo limitado — coste de incorporación", value: "cero" },
      ],
      footnotes: [
        [{ text: "Facturación transparente por uso con gasto predecible" }],
        [{ text: "Cómputo heterogéneo desacoplado — programación fluida de aceleradores de IA habituales" }],
        [
          { text: "Rendimiento de costes" },
          { text: "estable y predecible", emphasis: true },
          { text: " para aplicaciones sensibles al coste" },
        ],
      ],
    },
    {
      title: "Alta fiabilidad",
      textBlocks: [
        {
          lines: [
            [{ text: "Redundancia" }, { text: "multi-nodo", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Monitorización, alertas y autorrecuperación", emphasis: true }],
            [{ text: "Servicios estables a largo plazo" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Redundancia multi-nodo — conmutación por error en", value: "segundos" },
        { prefix: "Soporte empresarial bajo demanda, cumpliendo requisitos de", value: "SLA" },
      ],
      footnotes: [
        [{ text: "Gestiona cargas de alta concurrencia e inferencia por lotes a gran escala" }],
        [{ text: "Probado en producción por desarrolladores — estable en el uso real" }],
        [
          { text: "Rendimiento de servicio" },
          { text: "estable y predecible", emphasis: true },
          { text: " para cargas críticas" },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "Altamente escalable",
      description:
        "Escalado elástico para picos de tráfico y cargas complejas. Despliega modelos personalizados rápidamente y escala con arquitectura flexible — listo para híbrido y multinube.",
    },
    {
      title: "Altamente seguro",
      description:
        "BYOC opcional — los datos permanecen en tu dominio. Aislamiento de cómputo, red y almacenamiento con cumplimiento normativo para requisitos empresariales de seguridad y auditoría.",
    },
    {
      title: "Altamente capaz",
      description:
        "LLM de vanguardia más APIs de audio, vídeo y multimodal en un solo lugar. Escala con tu negocio y controla uso y gasto con analítica clara.",
    },
    {
      title: "Alta disponibilidad",
      description:
        "Probado en producción por desarrolladores de todo el mundo. Monitorización, alertas y autorrecuperación más soporte empresarial para cargas críticas de SLA.",
    },
  ],
  industrySection: {
    title: "Soluciones sectoriales adaptadas a tus necesidades de despliegue",
  },
  industryItems: [
    {
      title: "Hardware de IA",
      description:
        "Para dispositivos móviles de IA, appliances de inferencia e inteligencia encarnada — menor latencia edge-nube y mejor capacidad de respuesta.",
    },
    {
      title: "Gobierno",
      description:
        "Inferencia de alto rendimiento y baja latencia para gobierno inteligente, seguridad pública e industrialización — IA generativa rentable en cómputo heterogéneo sin dependencia de proveedor.",
    },
    {
      title: "Centros de cómputo de IA",
      description:
        "Optimiza la programación y asignación de recursos para acelerar el entrenamiento y el despliegue de inferencia a gran escala.",
    },
    {
      title: "Educación",
      description:
        "Asistentes de enseñanza inteligentes con planificación multi-modelo para rutas de aprendizaje personalizadas, Q&A instantáneo y mejores resultados para docentes y estudiantes.",
    },
    {
      title: "Internet",
      description:
        "Generación de contenido y personalización para plataformas — modelos intercambiables en caliente, aceleración de inferencia, mayor utilización de GPU y mejor UX y eficiencia operativa.",
    },
  ],
  partners: {
    title: "Clientes y socios del ecosistema",
    ctaPrimaryDesc: "Activa APIs de modelos en minutos",
    ctaPrimaryButton: "Iniciar prueba",
    ctaSecondaryDesc: "¿Necesitas un plan personalizado? Contáctanos",
    ctaSecondaryButton: "Enviar solicitud",
  },
  heroCarousel: {
    ariaLabel: "Destacados de la página de inicio",
    switchTabLabel: (tabLabel) => `Cambiar a ${tabLabel}`,
  },
};
