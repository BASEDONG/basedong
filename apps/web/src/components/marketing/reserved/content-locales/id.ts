import type { ReservedStrings } from "../content-types";

export const id: ReservedStrings = {
  pageTitle: "Instansi reserved | basedong",
  pageDescription:
    "Amankan kapasitas untuk workload kritis. Performa prediktif, ekonomi unit lebih baik pada skala, SLA enterprise.",
  heroLogoAlt: "Instansi reserved",
  heroTitle: "Amankan kapasitas",
  heroTitleAccent: "Jaga workload kritis tetap jalan",
  heroSubtitle:
    "Performa prediktif · Ekonomi unit lebih baik pada skala · SLA enterprise",
  consultCta: "Booking konsultasi",
  whyBadge: "WHY RESERVED",
  whyTitle: "Mengapa instansi reserved",
  whySubtitle:
    "Kapasitas dedicated, fidelitas model, dan kontrol biaya untuk workload inferensi enterprise.",
  whyCards: [
    {
      title: "Kapasitas reserved dedicated",
      items: [
        "Reserve compute untuk workload core agar traffic puncak tetap prediktif.",
        "Hindari kontensi di pool shared dan jaga app mission-critical online.",
      ],
    },
    {
      title: "Fidelitas model",
      items: [
        "Stack inferensi kami di-tune saat deployment agar match baseline vendor.",
        "Kualitas inteligensi stabil untuk skenario yang tidak toleran drift.",
      ],
    },
    {
      title: "Biaya prediktif pada skala",
      items: [
        "Harga jangka tetap alih-alih fluktuasi penggunaan pada billing pay-as-you-go.",
        "Ekonomi lebih baik untuk workload high-load stabil dan budgeting jangka panjang.",
      ],
    },
    {
      title: "SLA enterprise",
      items: [
        "Tingkat layanan yang menjaga job inferensi kritis berjalan andal.",
        "Dibangun untuk beban sustained dan sistem bisnis produksi.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Referensi harga dan performa",
  pricingSubtitle:
    "Instansi reserved tersedia dalam berbagai ukuran. Konfigurasi menurut model, konkurensi, dan skala. Di bawah spesifikasi contoh dan harga referensi.",
  highPerfTitle: "Tier high-performance",
  standardTitle: "Tier standar",
  pricingNote1:
    "Harga unit efektif diturunkan dari TPM di atas, dengan asumsi 30 hari per bulan dan 50% utilisasi keseluruhan.",
  pricingNote2:
    "Angka performa memakai pengaturan inferensi tipikal: 24k token input, 1k output, 80% cache hit rate.",
  pricingFootCtaBefore:
    "Ini spesifikasi contoh. Untuk lebih banyak model atau deployment custom, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Referensi biaya",
  priceLabel: "Harga",
  unitPriceLabel: "Harga unit efektif",
  perfReferenceLabel: "Referensi performa",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Delivery dan operasi enterprise",
  deliverySteps: [
    {
      title: "Deploy cepat",
      description:
        "Instansi reserved standar deploy dalam 1–7 hari kerja dan cepat terhubung ke sistem existing.",
    },
    {
      title: "Deployment dan tuning",
      description:
        "Kami tangani deployment, validasi, dan tuning inferensi agar workload Anda mendarat mulus.",
    },
    {
      title: "Scaling elastis",
      description:
        "Perluas kapasitas atau ubah spesifikasi saat traffic tumbuh atau bergeser musiman.",
    },
    {
      title: "Jaminan SLA",
      description:
        "Tingkat layanan jelas dan pengaman operasional untuk workload enterprise jangka panjang.",
    },
  ],
  ctaBadge: "Deployment custom tersedia",
  ctaTitle: "Kapasitas dedicated\nuntuk pertumbuhan",
  ctaBody:
    "Kami mendukung lebih banyak opsi deployment reserved. Tim kami akan menyesuaikan spesifikasi, rollout, dan harga dengan workload Anda.",
  ctaCardTitle: "Dapatkan detail instansi reserved lebih lanjut",
  ctaCardBody: "Booking konsultasi untuk spesifikasi, opsi deployment, dan harga",
  ctaButton: "Hubungi kami",
  highPerfModels: [
    {
      description:
        "Agent enterprise, perencanaan multi-langkah, otomasi software, analisis dokumen panjang, dan generasi kode.",
      price: "¥ 772.200 / grup / bulan",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Agent multimodal, pemahaman vision, design-to-code, dan otomasi tugas kompleks.",
      price: "¥ 772.200 / grup / bulan",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Analisis dokumen panjang dan basis pengetahuan, bot dukungan, generasi konten, dan otomasi workflow.",
      price: "¥ 386.100 / grup / bulan",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Penalaran kompleks, bantuan kode, agent ber-alat, analytics, dan workflow otomatis.",
      price: "¥ 772.200 / grup / bulan",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "12.5M",
    },
  ],
  standardModels: [
    {
      description:
        "Agent multimodal, pemahaman vision, design-to-code, dan otomasi tugas kompleks.",
      price: "¥ 486.000 / grup / bulan",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "5.3M",
    },
    {
      description:
        "Analisis dokumen panjang dan basis pengetahuan, bot dukungan, generasi konten, dan otomasi workflow.",
      price: "¥ 486.000 / grup / bulan",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Penalaran kompleks, bantuan kode, agent ber-alat, analytics, dan workflow otomatis.",
      price: "¥ 486.000 / grup / bulan",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "10.8M",
    },
  ],
};
