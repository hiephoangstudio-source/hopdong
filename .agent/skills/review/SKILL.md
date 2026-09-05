---
name: review
description: Code review command. Performs systematic code review with severity-tagged feedback.
---

# /review - Code Review vá»›i Severity Tags

$ARGUMENTS

---

## Purpose

Kiá»ƒm tra cháº¥t lÆ°á»£ng code trÆ°á»›c khi merge. Output cÃ³ severity tags rÃµ rÃ ng Ä‘á»ƒ dá»… Æ°u tiÃªn fix.

---

## Severity Tags

| Tag | Ã nghÄ©a | HÃ nh Ä‘á»™ng |
|-----|---------|----------|
| ðŸ”´ **Critical** | Bug nghiÃªm trá»ng, security issue, data loss | **PHáº¢I fix trÆ°á»›c merge** |
| ðŸŸ¡ **Warning** | Potential issue, code smell, performance | **NÃªn fix** |
| ðŸŸ¢ **Suggestion** | Nice to have, style improvement | **TÃ¹y chá»n** |
| âœ… **Good** | Highlight code tá»‘t | **Ghi nháº­n** |

---

## Review Checklist

### 1. Code Quality
- [ ] Clean code: tÃªn biáº¿n rÃµ rÃ ng, hÃ m ngáº¯n, single responsibility
- [ ] DRY: khÃ´ng láº·p code
- [ ] SOLID: Ä‘Ãºng nguyÃªn táº¯c thiáº¿t káº¿
- [ ] Comments: chá»‰ comment "táº¡i sao", khÃ´ng comment "cÃ¡i gÃ¬"

### 2. Security (xem `.agent/docs/content-safety.md`)
- [ ] KhÃ´ng hardcode secrets/API keys
- [ ] Input validation cÃ³ Ä‘áº§y Ä‘á»§
- [ ] Auth/authz kiá»ƒm tra Ä‘Ãºng
- [ ] XSS/injection prevention

### 3. Error Handling
- [ ] Try-catch cÃ³ Ã½ nghÄ©a (khÃ´ng swallow)
- [ ] Error messages rÃµ rÃ ng cho user
- [ ] Fallback/retry cho external calls

### 4. Performance
- [ ] KhÃ´ng N+1 queries
- [ ] Lazy loading khi cáº§n
- [ ] Bundle size há»£p lÃ½

### 5. Testing
- [ ] Unit test cho logic chÃ­nh
- [ ] Edge cases covered
- [ ] Test readable, maintainable

### 6. Naming (xem `.agent/rules/naming-conventions.md`)
- [ ] Cache keys Ä‘Ãºng format
- [ ] DB identifiers nháº¥t quÃ¡n
- [ ] Env vars theo chuáº©n

---

## Output Format

```markdown
## ðŸ“ Code Review: [File/Feature]

### ðŸ”´ Critical (PHáº¢I fix)
1. **[MÃ´ táº£ váº¥n Ä‘á»]**
   - File: `path/to/file.ts:45`
   - Váº¥n Ä‘á»: [chi tiáº¿t]
   - Fix: [Ä‘á» xuáº¥t sá»­a]

### ðŸŸ¡ Warning (NÃªn fix)
1. **[MÃ´ táº£]**
   - [chi tiáº¿t + Ä‘á» xuáº¥t]

### ðŸŸ¢ Suggestion (TÃ¹y chá»n)
1. **[MÃ´ táº£]**
   - [chi tiáº¿t]

### âœ… Good (LÃ m tá»‘t)
1. **[Highlight Ä‘iá»u tá»‘t]**

### Summary
- ðŸ”´ Critical: X issues
- ðŸŸ¡ Warning: X issues
- ðŸŸ¢ Suggestion: X issues
- âœ… Good practices: X found
- **Verdict: APPROVE / REQUEST CHANGES / BLOCK**
```

---

## Examples

```
/review component BookingForm
/review API endpoint /api/publish
/review toÃ n bá»™ thay Ä‘á»•i hÃ´m nay
/review PR #42
```
