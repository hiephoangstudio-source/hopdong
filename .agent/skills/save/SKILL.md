---
name: save
description: (Ultimate Wrap-up) LÆ°u toÃ n bá»™ ngá»¯ cáº£nh, rÃºt ra bÃ i há»c Gotchas, Commit Git vÃ  Deploy. DÃ¹ng 1 láº§n duy nháº¥t khi káº¿t thÃºc phiÃªn lÃ m viá»‡c.
---

// turbo-all

# Workflow: Save, Sync & Memorize (Wrap-up)

> **MÃ´ táº£:** ÄÃ¢y lÃ  lá»‡nh Workflow quan trá»ng nháº¥t Ä‘á»ƒ chá»‘ng "máº¥t trÃ­ nhá»›" cho AI. Khi gá»i `/save`, AI pháº£i thá»©c thi Ä‘áº§y Ä‘á»§ 5 bÆ°á»›c sau Ä‘Ã¢y Ä‘á»ƒ Ä‘Ã³ng gÃ³i má»i kiáº¿n thá»©c, kinh nghiá»‡m vÃ  code cá»§a phiÃªn lÃ m viá»‡c. Cáº¥m bá» qua báº¥t ká»³ bÆ°á»›c nÃ o!

## BÆ°á»›c 1: TrÃ­ch xuáº¥t & Cáº­p nháº­t BÃ i Há»c (Gotchas & Learnings)

- AI tÆ° duy: _MÃ¬nh cÃ³ gáº·p lá»—i nÃ o láº·p Ä‘i láº·p láº¡i hay giáº£i phÃ¡p nÃ o khÃ³ trong ca lÃ m viá»‡c vá»«a rá»“i khÃ´ng?_
- Náº¿u cÃ³: DÃ¹ng Tool tá»± Ä‘á»™ng bá»• sung ngay bÃ i há»c Ä‘Ã³ vÃ o cuá»‘i file `c:\AntiCode\master-agent\.agent\memory\gotchas.md`. (Ghi chÃº rÃµ ngÃ y thÃ¡ng, mÃ£ lá»—i, cÃ¡ch fix phÃ²ng ngá»«a lá»—i tÆ°Æ¡ng tá»±).
- Náº¿u khÃ´ng: Bá» qua Ä‘oáº¡n nÃ y.

## BÆ°á»›c 2: LÆ°u tráº¡ng thÃ¡i BÃ n giao (Session State & Today)

- DÃ¹ng Tool Ä‘á»ƒ cáº­p nháº­t file cá»¥c bá»™ `.agent\memory\session-state.md` (ÄÃ¨ vÃ o má»¥c "3. SESSION Táº M Dá»ªNG"): Ghi chÃº rÃµ mÃ¬nh Ä‘ang Ä‘á»©ng á»Ÿ Ä‘Ã¢u, lÃ m Ä‘Æ°á»£c file nÃ o, vÃ  ca sau vÃ o sáº½ lÃ m gÃ¬ tiáº¿p theo cá»§a RIÃŠNG Dá»° ÃN NÃ€Y.
- Cáº­p nháº­t nhÃ¡nh TÃ³m táº¯t cÃ¡c viá»‡c Ä‘Ã£ xá»­ lÃ½ hÃ´m nay vÃ o file cá»¥c bá»™ `.agent\memory\today.md`.

## BÆ°á»›c 3: Cáº­p nháº­t nháº­t kÃ½ dá»± Ã¡n (DEVLOG - Báº®T BUá»˜C)

- Má»Ÿ thÆ° má»¥c gá»‘c cá»§a dá»± Ã¡n ÄANG LÃ€M (VÃ­ dá»¥: `c:\AntiCode\pancake-2hstudio`).
- Cáº­p nháº­t file `DEVLOG.md` cá»¥c bá»™ cá»§a dá»± Ã¡n Ä‘Ã³: ThÃªm dÃ²ng Lá»‹ch sá»­ thay Ä‘á»•i (ngÃ y + list tÃ­nh nÄƒng vá»«a thÃªm).

## BÆ°á»›c 4: LÆ°u táº¥ cáº£ Code (Auto Commit & Push)

- Tiáº¿n hÃ nh Ä‘áº©y toÃ n bá»™ code cá»§a toÃ n bá»™ thÆ° má»¥c lÃªn Github. Äiá»ƒm neo cháº¯c cháº¯n.

```powershell
git add .
git commit -m "Auto wrap-up session"
git push
```

## BÆ°á»›c 5: Auto Deploy (Náº¿u Ã¡p dá»¥ng)

- Náº¿u dá»± Ã¡n cÃ³ tá»‡p deploy lÃªn VPS, báº¯t buá»™c pháº£i cháº¡y ngay láº­p tá»©c.

```powershell
# Cháº¡y script deploy cá»§a dá»± Ã¡n tÆ°Æ¡ng á»©ng (VÃ­ dá»¥: VPS)
if (Test-Path "deploy_vps2.js") {
    node deploy_vps2.js
}
```

---

> **ðŸ’¬ Káº¿t Lá»i:** Sau khi 5 bÆ°á»›c trÃªn cháº¡y XONG Táº¤T Cáº¢, AI **Báº®T BUá»˜C** pháº£i xuáº¥t ra má»™t BÃ¡o CÃ¡o Chi Tiáº¿t tá»•ng há»£p toÃ n bá»™ nhá»¯ng gÃ¬ vá»«a thá»±c hiá»‡n, bao gá»“m:
> 1. BÃ i há»c (Gotchas) Ä‘Ã£ ghi nháº­n (hoáº·c "KhÃ´ng cÃ³")
> 2. Tráº¡ng thÃ¡i BÃ n giao (Tiáº¿n Ä‘á»™ vÃ  Viá»‡c cáº§n lÃ m ca sau)
> 3. Ná»™i dung cáº­p nháº­t vÃ o DEVLOG
> 4. Tráº¡ng thÃ¡i Ä‘áº©y Code lÃªn Github.
> Cuá»‘i bÃ¡o cÃ¡o kÃ¨m lá»i chÃºc: _"ToÃ n bá»™ tri thá»©c, tiáº¿n Ä‘á»™, bÃ i há»c vÃ  Code Ä‘Ã£ Ä‘Æ°á»£c niÃªm phong & Ä‘áº©y lÃªn Github. ChÃºc sáº¿p nghá»‰ ngÆ¡i vui váº»!"_
