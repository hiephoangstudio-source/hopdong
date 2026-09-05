# 🎨 Design Spec: Pure Glassmorphism (Kính Tinh Khiết)

**Trạng thái:** ĐÃ LƯU TRỮ HỆ THỐNG (21/04/2026)

Tài liệu thiết kế dành riêng cho "Glassmorphism Tinh Khiết". Đây là phong cách mạnh nhất nếu Sếp muốn tạo Cảm Hứng (Inspiration), khoe kỹ thuật UI đỉnh cao cho Dashboard hoặc Trang Đặt Lịch Online.

## 1. Vibe Chủ Đạo

- **Theme System:** Pure Frosted Glass.
- **Phong cách:** Nền cực kỳ rực rỡ hòa quyện, thẻ Card trong vắt như Thủy Tinh, viền sáng bóng.

## 2. Hệ Thống Background Đa Trọng Tâm (Mesh Gradient)

> [!IMPORTANT]  
> Bản thân các thẻ Kính sẽ tàng hình nếu Background một màu. Bắt buộc background phải là **Vân đá loang màu (Aurora)** hoặc **Mesh Gradient Đa Điểm** (Trộn 4-6 màu neon rực rỡ với nhau trên background nhám).

## 3. Kỹ Thuật Thẻ Kính (The Glass Technique)

- **Màu Nền Thẻ:** Cực trong suốt `bg-white/10` hoặc `bg-white/20`.
- **Độ mờ tệp (Blur):** Cực cao `backdrop-blur-2xl` kết hợp tăng độ rực `saturate-200` để màu nền hắt qua kính trông đẹp hơn màu gốc.
- **Viền:** Trắng sắc nét `border-white/50`, bắt sáng hắt mép.
- **Bóng đổ (Shadow):** Không dùng bóng đen/xám mà dùng bóng đổ có màu tone-sur-tone với nền để thẻ không bị "bẩn".
