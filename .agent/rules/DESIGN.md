---
brand: "Han's Studio"
version: "2.4.0"
last_updated: "2026-08-22"
design_tokens:
  colors:
    primary: "#E8C5C8"        # Hồng tro quyến rũ (Rose Ash)
    primary_dark: "#D4AFB2"   # Hồng tro đậm
    secondary: "#E6C280"     # Champagne Gold
    bg_dark: "#0f172a"        # Charcoal Slate 900
    bg_card: "#1e293b"        # Bento Card Background Slate 800
    border_dark: "#334155"    # Border mỏng Slate 700
    text_light: "#FFFFFF"     # Text chính
    text_sub: "#94a3b8"       # Text phụ Slate 400
    success: "#10b981"        # Xanh lá Emerald
    warning: "#f59e0b"        # Vàng ấm Amber
    danger: "#f43f5e"         # Đỏ Rose
  typography:
    font_header: "Playfair Display, serif"
    font_body: "Inter, sans-serif"
  layout:
    style: "Bento Grid / Modular UI"
    border_radius: "16px"
    backdrop_blur: "12px"
    border_width: "1px"
---

# 📌 Quy Chuẩn Đặc Tả Thiết Kế Thương Hiệu: Han's Studio

> 📌 **LƯU Ý:** Toàn bộ đặc tả thiết kế chi tiết, bộ quy chuẩn CSS Variables, Bento Layout, Thẻ KPI, Biểu đồ Analytics, Form CRUD và Kiến trúc Data Lake đã được **HỢP NHẤT HOÀN TOÀN** vào Master Skill **[dashboard-builder](../skills/dashboard-builder/SKILL.md)**.

---

## 🎨 1. Design Tokens & CSS Variables

Mọi giao diện thuộc hệ sinh thái Han's Studio bắt buộc tuân thủ bộ CSS Variables:

```css
:root {
  /* Colors */
  --color-primary: #E8C5C8;
  --color-primary-dark: #D4AFB2;
  --color-secondary: #E6C280;
  --color-bg: #f8fafc;
  --color-card: #ffffff;
  --color-border: #e2e8f0;
  --color-text-main: #1e293b;
  --color-text-sub: #64748b;
  
  /* Fonts */
  --font-header: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Layout */
  --border-radius: 16px;
  --backdrop-blur: blur(12px);
  --border-style: 1px solid var(--color-border);
}
```

---

## 🔴 2. Luật Thép Kỹ Thuật (Bắt buộc tuân thủ)

1. **⛔ NO INLINE STYLES:** Cấm tuyệt đối thuộc tính `style="..."` trực tiếp trong HTML (trừ trường hợp set vị trí động bằng JS). Toàn bộ định dạng phải viết qua class trong CSS.
2. **⛔ NO HARDCODED HEX COLORS:** Cấm gõ trực tiếp mã màu tĩnh (`#1a1a22`, `#FFF`, `#000`). 100% màu sắc BẮT BUỘC dùng CSS Variables hoặc bảng màu Slate của Tailwind.

---

## 🛠️ 3. Global UI Utilities & Quy Chuẩn Giao Diện Hệ Thống (Cập nhật v2.4.0)

1. **Thanh Menu Sidebar Trái (Ultra-Compact - Không Khoảng Trống Thừa):**
   - **Chiều cao mục menu:** `height: 28px !important; min-height: 28px !important;`
   - **Padding:** `padding: 3px 10px !important;`
   - **Khoảng cách giữa các mục menu liên tiếp:** `margin-bottom: 1px !important;`
   - **Khoảng cách Icon và Chữ:** `gap: 8px !important;`
   - **Font chữ:** `font-size: 12px !important; font-weight: 500;`
   - **Tiêu đề nhóm:** `margin-top: 6px !important; margin-bottom: 2px !important; font-size: 9px !important; font-weight: 700; text-transform: uppercase;`

2. **Thanh Action Bar & Bộ Lọc:**
   - **Thẻ cha bao bọc View:** Bắt buộc dùng `class="flex flex-col gap-4"` (khoảng cách giữa tất cả các layout section cố định đúng 16px).
   - **Thanh Action Bar:** `class="sticky -top-6 -mt-6 -mx-6 px-6 pt-6 pb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-20 flex flex-wrap items-center justify-between gap-4 mb-0 transition-all"` (`margin-bottom: 0 !important;` để khoảng cách từ đáy Action Bar xuống đỉnh KPI Cards đúng bằng **16px**).
   - **Chiều cao tối thiểu:** `min-height: 62px !important;`
   - **Các ô Select / Input / Button trong Action Bar:** Chiều cao cố định `40px !important; font-size: 13px;`

3. **Thẻ Bento KPI (KPI Cards):**
   - **Chiều cao cố định:** `height: 82px !important;`
   - **Viền nhấn:** Chỉ có viền nhấn màu bên trái `border-left-width: 4px !important;`, 3 cạnh còn lại viền Slate mỏng `1px solid #e2e8f0` (Light) / `#1e293b` (Dark).
   - **Typography 3 dòng:**
     - Dòng 1: Tiêu đề 10px uppercase Slate 400
     - Dòng 2: Giá trị số 18px font-black Slate 800 / White
     - Dòng 3: Xu hướng / Chú thích 10px font-semibold

4. **Tiêu Đề Bảng (Table Card Header - Khóa Cứng 50px 1-Line Toàn Bộ 22 Module):**
   - **Thẻ Card chứa bảng:** Bắt buộc dùng `glass-card bento-shadow rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900`.
   - **Chiều cao & Cấu trúc Header Card:** Cố định **`height: 50px !important; min-height: 50px !important; max-height: 50px !important; padding: 0 1.5rem !important;`** (`table-card-header`):
     ```html
     <div class="table-card-header h-[50px] min-h-[50px] max-h-[50px] px-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between flex-wrap gap-4 bg-white dark:bg-slate-900">
       <h4 class="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2 m-0 leading-none">
         <i class="fa-solid fa-list text-slate-400"></i>
         <span>Danh sách [Tên Module]</span>
       </h4>
       <div class="flex items-center gap-3">
         <span id="[id-thong-tin-so-luong]" class="text-xs font-semibold text-slate-400 mr-2">Tổng số: ...</span>
         <button id="[id-btn-excel]" class="h-[28px] px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
           <i class="fa-solid fa-file-excel"></i> Xuất Excel
         </button>
         <button id="[id-btn-pdf]" class="h-[28px] px-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
           <i class="fa-solid fa-file-pdf"></i> Xuất PDF
         </button>
       </div>
     </div>
     ```
   - **Quy tắc viết hoa tiêu đề:** Toàn bộ tiêu đề bảng viết **Title Case** (`Danh sách Trang Phục`, `Danh sách Thiết Bị`, `Danh sách Phiếu Thu Chi`, `Danh sách Tài Khoản Kế Toán`, `Danh sách Lịch Giặt Váy`, `Danh sách Báo Cáo Marketing`), tuyệt đối cấm class `uppercase` trên tiêu đề bảng.

5. **Dòng Tiêu Đề Cột Bảng (`thead th`):**
   - **Chiều cao cố định bắt buộc:** `height: 42px !important; max-height: 42px !important; min-height: 42px !important; line-height: 42px !important;`
   - **Padding:** `padding: 0 0.85rem !important;`
   - **Nền:** `#f1f5f9` (Light) / `#1e293b` (Dark)
   - **Typography:** `font-size: 11px !important; font-weight: 700 !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;`
   - **Màu chữ:** `#475569` (Light) / `#cbd5e1` (Dark)
   - **Icon sắp xếp cột (Sorting):** Ẩn toàn bộ icon 2 tam giác ngược chiều mặc định của DataTables.

6. **Quy Tắc Căn Lề Cột Toàn Hệ Thống (Column Alignment Matching):**
   - **Căn giữa (`text-center`):** STT, Ảnh, Checkbox, SL / SL Tồn / Lượt thuê, Badge Trạng thái, Nút Thao tác. (`th.text-center` $\leftrightarrow$ `td.text-center`).
   - **Căn phải (`text-right`):** Tất cả cột Tiền tệ, Doanh thu, Đơn giá, Thành tiền, Lương, Công nợ, Chi phí, Tỷ lệ %. (`th.text-right` $\leftrightarrow$ `td.text-right`).
   - **Căn trái (`text-left`):** Tất cả cột Tên, Mã, Ngày tháng, Khách hàng, Chi nhánh, Ghi chú, Địa chỉ, Số điện thoại. (`th.text-left` $\leftrightarrow$ `td.text-left`).

7. **Quy Chuẩn Kích Thước Chữ & Phân Cấp Dòng Dữ Liệu (`tbody tr`):**
   - **Chữ chính trong dòng (Primary Text):** Cố định **`11.5px`** (`font-medium text-slate-800 dark:text-slate-100`).
   - **Chữ phụ / Chú thích dòng 2 (Secondary Text):** Cố định **`10px`** `font-normal text-slate-400 dark:text-slate-500`.
   - **Bảo vệ Icon FontAwesome:** Toàn bộ thẻ `i` trong ô dữ liệu và nút thao tác được bảo vệ `font-family: "Font Awesome 6 Free"` để triệt tiêu lỗi ô vuông `[X]`.
   - **Nút Thao Tác (Action Buttons):** Chuẩn icon button 26px phẳng, bo góc 6px, màu xanh lam (`pencil`) và đỏ rose (`trash-can`), không viền khung dày.
   - **Badge Trạng Thái (Status) & Phân Loại (Category) High-Contrast:**
     - **Chiều cao badge:** Cố định **`20px`** (`h-5 flex items-center justify-center`).
     - **Padding:** `px-2.5 py-0.5`.
     - **Font chữ badge:** `font-bold text-[10.5px]` (Title Case / Sentence case, không ép uppercase).
     - **Bo góc:** `rounded-full` (hoặc `rounded-md`).
     - **Độ tương phản cao (High-Contrast):**
       - *Thành công / Hoàn thành / Sẵn sàng / Đã thanh toán:* Nền `bg-emerald-500/10 dark:bg-emerald-500/20`, chữ đậm `text-emerald-700 dark:text-emerald-400`, viền `border-emerald-200 dark:border-emerald-800/30`.
       - *Đang xử lý / Chờ thực hiện / Đang làm / In ấn:* Nền `bg-blue-500/10 dark:bg-blue-500/20`, chữ đậm `text-blue-700 dark:text-blue-400`, viền `border-blue-200 dark:border-blue-800/30`.
       - *Chờ duyệt / Chưa thanh toán / Tạm dừng:* Nền `bg-amber-500/10 dark:bg-amber-500/20`, chữ đậm `text-amber-700 dark:text-amber-400`, viền `border-amber-200 dark:border-amber-800/30`.
       - *Hủy / Hỏng / Quá hạn:* Nền `bg-rose-500/10 dark:bg-rose-500/20`, chữ đậm `text-rose-700 dark:text-rose-400`, viền `border-rose-200 dark:border-rose-800/30`.
       - *Phân loại (Category/Tag):* Nền `bg-slate-100 dark:bg-slate-800`, chữ đậm `text-slate-700 dark:text-slate-300`, viền `border-slate-200 dark:border-slate-700`.
