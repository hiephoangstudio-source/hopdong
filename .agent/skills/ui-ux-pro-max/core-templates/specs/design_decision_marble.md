# 🎨 Design Spec: Web App Marble (Đá Cẩm Thạch Trắng)

**Trạng thái:** ĐÃ LƯU TRỮ HỆ THỐNG (21/04/2026)

Tài liệu thiết kế quy định riêng cho phương án Hoàng Gia — **Đá Cẩm Thạch Trắng (White Marble)**. Giao diện này sinh ra là để đón tệp khách siêu VVIP, những người đòi hỏi một sự sang trọng mang hơi hướng không gian kiến trúc đẳng cấp. Cực chuẩn cho Trang Giới thiệu Váy Cưới hoặc Báo Giá Gói Chụp Triệu Đô.

## 1. Vibe Chủ Đạo (Theme Definition)

- **Theme System:** Marble & Gold Luxury.
- **Phong cách:** Không gian cẩm thạch trắng rộng lớn, thẻ thông tin trắng đục đi kèm Typography màu vàng đồng (Gold/Amber). Nặng mùi tiền và cực kỳ quyền lực.

## 2. Hệ Thống Nền (Background System)

- BẮT BUỘC sử dụng Pattern hoặc Hình ảnh Background vân đá Cẩm Thạch tự nhiên (White Marble Texture) nhưng phải giảm saturation/opacity cực tốt để không gây rối thông tin. Không sử dụng Solid Color đơn điệu.

## 3. Hệ Thống Khối (Cards)

- Khối nổi (Card) sử dụng màu trắng tĩnh pha độ đục `bg-white/90` để tách hẳn khỏi nền vân đá mà vẫn giữ được thần thái sang trọng.
- **Bóng đổ (Shadow):** Bóng nhạt hơi hắt màu nâu/vàng rất tinh tế `shadow-[0_15px_30px_rgba(212,175,55,0.05)]`.
- Viền khối (Border): Chỉ dùng viền 1px mỏng màu Vàng Kim loại nhạt `border-amber-200/50`.

## 4. Typography (Chữ & Font)

- Khác với các Web App công nghệ dùng font không chân (Sans-serif). Giao diện Cẩm thạch bắt buộc phải mix Font: Các Tiêu Đề Bự (Heading) dùng Font Chữ Có Chân Cổ Điển (Serif - vd: Playfair Display). Khối chữ thông thường dùng Sans-serif mảnh, lịch sự.
- **Điểm nhấn (Accent):** Toàn bộ icon, nút call-to-action chính dùng màu Vàng Kim (Gold/Amber) `text-amber-600` hoặc màu Gạch Đất Nung sang trọng.
