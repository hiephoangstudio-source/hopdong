# CONTEXT — StudioERP Architecture System Map & Ubiquitous Glossary

> **System Blueprint & Domain Glossary for Han's Studio ERP Portal**  
> *Spreadsheet ID:* `1nbgRzFnJlOFFxOPSlp1Z6Sd6UopbNafOcKbM8A8c-Eo`  
> *Project Root:* `c:\AntiCode\StudioERP-Webapp\Build-dashboard\Dash_Master_Portal`  

---

## 1. System Overview

Han's Studio ERP is a specialized Enterprise Resource Planning system built on Google Apps Script (GAS) and HTML/JS single-page architecture. It unifies operations across wedding photography, makeup, costume/attire rental, payroll, scheduling, accounts payable, and marketing analytics.

The system database consists of **35 table schemas** defined in `SchemaConfig.js` (`TABLE_SCHEMAS`), backing **14 active modules** declared in `Config.js` (`ENABLED_MODULES`), alongside **8 unmapped/standalone system sheets** providing lookup, configuration, workflow, and access control services.

---

## 2. Active Modules & Google Sheets Mapping

Below is the complete mapping of all **14 active modules** enabled in `Config.js` to their underlying Google Sheets, primary keys, and code components.

| Module Key | Module ID | Human-Readable Name | View File | Logic File | Google Sheet Name(s) | Primary Key(s) | Status / Bảo Vệ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `THU_CHI` | `ThuChi` | Quản lý Thu Chi | `Mod_ThuChi_View` | `Mod_ThuChi_Logic` | `thu_chi` | `id_thu_chi` | `[🔒 FROZEN / LOCKED]` |
| `DINH_KHOAN` | `DinhKhoan` | Định Khoản Kế Toán | `Mod_DinhKhoan_View` | `Mod_DinhKhoan_Logic` | `dinh_khoan` | `id_dinh_khoan` | `[🔒 FROZEN / LOCKED]` |
| `TONG_HOP` | `TongHopChiNhanh` | Chi Nhánh (Tổng Hợp) | `Mod_TongHopChiNhanh_View` | `Mod_TongHopChiNhanh_Logic` | `chi_nhanh` | `id_chi_nhanh` | `[🔒 FROZEN / LOCKED]` |
| `NHAN_VIEN` | `NhanVien` | Hồ Sơ Nhân Viên | `Mod_NhanVien_View` | `Mod_NhanVien_Logic` | `nhan_vien` | `id_nhan_vien` | `[🔒 FROZEN / LOCKED]` |
| `PHAN_BO_NV` | `PhanBoNV` | Phân Bổ Nhân Sự | `Mod_PhanBoNV_View` | `Mod_PhanBoNV_Logic` | `phan_bo_nv` | `id_phan_bo` | `[🔒 FROZEN / LOCKED]` |
| `DICH_VU` | `DichVu` | Dịch Vụ / Bảng Giá | `Mod_DichVu_View` | `Mod_DichVu_Logic` | `dich_vu` | `id_dich_vu` | `[🔒 FROZEN / LOCKED]` |
| `THIET_BI` | `ThietBi` | Thiết Bị | `Mod_ThietBi_View` | `Mod_ThietBi_Logic` | `thiet_bi` | `id_thiet_bi` | `[ACTIVE / SẼ DUYỆT]` |
| `NCC` | `NCC` | Nhà Cung Cấp | `Mod_NCC_View` | `Mod_NCC_Logic` | `nha_cung_cap`<br>`nhap_kho` | `id_ncc`<br>`id_nhap_kho` | `[ACTIVE / SẼ DUYỆT]` |
| `TRANG_PHUC` | `TrangPhuc` | Quản lý Trang Phục | `Mod_TrangPhuc_View` | `Mod_TrangPhuc_Logic` | `trang_phuc` | `id_trang_phuc` | `[ACTIVE / SẼ DUYỆT]` |
| `LUONG` | `Luong` | Quản lý Lương | `Mod_Luong_View` | `Mod_Luong_Logic` | `luong_thang`<br>`co_che_luong`<br>`bang_cham_cong`<br>`luong_ca_dich_vu` | `id_luong`<br>`id_co_che`<br>`id_cham_cong`<br>`id_cong_viec` | `[ACTIVE / SẼ DUYỆT]` |
| `LICH_CONG_VIEC` | `LichCongViec` | Lịch Công Việc | `Mod_LichCongViec_View` | `Mod_LichCongViec_Logic` | `lich_cong_viec`<br>`phan_cong_ekip`<br>`cv_phat_sinh` | `id_cong_viec`<br>`id_cong_viec`<br>`id_cv_phat_sinh` | `[ACTIVE / SẼ DUYỆT]` |
| `DON_HANG` | `DonHang` | Quản lý Đơn hàng | `Mod_DonHang_View` | `Mod_DonHang_Logic` | `don_hang`<br>`don_hang_ct`<br>`khach_hang` | `id_don_hang`<br>`id_don_hang_ct`<br>`id_khach_hang` | `[ACTIVE / SẼ DUYỆT]` |
| `HDCN` | `HDCN` | Hóa Đơn Công Nợ | `Mod_HDCN_View` | `Mod_HDCN_Logic` | `cong_no_ncc` | `id_cong_no_ncc` | `[ACTIVE / SẼ DUYỆT]` |
| `MARKETING` | `Marketing` | Báo Cáo Marketing | `Mod_Marketing_View` | `Mod_Marketing_Logic` | `marketing`<br>`chien_dich_mkt`<br>`truyenthong_mkt`<br>`bao_cao_ngay`<br>`bao_cao_sale` | `id_marketing`<br>`id_chien_dich`<br>`id_media`<br>`id_bao_cao_ngay`<br>`id_bao_cao_sale` | `[ACTIVE / SẼ DUYỆT]` |
| `MUC_TIEU` | `MucTieuThang` | Mục Tiêu Tháng | `Mod_MucTieuThang_View` | `Mod_MucTieuThang_Logic` | `muc_tieu_thang` | `id_muc_tieu` | `[ACTIVE / SẼ DUYỆT]` |
| `GIAT_VAY` | `GiatVay` | Quản lý Giặt Váy | `Mod_GiatVay_View` | `Mod_GiatVay_Logic` | `giat_vay` | `id_giat_vay` | `[ACTIVE / SẼ DUYỆT]` |

---

## 3. Unmapped System Sheets (8 Standalone Tables)

The system includes **8 standalone/unmapped tables** defined in `SchemaConfig.js` (`TABLE_SCHEMAS`). These tables do not have dedicated module entries in `ENABLED_MODULES` in `Config.js`, but serve as fundamental system infrastructure, reference tables, workflow engines, and administrative lookup databases.

| # | System Sheet Identifier | Schema Table Name | Primary Key | Description & System Function |
| :---: | :--- | :--- | :--- | :--- |
| 1 | `tai_khoan_ngan_hang` | `tai_khoan` | `id_tai_khoan` | Danh mục tài khoản ngân hàng, ngân hàng phát hành, số tài khoản, chủ tài khoản phục vụ hạch toán thu chi và chuyển khoản. |
| 2 | `gia_xuong_in` | `gia_xuong_in` | `id_gia_xuong_in` | Bảng giá niêm yết từ các xưởng in ấn đối tác (in album, ảnh cổng, khung kính), dùng để tính giá vốn (COGS) vật tư đơn hàng. |
| 3 | `cai_dat_he_thong` | `cai_dat` | `id_cai_dat` | Cấu hình tham số hệ thống, biến toàn cục, tỷ lệ chiết khấu mặc định và danh mục giá trị Enum dùng chung. |
| 4 | `quy_trinh` | `quy_trinh` | `id_quy_trinh` | Máy trạng thái (Workflow State Engine) định nghĩa các bước chuyển trạng thái của đơn hàng, đề xuất, tài liệu và phân quyền. |
| 5 | `noi_quy_quy_dinh` | `noi_quy` | `id_noi_quy` | Bảng quy định nội quy làm việc của studio, các mức phạt/thưởng áp dụng vào bảng lương hàng tháng của nhân viên. |
| 6 | `tai_lieu_mau` | `tai_lieu` | `id_tai_lieu` | Kho lưu trữ biểu mẫu hợp đồng, mẫu biên bản bàn giao, quy chuẩn kịch bản chụp/makeup dùng nội bộ studio. |
| 7 | `de_xuat` | `don_de_xuat` | `id_de_xuat` | Đơn từ đề xuất nội bộ (xin ứng lương, xin nghỉ phép, đề xuất mua sắm trang thiết bị, duyệt hủy đơn hàng). |
| 8 | `phan_quyen` | `menu` | `id_menu` | Cấu hình danh mục menu, quyền hạn truy cập tab/chức năng cho từng chức danh nhân sự (xử lý qua logic `Mod_PhanQuyen`). |

---

## 4. Domain Language & Ubiquitous Glossary

To maintain strict domain clarity and prevent nomenclature ambiguity across frontend views, backend Apps Script controllers, and data schemas, all team members and agents must adhere to the following Ubiquitous Glossary:

```
+---------------------------------------------------------------------------------------------------+
|                                     STUDIO ERP GLOSSARY                                           |
+-------------------+----------------------+-------------------+------------------------------------+
| KHACH_HANG        | Khách Hàng           | khach_hang        | id_khach_hang: Quản lý thông tin   |
|                   |                      |                   | liên hệ khách, cô dâu & chú rể.    |
+-------------------+----------------------+-------------------+------------------------------------+
| NHAN_VIEN         | Nhân Viên            | nhan_vien         | id_nhan_vien: Quản lý nhân sự,     |
|                   |                      | phan_bo_nv        | hợp đồng, tình trạng làm việc.     |
+-------------------+----------------------+-------------------+------------------------------------+
| THIET_BI          | Thiết Bị             | thiet_bi          | id_thiet_bi: Quản lý máy ảnh,      |
|                   |                      |                   | lens, đèn chiếu, khấu hao.         |
+-------------------+----------------------+-------------------+------------------------------------+
| NCC               | Nhà Cung Cấp         | nha_cung_cap      | id_ncc, id_nhap_kho: Quản lý đối   |
|                   |                      | nhap_kho          | tác xưởng in, nguyên vật tư.       |
+-------------------+----------------------+-------------------+------------------------------------+
| THU_CHI           | Quản lý Thu Chi      | thu_chi           | id_thu_chi: Nhật ký phiếu thu      |
|                   |                      |                   | phiếu chi dòng tiền studio.        |
+-------------------+----------------------+-------------------+------------------------------------+
| TRANG_PHUC        | Quản lý Trang Phục   | trang_phuc        | id_trang_phuc: Quản lý kho váy     |
|                   |                      |                   | cưới, vest, số lần cho thuê.       |
+-------------------+----------------------+-------------------+------------------------------------+
| LUONG             | Quản lý Lương        | luong_thang       | id_luong, id_co_che, id_cham_cong: |
|                   |                      | co_che_luong      | Chấm công, hoa hồng ekip,          |
|                   |                      | bang_cham_cong    | lương cứng & thưởng phạt.          |
|                   |                      | luong_ca_dich_vu  |                                    |
+-------------------+----------------------+-------------------+------------------------------------+
| LICH_CONG_VIEC    | Lịch Công Việc       | lich_cong_viec    | id_cong_viec, id_cv_phat_sinh:     |
|                   |                      | phan_cong_ekip    | Lịch chụp, makeup, trả ảnh,        |
|                   |                      | cv_phat_sinh      | phân công ekip thực hiện.          |
+-------------------+----------------------+-------------------+------------------------------------+
| DON_HANG          | Quản lý Đơn hàng     | don_hang          | id_don_hang, id_khach_hang:        |
|                   |                      | don_hang_ct       | Hợp đồng dịch vụ cưới/chụp ảnh,    |
|                   |                      | khach_hang        | tiến độ & chi tiết dịch vụ.        |
|                   |                      | dich_vu           |                                    |
+-------------------+----------------------+-------------------+------------------------------------+
| HDCN              | Hóa Đơn Công Nợ      | cong_no_ncc       | id_cong_no_ncc: Quản lý hóa đơn    |
|                   |                      |                   | nợ xưởng in & NCC vật tư.          |
+-------------------+----------------------+-------------------+------------------------------------+
| MARKETING         | Báo Cáo Marketing    | marketing         | id_marketing, id_chien_dich:       |
|                   |                      | chien_dich_mkt    | Theo dõi Ads spend, leads,         |
|                   |                      | truyenthong_mkt   | báo cáo doanh số sale on/off.      |
|                   |                      | bao_cao_ngay      |                                    |
|                   |                      | bao_cao_sale      |                                    |
+-------------------+----------------------+-------------------+------------------------------------+
| TONG_HOP          | Báo Cáo Tổng Hợp     | chi_nhanh         | id_chi_nhanh: Báo cáo tài chính &  |
|                   |                      |                   | hiệu suất tổng hợp chi nhánh.      |
+-------------------+----------------------+-------------------+------------------------------------+
| MUC_TIEU          | Mục Tiêu Tháng       | muc_tieu_thang    | id_muc_tieu: Target doanh số       |
|                   |                      |                   | tháng của từng chi nhánh/mảng.     |
+-------------------+----------------------+-------------------+------------------------------------+
| GIAT_VAY          | Quản lý Giặt Váy     | giat_vay          | id_giat_vay: Nhật ký gửi giặt/bảo  |
|                   |                      |                   | quản trang phục váy cưới.          |
+-------------------+----------------------+-------------------+------------------------------------+
| DINH_KHOAN        | Định Khoản Kế Toán   | dinh_khoan        | id_dinh_khoan: Hệ thống tài khoản  |
|                   |                      |                   | kế toán kép, hạch toán nợ/có.      |
+-------------------+----------------------+-------------------+------------------------------------+
```

### Domain Terminology Standard
1. **Ekip / Crew:** Nhóm nhân sự tham gia 1 ca dịch vụ (Nhiếp ảnh gia / Chụp chính, Trang điểm / Makeup, Photoshop / Hậu kỳ, Phụ xe / Phụ trang phục).
2. **Sale On / Sale Off:** Phân loại tư vấn viên chốt đơn qua Kênh Online (Fanpage, Zalo, Tiktok) hoặc Trực tiếp tại Studio (Offline).
3. **Giá vốn (COGS / Chi phí cost):** Chi phí trực tiếp cho đơn hàng gồm tiền in ấn xưởng (`gia_xuong_in`), giặt váy (`giat_vay`), và lương ca dịch vụ (`luong_ca_dich_vu`).
4. **Lương ca dịch vụ (Per-job Commission):** Thù lao trả theo ca cho ekip chụp/makeup/edit tính dựa trên đơn giá niêm yết trong bảng `dich_vu`.
5. **Nguồn khách (Lead Source):** Kênh tiếp cận khách hàng (Facebook Ads, TikTok Ads, Giới thiệu / Referral, Khách quen).

---

## 5. Verification & Compliance Checklist

- [x] All 14 active modules in `ENABLED_MODULES` correctly mapped to sheet names and schema primary keys.
- [x] All 8 unmapped system sheets cataloged with primary keys and system functionality.
- [x] Ubiquitous Glossary formatted cleanly with domain-specific terms.
- [x] Validated Markdown syntax structure.
