---
trigger: always_on
---

# Level 2 Rules — "MAKE IT RIGHT"

> ⚠️ Chỉ áp dụng khi Founder ở Level 2+. Kiểm tra `goals.md` để xác nhận.

## 🧪 Strict TDD (Test-Driven Development)

> 🔴 Viết test TRƯỚC code. Không ngoại lệ cho logic trong `/services` và hooks.

**Quy trình RED-GREEN-REFACTOR:**

1. **RED:** Viết test → chạy → test PHẢI FAIL (chứng minh test đang kiểm đúng thứ)
2. **GREEN:** Viết code TỐI THIỂU → chạy → test PASS
3. **REFACTOR:** Dọn code, giữ test PASS
4. **COMMIT:** 1 test + 1 implementation = 1 commit

- Code viết TRƯỚC test → BẮT BUỘC xóa, viết test trước rồi viết lại
- Áp dụng cho: `/services`, custom hooks, utility functions
- KHÔNG áp dụng cho: UI components thuần hiển thị (Dumb Components)

## 🧩 Smart vs Dumb Components

> 🔴 Mỗi component PHẢI thuộc 1 trong 2 loại. KHÔNG trộn lẫn.

| Loại                      | Nhiệm vụ                              | Chứa gì                               | Ví dụ                                    |
| ------------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------------- |
| **Smart** (Container)     | Gọi hooks, quản lý state, xử lý logic | `useState`, `useEffect`, custom hooks | `BookingPage`, `DashboardContainer`      |
| **Dumb** (Presentational) | Chỉ nhận props → render UI            | Chỉ props, không side effects         | `BookingCard`, `PriceTag`, `StatusBadge` |

**Rules:**

- Dumb component KHÔNG ĐƯỢC gọi API hay `useEffect`
- Smart component KHÔNG NÊN chứa JSX/HTML phức tạp — delegate cho Dumb
- 1 Smart gọi N Dumb = pattern chuẩn

## 🪝 Custom Hooks Pattern

> Tách logic tái sử dụng ra hooks riêng trong `/hooks`.

**Khi nào tạo Custom Hook:**

- Cùng logic fetch xuất hiện ≥2 nơi → `useBookings()`, `useOrders()`
- State + effect phức tạp → gói vào hook
- Timer, interval, event listener → hook riêng

**Naming:** `use` + Mục đích → `useFetchCustomers()`, `useDebounce()`, `useLocalStorage()`

**Cấu trúc:**

```javascript
// hooks/useBookings.js
function useBookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBookings()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
```

## 📂 Services Layer

> Tất cả API calls đặt trong `/services`. Component/Hook KHÔNG gọi `fetch` trực tiếp.

**Cấu trúc thư mục:**

```
src/
├── components/     ← Dumb (UI only, nhận props)
├── pages/          ← Smart (gọi hooks, quản lý state)
├── hooks/          ← Custom hooks (gọi services)
└── services/       ← API calls (fetch/axios)
    ├── bookingService.js
    ├── customerService.js
    └── orderService.js
```

**Luồng data:** `Service → Hook → Smart Component → Dumb Component`

**Rules:**

- 1 service = 1 domain (booking, customer, order...)
- Service trả về data đã parse, KHÔNG trả raw Response
- Error handling ở service level, hook chỉ nhận kết quả
