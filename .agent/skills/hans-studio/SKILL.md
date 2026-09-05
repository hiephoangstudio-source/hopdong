---
name: hans-studio
description: |
  Master Skill cho Han's Studio - Studio Cưới & Makeup chuyên nghiệp.
  LUÔN kích hoạt khi: tạo website, landing page, thiết kế UI, marketing, 
  ảnh cưới, makeup, dịch vụ studio, quản lý đặt lịch, portfolio.
  Skill này cung cấp toàn bộ ngữ cảnh business, thương hiệu, và design system.
---

# Han's Studio - Master Business Skill

> **Mục đích:** Biến mọi yêu cầu liên quan đến Studio thành output chuyên nghiệp, 
> đúng thương hiệu, sẵn sàng production — chỉ bằng 1 câu lệnh.

---

## 🏢 Business Context

### Ngành nghề
- **Studio Cưới & Makeup** chuyên nghiệp
- Dịch vụ: Chụp ảnh cưới (indoor/outdoor), Makeup cô dâu, Cho thuê váy cưới, Album ảnh
- Khách hàng: Cặp đôi sắp cưới (25-35 tuổi), phân khúc trung-cao cấp
- Khu vực: Việt Nam

### Giá trị cốt lõi
1. **Sang trọng & Tinh tế** — Không cheap, không quá lòe loẹt
2. **Cảm xúc & Kỷ niệm** — Mỗi bức ảnh kể một câu chuyện
3. **Chuyên nghiệp & Tận tâm** — Quy trình rõ ràng, chất lượng nhất quán

---

## 🎨 Design System

### Bảng màu chính
```
Primary:     #C9A96E (Vàng champagne - sang trọng)
Secondary:   #2C2C2C (Đen than - chuyên nghiệp)
Accent:      #E8D5B7 (Kem nhạt - ấm áp)
Background:  #FAFAF8 (Trắng kem - tinh tế)
Text:        #333333 (Xám đậm - dễ đọc)
Highlight:   #D4A574 (Vàng hổ phách - nổi bật)
```

### ❌ MÀU CẤM
- Không dùng tím/violet (kém sang, nhạy cảm văn hóa Việt)
- Không dùng đỏ chói (rẻ tiền)
- Không dùng xanh lá neon (không phù hợp)

### Typography
```
Heading:  'Playfair Display', serif    — Sang trọng, cổ điển
Body:     'Inter', sans-serif          — Hiện đại, dễ đọc
Accent:   'Cormorant Garamond', serif  — Thanh lịch cho tagline
```

### Visual Style
- **Glassmorphism nhẹ** cho cards (backdrop-filter: blur)
- **Gradient tinh tế** (champagne → kem)
- **Ảnh full-bleed** với overlay gradient
- **Micro-animations** khi scroll (fade-in, slide-up)
- **Parallax nhẹ** cho hero sections
- Rounded corners: 12-16px
- Shadow: Soft, warm-toned (0 4px 24px rgba(201,169,110,0.15))

### 🖼️ Logo & Brand Assets
- **Đường dẫn Logo chuẩn**: `https://2hstudio.vn/wp-content/uploads/2024/10/8.jpg`
- **Quy tắc gắn Logo vào Dashboard ERP**:
  - Đặt Logo ở 2 vị trí bắt buộc trong `Index.html`:
    1. **Thanh Header chính**: Góc trái, cạnh tiêu đề Dashboard. Thêm class `max-h-8 rounded`.
    2. **Khu vực Print Header (`#print-header`)**: Header để in PDF/A4. Thêm class `max-h-[50px] mb-2`.
  - Không cần yêu cầu copy code lại ở phiên sau, AI TỰ ĐỘNG lấy đường link này để dán vào các Dash khác khi user yêu cầu "thêm Logo".

---

## 📐 Website Structure (Khi tạo website studio)

### Trang bắt buộc
1. **Hero** — Full-screen ảnh cưới đẹp nhất + tagline + CTA "Đặt Lịch Tư Vấn"
2. **Dịch Vụ** — Grid cards (Chụp Cưới / Makeup / Thuê Váy / Album)
3. **Portfolio** — Masonry gallery + lightbox + filter theo loại
4. **Bảng Giá** — Tiers (Cơ Bản / Cao Cấp / VIP) với CTA rõ ràng
5. **Về Chúng Tôi** — Story + Team + Số liệu (500+ khách hàng, 5+ năm)
6. **Đặt Lịch** — Form đặt lịch tư vấn (Tên, SĐT, Ngày cưới, Dịch vụ quan tâm)
7. **Blog/Tips** — Bài viết SEO (Cẩm nang cưới, Xu hướng makeup)
8. **Footer** — Địa chỉ, SĐT, Zalo, Facebook, Instagram, Google Maps embed

### UX Rules
- **Mobile-first** — 70%+ khách hàng dùng điện thoại
- **CTA nổi bật** — Nút "Đặt Lịch" sticky trên mobile
- **Tốc độ** — Lazy load ảnh, WebP format, score Lighthouse ≥ 90
- **Chat widget** — Tích hợp Zalo/Facebook Messenger
- **SEO** — Schema markup LocalBusiness, meta description tiếng Việt

---

## 🛠️ Tech Stack Preferences

### Web
| Ưu tiên | Stack | Khi nào |
|---------|-------|---------|
| 1 | HTML + Vanilla CSS + JS | Landing page đơn giản |
| 2 | Next.js + Tailwind | Web app có nhiều trang |
| 3 | React + Vite | SPA (Single Page App) |

### Backend / Database
| Ưu tiên | Stack | Khi nào |
|---------|-------|---------|
| 1 | Google Sheets + AppScript | Lưu trữ đơn giản |
| 2 | Supabase | Auth + Database phức tạp |
| 3 | Firebase | Real-time features |

### Deploy
| Ưu tiên | Platform |
|---------|---------|
| 1 | Vercel |
| 2 | GitHub Pages |
| 3 | Cloudflare Pages |

---

## 📝 Prompt Templates

### Tạo Website Studio
```
Tạo website cho Han's Studio - Studio Cưới & Makeup chuyên nghiệp.
Yêu cầu:
- Bảng màu: Champagne (#C9A96E) + Đen (#2C2C2C) + Kem (#FAFAF8)
- Font: Playfair Display (heading) + Inter (body)
- Style: Sang trọng, tinh tế, glassmorphism nhẹ
- Responsive mobile-first
- Trang: Hero, Dịch vụ, Portfolio, Bảng giá, Đặt lịch, Footer
- SEO: Schema LocalBusiness, meta tiếng Việt
```

### Tạo Landing Page Quảng Cáo
```
Tạo landing page quảng cáo gói chụp ảnh cưới cho Han's Studio.
Target: Cặp đôi 25-35 tuổi, phân khúc trung-cao.
CTA: "Đặt Lịch Tư Vấn Miễn Phí"
Style: Sang trọng, nhiều ảnh cưới, testimonials, countdown ưu đãi.
```

### Thiết kế UI cho App Quản Lý
```
Tạo dashboard quản lý lịch chụp cho studio cưới.
Features: Calendar view, danh sách khách hàng, trạng thái đơn hàng.
Style: Dark mode, clean, professional.
```

---

## 🔄 Quality Gates

Mọi output cho Studio PHẢI đáp ứng:

1. ✅ **Thương hiệu** — Font, màu, style đúng Design System
2. ✅ **Mobile** — Responsive, touch-friendly, ≤3s load time
3. ✅ **SEO** — Title, meta, heading hierarchy, schema markup
4. ✅ **Accessibility** — Alt text cho ảnh, contrast ratio ≥ 4.5:1
5. ✅ **Tiếng Việt** — Nội dung tiếng Việt, có dấu đầy đủ
6. ✅ **CTA** — Ít nhất 1 CTA rõ ràng mỗi trang
7. ✅ **Performance** — Lighthouse ≥ 90, lazy load images
