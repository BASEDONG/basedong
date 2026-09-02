import type { EnterpriseStrings } from "../content-types";

export const fr: EnterpriseStrings = {
  introCards: [
    {
      title: "Exploitation unifiée calcul, modèles et applications",
      description:
        "Observez, optimisez et recyclez calcul, modèles et applications depuis un même plan — pour des opérations stables et durables.",
    },
    {
      title: "Console visuelle et API standard",
      description:
        "Une console visuelle associée à des API standard réduit la barrière technique et accélère l'intégration à divers scénarios métiers.",
    },
    {
      title: "Modèles mainstream prêts à l'emploi, profondément optimisables",
      description:
        "Solutions matures pour les grands modèles open source leaders, optimisées en continu sur les chaînes d'entraînement et d'inférence — raccourcissant le chemin de la sélection à la production.",
    },
    {
      title: "Mutualisation multi-architecture et planification intelligente",
      description:
        "Accès unifié et planification intelligente sur GPU, NPU et calcul multi-fournisseurs — sans verrouillage sur un seul fabricant de puces — pour une performance et une exploitation cohérentes sur l'investissement matériel existant.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Applications sectorielles",
      modules: [
        "Internet",
        "Éducation",
        "Finance",
        "Télécoms",
        "Gouvernement",
        "Calcul IA",
        "Énergie",
      ],
    },
    {
      kind: "divider",
      title: "API / Applications",
    },
    {
      kind: "section",
      title: "Développement d'applications de modèles",
      modules: [
        "Chaîne d'outils de développement",
        "Débogage et publication d'applications",
        "Ingénierie de prompts",
        "Agent",
        "RAG",
        "Frameworks applicatifs",
        "Bases de données vectorielles",
      ],
    },
    {
      kind: "section",
      title: "Déploiement et inférence de modèles",
      modules: [
        "Gestion des modèles",
        "Supervision",
        "Configuration des ressources",
        "Génération vidéo",
        "Optimisation de bout en bout",
        "Accélération de l'inférence",
        "Déploiement de modèles",
      ],
    },
    {
      kind: "section",
      title: "Entraînement et affinage de modèles",
      modules: [
        "Gestion des tâches",
        "Optimisation des performances",
        "Alignement des modèles",
        "Fine-tuning",
        "Entraînement de modèles",
        "Traitement des données",
        "Ingestion des données",
      ],
    },
    {
      kind: "vendors",
      title: "Modèles",
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
      title: "Gestion des ressources de calcul",
      modules: [
        "Administration utilisateurs et système",
        "Planification des jobs",
        "Planification des flux de tâches",
        "Gestion conteneurisée du calcul",
        "Mutualisation du calcul",
        "Quotas de calcul",
        "Adaptation des ressources hétérogènes",
      ],
    },
    {
      kind: "vendors",
      title: "Puces",
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
      title: "Sécurité · Protection de bout en bout, conformité auditable",
      description:
        "Sécurité des données et conformité de bout en bout — risque de fuite fortement réduit. Blocage des menaces en temps réel avec plus de 99 % de précision sur la sécurité des contenus.",
    },
    {
      title: "Maîtrise des coûts · Dépenser intelligemment, maximiser le ROI",
      description:
        "Planification fine du calcul et de la mémoire — coût unitaire de calcul en baisse. Quantification dynamique sans perte pour réduire la consommation par inférence.",
    },
    {
      title: "Simplicité · Faible courbe d'apprentissage pour tous",
      description:
        "Vue unifiée du calcul hétérogène avec déploiement et planification automatisés. Configuration de base en moins de 3 minutes. Plus de 30 modèles prêts à l'emploi — lancement sans réglage manuel.",
    },
    {
      title: "Bon choix · Sélection scientifique entre efficacité et sécurité",
      description:
        "Catalogue de modèles avec recherche par tags pour présélection rapide. Plus de 20 indicateurs de performance intégrés pour éclairer les décisions.",
    },
    {
      title: "Stabilité · Performance de production pour les charges critiques",
      description:
        "Optimisation profonde de l'inférence : latence réduite jusqu'à 70 %, débit multiplié par 3 à 5. Équilibrage intelligent entre calcul et services de modèles. Élasticité à la seconde pour équilibrer performance et coût.",
    },
    {
      title: "Déploiement rapide · Livraison accélérée, réactivité métier",
      description:
        "Plus de 100 grands modèles mainstream pré-intégrés. Images de modèles mises à jour en continu avec priorité aux nouvelles versions. Chaîne d'outils couvrant entraînement, inférence, fine-tuning et déploiement.",
    },
  ],
  scenarios: [
    {
      tab: "Énergie",
      title: "Énergie",
      description:
        "Fondé sur la collaboration grands et petits modèles, la plateforme fournit des services IA de l'entraînement et du fine-tuning au déploiement applicatif — accélérant la transformation numérique et l'efficacité opérationnelle dans l'énergie.",
      advantages: [
        "Diagnostic intelligent des pannes d'équipement : fusion des journaux et conditions d'exploitation pour raccourcir détection et résolution",
        "Analyse des anomalies et charges électriques : identification des schémas anormaux pour la dispatch et les décisions d'économie d'énergie",
        "Assistants de connaissances achats et exploitation : savoir sectoriel conservé en intranet — les données de production ne quittent pas le domaine",
      ],
    },
    {
      tab: "Plateforme ouverte de centre IA",
      title: "Plateforme ouverte de centre IA",
      description:
        "La fusion de calcul hétérogène permet une planification unifiée inter-architectures et un approvisionnement élastique — résolvant la gouvernance à grande échelle, l'intégration de modèles open source et la stabilité des services IA à haute concurrence.",
      advantages: [
        "Quotas multi-locataires et planification inter-datacenters — approvisionnement élastique par projet pour les clients externes",
        "Accès type marketplace avec déploiement progressif multi-versions — les locataires choisissent leurs modèles et accélèrent la livraison",
        "Limitation de débit, disjoncteurs et montée en charge horizontale — API externes à haute concurrence avec disponibilité garantie",
      ],
    },
    {
      tab: "Transport",
      title: "Transport",
      description:
        "Combine des petits modèles CV en périphérie pour le traitement temps réel et des grands modèles multimodaux cloud pour la compréhension sémantique — gestion intelligente du trafic avec analyse sémantique des accidents, infractions et événements complexes.",
      advantages: [
        "Recommandations structurées pour accidents et infractions — évaluation et dispatch plus rapides sur le terrain",
        "Collaboration edge-cloud réduisant faux positifs et omissions — délais stables même aux heures de pointe",
        "Déploiement local en réseau privé conforme à la réglementation — intégration continue de nouveaux fine-tunes multimodaux",
      ],
    },
    {
      tab: "Plateforme entreprise de calcul hétérogène",
      title: "Plateforme entreprise de calcul hétérogène",
      description:
        "Accompagne la transformation numérique et intelligente des entreprises avec une chaîne complète de la gouvernance du calcul à l'entraînement des modèles et au déploiement d'inférence — planification haute performance et architecture modulaire pour une collaboration fluide entre calcul et applications IA.",
      advantages: [
        "Accès et mutualisation unifiés multi-marques GPU / NPU — utilisation, files d'attente et quotas inter-datacenters dans une seule vue",
        "Pools et stratégies de planification partagés entraînement/inférence — équilibrage pic/creux, moins d'inactivité et d'achats redondants",
        "Intégration OpenAPI standard avec DevOps et systèmes métier existants — nouveaux modèles sans reconstruire de zéro",
      ],
    },
    {
      tab: "Opérateurs télécoms",
      title: "Opérateurs télécoms",
      description:
        "Moteur d'inférence haute performance pour scénarios opérationnels à haute concurrence et faible latence — modifications minimales des systèmes existants, libérant la valeur du calcul hétérogène et accélérant la commercialisation des capacités IA.",
      advantages: [
        "SLA opérationnels et capacité élastique pour appels clients à haute concurrence et faible latence",
        "Intégration minimale via API / passerelle aux BSS / OSS en production et modèles propriétaires",
        "Valorisation des accélérateurs multi-fournisseurs existants — cycle de commercialisation IA raccourci",
      ],
    },
    {
      tab: "Industrie manufacturière",
      title: "Industrie manufacturière",
      description:
        "Les grands modèles analysent des données d'essais et de production complexes, identifiant automatiquement schémas clés et anomalies — analyses plus rapides, meilleures décisions, moins de revue manuelle lente et sujette aux erreurs.",
      advantages: [
        "Analyse automatique des données d'essais et QC — anomalies critiques détectées en minutes, moins d'oublis et de retouches",
        "Résultats réinjectés dans MES / QC / planification — moins de surveillance manuelle, boucles fermées plus rapides",
        "Mises à jour à chaud sans interruption — déploiement continu des capacités pendant le fonctionnement des lignes",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Plateforme entreprise de calcul hétérogène",
      training: {
        title: "Entraînement de grands modèles",
        steps: [
          "Prétraitement des données",
          "Développement et entraînement",
          "Optimisation de l'entraînement",
        ],
      },
      inference: {
        title: "Inférence de grands modèles",
        steps: ["Sélection de modèle", "Évaluation de modèle", "Déploiement rapide"],
      },
      apps: {
        title: "Scénarios d'applications intelligentes entreprise",
        items: [
          "Rédaction intelligente de propositions",
          "Développement et entraînement",
          "Interrogation intelligente des données",
          "Aide à la décision intelligente",
          "Achats intelligents",
          "Devis intelligents",
        ],
      },
      apiUp: "Appels API de modèles",
      apiDown: "Interfaces standardisées",
      platform: "Gouvernance du calcul hétérogène",
      supportLeft: "Extension élastique",
      supportRight: "Appels à haute concurrence",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "Plateforme ouverte de centre IA",
      leftAudience: "Pour les utilisateurs entreprise",
      rightAudience: "Pour les utilisateurs développeurs",
      axisLeft: "Alimenter les applications IA",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Invocation de modèles",
        "Instances dédiées",
        "Fine-tuning de modèles",
        "Hébergement de modèles",
        "Intégration multi-modèles",
        "Essai gratuit",
        "Appels à faible coût",
        "Intégration rapide",
      ],
      modelServiceTitle: "Services de modèles — offre riche de grands modèles",
      models: [
        "Modèles texte",
        "Modèles vocaux",
        "Modèles image",
        "Modèles vidéo",
        "Modèles code",
        "Modèles données",
        "Modèles OCR",
        "Embedding",
      ],
      sidePanels: ["Centre d'expérience", "Facturation Tokens"],
      integrateBar: "Plus de capacités commerciales et open source intégrées",
      poolTitle: "Pool de ressources de calcul hétérogènes",
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
      title: "Énergie",
      topMode: "apps",
      topItems: [
        "Support intelligent SAV centrales solaires",
        "Diagnostic intelligent de pannes d'équipements électriques",
        "Devis intelligent de projets éoliens",
        "Achats intelligents de matières premières solaires",
        "Génération intelligente de comptes rendus de réunion",
        "Analyse intelligente des anomalies de consommation industrielle et commerciale",
      ],
      hub: "Plateforme MaaS",
      arc: [
        "Développement d'applications Agent",
        "Gestion des connaissances",
        "Services d'inférence et MaaS",
        "Entraînement / fine-tuning de modèles",
      ],
      left: "Gouvernance hétérogène",
      right: "Accélération de l'inférence",
      platform: "GPU multi-types",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Industrie manufacturière",
      topMode: "service",
      topTitle: "Modèle en tant que service privé",
      topItems: [
        "Analyse de flux de données d'essais complexes",
        "Reconnaissance d'informations clés et de schémas anormaux",
        "Amélioration de l'efficacité d'analyse et de la qualité décisionnelle",
      ],
      hub: "Collaboration grands et petits modèles",
      left: "Grands modèles",
      right: "Modèles d'apprentissage automatique",
      engine: "Moteur d'accélération de l'inférence",
      platform: "GPU multi-types",
    },
    transport: {
      layout: "transportFlow",
      title: "Transport",
      trainingTitle: "Plateforme d'entraînement de grands modèles",
      trainingSteps: [
        "Données trafic",
        "Entraînement de modèles",
        "Évaluation de modèles",
        "Déploiement de modèles",
      ],
      edgeTitle: "Équipements de calcul en périphérie",
      edgeChip: "Grands modèles embarqués",
      centerTitle: "Plateforme d'inférence centrale",
      businessTitle: "Plateforme d'applications métier",
      flowEdgeToCenter: "Données de reconnaissance petit modèle",
      flowModelDown: "Distribution de modèles",
      flowDataUp: "Retour de données",
      flowToBusiness: "Reconnaissance secondaire grand modèle",
      flowFromBusiness: "Données de validation métier",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Opérateurs télécoms",
      topMode: "service",
      topTitle: "Modèle en tant que service privé",
      topItems: ["Faible latence", "Haut débit", "Long contexte"],
      hub: "Modèles",
      left: "Grands modèles propriétaires",
      right: "Grands modèles open source",
      engine: "Moteur d'accélération de l'inférence",
      platform: "GPU multi-types",
    },
  },
  testimonials: [
    {
      title: "Un grand groupe énergétique",
      body: "Nous avons déployé avec succès un grand modèle sectoriel sur la plateforme. L'excellente gestion du calcul hétérogène et l'architecture de collaboration grands/petits modèles ont apporté des gains mesurables en diagnostic intelligent des pannes, assistance aux achats et analyse des anomalies de consommation. Le déploiement privé garantit sécurité et conformité des données critiques, et la stabilité à long terme de la plateforme constitue une base IA fiable pour la transformation numérique.",
      role: "Responsable de la transformation numérique",
    },
    {
      title: "Une entreprise d'informatique des transports",
      body: "En construisant un système de trafic intelligent cloud-edge, la plateforme de grands modèles basedong a apporté une intelligence cognitive fiable à nos solutions. Sa capacité à apprendre des données de scénarios verticaux et à prendre en charge des tâches multimodales l'aligne sur la terminologie et le contexte métier. Nous avons déployé des applications d'aide à la décision qui améliorent l'efficacité et la réactivité en évaluation des incidents et en commandement.",
      role: "Responsable des solutions",
    },
    {
      title: "Un fournisseur de services de calcul cloud",
      body: "Nous avons co-construit avec basedong une plateforme de services de calcul pour entreprises. Son framework d'inférence indépendant du matériel et son orchestration multi-fournisseurs nous ont permis de maintenir la stabilité tout en sortant du verrouillage GPU — en planifiant flexiblement les charges sur divers accélérateurs. Accélération, routage dynamique et optimisation mémoire ont amélioré l'utilisation du cluster et réduit les coûts d'inférence en aval.",
      role: "Responsable technique de plateforme",
    },
    {
      title: "Une entreprise de logiciels et d'intégration système",
      body: "La plateforme de grands modèles entreprise basedong soutient fortement notre activité multi-secteurs. Interfaces unifiées, fine-tuning flexible et chaîne d'outils complète ont raccourci nos cycles de livraison en finance, administration publique, éducation et au-delà. Haute efficacité d'inférence et déploiement privé pratique réduisent les barrières côté client. Leur équipe technique répond rapidement — un partenaire clé pour nos capacités de services intelligents.",
      role: "Responsable des services d'intégration",
    },
  ],
  faqItems: [
    {
      question:
        "Combien de temps faut-il généralement du déploiement à la mise en production ? Quel support continu est proposé ?",
      answer:
        "Pour les accélérateurs mainstream et environnements de calcul mixtes existants, nous proposons des plans de déploiement standardisés validés — délais typiques en semaines. basedong fournit un support technique complet : déploiement, formation, assurance opérationnelle et mises à niveau continues.",
    },
    {
      question: "La plateforme couvre-t-elle des scénarios sectoriels approfondis ?",
      answer:
        "Oui. Au-delà des capacités générales des grands modèles, la plateforme combine le savoir sectoriel pour construire des modèles spécialisés. En électricité, pétrole et gaz, industrie manufacturière et autres secteurs, nous avons déployé diagnostic de pannes, sécurité industrielle, assistance R&D et optimisation opérationnelle.",
    },
    {
      question: "Peut-elle supporter un déploiement à grande échelle recherche-construction-utilisation ?",
      answer:
        "Oui. La plateforme MaaS privée basedong est conçue pour l'activation IA à l'échelle entreprise. Nous avons accompagné plusieurs groupes énergétiques avec planification hétérogène à l'échelle de dizaines de milliers de cartes, garanties de stabilité à haute concurrence et gestion fine des ressources.",
    },
    {
      question: "Les utilisateurs métier peuvent-ils déployer des applications IA de façon autonome ?",
      answer:
        "Oui. L'interface visuelle couvre tout le flux — sélection, déploiement, tests et mise en service — réduisant fortement la barrière. Après une brève formation, les équipes métier peuvent invoquer des modèles et construire des applications de façon autonome.",
    },
    {
      question: "Comment la sécurité des données est-elle assurée en déploiement privé ?",
      answer:
        "Le déploiement privé garantit que données et modèles restent dans l'environnement entreprise. Nous ajoutons une défense en profondeur : isolation multi-locataires, contrôle d'accès fin, audit de bout en bout et détection de sécurité des contenus en temps réel.",
    },
    {
      question: "Comment équilibrer performance et coût ?",
      answer:
        "Notre moteur d'inférence haute performance (séparation PD, quantification KV Cache, etc.) améliore le débit et réduit la latence. Passerelles intelligentes et élasticité à la seconde adaptent les ressources à la charge en temps réel, évitant l'inactivité du calcul — pour un TCO optimisé.",
    },
    {
      question: "Comment sélectionner efficacement des modèles pour plusieurs scénarios métiers ?",
      answer:
        "Marketplace de modèles avec tags — filtrez par type de tâche, modalité, taille de paramètres. Utilisez notre chaîne d'évaluation avec vos données pour comparer candidats, puis l'optimisation en un clic pour une adaptation à faible coût.",
    },
    {
      question:
        "Quelles puces sont supportées ? La performance reste-t-elle stable entre fournisseurs ?",
      answer:
        "Architecture indépendante du matériel : NVIDIA, AMD et GPU mainstream, plus divers NPU et accélérateurs — sans verrouillage. Framework d'inférence unifié et orchestration du calcul pour 100+ modèles mainstream adaptés et optimisés en environnements multi-fournisseurs.",
    },
    {
      question: "Quelles dimensions clés pour choisir un MaaS privé ?",
      answer: `Évaluez cinq dimensions :

① Agilité technique (richesse du catalogue, rapidité d'intégration de nouveaux modèles) ;
② Précision de sélection (outils d'évaluation et d'optimisation sur vos données) ;
③ Performance de production (latence, débit, élasticité) ;
④ Sécurité et conformité (isolation multi-locataires, journaux d'audit, filtrage de contenu) ;
⑤ Facilité d'usage et d'exploitation (interfaces visuelles et planification unifiée).`,
    },
    {
      question: "Quand une entreprise devrait-elle construire un MaaS privé ?",
      answer: `Envisagez un MaaS privé si votre organisation rencontre l'une de ces situations :

① Données sensibles (production énergétique, transactions financières, R&D) devant rester sur le réseau interne ;
② Besoin de déployer l'IA à grande échelle sur de nombreux terminaux ou scénarios avec exigences extrêmes de performance et stabilité ;
③ Calcul hétérogène multi-marques et multi-architectures à unifier et optimiser ;
④ Volonté de suivre l'IA rapidement sans équipe d'ingénierie dédiée à l'adaptation continue des modèles.`,
    },
  ],
};
