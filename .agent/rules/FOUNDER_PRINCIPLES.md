# Triết Lý Sản Phẩm Của Sáng Lập (Founder's Design & Product Principles)

Tài liệu này ghi nhớ quan điểm tối cao của anh Hiệp (Founder) về việc định hướng thiết kế giao diện và chất lượng sản phẩm cho toàn bộ hệ thống **Editor Studio**. 

TẤT CẢ các Agent hoạt động trong dự án này **PHẢI** đọc, khắc ghi và tuyệt đối tuân thủ các nguyên tắc dưới đây trong mọi tác vụ lập trình & thiết kế UI/UX.

---

## 1. Trải Nghiệm Người Dùng (UX) Phải Đạt Mức Trực Quan Tối Đa
* **Triết lý:** *"Ưu tiên của anh là mọi thứ phải trực quan, ưu tiên về trải nghiệm người dùng hơn là đưa ra hàng tá lựa chọn, hàng tá chức năng nhưng cuối cùng chỉ có một vài là cần dùng đến."*
* **Kỷ luật thiết kế:**
  - **Giảm thiểu cấu hình thừa:** Loại bỏ các bảng cài đặt phức tạp, các dropdown dài dằng dặc. Ưu tiên cơ chế **Zero-Configuration** (tự động nhận diện thông minh dưới nền).
  - **Quy trình 1-Click (1-Click Flow):** Mọi hành động của người dùng nên được giải quyết trong 1 lần click chuột. Ví dụ: Nút "Dịch AI" tự động nhận diện ngôn ngữ Trung Quốc, tự dịch sang Tiếng Việt và tự chèn thay thế văn bản gốc mà không cần bất kỳ bước trung gian nào.
  - **Sắp xếp hợp lý:** Các nút hành động chính phải được làm nổi bật và đặt ở vị trí thuận tiện nhất cho người dùng thao tác.

---

## 2. Ưu Tiên Chất Lượng Đầu Ra & Giá Trị Thực Tế
* **Triết lý:** *"Trải nghiệm tốt + chất lượng tốt thì mọi thứ rất dễ dàng."*
* **Kỷ luật kỹ thuật:**
  - **Chống Over-Engineering:** Không viết thêm code thừa, không thiết kế những chức năng rườm rà không ai dùng. Tập trung làm thật tốt, thật mượt mà những tính năng cốt lõi (Core Features).
  - **Chất lượng nội dung đầu ra sạch:** Các module cào (Crawler) hay dựng video (Editor/Affiliate) phải đảm bảo đầu ra sạch sẽ (loại bỏ 100% logo/watermark, chất lượng HD sắc nét, lách bản quyền sâu, không có lỗi vặt).
  - **Đơn giản hóa để tăng năng suất:** Thay vì bắt người dùng làm thủ công 30-40 phút, công cụ phải hỗ trợ tự động hóa các khâu nặng để rút ngắn quy trình xuống còn vài phút.

---

## 3. Kỷ Luật Tối Thượng: Tuyệt Đối Không Làm Gì Khi Không Có Căn Cứ, Tài Liệu Rõ Ràng
* **Triết lý:** *"Tuyệt đối không được làm gì khi không có căn cứ, tài liệu rõ ràng lưu ngay vào não đi cho anh."*
* **Kỷ luật bất di bất dịch:**
  - **Nghiêm cấm phán bừa, suy đoán mò:** Tuyệt đối cấm đoán mò mã trạng thái, tên cột, cấu trúc bảng, quy tắc nghiệp vụ hay luồng xử lý mà không có bằng chứng từ mã nguồn, cơ sở dữ liệu thật hoặc tài liệu chính thức.
  - **Bắt buộc đối soát từ gốc (Evidence-First):** Trước khi kết luận hoặc triển khai, bắt buộc phải tra cứu trực tiếp từ bảng thật (ví dụ: `quy_trinh`, `cai_dat`, schema, ảnh chụp màn hình cấu hình thật...). Nếu không tìm thấy hoặc chưa rõ $\rightarrow$ PHẢI báo cáo và hỏi rõ, tuyệt đối không được tự ý "chữa cháy" bằng dữ liệu giả định.
  - **Mọi kết luận đều phải có dẫn chứng:** Trích dẫn rõ file, dòng code, sheet hoặc ảnh chụp chứng minh cho logic được đề xuất.

---
*Ghi nhớ:* "Hoàn thành > Hoàn hảo. Code ít > Code nhiều. Tiện ích thực tế > Số lượng chức năng. Căn cứ xác thực > Phán đoán mò."
