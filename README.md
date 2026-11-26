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

### Optimization Highlights
- **Zero Reflow Stacking:** Refined `SpatialStack` 3D card deck using `transform-gpu` and `will-change-transform` for fluid 60fps mobile scrolling without layout thrashing.
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
| **`/`** | `app/page.tsx` | **Agency Flagship Home:** Animated hero, hallmark metrics, services overview, featured projects, 3D architecture stack, and inquiry intake. |
| **`/about`** | `app/about/page.tsx` | **About the Studio:** Origin narrative, mission/vision bento grid, operating principles, and studio background. |
| **`/services`** | `app/services/page.tsx` | **Service Suite:** 6 comprehensive service modules (Design, Development, UI/UX, Redesign, Landing Pages, Maintenance) with deliverables. |
| **`/projects`** | `app/projects/page.tsx` | **Interactive Portfolio:** Studio showcases with category filter pills, verified metrics, and tech stacks. |
| **`/founder`** | `app/founder/page.tsx` | **Founder Profile:** Editorial profile of Shivam Purohit with high-definition portrait, personal journey, and direct links. |
| **`/contact`** | `app/contact/page.tsx` | **Client Inquiries:** Studio communication coordinates, encrypted response expectations, and structured contact form. |
| **`/start-project`** | `app/start-project/page.tsx` | **Project Configurator:** Multi-step sprint planner with interactive pills for service type, budget tier, and delivery timeline. |
| **`/businesscard`** | `public/businesscard.html` | **Spatial 3D Digital Business Card:** Gyroscope- and drag-enabled 3D physical card simulation, vCard 3.0 generation, Web Share API, and QR download. |
| **`/license`** | `app/license/page.tsx` | **Legal & License Hub:** Consolidated, un-slopped dark mode legal architecture combining the **MIT License**, **Privacy Policy**, and **Terms of Service** with interactive tab switching. |
| **`/privacy`** | `app/privacy/page.tsx` | **Privacy Policy:** Transparent, minimal data collection terms with zero ad trackers, DPDP Act 2023, and GDPR compliance. |
| **`/terms`** | `app/terms/page.tsx` | **Terms of Service:** Direct studio engagement terms, milestone delivery schedule, 100% IP transfer upon settlement, and 30-day warranty. |
| **`/admin`** | `app/admin/page.tsx` | **Private Dashboard:** Google OAuth verified intake management for studio leads. |

---

## 4. UI Components & Interaction Features

- **Global Back-to-Top Button (`components/BackToTop.tsx`):** Unobtrusive floating control with passive scroll detection (`scrollY > 300`), smooth window scrolling, frosted dark glass styling (`bg-neutral-900/90 backdrop-blur-md`), and mobile dock offset.
- **Browser Tab & Taskbar Branding:**
  - Simplified titles: `Page | ShivamWebDesigns` (`Home | ShivamWebDesigns`, etc.).
  - Multi-resolution `favicon.ico` containing 16×16, 32×32, 48×48, and 256×256 layers.
  - Dedicated PNG favicons (`16x16`, `32x32`, `48x48`, `180x180`, `512x512`) with active cache-busting queries (`?v=4`).
  - Native Next.js App Router icon routes: `/icon.png` and `/apple-icon.png`.
- **Spatial 3D Business Card & Premium Sharing:** Pure CSS 3D transform matrix with interactive flip, lighting highlights, icon-only back navigation, and upgraded **Share Card** functionality delivering a high-resolution vertical portrait PNG combining both card sides (front at top, back at bottom) on matte black, with Web Share API file sharing, download fallback, and formatted invitation message.

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
