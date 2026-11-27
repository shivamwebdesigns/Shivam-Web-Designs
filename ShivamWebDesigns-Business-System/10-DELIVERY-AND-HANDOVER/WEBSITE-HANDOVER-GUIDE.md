# Website Handover & Deployment Guide

> **SHIVAMWEBDESIGNS (SWD)**  
> **Technical Handover & Operational Runbook**  
> **Website:** `https://shivamwebdesigns.devs.li`  
> **Support:** `shivamwebdesigns23@gmail.com`  

---

## 1. Handover Overview
Congratulations on the successful launch of your website. This guide contains everything your organization needs to access, operate, host, and maintain your digital platform.

---

## 2. Codebase & Repository Access

### A. Repository Transfer / Invitation
- **Hosting Platform:** GitHub (`https://github.com/[ClientOrg]/[Repository]`)
- **Permission Level:** Admin / Owner transferred to `[Client GitHub Handle]`.
- **Primary Production Branch:** `main` (auto-deploys to production).
- **Staging / Preview Branch:** `preview` (deploys to staging environment).

### B. Offline Code Archive
- A standalone, production-ready `.zip` archive containing all source files, compiled CSS, vector SVGs, and documentation is provided via encrypted secure link.
- **Archive Contents:**
  ```text
  ├── index.html               # Main production homepage
  ├── styles.css               # Clean modular CSS stylesheet
  ├── script.js                # Vanilla ES2022 interactive JavaScript
  ├── assets/                  # High-resolution WebP imagery and SVG icons
  ├── sitemap.xml              # Search engine index manifest
  ├── robots.txt               # Web crawler instructions
  └── docs/                    # Architectural notes & component specifications
  ```

---

## 3. Hosting & Deployment Architecture

Your website is engineered on a modern static edge stack for maximum speed, security, and near-zero server maintenance costs.

### Recommended Edge Hosts
1. **Vercel (Recommended):**
   - Connect your GitHub repository.
   - Framework preset: `Other` (pure static HTML/CSS/JS).
   - Root directory: `./` (or `website/` depending on setup).
   - Global CDN deployment with automatic SSL certificate renewal.
2. **Cloudflare Pages:**
   - Unlimited bandwidth and edge caching across 300+ global data centers.
3. **Netlify:**
   - Seamless one-click git-based builds and built-in form handling.

---

## 4. Domain & DNS Cutover Instructions

To point your custom domain (e.g., `yourbrand.com`) to your production edge host:

### Standard DNS Record Configuration

| Record Type | Host / Name | Target / Destination Value | TTL |
| :---: | :---: | :--- | :---: |
| **A** | `@` (apex) | `76.76.21.21` *(Vercel Apex IP)* | Auto / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` *(or Cloudflare/Netlify CNAME)* | Auto / 3600 |

*Note: DNS propagation typically takes between 15 minutes and 24 hours depending on your registrar (GoDaddy, Namecheap, Cloudflare, Google Domains).*

---

## 5. Contact Form & Email Notifications

1. **Form Handling Engine:** Serverless edge dispatch via `Formspree` / `Web3Forms` / `Resend`.
2. **Destination Inbox:** Form submissions are routed directly to: `[Client Notification Email]`.
3. **Spam Protection:** Integrated honeypot input field (`name="_gotcha"`) and bot filtering.

---

## 6. Post-Handover Security Protocol
For maximum operational safety:
- [ ] Transfer ownership of the GitHub repository to your corporate GitHub account.
- [ ] Rotate any temporary passwords shared during development for domain or hosting platforms.
- [ ] Enable Two-Factor Authentication (2FA) across your domain registrar and DNS control panel.
- [ ] Store your master code backup archive in secure cloud storage (Google Drive / AWS S3).
