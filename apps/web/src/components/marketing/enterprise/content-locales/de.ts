import type { EnterpriseStrings } from "../content-types";

export const de: EnterpriseStrings = {
  introCards: [
    {
      title: "Integrierter Betrieb für Compute, Modelle und Apps",
      description:
        "Compute, Modelle und Anwendungen zentral beobachten, optimieren und wiederverwenden — für stabilen, nachhaltigen Langzeitbetrieb.",
    },
    {
      title: "Grafische Konfiguration plus Standard-APIs",
      description:
        "Visuelle Konsole und Standard-APIs senken die technische Hürde und ermöglichen schnelle Anbindung an vielfältige Geschäftsszenarien.",
    },
    {
      title: "Mainstream-Modelle sofort einsatzbereit, tief optimierbar",
      description:
        "Ausgereifte Lösungen für führende Open-Source-LLMs, kontinuierlich über Training und Inferenz optimiert — kürzerer Weg von der Auswahl bis zur Produktion.",
    },
    {
      title: "Multi-Architektur-Compute-Pooling und intelligente Planung",
      description:
        "Einheitlicher Zugriff und intelligente Planung über GPU, NPU und Multi-Vendor-Compute — ohne Bindung an einen einzelnen Chiphersteller — für konsistente Performance und Betrieb auf bestehenden Hardwareinvestitionen.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Branchenanwendungen",
      modules: [
        "Internet",
        "Bildung",
        "Finanzen",
        "Telekommunikation",
        "Regierung",
        "智算",
        "Energie",
      ],
    },
    {
      kind: "divider",
      title: "API / Anwendungen",
    },
    {
      kind: "section",
      title: "Modell-Anwendungsentwicklung",
      modules: [
        "Entwickler-Toolchain",
        "App-Debug und Release",
        "Prompt-Engineering",
        "Agent",
        "RAG",
        "Anwendungsframeworks",
        "Vektordatenbanken",
      ],
    },
    {
      kind: "section",
      title: "Modellbereitstellung und Inferenz",
      modules: [
        "Modellverwaltung",
        "Monitoring",
        "Ressourcenkonfiguration",
        "Videogenerierung",
        "End-to-End-Optimierung",
        "Inferenzbeschleunigung",
        "Modellbereitstellung",
      ],
    },
    {
      kind: "section",
      title: "Modelltraining und Tuning",
      modules: [
        "Auftragsverwaltung",
        "Performance-Tuning",
        "Modell-Alignment",
        "Feintuning",
        "Modelltraining",
        "Datenverarbeitung",
        "Datenaufnahme",
      ],
    },
    {
      kind: "vendors",
      title: "Modelle",
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
      title: "Compute-Ressourcenverwaltung",
      modules: [
        "Benutzer- und Systemverwaltung",
        "Auftragsplanung",
        "Workflow-Planung",
        "Containerisiertes Compute-Management",
        "Compute-Pooling",
        "Compute-Kontingente",
        "Heterogene Ressourcenanpassung",
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
      title: "Sicher · End-to-End-Schutz, prüfbare Compliance",
      description:
        "End-to-End-Datensicherheit und Compliance — deutlich geringeres Leckagerisiko. Echtzeit-Bedrohungsabwehr mit 99 %+ Content-Safety-Genauigkeit.",
    },
    {
      title: "Kostenkontrolle · Präziser Einsatz, ROI maximieren",
      description:
        "Feingranulare Compute- und Speicherplanung senkt Unit-Compute-Kosten. Verlustfreie dynamische Quantisierung reduziert Inferenz-Compute-Verbrauch.",
    },
    {
      title: "Einfache Bedienung · Geringe Lernkurve für alle",
      description:
        "Einheitliche heterogene Compute-Ansicht mit automatisierter Bereitstellung und Planung. Visuelle Einrichtung in unter 3 Minuten. 30+ Vorlagen — Start ohne manuelles Tuning.",
    },
    {
      title: "Richtige Wahl · Wissenschaftliche Auswahl, Qualität und Sicherheit",
      description:
        "Tag-basierter Modellkatalog für schnelle Vorauswahl. 20+ Kern-Benchmark-Metriken integriert zur Entscheidungsunterstützung.",
    },
    {
      title: "Stabiler Betrieb · Produktionsleistung für Kernlasten",
      description:
        "Tiefe Inferenzoptimierung: bis zu 70 % geringere Latenz, 3–5× Durchsatz. Intelligentes Load-Balancing über Compute- und Modellservices. Elastische Skalierung in Sekunden — Balance zwischen Performance und Kosten.",
    },
    {
      title: "Schnelle Bereitstellung · Kürzere Lieferzeit, agile Reaktion",
      description:
        "100+ Mainstream-Modelle vorintegriert und einsatzbereit. Kontinuierlich aktualisierte Modell-Images mit Priorität für neue Releases. Toolchain über Training, Inferenz, Feintuning und Deployment.",
    },
  ],
  scenarios: [
    {
      tab: "Energiesektor",
      title: "Energiesektor",
      description:
        "Auf Basis der Zusammenarbeit großer und kleiner Modelle liefert die Plattform Energieunternehmen AI-Services von Training und Feintuning bis zur Anwendungsbereitstellung — für Digitalisierung und operative Effizienz.",
      advantages: [
        "Intelligente Gerätefehlerdiagnose: Logs und Betriebsdaten fusionieren, Zyklus für Erkennung und Behebung verkürzen",
        "Stromanomalie- und Lastanalyse: Abnormale Muster erkennen, Dispatch- und Energiespar-Entscheidungen unterstützen",
        "Beschaffungs- und Ops-Wissensassistenten: Branchenwissen im Intranet — Produktionsdaten verlassen nie die Domäne",
      ],
    },
    {
      tab: "智算-Center-Plattform",
      title: "智算-Center-Plattform",
      description:
        "Heterogene Compute-Fusion ermöglicht architekturübergreifende einheitliche Planung und elastische Bereitstellung — löst Governance im großen Maßstab, Open-Model-Integration und Stabilität bei hoher AI-Service-Concurrency.",
      advantages: [
        "Multi-Tenant-Kontingente plus Rechenzentrumsübergreifende Planung — elastische Compute-Bereitstellung pro Projekt",
        "Modell-Marktplatz-Zugang mit Multi-Version-Gray-Release — Tenants wählen selbst, kürzere Lieferzeit",
        "Rate Limiting, Circuit Breaking und horizontale Skalierung — hohe Verfügbarkeit externer APIs",
      ],
    },
    {
      tab: "Verkehr",
      title: "Verkehr",
      description:
        "Kombiniert Edge-CV-Modelle für Echtzeitverarbeitung mit cloudbasierter multimodaler LLM-Semantik — intelligente Verkehrsführung mit semantischer Bewertung von Unfällen, Verstößen und komplexen Ereignissen.",
      advantages: [
        "Strukturierte Handlungsempfehlungen bei Unfällen und Verstößen — schnellere Vor-Ort-Bewertung und Disposition",
        "Edge-Cloud-Kollaboration reduziert Fehlalarme und Auslassungen — stabile Reaktionszeiten auch im Stoßverkehr",
        "Private-Netzwerk-Lokalbereitstellung erfüllt Verkehrs-Compliance — kontinuierliche Integration neuer multimodaler Feintunes",
      ],
    },
    {
      tab: "Enterprise-Heterogen-Compute-Plattform",
      title: "Enterprise-Heterogen-Compute-Plattform",
      description:
        "Unterstützt digitale und intelligente Transformation mit der vollständigen Kette von Compute-Governance über Modelltraining bis Inferenz-Deployment — Hochleistungsplanung und modulare Architektur für reibungslose Zusammenarbeit.",
      advantages: [
        "Einheitlicher Multi-Brand-GPU/NPU-Zugang und Pooling — Auslastung, Warteschlangen und Kontingente in einer Ansicht",
        "Gemeinsame Ressourcenpools und Planung für Training und Inferenz — Peak/Off-Peak-Balance, weniger Leerlauf",
        "Standard-OpenAPI-Integration mit DevOps und Geschäftssystemen — neue Modelle ohne Neubau",
      ],
    },
    {
      tab: "Telekommunikation",
      title: "Telekommunikation",
      description:
        "Hochleistungs-Inferenz-Engine für hochconcurrente, latenzarme Betriebsszenarien — minimale Änderungen an bestehenden Systemen, heterogener Compute-Wert und beschleunigte Kommerzialisierung.",
      advantages: [
        "Betriebliche SLAs und elastische Kapazität für kundenorientierte hochconcurrente, latenzarme Aufrufe",
        "Minimale API/Gateway-Änderungen zur Integration von BSS/OSS und eigenen Modellen",
        "Multi-Vendor-Beschleuniger-Inventar aktivieren — kürzere Time-to-Market für AI-Services",
      ],
    },
    {
      tab: "Fertigung",
      title: "Fertigung",
      description:
        "Große Modelle analysieren komplexe Test- und Produktionsdaten, identifizieren automatisch Schlüsselmuster und Anomalien — schnellere Analyse, bessere Entscheidungen, Entlastung von langsamer manueller Prüfung.",
      advantages: [
        "Automatisierte Analyse von Test- und QC-Daten — kritische Anomalien in Minuten, weniger Auslassungen und Nacharbeit",
        "Ergebnisse zurück an MES/QC/Scheduling-Knoten — weniger manuelles Monitoring, schnellere Closed Loops",
        "Hot-Model-Updates ohne Ausfallzeit — neue Fähigkeiten während laufender Produktion",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Enterprise-Heterogen-Compute-Plattform",
      training: {
        title: "Großmodell-Training",
        steps: ["Datenvorverarbeitung", "Entwicklung und Training", "Trainingsoptimierung"],
      },
      inference: {
        title: "Großmodell-Inferenz",
        steps: ["Modellauswahl", "Modellbewertung", "Schnelle Bereitstellung"],
      },
      apps: {
        title: "Enterprise-Intelligenz-Anwendungsszenarien",
        items: [
          "Intelligente Vorschlagserstellung",
          "Entwicklung und Training",
          "Intelligente Daten-Q&A",
          "Intelligente Entscheidungsunterstützung",
          "Intelligente Beschaffung",
          "Intelligente Angebotserstellung",
        ],
      },
      apiUp: "Modell-API-Aufrufe",
      apiDown: "Standardisierte Schnittstellen",
      platform: "Heterogene Compute-Governance",
      supportLeft: "Elastische Skalierung",
      supportRight: "Hochconcurrente Aufrufe",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "智算-Center-Plattform",
      leftAudience: "Für Unternehmensnutzer",
      rightAudience: "Für Entwickler",
      axisLeft: "AI-Anwendungen unterstützen",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Modellaufruf",
        "Dedizierte Instanzen",
        "Modell-Feintuning",
        "Modell-Hosting",
        "Multi-Modell-Integration",
        "Kostenlose Testversion",
        "Kostengünstige Aufrufe",
        "Schnelle Integration",
      ],
      modelServiceTitle: "Modellservices — reichhaltiges Großmodell-Angebot",
      models: [
        "Textmodelle",
        "Sprachmodelle",
        "Bildmodelle",
        "Videomodelle",
        "Codemodelle",
        "Datenmodelle",
        "OCR-Modelle",
        "Embedding",
      ],
      sidePanels: ["Erlebnis-Center", "Token-Abrechnung"],
      integrateBar: "Weitere kommerzielle und Open-Source-Fähigkeiten integriert",
      poolTitle: "Heterogener Compute-Ressourcenpool",
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
      title: "Energiesektor",
      topMode: "apps",
      topItems: [
        "Intelligenter Solar-After-Sales-Support",
        "Intelligente Stromgeräte-Fehlerdiagnose",
        "Intelligente Windprojekt-Angebotserstellung",
        "Intelligente Solar-Rohstoffbeschaffung",
        "Intelligente Meeting-Protokoll-Generierung",
        "Intelligente Gewerbe-/Industriestrom-Anomalieanalyse",
      ],
      hub: "MaaS-Plattform",
      arc: [
        "Agent-Anwendungsentwicklung",
        "Wissensmanagement",
        "Inferenz- und MaaS-Services",
        "Modelltraining / Feintuning",
      ],
      left: "Heterogene Governance",
      right: "Inferenzbeschleunigung",
      platform: "Multi-Typ-GPUs",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Fertigung",
      topMode: "service",
      topTitle: "Privates Model-as-a-Service",
      topItems: [
        "Komplexe Testdatenstrom-Analyse",
        "Schlüsselinformationen und Anomalieerkennung",
        "Verbesserte Analyseeffizienz und Entscheidungsqualität",
      ],
      hub: "Zusammenarbeit großer und kleiner Modelle",
      left: "Große Modelle",
      right: "Machine-Learning-Modelle",
      engine: "Inferenzbeschleunigungs-Engine",
      platform: "Multi-Typ-GPUs",
    },
    transport: {
      layout: "transportFlow",
      title: "Verkehr",
      trainingTitle: "Großmodell-Trainingsplattform",
      trainingSteps: ["Verkehrsdaten", "Modelltraining", "Modellbewertung", "Modellbereitstellung"],
      edgeTitle: "Edge-Compute-Geräte",
      edgeChip: "On-Device-Großmodelle",
      centerTitle: "Zentrale Inferenzplattform",
      businessTitle: "Geschäftsanwendungsplattform",
      flowEdgeToCenter: "Kleine-Modell-Erkennungsdaten",
      flowModelDown: "Modellverteilung",
      flowDataUp: "Daten-Rückfluss",
      flowToBusiness: "Großmodell-Sekundärerkennung",
      flowFromBusiness: "Geschäftsprüfungsdaten",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Telekommunikation",
      topMode: "service",
      topTitle: "Privates Model-as-a-Service",
      topItems: ["Niedrige Latenz", "Hoher Durchsatz", "Langer Kontext"],
      hub: "Modelle",
      left: "Eigene Großmodelle",
      right: "Open-Source-Großmodelle",
      engine: "Inferenzbeschleunigungs-Engine",
      platform: "Multi-Typ-GPUs",
    },
  },
  testimonials: [
    {
      title: "Ein großes Energieunternehmen",
      body: "Wir haben erfolgreich ein branchenspezifisches Großmodell auf der Plattform bereitgestellt. Starke heterogene Compute-Verwaltung und die Zusammenarbeit großer und kleiner Modelle brachten messbare Effizienzgewinne bei intelligenter Fehlerdiagnose, Beschaffungsunterstützung und Stromanomalieanalyse. Private Bereitstellung sichert Datenschutz und Compliance, die langfristige Plattformstabilität bietet ein zuverlässiges AI-Fundament für die digitale Transformation.",
      role: "Leiter Digitalisierung",
    },
    {
      title: "Ein Verkehrs-IT-Unternehmen",
      body: "Beim Aufbau eines Cloud-Edge-kollaborativen intelligenten Verkehrssystems brachte basedongs Großmodell-Plattform zuverlässige kognitive Intelligenz in unsere Lösungen. Fähigkeit, vertikale Szenariodaten zu lernen und multimodale Aufgaben zu unterstützen — passend zu Branchenterminologie und Geschäftskontext. Intelligente Entscheidungsunterstützungs-Apps verbessern Effizienz und Reaktionsgeschwindigkeit bei Fehlerbewertung und Einsatzleitung.",
      role: "Leiter Lösungen",
    },
    {
      title: "Ein Cloud-Compute-Dienstleister",
      body: "Wir haben mit basedong eine unternehmensorientierte Compute-Service-Plattform aufgebaut. Hardware-agnostisches Inferenz-Framework und Multi-Vendor-Compute-Orchestrierung ermöglichen Service-Stabilität bei schrittweiser Loslösung von Single-GPU-Vendor-Lock-in — flexible Workload-Planung auf diverse Beschleuniger. Inferenzbeschleunigung, dynamisches Routing und Speicheroptimierung verbesserten Cluster-Auslastung und senkten Inferenzkosten.",
      role: "Leiter Plattformtechnik",
    },
    {
      title: "Ein Software- und Systemintegrationsunternehmen",
      body: "basedongs Enterprise-Großmodell-Plattform unterstützt unsere branchenübergreifende Kundenarbeit stark. Einheitliche Entwicklungsschnittstellen, flexibles Feintuning und vollständige Toolchain haben Lieferzyklen in Finanzen, Regierung, Bildung und anderen Sektoren deutlich verkürzt. Hohe Inferenzeffizienz und bequeme Private-Bereitstellung senken Implementierungshürden für Kunden.",
      role: "Leiter Integrationsservices",
    },
  ],
  faqItems: [
    {
      question: "Wie lange dauert die Bereitstellung bis zur Produktion? Welcher Support ist verfügbar?",
      answer:
        "Für bestehende Mainstream-Beschleuniger und gemischte Compute-Umgebungen bieten wir validierte standardisierte Deployment-Pläne — typische Lieferzeit in Wochen. basedong bietet Full-Lifecycle-Techniksupport inkl. Deployment, Training, Betriebssicherung und kontinuierlicher Version-Upgrades.",
    },
    {
      question: "Unterstützt die Plattform tiefe vertikale Branchenszenarien?",
      answer:
        "Ja. Neben allgemeinen Großmodell-Fähigkeiten unterstützt die Plattform branchenspezifische Modelle mit Branchenwissen. In Strom, Öl & Gas, Fertigung u.a. haben wir Fehlerdiagnose, Arbeitssicherheit, F&E-Unterstützung und Ops-Optimierung erfolgreich implementiert.",
    },
    {
      question: "Kann sie großflächige Forschungs-, Build- und Nutzungs-Deployments unterstützen?",
      answer:
        "Ja. basedongs private MaaS-Plattform ist für großflächige Enterprise-AI-Befähigung konzipiert — mit 10.000-Karten-heterogener Planung, Hochconcurrency-Stabilität und feingranularer Ressourcenverwaltung von Modell-F&E bis massiver Endpunkt-Inferenz.",
    },
    {
      question: "Können Fachanwender AI-Anwendungen selbstständig bereitstellen?",
      answer:
        "Ja. End-to-End-visuelle Workflows — von Modellauswahl, Deployment und Test bis Service-Launch — alles über grafische Oberflächen, deutlich niedrigere Hürde. Nach kurzer Schulung können Fachanwender Modelle aufrufen und Anwendungen selbst aufbauen.",
    },
    {
      question: "Wie wird Datensicherheit bei Private Deployment gewährleistet?",
      answer:
        "Private Deployment stellt sicher, dass alle Daten und Modelle in der Unternehmensumgebung laufen. Defense-in-Depth: Multi-Tenant-Isolation, feingranulare Zugriffskontrolle, Full-Chain-Audit und Echtzeit-Content-Safety — erfüllt strenge Anforderungen in Finanzen, Energie, Regierung u.a.",
    },
    {
      question: "Wie balancieren Sie Performance und Kosten?",
      answer:
        "Unsere Hochleistungs-Inferenz-Engine (PD-Separation, KV-Cache-Quantisierung u.a.) verbessert Durchsatz und senkt Latenz — weniger Compute pro Aufgabe. Smart Service Gateways und sekundenschnelle Elastizität allozieren Ressourcen dynamisch nach Live-Last — besserer TCO bei stabiler Kernlast.",
    },
    {
      question: "Wie wählt man Modelle effizient über mehrere Geschäftsszenarien?",
      answer:
        "Tag-basierter Modell-Marktplatz — Filter nach Aufgabentyp, Modalität, Parameteranzahl u.a. Wichtiger: Evaluierungs-Toolchain mit eigenen Geschäftsdaten zum Vergleich von Kandidaten, dann One-Click-Tuning für kostengünstige Anpassung.",
    },
    {
      question: "Welche Chips werden unterstützt? Bleibt die Performance über Anbieter stabil?",
      answer:
        "Hardware-agnostische Architektur — NVIDIA, AMD und andere Mainstream-GPUs plus diverse NPUs/Beschleuniger, ohne Lock-in. Einheitliches Inferenz-Framework und Compute-Orchestrierung laufen stabil in bestehenden oder Multi-Vendor-Umgebungen mit 100+ Mainstream-Modellen.",
    },
    {
      question: "Welche Schlüsseldimensionen sollten bei der Private-MaaS-Auswahl gelten?",
      answer: `Bewertung über fünf Dimensionen:

① Technische Agilität (reiche Modellbibliothek, schnelles Onboarding neuer Modelle);
② Auswahlpräzision (Evaluierungs- und Optimierungstools mit eigenen Daten);
③ Produktionsleistung (Inferenzlatenz, Durchsatz, Ressourcenelastizität);
④ Sicherheit und Compliance (Multi-Tenant-Isolation, Audit-Logs, Content-Filter u.a.);
⑤ Benutzerfreundlichkeit und Betreibbarkeit (visuelle UI und einheitliche Planung).`,
    },
    {
      question: "Wann sollte ein Unternehmen Private MaaS aufbauen?",
      answer: `Private MaaS erwägen, wenn Ihre Organisation eines der folgenden Szenarien hat:

① Sensible Geschäftsdaten (Energieproduktion, Finanztransaktionen, F&E-Daten) mit strengen Anforderungen an internes Netzwerk;
② AI muss auf viele Endpunkte/Szenarien skaliert werden mit extrem hohen Inferenz-Performance- und Stabilitätsanforderungen;
③ Heterogener Compute verschiedener Marken/Architekturen über Regionen/Einheiten braucht einheitliche Governance;
④ Sie wollen mit AI-Schritten Schritt halten, aber es fehlt ein Team für laufende Modellanpassung und -optimierung.`,
    },
  ],
};
