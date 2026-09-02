import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "الكل",
  荣誉奖项: "الجوائز والتكريم",
  企业动态: "أخبار الشركة",
  模型上新: "نماذج جديدة",
  市场活动: "الفعاليات",
  客户案例: "قصص العملاء",
  生态合作: "شراكات المنظومة",
  企业AI实践: "الذكاء الاصطناعي المؤسسي في الممارسة",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: تشغيل حوسبة مشترك لبناء مصانع Token",
    excerpt:
      "دخل basedong في شراكة تشغيل حوسبة مشتركة مع Guizhou Shujia Technology Co., Ltd. (Shujia Tech) وGuizhou Suanjia Computing Services Co., Ltd. (Suanjia Compute).",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong في قائمة IDC China AI 50",
    excerpt:
      "في 30 يوليو، أصدرت IDC قائمة 2026 IDC China AI 50. اختير basedong لقوته التقنية وجذبه التجاري في بنية الذكاء الاصطناعي التحتية.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Zhou Hongyi وKai-Fu Lee يزوران basedong | أبرز WAIC",
    excerpt:
      "من 17–20 يوليو، عُقد مؤتمر World Artificial Intelligence Conference 2026 في شanghai. استضاف basedong جناحاً خاصاً والتقى الزوار والعملاء والإعلام في الموقع.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies وbasedong يشكلان شراكة استراتيجية لتسريع الذكاء الاصطناعي المالي",
    excerpt:
      "وقّعت Yusys Technologies وbasedong شراكة استراتيجية. سيجمع الطرفان خبرة السيناريوهات المالية وبنية الذكاء الاصطناعي التحتية لتقديم حلول ذكاء اصطناعي متكاملة للمؤسسات المالية.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "رقائق محلية + نماذج محلية + محرك استدلال محلي: ممارسة حوسبة ذكاء اصطناعي full-stack لمجموعة طيران حكومية كبرى",
    excerpt:
      "النشر الخاص للنماذج الكبيرة المحلية على رقائق محلية يطرح أسئلة صعبة لبنية الذكاء الاصطناعي المؤسسية: كيف تحسين الاستخدام وتوفير Token مع الحفاظ على أداء عالٍ وقابلية التطور؟",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong ينضم إلى «Jingsuan Token Factory» في بeking لتعزيز أساس الحوسبة في العاصمة",
    excerpt:
      "basedong شريك بناء مشترك أساسي في «Jingsuan Token Factory» بeking، يساعد على تعزيز أساس الحوسبة الرقمية للعاصمة وحقن زخم جديد في اقتصادها الرقمي.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile وbasedong يوقّعان شراكة استراتيجية لتقدم الاقتصاد الرقمي",
    excerpt:
      "وقّعت China Mobile Communications Group Shandong Co., Ltd. (Shandong Mobile) وbasedong اتفاق تعاون استراتيجي يغطي خدمات الحوسبة والتعاون التجاري وبناء المنظومة المشترك لـ Digital Shandong.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: بناء مشترك عميق لمجموعات حوسبة كبيرة لتسريع الصناعة الرقمية",
    excerpt:
      "وقّع basedong وChina Mobile Communications Group Guizhou Co., Ltd. (Guizhou Mobile) اتفاق تعاون عميق في الحوسبة الذكية، واطلقا تعاوناً استراتيجياً شاملاً لبناء خدمات حوسبة فعّالة وموثوقة.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong يطلق Meituan LongCat-2.0",
    excerpt:
      "basedong يقدّم الآن LongCat-2.0 الذي أصدرته Meituan — 1.6T إجمالي المعاملات، ~48B متوسط التفعيل، نطاق ديناميكي 33B–56B، وسياق أصلي 1M. أول نموذج تريليون معامل مُدرَّب ومُستدَل end-to-end على 50,000 بطاقة مسرّع محلية.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong في AICon: منصة توفير Token تدفع اعتماد Agentic AI على نطاق واسع",
    excerpt:
      "في AICon 2026 Shanghai، عرض basedong مصفوفة منتجات منصة توفير Token الكاملة وأجرى نقاشات عميقة مع المطوّرين والحضور المؤسسيين.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong في قائمة Top 20 لتميز منتجات الذكاء الاصطناعي «Foresee 2026»",
    excerpt:
      "في 22 يناير، أُعلنت قائمة «Foresee 2026». اُعترف بbasedong ضمن Top 20 شركات تميز منتجات الذكاء الاصطناعي للابتكار المستمر والتسويق الموثوق في بنية الذكاء الاصطناعي التحتية.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong في قائمة CYZONE 2025 100 Future Unicorns",
    excerpt:
      "في المؤتمر السنوي الـ18 لـ CYZONE في 15 يناير، اختير basedong من أكثر من 300 متقدّم للابتكار وإمكانات النمو العالية في بنية الذكاء الاصطناعي التحتية.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong يفوز بـ InfoQ 2025 AI Infrastructure Excellence Award",
    excerpt: "حصل basedong على جائزة AI Infrastructure Excellence Award 2025.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "MaaS المؤسسي من basedong يُكرَّم كحالة benchmark AIIA لخدمة النماذج",
    excerpt:
      "منصة MaaS المؤسسية من basedong كانت إحدى ثماني حالات benchmark سنوية في فئة model-as-a-service (MaaS)، إلى جانب Huawei وAnt Group وقادة آخرين.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title:
      "basedong في قائمة MIT Technology Review 50 Smart Companies",
    excerpt:
      "في 12 سبتمبر في EmTech China 2025، انضم basedong إلى Alibaba وHuawei وDeepSeek وغيرهم في قائمة MIT Technology Review السنوية 50 Smart Companies.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong في قائمة 2025 AI MVP TOP 50",
    excerpt:
      " اُعترف بbasedong في قائمة AI Product Rankings 2025 AI MVP TOP 50 للتميز التقني والابتكار المستمر.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong مؤسسة benchmark لتقنية رقمية أساسية في بeking",
    excerpt:
      "اختير basedong في 2024 Beijing Digital Economy Benchmark Enterprise Evaluation Report كمؤسسة benchmark لتقنية رقمية أساسية.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong في قائمة 2025 AI Cloud 100 China",
    excerpt:
      "سُمّي basedong في قائمة Jingya Capital 2025 AI Cloud 100 China لتقنية بنية GenAI cloud الرائدة والأداء التجاري المتنامي.",
  },
} as const;

export const ar: NewsStrings = {
  pageTitle: "أخبار الشركة",
  heroLogoAlt: "آخر الأخبار",
  categoryFilterTitle: "الفئة",
  featuredReadMore: "اقرأ المزيد",
  categoryLabels,
  featured: {
    title: "basedong يطلق Kimi K2.7 Code عالي السرعة",
    excerpt:
      "«فكّر أقل، اكتب أفضل»: يرى وينفّذ — يفهم سير العمل من تسجيلات الشاشة ويكمل تطوير المشاريع عبر الملفات في مرور واحد.",
  },
  articles,
};
