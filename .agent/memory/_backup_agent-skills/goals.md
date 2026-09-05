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

## 🟠 LEVEL 2: "MAKE IT RIGHT" (Mộc Chắc - Đã Hoàn Thành)

- **Mindset:** Tách Não (Logic gọi Data API) khỏi bộ khung Xương (Giao diện UI chớp nháy). Không giẫm chân lên nhau.
- **Biểu hiện:** Gọi fetch Backend API vứt vào thư mục `/services` hoặc Custom Hooks.
- **Luyện Tập:** Viết các **Custom Hooks** (ví dụ `useFetchPancake()`) riêng rẽ để trừu tượng tầng gọi mạng. Phân biệt rõ Smart vs Dumb Components.

## 🟢 LEVEL 3: "MAKE IT SCALE" (Hiệu Năng & Quy Mô - Đã Hoàn Thành)

- **Mindset:** Cứu vớt hệ thống khi có lượng người dùng/dữ liệu tăng lên, tối ưu hiệu năng tải trang và phân chia module chuyên nghiệp.
- **Biểu hiện:** Cấu trúc components rõ ràng (hướng tới Atomic Design), tối ưu render (useMemo, useCallback), áp dụng cache (Cache Proxy, LocalStorage/IndexedDB sync), tối ưu hóa CDN/Vercel.

## 🔴 LEVEL 4: "MAKE IT PRODUCTION-READY & OBSERVED" (Vận Hành & Giám Sát - Giai Đoạn Hiện Tại)

- **Mindset:** Xây dựng phần mềm hoàn chỉnh dạng Production-Ready, Bảo mật tuyệt đối (Security-First), Tự động hóa tối đa (CI/CD, Monitoring, logs), và Tích hợp các hệ thống ngoại vi chuyên nghiệp.
- **Biểu hiện:** Triển khai CI/CD thực tế, Giám sát lỗi thời gian thực (structured JSON logging), Quản trị bảo mật (Threat Modeling STRIDE), Tối ưu SEO vượt trội, và Viết tài liệu ADR (Architecture Decision Record) bài bản để lưu vết hệ thống.
- **KÍCH HOẠT KHI NÀO?** Đã kích hoạt theo yêu cầu của Founder nâng cấp trình độ và kiến trúc hệ thống lên mức cao nhất.

---

> 🤖 **LỆNH XỬ KHÔNG CÚI ĐẦU DÀNH CHO AI:** HỆ THỐNG PHẢI NHẬN THỨC FOUNDER ĐANG Ở LEVEL 4 ("MAKE IT PRODUCTION-READY & OBSERVED"). ĐƯỢC PHÉP THIẾT KẾ CODE THEO KIẾN TRÚC LEVEL 4 (Structured Logging, Advanced Security, Deprecation plans, ADR, CI/CD). Tích hợp Master Skill `agency-vietnam-marketing` làm kỹ năng cốt lõi cho các chiến dịch kinh doanh của Han's Studio. Giữ cấu trúc code sạch sẽ, tránh các thiết kế over-engineering quá mức (như Microservices hoặc hạ tầng Enterprise không thực tế cho quy mô hiện tại).


## 📝 BACKLOG Ý TƯỞNG (Chờ Level-up)
- **🔴 [ƯU TIÊN CAO] Xây dựng "Master Dashboard / ERP Portal":** Gom 14 Dash rời rạc vào 1 GAS Project duy nhất (SPA + Sidebar Gmail-style + Lazy Loading). Plan FINAL đã được lên chi tiết (8 rủi ro, 4 Phase migrate, 50 files). **Trạng thái:** Anh Hiệp yêu cầu chờ vài ngày xem lại toàn bộ Dash trước khi bắt đầu code. Conversation: `465252b4-6078-4d8f-8b22-7c7de0e24b77`.
- **Xây dựng "Han's Command Center / Launchpad":** Tạo một trang web Startpage cá nhân chứa toàn bộ hệ sinh thái (các link AppSheet, Google Drive, Studio App, Master Agent). 
  + *Giao diện:* Bento Grid, Dark Mode (làm trang New Tab mặc định của trình duyệt).
  + *Tính năng dự kiến:* Nút 1-click mở app, Live Widget hiển thị con số kinh doanh rút gọn, Thanh Omnibar tìm kiếm tổng hợp.
  + *Thời điểm thực thi:* Khi Founder cứng cáp hơn về UI/Frontend (Level 2) và cần dọn dẹp quy hoạch lại "Góc làm việc số".

## 🔒 CHỈ THỊ BẢO MẬT TỐI CAO (SECURITY-FIRST DIRECTIVE)
> **Quy định tuyệt đối:** Bất kỳ tác vụ lập trình, nâng cấp hoặc thiết kế nào trong toàn bộ dự án từ nay về sau bắt buộc phải đặt **BẢO MẬT (SECURITY)** làm ưu tiên số 1 (P0). AI không được phép đưa ra bất kỳ đề xuất nào có nguy cơ làm rò rỉ dữ liệu hoặc lộ thông tin credentials của hệ thống.
