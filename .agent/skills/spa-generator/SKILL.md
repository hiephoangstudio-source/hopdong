---
name: spa-generator
description: Tự động khởi tạo hệ thống SPA App chuẩn từ thư mục gốc SPA-build-auto mà không cần user gõ lệnh dài. Kích hoạt khi user chat yêu cầu tạo app/phần mềm mới.
---

# Kỹ năng Khởi tạo SPA Bằng Lời Nói (SPA Generator Skill)

Kỹ năng này phục vụ cho việc User chỉ cần Chat bằng lời: _"Tạo cho anh app ABC"_, hệ thống Agent sẽ tự động làm mọi thao tác cấp thấp (tạo folder, symlink, clone code) thay cho người dùng. Kỹ năng này đóng vai trò thay thế cho việc gõ dòng lệnh khô khan.

## KHI NÀO SỬ DỤNG (TRIGGERS)

Lập tức kích hoạt khi User ra lệnh yêu cầu tạo một hệ thống/project/webapp/phần mềm/SPA mới. Ví dụ:

- "Tạo cho anh app nha khoa"
- "Build 1 hệ thống quản lý kho"
- "Tạo project mới dùng bộ khung SPA"

## QUY TRÌNH TỰ ĐỘNG THỰC THI CHUẨN KỸ SƯ CỦA AGENT

Khi nhận lệnh, Agent **BẮT BUỘC** phải tự động chạy chuỗi công việc sau bằng `run_command` (PowerShell) mà không cần hỏi lại user cách chạy:

### Bước 1: Hỏi tên App (nếu User chưa cung cấp rõ)

Nếu user chỉ nói "Tạo app", hỏi họ tên bằng tiếng Anh hoặc format `kebab-case` (vd: `quan-ly-nha-khoa`).

### Bước 2: Tạo Repo và Symlink `.agent`

Thay vì tự tay copy, Agent chạy Tool khởi tạo gốc của hệ thống (đã có sẵn cơ chế symlink `.agent`):

```powershell
Start-Process powershell -Verb RunAs -ArgumentList '-ExecutionPolicy Bypass -File "c:\AntiCode\master-agent\scripts\new-project.ps1" -Name "<kebab-case-name>"' -Wait
```

### Bước 3: Đổ Tế Bào Gốc (Boilerplate) Vào Dự Án Mới

Copy toàn bộ mã nguồn siêu sạch và cấu trúc mạnh mẽ từ `SPA-build-auto` sang dự án vừa tạo:

```powershell
Copy-Item -Path "c:\AntiCode\gsheets-master-framework\SPA-build-auto\*" -Destination "c:\AntiCode\<kebab-case-name>" -Recurse -Force
```

> **🔴 LƯU Ý QUAN TRỌNG KHI TÁCH MODULE MỚI THEO KIẾN TRÚC NÀY:**
> Khi cắt nhỏ giao diện thành các file JS con (ví dụ `js_module_name.html`), file `js.html` gốc không quản lý được hàm render của file con. **BẮT BUỘC** phải cài Event Listener lắng nghe click vào Tab Menu ngay trong file con để tự động gọi hàm render của nó:
>
> ```javascript
> // Luôn chèn đoạn này vào cuối file JS con
> document.getElementById("module-nav-btn")?.addEventListener("click", () => {
>   setTimeout(() => {
>     if (window.renderModuleInfo) window.renderModuleInfo();
>   }, 50);
> });
> ```

### Bước 4: Tự Động Push lên GitHub & Clasp

Nếu sếp yêu cầu Deploy luôn, Agent cd vào thư mục dự án mới và chạy:

```powershell
cd "c:\AntiCode\<kebab-case-name>"
gh repo create hiephoangstudio-source/<kebab-case-name> --private --source=. --push
```

Xong xuôi thì báo với User: _"Sếp ơi, tế bào gốc đã được nhân bản sang `<kebab-case-name>` cùng toàn bộ bộ não `.agent` symlink. Mọi thứ đã sẵn sàng để code nghiệp vụ!"_

---

## QUY TẮc XƯƠNG MÁU KHI PHÁT TRIỂN TRÊN BỘ KHUNG

> 🔴 **Mọi bài học, mọi lỗi, mọi cơ chế mới phải được BACK-PORT ngược về đây** (`SPA-build-auto/`), không chỉ fix riêng cho app đang code.

### 1. Data Bridge Script (đã tích hợp sẵn trong `index.html`)

- File `js.html` obfuscated chỉ lưu `allProjects/allTasks/allStaff`. Khi tạo module mới (vd `js_khach_hang.html`), data từ Backend sẽ không tự truyền sang.
- **Data Bridge** nằm cuối `index.html` sẽ tự động gọi `getDataForUser()` sau khi login thành công, lưu TẤT CẢ data vào `window.appData` cho module con dùng.
- Module con chỉ cần đọc `window.appData.ten_bang` là có data.

### 2. CẤM TUYỆT ĐỐI dùng IIFE trong GAS HTML

- `google.script.run` chưa available khi IIFE chạy → Silent Crash.
- Luôn dùng global function + polling kiểm tra `google.script.run` trước khi gọi.

### 3. Hook Event khi tách Module

- Mỗi file `js_module.html` phải tự cài `addEventListener` vào nút Menu của nó để trigger hàm render.
- File mẹ `js.html` không biết file con tồn tại → nếu không Hook thì data sẽ không bao giờ được hiển thị.

### 4. KHÔNG tạo file tạm trong thư mục dự án GAS

- `clasp push` gom TẤT CẢ `.js` → đổi thành `.gs` → push lên Cloud.
- File Node.js tạm (`tmp_fix.js`, `build.js`) chứa `require` → GAS crash với `ReferenceError: require is not defined` → **toàn bộ app offline**.
- **Hard Rule:** Mọi script tạm phải đặt ngoài thư mục dự án (`/tmp/` hoặc thư mục khác). Hoặc cấu hình `.claspignore`.

### 5. KHÔNG tự ý xóa UI chung khi chưa được yêu cầu

- Header (Quick Add, Chat), Sidebar, Footer là **tài sản chung** dùng cho mọi module.
- Khi module mới dùng logic riêng → **hook lại** vào UI chung (gọi `openModuleModal()` từ Quick Add dropdown), KHÔNG xóa UI chung.
- Khi nghi ngờ UI nào thuộc khung cũ → **HỎI User trước**, không quyết định thay.

### 6. Xóa SẠCH section cũ trước khi chèn module mới

- Khi thay thế module cũ (ví dụ `staff-section` obfuscated) bằng module mới (`nhan-vien-grid`), PHẢI:
  1. Tìm TOÀN BỘ HTML cũ từ `<!-- Section -->` đến `</div>` đóng
  2. Xóa sạch 100% — view file verify 0 dòng rác
  3. Chèn HTML mới vào đúng vị trí
- Nếu không → UI bị trùng lặp: 2 tiêu đề, 2 nút thêm, 2 bảng.

### 7. Module tự chứa (Self-Contained Pattern) & Naming Collision

- Mỗi module **BẮT BUỘC** quản lý toàn bộ logic của mình trong 1 file duy nhất (`js_module_name.html`).
- **🚨 NGUY HIỂM CHẾT NGƯỜI (Naming Collision trong GAS):** Google Apps Script load toàn bộ script vào chung 1 Global Scope. Nếu đặt tên hàm trùng với file `js.html` obfuscated (ví dụ `function renderDonHang()`), hàm của module MỚI sẽ bị file MŨ (load cuối cùng) GHI ĐÈ 100%. Bảng sẽ kẹt ở chữ "Đang tải...".
- **GIẢI PHÁP:** Luôn thêm hậu tố `Module` vào mọi hàm.
  - `renderDonHangModule()` (thay vì `renderDonHang()`)
  - `openDonHangModalForm()` (thay vì `openDonHangModal() nếu nghi ngờ trùng`)

### 8. Dummy Section: Cách Ly DOM Khỏi Code Obfuscated

- Code obfuscated luôn lùng sục HTML ID truyền thống (vd: `<div id="tasks-section">` hoặc `projects-section`) để tuỳ ý reset `innerHTML`.
- Nếu chèn code module mới thẳng vào các Div này, dữ liệu vừa render xong sẽ bị script cũ chọc thủng!
- **GIẢI PHÁP:** Để trống `<div id="tasks-section" class="section"></div>` làm **chim mồi** cho script cũ vờn. Phía dưới, tự mở một `<div id="cong-viec-section" class="section">` ĐỘC LẬP dành riêng cho Module mới, không để code cũ chạm vào.

### 9. Multi-Timeout Polling Khi Lắng Nghe Routing Cũ

- Vì module mới hook lén vào cơ chế route của file JS obfuscated, không thể biết chính xác lúc nào routing xong và class `active` được set.
- Nếu chỉ set timeout 1 lần, UX sẽ chập chờn do race condition (code cũ tắt/bật display sau khi hàm render vừa chạy).
- **GIẢI PHÁP:** Dùng bom rải thảm Timeout trong Sidebar Hook:
  ```javascript
  document
    .getElementById("module-nav-btn")
    .addEventListener("click", function () {
      setTimeout(function () {
        if (window.renderX) window.renderX();
      }, 200);
      setTimeout(function () {
        if (window.renderX) window.renderX();
      }, 500);
      setTimeout(function () {
        if (window.renderX) window.renderX();
      }, 1000);
      setTimeout(function () {
        if (window.renderX) window.renderX();
      }, 2000);
    });
  ```

---

## 📋 CHECKLIST THÊM MODULE MỚI VÀO SPA

> 🔴 **BẮT BUỘC** tuân thủ 100% khi tạo bất kỳ module nào. Làm tuần tự, pass bước trước mới sang bước sau.

### Bước 1: Chuẩn Bị

- [ ] Xem screenshot header Sheet → xác định chính xác tên cột
- [ ] Xác nhận `SHEET_NAME` và `ID_COLUMN_NAME` trong `Config.js`
- [ ] Hỏi User: Cột nào hiển thị trên bảng? Form có trường nào?

### Bước 2: Backend (`App_Modules.js`)

- [ ] Thêm 3 hàm: `addModuleName(data)`, `updateModuleName(id, data)`, `deleteModuleName(id)`
- [ ] Dùng đúng constants từ `Config.js`
- [ ] Kiểm tra permission: `checkUserPermission("create"/"update"/"delete", "module")`

### Bước 3: Xóa Section Cũ (`index.html`)

- [ ] ⚠️ Tìm TOÀN BỘ section HTML cũ liên quan → XÓA SẠCH 100%
- [ ] View file verify: 0 dòng rác còn sót
- [ ] Kiểm tra Quick Add header → KHÔNG XÓA, chỉ hook thêm

### Bước 4: Section Mới (`index.html`)

- [ ] Thêm `<div id="module-section" class="section">`
- [ ] Chỉ chứa: search input + nút Thêm + bảng `<tbody id="module-grid">`
- [ ] KHÔNG đặt `<h3>` tiêu đề trùng (dùng `page-title` ở Header)

### Bước 5: Module JS (`js_module_name.html`)

- [ ] Tạo file self-contained: render + modal + CRUD + delete
- [ ] Modal HTML inject bằng JS (không phụ thuộc `js.html`)
- [ ] Hook sidebar nav: `addEventListener("click", ...)` + update `page-title`
- [ ] Thêm `<?!= include('js_module_name'); ?>` vào cuối `index.html`

### Bước 6: Quick Add (`index.html` Header)

- [ ] Thêm `<a>` mới vào dropdown gọi `openModuleModal()`
- [ ] Icon + label phù hợp

### Bước 7: Push & Verify

- [ ] `clasp push -f` — KHÔNG có file rác `.js` trong output
- [ ] Mở browser → Click menu → Bảng load data ✓
- [ ] Click "Thêm" → Modal đúng trường ✓
- [ ] Click "Sửa" → Data pre-fill ✓
- [ ] Click "Xóa" → Confirm + xóa thành công ✓
- [ ] Quick Add header → Modal mở đúng ✓
- [ ] Screenshot → PROOF BLOCK
