# 🗺️ Memory Index — Quick Routing (L1)

> Cập nhật: 28/04/2026 | File này giúp Agent route nhanh, KHÔNG cần scan tuần tự.

## 🔴 Active Project

- **Photoshop App Manager** — Sidebar UI hoàn thiện, dashboard data mapping OK
- **ERP Migration** — Đang chuyển `id_nhan_vien` → `id_phan_bo` (còn 6 bảng: `bao_cao_ngay`, `thu_chi`, `don_hang_ct`, `bao_cao_sale`, `bang_luong`, `don_hang`)

## ⚡ Top 5 Gotchas (hay vi phạm nhất)

1. **Zero Guessing** — CẤM đoán schema/cột. Phải đọc `FULL_SCHEMA.md` hoặc hỏi User
2. **Vỏ Cũ Ruột Mới** — KHÔNG đổi header cột GAS khi chỉ thay Ref AppSheet
3. **IIFE trong GAS** — CẤM dùng. Phải polling `google.script.run` ready
4. **File rác clasp push** — Node.js `.js` bị đổi `.gs` → crash. Dùng `/tmp/` hoặc `.claspignore`
5. **DOM Traversal rộng** — KHÔNG `parentElement` quá 1 cấp trong Alpine.js SPA

## 🔒 Frozen Files

`GEMINI.md` · `.env` · `google-credentials.json` · `new_crontab.txt` · `ARCHITECTURE.md` · `memory/goals.md`

## 🧠 Memory Map

| Cần gì?                | Đọc file nào               |
| ---------------------- | -------------------------- |
| Phiên hôm nay          | `today.md`                 |
| Tuần này               | `this-week.md`             |
| Bài học kỹ thuật       | `gotchas.md`               |
| Level/Lộ trình Founder | `goals.md`                 |
| Project đang pause     | `session-state.md`         |
| File cấm sửa           | `freeze.md`                |
| ERP Schema             | `2HStudio_ERP_Schema.json` |
| GitHub bookmarks       | `projects.md`              |
| Lịch sử tháng cũ       | `archive/YYYY-MM.md`       |

## 👤 User Quick Facts

- **Tên:** Hiệp (Han), Brand: **Han's** Studio (có 's)
- **Level:** Beginner coder (từ 01/2026), đang LEVEL 1→2
- **Ngôn ngữ:** Tiếng Việt (task/summary), English (code/vars)
- **Stack ưa thích:** Vanilla CSS, AppSheet, Google Apps Script, Vite
