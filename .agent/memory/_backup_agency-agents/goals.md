# 🗺️ Tọa Độ & Lộ Trình Tiến Hóa Kỹ Năng Founder (Bản Đồ Sinh Tồn)

> **Mục tiêu tệp này:** Ghim thẳng vào não Master Agent. Ép AI tuyệt đối KHÔNG ĐƯỢC thiết kế code vượt quá trình độ của Founder (bắt đầu học code từ 01/2026). Chống lại đại dịch Over-Engineering.

## 🟢 LEVEL 0: "MAKE IT WORK" (Sinh Tồn - Thực Tại)

- **Mindset:** Tính năng chạy đúng, hiển thị đúng, ra kết quả là Vua. Không quan tâm bên trong máy hoạt động tốn kém thế nào.
- **Biểu hiện:** Toàn bộ code nhồi thẳng thừng vào 1 tệp tin khổng lồ (VD: 500 dòng code ở trang `channels.js`).
- 🔴 **Cấm AI Đề Xuất:** Dùng thư viện tĩnh Redux, các khái niệm quá trừu tượng như Design Patterns khó xơi.

## 🟡 LEVEL 1: "MAKE IT NEAT" (Trật Tự Kỷ Cương - Giai Đoạn Hiện Tại)

- **Mindset:** Bắt đầu xé lẻ để giảm tải nhức đầu khi đụng đậy File Code.
- **Biểu hiện:** Cắt từng đoạn giao diện HTML quăng ra các file nhỏ ở thư mục `components/` (Cắt ra được thẻ `kpiCard.js`, `sidebar.js`). Code ở trang chủ sẽ ngắn đi.
- **Luyện Tập:** Nhuần nhuyễn "Truyền data (Props)" từ Cha xuống Con. Quản lý mượt `[biến, setBiến]`.
- 🔴 **Cấm AI Đề Xuất:** Cấu trúc Dify siêu to khổng lồ, Clean Architecture. NHẮC TỚI LÀ PHẠM LUẬT!

## 🟠 LEVEL 2: "MAKE IT RIGHT" (Mộc Chắc - Mục Tiêu Xưng Bá 3 Tháng Tới)

- **Mindset:** Tách Não (Logic gọi Data API) khỏi bộ khung Xương (Giao diện UI chớp nháy). Không giẫm chân lên nhau.
- **Biểu hiện:** Gọi fetch Backend API vứt vào thư mục `/services` hoặc Custom Hooks.
- **Luyện Tập:** Viết các **Custom Hooks** (ví dụ `useFetchPancake()`) riêng rẽ để trừu tượng tầng gọi mạng. Phân biệt rõ Smart vs Dumb Components.

## 🔴 LEVEL 3: "MAKE IT SCALE" (Senior Enterprise - Việc của Tương Lai Xa Tít)

- **Mindset:** Cứu vớt hệ thống khi có trên 1000 người dùng truy cập làm sập rớt mạng.
- **Biểu hiện:** Tuân thủ 100% chuẩn Atomic Design Dify. Phân nhánh cực tinh vi. Cache dữ liệu bằng Redis/CDN...
- **KÍCH HOẠT KHI NÀO?** Chỉ được AI nhắc tới khi Founder bảo: _"Dự án của anh nát quá, chạy xì khói khựng lác, phải đại tu đập đi xây lại hệ thống!"_

---

> 🤖 **LỆNH XỬ KHÔNG CÚI ĐẦU DÀNH CHO AI:** HỆ THỐNG PHẢI NHẬN THỨC FOUNDER ĐANG Ở LEVEL 1 VÀ BƯỚC VÀO LEVEL 2 ("MAKE IT RIGHT"). ĐƯỢC PHÉP THIẾT KẾ CODE THEO KIẾN TRÚC LEVEL 2 (Custom Hooks, /services, Smart vs Dumb Components). CẤM TUYỆT ĐỐI MỌI THIẾT KẾ CODE CHẠM LÊN LEVEL 3 (Atomic Design, Redis/CDN, Dify Enterprise).
