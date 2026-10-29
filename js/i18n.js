/**
 * @fileoverview Internationalization (i18n) Engine for Nguyen Van An Portfolio & Academic Hub.
 * Manages dual-language state (EN/VI) with persistence, DOM attribute synchronization,
 * document title localization, and safe markup rendering.
 */

'use strict';

/**
 * Storage configuration constants
 */
const I18N_CONFIG = Object.freeze({
  STORAGE_KEY: 'adley_lang',
  DEFAULT_LANG: 'en',
  SUPPORTED_LANGUAGES: Object.freeze(['vi', 'en'])
});

/**
 * Keys that intentionally contain safe inline HTML formatting (<strong>, <em>, <span>)
 */
const HTML_ALLOWLIST_KEYS = new Set([
  'hero_desc',
  'about_story_p1',
  'about_story_p2',
  'about_story_p3',
  'res_topic1_method_1',
  'res_topic1_method_2',
  'res_topic1_method_3',
  'res_pivot_note'
]);

/**
 * Unified Internationalization Dictionary (Complete Parity between VI and EN)
 */
const i18nTranslations = Object.freeze({
  vi: Object.freeze({
    // Page Titles & Skip Link
    page_title_home: 'Nguyễn Văn An | AI Vị Nhân Sinh & Kỹ Nghệ Hệ Thống Ứng Dụng',
    page_title_research: 'Nghiên Cứu Khoa Học & Định Hướng Thạc Sĩ | Nguyễn Văn An',
    page_title_projects: 'Dự Án Công Nghệ & Nghiên Cứu Hệ Thống | Nguyễn Văn An',
    page_title_contact: 'Liên Hệ Học Thuật & Hồ Sơ CV | Nguyễn Văn An',
    skip_to_main: 'Chuyển đến nội dung chính',

    // Navigation
    nav_about: 'Về Tôi',
    nav_research: 'Nghiên Cứu',
    nav_projects: 'Dự Án',
    nav_contact: 'Liên Hệ',
    btn_resume: 'Hồ Sơ (CV)',
    btn_contact: 'Liên Hệ',

    // Hero Section
    hero_badge: 'ĐỔI MỚI SÁNG TẠO & AI VỊ NHÂN SINH',
    hero_title_1: 'Công Nghệ Giúp Cuộc Sống',
    hero_title_2: 'Dễ Dàng, Thoải Mái & Tiện Lợi Hơn',
    hero_desc: 'Kế thừa lợi thế từ <strong class="text-[#111827] dark:text-white font-semibold">3 học kỳ Hospitality tại HUIT (2024–2025)</strong> về tư duy thấu cảm người dùng và tối ưu hóa điểm chạm dịch vụ, kết hợp cùng nền tảng <strong class="text-[#111827] dark:text-white font-semibold">CNTT Năm 1 tại Đại học Lạc Hồng (LHU)</strong>, tôi theo đuổi con đường <strong class="text-[#111827] dark:text-white font-semibold">nghiên cứu khoa học và kỹ nghệ ứng dụng</strong>. Tôi hướng tới bậc học <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">Thạc sĩ Nghiên cứu AI Quốc tế</span> và mục tiêu sự nghiệp trở thành <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">Kỹ sư Ứng dụng AI</span> kiến tạo các giải pháp lấy con người làm trọng tâm.',
    stat_projects: '3 Kỳ Hospitality @ HUIT (2024–2025)',
    stat_certs: 'CNTT Năm 1 @ LHU • Nền Tảng Khoa Học Máy Tính',
    stat_grade: 'Lộ Trình Học Bổng Thạc Sĩ AI Quốc Tế',

    // Author Spotlight
    author_name: 'Nguyễn Văn An',
    author_role: 'Định Hướng Kỹ Sư Ứng Dụng AI',
    author_subtitle: 'HUIT Hospitality (2024–2025) → LHU CNTT Năm 1',
    author_collab: 'Sẵn Sàng Hợp Tác Lab & Dự Án',

    // Trụ cột 01: Về tôi & chí hướng
    about_badge: 'TRỤ CỘT 01 · VỀ TÔI & CHÍ HƯỚNG HỌC THUẬT',
    about_title: 'Từ Tư Duy Phục Vụ Đến Nghiên Cứu AI Vị Nhân Sinh',
    about_sub: 'Hành trình chuyển ngành có chủ đích từ 3 học kỳ Hospitality tại HUIT sang Công nghệ Thông tin tại LHU, rèn luyện kỷ luật nghiên cứu khoa học và chuẩn bị cho lộ trình Thạc sĩ AI.',
    about_story_heading: 'Câu Chuyện & Bước Ngoặt Chuyển Ngành',
    about_story_p1: 'Tôi bắt đầu hành trình đại học với <strong>3 học kỳ ngành Hospitality (Quản trị Nhà hàng - Khách sạn) tại HUIT (2024 – 2025)</strong>. Khoảng thời gian này đã tôi luyện cho tôi một nguyên tắc cốt lõi: luôn thấu hiểu sâu sắc tâm lý người dùng, trân trọng từng điểm chạm dịch vụ và đặt sự thoải mái, an tâm của con người lên hàng đầu.',
    about_story_p2: 'Trong thời gian tại HUIT, khi tham gia giai đoạn đầu của một đề tài NCKH cấp khoa — trực tiếp tìm kiếm các bài báo khoa học quốc tế, đọc tóm tắt và hệ thống hóa tài liệu vào bảng Excel bằng sự hỗ trợ của công cụ AI — tôi nhận ra khát vọng lớn nhất của mình là được <strong>trực tiếp nghiên cứu và xây dựng các hệ thống công nghệ thông minh</strong>. Tôi quyết định thực hiện bước ngoặt chuyển trường, chuyển ngành sang <strong>Công nghệ Thông tin (IT) tại Đại học Lạc Hồng (LHU)</strong> (hiện là sinh viên năm nhất) để theo đuổi trọn vẹn con đường kỹ thuật.',
    about_story_p3: 'Bên cạnh việc xây dựng nền tảng Toán rời rạc, Giải thuật và Lập trình tại LHU, kinh nghiệm từng dẫn dắt <strong>4–5 sự kiện cộng đồng & văn hóa</strong> (từ thiện, Trung thu, Ký ức làng tranh Đông Hồ, minigame show) cùng nền tảng ngoại ngữ đang phát triển giúp tôi tự tin kết nối, thuyết trình và chuyển hóa các bài toán kỹ thuật phức tạp thành trải nghiệm gần gũi với con người.',

    // Academic Quick-Facts Matrix (Replaces duplicate avatar card)
    about_facts_heading: 'HỒ SƠ ĐỊNH DANH HỌC THUẬT TÓM TẮT',
    about_fact1_label: 'Đơn Vị Đào Tạo Hiện Tại',
    about_fact1_val: 'Khoa CNTT, Đại học Lạc Hồng (LHU) — Sinh viên Năm 1 (2025–Nay)',
    about_fact2_label: 'Nền Tảng Liên Ngành',
    about_fact2_val: '3 Học kỳ Quản trị Khách sạn (Hospitality) @ HUIT (2024–2025)',
    about_fact3_label: 'Hướng Nghiên Cứu Trọng Tâm',
    about_fact3_val: 'Human-Centric AI, On-Device Computer Vision, Prompt & RAG Systems',
    about_fact4_label: 'Lộ Trình Ngoại Ngữ Học Thuật',
    about_fact4_val: 'IELTS 5.5 (Hiện tại) → Mục tiêu IELTS 7.0+ (Chuẩn đầu vào Thạc sĩ Quốc tế)',

    // Timeline
    about_timeline_heading: 'Dòng Thời Gian & Mốc Phát Triển Học Thuật',
    about_tl1_year: '2024 — 2025',
    about_tl1_tag: 'HOSPITALITY @ HUIT',
    about_tl1_title: '3 Học Kỳ Quản Trị Khách Sạn & Tư Duy Dịch Vụ',
    about_tl1_desc: 'Tích lũy nền tảng thấu cảm người dùng, dịch vụ tận tâm và dẫn dắt 4–5 sự kiện MC cộng đồng (Từ thiện, Trung thu, Làng tranh Đông Hồ, Minigame show).',
    about_tl2_year: 'GIAI ĐOẠN 1 NCKH @ HUIT',
    about_tl2_tag: 'LITERATURE CATALOGING',
    about_tl2_title: 'Tham Gia Rà Soát Tài Liệu Đề Tài Du Lịch Mùa Đông Đà Nẵng',
    about_tl2_desc: 'Tìm kiếm bài báo khoa học liên quan qua Google Scholar & Perplexity AI, đọc Abstract và lập danh mục tổng hợp trên Excel trước khi quyết định rẽ hướng sang CNTT.',
    about_tl3_year: '2025 — HIỆN TẠI',
    about_tl3_tag: 'CNTT @ LHU • ACTIVE',
    about_tl3_title: 'Chuyển Ngành Sang CNTT (Năm 1) tại Đại Học Lạc Hồng',
    about_tl3_desc: 'Tập trung rèn luyện cấu trúc dữ liệu, giải thuật, toán rời rạc và phát triển dự án AI Computer Vision thực tế (Smart Gesture Slide Controller).',
    about_tl4_year: 'MỤC TIÊU TIẾP THEO',
    about_tl4_tag: 'HỌC BỔNG QUỐC TẾ',
    about_tl4_title: 'Học Bổng & Chương Trình Thạc Sĩ Quốc Tế (AI Vị Nhân Sinh)',
    about_tl4_desc: 'Nâng cấp năng lực nghiên cứu học thuật, xuất bản khoa học và ngoại ngữ (IELTS 7.0+) để ứng tuyển học bổng cao học quốc tế ngành AI ứng dụng.',
    about_tl5_year: 'ĐÍCH ĐẾN DÀI HẠN',
    about_tl5_tag: 'CAREER NORTH STAR',
    about_tl5_title: 'Kỹ Sư Ứng Dụng AI (AI Application Engineer)',
    about_tl5_desc: 'Nghiên cứu và kiến tạo các giải pháp AI hữu ích, lấy con người làm trọng tâm để tạo ra giá trị thiết thực và nâng tầm cuộc sống hàng ngày.',

    // 4 Trụ cột năng lực
    about_skills_heading: '4 Giá Trị Kế Thừa Định Hình Năng Lực',
    about_str1_title: 'Tư Duy Dịch Vụ Vị Nhân Sinh',
    about_str1_desc: '3 học kỳ tại HUIT dạy tôi xem mỗi khó khăn của người dùng hay lỗi phần mềm là một điểm chạm dịch vụ. Đặt sự tiện lợi và an tâm của con người lên trên sự phức tạp kỹ thuật.',
    about_str2_title: 'Kinh Nghiệm MC & Truyền Đạt Kỹ Thuật',
    about_str2_desc: 'Từng dẫn 4–5 sự kiện vừa và nhỏ giúp tôi rèn luyện bản lĩnh sân khấu, tư duy cấu trúc mạch lạc và khả năng trình bày các giải pháp công nghệ một cách thuyết phục.',
    about_str3_title: 'Kỹ Năng Tra Cứu & Hệ Thống Hóa Tài Liệu',
    about_str3_desc: 'Thực hành truy vấn Google Scholar & công cụ AI để tìm bài báo liên quan, đọc hiểu Abstract và chuẩn hóa thành bảng tổng hợp dữ liệu nghiên cứu trên Excel.',
    about_str4_title: 'Ngoại Ngữ Học Thuật & Lộ Trình Cao Học',
    about_str4_desc: 'Sở hữu nền tảng IELTS 5.5 giúp đọc hiểu tài liệu kỹ thuật và bài báo quốc tế; đang trong lộ trình rèn luyện hướng tới mốc IELTS 7.0+ cho hồ sơ học bổng Thạc sĩ.',

    // Tuyên ngôn sứ mệnh
    about_manifesto_title: 'TUYÊN NGÔN SỨ MỆNH & CHÍ HƯỚNG',
    about_manifesto_quote: '"Nghiên cứu khoa học không phải là tìm kiếm những điều xa rời thực tế, mà là đổi mới sáng tạo để mang công nghệ vào đời sống, giúp con người có một cuộc sống tiện lợi hơn, dễ dàng hơn và thoải mái hơn."',
    about_manifesto_author: 'Nguyễn Văn An — Cựu Sinh Viên Hospitality HUIT (2024–2025) • Sinh Viên CNTT Năm 1 LHU',

    // Academic Portals
    home_explore_heading: 'Khám Phá Các Chuyên Mục Học Thuật',
    home_explore_sub: 'Tìm hiểu sâu hơn về hoạt động rà soát tài liệu nghiên cứu, dự án kỹ thuật và hồ sơ học thuật',
    home_card_res_title: 'Nghiên Cứu Khoa Học & Lộ Trình Thạc Sĩ',
    home_card_res_desc: 'Giai đoạn 1 rà soát tài liệu & lập danh mục Excel cho đề tài NCKH Đà Nẵng tại HUIT, cùng định hướng nghiên cứu Thạc sĩ về AI vị nhân sinh.',
    home_card_res_btn: 'Đến Trang Nghiên Cứu →',
    home_card_proj_title: 'Dự Án Công Nghệ & Kỹ Nghệ Hệ Thống',
    home_card_proj_desc: 'Smart Gesture Slide Controller (On-Device MediaPipe Hands + FSM 3 lớp), kiến trúc web Swiss Minimalist và quy trình tổng hợp tài liệu.',
    home_card_proj_btn: 'Khám Phá Dự Án →',
    home_card_contact_title: 'Liên Hệ, Mời MC & Xem Academic CV',
    home_card_contact_desc: 'Mở kết nối tham gia phòng lab nghiên cứu, trao đổi học thuật, xem/in trực tiếp Academic CV (PDF) và thông tin mời MC sự kiện.',
    home_card_contact_btn: 'Liên Hệ & Xem CV →',

    // Research Page
    res_badge: '02 · NGHIÊN CỨU KHOA HỌC & ĐỊNH HƯỚNG THẠC SĨ QUỐC TẾ',
    res_title: 'Nghiên Cứu Khoa Học & AI Vị Nhân Sinh',
    res_sub: 'Minh bạch trong từng bước khởi đầu nghiên cứu học thuật — đưa công nghệ và trí tuệ nhân tạo vào phục vụ đời sống thực tiễn lấy con người làm trọng tâm.',
    res_topic1_badge: 'ĐÓNG GÓP GIAI ĐOẠN 1 · RÀ SOÁT & LẬP DANH MỤC TÀI LIỆU (HUIT 2024–2025)',
    res_topic1_status: 'STAGE 1 LITERATURE LOG · TRƯỚC KHI CHUYỂN NGÀNH SANG LHU',
    res_topic1_title: 'Đề Tài NCKH Cấp Khoa: Hành Vi Tiêu Dùng Du Lịch Vào Mùa Đông Tại TP Đà Nẵng',
    res_topic1_role: 'Vai trò thực tế: Tìm kiếm bài báo khoa học liên quan (Google Scholar & Perplexity AI), đọc tóm tắt và hệ thống hóa danh mục tài liệu vào file Excel',
    res_topic1_desc: 'Trong thời gian học ngành Hospitality tại HUIT, tôi tham gia vào giai đoạn khởi đầu của đề tài NCKH cấp khoa do giảng viên hướng dẫn. Nhiệm vụ của tôi là rà soát nguồn tài liệu học thuật liên quan đến tính mùa vụ và tâm lý du khách mùa đông, đọc hiểu phần Tóm tắt (Abstract) và tổng hợp có cấu trúc vào bảng tính Excel để làm cơ sở lý thuyết ban đầu cho nhóm nghiên cứu.',
    res_topic1_method_heading: 'Quy Trình Thực Hiện Rà Soát Tài Liệu & Hệ Thống Hóa Trên Excel',
    res_topic1_method_1: '<strong>1. Truy vấn & Thu thập Bài báo Liên quan:</strong> Sử dụng kết hợp từ khóa học thuật trên Google Scholar và Perplexity AI để tìm kiếm các nghiên cứu, báo cáo liên quan đến hành vi tiêu dùng du lịch theo mùa và các yếu tố thời tiết ảnh hưởng đến quyết định điểm đến.',
    res_topic1_method_2: '<strong>2. Sàng lọc qua Đọc hiểu Abstract:</strong> Đọc lướt có chọn lọc phần Abstract và Kết luận của từng bài báo để kiểm tra mức độ phù hợp với bối cảnh du lịch mùa đông tại Đà Nẵng trước khi đưa vào danh sách lưu trữ.',
    res_topic1_method_3: '<strong>3. Lập Danh Mục Quản Lý Tài Liệu Trên Excel:</strong> Tổng hợp toàn bộ các bài báo tìm được vào file Excel theo các cột chuẩn hóa (Tên công trình, Tác giả/Năm, Nguồn trích dẫn, Tóm tắt nội dung liên quan, Ghi chú ứng dụng) để bàn giao cho nhóm trước khi chuyển trường.',
    res_excel_heading: 'Cấu Trúc Bảng Excel Tổng Hợp Tài Liệu Thực Tế (Literature Cataloging Log)',
    res_excel_sub: 'Minh họa cấu trúc bảng dữ liệu Excel đã sử dụng để liệt kê và phân loại các nghiên cứu liên quan trong Giai đoạn 1',
    res_excel_col1: 'Mã / Năm',
    res_excel_col2: 'Chủ Đề & Nhóm Bài Báo Liên Quan',
    res_excel_col3: 'Nguồn Truy Xuất',
    res_excel_col4: 'Nội Dung Trích Lục Từ Abstract',
    res_excel_col5: 'Phục Vụ Đề Tài Đà Nẵng',
    res_excel_r1_c2: 'Ảnh hưởng của tính mùa vụ (Seasonality) & thời tiết đến quyết định du lịch biển',
    res_excel_r1_c4: 'Phân tích rào cản tâm lý của du khách khi đi du lịch biển vào mùa thấp điểm/mùa đông.',
    res_excel_r1_c5: 'Xác định nhóm biến số rào cản thời tiết & kỳ vọng trải nghiệm thay thế.',
    res_excel_r2_c2: 'Động cơ đẩy - kéo (Push & Pull Motivations) trong hành vi chi tiêu du lịch đô thị',
    res_excel_r2_c4: 'Các yếu tố văn hóa, ẩm thực, sự kiện lễ hội và mức giá kích cầu thu hút khách mùa đông.',
    res_excel_r2_c5: 'Làm cơ sở liệt kê các yếu tố thu hút tại TP Đà Nẵng dịp cuối năm.',
    res_excel_r3_c2: 'Nhận thức giá trị (Perceived Value) và ý định quay lại điểm đến (Revisit Intention)',
    res_excel_r3_c4: 'Mối liên hệ giữa chất lượng dịch vụ lưu trú, trải nghiệm trong nhà và mức độ hài lòng.',
    res_excel_r3_c5: 'Gợi ý hướng khảo sát dịch vụ khách sạn/nghỉ dưỡng mùa đông.',
    res_pivot_note: '<strong>Bước ngoặt học thuật (Academic Pivot):</strong> Khi đề tài đang ở giai đoạn hoàn thiện bước tổng hợp tài liệu trên Excel này, chính trải nghiệm ứng dụng công cụ AI vào tìm kiếm và xử lý tri thức khoa học đã thôi thúc tôi đưa ra quyết định quan trọng: <strong>chuyển ngành, chuyển trường từ Hospitality tại HUIT về học Công nghệ Thông tin (IT) tại Đại học Lạc Hồng (LHU)</strong> để trực tiếp dấn thân vào con đường lập trình và nghiên cứu AI.',

    res_topic2_badge: 'ĐỊNH HƯỚNG BẬC THẠC SĨ QUỐC TẾ',
    res_topic2_title: 'AI Vị Nhân Sinh: Nâng Tầm Trải Nghiệm Cuộc Sống Thực Tiễn',
    res_topic2_desc: 'Hướng tới mục tiêu tìm kiếm học bổng và chương trình Thạc sĩ quốc tế ngành Khoa học Máy tính / Trí tuệ Nhân tạo. Kết hợp sự nhạy bén về tâm lý người dùng từ ngành Hospitality với kỹ nghệ AI hiện đại để tạo ra những giải pháp công nghệ giúp cuộc sống tiện lợi, dễ dàng và thoải mái hơn.',
    res_tech_badge: 'TRỌNG TÂM KỸ NGHỆ NGHIÊN CỨU',
    res_tech_title: 'Kỹ Nghệ Ứng Dụng AI • Kỹ Nghệ Prompt, Hệ Thống RAG & Tương Tác Không Chạm',
    res_tech_desc: 'Tập trung đào sâu vào Kỹ nghệ Prompt nâng cao (Advanced Prompt Engineering), kiến trúc Truy xuất Tăng cường Ngữ nghĩa (RAG) chống ảo giác, và Thị giác Máy tính trên thiết bị (On-Device Computer Vision) giảm thiểu độ trễ và bảo vệ quyền riêng tư.',
    res_pillar1_title: 'Nhà Thông Minh & IoT Đời Sống',
    res_pillar1_desc: 'Tự động hóa không gian sống thích ứng linh hoạt với thói quen sinh hoạt thường nhật, tối ưu hóa sự thoải mái và tiện nghi gia đình.',
    res_pillar2_title: 'Trợ Lý Ảo Cá Nhân & Tổng Hợp Tri Thức (RAG)',
    res_pillar2_desc: 'Xây dựng các tác tử AI hỗ trợ tra cứu tài liệu học thuật, lập lịch trình và giải quyết tác vụ hàng ngày với nguồn trích dẫn minh bạch.',
    res_pillar3_title: 'Gợi Ý Thấu Hiểu Tâm Lý (Tư Duy Hospitality)',
    res_pillar3_desc: 'Kế thừa tư duy chăm sóc khách hàng từ 3 học kỳ HUIT để phát triển hệ thống gợi ý tinh tế, thấu hiểu đúng ngữ cảnh và cảm xúc người dùng.',
    res_pillar4_title: 'Công Nghệ Trợ Năng Cho Người Cao Tuổi & Y Tế',
    res_pillar4_desc: 'Ứng dụng giao diện cử chỉ không chạm và trợ lý giọng nói đơn giản hóa tối đa thao tác cho người cao tuổi hoặc người cần hỗ trợ đặc biệt.',
    res_notes_heading: 'Phương Pháp Luận Rèn Luyện Tư Duy Nghiên Cứu Khoa Học',
    res_notes_sub: 'Xây dựng thói quen làm việc khoa học bài bản ngay từ năm nhất đại học ngành CNTT',
    res_read1_title: 'Khai Thác Công Cụ Số Có Kiểm Chứng',
    res_read1_meta: 'Google Scholar & Perplexity AI · Kiểm chứng chéo nguồn gốc',
    res_read1_desc: 'Sử dụng AI để tăng tốc độ định vị từ khóa chuyên ngành, sau đó luôn truy ngược về bài báo gốc trên Google Scholar để đọc và kiểm chứng độ tin cậy.',
    res_read2_title: 'Kỷ Luật Hệ Thống Hóa Dữ Liệu (Excel Log)',
    res_read2_meta: 'Literature Cataloging · Quản lý tri thức có cấu trúc',
    res_read2_desc: 'Thói quen ghi chép và phân loại tài liệu đọc được vào bảng tính Excel theo từng nhóm vấn đề, giúp dễ dàng tra cứu lại và phát hiện khoảng trống kiến thức.',
    res_read3_title: 'Tiêu Chí Lựa Chọn: Công Nghệ Giải Quyết Bài Toán Thật',
    res_read3_meta: 'Human-Centric Focus · Giảm tải nhận thức người dùng',
    res_read3_desc: 'Ưu tiên nghiên cứu các thuật toán và kiến trúc phần mềm gọn nhẹ (chạy trực tiếp trên trình duyệt/thiết bị cá nhân) mà bất kỳ ai cũng có thể tiếp cận mà không cần phần cứng đắt tiền.',
    res_collab_heading: 'Sẵn Sàng Tham Gia Hỗ Trợ Phòng Lab & Tìm Kiếm Thầy/Cô Hướng Dẫn',
    res_collab_desc: 'Là một sinh viên CNTT năm nhất cầu thị và kỷ luật, tôi luôn sẵn sàng tham gia hỗ trợ các công việc tra cứu tài liệu, lập danh mục dữ liệu, viết mã thực nghiệm tại phòng lab nghiên cứu và lắng nghe định hướng từ các Giáo sư/Tiến sĩ.',
    res_collab_btn: 'Kết Nối Trao Đổi Học Thuật →',

    // Projects Page
    proj_page_badge: '03 · DỰ ÁN CÔNG NGHỆ & KỸ NGHỆ HỆ THỐNG',
    proj_page_title: 'Dự Án Công Nghệ & Kỹ Nghệ Ứng Dụng',
    proj_page_sub: 'Mỗi dự án được trình bày minh bạch theo cấu trúc kỹ thuật: Bài toán thực tế (Problem) → Phương pháp & Kiến trúc (Methodology) → Thông số đạt được (Metrics).',
    featured_heading: 'Danh Mục Dự Án & Thực Nghiệm',
    featured_sub: 'Lọc theo mảng kỹ thuật để xem chi tiết bài toán, kiến trúc và mã nguồn',
    filter_all: 'Tất Cả (04)',
    filter_ai: 'AI & Computer Vision',
    filter_research: 'Rà Soát Học Thuật',
    filter_web: 'Kiến Trúc Web',
    view_all_projects: 'Xem GitHub @Andrew12126',

    proj_label_problem: 'Bài toán:',
    proj_label_method: 'Kiến trúc:',
    proj_label_metric: 'Thông số:',

    proj1_title: 'Smart Gesture Slide Controller',
    proj1_prob: 'Diễn giả bị phụ thuộc vào bút bấm vật lý hoặc phải đứng cố định gần máy tính khi thuyết trình.',
    proj1_meth: 'MediaPipe Hands (21 khớp 3D) + Phân loại khoảng cách Euclid + Máy trạng thái (FSM) 3 lớp chống bấm nhầm.',
    proj1_metr: '30–60 FPS On-Device • Độ trễ < 25ms • 100% Client-side Privacy',
    proj1_btn_demo: 'Live Demo ↗',
    proj1_btn_case: 'Đọc Case Study ↓',

    proj2_title: 'Swiss Minimalist Academic Portfolio Hub',
    proj2_prob: 'Xây dựng cổng thông tin học thuật song ngữ tốc độ cao, chuẩn truy cập WCAG 2.2 AA và không phụ thuộc runtime nặng.',
    proj2_meth: 'Kiến trúc Multi-Page HTML5 tĩnh, Precompiled Tailwind CSS (37KB), Mô-đun JS SOLID & Bảng in CV PDF tích hợp.',
    proj2_metr: 'Zero-FOUC i18n (EN/VI) • Tương thích WCAG 2.2 AA • Hỗ trợ Print-to-PDF',
    proj2_btn_repo: 'Mã Nguồn GitHub ↗',
    proj2_btn_cv: 'Xem Bản In CV →',

    proj3_title: 'Hệ Thống Hóa Tài Liệu: Du Lịch Mùa Đông Đà Nẵng',
    proj3_prob: 'Cần rà soát và phân loại nhanh các nghiên cứu tiền nhiệm về tâm lý tiêu dùng du lịch mùa thấp điểm cho đề tài cấp Khoa.',
    proj3_meth: 'Truy vấn học thuật qua Google Scholar & Perplexity AI, trích lục Abstract và chuẩn hóa vào bảng Excel phân loại.',
    proj3_metr: 'Đóng góp Giai đoạn 1 @ HUIT • Bảng danh mục Excel có cấu trúc',
    proj3_btn_detail: 'Xem Quy Trình & Bảng Excel →',

    proj4_title: 'RFC Blueprint: Hệ Thống RAG Trợ Lý Học Thuật & Trợ Năng',
    proj4_prob: 'Người dùng phổ thông và sinh viên gặp hiện tượng ảo giác (hallucination) khi tra cứu tài liệu chuyên sâu bằng LLM thuần túy.',
    proj4_meth: 'Thiết kế kiến trúc Retrieval-Augmented Generation (RAG) kết hợp Semantic Chunking và trích dẫn nguồn đối chứng.',
    proj4_metr: 'Bản thiết kế định hướng nghiên cứu tại LHU & chuẩn bị đề tài Thạc sĩ',
    proj4_btn_roadmap: 'Xem Định Hướng Nghiên Cứu →',

    cs_level_badge: 'BẢN ĐẶC TẢ KIẾN TRÚC & PRODUCTION DEMO',
    cs_title: 'Smart Gesture Slide Controller (Điều Khiển Slide Bằng Cử Chỉ Tay AI)',
    cs_tagline: 'Kiến trúc Computer Vision On-Device thực tiễn: Ứng dụng MediaPipe Hands nhận diện 21 khớp xương 3D thời gian thực, tích hợp Động cơ Chống Bấm Nhầm (Anti-False-Positive) 3 lớp giúp diễn giả tự do làm chủ sân khấu mà không cần thiết bị phần cứng.',
    cs_pipeline_heading: 'SƠ ĐỒ LUỒNG XỬ LÝ KIẾN TRÚC 4 GIAI ĐOẠN (END-TO-END PIPELINE)',
    cs_pipe1_step: 'STAGE 01 · INGESTION',
    cs_pipe1_title: 'Webcam HTML5 Stream',
    cs_pipe1_desc: 'Thu khung hình 60FPS, lật gương Canvas HUD tại trình duyệt',
    cs_pipe2_step: 'STAGE 02 · EXTRACTION',
    cs_pipe2_title: 'MediaPipe 21-Joint 3D',
    cs_pipe2_desc: 'Trích xuất tọa độ không gian (X, Y, Z) của 21 khớp bàn tay',
    cs_pipe3_step: 'STAGE 03 · GEOMETRY',
    cs_pipe3_title: 'Khoảng Cách Euclid',
    cs_pipe3_desc: 'So sánh khoảng cách đầu ngón (Tip) & khớp đốt (PIP/MCP)',
    cs_pipe4_step: 'STAGE 04 · DEBOUNCER',
    cs_pipe4_title: 'FSM 3 Lớp Chống Nhầm',
    cs_pipe4_desc: 'Master Lock 1.0s → Dwell 800ms → Cooldown 1.2s',

    cs_achievements_heading: 'MỤC TIÊU & ĐỘT PHÁ KIẾN TRÚC CỐT LÕI',
    cs_achieve_1: 'Xử lý On-Device siêu tốc (30–60 FPS): Nhận diện 21 khớp tay 3D trực tiếp trên trình duyệt bằng Webcam qua MediaPipe Hands, không gửi video lên Cloud, bảo mật 100% và phản hồi tức thì dưới 25ms.',
    cs_achieve_2: 'Cơ chế Chống Bấm Nhầm (Anti-False-Positive Engine) 3 Lớp: Giải quyết triệt để vấn đề nhảy slide khi vung tay tự nhiên nhờ Master Lock (xòe 5 ngón 1.0s), Hold-to-Trigger (giữ 800ms với vòng tiến trình SVG) và Cooldown Buffer (1.2s chống nhảy liên hoàn).',
    cs_achieve_3: 'Trải nghiệm thuyết trình không chạm tự do: Hỗ trợ Con Trỏ Laser Ảo phát sáng (chụm ngón cái & trỏ) và Phóng to/Thu nhỏ slide 2 tay (Two-Hand Zoom 1.0x – 2.5x), diễn giả không còn phụ thuộc vào clicker cầm tay hay trợ lý bấm hộ.',
    cs_curriculum_heading: 'Đặc Tả Chi Tiết Các Mô-Đun Kỹ Thuật',
    cs_curriculum_sub: 'Phân tích toán học hình học và máy trạng thái hữu hạn (FSM) bên dưới hệ thống',
    cs_mod1_title: 'Module 1: Tiếp Nhận Luồng Video & Định Vị Khung Xương 21 Điểm (Camera Stream & 3D Landmarks)',
    cs_mod1_sub: 'Thu nạp khung hình Webcam, tự động lật gương và trích xuất tọa độ 21 mốc xương bàn tay qua MediaPipe',
    cs_mod1_content: 'Khởi tạo luồng Webcam HTML5, render trực tiếp lên Canvas với hiệu ứng trực quan. Pipeline MediaPipe Hands On-Device phân tách lòng bàn tay (Palm Detector) và định vị chính xác tọa độ không gian 3D (X, Y, Z) của 21 mốc xương bàn tay với tần số 30–60 FPS.',
    cs_mod2_title: 'Module 2: Giải Thuật Phân Loại Cử Chỉ & Khoảng Cách Euclid (Geometric Gesture Classification)',
    cs_mod2_sub: 'Tính toán khoảng cách hình học giữa các khớp ngón tay để nhận diện chuẩn xác từng cử chỉ điều khiển',
    cs_mod2_content: 'Sử dụng khoảng cách Euclid (Euclidean Distance) giữa đầu ngón tay (Tip) và khớp đốt (PIP/MCP) đối chiếu với cổ tay (Wrist) để xác định trạng thái co/duỗi của từng ngón: 1 ngón trỏ (☝️ Next), 2 ngón chữ V (✌️ Prev), Chụm ngón cái - trỏ (🤏 Laser Pointer) và Khoảng cách 2 lòng bàn tay (👐 Zoom 1.0x – 2.5x).',
    cs_mod3_title: 'Module 3: Động Cơ Chống Bấm Nhầm 3 Lớp & Máy Trạng Thái (3-Layer Anti-False-Positive Engine)',
    cs_mod3_sub: 'Máy trạng thái hữu hạn (FSM) kết hợp bộ đếm Dwell 800ms và Cooldown Buffer chống rung giật',
    cs_mod3_content: 'Cơ chế 3 lớp bảo vệ: Lớp 1 - Master Lock (xòe 5 ngón giữ 1.0s) chuyển đổi trạng thái ACTIVE ⟷ LOCKED; Lớp 2 - Hold-to-Trigger yêu cầu giữ cử chỉ ổn định 800ms kèm vòng tiến trình SVG (nếu quơ tay lướt qua sẽ lập tức hủy đếm); Lớp 3 - Cooldown Buffer 1.2s khóa lệnh tạm thời sau khi chuyển trang.',
    cs_tradeoff_heading: 'PHÂN TÍCH ĐÁNH ĐỔI KỸ THUẬT & ĐIỀU KIỆN THỰC NGHIỆM (TRADE-OFFS & CONSTRAINTS)',
    cs_tradeoff_1_title: 'Tại sao chọn Giải thuật Hình học Euclid thay vì mạng phân loại sâu (MLP/CNN)?',
    cs_tradeoff_1_desc: 'Khi đã có 21 tọa độ khớp 3D từ MediaPipe, việc tính tỷ lệ khoảng cách Euclid bất biến theo tỷ lệ (scale-invariant) tốn gần như 0ms CPU, giúp duy trì trọn vẹn 30–60 FPS ngay trên laptop phổ thông của sinh viên/giảng viên mà không cần GPU rời.',
    cs_tradeoff_2_title: 'Giới hạn thực nghiệm & Hướng cải tiến tiếp theo:',
    cs_tradeoff_2_desc: 'Hoạt động tối ưu ở khoảng cách 0.5m – 2.2m trong điều kiện ánh sáng phòng học tiêu chuẩn. Hướng phát triển tiếp theo là bổ sung bộ lọc Kalman / One-Euro Filter để làm mượt hơn nữa đường đi của con trỏ Laser ảo khi ánh sáng yếu.',

    cs_specs_heading: 'THÔNG SỐ KỸ NGHỆ HỆ THỐNG',
    cs_btn_demo: 'Trải Nghiệm Live Web Demo',
    cs_btn_repo: 'Mã Nguồn GitHub (@Andrew12126)',
    cs_peer_reviewed: 'Định Hướng Kiến Trúc Vị Nhân Sinh',
    cs_peer_desc: 'Thiết kế nhằm giải phóng đôi tay cho diễn giả, sinh viên và giảng viên khi thuyết trình, hướng tới ứng dụng AI thiết thực không rào cản phần cứng.',

    // Contact Page
    contact_page_badge: '04 · LIÊN HỆ HỌC THUẬT & HỒ SƠ CV',
    contact_page_title: 'Kết Nối & Trao Đổi Học Thuật',
    contact_page_sub: 'Sẵn sàng đón nhận cơ hội tham gia hỗ trợ phòng lab nghiên cứu, thảo luận định hướng Thạc sĩ, hợp tác dự án kỹ thuật và lời mời MC sự kiện.',
    contact_info_heading: 'Kênh Trao Đổi Trực Tiếp',
    contact_email_label: 'Email Học Thuật & Cá Nhân',
    contact_phone_label: 'Số Điện Thoại / Zalo',
    contact_loc_label: 'Địa Điểm Hiện Tại',
    contact_loc_val: 'TP. Biên Hòa, Đồng Nai, Việt Nam (UTC+7)',
    contact_status_label: 'Tình Trạng Học Thuật Hiện Tại',
    contact_status_val: 'Sinh Viên CNTT Năm 1 @ LHU • Cựu SV Hospitality HUIT • Định Hướng Cao Học AI',
    btn_facebook: 'Facebook',
    contact_mc_title: 'Hợp Tác Dẫn Chương Trình & MC Sự Kiện',
    contact_mc_desc: 'Từng dẫn 4–5 sự kiện vừa và nhỏ (chương trình từ thiện, Tết Trung thu, Ký ức làng tranh Đông Hồ, gameshow mini). Sẵn sàng nhận lời mời dẫn dắt: Workshop công nghệ, Tọa đàm học thuật sinh viên, Sự kiện văn hóa nghệ thuật và Hoạt động thiện nguyện cộng đồng.',
    contact_mc_scope_exp: 'KINH NGHIỆM ĐÃ DẪN (4–5 SỰ KIỆN)',
    contact_mc_scope_open: 'SẴN SÀNG NHẬN LỜI MỜI DẪN',
    contact_mc_exp1: 'Từ Thiện & Cộng Đồng',
    contact_mc_exp2: 'Tết Trung Thu',
    contact_mc_exp3: 'Ký Ức Tranh Đông Hồ',
    contact_mc_exp4: 'Gameshow Mini',
    contact_mc_open1: 'Workshop Công Nghệ',
    contact_mc_open2: 'Tọa Đàm Học Thuật Sinh Viên',
    contact_mc_open3: 'Sự Kiện Văn Hóa & Nghệ Thuật',
    contact_mc_open4: 'Hoạt Động Thiện Nguyện',
    contact_mc_strength: '• Thế mạnh: Giọng truyền cảm, phản xạ sân khấu linh hoạt, kết nối con người tự nhiên xuất phát từ nền tảng dịch vụ Hospitality.',
    contact_form_heading: 'Gửi Thư Trao Đổi Học Thuật & Hợp Tác',
    contact_form_sub: 'Tự động chuẩn hóa tiêu đề & nội dung để gửi trực tiếp tới nguyenvanan722006@gmail.com',
    contact_name_label: 'Họ và Tên của bạn',
    contact_name_ph: 'VD: GS. Nguyễn Văn B / Anh Trần C',
    contact_email_field: 'Địa chỉ Email phản hồi',
    contact_email_ph: 'email@university.edu.vn',
    contact_subject_label: 'Chủ Đề Kết Nối',
    contact_sub_opt1: 'Cơ Hội Tham Gia Hỗ Trợ Phòng Lab Nghiên Cứu',
    contact_sub_opt2: 'Định Hướng Học Thuật / Học Bổng Thạc Sĩ',
    contact_sub_opt3: 'Hợp Tác Dự Án Kỹ Thuật & Phần Mềm',
    contact_sub_opt4: 'Lời Mời MC Sự Kiện / Workshop Học Thuật',
    contact_sub_opt5: 'Trao Đổi Khác',
    contact_msg_label: 'Nội Dung Tin Nhắn',
    contact_msg_ph: 'Nhập nội dung bạn muốn trao đổi...',
    contact_submit_btn: 'Soạn & Gửi Email Ngay',
    contact_copy_msg_btn: 'Sao Chép Nội Dung Thư',
    contact_privacy_note: '🔒 Mở trình gửi thư của bạn với nội dung đã định dạng chuẩn học thuật',

    // Academic CV Preview & Print Modal
    btn_download_cv: 'Xem & In Academic CV (PDF)',
    cv_modal_badge: 'CURRICULUM VITAE HỌC THUẬT (BẢN CHUẨN IN PDF)',
    cv_modal_print_btn: 'In / Lưu Thành PDF (Ctrl+P)',
    cv_modal_close_btn: 'Đóng',

    // Shared Actions & Footer
    btn_github_repos: 'GitHub',
    footer_role: 'Human-Centric AI & Applied Systems Hub',
    toast_cv: '📄 Đã mở bản Academic CV chuẩn in PDF.'
  }),

  en: Object.freeze({
    // Page Titles & Skip Link
    page_title_home: 'Nguyen Van An | Human-Centric AI & Applied Systems Portfolio',
    page_title_research: 'Scientific Research & Pre-Master\'s Roadmap | Nguyen Van An',
    page_title_projects: 'Applied Engineering & Technical Systems | Nguyen Van An',
    page_title_contact: 'Academic Inquiries & Printable CV | Nguyen Van An',
    skip_to_main: 'Skip to main content',

    // Navigation
    nav_about: 'About',
    nav_research: 'Research',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    btn_resume: 'Academic CV',
    btn_contact: 'Contact Me',

    // Hero Section
    hero_badge: 'INNOVATION & HUMAN-CENTRIC AI',
    hero_title_1: 'Technology That Makes Life',
    hero_title_2: 'Easier, Simpler & More Comfortable',
    hero_desc: 'Drawing upon a distinct foundation from <strong class="text-[#111827] dark:text-white font-semibold">3 semesters of Hospitality Management at HUIT (2024–2025)</strong> in user empathy and service touchpoint optimization, combined with my current training as a <strong class="text-[#111827] dark:text-white font-semibold">1st-year IT undergraduate at Lac Hong University (LHU)</strong>, I am dedicated to <strong class="text-[#111827] dark:text-white font-semibold">scientific research and applied systems engineering</strong>. My academic trajectory targets an <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">International Master\'s Scholarship in Applied AI</span> and a long-term career as an <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">AI Application Engineer</span> crafting human-centric solutions.',
    stat_projects: '3 Semesters Hospitality @ HUIT (2024–2025)',
    stat_certs: '1st-Year IT @ LHU • CS Foundations',
    stat_grade: 'International Master\'s AI Track',

    // Author Spotlight
    author_name: 'Nguyen Van An',
    author_role: 'Aspiring AI Application Engineer',
    author_subtitle: 'HUIT Hospitality (2024–2025) → LHU 1st-Year IT',
    author_collab: 'Open for Lab & Project Collab',

    // Trụ cột 01: Về tôi & chí hướng
    about_badge: 'PILLAR 01 · ABOUT & ACADEMIC VISION',
    about_title: 'From Service Empathy to Human-Centric AI Engineering',
    about_sub: 'A purposeful academic transition from 3 semesters of Hospitality at HUIT to Information Technology at LHU, cultivating scientific research discipline toward graduate studies in Applied AI.',
    about_story_heading: 'The Origin & Academic Pivot Story',
    about_story_p1: 'I began my university education with <strong>3 semesters of Hospitality Management at HUIT (2024 – 2025)</strong>. This formative period instilled in me a core engineering philosophy: always understand human psychology deeply, respect every service touchpoint, and prioritize human comfort and peace of mind above all else.',
    about_story_p2: 'During my time at HUIT, while participating in the initial stage of a faculty-supervised research project — searching for related academic papers, reading abstracts, and cataloging literature systematically into an Excel database using AI discovery tools — I realized my true calling was to <strong>directly engineer intelligent software systems</strong>. Before that research project concluded, I made the decisive pivot to transfer schools and majors into <strong>Information Technology (IT) at Lac Hong University (LHU)</strong>, where I am currently a first-year undergraduate.',
    about_story_p3: 'Alongside building rigorous foundations in Discrete Mathematics, Algorithms, and Programming at LHU, my experience hosting <strong>4–5 community and cultural events</strong> (charity drives, Mid-Autumn festivals, Dong Ho folk art exhibitions, minigames) enables me to communicate complex technical architectures with clarity and human warmth.',

    // Academic Quick-Facts Matrix
    about_facts_heading: 'ACADEMIC PROFILE & QUICK FACTS',
    about_fact1_label: 'Current Institution',
    about_fact1_val: 'Faculty of IT, Lac Hong University (LHU) — 1st-Year Undergraduate (2025–Present)',
    about_fact2_label: 'Interdisciplinary Background',
    about_fact2_val: '3 Semesters in Hospitality Management @ HUIT (2024–2025)',
    about_fact3_label: 'Core Research Interests',
    about_fact3_val: 'Human-Centric AI, On-Device Computer Vision, Prompt & RAG Systems',
    about_fact4_label: 'Academic English Trajectory',
    about_fact4_val: 'IELTS 5.5 (Current Baseline) → Target IELTS 7.0+ (Graduate Scholarship Track)',

    // Timeline
    about_timeline_heading: 'Academic Roadmap & Key Milestones',
    about_tl1_year: '2024 — 2025',
    about_tl1_tag: 'HOSPITALITY @ HUIT',
    about_tl1_title: '3 Semesters in Hospitality & Service Design Mindset',
    about_tl1_desc: 'Developed human touchpoint empathy, public communication skills, and served as MC for 4–5 community events (Charity, Mid-Autumn, Dong Ho folk arts, Minigames).',
    about_tl2_year: 'STAGE 1 RESEARCH @ HUIT',
    about_tl2_tag: 'LITERATURE CATALOGING',
    about_tl2_title: 'Stage-1 Literature Search: Da Nang Winter Tourism Behavior',
    about_tl2_desc: 'Retrieved related academic papers via Google Scholar & Perplexity AI, screened abstracts, and organized a structured Excel literature log prior to transferring majors.',
    about_tl3_year: '2025 — PRESENT',
    about_tl3_tag: 'IT @ LHU • ACTIVE',
    about_tl3_title: 'Transferred to Information Technology (Year 1) at LHU',
    about_tl3_desc: 'Focusing on programming, discrete mathematics, data structures, and building real-world AI Computer Vision applications (Smart Gesture Slide Controller).',
    about_tl4_year: 'NEXT ACADEMIC MILESTONE',
    about_tl4_tag: 'GLOBAL SCHOLARSHIP',
    about_tl4_title: 'International Master\'s Scholarship & Degree in Human-Centric AI',
    about_tl4_desc: 'Advancing research methodology, academic publications, and English proficiency (targeting IELTS 7.0+) for international graduate admissions.',
    about_tl5_year: 'CAREER NORTH STAR',
    about_tl5_tag: 'CAREER NORTH STAR',
    about_tl5_title: 'AI Application Engineer',
    about_tl5_desc: 'Engineering practical, human-centered AI systems that make everyday living more convenient, effortless, and comfortable.',

    // 4 Trụ cột năng lực
    about_skills_heading: '4 Transferable Strengths & Core Competencies',
    about_str1_title: 'Human-First Service Mindset',
    about_str1_desc: '3 semesters at HUIT taught me to treat every software friction or false trigger as a broken service touchpoint—prioritizing intuitive usability over technical clutter.',
    about_str2_title: 'MC & Technical Presentation Clarity',
    about_str2_desc: 'Hosting 4–5 community and cultural events forged my stage confidence, structured storytelling, and ability to present technical concepts persuasively.',
    about_str3_title: 'Literature Discovery & Excel Cataloging',
    about_str3_desc: 'Hands-on experience querying Google Scholar & AI discovery tools to locate relevant papers, screen abstracts, and organize structured literature logs in Excel.',
    about_str4_title: 'Academic English & Graduate Trajectory',
    about_str4_desc: 'Current IELTS 5.5 baseline enables reading international technical documentation and research papers, actively progressing toward IELTS 7.0+ for Master\'s scholarships.',

    // Tuyên ngôn sứ mệnh
    about_manifesto_title: 'PERSONAL MISSION MANIFESTO',
    about_manifesto_quote: '"Scientific research is not about pursuing detached abstractions, but about purposeful innovation that brings technology into everyday life—making human living more convenient, easier, and comfortable."',
    about_manifesto_author: 'Nguyen Van An — HUIT Hospitality Alum (2024–2025) • 1st-Year IT Student @ LHU',

    // Academic Portals
    home_explore_heading: 'Explore Academic & Engineering Portals',
    home_explore_sub: 'Dive into my research literature workflow, applied engineering case studies, and printable academic CV',
    home_card_res_title: 'Scientific Research & Pre-Master\'s Roadmap',
    home_card_res_desc: 'Stage-1 literature cataloging in Excel for the Da Nang tourism study at HUIT, alongside my international Master\'s roadmap in Human-Centric AI.',
    home_card_res_btn: 'Explore Research →',
    home_card_proj_title: 'Applied Projects & Systems Engineering',
    home_card_proj_desc: 'Smart Gesture Slide Controller (On-Device MediaPipe Hands + 3-Layer FSM), Swiss Minimalist architecture, and literature synthesis workflows.',
    home_card_proj_btn: 'Explore Projects →',
    home_card_contact_title: 'Academic Inquiries, Speaking & Printable CV',
    home_card_contact_desc: 'Open for research lab assistance, Pre-Master\'s mentorship dialogues, instant Printable Academic CV (PDF), and event MC invitations.',
    home_card_contact_btn: 'Connect & View CV →',

    // Research Page
    res_badge: '02 · SCIENTIFIC RESEARCH & INTERNATIONAL PRE-MASTER\'S ROADMAP',
    res_title: 'Scientific Research & Human-Centric AI',
    res_sub: 'Transparent documentation of my early research foundations — grounding machine intelligence in real-world human experience and everyday usability.',
    res_topic1_badge: 'STAGE 1 RESEARCH CONTRIBUTION · LITERATURE CATALOGING (HUIT 2024–2025)',
    res_topic1_status: 'STAGE 1 LITERATURE LOG · PRIOR TO IT TRANSFER AT LHU',
    res_topic1_title: 'Faculty Research Topic: Winter Tourism Consumer Behavior in Da Nang City',
    res_topic1_role: 'Actual Role: Searching related academic papers (Google Scholar & Perplexity AI), screening abstracts & cataloging literature into a structured Excel sheet',
    res_topic1_desc: 'During my Hospitality studies at HUIT, I participated in the initial literature discovery phase of a faculty-supervised research project. My responsibility was to search for academic papers and reports related to off-peak tourism seasonality and winter tourist psychology, screen their abstracts, and systematically log them into a structured Excel spreadsheet before I decided to transfer schools and majors to study IT at LHU.',
    res_topic1_method_heading: 'Stage-1 Literature Search & Excel Cataloging Workflow',
    res_topic1_method_1: '<strong>1. Targeted Paper Retrieval:</strong> Combined keyword queries on Google Scholar with Perplexity AI to quickly locate relevant studies and reports on seasonal tourism consumer behavior and weather sensitivity.',
    res_topic1_method_2: '<strong>2. Abstract Screening & Relevance Filtering:</strong> Read through paper abstracts and conclusions to verify relevance to off-peak/winter coastal tourism prior to cataloging.',
    res_topic1_method_3: '<strong>3. Structured Excel Literature Log:</strong> Compiled and organized all discovered papers into an Excel spreadsheet (tracking Paper Title, Authors/Year, Source Link, Abstract Summary, and Relevance Notes) as a foundational reference sheet for the research team.',
    res_excel_heading: 'Excel Literature Cataloging Structure (Stage-1 Artifact Preview)',
    res_excel_sub: 'Representative structure of the Excel spreadsheet used to list and categorize related studies during Stage 1 at HUIT',
    res_excel_col1: 'Ref / Year',
    res_excel_col2: 'Related Paper Theme & Research Cluster',
    res_excel_col3: 'Discovery Source',
    res_excel_col4: 'Key Takeaways Logged from Abstract',
    res_excel_col5: 'Relevance to Da Nang Topic',
    res_excel_r1_c2: 'Seasonality & weather sensitivity in coastal destination decision-making',
    res_excel_r1_c4: 'Analyzes psychological barriers of tourists visiting coastal cities during cooler/off-peak winter months.',
    res_excel_r1_c5: 'Identifies weather barrier variables & alternative indoor experience expectations.',
    res_excel_r2_c2: 'Push & Pull motivations in off-peak urban and cultural tourism spending',
    res_excel_r2_c4: 'Examines how culinary heritage, year-end festivals, and promotional pricing attract winter visitors.',
    res_excel_r2_c5: 'Supports listing pull-factors specific to Da Nang during winter.',
    res_excel_r3_c2: 'Perceived service value & revisit intention in hospitality touchpoints',
    res_excel_r3_c4: 'Links accommodation comfort, empathetic service quality, and overall guest satisfaction.',
    res_excel_r3_c5: 'Informs hospitality service quality items for winter travelers.',
    res_pivot_note: '<strong>The Academic Pivot to Computer Science:</strong> While completing this Stage-1 Excel literature catalog at HUIT, experiencing firsthand how AI discovery tools accelerate scientific synthesis sparked a defining realization: I wanted to <strong>build the technology itself</strong>. Consequently, before this tourism study concluded, I made the decisive transition from HUIT Hospitality to <strong>Information Technology at Lac Hong University (LHU)</strong>.',

    res_topic2_badge: 'INTERNATIONAL PRE-MASTER\'S ROADMAP',
    res_topic2_title: 'Human-Centric AI: Elevating Everyday Life Experiences',
    res_topic2_desc: 'Pursuing international Master\'s scholarship opportunities in Computer Science / Applied AI. Bridging hospitality service empathy with modern AI engineering to craft technological solutions that make everyday human life convenient, effortless, and comfortable.',
    res_tech_badge: 'TECHNICAL RESEARCH FOCUS',
    res_tech_title: 'Applied AI Engineering • Prompt Engineering, RAG Systems & Touchless HCI',
    res_tech_desc: 'Focusing on core applied competencies: Advanced Prompt Engineering, Retrieval-Augmented Generation (RAG) architectures for citation-grounded synthesis, and low-latency On-Device Computer Vision.',
    res_pillar1_title: 'Smart Home & Daily Living (IoT)',
    res_pillar1_desc: 'Adaptive home environments that synchronize naturally with daily human routines, optimizing household comfort and energy convenience.',
    res_pillar2_title: 'Intelligent Assistants & Knowledge Synthesis (RAG)',
    res_pillar2_desc: 'Building citation-grounded AI agents for academic literature organization, personal scheduling, and low-friction daily task coordination.',
    res_pillar3_title: 'Hospitality-Inspired Context-Aware Systems',
    res_pillar3_desc: 'Infusing service empathy from 3 semesters at HUIT to design recommendation and interaction systems attuned to real user context.',
    res_pillar4_title: 'Assistive Technology for Elderly & Healthcare',
    res_pillar4_desc: 'Applying touchless gesture interfaces and simplified voice/visual prompts to reduce cognitive load for elderly users and assistive care.',
    res_notes_heading: 'Foundational Research Habits & Academic Discipline',
    res_notes_sub: 'Cultivating transparent, methodical scientific habits from my first year in Computer Science',
    res_read1_title: 'Verified Digital Literature Discovery',
    res_read1_meta: 'Google Scholar & Perplexity AI · Source Verification',
    res_read1_desc: 'Using AI search tools to accelerate keyword exploration while strictly cross-checking original peer-reviewed sources on Google Scholar.',
    res_read2_title: 'Structured Literature Logging (Excel)',
    res_read2_meta: 'Literature Cataloging · Systematic Organization',
    res_read2_desc: 'Maintaining organized Excel logs of read abstracts, key variables, and source links so literature findings remain reproducible and easy to compare.',
    res_read3_title: 'Human-Centric Problem Selection',
    res_read3_meta: 'Applied HCI Focus · Zero Hardware Overhead',
    res_read3_desc: 'Prioritizing lightweight, client-side AI architectures (such as webcam-based gesture control in the browser) that solve real human friction without costly hardware.',
    res_collab_heading: 'Open for Research Lab Assistance & Prospective Master\'s Mentorship',
    res_collab_desc: 'As a disciplined and eager 1st-year IT student, I am ready to assist research labs with literature cataloging, data organization, and prototype implementation while learning from faculty advisors.',
    res_collab_btn: 'Connect for Academic Collaboration →',

    // Projects Page
    proj_page_badge: '03 · APPLIED ENGINEERING & TECHNICAL SYSTEMS',
    proj_page_title: 'Applied Projects & Engineering Hub',
    proj_page_sub: 'Every project is documented with engineering clarity: Real-world Problem → System Methodology & Architecture → Quantifiable Metrics.',
    featured_heading: 'Project Directory & Research Artifacts',
    featured_sub: 'Filter by domain to inspect problem statements, system architectures, and live deployments',
    filter_all: 'All Work (04)',
    filter_ai: 'AI & Computer Vision',
    filter_research: 'Literature & R&D',
    filter_web: 'Web Systems',
    view_all_projects: 'View GitHub @Andrew12126',

    proj_label_problem: 'Problem:',
    proj_label_method: 'Architecture:',
    proj_label_metric: 'Metrics:',

    proj1_title: 'Smart Gesture Slide Controller',
    proj1_prob: 'Presenters are tethered to physical clickers or keyboards, restricting natural stage movement.',
    proj1_meth: 'MediaPipe Hands (21 3D joints) + Euclidean Geometric Classifier + 3-Layer FSM Anti-False-Positive Engine.',
    proj1_metr: '30–60 FPS On-Device • < 25ms Latency • 100% Client-side Privacy',
    proj1_btn_demo: 'Live Demo ↗',
    proj1_btn_case: 'Read Case Study ↓',

    proj2_title: 'Swiss Minimalist Academic Portfolio Hub',
    proj2_prob: 'Need a fast, accessible, bilingual academic portfolio free of heavy runtime bloat and compliant with WCAG 2.2 AA.',
    proj2_meth: 'Static Multi-Page HTML5, Precompiled Tailwind CSS (37KB), SOLID Vanilla JS Modules & Printable LaTeX-style CV.',
    proj2_metr: 'Zero-FOUC EN/VI i18n • WCAG 2.2 AA Compliant • Built-in Print-to-PDF CV',
    proj2_btn_repo: 'GitHub Source ↗',
    proj2_btn_cv: 'View Printable CV →',

    proj3_title: 'Stage-1 Literature Log: Da Nang Winter Tourism',
    proj3_prob: 'Required rapid discovery and structured cataloging of prior seasonal tourism behavior studies for a faculty topic.',
    proj3_meth: 'Targeted queries via Google Scholar & Perplexity AI, abstract screening, and structured Excel cataloging.',
    proj3_metr: 'Stage-1 Contribution @ HUIT • Structured Excel Literature Database',
    proj3_btn_detail: 'View Workflow & Excel Log →',

    proj4_title: 'RFC Blueprint: Citation-Grounded Academic RAG Assistant',
    proj4_prob: 'Students and researchers face LLM hallucinations when synthesizing multi-paper literature logs.',
    proj4_meth: 'Retrieval-Augmented Generation (RAG) architecture with semantic chunking and strict citation verification.',
    proj4_metr: 'Pre-Master\'s R&D Design Specification @ LHU',
    proj4_btn_roadmap: 'View Research Direction →',

    cs_level_badge: 'ARCHITECTURE SPECIFICATION & PRODUCTION DEMO',
    cs_title: 'Smart Gesture Slide Controller (Touchless AI Presentation System)',
    cs_tagline: 'Practical On-Device Computer Vision architecture: Utilizing MediaPipe Hands for real-time 3D landmark tracking paired with a 3-layer Anti-False-Positive Finite State Machine, empowering presenters with complete stage freedom.',
    cs_pipeline_heading: '4-STAGE END-TO-END SYSTEM ARCHITECTURE PIPELINE',
    cs_pipe1_step: 'STAGE 01 · INGESTION',
    cs_pipe1_title: 'Webcam HTML5 Stream',
    cs_pipe1_desc: '60FPS video capture & mirrored Canvas HUD rendering',
    cs_pipe2_step: 'STAGE 02 · EXTRACTION',
    cs_pipe2_title: 'MediaPipe 21-Joint 3D',
    cs_pipe2_desc: 'Extracts normalized 3D coordinates (X, Y, Z) per hand',
    cs_pipe3_step: 'STAGE 03 · GEOMETRY',
    cs_pipe3_title: 'Euclidean Classifier',
    cs_pipe3_desc: 'Computes Tip-to-Wrist vs. PIP-to-Wrist distance ratios',
    cs_pipe4_step: 'STAGE 04 · DEBOUNCER',
    cs_pipe4_title: '3-Layer FSM Engine',
    cs_pipe4_desc: 'Master Lock 1.0s → Dwell 800ms → Cooldown 1.2s',

    cs_achievements_heading: 'CORE OBJECTIVES & ARCHITECTURAL BREAKTHROUGHS',
    cs_achieve_1: 'Ultra-fast On-Device Processing (30–60 FPS): Tracks 21 3D hand joints directly in the browser via WebCam with MediaPipe Hands, zero cloud video transmission, 100% privacy, and sub-25ms response latency.',
    cs_achieve_2: '3-Layer Anti-False-Positive Engine: Eliminates accidental slide jumps during natural speaking gestures via Master Lock (Open Palm 1.0s), Hold-to-Trigger (800ms dwell with SVG progress ring), and a 1.2s Cooldown Buffer.',
    cs_achieve_3: 'Touchless Stage Experience: Features glowing Virtual Laser Pointer (Pinch gesture) and Global Two-Hand Zoom (1.0x – 2.5x), removing dependency on handheld hardware clickers.',
    cs_curriculum_heading: 'Technical Module Specifications',
    cs_curriculum_sub: 'Mathematical geometry and Finite State Machine (FSM) breakdown behind the system',
    cs_mod1_title: 'Module 1: Video Ingestion & 21-Joint Hand Skeleton Tracking (Camera Stream & 3D Landmarks)',
    cs_mod1_sub: 'Captures webcam frames, mirrors the viewport, and extracts 21 3D spatial hand coordinates via MediaPipe',
    cs_mod1_content: 'Initializes HTML5 webcam streams rendered directly onto an HTML5 Canvas. The MediaPipe Hands on-device pipeline separates palm bounding boxes and accurately tracks 21 spatial landmarks (X, Y, Z) at 30–60 FPS.',
    cs_mod2_title: 'Module 2: Geometric Gesture Classification & Euclidean Distance Logic',
    cs_mod2_sub: 'Calculates Euclidean geometric distances between finger joints to reliably classify presentation gestures',
    cs_mod2_content: 'Computes Euclidean distances between fingertips (Tip) and intermediate joints (PIP/MCP) relative to the wrist to determine finger extension states: Single Index (☝️ Next), Peace Sign (✌️ Prev), Pinch (🤏 Virtual Laser), and Inter-palm distance (👐 Zoom 1.0x – 2.5x).',
    cs_mod3_title: 'Module 3: 3-Layer Anti-False-Positive Engine & Slide Controller State Machine',
    cs_mod3_sub: 'Finite State Machine (FSM) combining 800ms dwell time verification and cooldown debouncing',
    cs_mod3_content: '3-layer protection: Layer 1 - Master Lock (Open Palm held for 1.0s) toggles ACTIVE ⟷ LOCKED state; Layer 2 - Hold-to-Trigger requires 800ms continuous dwell with an animated SVG charge ring (accidental hand waves immediately cancel); Layer 3 - 1.2s Cooldown Buffer locks transition events to prevent slide bounce.',
    cs_tradeoff_heading: 'ENGINEERING TRADE-OFFS & EMPIRICAL CONSTRAINTS',
    cs_tradeoff_1_title: 'Why Euclidean Geometric Heuristics instead of a Deep Classifier (MLP/CNN)?',
    cs_tradeoff_1_desc: 'Once MediaPipe extracts 21 3D landmarks, scale-invariant Euclidean distance ratios require near-zero CPU overhead (<0.2ms), preserving a smooth 30–60 FPS on standard student/classroom laptops without dedicated GPUs.',
    cs_tradeoff_2_title: 'Empirical Operating Constraints & Future Work:',
    cs_tradeoff_2_desc: 'Operates reliably at 0.5m – 2.2m camera distance under standard indoor lighting. Future iterations will integrate a 1€ Filter (One-Euro Filter) to further reduce jitter on the virtual laser pointer under low-light webcam sensor noise.',

    cs_specs_heading: 'SYSTEM SPECIFICATIONS',
    cs_btn_demo: 'Experience Live Web Demo',
    cs_btn_repo: 'GitHub Repository (@Andrew12126)',
    cs_peer_reviewed: 'Human-Centric Engineering Philosophy',
    cs_peer_desc: 'Engineered to liberate presenters, students, and educators from physical presentation remotes, advancing accessible, human-centric AI with zero hardware overhead.',

    // Contact Page
    contact_page_badge: '04 · ACADEMIC INQUIRIES & PRINTABLE CV',
    contact_page_title: 'Connect & Academic Inquiries',
    contact_page_sub: 'Open for research lab student assistantships, Pre-Master\'s mentorship dialogues, technical collaborations, and academic/community MC invitations.',
    contact_info_heading: 'Direct Communication Channels',
    contact_email_label: 'Academic & Personal Email',
    contact_phone_label: 'Phone / Zalo',
    contact_loc_label: 'Current Location',
    contact_loc_val: 'Bien Hoa City, Dong Nai, Vietnam (UTC+7)',
    contact_status_label: 'Current Academic Standing',
    contact_status_val: '1st-Year IT Student @ LHU • HUIT Hospitality Alum • Pre-Master\'s AI Track',
    btn_facebook: 'Facebook',
    contact_mc_title: 'MC & Public Speaking Collaborations',
    contact_mc_desc: 'Experienced in hosting 4–5 community and youth events (charity drives, Mid-Autumn festivals, Dong Ho folk art, minigames). Available for hosting: Technology workshops, Student academic symposiums, Cultural art events, and Community volunteer programs.',
    contact_mc_scope_exp: 'PAST EXPERIENCE (4–5 EVENTS)',
    contact_mc_scope_open: 'AVAILABLE FOR BOOKING',
    contact_mc_exp1: 'Charity & Community',
    contact_mc_exp2: 'Mid-Autumn Festival',
    contact_mc_exp3: 'Dong Ho Folk Art',
    contact_mc_exp4: 'Mini Gameshows',
    contact_mc_open1: 'Tech Workshops',
    contact_mc_open2: 'Academic Symposiums',
    contact_mc_open3: 'Cultural & Art Events',
    contact_mc_open4: 'Volunteer Programs',
    contact_mc_strength: '• Key Strengths: Empathic delivery, agile stage presence, and authentic human connection rooted in Hospitality service discipline.',
    contact_form_heading: 'Compose an Academic or Technical Inquiry',
    contact_form_sub: 'Formats your subject & message and opens your mail client addressed to nguyenvanan722006@gmail.com',
    contact_name_label: 'Your Full Name',
    contact_name_ph: 'e.g. Prof. Jane Smith / Engineering Lead',
    contact_email_field: 'Your Reply-To Email',
    contact_email_ph: 'name@university.edu',
    contact_subject_label: 'Inquiry Category',
    contact_sub_opt1: 'Research Lab Student Assistantship / Opportunity',
    contact_sub_opt2: 'Academic Mentorship / Pre-Master\'s Inquiry',
    contact_sub_opt3: 'Technical Project & Engineering Collaboration',
    contact_sub_opt4: 'MC / Academic Workshop Hosting Invitation',
    contact_sub_opt5: 'General Inquiry',
    contact_msg_label: 'Message Content',
    contact_msg_ph: 'Share details about your research lab, project, or inquiry...',
    contact_submit_btn: 'Compose & Send via Email',
    contact_copy_msg_btn: 'Copy Formatted Message',
    contact_privacy_note: '🔒 Opens your default email client pre-filled with your structured inquiry',

    // Academic CV Preview & Print Modal
    btn_download_cv: 'View & Print Academic CV (PDF)',
    cv_modal_badge: 'ACADEMIC CURRICULUM VITAE (PRINT-READY PDF FORMAT)',
    cv_modal_print_btn: 'Print / Save as PDF (Ctrl+P)',
    cv_modal_close_btn: 'Close',

    // Shared Actions & Footer
    btn_github_repos: 'GitHub',
    footer_role: 'Human-Centric AI & Applied Systems Hub',
    toast_cv: '📄 Opened print-ready Academic CV preview.'
  })
});

/**
 * Safely retrieves stored language preference with fallback.
 * @returns {string} The active language code ('vi' | 'en')
 */
function getStoredLanguage() {
  try {
    const saved = localStorage.getItem(I18N_CONFIG.STORAGE_KEY);
    return I18N_CONFIG.SUPPORTED_LANGUAGES.includes(saved) ? saved : I18N_CONFIG.DEFAULT_LANG;
  } catch (error) {
    console.warn('[i18n] LocalStorage inaccessible, falling back to default:', error);
    return I18N_CONFIG.DEFAULT_LANG;
  }
}

/**
 * Safely persists language preference.
 * @param {string} lang - Language code to persist
 */
function persistLanguage(lang) {
  try {
    localStorage.setItem(I18N_CONFIG.STORAGE_KEY, lang);
  } catch (error) {
    console.warn('[i18n] Could not persist language selection:', error);
  }
}

let activeLanguage = getStoredLanguage();

/**
 * Updates DOM text content, document title, and input placeholders to match requested language.
 * @param {string} lang - Language code ('vi' | 'en')
 */
function setLanguage(lang) {
  if (!i18nTranslations[lang]) return;

  activeLanguage = lang;
  persistLanguage(lang);

  // Synchronize HTML document language attribute for A11y & SEO
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', lang);
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey && i18nTranslations[lang][titleKey]) {
      document.title = i18nTranslations[lang][titleKey];
    }
  }

  const dictionary = i18nTranslations[lang];

  // Update text nodes (using textContent by default for safety/speed, innerHTML only for allowlisted rich text keys)
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dictionary[key]) {
      if (HTML_ALLOWLIST_KEYS.has(key)) {
        el.innerHTML = dictionary[key];
      } else {
        el.textContent = dictionary[key];
      }
    }
  });

  // Update input placeholder attributes
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dictionary[key]) {
      el.setAttribute('placeholder', dictionary[key]);
    }
  });

  // Update language switcher UI indicator
  updateLanguageSwitcherUI(lang);
}

/**
 * Updates visual indicator on language toggle button.
 * @param {string} lang - Current active language
 */
function updateLanguageSwitcherUI(lang) {
  const viIndicator = document.getElementById('lang-indicator-vi');
  const enIndicator = document.getElementById('lang-indicator-en');

  if (!viIndicator || !enIndicator) return;

  const isVi = lang === 'vi';
  viIndicator.className = isVi ? 'text-[#C25E00] dark:text-[#D95D1E] font-bold' : 'text-[#9CA3AF] font-normal';
  enIndicator.className = isVi ? 'text-[#9CA3AF] font-normal' : 'text-[#C25E00] dark:text-[#D95D1E] font-bold';
}

/**
 * Toggles active language between Vietnamese and English.
 */
function toggleLanguage() {
  const nextLang = activeLanguage === 'en' ? 'vi' : 'en';
  setLanguage(nextLang);

  const globalScope = /** @type {any} */ (window);
  if (typeof globalScope.showToast === 'function') {
    const feedback = nextLang === 'vi' ? '🇻🇳 Đã chuyển sang Tiếng Việt' : '🇬🇧 Switched to English';
    globalScope.showToast(feedback, 'info');
  }
}

// Global interface exposure
Object.assign(window, {
  i18nTranslations,
  setLanguage,
  toggleLanguage,
  getCurrentLang: () => activeLanguage
});

// Self-initialization upon DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(activeLanguage);

  const langButton = document.getElementById('lang-toggle-btn');
  if (langButton) {
    langButton.addEventListener('click', toggleLanguage);
  }
});
