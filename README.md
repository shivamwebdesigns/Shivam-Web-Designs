# ShivamWebDesigns (SWD) — Official Agency Website

> **Independent digital studio specializing in bespoke website design, UI/UX architecture, frontend engineering, and high-performance digital flagships.**

[![Production Status](https://img.shields.io/badge/Production-Live%20Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shivamwebdesigns.devs.li)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20TypeScript%20%7C%20Tailwind%20CSS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Aesthetic](https://img.shields.io/badge/Aesthetic-Strict%20Swiss%20Monochrome-000000?style=for-the-badge)](#1-brand-identity)
[![License](https://img.shields.io/badge/License-Proprietary-000000?style=for-the-badge)](https://shivamwebdesigns.devs.li)

---

## 1. Brand Identity & Visual Language

- **Brand Name:** ShivamWebDesigns
- **Short Name:** SWD
- **Founder & CEO:** Shivam Purohit
- **Industry:** Web Design & Full-Stack Development
- **Personality:** Minimal, modern, disciplined, professional, creative, and trustworthy.
- **Visual Identity:** Strict black and white (`#000000`, `#ffffff`, neutral greys `#171717`, `#262626`).
- **Typography:** Swiss international typographical hierarchy (`Inter` and `JetBrains Mono`).
- **Core Rules:** Generous whitespace, clean grids, subtle transitions, zero generic AI slop, zero purple gradients, zero fake testimonials or vanity metrics.

---

## 2. Live URLs & Page Architecture

| Route | Page | Purpose & Content |
| :--- | :--- | :--- |
| [`/`](https://shivamwebdesigns.devs.li/) | **Home** | Hero with official headline, capabilities overview, featured projects, why work with SWD, 4-step working process, founder preview, inquiry CTA, and footer. |
| [`/about`](https://shivamwebdesigns.devs.li/about) | **About** | Agency narrative, mission & vision, core values, differentiators, and founder overview. |
| [`/services`](https://shivamwebdesigns.devs.li/services) | **Services** | 6 core disciplines: Website Design, Website Development, UI/UX Design, Website Redesign, Landing Page Development, Website Maintenance. |
| [`/projects`](https://shivamwebdesigns.devs.li/projects) | **Projects** | Selected works portfolio with interactive category filters (All, Spatial 3D, E-Commerce, Web App, Editorial). |
| [`/projects/[slug]`](https://shivamwebdesigns.devs.li/projects/aura-audio) | **Project Details** | In-depth case studies featuring challenges, solutions, deliverables, tech stacks, and live project URLs. |
| [`/founder`](https://shivamwebdesigns.devs.li/founder) | **Founder** | Dedicated profile for Shivam Purohit with HD portrait, genesis story, guiding philosophy, technical skills, personal note, and direct contact channels. |
| [`/contact`](https://shivamwebdesigns.devs.li/contact) | **Contact** | Direct agency coordinates, guaranteed 24h response SLA, WhatsApp quick chat, and functional contact form. |
| [`/start-project`](https://shivamwebdesigns.devs.li/start-project) | **Start a Project** | Client intake system with service selection, budget tiers, timeline selection, honeypot protection, and dispatch ID. |
| [`/businesscard`](https://shivamwebdesigns.devs.li/businesscard) | **3D Business Card** | Preserved dual-aspect 3D business card engine with live Euler physics, landscape/portrait morphing, and vCard export. |

---

## 3. Brand Assets Organization

All official media assets are strictly organized inside `/public/assets/`:

```
public/assets/
├── logo.png             # Official SWD brand logo mark
├── logo.svg             # Crisp vector SVG brand logo
├── banner-desktop.png   # 1920x640 desktop banner
├── banner-mobile.png    # 1920x1080 mobile social banner
├── founder.jpg          # HD studio portrait of Shivam Purohit
├── projects/            # Project case study thumbnails & SVG art
│   ├── aura-audio.png
│   ├── chrono-luxury.png
│   ├── nexus-analytics.png
│   └── revista-magazine.png
└── icons/               # Domain discipline SVG icons
```

---

## 4. Backend Endpoints & API

- `POST /api/inquiry`: Processes and validates client project briefs. Includes email syntax validation, minimum length constraints, honeypot anti-spam verification, server telemetry logging, and optional automated dispatch via Resend.
- `POST /api/contact`: Handles general contact inquiries with rate-limiting readiness, field sanitization, and structured dispatch logging.

### Environment Variables

Copy `.env.example` to `.env.local` to configure optional production mail hooks:

```bash
cp .env.example .env.local
```

```env
# Base URL of the website
NEXT_PUBLIC_SITE_URL=https://shivamwebdesigns.devs.li

# Agency email recipient for contact and brief notifications
CONTACT_EMAIL=shivam@shivamwebdesigns.com

# Optional Resend API key for automated notifications (https://resend.com)
RESEND_API_KEY=
```

---

## 5. Local Development & Production Build

### Prerequisites
- Node.js 18.18+ or Node 20+ (Node v26 verified compatible)
- npm or yarn or pnpm

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

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build & Verification
```bash
# Compile and optimize production build
npm run build

# Start production server
npm run start
```

---

## 6. Official Agency Channels

- **Website:** [https://shivamwebdesigns.devs.li](https://shivamwebdesigns.devs.li)
- **LinkedIn:** [https://www.linkedin.com/company/shivamwebdesigns/](https://www.linkedin.com/company/shivamwebdesigns/)
- **GitHub:** [https://github.com/shivamwebdesigns/Shivam-Web-Designs](https://github.com/shivamwebdesigns/Shivam-Web-Designs)
- **Instagram:** [https://www.instagram.com/shivamwebdesigns/](https://www.instagram.com/shivamwebdesigns/)
- **Email:** [shivam@shivamwebdesigns.com](mailto:shivam@shivamwebdesigns.com)

---

## 7. License & Rights

&copy; 2026 ShivamWebDesigns. All rights reserved.  
All brand graphics, custom design layouts, and 3D card assets are proprietary to ShivamWebDesigns and Shivam Purohit.
