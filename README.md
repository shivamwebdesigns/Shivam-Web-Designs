# Shivam Web Designs

> **Independent digital design & 3D spatial web engineering studio.**  
> Designing and building bespoke digital flagships, spatial 3D web experiences, and precision-tuned design systems for ambitious founders and brands worldwide.

[![Production Status](https://img.shields.io/badge/Production-Live%20200%20OK-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shivamwebdesigns.devs.li)
[![License](https://img.shields.io/badge/License-Proprietary-000000?style=for-the-badge)](https://shivamwebdesigns.devs.li/terms)
[![Architecture](https://img.shields.io/badge/Architecture-Zero%20Framework%20Vanilla%20ES2022-000000?style=for-the-badge)](docs/ARCHITECTURE.md)
[![Vibe Coding Blueprint](https://img.shields.io/badge/Vibe%20Coding-Blueprint%20Compliant-000000?style=for-the-badge)](docs/AGENTS.md)

---

## Live Deployments & Endpoints

| Resource | Canonical Production URL | Description |
| :--- | :--- | :--- |
| **Studio Flagship** | [`https://shivamwebdesigns.devs.li/`](https://shivamwebdesigns.devs.li/) | Primary studio website, showcase, interactive stacking deck & client brief terminal. |
| **3D Business Card** | [`https://shivamwebdesigns.devs.li/businesscard`](https://shivamwebdesigns.devs.li/businesscard) | Dual-aspect spatial 3D card (landscape & portrait) with live inertia and vCard export. |
| **Privacy Policy** | [`https://shivamwebdesigns.devs.li/privacy`](https://shivamwebdesigns.devs.li/privacy) | DPDP Act 2023 & GDPR compliant transparent privacy framework with zero tracking cookies. |
| **Terms of Service** | [`https://shivamwebdesigns.devs.li/terms`](https://shivamwebdesigns.devs.li/terms) | Client engagement models, milestone deliverables, and intellectual property transfer standards. |

---

## Architectural Philosophy & Core Principles

This repository strictly follows **The Vibe Coding Blueprint** and the anti-slop design standard:

1. **Zero Framework Bloat:**
   - No React, Next.js, Three.js, Tailwind, or heavy npm bundles in production.
   - 100% pure semantic HTML5, modern CSS3 (Custom Properties, Container Queries, 3D Transforms), and vanilla ES2022 JavaScript.
   - Ultra-fast load times ($< 1.5\text{s}$) with zero render-blocking dependencies.

2. **Dual-Aspect-Ratio 3D Spatial Business Card:**
   - Real-time CSS 3D perspective projection with physics-smoothed Euler rotations ($R_x, R_y$).
   - Dynamic aspect-ratio morphing between Landscape ($3.5 \times 2\text{ in}$, ratio $1.75$) and Portrait ($2 \times 3.5\text{ in}$, ratio $1.75$) via `.swapper` 260ms morph transitions.
   - Embedded high-resolution textures, interactive UV hotspots for social channels & QR scan, and instant vCard 3.0 generation (`ShivamWebDesigns.vcf`).
   - Mobile auto-detection: viewports $\le 540\text{px}$ automatically launch in Portrait mode.

3. **Mobile App-Shell Experience:**
   - Dedicated fixed bottom navigation dock (*Studio*, *Stack*, *Works*, *3D Card*, *Brief*) with active scroll-spy section tracking.
   - Touch-native horizontal snap carousel for Selected Works (`scroll-snap-type: x mandatory`).
   - Mobile quick-action cluster: instant vCard save, native Web Share Sheet, WhatsApp direct link, and dedicated `/businesscard` routing.

4. **Zero-Slop Visual Discipline:**
   - Zero purple gradients, no fake reviews, no vanity counters.
   - Pure black/graphite Swiss aesthetic (`#050505` to `#181818`), clean SVG icons, and rigorous typography (`DM Sans` and `JetBrains Mono`).
   - Accessible touch targets $\ge 44\text{px}$ across all mobile viewports.

---

## Repository Structure & File Mirroring Strategy

The repository uses a dual-structure mirroring strategy to guarantee zero-configuration Vercel deployment while maintaining modular canonical code:

```
Shivam-Web-Designs/
├── website/                     # CANONICAL SOURCE DIRECTORY
│   ├── index.html               # Flagship studio application & markup
│   ├── businesscard.html        # Dual-aspect 3D spatial business card
│   ├── styles.css               # Studio design system & 3D styling engine
│   ├── script.js                # Vanilla ES2022 interactions & spatial engine
│   ├── privacy.html             # Privacy policy (DPDP Act / GDPR compliant)
│   ├── terms.html               # Terms of service & client agreements
│   ├── sitemap.xml              # SEO search engine sitemap
│   ├── robots.txt               # SEO indexing directives
│   └── Brand Logo.PNG           # Official studio brand identity asset
├── docs/                        # THE VIBE CODING BLUEPRINT SUITE
│   ├── PRD.md                   # Product Requirements Document
│   ├── DESIGN_SYSTEM.md         # Colors, typography, spacing, textures
│   ├── ARCHITECTURE.md          # Technical stack, component hierarchy, routing
│   ├── DATABASE.md              # Local storage models & vCard 3.0 schema
│   ├── SECURITY.md              # Zero secrets policy, sanitization, legal
│   ├── CODE_STYLE.md            # Coding conventions & mirroring rules
│   ├── TESTING.md               # Quality verification & definition of done
│   ├── AGENTS.md                # AI agent operating guidelines
│   ├── UX_FLOWS.md              # Step-by-step user interaction journeys
│   └── API.md                   # Edge routing matrix & payload contracts
├── files/                       # Master asset exports & 3D card templates
├── index.html                   # Root mirror for Vercel edge delivery
├── businesscard.html            # Root mirror for /businesscard
├── card.html                    # Root alias for /card
├── privacy.html                 # Root mirror for /privacy
├── terms.html                   # Root mirror for /terms
├── styles.css                   # Root mirror
├── script.js                    # Root mirror
├── vercel.json                  # Edge routing, clean URLs & security headers
├── AGENTS.md                    # Root discovery agent instruction entrypoint
└── README.md                    # Repository documentation
```

> **Mirroring Rule:** Canonical edits must be made in `website/` and mirrored to root files. Every release must be validated with `node -c website/script.js` and all local endpoints verified before delivery.

---

## Local Development & Testing

Start a local development server from the repository root:

```bash
# Serve locally on port 8000
python3 -m http.server 8000
```

Verify endpoints:
- Studio Home: `http://localhost:8000/`
- 3D Business Card: `http://localhost:8000/businesscard.html`
- Privacy Policy: `http://localhost:8000/privacy.html`
- Terms of Service: `http://localhost:8000/terms.html`

Syntax and integrity checks:
```bash
# Verify JavaScript syntax
node -c website/script.js
node -c script.js
```

---

## Official Studio Channels

- **Website:** [https://shivamwebdesigns.devs.li](https://shivamwebdesigns.devs.li)
- **LinkedIn:** [https://www.linkedin.com/company/shivamwebdesigns/](https://www.linkedin.com/company/shivamwebdesigns/)
- **GitHub:** [https://github.com/shivamwebdesigns/Shivam-Web-Designs](https://github.com/shivamwebdesigns/Shivam-Web-Designs)
- **Instagram:** [https://www.instagram.com/shivamwebdesigns/](https://www.instagram.com/shivamwebdesigns/)
- **Email:** [shivam@shivamwebdesigns.com](mailto:shivam@shivamwebdesigns.com)

---

## License & Copyright

&copy; 2026 Shivam Web Designs. All rights reserved.  
All brand graphics, custom design layouts, and 3D card assets are proprietary to Shivam Web Designs.
