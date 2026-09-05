### 2026-08-03
- **Thiết lập Kỷ luật Tách biệt Dự án & Cố định ID**:
  - Ghi nhận chỉ thị tối cao từ anh Hiệp về việc tách biệt hoàn toàn dự án ERP Master Portal hiện tại với dự án 2HStudio cũ hoặc các dự án tương tự.
  - Cập nhật rule bảo mật và đối chiếu ID nghiêm ngặt vào `.agent/rules/GEMINI.md`.
  - Xác nhận và lưu trữ chính xác:
    - **Google Sheet ID**: `1nbgRzFnJlOFFxOPSlp1Z6Sd6UopbNafOcKbM8A8c-Eo` (trong `Config.js`)
    - **Script ID**: `1PvTXycJfvPeErBaUs38E8Iv59CwaUBEgnMDZQan9pZDbOPjAdl4Q3_Sy` (trong `.clasp.json`)
    - **Deployment ID**: `AKfycbx_Gc8Qd4ljWa_eCpRtMiJk--mjz4tREqX_qDryaZpeDhmC_uvKdqI828QLxf7PX2rhAg` (trong `deploy.js`)
  - Giải trình chi tiết lý do xảy ra nhầm lẫn do kế thừa tài liệu/lịch sử và cơ chế tự động nạp skill `hans-studio`.
- **Cải tiến logic Đơn Hàng (Show_If, Tab 2, Tab 3) & CRM Lịch sử mua hàng**:
  - Cập nhật `Mod_CRUD_Helper.html` tự động vẽ dấu sao đỏ `*` cho các trường bắt buộc (`requiredColumns` ở phía Client).
  - Cập nhật `Mod_DonHang_Logic.html` để render đầy đủ 100% cột trong schema (trừ các cột audit), thêm quy tắc Show_If động ẩn/hiện lý do không ký (`ly_do_khach_hang_khong_ky`) khi trạng thái là "Không ký", và ẩn/hiện ngày chụp/cưới theo loại dịch vụ.
  - Sửa logic Tab 2 ở Form Đơn Hàng: Tự động đổi dropdown Dịch vụ/Trang phục tương ứng khi người dùng đổi loại Hạng mục.
  - Cập nhật `Mod_CRM_Logic.html` thêm hàm `customRenderDetail` cho đối tượng `window.MOD_CRM` để tự động lọc và vẽ bảng Lịch sử Đơn hàng đã mua trực tiếp vào Drawer xem chi tiết Khách hàng của CRM.
  - Tạo file test `Test_Cascade.js` để hỗ trợ kiểm thử cascade save trên Apps Script và deploy thành công bản mới (Version 120) lên GAS Web App mà không có lỗi biên dịch.
- **Đồng bộ Form Thu Chi**: Chỉnh sửa form "Thêm phiếu" ở module Thu Chi để hoạt động hoàn toàn giống Form Đơn hàng: Tự động ẩn hiện trường *Mã đơn hàng* khi chọn đối tượng Khách hàng, ẩn các trường thừa như *Nhãn thu chi*, *Giấy báo*, *Ngày hoàn thành*, cấu hình logic bắt buộc và sắp xếp lại đúng thứ tự hiển thị mong muốn trong `Config.js` và `SchemaConfig.js`. Sửa lỗi selector form (`#crud-form` -> `#crud-modal-form`).
- **Cập nhật Action Bar toàn hệ thống**: Đã viết script tự động đi qua toàn bộ 14+ module View, chuyển đổi thẻ wrapper sang `flex flex-col gap-6` và biến đổi thẻ Action Bar thành dạng cuộn dính (`sticky`) sát trần, loại bỏ toàn bộ lỗi lề ẩn và trôi thanh lọc khi cuộn trang theo đúng chuẩn `DESIGN.md`. Deploy thành công bản @149.

### 2026-08-02
- **Nâng cấp Form & Drawer Đơn Hàng & Đồng bộ trường Required:**
  - Thêm trường Ngày Lập đơn hàng (`ngay`) bắt buộc vào Tab 1 Đơn hàng.
  - Viết sự kiện auto-fill tự động điền hồ sơ khách hàng (Tên, SĐT, Địa chỉ, Cô dâu, Chú rể, CCCD) khi chọn dropdown Khách hàng từ dữ liệu cache CRM.
  - Bổ sung cấu hình `requiredColumns` cho toàn bộ các bảng nghiệp vụ phụ (Giặt váy, Trang phục, Nhà cung cấp, Chấm công, Định khoản, Đề xuất...) trong `Mod_CRUD_Helper.html` giúp tự động sinh thuộc tính bắt buộc và vẽ sao đỏ `*` trên form.
  - Khắc phục nguy cơ lặp đệ quy vô hạn (đơ trình duyệt) khi tính toán tài chính và thay đổi giá trị thành tiền chi tiết đơn hàng.
- Đồng bộ Cài đặt chung và Tối ưu hóa Sao chép / Chia sẻ gửi khách hàng:
  - **Tab Cài đặt chung**: Tạo mới tab Cài đặt trung tâm, di chuyển cấu hình thông tin cửa hàng, logo chữ/ảnh, ảnh nền Trang chủ và liên kết Google Sync vào đây. Ẩn menu Trang chủ ở thanh điều hướng khi bật Admin.
  - **Ẩn cụm cài đặt thô**: Tiến hành ẩn các phần cài đặt Logo/Studio Name thô cũ ở sidebar của các module Báo Giá (baogia.html), Concept (concepts.html), In Ấn & Khung (anhto.html) để làm gọn UI, nạp thông tin đồng bộ từ Cài đặt chung.
  - **Sửa bug Admin Mode**: Khắc phục lỗi khi bật Admin mode các tab đã tải trước đó không tự chuyển giao diện Admin (vỡ view) bằng cơ chế re-init trực tiếp tất cả các module.
  - **Nâng cấp Sao chép & Gửi ảnh (Báo giá & Concept)**:
    - Báo Giá: Khi chọn nhiều báo giá trên PC, tự động tải xuống tất cả ảnh báo giá PNG riêng lẻ thay vì bắt copy tuần tự, đồng thời copy gói đầu. Trên mobile hỗ trợ share nhiều ảnh cùng lúc qua Zalo/FB.
    - Concept: Hiện thực hóa tính năng "Sao chép ảnh gửi khách" trong popup A4 bằng html2canvas, đồng bộ nút Sao chép ảnh, Chia sẻ gửi khách, Tải xuống hàng loạt ở danh sách ngoài y hệt tab Báo giá.
    - Ẩn nút "Sao chép" khi chọn từ 2 mục trở lên trên cả hai tab để phân tách rõ ràng với nút "Chia sẻ".
  - **Sửa lỗi cú pháp**: Khắc phục lỗi dư thừa dấu ngoặc đóng `}` trong `baogia.js` gây crash giao diện báo giá.

### 2026-08-02 (Cũ)

### 2026-08-01
- Hoàn thiện Form chỉnh sửa của module Trang Phục, giải quyết triệt để lỗi trống thông tin, định dạng ngày tháng và dropdown enum.
- Thực hiện nâng cấp module Đơn hàng sang mô hình Master-Detail-Detail chuẩn (Is Part Of):
  - Preload cache Đơn hàng từ Server xuống Client để tối ưu tốc độ mở tab lần đầu dưới 100ms.
  - Chia Form nhập liệu và Drawer chi tiết đơn hàng thành bố cục 3 Tab mới (Thông tin đơn hàng, Chi tiết đơn hàng, Thanh toán).
  - Di chuyển các trường thông tin chuẩn theo yêu cầu, xóa bỏ hoàn toàn 2 trường đính kèm file hợp đồng.
  - Thiết kế lưới nhập liệu bảng con sản phẩm/dịch vụ (`don_hang_ct`) ở Tab 2 và bảng con lịch sử thanh toán (`thu_chi`) ở Tab 3 của Form Đơn hàng, tự động tính toán tổng tiền, thực thu, công nợ.
  - Triển khai logic Cascade Save (lưu tầng) phía server-side tại `Mod_CRUD_Server.js` (ghi nhận dữ liệu vào cả 3 sheet `don_hang`, `don_hang_ct`, `thu_chi` cùng lúc và dọn dẹp cache RAM).
  - Ẩn nút Thêm mới và Sửa/Xóa độc lập ở bảng Đơn hàng chi tiết (chỉ giữ lại nút Xem chi tiết).
  - Khắc phục lỗi dropdown rỗng bằng cách kế thừa trực tiếp bộ lọc chuẩn của hệ thống `window.AppCRUD.getEnumOptions(colName)`.
  - Khắc phục lỗi thứ tự append DOM jQuery giúp các dòng bảng con (Tab 2, Tab 3) render đầy đủ và chuẩn xác.
  - Chạy kịch bản kiểm thử E2E tích hợp CRM - Orders (Playwright) tự động thành công 100%, xác thực đầy đủ tính năng Cascade Save và logic tính tự động lợi nhuận, công nợ.
  - Đẩy code và cập nhật Deploy (Build 110) thành công lên Google Apps Script Web App.

### 2026-07-31
- Khắc phục lỗi biến mất dòng thumbnail (slides-bar/dải trang) ở chế độ Admin của tab Báo Giá:
  - Di chuyển các khai báo biến trạng thái (`folders`, `slides`, `activeFolderId`, `activeSlideId`,...) lên đầu file `baogia.js` để tránh Temporal Dead Zone (TDZ) ReferenceErrors trên các trình duyệt strict.
  - Đồng bộ hóa class `.readonly-mode` trên cả `document.body` và wrapper `#baogia-module-root` để đảm bảo cơ chế ẩn/hiện dải trang hoạt động chính xác.
  - Chạy script `deploy.py` nâng cấp hệ thống lên **v235.0**, xóa cache Service Worker thành công và verify hoạt động ổn định trên live site.
- Tối ưu hiển thị di động cho tab In Ấn & Khung (module anhto) ở chế độ readonly-mode: Chuyển sang bố cục dọc (column) và xếp ngang 3 nút chọn phương án ở chân trang.

### 2026-07-30
- Khắc phục triệt để lỗi di động tab Báo giá: Vá lỗi `ReferenceError: toggleSlidesBar is not defined` do ES Module scoping.
- Nâng cấp toàn diện tab Giáo Trình (Catalogue v210.0 - v221.0).
- Chuyển sang dự án **StudioERP-Webapp (Master Portal)**:
  - Khắc phục lỗi chuyển tab chậm 2-3s bằng cách tối ưu hóa `hideLoader()` và cơ chế giữ cache đệm ở Client-side.
  - Sửa lỗi nút **Thêm Khách Hàng** và **Thêm Thiết Bị** bằng cách vá lỗi thiếu `TABLE_SCHEMAS` trên client-side.
  - Tự động nạp dữ liệu từ sheet `cai_dat` và `chi_nhanh` đưa vào cache để sinh dropdown (`Enum`) và Checkbox (`EnumList`) tự động cho mọi CRUD Form.
  - Khắc phục lỗi SyntaxError vỡ cú pháp do ký tự xuống dòng vật lý trong `TABLE_SCHEMAS` bằng giải pháp mã hóa Base64 ở Server và giải mã UTF-8 ở Client.
  - Tách biệt CRM thành 2 phân hệ độc lập: **Khách Hàng** và **Dịch Vụ**. Tách tệp View, Logic, cấu hình định tuyến sidebar và phân quyền.
  - Thiết kế quan hệ 1-Nhiều Nhân Viên & Phân Bổ Nhân Sự: Xây dựng bảng con thêm/xóa động chi nhánh phân bổ trực tiếp trên Form trượt của Nhân viên; xử lý đồng bộ cascade save và cascade delete trên máy chủ.
  - Cố định (sticky) thanh Action Bar của 4 module danh sách chính khi cuộn chuột.
  - Đẩy code và cập nhật Deploy (Version 13 và Version 15) thành công lên Google Apps Script Web App.
