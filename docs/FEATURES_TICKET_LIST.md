# Features Ticket List (FTL)
**Project:** Shivam Web Designs Studio Platform  
**Tracking Scheme:** Jira / GitHub Issues Standard  
**Sprint Cycle:** Continuous Edge Delivery (Sprint-Driven)  
**Total Epics:** 6 Epics | 18 Production Tickets  

---

## EPIC-01: Core Platform Architecture & Edge Infrastructure

### Ticket SWD-101: Next.js 15 App Router Migration & Pre-rendered Static Pages
- **Type:** Architectural Epic / Infrastructure
- **Priority:** P0 (Blocker)
- **Status:** Done
- **User Story:** As an organic visitor, I want every studio route to load instantaneously so that I experience zero latency or loading spinners.
- **Acceptance Criteria:**
  - All 22 routes (`/`, `/about`, `/packages`, `/services`, `/projects`, `/founder`, `/contact`, `/start-project`, `/privacy`, `/terms`, `/license`) pre-render as static HTML at build time (`○ Static`).
  - First Load JS shared by all routes remains under 105 kB.
  - Zero hydration errors or server-client mismatch warnings.
- **Verification Command:** `npm run build` (Exit code 0, 22/22 routes prerendered).

---

### Ticket SWD-102: Zero-Bloat Lazy Client Overlays (`ClientOverlays.tsx`)
- **Type:** Performance Optimization
- **Priority:** P0
- **Status:** Done
- **User Story:** As a mobile user on 4G, I want the initial page view to render without downloading non-critical modal code so that my first paint is sub-second.
- **Acceptance Criteria:**
  - `GlobalCart`, `BackToTop`, `OrderSuccessToast`, `IOSInstallPrompt`, and `ServiceWorkerRegister` are loaded via dynamic import with `{ ssr: false }`.
  - Non-critical modals are excluded from initial server HTML bundle.
- **Verification Command:** Inspect bundle output to ensure split chunks load asynchronously.

---

### Ticket SWD-103: Standalone PWA Architecture & Cache-First Service Worker (v3)
- **Type:** Feature / Reliability
- **Priority:** P1
- **Status:** Done
- **User Story:** As an iPhone user, I want to install Shivam Web Designs to my home screen and use it as a standalone app without Safari browser chrome.
- **Acceptance Criteria:**
  - Top navigation applies safe area inset (`paddingTop: max(0.85rem, env(safe-area-inset-top))`) to clear Dynamic Island and notch.
  - Internal links stay within standalone container (`window.navigator.standalone`).
  - Service Worker (`sw.js`) caches modern font files (`.woff2`) and images (`.webp`) under cache bucket `swd-cache-v3`.
- **Verification Command:** Audit via Chrome DevTools Lighthouse PWA checklist.

---

## EPIC-02: Spatial 3D Identity & Interactive Physics

### Ticket SWD-201: Dedicated 3D Interactive Business Card (`/businesscard`)
- **Type:** Feature / Showcase
- **Priority:** P0
- **Status:** Done
- **User Story:** As a prospective client, I want to rotate, flip, and inspect a photorealistic 3D business card in real time to evaluate the studio's spatial design capabilities.
- **Acceptance Criteria:**
  - Dual-face 3D virtual card with metallic foil sheen and tactile micro-grain texture.
  - Front (`0°`), Back (`180°`), Flip, and Landscape/Portrait orientation toggle controls.
  - Interactive hotspots linking to LinkedIn, GitHub, Instagram, and Website.
- **Verification Command:** Load `/businesscard` and trigger face flips.

---

### Ticket SWD-202: Mobile Touch Drag Physics & Device Gyroscope Listener
- **Type:** Enhancement / Physics
- **Priority:** P1
- **Status:** Done
- **User Story:** As a smartphone user, I want the 3D card to respond to physical device tilting and silky finger swiping without lagging or jittering.
- **Acceptance Criteria:**
  - Pointer capture API tracks drag coordinates into smooth Euler angles ($\Delta \theta_X, \Delta \theta_Y$).
  - Device orientation listener maps physical smartphone tilt (`beta`, `gamma`) to real-time 3D tilt.
  - Releasing touch smoothly decays back to neutral autonomous floating keyframes (`cardFloat3D`).
- **Verification Command:** Test touch drag and tilt simulation in mobile device emulation.

---

### Ticket SWD-203: One-Tap vCard 3.0 Generation & Native Address Book Sync
- **Type:** Feature / Conversion
- **Priority:** P1
- **Status:** Done
- **User Story:** As a networking contact, I want to tap "Add to Contacts" and instantly import Shivam Purohit's complete contact details into my phone.
- **Acceptance Criteria:**
  - Clicking "Add to Contacts" generates and downloads standardized `Shivam_WebDesigns.vcf` (vCard 3.0).
  - Contains formatted name, title, telephone, email, canonical studio URL, and address metadata.
- **Verification Command:** Tap download button and verify vCard parser imports cleanly.

---

## EPIC-03: Packages & Global Orders Drawer Engine

### Ticket SWD-301: Unbundled Fixed-Price Packages Starting at ₹499
- **Type:** Core Commercial Feature
- **Priority:** P0
- **Status:** Done
- **User Story:** As a budget-conscious client, I want upfront transparent pricing starting at ₹499 so that I can choose a package that fits my exact needs.
- **Acceptance Criteria:**
  - Three distinct tiers displayed in an expansive 3-column grid: Starter (₹499), Growth (₹999), and Pro (₹1,499).
  - Clear deliverables, section counts, turnaround times, and glowing white highlights on Pro.
- **Verification Command:** Inspect `/packages` and check tier card attributes.

---

### Ticket SWD-302: Modular Add-ons Engine & Real-time Arithmetic Calculation
- **Type:** Feature / Commercial
- **Priority:** P0
- **Status:** Done
- **User Story:** As a client, I want to add custom services (Logo design, Subdomain setup, Extra pages) to my order with live price updates.
- **Acceptance Criteria:**
  - Incremental `+` and `−` quantity counters for all 6 unbundled add-on services.
  - Real-time arithmetic recalculation of one-time and monthly fees in drawer footer.
  - Synchronizes seamlessly to `localStorage['swd-cart']`.
- **Verification Command:** Add multiple add-ons and verify estimated total matches sum.

---

### Ticket SWD-303: 100% Native Unblocked Scrolling Engine for "Your Orders" Drawer
- **Type:** Bug Fix / Usability
- **Priority:** P0
- **Status:** Done
- **User Story:** As a user on Mac Safari or iPhone, I want to smoothly scroll down the orders panel to fill in all my details without the scroll freezing or locking.
- **Acceptance Criteria:**
  - Completely removed blocking JavaScript `onWheel` and `touchmove` listeners that broke trackpad kinetic momentum.
  - Applied pure native hardware-accelerated scrolling (`overflow-y: auto`, `touch-action: pan-y`, `overscroll-behavior: contain`).
  - Lenis smooth scrolling paused on drawer open (`lenis.stop()`) and resumed on close.
- **Verification Command:** Test two-finger trackpad swipe on macOS Safari inside drawer.

---

### Ticket SWD-304: Ergonomic 2-Column Details Grid & Required Red Asterisk Badging
- **Type:** Enhancement / UI
- **Priority:** P1
- **Status:** Done
- **User Story:** As a desktop visitor, I want to see Full Name, Phone, and Email immediately above the fold so that I don't have to search for fields.
- **Acceptance Criteria:**
  - Desktop view (`sm:`) arranges Full Name and Phone/WhatsApp side-by-side in a 2-column grid (`sm:grid-cols-2`), with Email Address full width in row 2.
  - All required field symbols styled with high-contrast red accent (`<span className="text-red-400">*</span>`).
- **Verification Command:** Verify visual layout in desktop viewport; confirm red asterisk markers.

---

### Ticket SWD-305: Floating Scroll-Down Helper Pill & Auto-Advance Focus Validation
- **Type:** Feature / Accessibility
- **Priority:** P1
- **Status:** Done
- **User Story:** As a user on a short screen, I want a clear indicator when more content is below so that I can easily reach remaining inputs.
- **Acceptance Criteria:**
  - Dynamic clearance observer detects overflow and surfaces a floating frosted pill button (*"Scroll down for details ▾"*).
  - Tapping pill smoothly scrolls down (`scrollBy({ top: 220, behavior: 'smooth' })`).
  - Clicking "Inquire" with missing fields automatically scrolls to and focuses the first invalid input.
- **Verification Command:** Shrink browser height; verify button appears and scrolls on tap.

---

### Ticket SWD-306: Interactive "Remember My Details" Persistence Checkbox
- **Type:** Feature / UX
- **Priority:** P1
- **Status:** Done
- **User Story:** As a client, I want an interactive tick button to remember my details for future orders or clear them for privacy.
- **Acceptance Criteria:**
  - Removed old static `"• Auto-saved"` label.
  - Added an interactive checkbox tick button with label `"Remember my details for next visit"`.
  - When checked, details sync to `localStorage['swd-client-profile']`; when unchecked, stored details are deleted.
- **Verification Command:** Toggle tick button; check `localStorage` in browser devtools.

---

## EPIC-04: Client Engagement & Dual-Dispatch Pipeline

### Ticket SWD-401: Structured Project Brief Intake Generator (`/start-project`)
- **Type:** Feature / Form Intake
- **Priority:** P0
- **Status:** Done
- **User Story:** As a prospective enterprise client, I want to configure a comprehensive project brief with scope, budget, and reference links.
- **Acceptance Criteria:**
  - 4-phase structured intake (Identity, Scope, Budget & Timeline, Project Description).
  - Server-side validation via `/api/inquiry` and unique brief ID generation (`SWD-XXXXXX`).
  - Anti-spam honeypot defense.
- **Verification Command:** Submit a valid brief and verify response code 200 with brief ID.

---

### Ticket SWD-402: One-Click WhatsApp Web & API Order Dispatch (`wa.me`)
- **Type:** Commercial Integration
- **Priority:** P0
- **Status:** Done
- **User Story:** As a client, I want to send my configured cart order directly to Shivam on WhatsApp so that we can immediately agree on next steps.
- **Acceptance Criteria:**
  - Formats clean Markdown text breakdown with package name, add-ons list, client details, and calculated price.
  - Triggers direct WhatsApp dispatch to studio hotline (`+91 78619 65480`).
  - Concurrently saves order payload to Firestore backend.
- **Verification Command:** Click "Inquire" in cart drawer and confirm formatted text in WhatsApp URL.

---

### Ticket SWD-403: Order Review Status Modal & Global Notification Banners
- **Type:** Feature / Feedback
- **Priority:** P1
- **Status:** Done
- **User Story:** As a user completing an order, I want clear confirmation of submission and the ability to review or cancel easily.
- **Acceptance Criteria:**
  - Triggers animated status modal with review timeline (24–48h notice) and popup blocker fallback link.
  - Global URL route notifications (`/?order=success` and `/?order=cancel`) displaying persistent status banners with action buttons.
- **Verification Command:** Navigate to `/?order=success` and verify emerald confirmation banner.

---

## EPIC-05: Private Owner Administration & Security

### Ticket SWD-501: Google OAuth 2.0 Protected Inquiry Dashboard (`/admin`)
- **Type:** Security / Internal Tools
- **Priority:** P0
- **Status:** Done
- **User Story:** As the studio founder, I want to securely log in with my Google account to review all customer briefs and inquiries in one dashboard.
- **Acceptance Criteria:**
  - Google Sign-In with Firebase Authentication on `/admin`.
  - Server-side token verification on `/api/admin/inquiries`.
  - Zero public navigation links and `<meta name="robots" content="noindex, nofollow" />`.
- **Verification Command:** Attempt to fetch `/api/admin/inquiries` without auth token; verify 401 error.

---

### Ticket SWD-502: Server-Side Owner Allowlist Enforcement
- **Type:** Security
- **Priority:** P0
- **Status:** Done
- **User Story:** As the studio owner, I want unauthorized Google accounts blocked from viewing client inquiry data.
- **Acceptance Criteria:**
  - Server verifies `decodedToken.email === 'shivamwebdesigns23@gmail.com'`.
  - Any other authenticated Google account receives an immediate 403 Forbidden response.
- **Verification Command:** Test authentication with non-owner Google account; verify 403 Forbidden.

---

## EPIC-06: Production Audit & Core Web Vitals Hardening

### Ticket SWD-601: Desktop-Only Dynamic Lenis Inertia
- **Type:** Performance Optimization
- **Priority:** P0
- **Status:** Done
- **User Story:** As a mobile visitor, I don't want desktop smooth scrolling scripts running on my phone so that battery life and 120Hz scrolling are preserved.
- **Acceptance Criteria:**
  - Lenis dynamically imported only when `!isTouch && !prefersReducedMotion`.
  - Mobile devices use 100% native ProMotion touch scrolling (0KB Lenis bundle).
- **Verification Command:** Audit network tab on mobile user agent; verify Lenis chunk is not requested.

---

### Ticket SWD-602: Zero-CLS Font Preloading & Instant LCP Hero Guarantee
- **Type:** Performance / CWV
- **Priority:** P0
- **Status:** Done
- **User Story:** As a visitor, I want page content to appear instantly without jumping or shifting layout during font loading.
- **Acceptance Criteria:**
  - Next.js Google Fonts configured with `preload: true` and fallback font metric overrides.
  - `#hero` pinned with `#hero { opacity: 1 !important; transform: none !important; }` and excluded from scroll-reveal queue.
  - Cumulative Layout Shift (CLS) measured at 0.000.
- **Verification Command:** Run `npm run build` and evaluate Lighthouse performance score (>98).
