# 🎨 Design Spec: Sonoma Glass (Official)

**Trạng thái:** ĐÃ CHỐT HẠ (Ký ngày 21/04/2026)

Đây là tài liệu Bộ Yêu Cầu Thiết Kế (Design System) đóng gói các quyết định cực kỳ khắt khe mà Sếp đã chốt ở vòng Chung kết. Kể từ giờ phút này, mọi Frontend Agent khi code dự án buộc phải tuân theo tiêu chuẩn này!

## 1. Vibe Chủ Đạo (Key Aesthetic)

- **Theme System:** Sonoma Glass (Apple macOS / VisionOS Style)
- **Phong cách:** Kính mờ (Frosted Glass), Bo góc cực tròn (rounded-3xl), Hiện đại tinh khiết.

## 2. Hệ Thống Màu Nền (Background Core)

> [!IMPORTANT]  
> Sếp đã ra lệnh: **TUYỆT ĐỐI KHÔNG DÙNG ẢNH NỀN (No Background Image).** Bắt buộc dùng màu tĩnh (Solid Color) để chống nhiễu và làm nổi bật hoàn toàn vẻ đẹp của khối Glassmorphism.

- **Light Mode (Chế độ Sáng):** Màu xám khói `bg-[#f5f5f7]`
- **Dark Mode (Chế độ Tối):** Màu nguyên bản `bg-[#121212]`

## 3. Quy Chuẩn Khối Kính (Glass Panels)

Để mã HTML đạt độ trong mượt chuẩn Apple, bắt buộc phải dùng các thông số sau trên Tailwind CSS:

- **Hiệu ứng Kính:** Bắt buộc có `backdrop-blur-md` hoặc filter tinh chỉnh `blur(28px) saturate(180%)`.
- **Border:** Viền siêu mỏng `border-white/60` (Light mode) hoặc `border-white/10` (Dark mode).
- **Đổ bóng mây (Shadow):** Không dùng shadow sắc cạnh, dùng drop-shadow sâu và nhòe `shadow-[0_8px_32px_rgba(0,0,0,0.1)]`.

## 4. Typography (Phông Chữ)

- Bắt buộc sử dụng font `Inter` hoặc bộ `-apple-system`. Cấm tuyệt đối các font màu mè. Tỷ lệ tracking từ bình thường đến chặt khít (tight).
