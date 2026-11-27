# 35-Point Pre-Flight Launch QA Checklist

Every website engineered by **ShivamWebDesigns (SWD)** must pass 100% of the following verification checks prior to final production handover.

---

### Section 1: Semantic Markup & Code Integrity
- [ ] **1.1 Valid Semantic HTML5:** All pages use appropriate semantic tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>`).
- [ ] **1.2 Clean Syntax Verification:** Ran `node -c` on all JavaScript files; zero syntax errors.
- [ ] **1.3 Zero Console Errors:** Browser DevTools console reports zero uncaught exceptions, 404 resource errors, or warnings.
- [ ] **1.4 Zero Framework Bloat:** Codebase contains zero unwanted third-party dependencies, trackers, or bloated runtimes.
- [ ] **1.5 File Mirroring Consistency:** Canonical code in `website/` exactly matches root mirror files.

---

### Section 2: Visual Polish & Responsive Layout
- [ ] **2.1 Desktop Full-Width (1920px+):** Layout remains contained, balanced, and aesthetically centered without awkward stretching.
- [ ] **2.2 Laptop / Standard Desktop (1280px–1440px):** Primary target viewport renders with balanced margins and padding.
- [ ] **2.3 Tablet Portrait & Landscape (768px–1024px):** Multi-column grids gracefully collapse into dual or single columns.
- [ ] **2.4 Mobile Standard (375px–430px):** Zero horizontal scrollbars (`overflow-x: hidden`), comfortable touch targets (minimum 44×44px).
- [ ] **2.5 Ultra-Compact Mobile (320px):** UI remains fully legible and functional without overlapping text or clipped buttons.

---

### Section 3: Typography & Monochromatic Brand Consistency
- [ ] **3.1 Typographic Scale:** Strict typographic hierarchy maintained across `h1`, `h2`, `h3`, `p`, and caption labels.
- [ ] **3.2 Pure Contrast:** Body copy adheres to high-contrast monochrome guidelines (`#000000` text on `#ffffff` light mode, or `#ffffff` text on `#0a0a0a` dark mode).
- [ ] **3.3 Font Loading Performance:** Modern web fonts loaded with `font-display: swap` to prevent Flash of Invisible Text (FOIT).
- [ ] **3.4 Clean SVGs:** All icons are crisp, inline or external SVGs; zero low-res emojis or blurry bitmap icons.

---

### Section 4: Performance & Core Web Vitals
- [ ] **4.1 Google Lighthouse Performance:** Scores 90+ on mobile, 95+ on desktop.
- [ ] **4.2 Largest Contentful Paint (LCP):** Hero section renders in under 2.0 seconds on standard 4G connections.
- [ ] **4.3 Cumulative Layout Shift (CLS):** Score < 0.05; all image tags have explicit `width` and `height` attributes.
- [ ] **4.4 First Input Delay / INP:** Interactive elements respond instantly (< 100ms).
- [ ] **4.5 Image Optimization:** All images compressed and delivered in modern WebP or SVG formats.

---

### Section 5: SEO, Social Meta & Discoverability
- [ ] **5.1 Unique Page Titles:** Every HTML page has a distinct, descriptive `<title>` tag under 60 characters.
- [ ] **5.2 Meta Descriptions:** Accurate `<meta name="description">` tags (140–160 characters).
- [ ] **5.3 Open Graph Protocol:** `og:title`, `og:description`, `og:image`, `og:url` configured with absolute URLs.
- [ ] **5.4 Twitter Cards:** `twitter:card` set to `summary_large_image` with verified preview image.
- [ ] **5.5 Favicon Suite:** Crisp vector `favicon.svg` and standard `favicon.ico` present and linked.
- [ ] **5.6 XML Sitemap:** Valid, updated `sitemap.xml` referencing canonical URLs.
- [ ] **5.7 Robots Configuration:** `robots.txt` configured correctly to allow crawling of public routes.

---

### Section 6: Forms, Interactivity & Accessibility
- [ ] **6.1 Form Validation:** Required inputs validate properly with clear visual error messages for invalid formats.
- [ ] **6.2 Dispatch Test:** Live test submission sent; verified email delivered to client destination inbox.
- [ ] **6.3 Submission Feedback:** Success toast / confirmation message appears reliably upon submission.
- [ ] **6.4 Keyboard Navigation:** Full website navigable using only the `Tab` and `Enter` keys; focus rings clearly visible.
- [ ] **6.5 Image Alt Attributes:** Every non-decorative image has descriptive `alt` text; decorative assets have `alt=""` and `aria-hidden="true"`.

---

### Section 7: Security & Edge Deployment
- [ ] **7.1 HTTPS Everywhere:** Strict SSL/TLS enabled; HTTP requests automatically redirect to HTTPS.
- [ ] **7.2 Zero Exposed Secrets:** Zero private API keys, database credentials, or passwords committed to public repositories.
- [ ] **7.3 404 Error Handling:** Custom, user-friendly 404 page configured with navigation back to homepage.
- [ ] **7.4 External Links:** All external links open with `target="_blank"` and `rel="noopener noreferrer"`.
