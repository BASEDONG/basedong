import type { NewsStrings } from "../content-types";

const categoryLabels = {
  全部: "Tất cả",
  荣誉奖项: "Giải thưởng",
  企业动态: "Tin công ty",
  模型上新: "Mô hình mới",
  市场活动: "Sự kiện",
  客户案例: "Khách hàng tiêu biểu",
  生态合作: "Hợp tác hệ sinh thái",
  企业AI实践: "Thực tiễn AI doanh nghiệp",
} as const;

const articles = {
  iejarphf9lqgywte36eowzo6: {
    title:
      "Shujia Tech × Suanjia Compute × basedong: Vận hành sức mạnh tính toán chung, xây dựng nhà máy Token",
    excerpt:
      "basedong đã ký hợp tác vận hành sức mạnh tính toán chung với Shujia Tech và Suanjia Compute tại Quý Châu.",
  },
  tteguv6arblns7n7wwu60qy5: {
    title: "basedong lọt vào bảng xếp hạng IDC China AI 50",
    excerpt:
      "Ngày 30/7, IDC công bố bảng IDC China AI 50 2026. basedong được chọn nhờ năng lực công nghệ và triển khai thương mại trong hạ tầng AI.",
  },
  yxn60w9116uqgow8qmj2frsl: {
    title: "Chu Hồng Nghị và Kai-Fu Lee ghé thăm basedong | WAIC",
    excerpt:
      "Từ 17–20/7, Hội nghị Trí tuệ nhân tạo thế giới 2026 diễn ra tại Thượng Hải. basedong gặp gỡ khách tham quan, khách hàng và báo chí tại gian hàng của mình.",
  },
  agd6v0r0omgx1ymzxrj9jagy: {
    title:
      "Yusys Technologies và basedong hợp tác chiến lược thúc đẩy AI tài chính",
    excerpt:
      "Yusys Technologies và basedong ký hợp tác chiến lược, kết hợp kinh nghiệm kịch bản tài chính và hạ tầng AI để cung cấp giải pháp AI toàn diện.",
  },
  ct2w1w4jrodh14vwcw96rxyo: {
    title:
      "Chip nội địa + mô hình nội địa + engine suy luận nội địa: Thực tiễn AI full-stack của tập đoàn hàng không nhà nước",
    excerpt:
      "Triển khai mô hình lớn nội địa trên chip nội địa đặt ra thách thức về hiệu suất sử dụng sức mạnh tính toán, cung cấp Token và duy trì hiệu năng bền vững.",
  },
  bapiztk1gu3cqrwju1okix7g: {
    title:
      "basedong tham gia xây dựng “Jingsuan Token Factory”, củng cố nền tảng sức mạnh tính toán thủ đô",
    excerpt:
      "basedong là đối tác đồng xây cốt lõi của “Jingsuan Token Factory”, góp phần củng cố nền tảng sức mạnh tính toán số của thủ đô.",
  },
  fdedihyzxgbu7yfcerf2q2lu: {
    title:
      "Shandong Mobile và basedong ký hợp tác chiến lược thúc đẩy kinh tế số",
    excerpt:
      "Shandong Mobile và basedong ký thỏa thuận hợp tác về dịch vụ sức mạnh tính toán, đồng bộ nghiệp vụ và xây dựng hệ sinh thái cho Sơn Đông số.",
  },
  jmeqt0sd1q3ciq04g2qd7xfg: {
    title:
      "Guizhou Mobile × basedong: Đồng xây cụm sức mạnh tính toán lớn, thúc đẩy số hóa ngành",
    excerpt:
      "basedong và Guizhou Mobile ký thỏa thuận hợp tác sâu về dịch vụ sức mạnh tính toán thông minh, hướng tới hệ thống dịch vụ hiệu quả và đáng tin cậy.",
  },
  k7r7cjt5fkxyfroe3thsnqtd: {
    title: "basedong ra mắt Meituan LongCat-2.0",
    excerpt:
      "basedong đã ra mắt LongCat-2.0 của Meituan: 1,6T tham số, kích hoạt trung bình ~48B, phạm vi động 33B–56B, ngữ cảnh gốc 1M — mô hình nghìn tỷ tham số đầu tiên huấn luyện và suy luận trên 50.000 thẻ tăng tốc nội địa.",
  },
  wxoo1kd98f2ydxnnyihzv3x9: {
    title:
      "basedong tại AICon: Nền tảng cung cấp Token thúc đẩy Agentic AI quy mô lớn",
    excerpt:
      "Tại AICon 2026 Thượng Hải, basedong trưng bày ma trận sản phẩm nền tảng cung cấp Token đầy đủ và trao đổi sâu với nhà phát triển và doanh nghiệp.",
  },
  fbfvrxlms2fgthtxnzggrg7b: {
    title:
      "basedong lọt Top 20 doanh nghiệp sản phẩm AI xuất sắc “Foresee 2026”",
    excerpt:
      "Ngày 22/1, basedong được vinh danh trong Top 20 nhờ đổi mới liên tục và năng lực thương mại hóa trong hạ tầng AI.",
  },
  knjxu87y68uuvjzeqp5r5uqq: {
    title: "basedong lọt bảng CYZONE 100 Future Unicorns 2025",
    excerpt:
      "Ngày 15/1, basedong được chọn từ hơn 300 doanh nghiệp đăng ký nhờ đổi mới và tiềm năng tăng trưởng trong hạ tầng AI.",
  },
  e7zpqgllgfn1mrfq1yw6lm5s: {
    title: "basedong đoạt giải InfoQ 2025 AI Infrastructure Excellence",
    excerpt: "basedong nhận giải Xuất sắc Hạ tầng AI 2025 của InfoQ.",
  },
  hjliq094e4jvw6scke6f0iwz: {
    title: "MaaS doanh nghiệp basedong — case chuẩn dịch vụ mô hình AIIA",
    excerpt:
      "Nền tảng MaaS doanh nghiệp của basedong là một trong tám case chuẩn dịch vụ mô hình năm, cùng Huawei và Ant Group.",
  },
  dsjglm4diutrngvh2weypzhv: {
    title: "basedong lọt danh sách 50 Smart Companies của MIT Technology Review",
    excerpt:
      "Ngày 12/9 tại EmTech China 2025, basedong cùng Alibaba, Huawei, DeepSeek và các đơn vị khác lọt danh sách hàng năm của MIT Technology Review.",
  },
  wwd368rw8xud0sprc7eu1029: {
    title: "basedong lọt bảng AI MVP TOP 50 2025",
    excerpt:
      "basedong được vinh danh trong AI MVP TOP 50 2025 nhờ thế mạnh công nghệ và đổi mới liên tục.",
  },
  hu6j13i7aokzbp02bty3k6zk: {
    title:
      "basedong được công nhận “Doanh nghiệp chuẩn công nghệ nền tảng số” Bắc Kinh",
    excerpt:
      "basedong được chọn trong Báo cáo đánh giá doanh nghiệp chuẩn kinh tế số Bắc Kinh 2024.",
  },
  qy96pn32h4p6px88wpllfftk: {
    title: "basedong lọt bảng AI Cloud 100 China 2025",
    excerpt:
      "basedong lọt AI Cloud 100 China 2025 của Jingya Capital nhờ hạ tầng cloud GenAI và tăng trưởng thương mại.",
  },
} as const;

export const vi: NewsStrings = {
  pageTitle: "Tin công ty",
  heroLogoAlt: "Tin mới nhất",
  categoryFilterTitle: "Danh mục",
  featuredReadMore: "Xem thêm",
  categoryLabels,
  featured: {
    title: "basedong ra mắt Kimi K2.7 Code phiên bản tốc độ cao",
    excerpt:
      "“Suy nghĩ ít hơn, viết tốt hơn”: vừa nhìn vừa làm — hiểu quy trình từ bản ghi màn hình và hoàn thành phát triển đa tệp trong một lần.",
  },
  articles,
};
