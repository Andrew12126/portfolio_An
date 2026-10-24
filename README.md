# Adley | Technical Hub & Systems Portfolio

> **Định vị:** Giao thoa giữa Công nghệ (Tech), Systems Architecture, Nghiên cứu Ứng dụng AI và Tư duy Vị Nhân Sinh (Human-Centric AI) kế thừa từ nền tảng 3 học kỳ Hospitality tại HUIT.

---

## 🎨 STYLE & TONE (Swiss Minimalist & Strict Light Mode)

Dự án được xây dựng tuân thủ tuyệt đối các nguyên tắc thiết kế **Swiss Minimalist** (lấy cảm hứng từ hệ sinh thái Apple, Stripe và DLLT Learning Hub):

### 1. Bảng màu (Color Palette)
- **Strict Light Mode (Bắt buộc nền sáng):**
  - Nền chính: Trắng tinh khiết (`#FFFFFF`).
  - Nền phụ / Khối nổi: Xám kem cực nhạt (`#F9FAFB` và `#F8F7F4` - màu giấy học thuật).
- **Màu chủ đạo (Primary Accent):** Cam đất / Hổ phách đậm (**Deep Burnt Orange** - `#C25E00` / hover `#A84E00`, màu nền mờ `#FFF8F0`, viền nhấn `#FBE3CC`).
- **Màu chữ:**
  - Chữ chính: Đen than (`#111827`).
  - Chữ phụ / Muted: Xám trung tính (`#6B7280`).
- **Đường viền:** Xám mảnh (`#E5E7EB`, độ dày `1px solid`).

### 2. Typography (Phông chữ)
- **Tiêu đề chính (Headings):** **Playfair Display** (Serif học thuật sắc nét) và **Montserrat** (Heading kiến trúc hiện đại).
- **Nội dung thân (Body):** **Inter** – Nét chữ trung tính, dễ đọc.
- **Metadata / Badges / Tags:** **JetBrains Mono** – In hoa (`uppercase`), khoảng cách chữ rộng (`tracking-widest`), cỡ chữ nhỏ (`text-xs`).

### 3. Ràng buộc chống "AI Slop" (Tuân thủ nghiêm ngặt)
- ❌ KHÔNG dùng Dark Mode.
- ❌ KHÔNG dùng màu gradient lòe loẹt tím/hồng/xanh neon.
- ❌ KHÔNG dùng hiệu ứng đổ bóng nặng (heavy drop shadow) hay phát sáng (neon glow).
- ❌ KHÔNG bo tròn quá đà (chỉ dùng chuẩn `rounded-md: 6px` hoặc `rounded-lg: 8px`).
- 💎 Ưu tiên tối đa khoảng trắng (generous whitespace) và phân tách các khối bằng đường kẻ viền mảnh 1px.

---

## 🏛️ Cấu Trúc Bố Cục (Information Architecture)

1. **Top Navigation Bar:** Cố định phía trên, nền trắng mờ nhẹ (`bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-sm`), Logo cam đất với icon Terminal, các liên kết điều hướng (Projects, Case Studies, Now & Research, About), thanh tìm kiếm nhỏ gọn, nút CTA "Contact Me" nổi bật cùng **2 nút chức năng ở phía trên cùng bên phải**:
   - **Nút Chuyển Đổi Ngôn Ngữ (EN / VI):** Mặc định khi người khác vừa truy cập trang web là **Tiếng Anh (English)**. Nhấp để chuyển đổi mượt mà sang Tiếng Việt và ngược lại (ghi nhớ tùy chọn vào `localStorage`).
   - **Nút Chuyển Đổi Giao Diện (Dark / Light Mode):** Chuyển đổi giữa chế độ Sáng (Swiss Minimalist White/Cream) và chế độ Tối (Charcoal Obsidian `#0B0F17` với viền mảnh 1px).
2. **Hero Section (2 cột bất đối xứng):**
   - **Cột trái (60%):** Badge nhỏ phía trên (`AI & SYSTEMS ARCHITECTURE`), Tiêu đề Serif sắc nét, đoạn tuyên ngôn sứ mệnh, dải thống kê (24+ Projects, 6 Certifications, University Grade) đóng khung viền mảnh.
   - **Cột phải (40%):** Khung hồ sơ định danh cá nhân với ảnh chân dung phóng to thực tế (Portrait Showcase Card), huy hiệu AI Application Engineer, quá trình chuyển ngành (HUIT Hospitality → LHU 1st-Year IT) và trạng thái sẵn sàng kết nối.
3. **Featured Projects Grid (Bố cục lưới 4 cột):**
   - Nửa trên: Thumbnail màu pastel cực nhạt tương ứng với từng mảng (AI: `#FFF8F0`, Systems: `#F0FDF4`, Cloud: `#FFFBEB`, OS: `#F0F9FF`), Badge phân loại góc trái và icon trung tâm.
   - Nửa dưới: Tiêu đề dự án, mô tả ngắn gọn và hàng metadata thời gian + tech stack tags viết hoa ở đáy.
4. **Project Detail / Case Study View (Giao diện chi tiết):**
   - **Cột trái (2/3):** Breadcrumb, tiêu đề, thẻ tags, khung "Key Achievements" (nền kem `#FAF9F6` viền mảnh kèm checkmark xanh), danh mục cấu trúc dự án dạng Accordion (Course Curriculum style).
   - **Cột phải (1/3):** Sticky Card chứa nút Demo cam đất, GitHub Repo và bảng thông số hệ thống (SLA 99.999%, Jepsen Verified).
5. **Thẻ "Now" Thời Gian Thực:** Đồng hồ thời gian thực UTC+7 TP. Biên Hòa, lời chào động và tab cập nhật tiến độ nghiên cứu Thạc sĩ.

---

## 📁 Cấu Trúc Mã Nguồn

```
d:\adley/
├── index.html                       # Trang chủ portfolio chính (Bento Grid, About, Pillars)
├── projects.html                    # Danh mục dự án nghiên cứu & ứng dụng
├── research.html                    # Hoạt động nghiên cứu khoa học (NCKH) & Học thuật
├── contact.html                     # Trang liên hệ học thuật & kết nối chuyên môn
├── README.md                        # Tài liệu kiến trúc dự án & hướng dẫn vận hành
├── css/
│   └── styles.css                   # Stylesheet chuẩn Swiss Minimalist, Design Tokens & A11y
├── js/
│   ├── main.js                      # Core JS module: Theme, Nav, Reveal, Accordion, Toast, Form
│   └── i18n.js                      # Song ngữ VI/EN (Internationalization Engine)
└── assets/
    ├── images/
    │   ├── avarta.jpg               # Chân dung thực tế của tác giả
    │   └── hero_avatar.jpg          # Ảnh hiển thị dự phòng
    ├── css/style.css                # Bản đồng bộ tương thích ngược (fallback)
    └── js/                          # Bản đồng bộ tương thích ngược (fallback)
        ├── main.js
        └── i18n.js
```

---

## 🚀 Trải Nghiệm & Kiểm Thử
- **Cách 1 (Mở ngay):** Nhấp đúp chuột vào tệp [index.html](file:///d:/adley/index.html) để xem trực tiếp trên trình duyệt.
- **Cách 2 (Next.js):** Chạy `npm install` và `npm run dev` nếu có môi trường Node.js.
