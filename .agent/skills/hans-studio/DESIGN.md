# DESIGN.md — Han's Studio

> Luxury Wedding & Makeup Studio — Nha Trang, Vietnam
> Design tokens, rules, and rationale for AI-assisted UI generation.

---

## Brand Identity

**Name:** Han's Studio
**Tagline:** "Khắc ghi khoảnh khắc — Nâng tầm kỷ niệm"
**Industry:** Wedding Photography & Bridal Makeup
**Audience:** Vietnamese couples (25-35), mid-to-high segment
**Feeling:** Walking into a luxury boutique — warm, intimate, effortlessly sophisticated

---

## Color Tokens

### Primary Palette

| Token               | Hex       | Usage                             | Rationale                                    |
| ------------------- | --------- | --------------------------------- | -------------------------------------------- |
| `--color-primary`   | `#C9A96E` | CTAs, headings, accents           | Champagne gold — luxury without being flashy |
| `--color-secondary` | `#2C2C2C` | Backgrounds (dark), text contrast | Charcoal — professional, grounded            |
| `--color-accent`    | `#E8D5B7` | Card backgrounds, highlights      | Warm cream — inviting, soft touch            |
| `--color-surface`   | `#FAFAF8` | Page backgrounds                  | Off-white — avoids harsh clinical white      |
| `--color-text`      | `#333333` | Body text                         | Dark gray — readability without heaviness    |
| `--color-highlight` | `#D4A574` | Hover states, badges, price tags  | Amber gold — attention without aggression    |

### Gradient System

```css
--gradient-hero: linear-gradient(135deg, #c9a96e 0%, #e8d5b7 50%, #fafaf8 100%);
--gradient-card: linear-gradient(
  180deg,
  rgba(250, 250, 248, 0.95) 0%,
  rgba(232, 213, 183, 0.3) 100%
);
--gradient-overlay: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0) 0%,
  rgba(44, 44, 44, 0.7) 100%
);
--gradient-dark: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
```

### Forbidden Colors

- ❌ Purple/Violet — culturally sensitive in Vietnamese weddings
- ❌ Bright red — appears cheap, not premium
- ❌ Neon green — completely wrong aesthetic
- ❌ Pure white `#FFFFFF` — too harsh, use `#FAFAF8` instead

---

## Typography

| Token            | Family             | Weight    | Size    | Usage                                |
| ---------------- | ------------------ | --------- | ------- | ------------------------------------ |
| `--font-display` | Playfair Display   | 700       | 36-64px | Hero headings, page titles           |
| `--font-body`    | Inter              | 400, 500  | 14-18px | Paragraphs, UI labels, form text     |
| `--font-accent`  | Cormorant Garamond | 400i, 500 | 18-28px | Taglines, testimonial quotes, prices |

### Type Scale

```
--text-xs: 12px / 1.5
--text-sm: 14px / 1.6
--text-base: 16px / 1.7
--text-lg: 18px / 1.6
--text-xl: 20px / 1.5
--text-2xl: 24px / 1.4
--text-3xl: 32px / 1.3
--text-4xl: 40px / 1.2
--text-hero: 56px / 1.1
```

### Rules

- Vietnamese diacritics MUST render correctly — test with "Lễ Cưới" not just ASCII
- Heading hierarchy: `h1` Playfair → `h2` Playfair → `h3` Inter 600 → `h4` Inter 500
- Line length: max 70ch for body text
- Letter spacing: +0.02em on Playfair headings, 0 on Inter body

---

## Spacing & Layout

```
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--space-section: 96px
```

### Grid

- Max container: `1200px` (centered)
- Columns: 12-column grid, `24px` gutter
- Breakpoints: `375px` (mobile) → `768px` (tablet) → `1024px` (desktop) → `1440px` (wide)
- Mobile-first: 70%+ audience uses phone

---

## Component Tokens

### Borders & Radius

```
--radius-sm: 8px     /* Buttons, inputs */
--radius-md: 12px    /* Cards, modals */
--radius-lg: 16px    /* Hero sections, feature blocks */
--radius-full: 50%   /* Avatars only */
--border-subtle: 1px solid rgba(201,169,110,0.2);
--border-accent: 1px solid #C9A96E;
```

### Shadows

```
--shadow-card: 0 4px 24px rgba(201,169,110,0.12);
--shadow-hover: 0 8px 32px rgba(201,169,110,0.2);
--shadow-modal: 0 16px 48px rgba(44,44,44,0.3);
--shadow-subtle: 0 2px 8px rgba(0,0,0,0.06);
```

### Glassmorphism (use sparingly)

```css
.glass-card {
  background: rgba(250, 250, 248, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 169, 110, 0.15);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}
```

---

## Motion

```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Micro-animations

- **Scroll reveal:** fade-in + translateY(20px) on intersection
- **Hover cards:** translateY(-4px) + shadow-hover
- **CTA buttons:** scale(1.02) on hover, scale(0.98) on press
- **Image galleries:** smooth crossfade, no jarring cuts
- **Hero parallax:** subtle (0.3x rate), never disorienting

### Rules

- ALWAYS respect `prefers-reduced-motion: reduce`
- No animation > 500ms
- No bouncing or elastic easing — luxury brands don't bounce

---

## Imagery

### Photo Treatment

- Full-bleed hero images with `--gradient-overlay` at bottom
- Gallery images: rounded corners `--radius-md`, warm color grading
- Lazy loading ALL images, WebP format preferred
- Aspect ratios: 3:2 (landscape wedding), 2:3 (portrait bridal), 1:1 (thumbnails)

### Placeholder Strategy

- Skeleton loaders with `--color-accent` shimmer, NEVER gray
- BlurHash or dominant-color placeholder before image loads

---

## Component Patterns

### Buttons

```
Primary:   bg:#C9A96E, text:#FFFFFF, radius:8px, padding:12px 32px
           hover: bg:#D4A574, shadow-hover
Secondary: bg:transparent, border:1px solid #C9A96E, text:#C9A96E
           hover: bg:rgba(201,169,110,0.08)
Ghost:     bg:transparent, text:#333, underline on hover
```

### Cards (Service/Portfolio)

- Glass background or `--color-surface`
- Image at top (aspect 3:2), content below
- Title in Playfair, description in Inter
- Subtle border-bottom `--border-accent` as decoration
- Hover: lift + shadow transition

### Navigation

- Sticky top, glass effect on scroll
- Logo left, menu center (desktop), hamburger (mobile)
- Active link underline with `--color-primary`
- Mobile: full-screen overlay menu, fade-in animation

### Forms (Booking)

- Labels above inputs, Inter 500
- Input border: `--border-subtle`, focus: `--border-accent` + subtle glow
- Required fields: asterisk in `--color-primary`
- Success state: checkmark in `--color-primary`

---

## Dark Mode

| Token             | Light                   | Dark                    |
| ----------------- | ----------------------- | ----------------------- |
| `--color-surface` | `#FAFAF8`               | `#1A1A1A`               |
| `--color-text`    | `#333333`               | `#E8E8E6`               |
| `--color-card-bg` | `#FFFFFF`               | `#242424`               |
| `--color-border`  | `rgba(201,169,110,0.2)` | `rgba(201,169,110,0.3)` |

- `--color-primary` (#C9A96E) and `--color-highlight` (#D4A574) stay the SAME
- Gold on dark background = premium look
- Test contrast ratio ≥ 4.5:1 for all text

---

## Do / Don't

### ✅ Do

- Use real wedding/makeup photos (never stock with watermarks)
- Every page has at least 1 clear CTA ("Đặt Lịch Tư Vấn")
- Content in Vietnamese with proper diacritics
- Schema markup `LocalBusiness` for SEO
- Lighthouse score ≥ 90

### ❌ Don't

- Don't use purple, bright red, or neon colors
- Don't use stock photo models that aren't Vietnamese/Asian
- Don't use heavy animations that slow page load
- Don't use Comic Sans, Papyrus, or decorative fonts
- Don't put text directly on busy photo areas without overlay
- Don't use `mix-blend-mode` on dark backgrounds (Gotcha: text disappears)
