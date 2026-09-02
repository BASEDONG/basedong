import type { ReservedStrings } from "../content-types";

export const vi: ReservedStrings = {
  pageTitle: "Instance dự trữ | basedong",
  pageDescription:
    "Khóa sức mạnh tính toán cho workload quan trọng. Hiệu năng dự đoán được, chi phí tốt hơn ở quy mô lớn, SLA doanh nghiệp.",
  heroLogoAlt: "Instance dự trữ",
  heroTitle: "Khóa sức mạnh tính toán",
  heroTitleAccent: "Giữ workload quan trọng ổn định",
  heroSubtitle:
    "Hiệu năng dự đoán được · Chi phí tốt hơn ở quy mô lớn · SLA doanh nghiệp",
  consultCta: "Đặt lịch tư vấn",
  whyBadge: "WHY RESERVED",
  whyTitle: "Vì sao chọn instance dự trữ",
  whySubtitle:
    "Sức mạnh tính toán riêng, độ chính xác model và kiểm soát chi phí cho inference doanh nghiệp.",
  whyCards: [
    {
      title: "Sức mạnh dự trữ riêng",
      items: [
        "Dự trữ compute cho workload cốt lõi, vẫn ổn định khi cao điểm.",
        "Tránh tranh chấp trên pool dùng chung, giữ ứng dụng quan trọng online.",
      ],
    },
    {
      title: "Độ chính xác model",
      items: [
        "Stack inference được tối ưu khi triển khai để khớp baseline của nhà cung cấp.",
        "Chất lượng ổn định cho kịch bản không chấp nhận trôi dạt.",
      ],
    },
    {
      title: "Chi phí dự đoán ở quy mô lớn",
      items: [
        "Giá theo kỳ cố định thay vì biến động pay-as-you-go.",
        "Cấu trúc chi phí tốt hơn cho tải cao ổn định và ngân sách dài hạn.",
      ],
    },
    {
      title: "SLA doanh nghiệp",
      items: [
        "Mức dịch vụ giữ các job inference quan trọng chạy ổn định.",
        "Cho tải bền vững và hệ thống production.",
      ],
    },
  ],
  pricingBadge: "PRICING & PERFORMANCE",
  pricingTitle: "Giá và hiệu năng tham khảo",
  pricingSubtitle:
    "Nhiều quy cách instance dự trữ theo model, concurrency và quy mô. Dưới đây là ví dụ specs và giá.",
  highPerfTitle: "Tier hiệu năng cao",
  standardTitle: "Tier tiêu chuẩn",
  pricingNote1:
    "Đơn giá hiệu dụng tính từ TPM trên, giả định 30 ngày/tháng và 50% utilization.",
  pricingNote2:
    "Hiệu năng đo với tham số điển hình: 24k input tokens, 1k output, cache hit 80%.",
  pricingFootCtaBefore:
    "Đây là specs mẫu. Để biết thêm model hoặc triển khai tùy chỉnh, ",
  pricingFootCtaAfter: ".",
  costReferenceLabel: "Tham khảo chi phí",
  priceLabel: "Giá",
  unitPriceLabel: "Đơn giá hiệu dụng",
  perfReferenceLabel: "Tham khảo hiệu năng",
  deliveryBadge: "DELIVERY & SLA",
  deliveryTitle: "Triển khai và vận hành doanh nghiệp",
  deliverySteps: [
    {
      title: "Triển khai nhanh",
      description:
        "Instance dự trữ tiêu chuẩn triển khai trong 1–7 ngày làm việc, tích hợp nhanh vào hệ thống hiện có.",
    },
    {
      title: "Triển khai và tuning",
      description:
        "Chúng tôi lo deploy, xác thực và tinh chỉnh inference để workload vào vận hành mượt.",
    },
    {
      title: "Mở rộng linh hoạt",
      description:
        "Mở rộng capacity hoặc đổi specs theo tăng trưởng hoặc biến động theo mùa.",
    },
    {
      title: "Cam kết SLA",
      description:
        "Mức dịch vụ rõ ràng và đảm bảo vận hành cho workload dài hạn.",
    },
  ],
  ctaBadge: "Triển khai tùy chỉnh",
  ctaTitle: "Sức mạnh riêng\ncho tăng trưởng",
  ctaBody:
    "Hỗ trợ thêm phương án deploy dự trữ. Đội ngũ sẽ tùy chỉnh specs, rollout và báo giá theo workload của bạn.",
  ctaCardTitle: "Thêm thông tin instance dự trữ",
  ctaCardBody: "Đặt lịch tư vấn để nhận specs, phương án triển khai và báo giá",
  ctaButton: "Liên hệ ngay",
  highPerfModels: [
    {
      description:
        "Agent doanh nghiệp, lập kế hoạch nhiều bước, tự động hóa phần mềm, phân tích tài liệu dài và sinh code.",
      price: "¥ 772,200 / nhóm / tháng",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "10M",
    },
    {
      description:
        "Agent đa phương thức, hiểu hình ảnh, design-to-code và tự động hóa tác vụ phức tạp.",
      price: "¥ 772,200 / nhóm / tháng",
      unitPrice: "¥ 8.938 / M tokens",
      tpm: "4M",
    },
    {
      description:
        "Phân tích tài liệu dài và knowledge base, bot hỗ trợ, sinh nội dung và tự động hóa quy trình.",
      price: "¥ 386,100 / nhóm / tháng",
      unitPrice: "¥ 3.575 / M tokens",
      tpm: "5M",
    },
    {
      description:
        "Suy luận phức tạp, hỗ trợ code, agent dùng tool, analytics và workflow tự động.",
      price: "¥ 772,200 / nhóm / tháng",
      unitPrice: "¥ 2.86 / M tokens",
      tpm: "12.5M",
    },
  ],
  standardModels: [
    {
      description:
        "Agent đa phương thức, hiểu hình ảnh, design-to-code và tự động hóa tác vụ phức tạp.",
      price: "¥ 486,000 / nhóm / tháng",
      unitPrice: "¥ 4.25 / M tokens",
      tpm: "5.3M",
    },
    {
      description:
        "Phân tích tài liệu dài và knowledge base, bot hỗ trợ, sinh nội dung và tự động hóa quy trình.",
      price: "¥ 486,000 / nhóm / tháng",
      unitPrice: "¥ 2.50 / M tokens",
      tpm: "9M",
    },
    {
      description:
        "Suy luận phức tạp, hỗ trợ code, agent dùng tool, analytics và workflow tự động.",
      price: "¥ 486,000 / nhóm / tháng",
      unitPrice: "¥ 2.08 / M tokens",
      tpm: "10.8M",
    },
  ],
};
