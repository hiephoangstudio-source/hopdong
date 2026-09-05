---
name: grill
description: Grilling Session command. Grills the user relentlessly to resolve design branches and builds project domain language & ADRs.
---

# /grill - Grilling Session & Domain Modeling

$ARGUMENTS

---

## Purpose

Phá»ng váº¥n ngÆ°á»£c ngÆ°á»i dÃ¹ng (Grilling Session) Ä‘á»ƒ lÃ m rÃµ 100% cÃ¡c Ã½ Ä‘á»‹nh thiáº¿t káº¿, Ä‘á»“ng thá»i tá»± Ä‘á»™ng xÃ¢y dá»±ng file `CONTEXT.md` (Domain Language) vÃ  ghi chÃ©p quyáº¿t Ä‘á»‹nh kiáº¿n trÃºc `docs/ADR-{slug}.md`.

---

## ðŸ›‘ Rules Engine

1. **Phá»ng váº¥n tá»«ng cÃ¢u má»™t:** KhÃ´ng gá»­i danh sÃ¡ch 10 cÃ¢u há»i cÃ¹ng lÃºc. Há»i tá»«ng cÃ¢u dá»“n dáº­p, giáº£i quyáº¿t tá»«ng nhÃ¡nh quyáº¿t Ä‘á»‹nh.
2. **XÃ¢y dá»±ng NgÃ´n Ngá»¯ Chung (Ubiquitous Language):** Chuáº©n hÃ³a táº¥t cáº£ khÃ¡i niá»‡m dá»± Ã¡n vÃ o file `CONTEXT.md`.
3. **Ghi láº¡i ADR:** Táº¡o file `docs/ADR-{task-slug}.md` lÆ°u trá»¯ lÃ½ do Ä‘Æ°a ra cÃ¡c quyáº¿t Ä‘á»‹nh ká»¹ thuáº­t quan trá»ng.

---

## Workflow Steps

### Step 1: Khá»Ÿi Táº¡o Thuáº­t Ngá»¯ & Pháº¡m Vi
- Äá»c file `CONTEXT.md` (náº¿u cÃ³).
- XÃ¡c Ä‘á»‹nh má»¥c tiÃªu cá»§a yÃªu cáº§u: `$ARGUMENTS`.

### Step 2: Phá»ng Váº¥n NgÆ°á»£c (Grilling Loop)
- Äáº·t cÃ¡c cÃ¢u há»i xoÃ¡y Ä‘Ã¡p xoay vá»:
  1. *Chá»§ thá»ƒ & KhÃ¡ch hÃ ng:* Dá»± Ã¡n/TÃ­nh nÄƒng nÃ y dÃ nh cho ai?
  2. *Luá»“ng xá»­ lÃ½ (Happy path & Edge cases):* Äiá»u gÃ¬ xáº£y ra khi lá»—i? Náº¿u nháº­p sai dá»¯ liá»‡u thÃ¬ sao?
  3. *Ranh giá»›i pháº¡m vi (Scope Boundary):* TÃ­nh nÄƒng nÃ o lÃ  V1 (cáº§n ngay), tÃ­nh nÄƒng nÃ o dá»i V2?
  4. *Thuáº­t ngá»¯ chuyÃªn mÃ´n:* TÃªn gá»i chÃ­nh xÃ¡c cá»§a cÃ¡c khÃ¡i niá»‡m lÃ  gÃ¬?

### Step 3: Tá»•ng Há»£p & Cáº­p Nháº­t Docs
- ThÃªm thuáº­t ngá»¯ má»›i vÃ o `CONTEXT.md`.
- Xuáº¥t file `docs/ADR-{task-slug}.md` ghi nháº­n:
  - Context (Ngá»¯ cáº£nh)
  - Decision (Quyáº¿t Ä‘á»‹nh chá»n giáº£i phÃ¡p nÃ o)
  - Consequences (Há»‡ quáº£ / Æ¯u nhÆ°á»£c Ä‘iá»ƒm)

---

## Usage Examples

```bash
/grill thiáº¿t káº¿ tÃ­nh nÄƒng Ä‘áº·t lá»‹ch chá»¥p áº£nh online
/grill refactor module thanh toÃ¡n Studio ERP
/grill thÃªm tÃ­nh nÄƒng táº¡o Typography tá»± Ä‘á»™ng
```
