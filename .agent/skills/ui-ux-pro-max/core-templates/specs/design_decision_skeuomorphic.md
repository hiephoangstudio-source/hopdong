# 🎨 Design Spec: Skeuomorphic Modern (macOS Big Sur)

**Trạng thái:** ĐÃ CHỐT HẠ (Ký ngày 21/04/2026)

Tài liệu Thiết Kế (Design System Spec) quy định cho phương án số 3 — "Skeuomorphic Modern". Nhấn mạnh mạnh mẽ yếu tố 3D vật lý (Tactile) và tương tác thực tế (Physical Press).

## 1. Vibe Chủ Đạo (Theme Definition)

- **Theme System:** Skeuomorphic Modern (Tiệm cận macOS Big Sur)
- **Phong cách:** Nút bấm cảm giác vật lý thật (Tactile Buttons), Cấu trúc khối nổi 3D (Extruded Cards) nằm trên một background phẳng lì. Hướng tới sự sang trọng của vật liệu đồ vật thực tế.

## 2. Hệ Thống Màu Nền (Background System)

> [!IMPORTANT]  
> TUYỆT ĐỐI KHÔNG DÙNG NỀN ẢNH TĨNH hay GRADIENT LÒE LOẸT. Bắt buộc dùng màu nguyên khối nhám (Matte Solid) để giữ độ sâu cho đổ bóng tĩnh của Skeuomorphism.

- **Light Mode:** Nền xám xi-măng cực kỳ nhã nhặn `bg-[#e6e9ef]`.
- **Dark Mode:** Nền xám kim loại (chế hòa khí) `bg-[#262930]`.
  _Lưu ý: Dark mode của nhánh 3D này CẤM dùng nền Đen OLED nguyên chất (Black)_. Bắt buộc là tone xám tro ánh xanh cực kỳ công nghiệp để bóng đổ được rõ nét và không bị đục.

## 3. Khối 3D & Nút Bấm Vật Lý (Tactile Elements)

Việc mô phỏng khối 3D là "Xương Sống" quyết định sự cao cấp của giao diện này!

- **Khối Nổi (Card/Button):** Sử dụng dải gradient màu chìm `linear-gradient(145deg, ...)` kết hợp bóng đôi. Bóng `box-shadow` phải có 1 góc sáng tạt từ trên trái xuống (Bóng trắng `#ffffff` bên trái trên, bóng tối `#c4c6cc` bên phải dưới).
- **Khối Lõm (Sunken/Screen/Status):** Thẻ để hiển thị dữ liệu bắt buộc dùng bóng chìm `box-shadow: inset ...` đổ bóng vào trong lòng để tạo cảm giác **Màn hình bị khoét sâu xuống bề mặt vỏ**.

## 4. Vi Tương Tác Phím Cơ (Micro-interactions)

Đã làm nút 3D thì phải bấm được như Bàn Phím Cơ!

- **State Hover:** Thẻ nhảy nổi bật lên nhẹ (Bóng bự hơn, mờ hơn) `transform: translateY(-2px)`.
- **State Active (Khi bấm giữ chuột):** Thẻ bị lún tịt xuống nền, viền ánh sáng trắng bị dập tắt, bóng ngoài đổi thành bóng trong `box-shadow: inset ...` kết hợp `transform: translateY(2px)`. Nó mang lại cảm giác ấn phím vật lý đánh "Cạch" cực kỳ sảng khoái.
