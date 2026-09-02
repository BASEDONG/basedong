import type { TalkStrings } from "../content-types";

const categoryLabels = {
  全部: "Tất cả",
  技术实践: "Thực hành kỹ thuật",
  平台活动: "Sự kiện nền tảng",
  用户故事: "Câu chuyện người dùng",
  用户测评: "Đánh giá người dùng",
} as const;

const tagLabels = {
  技术实践: "Thực hành kỹ thuật",
  平台活动: "Sự kiện nền tảng",
  用户故事: "Câu chuyện người dùng",
  用户测评: "Đánh giá người dùng",
  市场活动: "Sự kiện marketing",
} as const;

const articles = {
  b56thjrf4dfpzg1wynejke5j: {
    title: "OPC Nam Xuyên: Khám phá táo bạo của “siêu cá nhân” | Developer Talk",
    excerpt:
      "Kỷ nguyên AI khiến “siêu cá nhân” thêm sống động; nhiều người thử mô hình OPC (công ty một người)—Nam Xuyên là một trong số đó. Chủ “Handmade Chuan Studio” đã làm hàng chục sản phẩm AI mà không chạy theo trend. basedong trò chuyện về cơ hội, rào cản và niềm vui của công ty một người.",
  },
  qc68kpityh6nwvth6yv1zaei: {
    title: "OpenCode nhanh: 190K sao, agent điều khiển trình duyệt",
    excerpt:
      "Với Claude Code hay Codex, gắn model bên thứ ba thường mệt: router, biến môi trường, chỉnh tham số.\nOpenCode làm sẵn: chọn nhà cung cấp (gồm basedong), nhập Key là xong.",
  },
  e3okr78ulcbd36ggdxswgbpy: {
    title: "Codex nhanh: 5 triệu+ WAU, chạy 100+ model",
    excerpt:
      "OpenAI công bố ở GPT-5.6: app Codex desktop gộp vào ChatGPT mới nhưng giữ thương hiệu, CLI, IDE và cloud; cùng ngày ra Codex CLI 0.144.1.",
  },
  crkywf0secr2axnazev9ay0f: {
    title: "31K sao: thuê “người” thay vì nuôi “tôm”—OpenHuman",
    excerpt:
      "Sau cơn sốt “tôm” là trợ lý cá nhân OpenHuman. Cách cấu hình API basedong trong OpenHuman.",
  },
  rtlosvhg5hy6p112rlrigoo7: {
    title: "basedong MaaS: quà tri ân 2 năm",
    excerpt:
      "Nạp tiền nhận voucher tới 1.000 ¥ nhân kỷ niệm 2 năm basedong MaaS. Cảm ơn bạn đã đồng hành!",
  },
  hiwf5yfr6b790jmog9a6xlsb: {
    title: "Harness Engineering và mài Skills | Developer Talk",
    excerpt:
      "Developer Talk gặp Jigege, cựu PM nay là nhà phát triển AI, chia sẻ dự án Book2Skills và hành trình Harness Engineering rõ ràng hơn.",
  },
  ecqutah37y0fsgn53j7gfus4: {
    title: "BYOK: 100+ công cụ AI, 100+ model trực tiếp",
    excerpt:
      "Gần một trăm app và công cụ đã tích hợp basedong qua BYOK. Lấy API Key và gắn model phù hợp vào công cụ quen dùng.",
  },
  edmojkiwvenrby4mzq5kizl9: {
    title: "Từ học viện mỹ thuật tới nuôi “tôm”: 25 năm ghi chép | Developer Talk",
    excerpt:
      "Nghiêm Ba đi từ mỹ thuật tới thực hành AI trong 25 năm. AI là bộ khuếch đại năng lực; giá trị nằm ở người dùng.",
  },
  zc516s5lixvrjuvo6soc81mz: {
    title: "4 giờ mỗi ngày nuôi đội “tôm hùm” | Developer Talk",
    excerpt:
      "Peng Chao, CTO OneOneTalk, dành 4 giờ/ngày cho đội AI 1+6 “tôm” để code, thu tin và viết WeChat—câu chuyện thực hành AI.",
  },
  jt2by9g3v7aa6dgjotmrcfoh: {
    title: "Không chỉ nuôi “tôm hùm”—WeChat đã chạy Claude Code",
    excerpt:
      "WeChat ClawBot đơn giản hóa OpenClaw và nối mọi agent bạn muốn. Gắn Claude Code vào ClawBot gần như dễ như hai “tôm hùm” bắt chuyện.",
  },
  pkivkufhheggmeskcfhh8kh9: {
    title: "Meetup “tôm hùm”: buổi gặp đầu tiên",
    excerpt:
      "Đã cài OpenClaw—nuôi thế nào và làm gì? 21/3, 14:00–16:30, Công viên Khoa học Thanh Hoa, Bắc Kinh—buổi gặp “người nuôi tôm”.",
  },
  wd6etweavt2nfbydjsx1a6z8: {
    title: "Ghi chú nuôi tôm: nâng app thành OpenClaw add-on | Developer Talk",
    excerpt:
      "WiseFlow, đối tác basedong, tiến hóa từ 2024. Triệu Trách Minh kể các quyết định kiến trúc sau OpenClaw.",
  },
  a58mvaz20e3bw6qhx8joewaw: {
    title: "Nuôi “tôm hùm”: hướng dẫn OpenClaw từng bước",
    excerpt:
      "Hướng dẫn cài OpenClaw chi tiết cho Windows (kèm Mac). Quyền runtime rộng—nên chạy trong môi trường cách ly.",
  },
  wzj6xzbdvzsytjnqno7fxyp1: {
    title: "1 tỷ token/ngày: bốn bài học từ người làm thật | Developer Talk",
    excerpt:
      "Cowork, OpenClaw và agent khác đốt token nhiều. Từ Khắc Khiêm (~1 tỷ/ngày) chia sẻ bốn kinh nghiệm.",
  },
  wln8c6grxkh11brde838wfxd: {
    title: "Từ cloud native tới AI | Developer Talk",
    excerpt:
      "Haili, LangChain Ambassador, chia ba chiến lược thực tế để chuyển kinh nghiệm sang AI giữa làn sóng công nghệ.",
  },
  o8zq301umaf89v5bcxyltbav: {
    title: "basedong × Next AI Draw.io: 20K sao, biểu đồ từ một câu",
    excerpt:
      "Next AI Draw.io tạo sơ đồ tự nhiên như hội thoại; tích hợp basedong tăng sức mạnh model.",
  },
  od7wj9rr23p95uhihmhrombp: {
    title: "Chương trình “Đại sứ giới thiệu” basedong",
    excerpt:
      "Nâng cấp “mời bạn nhận thưởng” thành Đại sứ: mời bạn và nhận voucher dùng toàn nền tảng.",
  },
  zx3caanoshbvxbudsq5x1nbz: {
    title: "Đánh giá người dùng | DeepSeek-OCR—bạn đã thử?",
    excerpt:
      "Lập trình viên senior thử DeepSeek-OCR với bản vẽ CAD công nghiệp.",
  },
  nddw0hghm23vbkfcz4y99glc: {
    title: "Câu chuyện | Easy: sách AI cho con gái",
    excerpt:
      "basedong ghi lại câu chuyện thật của người xây AI để tri thức và kinh nghiệm lan tỏa.",
  },
  evdjqa744e2bim1wwcrzwix2: {
    title: "Gemini-CLI chạy DeepSeek qua basedong",
    excerpt:
      "Nhánh DeepSeek trên Gemini-CLI mã nguồn mở với API basedong—lựa chọn CLI thay thế hiệu quả.",
  },
  swbnccchf5esxedxq01s4vr5: {
    title: "[Đã kết thúc] Kỷ niệm 1 năm basedong: hai ưu đãi",
    excerpt:
      "Nhân kỷ niệm 1 năm basedong, mở hai chương trình tri ân cộng đồng.",
  },
} as const;

export const vi: TalkStrings = {
  pageTitle: "Developer Talk",
  heroLogoAlt: "Developer Talk",
  pageSubtitle: "Thực hành và insight thật từ cộng đồng developer",
  shareCtaLabel: "Chia sẻ thực hành của bạn",
  submitCtaTitle: "Gửi bài để nhiều người dùng thấy hành trình của bạn",
  submitCtaLabel: "Gửi ngay",
  featuredReadMore: "Xem thêm",
  categoryLabels,
  tagLabels,
  articles,
};
