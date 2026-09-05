# 📅 Nhật ký tuần (This Week)

> 7 ngày gần nhất. Entries cũ hơn tự động chuyển sang `archive/`.


---

## 29/07/2026
- Sửa lỗi caching trình duyệt cứng đầu trên main.js (v113.0 -> version động).
- Sửa lỗi CSS padding wildcard của tab Pose.
- Đồng bộ khoảng thở (padding p-2.5 md:p-4) toàn cục cho các tab Báo Giá, Concept, Pose, In Ấn.
- Fix lỗi khung Báo Giá bị hở đáy (sửa md:h-[calc] thành h-full).
- Rà soát toàn bộ CSS responsive trên di động cho các tab:
  - **Pose:** Sửa co rúm nút Đồng bộ và căn chỉnh wrap các nút toolbar trên mobile.
  - **In Ấn:** Sửa layout PC đè layout Lightroom Mobile và sửa scope hàm switch tab di động.
  - **Giáo Trình:** Chuyển sidebar thành fixed trên mobile để fix lỗi trống lề trái nghiêm trọng.
  - **Drive:** Thêm nút hamburger menu, sửa drawer trượt vertical, thêm chạm đúp (chạm chọn + chạm mở) trên di động.

---

## 19/07/2026
- **Đồng bộ dáng chụp (IndexedDB) & Tinh chỉnh Pose Flow**:
  - Di chuyển nút checkmark "Đã chụp" (✓) xuống góc dưới bên phải, loại bỏ sự chồng lấn với checkbox chọn ảnh. Sửa logic click đúp mở Lightbox.
  - Sửa lỗi dialog xác nhận xóa bị khuất sau Lightbox (nâng z-index lên 999999).
  - Tích hợp cụm điều khiển **Đồng bộ dáng chụp** (Xuất/Nhập file `.json`) trực tiếp trong menu lề trái của tab POSE CHỤP để kết xuất/nạp IndexedDB.
  - Nút "Bỏ chọn" trong Pose Flow chỉ hiển thị khi số lượng ảnh đang chọn lớn hơn 1 (>1).
  - Khung hiển thị ảnh Concept chi tiết theo tỉ lệ 2:3 (6x9), ẩn mô tả dài, tăng diện tích preview.
- **Cải thiện Light Mode cho Han's Drive & Thêm nút Xóa**:
  - Thêm tệp CSS override hơn 200 dòng cho `body.light` trong module Drive, đổi toàn bộ nền sang màu kem nhạt/trắng sữa.
  - Thêm nút "Xóa thư mục này" vào menu xổ xuống cạnh tên thư mục hiện tại, liên kết với API `/api/drive/delete`.
- **Tối ưu hóa và cấu hình PWA**:
  - Mở rộng `"scope"` của `manifest.json` ra `/` (root level).
  - Di chuyển Service Worker đăng ký sang file gốc `/sw.js` (scope `/`) và bổ sung pre-cache.

---

## 15/07/2026
- **Deploy Catalogue App lên VPS**: Tách biệt Catalogue App, upload và giải nén độc lập trên VPS riêng của anh Hiệp. Cài đặt chứng chỉ Let's Encrypt SSL HTTPS cho `catalogue.hansstudio.net` thông suốt.
- **Sửa lỗi Click đúp ảnh & Console errors ở tab Pose**: Nhúng lightbox `#drive-lightbox` vào Catalogue mẹ và khai báo sớm `injectStyleToIframe` để dập tắt lỗi timing của iframe.
- **Đồng bộ màu sắc & Layout**: Rà soát giao diện Sáng/Tối mượt mà, đổi responsive CSS sang dark class, và nới rộng layout Catalogue.

---

## 14/07/2026
- **Sửa lỗi giao diện Catalogue App (UI Fixes)**:
  - **Tab In Ấn & Khung**: Áp dụng pattern **scale-host** cho file [anh-to.html](file:///c:/AntiCode/hans-studio/bao-gia/anh-to.html) (sử dụng wrapper `#scale-host` bọc ngoài, dùng JS tính toán width/height động sau scale và set style absolute cho target) giúp bảng A4 hiển thị đầy đủ 6 cột không bị scroll ngang hay cắt nội dung. Giảm font chữ bảng từ 0.78rem xuống 0.68rem và giảm padding để khít trang preview.
  - **Tab Pose Chụp**: Sửa lỗi ảnh bị co dẹt thành dải mỏng do CSS Grid stretch trong container cố định chiều cao bằng cách thêm `align-content: start` và đặt `min-height: 180px` cho khung chứa ảnh trong [style.css](file:///c:/AntiCode/hans-studio/pose-flow/style.css).
  - **Tab Báo Giá Gói**: Tăng timeout adjustScale trong [index.html](file:///c:/AntiCode/hans-studio/bao-gia/index.html) từ 200ms lên 250ms kèm cơ chế retry ở 500ms và 1200ms để đảm bảo preview card luôn scale đúng vị trí và kích thước.
  - **Tab xem Pose**: Giảm số cột hiển thị từ 6 cột xuống 4 cột (`lg:grid-cols-4`) trong [index.html](file:///c:/AntiCode/hans-studio/catalogue/index.html) giúp ảnh pose hiển thị to, rõ ràng và dễ đọc hơn khi tác nghiệp.

---

## 30/06/2026
- **Xây dựng ứng dụng Art Director & Typo Studio**:
  - **Tạo thư mục chuyên biệt `art-director`**: Chứa công cụ web Single Page Application (HTML/CSS/JS thuần) chạy trực tiếp trên trình duyệt, không cần cài đặt node_modules hay build step phức tạp.
  - **Cấu hình API Key tự động**: Tạo tệp [config.js](file:///c:/AntiCode/hans-studio/art-director/config.js) tự động trích xuất API Key của Gemini từ tệp `.env` của dự án `han-social-autopilot` để người dùng sử dụng ngay không cần nhập tay.
  - **Thiết kế giao diện Bento Grid cao cấp**: Sử dụng bảng màu Champagne (#C9A96E) + Đen than (#2C2C2C) + Trắng kem (#FAFAF8) và hiệu ứng Glassmorphism tinh tế đồng bộ với bộ nhận dạng thương hiệu của Han's Studio.
  - **Hệ thống AI gợi ý Typography**: Tích hợp gọi trực tiếp Gemini API (`gemini-2.0-flash`) thông qua base64 image data. AI tự động phát hiện khoảng trống trong ảnh, đề xuất câu chữ (Heading & Tagline), lựa chọn font chữ kết hợp, màu sắc và vị trí căn lề.
  - **Bảng tương tác chèn chữ kéo thả**: Lập trình tính năng kéo thả (Drag-and-Drop) mượt mà bằng chuột và cảm ứng (iPad) giúp xê dịch khối chữ chèn trên ảnh, kèm theo bộ chỉnh tay Font, Kích cỡ, Spacing và Alignment.
  - **Cải tiến tính năng Chèn chữ Hàng loạt (Batch Mode & Batch Gallery)**:
    - Hỗ trợ tải lên cùng lúc nhiều ảnh cưới. Thiết kế dải ảnh thu nhỏ (thumbnails) cuộn ngang mượt mà dưới khung xem trước.
    - Hỗ trợ đổi ảnh mẫu thiết kế và gọi AI phân tích độc lập trên từng ảnh bằng cách click chọn thumbnail.
    - Lập trình tính năng lưu trữ vị trí kéo thả và độ rộng chữ riêng biệt cho từng ảnh trong batch, tự động vẽ đúng vị trí riêng khi xuất hàng loạt.
  - **Cố định cấu trúc phản hồi AI**: Tích hợp cấu hình `responseSchema` cứng vào Gemini API, ép buộc kết quả phân tích AI luôn có định dạng thiết kế đa tầng nghệ thuật (`elements`), sửa triệt để lỗi thỉnh thoảng AI chỉ trả về 2 dòng chữ thô sơ.
  - **Xuất ảnh độ phân giải gốc**: Sử dụng Canvas để ghép ảnh gốc cùng khối chữ đã thiết kế theo đúng tỷ lệ thật, giúp ảnh cưới tải về giữ nguyên độ sắc nét cao.
  - **Xác minh**: Khởi chạy thành công trên trình duyệt, kiểm tra console sạch không có lỗi JS và chụp màn hình UI thực tế lưu trữ tại thư mục Artifacts.

## 29/06/2026
- **Khắc phục lỗi không vào được ứng dụng (social.hansstudio.net)**:
  - **DNS Hostinger**: Hướng dẫn anh Hiệp cấu hình thành công bản ghi A cho host `social` trỏ về IP VPS `163.223.13.238`.
  - **Cấu hình Nginx & SSL/HTTPS**: SSH trực tiếp vào VPS tách biệt cấu hình block Nginx cho `social.hansstudio.net` độc lập khỏi `social.2hstudio.vn`, sau đó chạy Certbot cấp thành công chứng chỉ SSL Let's Encrypt cho `social.hansstudio.net` và tự động redirect từ HTTP sang HTTPS.
  - **Đồng bộ mã nguồn & Deploy**: Fetch và pull bản build mới nhất chứa tính năng **Hộp thư Page V1 & Demo Mode AI** về VPS. Cập nhật các biến môi trường (`domain`, `NEXTAUTH_URL`, `NEXT_PUBLIC_APP_URL`, `TIKTOK_REDIRECT_BASE_URL`) trong `.env` sang domain mới `social.hansstudio.net`.
  - **Khởi động**: Chạy thành công `npx prisma generate`, `npm run build` và reload tiến trình PM2 `han-autopilot`. 
  - **Xác minh**: Chạy curl kiểm tra nội bộ phản hồi status 307 redirect về trang `/login` thành công mượt mạc, ứng dụng đã lên sóng ổn định.

- **Tinh chỉnh Sidebar Navigation & Thiết kế lại giao diện Inbox**:
  - **Sidebar Menu**: Cập nhật [Navigation.tsx](file:///c:/AntiCode/hans-studio/han-social-autopilot/src/app/components/Navigation.tsx) để xóa bỏ hoàn toàn 2 tab **AI Studio** (✨) và **Edit video** (🎬) theo yêu cầu tinh giản của anh Hiệp.
  - **Inbox Spacing & Padding**: Khắc phục lỗi reset CSS toàn cục (`* { padding: 0; margin: 0; }`) triệt tiêu khoảng thở của Inbox bằng cách viết riêng module **Semantic CSS** tùy chỉnh ở cuối [globals.css](file:///c:/AntiCode/hans-studio/han-social-autopilot/src/app/globals.css) với `!important`.
  - **Inbox Layout Redesign**: Thiết kế lại toàn bộ trang `/inbox`:
    - Rút ngắn chiều cao khung bao ngoài thành `h-[calc(100vh-4.5rem)]` để khớp đối xứng hoàn hảo trong AppShell mà không sinh cuộn dọc ngoài.
    - Cải tiến danh sách khách hàng thành các **Bento Card** bo góc mềm mại, giãn cách thoáng đãng và có thanh chỉ báo active màu tím thương hiệu.
    - Định nghĩa bong bóng tin nhắn có khoảng đệm rộng rãi `py-3 px-4`, nổi khối 3D rõ rệt và tự động thích nghi màu sắc tương phản cao trên cả Light Mode & Dark Mode.
    - Ẩn mũi tên mặc định của select chọn page bằng `appearance: none !important`, tích hợp icon `<ChevronDown />` căn tuyệt đối ở bên phải để có mũi tên xổ xuống đồng bộ, chuyên nghiệp ở cả 2 giao diện.
    - Tối ưu hóa khoảng cách cho thanh tìm kiếm, bộ lọc, quick replies và khung soạn thảo văn bản.
  - **Deploy & PM2 Hard Restart**: Thực hiện push mã nguồn lên Git và deploy VPS. Tiến hành stop/delete/start PM2 thay vì chỉ reload để xóa sạch RAM và cache Next.js, đưa giao diện Bento mới hoạt động live hoàn hảo.

## 27/06/2026
- **Cải tiến ứng dụng Pose Flow Builder (V2, V2.1, V2.2 & V2.3)**:
  - Thêm nút chuyển đổi chế độ xem **Thu gọn / Chi tiết** (lưu trạng thái vào `localStorage`). Ở chế độ Thu gọn, card ảnh chỉ rộng 150px, ẩn toàn bộ ghi chú và nhãn chọn, giúp kéo thả sắp xếp 20-30 ảnh cùng lúc cực kỳ thuận tiện trên iPad/PC.
  - Thêm thanh **Bộ lọc tư thế (Pose Filters)** hỗ trợ lọc nhanh theo các nhãn Đứng, Tựa, Ngồi, Nằm, Cận cảnh.
  - Đồng bộ bộ lọc tư thế với **Trình chiếu (Present Mode)**: Khi đang lọc, slide-show chỉ trình chiếu các ảnh thuộc nhóm được lọc.
  - Vô hiệu hóa tính năng Drag & Drop và nút Lên/Xuống khi đang trong chế độ lọc để bảo vệ tính nhất quán của thứ tự sắp xếp toàn cục (chỉ cho phép sắp xếp khi chọn bộ lọc "Tất cả").
  - **Tích hợp quản lý Đa Concept (Multi-Concept Manager)**: Thêm card quản lý concept bên Sidebar, hỗ trợ Thêm mới, Sửa tên, Xóa concept.
  - **Nâng cấp đồng bộ cơ sở dữ liệu**: Hỗ trợ Xuất/Nhập toàn bộ concept và ảnh qua file JSON, tích hợp 2 chế độ: Ghi đè (Overwrite) và Gộp tiếp (Merge) có xử lý map ID tránh xung đột.
  - **Di trú dữ liệu an toàn**: Nâng cấp IndexedDB lên Version 2, tự động di trú ảnh cũ của anh Hiệp vào *"Concept mặc định"* mà không gây mất dữ liệu.
  - **Thay thế hộp thoại mặc định bằng Popup Custom**: Thiết kế hệ thống popup modal tùy biến bóng bẩy theo phong cách dark-mode và gold sang trọng của Han's Studio, thay thế triệt để các hộp thoại thô sơ `alert()`, `confirm()`, `prompt()` cũ của trình duyệt.
  - **Tích hợp thanh Thumbnail Trình chiếu**: Thêm thanh ngang ảnh thu nhỏ ở chân Modal Trình chiếu, tự động đồng bộ ánh sáng viền vàng gold, hỗ trợ click chuyển ảnh nhanh và cuộn mượt mà đưa ảnh đang chiếu vào tâm hàng ngang (`scrollIntoView`).
  - **Hỗ trợ lăn chuột giữa cuộn ngang (Horizontal Wheel Scroll)**: Lập trình sự kiện `wheel` chuyển đổi lực lăn dọc của chuột thành hành động cuộn ngang dải thumbnail mượt mà, giúp duyệt hàng loạt ảnh dễ dàng trên PC.
  - Đã chạy `vercel deploy --prod` cập nhật thành công dự án lên tên miền chính thức: https://pose-hans.vercel.app và push code lên GitHub.

- **Chuyển đổi Monorepo & Cấu hình DNS VPS cho Han's Social Autopilot**:
  - Di chuyển thành công thư mục dự án `han-social-autopilot` vào trong monorepo lớn `hans-studio`.
  - Cấu hình `.gitignore` dự án cha để bỏ qua `han-social-autopilot/` nhằm giữ hai kho Git độc lập an toàn, không gây xung đột commit.
  - Cập nhật Nginx cấu hình VPS (`social.2hstudio.vn` config) để bổ sung và nhận diện tên miền mới `social.hansstudio.net` & `www.social.hansstudio.net`. Reload Nginx thành công.
  - Hướng dẫn anh Hiệp cách xử lý lỗi trùng lặp/xung đột bản ghi trên Hostinger (xóa bản ghi CNAME cũ của Vercel trước khi thêm bản ghi A mới trỏ về IP VPS `163.223.13.238`).

- **Xây dựng tính năng Hộp thư Page V1 (Facebook Page Inbox) cho Han's Social Autopilot**:
  - Viết 3 API endpoints quản lý hội thoại: conversations list, conversation messages detail, và send response. Tích hợp cơ chế tự động fallback sang Demo mode khi có sự cố token/API.
  - Tạo trang `/inbox` với giao diện 2 cột Zalo-like layout chuyên nghiệp (quản lý page, lọc Chưa đọc, search, chat history bong bóng màu sắc, Auto Bot AI status).
  - Tích hợp tính năng Chat Demo thông minh: khi nhắn tin trong Demo Mode, hệ thống tự động chạy Gemini AI đóng vai khách hàng hỏi đáp dịch vụ cưới của studio, phản hồi lại tự nhiên sau 1.5 giây.
  - Tích hợp thanh trả lời nhanh (Quick Replies) 1-click điền form chat cực kỳ tiện lợi cho admin.
  - Chạy build production `npm run build` kiểm tra cú pháp và logic biên dịch thành công 100%.

## 26/06/2026
- **Xây dựng ứng dụng Pose Flow Builder tại thư mục /pose-flow**:
  - Tạo thành công tệp HTML/CSS/JS độc lập quản lý, gắn nhãn (Đứng, Tựa, Ngồi, Nằm, Cận) và tự động sắp xếp concept dáng chụp cho bé, gia đình, bầu, beauty và cặp đôi.
  - Tích hợp IndexedDB giúp lưu trữ base64 hình ảnh offline trực tiếp trên trình duyệt thiết bị (không bị mất ảnh khi F5).
  - Lập trình tính năng kéo thả (Drag & Drop) sắp xếp thủ công trực quan và nút Lên/Xuống cho di động.
  - Thiết kế chế độ trình chiếu (Present Mode) hỗ trợ vuốt chạm (Swipe) trên iPad/Điện thoại khi đi chụp hiện trường.
  - Bổ sung 2 nút Xuất/Nhập tệp dữ liệu JSON giúp dễ dàng truyền tải dự án giữa máy tính và iPad.
- **Sửa lỗi Chrome Windows & Deploy Vercel**:
  - Khắc phục lỗi "Chữ trắng trên nền trắng" (tàng hình) của select-dropdown option trên Chrome Windows và dọn logo lỗi 404.
  - Triển khai bản chính thức thành công lên Vercel tại: https://pose-hans.vercel.app.

## 24/06/2026
- **Tạo địa điểm Google Maps cho Han's Studio (Vĩnh Lộc, Thanh Hóa)**:
  - Đồng hành cùng anh Hiệp đăng ký thành công địa điểm doanh nghiệp chính thức "Han's Studio - Chụp ảnh bé và gia đình" tại địa chỉ 134 Khu 1, TT Vĩnh Lộc, Vĩnh Lộc, Thanh Hóa.
  - Hướng dẫn cấu hình danh mục kinh doanh chính (Studio nhiếp ảnh) và danh mục phụ (Dịch vụ trang điểm).
  - Tối ưu hóa mô tả doanh nghiệp chuẩn SEO (550 ký tự) tập trung vào các dịch vụ thế mạnh: chụp ảnh em bé, gia đình, mẹ bầu, chân dung beauty và makeup chuyên nghiệp.
  - Điền đầy đủ thông tin hotline (0985 198 958), cấu hình giờ mở cửa (8h - 21h) và hướng dẫn thêm link website (makeup.hansstudio.net) để kích hoạt nút gọi điện/trang web.
  - Hướng dẫn tải lên ảnh đại diện, ảnh bìa thương hiệu và bộ ảnh chụp/mặt tiền thực tế để chờ Google duyệt hiển thị công khai.

