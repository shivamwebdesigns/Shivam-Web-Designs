# Design System
# 02 / DESIGN_SYSTEM.md

## 1. Design Direction
- Style: Obsidian Minimal / Premium Editorial / Spatial High-Tech
- Mood: Meticulous, luxury digital craft, architectural precision, tactile physical depth.
- Design Principles:
  - Purposeful Motion: Animations serve spatial orientation and physical realism, never disorienting distraction.
  - Zero Slop: Zero purple gradients, zero generic emoji icons, zero fake reviews or counters.
  - Tactile Authenticity: Rich specular foil sheen, micro-grain paper textures, and realistic 3D edge extrusions.

## 2. Brand
- Brand Name: Shivam Web Designs
- Monogram: S/WD
- Logo: Official high-resolution transparent asset (`Brand Logo.PNG`)
- Brand Voice: Confident, direct, technical, architectural, client-focused.

## 3. Color Palette
```css
:root {
  /* Core Obsidian Palette */
  --bg: #050505;
  --bg-surface: #101012;
  --bg-card: #141416;
  --bg-elevated: #1a1a1e;
  
  /* Text & Ink */
  --ink: #f2f2f2;
  --ink-secondary: #c4c4c8;
  --mute: #8e8e93;
  --faint: #545458;
  
  /* Borders */
  --line: #26262b;
  --line-strong: #383842;
  
  /* Accent & Interactive */
  --accent: #3b82f6;          /* Cobalt Blue */
  --accent-hover: #60a5fa;
  --accent-glow: rgba(59, 130, 246, 0.25);
  
  /* Feedback */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

## 4. Typography
- Font Stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "DM Sans", "Segoe UI", Roboto, sans-serif`
- Monospace Stack: `"SF Mono", "Fira Code", Menlo, monospace`
- Hierarchy:
  - Display / Hero Title: `clamp(2.5rem, 5vw, 4.2rem)`, weight `700`, line-height `1.08`, tracking `-0.035em`
  - Section Headings (H2): `clamp(1.85rem, 3.5vw, 2.75rem)`, weight `700`, tracking `-0.025em`
  - Subheadings (H3): `1.35rem`, weight `600`, tracking `-0.02em`
  - Body Text: `0.9375rem - 1.0625rem`, line-height `1.65`, color `var(--ink-secondary)`
  - Meta / Badges: `0.75rem - 0.8125rem`, weight `600`, tracking `0.05em`, uppercase

## 5. Spacing
- Base Grid: `4px`
- Scale: `4px` / `8px` / `12px` / `16px` / `24px` / `32px` / `48px` / `64px` / `96px` / `128px`
- Container Max Width: `1280px` with responsive horizontal padding `clamp(16px, 4vw, 32px)`

## 6. Border Radius
- Small: `6px` (tooltips, small badges)
- Medium: `10px` (cards, inputs, dialogs)
- Large: `16px` (showcase containers, hero stages)
- Pill: `999px` (action buttons, channel links, navigation chips)

## 7. Shadows & 3D Lighting
```css
/* Elevation Shadows */
--shadow-subtle: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-elevated: 0 12px 32px -8px rgba(0, 0, 0, 0.65);
--shadow-modal: 0 32px 64px -16px rgba(0, 0, 0, 0.85);

/* 3D Card Contact Shadow */
.shadow {
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 75%);
  filter: blur(10px);
}
```

## 8. Buttons
- Primary Action: Dark cobalt background `#1d2538`, border `1px solid #3b82f6`, text `#93c5fd`, hover `#253352`, text `#fff`.
- Secondary Action: Glass background `rgba(22, 22, 26, 0.85)`, border `1px solid var(--line)`, text `var(--ink)`.
- Touch Targets: Minimum `44px` height and width for accessibility compliance.
- Focus States: Visible `2px solid var(--accent)` outline with `3px` offset.

## 9. Inputs & Forms
- Background: `rgba(16, 16, 18, 0.8)`
- Border: `1px solid var(--line)`, hover `var(--line-strong)`
- Focus: `outline: 2px solid var(--accent)`, border `transparent`
- Label: Distinct `font-size: 0.875rem`, weight `500`, uppercase tracking for required fields

## 10. 3D Card Textures & Extrusion
- Card Dimensions: Landscape `min(580px, 92vw)` by `calc(var(--w) / 1.75)`; Portrait `min(340px, 84vw)` by `calc(min(340px, 84vw) * 1.75)`.
- Card Thickness: `--t: 7.5px`.
- Core Paper Slabs (`.side`): Layered gradient `linear-gradient(180deg, #35353a, #121214)`.
- Specular Sheen (`.foil-sheen`): Sweeps with `--g` rotation angle using `mix-blend-mode: screen`.
- Micro-Grain Pattern (`.grain-overlay`): Inline SVG fractal noise with `mix-blend-mode: overlay` at `3.5%` opacity.

## 11. Navigation
- Desktop: Clean sticky glass bar with studio logo, link chips, and "Initiate Brief" CTA.
- Mobile: Smooth sliding drawer with safe area padding and large touch targets.

## 12. States
- Loading: Smooth pulse animations with subtle shimmer.
- Empty: Structured informational state with clear recovery action.
- Error: High-contrast error message with red border accent.
- Success: Green confirmation pill with instant action feedback.

## 13. Icons
- Standard: Crisp monochrome SVG icons only. Never use emoji characters as functional icons.
- Default Sizes: `16px` (controls), `18px` (nav & social channels), `22px` (feature icons).

## 14. Responsive Breakpoints
- Mobile Small: `< 480px`
- Mobile: `< 640px`
- Tablet: `640px` to `1024px`
- Desktop: `> 1024px`
- Wide Desktop: `> 1440px`

## 15. Accessibility (A11y)
- WCAG AA/AAA compliance across all text contrasts.
- Minimum touch target: `44px` on all interactive buttons and links.
- Keyboard Navigation: Full support for Arrow keys, Spacebar, Enter, and Escape.
- Semantic ARIA attributes on all custom 3D regions and dialog modals.
