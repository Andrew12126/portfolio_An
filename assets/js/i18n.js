/**
 * @fileoverview Internationalization (i18n) Engine for Nguyen Van An Portfolio & Academic Hub.
 * Manages dual-language state (VI/EN) with persistence, DOM attribute synchronization,
 * and safe error handling.
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
 * Unified Internationalization Dictionary
 * Cleaned of deprecated references, maintaining complete parity between VI and EN.
 */
const i18nTranslations = Object.freeze({
  vi: Object.freeze({
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
    hero_desc: 'Kế thừa lợi thế lớn từ <strong class="text-[#111827] dark:text-white font-semibold">3 học kỳ Hospitality tại HUIT (2024–2025)</strong> về tư duy nhạy bén với tâm lý người dùng, sự thấu cảm và tối ưu hóa từng điểm chạm dịch vụ, kết hợp cùng nền tảng <strong class="text-[#111827] dark:text-white font-semibold">CNTT Năm 1 tại Đại học Lạc Hồng (LHU)</strong>, tôi đam mê con đường <strong class="text-[#111827] dark:text-white font-semibold">nghiên cứu khoa học và đổi mới sáng tạo</strong> để đưa công nghệ phục vụ đời sống thực tế. Tôi hướng tới bậc học <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">Thạc sĩ Nghiên cứu AI</span> và kiên định mục tiêu sự nghiệp trở thành <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">Kỹ sư Ứng dụng AI</span> kiến tạo các giải pháp lấy con người làm trọng tâm, giúp cuộc sống tiện lợi, dễ dàng và thoải mái hơn.',
    stat_projects: '3 Kỳ Hospitality @ HUIT (2024-2025)',
    stat_certs: 'CNTT Năm 1 @ LHU • IELTS 5.5',
    stat_grade: 'Định Hướng Nghiên Cứu Thạc Sĩ AI',

    // Author Spotlight
    author_name: 'Nguyễn Văn An',
    author_role: 'Định Hướng Kỹ Sư Ứng Dụng AI',
    author_subtitle: 'HUIT Hospitality (2024-2025) → LHU CNTT Năm 1',
    author_collab: 'Sẵn Sàng Hợp Tác',

    // Trụ cột 01: Về tôi & chí hướng
    about_badge: 'TRỤ CỘT 01 · VỀ TÔI & CHÍ HƯỚNG',
    about_title: 'Từ Tư Duy Phục Vụ Đến Nghiên Cứu AI Vị Nhân Sinh',
    about_sub: 'Hành trình chuyển ngành từ 3 học kỳ Hospitality tại HUIT sang Công nghệ Thông tin tại LHU, rèn luyện tư duy nghiên cứu khoa học và khát khao vươn tới học vị Thạc sĩ AI.',
    about_story_heading: 'Câu Chuyện & Nền Tảng Chuyển Ngành',
    about_story_p1: 'Tôi bắt đầu hành trình đại học với <strong>3 học kỳ ngành Hospitality (Quản trị Nhà hàng - Khách sạn) tại HUIT (2024 - 2025)</strong>. Khoảng thời gian này đã tôi luyện cho tôi một tư duy cốt lõi: luôn thấu hiểu sâu sắc tâm lý người dùng, điểm chạm dịch vụ và đặt sự thoải mái, an tâm của con người lên hàng đầu.',
    about_story_p2: 'Tuy nhiên, khát vọng sâu thẳm trong tôi là được <strong>đi sâu vào con đường nghiên cứu khoa học, tìm tòi cái mới và đổi mới sáng tạo</strong> để đưa công nghệ phục vụ đời sống thực tiễn — giúp cuộc sống con người trở nên <em>tiện lợi hơn, dễ dàng hơn và thoải mái hơn</em>. Đó chính là lý do tôi quyết định chuyển sang học <strong>Công nghệ Thông tin (IT) tại Đại học Lạc Hồng (LHU)</strong>, hiện đang là sinh viên năm nhất.',
    about_story_p3: 'Cùng với chứng chỉ <strong>IELTS 5.5</strong>, tôi tích cực tham gia vào <strong>đề tài NCKH cấp khoa: Hành vi tiêu dùng du lịch vào mùa đông tại TP Đà Nẵng</strong> (với vai trò tra cứu Google Scholar & Perplexity AI, đọc tóm tắt và lập bảng ma trận so sánh các nghiên cứu trước). Ngoài ra, kinh nghiệm từng dẫn dắt <strong>4-5 sự kiện vừa và nhỏ</strong> (từ thiện, Trung thu, Ký ức làng tranh Đông Hồ, minigame show) giúp tôi tự tin thuyết trình và truyền tải những khái niệm công nghệ phức tạp thành trải nghiệm trực quan cho mọi người.',

    // Timeline
    about_timeline_heading: 'Dòng Thời Gian & Mốc Phát Triển',
    about_tl1_year: '2024 — 2025',
    about_tl1_tag: 'HOSPITALITY @ HUIT',
    about_tl1_title: '3 Học Kỳ Quản Trị Khách Sạn & Tư Duy Dịch Vụ',
    about_tl1_desc: 'Tích lũy nền tảng thấu cảm người dùng, dịch vụ tận tâm và dẫn dắt 4-5 sự kiện MC cộng đồng (Từ thiện, Trung thu, Làng tranh Đông Hồ, Minigame show).',
    about_tl2_year: '2025 — HIỆN TẠI',
    about_tl2_tag: 'CNTT @ LHU • ACTIVE',
    about_tl2_title: 'Sinh Viên Năm 1 Ngành CNTT tại Đại Học Lạc Hồng',
    about_tl2_desc: 'Rèn luyện kiến thức lập trình, toán rời rạc và giải thuật. Sở hữu IELTS 5.5 và tiếp tục nâng cao trình độ ngoại ngữ học thuật.',
    about_tl3_year: 'HOẠT ĐỘNG NGHIÊN CỨU',
    about_tl3_tag: 'NCKH CẤP KHOA',
    about_tl3_title: 'Hành Vi Tiêu Dùng Du Lịch Mùa Đông tại TP Đà Nẵng',
    about_tl3_desc: 'Đề tài NCKH có giảng viên hướng dẫn. Phụ trách tra cứu qua Google Scholar & Perplexity AI, đọc tóm tắt bài báo và lập bảng ma trận so sánh các nghiên cứu trước.',
    about_tl4_year: 'MỤC TIÊU TIẾP THEO',
    about_tl4_tag: 'HỌC BỔNG QUỐC TẾ',
    about_tl4_title: 'Học Bổng & Chương Trình Thạc Sĩ Quốc Tế (AI Vị Nhân Sinh)',
    about_tl4_desc: 'Tìm kiếm học bổng cao học quốc tế, tập trung vào Kỹ nghệ ứng dụng AI, Prompt & RAG Systems và công nghệ hỗ trợ đời sống con người.',
    about_tl5_year: 'ĐÍCH ĐẾN DÀI HẠN',
    about_tl5_tag: 'CAREER NORTH STAR',
    about_tl5_title: 'Kỹ Sư Ứng Dụng AI (AI Application Engineer)',
    about_tl5_desc: 'Nghiên cứu và kiến tạo các giải pháp AI hữu ích, lấy con người làm trọng tâm để tạo ra giá trị thiết thực và nâng tầm cuộc sống cho mọi người xung quanh.',

    // 4 Trụ cột năng lực
    about_skills_heading: '4 Giá Trị Kế Thừa Định Hình Năng Lực',
    about_str1_title: 'Tư Duy Dịch Vụ Vị Nhân Sinh',
    about_str1_desc: '3 học kỳ tại HUIT dạy tôi xem mỗi khó khăn của người dùng hay lỗi phần mềm là một điểm chạm dịch vụ. Đặt sự tiện lợi và an tâm của con người lên trên sự phức tạp kỹ thuật.',
    about_str2_title: 'Kinh Nghiệm MC & Thuyết Trình',
    about_str2_desc: 'Từng dẫn 4-5 sự kiện vừa và nhỏ (chương trình từ thiện, lễ hội Trung thu, Ký ức tranh Đông Hồ, gameshow) giúp tôi tự tin nói trước công chúng và diễn đạt ý tưởng học thuật mạch lạc.',
    about_str3_title: 'NCKH & Phương Pháp Rà Soát Tài Liệu',
    about_str3_desc: 'Tham gia đề tài NCKH cấp khoa về du lịch Đà Nẵng, thành thạo kỹ năng đọc tóm tắt, trích xuất ý chính và lập bảng ma trận so sánh các nghiên cứu qua Google Scholar & Perplexity AI.',
    about_str4_title: 'Nền Tảng Tiếng Anh (IELTS 5.5)',
    about_str4_desc: 'Năng lực đọc hiểu tài liệu quốc tế và đọc báo cáo khoa học. Đang tiếp tục rèn luyện nâng cao band điểm để chuẩn bị cho hồ sơ học bổng Thạc sĩ.',

    // Tuyên ngôn sứ mệnh
    about_manifesto_title: 'TUYÊN NGÔN SỨ MỆNH & CHÍ HƯỚNG',
    about_manifesto_quote: '"Nghiên cứu khoa học không phải là tìm kiếm những điều xa rời thực tế, mà là đổi mới sáng tạo để mang công nghệ vào đời sống, giúp con người có một cuộc sống tiện lợi hơn, dễ dàng hơn và thoải mái hơn."',
    about_manifesto_author: 'Nguyễn Văn An — Cựu Sinh Viên Hospitality HUIT (2024-2025) • Sinh Viên CNTT Năm 1 LHU',

    // Academic Portals
    home_explore_heading: 'Khám Phá Các Chuyên Mục Học Thuật',
    home_explore_sub: 'Tìm hiểu sâu hơn về nghiên cứu, dự án và cơ hội kết nối học thuật',
    home_card_res_title: 'Nghiên Cứu Khoa Học & Đề Tài',
    home_card_res_desc: 'Đề tài NCKH cấp khoa du lịch Đà Nẵng, phương pháp lập ma trận so sánh tài liệu và lộ trình Thạc sĩ quốc tế về AI vị nhân sinh.',
    home_card_res_btn: 'Đến Trang Nghiên Cứu →',
    home_card_proj_title: 'Dự Án Công Nghệ & Kỹ Nghệ',
    home_card_proj_desc: 'Kiến trúc Academic RAG Assistant, website portfolio Swiss Minimalist và kho bài tập giải thuật C/Python.',
    home_card_proj_btn: 'Khám Phá Dự Án →',
    home_card_contact_title: 'Liên Hệ & Hợp Tác Học Thuật',
    home_card_contact_desc: 'Mở kết nối tham gia phòng lab nghiên cứu, trao đổi đề tài Thạc sĩ và thông tin mời MC sự kiện.',
    home_card_contact_btn: 'Liên Hệ & Tải CV →',

    // Research Page
    res_badge: '02 · NGHIÊN CỨU KHOA HỌC & ĐỊNH HƯỚNG THẠC SĨ QUỐC TẾ',
    res_title: 'Nghiên Cứu Khoa Học & AI Vị Nhân Sinh',
    res_sub: 'Đưa công nghệ và trí tuệ nhân tạo vào phục vụ đời sống thực tiễn — lấy con người làm trọng tâm để mang lại sự tiện lợi, thoải mái và dễ dàng hơn.',
    res_topic1_badge: 'ĐỀ TÀI NCKH CẤP KHOA (CÓ GIẢNG VIÊN HƯỚNG DẪN)',
    res_topic1_title: 'Hành Vi Tiêu Dùng Du Lịch Vào Mùa Đông Tại TP Đà Nẵng',
    res_topic1_role: 'Vai trò: Tra cứu Google Scholar & Perplexity AI, đọc tóm tắt & lập bảng ma trận so sánh các nghiên cứu trước',
    res_topic1_desc: 'Đề tài nghiên cứu khoa học cấp khoa có giảng viên hướng dẫn, đi sâu vào phân tích các biến số tâm lý, nhu cầu trải nghiệm và hành vi chi tiêu của du khách trong mùa đông tại TP Đà Nẵng. Đóng góp trực tiếp vào việc tra cứu học thuật, xây dựng cơ sở lý thuyết và đối chiếu các mô hình nghiên cứu tiền nhiệm.',
    res_topic1_method_heading: 'Phương Pháp & Công Cụ Tra Cứu Khoa Học Thực Tế',
    res_topic1_method_1: '<strong>Nguồn tra cứu học thuật số:</strong> Khai thác Google Scholar kết hợp Perplexity AI để truy vấn nhanh các nghiên cứu học thuật, bài báo chuyên ngành và kiểm chứng chéo nguồn trích dẫn.',
    res_topic1_method_2: '<strong>Đọc tóm tắt & Trích xuất ý chính:</strong> Phân tích Abstract và Conclusion của các bài báo khoa học để chắt lọc các biến số tâm lý, thang đo và phát hiện cốt lõi.',
    res_topic1_method_3: '<strong>Lập bảng ma trận so sánh (Comparative Matrix):</strong> Đối chiếu mục tiêu, phương pháp, kích thước mẫu, bối cảnh và kết quả giữa các nghiên cứu trước, tạo nền tảng vững chắc cho đề tài.',
    res_topic2_badge: 'ĐỊNH HƯỚNG BẬC THẠC SĨ QUỐC TẾ',
    res_topic2_title: 'AI Vị Nhân Sinh: Nâng Tầm Trải Nghiệm Cuộc Sống Thực Tiễn',
    res_topic2_desc: 'Khao khát tìm kiếm học bổng và chương trình Thạc sĩ quốc tế để đi sâu vào con đường nghiên cứu ứng dụng AI, lấy con người làm trọng tâm. Kết hợp tư duy thấu hiểu dịch vụ từ ngành Hospitality với kỹ nghệ ứng dụng AI hiện đại để tạo ra những giải pháp công nghệ giúp cuộc sống tiện lợi, dễ dàng và thoải mái hơn.',
    res_tech_badge: 'TRỌNG TÂM KỸ NGHỆ KỸ THUẬT',
    res_tech_title: 'Kỹ Nghệ Ứng Dụng AI • Kỹ Nghệ Prompt & Hệ Thống RAG',
    res_tech_desc: 'Tập trung đào sâu vào Kỹ nghệ Prompt nâng cao (Advanced Prompt Engineering) và kiến trúc Truy xuất Tăng cường Ngữ nghĩa (Retrieval-Augmented Generation - RAG), kết hợp mô hình ngôn ngữ lớn (LLM) với cơ sở dữ liệu chuyên ngành để tạo ra các tác tử AI chuẩn xác, không ảo giác.',
    res_pillar1_title: 'Nhà Thông Minh & IoT Đời Sống',
    res_pillar1_desc: 'Tự động hóa không gian sống thích ứng linh hoạt với thói quen sinh hoạt thường nhật, tối ưu hóa sự thoải mái và tiện nghi gia đình.',
    res_pillar2_title: 'Trợ Lý Ảo Cá Nhân Thông Minh Hàng Ngày',
    res_pillar2_desc: 'Xây dựng các tác tử AI hỗ trợ quản lý công việc, lập lịch trình và giải quyết các tác vụ hàng ngày với giao diện trực quan, không áp lực công nghệ.',
    res_pillar3_title: 'Gợi Ý Thấu Hiểu Tâm Lý (Tư Duy Hospitality)',
    res_pillar3_desc: 'Kế thừa tư duy chăm sóc khách hàng từ 3 học kỳ HUIT để phát triển hệ thống gợi ý đồng cảm, tinh tế và thấu hiểu đúng cảm xúc người dùng.',
    res_pillar4_title: 'Hỗ Trợ Người Cao Tuổi & Bệnh Lý Đặc Biệt',
    res_pillar4_desc: 'Ứng dụng công nghệ trợ năng theo dõi sức khỏe, cảnh báo an toàn và giao tiếp thông minh với giao diện đơn giản nhất cho người cần chăm sóc đặc biệt.',
    res_notes_heading: 'Phương Pháp Luận Đọc & Trọng Tâm Báo Cáo Khoa Học',
    res_notes_sub: 'Cam kết học thuật minh bạch: Tập trung phân tích các công trình khoa học lấy con người làm trọng tâm',
    res_read1_title: 'Khai Thác Công Cụ Số: Google Scholar & Perplexity AI',
    res_read1_meta: 'Phương pháp tra cứu học thuật số · Trọng tâm: Tốc độ & Tính chính xác của trích dẫn',
    res_read1_desc: 'Tận dụng Perplexity AI để tổng hợp nhanh các góc nhìn nghiên cứu và Google Scholar để thẩm định các công trình bình duyệt (peer-reviewed), nắm bắt các xu hướng khoa học mới nhất.',
    res_read2_title: 'Kỹ Năng Đọc Tóm Tắt & Lập Ma Trận So Sánh (Literature Matrix)',
    res_read2_meta: 'Kỹ năng tổng hợp tài liệu · Trọng tâm: Trích xuất biến số & So sánh đa chiều',
    res_read2_desc: 'Phân rã Abstract và kết luận của bài báo để rút trích các luận điểm cốt lõi, sau đó đưa vào ma trận so sánh theo phương pháp nghiên cứu, giả thuyết và phát hiện thực nghiệm.',
    res_read3_title: 'Tiêu Chí Lựa Chọn: Báo Cáo Khoa Học Lấy Con Người Làm Trọng Tâm',
    res_read3_meta: 'Triết lý học thuật · Trọng tâm: Human-Centric AI & Công nghệ trợ năng',
    res_read3_desc: 'Định hướng tiếp cận chuyên sâu vào các báo cáo khoa học về tương tác người - máy (HCI), công nghệ hỗ trợ người cao tuổi/người có bệnh lý, và các mô hình AI giảm thiểu tải nhận thức cho người dùng phổ thông.',
    res_collab_heading: 'Sẵn Sàng Tham Gia Phòng Lab & Tìm Kiếm Người Hướng Dẫn Thạc Sĩ',
    res_collab_desc: 'Tôi luôn sẵn sàng đón nhận cơ hội tham gia hỗ trợ các dự án tại phòng lab nghiên cứu, kết nối với các Thầy/Cô hướng dẫn Thạc sĩ quốc tế và trao đổi học thuật — để từng ngày tiến gần hơn đến mục tiêu bản thân: tạo ra giá trị thiết thực cho mọi người xung quanh.',
    res_collab_btn: 'Kết Nối Trao Đổi Học Thuật →',

    // Projects Page
    proj_page_badge: '03 · DỰ ÁN CÔNG NGHỆ & KỸ NGHỆ HỆ THỐNG',
    proj_page_title: 'Dự Án Công Nghệ & Kỹ Nghệ Ứng Dụng',
    proj_page_sub: 'Hiện thực hóa ý tưởng qua mã nguồn, kiến trúc hệ thống và giao diện người dùng tối giản lấy con người làm trọng tâm.',
    featured_heading: 'Dự Án Tiêu Biểu',
    featured_sub: 'Tuyển chọn các đồ án kỹ thuật, mã nguồn thực hành và kiến trúc nghiên cứu',
    view_all_projects: 'Xem GitHub @Andrew12126',
    proj1_title: 'Academic Paper RAG Assistant',
    proj1_desc: 'Hệ thống trợ lý AI chuyên biệt cho nghiên cứu khoa học: Đọc hiểu Abstract, trích xuất ý chính và tự động tổng hợp bảng ma trận so sánh tài liệu học thuật.',
    proj2_title: 'Personal Portfolio & Academic Hub',
    proj2_desc: 'Website cá nhân chuẩn Swiss Minimalist lấy cảm hứng từ Andrew Ng: Tích hợp song ngữ EN/VI, chuyển đổi Dark/Light mode và kiến trúc đa trang học thuật.',
    proj3_title: 'Algorithmic Logic & Mini Games Lab',
    proj3_desc: 'Kho bài tập rèn luyện tư duy giải thuật bằng C và Python: Xử lý cấu trúc dữ liệu cơ bản, bài toán logic và mini-game tương tác (Kéo búa bao, tính toán CLI).',
    proj4_title: 'Human-Centric AI Ideation Lab',
    proj4_desc: 'Không gian ấp ủ ý tưởng nghiên cứu AI vị nhân sinh: Thử nghiệm các bài toán Smart Home, công nghệ hỗ trợ người cao tuổi/bệnh lý để tìm đề tài Thạc sĩ đột phá.',
    cs_level_badge: 'BẢN THIẾT KẾ KIẾN TRÚC NGHIÊN CỨU',
    cs_title: 'Hệ Thống Trợ Lý AI Hỏi Đáp & Rà Soát Bài Báo Khoa Học (Academic Paper RAG Assistant)',
    cs_tagline: 'Kiến trúc kỹ nghệ ứng dụng AI chuyên sâu: Kết hợp Kỹ nghệ Prompt và Truy xuất Tăng cường Ngữ nghĩa (RAG) để tự động hóa quy trình phân tích Abstract và lập bảng ma trận so sánh tài liệu học thuật không gây ảo giác.',
    cs_achievements_heading: 'MỤC TIÊU & NGUYÊN TẮC KIẾN TRÚC CỐT LÕI',
    cs_achieve_1: 'Truy xuất chuẩn xác không ảo giác (Zero Hallucination): Tác tử AI chỉ trả lời dựa trên nội dung bài báo khoa học đã nạp, luôn đính kèm trích dẫn nguồn học thuật (Tác giả, Năm, DOI).',
    cs_achieve_2: 'Tự động bóc tách cấu trúc Abstract: Phân loại mục tiêu nghiên cứu, phương pháp luận thực nghiệm, cỡ mẫu và kết luận chính từ tệp PDF tài liệu khoa học.',
    cs_achieve_3: 'Tự động sinh Ma trận so sánh đa chiều: Tổng hợp các biến số tâm lý và kết quả của nhiều nghiên cứu tiền nhiệm thành bảng đối sánh phục vụ viết đề tài.',
    cs_curriculum_heading: 'Kiến Trúc Hệ Thống & Phân Tách Module',
    cs_curriculum_sub: 'Đặc tả kỹ thuật của luồng xử lý RAG phục vụ nghiên cứu khoa học',
    cs_mod1_title: 'Module 1: Tiếp Nhận & Phân Đoạn Văn Bản Khoa Học (Document Ingestion & Chunking)',
    cs_mod1_sub: 'Trích xuất văn bản từ PDF và phân chia đoạn thông minh theo cấu trúc bài báo',
    cs_mod1_content: 'Thu nạp tệp tài liệu PDF, bóc tách các phân đoạn quan trọng (Abstract, Methodology, Findings) và bảo toàn ngữ cảnh học thuật thông qua phương pháp phân đoạn có ngữ nghĩa (semantic chunking).',
    cs_mod2_title: 'Module 2: Kỹ Nghệ Prompt & Định Dạng Thẩm Định Học Thuật (Prompt Engineering)',
    cs_mod2_sub: 'Hệ thống câu lệnh cấu trúc định hướng AI đóng vai trò trợ lý nghiên cứu khách quan',
    cs_mod2_content: 'Thiết kế các prompt mẫu định dạng JSON/Markdown chặt chẽ, ràng buộc mô hình chỉ trích xuất thông tin có bằng chứng thực nghiệm, loại bỏ hoàn toàn hiện tượng tự suy diễn không có căn cứ.',
    cs_mod3_title: 'Module 3: Truy Xuất Tăng Cường & Tổng Hợp Ma Trận So Sánh (RAG & Matrix Synthesis)',
    cs_mod3_sub: 'Tìm kiếm ngữ nghĩa theo độ tương đồng và tổng hợp bảng đối sánh đa bài báo',
    cs_mod3_content: 'Thực hiện tìm kiếm ngữ nghĩa đối chiếu câu hỏi nghiên cứu với kho tài liệu, tự động đối chiếu các điểm tương đồng và khác biệt giữa các nghiên cứu trước để hình thành bảng ma trận so sánh hoàn chỉnh.',
    cs_specs_heading: 'THÔNG SỐ KỸ NGHỆ HỆ THỐNG',
    cs_btn_demo: 'Trao Đổi Kiến Trúc Dự Án',
    cs_btn_repo: 'Mã Nguồn GitHub (@Andrew12126)',
    cs_peer_reviewed: 'Định Hướng Kiến Trúc Vị Nhân Sinh',
    cs_peer_desc: 'Thiết kế nhằm hỗ trợ các nhà nghiên cứu, sinh viên và giảng viên tiết kiệm hàng chục giờ đọc tài liệu, hướng tới ứng dụng AI thiết thực cho đời sống học thuật.',

    // Contact Page
    contact_page_badge: '04 · LIÊN HỆ & KẾT NỐI HỌC THUẬT',
    contact_page_title: 'Kết Nối & Trao Đổi Học Thuật',
    contact_page_sub: 'Sẵn sàng đón nhận cơ hội tham gia phòng lab nghiên cứu, thảo luận đề tài Thạc sĩ và hợp tác kỹ thuật.',
    contact_info_heading: 'Kênh Trao Đổi Trực Tiếp',
    contact_email_label: 'Email Học Thuật & Cá Nhân',
    contact_phone_label: 'Số Điện Thoại / Zalo',
    contact_loc_label: 'Địa Điểm Hiện Tại',
    contact_loc_val: 'TP. Biên Hòa, Việt Nam (UTC+7)',
    contact_status_label: 'Tình Trạng Học Tập',
    contact_status_val: 'Sinh Viên CNTT Năm 1 LHU • IELTS 5.5 • Chuẩn Bị Học Thạc Sĩ',
    btn_facebook: 'Facebook',
    contact_mc_title: 'Hợp Tác Dẫn Chương Trình & MC Sự Kiện',
    contact_mc_desc: 'Từng dẫn 4-5 sự kiện vừa và nhỏ (chương trình từ thiện, Tết Trung thu, Ký ức làng tranh Đông Hồ, gameshow mini). Sẵn sàng nhận lời mời dẫn dắt: Workshop công nghệ, Tọa đàm học thuật sinh viên, Sự kiện văn hóa nghệ thuật và Hoạt động thiện nguyện cộng đồng.',
    contact_mc_scope_exp: 'KINH NGHIỆM ĐÃ DẪN (4-5 SỰ KIỆN)',
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
    contact_form_heading: 'Gửi Tin Nhắn Nhanh',
    contact_name_label: 'Họ và Tên của bạn',
    contact_name_ph: 'VD: GS. Nguyễn Văn B hoặc Bạn học',
    contact_email_field: 'Địa chỉ Email',
    contact_email_ph: 'email@example.com',
    contact_subject_label: 'Chủ Đề Kết Nối',
    contact_sub_opt1: 'Cơ Hội Nghiên Cứu / Tham Gia Phòng Lab',
    contact_sub_opt2: 'Thảo Luận Đề Tài Học Thuật / Thạc Sĩ',
    contact_sub_opt3: 'Hợp Tác Dự Án Kỹ Thuật',
    contact_sub_opt4: 'Mời MC Sự Kiện / Workshop',
    contact_sub_opt5: 'Trao Đổi Chung',
    contact_msg_label: 'Nội Dung Tin Nhắn',
    contact_msg_ph: 'Nội dung bạn muốn trao đổi...',
    contact_submit_btn: 'Gửi Tin Nhắn',

    // Shared Actions & Footer
    btn_download_cv: 'Tải Academic CV (PDF)',
    btn_github_repos: 'GitHub',
    footer_role: 'Human-Centric AI & Systems Hub',
    toast_cv: '📄 Vui lòng gửi email đến nguyenvanan722006@gmail.com để nhận Academic CV bản cập nhật mới nhất.'
  }),

  en: Object.freeze({
    // Navigation
    nav_about: 'About',
    nav_research: 'Research',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    btn_resume: 'Resume',
    btn_contact: 'Contact Me',

    // Hero Section
    hero_badge: 'INNOVATION & HUMAN-CENTRIC AI',
    hero_title_1: 'Technology That Makes Life',
    hero_title_2: 'Easier, Simpler & More Comfortable',
    hero_desc: 'Drawing upon a distinct advantage from <strong class="text-[#111827] dark:text-white font-semibold">3 semesters of Hospitality at HUIT (2024–2025)</strong> in user psychology, deep empathy, and service touchpoint optimization, combined with my foundations as a <strong class="text-[#111827] dark:text-white font-semibold">1st-year IT student at Lac Hong University (LHU)</strong>, I am deeply passionate about <strong class="text-[#111827] dark:text-white font-semibold">scientific research and purposeful innovation</strong> to ground technology in everyday life. My roadmap focuses on pursuing an <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">International Master\'s in Applied AI</span> and advancing toward my career North Star as an <span class="text-[#C25E00] dark:text-[#D95D1E] font-semibold">AI Application Engineer</span> — engineering human-centric solutions that make daily living more convenient, effortless, and comfortable.',
    stat_projects: '3 Semesters Hospitality @ HUIT (2024-2025)',
    stat_certs: '1st-Year IT @ LHU • IELTS 5.5',
    stat_grade: 'Pre-Master\'s AI Research Aspirant',

    // Author Spotlight
    author_name: 'Nguyen Van An',
    author_role: 'Aspiring AI Application Engineer',
    author_subtitle: 'HUIT Hospitality (2024-2025) → LHU 1st-Year IT',
    author_collab: 'Active for Collab',

    // Trụ cột 01: Về tôi & chí hướng
    about_badge: '01 · ABOUT & VISION',
    about_title: 'From Service Empathy to Human-Centric AI Engineering',
    about_sub: 'The academic transition from 3 semesters of Hospitality at HUIT to Computer Science at LHU, cultivating scientific research rigor and aspiring toward a Master\'s degree in AI.',
    about_story_heading: 'The Origin & Transition Story',
    about_story_p1: 'I began my undergraduate education with <strong>3 semesters of Hospitality Management at HUIT (2024 - 2025)</strong>. This formative chapter instilled in me a foundational principle: always prioritize human empathy, emotional service touchpoints, and intuitive peace of mind above all else.',
    about_story_p2: 'However, my deepest calling lies in <strong>scientific research, discovery, and practical innovation</strong> — the relentless drive to harness technology to elevate human daily living, making life <em>more comfortable, easier, and more convenient</em>. This inspired my decisive transition into <strong>Information Technology (IT) at Lac Hong University (LHU)</strong>, where I am currently a first-year undergraduate.',
    about_story_p3: 'Alongside my <strong>IELTS 5.5</strong> certificate, I actively participated in a <strong>faculty-level scientific research project: Winter Tourism Consumer Behavior in Da Nang City</strong> (retrieving papers via Google Scholar & Perplexity AI, abstract extraction, and comparative literature matrices). Furthermore, hosting <strong>4–5 community events</strong> (charity drives, Mid-Autumn festivals, Dong Ho folk art exhibitions, minigames) forged my confidence in public speaking and articulating complex technical ideas with clarity.',

    // Timeline
    about_timeline_heading: 'Academic Roadmap & Milestones',
    about_tl1_year: '2024 — 2025',
    about_tl1_tag: 'HOSPITALITY @ HUIT',
    about_tl1_title: '3 Semesters in Hospitality & Service Mindset',
    about_tl1_desc: 'Developed human touchpoint empathy, communication skills, and served as MC for 4-5 community events (Charity, Mid-Autumn, Dong Ho folk arts, Minigames).',
    about_tl2_year: '2025 — PRESENT',
    about_tl2_tag: 'IT @ LHU • ACTIVE',
    about_tl2_title: '1st-Year IT Student at Lac Hong University (LHU)',
    about_tl2_desc: 'Building foundations in programming, discrete mathematics, and algorithms. Achieved IELTS 5.5 and advancing toward higher academic English.',
    about_tl3_year: 'RESEARCH ACTIVITY',
    about_tl3_tag: 'FACULTY RESEARCH',
    about_tl3_title: 'Winter Tourism Consumer Behavior in Da Nang City',
    about_tl3_desc: 'Faculty-supervised scientific research. Responsible for academic paper retrieval via Google Scholar & Perplexity AI, abstract extraction, and comparative literature review matrix.',
    about_tl4_year: 'NEXT ACADEMIC MILESTONE',
    about_tl4_tag: 'GLOBAL SCHOLARSHIP',
    about_tl4_title: 'International Master\'s Scholarship & Degree in Human-Centric AI',
    about_tl4_desc: 'Pursuing international graduate scholarships in Computer Science / AI, focusing on Applied AI Engineering, Prompt & RAG Systems, and assistive technologies.',
    about_tl5_year: 'CAREER NORTH STAR',
    about_tl5_tag: 'CAREER NORTH STAR',
    about_tl5_title: 'AI Application Engineer',
    about_tl5_desc: 'Building practical, human-centered AI systems to make everyday living more convenient, effortless, and comfortable for everyone around me.',

    // 4 Trụ cột năng lực
    about_skills_heading: '4 Transferable Strengths & Core Identity',
    about_str1_title: 'Human-First Service Mindset',
    about_str1_desc: '3 semesters at HUIT taught me to view every software friction or error message as a customer touchpoint. Prioritizing human peace of mind and convenience over computer complexity.',
    about_str2_title: 'MC & Public Speaking Experience',
    about_str2_desc: 'Hosting 4–5 community events (charity, festivals, cultural folk art exhibitions, gameshows) forged my ability to speak publicly and convey technical concepts with clarity.',
    about_str3_title: 'Scientific Research & Literature Synthesis',
    about_str3_desc: 'Engaged in faculty-level research on Da Nang tourism behavior, skilled in abstract extraction, core takeaway synthesis, and comparative matrix construction via Google Scholar & Perplexity AI.',
    about_str4_title: 'Academic English Foundation (IELTS 5.5)',
    about_str4_desc: 'Enables reading global research papers and international documentation, actively advancing towards graduate-level scholarship requirements.',

    // Tuyên ngôn sứ mệnh
    about_manifesto_title: 'PERSONAL MISSION MANIFESTO',
    about_manifesto_quote: '"Scientific research is not about pursuing detached abstractions, but about purposeful innovation that brings technology into everyday life—making human living more convenient, easier, and comfortable."',
    about_manifesto_author: 'Nguyen Van An — HUIT Hospitality Alum (2024-2025) • 1st-Year IT Student @ LHU',

    // Academic Portals
    home_explore_heading: 'Explore Academic Portals',
    home_explore_sub: 'Deep dive into dedicated sections inspired by modern academic platforms',
    home_card_res_title: 'Scientific Research & Direction',
    home_card_res_desc: 'Da Nang winter tourism consumer research, comparative literature matrices, and international Human-Centric AI Master\'s roadmap.',
    home_card_res_btn: 'Explore Research →',
    home_card_proj_title: 'Applied Projects & Engineering',
    home_card_proj_desc: 'Academic RAG Assistant architecture, Swiss Minimalist portfolio platform, and C/Python algorithmic logic labs.',
    home_card_proj_btn: 'Explore Projects →',
    home_card_contact_title: 'Connect & Academic Inquiries',
    home_card_contact_desc: 'Open for academic discussions, research lab opportunities, Pre-Master\'s dialogues, and MC hosting invitations.',
    home_card_contact_btn: 'Get In Touch & CV →',

    // Research Page
    res_badge: '02 · SCIENTIFIC RESEARCH & INTERNATIONAL PRE-MASTER\'S ROADMAP',
    res_title: 'Scientific Research & Human-Centric AI',
    res_sub: 'Grounding machine intelligence in real-world human experience — making daily living more convenient, comfortable, and intuitive.',
    res_topic1_badge: 'FACULTY-LEVEL SCIENTIFIC RESEARCH (FACULTY ADVISORY)',
    res_topic1_title: 'Winter Tourism Consumer Behavior in Da Nang City',
    res_topic1_role: 'Role: Google Scholar & Perplexity AI retrieval, abstract analysis & comparative literature review matrix',
    res_topic1_desc: 'A faculty-level scientific research project conducted under academic faculty advisory, investigating tourist psychological drivers, experience expectations, and spending behavior during the winter season in Da Nang City. Directly contributed to academic retrieval, theoretical foundations, and comparative analysis of prior research models.',
    res_topic1_method_heading: 'Practical Scholarly Retrieval & Synthesis Methodology',
    res_topic1_method_1: '<strong>Digital Scholarly Discovery:</strong> Combining Google Scholar and Perplexity AI for rapid retrieval of academic publications, peer-reviewed journals, and cross-referencing citations.',
    res_topic1_method_2: '<strong>Abstract & Core Takeaways:</strong> Analyzing paper abstracts and conclusions to distill behavioral variables, empirical measurement scales, and core findings.',
    res_topic1_method_3: '<strong>Comparative Literature Matrix:</strong> Constructing structured matrices contrasting methodology, sample size, context, and findings across prior studies to build solid theoretical foundations.',
    res_topic2_badge: 'INTERNATIONAL PRE-MASTER\'S ROADMAP',
    res_topic2_title: 'Human-Centric AI: Elevating Everyday Life Experiences',
    res_topic2_desc: 'Actively pursuing international Master\'s scholarship opportunities to conduct research in Human-Centric Applied AI. Bridging hospitality service empathy with modern AI engineering to craft technological solutions that make everyday human life convenient, effortless, and comfortable.',
    res_tech_badge: 'TECHNICAL ENGINEERING FOCUS',
    res_tech_title: 'AI Application Engineering • Prompt Engineering & RAG Systems',
    res_tech_desc: 'Focusing on core engineering competencies: Advanced Prompt Engineering and Retrieval-Augmented Generation (RAG) architectures, grounding large language models (LLMs) with domain-specific knowledge to create accurate, hallucination-free AI agents.',
    res_pillar1_title: 'Smart Home & Daily Living (IoT)',
    res_pillar1_desc: 'Adaptive home living environments that synchronize naturally with daily human routines, optimizing household comfort and lifestyle convenience.',
    res_pillar2_title: 'Daily Intelligent Personal Assistants',
    res_pillar2_desc: 'Building multitasking AI agents for workflow assistance, personal scheduling, and intuitive task coordination without technological cognitive load.',
    res_pillar3_title: 'Hospitality-Inspired Sentiment Systems',
    res_pillar3_desc: 'Infusing service empathy from 3 semesters of Hospitality at HUIT to design subtle recommendation engines attuned to genuine user emotions and real needs.',
    res_pillar4_title: 'Assistive Care for Elderly & Medical Needs',
    res_pillar4_desc: 'Dedicated assistive technology for the elderly and individuals with medical conditions: smart safety prompts, simplified UI, and daily care support.',
    res_notes_heading: 'Scholarly Reading Methodology & Human-Centric Focus',
    res_notes_sub: 'Academic integrity commitment: Focused exclusively on human-centric research paradigms',
    res_read1_title: 'Digital Scholarly Discovery: Google Scholar & Perplexity AI',
    res_read1_meta: 'Digital Discovery Method · Focus: Speed & Citation Rigor',
    res_read1_desc: 'Leveraging Perplexity AI for rapid synthesis of diverse academic viewpoints and Google Scholar to cross-verify peer-reviewed literature, tracking state-of-the-art scientific progress.',
    res_read2_title: 'Abstract Analysis & Comparative Matrix Discipline',
    res_read2_meta: 'Literature Review Skill · Focus: Variable Extraction & Cross-Study Comparison',
    res_read2_desc: 'Deconstructing paper abstracts and conclusions to isolate core arguments, then structuring them into comparative matrices by methodology, hypotheses, and empirical findings.',
    res_read3_title: 'Selection Criteria: Human-Centric Research Reports',
    res_read3_meta: 'Academic Philosophy · Focus: Human-Centric AI & Assistive Technology',
    res_read3_desc: 'Focusing deep reading on Human-Computer Interaction (HCI), assistive technology for eldercare and medical needs, and AI models engineered to minimize cognitive load for everyday users.',
    res_collab_heading: 'Open for Research Lab Collaboration & Prospective Master\'s Mentorship',
    res_collab_desc: 'Actively seeking opportunities to support research lab projects, connect with international Master\'s advisors, and engage in academic dialogues — taking dedicated daily steps toward creating tangible value for the people and community around me.',
    res_collab_btn: 'Connect for Academic Collaboration →',

    // Projects Page
    proj_page_badge: '03 · APPLIED ENGINEERING & TECHNICAL SYSTEMS',
    proj_page_title: 'Applied Projects & Engineering Hub',
    proj_page_sub: 'Translating concepts into robust code, scalable architectures, and minimalist interfaces built around human needs.',
    featured_heading: 'Featured Projects & Technical Systems',
    featured_sub: 'Curated selection of technical systems, foundational codebases, and research prototypes',
    view_all_projects: 'View GitHub @Andrew12126',
    proj1_title: 'Academic Paper RAG Assistant',
    proj1_desc: 'Specialized AI research assistant: Intelligently parses paper abstracts, extracts core variables, and automatically synthesizes comparative literature review matrices.',
    proj2_title: 'Personal Portfolio & Academic Hub',
    proj2_desc: 'Production-ready Swiss Minimalist personal website inspired by Andrew Ng: Features EN/VI bilingual synchronization, Dark/Light modes, and dedicated multi-page academic architecture.',
    proj3_title: 'Algorithmic Logic & Mini Games Lab',
    proj3_desc: 'Rigorous algorithmic problem-solving repository in C and Python: Core data structure implementations, CLI logical challenges, and interactive mini-games (Rock-Paper-Scissors).',
    proj4_title: 'Human-Centric AI Ideation Lab',
    proj4_desc: 'Active incubation space for human-centric AI concepts: Exploring Smart Home IoT, elderly and healthcare assistive technologies to identify a breakthrough Master\'s research problem.',
    cs_level_badge: 'RESEARCH ARCHITECTURE SPECIFICATION',
    cs_title: 'Academic Paper RAG Assistant & Review System',
    cs_tagline: 'An applied AI engineering architecture: Harmonizing Advanced Prompt Engineering and Retrieval-Augmented Generation (RAG) to automate paper abstract parsing and comparative literature matrices without hallucinations.',
    cs_achievements_heading: 'CORE OBJECTIVES & ARCHITECTURAL PRINCIPLES',
    cs_achieve_1: 'Strict Zero Hallucination Retrieval: Grounded strictly on verified academic papers with mandatory academic citation metadata (Author, Year, DOI).',
    cs_achieve_2: 'Automated Abstract Decomposition: Programmatically extracts research objectives, empirical methodologies, sample sizes, and primary conclusions from scholarly PDFs.',
    cs_achieve_3: 'Multi-Paper Comparative Matrix Generation: Automatically synthesizes psychological variables and findings across prior literature into structured comparison tables for research papers.',
    cs_curriculum_heading: 'System Architecture & Module Breakdown',
    cs_curriculum_sub: 'Technical specifications for the academic research RAG processing pipeline',
    cs_mod1_title: 'Module 1: Scholarly Document Ingestion & Semantic Chunking',
    cs_mod1_sub: 'PDF text extraction and structured chunking based on academic paper hierarchy',
    cs_mod1_content: 'Ingests PDF publications, cleanly extracts structured sections (Abstract, Methodology, Findings), and preserves scholarly context through semantic boundary-aware chunking.',
    cs_mod2_title: 'Module 2: Prompt Engineering & Rigorous Scientific Verification',
    cs_mod2_sub: 'Structured prompt workflows guiding the LLM as an objective scientific assistant',
    cs_mod2_content: 'Designs strict JSON/Markdown schema-constrained prompt templates, constraining the model to extract empirically supported findings while eliminating speculative hallucinations.',
    cs_mod3_title: 'Module 3: Retrieval-Augmented Generation & Literature Matrix Synthesis',
    cs_mod3_sub: 'Semantic similarity search and multi-paper comparative synthesis',
    cs_mod3_content: 'Executes semantic cosine similarity queries against the research corpus, contrasting similarities and divergences across prior studies into comprehensive comparative literature review matrices.',
    cs_specs_heading: 'SYSTEM SPECIFICATIONS',
    cs_btn_demo: 'Discuss Architecture',
    cs_btn_repo: 'GitHub Repository (@Andrew12126)',
    cs_peer_reviewed: 'Human-Centric Engineering Philosophy',
    cs_peer_desc: 'Architected to save researchers, students, and faculty dozens of reading hours, advancing practical, human-centered AI for scholarly discovery.',

    // Contact Page
    contact_page_badge: '04 · CONTACT & ACADEMIC COLLABORATION',
    contact_page_title: 'Connect & Academic Inquiries',
    contact_page_sub: 'Open for graduate research lab opportunities, Pre-Master\'s dialogues, engineering discussions, and public speaking invitations.',
    contact_info_heading: 'Direct Communication Channels',
    contact_email_label: 'Academic & Personal Email',
    contact_phone_label: 'Phone / Zalo',
    contact_loc_label: 'Current Location',
    contact_loc_val: 'Bien Hoa City, Vietnam (UTC+7)',
    contact_status_label: 'Academic Standing',
    contact_status_val: '1st-Year IT Student @ LHU • IELTS 5.5 • Pre-Master\'s Aspirant',
    btn_facebook: 'Facebook',
    contact_mc_title: 'MC & Public Speaking Collaborations',
    contact_mc_desc: 'Experienced in hosting 4-5 community and youth events (charity drives, Mid-Autumn festivals, Dong Ho folk art, minigames). Available for hosting: Technology workshops, Student academic symposiums, Cultural art events, and Community volunteer programs.',
    contact_mc_scope_exp: 'PAST EXPERIENCE (4-5 EVENTS)',
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
    contact_form_heading: 'Send an Academic Inquiry',
    contact_name_label: 'Your Full Name',
    contact_name_ph: 'e.g. Dr. Jane Smith or Colleague',
    contact_email_field: 'Email Address',
    contact_email_ph: 'email@example.com',
    contact_subject_label: 'Inquiry Subject',
    contact_sub_opt1: 'Research Lab Opportunity / Internship',
    contact_sub_opt2: 'Academic Discussion / Pre-Master\'s Inquiry',
    contact_sub_opt3: 'Technical Project Collaboration',
    contact_sub_opt4: 'MC / Event Hosting Invitation',
    contact_sub_opt5: 'General Inquiry',
    contact_msg_label: 'Message Content',
    contact_msg_ph: 'Tell me about your project, lab opportunity, or academic inquiry...',
    contact_submit_btn: 'Send Inquiry',

    // Shared Actions & Footer
    btn_download_cv: 'Download Academic CV (PDF)',
    btn_github_repos: 'GitHub',
    footer_role: 'Human-Centric AI & Systems Hub',
    toast_cv: '📄 Please send an email to nguyenvanan722006@gmail.com to request the latest Academic CV (PDF).'
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
 * Updates DOM text content and input placeholders to match requested language.
 * @param {string} lang - Language code ('vi' | 'en')
 */
function setLanguage(lang) {
  if (!i18nTranslations[lang]) return;

  activeLanguage = lang;
  persistLanguage(lang);

  const dictionary = i18nTranslations[lang];

  // Update text nodes
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dictionary[key]) {
      el.innerHTML = dictionary[key];
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

  // Refresh Lucide icons if innerHTML replacements cleared them
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
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
  viIndicator.className = isVi ? 'text-[#C25E00] font-bold' : 'text-[#9CA3AF] font-normal';
  enIndicator.className = isVi ? 'text-[#9CA3AF] font-normal' : 'text-[#C25E00] font-bold';
}

/**
 * Toggles active language between Vietnamese and English.
 */
function toggleLanguage() {
  const nextLang = activeLanguage === 'en' ? 'vi' : 'en';
  setLanguage(nextLang);

  if (typeof window.showToast === 'function') {
    const feedback = nextLang === 'vi' ? '🇻🇳 Đã chuyển sang Tiếng Việt' : '🇬🇧 Switched to English';
    window.showToast(feedback, 'info');
  }
}

// Global interface exposure
window.i18nTranslations = i18nTranslations;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.getCurrentLang = () => activeLanguage;

// Self-initialization upon DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(activeLanguage);

  const langButton = document.getElementById('lang-toggle-btn');
  if (langButton) {
    langButton.addEventListener('click', toggleLanguage);
  }
});
