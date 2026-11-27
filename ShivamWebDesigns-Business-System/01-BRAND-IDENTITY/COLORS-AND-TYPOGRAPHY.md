# ShivamWebDesigns — Colors and Typography System

This document specifies the authoritative design tokens, color palette, typography hierarchy, and spacing scale for all **ShivamWebDesigns** web projects, documents, proposals, and brand assets.

---

## 1. Monochromatic Color Palette

The SWD color palette is rooted in strict monochromatic balance, calibrated to deliver high legibility, timeless luxury, and WCAG AA / AAA contrast ratios.

### Primary Color Tokens

| Token Name | HEX Code | RGB | Role & Usage |
| :--- | :--- | :--- | :--- |
| **`--bg-canvas`** | `#000000` | `rgb(0, 0, 0)` | Root body background, absolute pitch black. |
| **`--bg-surface-0`** | `#050507` | `rgb(5, 5, 7)` | Inset containers, dialog bodies, dark canvas backdrop. |
| **`--bg-surface-1`** | `#0a0a0c` | `rgb(10, 10, 12)` | Primary card backgrounds, elevated module surfaces. |
| **`--bg-surface-2`** | `#141418` | `rgb(20, 20, 24)` | Pill badges, button states, hovered card layers. |
| **`--text-primary`** | `#ffffff` | `rgb(255, 255, 255)` | Headlines, major brand titles, primary button text. |
| **`--text-secondary`**| `#d4d4d8` | `rgb(212, 212, 216)` | Lead paragraph copy, subheadings, active pill text. |
| **`--text-muted`** | `#a1a1aa` | `rgb(161, 161, 170)` | Body text, feature descriptions, metadata notes. |
| **`--text-subtle`** | `#71717a` | `rgb(113, 113, 122)` | Eyebrow labels, timestamps, copyright disclaimers. |
| **`--border-subtle`** | `#1f1f23` | `rgba(255,255,255,0.08)`| 1px hairline card borders, structural dividers. |
| **`--border-active`** | `#3f3f46` | `rgba(255,255,255,0.2)` | Interactive focus states, hover borders, active tabs. |
| **`--accent-emerald`**| `#10b981` | `rgb(16, 185, 129)` | Live studio availability pulse dot only. |

---

## 2. Typography System

We pair an authoritative editorial serif for brand identity and headlines with a neutral, highly legible Swiss sans-serif for body copy and UI controls.

### Font Families
- **Display & Headings:** `Playfair Display`, `Georgia`, `Cambria`, or `serif` (Editorial authority, elegance)
- **Body & UI Interface:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` (Neutral, objective clarity)
- **Code & Metadata:** `JetBrains Mono`, `SFMono-Regular`, `Menlo`, `monospace` (Technical precision)

### Scale & Hierarchy

| Element | Font Family | Size | Weight | Tracking (Letter-Spacing) | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | Serif / Sans | $48\text{px} - 64\text{px}$ | Bold (700) | `-0.03em` | `1.1` |
| **Section H2** | Serif / Sans | $32\text{px} - 40\text{px}$ | Semi-Bold (600) | `-0.02em` | `1.2` |
| **Subheading H3**| Sans | $20\text{px} - 24\text{px}$ | Semi-Bold (600) | `-0.01em` | `1.3` |
| **Lead Paragraph**| Sans | $18\text{px}$ | Regular (400) | `0em` | `1.6` |
| **Body Copy** | Sans | $15\text{px} - 16\text{px}$ | Regular (400) | `+0.01em` | `1.65` |
| **Eyebrow Label**| Monospace | $12\text{px} - 13\text{px}$ | Medium (500) | `+0.08em` (Uppercase) | `1.4` |
| **Pill / Caption** | Monospace | $11\text{px} - 12\text{px}$ | Medium (500) | `+0.03em` | `1.4` |

---

## 3. Spacing & Border Standards

- **Border Radius:**
  - Micro pills / Badges: `999px` (Full capsule)
  - Cards & Containers: `16px` to `20px` (Modern softened corners)
  - Buttons: `999px` or `8px`
- **Border Style:**
  - Always `1px solid rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`. Never heavy bevels.
- **Elevation & Shadows:**
  - Standard Card: `box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);`
  - Floating Dialog: `box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.15);`
