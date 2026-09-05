# Level 3 Rules — "MAKE IT SCALE"

> ⚠️ Áp dụng khi Founder ở Level 3+. Hãy kiểm tra `goals.md` để xác nhận.

## ⚛️ Atomic Design & Modular Components

> 🔴 Khi phát triển các dự án Frontend lớn (Next.js/React), tổ chức các Component theo hướng Modular hóa rõ rệt để tăng tính tái sử dụng và dễ bảo trì.

**Cấu trúc thư mục Component gợi ý:**
- **Atoms**: Các thẻ HTML cơ bản được custom style (ví dụ: `Button`, `Input`, `Label`, `Badge`). Không chứa business logic.
- **Molecules**: Sự kết hợp của các Atoms để thực hiện một chức năng đơn giản (ví dụ: `SearchInput` = `Input` + `SearchIcon` + `Button`). Nhận data qua props.
- **Organisms**: Các khối giao diện phức tạp chứa business logic hoặc kết hợp nhiều Molecules (ví dụ: `Sidebar`, `BentoGridList`, `ProductCard`). Có thể kết nối trực tiếp với hooks/state.
- **Templates**: Layout chung của trang, định nghĩa cấu trúc hiển thị nhưng chưa nạp data thực tế.
- **Pages**: Trang hoàn chỉnh gọi data và truyền vào template.

## ⚡ Performance Optimization & Advanced Caching

> 🔴 Tối ưu hóa hiệu năng, giảm thiểu thời gian tải trang ban đầu (FCP/LCP < 1.2s) và số lần render thừa.

**Quy tắc tối ưu hóa:**
1. **Lazy Loading & Code Splitting**:
   - Sử dụng dynamic import hoặc React.lazy cho các component nặng hoặc các tab không hiển thị ngay lúc đầu.
   - Chỉ fetch dữ liệu khi UI liên quan thực sự hiển thị trên màn hình (Viewport-based fetching).
2. **Smart Caching (Client & Server)**:
   - Sử dụng lớp Cache Proxy để tránh gọi trùng lặp tài nguyên (giống như tối ưu hóa SpreadsheetApp ở Level 2).
   - Tích hợp SWR / React Query hoặc lưu trữ cục bộ (IndexedDB/LocalStorage) làm cơ chế Offline-first hoặc Stale-While-Revalidate.
3. **Prevent Re-renders**:
   - Sử dụng `useMemo` cho các phép tính toán mảng dữ liệu lớn phức tạp (ví dụ: tổng hợp KPI doanh số).
   - Sử dụng `useCallback` khi truyền hàm callback xuống component con ở sâu để giữ tham chiếu không đổi.

## 🗃️ Advanced State Management & Global Store

> 🔴 Hạn chế prop drilling vượt quá 3 cấp. Chuyển sang quản lý state tập trung khi cần thiết.

**Lựa chọn Quản lý State:**
- Sử dụng **React Context** cho các state cấu hình toàn cục (như Theme dark/light, thông tin User đã đăng nhập, Quyền truy cập).
- Đảm bảo mỗi Context chỉ quản lý một phạm vi hẹp để tránh re-render toàn bộ ứng dụng khi một giá trị nhỏ thay đổi.

## ⚙️ Enterprise Coding Patterns (Thực Dụng)

1. **Adapter / Serializer Pattern**:
   - Khi nhận dữ liệu thô từ API (Google Sheets, Facebook API, External API), luôn đi qua một lớp Adapter để chuẩn hóa tên trường (ví dụ: camelCase) và format kiểu dữ liệu trước khi chuyển vào UI.
2. **Error Boundary & Graceful Degradation**:
   - Bọc các component lớn hoặc các widget bên ngoài trong một `ErrorBoundary` để tránh việc một component lỗi làm sập toàn bộ trang web.

## 📐 Quy Chuẩn Tách Bạch Phân Hệ & Triển Khai Cuốn Chiếu (P0 - Bắt Buộc)

Để chuẩn hóa kiến trúc cho quy mô lớn lên tới 30 module, mọi sự phát triển phải tuân thủ nghiêm ngặt hai quy tắc sau:

### 1. Tách Bạch Cực Đoan (Strict Separation of Concerns)
Mỗi phân hệ (Module) bắt buộc phải được chia tách rõ ràng thành các cấu phần độc lập:
* **Code Tổng (Core System):** Gồm `Shell.html`, `Shell_JS.html`, `Shell_Css.html`, `Code.js` và `Config.js`. Nhiệm vụ duy nhất là điều hướng (Router), phân quyền (Auth) và quản lý tải tài nguyên chung. Tuyệt đối không nhồi business logic của module vào code tổng.
* **Giao diện (Frontend - View):** Tệp `Mod_xxx_View.html` chỉ chứa các thẻ HTML, khung CSS và layout hiển thị.
* **Logic Tương Tác (Client-side Logic):** Tệp `Mod_xxx_Logic.html` chỉ chứa JavaScript chạy ở trình duyệt để bắt sự kiện, render biểu đồ, xử lý form và gọi server.
* **Xử lý Máy chủ (Backend - Server):** Tệp `Mod_xxx_Server.gs` (ở local viết `.js`) chỉ chứa các hàm chạy trên Google Apps Script để truy vấn, tối ưu hóa thuật toán và ghi dữ liệu.
* **Cơ sở dữ liệu (Database Schemas):** Định nghĩa cấu trúc bảng, kiểu dữ liệu và khóa chính tập trung trong `SchemaConfig.js`. Không viết cứng cấu trúc cột trong code logic.

### 2. Triển Khai Cuốn Chiếu Chắc Chắn (Phase-by-Phase Execution)
* Chỉ phát triển và mở khóa (enable) từng phân hệ theo đúng lộ trình đã thống nhất.
* **Cấm tuyệt đối** việc ốp hàng loạt tab chưa hoàn thiện lên giao diện menu. Tab nào chưa được tích hợp hoàn chỉnh tính năng CRUD, tối ưu hiệu năng và test kỹ lưỡng thì **bắt buộc phải ẩn hoàn toàn** khỏi sidebar.
* Làm đến đâu nghiệm thu và kiểm thử (verify) dữ liệu thực tế ghi xuống Google Sheets đến đó trước khi chuyển sang phân hệ tiếp theo.

## 📋 Quy Trình Đăng Ký Cache Khi Tạo Module Mới (Bắt Buộc)

Để tránh lỗi tải chậm 2-3s lặp lại khi bổ sung module mới, lập trình viên bắt buộc phải thực hiện 2 bước đăng ký sau:

1. **Đăng ký CacheProxy ở Client (Shell_JS.html):**
   - Mở file [Shell_JS.html](file:///c:/AntiCode/StudioERP-Webapp/Build-dashboard/Dash_Master_Portal/Shell_JS.html)
   - Tìm đến đối tượng `cacheMap` (nằm ở đầu thẻ script)
   - Thêm dòng ánh xạ hàm lấy dữ liệu của module mới vào cache key tương ứng.
   - *Ví dụ:* `"MOD_TenModuleMoi_getData": "TenModuleMoi"`

2. **Nạp trước dữ liệu ở Server (Code.js) - Nếu module cần thiết:**
   - Mở file [Code.js](file:///c:/AntiCode/StudioERP-Webapp/Build-dashboard/Dash_Master_Portal/Code.js)
   - Tìm hàm `getDashboardHtml` nơi sinh `bootstrapData`
   - Bổ sung khối `try-catch` gọi hàm server lấy dữ liệu của module mới và gán vào `bootstrapData["TenModuleMoi"]`.
   - Điều này giúp client nhận dữ liệu ngay lập tức lúc tải trang lần đầu mà không cần gọi mạng trễ 2-3s.
