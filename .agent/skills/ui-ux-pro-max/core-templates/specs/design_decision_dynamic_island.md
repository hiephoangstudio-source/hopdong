# 🎨 Design Spec: Dynamic Island Fluid (iOS 18)

**Trạng thái:** ĐÃ CHỐT HẠ (Ký ngày 21/04/2026)

Đây là tài liệu Bộ Yêu Cầu Thiết Kế (Design System) đóng gói các quyết định thiết kế cho nhánh Vibe "Dynamic Island Fluid" mà Sếp đã ra lệnh tiếp tục triển khai.

## 1. Vibe Chủ Đạo (Key Aesthetic)

- **Theme System:** Dynamic Island Fluid (chuẩn Apple iOS 18)
- **Phong cách:** Hình học viên thuốc (Pill-shape), Bóng đổ phân tán (Soft drop-shadow), và Ánh sáng OLED (Neon Glow) cực mịn màng.

## 2. Hệ Thống Màu Nền (Background Core)

> [!IMPORTANT]  
> Giống với nguyên tắc của nhánh Sonoma, nhánh Thiết kế Dynamic Island **TUYỆT ĐỐI KHÔNG DÙNG ẢNH NỀN (No Background Image).** Bắt buộc dùng màu tĩnh (Solid Color) chuẩn iOS để tạo không gian sâu thẳm/sạch sẽ.

- **Dark Mode:** Nền màu đen tuyệt đối `bg-[#000000]`. Card thông tin nổi lên bằng xám tro `bg-[#1c1c1e]`.
- **Light Mode:** Nền màu xám cực nhạt `bg-[#f2f2f7]`. Card thông tin trắng tinh `bg-[#ffffff]`.

## 3. Quy Chuẩn Khối Bo Góc (Pill Cards)

Khác với nhánh Kính mờ (Glassmorphism), nhánh Dynamic Island dồn lực vào **Hình học** và **Ánh sáng**:

- **Bo góc cường độ cao:** Sử dụng `rounded-full` cho Header/Button và `rounded-3xl` / `rounded-[36px]` cho các khối thông tin siêu to.
- **Đổ bóng Light Mode:** Bóng siêu nhòe, nhạt êm ái `shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]`. Khối trắng phải có viền xám cực nhạt (1-2% opacity) ranh giới.
- **OLED Glow Dark Mode:** Các khối không dùng shadow đen, mà dùng hiệu ứng Glow rực rỡ neon (vd: Neon Blue `rgba(10,132,255,0.4)`) tỏa viền xung quanh thẻ để tạo cảm giác "Holographic" trong đêm tối.

## 4. Trải Nghiệm Tương Tác (Micro-interactions)

- Khuyến khích sử dụng hiệu ứng đàn hồi (scale) khi Hover `hover:scale-105` thay vì chỉ đổi màu tĩnh lạc hậu. Thời lượng dài một chút `duration-300` / `duration-400` để cảm giác nút bấm mượt, có sức hút như đang dùng thật trên Ipad.
