### 2026-08-02 - Race condition khi switchTab async & Lỗi thừa ngoặc nhọn trong JS module
- **Vấn đề 1 (Race condition khi switchTab)**: Trong `DOMContentLoaded` hoặc khi chuyển đổi Admin mode, nếu gọi `switchTab` liên tiếp mà không await sẽ dẫn đến tình trạng tranh chấp tài nguyên (race condition) do module cũ đang render đè lên module mới khởi tạo.
  - **Cách khắc phục**: Thay vì dùng `switchTab` để làm mới view khi đổi trạng thái admin, hãy xây dựng cơ chế **re-init trực tiếp** toàn bộ các module đã tải (`initBaogiaModule(isAdm)`, `initConceptsModule(isAdm)`) để cập nhật giao diện ngay lập tức mà không cần reload trang hay đổi tab.
- **Vấn đề 2 (Lỗi cú pháp thừa ngoặc đóng `}`)**: Khi chèn/dán nhanh một đoạn mã hỗ trợ vào file JS module, việc dư thừa một dấu ngoặc đóng `}` ở cuối block code sẽ phá vỡ hoàn toàn cú pháp biên dịch của file Javascript đó. Khi chạy dưới dạng ES Module, lỗi biên dịch này sẽ làm cho trình duyệt từ chối nạp toàn bộ module đó, dẫn đến giao diện của tab bị trắng trơn hoàn toàn mà không có thông báo lỗi rõ ràng trên UI.
  - **Cách khắc phục**: Luôn kiểm tra cấu trúc ngoặc đóng mở của tệp bằng công cụ định dạng tự động hoặc verify qua console lỗi trước khi đẩy code. Nếu tab bị trắng trơn đột ngột, nguyên nhân 99% là lỗi cú pháp JS (syntax error) ở file module vừa sửa.

### 09/05/2026 - Lỗi 'Identifier has already been declared' khi dùng document.write() trong GAS SPA
- **Lỗi**: Khi dùng document.write(html) để thay thế UI sau khi Logout, nếu trong file HTML có khai báo top-level let hoặc const, lần chạy thứ hai sẽ gây văng lỗi do Global Context không bị reset.
- **Fix**: Bắt buộc dùng  ar cho toàn bộ các biến toàn cục (top-level variable). Đã được đúc kết vào Rule 8 của dashboard-builder.

### 09/05/2026 - Lỗi mất thẻ HTML khi dùng replace hàng loạt
- **Lỗi**: Khi dùng tool replace/sed thay đổi cấu trúc HTML tự động số lượng lớn, thẻ <tbody> có thể bị xóa nhầm khiến logic render bảng JS thất bại mà không báo lỗi console.
- **Fix**: Sau khi thay đổi cấu trúc DOM, phải luôn verify lại DOM tree hoặc dùng grep kiểm tra lại ID của các phần tử.

## [2026-05-10] Financial Dashboards & Data Visualization
- **Vấn đề:** Khi vẽ biểu đồ thu/chi, biểu đồ cơ cấu, các nhãn quá dài bị cắt, dữ liệu quá vụn, màu sắc lộn xộn.
- **Cách fix:** Bắt buộc tách Dòng Tiền Thu và Chi thành 2 chart ngang. Dùng thuật toán đệ quy indTopParent ở Server-side để gộp nhóm Cây tài khoản trước khi render. Dùng màu Xanh (Vào) - Đỏ (Ra). Bắt buộc dùng Horizontal Bar thay vì Pie/Vertical cho nhãn dài.

## 2026-05-10 - HTML Injection & CSS Zoom
- BẮT BUỘC dùng API DOM nguyên thủy document.createElement('option') thay vì innerHTML để tránh lỗi HTML injection khi value chứa nháy kép.
- Khai báo CSS zoom Fullscreen phải xóa thuộc tính thừa top: 0 !important; đè lên top: 5%;

## 2026-05-11 - MCP Server Configuration (Docker vs Node.js)
- **Vấn đề**: Cài đặt GitHub MCP Server trên Windows báo lỗi `docker: executable file not found in %PATH%`.
- **Cách fix**: Cập nhật file `.gemini/antigravity/mcp_config.json`, chuyển đổi `command` từ `"docker"` thành `"npx"` và `args` thành `["-y", "@modelcontextprotocol/server-github"]`.
- **Gotcha**: Figma Dev Mode MCP Server (mcp-remote) cần có Figma Desktop đang mở chế độ Dev Mode và chạy Plugin MCP tương ứng để mở cổng 3845, nếu không sẽ gặp lỗi `ECONNREFUSED`.

## 2026-05-13 - Clasp Deploy, Pull Overwrite & Deployment ID
- **Lỗi Mất Code (Data Loss)**: Khi `clasp push` thành công nhưng user không thấy thay đổi trên link `/exec`, nguyên nhân là user đang truy cập một **Deployment ID cố định** cũ (ví dụ `@7`). Nếu vội vàng chạy `clasp pull` để debug, toàn bộ code MỚI ở local sẽ bị ghi đè bằng code CŨ trên server, dẫn đến **mất sạch công sức chưa commit**.
- **Cách fix & Phòng tránh**:
  1. **TUYỆT ĐỐI KHÔNG** chạy `clasp pull` nếu chưa `git commit` các thay đổi ở local.
  2. `clasp push` chỉ cập nhật bản `@HEAD` (link `/dev`).
  3. Để cập nhật đúng link Production của user, cần lấy Deployment ID (`clasp deployments`), sau đó chạy lệnh chỉ định đúng ID: `clasp deploy -i <DEPLOYMENT_ID> -d "Mô tả version"`. Nếu không có `-i`, clasp sẽ sinh ra một link (ID) hoàn toàn mới, user truy cập link cũ vẫn không thấy thay đổi.

### 2026-05-14 - Lỗi Kẹt Session Cũ & Thiếu Ngày Trong Biểu Đồ Time-series
- **Vấn đề**: Biểu đồ bỏ qua ngày không có dữ liệu gây đứt quãng trục X; Client kẹt tên nhân viên cũ do cache localStorage.
- **Giải pháp**: Tạo mảng ngày liên tục (từ start -> current) để lặp và gán giá trị 0 cho ngày trống; Bắt buộc render UI lập tức từ localStorage, trang bị nút Đăng xuất rõ ràng, dùng hàm vét cạn Math.max khi tìm index cột để lấy đúng data auth.

### 2026-05-14 - Bypass Google Cloud OAuth2 Complexity trong n8n
- **Vấn đề**: Cài đặt OAuth2 cho Google Sheets trong self-hosted n8n cần tới 15 bước rườm rà (Google Cloud Project, OAuth Consent, Client ID) và dễ bị lỗi hết hạn token nếu không publish App.
- **Giải pháp (Hacker Pattern)**: Bỏ qua Node Google Sheets. Dùng Google Apps Script tạo 1 hàm `doPost(e)` nhận JSON và `appendRow`. Publish file dưới dạng Web App (Anyone). Tại n8n, dùng HTTP Request (POST) gửi raw JSON `{{ $json.content.parts[0].text }}` thẳng sang Web App. Nhanh, bảo mật bằng link ẩn, không bao giờ hết hạn token.


### 2026-05-15 - Lỗi tàng hình Login UI (GAS Web App)
- **Vấn đề**: Người dùng phàn nàn 'Bảng Login không hiển thị' mặc dù code hoàn toàn chính xác. Nguyên nhân là do: 1) Người dùng test trên link /exec (chỉ hiển thị bản Deploy cũ) sau khi clasp push (chỉ đẩy lên HEAD ở link /dev); 2) Trình duyệt còn lưu localStorage nên tính năng Auto-Login đã đưa người dùng nhảy thẳng vào Dashboard.
- **Giải pháp**: Nhắc nhở người dùng phân biệt /dev (Test) và /exec (Production). Hướng dẫn dùng Incognito (Tab ẩn danh) hoặc bấm nút Đăng xuất trước khi test lại UI Login.

### 2026-05-15: AppSheet Security Expressions
- **Lỗi 'Parameter 2 of function IN is of the wrong type'**: Xảy ra khi dùng hàm IN() với cột Text đơn (vd: [chuc_vu]). Giải pháp: Đổi sang phép = (vd: [chuc_vu] = 'Quản lí').
- **Lỗi 'Bốc hơi' dữ liệu cá nhân**: Xảy ra khi kẹp điều kiện [nguoi_tao] hoặc [id_nhan_vien] vào chung hàm AND() chứa điều kiện lọc chi nhánh/phòng ban. Giải pháp: Giải phóng quyền cá nhân ra vòng OR() ngoài cùng.
- **Lỗi logic Quẹt thẻ (2 lớp)**: Với các bảng đặc thù như Phân bổ NV, kẹp hàm IN(mã) bằng hàm AND() bên ngoài vòng OR() chức vụ để bắt buộc user phải có mã truy cập mới được xét chức vụ.
- **Lỗi cú pháp do Comment**: AppSheet Expression Assistant cực kỳ dị ứng với comment (//). Tuyệt đối không dùng comment trong công thức AppSheet.

### 2026-05-16: React Router Hash Links across pages
- **Gotcha**: When using simple `<a href="#section">` tags in a React app with React Router, it might only change the URL hash and not trigger a scroll or page reload if you are on another route (e.g. `DetailPage.tsx`).
- **Fix**: Use `<a href="/#section">` to ensure the browser resolves the path from the root, allowing it to navigate to the Home page and jump to the section correctly from sub-pages. Ensure the target section actually has the `id="section"` attribute.

### 2026-05-26 - Lỗi Treo Loader Vĩnh Viễn Do Eval/Init Script Lỗi và Auto-Login Cập Nhật Cache Chậm
- **Vấn đề 1 (Treo Loader khi chuyển tab)**: Khi tải động một module mới trên Master Portal, nếu server trả về HTML lỗi hoặc quá trình biên dịch `eval` gặp lỗi runtime, hệ thống sẽ bị ngắt script giữa chừng. Do không được bọc trong khối an toàn, hàm `hideLoader()` không bao giờ được gọi khiến loader quay vĩnh viễn trên màn hình.
  - **Cách khắc phục**: Bọc toàn bộ các lệnh `eval` và hàm khởi tạo `init()` của module mới trong các khối `try-catch` cực kỳ an toàn tại [Shell_JS.html](file:///c:/AntiCode/appsheet-edit/Build-dashboard/Dash_Master_Portal/Shell_JS.html), đồng thời tự động gọi `hideLoader()` ở khối `else` hoặc `catch` để giải phóng giao diện ngay lập tức nếu tải thất bại.
- **Vấn đề 2 (Auto-login nuốt trường bảo mật mới)**: Khi bổ sung thuộc tính phân quyền mới (ví dụ `isSuperAdmin`), người dùng tải lại trang (F5) sẽ không thấy thay đổi. Nguyên nhân do cơ chế Tự động đăng nhập đọc dữ liệu session cũ trong bộ nhớ đệm `localStorage` của Client để gửi lên server, khiến thuộc tính mới hoàn toàn bị thiếu.
  - **Cách khắc phục**: Thiết lập một khối xử lý tự động vá/phục hồi cache (**Auto-heal cache**) ở server-side tại hàm `getDashboardHtml` của [Code.js](file:///c:/AntiCode/appsheet-edit/Build-dashboard/Dash_Master_Portal/Code.js). Máy chủ sẽ chủ động đối chiếu email người dùng với danh sách đặc quyền `SUPER_ADMIN_EMAILS` và tự động tiêm trường `isSuperAdmin: true` vào profile trước khi render giao diện, giúp vá lỗi cache cũ của trình duyệt khách mà không cần bắt họ đăng xuất phiền hà.


### 2026-05-16: Vercel & Google Drive Image Integration
- **Gotcha**: Google Drive provides a sharing link (`/file/d/ID/view`) which cannot be directly used in `<img>` tags due to iframe and CORS restrictions. Asking users to manually convert links via 3rd party tools is a bad UX.
- **Fix**: Create a regex utility (`drive.ts`) to extract the `FILE_ID` directly from the input string in the frontend, and format it as `https://drive.google.com/uc?export=view&id=FILE_ID`. Wrap all API image URL fields in this function so users can seamlessly paste normal Drive links in Google Sheets.

### 2026-05-20: Tôn trọng thiết kế ban đầu & Triệt để chống Over-engineering theo yêu cầu người dùng
- **Gotcha**: Khi cải tiến giao diện hoặc logic, tuyệt đối không được tự ý thay đổi tài nguyên thương hiệu cốt lõi (như hình ảnh Logo) của người dùng hoặc đưa vào các thiết kế của dự án khác mà không được yêu cầu. Đồng thời, không phải cứ tính năng "thông minh/phức tạp" (như form đăng ký, Telegram Bot, CRM) là tốt; đôi khi người dùng chỉ cần giao diện gọn gàng nhất, thoáng đãng và chuyển đổi trực tiếp thành Hotline/Zalo/Messenger (được hỗ trợ sẵn bởi các nút Floating Contact).
- **Cách fix**:
  1. Luôn bảo lưu tài nguyên thương hiệu logo gốc (`/thumakeup.png` cùng các bộ lọc màu).
  2. Lắng nghe và triệt để đơn giản hóa giao diện: loại bỏ hoàn toàn các form liên hệ/đăng ký rườm rà ở cả Trang Chủ và Trang Chi Tiết, hướng nút kêu gọi hành động (CTA) trực tiếp thành link gọi điện thoại (`tel:0826238383`) hoặc liên kết mạng xã hội hiện có của studio. Code sạch sẽ, gọn gàng, giảm thiểu tài nguyên tải trang.

### 2026-05-22: Tối ưu lề chân trang khi kết xuất ảnh (Poster/PDF Export)
- **Vấn đề**: Khi đưa các danh sách dài có nhiều nội dung vào bố cục một cột trên khung ảnh canvas có chiều cao cố định (ví dụ `1550px`), nội dung sẽ dãn dài xuống và đè sát hoặc dính chặt vào lề dưới/thanh liên hệ ở đáy (sát lề dưới).
- **Giải pháp**:
  1. Nâng chiều cao tổng thể của tấm Poster xuất khẩu thêm khoảng `150px - 200px` (ví dụ từ `1550px` lên `1720px`) để tăng không gian đứng dọc.
  2. Tinh chỉnh thu gọn khoảng cách dòng (`gap` và `margin-bottom` của `.poster-body` và `.poster-roadmap-grid`) từ 5px đến 10px để nội dung được gom lại thoáng đãng và thanh nhã, tạo ra khoảng lề dưới (breathing room) sang trọng tối thiểu 100px.

### 2026-05-23: Lỗi Màn Hình Đen & Treo Renderer Process trên Antigravity v2.0.6 (Windows 11)
- **Vấn đề**: Sau khi cập nhật hoặc khởi chạy Antigravity v2.0.6 mới, ứng dụng hiển thị một khung cửa sổ đen hoàn toàn và bị treo ngầm. Nguyên nhân do cơ chế GPU sandbox và Chromium process isolation mới xung đột nghiêm trọng trên Windows 11.
- **Giải pháp**: Tách biệt hoàn toàn thư mục cấu hình và Extension của 2 phiên bản bằng cách sử dụng các đối số (arguments) Chromium đặc dụng trong Shortcut Desktop:
  1. `--disable-gpu --disable-gpu-sandbox --no-sandbox` để tắt hoàn toàn GPU tăng tốc phần cứng và sandbox tiến trình render bị lỗi.
  2. `--user-data-dir="C:\Users\Hiep Hoang\AppData\Roaming\Antigravity_2"` để cô lập dữ liệu người dùng không bị xung đột khóa file.
  3. `--extensions-dir="C:\Users\Hiep Hoang\.antigravity"` để sử dụng chung thư mục extensions cũ.

### 2026-05-23: Xử lý lồng kho Git độc lập vào trong thư mục con của dự án cha (Nested Git Repositories)
- **Vấn đề**: Khi di chuyển một dự án độc lập có sẵn thư mục `.git` vào bên trong một thư mục con của dự án Git cha (ví dụ di chuyển `giao_trinh_makeup` vào trong `hans-studio`), Git của dự án cha sẽ phát hiện thấy thư mục con có `.git` và mặc định xem đó là "submodule/gitlink" chưa hoàn chỉnh. Điều này làm cho dự án cha không thể commit được thư mục con một cách bình thường và gây lỗi xung đột lịch sử commit.
- **Giải pháp**:
  1. Thêm đường dẫn thư mục con vào `.gitignore` của dự án cha (ví dụ thêm `giao_trinh_makeup/` vào `hans-studio/.gitignore`).
  2. Điều này giúp hai kho Git chạy độc lập tuyệt đối trên cùng một thư mục vật lý. Dự án cha và dự án con có thể commit và push lên các repository GitHub tương ứng một cách sạch sẽ, không ảnh hưởng lẫn nhau và các kênh deploy tự động (như Vercel) hoạt động bình thường.

### 2026-05-23: Lỗi 'Cannot find drive' do cơ chế Sandbox của IDE chặn chạy lệnh Git/CLI ngoài
- **Vấn đề**: Khi chạy lệnh Git hoặc bất kỳ chương trình CLI bên ngoài (ví dụ `git status`, `where.exe git`, `clasp push`) trong Terminal nội bộ của IDE Antigravity, hệ thống báo lỗi `Cannot find drive. A drive with the name 'Microsoft.PowerShell.Core\FileSystem' does not exist.` Lỗi này xảy ra do cơ chế sandbox bảo mật của IDE chặn quyền truy cập dịch vụ Hệ thống tệp (FileSystem provider) của PowerShell khi nạp tiến trình bên ngoài. Các lệnh tích hợp sẵn của PowerShell (như `echo`) vẫn chạy bình thường.
- **Giải pháp**: 
  1. Tuyệt đối không cố gắng sửa lỗi Registry hay cài lại PowerShell của Windows vì đây là do sandbox của IDE.
  2. Cách giải quyết triệt để và an toàn nhất là hướng dẫn người dùng mở **Windows Terminal**, **Git Bash**, hoặc **CMD** trực tiếp ngoài môi trường của IDE để thực hiện các thao tác dòng lệnh (như `git add/commit/push` hoặc `clasp deploy`). Môi trường ngoài hệ thống sẽ hoạt động thông suốt và an toàn 100%.



### 2026-05-23: Lỗi Treo Màn Hình Chờ (White Loading Screen) do Timeout & Fallback API Quá Ngắn
- **Vấn đề**: Khi sử dụng Google Sheets làm database thông qua API Google Apps Script Web App, thời gian phản hồi có thể lên tới 5 - 10 giây ở lần đầu tiên (do cơ chế Cold Start ngủ ngầm của Google). Nếu cài đặt thời gian chờ (Timeout/AbortController) quá ngắn (ví dụ 3.5 giây), API sẽ luôn bị hủy bỏ và kích hoạt lỗi. Nếu logic xử lý lỗi tự động ghi đè giao diện bằng dữ liệu tĩnh dự phòng (mockup data), website sẽ bị "quay ngược thời gian" trở về bản mockup thô sơ khai ban đầu, làm biến mất hoàn toàn dữ liệu thực của người dùng.
- **Giải pháp**:
  1. Loại bỏ hoàn toàn AbortController hoặc Timeout cưỡng bức đối với các tác vụ nạp dữ liệu chạy ngầm (background fetch). Vì giao diện đã được nạp tức thì trong 0s qua cache, việc fetch ngầm có thể chạy tự do không lo ảnh hưởng trải nghiệm người dùng.
  2. Áp dụng chuẩn mô hình Stale-While-Revalidate (SWR): Khởi tạo trạng thái giao diện bằng bộ nhớ đệm `localStorage` (hoặc dữ liệu dự phòng ban đầu nếu chưa có cache) để mở web tức thì trong 0.01 giây. Chạy ngầm việc fetch dữ liệu mới. Khi fetch thành công mới cập nhật UI và ghi đè cache. Nếu fetch thất bại (lỗi mạng thực sự), chỉ ghi log lỗi và **giữ nguyên dữ liệu hiện tại**, tuyệt đối không ghi đè dữ liệu tĩnh mặc định cũ lên màn hình.

### 2026-05-23: BẢO MẬT LÀ ƯU TIÊN SỐ 1 (P0 SECURITY-FIRST PARADIGM) - CHỈ THỊ CỦA FOUNDER (ANH HIỆP)
- **Vấn đề**: Trong phát triển sản phẩm (đặc biệt là AI-Native), tốc độ build nhanh thường đi kèm với rủi ro bỏ quên các quy chuẩn bảo mật (lộ credentials, API Keys, token client-side, lỗi phân quyền). Mọi lỗi bảo mật khi lên production đều gây thiệt hại khổng lồ về tài chính và niềm tin khách hàng.
- **Quy tắc tuyệt đối**: Từ nay trở đi, BẢO MẬT là ưu tiên tối cao trong mọi khâu thiết kế, lập trình và triển khai.
  1. Không bao giờ hardcode API Keys, Bot Tokens, mật khẩu vào mã nguồn client-side.
  2. Bắt buộc sử dụng các Secure Proxy (như Google Apps Script Script Properties hoặc Backend APIs) để thực hiện các yêu cầu nhạy cảm thay vì gọi trực tiếp từ trình duyệt.
  3. Kiểm tra cẩn thận cơ chế build của các công cụ (như Vite với tiền tố `VITE_`) để đảm bảo các biến môi trường nhạy cảm không bị nhúng tĩnh vào bundle JS của production.
  4. Luôn ghi nhận chỉ thị "Security-First" này vào neural core để hướng dẫn mọi hành động trong tương lai.

### 2026-05-23: Lỗi Phân Quyền Artifact (Invalid Artifact Path) trong tool write_to_file của IDE
- **Vấn đề**: Khi tạo hoặc chỉnh sửa các file mã nguồn, file cấu hình hoặc script thông thường của hệ thống nằm ngoài thư mục brain của conversation hiện tại (ví dụ: `.agent/skills/...`, `scripts/...`), nếu đặt thuộc tính `IsArtifact: true` và truyền `ArtifactMetadata` trong công cụ `write_to_file`, hệ thống sẽ văng lỗi phân quyền `is not a valid artifact path`. Lỗi này do cơ chế bảo mật của IDE chặn ghi artifact ngoài thư mục brain chỉ định.
- **Giải pháp**: 
  1. Với tất cả các file cấu hình, scripts, code thông thường trong dự án, bắt buộc thiết lập `IsArtifact: false` và để trống `ArtifactMetadata` khi gọi công cụ `write_to_file`.
  2. Chỉ thiết lập `IsArtifact: true` đối với các file báo cáo Markdown nằm trong đúng thư mục brain của cuộc trò chuyện hiện tại (như `implementation_plan.md`, `task.md`, `walkthrough.md`).

### 2026-05-24: Chart.js Zoom Modal vs DOM-Shifting & Vấn đề Flex Height
- **Vấn đề 1**: Phóng to Chart.js bằng cách bốc <canvas> đưa vào trong một thẻ Modal (Popup) khiến biểu đồ bị mất tỷ lệ, co rút vào góc trái màn hình do Chart.js mất context của Parent Node.
- **Giải pháp 1**: Tuyệt đối không di chuyển DOM của biểu đồ. Thêm class .panel-zoomed (position fixed, 85vw/85vh, z-index 99999) thẳng vào thẻ cha (.glass-card). Dùng thủ thuật ox-shadow: 0 0 0 100vmax rgba(...) để tạo nền backdrop tối mờ mà không cần tạo thẻ Overlay bằng JS.
- **Vấn đề 2**: Khi phóng to thẻ cha, biểu đồ không chịu nở to ra theo chiều dọc (chiều cao vẫn lùn) do thẻ bọc ngoài cùng (wrapper) bị giới hạn bởi class h-64 của Tailwind.
- **Giải pháp 2**: Thêm CSS .panel-zoomed > div:last-child { height: 100% !important; flex: 1 1 auto; } để ép thẻ bọc <canvas> phải giãn nở toàn bộ không gian còn lại. Bắt buộc gọi chart.resize() khi phóng to và chart.destroy() + renderCharts() khi thu nhỏ để fix lỗi cache kích thước.

### 2026-05-24: Lỗi Silent Fail do Thứ tự Tham số Truyền Bị Ngược (Parameter Ordering)
- **Vấn đề**: Code JS không chạy, click không phản hồi (ví dụ nút Zoom bị liệt) nhưng console lại không báo lỗi đỏ. Nguyên nhân thường gặp khi refactor code HTML sang JS: HTML gọi hàm onclick="toggleZoom(this, 'id')" nhưng JS định nghĩa 	oggleZoom(id, btnElement). Hàm document.getElementById([object HTMLButtonElement]) trả về 
ull rồi 
eturn luôn nên lỗi bị nuốt (silent fail).
- **Giải pháp**: Phải luôn đồng bộ tuyệt đối thứ tự tham số giữa View (HTML onclick) và Controller (hàm JS).

### 2026-05-24: Xung đột Multi-Loader trong SPA
- **Vấn đề**: Màn hình bị lỗi "2 màn hình Đang tải" chồng lên nhau. Do các module lẻ trước đây thiết kế dạng Standalone tự định nghĩa <div id="loader"> riêng, khi gộp chung vào Master Portal có sẵn hàm showLoader() của Shell dẫn đến tình trạng hai cơ chế loading chạy song song.
- **Giải pháp**: Xóa bỏ các <div id="loader"> riêng lẻ cứng trong các file Module View. Chỉ sử dụng hàm showLoader() và hideLoader() của Master Portal để duy trì một Single Source of Truth cho trạng thái tải trang.

## 2026-05-24: Bài Học Về Bento Grid sập Layout, Chỉ số KPI vỡ & Callout Pie Chart to thô kệch (Module Đơn Hàng)
- **Lỗi 1 (Sập Bento Grid do DOM lệch)**: Một thẻ mở `<div>` (ở phần Filters group) bị thiếu thẻ đóng `</div>` tương ứng trong `Mod_DonHang_View.html` làm sập toàn bộ Grid/Flex, mất 3D shadow và bo góc của các card/bảng bên dưới.
  - **Cách phòng tránh**: Tuyệt đối không sao chép HTML máy móc. Bắt buộc rà soát thẻ mở/đóng và chạy auto-format trước khi đóng gói file View.
- **Lỗi 2 (Trùng lặp & Chen lấn nút thừa ở Filter)**: Gộp nhầm header cũ (Dark mode, Logout) vào thanh filter làm thanh filter chật chội và thô kệch.
  - **Cách phòng tránh**: Xoá sạch các nút logout/dark mode ở module lẻ vì Shell Master Portal đã lo việc này toàn cục. Chỉ giữ lại nút đồng bộ tinh tế.
- **Lỗi 3 (KPI Cards cũ vỡ layout)**: Các card KPI sử dụng class css cũ làm vỡ giao diện trên Master Portal mới.
  - **Cách phòng tránh**: Chuyển đổi 100% KPI cards sang dạng Bento Box cao cấp đồng bộ (chiều cao cố định 82px, icon bo tròn nền mờ 10% opacity, tiêu đề Inter nhỏ thanh lịch).
- **Lỗi 4 (Đồng bộ Trend tăng/giảm KPI)**: Chỉ số trend KPI hiển thị dạng đơn điệu `↓ 43.1%` không thống nhất với chuẩn `↗ Tăng (+80.2%)`.
  - **Cách phòng tránh**: Luôn sử dụng hàm `calculateTrend` đồng bộ của Lịch Công Việc để render chỉ số trend đẹp mắt có đầy đủ chữ Tăng/Giảm và icon v6.
- **Lỗi 5 (Nhãn Pie Chart to thô kệch & format tiền tệ sai)**: Giá trị rút gọn `1.100.000.000` mặc định của trình duyệt hiện `1,1 T` trông thô và không rõ nghĩa tài chính VN, nhãn callout font size 11px quá to so với biểu đồ.
  - **Cách phòng tránh**: 
    1. Viết lại hàm `compactFormat` để tự động Việt hóa đơn vị tài chính cực đẹp: `>= 1 Tỷ` hiển thị ` Tỷ` (ví dụ: `1,1 Tỷ`), `>= 1 Triệu` hiển thị ` Tr` (ví dụ: `70,2 Tr`), decimal dùng dấu phẩy phân cách.
    2. Giảm font size nhãn Pie Chart xuống `9px` bên trong và `8.5px` bên ngoài callout để hiển thị nhỏ gọn, tinh tế, tuyệt đối không bị tràn chữ.
- **Lỗi 6 (Mờ chữ bảng Drilldown ở Light Mode)**: Bảng chi tiết Offcanvas dùng class màu cũ (`text-gray-300`, `text-gray-400`, `border-gray-700/50`) làm chữ bị mờ tịt trên nền sáng (Light Theme) của Master Portal.
  - **Cách phòng tránh**: Thay thế 100% các class màu cũ bằng hệ màu Slate trung tính (`text-slate-700 dark:text-slate-200`, `text-slate-600 dark:text-slate-400`, `border-slate-100 dark:border-slate-800/40`) để chữ hiển thị rõ nét trên cả 2 giao diện sáng/tối.

### 2026-07-02 - Báo Giá v4: Trùng lặp ID, Lỗi đơn vị canvas rem/em & Chặn style inline của trình duyệt khi edit
- **Lỗi 1 (Trùng lặp ID slide do click đúp)**: Khi nhân bản slide, việc dùng `Date.now()` làm ID sẽ bị trùng nếu click đúp nhanh (cùng mili-giây). Khi trùng ID, trình duyệt bị bối rối và ghi đè chéo dữ liệu lên nhau.
  - **Cách fix**: Đổi sang hàm tạo ID ngẫu nhiên kết hợp mốc thời gian và một chuỗi ngẫu nhiên (`Math.random()`). Đồng thời viết thêm code tự động quét và sửa lỗi ID trùng lặp cũ từ LocalStorage ngay khi load trang.
- **Lỗi 2 (Co rúm chữ khi in ảnh do đơn vị rem)**: Khi dùng đơn vị `rem`, thư viện `html2canvas` scale ảnh HD lên 2.5 lần sẽ tính toán sai lệch so với font-size root gốc ảo, làm chữ to đè lên nhau, mất khoảng cách dòng.
  - **Cách fix**: Chuyển toàn bộ đơn vị đo font-size và spacing của card từ `rem` sang `em` (tỷ lệ theo kích cỡ card cha cố định 16px). Bọc hàm `html2canvas` trong sự kiện chờ tải xong font chữ `document.fonts.ready` để đảm bảo kết xuất ảnh chuẩn xác.
- **Lỗi 3 (Đơ slider chân trang)**: Do đổi ID thẻ chân trang từ `card-footer-el` thành `card-footer-container` để phục vụ render nhiều dòng chữ động, nhưng sự kiện trượt slider ở Sidebar vẫn còn tham chiếu đến ID cũ, dẫn đến việc biến JavaScript bị `null` và không thay đổi được cỡ chữ.
  - **Cách fix**: Cập nhật lại tham chiếu biến trỏ đúng vào thẻ container chân trang mới.
- **Lỗi 4 (Dòng mới thêm trong footer không đổi cỡ chữ)**: Khi gõ chữ hoặc copy-paste văn bản vào dòng chân trang mới thêm, trình duyệt tự động chèn thêm style inline ẩn (như `style="font-size: ...px"`). Style này ghi đè lên cỡ chữ do slider điều khiển.
  - **Cách fix**: Đặt `font-size: inherit !important;` cho các phần tử con edit `.item-text` và `.footer-line-text` để triệt tiêu hoàn toàn style inline có hại của trình duyệt.
- **Lỗi 5 (Chân trang bị xuống dòng sớm khi tăng cỡ chữ)**: Lề mặc định (padding) trái/phải quá lớn (`40px` mỗi bên) làm bó hẹp không gian hiển thị của chữ chân trang.
  - **Cách fix**: Tối ưu lại CSS lề mặc định nhỏ gọn (`15px`), chỉ tự động thụt lề (`50px`) khi di chuột vào (hover) để chừa chỗ cho các nút điều khiển xuất hiện.

### 2026-05-24: Lỗi Treo Loader Vĩnh Viễn do Session cũ thiếu trường (Module Nhà Cung Cấp)
- **Vấn đề**: Khi truy cập module mới (Nhà Cung Cấp), màn hình treo cứng ở loader "Đang tải dữ liệu module Nhà Cung Cấp...". Nguyên nhân do code xử lý phân quyền trên Server GAS (`MOD_NCC_getData`) gọi `user.phan_quyen_list.includes('Admin')` nhưng session đăng nhập cũ lưu trong localStorage của Client từ các phiên bản trước không hề có thuộc tính `phan_quyen_list`, dẫn đến crash `TypeError` trên Apps Script. Do Apps Script quăng lỗi Server-side làm `google.script.run` bị ngắt, mà client-side không handle tắt loader mượt mà khi xảy ra lỗi.
- **Giải pháp**:
  1. **Defensive Coding trên Server**: Bắt buộc kiểm tra an toàn sự tồn tại của mảng trước khi dùng `includes`, `some` hay `.length` (ví dụ: `user.phan_quyen_list && user.phan_quyen_list.includes('Admin')`).
  2. **An toàn hóa Catch Block**: Bọc toàn bộ logic server trong `try-catch` và trả về một JSON object có dạng `{ error: true, message: e.toString() }` thay vì ném exception thẳng thừng, giúp client nhận dạng lỗi trực tiếp, hiển thị cảnh báo qua `alert()` và gọi `hideLoader()` giải phóng giao diện lập tức.

### 2026-05-24: Lỗi Treo Loader Vĩnh Viễn Do Thiếu Đăng Ký MOD_ACTIVE Ở Client-side (Module Nhà Cung Cấp)
- **Vấn đề**: Khi bấm chuyển module "Nhà Cung Cấp", hệ thống hiện loader quay tròn "Đang tải dữ liệu module Nhà Cung Cấp..." và bị treo vĩnh viễn ở đó. Khi kiểm tra browser console hoàn toàn không có lỗi đỏ. Nguyên nhân do ở cuối file `Mod_NCC_Logic.html` bị thiếu dòng đăng ký module cốt lõi: `window.MOD_ACTIVE = window.MOD_NCC;`. Điều này khiến shell Router tải HTML xong nhưng không tìm thấy pointer `window.MOD_ACTIVE` để kích hoạt hàm khởi tạo `.init()`, do đó không gọi đến `fetchData()` và không bao giờ gọi `hideLoader()` để tắt vòng quay chờ.
- **Giải pháp**: Phải luôn đảm bảo tất cả các file Logic của module có dòng đăng ký module tương ứng với biến pointer `window.MOD_ACTIVE` toàn cục ở cuối file (ví dụ: `window.MOD_ACTIVE = window.MOD_NCC;`).

### 2026-05-24: Sự Khác Biệt Giữa clasp push (Bản HEAD/dev) Và clasp deploy (Bản Production/exec)
- **Vấn đề**: Dữ liệu nạp của module mới bị treo do hàm server-side không tồn tại, dù dev đã chạy `clasp push` đẩy code mới lên. Nguyên nhân là do link webapp của người dùng là link Production dạng kết thúc bằng `/exec` (chạy theo Deployment ID cố định được lưu vết). Khi chạy `clasp push`, hệ thống chỉ cập nhật code cho bản HEAD (chạy ở link `/dev`). Bản deploy cũ của link `/exec` vẫn chưa có code máy chủ mới.
- **Giải pháp**: Luôn liệt kê danh sách deployment bằng `clasp deployments`, sau đó chạy cập nhật trực tiếp đè lên Deployment ID cũ: `clasp deploy -i <DEPLOYMENT_ID> -d "Mô tả"` để cập nhật trực tiếp link Production `/exec` của người dùng. Hướng dẫn người dùng sau khi deploy xong bấm nút Đăng xuất trên Master Portal để dọn dẹp các session rác cũ từ localStorage.

### 2026-05-24 - Lỗi Cột Trống Trơn Và Nguồn Khách "Không Xác Định" Do Lệch Key Mapping (Module Tổng Hợp)
- **Vấn đề 1**: Cột Sale On/Sale Off trên bảng Chi tiết đơn hàng bị trống trơn mặc dù trong sheet thô có giá trị.
  - **Giải pháp**: Do `employeeMap` tại Client-side chỉ map Key là Tên tiếng Việt snake-case, trong khi dữ liệu đơn hàng từ sheet chứa ID/Email nhân viên (ví dụ `mr.coist@gmail.com`), và fallback `d.NV_sale_on` bị viết sai hoa/thường (server trả về snake-case chữ thường `nv_sale_on`). Sửa đổi bằng cách nâng cấp `employeeMap` lưu trữ song song cả 2 loại Key (Email ID viết thường + Tên snake-case) và viết hàm helper `getEmpName(val)` tra cứu an toàn.
- **Vấn đề 2**: Cột Chi Nhánh hiển thị ID thô (CN01, CN02...) thay vì tên Studio.
  - **Giải pháp**: Do sheet `chi_nhanh` của anh Hiệp sử dụng cột `ten_studio` để lưu tên Studio, nhưng Server-side trước đó chỉ map trường `name` hoặc `ten_chi_nhanh`. Đã cập nhật hàm `processBranchesRaw` trên máy chủ ưu tiên lấy trường `ten_studio`.
- **Vấn đề 3**: Biểu đồ nguồn khách hàng gom nhóm 20.5% đơn vào "Không xác định".
  - **Giải pháp**: Do tiêu đề cột trong sheet `don_hang` của anh Hiệp là `Nguon` (được Server snake-case hóa thành `d.nguon`), trong khi Client-side cố đọc trường `d.nguon_khach`. Giải quyết triệt để bằng cách tối ưu hóa client-side hỗ trợ đa fallback an toàn: `d.nguon_khach || d.nguon || d.Nguon || 'Không xác định'`.

### 2026-05-24: Lỗi Phẳng Cards Biểu Đồ & Thiếu Thẻ Đóng Div Cản Trở Grid Layout (Module Mục Tiêu Tháng)
- **Vấn đề 1**: Toàn bộ biểu đồ ở Module Mục Tiêu Tháng & Hiệu Suất bị phẳng tẹt, không đồng nhất nổi khối 3D với KPI grid. Nguyên nhân do thiết kế cũ chỉ sử dụng class thô `glass-card border border-white/5` thiếu hẳn các class đổ bóng nổi khối và hover transition.
- **Giải pháp 1**: Tạo lớp CSS `.mt-bento-card` với đổ bóng xếp tầng chuyên sâu (`box-shadow` đa lớp, kèm `inset` mờ và bách bộ `cubic-bezier(0.34, 1.56, 0.64, 1)`) cho cảm giác bồng bềnh 3D nổi khối cực sang, thay thế toàn bộ card biểu đồ sang `.mt-bento-card`.
- **Vấn đề 2**: Grid tables bị sập hoặc vỡ layout do thiếu thẻ đóng `</div>` trong cụm HTML phân trang của bảng phụ lục [Mod_MucTieuThang_View.html].
- **Giải pháp 2**: Bổ sung thẻ đóng `</div>` chuẩn chỉ để các khối HTML tự cân bằng hoàn hảo.

### 2026-05-25: Lỗi Khối Gradient Xám Đè Văn Bản ở Dark Mode & Tên Người Dùng Bị Tàng Hình
- **Vấn đề 1**: Chữ tiêu đề sidebar "Quản Lý Photoshop" và con số chính KPIs `.stat-number` bị che phủ bởi một hộp/dải chữ nhật màu xám đậm. Nguyên nhân do trong CSS tối (`html.dark`), `-webkit-background-clip: text` và `background-clip` bị ghi đè thành `unset !important`, làm hiển thị lại thuộc tính `background-image` gradient vốn có của Tailwind dưới dạng một khối nền thô kệch bên dưới chữ.
- **Giải pháp 1**: Ép thêm `background-image: none !important;` cho toàn bộ thẻ tiêu đề `h1-h4` và `.stat-number` dưới bộ chọn `html.dark` để loại bỏ dứt điểm ảnh nền gradient khi tắt clipping.
- **Vấn đề 2**: Các nhãn phụ KPIs (ví dụ "Đang nợ", "Hoàn thành") có màu xám đậm khó đọc trên nền card tối Slate-800, và thẻ thông tin User chân Sidebar vẫn mang màu nền sáng và viền sáng khiến tên trắng của sếp bị tàng hình.
- **Giải pháp 2**: Tăng tương phản cho `.detail-item` sang Slate-300 (`#cbd5e1`) và `.detail-item strong` sang Trắng tinh (`#ffffff`). Đồng thời đưa thẻ User chân Sidebar về nền tối Slate-800 (`#1e293b !important`) với viền Slate-700 (`#334155 !important`) đồng bộ.

### 2026-05-25: Lỗi Treo Phân Quyền/Lọc Công Việc do Thiếu Định Nghĩa Biến Cấu Hình (Module Công Việc)
- **Vấn đề**: Khi nhân viên Thiết kế đăng nhập, hệ thống chặn quyền xem hoặc xử lý công việc của chính mình, thông báo lỗi: *"Bạn chỉ có thể xem và xử lý công việc được giao trực tiếp."* Nguyên nhân do hằng số `CV_ASSIGNEE_COLUMN_NAME` được dùng ở nhiều file server-side cốt lõi (`Main.js`, `Auth.js`, `App_Modules.js`) nhưng hoàn toàn chưa được định nghĩa trong tệp cấu hình [Config.js](file:///c:/AntiCode/quan-li-photoshop/server/Config.js).
- **Giải pháp**: Khai báo hằng số `const CV_ASSIGNEE_COLUMN_NAME = "nv_phu_trach";` trỏ chuẩn xác về cột nhân viên phụ trách trên Google Sheets để khôi phục cơ chế phân quyền an toàn.

### 2026-05-25: Bracket Notation cho Snake-Case Keys bắt đầu bằng kí tự đặc biệt (Version 142)
- **Vấn đề**: Khi lấy dữ liệu cột từ sheet có ký tự đặc biệt như `%` (ví dụ `% Chi Phí` và `% Sai đối tượng`), Apps Script parser sẽ snake-case hóa thành `%_chi_phi` và `%_sai_doi_tuong`. Trong Client-side JS, việc gọi `row.%_chi_phi` sẽ gây lỗi cú pháp parser JS.
- **Giải pháp**: Bắt buộc phải sử dụng bracket notation dạng `row['%_chi_phi']` và `row['%_sai_doi_tuong']` để truy xuất giá trị an toàn, chính xác 100%.

### 2026-05-25: Mặc định thu gọn Accordion Rows trong Bảng phòng ban (Version 142)
- **Vấn đề**: Việc hiển thị toàn bộ hàng chi tiết nhân viên khi vừa tải trang làm bảng dữ liệu quá dài, dàn trải và gây mỏi mắt cho người dùng.
- **Giải pháp**: Gán class `hidden` trực tiếp làm mặc định cho các dòng nhân viên (`branchCollapseId_row`) ngay khi render dòng `tr` lần đầu tiên. Khi đó cơ chế click toggle của chi nhánh sẽ hoạt động mở rộng/thu gọn mượt mà ngay lập tức khi người dùng click tương tác.

### 2026-05-25: Bố cục Grid song song 2 cột cho các biểu đồ so sánh phức tạp (Version 142)
- **Vấn đề**: Khi thêm biểu đồ so sánh mới song song với biểu đồ cũ, nếu hiển thị 1 cột đơn dọc sẽ chiếm nhiều không gian cuộn và không trực quan để so sánh.
- **Giải pháp 2**: Nâng cấp class container của hàng biểu đồ số 3 từ `grid-cols-1` thành `grid-cols-2` cho các màn hình lớn (`md:` hoặc `lg:`). Nhờ đó, 2 biểu đồ so sánh (Tổng và Nhân viên) hiển thị song song cân đối, tuyệt đẹp trên máy tính và tự động xếp chồng mượt mà trên mobile.

### 2026-05-26 - Giải Pháp Custom Domain Cho Google Apps Script Web App Qua Vercel Iframe Wrapper
- **Vấn đề**: Google Apps Script Web App không hỗ trợ cấu hình Custom Domain trực tiếp thông qua bản ghi DNS CNAME/A thông thường của nhà đăng ký tên miền (iNET, GoDaddy, v.v.). Việc bắt người dùng truy cập đường dẫn `/macros/s/AKfycb.../exec` dài dòng gây mất thẩm mỹ và giảm uy tín thương hiệu của doanh nghiệp.
- **Giải pháp**: 
  1. Xây dựng một dự án tĩnh cực kỳ mỏng trên Vercel chứa file `index.html` duy nhất, bọc iframe toàn màn hình (`w-full h-screen border-none overflow-hidden`) trỏ về URL Web App thực tế của Google Apps Script.
  2. Bắt buộc cấu hình Header X-Frame-Options trên máy chủ Apps Script thành `ALLOWALL` (bằng cách trả về `HtmlService.createTemplateFromFile(...).evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)`) để cho phép trình duyệt của khách hàng nhúng an toàn mà không bị chặn bởi chính sách bảo mật Same-Origin.
  3. Cấu hình Vercel liên kết trực tiếp với tên miền tùy chỉnh `baocao.2hstudio.vn` và trỏ bản ghi A về địa chỉ IP của Vercel (`76.76.21.21`), giúp tạo ra một cổng truy cập ERP Portal thương hiệu riêng, bảo mật SSL hoàn hảo và tải tức thì.

### 2026-05-27 - Dọn Dẹp Mã Nguồn Rác & Phân Tách Hình Ảnh Khỏi Thư Mục Đồng Bộ (Google Apps Script / Clasp)
- **Vấn đề**: Các file script di trú tạm thời (`*.js` cũ) và các file ảnh chụp màn hình nghiệm thu (`*.png`) nếu để rải rác ở thư mục gốc hoặc thư mục active của module `Dash_Master_Portal` sẽ làm tăng kích thước dự án một cách vô ích, gây chậm tiến trình `clasp push` lên Google Apps Script, đồng thời có thể gây lỗi đồng bộ đối với các định dạng file không được GAS hỗ trợ.
- **Giải pháp**: 
  1. Quy hoạch toàn bộ các file script di trú cũ từ thư mục gốc vào một thư mục lưu trữ riêng biệt là `scratch/migration_backup/` để giữ gìn lịch sử mà không làm bẩn workspace.
  2. Tạo thư mục tài liệu ảnh riêng là `Build-dashboard/docs/screenshots/` và chuyển toàn bộ các ảnh chụp thành quả nghiệm thu về đây. Thư mục code chính `Dash_Master_Portal` chỉ được chứa duy nhất các file code vận hành thực tế (.js, .html, .json), duy trì trạng thái tinh gọn, chuyên nghiệp nhất.

### 2026-05-27 - Lỗi Cấu Hinh Nhầm Quyền Hạn Do Vi Phạm Nguyên Tắc "ZERO GUESSING" (Module Phân Quyền)
- **Vấn đề**: Khi mở quyền đăng nhập và phân chia menu hiển thị cho vai trò "Nhân viên" (Employee/User), việc tự ý phỏng đoán các module mà nhân viên được phép xem (như cho xem Thiết Bị, Trang Phục, Nhà Cung Cấp) sẽ dẫn đến cấu hình sai lệch nghiêm trọng so với thực tế vận hành và vi phạm bảo mật thông tin nội bộ của Studio.
- **Giải pháp**: 
  1. Tuyệt đối không phỏng đoán quyền hạn ("ZERO GUESSING"). Bắt buộc phải đọc và đối chiếu kỹ lưỡng Ma Trận Phân Quyền đã được code hóa tĩnh ở client-side trong file [Mod_PhanQuyen_Logic.html](file:///c:/AntiCode/appsheet-edit/Build-dashboard/Dash_Master_Portal/Mod_PhanQuyen_Logic.html) (trong mảng `matrixData`).
  2. Dựa trên ma trận, nhóm **Nhân viên (User)** chỉ được quyền xem đúng 3 module: *Lịch Công Việc* (chỉ xem công việc cá nhân), *Mục Tiêu Tháng* (chỉ xem mục tiêu cá nhân), và *Quản lý Lương* (chỉ xem phiếu lương cá nhân).
  3. Để bảo mật triệt để 2 lớp, cần áp dụng bộ lọc dữ liệu cá nhân ngay tại server-side của các file logic (như [Mod_LichCongViec_Server.js](file:///c:/AntiCode/appsheet-edit/Build-dashboard/Dash_Master_Portal/Mod_LichCongViec_Server.js) và [Mod_MucTieuThang_Server.js](file:///c:/AntiCode/appsheet-edit/Build-dashboard/Dash_Master_Portal/Mod_MucTieuThang_Server.js)) để chỉ trả về thông tin liên quan đến ID/Họ tên của user, ngăn chặn hoàn toàn việc rò rỉ dữ liệu thông qua API/network.

### 2026-05-27 - Tránh tự ý tạo cấu trúc/bảng biểu tự động (Tạo tab Sheet) khi chưa có sự xác nhận của người dùng
- **Vấn đề**: Việc thiết lập cơ chế đo lường hiệu năng ghi trực tiếp ra Google Sheet và tự động dùng `insertSheet` để tạo tab mới (ví dụ `PERF_LOGS`) ở môi trường Production gây bất ngờ, lộn xộn cấu trúc bảng biểu và khiến khách hàng lo lắng về bảo mật/hoạt động ngoài tầm kiểm soát.
- **Giải pháp**: 
  1. Tuyệt đối không tự ý viết các cơ chế tự động tạo tab mới trên Google Sheet ở môi trường live mà chưa thông qua thảo luận và xin phép tường tận với Founder.
  2. Thay vì lưu log ra Sheet, chuyển hướng ghi nhật ký ra console nội bộ của môi trường quản trị (`console.log`) để theo dõi khi cần debug mà không làm ảnh hưởng đến tài nguyên hiển thị của khách hàng.

### 2026-05-27 - Nâng Cấp Giao Diện Chi Tiết Đa Năng Thành Right Drawer Trượt & Drilldown Siêu Liên Kết Đa Chiều (Version 48)
- **Vấn đề**: Khi thay đổi giao diện xem chi tiết record (Universal Detail Modal) thành một Drawer bên phải trượt mượt mà (Right Drawer), người dùng bấm xem dòng khách hàng, đơn hàng, hay công việc sẽ thấy thông tin nghèo nàn do lúc này record được click truyền từ bảng thô không chứa sẵn các liên kết dữ liệu đầy đủ (ví dụ: khách hàng không có sẵn công nợ, đơn hàng không có sẵn thông tin liên hệ của khách hàng, phiếu lương không có sẵn danh sách việc con hoàn thành để đối soát...).
- **Giải pháp**: 
  1. **Nạp động công nợ đối tác**: Ở đầu hàm `showModuleRowDetails`, tự động liên kết và truy xuất thông tin tài chính gộp của khách hàng đó từ cache `window.appData.cong_no_khach_hang` để gán ngược thuộc tính vào `rowData` trước khi vẽ Bento tài chính Rose Ash/Emerald.
  2. **Drilldown siêu liên kết đa chiều cho 7 module**:
     - *Khách hàng & Công nợ*: Vẽ box **"Sổ Ghi Nợ Đối Tác"** chi tiết + danh sách Đơn hàng con, mỗi đơn hàng lại tự động lọc tiếp danh sách việc con thuộc đơn hàng đó kèm người làm và tiến độ.
     - *Đơn hàng*: Tự động dò tìm thông tin Khách hàng chủ tương ứng trong bảng `KhachHang` để hiển thị box **"Thông Tin Đối Tác Đặt Hàng"** (Tên, SĐT có nút gọi nhanh, Địa chỉ, Email) + Việc con liên quan.
     - *Công việc*: Tự động nạp thông tin Đơn hàng chủ, Khách hàng chủ, và lọc danh sách các việc con đồng hành cùng đơn hàng đó để các Designer phối hợp chéo và Manager theo dõi tiến độ tổng thể.
     - *Nhân viên*: Hiển thị Lịch sử Tạm ứng & Khấu trừ lương chi tiết + Việc đang đảm nhận.
     - *Phiếu lương*: Xây dựng cơ chế regex bóc tách Kỳ Lương thông minh (Tháng/Năm) từ chuỗi `ky_luong` của phiếu lương, kết hợp parse an toàn ngày tháng để lọc chính xác 100% các công việc con đã hoàn thành và các khoản tạm ứng/khấu trừ trong tháng đó làm căn cứ đối soát thù lao trực quan, minh bạch.
     - *Tạm ứng & Khấu trừ*: Hiển thị danh sách các phiếu ứng/trừ khác của nhân sự để quản lý có cái nhìn tổng quan.
     - *Dịch vụ*: Lọc các đơn hàng đang áp dụng định mức thù lao này.

### 2026-05-28 - Lỗi Treo Loader Vĩnh Viễn Do Cú Pháp JS Lỗi Và Crash Do Ép Kiểu Dữ Liệu Sheets Không An Toàn (Version 51)
- **Vấn đề 1 (Syntax Error)**: Trong quá trình refactor Drawer/Drilldown, một khối lệnh gán HTML dở dang bị lặp lại trước khai báo `isProfileLogo` trong [js_khach_hang.html](file:///c:/AntiCode/quan-li-photoshop/js_khach_hang.html). Lỗi cú pháp này khiến trình duyệt không thể parse toàn bộ file logic Khách Hàng, dẫn đến module bị treo cứng ở thông báo "Đang tải khách hàng...".
- **Vấn đề 2 (Crash kiểu dữ liệu)**: Dữ liệu cột `logo` từ Google Sheets thô nếu là số hoặc rỗng, khi nạp về Client-side sẽ có dạng Number hoặc Null. Việc gọi trực tiếp `.trim()` hoặc `.indexOf()` trên biến này sẽ gây crash runtime `TypeError: trim/indexOf is not a function`, làm dừng toàn bộ luồng render giao diện.
- **Giải pháp**: 
  1. Loại bỏ triệt để các khối code rác/khai báo lặp lỗi cú pháp trong `js_khach_hang.html` để phục hồi khả năng biên dịch bình thường của trình duyệt.
  2. Áp dụng cơ chế **ép kiểu an toàn**: Luôn bọc String trước khi thực hiện các phép xử lý chuỗi trên thuộc tính logo (ví dụ: `var logoUrl = String(c.logo || "").trim();` và `var isProfileLogo = c.logo && (String(c.logo).indexOf("http://") === 0 ...)`). Đồng thời thực hiện tương tự với `rowData.logo` trong [index.html](file:///c:/AntiCode/quan-li-photoshop/index.html).
  3. Deploy trực tiếp đè lên đúng Deployment ID live để đồng bộ ngay lập tức cho người dùng mà không tạo thêm nhánh phụ hoặc URL mới.

### 2026-05-28 - Lỗi Lệch Đồng Bộ Logic Parsing Thời Gian Giữa File Module Lẻ Và Shell Portal (Version 53)
- **Vấn đề**: Sau khi nâng cấp thuật toán giải mã tháng/năm ở `js_khach_hang.html` giúp Drawer Khách Hàng hiển thị hoàn hảo, người dùng bấm từ bảng danh sách bên ngoài Portal vẫn thấy hiện `"Tháng Chưa rõ tháng"`. Nguyên nhân là do Drawer chi tiết khi click hàng được xử lý toàn cục bởi hàm `showModuleRowDetails` trong [index.html](file:///c:/AntiCode/quan-li-photoshop/index.html) - vốn vẫn sử dụng bộ parse ngày cũ thô sơ, chưa được đồng bộ nâng cấp.
- **Giải pháp**: 
  1. Đồng bộ hóa 100% thuật toán dò tìm cột động case-insensitive (`thang_nam`/`ngay_hoan_thanh`/`ngay_nhan`) và hàm giải mã `parseMonthYear` từ `js_khach_hang.html` sang `index.html`.
  2. Hãy luôn kiểm tra và cập nhật chéo ở tất cả các file liên quan (như Shell chính và Module lẻ) khi nâng cấp các logic dùng chung hoặc hiển thị tương đương.
  3. Đẩy code lên bằng `clasp push` và tạo bản deploy đè lên Deployment ID chính thức thành công tốt đẹp dưới dạng **Version 53**.

### 2026-05-28 - Lỗi ReferenceError do thứ tự khai báo biến trong JS (Module Drilldown / Drawer)
- **Vấn đề**: Click vào từng dòng của các bảng danh sách Portal bị đơ hoàn toàn, không hiển thị Drawer chi tiết, browser console báo lỗi: `ReferenceError: Cannot access 'allTasks' before initialization`. Nguyên nhân là do trong quá trình refactor hàm `showModuleRowDetails` trong [index.html](file:///c:/AntiCode/quan-li-photoshop/index.html) để nâng cấp hiển thị Đơn Hàng thông minh, các biến dữ liệu dùng chung (như `allTasks`, `allOrders`, `allCustomers`) bị khai báo ở phần dưới của hàm, trong khi các khối logic tài chính động hoặc render Related Tasks bên trên đã cố truy xuất chúng trước.
- **Giải pháp**: 
  1. Tuyệt đối tuân thủ nguyên tắc khai báo biến trước khi sử dụng. Di chuyển toàn bộ các khai báo biến, trích xuất dữ liệu thô (`window.appData.don_hang`, `cong_viec`, `khach_hang`, `staff`) lên ngay dòng đầu tiên của hàm `showModuleRowDetails` trước mọi logic dựng giao diện HTML.
  2. Bọc logic chi tiết từng module trong các khối kiểm tra điều kiện an toàn, giúp vá triệt để lỗi crash click dòng của tất cả các bảng.

### 2026-05-29 - Lỗi Sai Lệch Tiền Tệ Hàng Nghìn Đồng & Lệch Nhãn Drawer Chi Tiết (Version 81 - 83)
- **Vấn đề 1 (Sai lệch tiền tệ 1000 lần)**: Dữ liệu tiền tệ đọc từ Google Sheets API (FORMATTED_VALUE) trả về dạng chuỗi định dạng (ví dụ: `"140.000"` hoặc `"44.800"`). Trong Javascript, hàm `Number("140.000")` coi dấu chấm là phân cách thập phân, dẫn đến parse sai thành số `140` (giảm 1000 lần), và thù lao thợ `"44.800"` bị parse thành `44.8` (hiển thị thành `"44,8 đ"`). Khi mở Modal Sửa, giá trị lỗi này điền vào input number và khi bấm Lưu sẽ ghi đè số nhỏ sai lệch lên Google Sheet.
- **Vấn đề 2 (Lệch nhãn & dấu gạch ngang Drawer)**: Dòng `"Mã Dịch Vụ"` (`id_dich_vu` = `DV-01`) bị dịch sai thành `"Tên Dịch Vụ"` ở bảng chi tiết bên dưới. Ngoài ra, do thiếu `"id_dich_vu"` trong danh sách `subKeys` của Drawer, hệ thống không tìm thấy ID để hiển thị dưới tên gói dịch vụ ở Hero block, tự động sinh ra dấu gạch ngang `"—"` mặc định xấu xí.
- **Giải pháp**: 
  1. **Định nghĩa bộ parse số tiếng Việt thông minh**: Viết hàm toàn cục `parseNumberVN(val)` để phát hiện và loại bỏ các dấu chấm phân cách hàng nghìn tiếng Việt (ví dụ `"140.000"` ➔ `"140000"`) trước khi ép kiểu `Number`. Áp dụng đồng bộ cho bảng Dịch vụ, Drawer Chi Tiết, và Modal Form để đảm bảo hiển thị đúng và lưu đúng số nguyên thô.
  2. **Tối ưu hóa Drawer**: Sửa nhãn dịch nghĩa `id_dich_vu` thành `"Mã Dịch Vụ"` trong `columnTranslations`. Thêm `"id_dich_vu"` và `"id"` vào `subKeys` của Drawer để hiển thị mã dưới tên gói dịch vụ và tự động ẩn dòng lặp thông tin ở bảng chi tiết bên dưới, loại bỏ hoàn toàn dấu gạch ngang `"—"`.
  3. **Đồng bộ hóa tên gọi**: Đổi `"Lương File Final"` thành `"Lương Final"` trên cả Tiêu đề cột, Drawer chi tiết và Modal Form.

### 2026-05-29 - Lỗi lệch số lượng trong các bảng thống kê 1-N (Module Báo cáo tổng hợp)
- **Vấn đề**: Số lượng tổng cộng của bảng thống kê dịch vụ chi tiết (Top Dịch Vụ) cao hơn số lượng đơn chốt thực tế (ví dụ: chốt 82 đơn nhưng Top Dịch Vụ là 92) do hệ thống đếm cả các dịch vụ phụ phát sinh thêm (Add-ons như Quay video cưới, Chụp couple phát sinh có loai_dich_vu = "Dịch vụ") có cùng mã đơn hàng trong bảng chi tiết `don_hang_ct`, cùng với các dòng trùng lặp dữ liệu thực tế trên Google Sheets.
- **Giải pháp**: 
  1. **Khắc phục logic code**: Đối với nhóm phân loại `Dịch vụ`, bổ sung điều kiện lọc `if (tg === 'Dịch vụ' && String(item.hang_muc || '').trim() !== 'Hợp đồng') return;` để bỏ qua toàn bộ các dòng phát sinh phụ (Add-ons) và chỉ quét đúng gói dịch vụ chính của hợp đồng. Các nhóm Trang phục & Sản phẩm giữ nguyên cơ chế quét toàn bộ để thống kê đầy đủ doanh số phát sinh.
  2. **Vệ sinh dữ liệu trên Sheets**: Kiểm tra và dọn dẹp các dòng nhập trùng lặp (ví dụ: dòng trùng lặp đơn `HD260418D70` ở `don_hang_ct` và đơn trùng lặp `HD26041560C` ở `don_hang`) để đưa số liệu về tỷ lệ 1-1 khớp hoàn hảo.

### 2026-05-29 - Lỗi Cú Pháp Nhầm Đường Dẫn Thư Mục Ẩn Và Đối Soát Nghiệp Vụ Chênh Lệch Doanh Số Q1 (Hoàng Cầu)
- **Vấn đề 1 (Lỗi cú pháp đường dẫn)**: Khi chỉnh sửa hoặc cập nhật các file quản lý tiến độ (`task.md`), việc gõ nhầm hai dấu chấm `..gemini` thay vì `.gemini` ở đường dẫn tuyệt đối khiến hệ thống IDE/Tool báo lỗi file không tồn tại, gây gián đoạn luồng làm việc.
- **Vấn đề 2 (Chênh lệch thống kê doanh số chốt gói và doanh thu thực tế)**: Doanh số thống kê chốt gói trong danh sách chi tiết (3.485.400.000 đ - 395 gói) lệch so với doanh thu hạch toán gói chính trên báo cáo tài chính (3.284.600.000 đ - 372 đơn) do chênh lệch thời điểm thu tiền hoặc công nợ chưa thu hồi hết cuối quý. Ngoài ra, doanh số ghi nhận KPI của hai bộ phận Sale On và Sale Off có phần trùng lặp ở các đơn hàng kết hợp (On-Off) trị giá 2.320.400.000 đ (254 đơn) do cơ chế tính KPI song hành cho cả bộ phận tiếp cận online và chốt offline trực tiếp.
- **Giải pháp**:
  1. Luôn kiểm tra kỹ lưỡng các đường dẫn thư mục ẩn của ứng dụng (đặc biệt là `.gemini`) trước khi ghi hoặc thay đổi nội dung file.
  2. Bổ sung các chú thích nghiệp vụ và đối soát trung thực, giải thích rõ cơ chế trùng lặp doanh số KPI (đơn On-Off) để Founder nắm bắt thông tin rõ ràng mà không hoang mang về sự chênh lệch số liệu.
  3. Sử dụng đúng tên thư mục Desktop thực tế của người dùng: `QUY 01` thay vì phỏng đoán `QUÝ 01` có dấu để tránh lỗi đường dẫn PowerShell.

### 2026-05-29 (Phiên Tối) - Lỗi Lệch Dòng Khi Sử Dụng Multi-Replace Trên File HTML Lớn & Giải Pháp Node.js Script
- **Vấn đề**: Khi sử dụng công cụ `multi_replace_file_content` để thay đổi nhiều khối code không liên tiếp trong một file HTML cực kỳ lớn (như `index.html`), sau khi khối đầu tiên được thay thế thành công, số dòng của file trên đĩa sẽ tự động thay đổi (ví dụ: bị rút ngắn do xóa dòng). Điều này làm lệch hoàn toàn tọa độ `StartLine` và `EndLine` của các khối thay thế tiếp theo, dẫn đến việc so khớp thất bại ngầm (silent fail) hoặc gây lỗi runtime (ví dụ: mất định nghĩa hàm nhưng vẫn còn dòng gọi hàm gây ReferenceError).
- **Giải pháp**: 
  1. Thay vì dùng `multi_replace_file_content` dễ bị lệch dòng, hãy tạo một script Node.js phụ trợ ngắn gọn (ví dụ `clean_index.js`) sử dụng biểu thức chính quy (Regex) để đọc file, thực hiện thay thế chuỗi và ghi đè trực tiếp lên file trên đĩa.
  2. Chạy script này qua terminal bằng Node.js (`node clean_index.js`) để đảm bảo thay thế chuẩn xác 100% không phụ thuộc số dòng và khoảng trắng. Sau đó, tiến hành xóa file script phụ trợ này để giữ codebase luôn sạch sẽ.

### 2026-05-30 - Lỗi Ẩn Nút Thao Tác Theo Điều Kiện Và Lệch Đồng Bộ Form Công Nợ Do Sai Key Mapping (Version 140 - 141)
- **Vấn đề 1 (Ẩn nút thao tác)**: Nút "Thu nợ" trong bảng Công nợ khách hàng được cấu hình chỉ hiển thị khi còn nợ lớn hơn 0 (`parseFloat(conNo) > 0`). Tuy nhiên, trong thực tế, khi hệ thống chưa có phát sinh đơn hàng hoặc số dư nợ đã được thu hồi hết về 0, toàn bộ khách hàng đều có nợ bằng 0 khiến nút "Thu nợ" biến mất hoàn toàn ở cột Tác vụ. Điều này làm người dùng tưởng lầm hệ thống bị thiếu tính năng hoặc bị lỗi hiển thị.
- **Giải pháp 1**: Loại bỏ hoàn toàn điều kiện check `conNo > 0` và luôn luôn hiển thị nút "Thu nợ" ở cột Tác vụ cho tất cả các hàng. Điều này tương tự như nút "Chi lương" của bảng nhân viên, cho phép người dùng thực hiện giao dịch thu tiền cọc trước hoặc thanh toán trước bất cứ lúc nào một cách trực quan.
- **Vấn đề 2 (Lệch Key Mapping Form Công Nợ)**: Form sửa Công nợ khách hàng cũ thiếu các trường thông tin quan trọng của sheet và sử dụng tên key không khớp với cấu trúc cột trên Google Sheets (ví dụ: form dùng `tong_no`, `da_tra`, `trang_thai` trong khi sheet `cong_no_khach_hang` có các cột `tong_don`, `da_thanh_toan`, `trang_thai_tt`). Khi lưu, dữ liệu gửi lên bị lệch key dẫn đến không cập nhật được các cột tương ứng trên Google Sheets.
- **Giải pháp 2**: Mở rộng Form Công nợ khách hàng đầy đủ 10 trường theo đúng cấu trúc sheet. Thiết lập bộ lọc (Bridge Keys) thông minh khi mở modal sửa để tự động ánh xạ các thuộc tính động từ giao diện sang các trường nhập liệu tương ứng trên form, và chuyển đổi ngược lại khi lưu để lưu dữ liệu khớp 100% với cột trang tính Google Sheets.
- **Vấn đề 3 (Màu nền khung nhập liệu của Form & Mã dịch vụ)**: Yêu cầu của studio là tất cả các ô nhập liệu của Form ở tất cả các module cần có màu nền xám trắng (`bg-gray-50`) để tạo chiều sâu thị giác tách biệt với nền modal trắng. Ngoài ra, module Dịch vụ khi Sửa cần hiển thị Mã dịch vụ ở dạng chỉ đọc (`readonly`).
- **Giải pháp 3**: Cập nhật đồng loạt các class của các ô nhập liệu trong form Công nợ và Dịch vụ sang `unified-input bg-gray-50 text-gray-700`. Đối với module Dịch vụ, chèn thêm trường `id_dich_vu` ở dạng `readonly` và `cursor-not-allowed` khi mở modal sửa.

### 2026-06-01 - Lỗi Treo/Không Khởi Động Được Antigravity 2.0 (Bản Cập Nhật v2.0.10) Trên Windows
- **Vấn đề**: Sau khi cập nhật lên Antigravity 2.0 (v2.0.10), người dùng click mở app nhưng app không khởi động, không hiển thị cửa sổ. Khi kiểm tra debug và log hệ thống, phát hiện ra nhân Chromium mới của bản cập nhật này bị xung đột nghiêm trọng với cơ chế bảo mật sandbox của card đồ họa trên máy khách. Nó kích hoạt lỗi fatal liên tiếp: `GPU process exited unexpectedly: exit_code=-2147483645 (STATUS_BREAKPOINT)` rồi tự động thoát sau 6 lần crash (`GPU process isn't usable. Goodbye.`).
- **Giải pháp**:
  1. **Khắc phục lỗi khởi động bằng Flag**: Đối số `--disable-gpu-sandbox` bỏ qua hoàn toàn sandbox của GPU, giúp khởi chạy ứng dụng 100% thành công, mượt mà mà không làm mất tính năng tăng tốc đồ họa (Hardware Acceleration) của máy khách.
  2. **Tự động hóa Shortcut cho người dùng**: Viết script PowerShell tự động dò tìm và ghi đè thuộc tính Arguments của tất cả các Shortcut (`.lnk` file) của Antigravity tại Desktop và Start Menu để bổ sung flag `--disable-gpu-sandbox`. Cách này giúp người dùng chỉ cần click chuột mở app như bình thường mà không cần tự gõ dòng lệnh phức tạp.
  3. **Vệ sinh Cache**: Chủ động dọn dẹp các thư mục cache shader bị lỗi trong thư mục Roaming (`GPUCache`, `DawnGraphiteCache`, `DawnWebGPUCache`) để khôi phục trạng thái bộ nhớ đệm sạch cho Electron.

### 2026-06-01 - Lỗi Icon Đăng Nhập Bị Dịch Xuống Dưới Khi Focus Vào Input Ô Nhập Liệu (CSS Override Transform)
- **Vấn đề**: Khi click focus vào ô nhập liệu Email hay Mật khẩu ở màn hình đăng nhập, icon Font Awesome đi kèm bị nhảy lệch hẳn xuống dưới. Nguyên nhân do ở HTML thô, icon được căn giữa dọc bằng Tailwind class `absolute left-4 top-1/2 transform -translate-y-1/2`. Tuy nhiên, trong CSS (`css.html`), quy tắc focus `#login-form input:focus + i` chỉ định `transform: scale(1.1);`. Khi focus, thuộc tính transform mới này ghi đè hoàn toàn transform gốc của Tailwind, làm biến mất thuộc tính dịch ngược `-translate-y-1/2` (tức là `translateY(-50%)`), khiến icon bị tụt xuống dưới.
- **Giải pháp**:
  1. Cập nhật quy tắc CSS focus trong `css.html` thành `transform: translateY(-50%) scale(1.1);` để duy trì việc căn giữa dọc hoàn hảo cùng lúc với hiệu ứng phóng to icon khi focus.
  2. Bổ sung nhãn "Email / Mã nhân viên" ở login form (`index.html`) và nâng cấp kiểu input từ `type="email"` sang `type="text"` để hỗ trợ nhập mã ID nhân viên mà không bị trình duyệt chặn validate email.
  3. Cải tiến hàm xác thực `authenticateUser` ở server-side (`server/Auth.js`) để cho phép đối chiếu cả email (`dbEmail`) và mã nhân viên (`id_nhan_vien`) không phân biệt chữ hoa/thường.

### 2026-06-01 - Lỗi Trải Nghiệm Màn Hình Trống / Loader Không Đồng Bộ Trong Chuỗi Gọi API Login Liên Tiếp
- **Vấn đề**: Khi bấm Đăng nhập, hệ thống chỉ hiển thị loader phụ màu xanh nhỏ dưới nút đăng nhập (`#login-loading`), không hiển thị màn hình Đang tải dữ liệu toàn cục. Hơn thế, sau khi xác thực thành công, modal đăng nhập bị đóng ngay lập tức (`hideLoginModal()`) nhưng API nạp dữ liệu chính (`getDataForUser`) vẫn đang chạy ngầm trong 3-5s mà không bật bất kì loader nào. Điều này tạo cảm giác hệ thống bị đơ, trống rỗng và rất lâu mới nạp được Dashboard.
- **Giải pháp**:
  1. Nâng cấp hàm `showLoading(msg)` trong `js.html` để tự động cập nhật nội dung văn bản của thẻ `#loading-message` một cách linh hoạt theo tham số truyền vào.
  2. Đồng bộ hóa luồng tải: Ngay khi click Đăng nhập, bật màn hình Đang tải toàn màn hình chuyên nghiệp với thông báo: *"Đang xác thực thông tin đăng nhập..."*.
  3. Khi xác thực thành công, ẩn Modal đăng nhập ở phía sau, giữ nguyên màn hình Đang tải và đổi thông báo thành: *"Đăng nhập thành công! Đang nạp dữ liệu hệ thống..."*.
  4. Sau khi `getDataForUser` trả về dữ liệu và render xong toàn bộ Dashboard, gọi `hideLoading()` để ẩn màn hình Đang tải một cách mượt mà và trực quan.

### 2026-06-01 - Lỗi Nhìn Thấy Màn Hình Trống / Chờ Render Dashboard Do Đóng Màn Hình Chờ Quá Sớm (Timing Loader Order)
- **Vấn đề**: Khi tải trang tự động (`checkAuthenticationAndInitialize`) hoặc khi đăng nhập thủ công thành công, hệ thống nhận được dữ liệu thành công từ API và ngay lập tức gọi `hideLoading()` để tắt màn hình chờ, rồi mới gọi `handleSuccessfulLogin()` để vẽ và render dữ liệu, các bảng danh sách và biểu đồ. Khoảng lệch timing này khiến người dùng bị đơ trên màn hình trống không có dữ liệu một lúc trước khi Dashboard được dựng xong.
- **Giải pháp**:
  1. Đảo ngược tuyệt đối thứ tự timing: Bắt buộc hàm vẽ và dựng giao diện `handleSuccessfulLogin()` phải chạy xong hoàn chỉnh.
  2. Chỉ gọi tắt màn hình chờ `hideLoading()` ở dòng tiếp theo **sau khi** giao diện đã render xong, đảm bảo dữ liệu hiển thị sẵn sàng 100% khi tấm màn chờ được thu hồi.

### 2026-06-01 - Lỗi Trống Dữ Liệu Dashboard Khi Đóng Loader Do Xung Đột Bất Đồng Bộ Hai Luồng Tải (Async Data Bridge Sync)
- **Vấn đề**: Sau khi sửa timing đóng loader ở `js.html` thành công, Dashboard vẫn bị trống trơn (số 0, biểu đồ rỗng) trong 3 giây. Nguyên nhân do `js.html` (luồng 1) chỉ chịu trách nhiệm lấy thông tin auth nhanh và nạp summaryStats giả lập, còn dữ liệu module thật (khách hàng, đơn hàng...) và biểu đồ thực tế của Dashboard lại được tải bất đồng bộ ở background bởi luồng `DATA BRIDGE` (`index.html` - luồng 2). Hơn nữa, việc vẽ stats thật và biểu đồ Chart.js ở Dashboard bị ngâm ngầm trong `setInterval` lặp lại mỗi 3 giây! Luồng 1 tắt loader trước, khiến người dùng nhìn thấy Dashboard trống trước khi luồng 2 tải xong và `setInterval` vẽ đè lên.
- **Giải pháp**:
  1. Loại bỏ hoàn toàn các cuộc gọi `hideLoading()` ở cả hai luồng đăng nhập trong `js.html` khi thành công, giữ nguyên loader che phủ Dashboard rỗng.
  2. Tích hợp màn hình Đang tải toàn cục (`showLoading` / `hideLoading`) trực tiếp vào success và error handler của luồng `DATA BRIDGE` (`index.html`).
  3. Ngay khi `DATA BRIDGE` nhận dữ liệu thật thành công từ Sheets, thực hiện gọi trực tiếp `window.updateStudioStats()` và `window.renderStudioCharts()` để tính toán KPI và vẽ biểu đồ ngay lập tức mà không cần đợi chu kỳ 3 giây của `setInterval`.
  4. Chỉ gọi `hideLoading()` ở cuối cùng sau khi mọi dữ liệu và biểu đồ đã được render hoàn chỉnh 100%, bảo đảm Dashboard mở ra là có ngay dữ liệu thật.

### 2026-06-01 (Phiên Tối) - Lỗi Sai Cú Pháp Lệch Dòng Khi Sử Dụng replace_file_content trên Modal Bảng Lương
- **Vấn đề**: Khi chỉnh sửa file bằng replace_file_content, nếu không chỉ định chính xác ranh giới TargetContent hoặc replace bị đè văn bản do copy-paste, sẽ tạo ra cú pháp JS bị hỏng nghiêm trọng (`var existing = docu var fields = [...]`) làm treo toàn bộ logic modal.
- **Giải pháp**: Luôn kiểm tra kỹ ranh giới dòng của `StartLine` và `EndLine`. Thực hiện chạy script kiểm tra cú pháp an toàn `check_syntax.js` cục bộ trước khi push-deploy để phát hiện sớm các lỗi ReferenceError hay SyntaxError trước khi đưa lên production.

### 2026-06-01 (Phiên Tối) - Lỗi Hiển Thị Nền Xám Sáng Của Thanh Bộ Lọc Sổ Thu Chi ở Giao Diện Tối (Dark Mode)
- **Vấn đề**: Ở giao diện tối, thanh bộ lọc Sổ Thu Chi bị hiển thị màu xám đục đơ sáng loáng do sử dụng class không tồn tại trong TailwindCSS chuẩn là `dark:bg-slate-850/50`. Vì class này không hợp lệ, trình duyệt tự động fallback về màu light mode `bg-gray-50/50`.
- **Giải pháp**: Tránh tuyệt đối sử dụng các class màu Tailwind tự chế (như `slate-850`) trừ khi được cấu hình sẵn, thay vào đó hãy dùng các màu slate chuẩn an toàn như `slate-800`, `slate-900`. Thay thế thành `dark:bg-slate-800/40` giúp thanh bộ lọc chìm sâu xuống, đồng điệu hoàn hảo với giao diện tối của hệ thống.

### 2026-06-02 - Lỗi Ẩn Nút Thao Tác Toolbar Do Obfuscated Script & Đồng Bộ Thù Lao Công Việc Thủ Công
- **Vấn đề 1**: Nút "Thêm Công Việc" ở tab Công việc bị ẩn cứng bằng CSS `style="display: none !important;"` trong HTML thô do script mã hóa `js.html` chỉ xử lý các nút `add-task-btn` của module Dự án. Điều này khiến Admin/Manager không thể tạo công việc từ tab Công việc.
- **Giải pháp 1**: Tại hàm `renderCongViecModule` (được gọi mỗi khi chuyển tab hoặc tải dữ liệu), dùng `addBtn.style.setProperty("display", "inline-flex", "important")` để bắt buộc hiển thị nút thêm thủ công cho Admin/Manager. Đồng thời, tự động tạo và chèn thêm nút **Sinh Việc TĐ** (màu tím violet sang trọng) kế bên nếu chưa có để sếp thao tác sinh hàng loạt.
- **Vấn đề 2 (Trùng lặp ID gây đơ tính toán)**: Khi tích hợp dynamic calculator `recalcCongViecLuongUI` tính thù lao thợ (`luong_nv`) tức thì ở Client-side, việc tồn tại thẻ nhập ẩn `<input type="hidden" id="cv-field-luong_nv">` trong form của `openCongViecModal` gây xung đột trùng lặp ID phần tử, khiến JS không thể gán và lấy dữ liệu thù lao từ ô nhập hiển thị mới.
- **Giải pháp 2**: Loại bỏ hoàn toàn input ẩn trùng lặp này. Đồng bộ hóa việc lấy thù lao từ trường hiển thị chính bằng cách thêm `id_dich_vu` và `so_luong` vào danh sách `fields` của hàm `saveCongViec` để gửi trọn vẹn dữ liệu về Google Apps Script và lưu xuống Sheet.

### 2026-06-21 - Ngăn Chặn Tự Động Bao Thẻ Block Trong contenteditable Khi Nhấn Enter
- **Vấn đề**: Trong các trình duyệt Chrome/Edge, khi người dùng nhấn Enter để xuống dòng trong một ô chỉnh sửa (`contenteditable`), trình duyệt tự động bao bọc dòng mới bằng thẻ `<div>` hoặc `<p>`. Điều này làm hỏng cấu trúc danh sách `<li>` thuần túy, gây ra lỗi layout và mất đồng bộ phong cách CSS.
- **Giải pháp**:
  1. Lắng nghe sự kiện `keydown` trên các phần tử danh sách `contenteditable`.
  2. Khi phát hiện phím `Enter` (không có `Shift`), chặn hành vi mặc định bằng `e.preventDefault()`.
  3. Sử dụng `document.execCommand('insertLineBreak')` để chèn trực tiếp thẻ `<br>` (soft break) vào vị trí con trỏ hiện tại, bảo toàn cấu trúc phần tử danh sách `<li>` duy nhất và ngăn chặn sự tự ý sinh thẻ block của trình duyệt.

### 2026-06-21 - Thay Thế window.confirm Bằng Hộp Thoại Custom Confirm Modal Bất Đồng Bộ
- **Vấn đề**: Hàm `window.confirm()` mặc định của trình duyệt hoạt động đồng bộ (blocking), nhưng giao diện của nó trông rất thô và không đồng điệu với phong cách tối sang trọng (Dark-Gold Glassmorphism) của Han's Studio. Tuy nhiên, việc thay thế bằng một modal HTML tùy chỉnh (non-blocking) yêu cầu tái cấu trúc toàn bộ các luồng gọi lệnh từ đồng bộ sang bất động bộ.
- **Giải pháp**:
  1. Xây dựng một hàm wrapper `showConfirm(message)` trả về một `Promise`.
  2. Bật overlay modal tùy chỉnh lên màn hình và gán các hàm callback resolve `true` cho nút Đồng ý và `false` cho nút Hủy.
  3. Chuyển đổi các hàm gọi cũ (như `deleteFolder`, `deleteSlide`, `resetToDefault`) thành các hàm bất đồng bộ `async` và đợi kết quả xác nhận bằng từ khóa `await showConfirm(...)`. Việc này đảm bảo tính năng hoạt động trơn tru mà không làm thay đổi logic nghiệp vụ phía sau.

### 2026-06-21 - Vercel Git Auto-Deploy Đè Lên Custom Subdirectory Gây Lỗi 404
- **Vấn đề**: Khi cấu hình dự án con (như `bao-gia` là thư mục con của workspace `hans-studio`) trên Vercel, nếu dự án Vercel đó bị liên kết nhầm Git repository với một repo khác (ví dụ: `master-agent`) hoặc không được cấu hình Root Directory chính xác, mỗi lần repo đó có commit mới, Vercel sẽ tự động build từ root của repo đó, đè lên deployment cũ và gây lỗi 404 NOT_FOUND.
- **Giải pháp**:
  1. Sử dụng Vercel CLI ở local, truy cập vào thư mục con (`bao-gia`), chạy `vercel deploy --prod --yes` để đẩy trực tiếp các tệp static local lên production tức thì.
  2. Để liên kết đúng Git repo bằng Vercel CLI (`vercel git connect`), do CLI yêu cầu thư mục hiện tại phải chứa `.git` (dù thực tế repo cha chứa `.git` ở ngoài), ta có thể tạo tạm thời thư mục `.git` trống bên trong thư mục con, chạy lệnh kết nối `vercel git connect <url>`, sau đó xóa thư mục `.git` tạm thời đó đi.
  3. Cuối cùng, bắt buộc người dùng truy cập vào **Vercel Dashboard -> Settings -> General -> Root Directory** của dự án `baogiahans` và chuyển cấu hình từ `.` thành `bao-gia` để các bản build tự động sau này thông qua Git Push được định tuyến chính xác vào thư mục con.

### 2026-06-22 - Tối Ưu Hóa Số Lần Ghi LocalStorage Để Tránh Lag Giao Diện (Bulk Update Pattern)
- **Vấn đề**: Khi xóa thư mục, xóa trang hoặc nhân bản trang, ứng dụng liên tục gọi các hàm trung gian (như `saveActiveSlide()` hoặc `selectFolder()`), trong đó mỗi hàm lại tự động thực hiện ghi toàn bộ mảng `slides` (chứa ảnh base64 rất nặng) vào `localStorage` một cách đồng bộ. Điều này gây block main thread của trình duyệt, dẫn đến hiện tượng lag đứng màn hình từ 3-5 giây mỗi khi thao tác.
- **Giải pháp**:
  1. Khai báo một cờ hiệu toàn cục `let isBulkUpdating = false;` để theo dõi các hoạt động cập nhật hàng loạt.
  2. Khi `isBulkUpdating === true`, hàm `saveActiveSlide()` sẽ tự động bỏ qua (không ghi dữ liệu trung gian).
  3. Trong các hàm Xóa thư mục (`deleteFolder`), Xóa trang (`deleteSlide`), Nhân bản trang (`duplicateSlide`), ta đặt `isBulkUpdating = true` trước khi thực hiện logic, và chỉ gọi `safeSaveSlides()` / `safeSaveFolders()` duy nhất **1 lần** ở cuối trước khi tắt cờ hiệu `isBulkUpdating = false`.

### 2026-06-26 - Giới Hạn Của IndexedDB Trong Chế Độ Ẩn Danh (Incognito Mode) Đối Với Lưu Trữ Ảnh Base64
- **Vấn đề**: Khi người dùng sử dụng ứng dụng Pose Flow Builder trong chế độ ẩn danh (Incognito / Private Browsing) của trình duyệt, IndexedDB vẫn hoạt động nhưng dữ liệu lưu trữ (các ảnh base64 rất nặng) sẽ bị giới hạn dung lượng nghiêm trọng (thường dưới 5MB - 10MB) và toàn bộ dữ liệu này sẽ bị xóa sạch ngay khi tab hoặc cửa sổ ẩn danh bị đóng lại. Điều này có thể khiến anh Hiệp mất concept đang làm dở nếu vô tình tắt trình duyệt.
- **Giải pháp**:
  1. Thêm cảnh báo rõ ràng hoặc lưu ý trong giao diện/hướng dẫn sử dụng để khuyên dùng trình duyệt ở chế độ thường khi tạo lập concept dài hạn.
  2. Khuyến khích lưu trữ ảnh chụp màn hình gốc trên máy, ứng dụng Pose Flow Builder đóng vai trò là công cụ kéo thả, phân loại nhanh và trình chiếu trước buổi chụp.

### 2026-06-26 - Lỗi Chữ Trắng Trên Nền Trắng Của Thẻ Option Trong Trình Duyệt Chrome Windows (Dark Mode)
- **Vấn đề**: Khi thiết kế giao diện Dark Mode với các thẻ `<select>` có `color: #ffffff`, trình duyệt Chrome trên Windows sẽ kế thừa màu chữ trắng cho các thẻ con `<option>`. Tuy nhiên, dropdown list mở ra lại sử dụng màu nền trắng mặc định của hệ thống dẫn đến lỗi chữ trắng trên nền trắng khiến các tùy chọn biến mất (tàng hình). Do đó người dùng chỉ nhìn thấy tùy chọn đầu tiên đang active (được bôi xanh) và không thể chọn các tùy chọn khác, khiến tính năng gán nhãn tư thế bị lỗi và thuật toán sort không chạy được.
- **Giải pháp**:
  Khai báo rõ ràng màu nền và màu chữ cho thẻ con `option` trong CSS:
  ```css
  .select-dropdown option {
    background-color: #1e1e1e;
    color: #ffffff;
  }
  ```

### 2026-06-27 - Lỗi Tàng Hình Custom Modal Do Thẻ Div Lồng Nhau (Tag Nesting Bug)
- **Vấn đề**: Khi chèn một Modal tùy biến (Custom Popup) mới vào cuối `index.html`, nếu chèn nhầm vào bên trong một container Modal khác có thuộc tính `display: none` mặc định (như `#present-modal`), Custom Modal sẽ không thể hiển thị dù CSS và JS hoạt động bình thường, gây ra hiện tượng click nút tương tác hoàn toàn bị đơ (do popup mở ngầm bên trong thẻ cha bị ẩn).
- **Giải pháp**:
  - Đảm bảo đóng đầy đủ các thẻ cha của modal trước đó (`</div>`). Các Modal độc lập nên là các thẻ anh em (siblings) trực tiếp của `<body>`.
  - Luôn thêm query string phiên bản (cache buster) vào thẻ script (ví dụ: `<script src="app.js?v=2.4"></script>`) when changing logic CSS/JS to force mobile devices to flush cache.

### 2026-06-27 - DNS Configuration & Subdomain Conflicts (Hostinger & VPS Deployments)
- **Vấn đề 1 (Nhầm lẫn môi trường)**: Nhầm lẫn giữa các dự án chạy trên Vercel (như `pose-flow`, `bao-gia` trỏ CNAME về `cname.vercel-dns.com`) và dự án chạy trên VPS riêng (như `han-social-autopilot` trỏ bản ghi A về IP VPS `163.223.13.238`), dẫn đến việc trỏ nhầm DNS làm sập kết nối và trả về lỗi Vercel `DEPLOYMENT_NOT_FOUND`.
- **Vấn đề 2 (Xung đột DNS trùng tên)**: Trên các nhà cung cấp tên miền (như Hostinger), hệ thống sẽ không cho lưu bản ghi `A` mới trùng tên (ví dụ: `social`) nếu như bản ghi `CNAME` cũ trùng tên vẫn đang tồn tại, dẫn đến cấu hình mới không có tác dụng.
- **Vấn đề 3 (Thiếu cấu hình server_name Nginx)**: Khi chuyển đổi/bổ sung tên miền phụ mới (ví dụ `social.hansstudio.net`) trỏ về VPS, nếu Nginx trên máy chủ chưa khai báo tên miền mới trong directive `server_name` của file config và chưa reload Nginx (`systemctl reload nginx`), VPS sẽ không thể nhận diện và chuyển tiếp request tới app Node/Next.js chạy cổng nội bộ.
- **Giải pháp**:
  1. Luôn xác định đúng môi trường chạy dự án (Vercel vs VPS) trước khi hướng dẫn user trỏ DNS.
  2. Bắt buộc xóa bản ghi cũ trước khi thêm mới bản ghi trùng tên (hoặc bấm Sửa trực tiếp) để tránh lỗi trùng lặp/bỏ qua lưu của nhà đăng ký.
  3. Khi đổi domain phụ trỏ về VPS: Thêm domain mới vào `server_name` trong `/etc/nginx/sites-available/...`, chạy `nginx -t`, `systemctl reload nginx` và tiến hành cấp SSL HTTPS mới qua Certbot (`certbot --nginx -d new-domain`).

### 2026-06-29 - Lỗi Reset CSS Triệt Tiêu Spacing & Tranh Chấp Trình Duyệt Dropdown Select (Next.js & Tailwind CSS v4)
- **Vấn đề 1 (Reset CSS triệt tiêu spacing)**: Sử dụng cấu trúc reset toàn cục `* { padding: 0; margin: 0; }` trong `globals.css` làm triệt tiêu toàn bộ khoảng đệm (padding) của các bong bóng chat, ô tìm kiếm và ô select khi Tailwind CSS compile bị lỗi hoặc không tạo kịp thời các utility class (như `p-3`, `px-4`), khiến giao diện Inbox bị squished, dính sát lề và khuyết chữ.
- **Vấn đề 2 (Mũi tên select mặc định xấu/lệch lề)**: Thẻ `<select>` mặc định của hệ điều hành Windows/Chrome hiển thị mũi tên xổ xuống thô kệch, không đồng bộ với thiết kế Light/Dark theme của Studio và thường bỏ qua padding do CSS mặc định của trình duyệt.
- **Giải pháp**:
  1. Viết riêng một module **Semantic CSS** tùy chỉnh chuyên biệt cho Inbox ở cuối tệp `globals.css` và dùng các thuộc tính `!important` để bảo vệ khoảng thở (padding `py-3 px-4`, bo góc `rounded-xl` / `rounded-2xl`, bóng đổ `shadow-card`, v.v.) khỏi sự triệt tiêu của reset toàn cục.
  2. Bọc select trong một thẻ wrapper `inbox-select-wrapper` có `position: relative`, ẩn mũi tên mặc định của trình duyệt bằng `appearance: none !important`, và đặt một icon `<ChevronDown />` tuyệt đẹp căn tuyệt đối ở bên phải (`absolute right-3.5 top-1/2 -translate-y-1/2`) để có mũi tên xổ xuống đồng bộ, chuyên nghiệp ở cả 2 giao diện.

### 2026-06-30 - Tách biệt thương hiệu cũ và bảo lưu tài nguyên thương hiệu gốc (Han's Studio vs 2H Studio)
- **Vấn đề**: Người dùng (anh Hiệp) đã ngừng hoạt động thương hiệu cũ **2H Studio** và hiện tại chỉ tập trung phát triển duy nhất thương hiệu **Han's Studio**. Mọi logo cũ của 2H Studio (như link `https://2hstudio.vn/...`) hoặc các yếu tố thương hiệu cũ nếu được chèn ngầm hoặc lấy từ file cấu hình cũ sẽ gây khó chịu cho người dùng.
- **Giải pháp**:
  - Tuyệt đối không tự ý lấy logo hoặc tên thương hiệu 2H Studio từ các tài liệu/SKILL.md cũ.
  - Khi tạo dự án mới hoặc cập nhật giao diện, chỉ sử dụng tên thương hiệu **Han's Studio** và **không chèn logo trừ khi có yêu cầu cụ thể của anh Hiệp**.
  - Đã cập nhật loại bỏ hoàn toàn logo 2H Studio trong phần Header của công cụ Art Director & Typo Studio.

### 2026-06-30 - Lỗi Định Dạng Màu HTML Color Input & Gemini response Schema Không Đồng Nhất
- **Vấn đề 1 (Giới hạn HTML Color Input)**: Thẻ `<input type="color">` chỉ chấp nhận định dạng mã màu Hex chuẩn `#rrggbb`. Nếu nạp trực tiếp giá trị màu `rgba(...)` hoặc định dạng khác từ Preset/AI, trình duyệt sẽ cảnh báo và không nạp đúng giá trị màu sắc.
- **Vấn đề 2 (Gemini Response thiếu đồng nhất)**: Mô hình AI đôi khi tự giản lược cấu trúc JSON trả về thành kiểu 2 dòng thô sơ thay vì cấu trúc đa lớp (`elements` chứa vương miện, đường phân cách, v.v.) mặc dù prompt văn bản đã yêu cầu.
- **Giải pháp**:
  - Đối với màu sắc: Luôn kiểm tra chuỗi màu sắc, nếu không bắt đầu bằng `#` hoặc độ dài khác 7 ký tự, gán một giá trị Hex fallback (như `#FAFAF8`) trước khi đưa vào giá trị thuộc tính của thẻ input color.
  - Đối với cấu trúc AI: Sử dụng cấu hình tham số **`responseSchema`** trong tùy chọn `generationConfig` của Gemini API để ràng buộc cứng cấu trúc JSON đầu ra (bao gồm mảng `elements` chứa đầy đủ thuộc tính text, font, size, color, weight, style). Điều này đảm bảo 100% kết quả phân tích AI luôn tuân thủ chuẩn đa lớp của ứng dụng.
### 2026-07-03 - Giải mã Ngày Tháng Facebook Bị Obfuscated & Trích xuất Feed khi dùng Bộ lọc (Facebook Obfuscated Timestamps Decoding)
- **Vấn đề 1 (Giải mã Ngày Tháng)**: Facebook làm nhiễu (obfuscate) chữ hiển thị của thẻ timestamp <a> bằng cách chèn hàng loạt thẻ <span> chứa các ký tự rác ngẫu nhiên được định vị bằng position: absolute và ẩn đi, khiến cho việc đọc innerText của link trả về một chuỗi ký tự vô nghĩa. Tuy nhiên, các ký tự thật cấu tạo nên ngày tháng thực tế lại có CSS position: relative.
- **Vấn đề 2 (Độ trễ tải trang và Cuộn trang)**: Khi áp dụng bộ lọc (ví dụ: Year 2025/2026), Facebook hiển thị feed mà không có thuộc tính 
ole="article" chuẩn như feed mặc định, mà được nhóm dưới dạng cấu trúc DOM phẳng. Hơn nữa, việc click vào các nút "Xem thêm" mà không kiểm tra kỹ thẻ cha có thể vô tình click trúng thẻ <a> khiến trang bị chuyển hướng (navigation away).
- **Giải pháp**:
  1. Sử dụng script JS duyệt qua toàn bộ các liên kết post trên trang feed.
  2. Với mỗi thẻ <a> timestamp, lấy toàn bộ thẻ <span> con có style position === 'relative'.
  3. Lấy tọa độ left từ getBoundingClientRect() của các span này, sắp xếp chúng theo thứ tự từ trái sang phải, rồi ghép các ký tự lại để khôi phục ngày tháng hiển thị chính xác (ví dụ: "31 tháng 12, 2025").
  4. Khi viết script cuộn tự động để mở rộng bài viết, chỉ click vào phần tử "Xem thêm" / "See more" có tag khác A và không nằm trong thẻ <a> nào (!el.closest('a')). Chia nhỏ việc cuộn trang thành các phần (part) khoảng 30-35 bước cuộn để tránh timeout của MCP Tool.

### 2026-07-09 - Lỗi Deploy Vercel (Build Command 127) & Định Tuyến Tĩnh (Static Routing 404)
- **Vấn đề 1 (Build Command 127)**: Khi deploy một static website lên Vercel nhưng project settings trên Cloud đã bị khóa/cấu hình nhầm Build Command thành `vite build` hoặc framework preset khác, Vercel Cloud sẽ cố chạy build command này và báo lỗi do không có file `package.json` ở root.
  - **Cách fix**: Khắc phục bằng cách tạo file `vercel.json` ở thư mục gốc để tắt hoàn toàn lệnh build, buộc Vercel chạy lệnh echo trống luôn thành công:
    ```json
    {
      "buildCommand": "echo 'No build needed'",
      "installCommand": "echo 'No install needed'",
      "outputDirectory": "."
    }
    ```
- **Vấn đề 2 (Lỗi 404 khi chuyển Tab Tĩnh)**: Khi chuyển hướng qua lại giữa 2 trang tĩnh trong thư mục con bằng thẻ A dạng `href="index.html"` và `href="anh-to.html"`, trình duyệt hiểu là base URL ở root `/` dẫn đến việc gọi `/index.html` hoặc `/anh-to.html` ở root của Vercel, gây lỗi 404 do các file thực tế nằm trong `/bao-gia/`.
  - **Cách fix**: Khắc phục dứt điểm bằng cách cấu hình `rewrites` tường minh cho cả phiên bản có đuôi `.html` và không có đuôi `.html` về đúng các file trong thư mục `/bao-gia/`:
    ```json
    "rewrites": [
      { "source": "/anh-to", "destination": "/bao-gia/anh-to.html" },
      { "source": "/anh-to.html", "destination": "/bao-gia/anh-to.html" },
      { "source": "/index.html", "destination": "/bao-gia/index.html" },
      { "source": "/index", "destination": "/bao-gia/index.html" },
      { "source": "/", "destination": "/bao-gia/index.html" }
    ]
    ```

---

### 2026-07-14 — CSS Transform Scale + Layout Space: Bảng Bị Cắt Do transform Không Thu Gọn Layout Space

- **Vấn đề**: Khi dùng `transform: scale(0.6)` để thu nhỏ một div 1123px, layout của trình duyệt vẫn **cấp phát 1123px** cho phần tử đó. Visual nhỏ nhưng box-model vẫn lớn → scroll ngang xuất hiện, nội dung bị cắt khi parent `overflow: hidden`.
- **Root Cause**: CSS `transform` không thay đổi layout flow (khác `width/height`). Phần tử vẫn chiếm đủ không gian layout gốc, chỉ visual bị thu nhỏ.
- **Fix Pattern (scale-host)**:
  1. Tạo div bọc ngoài `#scale-host` với `position: relative; overflow: hidden; width: scaledW; height: scaledH` (set bằng JS).
  2. `#preview-scale-wrapper` bên trong dùng `position: absolute; top: 0; left: 0; transform-origin: top left; transform: scale(N)`.
  3. `scale-host` giữ kích thước layout = kích thước sau scale → không còn scroll ngang.
- **Gotcha**: CSS selector `.preview-area` vs `.preview-workspace` — phải match đúng class thực tế trong HTML. Dùng DevTools để kiểm tra class thực tế của element trước khi viết CSS override.

### 2026-07-14 — CSS Grid `align-content` Cho Photos Grid Trong Fixed-Height Container

- **Vấn đề**: Grid ảnh dùng `display: grid; grid-template-columns: repeat(auto-fill, 180px)` bên trong container có `height: calc(100vh - 32px)` → khi chỉ có 2-3 ảnh, các row bị **stretch** để fill hết chiều cao container → ảnh bị dài ra thành dải mỏng.
- **Fix**: Thêm `align-content: start` vào `.photos-grid` → các rows được stack ở đầu, không stretch. Đây là pattern chuẩn cho mọi grid trong fixed-height container.
- **Bonus**: `min-height: 180px` cho `.photo-img-container` phòng trường hợp container bị flatten về 0.

### 2026-07-14 — iframe với `src` chứa dấu `#` hoặc query string trong catalogue app

- **Vấn đề**: `catalogue/app.js` inject CSS vào iframes dùng `document.querySelectorAll("iframe")` nhưng CSS selector `.preview-area` không khớp class thực tế `.preview-workspace` → CSS override không được áp dụng, layout bị giữ nguyên style gốc.
- **Fix**: Luôn verify class tên HTML element trước khi viết CSS override. Dùng Browser DevTools → Elements panel → kiểm tra class list của element mục tiêu.

### 2026-07-15 — Lỗi Tàng Hình Modal Custom Do Thiếu Thẻ Đóng HTML

- **Vấn đề**: Hộp thoại modal `.popup-modal-overlay` có `position: fixed` nhưng khi click nút mở thì hoàn toàn không thấy hiển thị gì trên màn hình (đứng im, dù DOM báo đã set `display: flex` và class `active`). Đo kích thước `getBoundingClientRect()` thì trả về `width: 0`, `height: 0`.
- **Root Cause**: Bị thiếu thẻ đóng `</div>` ở phần tử phía trước (`#present-modal`), khiến cho modal `.popup-modal-overlay` bị chui lồng vào bên trong một container cha đang bị ẩn (`display: none`). Do đặc tính CSS, dù phần tử con có `position: fixed` hay `display: flex`, nếu bất kỳ cha nào của nó có `display: none`, nó sẽ bị biến mất và không có kích thước vật lý.
- **Fix**: Thêm thẻ đóng `</div>` đóng hoàn toàn `#present-modal` trước khi khai báo `#custom-popup-modal`. Đồng thời tăng cường check `getBoundingClientRect` trong script để cảnh báo nếu width/height bị render bằng 0.

### 2026-07-15 — Lỗi Rò Rỉ CSS Toàn Cục & Thiếu Element Phụ Trợ Khi Tích Hợp Inline Các Module Con

- **Vấn đề 1 (Rò rỉ CSS)**: Khi nhúng trực tiếp file CSS của module con (`pose-flow/style.css`) vào trang mẹ (`catalogue/index.html`), các CSS rule toàn cục của tag (`body`, `main`, `header`) sẽ phá vỡ layout và bóp nghẹt trang mẹ ở giữa.
  - **Cách fix**: Scoping CSS của module con bằng một class định danh (ví dụ `body.pose-flow-standalone`) cho các rule toàn cục.
- **Vấn đề 2 (Thiếu element phụ trợ khi chuyển từ iframe sang Inline)**: Khi chuyển từ nhúng iframe sang tích hợp trực tiếp (inline) trong DOM cha để tăng độ mượt mà, dễ bị bỏ quên các element phụ trợ (như Lightbox xem ảnh, Context Menu, Popup Modal) vốn được viết ở root của module con. Việc này dẫn đến việc JS tìm kiếm các element này bị `null` và khiến các tính năng như click đúp xem ảnh phóng to không hoạt động.
  - **Cách fix**: Copy toàn bộ mã HTML phụ trợ (như `#drive-lightbox`) của module con vào cuối file HTML cha.
- **Vấn đề 3 (Lỗi undefined hàm do timing nạp iframe)**: Cấu hình `onload="injectStyleToIframe(this)"` trong các thẻ iframe của trang cha dễ bị lỗi `injectStyleToIframe is not defined` nếu iframe tải nhanh hơn file JS chính ở cuối body.
  - **Cách fix**: Định nghĩa sớm hàm `window.injectStyleToIframe` ngay trong thẻ `<script>` ở `<head>` của trang cha để đảm bảo nó luôn tồn tại kể cả khi file JS chính chưa load xong.

---

### 2026-07-16 — Di chuyển hệ thống Chọn Ảnh (Han Drive) sang Google Drive Serverless
- **Vấn đề**: Module Chọn Ảnh (Han Drive) sử dụng Express server chạy trên VPS qua cổng 3006 để quản lý thư mục, tải ảnh cưới và lưu dữ liệu. Khi chạy Catalogue frontend trên Vercel qua HTTPS, trình duyệt chặn các request HTTP không mã hóa đến VPS (lỗi Mixed Content). Đồng thời cấu hình API phức tạp, dễ bị gián đoạn.
- **Root Cause**: Bất đối xứng môi trường (frontend HTTPS trên Vercel và backend HTTP trên VPS) và việc lưu trữ tệp cục bộ trên đĩa VPS cần chi phí vận hành cao.
- **Fix Pattern**:
  1. Nâng cấp Google Apps Script Web App của dự án (mở rộng hàm `doPost` trong `api-pose.js`) để đóng vai trò làm API backend quản lý thư mục, upload ảnh bằng Base64 và lưu cấu hình dưới dạng JSON file (`Drive Metadata.json`).
  2. Frontend của module Chọn Ảnh (`app.js` và `client.js`) đọc trực tiếp URL Apps Script Web App từ `localStorage` và chuyển đổi tất cả các cuộc gọi API cục bộ thành các request gửi đến GAS.
  3. Sử dụng link CDN trực tiếp của Google Drive `https://lh3.googleusercontent.com/d/{File_ID}` để hiển thị ảnh nhanh và khắc phục lỗi CORS.
- **Gotcha**: GAS Web App chỉ hỗ trợ các request POST trả về JSON, không nhận trực tiếp `multipart/form-data` hoặc file upload truyền thống. Do đó khi tải ảnh lên, phải dùng `FileReader` để chuyển đổi file ảnh thành chuỗi Base64 trước khi gửi JSON payload lên Apps Script.

---

### 2026-07-16 — Lỗi so sánh kiểu dữ liệu ID của Concept/Thư mục trong Pose Chụp
- **Lỗi**: Khi nhận ID của Concept từ các sự kiện DOM (như click, contextmenu), kiểu dữ liệu thường bị chuyển thành Chuỗi (String) do chèn vào template HTML dạng `'${node.id}'`. Nếu cơ sở dữ liệu IndexedDB lưu ID mặc định dưới dạng Số (Number `1`), các phép so sánh tuyệt đối `===` hoặc `.find(c => c.id === id)` sẽ trả về `undefined`, làm ẩn sạch hình ảnh hoặc ngắt chức năng xóa/sửa mà không báo lỗi console rõ ràng.
- **Fix**: Xây dựng hàm tiện ích `const parseId = (val) => (/^\d+$/.test(val) ? Number(val) : val);` để tự động đưa ID về đúng kiểu dữ liệu gốc (số hoặc chữ) trước khi so sánh.
- **Lỗi check action trả về từ custom dialog**: Hàm `showCustomDialog` trả về một đối tượng `{ action: 'delete', value: '' }` thay vì trả về trực tiếp chuỗi chữ hành động. Việc so sánh trực tiếp `res === 'delete'` sẽ luôn trả về `false` và làm kẹt nút xác nhận xóa. Phải sửa thành `res && res.action === 'delete'`.

### 2026-07-16 — Cơ chế Cache SWR (Stale-While-Revalidate) và đường dẫn Iframe tương đối trên Vercel
- **Gotcha 1 (GAS Latency)**: Google Apps Script Web App phản hồi chậm từ 3-5 giây khiến việc chuyển đổi thư mục tạo cảm giác bị treo, lag.
  - **Giải pháp**: Áp dụng SWR Cache. Lưu kết quả quét thư mục và cây thư mục vào `localStorage`. Khi nạp trang hoặc mở thư mục, hiển thị dữ liệu từ cache ngay lập tức (0 giây), sau đó chạy fetch ngầm và cập nhật lại giao diện mượt mà.
- **Gotcha 2 (Iframe 404 Vercel)**: Sử dụng đường dẫn tuyệt đối `/client.html` trong một iframe được nhúng ở thư mục con của Vercel (ví dụ `/han-drive/public/index.html`) khiến trình duyệt phân giải thành `host/client.html` (gây lỗi 404).
  - **Giải pháp**: Đổi thành đường dẫn tương đối `client.html?album=...` để trình duyệt phân giải tương đối với URL của iframe hiện tại (`host/han-drive/public/client.html`).

### 2026-07-17 — Lỗi runtime khi chuyển đổi sang cấu trúc dữ liệu lồng nhau phức tạp
- **Vấn đề**: Khi cấu trúc lại dữ liệu trong module báo giá in ấn từ dạng phẳng (`appState.studioName`) sang mảng lồng nhau (`getCurrentSupplier().studioName`), một số đoạn code cũ (như hàm click listener của nút xuất ảnh `btn-export-png` ở cuối file) bị bỏ sót, vẫn gọi thuộc tính trực tiếp từ `appState` dẫn đến lỗi `Cannot read properties of undefined (reading 'replace')` làm kẹt tính năng.
- **Giải pháp**: 
  1. Sau khi refactor hoặc chuyển đổi cấu trúc dữ liệu, sử dụng `grep_search` để quét sạch các vết tích cũ của các trường dữ liệu bị thay đổi trong toàn bộ file.
  2. Sử dụng browser subagent để kiểm thử tất cả các luồng hoạt động chính (nhập giá, tạo mới, xuất ảnh, khôi phục) để đảm bảo không còn lỗi runtime ngầm.

---

### 2026-07-17 — Xung đột ID Modal và Lỗi Cú Pháp Ngoặc Nhọn JS trong Catalogue
- **Gotcha 1 (Xung đột ID)**: Khi chèn một modal mới vào file HTML có sẵn (ví dụ `catalogue/index.html`), nếu đặt ID trùng với modal cũ (`package-detail-modal`), trình duyệt sẽ luôn trả về phần tử xuất hiện trước trong DOM. Khiến hàm JS gọi hiển thị modal mới vô tình bật modal cũ có cấu trúc dữ liệu khác hẳn.
  - **Giải pháp**: Phải luôn đặt ID đặc trưng, tránh trùng lặp (ví dụ `package-a4-detail-modal`).
- **Gotcha 2 (Lỗi đóng ngoặc nhọn)**: Khi dùng tool sửa code tự động thay thế một phần thân của hàm JS, nếu vô tình chèn dấu đóng ngoặc nhọn `}` sớm, phần code còn lại của hàm sẽ bị đẩy ra ngoài phạm vi hàm (top-level / global scope) gây lỗi cú pháp nghiêm trọng `Illegal return statement`, làm ngắt trình duyệt dịch toàn bộ file JS.
  - **Giải pháp**: Luôn kiểm tra cấu trúc đóng mở ngoặc nhọn `{}` của hàm sau khi thay thế và chạy script chẩn đoán bằng Playwright.
- **Gotcha 3 (Filter đổi màu logo trong Dark Mode)**: Để biến đổi một hình ảnh logo màu tối thành màu trắng tinh khiết ở chế độ tối (Dark mode) mà không cần thay đổi file ảnh nguồn, sử dụng combo CSS filter: `filter: brightness(0) invert(1) !important`.
- **Gotcha 4 (Bảo toàn chiều cao Header khi tăng size logo)**: Khi tăng kích thước ảnh logo trong header tự co giãn (flexbox), để tránh làm phình to chiều cao của header, ta khống chế cứng chiều cao của header (ví dụ `h-[75px] flex items-center`) và dùng class translate để logo nhô nhẹ tràn xuống dưới nghệ thuật (`transform translate-y-1.5 z-50`).

### 2026-07-18 — Race Condition trong Iframe Drive và URL định tuyến 404
- **Gotcha 1 (Race Condition khi click đúp mở thư mục)**: Trong giao diện quản lý Drive (app.js), khi người dùng click đúp để mở một thư mục mới (ví dụ "CHỊ MẾN"), hệ thống sẽ gửi request bất đồng bộ lấy dữ liệu thư mục này. Tuy nhiên, request ngầm của thư mục cũ trước đó (ví dụ thư mục gốc) chạy chậm hơn và hoàn thành sau, ghi đè danh sách thư mục gốc lên view, gây ra lỗi "folder nhảy qua nhảy lại lúc vào trong lúc tự nhảy ra".
  - **Giải pháp**: Kiểm tra `if (state.currentPath !== path) return;` ngay sau khi API call bất đồng bộ trả về kết quả để hủy bỏ các request lỗi thời của thư mục cũ.
- **Gotcha 2 (Lỗi định tuyến URL 404 của link chia sẻ)**: Khi Catalogue mẹ nhúng Iframe Drive ở thư mục con, việc sinh link chia sẻ cho khách hàng dạng tuyệt đối `/client.html` khiến trình duyệt phân giải sai đường dẫn trên hosting Vercel.
  - **Giải pháp**: Sửa đổi đường dẫn link chia sẻ chính xác trỏ đến `/han-drive/public/client.html?album=...`, đồng thời tự động lấy Số điện thoại của khách hàng làm tên Album và đính kèm passcode truy cập `&passcode=...` để mang lại trải nghiệm mở thẳng album không cần gõ mật khẩu.
- **Gotcha 3 (Thay Alert mặc định bằng Toast thông báo)**: Sử dụng `alert()` mặc định của trình duyệt để báo sao chép thành công có thể gây đơ luồng xử lý và trông lỗi thời.
  - **Giải pháp**: Nhúng container `#toast-container` và sử dụng hàm `showToast()` tùy biến để hiển thị thông báo đẹp mắt, nổi nhẹ ở góc dưới bên phải màn hình.

---

### 2026-07-19 — Lỗi Cô Lập IndexedDB Trong Iframe và Định Cấu Hình PWA Scope Toàn Diện
- **Vấn đề 1 (Bộ nhớ IndexedDB riêng biệt theo Sub-app)**: Các dữ liệu như danh mục dáng chụp trong tab "POSE CHỤP" được lưu trữ trong IndexedDB của chính iframe (`HansPoseFlowDB_v2`). Khi xuất file dữ liệu (.json) thông qua `localStorage` ở giao diện chính, toàn bộ thư mục dáng chụp (như "CONCEPT CHỤP SEN") không thể được ghi lại và xuất ra, khiến cho việc đồng bộ hóa dữ liệu sang thiết bị khác bị mất mát phần dáng chụp.
  - **Cách khắc phục**: Tích hợp các nút **Xuất/Nhập dữ liệu JSON** trực tiếp ngay trong thanh menu lề trái của tab POSE CHỤP. Code JS của app con tự đọc các object store `concepts` và `photos` trong IndexedDB, gói lại thành file json tải xuống và khôi phục khi upload để đồng bộ độc lập.
- **Vấn đề 2 (Mất tab và trống trơn PWA Standalone)**: Khi cài đặt PWA và thiết lập `"scope": "/catalogue/"` trong manifest, các tab liên kết dạng iframe ở thư mục khác (như `/pose-flow/`, `/han-drive/`, `/bao-gia/`) bị trình duyệt coi là nằm ngoài phạm vi PWA và từ chối tải nội dung (hoặc tải ra trang trắng) khi người dùng chạy ở chế độ standalone (Add to Home Screen).
  - **Cách khắc phục**: Đổi scope của manifest thành `"scope": "/"` và đăng ký Service Worker từ file gốc `/sw.js` thay vì `/catalogue/sw.js` để bao quát toàn bộ domain. Cho phép PWA standalone tải trơn tru toàn bộ các tab con.
- **Vấn đề 3 (Z-index lồng nhau trong Iframe và Lightbox)**: Một số modal popup dialog được chèn động (như xác nhận xóa) có z-index thấp hơn lightbox (z-index `99999`) nên sẽ bị ẩn phía sau lightbox và gây treo cứng luồng khi người dùng mở to ảnh và ấn xóa.
  - **Cách khắc phục**: Bắt buộc nâng z-index của các thành phần popup dialog xác nhận động lên mức tối cao `999999` để đảm bảo chúng luôn hiển thị bên trên lightbox.
- **Vấn đề 4 (Tỉ lệ co giãn ảnh A4 Concept)**: Khi hiển thị hình ảnh chi tiết A4 Concept, việc để ảnh co giãn tự do khiến bố cục bìa bị biến dạng và dòng mô tả thô dài phá vỡ khung hình.
  - **Cách khắc phục**: Thiết lập kích thước A4 preview cứng ở tỉ lệ 2:3 chuẩn (`396px * 594px`), ẩn hoàn toàn dòng mô tả thô, và nâng diện tích ảnh preview chiếm 88% card để tăng tính sang trọng và chuẩn mực.

---

### 2026-07-20 — Quản lý Cache Iframe, CSS Responsive Di động và Cô lập Nút điều khiển Admin trong Pose Flow
- **Gotcha 1 (Lỗi Cache Iframe và Bust Cache triệt để)**: Khi ta chỉnh sửa file CSS/JS của các sub-app con nhúng trong Iframe (như `han-drive` hoặc `pose-flow`), mặc dù ta đã tăng phiên bản query parameter trong chính file đó, trình duyệt của người dùng vẫn có thể load bản cũ từ bộ nhớ cache do file `index.html` của sub-app hoặc link nhúng iframe ở Catalogue cha không được thay đổi.
  - **Cách khắc phục**: Phải đồng thời nâng version của liên kết CSS/JS trong `index.html` của sub-app, và thêm phiên bản query vào thuộc tính `src` của thẻ `iframe` ở Catalogue mẹ (ví dụ `<iframe src="../pose-flow/index.html?v=8.0">`).
- **Gotcha 2 (Tránh đè CSS di động lên máy tính)**: Khi viết các quy tắc ghi đè (overrides) layout di động (như đổi card thư mục sang layout 2 cột với hộp icon to), nếu vô tình đặt chúng ngoài block `@media (max-width: 768px)` trong stylesheet, các quy tắc này sẽ áp dụng lên cả máy tính (Desktop), dẫn đến các card thư mục bị giãn to đùng đoàng, choán hết màn hình máy tính rất mất thẩm mỹ.
  - **Cách khắc phục**: Luôn kiểm tra kỹ ranh giới đóng mở ngoặc nhọn `{}` của `@media` query, và đảm bảo mọi style tối ưu riêng cho mobile phải nằm trọn vẹn trong block này.
- **Gotcha 3 (Cô lập tính năng của Admin trong Pose Flow)**: Khi hiển thị Pose chụp cho Ekip hoặc khách hàng xem, các công cụ chỉnh sửa của Admin (như checkbox chọn nhiều ảnh để xóa, dropdown chỉnh dáng chụp) gây rối mắt và làm bối rối vì tạo ra "2 nút tích chọn".
  - **Cách khắc phục**:
    1. Gán class `admin-mode` cho body trong JS dựa trên `window.isAdminMode`.
    2. Dùng CSS ẩn hoàn toàn các control của Admin (`.photo-select-checkbox`, `.pose-label-select`, `.photo-delete-btn`) khi body không có class `.admin-mode`.
    3. Thay dropdown chọn dáng bằng nhãn tĩnh mờ `.pose-label-badge` hiển thị góc trái để Ekip tiện theo dõi, chỉ chừa lại duy nhất 1 nút tích check tròn "Đã chụp" ở góc dưới phải.

---

### 2026-07-21 — Xử lý Sao Chép ClipboardItem Đa Phương Tiện & PWA Cache Busting trong Webapp
- **Gotcha 1 (Lỗi Clipboard API bị Rejection/Ignored)**: Khi gọi `navigator.clipboard.write([new ClipboardItem(...)])` trong sự kiện click của trình duyệt, nếu thực hiện `await fetch(url)` trước khi gọi `write()`, tiến trình async sẽ vượt quá hạn ngạch thời gian cho phép của cử chỉ người dùng (user gesture timeout). Trình duyệt Chrome/Edge sẽ âm thầm chặn không cho phép ghi vào bộ nhớ tạm mà không hiện thông báo.
  - **Cách khắc phục**: Truyền trực tiếp `Promise` tải ảnh vào trong đối tượng `ClipboardItem`: `new ClipboardItem({'image/png': fetch(url).then(r=>r.blob()), 'text/plain': textBlob})`. Ngoài ra, cung cấp Modal Tùy Chọn Chia Sẻ (Copy Ảnh+Nội dung, Copy Link online, Tải file ảnh) để người dùng chủ động lựa chọn phương thức tối ưu nhất.
- **Gotcha 2 (Khách hàng kẹt Cache JS cũ khi Deploy)**: Khi cập nhật các hàm JS cốt lõi trên website có PWA ServiceWorker (`sw.js`), trình duyệt của người dùng vẫn tự động nạp bản `app.js` cũ từ bộ nhớ đệm `hans-studio-v4` bất chấp việc đã deploy mã mới lên server.
  - **Cách khắc phục**: Bắt buộc nâng `CACHE_NAME` trong `sw.js` (ví dụ từ `hans-studio-v4` lên `hans-studio-v43`) mỗi khi có thay đổi JS lớn. Khi ServiceWorker kích hoạt, hàm `activate` sẽ tự động xóa sạch cache cũ và kéo mã mới nhất về cho người dùng.

---

### 2026-07-22 — Scope Variable Binding trong Non-Module Script Tags (`catalogue/data.js` & `catalogue/app.js`)
- **Lỗi**: Khi dùng `const CATALOGUE_DATA = { ... }` ở file `data.js` được nạp bằng thẻ `<script src="data.js">` bình thường, việc truy xuất `CATALOGUE_DATA` bên trong các hàm `async` hoặc module `app.js` đôi khi bị văng lỗi `ReferenceError: CATALOGUE_DATA is not defined` trên một số trình duyệt hoặc khi cache ServiceWorker bị làm mới.
- **Cách khắc phục**: Luôn gán trực tiếp biến hằng số toàn cục vào `window` scope (`window.CATALOGUE_DATA = CATALOGUE_DATA; window.STUDIO_MENU_DATA = CATALOGUE_DATA.studioMenuData;`). Ở phía `app.js`, đọc an toàn theo cú pháp `window.STUDIO_MENU_DATA || (window.CATALOGUE_DATA && window.CATALOGUE_DATA.studioMenuData) || []` để đảm bảo nạp dữ liệu ổn định 100% trong mọi tình huống.

---

### 2026-07-23 — Mã PIN Chế độ Admin Han's Studio (8686)
- **Quy tắc bắt buộc**: Mã PIN chính thức để truy cập **Chế độ Admin** trên toàn bộ hệ thống Han's Studio (Catalogue, Pose Flow, Báo giá) luôn là **`8686`**.
- **Lưu ý Subagent/Agent**: Tất cả các subagent/agent tự động khi tương tác thử nghiệm tính năng Admin trên trình duyệt **bắt buộc dùng duy nhất mã PIN `8686`**, tuyệt đối không thử ngẫu nhiên các mã PIN khác (như `2026`, `1234`, `0000`).


## 23/07/2026: L?i Override CSS Responsive
- **V?n d?**: Giao di?n mobile b? l?i co 3 c?t (width: 350px) do m?t th? dng } sai v? tr ? cu?i kh?i @media (min-width: 1024px), khi?n kh?i CSS desktop b? l?t ra ngoi v ghi d ln mobile.
- **Cch Fix**: B?c k? cc CSS c? d?nh width vo dng kh?i @media (min-width: 1024px). C?n th?n khi ch?nh s?a tr?c ti?p cu?i file HTML ch?a override CSS.

### 2026-07-24 - Lỗi "Không tìm thấy dữ liệu" trong iframe khi chạy PWA (Add to Home Screen) trên iOS
- **Vấn đề**: iOS Safari tạo ra một localStorage riêng biệt và hoàn toàn trống cho mỗi PWA khi cài đặt (Add to Home Screen). Nếu PWA mở một module phụ qua iframe (VD: view.html), và module đó phụ thuộc vào dữ liệu trong localStorage mà Parent Window chưa ghi vào, nó sẽ báo lỗi không tìm thấy dữ liệu (bù lại chạy trên Safari bình thường thì không bị vì dùng chung storage cũ).
- **Cách fix**: Ở Parent Window, ngay khi fetch dữ liệu từ server xong, PHẢI chủ động ghi dữ liệu đó vào localStorage (vd: localStorage.setItem('key', data)) trước khi render iframe để iframe có thể đọc được dữ liệu đồng bộ.

### 2026-07-24 - Lỗi PWA không hiện nút "Thêm vào màn hình chính" hoặc scope bị giới hạn
- **Vấn đề**: Chrome từ chối manifest nếu screenshots chứa đường dẫn tới trang HTML thay vì ảnh. Ngoài ra, nếu manifest.json nằm trong thư mục con (VD: /catalogue/manifest.json), scope của nó mặc định bị giới hạn, không thể cover ra toàn bộ sub-apps (VD: /bao-gia/) khiến người dùng bị văng ra trình duyệt khi đổi app.
- **Cách fix**: Đưa manifest.json ra thẳng thư mục gốc (root), khai báo scope: "/", xóa tham số screenshots sai định dạng, và cập nhật thẻ link rel="manifest" cho TẤT CẢ các sub-apps.

### 2026-07-25 - LocalStorage Data Overwrite on New Device / Fresh Load
- **L?i**: Khi tch d? li?u t? LocalStorage ln Server API, n?u hm kh?i t?o (initApp) v?n d?c t? LocalStorage tru?c, khi m? trn thi?t b? m?i (LocalStorage r?ng), ?ng d?ng s? kh?i t?o m?ng r?ng r?i t? d?ng g?i syncToServer(), d?n t?i ghi d xo s?ch d? li?u trn Server.
- **Cch fix**: B?t bu?c trong hm initApp ph?i fetch() d? li?u t? Server API tru?c. Ch? khi fetch th?t b?i m?i dng LocalStorage lm phuong n d? phng (fallback).


### 2026-07-25 - LocalStorage Data Overwrite on New Device / Fresh Load
- **L?i**: Khi tch d? li?u t? LocalStorage ln Server API, n?u hm kh?i t?o (initApp) v?n d?c t? LocalStorage tru?c, khi m? trn thi?t b? m?i (LocalStorage r?ng), ?ng d?ng s? kh?i t?o m?ng r?ng r?i t? d?ng g?i syncToServer(), d?n t?i ghi d xo s?ch d? li?u trn Server.
- **Cch fix**: B?t bu?c trong hm initApp ph?i fetch() d? li?u t? Server API tru?c. Ch? khi fetch th?t b?i m?i dng LocalStorage lm phuong n d? phng (fallback).


- **Duplicated Admin Concept UI**: Giao di?n Admin c?a tab Concept b? duplicate ? 2 file ring bi?t l `admin.html` v `index.html` (div id="concepts-admin-view"). B?T C? KHI NO s?a giao di?n Admin c?a Concept, B?T BU?C ph?i s?a ? C? 2 FILE ny d? trnh tnh tr?ng code ch?y ? ch? ny nhung h?ng ? ch? khc.


## [2026-07-27] Lỗi Nginx 413 Body Too Large & Base64 in JSON
- **Mô tả:** Khi upload/lưu gói báo giá chứa Base64, Nginx bị ngắt với lỗi HTTP 413 do client_max_body_size mặc định 1MB.
- **Root cause:** Nginx proxy_pass chưa set client_max_body_size và dữ liệu JSON bị phình to do chứa Base64 thay vì URL tĩnh.
- **Khắc phục:** 
  1. Thêm client_max_body_size 100m; và đổi proxy_pass http://127.0.0.1:3009; trong Nginx.
  2. Bóc tách Base64 sang file tĩnh /uploads/ và đưa JSON từ 1.8MB về 34KB.
  3. Dùng python deploy.py để sync version giữa local và live.

### [2026-07-29] Lỗi Cache Trình duyệt vô hiệu hóa Deploy
- **Ngữ cảnh**: File `main.js` dùng `v=113.0` cứng để fetch `pose.html`. Dù deploy bao nhiêu bản mới, trình duyệt vẫn lấy bản cũ.
- **Cách fix**: Bắt buộc trích xuất chuỗi version động từ thẻ `<script src="main.js?v=...">` đang chạy để gán vào `loadModule()`.

### [2026-07-29] CSS Specificity Override Tailwind
- **Ngữ cảnh**: Code cũ có reset `#tab-pose * { padding: 0; }` (Specificity: 1,0,0).
- **Lỗi**: Vô hiệu hóa toàn bộ Utility class của Tailwind như `p-4` (Specificity: 0,1,0).
- **Cách fix**: Xóa bỏ các selector wildcard mang ID (`#id *`) để trả lại quyền kiểm soát cho Tailwind.

### [2026-07-29] Lỗi chiều cao Iframe thừa khoảng trắng
- **Ngữ cảnh**: Dùng `calc(100vh - 140px)` cho Iframe trong lúc lề ngoài lớn. Khi thu hẹp lề, Iframe không tự giãn xuống đáy.
- **Cách fix**: Dùng `h-full` trên iframe wrapper (trong môi trường Flex/Block có flex-grow) thay vì fix cứng px.

### [2026-07-29] Mobile Double-Click Fallback in Grid Explorers
- **Ngữ cảnh**: Các sự kiện click đúp chuột (`dblclick`) không hoạt động ổn định trên màn hình cảm ứng di động (thường bị nhận nhầm thành thu phóng màn hình).
- **Cách fix**: Trên các thiết bị di động (kích thước màn hình `< 1024px`), bổ sung logic kiểm tra trạng thái: nếu bấm lần 1 sẽ chọn phần tử (select), và bấm lần thứ 2 khi phần tử đã có class `.active-selected` thì sẽ kích hoạt hành động mở thư mục/mở xem ảnh lớn (lightbox).

### [2026-07-29] CSS Specificity & Mobile Media Queries Overriding
- **Ngữ cảnh**: Cấu trúc layout 3 cột ngang (flex-direction: row) và các kích thước sidebar cố định được chỉ định ở cuối file CSS bằng `!important` làm mất tác dụng của các thuộc tính responsive viết trong media query `@media (max-width: 1023px)`.
- **Cách fix**: Đóng gói toàn bộ các quy tắc cấu trúc chỉ dành cho PC/Desktop bên trong một media query `@media (min-width: 1024px)` để tránh ghi đè giao diện di động.

### [2026-07-29] Position Relative trong Flexbox gây trống lề di động
- **Ngữ cảnh**: Khi ẩn Sidebar menu lề trái ra ngoài màn hình trên di động (`transform: translateX(-100%)`), do Sidebar mang thuộc tính `position: relative !important`, trình duyệt vẫn giữ nguyên vùng diện tích chiếm chỗ của nó trong flex layout, tạo ra khoảng trắng lớn và bóp méo nội dung bên phải.
- **Cách fix**: Chuyển Sidebar sang `position: fixed !important` hoặc `position: absolute !important` ở viewport di động để bóc tách nó ra khỏi luồng tính toán diện tích (flow) của Flexbox.

### [2026-07-30] Lỗi ReferenceError trong ES Modules khi gọi từ HTML inline events (onclick)
- **Ngữ cảnh**: Chuyển đổi cấu trúc file JS của các tab sang modular ES Modules (<script type="module">). Khi người dùng nhấn nút co giãn dải trang trong tab Báo Giá trên di động, trình duyệt báo lỗi `Uncaught ReferenceError: toggleSlidesBar is not defined`.
- **Root cause**: Các hàm khai báo ở top-level của ES Module nằm trong phạm vi private của module đó chứ không tự động được phơi ra phạm vi toàn cục (`window`). HTML inline events như `onclick="..."` chỉ có thể gọi các hàm ở phạm vi toàn cục.
- **Cách fix**: Bắt buộc phải gán hàm cần gọi từ HTML vào đối tượng `window` (VD: `window.toggleSlidesBar = toggleSlidesBar;`) bên trong file JS của module.


### [Gotcha 2026-07-30] Lỗi Trùng Lặp Selector (Selector Collision) Trong Môi Trường SPA
- **Bối cảnh**: Trong ứng dụng Single Page Application (SPA), khi các module được nạp động và cùng nằm chung trong DOM chính.
- **Vấn đề**: Việc sử dụng các câu lệnh truy vấn toàn cục như `document.querySelector(".left-sidebar")` để lấy thanh điều hướng của module sẽ trả về phần tử đầu tiên khớp trong DOM (có thể thuộc về một module/tab khác đang ẩn), khiến các chức năng điều khiển (như ẩn hiện cột trên di động) hoạt động sai lệch hoặc không hoạt động.
- **Cách khắc phục**: Luôn giới hạn phạm vi truy vấn (scope querySelector) vào phần tử gốc (root wrapper container) của chính module đó:
  ```javascript
  const root = document.getElementById("anhto-module-root");
  const leftSidebar = root ? root.querySelector(".left-sidebar") : document.querySelector(".left-sidebar");
  ```

### [Gotcha 2026-07-30] Lỗi Vỡ Cú Pháp Trình Duyệt (SyntaxError) Khi In Trực Tiếp JSON Chứa Ký Tự Xuống Dòng Vật Lý Từ Server Apps Script
- **Bối cảnh**: Trong Google Apps Script Web App, dữ liệu cấu hình schema hoặc cache máy chủ chứa các ký tự xuống dòng vật lý (`\n` hoặc ngắt dòng thực tế) trong công thức hoặc ghi chú.
- **Vấn đề**: Sử dụng cú pháp in trực tiếp `window.TABLE_SCHEMAS = <?!= tableSchemas ?>;` làm phá vỡ cấu trúc cú pháp của thẻ script trên HTML client, gây ra lỗi `Uncaught SyntaxError: Invalid or unexpected token` và làm crash toàn bộ Javascript điều hướng form CRUD.
- **Cách khắc phục**: Tiến hành mã hóa Base64 dữ liệu ở server-side bằng `Utilities.base64Encode` trước khi truyền xuống HTML, và giải mã UTF-8 an toàn ở client-side bằng `JSON.parse(decodeURIComponent(escape(atob(base64Data))))` để bảo toàn dữ liệu.

### [Gotcha 2026-07-30] Lỗi Cache Google Apps Script Web App Cũ Sau Khi Deploy
- **Bối cảnh**: Khi cập nhật code của Web App Apps Script, đặc biệt là khi dùng lệnh `clasp deploy` để nâng phiên bản.
- **Vấn đề**: Người dùng chính (hoặc các phiên làm việc đang mở sẵn Editor) rất hay bị Chrome và máy chủ CDN của Google lưu cache HTML/JS cũ, khiến cho dù bấm F5 tải lại trang web thì giao diện cũ vẫn hiển thị.
- **Cách khắc phục**: Yêu cầu người dùng mở tab ẩn danh (Incognito) hoặc chuyển sang trình duyệt khác (như Edge, Safari) để bỏ qua bộ nhớ cache và kích hoạt lấy code mới nhất.

### [Gotcha 2026-07-31] Lỗi Temporal Dead Zone (TDZ) Trình Duyệt Khi Khai Báo Biến let Ở Cuối File Trong Module
- **Bối cảnh**: Trong các file JavaScript sử dụng ES Modules, khi gom các hàm lên phía đầu và khai báo biến trạng thái ở phía dưới bằng `let` hay `const`.
- **Vấn đề**: Dù hàm không chạy lúc tải trang mà chỉ chạy sau khi người dùng tương tác, một số trình duyệt (đặc biệt là Safari hoặc Chrome phiên bản cũ) vẫn có thể kích hoạt cơ chế Temporal Dead Zone (TDZ) và ném lỗi `ReferenceError: Cannot access 'variable' before initialization` ngay trong giai đoạn biên dịch/nạp module tĩnh, làm vô hiệu hóa toàn bộ chức năng.
- **Cách khắc phục**: Luôn di chuyển toàn bộ khai báo biến trạng thái (`let`, `const`) của module lên đầu file (trước các định nghĩa hàm) để loại bỏ hoàn toàn rủi ro TDZ.

### [Gotcha 2026-07-31] Class CSS Không Ăn Nhập Khi Gán Lệch Cấp Container Trong Môi Trường Tích Hợp
- **Bối cảnh**: Khi một module con có các CSS rules phụ thuộc vào class hiển thị như `.readonly-mode` (chỉ xem), nhưng class này được script của module con gán lên `document.body` trong khi CSS rules của module con lại viết dạng `.baogia-module-root.readonly-mode`.
- **Vấn đề**: Do class `.readonly-mode` chỉ nằm ở `body` mà không có ở `.baogia-module-root`, nên các selector `.baogia-module-root.readonly-mode` sẽ không bao giờ khớp, khiến dải trang thumbnail và thanh công cụ editor không bị ẩn đi đối với khách xem.
- **Cách khắc phục**: Đồng thời gán/gỡ class `.readonly-mode` lên cả `document.body` và wrapper element của module con, đồng thời bổ sung các selector hỗ trợ cả hai cấp trong file CSS (ví dụ: `.readonly-mode .slides-bar` và `.baogia-module-root.readonly-mode .slides-bar`).

### [Gotcha 2026-07-31] Lỗi "[object Object]" is not valid JSON Do Bất Đồng Bộ Kiểu Dữ Liệu Trong Local Cache
- **Bối cảnh**: Khi client lưu cache cập nhật trạng thái dữ liệu (sau khi CRUD thành công) trực tiếp dưới dạng Object (mảng/đối tượng) vào `window.GLOBAL_DATA_CACHE[cacheKey]`.
- **Vấn đề**: Lần nạp tab tiếp theo, hệ thống proxy cache nhận diện cache hit và gọi callback với Object này. Tuy nhiên, logic module client vẫn gọi `JSON.parse(res)` khiến trình duyệt tự động ép kiểu Object thành chuỗi `"[object Object]"` rồi ném ra lỗi cú pháp làm đứng giao diện.
- **Cách khắc phục**:
  1. Khi đồng bộ dữ liệu vào `window.GLOBAL_DATA_CACHE`, bắt buộc phải chuyển đổi sang chuỗi JSON thô bằng `JSON.stringify(data)`.
  2. Sửa hàm nhận kết quả tại client sử dụng biểu thức điều kiện an toàn: `const data = typeof res === 'string' ? JSON.parse(res) : res;` để tương thích cả 2 kiểu dữ liệu thô và đã phân tích.

### [Gotcha 2026-07-31] Rò Rỉ Dữ Liệu Mồ Côi Do Thiếu Cascading Delete Khi Xóa Bản Ghi Cha
- **Bối cảnh**: Trong các bảng có quan hệ Cha - Con (như Nhân viên `nhan_vien` và Phân bổ `phan_bo_nv`).
- **Vấn đề**: Khi xóa nhân viên khỏi cơ sở dữ liệu, nếu không dọn dẹp các bản ghi phân bổ liên quan trong sheet con, các dòng phân bổ cũ sẽ bị mồ côi, làm tăng dung lượng sheet và gây sai lệch tính toán của các module thống kê, lập lịch hoặc bảng lương.
- **Cách khắc phục**: Server-side logic (`Mod_CRUD_Server.js`) khi xóa bản ghi cha phải tự động tìm kiếm, lọc và xóa toàn bộ các dòng liên kết khóa ngoại tương ứng trong bảng con, đồng thời xóa cache RAM của cả hai bảng để đồng bộ dữ liệu chuẩn xác lên client.

### [Gotcha 2026-07-31] Các Cột Enum Trên AppSheet Bị Trống Dropdown Khi Chuyển Sang Webapp
- **Bối cảnh**: Các cột kiểu `Enum` hoặc `EnumList` được cấu hình tùy chọn thủ công trên AppSheet UI (không ghi xuống Google Sheets) hoặc nạp động từ các nhóm không tồn tại trong sheet `cai_dat`.
- **Vấn đề**: File cấu hình `SchemaConfig.js` bóc tách ra bị trống mảng `values`, dẫn đến Webapp hiển thị ô nhập text thông thường hoặc dropdown không có tùy chọn.
- **Cách khắc phục**:
  1. **Tùy chọn tĩnh cố định:** Bổ sung danh sách tùy chọn trực tiếp ở client (`Mod_CRUD_Helper.html` -> `getEnumOptions`) đối với các trường ít thay đổi (Giới tính, Loại hợp đồng, Quyền hạn...).
  2. **Tùy chọn liên kết động:** Truy vấn trực tiếp mảng dữ liệu đã giải mã từ cache của bảng tương ứng (như `GLOBAL_DATA_CACHE["NhanVien"].employees` cho người giữ thiết bị).
  3. **Tùy chọn biến động thực tế:** Quét trực tiếp danh sách các giá trị hạng mục duy nhất đang có trên sheet (như `services.map(s => s.hang_muc)`) để sinh dropdown động.
### [Gotcha 2026-08-01] Lỗi Form Sửa Bị Trống Thông Tin Do Truyền Sai Tham Số (ID thay vì Object)
- **Bối cảnh**: Trong cơ chế CRUD dùng chung của Master Portal, hàm `window.AppCRUD.openEditForm(tableName, recordObj)` đòi hỏi tham số thứ hai phải là toàn bộ đối tượng bản ghi (`recordObj`) để phân tích cấu trúc và điền giá trị cũ.
- **Vấn đề**: Khi gán sự kiện click cho nút Sửa trong DataTable, nếu chỉ truyền mã ID (ví dụ: `TP-101`) thay vì đối tượng dòng, hàm `openEditForm` sẽ nhận vào một chuỗi đơn thuần và không thể tìm thấy dữ liệu các trường khác để hiển thị, dẫn đến form mở ra hoàn toàn trắng trơn như khi Thêm mới.
- **Cách khắc phục**: Mã hóa đối tượng dòng thành chuỗi URI-encoded JSON (`encodeURIComponent(JSON.stringify(r))`), nhúng trực tiếp vào HTML và giải mã (`JSON.parse(decodeURIComponent(editDataEscaped))`) ngay trong click handler để truyền đầy đủ đối tượng bản ghi cho form.

### [Gotcha 2026-08-01] Dropdown Enum Liên Kết Bị Trống Do So Khớp Lệch Giữa ID Và Tên Hiển Thị
- **Bối cảnh**: Các trường chọn liên kết (như Chi nhánh, Nhà cung cấp, Trạng thái) có mã ID lưu trữ (ví dụ: `NCC-001`) khác với Tên hiển thị (ví dụ: `2H Wedding`).
- **Vấn đề**: Bản ghi trong sheet có thể lưu ID hoặc Tên hiển thị tùy theo trạng thái nhập liệu. Dropdown form chỉ so khớp giá trị bản ghi với thuộc tính `value` của option (là ID). Nếu dữ liệu bản ghi chứa Tên hiển thị, phép so sánh `displayVal === option.value` sẽ thất bại, dẫn đến dropdown không chọn được phần tử nào và hiển thị trống.
- **Cách khắc phục**: Sửa logic gán thuộc tính selected trong `Mod_CRUD_Helper.html`: so sánh giá trị bản ghi với **cả `value` (ID) và `label` (Tên hiển thị)** của option:
  `const selected = (String(displayVal) === String(val) || String(displayVal) === String(lbl)) ? "selected" : "";`
  Điều này đảm bảo dù sheet lưu ID hay Tên thì dropdown vẫn tự động nhận diện và hiển thị đúng tùy chọn được chọn.

### [Gotcha 2026-08-01] Thẻ HTML Input Date Hiển Thị Trống Do Sai Định Dạng Dữ Liệu
- **Bối cảnh**: Native HTML `<input type="date">` yêu cầu giá trị thuộc tính `value` phải là chuỗi định dạng đúng chuẩn `yyyy-MM-dd`.
- **Vấn đề**: Dữ liệu ngày tháng lấy từ Google Sheets thường ở dạng chuỗi tiếng Việt `dd/MM/yyyy` hoặc đối tượng Date. Nếu truyền trực tiếp vào `value="..."`, trình duyệt sẽ bỏ qua và hiển thị ô nhập ngày trống trơn (`mm/dd/yyyy`).
- **Cách khắc phục**: Viết logic chuẩn hóa ngày tháng trước khi gán vào form: chuyển đổi chuỗi `dd/MM/yyyy` hoặc đối tượng Date thành định dạng `yyyy-MM-dd` để trình duyệt render chính xác ngày mặc định trong form Sửa.

### [Gotcha 2026-08-01] Lỗi SyntaxError Treo Script Client Do Ghi Đè Mất Khối lệnh 'return' Trong Module
- **Bối cảnh**: Trong Master Portal của GAS, các Module (Đơn hàng, Nhân viên,...) được nạp động và xuất các hàm điều khiển thông qua cấu trúc closure trả về `return { init: ..., customRenderForm: ... };` ở cuối tệp script.
- **Vấn đề**: Khi chèn thêm lượng lớn code tùy biến (như hàm `customRenderForm` vẽ form 3 tab) ngay trước block `return`, nếu cú pháp thay thế không chính xác (ghi đè làm bốc hơi từ khóa `return {`), trình duyệt sẽ gặp lỗi cú pháp `Uncaught SyntaxError: Unexpected token ':'` tại các thuộc tính lơ lửng như `init: function()`. Lỗi này làm sập toàn bộ luồng load script và khiến module tương ứng trống trơn dữ liệu hiển thị.
- **Cách khắc phục**: Luôn kiểm tra kỹ ranh giới biên thay thế, đảm bảo các hàm tùy biến mới viết xong được đóng ngoặc và có khối `return {` mở đầu đối tượng xuất bản của module trước các hàm gốc.

### [Gotcha 2026-08-02] Rò Rỉ CSS Toàn Cục Trong Ứng Dụng Đơn Trang (SPA) Do Selector CSS Thiếu Scope
- **Bối cảnh**: Trong các ứng dụng Web SPA tải động nhiều module con trên cùng một document, các file stylesheet (`*.css`) của từng module được chèn trực tiếp vào `<head>` khi người dùng chuyển sang module đó.
- **Vấn đề**: Nếu một file CSS module con (ví dụ `baogia.css`) định nghĩa các rule CSS toàn cục (chẳng hạn `select option { color: #fff; }` hoặc `input[type="text"] { color: #fff; }`) mà không giới hạn vùng ảnh hưởng (không scoped), các rule này sẽ ngay lập tức ảnh hưởng đến giao diện của các module khác (như select options của CONCEPT bị chuyển hết thành chữ trắng trên nền sáng, gây tàng hình chữ).
- **Cách khắc phục**:
  1. Luôn scope toàn bộ các selector CSS trong module con bằng cách tiền tố hóa bằng class cha bao bọc của module đó (ví dụ: `.baogia-module-root select option` thay vì `select option`).
  2. Sử dụng các biến màu theme (như `var(--text-light)`) thay cho các giá trị tĩnh cứng (như `#fff`) để giao diện tự động thích ứng hoàn hảo khi chuyển đổi giữa chế độ Sáng/Tối.

### [Gotcha 2026-08-02] Menu Dropdown Click-Outside Không Hoạt Động Do Bị Chặn Bubble Up (event.stopPropagation)
- **Bối cảnh**: Phổ biến trong thiết kế Web, ta hay lắng nghe sự kiện click trên `document` để đóng các menu dropdown mở rộng khi người dùng bấm ra ngoài.
- **Vấn đề**: Nhiều phần tử tương tác khác trên trang (như input, textbox, buttons) có cài đặt sự kiện click gọi `event.stopPropagation()` để xử lý nội bộ. Khi người dùng click vào các phần tử này, sự kiện click không thể lan truyền lên tới `document`, khiến cho hàm đóng dropdown không được kích hoạt.
- **Cách khắc phục**: Đăng ký lắng nghe sự kiện click trên `document` ở pha bắt giữ (**capturing phase**) bằng cách truyền đối số thứ ba là `true`:
  `document.addEventListener('click', (e) => { ... }, true);`
  Điều này cho phép hàm dọn dẹp dropdown luôn được chạy trước khi các phần tử con có cơ hội chặn sự kiện (stopPropagation). Để tránh đóng nhầm khi click vào chính nút kích hoạt dropdown (ví dụ nút ba chấm), hãy kiểm tra điều kiện loại trừ:
  `if (e.target.closest('.ellipsis-btn')) return;`

### [Gotcha 2026-08-02] Tránh Gửi Trống Trường Date Input Khi Tạo Mới (TODAY Default)
- **Vấn đề**: Khi mở form tạo mới, nếu cột có `initial_value === "TODAY()"` nhưng ta không render mặc định giá trị ngày hôm nay trên HTML input date, khi submit form giá trị ngày sẽ bị gửi lên dưới dạng chuỗi rỗng `""`, gây lỗi lọc và làm biến mất bản ghi trên client-side.
- **Cách khắc phục**: Trong logic render form của `Mod_CRUD_Helper.html`, kiểm tra nếu là tạo mới và `initial_value === "TODAY()"`, tự động điền giá trị ngày hôm nay định dạng `yyyy-MM-dd` vào thuộc tính `value` của input date.

### [Gotcha 2026-08-02] Chuẩn Hóa So Sánh Mã Tài Khoản Định Khoản & Thu Chi
- **Vấn đề**: Các dropdown combobox thường lưu trữ giá trị ghép `<Mã>_<Tên>` (VD: `111_Tiền mặt cả công ty`), trong khi bảng định khoản chỉ dùng ID ngắn (VD: `111`). Việc so sánh chuỗi trực tiếp (`===`) sẽ bị lệch khớp, làm mất dòng nhật ký liên quan trong Drawer hoặc tính sai lũy kế phát sinh trên server-side.
- **Cách khắc phục**: Thiết lập helper `getAccCode = (val) => String(val || '').split('_')[0].split('-')[0].split(' ')[0].trim();` để trích xuất phần mã số đứng đầu trước khi thực hiện bất kỳ phép so sánh hay nhóm tổng nào trên cả server-side và client-side.

### [Gotcha 2026-08-02] Ngăn Chặn Vòng Lặp Vô Hạn (Infinite Loop/Browser Freeze) Khi Thay Đổi Giá Trị Trên Dòng Chi Tiết
- **Bối cảnh**: Trong form nhập liệu Master-Detail phức tạp có tính toán tự động (như đơn giá, số lượng, chiết khấu và thành tiền), các sự kiện lắng nghe thay đổi (.detail-row input change/input) sẽ tự động chạy hàm tính tổng tài chính (`recalculateFormFinancials()`).
- **Vấn đề**: Trong hàm `recalculateFormFinancials()`, việc cập nhật giá trị `.val()` cho các ô thành tiền readonly (`.input-line-subtotal`) có thể vô tình trigger sự kiện thay đổi trên các ô đó, gây đệ quy vô hạn và làm đơ trình duyệt nếu có thư viện can thiệp hoặc trình duyệt tự động kích hoạt.
- **Cách khắc phục**: Thêm điều kiện kiểm tra chặn ngay lập tức ở đầu callback sự kiện: `if ($(e.target).hasClass('input-line-subtotal')) return;` để ngăn chặn triệt để.

### [Gotcha 2026-08-02] Xác định URL Web App Live Chính xác Qua clasp deployments
- **Vấn đề**: Khi chạy test tự động bằng Playwright/browser, việc dùng ID lấy từ browser state bị cắt ngắn bằng dấu `...` sẽ gây ra lỗi trang không tìm thấy (Page not found) hoặc bị kẹt màn hình đăng nhập tài khoản Google.
- **Cách khắc phục**: Chạy lệnh `npx @google/clasp deployments` để liệt kê đầy đủ tất cả danh sách deployment ID đang có. Sử dụng đúng ID tương ứng có đuôi `/exec` để thực thi test tự động.

### [Gotcha 2026-08-03] Bắt Bộc Chuẩn Xác Thể Loại & Nội Dung Typo Khi Thiết Kế Cho Ảnh
- **Bối cảnh**: Khi thiết kế chữ (Typography) cho ảnh khách hàng (Studio Photo / Baby / Family / Wedding / Beauty...).
- **Vấn đề**: Tuyệt đối CẤM lấy nhầm mẫu typo hoặc nội dung văn bản của thể loại khác (ví dụ: lấy mẫu typo cưới/wedding gán nhầm cho ảnh baby/gia đình, hoặc để sót tên riêng/thông tin của dự án cũ).
- **Cách khắc phục**:
  1. Phân tích chính xác 100% đối tượng trong ảnh (Baby, Gia đình, Cưới, Chân dung...).
  2. Nội dung chữ (Text), thông điệp và Phong cách thiết kế (Font/Style) phải phù hợp tuyệt đối với cảm xúc, màu sắc và đối tượng trong ảnh.
  3. Khi tạo mẫu mới, loại bỏ hoàn toàn các placeholder/tên riêng không thuộc về khách hàng hiện tại.

### [Gotcha 2026-08-03] Nghệ Thuật Phân Phối Typo Điểm Xuyết (ChatGPT Doodle Sparkle Layout)
- **Bối cảnh**: Thiết kế Typo cho ảnh baby/gia đình/studio nghệ thuật.
- **Bài học**: Tránh gom toàn bộ chữ thành 1 khối hình chữ nhật gạch ngang ở giữa. Hãy áp dụng bố cục rải điểm xuyết (Scatter Accents):
  1. **Tiêu đề chính (Header)**: Phối hợp chữ Script mỏng uốn bay bổng (`Love`) với font Serif sang trọng (`in Every Step`), màu Nâu Đất / Taupe Warm Brown.
  2. **Biểu tượng trang trí (Accents)**: Điểm xuyết các ngôi sao 4 cánh lấp lánh (✦) và trái tim nhỏ vẽ tay (♡) nét mỏng quanh chữ.
  3. **Note phụ rải góc (Sub-notes)**: Đặt câu thơ tiếng Việt nhỏ dịu dàng giữa khoảng trống nhân vật (`Từng bước con đi, là cả thế giới của mẹ`) và nhãn note góc sườn (`Moments to cherish forever`).

### 2026-08-04 - Lỗi jQuery selector và Cấu hình ẩn hiện trường động (Module Thu Chi)
- **Vấn đề**: Sử dụng sai selector (ví dụ `#crud-form` thay vì `#crud-modal-form`) khiến logic `show_if` không thể lấy thẻ cha `.closest('.flex-col')` để thêm class `hidden`, làm cho các trường (như Mã đơn hàng) không tự ẩn đi khi trống.
- **Cách khắc phục**: Phải kiểm tra chính xác ID của form được render (VD trong Mod_CRUD_Helper.html) và đảm bảo script DOM access phải trùng khớp 100%.

### 2026-08-04 - Sắp xếp Layout động theo cấu trúc Array
- **Vấn đề**: Thứ tự hiển thị form không như ý muốn do `Config.js` mảng không đồng bộ với mong muốn của view.
- **Cách khắc phục**: Đảm bảo khai báo đúng thứ tự mảng array (ví dụ: `thu_chi: ["ngay_lap", "chi_nhanh", ...]`) và các hàm render `generateFormFields` phải duyệt theo thứ tự mảng `requiredColumns` thay vì duyệt mảng object gốc không thứ tự.
