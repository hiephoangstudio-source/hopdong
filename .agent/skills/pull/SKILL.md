---
name: pull
description: Pull táº¥t cáº£ thay Ä‘á»•i tá»« GitHub â€” dÃ¹ng khi chuyá»ƒn sang mÃ¡y má»›i hoáº·c báº¯t Ä‘áº§u session
---

// turbo-all

# Workflow: Pull & Sync

Workflow nÃ y pull code má»›i nháº¥t tá»« GitHub khi chuyá»ƒn mÃ¡y hoáº·c báº¯t Ä‘áº§u session má»›i.

## BÆ°á»›c 1: Pull táº¥t cáº£ repos

```powershell
powershell -ExecutionPolicy Bypass -File "c:\AntiCode\master-agent\scripts\git-pull-all.ps1"
```

## BÆ°á»›c 2: Äá»c memory Ä‘á»ƒ náº¯m context (TÃ­ch há»£p /resume)

> ðŸ”´ **Báº®T BUá»˜C** â€” Phá»¥c há»“i tráº¡ng thÃ¡i AI tá»« phiÃªn trÆ°á»›c (chá»©c nÄƒng Resume) báº±ng cÃ¡ch Ä‘á»c `session-state.md`, kÃ¨m `today.md` vÃ  `DEVLOG.md`.

```powershell
cat ".agent\memory\session-state.md"
cat ".agent\memory\today.md"
```

## BÆ°á»›c 3: Äá»c DEVLOG cá»§a project Ä‘ang lÃ m (náº¿u cÃ³)

> Má»—i project cÃ³ `DEVLOG.md` á»Ÿ root â€” Ä‘á»c Ä‘á»ƒ náº¯m tráº¡ng thÃ¡i.

TÃ¬m DEVLOG trong project hiá»‡n táº¡i:

```powershell
Get-ChildItem "c:\AntiCode" -Directory | ForEach-Object { if (Test-Path "$($_.FullName)\DEVLOG.md") { Write-Output "$($_.Name)/DEVLOG.md" } }
```

## BÆ°á»›c 4: Install dependencies (náº¿u cáº§n)

Chá»‰ cháº¡y náº¿u project cÃ³ `package.json` vÃ  chÆ°a cÃ³ `node_modules`:

```powershell
# Cháº¡y trong folder project cáº§n lÃ m viá»‡c
npm install
```

## BÆ°á»›c 5: BÃ¡o cÃ¡o cho user

Sau khi Ä‘á»c memory + DEVLOG, tÃ³m táº¯t ngáº¯n gá»n:

- Viá»‡c Ä‘Ã£ lÃ m gáº§n nháº¥t
- Viá»‡c cáº§n lÃ m tiáº¿p theo
- CÃ³ conflict hay lá»—i gÃ¬ khÃ´ng
