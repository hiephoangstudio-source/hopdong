# TIẾN ĐỘ DỰ ÁN (06/09/2026)

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
- Live Deployment: `Version 873` hoạt động ổn định trên Google Apps Script Live Exec.
- **Khắc phục triệt để hiển thị Logo Chi Nhánh (Chuẩn đồ họa quốc tế Checkerboard & Rim-Light)**:
  + **Root Cause**: Logo của chi nhánh `THUBLUE MAKEUP` (`HT`) gồm 88% nét chữ màu TRẮNG tinh trên nền PNG trong suốt. Nền thẻ cũ `bg-white` làm mất tương phản; đồng thời khi gán background trực tiếp vào thẻ `img` sẽ làm mất hiệu ứng `drop-shadow` nét chữ theo chuẩn W3C.
  + **Giải pháp hoàn thiện (Version @873)**: Tách riêng container bọc ngoài mang hoa văn Checkerboard (ô bàn cờ caro nhỏ 12px) thanh lịch chuẩn Photoshop/Figma (slate-100/slate-200 ở Light Mode, slate-900/slate-800 ở Dark Mode). Thẻ `img` giữ nguyên nền trong suốt và trang bị bóng đổ 360 độ ôm sát từng nét chữ kết hợp hiệu ứng Rim-Light bảo vệ cả logo màu đen.
  + **Xác minh thực tế trên Live Version @873**: Đã kiểm tra trực quan tự động bằng Playwright trên Live Web App ở cả Light Mode & Dark Mode. Logo chữ trắng của Thu Blue Makeup hiển thị cực kỳ sắc nét, nổi bật và đẹp mắt ở cả Drawer Chi Tiết và Form Chỉnh Sửa.

---

## 🎯 VIỆC TIẾP THEO
- Báo cáo Founder về kết quả hoàn thiện Version @873 kèm PROOF BLOCK và ảnh chụp thực tế.
- Chờ Founder kiểm tra và xác nhận.


