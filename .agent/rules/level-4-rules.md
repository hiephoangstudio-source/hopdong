# Level 4 Rules — "MAKE IT PRODUCTION-READY & OBSERVED"

> ⚠️ Áp dụng khi Founder ở Level 4+. Hãy kiểm tra `goals.md` để xác nhận.

## 📝 Spec-Driven & ADR (Architecture Decision Records)
> 🔴 Tất cả các quyết định kiến trúc lớn, lựa chọn thư viện hoặc thay đổi thiết kế cơ sở dữ liệu phải được lưu vết bằng ADR dưới định dạng Markdown lưu tại `.agent/decisions/` hoặc `docs/adr/`.

**Quy trình viết ADR:**
1. **Context**: Bối cảnh hiện tại, vấn đề cần giải quyết, và các phương án thay thế.
2. **Decision**: Quyết định cuối cùng lựa chọn giải pháp nào và lý do.
3. **Consequences**: Hệ quả sau khi chọn (ảnh hưởng hiệu năng, bảo mật, thời gian triển khai).

## 🛡️ Security-First & Threat Modeling (STRIDE)
> 🔴 Bảo mật là ưu tiên P0. Mọi API endpoint hoặc input từ bên ngoài đều phải được kiểm soát chặt chẽ.

**Quy tắc Bảo mật:**
1. **STRIDE Threat Analysis**: Luôn phân tích nguy cơ Spoofing (Giả mạo), Tampering (Sửa đổi dữ liệu), Repudiation (Chối bỏ), Information Disclosure (Rò rỉ thông tin), Denial of Service (Tấn công từ chối dịch vụ), và Elevation of Privilege (Leo thang đặc quyền).
2. **Zero Hardcoded Secrets**: Không bao giờ hardcode API keys, token, mật khẩu. Sử dụng biến môi trường (`process.env`) hoặc tệp `.env` được cấu hình trong `.gitignore`.
3. **Strict Validation**: Sử dụng các thư viện validation (như Zod, Joi, hoặc logic lọc tay) ở mọi đầu vào API trước khi ghi vào Database.

## 📊 Observability & Structured Logging
> 🔴 Không viết log dạng chuỗi tự do (string interpolation). Log phải chạy theo dạng cấu trúc máy có thể đọc (Structured JSON Logging).

**Quy tắc Logging:**
* Sử dụng stable event names (ví dụ: `USER_LOGIN_FAILED`) thay vì `logger.info("User login failed for " + email)`.
* Cấu trúc JSON log chuẩn:
  ```json
  {
    "event": "USER_LOGIN_FAILED",
    "userId": "123",
    "reason": "INVALID_PASSWORD",
    "timestamp": "2026-08-02T13:00:00Z"
  }
  ```
* Phân tách rõ ràng Metric (Đo lường tần suất) và Log (Chi tiết nguyên nhân).

## 🗑️ Deprecation & Code Sunsetting
> 🔴 "Code is a liability" — Code cũ, tính năng thừa không dùng đến phải được dọn dẹp để giảm nợ kỹ thuật (Technical Debt).

**Quy trình Xóa code cũ:**
1. **Advisory Deprecation**: Đánh dấu tính năng/hàm cũ là `@deprecated` và log cảnh báo trước khi tắt hẳn.
2. **Migration Plan**: Cung cấp giải pháp thay thế cụ thể cho người dùng/API Client.
3. **Zombie Code Removal**: Xóa sạch toàn bộ code không hoạt động (Dead code), không comment vô nghĩa.
