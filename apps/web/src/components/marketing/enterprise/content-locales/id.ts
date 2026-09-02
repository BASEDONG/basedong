import type { EnterpriseStrings } from "../content-types";

export const id: EnterpriseStrings = {
  introCards: [
    {
      title: "Operasi terpadu compute, model, dan aplikasi",
      description:
        "Amati, optimalkan, dan pulihkan compute, model, dan aplikasi dari satu bidang — menjaga operasi jangka panjang stabil dan berkelanjutan.",
    },
    {
      title: "Konfigurasi grafis plus API standar",
      description:
        "Konsol visual bersama API standar menurunkan hambatan teknis dan terhubung cepat ke beragam skenario bisnis.",
    },
    {
      title: "Model mainstream siap pakai, dapat disetel mendalam",
      description:
        "Solusi matang untuk LLM open source terkemuka, dioptimalkan terus-menerus di training dan inferensi — memperpendek jalur dari seleksi ke produksi.",
    },
    {
      title: "Pooling compute multi-arsitektur dan penjadwalan cerdas",
      description:
        "Akses terpadu dan penjadwalan cerdas di GPU, NPU, dan compute multi-vendor — tanpa ketergantungan vendor chip tunggal — untuk performa dan operasi konsisten pada investasi hardware existing.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Aplikasi industri",
      modules: [
        "Internet",
        "Pendidikan",
        "Keuangan",
        "Telekomunikasi",
        "Pemerintah",
        "智算",
        "Energi",
      ],
    },
    {
      kind: "divider",
      title: "API / Aplikasi",
    },
    {
      kind: "section",
      title: "Pengembangan aplikasi model",
      modules: [
        "Toolchain pengembang",
        "Debug dan release aplikasi",
        "Prompt engineering",
        "Agent",
        "RAG",
        "Framework aplikasi",
        "Basis data vektor",
      ],
    },
    {
      kind: "section",
      title: "Deployment dan inferensi model",
      modules: [
        "Manajemen model",
        "Monitoring",
        "Konfigurasi resource",
        "Generasi video",
        "Optimasi end-to-end",
        "Akselerasi inferensi",
        "Deployment model",
      ],
    },
    {
      kind: "section",
      title: "Training dan tuning model",
      modules: [
        "Manajemen job",
        "Performance tuning",
        "Alignment model",
        "Fine-tuning",
        "Training model",
        "Pemrosesan data",
        "Ingesti data",
      ],
    },
    {
      kind: "vendors",
      title: "Model",
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
      title: "Manajemen resource compute",
      modules: [
        "Administrasi pengguna dan sistem",
        "Penjadwalan job",
        "Penjadwalan workflow",
        "Manajemen compute terkontainerisasi",
        "Pooling compute",
        "Kuota compute",
        "Adaptasi resource heterogen",
      ],
    },
    {
      kind: "vendors",
      title: "Chip",
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
      title: "Aman · Perlindungan end-to-end, compliance dapat diaudit",
      description:
        "Keamanan data dan compliance end-to-end — risiko kebocoran jauh lebih rendah. Pemblokiran ancaman real-time dengan akurasi keamanan konten 99%+.",
    },
    {
      title: "Kontrol biaya · Belanja cerdas, perkuat ROI",
      description:
        "Penjadwalan compute dan memori halus menurunkan biaya compute unit. Quantization dinamis lossless mengurangi penggunaan compute per inferensi.",
    },
    {
      title: "Mudah digunakan · Kurva belajar rendah untuk semua",
      description:
        "Tampilan compute heterogen terpadu dengan deployment dan penjadwalan otomatis. Setup visual di bawah 3 menit. 30+ template — luncur tanpa tuning manual.",
    },
    {
      title: "Pilihan tepat · Seleksi ilmiah, kualitas dan keamanan seimbang",
      description:
        "Katalog model ber-tag untuk shortlist cepat. 20+ metrik benchmark inti terintegrasi mendukung keputusan.",
    },
    {
      title: "Stabil skala produksi · Performa grade produksi untuk beban inti",
      description:
        "Optimasi inferensi mendalam: hingga 70% latensi lebih rendah, throughput 3–5×. Load balancing cerdas compute dan layanan model. Elastisitas skala detik menyeimbangkan performa dan biaya.",
    },
    {
      title: "Rollout cepat · Pengiriman lebih singkat, respons bisnis tangkas",
      description:
        "100+ model mainstream terintegrasi dan siap pakai. Image model diperbarui terus dengan prioritas rilis baru. Toolchain mencakup training, inferensi, fine-tuning, deployment.",
    },
  ],
  scenarios: [
    {
      tab: "Industri energi",
      title: "Industri energi",
      description:
        "Berdasarkan kolaborasi model besar dan kecil, memberikan layanan AI dari training dan fine-tuning hingga deployment aplikasi — mendorong transformasi digital dan efisiensi operasional di energi.",
      advantages: [
        "Diagnosis kerusakan peralatan cerdas: gabungkan log dan kondisi operasi, persingkat siklus deteksi dan penyelesaian",
        "Analisis anomali dan beban listrik: identifikasi pola abnormal mendukung dispatch dan keputusan hemat energi",
        "Asisten pengetahuan pengadaan dan operasi: pengetahuan industri di intranet — data produksi tidak keluar domain",
      ],
    },
    {
      tab: "Platform terbuka pusat 智算",
      title: "Platform terbuka pusat 智算",
      description:
        "Fusi compute heterogen memungkinkan penjadwalan terpadu lintas arsitektur dan pasokan elastis — menyelesaikan governance skala besar, integrasi model open source, dan stabilitas layanan AI konkurensi tinggi.",
      advantages: [
        "Kuota multi-tenant plus penjadwalan lintas datacenter — pasokan compute elastis per proyek",
        "Akses marketplace model dengan gray release multi-versi — tenant pilih sendiri, pengiriman lebih cepat",
        "Rate limiting, circuit breaking, scaling horizontal — API eksternal konkurensi tinggi dengan ketersediaan terjamin",
      ],
    },
    {
      tab: "Transportasi",
      title: "Transportasi",
      description:
        "Menggabungkan model CV edge untuk pemrosesan real-time dengan pemahaman semantik LLM multimodal cloud — manajemen lalu lintas cerdas dengan penilaian semantik kecelakaan, pelanggaran, dan peristiwa kompleks.",
      advantages: [
        "Rekomendasi penanganan terstruktur untuk kecelakaan dan pelanggaran — penilaian dan dispatch lapangan lebih cepat",
        "Kolaborasi edge-cloud mengurangi false positive dan miss — waktu respons stabil bahkan saat puncak",
        "Deployment lokal jaringan privat memenuhi compliance lalu lintas — integrasi terus-menerus fine-tune multimodal baru",
      ],
    },
    {
      tab: "Platform compute heterogen enterprise",
      title: "Platform compute heterogen enterprise",
      description:
        "Mendukung transformasi digital dan cerdas dengan rantai lengkap dari governance compute melalui training model hingga deployment inferensi — penjadwalan berperforma tinggi dan arsitektur modular.",
      advantages: [
        "Akses dan pooling GPU/NPU multi-merek terpadu — utilisasi, antrian, kuota lintas datacenter dalam satu tampilan",
        "Pool resource dan penjadwalan bersama training dan inferensi — keseimbangan puncak/off-peak, lebih sedikit idle",
        "Integrasi OpenAPI standar dengan DevOps dan sistem bisnis — model baru tanpa bangun ulang",
      ],
    },
    {
      tab: "Operator telekomunikasi",
      title: "Operator telekomunikasi",
      description:
        "Mesin inferensi berperforma tinggi untuk skenario operasi konkurensi tinggi latensi rendah — perubahan minimal pada sistem existing, membuka nilai compute heterogen dan mempercepat kemampuan AI komersial.",
      advantages: [
        "SLA operasional dan kapasitas elastis untuk panggilan konkurensi tinggi latensi rendah ke pelanggan",
        "Perubahan minimal API/gateway integrasi BSS/OSS live dan model proprietary",
        "Aktifkan inventori akselerator multi-vendor — persingkat waktu layanan AI komersial",
      ],
    },
    {
      tab: "Manufaktur",
      title: "Manufaktur",
      description:
        "Model besar mengurai data uji dan produksi kompleks, mengidentifikasi pola kunci dan anomali otomatis — analisis lebih cepat, keputusan lebih baik, mengurangi review manual lambat dan rawan error.",
      advantages: [
        "Parsing otomatis data uji dan QC — anomali kritis dalam menit, lebih sedikit miss dan rework",
        "Hasil ditulis kembali ke node MES/QC/scheduling — monitoring manual lebih sedikit, closed loop lebih cepat",
        "Hot update model tanpa downtime — rollout kemampuan baru sementara lini produksi tetap berjalan",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Platform compute heterogen enterprise",
      training: {
        title: "Training model besar",
        steps: ["Praproses data", "Pengembangan dan training", "Optimasi training"],
      },
      inference: {
        title: "Inferensi model besar",
        steps: ["Seleksi model", "Evaluasi model", "Deployment cepat"],
      },
      apps: {
        title: "Skenario aplikasi cerdas enterprise",
        items: [
          "Penyusunan proposal cerdas",
          "Pengembangan dan training",
          "Q&A data cerdas",
          "Dukungan keputusan cerdas",
          "Pengadaan cerdas",
          "Penawaran cerdas",
        ],
      },
      apiUp: "Panggilan API model",
      apiDown: "Antarmuka terstandarisasi",
      platform: "Governance compute heterogen",
      supportLeft: "Scaling elastis",
      supportRight: "Panggilan konkurensi tinggi",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "Platform terbuka pusat 智算",
      leftAudience: "Untuk pengguna enterprise",
      rightAudience: "Untuk pengguna developer",
      axisLeft: "Mendukung aplikasi AI",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Invokasi model",
        "Instansi dedicated",
        "Fine-tuning model",
        "Hosting model",
        "Integrasi multi-model",
        "Uji coba gratis",
        "Panggilan berbiaya rendah",
        "Integrasi cepat",
      ],
      modelServiceTitle: "Layanan model — pasokan model besar kaya",
      models: [
        "Model teks",
        "Model suara",
        "Model gambar",
        "Model video",
        "Model kode",
        "Model data",
        "Model OCR",
        "Embedding",
      ],
      sidePanels: ["Pusat pengalaman", "Penagihan token"],
      integrateBar: "Lebih banyak kemampuan komersial dan open source terintegrasi",
      poolTitle: "Pool resource compute heterogen",
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
      title: "Industri energi",
      topMode: "apps",
      topItems: [
        "Dukungan purnajual cerdas pembangkit surya",
        "Diagnosis kerusakan peralatan listrik cerdas",
        "Penawaran proyek angin cerdas",
        "Pengadaan bahan baku surya cerdas",
        "Generasi notulen rapat cerdas",
        "Analisis anomali listrik komersial dan industri cerdas",
      ],
      hub: "Platform MaaS",
      arc: [
        "Pengembangan aplikasi Agent",
        "Manajemen pengetahuan",
        "Layanan inferensi dan MaaS",
        "Training / fine-tuning model",
      ],
      left: "Governance heterogen",
      right: "Akselerasi inferensi",
      platform: "GPU multi-tipe",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Manufaktur",
      topMode: "service",
      topTitle: "Model-as-a-Service privat",
      topItems: [
        "Analisis aliran data uji kompleks",
        "Pengenalan informasi kunci dan pola anomali",
        "Peningkatan efisiensi analisis dan kualitas keputusan",
      ],
      hub: "Kolaborasi model besar dan kecil",
      left: "Model besar",
      right: "Model machine learning",
      engine: "Mesin akselerasi inferensi",
      platform: "GPU multi-tipe",
    },
    transport: {
      layout: "transportFlow",
      title: "Transportasi",
      trainingTitle: "Platform training model besar",
      trainingSteps: ["Data lalu lintas", "Training model", "Evaluasi model", "Deployment model"],
      edgeTitle: "Perangkat edge compute",
      edgeChip: "Model besar on-device",
      centerTitle: "Platform inferensi pusat",
      businessTitle: "Platform aplikasi bisnis",
      flowEdgeToCenter: "Data pengenalan model kecil",
      flowModelDown: "Distribusi model",
      flowDataUp: "Aliran balik data",
      flowToBusiness: "Pengenalan sekunder model besar",
      flowFromBusiness: "Data review bisnis",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Operator telekomunikasi",
      topMode: "service",
      topTitle: "Model-as-a-Service privat",
      topItems: ["Latensi rendah", "Throughput tinggi", "Konteks panjang"],
      hub: "Model",
      left: "Model besar proprietary",
      right: "Model besar open source",
      engine: "Mesin akselerasi inferensi",
      platform: "GPU multi-tipe",
    },
  },
  testimonials: [
    {
      title: "Perusahaan energi besar",
      body: "Kami berhasil mendeploy model besar spesifik industri di platform. Manajemen compute heterogen yang kuat dan kolaborasi model besar-kecil memberikan peningkatan efisiensi terukur dalam diagnosis kerusakan cerdas, bantuan pengadaan, dan analisis anomali listrik. Deployment privat menjaga data bisnis inti aman dan compliant, stabilitas platform jangka panjang memberikan fondasi AI andal untuk transformasi digital.",
      role: "Kepala transformasi digital",
    },
    {
      title: "Perusahaan IT transportasi",
      body: "Saat membangun sistem lalu lintas cerdas kolaboratif cloud-edge, platform model besar basedong membawa inteligensi kognitif andal ke solusi kami. Kemampuan belajar data skenario vertikal dan dukungan tugas multimodal selaras dengan terminologi industri dan konteks bisnis. Kami mendeploy aplikasi dukungan keputusan cerdas yang meningkatkan efisiensi dan kecepatan respons dalam penilaian kerusakan dan dispatch.",
      role: "Kepala solusi",
    },
    {
      title: "Penyedia layanan compute cloud",
      body: "Kami bermitra dengan basedong membangun platform layanan compute enterprise. Framework inferensi agnostik hardware dan orkestrasi compute multi-vendor memungkinkan stabilitas layanan sambil lepas dari lock-in vendor GPU tunggal — penjadwalan workload fleksibel di berbagai akselerator. Akselerasi inferensi, routing dinamis, optimasi memori meningkatkan utilisasi cluster dan menurunkan biaya inferensi downstream.",
      role: "Kepala engineering platform",
    },
    {
      title: "Perusahaan software dan integrasi sistem",
      body: "Platform model besar enterprise basedong sangat mendukung pekerjaan kami lintas industri. Antarmuka pengembangan terpadu, fine-tuning fleksibel, dan toolchain lengkap mempersingkat siklus pengiriman di keuangan, pemerintah, pendidikan, dan sektor lain. Efisiensi inferensi tinggi dan deployment privat nyaman menurunkan hambatan implementasi pelanggan.",
      role: "Kepala layanan integrasi",
    },
  ],
  faqItems: [
    {
      question: "Berapa lama biasanya deployment hingga produksi? Dukungan berkelanjutan?",
      answer:
        "Untuk akselerator mainstream existing dan lingkungan compute campuran, kami menyediakan rencana deployment terstandarisasi tervalidasi — pengiriman tipikal dalam minggu. basedong menawarkan dukungan teknis full-lifecycle termasuk deployment, training, jaminan operasi, dan upgrade versi berkelanjutan.",
    },
    {
      question: "Apakah platform mendukung skenario industri vertikal mendalam?",
      answer:
        "Ya. Selain kemampuan model besar umum, platform mendukung menggabungkan pengetahuan industri untuk model spesifik domain. Di listrik, minyak & gas, manufaktur, kami telah mendeploy diagnosis kerusakan, produksi aman, bantuan R&D, dan optimasi operasi.",
    },
    {
      question: "Bisakah mendukung deployment riset, build, dan use skala besar?",
      answer:
        "Ya. Platform MaaS privat basedong dirancang untuk enablement AI enterprise skala besar — penjadwalan heterogen 10.000 kartu, jaminan stabilitas konkurensi tinggi, manajemen resource halus dari R&D model hingga inferensi endpoint masif.",
    },
    {
      question: "Bisakah pengguna bisnis mendeploy aplikasi AI secara mandiri?",
      answer:
        "Ya. Alur visual end-to-end — dari seleksi, deployment, dan uji model hingga peluncuran layanan — semua via antarmuka grafis, menurunkan hambatan besar. Setelah training singkat, pengguna bisnis dapat invoke model dan membangun aplikasi mandiri.",
    },
    {
      question: "Bagaimana keamanan data dijamin di deployment privat?",
      answer:
        "Deployment privat memastikan semua data dan model berjalan di lingkungan enterprise. Defense-in-depth: isolasi multi-tenant, kontrol akses halus, audit rantai penuh, deteksi keamanan konten real-time — memenuhi persyaratan ketat di keuangan, energi, pemerintah, dan industri regulated lain.",
    },
    {
      question: "Bagaimana menyeimbangkan performa dan biaya?",
      answer:
        "Mesin inferensi berperforma tinggi (pemisahan PD, quantization KV Cache, dll.) meningkatkan throughput dan menurunkan latensi — compute lebih sedikit per tugas. Gateway layanan cerdas dan elastisitas skala detik mengalokasikan resource dinamis berdasarkan beban live — TCO lebih baik dengan beban kritis stabil.",
    },
    {
      question: "Bagaimana memilih model efisien di banyak skenario bisnis?",
      answer:
        "Marketplace model ber-tag — filter berdasarkan jenis tugas, modalitas, jumlah parameter, dll. Lebih penting: gunakan toolchain evaluasi dengan data bisnis Anda membandingkan kandidat, lalu one-click tuning untuk adaptasi biaya rendah.",
    },
    {
      question: "Chip apa yang didukung? Bisakah performa stabil lintas vendor?",
      answer:
        "Arsitektur agnostik hardware mendukung NVIDIA, AMD, dan GPU mainstream lain plus NPUs dan akselerator beragam — tanpa lock-in vendor chip. Framework inferensi terpadu dan orkestrasi compute berjalan stabil di lingkungan existing atau multi-vendor dengan adaptasi 100+ model mainstream.",
    },
    {
      question: "Dimensi kunci apa yang harus memandu seleksi MaaS privat?",
      answer: `Evaluasi lima dimensi:

① Agilitas teknis (perpustakaan model kaya, onboarding model baru cepat);
② Presisi seleksi (alat evaluasi dan optimasi dengan data sendiri);
③ Performa grade produksi (latensi inferensi, throughput, elastisitas resource);
④ Keamanan dan compliance (isolasi multi-tenant, log audit, filter konten, dll.);
⑤ Kemudahan penggunaan dan operabilitas (UI visual dan penjadwalan terpadu).`,
    },
    {
      question: "Kapan enterprise sebaiknya membangun MaaS privat?",
      answer: `Pertimbangkan MaaS privat jika organisasi Anda menghadapi:

① Bisnis melibatkan data sensitif (produksi energi, transaksi keuangan, data R&D) dengan persyaratan ketat data tetap di jaringan korporat;
② AI harus diskala ke banyak endpoint/skenario dengan persyaratan performa dan stabilitas inferensi sangat tinggi;
③ Compute heterogen merek dan arsitektur berbeda di region/unit bisnis perlu governance terpadu;
④ Ingin mengikuti kemajuan AI tetapi kurang tim engineering untuk adaptasi dan optimasi model berkelanjutan.`,
    },
  ],
};
