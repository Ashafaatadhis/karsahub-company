# KarsaHub — DESIGN.md

> Website agency. Light-first, warm indigo + amber gold, approachable professional.

KarsaHub is a local Indonesian web agency that builds websites for businesses. The design
language balances **modern tech credibility** with **local warmth** — clean and structured
like a serious studio, but approachable enough for UMKM and non-tech clients. Inspired by
Resend's restraint and precision, but flipped to light-first with an amber accent rooted in
the brand's Sansekerta heritage.

---

## 1. Color Palette

### Core Roles

| Token                  | Hex       | Role                                              |
|------------------------|-----------|---------------------------------------------------|
| `--color-bg`           | `#FAFAFA` | Page background — off-white, never pure white     |
| `--color-surface`      | `#FFFFFF` | Card / section surface                            |
| `--color-surface-muted`| `#F4F4F5` | Subtle background for code blocks, tags, inputs   |
| `--color-border`       | `#E4E4E7` | Hairline borders, dividers                        |
| `--color-border-strong`| `#D4D4D8` | Emphasized borders, input focus rings             |

### Text

| Token                  | Hex       | Role                                              |
|------------------------|-----------|---------------------------------------------------|
| `--color-text-primary` | `#111111` | Headings, body — near-black, not pure black       |
| `--color-text-secondary`| `#52525B` | Supporting text, captions, labels                |
| `--color-text-muted`   | `#A1A1AA` | Placeholder, disabled, subtle hints              |
| `--color-text-inverse` | `#FAFAFA` | Text on dark surfaces                             |

### Brand — Primary (Indigo)

| Token                   | Hex       | Role                                             |
|-------------------------|-----------|--------------------------------------------------|
| `--color-primary-950`   | `#1E1B4B` | Deep navy — for dark sections, footer            |
| `--color-primary-800`   | `#3730A3` | Primary brand color — CTAs, links, nav accent    |
| `--color-primary-600`   | `#4F46E5` | Hover state for primary buttons                  |
| `--color-primary-100`   | `#E0E7FF` | Light tint — badges, backgrounds, highlights     |
| `--color-primary-50`    | `#EEF2FF` | Very subtle tint — hover backgrounds             |

### Brand — Accent (Amber / Gold)

> Rooted in the Sansekerta heritage of the KarsaHub name. Used sparingly as the warm signal.

| Token                   | Hex       | Role                                             |
|-------------------------|-----------|--------------------------------------------------|
| `--color-accent-600`    | `#D97706` | Bold amber — icon highlights, callout borders    |
| `--color-accent-500`    | `#F59E0B` | Primary accent — section markers, underlines     |
| `--color-accent-200`    | `#FDE68A` | Light gold — decorative backgrounds              |
| `--color-accent-50`     | `#FFFBEB` | Amber tint — subtle callout surfaces             |

### Semantic

| Token                   | Hex       | Role                    |
|-------------------------|-----------|-------------------------|
| `--color-success`       | `#16A34A` | Success states          |
| `--color-warning`       | `#D97706` | Warning (shares accent) |
| `--color-error`         | `#DC2626` | Error, destructive      |
| `--color-info`          | `#2563EB` | Informational           |

---

## 2. Typography

KarsaHub uses **Inter** as the primary sans-serif for its neutrality, wide weight range,
and excellent readability on screen. **JetBrains Mono** for any code or technical snippets.
No custom or proprietary fonts — intentionally stack-agnostic for client handoffs.

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Token              | Size    | Weight  | Line Height | Usage                          |
|--------------------|---------|---------|-------------|--------------------------------|
| `--text-display`   | 56px    | 700     | 1.1         | Hero headline only             |
| `--text-h1`        | 40px    | 700     | 1.2         | Page titles                    |
| `--text-h2`        | 32px    | 600     | 1.25        | Section headings               |
| `--text-h3`        | 24px    | 600     | 1.3         | Card titles, subsections       |
| `--text-h4`        | 20px    | 500     | 1.35        | Minor headings                 |
| `--text-body-lg`   | 18px    | 400     | 1.6         | Lead paragraph, hero sub       |
| `--text-body`      | 16px    | 400     | 1.6         | Default body                   |
| `--text-body-sm`   | 14px    | 400     | 1.5         | Secondary copy, labels         |
| `--text-caption`   | 12px    | 400     | 1.4         | Captions, meta info            |
| `--text-mono`      | 13px    | 400     | 1.5         | Code blocks, technical tags    |

### Letter Spacing

- Display / H1: `-0.03em` — tight, premium feel
- H2 / H3: `-0.01em`
- Body: `0` (default)
- Uppercase labels / badges: `0.06em`

---

## 3. Spacing

Base unit: **4px**. All spacing is a multiple of 4.

```
4   8   12   16   20   24   32   40   48   64   80   96   128
```

| Token           | Value  | Common Use                        |
|-----------------|--------|-----------------------------------|
| `--space-1`     | 4px    | Icon padding, tight gaps          |
| `--space-2`     | 8px    | Inline element gaps               |
| `--space-3`     | 12px   | Small component padding           |
| `--space-4`     | 16px   | Default padding, card inner gap   |
| `--space-6`     | 24px   | Section inner padding             |
| `--space-8`     | 32px   | Card padding, section gap         |
| `--space-12`    | 48px   | Large section vertical padding    |
| `--space-16`    | 64px   | Section-to-section gap            |
| `--space-24`    | 96px   | Hero vertical padding             |

---

## 4. Border Radius

Soft but not bubbly. Rounded enough to feel friendly, contained enough to feel precise.

| Token            | Value   | Usage                              |
|------------------|---------|------------------------------------|
| `--radius-sm`    | 4px     | Badges, tags, code chips           |
| `--radius-md`    | 8px     | Buttons, inputs, small cards       |
| `--radius-lg`    | 12px    | Cards, modals                      |
| `--radius-xl`    | 16px    | Feature cards, large containers    |
| `--radius-2xl`   | 24px    | Hero cards, image containers       |
| `--radius-full`  | 9999px  | Pills, avatar, icon buttons        |

---

## 5. Shadows

Restrained. Depth comes from borders and subtle elevation, not dramatic shadows.

| Token              | Value                                          | Usage                    |
|--------------------|------------------------------------------------|--------------------------|
| `--shadow-xs`      | `0 1px 2px rgba(0,0,0,0.05)`                  | Subtle card lift          |
| `--shadow-sm`      | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Default card |
| `--shadow-md`      | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)` | Hover state  |
| `--shadow-lg`      | `0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)` | Modals, dropdowns |
| `--shadow-focus`   | `0 0 0 3px rgba(79,70,229,0.2)`               | Focus ring (indigo)      |
| `--shadow-focus-accent` | `0 0 0 3px rgba(245,158,11,0.25)`       | Focus on accent elements |

---

## 6. Components

### Button

**Primary** — indigo fill, white text
```
background: --color-primary-800
color: white
padding: 10px 20px
border-radius: --radius-md
font-size: 14px, weight 500
hover: background --color-primary-600
```

**Secondary** — white fill, indigo border + text
```
background: white
border: 1px solid --color-border-strong
color: --color-primary-800
hover: background --color-primary-50
```

**Accent CTA** — amber fill, dark text — used for the single most important CTA on a page
```
background: --color-accent-500
color: --color-text-primary
hover: background --color-accent-600
```

**Ghost** — transparent, muted text, border on hover only

### Card

```
background: --color-surface
border: 1px solid --color-border
border-radius: --radius-lg
padding: --space-8
box-shadow: --shadow-sm
hover: box-shadow --shadow-md, border-color --color-border-strong
transition: 200ms ease
```

Feature cards may use a `--color-primary-50` or `--color-accent-50` background tint
to add warmth without photography.

### Input / Form

```
background: white
border: 1px solid --color-border
border-radius: --radius-md
padding: 10px 14px
font-size: 14px
focus: border-color --color-primary-800, box-shadow --shadow-focus
placeholder color: --color-text-muted
```

### Badge / Tag

```
font-size: 12px, weight 500
letter-spacing: 0.04em
text-transform: uppercase
border-radius: --radius-sm
padding: 3px 8px
```

- **Default**: `--color-surface-muted` bg, `--color-text-secondary` text
- **Primary**: `--color-primary-100` bg, `--color-primary-800` text
- **Accent**: `--color-accent-200` bg, `--color-accent-600` text

### Navigation

```
background: rgba(250,250,250,0.85)
backdrop-filter: blur(12px)
border-bottom: 1px solid --color-border
height: 64px
padding: 0 24px
position: sticky top-0
```

Logo: wordmark "KarsaHub" — Inter 600, `--color-text-primary`, with a small amber dot
or underline accent on "Hub".

### Section Divider (Amber Accent)

A thin `2px` amber line (`--color-accent-500`) used as a decorative left-border on
section labels and feature callouts — the signature KarsaHub visual element.

---

## 7. Layout

- **Max content width**: `1200px`
- **Gutter (desktop)**: `24px` each side
- **Gutter (mobile)**: `16px` each side
- **Column grid**: 12-column, `24px` gap
- **Section vertical padding**: `80px` desktop / `48px` mobile

### Page Structure
```
[Sticky Nav]
[Hero — full width, ~80vh]
[Social Proof bar — logo strip]
[Services — 3-col card grid]
[How It Works — 3-step horizontal]
[Portfolio — masonry or 2-col grid]
[Testimonials — card carousel]
[Pricing — 3-tier table]
[CTA Banner — indigo bg, amber CTA button]
[Footer — dark bg --color-primary-950]
```

---

## 8. Motion & Interaction

- **Transition default**: `150ms ease`
- **Hover lift**: `transform: translateY(-2px)` on cards
- **Fade in on scroll**: `opacity 0→1, translateY 16px→0` over `400ms`
- **No bouncy or spring animations** — restrained, professional
- **Button press**: `transform: scale(0.98)` on active state

---

## 9. Voice & Visual Tone

- Clean sections separated by generous whitespace — never cluttered
- Amber accent appears maximum **2–3 times per page** as a signal, not wallpaper
- Photography / mockups use consistent soft shadows and `--radius-2xl` clipping
- Dark footer (`--color-primary-950`) anchors the page, creates closure
- Avoid gradients except for the hero section where a subtle
  `linear-gradient(135deg, #EEF2FF 0%, #FFFBEB 100%)` adds warmth without loudness

---

## 10. Dark Mode

Dark mode uses a **warm near-black** base — not pure `#000000` which feels harsh, but a
deep charcoal with a faint indigo undertone. Amber accent becomes the hero of the palette
on dark surfaces. All text contrast ratios must pass **WCAG AA minimum (4.5:1)** — most
hit AAA.

### Implementation

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* override light tokens below */
  }
}

/* Or via class for manual toggle */
[data-theme="dark"] { ... }
```

### Background & Surface

| Token                   | Light         | Dark          | Contrast Note                        |
|-------------------------|---------------|---------------|--------------------------------------|
| `--color-bg`            | `#FAFAFA`     | `#0C0C10`     | Warm near-black, slight indigo tint  |
| `--color-surface`       | `#FFFFFF`     | `#16161E`     | Card surface — lifted from bg        |
| `--color-surface-muted` | `#F4F4F5`     | `#1C1C26`     | Code blocks, tag backgrounds         |
| `--color-border`        | `#E4E4E7`     | `#2A2A35`     | Hairline borders                     |
| `--color-border-strong` | `#D4D4D8`     | `#3A3A48`     | Input focus, emphasized borders      |

### Text — Dark Mode

> ⚠️ Never use text below `#9CA3AF` on dark surfaces — fails contrast.

| Token                    | Dark Value    | Contrast on `#0C0C10` | Usage                          |
|--------------------------|---------------|-----------------------|--------------------------------|
| `--color-text-primary`   | `#F4F4F6`     | ~16:1 ✅ AAA          | Headings, primary body         |
| `--color-text-secondary` | `#A1A1B5`     | ~6.5:1 ✅ AA          | Supporting text, labels        |
| `--color-text-muted`     | `#6B6B80`     | ~3.8:1 ⚠️ use for large text only | Placeholders, disabled |
| `--color-text-inverse`   | `#111111`     | —                     | Text on light/amber surfaces   |

**Rule**: Body text always `--color-text-primary`. Never use `--color-text-muted` for
body copy or interactive labels in dark mode.

### Brand — Dark Mode Overrides

| Token                   | Light         | Dark          | Note                                  |
|-------------------------|---------------|---------------|---------------------------------------|
| `--color-primary-800`   | `#3730A3`     | `#6366F1`     | Brighter indigo — readable on dark    |
| `--color-primary-600`   | `#4F46E5`     | `#818CF8`     | Hover state                           |
| `--color-primary-100`   | `#E0E7FF`     | `#1E1B4B`     | Badge/tag background — flipped        |
| `--color-primary-50`    | `#EEF2FF`     | `#16143A`     | Hover tint — flipped                  |

### Accent — Dark Mode (Amber pops on dark)

| Token                   | Light         | Dark          | Note                                  |
|-------------------------|---------------|---------------|---------------------------------------|
| `--color-accent-600`    | `#D97706`     | `#F59E0B`     | More visible on dark — step up        |
| `--color-accent-500`    | `#F59E0B`     | `#FCD34D`     | Light gold — section markers          |
| `--color-accent-200`    | `#FDE68A`     | `#292010`     | Tag background — dark amber tint      |
| `--color-accent-50`     | `#FFFBEB`     | `#1A1508`     | Callout surface — very dark amber     |

### Shadows — Dark Mode

Shadows are nearly invisible on dark surfaces. Use **border + glow** instead.

| Token              | Dark Value                                              |
|--------------------|---------------------------------------------------------|
| `--shadow-xs`      | `0 1px 2px rgba(0,0,0,0.4)`                            |
| `--shadow-sm`      | `0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)` |
| `--shadow-md`      | `0 4px 6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)` |
| `--shadow-lg`      | `0 10px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)` |
| `--shadow-focus`   | `0 0 0 3px rgba(99,102,241,0.35)`                      |
| `--shadow-focus-accent` | `0 0 0 3px rgba(251,191,36,0.3)`                 |

### Dark Mode Component Notes

**Buttons**
- Primary: `#6366F1` bg → `#818CF8` on hover. Text: `#FFFFFF` — always white, never off-white.
- Accent CTA: `#F59E0B` bg → text `#111111` — dark text on amber, high contrast ✅
- Secondary: `--color-surface` bg, `--color-border-strong` border, `#6366F1` text

**Cards**
- Add `border: 1px solid --color-border` — cards must be distinguishable from `--color-bg`
- Hover: border shifts to `--color-border-strong`, no translateY shadow (barely visible anyway)

**Nav**
```
background: rgba(12,12,16,0.85)
backdrop-filter: blur(12px)
border-bottom: 1px solid --color-border
```

**Hero gradient — dark mode**
```css
background: linear-gradient(135deg, #16143A 0%, #1A1508 100%);
```
Deep indigo to deep amber — maintains brand warmth without blowing contrast.

**Footer**
- Dark mode footer: same `--color-primary-950` (`#1E1B4B`) — barely changes, already dark.
- Slightly lighten to `#141430` for more visible separation from page bg.

### Contrast Cheat Sheet (Dark Mode)

| Combination                              | Ratio   | Pass?       |
|------------------------------------------|---------|-------------|
| `#F4F4F6` text on `#0C0C10` bg          | ~16:1   | ✅ AAA      |
| `#A1A1B5` text on `#0C0C10` bg          | ~6.5:1  | ✅ AA       |
| `#6366F1` (indigo) on `#0C0C10` bg      | ~5.2:1  | ✅ AA       |
| `#F59E0B` (amber) on `#0C0C10` bg       | ~8.1:1  | ✅ AAA      |
| `#111111` text on `#F59E0B` amber btn   | ~12:1   | ✅ AAA      |
| `#FFFFFF` text on `#6366F1` indigo btn  | ~5.4:1  | ✅ AA       |
| `#6B6B80` muted on `#0C0C10` bg         | ~3.8:1  | ⚠️ large text only |

---

*KarsaHub — Mewujudkan karsa menjadi digital nyata.*
