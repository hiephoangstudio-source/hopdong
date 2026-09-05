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

## Cách sử dụng

- **Freeze**: Thêm file vào bảng trên
- **Unfreeze**: Xóa file khỏi bảng

## Pre-Write Hook

Trước khi sửa BẤT KỲ file nào, agent PHẢI:

1. Check file có trong freeze list không
2. Nếu CÓ → DỪNG, hỏi User xác nhận trước
3. Nếu KHÔNG → tiếp tục bình thường
