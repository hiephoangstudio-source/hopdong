---
name: dashboard-builder
description: Master Skill - Quy chuẩn toàn diện về Thiết kế UI/UX, Biểu đồ Analytics, Form CRUD Type-Safe, Bố cục Layout và Kiến trúc Dữ liệu cho Dashboard & App.
---

# 👑 Master Dashboard & App Builder Guidelines

Skill này là **bộ quy chuẩn tối cao và toàn diện nhất** hợp nhất toàn bộ đặc tả thiết kế UI/UX (Design Tokens), hệ thống biểu đồ (Data Visualization), Form CRUD Type-Safe và kiến trúc xử lý dữ liệu (Data Lake / GAS).

---

## 🎨 1. Design System, Tokens & Quy Chuẩn CSS

### 1.1. Bảng Màu & Design Tokens
*   **Hồng tro (Rose Ash):** `--color-primary: #E8C5C8` | `--color-primary-dark: #D4AFB2` (Ấm áp, lãng mạn).
*   **Champagne Gold:** `--color-secondary: #E6C280` (Sang trọng, kiêu sa).
*   **Sleek Charcoal (Nền tối):** `--color-bg: #121212` | Card: `--color-card: #1E1E1E` | Border: `--color-border: #2D2D2D`.
*   **Trạng thái:** Thành công (`#4ADE80`), Cảnh báo (`#FBBF24`), Nguy hiểm/Đó (`#EF4444`).
*   **Typography Fonts:** Header: `'Playfair Display', serif` | Body: `'Inter', sans-serif`.

### 1.2. 🔴 Luật Thép CSS (Bắt buộc kiểm tra trước khi code)
1.  **🚫 NO INLINE STYLES:** Cấm tuyệt đối thuộc tính `style="..."` trực tiếp trong HTML (trừ set vị trí động bằng JS). Toàn bộ định dạng phải dùng CSS class để tránh xung đột CSS Specificity.
2.  **🚫 NO HARDCODED HEX COLORS:** Cấm dùng mã màu tĩnh (`#1a1a22`, `#FFF`). 100% màu sắc bắt buộc dùng **CSS Variables** (`var(--color-bg)`, `var(--text-main)`) để đảm bảo Dark/Light Theme đồng bộ.

### 1.3. Phân Cấp Hệ Thống Cỡ Chữ (Typography Scale)
*   **Cấp 1 (Tiêu đề lớn):** `13.5px` (In đậm) — Main Header Breadcrumb, Title Modal, Title Drawer.
*   **Cấp 2 (Tiêu đề phụ):** `12px` (In đậm) — Title Card con, nhóm thông tin.
*   **Cấp 3 (Nhãn/Labels):** `9.5px` (In đậm, VIẾT HOA, giãn chữ) — Nhãn Input, nhãn Drawer, Title Sidebar.
*   **Cấp 4 (Nội dung thường):** `11px` (Chữ vừa) — Ô dữ liệu bảng, giá trị Drawer, Input form, Dropdown options.
*   **Cấp 5 (Chú thích/ID):** `9px` — Mã ID (font mono), số trang (Hiển thị 1-15 của 100), Footer.

### 1.4. Hệ Thống Màu Sắc Nút Bấm Đồng Bộ (Action Buttons)
*   **Nút Thêm Mới (Add/Create):** Solid Blue (`#2563eb`) hoặc Gradient Indigo-Blue (`from-blue-600 to-indigo-500`).
*   **Nút Đồng Bộ/Làm Mới (Sync/Refresh):** Teal nhạt (`bg 10%`, text `#0d9488`). Hover chuyển Solid Teal.
*   **Nút Xuất Excel (Export Excel):** Green nhạt (`bg 10%`, text `#16a34a`). Hover chuyển Solid Green.
*   **Nút Xuất PDF / In (Export PDF/Print):** Orange nhạt (`bg 10%`, text `#ea580c`). Hover chuyển Solid Orange.
*   **Nút Lưu Lại (Save/Submit):** Blue đậm (`#2563eb`).
*   **Nút Hủy / Đóng (Cancel/Close):** Viền xám mỏng, nền trắng/tối, text xám (`#64748b`).
*   **Nút Đăng xuất:** Bắt buộc dùng chữ "**Đăng xuất**", màu Đỏ (`#ef4444`, `background: rgba(239, 68, 68, 0.1)`).
*   **Quy tắc "Thêm Trong - Trích Ngoài":** Nút Action chính (Thêm mới) nằm bên **TRÁI** (bên trong), các nút công cụ/đồng bộ nằm bên **PHẢI** (bên ngoài).

---

## 🏛️ 2. Quy Chuẩn Bố Cục Kiến Trúc (Layout Architecture)

Dashboard tiêu chuẩn phải được chia cắt theo 4 tầng chính:

### 2.1. Layer 1: `<Header />` + `<FilterBar />`
*   **Main Header (Đầu trang):** Chiều cao tăng 30% tạo sự thoáng đãng. Bố cục dàn ngang 3 cụm:
    *   **Bên Trái (Brand & Greeting):** Logo icon vuông bo góc + Tiêu đề Dashboard (in đậm, lớn) + Lời chào người dùng. *Cấm hiển thị thời gian cập nhật trên Header*.
    *   **Ở Giữa (Bộ Lọc FilterBar):** Chia thành các ô (boxes) độc lập phủ màu xám nhạt (`bg-slate-50` / `#f1f5f9`), bo góc `0.5rem`, viền nhạt `border: 1px solid`.
        *   *Bộ lọc Thời gian:* BẮT BUỘC dùng `<select>` Dropdown: `Tháng này`, `Tháng trước`, `Quý này`, `Quý trước`, `Năm này`, `Năm trước`, `Tùy chọn`. Chỉ khi chọn `Tùy chọn` mới hiện 2 ô Date Input (Từ ngày - Đến ngày).
    *   **Bên Phải (Actions):** Các nút icon vuông bo góc `w-10 h-10` (`2.5rem x 2.5rem`), chỉ có Icon (không kèm text) + Nút Đăng xuất. *Cấm đặt nút Xuất file trên Header chính*.
*   **Sticky Action Bar:** Khi cuộn trang phải bám khít 100% vào viền Main Header (Zero Spacing Gap). Chiều cao chuẩn các ô Input/Select/Button là **`1.85rem`** (~30px). Ô Select có `padding-right: 1.85rem`, ô Search có `padding-left: 1.95rem`.

### 2.2. Layer 2: `<SummaryCards />` (Bento KPI Cards)
*   **Bố cục ngang bắt buộc (Horizontal Layout):**
    *   *Bên Trái:* Icon Box hình vuông bo góc (`border-radius: 0.75rem`, `w-12 h-12`), màu nền nhạt tone-sur-tone với icon.
    *   *Bên Phải:* Cụm thông tin 3 dòng xếp dọc:
        *   Dòng 1 (Title): `10px` (`font-weight: 600`), viết HOA, màu xám, giãn chữ.
        *   Dòng 2 (Value): `18px` (`font-weight: 700`), số liệu to đậm nổi bật.
        *   Dòng 3 (Trend dynamic): `10px` (`font-weight: 600`), tự động so sánh với kỳ trước (VD: `<i class="fas fa-arrow-up"></i> Tăng (+12.5%) 5.2Tr`).
*   **Left Border Accent:** Thẻ KPI bắt buộc có viền màu bên trái `border-left: 4px solid var(--color-accent)` cùng màu với Icon Box.

### 2.3. Layer 3: `<ChartSection />` (Khu vực biểu đồ Bento)
*   **Full-Width Layout & Bento Grid:** Tận dụng tối đa không gian (`max-width: 100%`, padding nhỏ `0 2rem`). Khoảng đệm thẻ bọc biểu đồ `padding: 0.55rem !important`.
*   **Header Biểu đồ:** Phải có viền phân cách ngang `border-bottom: 1px solid var(--border-color)`. Thẻ Title `<h3>` / `<h4>` ép `margin: 0; line-height: 1; font-size: 12px`.

### 2.4. Layer 4: `<DataTable />` (Bảng dữ liệu tối giản)
*   **Độ đệm dòng siêu gọn (High Density):** Padding `td` ở mức `py-0.12rem px-0.5rem` (~1.5px - 2px), padding `th` ở mức `py-0.24rem px-0.5rem` (~3.5px). Tiêu đề cột `th` cỡ `9.5px` (IN HOẢM), ô dữ liệu `td` cỡ `11px`.
*   **Nút thao tác dòng (Inline Action Buttons):** Vuông cố định `20px x 20px`, bo góc `rounded-[4px]`, icon `9.5px`. Hover nút Sửa đổi sang viền/chữ Xanh dương (`#2563eb`), hover nút Xóa bỏ sang viền/chữ Đỏ (`#ef4444`).
*   **Phân trang Client-side (Pagination):** BẮT BUỘC phân trang tối đa **15 dòng/trang**. Cuối bảng có thông tin số lượng (`Hiển thị 1-15 của 120`), trang hiện tại và nút `[< Trước]` `[Sau >]`.
*   **Nút Xuất File (Excel/PDF):** Đặt trực tiếp tại thanh tiêu đề của từng Data Table.

### 2.5. Detail Offcanvas Drawer (Thanh chi tiết trượt bên phải)
*   **Tràn màn hình (Full-screen Drawer):** Set CSS `width: 100vw; max-width: 100vw;` để tối đa không gian.
*   **Header & Spacing:** Chiều cao Header `2.75rem`. Đệm dọc mỗi dòng `py-0.14rem !important`. Thêm `margin-top: 0 !important` vào từng dòng để vô hiệu hóa class `space-y-3.5` của Tailwind.
*   **Đóng Drawer:** Không dùng Footer chứa nút "Đóng". Chỉ giữ lại nút close "X" ở góc phải Header.
*   **Làm sạch cột:** Tự động ẩn các cột rác của hệ thống (`JSON`, `Lich Su Cap Nhat`, `Nguoi Tao`, `Thoi Gian Tao`, `id_...`). Tự động đổi tên cột từ `snake_case` (`ngay_nhap_kho`) sang Tiếng Việt chuẩn mực (`Ngày nhập`).

---

## 📊 3. Data Visualization & Quy Tắc Biểu Đồ

### 3.1. Quy tắc Pie/Doughnut Chart (Biểu đồ tròn)
*   **Kiểu dáng Doughnut:** Mặc định sử dụng biểu đồ Doughnut (có lỗ rỗng ở giữa `cutout: '50%'`) để tạo cảm giác hiện đại, thanh thoát, không bị đặc tâm quá.
*   **Màu sắc biểu đồ (Vibrant Colors):** Biểu đồ nên sử dụng các màu nổi bật của Tailwind để dễ phân biệt dữ liệu thay vì gò ép theo màu thương hiệu. Bảng màu khuyên dùng: `['#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#a855f7', '#06b6d4']`. BẮT BUỘC dùng viền phân cách (`borderWidth: 2`, `borderColor: chartBorder` thay đổi theo sáng/tối).
*   **Legend (Chú thích):** Đặt bên **trái** (`position: 'left'`) hoặc tùy chỉnh linh hoạt theo layout.
*   **Callout Line cho nhãn nhỏ (<15%):** Nhãn >=15% hiển thị trong biểu đồ (bằng plugin datalabels). Nhãn <15% ẩn datalabels mặc định và vẽ **đường line gấp khúc (dog-leg)** kéo nhãn ra bên ngoài lề (bằng `window.pieCalloutPlugin`). Bắt buộc biểu đồ phải có `layout: { padding: 30 }` để có không gian vẽ đường line.

### 3.2. Quy tắc Bar Chart (Cột đứng & Cột ngang)
*   **Horizontal Bar Chart (Cột ngang):** Dùng `indexAxis: 'y'`. Bắt buộc cho các dữ liệu có **nhãn hiển thị rất dài** (Tên tài khoản kế toán, Tên hạng mục chi phí, Tên chi nhánh, Tên nhà cung cấp). Thêm `layout: { padding: { right: 40 } }`.
*   **Vertical Bar Chart (Cột đứng) — Smart DataLabels:**
    *   Cột ngắn (<15% max): Nhãn hiện **phía trên** cột (`align: 'top'`), màu chữ dùng màu text thường của theme.
    *   Cột cao (>=15% max): Nhãn hiện **bên trong** cột ở sát đỉnh (`align: 'bottom'`, `anchor: 'end'`), màu chữ **trắng** (`#ffffff`).
*   **Compact Number Format (Bắt buộc):** Tất cả nhãn số trên biểu đồ bắt buộc qua hàm `compactFormat(number)` (ví dụ: `1.500.000` -> `1.5Tr`, `1.200.000.000` -> `1.2Tỷ`).

### 3.3. Quy tắc Biểu đồ Tài chính (Financial Dashboards)
*   **Tách biệt Dòng tiền (Cashflow Isolation):** Phân tích Dòng tiền Thu/Chi BẮT BUỘC tách thành 2 biểu đồ cột riêng biệt (Biểu đồ Dòng Tiền Thu nằm cạnh Biểu đồ Dòng Tiền Chi). Không gộp chung.
*   **Màu sắc Tài chính:** Dòng tiền VÀO (Thu, Nợ TK, Lãi) dùng màu Xanh dương (`#3b82f6`) hoặc Xanh lá (`#10b981`). Dòng tiền RA (Chi, Có TK, Lỗ) dùng màu Đỏ (`#ef4444`) hoặc Cam (`#f97316`).
*   **Gộp nhóm Tài khoản (Hierarchical Roll-up):** Đồ thị cơ cấu tài khoản phải gộp/cộng dồn mã con lên **mã cha gốc lớn nhất** ở Server-side trước khi đẩy ra Client.

### 3.4. Nút Zoom Biểu Đồ (Custom Toggle)
*   Tự tạo nút Zoom riêng (Toggle phóng to / thu nhỏ). Khi phóng to: Thêm class `.panel-zoomed` (`position: fixed`, z-index cao, full màn hình).
*   **Khi THU GỌN về bình thường:** BẮT BUỘC gọi `renderCharts()` (destroy + re-create) thay vì chỉ `chart.resize()` để chống lỗi canvas cache.

---

## 📝 4. Form CRUD Type-Safe & Quy Tắc Mapping

### 4.1. Thứ tự Ưu Tiên Cấu Hình Field (User Override Priority)
Trước khi sinh code Form CRUD, kiểm tra các ưu tiên tùy chỉnh của người dùng:
1.  **Input Type Override:** Nếu user yêu cầu "Radio" cho Enum -> Sinh `<RadioGroup>` thay vì `<Select>`.
2.  **Data Source Override:** Nếu user cung cấp API custom (`/api/active-users`) -> Dùng endpoint đó trong hook fetch data.
3.  **Rich Text:** Nếu field dạng String cần soạn thảo -> Dùng Rich Text Editor.

### 4.2. Bảng Mapping Kiểu Dữ Liệu (Strict Defaults)

| DB / Schema Type | UI Component | Input Type | Validation (Zod Schema) |
| :--- | :--- | :--- | :--- |
| `String` | `<Input />` | `text` | `z.string()` |
| `String` (Văn bản dài) | `<Textarea />` | - | `z.string()` |
| `Int` | `<Input />` | `number` | `z.number().int()` |
| `Float` / `Decimal` | `<Input />` | `number` | `z.number()` |
| `Boolean` | `<Switch />` hoặc `<Checkbox />` | - | `z.boolean()` |
| `DateTime` | `<DatePicker />` | - | `z.date()` |
| `Json` | `<CodeEditor />` / `<Textarea />` | - | `z.any()` |
| `Enum` | `<Select />` (Hardcoded Options) | - | `z.enum([...])` |

### 4.3. Quy Tắc Xử Lý Khóa Ngoại & Quan Hệ (Foreign Key Relationships)
1.  **Phát hiện:** Field dạng Khóa ngoại (ví dụ: `roleId` có quan hệ với `role`) **TUYỆT ĐỐI KHÔNG** dùng Input text/number đơn thuần.
2.  **Thành phần UI:** Dùng `<Select />` hoặc `<Combobox />` (có ô tìm kiếm).
3.  **Data Source:** BẮT BUỘC sinh hook (`useQuery` hoặc `useEffect`) để tải danh sách quan hệ từ API (VD: `GET /api/roles`).
4.  **Binding:** `Value: role.id` | `Label: role.name` (hoặc `title`, `email`).

### 4.4. Quy Tắc Validation (Zod / Custom)
*   **Bắt buộc:** Nếu field NOT null -> `z.string().min(1, "Trường này là bắt buộc")`.
*   **Tùy chọn:** Nếu field Nullable -> `.optional()`.
*   **Email / Phone:** Thêm `.email()` hoặc regex kiểm tra số điện thoại Việt Nam.
*   **Xử lý lỗi Unique:** Bắt lỗi trùng lặp dữ liệu từ Backend và hiển thị thông báo thân thiện trên UI.

---

## ⚡ 5. Data Architecture & Infrastructure (GAS / Node / React)

### 5.1. Client-Side Data Lake Architecture (Tốc độ tức thì 0s)
*   **Kiến trúc 2 tầng:**
    *   *Server-side:* Hàm `loadRawData()` được gọi **1 LẦN DUY NHẤT** khi khởi tạo app. Đọc dữ liệu, lọc phân quyền và trả về JSON tổng quan.
    *   *Client-side:* Lưu biến `rawData`. Khi người dùng đổi bộ lọc (Thời gian, Chi nhánh, Phòng ban) -> Hàm `applyFilters()` chạy hoàn toàn trên Client, tính toán KPI và render lại UI **ngay lập tức trong 0 giây chờ đợi**.
*   **Nút "Đồng bộ":** Là cơ chế DUY NHẤT để tải lại dữ liệu mới từ Server. Khi bấm: Hiện thông báo Toast nhỏ chính giữa màn hình (không làm mờ hay che khuất Dashboard), tải xong tự ẩn.

### 5.2. Google Apps Script `DATA_CACHE` Singleton
*   Mọi Dashboard trên GAS BẮT BUỘC đọc dữ liệu qua hàm Singleton `getSheetData2D(ss, sheetName)`. Trong 1 lần thực thi, tab `DATA_CACHE` chỉ bị đọc **1 lần duy nhất** vào bộ nhớ `_globalDataCache`.
*   Luôn có cơ chế Fallback đọc raw sheet nếu `DATA_CACHE` chưa tồn tại.
*   **Bảo mật:** Bảng nhân viên (đọc mật khẩu) PHẢI đọc trực tiếp từ raw sheet, KHÔNG qua `DATA_CACHE`.

### 5.3. Xác Thực Stateless (Stateless Authentication)
*   **CẤM:** Không dùng `CacheService.getUserCache()` trên GAS khi deploy `Execute as: Me` vì gây rò rỉ phiên làm việc giữa các người dùng.
*   **Chuẩn Stateless:** Lưu `userProfile` trong `localStorage`. Luồng `doGet` luôn trả về form Đăng nhập, Client tự kiểm tra `localStorage` để gửi yêu cầu inject HTML Dashboard. Khi đăng xuất: Xóa `localStorage` trước rồi mới bơm lại HTML Login.

---

## 🐞 6. Danh Sách Gotchas Phổ Biến Cần Tránh (Checklist)

1.  **Lỗi Layout Shift của ảnh trong DataTable:** BẮT BUỘC set cứng `width` và `height` trên thẻ `<img>` (vd: `width="40" height="40"`).
2.  **Lỗi Crash JS (Cannot read properties of null):** Khi xóa một Node Element trên HTML, phải Audit xóa sạch toàn bộ lệnh `document.getElementById('id-bi-xoa')` ở file JS.
3.  **Lỗi Identifier has already been declared khi dùng `document.write()`:** Trong SPA GAS, khi chuyển trang bằng `document.write()`, biến toàn cục cũ không bị xóa. BẮT BUỘC khai báo biến toàn cục bằng từ khóa `var` (không dùng `let`/`const` ở global scope).
4.  **Lỗi OAuth khi deploy `clasp` mới:** Mỗi khi tạo project GAS mới qua `clasp push`, BẮT BUỘC phải mở Editor chạy thử 1 hàm (`doGet`) để duyệt cấp quyền OAuth trước khi tạo Deployment.
5.  **Lỗi Thiếu Ngày trong Biểu đồ Chuỗi thời gian (Time-series):** BẮT BUỘC tạo mảng ngày liên tục từ `startDate` đến ngày hiện tại, lặp qua mảng chuẩn để gán giá trị `0` cho những ngày không có phát sinh dữ liệu.
6.  **Lỗi Chart bị Resize liên tục hoặc bị khuyết:** TUYỆT ĐỐI KHÔNG dùng `flex-1 h-full` cho thẻ bọc `<canvas>` (`.chart-wrapper`) nếu parent không giới hạn chiều cao tĩnh. Bắt buộc đặt chiều cao cố định (vd: `height: 320px;`) cho wrapper.