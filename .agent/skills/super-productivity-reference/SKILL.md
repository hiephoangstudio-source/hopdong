---
name: super-productivity-reference
description: Kiến thức tham khảo và ý tưởng từ Super Productivity - App quản lý thời gian và công việc offline-first dành cho Developer.
---

# Super Productivity Reference

Skill này lưu trữ thông tin và ý tưởng từ dự án **Super Productivity** để tham khảo, nghiên cứu hoặc áp dụng vào các dự án tương lai.

## 🔗 Liên kết quan trọng
- **Github Repo gốc**: [johannesjo/super-productivity](https://github.com/johannesjo/super-productivity)
- **Trang chủ**: [super-productivity.com](https://super-productivity.com/)
- **Bản Live Demo (Web App)**: [app.super-productivity.com](https://app.super-productivity.com/)

## 🚀 Tính năng nổi bật & Ý tưởng có thể học hỏi (Patterns)
1. **Kiến trúc Local-first (100% Offline)**
   - Không yêu cầu backend/database truyền thống.
   - Lưu trữ toàn bộ trên trình duyệt (LocalStorage / IndexedDB).
   - Tính năng đồng bộ (Sync) thông qua các dịch vụ lưu trữ cá nhân như Google Drive, Dropbox, WebDAV bằng file JSON.
   - **Bài học:** Pattern thiết kế ứng dụng bảo mật cao, không thu thập dữ liệu (no telemetry) và tiết kiệm chi phí server.

2. **Tích hợp sâu với các công cụ của Developer (Integrations)**
   - Kết nối trực tiếp với GitHub, GitLab, Jira, Gitea thông qua Personal Access Token.
   - Tự động lấy (fetch) Issues về làm Task nội bộ. Khi hoàn thành task, tự động gửi nhật ký thời gian (time log) ngược lên các nền tảng đó.
   - **Bài học:** Cách thiết kế luồng API tương tác tự động với bên thứ 3 để giảm bớt thao tác thủ công.

3. **Giao diện ép sự tập trung (Focus & Timeboxing)**
   - Ép buộc người dùng đưa ra ước lượng thời gian (Estimate Time) cho từng task.
   - Tích hợp sẵn đồng hồ Pomodoro và nhắc nhở nghỉ ngơi định kỳ.
   - Trợ lý cảnh báo trì hoãn (Procrastination helper).
   - **Bài học:** Tư duy UI/UX đánh vào tâm lý người dùng để tăng năng suất làm việc.

4. **Trải nghiệm Keyboard-first**
   - Hỗ trợ phím tắt (Keyboard shortcuts) cho mọi tính năng cốt lõi.
   - **Bài học:** UX tối ưu hóa cho đối tượng người dùng chuyên nghiệp (Developer/Power Users).

## 💡 Hướng dẫn sử dụng Skill này
Agent (AI) có thể đọc Skill này khi User yêu cầu:
- Xây dựng một tính năng To-do list hoặc Time tracker có hẹn giờ (Pomodoro).
- Tìm hiểu về cách thiết kế cấu trúc lưu trữ Local-first (Offline) cho Web App.
- Cần ý tưởng để viết công cụ lấy dữ liệu (sync) hai chiều với Github Issues / Jira.
