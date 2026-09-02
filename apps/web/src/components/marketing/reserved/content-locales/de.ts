import type { ReservedStrings } from "../content-types";

export const de: ReservedStrings = {
  pageTitle: "Reservierte Instanzen | basedong",
  pageDescription:
    "Kapazität für kritische Workloads sichern. Vorhersagbare Performance, bessere Stückkosten in großem Maßstab, Enterprise-SLA.",
  heroLogoAlt: "Reservierte Instanzen",
  heroTitle: "Kapazität sichern",
  heroTitleAccent: "Kritische Workloads am Laufen halten",
  heroSubtitle:
    "Vorhersagbare Performance · Bessere Stückkosten in großem Maßstab · Enterprise-SLA",
  consultCta: "Beratung buchen",
  whyBadge: "WHY RESERVED",
  whyTitle: "Warum reservierte Instanzen",
  whySubtitle:
    "Dedizierte Kapazität, Modelltreue und Kostenkontrolle für Enterprise-Inferenz-Workloads.",
  whyCards: [
    {
      title: "Dedizierte reservierte Kapazität",
      items: [
        "Compute für Kern-Workloads reservieren, damit Spitzenverkehr vorhersagbar bleibt.",
        "Konkurrenz in gemeinsamen Pools vermeiden und mission-kritische Apps online halten.",
      ],
    },
    {
      title: "Modelltreue",
      items: [
        "Unser Inferenz-Stack wird bei Deployment getunt, um Vendor-Baselines zu entsprechen.",
        "Stabile Intelligenzqualität für Szenarien, die Drift nicht tolerieren können.",
      ],
    },
    {
      title: "Vorhersagbare Kosten in großem Maßstab",
      items: [
        "Festpreise statt Nutzungsschwankungen bei Pay-as-you-go-Abrechnung.",
        "Bessere Ökonomie für stetige Hochlast-Workloads und langfristige Budgetierung.",
      ],
    },
    {
      title: "Enterprise-SLA",
      items: [
        "Service-Levels, die kritische Inferenz-Jobs zuverlässig am Laufen halten.",
        "Gebaut für Dauerlast und produktive Business-Systeme.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Referenzpreise und Performance",
  pricingSubtitle:
    "Reservierte Instanzen gibt es in mehreren Größen. Konfiguration nach Modell, Concurrency und Skala. Unten Beispiel-Specs und Referenzpreise.",
  highPerfTitle: "High-Performance-Tier",
  standardTitle: "Standard-Tier",
  pricingNote1:
    "Effektiver Stückpreis leitet sich aus TPM oben ab, unter Annahme von 30 Tagen pro Monat und 50 % Gesamtauslastung.",
  pricingNote2:
    "Performance-Werte nutzen typische Inferenz-Einstellungen: 24k Input-Tokens, 1k Output-Tokens, 80 % Cache-Hit-Rate.",
  pricingFootCtaBefore:
    "Dies sind Beispiel-Specs. Für mehr Modelle oder Custom-Deployment, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Kostenreferenz",
  priceLabel: "Preis",
  unitPriceLabel: "Effektiver Stückpreis",
  perfReferenceLabel: "Performance-Referenz",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Enterprise-Delivery und Betrieb",
  deliverySteps: [
    {
      title: "Schnelles Deployment",
      description:
        "Standard reservierte Instanzen deployen in 1–7 Werktagen und schließen schnell an bestehende Systeme an.",
    },
    {
      title: "Deployment und Tuning",
      description:
        "Wir übernehmen Deployment, Validierung und Inferenz-Tuning, damit Workloads reibungslos landen.",
    },
    {
      title: "Elastisches Scaling",
      description:
        "Kapazität erweitern oder Specs anpassen, wenn Traffic wächst oder saisonal wechselt.",
    },
    {
      title: "SLA-Garantien",
      description:
        "Klare Service-Levels und operative Absicherung für lang laufende Enterprise-Workloads.",
    },
  ],
  ctaBadge: "Custom Deployments verfügbar",
  ctaTitle: "Dedizierte Kapazität\nfür Wachstum",
  ctaBody:
    "Wir unterstützen mehr reservierte Deployment-Optionen. Unser Team passt Specs, Rollout und Preise an Ihren Workload an.",
  ctaCardTitle: "Mehr Details zu reservierten Instanzen",
  ctaCardBody: "Beratung buchen für Specs, Deployment-Optionen und Preise",
  ctaButton: "Kontakt aufnehmen",
  highPerfModels: [
    {
      description:
        "Enterprise-Agents, Multi-Step-Planung, Software-Automatisierung, Langdokument-Analyse und Code-Generierung.",
      price: "¥ 772.200 / Gruppe / Monat",
      unitPrice: "¥ 3,575 / M Tokens",
      tpm: "10 Mio.",
    },
    {
      description:
        "Multimodale Agents, Vision-Verständnis, Design-to-Code und komplexe Task-Automatisierung.",
      price: "¥ 772.200 / Gruppe / Monat",
      unitPrice: "¥ 8,938 / M Tokens",
      tpm: "4 Mio.",
    },
    {
      description:
        "Langdokument- und Wissensbasis-Analyse, Support-Bots, Content-Generierung und Workflow-Automatisierung.",
      price: "¥ 386.100 / Gruppe / Monat",
      unitPrice: "¥ 3,575 / M Tokens",
      tpm: "5 Mio.",
    },
    {
      description:
        "Komplexes Reasoning, Code-Assistenz, Tool-using Agents, Analytics und automatisierte Workflows.",
      price: "¥ 772.200 / Gruppe / Monat",
      unitPrice: "¥ 2,86 / M Tokens",
      tpm: "12,5 Mio.",
    },
  ],
  standardModels: [
    {
      description:
        "Multimodale Agents, Vision-Verständnis, Design-to-Code und komplexe Task-Automatisierung.",
      price: "¥ 486.000 / Gruppe / Monat",
      unitPrice: "¥ 4,25 / M Tokens",
      tpm: "5,3 Mio.",
    },
    {
      description:
        "Langdokument- und Wissensbasis-Analyse, Support-Bots, Content-Generierung und Workflow-Automatisierung.",
      price: "¥ 486.000 / Gruppe / Monat",
      unitPrice: "¥ 2,50 / M Tokens",
      tpm: "9 Mio.",
    },
    {
      description:
        "Komplexes Reasoning, Code-Assistenz, Tool-using Agents, Analytics und automatisierte Workflows.",
      price: "¥ 486.000 / Gruppe / Monat",
      unitPrice: "¥ 2,08 / M Tokens",
      tpm: "10,8 Mio.",
    },
  ],
};
