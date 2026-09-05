---
name: clean-code
description: Pragmatic coding standards - concise, direct, no over-engineering, no unnecessary comments
allowed-tools: Read, Write, Edit
version: 2.0
priority: CRITICAL
---

# Clean Code - Pragmatic AI Coding Standards

> **CRITICAL SKILL** - Be **concise, direct, and solution-focused**.

---

## Core Principles

| Principle | Rule |
|-----------|------|
| **SRP** | Single Responsibility - each function/class does ONE thing |
| **DRY** | Don't Repeat Yourself - extract duplicates, reuse |
| **KISS** | Keep It Simple - simplest solution that works |
| **YAGNI** | You Aren't Gonna Need It - don't build unused features |
| **Boy Scout** | Leave code cleaner than you found it |

---

## Naming Rules

| Element | Convention |
|---------|------------|
| **Variables** | Reveal intent: `userCount` not `n` |
| **Functions** | Verb + noun: `getUserById()` not `user()` |
| **Booleans** | Question form: `isActive`, `hasPermission`, `canEdit` |
| **Constants** | SCREAMING_SNAKE: `MAX_RETRY_COUNT` |

> **Rule:** If you need a comment to explain a name, rename it.

---

## Function Rules

| Rule | Description |
|------|-------------|
| **Small** | Max 20 lines, ideally 5-10 |
| **One Thing** | Does one thing, does it well |
| **One Level** | One level of abstraction per function |
| **Few Args** | Max 3 arguments, prefer 0-2 |
| **No Side Effects** | Don't mutate inputs unexpectedly |

---

## Code Structure

| Pattern | Apply |
|---------|-------|
| **Guard Clauses** | Early returns for edge cases |
| **Flat > Nested** | Avoid deep nesting (max 2 levels) |
| **Composition** | Small functions composed together |
| **Colocation** | Keep related code close |

---

## AI Coding Style

| Situation | Action |
|-----------|--------|
| User asks for feature | Write it directly |
| User reports bug | Fix it, don't explain |
| No clear requirement | Ask, don't assume |

---

## Anti-Patterns (DON'T)

| ❌ Pattern | ✅ Fix |
|-----------|-------|
| Comment every line | Delete obvious comments |
| Helper for one-liner | Inline the code |
| Factory for 2 objects | Direct instantiation |
| utils.ts with 1 function | Put code where used |
| "First we import..." | Just write code |
| Deep nesting | Guard clauses |
| Magic numbers | Named constants |
| God functions | Split by responsibility |

---

## 🔴 Before Editing ANY File (THINK FIRST!)

**Before changing a file, ask yourself:**

| Question | Why |
|----------|-----|
| **What imports this file?** | They might break |
| **What does this file import?** | Interface changes |
| **What tests cover this?** | Tests might fail |
| **Is this a shared component?** | Multiple places affected |

**Quick Check:**
```
File to edit: UserService.ts
└── Who imports this? → UserController.ts, AuthController.ts
└── Do they need changes too? → Check function signatures
```

> 🔴 **Rule:** Edit the file + all dependent files in the SAME task.
> 🔴 **Never leave broken imports or missing updates.**

---

## Summary

| Do | Don't |
|----|-------|
| Write code directly | Write tutorials |
| Let code self-document | Add obvious comments |
| Fix bugs immediately | Explain the fix first |
| Inline small things | Create unnecessary files |
| Name things clearly | Use abbreviations |
| Keep functions small | Write 100+ line functions |

> **Remember: The user wants working code, not a programming lesson.**

---

## Linting Standards (2025)

### ESLint Config Selection

| Config | Stars | Best For |
|--------|-------|----------|
| **airbnb/javascript** | 150k⭐ | Industry standard, comprehensive rules |
| **eslint-config-standard** | 13k⭐ | Simpler, less opinionated |
| **Biome** | 14k⭐ | All-in-one (lint + format), 10x faster |

### Key Rules from airbnb/javascript (150k⭐)

| Category | Rule |
|----------|------|
| **References** | Prefer `const` → `let` → never `var` |
| **Objects** | Use shorthand properties, computed property names |
| **Arrays** | Use spread `[...arr]` to copy, `Array.from()` for array-like |
| **Destructuring** | Always destructure for multiple return values |
| **Strings** | Template literals over concatenation |
| **Functions** | Default parameters last, never reassign parameters |
| **Arrow Functions** | Implicit return for single expressions |
| **Modules** | Named exports over default, no wildcard `import *` |
| **Comparison** | `===` always, ternary for simple cases |
| **Naming** | camelCase variables, PascalCase classes, UPPERCASE constants |

### ESLint vs Biome Decision

```
Need maximum rules + ecosystem?
  └── ESLint (airbnb config)

Need speed + single tool (lint + format)?
  └── Biome

TypeScript project with strict rules?
  └── ESLint + typescript-eslint (or Biome)
```

---

## 🔴 Self-Check Before Completing (MANDATORY)

**Before saying "task complete", verify:**

| Check | Question |
|-------|----------|
| ✅ **Goal met?** | Did I do exactly what user asked? |
| ✅ **Files edited?** | Did I modify all necessary files? |
| ✅ **Code works?** | Did I test/verify the change? |
| ✅ **No errors?** | Lint and TypeScript pass? |
| ✅ **Nothing forgotten?** | Any edge cases missed? |

> 🔴 **Rule:** If ANY check fails, fix it before completing.

---

## Verification Scripts (MANDATORY)

> 🔴 **CRITICAL:** Each agent runs ONLY their own skill's scripts after completing work.

### Agent → Script Mapping

| Agent | Script | Command |
|-------|--------|---------|
| **frontend-specialist** | UX Audit | `python .agent/skills/frontend-design/scripts/ux_audit.py .` |
| **frontend-specialist** | A11y Check | `python .agent/skills/frontend-design/scripts/accessibility_checker.py .` |
| **backend-specialist** | API Validator | `python .agent/skills/api-patterns/scripts/api_validator.py .` |
| **mobile-developer** | Mobile Audit | `python .agent/skills/mobile-design/scripts/mobile_audit.py .` |
| **database-architect** | Schema Validate | `python .agent/skills/database-design/scripts/schema_validator.py .` |
| **security-auditor** | Security Scan | `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .` |
| **seo-specialist** | SEO Check | `python .agent/skills/seo-fundamentals/scripts/seo_checker.py .` |
| **seo-specialist** | GEO Check | `python .agent/skills/geo-fundamentals/scripts/geo_checker.py .` |
| **performance-optimizer** | Lighthouse | `python .agent/skills/performance-profiling/scripts/lighthouse_audit.py <url>` |
| **test-engineer** | Test Runner | `python .agent/skills/testing-patterns/scripts/test_runner.py .` |
| **test-engineer** | Playwright | `python .agent/skills/webapp-testing/scripts/playwright_runner.py <url>` |
| **Any agent** | Lint Check | `python .agent/skills/lint-and-validate/scripts/lint_runner.py .` |
| **Any agent** | Type Coverage | `python .agent/skills/lint-and-validate/scripts/type_coverage.py .` |
| **Any agent** | i18n Check | `python .agent/skills/i18n-localization/scripts/i18n_checker.py .` |

> ❌ **WRONG:** `test-engineer` running `ux_audit.py`
> ✅ **CORRECT:** `frontend-specialist` running `ux_audit.py`

---

### 🔴 Script Output Handling (READ → SUMMARIZE → ASK)

**When running a validation script, you MUST:**

1. **Run the script** and capture ALL output
2. **Parse the output** - identify errors, warnings, and passes
3. **Summarize to user** in this format:

```markdown
## Script Results: [script_name.py]

### ❌ Errors Found (X items)
- [File:Line] Error description 1
- [File:Line] Error description 2

### ⚠️ Warnings (Y items)
- [File:Line] Warning description

### ✅ Passed (Z items)
- Check 1 passed
- Check 2 passed

**Should I fix the X errors?**
```

4. **Wait for user confirmation** before fixing
5. **After fixing** → Re-run script to confirm

> 🔴 **VIOLATION:** Running script and ignoring output = FAILED task.
> 🔴 **VIOLATION:** Auto-fixing without asking = Not allowed.
> 🔴 **Rule:** Always READ output → SUMMARIZE → ASK → then fix.

---

## 💡 Superpowers Workflow (từ obra/superpowers — 96K⭐)

**7 bước dev bắt buộc (tuần tự, KHÔNG bỏ qua):**

1. **Brainstorming** — Tinh chỉnh ý tưởng qua câu hỏi, khám phá phương án, lưu design doc
2. **Git Worktrees** — Tạo branch cô lập, chạy setup, xác nhận baseline test sạch
3. **Viết Kế Hoạch** — Chia thành task 2-5 phút. Mỗi task có file paths, code, cách xác minh
4. **Subagent/Thực Thi** — Phân công agent mới cho mỗi task với review 2 giai đoạn
5. **TDD** — RED-GREEN-REFACTOR: test thất bại → code tối thiểu → pass → commit
6. **Code Review** — Review theo kế hoạch, vấn đề nghiêm trọng chặn tiến trình
7. **Hoàn Thành Branch** — Xác minh tests, đưa ra tùy chọn merge, dọn dẹp

**Triết lý:** Test-first. Hệ thống hơn tùy hứng. Đơn giản là mục tiêu. Bằng chứng hơn tuyên bố.

---

## 🔑 5 Quy Tắc Vàng (từ claude-code-ultimate-guide)

| # | Quy Tắc | Hành Động |
|---|---------|----------|
| 1 | **Xác Minh Độ Tin Cậy** | AI tạo 1.75x lỗi logic hơn code người. Luôn test, review |
| 2 | **Kiểm Tra MCPs** | 655 skill độc hại. Audit 5 phút trước khi dùng |
| 3 | **Quản Lý Context** | 70% = mất chính xác. 90%+ = hallucination. Dùng `/compact` |
| 4 | **Bắt Đầu Đơn Giản** | Phase 1→4 dần dần. Test 2 tuần trước khi scale |
| 5 | **Bắt Buộc TDD** | AI khuếch đại cả code tốt LẪN code xấu. TDD bắt buộc |

---

## 🧠 Quản Lý Áp Lực Context

| Context % | Trạng Thái | Hành Động |
|-----------|-----------|----------|
| 0-50% | ✅ Tự do | Làm bình thường |
| 50-70% | ⚠️ Chú ý | Bắt đầu tóm tắt |
| 70-90% | 🟡 Nguy hiểm | `/compact` bắt buộc |
| 90%+ | 🔴 Khẩn cấp | `/clear` ngay lập tức |

