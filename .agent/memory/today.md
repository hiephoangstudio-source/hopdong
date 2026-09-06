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

## ✅ TRẠNG THÁI HIỆN TẠI (Version @865 Live)
- **Module Dịch Vụ (DichVu)**:
  + Cột Trạng thái trong Form & Drawer đã map chuẩn hiển thị Tên trạng thái: `"Đang hoạt động"` / `"Dừng hoạt động"` (thay vì boolean thô `true`/`false`).
  + Tính năng tự reset Loại Dịch Vụ *: Khi người dùng đổi Hạng Mục, ô Loại Dịch Vụ tự động reset về rỗng `-- Chọn Loại Dịch Vụ --`.
  + Khắc phục triệt để lỗi quét nhầm vật tư xưởng in (Album, Khung...): Hệ thống đã loại bỏ hoàn toàn các nhóm xưởng in. Đối với Hạng mục "Sản phẩm", dropdown hiển thị đúng phân loại nghiệp vụ thực tế của Studio là `"Nâng cấp"` (hoặc các loại sản phẩm thực tế trong bảng dịch vụ).
  + Tự động chuyển đổi giao diện nhập liệu: Khi Hạng mục là "Sản phẩm", ẩn các trường Lương chụp/make/photoshop chi tiết và chỉ hiển thị 1 trường "LƯƠNG PHÁT SINH". Khi Hạng mục là "Dịch vụ", tự động hiện lại đầy đủ các trường lương chi tiết và template mô tả buổi chụp.
- **Toàn hệ thống**:
  + Xuất Excel `.xlsx` và Xuất PDF tiếng Việt chuẩn vector trên toàn bộ các module.
  + [🔒 LOCKED] Phân Hệ In Hợp Đồng
  + [🔒 LOCKED] Phân Hệ In Chứng Từ & Phiếu Thu Chi
  + [🔒 LOCKED] Module Khách Hàng
  + [🔒 LOCKED] Module Chi Tiết Đơn Hàng
- Live Deployment: `Version 865` hoạt động ổn định trên Google Apps Script Live Exec.

---

## 🎯 VIỆC TIẾP THEO
- Đã khóa chỉnh sửa 5 module/phân hệ hoàn hảo.
- Sẵn sàng chuyển sang module hoặc tính năng tiếp theo theo chỉ thị của Founder Hiệp Hoang.
