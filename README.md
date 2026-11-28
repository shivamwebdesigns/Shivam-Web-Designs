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

- **Packages & Fixed Pricing Architecture (`/packages`, `/pricing`, & Embedded on `/`):**
  - **Fixed-Price Tiers:** Starter (₹499 &bull; digital profile page), Growth (₹999 &bull; one-page website with inquiry form and basic SEO), Pro (₹1,499 &bull; multi-page architecture up to 3 pages with analytics, speed tuning, and glowing white highlights).
  - **Refined Packages Positioning & Header:** Positioned with the authoritative headline **"Website Packages Starting at ₹499"** and clear description (*"Flexible solutions for businesses, creators and growing brands. Choose a package that fits your goals."*), followed by the clean typographic eyebrow `PACKAGES // FIXED PRICES` sitting directly atop the packages deck.
  - **Unbundled Modular Add-ons:** Clean, direct add-on list for Subdomain setup (from ₹149 &bull; free with Pro), Logo design (₹99), Copywriting (₹199/page), Extra revisions (₹199), Extra page (₹299), Monthly maintenance (₹299/month).
  - **Client Contact Form:** Clean, un-cluttered input fields for Full Name, Email Address, and Phone / WhatsApp Number with instant validation.
  - **Conditional Mobile Cart Bar (Shows Only on Add):** The mobile floating cart bar remains completely hidden when the cart is empty (`itemCount === 0`) for an unobstructed, distraction-free reading experience, and dynamically appears the moment a user adds a package or add-on. Includes dedicated `Hide Cart >` and `View Cart >` controls.
  - **Enhanced Mobile Layout & Safe-Area Offsets:** Precision hardware offsets (`bottom-[calc(4.75rem+env(safe-area-inset-bottom))]`) guarantee zero overlap between the mobile bottom dock, iOS home indicator, and floating cart controls. Responsive sticky-to-flow adaptation across spatial layers allows natural mobile reading, while extended footer padding keeps all copyright, navigation, and legal links fully accessible.
  - **Explicit Arithmetic Cart Math:** Order summary clearly breaks down `Package` + `+ Add-ons (X items)` − `Offers applied` = `Total Amount`, with real-time numeric spring animations.
  - **Full-Page Desktop Cart:** The desktop cart expands naturally with its selected items without an internal scroll container, keeping the cart and the rest of the page readable together.
  - **Existing Website Link Integration:** Direct input field inside the interactive cart allowing clients to paste their existing website link (`Already have a website?`) so the studio immediately understands their current setup.
  - **Order Review Modal & Dual-Dispatch Submissions:** Cart orders trigger an animated status modal with loading spinner ("Reviewing Your Order…"), direct WhatsApp dispatch with popup blocker fallback button, 24–48h review notice, social channel access, and background Firestore admin logging.
  - **Global URL Order State Notifications (`?order=success` & `?order=cancel`):**
    - `/?order=success`: Shows a sleek emerald-green notification banner stating *"Your order was placed successfully! Wait for 24–48 hours, we'll be reaching out soon"* with a **Buy Again** button.
    - `/?order=cancel`: Shows a sleek crimson-red notification banner stating *"Your order was cancelled successfully"* with a **See Your Cart** button.
  - **Full Layout Parity:** Packages is now a native App Router page (`app/packages/page.tsx`) with the unified `<Navbar />`, `<Footer />`, and `<MobileDock />`, perfectly matching the rest of the studio.
  - **Enhanced FAQ Accordion:** Clean, accessible disclosure cards with smooth rotation indicators and zero clutter.
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
