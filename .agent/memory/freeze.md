# 🔒 File Freeze — Protected Files

> Source concept: [gstack /freeze](https://github.com/garrytan/gstack)
> Rule: AI **CẤM** sửa file trong danh sách này trừ khi User TRỰC TIẾP yêu cầu.

## Protected Files

| File                      | Lý do bảo vệ                                |
| ------------------------- | ------------------------------------------- |
| `GEMINI.md`               | Cấu hình Master Agent gốc                   |
| `.env`                    | Secrets, credentials                        |
| `google-credentials.json` | Service Account key                         |
| `new_crontab.txt`         | Crontab VPS — chỉ sửa qua script clean CRLF |
| `ARCHITECTURE.md`         | Blueprint hệ thống                          |
| `memory/goals.md`         | OKR chiến lược                              |
| `PrintEngine_HopDong.html`| [🔒 FROZEN] In Hợp Đồng (Đã duyệt OK 100%)  |
| `PrintEngine_ChungTu.html`| [🔒 FROZEN] In Chứng Từ Form 1, 2, 3 (Đã duyệt OK 100%) |
| `PrintEngine_UI.html`     | [🔒 FROZEN] CSS Master In Ấn (Đã duyệt OK 100%) |
| `PrintEngine_Engine.html` | [🔒 FROZEN] Bộ điều khiển In Native (Đã duyệt OK 100%) |
| `Mod_ThuChi_Logic.html`   | [🔒 FROZEN] In Phiếu Thu Chi 2 liên (Đã duyệt OK 100%) |
| `Mod_KhachHang_Logic.html`| [🔒 FROZEN] Module Khách Hàng (Đã duyệt OK 100%) |
| `Mod_KhachHang_View.html` | [🔒 FROZEN] Module Khách Hàng (Đã duyệt OK 100%) |
| `Mod_KhachHang_Server.js` | [🔒 FROZEN] Module Khách Hàng (Đã duyệt OK 100%) |
| `Mod_DonHangCT_Logic.html`| [🔒 FROZEN] Module Chi Tiết Đơn Hàng (Đã duyệt OK 100%) |
| `Mod_DonHangCT_View.html` | [🔒 FROZEN] Module Chi Tiết Đơn Hàng (Đã duyệt OK 100%) |
| `Mod_DonHangCT_Server.js` | [🔒 FROZEN] Module Chi Tiết Đơn Hàng (Đã duyệt OK 100%) |

## Cách sử dụng

- **Freeze**: Thêm file vào bảng trên
- **Unfreeze**: Xóa file khỏi bảng

## Pre-Write Hook

Trước khi sửa BẤT KỲ file nào, agent PHẢI:

1. Check file có trong freeze list không
2. Nếu CÓ → DỪNG, hỏi User xác nhận trước
3. Nếu KHÔNG → tiếp tục bình thường
