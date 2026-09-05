
### 09/05/2026 - Lỗi 'Identifier has already been declared' khi dùng document.write() trong GAS SPA
- **Lỗi**: Khi dùng document.write(html) để thay thế UI sau khi Logout, nếu trong file HTML có khai báo top-level let hoặc const, lần chạy thứ hai sẽ gây văng lỗi do Global Context không bị reset.
- **Fix**: Bắt buộc dùng ar cho toàn bộ các biến toàn cục (top-level variable). Đã được đúc kết vào Rule 8 của dashboard-builder.

### 09/05/2026 - Lỗi mất thẻ HTML khi dùng replace hàng loạt
- **Lỗi**: Khi dùng tool replace/sed thay đổi cấu trúc HTML tự động số lượng lớn, thẻ <tbody> có thể bị xóa nhầm khiến logic render bảng JS thất bại mà không báo lỗi console.
- **Fix**: Sau khi thay đổi cấu trúc DOM, phải luôn verify lại DOM tree hoặc dùng grep kiểm tra lại ID của các phần tử.
