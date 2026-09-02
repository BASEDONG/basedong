import type { HomeStrings } from "../content-types";

export const vi: HomeStrings = {
  heroSlides: [
    {
      tabLabel: "GPT-5.6",
      eyebrow: "basedong đã ra mắt",
      title: "GPT-5.6",
      description:
        "Họ GPT-5.6 — Sol (flagship), Terra (cân bằng) và Luna (nhanh) — đạt hiệu năng hàng đầu cho lập trình, agent, công việc tri thức và suy luận khoa học. Đã có trên nền tảng.",
      ctaLabel: "Dùng thử ngay",
      logoAlt: "GPT-5.6",
    },
    {
      tabLabel: "Opus 5",
      eyebrow: "Flagship mới nhất của Anthropic",
      title: "Opus 5",
      description:
        "Opus 5 nâng cấp mạnh cho lập trình, agent và viết chuyên nghiệp — dành cho tác vụ phức tạp, dài hạn với đầu ra chính xác hơn.",
      ctaLabel: "Dùng thử ngay",
      logoAlt: "Opus 5",
    },
    {
      tabLabel: "Auto",
      eyebrow: "Miễn phí có thời hạn",
      title: "Mô hình Auto",
      description:
        "Định tuyến thông minh chọn mô hình phù hợp, cân bằng tốc độ, chi phí và chất lượng. Dùng thử miễn phí — không rào cản với mô hình lớn.",
      ctaLabel: "Dùng thử ngay",
      logoAlt: "Mô hình Auto",
    },
    {
      tabLabel: "Triển khai",
      eyebrow: "Cấp doanh nghiệp",
      title: "Triển khai dịch vụ mô hình",
      description:
        "Triển khai riêng và mở rộng đàn hồi trên cloud — thích ứng mô hình, tăng tốc suy luận và vận hành cho workload quan trọng.",
      ctaLabel: "Tìm hiểu thêm",
      logoAlt: "Triển khai dịch vụ mô hình",
    },
  ],
  productMatrix: {
    title: "Hệ sản phẩm toàn diện — từ ý tưởng đến production",
    subtitle:
      "Truy cập thống nhất cho developer và doanh nghiệp — kết nối AI với nghiệp vụ nhanh hơn",
  },
  productCards: [
    {
      title: "Triển khai riêng tại chỗ",
      description:
        "Cho doanh nghiệp cần tuân thủ và chủ quyền dữ liệu: giải pháp riêng sẵn sàng production, tinh chỉnh hiệu năng, cluster và vận hành liên tục.",
      ctaLabel: "Tìm hiểu thêm",
    },
    {
      title: "Tối ưu hiệu năng suy luận",
      description:
        "Trên engine suy luận mã nguồn mở, tương thích mô hình mở và mô hình tùy chỉnh — từ lựa chọn, tinh chỉnh đến vận hành production.",
      ctaLabel: "Liên hệ chúng tôi",
    },
    {
      title: "Mô hình Auto miễn phí",
      description:
        "Định tuyến thông minh cân bằng tốc độ, chi phí và chất lượng. Miễn phí có thời hạn — không rào cản với mô hình lớn.",
      ctaLabel: "Dùng thử ngay",
    },
    {
      title: "API mô hình lớn thống nhất",
      description:
        "Văn bản, giọng nói, hình ảnh và video qua một API — trả theo mức dùng để tích hợp và lặp nhanh.",
      ctaLabel: "Bắt đầu",
    },
  ],
  whySection: {
    title: "Vì sao chọn basedong",
  },
  whyHighlightCards: [
    {
      title: "Giá trị cao",
      textBlocks: [
        {
          lines: [
            [{ text: "Quản trị chi phí" }, { text: "end-to-end", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Mô hình Auto" }, { text: "miễn phí có thời hạn", emphasis: true }],
            [{ text: "Định tuyến thông minh cân bằng tốc độ và chi phí" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Giảm chi phí suy luận và triển khai tối đa", value: "40%" },
        { prefix: "Mô hình Auto miễn phí — chi phí tích hợp", value: "bằng không" },
      ],
      footnotes: [
        [{ text: "Thanh toán theo mức dùng minh bạch, chi tiêu dễ dự đoán" }],
        [{ text: "Tách rời compute không đồng nhất — lập lịch accelerator AI liền mạch" }],
        [
          { text: "Hiệu suất" },
          { text: "chi phí ổn định, dự đoán được", emphasis: true },
          { text: " cho ứng dụng nhạy cảm ngân sách" },
        ],
      ],
    },
    {
      title: "Độ tin cậy cao",
      textBlocks: [
        {
          lines: [
            [{ text: "Dư thừa" }, { text: "đa node", emphasis: true }],
          ],
        },
        {
          lines: [
            [{ text: "Giám sát, cảnh báo và tự phục hồi", emphasis: true }],
            [{ text: "Duy trì dịch vụ ổn định lâu dài" }],
          ],
          className: "mb-8",
        },
      ],
      stats: [
        { prefix: "Dư thừa đa node — chuyển đổi trong", value: "giây" },
        { prefix: "Hỗ trợ doanh nghiệp — đáp ứng yêu cầu", value: "SLA" },
      ],
      footnotes: [
        [{ text: "Xử lý đồng thời cao và batch suy luận lớn" }],
        [{ text: "Được developer kiểm chứng — ổn định trên production" }],
        [
          { text: "Hiệu suất" },
          { text: "dịch vụ ổn định, dự đoán được", emphasis: true },
          { text: " cho workload quan trọng" },
        ],
      ],
    },
  ],
  featureCards: [
    {
      title: "Mở rộng cao",
      description:
        "Scale đàn hồi cho traffic spike và workload phức tạp. Đưa mô hình tùy chỉnh lên production nhanh — kiến trúc linh hoạt, hybrid và multi-cloud.",
    },
    {
      title: "Bảo mật cao",
      description:
        "BYOC tùy chọn — dữ liệu ở trong phạm vi của bạn. Cô lập compute, mạng và lưu trữ, tuân thủ ngành cho bảo mật và audit doanh nghiệp.",
    },
    {
      title: "Thông minh cao",
      description:
        "LLM hàng đầu và API đa phương thức audio/video một nơi. Scale theo doanh nghiệp và theo dõi usage, chi phí rõ ràng.",
    },
    {
      title: "Khả dụng cao",
      description:
        "Được developer toàn cầu kiểm chứng. Giám sát, cảnh báo, tự phục hồi và hỗ trợ doanh nghiệp cho workload yêu cầu SLA.",
    },
  ],
  industrySection: {
    title: "Giải pháp theo ngành, triển khai linh hoạt theo nhu cầu",
  },
  industryItems: [
    {
      title: "Phần cứng AI",
      description:
        "Thiết bị di động AI, appliance suy luận và embodied intelligence — giảm độ trễ edge-cloud, cải thiện phản hồi.",
    },
    {
      title: "Chính phủ",
      description:
        "Suy luận throughput cao, độ trễ thấp cho chính quyền thông minh, an ninh công cộng và nâng cấp công nghiệp — generative AI hiệu quả, không khóa vendor.",
    },
    {
      title: "Trung tâm AI",
      description:
        "Tối ưu lập lịch và phân bổ tài nguyên để tăng tốc training và triển khai suy luận quy mô lớn.",
    },
    {
      title: "Giáo dục",
      description:
        "Trợ lý giảng dạy thông minh — lộ trình học cá nhân hóa đa mô hình, Q&A tức thì, nâng hiệu quả cho giáo viên và học sinh.",
    },
    {
      title: "Internet",
      description:
        "Sinh nội dung và cá nhân hóa cho nền tảng — hot-swap mô hình, tăng tốc suy luận, tăng GPU utilization và tối ưu UX, vận hành.",
    },
  ],
  partners: {
    title: "Khách hàng và đối tác hệ sinh thái",
    ctaPrimaryDesc: "Kích hoạt API mô hình trong vài phút",
    ctaPrimaryButton: "Bắt đầu dùng thử",
    ctaSecondaryDesc: "Cần gói riêng? Liên hệ chúng tôi",
    ctaSecondaryButton: "Gửi yêu cầu",
  },
  heroCarousel: {
    ariaLabel: "Nội dung nổi bật trang chủ",
    switchTabLabel: (tabLabel) => `Chuyển sang ${tabLabel}`,
  },
};
