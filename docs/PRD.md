# Product Requirements Document
# 01 / PRD.md

## 1. Product Overview
Product Name: Shivam Web Designs Studio Platform & Spatial 3D Business Card
One-Line Description: High-performance digital flagship and 3D interactive business identity for an independent creative design & spatial engineering studio.
Product Type: Portfolio Platform / Spatial Web App / Interactive Client Portal
Primary Platform: Web (Mobile iOS/Android, Tablet, Desktop)
Live Domain: https://shivamwebdesigns.devs.li
Primary URLs:
- Flagship Studio: https://shivamwebdesigns.devs.li/
- 3D Business Card: https://shivamwebdesigns.devs.li/businesscard
- Privacy Policy: https://shivamwebdesigns.devs.li/privacy
- Terms of Service: https://shivamwebdesigns.devs.li/terms

## 2. Problem
- Traditional agency websites are cluttered, bloated with heavy frameworks, slow to load, and rely on cookie-cutter templates that fail to communicate genuine creative excellence.
- Physical paper business cards are static, easily lost, lack direct interactivity, and fail to demonstrate digital engineering craft.
- Prospective clients want to immediately see real 3D technical capability, explore verified case studies, and initiate engagements without filling out invasive multi-step forms.

## 3. Goals
### Primary Goal
Provide an unforgettable, lightning-fast digital flagship and workable 3D business card that demonstrates world-class spatial engineering, converts client inquiries into active contracts, and maintains a 100% unslop, privacy-first posture.

### Secondary Goals
- One-click contact saving via standardized vCard 3.0 (`Shivam_WebDesigns.vcf`).
- Responsive mobile portrait mode allowing natural one-handed vertical viewing on smartphones.
- Zero tracking cookies, DPDP Act 2023 / GDPR compliance, and sub-2.0s load times.
- Frictionless project brief submission with direct clipboard copy and native email client launch.

## 4. Target Users
### User Type 1: High-Growth Founders & Product Leaders
- Persona: Seed to Series B tech founders, eCommerce executives, and creative directors.
- Needs: High-impact digital flagships, 3D web experiences, and meticulous UI/UX that elevate their brand above competitors.
- Pain Points: Tired of generic agency pitch decks, slow delivery cycles, and bloated React/Next.js overhead for content sites.

### User Type 2: Networking & Prospective In-Person Clients
- Persona: Conference attendees, partners, and business prospects met face-to-face.
- Needs: Instant access to founder contact info, portfolio proof, and social channels on their phones.
- Pain Points: Typing contact details manually or losing physical paper cards.

## 5. User Stories
- As a prospective client, I want to rotate, tilt, and flip the 3D business card with 60fps physics so that I can evaluate the studio's spatial engineering skills.
- As a smartphone user, I want to switch the card to Portrait Mode so that I can comfortably view and read the card vertically on my phone.
- As a mobile client, I want to tap "Add to Contacts" so that Shivam Purohit's details are saved instantly into my device address book.
- As a visitor, I want a clear notice when the project portfolio is being updated.
- As a client with a concrete project, I want to configure and submit a structured project brief with scope and budget options.

## 6. Core Features
### Feature 1: Dedicated Interactive 3D Business Card (`/businesscard`)
- Purpose: Standalone spatial card identity for sharing directly with clients.
- Controls: Front Face (`0°`), Back Face (`180°`), Flip Card toggle, Mobile Portrait/Landscape orientation toggle, and Add to Contacts (`.vcf`).
- Physics & Textures: Physics inertia with momentum release, specular metallic foil sheen, tactile micro-grain paper overlay, 3D extruded paper core edges, and dynamic ground shadow.
- Interactive Hotspots: Direct click-through links to Website, LinkedIn, GitHub, Instagram, and QR code.

### Feature 2: Scroll-Driven 3D Stack & Studio Showcase (`/#stack`)
- Purpose: Educational and visual breakdown of the studio's spatial web engineering layers.
- Interaction: Interactive stack controls, responsive stage, and layer inspection.

### Feature 3: Project Portfolio Status
- Purpose: Clearly mark the portfolio as being updated while project work is prepared for publication.
- Behavior: Show “Updating soon” on the homepage and `/projects`; permanently redirect previous project detail URLs and omit them from the sitemap.

### Feature 4: Workable Project Brief Generator
- Purpose: Native HTML5 `<dialog>` form collecting client name, work email, project scope, budget tier, and timeline.
- Output: Instant clipboard formatting, local storage draft preservation, and native `mailto:` dispatch to `shivam@shivamwebdesigns.com`.

## 7. Non-Goals
- User account creation / login systems (the platform is strictly privacy-first, zero tracking).
- Unnecessary frameworks, dependencies, third-party tracking scripts, and cookie consent banners.
- Third-party tracking scripts, cookie consent banners, or intrusive advertising pixels.
- Generic AI copy, purple gradients, or fake customer counters.

## 8. MVP Scope
### Must Have:
- 100% workable 3D business card on desktop and mobile with Front, Back, Flip, Portrait/Landscape, and vCard buttons.
- Fully workable project brief intake with clipboard fallback and email launch.
- Sub-2-second load times on 4G networks.
- Clean legal compliance suite (`privacy.html`, `terms.html`, `sitemap.xml`, `robots.txt`).
- Structured JSON-LD metadata for Google search optimization.

### Nice to Have:
- PWA manifest and offline caching service worker.

### Future:
- Interactive real-time 3D scene configurator for prospective clients.

## 9. Success Metrics
- Performance: Lighthouse Performance > 95, Accessibility = 100, Best Practices = 100, SEO = 100.
- Availability: 100% uptime on Vercel Global Edge CDN.
- User Engagement: Average time on card > 45 seconds, zero interaction console errors.

## 10. Constraints
- Technical: Next.js App Router, React, TypeScript, and Tailwind CSS; keep dependencies focused.
- Security: No exposed API keys, no client-side secret variables, strict input sanitization.
- Brand: Obsidian monochrome aesthetic (`#050505` to `#16161a`), cobalt blue accent (`#3b82f6`).

## 11. Assumptions
- Modern browsers support CSS 3D transforms (`preserve-3d`, `perspective`), Pointer Events API, and standard Web APIs (`Blob`, `URL.createObjectURL`).
- Clients primarily access via modern iOS Safari and Android Chrome.

## 12. Open Questions
- Future automated webhook endpoint for CRM routing once studio intake volume exceeds 50 briefs/month.

## 13. Definition of Done
- [x] All requirements implemented and verified.
- [x] Critical user flows tested across mobile and desktop.
- [x] Clean static build without console errors or warnings.
- [x] All edge routes return HTTP 200 OK.
- [x] Security and compliance guidelines satisfied.
- [x] Documentation synchronized in `docs/`.
