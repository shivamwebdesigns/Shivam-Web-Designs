# Technical Architecture Document (TAD)
**Project:** Shivam Web Designs Studio Platform  
**System Version:** 2.0.0 (Production)  
**Target Environment:** Edge Compute (Vercel) / Node.js 20+ / Chrome & Safari WebKit  
**Architecture Paradigm:** Hybrid Static Edge Generation (SSG) with Serverless API Handlers  

---

## 1. System Architecture Overview

```
                                      ┌─────────────────────────────────────────────────────────────┐
                                      │                     CLIENT BROWSER                          │
                                      │  (Desktop / Mobile iOS PWA / Android / iPadOS Safari)       │
                                      └──────────────┬──────────────────────────────┬───────────────┘
                                                     │                              │
                                        HTTP/2 / TLS 1.3              Dual Dispatch: WhatsApp Web / API
                                                     │                              │
                                                     ▼                              ▼
                                      ┌──────────────────────────────┐ ┌─────────────────────────────┐
                                      │   VERCEL GLOBAL EDGE CDN     │ │      WhatsApp Business      │
                                      │  - Static Asset Caching      │ │   Direct Order Dispatch     │
                                      │  - Brotli/Gzip Compression   │ │     (+91 78619 65480)       │
                                      │  - Edge Route Optimization   │ └─────────────────────────────┘
                                      └──────────────┬───────────────┘
                                                     │
                                                     ▼
                                      ┌──────────────────────────────┐
                                      │     NEXT.JS 15 APP ROUTER    │
                                      │  - 22 Static Pre-rendered    │
                                      │    Routes (SSG)              │
                                      │  - Dynamic Edge Handlers     │
                                      │  - Optimized JS Bundles      │
                                      └──────────────┬───────────────┘
                                                     │
                             ┌───────────────────────┴───────────────────────┐
                             │                                               │
                             ▼                                               ▼
              ┌──────────────────────────────┐                ┌──────────────────────────────┐
              │   SERVERLESS ROUTE HANDLERS  │                │     GOOGLE IDENTITY OAUTH    │
              │  - /api/contact              │                │  - Admin Token Verification  │
              │  - /api/inquiry              │                │  - Allowed Email Whitelist   │
              │  - /api/admin/inquiries      │                │    (Owner Only Access)       │
              └──────────────┬───────────────┘                └──────────────┬───────────────┘
                             │                                               │
                             ▼                                               ▼
              ┌──────────────────────────────┐                ┌──────────────────────────────┐
              │   GOOGLE CLOUD FIRESTORE     │                │       RESEND EMAIL API       │
              │  - Native Service Account    │                │  - Transactional Brief Logs  │
              │  - Server-Only Admin SDK     │                │  - Studio Delivery Alerts    │
              │  - Immutable Inquiries DB    │                └──────────────────────────────┘
              └──────────────────────────────┘
```

---

## 2. Directory Layout & Layered Architecture

```
├── app/                           # Next.js 15 App Router Layer
│   ├── layout.tsx                 # Root HTML shell, fonts, JSON-LD metadata, ClientOverlays
│   ├── page.tsx                   # Studio Homepage (Hero, Stack, Process, Pricing, Founder)
│   ├── globals.css                # Tailwind base, typography tokens, luxury scrollbars
│   ├── packages/page.tsx          # Dedicated packages showcase & add-ons configurator
│   ├── services/page.tsx          # Studio capabilities & technical deliverables
│   ├── start-project/page.tsx     # Structured project brief intake generator
│   ├── contact/page.tsx           # Contact channels & fallback communication form
│   ├── founder/page.tsx           # Founder biography, creative direction & manifesto
│   ├── admin/page.tsx             # Private authenticated owner inquiry dashboard
│   ├── api/
│   │   ├── contact/route.ts       # Contact & cart order dual-channel serverless handler
│   │   ├── inquiry/route.ts       # Structured project brief intake serverless handler
│   │   └── admin/inquiries/       # Authenticated Firestore admin retrieval handler
│   ├── manifest.ts                # Dynamic Web App Manifest generator
│   └── sitemap.ts                 # Dynamic XML Sitemap generator
├── components/                    # Modular Component Architecture
│   ├── Navbar.tsx                 # Sticky navigation, mobile menu & orders launcher
│   ├── Footer.tsx                 # Semantic footer, status badge & legal links
│   ├── MobileDock.tsx             # Fixed mobile bottom navigation with safe-area spacing
│   ├── GlobalCart.tsx             # "Your Orders" slide-over drawer & order builder
│   ├── ClientOverlays.tsx         # Lazy client hydration module (ssr: false)
│   ├── SpatialStack.tsx           # 3D interactive stack miniature & physics
│   ├── ScrollAnimationProvider.tsx# Desktop-only Lenis inertia & section reveal observer
│   └── OrderStatusModal.tsx       # Post-submission modal with WhatsApp dispatch
├── data/                          # Type-Safe Application Data Models
│   ├── packages.ts                # Starter, Growth, Pro tiers & modular add-ons definitions
│   ├── siteConfig.ts              # Canonical studio metadata, OpenGraph & asset URLs
│   └── founder.ts                 # Founder telemetry, credentials & verified socials
├── public/                        # Static Edge Assets
│   ├── sw.js                      # Cache-first service worker (swd-cache-v3)
│   ├── site.webmanifest           # PWA standalone manifest
│   ├── businesscard.webmanifest   # Standalone 3D card manifest
│   └── assets/                    # High-resolution optimized brand graphics & banners
└── docs/                          # Authoritative Architecture & Engineering Documentation
```

---

## 3. Core Subsystems & Technical Mechanics

### 3.1 Client Overlays & Zero-Bloat Hydration (`components/ClientOverlays.tsx`)
To ensure strict sub-second LCP (<1.2s) and 0ms main-thread blockage:
- All non-critical client overlays (`GlobalCart`, `BackToTop`, `OrderSuccessToast`, `IOSInstallPrompt`, and `ServiceWorkerRegister`) are encapsulated in `ClientOverlays.tsx` using `next/dynamic` with `{ ssr: false }`.
- Initial server-rendered HTML payloads deliver pure semantic structure without executing client-side drawer state machines or audio/service worker initializers during first paint.

### 3.2 Dual-Layer Persistence & Global Cart Event Bus
- **State Architecture:** The platform avoids external state stores (Redux/Zustand) in favor of a lean, decoupled browser architecture:
  - `localStorage['swd-cart']`: Stores active package selection, add-on IDs, item counts, and cached profile values.
  - `localStorage['swd-client-profile']`: Remembers user identity (Full Name, Phone, Email, Website) when *"Remember my details"* is ticked.
  - `localStorage['swd-remember-profile']`: Stores user opt-in boolean preference.
  - Custom Event `swd-cart-change`: Dispatched across `window` whenever items or profile data mutate, synchronizing the Navbar badge, Mobile Dock pill, and Slide-Over Drawer in real time without component re-renders.

### 3.3 100% Native Unblocked Scrolling Engine
- **Drawer Isolation:** The "Your Orders" drawer (`GlobalCart.tsx`) utilizes pure native hardware-accelerated scrolling (`overflow-y: auto`, `touch-action: pan-y`, `-webkit-overflow-scrolling: touch`, `overscroll-behavior: contain`).
- **Smooth-Scroll Coordination:** On drawer open, the desktop Lenis smooth scroll engine is paused (`lenis.stop()`) and background body scroll is locked (`body.style.overflow = 'hidden'`). This guarantees macOS trackpad two-finger momentum and iOS 120Hz ProMotion touch scrolling never latch or hitch against underlying page sections.

### 3.4 Spatial 3D Physics Engine (Zero WebGL/Three.js Overhead)
- **Mathematical Model:** Spatial rotation utilizes Euler angles mapped to normalized pointer coordinates or device gyroscope sensor deltas:
  $$\Delta \theta_X = \frac{Y_{pointer} - Y_{center}}{Height_{half}} \times 24^\circ$$
  $$\Delta \theta_Y = \frac{X_{pointer} - X_{center}}{Width_{half}} \times 24^\circ$$
- **Hardware Acceleration:** All transforms run inside dedicated compositing layers using `transform: perspective(1000px) rotateX(...) rotateY(...)` and `transform-style: preserve-3d`. On touch release, an inertial decay loop returns the card to neutral floating keyframe physics (`cardFloat3D`).

### 3.5 Serverless Ingestion & Secure Firestore Integration
- **Direct Edge API Routes:** Requests to `/api/contact` and `/api/inquiry` validate payload schemas server-side, check anti-spam honeypot parameters, and initialize the Firebase Admin SDK using server environment secrets (`FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PROJECT_ID`).
- **Zero Client Firestore Rules:** Firestore security rules enforce `allow read, write: if false;`. Browser clients cannot access the database directly; all interactions require privileged Serverless Edge execution.

---

## 4. Performance & Core Web Vitals Optimization Pipeline
1. **Desktop-Only Lenis Inertia:** Dynamic dynamic import (`import('lenis')`) executed only when `!isTouch && !prefersReducedMotion`, keeping mobile JavaScript bundles 0KB lighter.
2. **Instant LCP Exemption:** The `#hero` section is pinned with `#hero { opacity: 1 !important; transform: none !important; }` and excluded from scroll-reveal observers.
3. **Immutable Caching Headers (`next.config.ts`):** All `/_next/static/` artifacts are served with `Cache-Control: public, max-age=31536000, immutable`.
4. **Service Worker v3 (`public/sw.js`):** Offline-first cache-then-network strategy for fonts (`.woff2`), images (`.webp`, `.png`), and critical navigation shells.
