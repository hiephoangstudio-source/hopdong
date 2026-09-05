# 🎨 Design Spec: CarPlay Dashboard Horizon

**Trạng thái:** ĐÃ CHỐT HẠ (Ký ngày 21/04/2026)

Tài liệu thiết kế quy định riêng cho phương án số 4 — CarPlay. Hệ thống giao diện này sinh ra là để chuyên phục vụ 100% cho Màn hình Cảm Ứng lớn (Touch-First) của Kiosk máy chiếu / Tablet đặt tại quầy Lễ Tân, Quầy POS của Studio.

## 1. Vibe Chủ Đạo (Theme Definition)

- **Theme System:** Apple CarPlay / Giao diện Automotive trên màn Ô tô hạng sang.
- **Phong cách:** Nút bấm siêu to (Huge Buttons), Khối lượng không gian cực lớn (Spacious Layout), Khả năng Trực quan (Accessibility) đỉnh cao - Tiêu chí là "Nhắm mắt bấm cũng trúng".

## 2. Hệ Thống Màu Sắc & Tương Phản (Color & Contrast)

Sự thành bại của giao diện này lệ thuộc hoàn toàn vào độ **Tương phản Kép (High Contrast)** - Cực chói và Cực đậm.

- **Light Mode:** Nền màu Xanh Lam lạnh `bg-[#f3f6fc]`. Khối trắng tinh. Điểm nhấn Accent Button dùng tông màu Xanh Đậm chuyên nghiệp `bg-[#2563eb]`.
- **Dark Mode:** Nền màu Midnight Blue (Xanh đen đậm) `bg-[#081023]`. Khối màu Xanh Than thép `bg-[#131e3b]`. Điểm nhấn Accent Button dùng duy nhất màu **Vàng Chanh (Bright Yellow) `bg-[#eab308]`**. Sự tương phản khốc liệt giữa Xanh đen sâu thẳm và Vàng Neon chói sáng là linh hồn của hệ Darkmode CarPlay.

## 3. Cấu Trúc Khối (Spacious Build)

- Toàn bộ Button và Panel đều được vuốt góc cong mềm mại siêu lớn `rounded-3xl` hoặc bo tròn hẳn thành hình con nhộng `rounded-full`.
- Áp dụng bố cục tách màn hình Split-screen (ví dụ: Tỷ lệ vàng 65/35). Trái 65% cho Bản đồ định vị/Tác vụ lớn. Phải 35% cho Danh sách khách VIP.
- **Bóng đổ (Shadows):** Rất đậm nhưng tỏa rộng (spread lớn) để tách hẳn khối lên khỏi bề mặt móng, giúp ngón tay "cảm giác" được điểm cần chạm. Không dùng Line kẻ quá nhiều.
