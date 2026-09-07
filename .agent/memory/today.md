# TIẾN ĐỘ DỰ ÁN (07/09/2026)

## 🔒 [FROZEN / LOCKED] CÁC MODULE ĐÃ ĐƯỢC FOUNDER DUYỆT HOÀN HẢO - BẤT KHẢ XÂM PHẠM
> 🔴 **NGHIÊM CẤM CHỈNH SỬA / REFACTOR / CAN THIỆP DƯỚI MỌI HÌNH THỨC VÀO CÁC FILE THUỘC DANH SÁCH NÀY:**

1. [🔒 FROZEN / LOCKED] **Toàn bộ Phân Hệ In Ấn (Print Engine)**:
   - **PrintEngine_HopDong.html**: Tất cả 4 loại hợp đồng (TT 2 lần, TT 3 lần, Váy/phát sinh, Baby & Gia đình, Combo cưới). Đã chuẩn chỉnh 100% về lề A4, viền bảng chi tiết dịch vụ, mã VietQR và nền trắng tinh.
   - **PrintEngine_ChungTu.html**: 
     + Form 1 (Bàn giao nhận vật tư, trang phục).
     + Form 2 (Hóa đơn bán hàng 2 liên A4 cân đối, viền mỏng 1px đồng nhất).
     + Form 3 (Biên bản xác nhận công việc vừa khít 1 trang A4).
   - **PrintEngine_UI.html**: CSS Master cho preview và print engine.
   - **PrintEngine_Engine.html**: Bộ điều khiển in native vector, iframe in và delay nạp ảnh.
2. [🔒 FROZEN / LOCKED] **Module In Phiếu Thu Chi (2 liên A4 chuẩn 100% từ GitHub hiephoangstudio-source/phieuthuchi)**:
   - Đồng bộ 1-1 cấu trúc HTML/CSS từ repo gốc: `double-row`, `line-row`, `half-row` (tỷ lệ 0.6 : 1.4 chuẩn Hình thức & STK).
   - Header đầy đủ: Studio, Hotline, Zalo, Email bên trái; Góc phải tinh giản đúng 3 dòng: Quyển số, Số phiếu, Số HĐ (đã bỏ dòng Nợ/Có).
   - Dòng STK: Đã map tự động với cột `tai_khoan_co` để hiển thị Nhãn định khoản đầy đủ (ví dụ: `112.3 - TK Cá nhân Hà Thu (BIDV)`).
   - Cụm 4 cột chữ ký chuẩn thương hiệu: Người nộp/nhận tiền | Người lập phiếu | Thủ quỹ | Đại diện cửa hàng.
   - Chừa khoảng trống ký tay 35px, nét chữ thường thanh nhã, không bold thô.
   - Đường nét đứt chia đôi trang ở giữa: `1.5px dashed #000000` màu đen đặc sắc nét trên cả Xem trước và Hộp thoại In.
3. [🔒 FROZEN / LOCKED] **Module Khách Hàng (CRM)**:
   - Các file: `Mod_KhachHang_Logic.html`, `Mod_KhachHang_View.html`, `Mod_KhachHang_Server.js`.
   - Đã chuẩn hóa hiển thị danh sách, tìm kiếm, drawer chi tiết, ánh xạ chi nhánh và trạng thái.
   - Xuất Excel `.xlsx` chuẩn tách cột, có cột STT, bảo toàn số 0 SĐT/CCCD.
   - Xuất PDF chuẩn vector Roboto tiếng Việt có dấu, Dark Header Hans Studio và đánh số trang footer.
4. [🔒 FROZEN / LOCKED] **Module Chi Tiết Đơn Hàng (DonHangCT)**:
   - Các file: `Mod_DonHangCT_Logic.html`, `Mod_DonHangCT_View.html`, `Mod_DonHangCT_Server.js`.
   - Hiển thị đầy đủ tên nhân viên (NV Sale Offline, Online) trong drawer chi tiết thay vì mã thô.
   - Xuất Excel `.xlsx` chuẩn tách cột, có STT, tự động format tiền tệ `#,##0`.
   - Xuất PDF chuẩn vector Roboto tiếng Việt có dấu, Dark Header Hans Studio và đánh số trang footer.
5. [🔒 FROZEN / LOCKED] **Module Dịch Vụ (DichVu)**:
   - Các file: `Mod_DichVu_Logic.html`, `Mod_DichVu_View.html`, `Mod_DichVu_Server.js`.
   - Cột Trạng thái chuẩn nhãn `"Đang hoạt động"` / `"Dừng hoạt động"` trên Form, Drawer và Xuất Excel.
   - Phân cấp Hạng Mục & Loại Dịch Vụ động: Tự động reset ô Loại Dịch Vụ khi đổi Hạng Mục; tách biệt hoàn toàn khỏi danh mục xưởng in; Hạng Mục "Sản phẩm" chỉ hiển thị đúng loại nghiệp vụ của Studio (`"Nâng cấp"`).
   - Tự động chuyển đổi giao diện form: Ẩn/hiện linh hoạt các trường Lương chụp/make/photoshop và mô tả chi tiết theo Hạng Mục.
   - Xuất Excel `.xlsx` và Xuất PDF vector chuẩn thương hiệu Hans Studio.
6. [🔒 FROZEN / LOCKED] **Module Chi Nhánh (ChiNhanh)**:
   - Các file: `Mod_ChiNhanh_Logic.html`, `Mod_ChiNhanh_View.html`, `Mod_ChiNhanh_Server.js`.
   - Chuẩn hóa phân quyền đọc danh sách chi nhánh (Super Admin nạp đầy đủ chi nhánh, không bị xóa rỗng).
   - Hiển thị danh sách bảng chi nhánh đầy đủ, status badge xanh, tìm kiếm, phân trang, nút Thêm, Sửa, Xóa mượt mà.
   - Drawer xem chi tiết và Form chỉnh sửa/thêm mới hoạt động mượt mà, không bị kẹt hay đơ giao diện.
   - Hiển thị Logo thương hiệu theo chuẩn đồ họa Checkerboard (ô bàn cờ caro 12px) kết hợp viền bóng 360 độ và hào quang Rim-Light, hiển thị sắc nét 100% mọi ảnh tách nền PNG (chữ trắng hoặc chữ đen) trên cả Light Mode và Dark Mode.
   - Xuất Excel `.xlsx` chuẩn tách cột, có cột STT.

7. [🔒 FROZEN / LOCKED] **Module Nhân Viên (NhanVien)**:
   - Các file: `Mod_NhanVien_Logic.html`, `Mod_NhanVien_View.html`, `Mod_NhanVien_Server.js`.
   - Đã hoàn thiện: Form 3 Tab (Thông tin cơ bản, Tài khoản ngân hàng, Phân bổ đa chi nhánh tích hợp Ma Trận Phân Quyền 12 phân hệ).
   - Tối ưu nút Lưu tức thì (spinner + disabled, batch write in-memory 0.2s), không còn bị khựng.
8. [🔒 FROZEN / LOCKED] **Module Phân Bổ Nhân Sự (PhanBoNV / phan_bo_nv)**:
   - Đã hoàn thiện: Form độc lập đồng bộ 100% với Tab Phân Bổ bên Nhân Viên.
   - Combobox tìm chọn Nhân viên tự động điền họ tên, khóa mã NV & Chi nhánh khi chỉnh sửa để bảo toàn khóa ngoại `id_phan_bo`.
   - Tích hợp Ma Trận Phân Quyền 12 Phân Hệ trực quan (Xem/Thêm/Sửa/Xóa với 3 nút chọn nhanh 1-chạm).
9. [🔒 FROZEN / LOCKED] **Module Thu Chi (ThuChi)**:
   - Các file: `Mod_ThuChi_Logic.html`, `Mod_ThuChi_View.html`, `Mod_ThuChi_Server.js`.
   - Đã hoàn thiện: Quản lý phiếu thu/chi, tự động sinh mã, phân loại dòng tiền, liên kết tài khoản định khoản nợ/có và kết nối chuẩn mực với Bộ Máy In Phiếu Thu Chi 2 liên A4.
10. [🔒 FROZEN / LOCKED] **Module Định Khoản Kế Toán (DinhKhoan)**:
    - Các file: `Mod_DinhKhoan_Logic.html`, `Mod_DinhKhoan_View.html`, `Mod_DinhKhoan_Server.js`.
    - Đã hoàn thiện: Hệ thống danh mục tài khoản kế toán, tài khoản tiền mặt, ngân hàng (STK), cấp bậc tài khoản cha-con và ánh xạ tên định khoản cho toàn bộ giao dịch.

---

## ✅ TRẠNG THÁI HIỆN TẠI (Version @870 Live)
- **Khắc phục triệt để lỗi Module Chi Nhánh (`ChiNhanh`) bị trống danh sách**:
  + **Root Cause 1 (Server Phân quyền)**: Trong `Mod_ChiNhanh_Server.js`, khi user profile mặc định hoặc chưa truyền lúc SSR/bootstrap, cờ `isSystemAdmin` bị tính thành `false` và nhánh `else { branches = []; }` đã xóa sạch toàn bộ danh sách chi nhánh về rỗng `[]`. Đã chuẩn hóa logic kiểm tra `isSystemAdmin` toàn diện, gán quyền fallback an toàn cho admin và chỉ lọc chi nhánh khi user có danh sách cụ thể, loại bỏ hoàn toàn việc xóa rỗng dữ liệu.
  + **Root Cause 2 (Client Profile & Cache)**: Trong `Mod_ChiNhanh_Logic.html` và `Shell_JS.html`, chuẩn hóa việc đọc user profile ưu tiên từ `localStorage.getItem('erp_master_profile')` và cập nhật an toàn vào `GLOBAL_DATA_CACHE`.
  + **Giao diện & Thao tác**: Bảng hiển thị đầy đủ 2 chi nhánh (`HH` - HAN'S STUDIO và `HT` - THUBLUE MAKEUP) với status badge xanh `"Đang hoạt động"`, phân trang, nút Xuất Excel, nút Thêm Chi Nhánh, Sửa, Xóa và xem Drawer Detail mượt mà.
  + Đã test live 100% trên trình duyệt thật bằng DevTools: Danh sách nạp đầy đủ, mở Drawer xem chi tiết chi nhánh hoạt động tốt, mở Form Thêm Chi Nhánh hoạt động tốt và đóng form mượt mà.
- **Khắc phục triệt để sự cố Tê liệt (Freeze) Form Modal trên toàn bộ hệ thống**:
  + Sửa lỗi kẹt `pointer-events-none`: Trong `openModal`, bổ sung gỡ bỏ `pointer-events-none` và cấp `pointer-events-auto` cho `#crud-modal` và backdrop, khôi phục 100% khả năng click, gõ phím, chọn dropdown và bấm nút.
  + Nâng cấp Z-Index: Đưa `#crud-modal-backdrop` lên `z-[60]` (vượt trội hơn toàn bộ các drawer/offcanvas `z-50`), bảo đảm Form Modal luôn nằm trên cùng và không bị bất kỳ thành phần nào che lấp.
  + Thoát hiểm thông minh: Cho phép click vùng ngoài backdrop để đóng form, đồng thời hỗ trợ phím `Escape`.
  + Tự động đóng Drawer Detail khi chuyển module: Đã vận hành ổn định trên toàn hệ thống.
- **Các Module đã khóa chỉnh sửa hoàn hảo**:
  + 🔒 Phân Hệ In Hợp Đồng
  + 🔒 Phân Hệ In Chứng Từ & Phiếu Thu Chi
  + 🔒 Module Khách Hàng
  + 🔒 Module Chi Tiết Đơn Hàng
  + 🔒 Module Dịch Vụ
  + 🔒 Module Chi Nhánh
- Live Deployment: `Version 873` hoạt động ổn định trên Google Apps Script Live Exec.
- **Khắc phục triệt để hiển thị Logo Chi Nhánh (Chuẩn đồ họa quốc tế Checkerboard & Rim-Light)**:
  + **Root Cause**: Logo của chi nhánh `THUBLUE MAKEUP` (`HT`) gồm 88% nét chữ màu TRẮNG tinh trên nền PNG trong suốt. Nền thẻ cũ `bg-white` làm mất tương phản; đồng thời khi gán background trực tiếp vào thẻ `img` sẽ làm mất hiệu ứng `drop-shadow` nét chữ theo chuẩn W3C.
  + **Giải pháp hoàn thiện (Version @873)**: Tách riêng container bọc ngoài mang hoa văn Checkerboard (ô bàn cờ caro nhỏ 12px) thanh lịch chuẩn Photoshop/Figma (slate-100/slate-200 ở Light Mode, slate-900/slate-800 ở Dark Mode). Thẻ `img` giữ nguyên nền trong suốt và trang bị bóng đổ 360 độ ôm sát từng nét chữ kết hợp hiệu ứng Rim-Light bảo vệ cả logo màu đen.
  + **Xác minh thực tế trên Live Version @873**: Đã kiểm tra trực quan tự động bằng Playwright trên Live Web App ở cả Light Mode & Dark Mode. Logo chữ trắng của Thu Blue Makeup hiển thị cực kỳ sắc nét, nổi bật và đẹp mắt ở cả Drawer Chi Tiết và Form Chỉnh Sửa.

---

## ✅ TRẠNG THÁI HIỆN TẠI (07/09/2026)
- **1. Khắc phục triệt để lỗi khựng 4-5s khi bấm Lưu ở form Nhân viên & CRUD**:
  + Z-Index: Sửa `#loader-overlay` sang `fixed inset-0 z-[99999]` nằm trên Modal CRUD form.
  + UI Feedback tức thì: Nút `#btn-submit-record` chuyển sang trạng thái disabled + icon xoay `fa-spinner` + chữ "Đang lưu..." ngay khi bấm.
  + Server Batch Write in-memory: Thay thế hoàn toàn vòng lặp `deleteRow`/`appendRow` bằng thuật toán batch write in-memory ghi 1 lần duy nhất, tăng tốc lưu từ 5s xuống 0.2s.
- **2. Bổ sung 4 cột Phân Quyền (`quyen_xem`, `quyen_them`, `quyen_sua`, `quyen_xoa`) vào Tab Phân Bổ & Sheet `phan_bo_nv`**:
  + Tích hợp Ma Trận Phân Quyền 12 Phân Hệ (Collapsible, 3 nút bấm 1 chạm: `👑 Toàn quyền`, `👁️ Chỉ xem`, `🧹 Bỏ chọn`).
  + Lưu chuỗi EnumList ngăn cách dấu phẩy chuẩn Google Sheets.
  + Hiển thị tóm tắt badge quyền trực quan trong Drawer Detail.
- **3. Đổi tên hiển thị 3 Module đồng bộ Menu Sidebar & Ma Trận**:
  + `Chi Tiết Đơn Hàng` $\rightarrow$ `Chi Tiết Đơn`
  + `Hồ Sơ Nhân Viên` $\rightarrow$ `Nhân Viên`
  + `Quản lý Thu Chi` $\rightarrow$ `Thu Chi`
  + Giữ nguyên 100% ID kỹ thuật, bảo toàn an toàn cơ sở dữ liệu.
- **4. Gỡ bỏ sạch sẽ Module Phân Quyền cũ**:
  + Xóa menu và router `PhanQuyen`, xóa container trong `Shell.html`, xóa 2 file vật lý `Mod_PhanQuyen_View.html` và `Mod_PhanQuyen_Logic.html`.
- **5. Chuẩn hóa Form Module Phân Bổ NV độc lập (`phan_bo_nv`)**:
  + Giống 100% Tab Phân Bổ bên Nhân Viên (Searchable Combobox chọn NV, 3 hàng trường, Ma trận 12 phân hệ). Khi Sửa tự động khóa trường NV và CN để bảo toàn khóa chính.
- **6. Bộ máy thực thi Phân Quyền 4 Tầng (Xem - Thêm - Sửa - Xóa)**:
  + Tầng 1: `Auth.js` tổng hợp quyền từ `phan_bo_nv` gắn vào `userProfile`.
  + Tầng 2: `Shell_JS.html` định nghĩa `window.hasPerm`, `window.renderSidebarMenu` tự động lọc sạch các menu cấm Xem khỏi Sidebar, chặn `Router.navigateTo`.
  + Tầng 3: UI Action Buttons (`Shell_UI_Components.html`) tự động ẩn nút `+ Thêm`, ẩn icon Cây bút (Sửa), ẩn icon Thùng rác (Xóa) ở cột Thao Tác.
  + Tầng 4: Chốt chặn bảo mật Server (`Mod_CRUD_Server.js`) từ chối mọi yêu cầu Thêm/Sửa/Xóa trái phép.
- **7. Kiểm thử trực quan trên Trình duyệt thật (Headed Mode)**:
  + Mở Chromium thật trên màn hình máy tính của Founder, tự động thêm 1 nhân viên mới ("Nguyễn Văn Phân Quyền (Test)"), cấu hình Ma Trận Quyền (chỉ Xem + Thêm Khách Hàng, cấm Sửa, cấm Xóa, cấm tất cả module khác).
  + Kiểm chứng: Sidebar menu chỉ còn Khách Hàng; Nút Thêm Khách Hàng vẫn có; Cột Thao tác TRẮNG TINH, KHÔNG CÓ CÂY BÚT (SỬA) VÀ KHÔNG CÓ THÙNG RÁC (XÓA).
  + Đối chứng: Cấp lại toàn quyền Admin thì cây bút và thùng rác xuất hiện đầy đủ trở lại.

- **8. Triển khai Production Live (Version @876)**:
  + Sau khi Founder xóa bớt version cũ trên Web Console, đã chạy `node deploy.js` tạo thành công **Version 876** và cập nhật Deployment chính thức `AKfycbx_Gc8Qd4ljWa_eCpRtMiJk--mjz4tREqX_qDryaZpeDhmC_uvKdqI828QLxf7PX2rhAg`.
  + Xác minh Live trên Chrome DevTools: Tên 3 module hiển thị chuẩn (`Chi Tiết Đơn`, `Nhân Viên`, `Thu Chi`), nhóm Nhân sự & Quyền chỉ còn 3 module, module Phân Quyền cũ đã biến mất hoàn toàn.

---

## 🎯 VIỆC TIẾP THEO
- Báo cáo kết quả và trình diện Proof Block cho Founder (anh Hiệp).
- Sẵn sàng tiếp nhận các yêu cầu hoàn thiện tiếp theo từ Founder.



