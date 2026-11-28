# Frontend Specification (FES)
**Project:** Shivam Web Designs Studio Platform  
**Design System:** Dark Luxury Minimalism / Swiss Technical Modernism  
**Styling Framework:** Tailwind CSS v3.4+ / Next.js 15 Font Architecture  
**Target Browsers:** Safari 16+, Chrome 110+, Firefox 115+, Edge 110+, iOS Safari 15+  

---

## 1. Visual Design Philosophy & Aesthetics

The Shivam Web Designs frontend architecture embodies **Dark Luxury Minimalism** combined with **Swiss Modernist Typographic Discipline**:
1. **Pitch-Black Canvases:** Pure `#000000` background establishes immediate visual depth, eliminating ocular fatigue and maximizing contrast.
2. **Monochrome Hierarchy:** Content structure is established through subtle shades of neutral grays and zincs rather than loud colors or arbitrary gradients.
3. **Purposeful Micro-Accents:** Color is applied strictly for functional status signaling:
   - **Emerald (`#34d399`):** Live operational telemetry, active verified badges, affirmative status indicators, and pricing highlights.
   - **Rose (`#f87171`):** Required field markers (`*`), validation error messages, and destructive action triggers (e.g., Clear Cart).
4. **Zero Aesthetic Slop:** Strict prohibition of stock emojis, generic pastel blobs, floating decorative circles, and artificial customer counters.

---

## 2. Typography Token System

Typography is driven by Next.js Google Fonts with automated local subset preloading and zero-layout-shift font metrics:

| Token Name | Font Family | Fallback Stack | Primary Role | Weight & Tracking |
| :--- | :--- | :--- | :--- | :--- |
| `var(--font-sans)` | **Inter** | `system-ui, -apple-system, sans-serif` | Primary narrative copy, headlines, body text, hero titles | 400 (Regular), 600 (Semibold), 800 (Extrabold) |
| `var(--font-mono)` | **JetBrains Mono** | `ui-monospace, SFMono-Regular, Menlo, monospace` | Eyebrow badges, metrics, currency values, code snippets, timestamps | 400 (Regular), 500 (Medium), 700 (Bold); `tracking-widest` |

### Typographic Hierarchy Examples
- **Hero Display:** `text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white`
- **Section Eyebrow:** `text-xs font-mono font-bold uppercase tracking-widest text-neutral-400`
- **Section Heading:** `text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white`
- **Body Prose:** `text-sm sm:text-base text-neutral-400 leading-relaxed font-sans`
- **Currency & Pricing:** `font-mono font-extrabold text-white text-xl sm:text-2xl`

---

## 3. Color Palette & Contrast Standards (WCAG 2.1 AA)

```
CANVAS BASE:
  Black:         #000000  (Primary background)
  Surface-950:   #0a0a0a  (Elevated cards, drawers, modal shells)
  Surface-900:   #171717  (Interactive elements, button backgrounds)

BORDERS & DIVIDERS:
  Border-800:    rgba(38, 38, 38, 0.8)   (Hairline card boundaries)
  Border-700:    rgba(64, 64, 64, 0.8)   (Hover state highlights)

TEXT VALUES:
  White:         #ffffff  (Headlines, active labels; Contrast > 15:1)
  Neutral-300:   #d4d4d4  (High-readability secondary copy; Contrast > 9:1)
  Neutral-400:   #a3a3a3  (Standard body text; Contrast > 6.5:1)
  Neutral-500:   #737373  (Metadata, minor timestamps; Contrast > 4.5:1)
  Neutral-600:   #525252  (Subtle placeholders and scope labels)

FUNCTIONAL ACCENTS:
  Emerald-400:   #34d399  (Status signals, active pills, live badges)
  Rose-400:      #f87171  (Required asterisks, input errors, deletions)
```

---

## 4. Component Interaction & Layout Specifications

### 4.1 Global Slide-Over Drawer ("Your Orders")
- **Viewport Anchor:** Fixed slide-in drawer anchored at `right-0 top-0 bottom-0` with width `w-full sm:w-[460px]`, `z-index: 9999`, and deep ambient shadow (`box-shadow: -24px 0 80px rgba(0,0,0,0.9)`).
- **Native Scrolling Engine:**
  - Container uses `flex-1 min-h-0 overflow-y-auto overscroll-contain` with `-webkit-overflow-scrolling: touch` and `touch-action: pan-y`.
  - Zero custom wheel/touch event interception to guarantee native trackpad momentum on macOS Safari and 120Hz ProMotion touch scrolling on iOS.
- **Responsive Contact Grid (`sm:grid-cols-2`):**
  - **Row 1:** `Full Name <span className="text-red-400">*</span>` (left) & `Phone / WhatsApp <span className="text-red-400">*</span>` (right).
  - **Row 2:** `Email Address <span className="text-red-400">*</span>` (full width).
  - **Row 3:** `Existing Website (Optional)` (full width).
- **Floating Scroll-Down Action Pill:**
  - Floats at `absolute bottom-3` right above the fixed footer whenever content extends below the fold.
  - Clicking triggers smooth programmatic advance (`scrollBy({ top: 220, behavior: 'smooth' })`).
  - Fades out automatically once user reaches the bottom of the drawer.
- **Interactive Remember Details Tick Button:**
  - Checkbox toggle with emerald active state (`bg-emerald-500 border-emerald-400 text-black`) and label `"Remember my details for next visit"`.
  - Directly syncs and manages persistent profile entries in `localStorage`.

### 4.2 Interactive 3D Business Card Physics Engine (`/businesscard`)
- **Spatial Geometry:** Dual-face container with `preserve-3d`, extruded paper core thickness (`translateZ(2px)` and `translateZ(-2px)`), metallic specular sheen, and ground ambient shadow.
- **Manual Drag Interaction:** Pointer coordinates are tracked with multi-touch capture (`setPointerCapture`) and translated into Euler angles:
  $$\text{Target } R_x = \text{clamp}\left(-\frac{Y_{delta}}{2.5}, -35^\circ, 35^\circ\right)$$
  $$\text{Target } R_y = \text{clamp}\left(\frac{X_{delta}}{2.5}, -45^\circ, 45^\circ\right)$$
- **Mobile Gyroscope Mechanics:** Physical device orientation (`deviceorientation`) listens to `beta` and `gamma` Euler shifts, smoothly interpolating real-time 3D tilt without requiring touch interaction.
- **Inertial Decay:** Releasing pointer triggers a 60fps damped harmonic return loop to neutral float position.

### 4.3 Mobile Navigation Dock (`components/MobileDock.tsx`)
- Fixed bottom dock (`bottom-0 left-0 right-0 z-50 md:hidden`) with glassmorphism backdrop blur (`backdrop-blur-xl bg-black/80`).
- Safe-area bottom padding (`paddingBottom: env(safe-area-inset-bottom, 8px)`) to clear iPhone home indicator.
- Fast one-tap navigation to Home, Packages, Projects, Founder, and Orders Drawer.

---

## 5. Mobile iOS Standalone Web App Guidelines (PWA)

1. **Dynamic Island & Notch Avoidance:** Top navigation applies `paddingTop: max(0.85rem, env(safe-area-inset-top, 0px))` so studio logos and cart buttons never clip behind the Dynamic Island.
2. **Prevent Safari Link Breakout:** Internal anchor clicks run through a synthetic navigation trap preventing iOS from launching Safari browser tabs:
   ```typescript
   if (window.navigator.standalone && href.startsWith('/')) {
     e.preventDefault();
     window.location.href = href;
   }
   ```
3. **Touch-Action Manipulation:** Critical touch targets (`button, a, input, select`) specify `touch-action: manipulation` to eliminate the 300ms mobile tap delay.
