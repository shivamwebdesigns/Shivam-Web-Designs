# ShivamWebDesigns (SWD)

> **Building Digital Experiences That Move Businesses Forward.**  
> Official agency platform and interactive digital portfolio for **ShivamWebDesigns** — an independent web design and development studio specializing in high-performance digital products, editorial typography, and bespoke web architecture.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-black?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-black?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-black?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PageSpeed](https://img.shields.io/badge/Lighthouse-95%2B%20Performance-emerald?style=flat&logo=lighthouse)](https://pagespeed.web.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

**Live Production URL:** [https://shivamwebdesigns.devs.li](https://shivamwebdesigns.devs.li)  
**Digital Business Card:** [https://shivamwebdesigns.devs.li/businesscard](https://shivamwebdesigns.devs.li/businesscard)

---

## 1. PageSpeed & Core Web Vitals Benchmarks

Audited directly via Google Lighthouse across mobile and desktop environments:

| Audit Category | Desktop Score | Mobile Score | Notes |
| :--- | :---: | :---: | :--- |
| **Performance** | **94 / 100** | **95 / 100** | Sub-second LCP, zero Cumulative Layout Shift |
| **Accessibility** | **100 / 100** | **100 / 100** | Full WCAG AA/AAA compliance, 7:1 contrast ratios |
| **Best Practices** | **100 / 100** | **100 / 100** | Modern security headers, HTTPS, zero deprecations |
| **SEO** | **100 / 100** | **100 / 100** | JSON-LD Schema, Google Search Console verification |

### Optimization & Motion Highlights
- **Zero Reflow Stacking:** Refined `SpatialStack` 3D card deck using `transform-gpu` and `will-change-transform` for fluid 60fps mobile scrolling without layout thrashing.
- **Quantitative Lighthouse Auditing:** Embedded audit metrics panel on Layer 04 highlighting verified 100/100 performance, 100/100 accessibility, sub-0.8s LCP, and zero CLS.
- **Hardware-Accelerated Motion:** GPU-accelerated cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`), smooth entrance keyframes (`fadeIn`, `slideUp`, `scaleUp`), and silky `.hover-elevate` physical micro-interactions.
- **Harmonized Vertical Rhythm:** Responsive section padding (`py-14 sm:py-20 lg:py-24`) across all studio routes eliminating abrupt dead whitespace on mobile viewports.
- **Strict Color Contrast:** All body, badge, and muted UI text calibrated to > 4.5:1 contrast ratio against `#050505` backgrounds.
- **Hierarchical Heading Order:** Clean semantic `h1` &rarr; `h2` &rarr; `h3` heading hierarchy across all page sections and the global footer.
- **Instant Touch Feedback:** `-webkit-tap-highlight-color: transparent` and haptic-like scale transitions (`active:scale-95`) for mobile navigation docks.

---

## 2. Brand & Design Philosophy

ShivamWebDesigns operates on a strict **monochromatic, editorial Swiss aesthetic**:

- **Strict Palette:** Pure black (`#000000`), stark white (`#ffffff`), and calibrated neutral greys (`#161616`, `#262626`, `#888888`).
- **Zero Slop:** No gratuitous purple gradients, no fake counters or inflated vanity metrics, no generic AI-generated templates.
- **Micro-Interactions:** Subtle, high-framerate animations and physics-driven 3D transforms that enhance readability rather than distract.
- **Engineered Performance:** Sub-second Core Web Vitals, fully responsive across mobile, tablet, and desktop viewports.

---

## 3. Site Map & Application Routes

| Route | File Location | Purpose & Features |
| :--- | :--- | :--- |
| **`/`** | `app/page.tsx` | **Agency Flagship Home:** Animated hero, hallmark metrics, services overview, transparent packages configurator, featured projects, 3D architecture stack, and inquiry intake. |
| **`/packages`** | `app/packages/page.tsx` &amp; `public/packages.html` | **Packages &amp; Pricing:** Native Next.js App Router &amp; static mirror with fixed-price tiers (Starter ₹499, Growth ₹999, Pro ₹1,499), compact introductory header spacing, unbundled modular add-ons, explicit arithmetic cart breakdown, hide/view cart toggle (`>`), existing site link input, and dual dispatch to WhatsApp and studio admin panel. |
| **`/pricing`** | `app/packages/page.tsx` | Native rewrite alias to `/packages`. |
| **`/about`** | `app/about/page.tsx` | **About the Studio:** Origin narrative, mission/vision bento grid, operating principles, and studio background. |
| **`/businesscard`** | `public/businesscard.html` | **Spatial 3D Digital Business Card:** Gyroscope- and drag-enabled 3D physical card simulation, vCard 3.0 generation, Web Share API, and QR download. |
| **`/license`** | `app/license/page.tsx` | **Legal Documentation & License Hub:** Consolidated, un-slopped dark mode legal architecture combining the **MIT License**, **Privacy Policy**, and **Terms of Service** with interactive tab switching. Linked in global footer as **Legal Documentation**. |
| **`/privacy`** | `app/privacy/page.tsx` | **Privacy Policy:** Transparent, minimal data collection terms with zero ad trackers, DPDP Act 2023, and GDPR compliance. |
| **`/terms`** | `app/terms/page.tsx` | **Terms of Service:** Direct studio engagement terms, milestone delivery schedule, 100% IP transfer upon settlement, and 30-day warranty. |
| **`/admin`** | `app/admin/page.tsx` | **Private Dashboard:** Google OAuth verified intake management for studio leads. |

---

## 4. UI Components & Interaction Features

- **Header & Mobile Ergonomics (`components/Navbar.tsx`):**
  - **Bespoke SWD Monogram (`/assets/swd-monogram.png`):** High-definition transparent RGBA monogram mark engineered with mathematical alpha transparency and 100% white luminance curve. Seamlessly blends into transparent hero states, sticky frosted-glass headers (`bg-neutral-950/85 backdrop-blur-xl`), and dark footer canvases with zero letterbox edges or black box artifacts.
  - **Brand Logotype & Monogram Symbol Integration:** High-definition transparent RGBA monogram symbol paired with crisp typographic brand lettering (`ShivamWebDesigns • Digital Studio`) in the header, delivering seamless recognition and pristine visual balance across both mobile and desktop viewports.
  - **Mobile Inquire Button & 44px Touch Targets:** Strictly compliant with WCAG 2.2 AA minimum touch target sizes (`min-h-[44px]`), styled with crisp Swiss monospace typography (`text-xs font-semibold uppercase tracking-wider font-mono`), subtle directional arrow (`ArrowUpRight`), active tactile haptic scaling (`active:scale-95`), and comfortable spacing (`gap-2 sm:gap-2.5`).
  - **Animated Mobile Hamburger Trigger:** 44×44px interactive button with smooth 90-degree rotational micro-animation (`rotate-90`), frosted dark glass background (`bg-neutral-900/70`), and robust accessibility announcements (`aria-expanded`, `aria-label`).
  - **Global Header Cart Trigger:** Dedicated Cart action button with real-time numeric counter pill in the desktop header and mobile action bar, allowing instant one-click opening of "Your Cart" from any page on the platform.
  - **Desktop Navigation Micro-Interactions:** Rounded navigation pills with smooth background transitions, active route badges, and an elevated "Start a Project" CTA with hover offset animation.
  - **Footer Monogram Integration (`components/Footer.tsx`):** Identical transparent HD monogram mark with calibrated clear space, accessible focus rings, and high-contrast typography.
- **Studio Manifesto & Mobile Scroll Animation Engine (`components/StudioManifesto.tsx` & `globals.css`):**
  - **Word-by-Word Scroll Reveal:** Dynamically reveals the studio manifesto from opacity 0.15 to 1.0 with subtle upward translation (`translate3d`), with highlighted emerald keywords (`hand-built`, `lightning-fast`).
  - **Touch-Optimized Mobile Viewport Range:** Calibrated trigger zone (`0.95` to `0.18` viewport height) and `0.12` responsive lerp loop ensuring fluid tracking during fast touch momentum scrolling without lagging or freezing.
  - **WebKit Hardware Optimization:** Lightweight conditional blur transition (`filter: blur(...)` bypassed when near-zero) preventing GPU layer thrashing on mobile Safari/WebKit.
  - **Hardware-Accelerated Animated Scroll Line:** 2px rounded indicator track with moving emerald pulse highlight (`#34d399`), isolated compositing layer (`isolation: isolate`, `-webkit-mask-image`), and GPU keyframe animation running at 60fps/120fps across all mobile and desktop screens. Respects `prefers-reduced-motion`.
- **Packages & Fixed Pricing Architecture (`/packages`, `/pricing`, & Embedded on `/`):**
  - **Global Live Screen Cart Architecture (`components/GlobalCart.tsx`):** Mounted globally in root layout (`app/layout.tsx`), the Cart Widget and "Your Cart" window modal are live across every single route on the platform (Home, Packages, Services, Projects, About, Contact). Toggling packages or add-ons immediately synchronizes the global cart across all tabs and routes in real time via localStorage (`swd-cart`) and custom browser events.
  - **Movable Desktop Screen-Locked Cart Widget:**
    - **Live Screen Fixed Docking:** Pinned to the live screen viewport (`position: fixed; z-index: 9990;`). When the user scrolls anywhere on the page, the widget stays permanently anchored on the screen and never scrolls out of view.
    - **Draggable Physics & Viewport Bounds:** Equipped with a tactile drag handle (`GripVertical`, `cursor-grab` / `cursor-grabbing`). Users can reposition the widget anywhere across the desktop display; coordinates are clamped safely inside the screen with 16px margins and automatically persisted to `sessionStorage`.
    - **Scroll & Event Isolation:** Styled with `overscroll-behavior: contain` and wheel event stop-propagation, preventing mouse wheel movements over the widget from inadvertently scrolling the background page.
  - **Mobile-Elevated Dock Alignment:**
    - On mobile viewports, the widget is anchored at `bottom-20 left-3 right-3` (`80px` from bottom), perfectly clearing the mobile navigation dock (`MobileDock`, `bottom-0`, height ~56px) with zero overlapping or blocked touch targets.
  - **Widget Action Buttons:** Equipped with two high-contrast action triggers:
    1. **"View Cart"**: Opens the dedicated "Your Cart" window modal.
    2. **"Inquire"**: Direct checkout with contact validation and dual WhatsApp / studio API dispatch.
  - **Dedicated "Your Cart" Window Modal:** Accessible from both the floating widget and the header navigation Cart button. Features an elegant right-side slide-in drawer panel (enters from the right edge, page background visible and interactive behind it), body-scroll lock (`document.body.style.overflow = 'hidden'`), and a tall full-height internally scrollable container (`overflow-y-auto overscroll-contain flex-1`):
    - **Header Controls:** Real-time item count pill, a prominent **"Clear Cart"** button (which discards all items, empties the local DB, closes the window, and removes the floating widget), and a close button.
    - **Itemized Breakdown:** Package card and individual modular add-on rows with active `+` / `−` quantity counters and `✕` delete buttons.
    - **Client Contact Form:** Name, Email, and Phone/WhatsApp fields with instant validation and persistent Local DB auto-saving (`swd-client-profile`).
    - **Existing Website Link Integration:** Direct URL input field for redesign or add-on auditing with automatic local persistence.
    - **Explicit Arithmetic Breakdown:** Clear order math (`Package` + `+ Add-ons` − `Offers applied` = `Total Amount`).
    - **Sticky Action Bar:** Real-time payable summary and high-priority **"Send Cart on WhatsApp"** checkout action.
  - **Unconstrained Full-Width Main Layout:** Removed the cramped inline sidebar cart that previously compressed package cards when items were selected. The 3 package tiers permanently occupy an expansive 3-column grid (`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8`) with full-width modular add-ons and FAQ accordion on both desktop and mobile viewports.
- **The 3D Architecture Stack & Interactive Physics (`components/SpatialStack.tsx`):**
  - **Interactive 3D Miniature Physics:** Hardware-accelerated CSS 3D business card preview responding to pointer and touch gestures. Moving the cursor or dragging across the preview tilts the card in real-time Euler angles (`rotateX`, `rotateY`), displaying live telemetry (`ROTATION: [R_x, R_y]`). Resumes autonomous floating keyframe physics (`cardFloat3D`) when idle.
  - **Mobile Sticky Deck Optimization:** Sticky card top offsets calibrated to `top: calc(clamp(56px, 8vw, 76px) + ${(layer.index - 1) * 12}px)` to prevent sticky cards from obscuring mobile headers during deep section scrolling.
  - **Standardized Container Gutters:** Balanced `px-4 sm:px-6 lg:px-8` horizontal gutters across all section containers (`WhyChooseUs`, `WorkingProcess`, `FounderPreview`, `ServicesSection`, `SpatialStack`) for uniform mobile reading flow.
  - **Persistent Local DB Storage:** Dual-layer browser persistence (`swd-client-profile` & `swd-cart`) that permanently remembers and auto-fills client inputs (Full Name, Email Address, Phone Number, and Existing Website Link) across sessions, page reloads, and tab closures.
  - **Fixed-Price Tiers:** Starter (₹499 &bull; digital profile page), Growth (₹999 &bull; one-page website with inquiry form and basic SEO), Pro (₹1,499 &bull; multi-page architecture up to 3 pages with analytics, speed tuning, and glowing white highlights).
  - **Refined Packages Positioning & Header:** Positioned with the authoritative headline **"Website Packages Starting at ₹499"** and clear description (*"Flexible solutions for businesses, creators and growing brands. Choose a package that fits your goals."*), followed by the clean typographic eyebrow `PACKAGES // FIXED PRICES` sitting directly atop the packages deck.
  - **Unbundled Modular Add-ons:** Clean, direct add-on list for Subdomain setup (from ₹149 &bull; free with Pro), Logo design (₹99), Copywriting (₹199/page), Extra revisions (₹199), Extra page (₹299), Monthly maintenance (₹299/month).
  - **Calibrated Vertical Spacing:** Normalized section boundary padding between `02 // THE 3D ARCHITECTURE STACK` and `03 // PRODUCTION AUDIT STANDARD` (`pb-4 sm:pb-6` on stacking container and `pt-10 sm:pt-14` on audit section), eliminating void whitespace gaps on mobile and desktop.
  - **Order Review Modal & Dual-Dispatch Submissions:** Cart orders trigger an animated status modal with loading spinner ("Reviewing Your Order…"), direct WhatsApp dispatch with popup blocker fallback button, 24–48h review notice, social channel access, and background Firestore admin logging.
  - **Global URL Order State Notifications (`?order=success` & `?order=cancel`):**
    - `/?order=success`: Shows a sleek emerald-green notification banner stating *"Your order was placed successfully! Wait for 24–48 hours, we'll be reaching out soon"* with a **Buy Again** button.
    - `/?order=cancel`: Shows a sleek crimson-red notification banner stating *"Your order was cancelled successfully"* with a **See Your Cart** button.
  - **Full Layout Parity:** Packages is now a native App Router page (`app/packages/page.tsx`) with the unified `<Navbar />`, `<Footer />`, and `<MobileDock />`, perfectly matching the rest of the studio.
  - **Enhanced FAQ Accordion:** Clean, accessible disclosure cards with silky smooth rotation indicators (`rotate-180`) and animated fade-in disclosure (`animate-fade-in`).
  - **Silky Spring Animations & Micro-Interactions:** Built with Apple/iOS standard spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) for card lift, drawer entrance, and state transitions, operating strictly with GPU acceleration (`transform-gpu`, `translate3d`).
  - **Interactive Performance Inspection:** Built-in dual-mode inspection on the 3D Architecture Stack allowing visitors to toggle between the 7-Step Mobile Core Web Vitals protocol and quantitative Lighthouse audit metrics.
- **Projects Architecture (`/projects` & Homepage):**
  - **Projects Updating Soon:** The Projects page and homepage feature clearly state “Projects are updating soon!” with transparent notice text about client case studies and digital flagships undergoing strict documentation and clearance.
  - **Streamlined Layout & Engineering Standards:** Clean presentation showcasing core engineering guarantees (100% Bespoke Code, < 1.2s Core Web Vitals, Direct Founder Access, and Transparent Milestones) paired with direct project brief kickoff CTAs.
- **Inquiry CTA Trust Bar (`components/InquiryCTA.tsx`):**
  - Responsive inline trust pillars (`Direct Founder Access / Zero Outsourcing / Fixed Price Sprints / Sub-Second Performance`) with responsive separators avoiding awkward line wrapping on mobile.
- **Global Back-to-Top Button (`components/BackToTop.tsx`):** Unobtrusive floating control with passive scroll detection (`scrollY > 300`), smooth window scrolling, frosted dark glass styling (`bg-neutral-900/90 backdrop-blur-md`), and mobile dock offset.
- **Browser Tab & Taskbar Branding:**
  - Simplified titles: `Page | ShivamWebDesigns` (`Home | ShivamWebDesigns`, etc.).
  - Multi-resolution `favicon.ico` containing 16×16, 32×32, 48×48, and 256×256 layers.
  - Dedicated PNG favicons (`16x16`, `32x32`, `48x48`, `180x180`, `512x512`) with active cache-busting queries (`?v=5`).
  - Native Next.js App Router icon routes: `/icon.png` and `/apple-icon.png`.
- **Spatial 3D Business Card & Premium Sharing:** Pure CSS 3D transform matrix with interactive flip, lighting highlights, icon-only back navigation, and upgraded **Share Card** functionality delivering a high-resolution vertical portrait PNG combining both card sides (front at top, back at bottom) on matte black, with Web Share API file sharing, clean domain text links (`shivamwebdesigns.devs.li/businesscard` and `shivamwebdesigns.devs.li`) engineered to prevent duplicate chat rich preview bubbles (guaranteeing exactly one image attachment at the top of the shared message), download fallback, and formatted invitation message.
- **GitHub Repository Social Media Preview:** Dedicated 1280×640px custom social preview asset at [public/assets/github-social-preview.png](public/assets/github-social-preview.png) matching GitHub's recommended 2:1 aspect ratio, featuring the SWD monogram mark, monochrome Swiss framing, live tech stack badges, and automated regeneration via `node scripts/generate-social-preview.mjs`.

---

## 5. Strict Identity Separation Protocol

To preserve operational professionalism, company channels and personal founder credentials are strictly separated:

### Studio Channels (ShivamWebDesigns)
- **Website:** [https://shivamwebdesigns.devs.li](https://shivamwebdesigns.devs.li)
- **Business Card:** [https://shivamwebdesigns.devs.li/businesscard](https://shivamwebdesigns.devs.li/businesscard)
- **GitHub:** [https://github.com/shivamwebdesigns](https://github.com/shivamwebdesigns)
- **LinkedIn:** [https://www.linkedin.com/company/shivamwebdesigns/](https://www.linkedin.com/company/shivamwebdesigns/)
- **Instagram:** [https://www.instagram.com/shivamwebdesigns/](https://www.instagram.com/shivamwebdesigns/)
- **Email:** `shivamwebdesigns23@gmail.com`

### Founder Channels (Shivam Purohit)
- **Public Title:** Founder &amp; CEO of ShivamWebDesigns
- **LinkedIn:** [https://www.linkedin.com/in/purohit-bhagyesh-193766413/](https://www.linkedin.com/in/purohit-bhagyesh-193766413/)
- **GitHub:** [https://github.com/PurohitBhagyesh](https://github.com/PurohitBhagyesh)
- **Instagram:** [https://www.instagram.com/purohitshivam23/](https://www.instagram.com/purohitshivam23/)
- **WhatsApp:** [https://wa.me/917861965480?s=p](https://wa.me/917861965480?s=p)
- **Email:** `purohitunofficialbhagyesh@gmail.com`

*All global links are managed in [data/siteConfig.ts](data/siteConfig.ts) to guarantee centralized consistency.*

---

## 6. Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **UI Library:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom typography and monochrome palette
- **Iconography:** Hand-crafted inline SVG icons & Lucide React
- **Email Dispatch:** [Resend](https://resend.com/) API integration
- **Hosting & Edge Routing:** [Vercel](https://vercel.com/) with edge caching and static prerendering
- **PWA & Offline:** Dual PWA Web Manifest architecture:
  - Studio Website (`site.webmanifest`): Standalone mobile web application with name `ShivamWebDesigns` (`SWD`) and crisp 512×512 / 180×180 maskable icons.
  - Digital Business Card (`businesscard.webmanifest`): Dedicated standalone card launcher named `SWD Card` with direct start URL `/businesscard` and custom icon set.
  - Offline Service Worker (`sw.js`) and cross-platform "Add to Home Screen" prompts (`IOSInstallPrompt.tsx`).
- **SEO & Search Console:** Pre-configured `google5fefb455a4f252a7.html` verification and JSON-LD structured schemas

---

## 7. Local Development

### Prerequisites
- Node.js 18.18.0 or newer
- npm 9.0.0 or newer

### Installation

```bash
# Clone the repository
git clone https://github.com/shivamwebdesigns/Shivam-Web-Designs.git
cd Shivam-Web-Designs

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Quality Verification & Production Build

```bash
# Type check without emitting files
npx tsc --noEmit

# Production build and static prerendering
npm run build
```

---

## 8. License & Intellectual Property

- **Source Code:** Distributed under the [MIT License](LICENSE).
- **Brand Assets & Media:** All logos, trademarks, studio photography, and proprietary brand graphics are protected under [ASSET_RIGHTS.md](ASSET_RIGHTS.md) and may not be reproduced without written consent.

---

© 2026 **ShivamWebDesigns**. All rights reserved.
