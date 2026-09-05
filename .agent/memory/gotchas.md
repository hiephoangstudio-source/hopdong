# GOTCHAS & BÀI HỌC KINH NGHIỆM (StudioERP-Webapp)

## [2026-09-01] Module In Ấn A4, Form Chứng Từ & Relational Mapping

### 1. Kiến Trúc Modular Cho Hệ Thống In Ấn Trên Google Apps Script (GAS Buffer Limit)
- **Vấn đề**: File HTML đơn lẻ chứa template in ấn quá lớn (>50KB) kết hợp CSS gây nghẽn buffer hoặc lỗi render GAS.
- **Giải pháp**: Tách kiến trúc Print Engine thành 3 file độc lập:
  - PrintEngine_UI.html: Chứa CSS khổ A4 dọc chuẩn in ấn, Modal Viewer và thanh Toolbar điều khiển.
  - PrintEngine_ChungTu.html: Chứa template renderer nguyên bản 100% từ repo GitHub.
  - PrintEngine_Engine.html: Controller trung tâm window.PrintEngine điều khiển nạp dữ liệu, tra cứu chi nhánh, chuyển đổi liên in, in trực tiếp và tải file PDF.

### 2. Chuẩn Hóa Căn Chỉnh Khổ Giấy A4 Dọc (210mm x 296mm)
- **Vấn đề**: Bảng 25 dòng hoặc Hóa đơn 2 liên dễ bị tràn lề đáy (sát lề dưới), cắt mất 5 cột chữ ký ở Liên 2 hoặc lệch toàn bộ sang lề trái.
- **Giải pháp**:
  - Đặt box-sizing: border-box !important; và height: 296mm !important; overflow: hidden;.
  - Phân bổ padding chuyên trách: Mẫu 1 & 2 dùng 8mm 12mm, Mẫu 3 dùng .pad-work (5mm 9mm), Thu Chi dùng .pad-thuchi.
  - Tinh chỉnh chiều cao vùng ký sig-space từ 100px xuống 28px - 35px để cả 2 liên hiển thị trọn vẹn 100% nội dung và 5 chữ ký.

### 4. Tách Biệt Toàn Diện Chế Độ In Ấn (@media print) Khỏi Dark Mode & Flex Layout
- **Vấn đề**: Khi WebApp ở chế độ Dark mode (`<html class="dark"> <body class="bg-slate-950 flex">`), lệnh in `window.print()` render cả thanh Sidebar và nền đen chiếm chỗ bên trái, đẩy tờ A4 lệch sang bên phải và tạo 2 dải đen xì mép trên/dưới.
- **Giải pháp**:
  - Trong `@media print`, cưỡng chế `html, html.dark, body, body.dark { display: block !important; position: static !important; background: #ffffff !important; color: #000000 !important; }`.
  - Ẩn triệt để bằng `display: none !important; width: 0 !important; height: 0 !important;` cho toàn bộ `#sidebar`, `aside`, `main`, `header`, `nav`, toolbar và loader.

### 5. Khắc Phục Lỗi Sinh Trang Trắng & Xuất PDF Bị Phình Thêm Trang
- **Vấn đề**: Hợp Đồng 2 trang khi in bị thành 4 trang (xen kẽ trang trắng), khi tải PDF bị thành 3 trang.
- **Giải pháp**:
  - Tuyệt đối không để `margin-bottom` inline trên các trang con `.a4-page` (chỉ đặt khi ở preview màn hình).
  - Khóa cố định chiều cao `.a4-page { width: 210mm !important; height: 297mm !important; max-height: 297mm !important; box-sizing: border-box !important; overflow: hidden !important; }`.
  - Cấu hình ngắt trang chuẩn: `page-break-after: always !important;` chỉ cho `.a4-page:not(:last-child)`, còn `.a4-page:last-child` đặt `page-break-after: avoid !important;`.
  - Trong `html2pdf`, luôn đặt `margin: [0, 0, 0, 0]` để không cộng dồn làm phình kích thước canvas vượt khổ A4.

### 6. Chuẩn Hóa Nét Viền Bảng (Border) Khi Xuất PDF Canvas
- **Vấn đề**: Bảng có `border: 1px solid #000` với `border-collapse: collapse` khi qua `html2canvas` tại `scale: 2` sẽ bị nhân đôi nét vẽ thành 2px - 3px đen xì thô kệch.
- **Giải pháp**: Dùng `border: 0.5px solid #888888 !important;` (hoặc `#999999`) trên cả bảng và các ô `th, td` để bản xuất PDF có nét vẽ thanh mảnh, sắc sảo như in offset chuyên nghiệp.

## [2026-09-02] In Hợp Đồng 2 Trang, Dedicated Print Iframe & Chữ Ký Cân Giữa

### 7. Tránh Lỗi Lồng Thẻ Trang A4 (Nested A4 Pages Antipattern)
- **Vấn đề**: Thẻ Canvas cha `#global-print-canvas` có class `.a4-page`, bên trong lại chứa 2 thẻ con `.a4-page.page-1` và `.a4-page.page-2`. Khi in, Chromium nhận diện thẻ cha ngắt trang (`break-after: page`), sau đó 2 thẻ con lại ngắt trang tiếp $\rightarrow$ Nhân đôi thành 4 trang in!
- **Giải pháp**: Với tài liệu đa trang (như Hợp Đồng), thẻ Canvas cha chỉ mang class container trung tính (`pad-hopdong`), CHỈ CÓ 2 thẻ con bên trong mới mang class `.a4-page`.

### 8. Cơ Chế In Cô Lập Chuyên Biệt (Dedicated Sandboxed Print Iframe)
- **Vấn đề**: Khi gọi `window.print()` trực tiếp trên cửa sổ chính, Chrome áp dụng Lề mặc định (Margins: Default) cộng thêm ~10mm lề trái vào thẻ rộng 210mm $\rightarrow$ Bề rộng phình ra 220mm, làm toàn bộ nội dung bị dạt lệch sang phải và rớt dòng.
- **Giải pháp**: Khi bấm In/Tải PDF, tạo một thẻ `<iframe>` ẩn độc lập hoàn toàn khỏi App Shell, bơm HTML và CSS in ấn sạch với `@page { size: A4 portrait; margin: 0 !important; }` rồi gọi `iframe.contentWindow.print()`. Cách ly 100% khỏi Tailwind, Dark mode và Flexbox scroll wrapper.

### 9. Đồng Bộ Hóa Nút Tải PDF và In Phiếu Qua PDF Vector Gốc
- **Vấn đề**: Thư viện `html2canvas` render PDF từ ảnh bitmap bị mờ font, dung lượng nặng và dễ bị lỗi CORS.
- **Giải pháp**: Chuyển đổi nút "Tải PDF" sang sử dụng trực tiếp cơ chế Dedicated Print Iframe với `document.title` đặt tên file thông minh (VD: `HD_0388183219.pdf`), giúp Chrome xuất file PDF Vector 100% nguyên bản siêu nét, nhẹ (<100KB) và vừa khít đúng 2 trang A4.

### 10. Chuẩn Hóa Khối Chữ Ký Đối Xứng & Cân Giữa (Signature Alignment)
- **Vấn đề**: Các thẻ `<p>` trong khối chữ ký dễ bị CSS chung của biểu mẫu (`text-align: justify` hoặc `text-align: left`) ghi đè làm lệch dạt về bên trái.
- **Giải pháp**: Bọc khối chữ ký bằng `display: flex; justify-content: space-between;`, áp dụng `text-align: center !important;` trên từng cột (48% width) và các dòng con, hiển thị đầy đủ `[Tên Khách Hàng] - [SĐT]` và `[Đại Diện HKD]` cân xứng hoàn hảo.

## [2026-09-03] Nâng Cấp Xuất PDF Trực Tiếp Bằng Thuật Toán Isolated Page-by-Page
### 11. Giải Quyết Triệt Để Xung Đột Giữa Máy In Thật & Lưu PDF Trong Chrome
- **Vấn đề**: Chrome chỉ có 1 bộ nhớ cache Destination. Nếu dùng chung Print Dialog cho cả "In Phiếu" và "Tải PDF", người dùng phải liên tục bấm đổi qua lại giữa Máy in vật lý và "Lưu dưới dạng PDF". Tuy nhiên, nếu dùng thư viện chụp ảnh dải dài (`html2pdf`) thì bị cắt đôi chữ, lệch dòng và sinh trang thứ 3 trắng.
- **Giải pháp**: Thuật toán *Isolated Page-by-Page Direct PDF Export*:
  - Chờ `document.fonts.ready` nạp đủ font chữ.
  - Tạm thời gỡ bỏ `transform: scale`, `box-shadow` và `margin-bottom` của màn hình preview.
  - Lặp qua từng thẻ con `.a4-page`, chụp độc lập bằng `html2canvas` tại độ phân giải Retina `scale: 2.5` (240 DPI).
  - Đưa từng ảnh vào `jsPDF` với tọa độ `(0, 0, 210, 297)` mm vừa khít tuyệt đối khổ A4.
  - Tự động gọi `pdf.save()` tải thẳng 1-click xuống máy tính. Nút "In Phiếu" vẫn dùng Dedicated Iframe của Chrome nhớ sẵn máy in thật. Kết quả 2 nút tách biệt hoàn hảo, không còn bất kỳ lỗi lệch lề hay trang trắng nào!

### 12. Xung Đột CSS Specificity & Bug Font Baseline Trong Bảng Của `html2canvas` Khi Xuất PDF
- **Vấn đề**:
  1. Khi dùng `html2canvas` xuất PDF từ DOM, các ô bảng (`td`) thường bị dính chân chữ sát rạt vào đường kẻ đáy ô hoặc bị cắt cụt dấu tiếng Việt trên đỉnh.
  2. CSS inject vào `clonedDoc` bằng thẻ `<style>` với selector `table td` bị quy tắc mang ID `#form-hopdong td` của CSS gốc đè bẹp hoàn toàn do độ ưu tiên (Specificity) của ID cao hơn tag name dù cả hai đều có `!important`.
  3. Cột `Chi tiết` (nhiều dòng) hoặc các ô dài không được chèn spacer đệm vật lý thì dòng chữ cuối cùng luôn bị trôi xuống chạm đáy do sai số làm tròn subpixel của font web tiếng Việt trong Canvas context.
- **Giải pháp**:
  1. **Ép Inline Style cấp cao nhất**: Duyệt trực tiếp qua `clonedDoc.querySelectorAll('td')` và dùng JavaScript `td.style.setProperty('padding-top', '5px', 'important')`, `td.style.setProperty('padding-bottom', '9px', 'important')`, `td.style.setProperty('vertical-align', 'middle', 'important')`. Cấp độ Inline Style `!important` trong DOM Object Model sẽ đè bẹp 100% mọi xung đột selector bên ngoài.
  2. **Chèn spacer div vật lý**: Chèn thẻ `<div style="height: 8px; width: 100%; display: block; clear: both;"></div>` tự động vào sau chữ cuối cùng của tất cả các ô có nội dung trong bảng dịch vụ (cả cột sản phẩm và cột chi tiết).
  3. **Kết quả**: Cả 3 bản (Xem Trước, In Phiếu, Tải PDF) đều canh giữa dọc vuông vắn, chữ không bao giờ bị cắt đỉnh và cách đáy viền ô an toàn >25-30px, tự động co giãn linh hoạt 100% theo nội dung gói.

### [2026-09-04] Chrome Print Engine - Flexbox vs Grid
- **Lỗi:** Thẻ flex con (flex-grow: 1) bị sập về min-content khi chạy trên @media print của Chrome, khiến bảng không giãn hết trang A4, để lại khoảng trắng.
- **Giải pháp:** Cấm dùng flex-grow cho Print Layout. Bắt buộc chuyển sang dùng CSS Grid: Container đặt display: grid; grid-template-rows: max-content 1fr max-content; height: 100%; và thẻ table bên trong đặt height: 100%.

### [2026-09-04] Clasp Push - Lỗi rác môi trường Node vs GAS
- **Lỗi:** Tạo file tạm bằng đuôi .js (như fix.js chứa lệnh Node require('fs')) trong thư mục làm việc, sau đó chạy clasp push khiến file bị đẩy thẳng lên server GAS. GAS không hiểu require dẫn đến trắng trang 500 toàn hệ thống.
- **Giải pháp:** TUYỆT ĐỐI KHÔNG tạo script Node xử lý tạm với đuôi .js trong thư mục quản lý bởi Clasp, hoặc bắt buộc phải xóa sạch sành sanh trước khi gõ lệnh Deploy.

### 13. [2026-09-05] Đường Nét Đứt Chia Đôi Trang A4 Trong Chrome Print Dialog Bị Vô Hình
- **Vấn đề**: Đường nét đứt chia đôi trang (`.cut-line`) dùng màu xám nhạt (`#999999`) và độ dày `1px dashed`, khi xem trên màn hình preview thì thấy mờ mờ, nhưng khi vào hộp thoại In của Chrome (Print Dialog / In thật) thì bị thuật toán nén ảnh và khử răng cưa (subpixel anti-aliasing) của Chromium khử mất hoàn toàn, biến thành khoảng trắng. Ngoài ra nếu 2 liên đặt chiều cao `50%` thì dòng kẻ bị kẹp giữa và có thể bị background trắng của liên sau che lấp.
- **Giải pháp**:
  1. Nâng cấp đường cắt lên màu đen đậm `#000000` với độ dày `1.5px dashed` (`border-top: 1.5px dashed #000000 !important; width: 95% !important;`).
  2. Gán `height: 1px !important; z-index: 10 !important; position: relative !important;` và `print-color-adjust: exact !important;`.
  3. Đặt chiều cao mỗi liên là `calc(50% - 1px) !important;` cùng `flex: 1 1 0 !important;` để dòng kẻ có vị trí độc lập, hai liên tự động cân bằng 50-50 và không bao giờ bị phình sang trang thứ 2.
