import type { HomeStrings } from "../content-types";

export const de: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong ist live",
      title: "GPT-5.6",
      description:
        "Die GPT-5.6-Familie — Sol (Flagship), Terra (ausgewogen) und Luna (schnell) — liefert Spitzenleistung für Coding, Agenten, Wissensarbeit und wissenschaftliches Reasoning. Jetzt auf der Plattform verfügbar.",
      ctaLabel: "Jetzt testen",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Anthropics neuestes Flagship",
      title: "Opus 5",
      description:
        "Opus 5 ist ein großes Upgrade für Coding, Agenten und professionelles Schreiben — für komplexe, langlaufende Aufgaben mit präziseren, zuverlässigeren Ergebnissen.",
      ctaLabel: "Jetzt testen",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "Zeitlich begrenzt kostenlos",
      title: "Auto-Modelle",
      description:
        "Intelligentes Routing wählt das passende Modell und balanciert Geschwindigkeit, Kosten und Qualität dynamisch. Zeitlich begrenzt kostenlos — null Hürde für Large-Model-Fähigkeiten.",
      ctaLabel: "Jetzt testen",
      logoAlt: "Auto-Modelle",
    },
    {
      tabLabel: "Deployment",
      eyebrow: "Enterprise-Grade",
      title: "Modellservice-Deployment",
      description:
        "Private Bereitstellung und elastische Cloud-Skalierung — Modellanpassung, Inferenz-Beschleunigung und Ops-Support für mission-kritische Workloads.",
      ctaLabel: "Mehr erfahren",
      logoAlt: "Modellservice-Deployment",
    },
  ],
  productMatrix: {
    title: "Full-Stack-Produkte von der Idee bis zur Produktion",
    subtitle:
      "Einheitlicher Zugang für Entwickler und Unternehmen — AI schneller mit Ihrem Business verbinden",
  },
  productCards: [
    {
      title: "On-Premises Private Deployment",
      description:
        "Für Unternehmen mit Compliance- und Datensouveränitätsanforderungen: produktionsreife Private Setups, Performance-Tuning, Cluster-Deployment und laufender Betrieb.",
      ctaLabel: "Mehr erfahren",
    },
    {
      title: "Inferenz-Performance-Optimierung",
      description:
        "Auf Open-Source-Inferenz-Engines aufgebaut, kompatibel mit gängigen Open-Models und eigenen Modellen — von Auswahl und Tuning bis zum Produktionsbetrieb für höheren Durchsatz.",
      ctaLabel: "Kontakt",
    },
    {
      title: "Kostenlose Auto-Modelle",
      description:
        "Intelligentes Routing balanciert Geschwindigkeit, Kosten und Qualität. Zeitlich begrenzt kostenlos — null Hürde für Large-Model-Fähigkeiten.",
      ctaLabel: "Jetzt testen",
    },
    {
      title: "Einheitliche Large-Model-API",
      description:
        "Text, Sprache, Bild und Video in einer API — Pay-as-you-go, damit Teams schneller integrieren und ausliefern können.",
      ctaLabel: "Loslegen",
    },
  ],
  whySection: {
    title: "Warum basedong",
  },
  whyHighlightCards: [
    {
      title: "Hohes Preis-Leistungs-Verhältnis",
      textBlocks: [
        {
          lines: [
            [{ text: "End-to-End-" }, { text: "Kostenkontrolle", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Auto-Modelle" }, { text: "zeitlich begrenzt kostenlos", emphasis: true }],
            [{ text: "Smart Routing balanciert Geschwindigkeit und Kosten" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Inferenz- und Deployment-Kosten um bis zu", value: "40%", suffix: " senken" },
        { prefix: "Auto-Modelle zeitlich begrenzt kostenlos — Einstiegskosten", value: "null" },
      ],
      footnotes: [
        [{ text: "Transparente Pay-as-you-go-Abrechnung mit planbaren Ausgaben" }],
        [{ text: "Entkoppelte heterogene Compute-Ressourcen — nahtlose Planung gängiger AI-Beschleuniger" }],
        [
          { text: "Stabile, planbare" },
          { text: "Kostenperformance", emphasis: true },
          { text: " für kostensensitive Apps" },
        ],
      ],
    },
    {
      title: "Hohe Stabilität",
      textBlocks: [
        {
          lines: [
            [{ text: "Multi-Node-" }, { text: "Redundanz", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Monitoring, Alerts und Self-Healing", emphasis: true }],
            [{ text: "Langfristig stabile Services" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Multi-Node-Redundanz — Failover in", value: "Sekunden" },
        { prefix: "Enterprise-Support on demand, erfüllt", value: "SLA", suffix: "-Anforderungen" },
      ],
      footnotes: [
        [{ text: "Hohe Parallelität und große Batch-Inferenz-Workloads meistern" }],
        [{ text: "Von Entwicklern in Produktion erprobt — stabil im Einsatz" }],
        [
          { text: "Stabile, planbare" },
          { text: "Service-Performance", emphasis: true },
          { text: " für kritische Workloads" },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "Hoch skalierbar",
      description:
        "Elastische Skalierung für Traffic-Spitzen und komplexe Workloads. Eigene Modelle schnell ausrollen und Deployments mit flexibler Architektur skalieren — Hybrid- und Multi-Cloud-ready.",
    },
    {
      title: "Hoch sicher",
      description:
        "Optionales BYOC — Daten bleiben in Ihrer Domäne. Compute-, Netzwerk- und Storage-Isolation mit Branchen-Compliance für Enterprise-Sicherheit und Audit-Anforderungen.",
    },
    {
      title: "Hoch leistungsfähig",
      description:
        "Frontier-LLMs plus Audio-, Video- und Multimodal-APIs an einem Ort. Mit Ihrem Business skalieren und Nutzung sowie Kosten mit klarer Analytik verfolgen.",
    },
    {
      title: "Hoch verfügbar",
      description:
        "Weltweit von Entwicklern in Produktion bewährt. Monitoring, Alerts und Self-Healing plus Enterprise-Support für SLA-kritische Workloads.",
    },
  ],
  industrySection: {
    title: "Branchenlösungen, zugeschnitten auf Ihre Deployment-Anforderungen",
  },
  industryItems: [
    {
      title: "AI-Hardware",
      description:
        "Für AI-Mobilgeräte, Inferenz-Appliances und Embodied Intelligence — geringere Edge-Cloud-Latenz und bessere Reaktionsfähigkeit.",
    },
    {
      title: "Regierung",
      description:
        "Hochdurchsatz-, niedriglatente Inferenz für Smart Government, öffentliche Sicherheit und Industrie-Upgrade — kosteneffektive generative AI auf heterogener Compute ohne Vendor Lock-in.",
    },
    {
      title: "AI-Rechenzentren",
      description:
        "Scheduling und Ressourcenzuteilung optimieren, um Training und großflächiges Inferenz-Deployment zu beschleunigen.",
    },
    {
      title: "Bildung",
      description:
        "Intelligente Lehrassistenten mit Multi-Model-Planung für personalisierte Lernpfade, sofortige Q&A und bessere Ergebnisse für Lehrkräfte und Studierende.",
    },
    {
      title: "Internet",
      description:
        "Content-Generierung und Personalisierung für Plattformen — Hot-Swap-Modelle, Inferenz-Beschleunigung, höhere GPU-Auslastung, bessere UX und Ops-Effizienz.",
    },
  ],
  partners: {
    title: "Kunden und Ökosystem-Partner",
    ctaPrimaryDesc: "Model-APIs in Minuten aktivieren",
    ctaPrimaryButton: "Test starten",
    ctaSecondaryDesc: "Individueller Plan nötig? Kontaktieren Sie uns",
    ctaSecondaryButton: "Anfrage senden",
  },
  heroCarousel: {
    ariaLabel: "Homepage-Highlights",
    switchTabLabel: (tabLabel) => `Zu ${tabLabel} wechseln`,
  },
};
