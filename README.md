# ShivamWebDesigns (SWD)

> **Building Digital Experiences That Move Businesses Forward.**  
> Official agency platform and interactive digital portfolio for **ShivamWebDesigns** — an independent web design and development studio specializing in high-performance digital products, editorial typography, and bespoke web architecture.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-black?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-black?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-black?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![ECharts](https://img.shields.io/badge/Apache-ECharts-black?style=flat&logo=apache-echarts)](https://echarts.apache.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

**Live Production URL:** [https://shivamwebdesigns.devs.li](https://shivamwebdesigns.devs.li)  
**Digital Business Card:** [https://shivamwebdesigns.devs.li/businesscard](https://shivamwebdesigns.devs.li/businesscard)

---

## 1. Brand & Design Philosophy

ShivamWebDesigns operates on a strict **monochromatic, editorial Swiss aesthetic**:

- **Strict Palette:** Pure black (`#000000`), stark white (`#ffffff`), and calibrated neutral greys (`#161616`, `#262626`, `#888888`).
- **Zero Slop:** No gratuitous purple gradients, no fake counters or inflated vanity metrics, no generic AI-generated templates.
- **Micro-Interactions:** Subtle, high-framerate animations and physics-driven 3D transforms that enhance readability rather than distract.
- **Engineered Performance:** Sub-second Core Web Vitals, fully responsive across mobile, tablet, and 4K viewports.

---

## 2. External UI Architecture & Component System

The frontend architecture adapts and synthesizes design patterns from 5 modern UI engineering references:

| Reference Library | Inspiration & Architectural Role | Implemented Component |
| :--- | :--- | :--- |
| **React Bits** | Animated typography, spotlight coordinates, canvas backgrounds | `SplitText.tsx`, `ShinyText.tsx`, `SpotlightCard.tsx`, `InteractiveGrid.tsx` |
| **Watermelon UI** | Editorial agency layout, status pills, bento composition | Modern Hero layout, sprint roadmap, operating principles |
| **Kokonut UI** | Dual-state sliding typography buttons, cubic ease counters | `SlideTextButton.tsx`, `CountUp.tsx`, `Magnet.tsx` |
| **Apache ECharts** | Meaningful vector data visualization (SSR-safe SVG) | `PerformanceChart.tsx`, `CapabilitiesRadar.tsx` |
| **Anime.js** | Physics-based perspective tilt and specular highlight | `TiltedCard.tsx` (Founder portrait & 3D elements) |

### Key Custom Components (`components/ui/`)
- **`InteractiveGrid`**: Lightweight `<canvas>` dot matrix reacting smoothly to pointer coordinates without heavy WebGL overhead.
- **`SplitText`**: Typography staggered blur-to-focus transition on page entry.
- **`ShinyText`**: Monochromatic metallic sheen sweep for badges and section tags.
- **`SpotlightCard`**: Pointer-tracked radial illumination highlighting borders and card interiors on hover.
- **`TiltedCard`**: 3D perspective card container with dynamic specular lighting.
- **`SlideTextButton`**: Kokonut-style vertical text roll effect on hover with directional arrow shift.
- **`PerformanceChart`**: Real-time vector comparison chart benchmarking SWD engineered code against bloated CMS templates across Core Web Vitals.
- **`CapabilitiesRadar`**: 5-axis technical capability radar mapping UI/UX architecture, Next.js engineering, sub-second performance, 3D spatial interfaces, and conversion optimization.

---

## 3. Site Map & Application Routes

| Route | File Location | Purpose & Features |
| :--- | :--- | :--- |
| **`/`** | `app/page.tsx` | **Agency Flagship Home:** Animated interactive grid hero, hallmark metrics, services grid, featured portfolio, ECharts benchmark, sprint roadmap, founder preview, and inquiry intake. |
| **`/about`** | `app/about/page.tsx` | **About the Studio:** Origin narrative, mission/vision bento grid, operating principles, and studio capabilities radar. |
| **`/services`** | `app/services/page.tsx` | **Service Suite:** 6 comprehensive service modules (Design, Development, UI/UX, Redesign, Landing Pages, Maintenance) with timelines and deliverable checklists. |
| **`/projects`** | `app/projects/page.tsx` | **Interactive Portfolio:** Production showcases with category filter pills, verified metrics, live external links, and tech stack tags. |
| **`/founder`** | `app/founder/page.tsx` | **Founder Profile:** Editorial profile of Shivam Purohit with 3D tilted portrait, technical mastery radar, personal journey, and direct links. |
| **`/contact`** | `app/contact/page.tsx` | **Client Inquiries:** Studio communication coordinates, encrypted response expectations, and structured contact form. |
| **`/start-project`** | `app/start-project/page.tsx` | **Project Configurator:** Multi-step sprint planner with interactive pills for service type, budget tier, and delivery timeline. |
| **`/businesscard`** | `public/businesscard.html` | **Spatial 3D Digital Business Card:** Gyroscope- and drag-enabled 3D physical card simulation, vCard 3.0 generation, Web Share API, and QR download. |
| **`/privacy`** | `app/privacy/page.tsx` | **Privacy Policy:** Comprehensive GDPR, CCPA, and DPDP compliant legal disclosures. |
| **`/terms`** | `app/terms/page.tsx` | **Terms of Service:** Studio engagement, intellectual property, and service terms. |
| **`/admin`** | `app/admin/page.tsx` | **Private Dashboard:** Google OAuth verified intake management for studio leads. |

---

## 4. Strict Identity Separation Protocol

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

## 5. Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **UI Library:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom typography and monochrome palette
- **Data Visualization:** [Apache ECharts](https://echarts.apache.org/) (SVG renderer, hydration-safe)
- **Iconography:** Hand-crafted inline SVG icons & Lucide React
- **Email Dispatch:** [Resend](https://resend.com/) API integration
- **Hosting & Edge Routing:** [Vercel](https://vercel.com/) with edge caching and static prerendering
- **PWA & Offline:** Service Worker (`sw.js`) and Web Manifest (`site.webmanifest`)

---

## 6. Local Development

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

## 7. Project Documentation

Comprehensive architectural guidelines and operational documentation live in the [`docs/`](docs/) directory:

- [Product Requirements Document (docs/PRD.md)](docs/PRD.md)
- [Design System & Typography (docs/DESIGN_SYSTEM.md)](docs/DESIGN_SYSTEM.md)
- [Edge Architecture & Data Flow (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md)
- [Data Models & vCard Spec (docs/DATABASE.md)](docs/DATABASE.md)
- [Security Guidelines (docs/SECURITY.md)](docs/SECURITY.md)
- [Code Style & Conventions (docs/CODE_STYLE.md)](docs/CODE_STYLE.md)
- [Testing & Definition of Done (docs/TESTING.md)](docs/TESTING.md)
- [API Protocols & Routing Matrix (docs/API.md)](docs/API.md)

---

## 8. License & Intellectual Property

- **Source Code:** Distributed under the [MIT License](LICENSE).
- **Brand Assets & Media:** All logos, trademarks, studio photography, and proprietary brand graphics are protected under [ASSET_RIGHTS.md](ASSET_RIGHTS.md) and may not be reproduced without written consent.

---

© 2026 **ShivamWebDesigns**. All rights reserved.
