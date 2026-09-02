import type { EnterpriseStrings } from "../content-types";

export const vi: EnterpriseStrings = {
  introCards: [
    {
      title: "Vận hành thống nhất compute, mô hình và ứng dụng",
      description:
        "Quan sát, tinh chỉnh và tái sử dụng compute, mô hình và ứng dụng từ một mặt phẳng — đảm bảo vận hành ổn định và bền vững lâu dài.",
    },
    {
      title: "Console trực quan và API chuẩn",
      description:
        "Bảng điều khiển trực quan kết hợp API chuẩn giảm rào cản kỹ thuật và kết nối nhanh với nhiều kịch bản nghiệp vụ.",
    },
    {
      title: "Mô hình mainstream sẵn sàng, tinh chỉnh sâu",
      description:
        "Giải pháp trưởng thành cho các LLM mã nguồn mở hàng đầu, tối ưu liên tục trên chuỗi huấn luyện và suy luận — rút ngắn đường đi từ lựa chọn đến production.",
    },
    {
      title: "Gom pool compute đa kiến trúc và lập lịch thông minh",
      description:
        "Truy cập thống nhất và lập lịch thông minh trên GPU, NPU và compute đa nhà cung cấp — không bị khóa vào một hãng chip — giúp tổ chức có hiệu năng và vận hành nhất quán trên đầu tư phần cứng hiện có.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Ứng dụng theo ngành",
      modules: [
        "Internet",
        "Giáo dục",
        "Tài chính",
        "Viễn thông",
        "Chính phủ",
        "Compute AI",
        "Năng lượng",
      ],
    },
    {
      kind: "divider",
      title: "API / Ứng dụng",
    },
    {
      kind: "section",
      title: "Phát triển ứng dụng mô hình",
      modules: [
        "Bộ công cụ phát triển",
        "Gỡ lỗi và phát hành ứng dụng",
        "Kỹ thuật Prompt",
        "Agent",
        "RAG",
        "Framework ứng dụng",
        "Cơ sở dữ liệu vector",
      ],
    },
    {
      kind: "section",
      title: "Triển khai và suy luận mô hình",
      modules: [
        "Quản lý mô hình",
        "Giám sát",
        "Cấu hình tài nguyên",
        "Sinh video",
        "Tối ưu end-to-end",
        "Tăng tốc suy luận",
        "Triển khai mô hình",
      ],
    },
    {
      kind: "section",
      title: "Huấn luyện và tinh chỉnh mô hình",
      modules: [
        "Quản lý tác vụ",
        "Tinh chỉnh hiệu năng",
        "Căn chỉnh mô hình",
        "Fine-tuning",
        "Huấn luyện mô hình",
        "Xử lý dữ liệu",
        "Thu nhận dữ liệu",
      ],
    },
    {
      kind: "vendors",
      title: "Mô hình",
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
      title: "Quản lý tài nguyên compute",
      modules: [
        "Quản trị người dùng và hệ thống",
        "Lập lịch job",
        "Lập lịch luồng tác vụ",
        "Quản lý compute container hóa",
        "Gom pool compute",
        "Hạn mức compute",
        "Thích ứng tài nguyên dị dạng",
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
      title: "An toàn · Bảo vệ end-to-end, tuân thủ có thể kiểm toán",
      description:
        "Bảo mật dữ liệu và tuân thủ end-to-end — giảm mạnh rủi ro rò rỉ. Chặn mối đe dọa thời gian thực với độ chính xác an toàn nội dung 99%+.",
    },
    {
      title: "Kiểm soát chi phí · Chi tiêu thông minh, khuếch đại ROI",
      description:
        "Lập lịch compute và bộ nhớ tinh vi giảm chi phí compute đơn vị. Lượng tử hóa động không mất mát giảm tiêu thụ compute mỗi lần suy luận.",
    },
    {
      title: "Dễ dùng · Đường cong học thấp cho mọi người",
      description:
        "Giao diện thống nhất compute dị dạng với triển khai và lập lịch tự động. Cấu hình cơ bản dưới 3 phút. 30+ mẫu sẵn — khởi chạy không cần tinh chỉnh thủ công.",
    },
    {
      title: "Chọn đúng · Lựa chọn khoa học cân bằng hiệu quả và an toàn",
      description:
        "Kho mô hình hỗ trợ tìm kiếm theo tag để lọc nhanh. 20+ chỉ số đánh giá hiệu năng cốt lõi tích hợp sẵn hỗ trợ quyết định.",
    },
    {
      title: "Ổn định · Hiệu năng production cho tải cốt lõi",
      description:
        "Tối ưu suy luận sâu: giảm độ trễ tới 70%, throughput tăng 3–5 lần. Cân bằng tải thông minh giữa compute và dịch vụ mô hình. Co giãn theo giây cân bằng hiệu năng và chi phí.",
    },
    {
      title: "Ra mắt nhanh · Giao hàng ngắn, phản hồi linh hoạt nghiệp vụ",
      description:
        "100+ LLM mainstream tích hợp sẵn, dùng ngay. Image mô hình cập nhật liên tục với ưu tiên phiên bản mới. Toolchain bao phủ huấn luyện, suy luận, fine-tuning và triển khai.",
    },
  ],
  scenarios: [
    {
      tab: "Năng lượng",
      title: "Năng lượng",
      description:
        "Xây dựng trên sự phối hợp mô hình lớn và nhỏ, cung cấp dịch vụ AI từ huấn luyện, fine-tuning đến triển khai ứng dụng — thúc đẩy chuyển đổi số và hiệu quả vận hành trong ngành năng lượng.",
      advantages: [
        "Chẩn đoán lỗi thiết bị thông minh: kết hợp log và điều kiện vận hành để rút ngắn chu kỳ phát hiện và xử lý",
        "Phân tích bất thường tiêu thụ điện và tải: nhận diện mẫu bất thường hỗ trợ điều độ và quyết định tiết kiệm năng lượng",
        "Trợ lý tri thức mua sắm và vận hành: tri thức ngành lưu trong intranet — dữ liệu sản xuất không rời miền",
      ],
    },
    {
      tab: "Nền tảng mở trung tâm AI",
      title: "Nền tảng mở trung tâm AI",
      description:
        "Hợp nhất compute dị dạng cho phép lập lịch thống nhất đa kiến trúc và cung cấp đàn hồi — giải quyết quản trị quy mô lớn, tích hợp mô hình mã nguồn mở và ổn định dịch vụ AI đồng thời cao.",
      advantages: [
        "Hạn mức đa tenant + lập lịch liên datacenter — cung cấp compute đàn hồi theo dự án cho khách hàng bên ngoài",
        "Truy cập kiểu marketplace với phát hành xám đa phiên bản — tenant tự chọn mô hình, rút ngắn giao hàng",
        "Giới hạn tốc độ, circuit breaker và mở rộng ngang — API bên ngoài đồng thời cao với cam kết khả dụng",
      ],
    },
    {
      tab: "Giao thông",
      title: "Giao thông",
      description:
        "Kết hợp mô hình CV nhỏ ở edge xử lý thời gian thực với LLM đa phương thức trên cloud để hiểu ngữ nghĩa — quản lý giao thông thông minh với đánh giá ngữ nghĩa tai nạn, vi phạm và sự kiện phức tạp.",
      advantages: [
        "Khuyến nghị xử lý có cấu trúc cho tai nạn và vi phạm — đánh giá và điều phối nhanh hơn tại hiện trường",
        "Phối hợp edge-cloud giảm báo động giả và bỏ sót — thời gian phản hồi ổn định cả giờ cao điểm",
        "Triển khai local trên mạng riêng đáp ứng tuân thủ giao thông — tích hợp liên tục fine-tune đa phương thức mới",
      ],
    },
    {
      tab: "Nền tảng compute dị dạng doanh nghiệp",
      title: "Nền tảng compute dị dạng doanh nghiệp",
      description:
        "Hỗ trợ chuyển đổi số và thông minh doanh nghiệp với chuỗi đầy đủ từ quản trị compute qua huấn luyện mô hình đến triển khai suy luận — lập lịch hiệu năng cao và kiến trúc module để compute và ứng dụng AI phối hợp mượt mà.",
      advantages: [
        "Truy cập và gom pool GPU / NPU đa thương hiệu — mức sử dụng, hàng đợi và hạn mức liên datacenter trong một giao diện",
        "Pool và chiến lược lập lịch dùng chung cho huấn luyện và suy luận — cân bằng cao điểm/thấp điểm, ít nhàn rỗi và mua trùng",
        "Tích hợp OpenAPI chuẩn với DevOps và hệ thống nghiệp vụ hiện có — mô hình mới không cần xây lại từ đầu",
      ],
    },
    {
      tab: "Nhà mạng",
      title: "Nhà mạng",
      description:
        "Engine suy luận hiệu năng cao cho kịch bản vận hành đồng thời cao, độ trễ thấp — thay đổi tối thiểu hệ thống hiện có, khai phá giá trị compute dị dạng và tăng tốc thương mại hóa AI.",
      advantages: [
        "SLA vận hành và dung lượng đàn hồi cho cuộc gọi khách hàng đồng thời cao, độ trễ thấp",
        "Tích hợp tối thiểu qua API / gateway với BSS / OSS live và mô hình riêng",
        "Khai thác accelerator đa nhà cung cấp hiện có — rút ngắn chu kỳ thương mại hóa AI",
      ],
    },
    {
      tab: "Sản xuất",
      title: "Sản xuất",
      description:
        "Mô hình lớn phân tích dữ liệu thử nghiệm và sản xuất phức tạp, tự động nhận diện mẫu và bất thường quan trọng — phân tích nhanh hơn, quyết định tốt hơn, giảm đánh giá thủ công chậm và dễ bỏ sót.",
      advantages: [
        "Phân tích tự động dữ liệu thử nghiệm và QC — bất thường quan trọng trong vài phút, ít bỏ sót và làm lại",
        "Kết quả ghi ngược MES / QC / lập lịch — ít giám sát thủ công, vòng lặp đóng nhanh hơn",
        "Cập nhật nóng không downtime — triển khai năng lực mới khi dây chuyền vẫn chạy",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Nền tảng compute dị dạng doanh nghiệp",
      training: {
        title: "Huấn luyện mô hình lớn",
        steps: ["Tiền xử lý dữ liệu", "Phát triển và huấn luyện", "Tối ưu huấn luyện"],
      },
      inference: {
        title: "Suy luận mô hình lớn",
        steps: ["Lựa chọn mô hình", "Đánh giá mô hình", "Triển khai nhanh"],
      },
      apps: {
        title: "Kịch bản ứng dụng thông minh doanh nghiệp",
        items: [
          "Soạn thảo đề xuất thông minh",
          "Phát triển và huấn luyện",
          "Hỏi đáp dữ liệu thông minh",
          "Hỗ trợ quyết định thông minh",
          "Mua sắm thông minh",
          "Báo giá thông minh",
        ],
      },
      apiUp: "Gọi Model API",
      apiDown: "Giao diện chuẩn hóa",
      platform: "Quản trị compute dị dạng",
      supportLeft: "Mở rộng đàn hồi",
      supportRight: "Gọi đồng thời cao",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "Nền tảng mở trung tâm AI",
      leftAudience: "Dành cho người dùng doanh nghiệp",
      rightAudience: "Dành cho nhà phát triển",
      axisLeft: "Hỗ trợ ứng dụng AI",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Gọi mô hình",
        "Instance riêng",
        "Fine-tuning mô hình",
        "Hosting mô hình",
        "Tích hợp đa mô hình",
        "Dùng thử miễn phí",
        "Gọi chi phí thấp",
        "Tích hợp nhanh",
      ],
      modelServiceTitle: "Dịch vụ mô hình — cung cấp LLM phong phú",
      models: [
        "Mô hình văn bản",
        "Mô hình giọng nói",
        "Mô hình hình ảnh",
        "Mô hình video",
        "Mô hình mã",
        "Mô hình dữ liệu",
        "Mô hình OCR",
        "Embedding",
      ],
      sidePanels: ["Trung tâm trải nghiệm", "Thanh toán Tokens"],
      integrateBar: "Tích hợp thêm khả năng thương mại và mã nguồn mở",
      poolTitle: "Pool tài nguyên compute dị dạng",
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
      title: "Năng lượng",
      topMode: "apps",
      topItems: [
        "Hỗ trợ thông minh hậu mãi nhà máy điện mặt trời",
        "Chẩn đoán lỗi thiết bị điện thông minh",
        "Báo giá thông minh dự án điện gió",
        "Mua sắm thông minh nguyên liệu mặt trời",
        "Sinh biên bản họp thông minh",
        "Phân tích bất thường tiêu thụ điện công nghiệp và thương mại",
      ],
      hub: "Nền tảng MaaS",
      arc: [
        "Phát triển ứng dụng Agent",
        "Quản lý tri thức",
        "Dịch vụ suy luận và MaaS",
        "Huấn luyện / fine-tuning mô hình",
      ],
      left: "Quản trị dị dạng",
      right: "Tăng tốc suy luận",
      platform: "GPU đa loại",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Sản xuất",
      topMode: "service",
      topTitle: "Model-as-a-service riêng tư",
      topItems: [
        "Phân tích luồng dữ liệu thử nghiệm phức tạp",
        "Nhận diện thông tin quan trọng và mẫu bất thường",
        "Nâng hiệu quả phân tích và chất lượng quyết định",
      ],
      hub: "Phối hợp mô hình lớn và nhỏ",
      left: "Mô hình lớn",
      right: "Mô hình machine learning",
      engine: "Engine tăng tốc suy luận",
      platform: "GPU đa loại",
    },
    transport: {
      layout: "transportFlow",
      title: "Giao thông",
      trainingTitle: "Nền tảng huấn luyện mô hình lớn",
      trainingSteps: [
        "Dữ liệu giao thông",
        "Huấn luyện mô hình",
        "Đánh giá mô hình",
        "Triển khai mô hình",
      ],
      edgeTitle: "Thiết bị compute edge",
      edgeChip: "Mô hình lớn trên thiết bị",
      centerTitle: "Nền tảng suy luận trung tâm",
      businessTitle: "Nền tảng ứng dụng nghiệp vụ",
      flowEdgeToCenter: "Dữ liệu nhận diện mô hình nhỏ",
      flowModelDown: "Phân phối mô hình",
      flowDataUp: "Dữ liệu hồi lưu",
      flowToBusiness: "Nhận diện thứ cấp mô hình lớn",
      flowFromBusiness: "Dữ liệu duyệt nghiệp vụ",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Nhà mạng",
      topMode: "service",
      topTitle: "Model-as-a-service riêng tư",
      topItems: ["Độ trễ thấp", "Throughput cao", "Ngữ cảnh dài"],
      hub: "Mô hình",
      left: "Mô hình lớn tự phát triển",
      right: "Mô hình lớn mã nguồn mở",
      engine: "Engine tăng tốc suy luận",
      platform: "GPU đa loại",
    },
  },
  testimonials: [
    {
      title: "Một doanh nghiệp năng lượng lớn",
      body: "Chúng tôi đã triển khai thành công LLM chuyên ngành trên nền tảng. Quản lý compute dị dạng xuất sắc và kiến trúc phối hợp mô hình lớn-nhỏ mang lại cải thiện hiệu quả đo được trong chẩn đoán lỗi thông minh, hỗ trợ mua sắm và phân tích bất thường tiêu thụ điện. Triển khai riêng tư đảm bảo an toàn và tuân thủ dữ liệu cốt lõi, ổn định lâu dài của nền tảng cung cấp nền tảng AI đáng tin cậy cho chuyển đổi số.",
      role: "Trưởng phòng chuyển đổi số",
    },
    {
      title: "Một doanh nghiệp CNTT giao thông",
      body: "Khi xây dựng hệ thống giao thông thông minh cloud-edge, nền tảng LLM của basedong mang trí tuệ nhận thức đáng tin cậy vào giải pháp của chúng tôi. Khả năng học dữ liệu kịch bản dọc và hỗ trợ tác vụ đa phương thức giúp phù hợp thuật ngữ ngành và ngữ cảnh nghiệp vụ. Chúng tôi đã triển khai ứng dụng hỗ trợ quyết định thông minh, cải thiện hiệu quả và tốc độ phản hồi trong đánh giá sự cố và điều phối.",
      role: "Trưởng phòng giải pháp",
    },
    {
      title: "Một nhà cung cấp dịch vụ compute cloud",
      body: "Chúng tôi hợp tác với basedong xây nền tảng dịch vụ compute cho khách hàng doanh nghiệp. Inference framework độc lập phần cứng và điều phối compute đa nhà cung cấp giúp duy trì ổn định dịch vụ đồng thời thoát khóa GPU đơn lẻ — lập lịch linh hoạt workload lên nhiều accelerator. Tăng tốc suy luận, định tuyến động và tối ưu bộ nhớ cải thiện đáng kể mức sử dụng cluster và giảm chi phí suy luận downstream.",
      role: "Trưởng phòng kỹ thuật nền tảng",
    },
    {
      title: "Một công ty phần mềm và tích hợp hệ thống",
      body: "Nền tảng LLM doanh nghiệp của basedong hỗ trợ mạnh công việc đa ngành của chúng tôi. Giao diện phát triển thống nhất, fine-tuning linh hoạt và toolchain đầy đủ đã rút ngắn đáng kể chu kỳ giao hàng trong tài chính, chính phủ, giáo dục và các lĩnh vực khác. Hiệu quả suy luận cao và triển khai riêng tư tiện lợi giảm rào cản triển khai phía khách hàng. Đội kỹ thuật phản hồi nhanh — đối tác quan trọng trong xây dựng năng lực dịch vụ thông minh.",
      role: "Trưởng phòng dịch vụ tích hợp",
    },
  ],
  faqItems: [
    {
      question:
        "Từ triển khai đến production thường mất bao lâu? Hỗ trợ liên tục như thế nào?",
      answer:
        "Với accelerator mainstream và môi trường compute hỗn hợp hiện có của khách hàng, chúng tôi cung cấp kế hoạch triển khai chuẩn hóa đã được xác minh — thời gian giao hàng điển hình tính theo tuần. basedong cung cấp hỗ trợ kỹ thuật toàn vòng đời gồm triển khai, đào tạo, đảm bảo vận hành và nâng cấp phiên bản liên tục.",
    },
    {
      question: "Nền tảng có hỗ trợ kịch bản ngành sâu không?",
      answer:
        "Có. Ngoài khả năng LLM chung, nền tảng hỗ trợ kết hợp tri thức ngành để xây mô hình chuyên lĩnh vực. Trong điện, dầu khí, sản xuất và các ngành khác, chúng tôi đã triển khai thành công chẩn đoán lỗi, an toàn sản xuất, hỗ trợ R&D và tối ưu vận hành.",
    },
    {
      question: "Có hỗ trợ triển khai quy mô lớn nghiên cứu-xây dựng-sử dụng không?",
      answer:
        "Có. Nền tảng MaaS riêng tư của basedong được thiết kế cho kích hoạt AI quy mô doanh nghiệp. Chúng tôi đã hỗ trợ nhiều doanh nghiệp năng lượng với lập lịch compute dị dạng cấp hàng vạn card, đảm bảo ổn định đồng thời cao và quản lý tài nguyên tinh vi.",
    },
    {
      question: "Người dùng nghiệp vụ có thể tự triển khai ứng dụng AI không?",
      answer:
        "Có. Nền tảng cung cấp giao diện trực quan end-to-end — từ chọn mô hình, triển khai, kiểm thử đến ra mắt dịch vụ — qua UI đồ họa, giảm mạnh rào cản. Sau đào tạo ngắn, người dùng nghiệp vụ có thể tự gọi mô hình và xây ứng dụng.",
    },
    {
      question: "An toàn dữ liệu được đảm bảo thế nào khi triển khai riêng tư?",
      answer:
        "Triển khai riêng tư đảm bảo mọi dữ liệu và mô hình chạy trong môi trường doanh nghiệp. Chúng tôi cũng xây phòng thủ chiều sâu: cô lập tài nguyên đa tenant, kiểm soát truy cập chi tiết, kiểm toán thao tác toàn chuỗi và phát hiện an toàn nội dung thời gian thực.",
    },
    {
      question: "Cân bằng hiệu năng và chi phí như thế nào?",
      answer:
        "Engine suy luận hiệu năng cao (PD separation, KV Cache quantization, v.v.) cải thiện throughput và giảm độ trễ. Gateway dịch vụ thông minh và co giãn theo giây phân bổ tài nguyên theo tải thực, tránh compute nhàn rỗi — TCO tốt hơn trong khi giữ ổn định workload cốt lõi.",
    },
    {
      question: "Làm sao chọn mô hình hiệu quả trên nhiều kịch bản nghiệp vụ?",
      answer:
        "Marketplace mô hình có tag — lọc theo loại tác vụ, modality, số tham số. Quan trọng hơn, dùng toolchain đánh giá với dữ liệu nghiệp vụ để so sánh ứng viên và one-click tuning cho thích ứng chi phí thấp.",
    },
    {
      question:
        "Nền tảng hỗ trợ chip nào? Hiệu năng có ổn định trên phần cứng đa nhà cung cấp không?",
      answer:
        "Kiến trúc độc lập phần cứng hỗ trợ NVIDIA, AMD và GPU mainstream cùng NPU / accelerator đa dạng — không khóa vào một hãng chip. Inference framework thống nhất và điều phối compute chạy ổn định trong môi trường hiện có hoặc hỗn hợp, với thích ứng và tối ưu 100+ mô hình mainstream.",
    },
    {
      question: "Các chiều quan trọng khi chọn MaaS riêng tư?",
      answer: `Đánh giá năm chiều:

① Linh hoạt kỹ thuật (thư viện mô hình phong phú, onboarding mô hình mới nhanh);
② Độ chính xác lựa chọn (công cụ đánh giá và tối ưu trên dữ liệu riêng);
③ Hiệu năng production (độ trễ suy luận, throughput, co giãn tài nguyên);
④ An toàn và tuân thủ (cô lập đa tenant, audit log, lọc nội dung);
⑤ Dễ dùng và vận hành (giao diện trực quan và lập lịch thống nhất).`,
    },
    {
      question: "Khi nào doanh nghiệp nên xây MaaS riêng tư?",
      answer: `Cân nhắc MaaS riêng tư khi tổ chức gặp bất kỳ tình huống nào sau:

① Nghiệp vụ liên quan dữ liệu nhạy cảm (sản xuất năng lượng, giao dịch tài chính, dữ liệu R&D) với yêu cầu nghiêm ngặt giữ dữ liệu trong mạng nội bộ;
② Cần triển khai AI quy mô lớn tới nhiều endpoint hoặc kịch bản với yêu cầu hiệu năng và ổn định suy luận cực cao;
③ Compute dị dạng đa thương hiệu, đa kiến trúc ở nhiều khu vực hoặc đơn vị cần quản trị thống nhất;
④ Muốn theo kịp AI nhanh nhưng thiếu đội kỹ thuật cho thích ứng và tối ưu mô hình liên tục.`,
    },
  ],
};
