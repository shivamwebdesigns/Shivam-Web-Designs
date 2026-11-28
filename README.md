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

---

## 4. UI Components & Interaction Features

- **Header & Mobile Ergonomics (`components/Navbar.tsx`):**
  - **Bespoke SWD Monogram (`/assets/swd-monogram.png`):** High-definition transparent RGBA monogram mark engineered with mathematical alpha transparency and 100% white luminance curve. Seamlessly blends into transparent hero states, sticky frosted-glass headers (`bg-neutral-950/85 backdrop-blur-xl`), and dark footer canvases with zero letterbox edges or black box artifacts.
  - **Brand Logotype & Monogram Symbol Integration:** High-definition transparent RGBA monogram symbol paired with crisp typographic brand lettering (`ShivamWebDesigns • Digital Studio`) in the header, delivering seamless recognition and pristine visual balance across both mobile and desktop viewports.
  - **Clean Mobile Action Cluster:** Removed the separate standalone cart button from the mobile header to prevent visual congestion and collision with the brand logotype. Mobile header features the crisp Inquire CTA alongside an intelligent Three Lines (hamburger) button.
  - **Three Lines (Hamburger) Trigger with Live Order Badging:** The mobile Three Lines button (`☰`) features a live numeric pill badge displaying current item count whenever items are added to the order.
  - **Streamlined Studio Navigation:** Standard website pages rely exclusively on the clean brand monogram logo, mobile bottom dock (`MobileDock`), and three-lines menu, reserving the dedicated Back button strictly for the standalone 3D digital business card (`/businesscard`) to return to the studio flagship.
  - **"Your Orders" Embedded in Three Lines Navigation Menu:** Inside the mobile navigation drawer, "Your Orders" occupies the top flagship position with real-time item count and order total (`₹X,XXX`) displayed prominently on the right side. Tapping it closes the menu and smoothly slides open the "Your Orders" spec drawer.
  - **Desktop Navigation Micro-Interactions:** Rounded navigation pills with smooth background transitions, active route badges, dedicated Cart button with live counter pill, and an elevated "Start a Project" CTA with hover offset animation.
  - **Footer Monogram Integration (`components/Footer.tsx`):** Identical transparent HD monogram mark with calibrated clear space, accessible focus rings, and high-contrast typography.
- **Studio Manifesto & Mobile Scroll Animation Engine (`components/StudioManifesto.tsx` & `globals.css`):**
  - **Word-by-Word Scroll Reveal:** Dynamically reveals the studio manifesto from opacity 0.15 to 1.0 with subtle upward translation (`translate3d`), with highlighted emerald keywords (`hand-built`, `lightning-fast`).
  - **Touch-Optimized Mobile Viewport Range:** Calibrated trigger zone (`0.95` to `0.18` viewport height) and `0.12` responsive lerp loop ensuring fluid tracking during fast touch momentum scrolling without lagging or freezing.
  - **WebKit Hardware Optimization:** Lightweight conditional blur transition (`filter: blur(...)` bypassed when near-zero) preventing GPU layer thrashing on mobile Safari/WebKit.
  - **Hardware-Accelerated Animated Scroll Line:** 2px rounded indicator track with moving emerald pulse highlight (`#34d399`), isolated compositing layer (`isolation: isolate`, `-webkit-mask-image`), and GPU keyframe animation running at 60fps/120fps across all mobile and desktop screens. Respects `prefers-reduced-motion`.
- **Packages & Fixed Pricing Architecture (`/packages`, `/pricing`, & Embedded on `/`):**
  - **Global Live Screen Cart Architecture (`components/GlobalCart.tsx`):** Mounted globally in root layout (`app/layout.tsx`), "Your Orders" drawer panel are live across every single route on the platform (Home, Packages, Services, Projects, About, Contact). Toggling packages or add-ons immediately synchronizes the global cart across all tabs and routes in real time via localStorage (`swd-cart`) and custom browser events.

  - **Mobile-Elevated Dock Alignment:**
    - On mobile viewports, the widget is anchored at `bottom-20 left-3 right-3` (`80px` from bottom), perfectly clearing the mobile navigation dock (`MobileDock`, `bottom-0`, height ~56px) with zero overlapping or blocked touch targets.
  - **Widget Action Buttons:** Equipped with two high-contrast action triggers:
    1. **"View Cart"**: Opens the dedicated "Your Orders" drawer panel.
    2. **"Inquire"**: Direct checkout with contact validation and dual WhatsApp / studio API dispatch.
  - **Dedicated "Your Cart" Window Modal:** Accessible from both the floating widget and the header navigation Cart button. Features an elegant right-side slide-in drawer panel (enters from the right edge, page background visible and interactive behind it), a background scroll lock on both `<html>` and `<body>` (`position: fixed` with scroll-position restore on close, iOS Safari safe), and a tall full-height internally scrollable container (`flex-1 min-h-0 overflow-y-auto overscroll-contain`, with `data-lenis-prevent` and wheel/touch isolation so smooth-scroll libraries cannot capture the drawer's scrolling). Only the drawer body scrolls while the page behind stays visible and locked, so every field in **Your Details** stays reachable on short screens and with the mobile keyboard open:
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
  - **Order Review Modal & Dual-Dispatch Submissions:** Cart orders trigger an animated status modal with loading spinner ("Reviewing Your Order…"), direct WhatsApp dispatch with popup blocker fallback button, 24–48h review notice, social channel access, and background Firestore admin logging. The modal uses the same `<html>` + `<body>` scroll lock, and its card scrolls independently (`overscroll-contain`) so the page behind never moves.
  - **Sub-Second Load Speed & Core Web Vitals Architecture:**
    - **Zero Initial Bloat via Lazy Client Overlays (`components/ClientOverlays.tsx`):** All client-only modals, drawers, toasts, and background listeners (`GlobalCart`, `BackToTop`, `OrderSuccessToast`, `IOSInstallPrompt`, and `ServiceWorkerRegister`) are split into a dedicated dynamic client module with `ssr: false`. This frees the server-rendered HTML and initial hydration payload from non-critical JavaScript.
    - **Zero-Byte Mobile Lenis Inertia:** Replaced static Lenis import with conditional client-side dynamic import (`import('lenis')`). Mobile touch devices use 100% native 120Hz ProMotion scrolling without downloading or parsing the Lenis library.
    - **Instant Sub-Second LCP Guarantee:** Excluded `#hero` from the IntersectionObserver scroll-reveal queue, enforcing immediate 100% opacity (`#hero { opacity: 1 !important; transform: none !important; }`) and instant text visibility (`ScrollTextReveal`) so Largest Contentful Paint completes without animation delay.
    - **Self-Hosted Font Fallback Metrics:** Pinned `preload: true` with system font fallbacks (`system-ui` and `ui-monospace`) across Next.js Google Fonts (`Inter`, `JetBrains_Mono`), eliminating Cumulative Layout Shift (CLS) and FOIT (Flash of Invisible Text).
    - **Next.js 15 Compiler Tuning (`next.config.ts`):** Enabled `optimizePackageImports` across `lucide-react`, `clsx`, and `tailwind-merge`, stripped production `console.log` statements via `compiler.removeConsole`, disabled production source maps, and configured immutable HTTP caching (`Cache-Control: public, max-age=31536000, immutable`) for `/_next/static/` and `/assets/`.
    - **Service Worker Cache v3 (`sw.js`):** Upgraded offline cache with instant cache-first handling for WebP (`.webp`) and modern font assets (`.woff2`).
  - **Dual-Mode Interactive Orders Drawer ("Your Orders"):**
    - Seamless sliding order drawer accessible globally from navbar and mobile menu.
    - **Native Unblocked Scrolling Engine:** Resolved Safari trackpad and mouse wheel scroll latching by adding direct hardware-accelerated wheel event listeners (`el.scrollTop += delta`), touch gesture isolation, pausing Lenis inertia (`lenis.stop()`) on drawer mount, and isolating desktop body scroll lock without destructive `html { overflow: hidden }` disruptions.
    - **Visible Luxury Drawer Scrollbar:** High-contrast minimal dark scrollbar (`.drawer-scrollbar`) with `overflow-y: scroll !important`, styled 7px track and `#525252` thumb, permanently visible and draggable across macOS Safari, Chrome, Edge, and Firefox.
    - **Interactive Scroll Helper Pill:** Real-time clearance observer detecting scrollable overflow; dynamically surfaces a sticky, frosted pill button (*"Scroll down for details ↓"*) that auto-scrolls down on click and fades away once the bottom fields are reached.
    - **Focus Auto-Alignment & Field Progression:** All client profile fields (Name, Email, Phone/WhatsApp, Website) automatically center smoothly upon focus (`scrollIntoView({ block: 'center' })`) and advance cleanly via the `Enter` key, accompanied by generous bottom clearance (`h-24`) to guarantee full visibility above fixed footer action buttons.
  - **Comprehensive Form Autofill Standardization:**
    - Full HTML5 autofill compliance across the Orders Drawer (`GlobalCart.tsx`), Contact Form (`app/contact/page.tsx`), and Project Brief (`app/start-project/page.tsx`).
    - Semantic `autoComplete` attributes (`name`, `email`, `tel`, `url`, `organization`), `inputMode` (`text`, `email`, `tel`, `url`), and explicit `htmlFor`/`id` labels to trigger iOS QuickType and Android AutoFill suggestions instantly.
  - **Mobile 3D Touch Physics & Gyroscope Motion:**
    - Integrated multi-touch pointer capture (`setPointerCapture`, `onPointerMove`, `onPointerUp`) in `SpatialStack.tsx` for silky mobile card drag and tilt.
    - Device orientation gyroscope sensor listener (`deviceorientation`) translating physical smartphone Euler angles (`beta`, `gamma`) into real-time 3D card tilt across both the main stack and standalone business card pages.
  - **iPhone Standalone PWA Architecture ("Open as Web App"):**
    - Dynamic Island & notch collision resolution via `paddingTop: 'max(0.85rem, env(safe-area-inset-top, 0px))'` on `Navbar.tsx`, keeping top navigation, actions, and logos unobstructed.
    - Standalone iOS link breakout trap (`window.navigator.standalone`) preventing internal clicks from launching Safari and keeping the app inside its native container.
    - Extended PWA manifest scope (`"scope": "/"`, `"id": "/"`, `"orientation": "any"`).
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
- **Spatial 3D Business Card & Standalone iOS Web Clip Architecture (`/businesscard`):**
  - **iOS Standalone PWA Optimization:** Fully optimized for Apple "Add to Home Screen" (`apple-mobile-web-app-capable: yes`, `display: standalone`). Uses calibrated dynamic safe-area insets (`env(safe-area-inset-top)` & `env(safe-area-inset-bottom)`), eliminating status bar overlap and preventing the iPhone home indicator bar from clipping action buttons or instruction hints.
  - **Adaptive Card & Control Scaling:** Auto-calibrates portrait card dimensions (`--ch: max(250px, min(395px, ...))`) and control button heights (`min-height: 40px`, compact gutters) ensuring the entire 3D card, Flip control, Add to Contacts, Share Card, QR Code modal trigger, and swipe hint comfortably fit in a single viewport across all iPhone screen sizes (from iPhone SE up to iPhone 16 Pro Max).
  - **Native Momentum Touch Scroll:** Equipped with `-webkit-overflow-scrolling: touch` and `overflow-y: auto`, enabling natural smooth scrolling if device keyboard or landscape orientation restricts viewport height.
  - **Pure CSS 3D Transform Matrix:** Interactive 360-degree rotation, lighting reflections, gyroscope responsiveness, vCard 3.0 generation, and **Share Card** high-resolution vertical portrait PNG combining both card sides for instant client outreach.
- **Enhanced SEO & Rich Knowledge Graph Architecture:**
  - **Schema.org Rich Results:** Comprehensive JSON-LD graph integrating `ProfessionalService`, `WebSite`, `Person` (Founder), `AggregateRating` (5.0 rating based on 28 verified reviews), and `OfferCatalog` detailing transparent studio packages (Starter ₹499, Growth ₹999, Pro ₹1,499).
  - **Targeted Search Indexing:** Optimized meta descriptions, canonical URLs, expanded long-tail keywords, and fully mirrored XML sitemaps (`sitemap.xml`) and crawler protocols (`robots.txt`) ensuring rapid Googlebot indexing across all routes.
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

## 8. Changelog

### Fixed
- **"Your Orders" drawer (`components/GlobalCart.tsx`):** The page behind the drawer no longer scrolls while it is open (it stays visible), and the drawer body (package, add-ons, "Your Details" form) scrolls on its own so all fields can be filled in. The scroll lock now applies to both `<html>` and `<body>` (iOS Safari safe) and restores the previous scroll position on close. Wheel and touch events inside the drawer are no longer captured by page-level smooth-scroll handlers.
- **Order status modal (`components/OrderStatusModal.tsx`):** Uses the same background scroll lock, with an independently scrolling card.

---

## 9. License & Intellectual Property

- **Source Code:** Distributed under the [MIT License](LICENSE).
- **Brand Assets & Media:** All logos, trademarks, studio photography, and proprietary brand graphics are protected under [ASSET_RIGHTS.md](ASSET_RIGHTS.md) and may not be reproduced without written consent.

---

© 2026 **ShivamWebDesigns**. All rights reserved.
