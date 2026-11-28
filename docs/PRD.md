# Product Requirements Document (PRD)
**Project:** Shivam Web Designs Studio Platform & Spatial 3D Business Identity  
**Version:** 2.0.0 (Production)  
**Author:** Shivam Purohit (Founder & Creative Director)  
**Status:** Approved & Implemented  
**Canonical Domain:** https://shivamwebdesigns.devs.li  

---

## 1. Executive Summary & Vision
Shivam Web Designs (SWD) is an independent creative design and spatial engineering studio based in India, dedicated to crafting high-performance, bespoke digital flagships and interactive spatial interfaces. 

The studio platform serves as both a primary client acquisition engine and a living portfolio of technical mastery. It departs radically from generic agency websites and cookie-cutter templates by implementing pure **Dark Luxury Minimalism**, sub-second Core Web Vitals, fixed transparent pricing starting at ₹499, and an interactive 3D spatial identity.

---

## 2. Problem Statement
1. **Generic Agency Bloat:** Traditional web agencies rely on cluttered WordPress/Webflow templates with sluggish JavaScript bundles (5MB+), generic stock photography, and aggressive popups that degrade brand credibility.
2. **Hidden & Volatile Pricing:** Most design agencies conceal their rates behind mandatory multi-week discovery calls or quote inflated arbitrary fees that deter small business owners, creators, and lean startups.
3. **Static & Ephemeral Business Cards:** Physical paper business cards are easily misplaced, static, and cannot demonstrate digital design or spatial engineering capabilities.
4. **Frictional Checkout & Onboarding:** Prospective clients are forced to navigate complicated, invasive intake forms instead of configuring their desired packages and add-ons transparently with immediate WhatsApp or email communication.

---

## 3. Core Objectives & Success Metrics
### Primary Objectives
- **Demonstrate Technical Craft:** Deliver a 60fps/120fps interactive 3D business card responding to touch, mouse pointer physics, and smartphone gyroscope orientation without external 3D engine overhead (Three.js/WebGL).
- **Drive Transparent Conversions:** Present transparent, unbundled packages (Starter ₹499, Growth ₹999, Pro ₹1,499) with real-time add-on configuration via a global slide-over drawer ("Your Orders").
- **Frictionless Dual Dispatch:** Support instantaneous one-click order generation via direct WhatsApp dispatch (`wa.me`) combined with background Firestore logging and asynchronous email notification.
- **Flawless Mobile PWA Experience:** Provide an installable standalone web application on iOS and Android with zero notch collision and offline caching.

### Key Performance Indicators (KPIs)
- **Lighthouse Scores:** 98+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO on Mobile and Desktop.
- **Largest Contentful Paint (LCP):** < 1.2s on standard mobile 4G connections.
- **Cumulative Layout Shift (CLS):** 0.000 across all responsive breakpoints.
- **First Input Delay (FID) / INP:** < 50ms responsive interaction latency.
- **Client Conversion Rate:** > 12% brief/inquiry completion rate from organic visitors.

---

## 4. Target Personas
### Persona A: Independent Creator & Local Business Owner
- **Profile:** Boutique retail, consultants, artists, and independent service providers.
- **Goal:** Fast, professional online presence with custom branding and WhatsApp inquiry links within 3–5 business days.
- **Key Features Used:** Starter Package (₹499), Subdomain & Hosting Setup Add-on (₹149), Logo Design Add-on (₹99).

### Persona B: High-Growth Startup Founder & Executive
- **Profile:** Seed to Series A tech founders and digital-first brand leaders.
- **Goal:** Distinctive digital flagship that validates investor trust, drives customer signups, and outclasses competitor aesthetics.
- **Key Features Used:** Growth (₹999) or Pro Package (₹1,499), 3D Business Card identity review, Project Brief intake form.

### Persona C: In-Person Networking & Conference Contact
- **Profile:** Prospective partner or client met at conferences, meetups, or business events.
- **Goal:** Scan a QR code or tap a link to view Shivam's business card and save contacts directly into their phone address book.
- **Key Features Used:** `/businesscard` standalone route, vCard 3.0 generation, Portrait mode toggle, Gyroscope tilt.

---

## 5. System Features & Functional Specifications

### 5.1 Interactive 3D Business Card Identity (`/businesscard`)
- **Spatial Card Mechanics:** Dual-face virtual card with metallic foil sheen, tactile paper texture overlay, dynamic floor shadow, and 3D extruded edge bevels.
- **Manual Physics & Auto-Float:** Interactive Euler angle rotation on pointer drag; smooth inertial decay on release; autonomous subtle hovering keyframes (`cardFloat3D`) when idle.
- **Orientation Switching:** Landscape mode (standard desktop / wide card) and Portrait mode (smartphone-optimized vertical card) toggleable via UI pill.
- **Contact Integration:** Standardized vCard 3.0 (`Shivam_WebDesigns.vcf`) export for one-tap native address book import on iOS and Android.
- **Interactive Hotspots:** Direct external links to Website, LinkedIn, GitHub, Instagram, and WhatsApp.

### 5.2 Studio Flagship Experience (`/`)
- **Hero Section:** High-contrast typographic statement (*"Building Digital Experiences That Move Businesses Forward"*), live studio metrics (<1.2s Core Web Vitals, 100% Bespoke, Founder-Led), and direct CTA links.
- **01 // The 3D Architecture Stack:** Interactive scroll-linked 3D miniature preview responding to touch/pointer drag and real-time gyroscope tilt.
- **02 // Production Audit Standard:** Core Web Vitals benchmark cards, accessibility guarantees, and zero-framework bloat manifest.
- **03 // Working Process:** 4-step transparent sprint delivery (Discovery & Strategy, Bespoke Design, Development, Launch & Handover).
- **04 // Founder & Creative Direction:** Direct founder profile of Shivam Purohit, highlighting craft, background, philosophy, and verified social channels.

### 5.3 Fixed-Price Packages & Global Live Cart (`/packages` & Global Slide-Over)
- **Tiers:**
  - **Starter (₹499):** Complete digital profile page, responsive layout, 2-3 business days delivery.
  - **Growth (₹999):** Complete one-page business flagship, 4-5 sections, inquiry form, basic SEO, 3-5 business days delivery.
  - **Pro (₹1,499):** Multi-page digital flagship (up to 3 pages), high-performance SEO, free subdomain setup, 5-7 business days delivery.
- **Unbundled Modular Add-ons:** Subdomain setup (₹149), Logo design (₹99), Copywriting (₹199/page), Extra revisions (₹199), Extra page (₹299), Monthly maintenance (₹299/mo).
- **Global Slide-Over Drawer ("Your Orders"):**
  - Accessible from the floating dock, navbar, and mobile navigation across all 22 platform routes.
  - 100% native unblocked scrolling engine (`overflow-y: auto`, `overscroll-behavior: contain`).
  - Space-efficient 2-column contact grid on desktop (Full Name and Phone/WhatsApp side-by-side with required red `*` markers).
  - Floating frosted action pill (*"Scroll down for details ▾"*) that auto-scrolls down smoothly on click and fades at bottom.
  - Interactive *"Remember my details for next visit"* checkbox with persistent `localStorage` synchronization.

### 5.4 Structured Project Brief Intake (`/start-project`)
- Multi-section project intake covering Identity, Scope & Project Type, Budget & Timeline, and Details & References.
- Integrated anti-spam honeypot defense, field sanitation, and real-time client-side validation.
- Server-side Firestore persistence with unique brief identification (`SWD-XXXXXX`).

### 5.5 Private Studio Owner Administration Portal (`/admin`)
- Restricted access portal protected by Google OAuth 2.0 and strict server-side email verification (`shivamwebdesigns23@gmail.com`).
- Direct real-time overview of client orders, project briefs, contact messages, timestamp logs, and engagement details.
- No client-side bypass; marked `noindex, nofollow` with zero public navigation links.

---

## 6. Non-Goals & Architectural Constraints
- **Zero Third-Party Tracking:** No Google Analytics, Facebook Pixel, Hotjar, or tracking cookies. 100% privacy-first design compliant with India's DPDP Act 2023 and EU GDPR.
- **Zero Framework Bloat:** No client-side React 3D libraries (Three.js, React Three Fiber, BabylonJS). Spatial 3D is achieved strictly via hardware-accelerated CSS 3D transforms (`preserve-3d`, `rotateX`, `rotateY`, `translateZ`).
- **No Public Customer Accounts:** All client transactions operate through lightweight dual-dispatch (WhatsApp + Direct Studio API) without forcing user account creation or password friction.
- **Zero Aesthetic Slop:** Strict prohibition of arbitrary rainbow gradients, emoji icons (only clean SVGs from Lucide), and fabricated counters.
