import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "Alle",
  荣誉奖项: "Auszeichnungen",
  企业动态: "Unternehmensnews",
  模型上新: "Neue Modelle",
  市场活动: "Events",
  客户案例: "Kundenstorys",
  生态合作: "Ökosystem-Partnerschaften",
  企业AI实践: "Enterprise AI in der Praxis",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: Gemeinsamer Compute-Betrieb für Token-Fabriken",
    excerpt:
      "basedong ist eine Partnerschaft für gemeinsamen Compute-Betrieb mit Guizhou Shujia Technology Co., Ltd. (Shujia Tech) und Guizhou Suanjia Computing Services Co., Ltd. (Suanjia Compute) eingegangen.",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong in der IDC China AI 50-Liste",
    excerpt:
      "Am 30. Juli veröffentlichte IDC die IDC China AI 50-Liste 2026. basedong wurde für technische Stärke und kommerzielle Traktion in der AI-Infrastruktur ausgewählt.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi und Kai-Fu Lee besuchen basedong | WAIC-Highlights",
    excerpt:
      "Vom 17.–20. Juli fand in Shanghai die World Artificial Intelligence Conference 2026 statt. basedong bewirtete Besucher, Kunden und Medien an einem eigenen Stand.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies und basedong bilden strategische Partnerschaft für Financial AI",
    excerpt:
      "Yusys Technologies und basedong haben eine strategische Partnerschaft unterzeichnet. Beide Seiten verbinden Erfahrung in Finanzszenarien und AI-Infrastruktur für integrierte AI-Lösungen für Finanzinstitute.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Domestic Chips + domestic Models + domestic Inference Engine: Full-Stack-AI-Compute-Praxis einer großen staatlichen Luftfahrtgruppe",
    excerpt:
      "Private Bereitstellung domestic Large Models auf domestic Chips wirft harte Fragen für Enterprise-AI-Infrastruktur auf: Wie Auslastung und Token-Versorgung verbessern und Systeme leistungsfähig und evolvierbar halten?",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong tritt der Pekinger „Jingsuan Token Factory“ bei, um die Compute-Basis der Hauptstadt zu stärken",
    excerpt:
      "basedong ist Core-Co-Builder der Pekinger „Jingsuan Token Factory“ und stärkt die digitale Compute-Basis der Hauptstadt für neue Impulse in der Digitalwirtschaft.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile und basedong unterzeichnen strategische Partnerschaft für die Digitalwirtschaft",
    excerpt:
      "China Mobile Communications Group Shandong Co., Ltd. (Shandong Mobile) und basedong haben eine strategische Kooperationsvereinbarung zu Compute-Services, Business-Kollaboration und Ökosystem-Co-Building für Digital Shandong unterzeichnet.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: Tiefer Co-Build großer Compute-Cluster für digitale Industrie",
    excerpt:
      "basedong und China Mobile Communications Group Guizhou Co., Ltd. (Guizhou Mobile) unterzeichneten eine tiefe Intelligent-Compute-Kooperationsvereinbarung und starten die strategische Zusammenarbeit für effiziente, zuverlässige Compute-Services.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong startet Meituan LongCat-2.0",
    excerpt:
      "basedong bietet jetzt Meituans neu veröffentlichtes LongCat-2.0 — 1,6T Gesamtparameter, ~48B durchschnittliche Aktivierung, dynamischer Bereich 33B–56B, native 1M Context. Erstes Billionen-Parameter-Modell, end-to-end auf 50.000 domestic Accelerator Cards trainiert und inferiert.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong auf der AICon: Token-Supply-Plattform treibt skalierte Agentic-AI-Adoption",
    excerpt:
      "Auf der AICon 2026 Shanghai präsentierte basedong seine vollständige Token-Supply-Plattform und führte vertiefte Gespräche mit Entwicklern und Enterprise-Teilnehmern.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong in der „Foresee 2026“ Top-20-Liste für AI-Produktexzellenz",
    excerpt:
      "Am 22. Januar wurde die „Foresee 2026“-Liste bekannt gegeben. basedong wurde unter den Top 20 AI-Produktexzellenz-Unternehmen für anhaltende Innovation und zuverlässige Kommerzialisierung in der AI-Infrastruktur anerkannt.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong in CYZONEs 2025 100 Future Unicorns-Liste",
    excerpt:
      "Auf CYZONEs 18. Jahreskonferenz am 15. Januar wurde basedong aus über 300 Bewerbern für Innovation und hohes Wachstumspotenzial in der AI-Infrastruktur ausgewählt.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong gewinnt InfoQ 2025 AI Infrastructure Excellence Award",
    excerpt: "basedong erhielt den AI Infrastructure Excellence Award 2025.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "basedong Enterprise MaaS als AIIA Model-Service-Benchmark-Case geehrt",
    excerpt:
      "basedongs Enterprise-MaaS-Plattform war einer von acht Benchmark-Cases in der jährlichen Model-as-a-Service-(MaaS)-Kategorie, neben Huawei, Ant Group und anderen führenden Unternehmen.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title:
      "basedong in MIT Technology Reviews 50 Smart Companies",
    excerpt:
      "Am 12. September auf dem EmTech China 2025 schloss sich basedong Alibaba, Huawei, DeepSeek und anderen der jährlichen MIT Technology Review 50 Smart Companies-Liste an.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong auf der 2025 AI MVP TOP 50-Liste",
    excerpt:
      "basedong wurde auf der AI Product Rankings 2025 AI MVP TOP 50-Liste für technische Exzellenz und anhaltende Innovation anerkannt.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong als Pekinger Benchmark-Unternehmen für digitale Grundlagentechnologie",
    excerpt:
      "basedong wurde im 2024 Beijing Digital Economy Benchmark Enterprise Evaluation Report als Benchmark-Unternehmen für digitale Grundlagentechnologie ausgewählt.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong auf der 2025 AI Cloud 100 China-Liste",
    excerpt:
      "basedong wurde in Jingya Capitals 2025 AI Cloud 100 China-Liste für führende GenAI-Cloud-Infrastrukturtechnologie und wachsende kommerzielle Performance genannt.",
  },
} as const;

export const de: NewsStrings = {
  pageTitle: "Unternehmensnews",
  heroLogoAlt: "Neueste Nachrichten",
  categoryFilterTitle: "Kategorie",
  featuredReadMore: "Mehr lesen",
  categoryLabels,
  featured: {
    title: "basedong startet High-Speed Kimi K2.7 Code",
    excerpt:
      "„Weniger denken, besser schreiben“: Es kann sehen und tun — Workflows aus Bildschirmaufnahmen verstehen und Cross-File-Projektentwicklung in einem Durchgang abschließen.",
  },
  articles,
};
