import type { GatewayStrings } from "../content-types";

export const vi: GatewayStrings = {
  archLayers: [
    {
      kind: "apps",
      title: "Ứng dụng AI",
      modules: [
        "Agent",
        "RAG",
        "Ứng dụng hội thoại",
        "Workflow",
        "Suy luận batch",
        "Tìm kiếm embedding",
        "Đa phương thức",
      ],
    },
    {
      kind: "divider",
      title: "API / Gọi",
    },
    {
      kind: "section",
      title: "Cổng dịch vụ suy luận LLM",
      modules: [
        "API thống nhất",
        "Xác thực",
        "Quan sát",
        "Thanh toán",
        "Đa tenant",
        "Fallback",
        "Kiểm soát quyền chi tiết",
        "Định tuyến chính sách",
        "Nhật ký audit",
        "Giới hạn tốc độ & hạn mức",
      ],
    },
    {
      kind: "parallel-vendors",
      left: {
        title: "Dịch vụ suy luận LLM bên thứ ba",
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
      right: {
        title: "Nền tảng MaaS riêng tư",
        vendors: ["Mô hình riêng tư", "Mô hình fine-tuned"],
      },
    },
  ],
  advantageCards: [
    {
      title: "Chính sách định tuyến có thể điều phối",
      description:
        "Cấu hình định tuyến động, cân bằng tải và failover theo đặc điểm lưu lượng và dịch vụ mô hình — giữ ổn định khả dụng và SLA nghiệp vụ.",
    },
    {
      title: "Hạch toán chi phí toàn chuỗi",
      description:
        "Truy vết chi phí qua người dùng cuối, API Key, dự án, tổ chức, mô hình và compute — tái tạo cấu trúc chi phí đầy đủ cho hạch toán chính xác.",
    },
    {
      title: "Bảo mật và tuân thủ cấp doanh nghiệp",
      description:
        "Che dữ liệu hai chiều giảm rủi ro quyền riêng tư theo thời gian thực, kết hợp chặn nội dung nhạy cảm và nhật ký audit — workload LLM tuân thủ và truy vết đầy đủ.",
    },
    {
      title: "Truy cập thống nhất đa nguồn mô hình",
      description:
        "Tích hợp chuẩn hóa mô hình nhà cung cấp — onboarding và gọi tập trung, thay thế tích hợp rời rạc và quản lý đơn giản hệ sinh thái đa vendor.",
    },
    {
      title: "Quan sát mô hình end-to-end",
      description:
        "Khung nhìn đa chiều về khối lượng gọi, hiệu năng, v.v. — dữ liệu cho governance mô hình, quản lý vòng đời và tinh chỉnh định tuyến.",
    },
    {
      title: "Quản trị chi tiết",
      description:
        "Đặt quyền mô hình, lưu lượng và hạn mức theo người dùng, API Key, dự án, tổ chức, v.v. — mọi lần gọi đều kiểm soát được.",
    },
  ],
  scenarios: [
    {
      tab: "Nền tảng năng lực LLM doanh nghiệp",
      title: "Nền tảng năng lực LLM doanh nghiệp",
      paragraphs: [
        "Khi nhiều phòng ban và dòng nghiệp vụ triển khai LLM cùng lúc, cách truy cập, quyền và chính sách gọi dễ phân tán — chi phí quản lý và vận hành thống nhất tăng.",
        "Cổng dịch vụ LLM là điểm vào truy cập và quản trị gọi thống nhất, lập lịch tài nguyên mô hình tập trung — cung cấp kênh truy cập nhất quán, kiểm soát cho app và Agent phía trên.",
      ],
      cards: [
        { title: "API thống nhất", subtitle: "Kết nối nhanh hơn" },
        { title: "Kiểm soát quyền chi tiết", subtitle: "Quản lý dễ hơn" },
        { title: "Cô lập đa tenant", subtitle: "Bảo mật vững hơn" },
      ],
    },
    {
      tab: "Phối hợp đa mô hình",
      title: "Phối hợp đa mô hình",
      paragraphs: [
        "Mô hình khác nhau về năng lực, hiệu năng và chi phí — doanh nghiệp thường cần chính sách gọi theo kịch bản.",
        "Cổng dịch vụ LLM định tuyến và lập lịch theo chính sách — sử dụng đa mô hình linh hoạt hơn, hiệu quả tổng thể cao hơn.",
      ],
      cards: [
        { title: "Định tuyến mô hình thông minh", subtitle: "Vận hành hiệu quả hơn" },
        { title: "Chuyển mô hình động", subtitle: "Chi phí chuyển bằng không" },
        { title: "Hỗ trợ A/B test", subtitle: "Độ phức tạp thấp hơn" },
      ],
    },
    {
      tab: "Quan sát tập trung và quản trị gọi",
      title: "Quan sát tập trung và quản trị gọi",
      paragraphs: [
        "Khi lời gọi mô hình rải rác giữa nhiều app và hệ thống, khó thấy toàn cảnh — xử lý sự cố và tối ưu mất nhiều thời gian hơn.",
        "Cổng dịch vụ LLM tổng hợp nhật ký gọi và metric runtime — doanh nghiệp nắm sử dụng một chỗ và liên tục cải thiện quản trị.",
      ],
      cards: [
        { title: "Phân tích đa chiều", subtitle: "Xuất báo cáo" },
        { title: "Cảnh báo bất thường", subtitle: "Giám sát thời gian thực" },
      ],
    },
    {
      tab: "Tương tác tần suất cao: giảm chi phí, tăng tốc",
      title: "Tương tác tần suất cao: giảm chi phí, tăng tốc",
      paragraphs: [
        "Trong kịch bản tần suất cao như CS thông minh, Q&A tìm kiếm, chi phí gọi và độ trễ trực tiếp làm giảm trải nghiệm và hiệu quả vận hành.",
        "Với cache và định tuyến, doanh nghiệp nén chi phí gọi mà không giảm chất lượng và tăng tốc request tần suất cao.",
      ],
      cards: [
        { title: "Chi phí hiển thị thời gian thực", subtitle: "Kiểm soát chi tiêu" },
        { title: "Điều chỉnh hạn mức động", subtitle: "Gọi hiệu quả hơn" },
      ],
    },
    {
      tab: "Khả dụng liên tục cho nghiệp vụ then chốt",
      title: "Khả dụng liên tục cho nghiệp vụ then chốt",
      paragraphs: [
        "Nếu nghiệp vụ cốt lõi chỉ phụ thuộc một dịch vụ mô hình, rate limit, jitter hiệu năng hoặc sự cố sẽ ảnh hưởng liên tục.",
        "Cổng dịch vụ LLM hỗ trợ định tuyến đa mô hình và chính sách DR — tự chuyển khi bất thường hoặc suy giảm để giữ nghiệp vụ ổn định.",
      ],
      cards: [
        { title: "Failover tự động", subtitle: "Phục hồi nhanh hơn" },
        { title: "Health check thời gian thực", subtitle: "Khả dụng cao hơn" },
      ],
    },
  ],
  testimonials: [
    {
      title: "Giáo dục",
      body: "Khi LLM triển khai dần trong giảng dạy thông minh, phân tích học tập và Q&A thông minh, các khoa và app giảng dạy kết nối song song — nhu cầu phân cấp quyền, audit gọi và thống kê sử dụng tăng rõ. Cổng dịch vụ LLM basedong tăng cường truy cập thống nhất và quản trị chi tiết, hỗ trợ quản lý tập trung theo campus, rà soát nội dung tuân thủ và quan sát toàn chuỗi — nâng đáng kể hiệu quả vận hành mô hình và ổn định dịch vụ giảng dạy.",
      role: "Trưởng nền tảng giảng dạy",
    },
    {
      title: "Giàn khoan dầu ngoài khơi",
      body: "Khi LLM áp dụng toàn diện cho vận hành từ xa offshore, phân tích dữ liệu khoan và tuân thủ an toàn, yêu cầu độ trễ, đồng thời và liên tục nghiệp vụ cao hơn. Triển khai tại chỗ trên trung tâm dữ liệu container, cổng LLM basedong định tuyến thông minh theo loại tác vụ và độ dài context, kèm failover tự động, HA edge và quan sát toàn chuỗi — dịch vụ mô hình cho nghiệp vụ offshore then chốt ổn định và dự đoán hơn.",
      role: "Trưởng vận hành nền tảng",
    },
  ],
  faqItems: [
    {
      question: "Tại sao doanh nghiệp cần cổng dịch vụ LLM?",
      answer: {
        type: "list",
        intro:
          "Khi doanh nghiệp đồng thời dùng mô hình tự phát triển, mã nguồn mở và API bên thứ ba, các vấn đề sau xuất hiện nhanh:",
        items: [
          "Nguồn mô hình và giao thức khác nhau — chi phí tích hợp cao",
          "Mỗi app tự gọi — chuỗi phân tán, thiếu quản lý, audit và quan sát thống nhất",
          "SLA khác nhau theo app — khó điều phối",
          "Khó đo lường sử dụng và chi phí — quyết định thiếu dữ liệu tin cậy",
        ],
        outro: "Cổng dịch vụ LLM giải quyết tập trung các thách thức trên.",
      },
    },
    {
      question: "Đã có LLM API — tại sao cần cổng dịch vụ?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Gọi API trực tiếp giải quyết kết nối; cổng giải quyết kiểm soát. Khi quy mô tăng, chi phí vượt kiểm soát, lỗ hổng bảo mật/tuân thủ và vendor lock-in lộ diện. Lớp trung gian thống nhất, cổng giúp kiểm soát chi tiêu, bảo vệ toàn chuỗi và chuyển mô hình linh hoạt — bước then chốt từ pilot AI sang production.",
        ],
      },
    },
    {
      question: "Cổng dịch vụ LLM có triển khai on-premise được không?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Với tài chính, chính phủ và ngành yêu cầu bảo mật dữ liệu cực cao, cổng dịch vụ LLM cấp doanh nghiệp hỗ trợ triển khai on-premise. Xử lý dữ liệu và chuyển tiếp mô hình trong mạng nội bộ — bảo vệ tài sản cốt lõi.",
        ],
      },
    },
    {
      question: "Cổng kiểm soát chi phí sử dụng LLM thế nào?",
      answer: {
        type: "rich-list",
        intro: "Cổng dịch vụ LLM cung cấp kiểm soát chi phí đa chiều:",
        items: [
          {
            label: "Quản lý hạn mức Token:",
            text: "Đặt trần chi tiêu cho team hoặc dự án — tránh vượt ngân sách.",
          },
          {
            label: "Định tuyến thông minh:",
            text: "Tự chọn mô hình phù hợp theo độ phức tạp tác vụ (tác vụ đơn giản dùng mô hình nhẹ).",
          },
          {
            label: "Cache request:",
            text: "Giảm gọi trùng lặp — tiết kiệm Token trực tiếp.",
          },
        ],
      },
    },
    {
      question: "Cổng đảm bảo nội dung sinh ra tuân thủ thế nào?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Rà soát nội dung hai chiều tích hợp: chặn đầu vào nhạy cảm phía request, lọc đầu ra vi phạm phía response. Từ điển và chính sách tùy chỉnh — nội dung AI sinh ra đáp ứng quy định và thương hiệu.",
        ],
      },
    },
    {
      question: "Kết nối cổng dịch vụ LLM có làm chậm request không?",
      answer: {
        type: "paragraphs",
        paragraphs: [
          "Trên kiến trúc cloud-native hiệu năng cao, overhead mạng thêm thường ở mức mili giây — gần như không cảm nhận. Lập lịch lưu lượng thông minh giúp đạt SLA phía app dễ hơn, điều phối hợp lý còn nâng throughput tổng thể dịch vụ mô hình.",
        ],
      },
    },
  ],
};
