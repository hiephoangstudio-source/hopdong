# TIẾN ĐỘ DỰ ÁN (08/09/2026)

## 🛑 KỶ LUẬT TỐI THƯỢNG TỪ FOUNDER HIỆP (KHẮC GHI VÀO NÃO)
> 🔴 **"TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM GÌ KHI KHÔNG CÓ CĂN CỨ, TÀI LIỆU RÕ RÀNG."**
> - Nghiêm cấm phán bừa, suy đoán mò mã trạng thái hay quy tắc hệ thống (Ví dụ: phán bừa mã `HT01` mà không tra bảng `quy_trinh` là vi phạm kỷ luật nghiêm trọng).
> - Mọi nhận định, đề xuất, dòng code viết ra BẮT BUỘC phải đối soát trực tiếp từ bảng thật, dữ liệu thật, tài liệu hoặc ảnh chụp cấu hình AppSheet thật.
> - Không biết/chưa rõ $\rightarrow$ Báo cáo trung thực, hỏi rõ ràng, không được tự ý bịa dữ liệu giả định.

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
- **9. Tinh Gọn Module Lịch Công Việc & Chuẩn Hóa Tiếng Việt Có Dấu (Version @880 Live)**:
  + **Sửa lỗi ngầm nguy hiểm (Critical Parser Bug)**: Thay `accept="... image/*"` bằng danh sách MIME tường minh `image/png, image/jpeg, image/jpg, image/webp, image/svg+xml`, xử lý dứt điểm lỗi trình biên dịch Google Apps Script nuốt chửng 2,158 dòng code do hiểu nhầm ký tự `/*` là ghi chú chưa đóng.
  + **Sửa cú pháp lồng khối if**: Tách biệt rõ ràng khối cấu hình thứ tự cột của `dinh_khoan` và `lich_cong_viec`.
  + **Khóa chính đồng nhất**: Sửa triệt để `id_lich_cong_viec` thành `id_cong_viec` trong `Mod_DonHang_Server.js`, `Mod_Luong_Server.js` và bổ sung fallback an toàn trong `Mod_Luong_Logic.html`.
  + **Chuẩn hóa 100% Tiếng Việt có dấu**: Đổi toàn bộ 22 nhãn trường dữ liệu sang Tiếng Việt có dấu chuẩn mực, trang trọng chuẩn nghiệp vụ Studio cưới & makeup.
  + **Ẩn 9 trường kỹ thuật backend**: `lich_su_cap_nhat`, `nguoi_tao`, `ngay_tao`, `nguoi_cap_nhat`, `ngay_cap_nhat`, `id_luong`, `hang_muc`, `id_dich_vu`, `ten_dich_vu` được ẩn khỏi form nhập liệu để hệ thống tự xử lý ngầm.
  + **Tích hợp Show_If động thông minh**: Form tự co giãn theo từng loại việc (Lịch thử đồ hiện & bắt buộc chọn chi tiết đồ thử; Lịch Photoshop ẩn giờ/địa điểm, hiện hạn trả ảnh demo; Lịch chụp/make hiện địa điểm, link nhóm Zalo và lương thợ; Lịch tư vấn và lấy/trả đồ ẩn lương thợ).
  + **Bảng 6 Cột Đa Năng Thông Minh**: Thu gọn từ 11 cột dài sang 6 cột hiện đại không cần cuộn ngang (Công việc & Khách hàng, Thời gian & Địa điểm, Nhân sự phụ trách, Chi nhánh & Tiến độ, Tiền lương, Thao tác).
  + **Deploy Version 880 & Verify Live**: Push 86 files và triển khai Version 880 thành công, xác minh tương tác tự động 100% bằng Playwright.

- **10. Chuyển Thể Trọn Bộ 4 Automation Bot Tạo Lịch & 3 Cascade Delete Bots Từ Bảng Cha don_hang (Version @883 Live)**:
  + **Kiến trúc AppSheet chuẩn xác**: Xác thực từ ảnh hệ thống của Founder, toàn bộ 4 Automation Bot tạo lịch và 3 Bot xóa lịch được kích hoạt từ bảng cha `don_hang`.
  + **Bộ 4 Automation Bot Tạo Lịch (Server-side Hook)**:
    * Bot 8 (`Tự động tạo Lịch tư vấn`): Tự sinh ngay khi lưu đơn hàng mới (`ngay_bat_dau = TODAY()`, `trang_thai = "LV01"`, `luong_nhan_vien = 0`, địa điểm để trống).
    * Bot 9 (`Tự động tạo Lịch chụp`): Kích hoạt cho từng dịch vụ `don_hang_ct` loại `"Dịch vụ"`, kế thừa ngày/giờ chụp, địa điểm và tra cứu định mức lương chụp từ bảng `dich_vu`.
    * Bot 10 (`Tự động tạo Lịch makeup`): Kích hoạt cho dịch vụ, kế thừa ngày/giờ chụp và tra cứu lương make từ `dich_vu`.
    * Bot 11 (`Tự động tạo Lịch photoshop`): Kích hoạt cho dịch vụ, ẩn giờ/địa điểm theo quy tắc Show_If và tra cứu lương PTS từ `dich_vu`.
  + **Cơ chế chống trùng lặp (Strict Idempotency)**: Đảm bảo khi sửa hoặc lưu lại đơn hàng nhiều lần, số lượng lịch vẫn bảo toàn nguyên vẹn là 4, không sinh thêm bản ghi rác.
  + **Bộ 3 Cascade Delete Bots**: Khi xóa đơn hàng cha qua `MOD_CRUD_deleteRecord`, máy chủ tự động dọn sạch toàn bộ dữ liệu con ở cả 3 bảng `don_hang_ct`, `thu_chi`, và `lich_cong_viec`.
  + **Bảo tồn tuyệt đối 9 module đã đóng băng**: Không sửa đổi CRM Khách Hàng, In Ấn, Nhân Viên, Thu Chi, Định Khoản.
  + **Deploy Version 883 & Verify Live 100%**: Đã deploy thành công lên Google Apps Script Production và chạy kịch bản kiểm thử E2E Playwright trên Live API: Tạo đơn hàng $\rightarrow$ Sinh đủ 4 lịch $\rightarrow$ Lưu lại lần 2 giữ nguyên 4 lịch $\rightarrow$ Xóa đơn dọn sạch 0 lịch (PASS 100%).

- **11. Hoàn Thiện Cơ Chế Cumulative Backfill & Xác Minh Trạng Thái Chuẩn Quy Trình (Version @884 Live)**:
  + **Xác minh căn cứ 100% từ bảng `quy_trinh` thực tế**: Bảng `quy_trinh` hoàn toàn không có mã `HT01` cho Lịch. Mã trạng thái chuẩn nghiệp vụ của Studio:
    * Khởi tạo: `LV01` ("01. Công việc mới" cho Lịch tư vấn), `NA01` ("01. Công việc mới" cho Chụp/Make/PTS).
    * Hoàn thành: `NA03` ("03. Đã hoàn thành" cho Chụp & Makeup), `PTS03` ("03. Đã hoàn thành" cho Photoshop).
  + **Cơ chế Cumulative Backfill phân tầng thông minh (Mod_DonHang_Server.js, Mod_CRUD_Server.js)**:
    * `Level 1 (>= HD03)`: Tự động kiểm tra và sinh "Lịch tư vấn" (`LV01`).
    * `Level 2 (>= HD05)`: Tự động kiểm tra và sinh "Lịch chụp" và "Lịch makeup". Nếu đơn hàng đã `>= HD06`, khởi tạo trực tiếp trạng thái hoàn thành `NA03` và `ngay_hoan_thanh = todayStr`; nếu ở `HD05`, khởi tạo `NA01`.
    * `Level 3 (>= HD06)`: Tự động sinh "Lịch photoshop" (`NA01`); đồng thời tự động quét và auto-complete toàn bộ Lịch chụp & Lịch makeup hiện có sang `NA03` và gắn `ngay_hoan_thanh = todayStr`.
    * **Hỗ trợ luồng Nhảy Cóc (Jump-ahead Flow)**: Khi nhảy thẳng lên `HD06`, hệ thống tự bù đủ 4 lịch và set hoàn thành ngay lịch chụp/make.
  + **Đồng bộ hiển thị (Mod_LichCongViec_Logic.html)**: Bổ sung nhận diện `NA03` và `PTS03` vào thống kê nhân viên, badge xanh lá cây và bộ lọc tab "Đã hoàn thành".
  + **Deploy Production Version @884 & Live Verification**: Kiểm thử tự động Live qua Playwright cả 2 kịch bản (Tuần tự và Nhảy cóc thẳng HD06) đạt tỉ lệ thành công 100%, dọn dẹp sạch sẽ dữ liệu test.

---

## 🎯 VIỆC TIẾP THEO
- Báo cáo kết quả và trình diện Proof Block cho Founder (anh Hiệp).
- Mời Founder nghiệm thu toàn bộ tính năng tự động hóa Cumulative Backfill trên Production Live Version @884.
- Sẵn sàng đưa Module Lịch Công Việc và Đơn Hàng vào danh sách đóng băng `[🔒 FROZEN / LOCKED]` khi Founder duyệt OK.
