import type { EnterpriseStrings } from "../content-types";

export const es: EnterpriseStrings = {
  introCards: [
    {
      title: "Operaciones unificadas de cómputo, modelos y apps",
      description:
        "Observe, optimice y recupere cómputo, modelos y aplicaciones desde un solo plano — manteniendo operaciones estables y sostenibles a largo plazo.",
    },
    {
      title: "Consola visual más APIs estándar",
      description:
        "Una consola visual junto con APIs estándar reduce la barrera técnica y conecta rápidamente con diversos escenarios de negocio.",
    },
    {
      title: "Modelos principales listos para usar, profundamente optimizables",
      description:
        "Soluciones maduras para los principales modelos open source, optimizadas continuamente en entrenamiento e inferencia — acortando el camino de la selección a producción.",
    },
    {
      title: "Agrupación multiarquitectura y planificación inteligente",
      description:
        "Acceso unificado y planificación inteligente en GPU, NPU y cómputo multivendor — sin dependencia de un solo fabricante de chips — para rendimiento y operaciones consistentes sobre inversiones existentes.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Aplicaciones sectoriales",
      modules: [
        "Internet",
        "Educación",
        "Finanzas",
        "Telecomunicaciones",
        "Gobierno",
        "智算",
        "Energía",
      ],
    },
    {
      kind: "divider",
      title: "API / Aplicaciones",
    },
    {
      kind: "section",
      title: "Desarrollo de aplicaciones de modelos",
      modules: [
        "Cadena de herramientas de desarrollo",
        "Depuración y publicación de apps",
        "Ingeniería de prompts",
        "Agent",
        "RAG",
        "Frameworks de aplicaciones",
        "Bases de datos vectoriales",
      ],
    },
    {
      kind: "section",
      title: "Despliegue e inferencia de modelos",
      modules: [
        "Gestión de modelos",
        "Monitorización",
        "Configuración de recursos",
        "Generación de video",
        "Optimización end-to-end",
        "Aceleración de inferencia",
        "Despliegue de modelos",
      ],
    },
    {
      kind: "section",
      title: "Entrenamiento y ajuste de modelos",
      modules: [
        "Gestión de trabajos",
        "Ajuste de rendimiento",
        "Alineación de modelos",
        "Fine-tuning",
        "Entrenamiento de modelos",
        "Procesamiento de datos",
        "Ingesta de datos",
      ],
    },
    {
      kind: "vendors",
      title: "Modelos",
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
      title: "Gestión de recursos de cómputo",
      modules: [
        "Administración de usuarios y sistemas",
        "Planificación de trabajos",
        "Planificación de flujos de trabajo",
        "Gestión containerizada de cómputo",
        "Agrupación de cómputo",
        "Cuotas de cómputo",
        "Adaptación de recursos heterogéneos",
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
      title: "Seguro · Protección end-to-end, cumplimiento auditable",
      description:
        "Seguridad de datos y cumplimiento end-to-end — riesgo de filtración drásticamente menor. Bloqueo de amenazas en tiempo real con 99 %+ de precisión en seguridad de contenido.",
    },
    {
      title: "Control de costes · Gasto inteligente, ROI amplificado",
      description:
        "Planificación fina de cómputo y memoria reduce el coste unitario. Cuantización dinámica sin pérdida reduce el consumo de cómputo por inferencia.",
    },
    {
      title: "Fácil de usar · Curva de aprendizaje baja para todos",
      description:
        "Vista unificada de cómputo heterogéneo con despliegue y planificación automatizados. Configuración visual en menos de 3 minutos. 30+ plantillas — arranque sin ajuste manual.",
    },
    {
      title: "Elección acertada · Selección científica, calidad y seguridad",
      description:
        "Catálogo de modelos con etiquetas para preselección rápida. 20+ métricas de referencia integradas para apoyar decisiones.",
    },
    {
      title: "Estable a escala · Rendimiento de producción para cargas críticas",
      description:
        "Optimización profunda de inferencia: hasta 70 % menos latencia, 3–5× más throughput. Balanceo inteligente entre cómputo y servicios de modelos. Elasticidad en segundos equilibrando rendimiento y coste.",
    },
    {
      title: "Despliegue rápido · Entrega más corta, respuesta ágil al negocio",
      description:
        "100+ modelos principales preintegrados y listos. Imágenes de modelos actualizadas continuamente con prioridad para nuevas versiones. Cadena de herramientas en entrenamiento, inferencia, fine-tuning y despliegue.",
    },
  ],
  scenarios: [
    {
      tab: "Sector energético",
      title: "Sector energético",
      description:
        "Basado en la colaboración de modelos grandes y pequeños, ofrece servicios de IA desde entrenamiento y fine-tuning hasta despliegue de aplicaciones — impulsando la digitalización y eficiencia operativa en energía.",
      advantages: [
        "Diagnóstico inteligente de fallos de equipos: fusionar logs y condiciones operativas para acortar ciclos de detección y resolución",
        "Análisis de anomalías y carga eléctrica: identificar patrones anómalos para apoyar despacho y decisiones de ahorro energético",
        "Asistentes de conocimiento de compras y operaciones: conocimiento sectorial en intranet — datos de producción nunca salen del dominio",
      ],
    },
    {
      tab: "Plataforma abierta de centro 智算",
      title: "Plataforma abierta de centro 智算",
      description:
        "La fusión de cómputo heterogéneo permite planificación unificada cross-arquitectura y suministro elástico — resolviendo gobernanza a gran escala, integración de modelos open source y estabilidad de servicios de IA de alta concurrencia.",
      advantages: [
        "Cuotas multi-tenant más planificación cross-datacenter — suministro elástico de cómputo por proyecto",
        "Acceso tipo marketplace con gray release multi-versión — tenants eligen modelos y acortan entrega",
        "Rate limiting, circuit breaking y escalado horizontal — APIs externas de alta concurrencia con disponibilidad comprometida",
      ],
    },
    {
      tab: "Transporte",
      title: "Transporte",
      description:
        "Combina modelos CV en edge para procesamiento en tiempo real con comprensión semántica multimodal en la nube — gestión inteligente del tráfico con evaluación semántica de accidentes, infracciones y eventos complejos.",
      advantages: [
        "Recomendaciones estructuradas de actuación en accidentes e infracciones — evaluación y despacho más rápidos en campo",
        "Colaboración edge-nube reduce falsos positivos y omisiones — tiempos de respuesta estables incluso en horas punta",
        "Despliegue local en red privada cumple normativa de tráfico — integración continua de nuevos fine-tunes multimodales",
      ],
    },
    {
      tab: "Plataforma empresarial de cómputo heterogéneo",
      title: "Plataforma empresarial de cómputo heterogéneo",
      description:
        "Apoya la transformación digital e inteligente con la cadena completa desde gobernanza de cómputo hasta entrenamiento e inferencia — planificación de alto rendimiento y arquitectura modular para colaboración fluida.",
      advantages: [
        "Acceso y pooling unificado GPU/NPU multimarca — utilización, colas y cuotas cross-datacenter en una vista",
        "Pools compartidos y planificación para entrenamiento e inferencia — balance pico/valle, menos capacidad ociosa",
        "Integración OpenAPI estándar con DevOps y sistemas de negocio — nuevos modelos sin reconstruir desde cero",
      ],
    },
    {
      tab: "Operadores de telecomunicaciones",
      title: "Operadores de telecomunicaciones",
      description:
        "Motor de inferencia de alto rendimiento para escenarios de alta concurrencia y baja latencia — cambios mínimos en sistemas existentes, valor del cómputo heterogéneo y aceleración comercial de capacidades de IA.",
      advantages: [
        "SLAs operativos y capacidad elástica para llamadas de alta concurrencia y baja latencia orientadas al cliente",
        "Cambios mínimos en API/gateway para integrar BSS/OSS en vivo y modelos propios",
        "Activar inventario de aceleradores multivendor — acortar tiempo comercial de servicios de IA",
      ],
    },
    {
      tab: "Manufactura",
      title: "Manufactura",
      description:
        "Los modelos grandes analizan datos complejos de pruebas y producción, identificando automáticamente patrones clave y anomalías — análisis más rápido, mejores decisiones y alivio de revisión manual lenta y propensa a errores.",
      advantages: [
        "Análisis automatizado de datos de pruebas y QC — anomalías críticas en minutos, menos omisiones y retrabajo",
        "Resultados escritos de vuelta en nodos MES/QC/planificación — menos monitorización manual, bucles cerrados más rápidos",
        "Actualizaciones hot de modelos sin downtime — despliegue de nuevas capacidades con líneas de producción activas",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Plataforma empresarial de cómputo heterogéneo",
      training: {
        title: "Entrenamiento de modelos grandes",
        steps: ["Preprocesamiento de datos", "Desarrollo y entrenamiento", "Optimización de entrenamiento"],
      },
      inference: {
        title: "Inferencia de modelos grandes",
        steps: ["Selección de modelos", "Evaluación de modelos", "Despliegue rápido"],
      },
      apps: {
        title: "Escenarios de aplicaciones inteligentes empresariales",
        items: [
          "Redacción inteligente de propuestas",
          "Desarrollo y entrenamiento",
          "Q&A inteligente de datos",
          "Soporte a decisiones inteligente",
          "Compras inteligentes",
          "Cotización inteligente",
        ],
      },
      apiUp: "Llamadas API de modelos",
      apiDown: "Interfaces estandarizadas",
      platform: "Gobernanza de cómputo heterogéneo",
      supportLeft: "Escalado elástico",
      supportRight: "Llamadas de alta concurrencia",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "Plataforma abierta de centro 智算",
      leftAudience: "Para usuarios empresariales",
      rightAudience: "Para usuarios desarrolladores",
      axisLeft: "Impulsar aplicaciones de IA",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Invocación de modelos",
        "Instancias dedicadas",
        "Fine-tuning de modelos",
        "Hosting de modelos",
        "Integración multi-modelo",
        "Prueba gratuita",
        "Llamadas de bajo coste",
        "Integración rápida",
      ],
      modelServiceTitle: "Servicios de modelos — amplio suministro de modelos grandes",
      models: [
        "Modelos de texto",
        "Modelos de voz",
        "Modelos de imagen",
        "Modelos de video",
        "Modelos de código",
        "Modelos de datos",
        "Modelos OCR",
        "Embedding",
      ],
      sidePanels: ["Centro de experiencia", "Facturación por tokens"],
      integrateBar: "Más capacidades comerciales y open source integradas",
      poolTitle: "Pool de recursos de cómputo heterogéneo",
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
      title: "Sector energético",
      topMode: "apps",
      topItems: [
        "Soporte inteligente posventa de plantas solares",
        "Diagnóstico inteligente de fallos en equipos eléctricos",
        "Cotización inteligente de proyectos eólicos",
        "Compras inteligentes de materias primas solares",
        "Generación inteligente de actas de reuniones",
        "Análisis inteligente de anomalías eléctricas comerciales e industriales",
      ],
      hub: "Plataforma MaaS",
      arc: [
        "Desarrollo de aplicaciones Agent",
        "Gestión del conocimiento",
        "Servicios de inferencia y MaaS",
        "Entrenamiento / fine-tuning de modelos",
      ],
      left: "Gobernanza heterogénea",
      right: "Aceleración de inferencia",
      platform: "GPUs multi-tipo",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Manufactura",
      topMode: "service",
      topTitle: "Model-as-a-Service privado",
      topItems: [
        "Análisis de flujos de datos de pruebas complejas",
        "Reconocimiento de información clave y patrones anómalos",
        "Mejora de eficiencia analítica y calidad de decisiones",
      ],
      hub: "Colaboración de modelos grandes y pequeños",
      left: "Modelos grandes",
      right: "Modelos de machine learning",
      engine: "Motor de aceleración de inferencia",
      platform: "GPUs multi-tipo",
    },
    transport: {
      layout: "transportFlow",
      title: "Transporte",
      trainingTitle: "Plataforma de entrenamiento de modelos grandes",
      trainingSteps: ["Datos de tráfico", "Entrenamiento de modelos", "Evaluación de modelos", "Despliegue de modelos"],
      edgeTitle: "Dispositivos de edge computing",
      edgeChip: "Modelos grandes en dispositivo",
      centerTitle: "Plataforma central de inferencia",
      businessTitle: "Plataforma de aplicaciones de negocio",
      flowEdgeToCenter: "Datos de reconocimiento de modelos pequeños",
      flowModelDown: "Distribución de modelos",
      flowDataUp: "Retorno de datos",
      flowToBusiness: "Reconocimiento secundario de modelos grandes",
      flowFromBusiness: "Datos de revisión de negocio",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Operadores de telecomunicaciones",
      topMode: "service",
      topTitle: "Model-as-a-Service privado",
      topItems: ["Baja latencia", "Alto throughput", "Contexto largo"],
      hub: "Modelos",
      left: "Modelos grandes propios",
      right: "Modelos grandes open source",
      engine: "Motor de aceleración de inferencia",
      platform: "GPUs multi-tipo",
    },
  },
  testimonials: [
    {
      title: "Una gran empresa energética",
      body: "Desplegamos con éxito un modelo grande específico del sector en la plataforma. La fuerte gestión de cómputo heterogéneo y la colaboración de modelos grandes y pequeños aportaron ganancias de eficiencia medibles en diagnóstico inteligente de fallos, asistencia en compras y análisis de anomalías eléctricas. El despliegue privado mantiene seguros y conformes los datos del negocio central, y la estabilidad a largo plazo de la plataforma proporciona una base de IA fiable para la transformación digital.",
      role: "Responsable de transformación digital",
    },
    {
      title: "Una empresa de TI de transporte",
      body: "Al construir un sistema de tráfico inteligente colaborativo cloud-edge, la plataforma de modelos grandes de basedong aportó inteligencia cognitiva fiable a nuestras soluciones. Su capacidad de aprender datos de escenarios verticales y soportar tareas multimodales se alinea con terminología sectorial y contexto de negocio. Hemos desplegado aplicaciones de soporte a decisiones inteligentes que mejoran eficiencia y velocidad de respuesta en evaluación de fallos y despacho.",
      role: "Responsable de soluciones",
    },
    {
      title: "Un proveedor de servicios de cómputo en la nube",
      body: "Nos asociamos con basedong para construir una plataforma de servicios de cómputo orientada a empresas. Su framework de inferencia agnóstico al hardware y orquestación multivendor nos permitió mantener estabilidad del servicio mientras nos liberábamos del lock-in de un solo vendor GPU — programando cargas flexiblemente en diversos aceleradores. Aceleración de inferencia, enrutamiento dinámico y optimización de memoria mejoraron significativamente la utilización del clúster y redujeron costes de inferencia.",
      role: "Responsable de ingeniería de plataforma",
    },
    {
      title: "Una empresa de software e integración de sistemas",
      body: "La plataforma empresarial de modelos grandes de basedong apoya fuertemente nuestro trabajo con clientes de diversos sectores. Interfaces de desarrollo unificadas, fine-tuning flexible y toolchain completa han acortado significativamente ciclos de entrega en finanzas, gobierno, educación y otros sectores. Alta eficiencia de inferencia y conveniente despliegue privado reducen barreras de implementación para clientes.",
      role: "Responsable de servicios de integración",
    },
  ],
  faqItems: [
    {
      question: "¿Cuánto suele tardar el despliegue hasta producción? ¿Qué soporte continuo hay?",
      answer:
        "Para aceleradores mainstream existentes y entornos de cómputo mixto, ofrecemos planes de despliegue estandarizados validados — entrega típica en semanas. basedong ofrece soporte técnico de ciclo completo incluyendo despliegue, formación, garantía operativa y actualizaciones continuas de versión.",
    },
    {
      question: "¿La plataforma soporta escenarios verticales sectoriales profundos?",
      answer:
        "Sí. Más allá de capacidades generales de modelos grandes, la plataforma soporta combinar conocimiento sectorial para construir modelos específicos de dominio. En electricidad, petróleo y gas, manufactura y otros sectores, hemos desplegado con éxito diagnóstico de fallos, producción segura, asistencia I+D y optimización operativa.",
    },
    {
      question: "¿Puede soportar despliegues a gran escala de investigación, construcción y uso?",
      answer:
        "Sí. La plataforma MaaS privada de basedong está diseñada para habilitación de IA empresarial a gran escala — con planificación heterogénea de 10.000 tarjetas, garantías de estabilidad de alta concurrencia y gestión fina de recursos desde I+D de modelos hasta inferencia masiva en endpoints.",
    },
    {
      question: "¿Pueden los usuarios de negocio desplegar aplicaciones de IA de forma independiente?",
      answer:
        "Sí. Flujos visuales end-to-end — desde selección, despliegue y prueba de modelos hasta lanzamiento de servicio — todo vía interfaces gráficas, reduciendo enormemente la barrera. Tras breve formación, usuarios de negocio pueden invocar modelos y construir aplicaciones de forma autónoma.",
    },
    {
      question: "¿Cómo se garantiza la seguridad de datos en despliegue privado?",
      answer:
        "El despliegue privado asegura que todos los datos y modelos corren dentro del entorno empresarial. También ofrecemos defensa en profundidad: aislamiento multi-tenant, control de acceso fino, auditoría de cadena completa y detección de seguridad de contenido en tiempo real — cumpliendo requisitos estrictos en finanzas, energía, gobierno y otras industrias reguladas.",
    },
    {
      question: "¿Cómo equilibran rendimiento y coste?",
      answer:
        "Nuestro motor de inferencia de alto rendimiento (con separación PD, cuantización KV Cache y más) mejora significativamente throughput y reduce latencia — menos cómputo por tarea. Gateways de servicio inteligentes y elasticidad en segundos asignan recursos dinámicamente según carga en vivo, evitando cómputo ocioso — mejor TCO manteniendo cargas críticas estables.",
    },
    {
      question: "¿Cómo seleccionar modelos eficientemente en múltiples escenarios de negocio?",
      answer:
        "Marketplace de modelos con etiquetas — filtrar por tipo de tarea, modalidad, recuento de parámetros y más. Más importante: usar nuestra toolchain de evaluación con datos de negocio para comparar candidatos en calidad y rendimiento, luego aplicar tuning con un clic para adaptación de bajo coste.",
    },
    {
      question: "¿Qué chips se soportan? ¿Puede el rendimiento mantenerse estable entre vendors?",
      answer:
        "Arquitectura agnóstica al hardware soportando NVIDIA, AMD y otras GPUs mainstream más diversos NPUs y aceleradores — sin lock-in a ningún vendor de chips. Framework de inferencia unificado y orquestación de cómputo corren de forma estable en entornos existentes o multivendor, con adaptación y optimización para 100+ modelos mainstream.",
    },
    {
      question: "¿Qué dimensiones clave deben guiar la selección de MaaS privado?",
      answer: `Evaluar en cinco dimensiones:

① Agilidad técnica (biblioteca rica de modelos, incorporación rápida de nuevos modelos);
② Precisión de selección (herramientas de evaluación y optimización con datos propios);
③ Rendimiento de producción (latencia de inferencia, throughput, elasticidad de recursos);
④ Seguridad y cumplimiento (aislamiento multi-tenant, logs de auditoría, filtrado de contenido y otras protecciones empresariales);
⑤ Facilidad de uso y operabilidad (interfaces visuales y planificación unificada que reducen la barrera).`,
    },
    {
      question: "¿Cuándo debería una empresa construir MaaS privado?",
      answer: `Considere MaaS privado cuando su organización enfrente cualquiera de lo siguiente:

① El negocio involucra datos sensibles (producción energética, transacciones financieras, datos I+D) con requisitos estrictos de mantener datos en la red corporativa;
② La IA debe escalarse a muchos endpoints o escenarios de negocio con requisitos extremadamente altos de rendimiento y estabilidad de inferencia;
③ Cómputo heterogéneo de diferentes marcas y arquitecturas en regiones o unidades de negocio necesita gobernanza unificada y utilización eficiente;
④ Quiere seguir el ritmo de los avances en IA pero carece de un equipo de ingeniería para adaptación y optimización continua de modelos.`,
    },
  ],
};
