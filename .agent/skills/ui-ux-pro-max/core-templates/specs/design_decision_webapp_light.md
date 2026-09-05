# 🎨 Design Spec: Web App Light (Sắc Trắng Tinh Khôi)

**Trạng thái:** ĐÃ LƯU TRỮ HỆ THỐNG (21/04/2026)

Tài liệu thiết kế quy định riêng cho phương án thay thế xuất sắc từ Batch hôm qua — **Mẫu Sắc Trắng Tinh Khôi (Pure Glass)**. Mẫu này sinh ra để làm Vua ở mảng Landing Page, Báo giá, và Portfolio của Studio Cưới, nơi hình dáng và thần thái là ưu tiên Tuyệt Đối.

## 1. Vibe Chủ Đạo (Theme Definition)

- **Theme System:** Pure Light Glassmorphism / Editorial Style.
- **Phong cách:** Không gian trắng xốp bồng bềnh. Chú trọng tối đa vào không gian trống (Negative Space) ở các lề ngang/dọc để bức ảnh cưới như lọt thỏm ngay giữa một cuốn Tạp Chí Vogue thực thụ.

## 2. Hệ Thống Màu Sắc (Color & Contrast)

Giao diện này nghiêm cấm Sắc Đen Tuyệt Đối (`#000000`) và ưu tiên mọi thứ mềm mại như Xám tro mờ ảo!

- **Light Mode (Chế độ Chủ Lực):** Nền xám ngọc trai siêu nhạt `bg-[#fafafb]`. Thẻ Card có màu Trắng pha Blur xuyên thấu nhẹ `bg-white/85`. Chữ văn bản Paragraph dùng màu Xám Tro `text-slate-500` (để tránh chói mắt), chữ Tiêu đề bự dùng Xám Than Đậm `text-slate-900`. Chống chỉ định dùng đen 100%.
- **Dark Mode (Bổ Sung):** Nền màu xám than siêu tối tĩnh mịch `bg-[#111318]`. Thẻ Card dùng màu xám đậm đặc `bg-white/5` hoặc `bg-[#1e2028]`.

## 3. Cấu Trúc Khối Bồng Bềnh (Floating Components)

- **Shadow:** Giao diện này rũ bỏ đường viền nổi rõ gắt lố. Nó duy trì sự sống bằng **Bóng Đổ Toả Siêu Rộng & Siêu Nhạt** `shadow-[0_20px_40px_-10px_rgba(0,0,0,0.04)]` (Opacity chỉ 4%).
- **Micro-interactions Editorial:** Khi di chuột (hover) vào thẻ Card bất kỳ, thẻ đó không bung viền sáng lên, mà phải **trôi bồng bềnh dâng lên trên** theo phương Y thẳng đứng `translate-y-[-6px]`. Sự chuyển động mất 400ms `duration-400`, mang lại cảm giác cực êm tựa như một trang giấy Tạp chí đang được Lật lên khỏi mặt bàn kính.
