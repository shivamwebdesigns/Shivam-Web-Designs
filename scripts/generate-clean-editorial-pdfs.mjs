import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read crisp black logo
const logoPath = path.join(rootDir, 'public', 'assets', 'logo-dark.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Also copy dark logo to brand identity folder
const brandLogoDark = path.join(rootDir, 'ShivamWebDesigns-Business-System', '01-BRAND-IDENTITY', 'LOGO', 'SWD-Logo-Dark.png');
fs.copyFileSync(logoPath, brandLogoDark);

const baseEditorialCss = `
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 12mm 14mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: #ffffff;
    color: #18181b;
    line-height: 1.45;
    font-size: 8.8pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Header */
  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #18181b;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }
  .doc-logo {
    height: 32px;
    width: auto;
    display: block;
  }
  .doc-meta {
    text-align: right;
    font-size: 7.5pt;
    font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
    color: #71717a;
    line-height: 1.35;
  }
  .doc-meta strong {
    color: #09090b;
    font-size: 8pt;
  }

  /* Typography */
  h1 {
    font-size: 17pt;
    font-weight: 700;
    color: #09090b;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin-bottom: 3px;
  }
  .doc-subtitle {
    font-size: 9.2pt;
    color: #52525b;
    font-style: italic;
    font-family: Georgia, serif;
    margin-bottom: 10px;
    line-height: 1.35;
  }
  h2 {
    font-size: 9.8pt;
    font-weight: 700;
    color: #09090b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e4e4e7;
    padding-bottom: 3px;
    margin: 11px 0 7px 0;
  }
  h3 {
    font-size: 9pt;
    font-weight: 600;
    color: #18181b;
    margin-bottom: 2px;
  }
  p {
    color: #27272a;
    margin-bottom: 6px;
    font-size: 8.6pt;
    line-height: 1.45;
  }
  p strong {
    color: #09090b;
  }

  /* Cards & Callouts */
  .callout-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #09090b;
    border-radius: 4px;
    padding: 7px 11px;
    margin: 8px 0;
    font-size: 8.4pt;
    line-height: 1.4;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 8px;
  }
  .card-item {
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 5px;
    padding: 7px 10px;
    page-break-inside: avoid;
  }
  .card-item strong {
    display: block;
    font-size: 8.8pt;
    color: #09090b;
    margin-bottom: 2px;
  }
  .card-item p {
    font-size: 8pt;
    color: #52525b;
    margin-bottom: 0;
    line-height: 1.35;
  }

  /* Numbered Steps */
  .step-row {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 5px;
    padding: 6px 10px;
    margin-bottom: 6px;
    page-break-inside: avoid;
  }
  .step-badge {
    background: #09090b;
    color: #ffffff;
    font-family: ui-monospace, Menlo, monospace;
    font-size: 7.8pt;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .step-body strong {
    color: #09090b;
    font-size: 8.8pt;
    display: block;
  }
  .step-body p {
    color: #52525b;
    font-size: 8pt;
    margin: 1px 0 0 0;
    line-height: 1.35;
  }

  /* Clean Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 10px 0;
    font-size: 8pt;
    page-break-inside: avoid;
  }
  th {
    background: #f4f4f5;
    color: #18181b;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 7.2pt;
    letter-spacing: 0.05em;
    padding: 5px 8px;
    border-top: 1px solid #e4e4e7;
    border-bottom: 1.5px solid #09090b;
    text-align: left;
  }
  td {
    padding: 5px 8px;
    border-bottom: 1px solid #e4e4e7;
    color: #27272a;
    vertical-align: top;
    line-height: 1.35;
  }
  td.right, th.right {
    text-align: right;
  }
  tr.total-row td {
    border-top: 1.5px solid #09090b;
    border-bottom: 2px solid #09090b;
    font-weight: 700;
    color: #09090b;
    font-size: 8.5pt;
    background: #fafafa;
  }

  /* Signatures */
  .sig-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 10px;
    padding-top: 6px;
    page-break-inside: avoid;
  }
  .sig-box {
    border-top: 1px solid #a1a1aa;
    padding-top: 5px;
    font-size: 7.8pt;
    color: #52525b;
    line-height: 1.4;
  }
  .sig-box strong {
    color: #09090b;
    display: block;
    margin-bottom: 1px;
  }

  /* Footer */
  .doc-footer {
    border-top: 1px solid #e4e4e7;
    padding-top: 6px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    font-size: 7.2pt;
    color: #71717a;
    font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
    page-break-inside: avoid;
  }
  .doc-footer a {
    color: #18181b;
    text-decoration: none;
    font-weight: 500;
  }

  .page-break {
    page-break-after: always;
  }
`;

function renderPdf(html, outputPath) {
  const tempFile = path.join(rootDir, `.temp_pdf_${Date.now()}.html`);
  fs.writeFileSync(tempFile, html);
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  execSync(`"${chromePath}" --headless --disable-gpu --print-to-pdf="${outputPath}" --no-pdf-header-footer "${tempFile}"`);
  fs.unlinkSync(tempFile);
  console.log(`Rendered: ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
}

// -------------------------------------------------------------
// 1. AGENCY-PROFILE.pdf (Exactly 2 Balanced Pages)
// -------------------------------------------------------------
const agencyProfileHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ShivamWebDesigns — Agency Profile</title>
<style>${baseEditorialCss}</style>
</head>
<body>
  <!-- PAGE 1 -->
  <div class="doc-header">
    <img src="data:image/png;base64,${logoBase64}" class="doc-logo" alt="SWD">
    <div class="doc-meta">
      <strong>SHIVAMWEBDESIGNS</strong><br>
      Agency Profile & Studio Capabilities<br>
      Ref: SWD-PROFILE-2026
    </div>
  </div>

  <h1>Agency Profile & Capabilities</h1>
  <div class="doc-subtitle">Where Design Meets Digital Excellence &bull; Independent Web Design & Engineering Studio</div>

  <p><strong>ShivamWebDesigns</strong> is an independent, service-based web design and engineering studio. We design and build bespoke digital flagships, high-performance web applications, and considered digital experiences for founders, businesses, and discerning brands worldwide.</p>

  <p>We operate at the intersection of <strong>rigorous visual craftsmanship</strong> and <strong>clean frontend engineering</strong>. In an era inundated with generic website builders and bloated themes, SWD champions timeless Swiss editorial design, sub-second edge loading speeds, and uncompromising attention to detail.</p>

  <h2>Core Studio Capabilities</h2>

  <div class="grid-2">
    <div class="card-item">
      <strong>01. Website Design & Art Direction</strong>
      <p>Custom Figma prototypes, balanced typographic systems, responsive modular grids, and cohesive brand design tokens for mobile, tablet, and desktop viewports.</p>
    </div>
    <div class="card-item">
      <strong>02. Clean Frontend Engineering</strong>
      <p>Standards-compliant web code built with pure semantic HTML5, modern CSS, and vanilla ES2022 JavaScript or Next.js 15 / TypeScript for edge performance.</p>
    </div>
    <div class="card-item">
      <strong>03. UI/UX Architecture & Conversion</strong>
      <p>Intuitive user journeys, conversion funnel design, accessible focus states, 44px+ touch targets, and full WCAG 2.1 AA accessibility compliance.</p>
    </div>
    <div class="card-item">
      <strong>04. Website Redesign & Modernization</strong>
      <p>Systematic audits of slow, legacy websites, full performance migration to clean edge hosting, and complete preservation of existing SEO search rankings.</p>
    </div>
    <div class="card-item" style="grid-column: span 2;">
      <strong>05. Spatial 3D & Micro-Interactions</strong>
      <p>Subtle 3D physics-based interactive previews (such as the signature SWD 3D digital business card with gyroscope and drag physics) and fluid 60fps GPU-accelerated micro-interactions.</p>
    </div>
  </div>

  <div class="callout-box">
    <strong>Studio Philosophy: Pure Edge Performance</strong><br>
    Zero framework bloat. Every line of code is engineered for sub-second loading speeds (< 1.2s LCP) and optimal Google Lighthouse scores (95+ across all performance pillars).
  </div>

  <div class="doc-footer">
    <div>ShivamWebDesigns &bull; Creative Director: Shivam Purohit</div>
    <div>Page 1 of 2 &bull; <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 2 -->
  <div class="doc-header">
    <img src="data:image/png;base64,${logoBase64}" class="doc-logo" alt="SWD">
    <div class="doc-meta">
      <strong>SHIVAMWEBDESIGNS</strong><br>
      Process, Portfolio & Operating Standards<br>
      Ref: SWD-PROFILE-2026
    </div>
  </div>

  <h2>The 4-Stage Working Method</h2>

  <div class="step-row">
    <div class="step-badge">01</div>
    <div class="step-body">
      <strong>Discovery & Technical Diagnosis</strong>
      <p>Deep-dive into business objectives, brand positioning, audience psychology, and existing architectural bottlenecks.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">02</div>
    <div class="step-body">
      <strong>Art Direction & Interactive Prototyping</strong>
      <p>Bespoke Figma wireframes, editorial typography pairings, and layout sign-off before a single line of production code is written.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">03</div>
    <div class="step-body">
      <strong>Clean-Code Production Engineering</strong>
      <p>Standards-compliant frontend development, cross-viewport responsive calibration, and Core Web Vitals optimization.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">04</div>
    <div class="step-body">
      <strong>Staging Audit, DNS Cutover & Handover</strong>
      <p>Rigorous pre-flight checklist verification, zero-downtime domain launch, complete source code handover, and post-launch warranty.</p>
    </div>
  </div>

  <h2>Verified Studio Portfolio Case Studies</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Project</th>
        <th style="width: 28%;">Industry Domain</th>
        <th>Architectural & Aesthetic Highlights</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Nexus Analytics</strong></td>
        <td>Enterprise SaaS / FinTech</td>
        <td>Real-time interactive dashboard, glassmorphism UI, responsive data tables, sub-second renders.</td>
      </tr>
      <tr>
        <td><strong>Chrono Luxury</strong></td>
        <td>Haute Horlogerie / E-Commerce</td>
        <td>Swiss luxury watch catalog, interactive 3D product previews, monochrome editorial layout.</td>
      </tr>
      <tr>
        <td><strong>Aura Audio</strong></td>
        <td>Spatial Acoustics / Hardware</td>
        <td>Immersive flagship with fluid scroll-driven animations, technical audio specs, and zero layout shift.</td>
      </tr>
      <tr>
        <td><strong>Revista Magazine</strong></td>
        <td>Editorial Culture & Arts</td>
        <td>High-contrast editorial publication platform with instant article navigation and typographic precision.</td>
      </tr>
    </tbody>
  </table>

  <h2>Studio Operating Standards</h2>
  <div class="card-item" style="margin-bottom: 10px;">
    <p><strong>&bull; 100% Intellectual Property Ownership:</strong> Upon final settlement, all custom design files and source code belong unreservedly to the client.<br>
    <strong>&bull; Structured Milestone Billing:</strong> Standard 50% deposit before kickoff and 50% upon final sign-off prior to production DNS cutover.<br>
    <strong>&bull; 30-Day Launch Warranty:</strong> Every delivery includes a complimentary 30-day technical warranty covering code defects and responsive refinements.</p>
  </div>

  <h2>Official Studio Coordinates</h2>
  <div class="grid-2">
    <div>
      <p style="font-size: 8pt; margin-bottom: 2px;"><strong>Studio Website:</strong> <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></p>
      <p style="font-size: 8pt; margin-bottom: 2px;"><strong>Digital Business Card:</strong> <a href="https://shivamwebdesigns.devs.li/businesscard">shivamwebdesigns.devs.li/businesscard</a></p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>Official Inquiries:</strong> shivamwebdesigns23@gmail.com</p>
    </div>
    <div>
      <p style="font-size: 8pt; margin-bottom: 2px;"><strong>WhatsApp Desk:</strong> +91 78619 65480</p>
      <p style="font-size: 8pt; margin-bottom: 2px;"><strong>LinkedIn:</strong> linkedin.com/company/shivamwebdesigns</p>
      <p style="font-size: 8pt; margin-bottom: 0;"><strong>GitHub:</strong> github.com/shivamwebdesigns</p>
    </div>
  </div>

  <div class="doc-footer">
    <div>ShivamWebDesigns &bull; Creative Director: Shivam Purohit</div>
    <div>Page 2 of 2 &bull; <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></div>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// 2. WELCOME-KIT.pdf (Exactly 1 Master Page)
// -------------------------------------------------------------
const welcomeKitHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ShivamWebDesigns — Client Welcome Kit</title>
<style>${baseEditorialCss}</style>
</head>
<body>
  <div class="doc-header">
    <img src="data:image/png;base64,${logoBase64}" class="doc-logo" alt="SWD">
    <div class="doc-meta">
      <strong>SHIVAMWEBDESIGNS</strong><br>
      Client Welcome Kit & Onboarding Guide<br>
      Ref: SWD-WELCOME-2026
    </div>
  </div>

  <h1>Client Welcome Kit & Onboarding Guide</h1>
  <div class="doc-subtitle">Welcome to our studio. Let's create something extraordinary together.</div>

  <p>Thank you for partnering with <strong>ShivamWebDesigns</strong>. We are committed to engineering an exceptional, sub-second digital flagship that elevates your brand authority and drives commercial growth.</p>

  <h2>Your 4 Onboarding Steps</h2>

  <div class="step-row">
    <div class="step-badge">01</div>
    <div class="step-body">
      <strong>Complete the Client Onboarding Brief</strong>
      <p>Submit your key stakeholders, primary objectives, brand guidelines, and target audience via our onboarding brief.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">02</div>
    <div class="step-body">
      <strong>Upload Assets to Shared Google Drive</strong>
      <p>Deposit high-resolution vector logos (.SVG, .AI, .EPS), brand fonts, photography, and written text into your private project folder.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">03</div>
    <div class="step-body">
      <strong>Grant Domain & Technical Access</strong>
      <p>Provide delegated access to your domain registrar (GoDaddy, Namecheap, Cloudflare) or prepare for guided DNS cutover at launch.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">04</div>
    <div class="step-body">
      <strong>Attend the 30-Minute Sprint Kickoff Call</strong>
      <p>Review interactive design references, align on milestone deadlines, and confirm project sprint velocity via Google Meet.</p>
    </div>
  </div>

  <h2>Studio Communication Channels & SLAs</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Channel</th>
        <th style="width: 45%;">Designated Purpose</th>
        <th class="right">Guaranteed SLA</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Email Desk</strong><br><span style="font-size: 7.2pt; color: #71717a;">shivamwebdesigns23@gmail.com</span></td>
        <td>Formal approvals, scope sign-offs, milestone invoices, and consolidated revision lists.</td>
        <td class="right">Within 24 business hours</td>
      </tr>
      <tr>
        <td><strong>WhatsApp Desk</strong><br><span style="font-size: 7.2pt; color: #71717a;">+91 78619 65480</span></td>
        <td>Tactical updates, urgent queries, staging preview notifications, and call scheduling.</td>
        <td class="right">Within 2–4 business hours</td>
      </tr>
      <tr>
        <td><strong>Google Meet</strong><br><span style="font-size: 7.2pt; color: #71717a;">Video Conference</span></td>
        <td>Sprint kickoff, interactive Figma walkthrough, and final production handover demonstration.</td>
        <td class="right">Scheduled 24h in advance</td>
      </tr>
    </tbody>
  </table>

  <h2>Studio Operating Commitments</h2>

  <div class="callout-box">
    <strong>&bull; 100% Intellectual Property Ownership:</strong> You own all custom design assets and source code upon final settlement.<br>
    <strong>&bull; Sub-Second Performance:</strong> Built with zero framework bloat, targeting 95+ Google Lighthouse scores.<br>
    <strong>&bull; 30-Day Launch Warranty:</strong> Complimentary technical support and bug fixes included post-deployment.
  </div>

  <div class="doc-footer">
    <div>ShivamWebDesigns &bull; Creative Director: Shivam Purohit</div>
    <div>Official Client Document &bull; <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></div>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// 3. PROJECT-PROPOSAL.pdf (Exactly 2 Balanced Pages)
// -------------------------------------------------------------
const projectProposalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ShivamWebDesigns — Project Proposal</title>
<style>${baseEditorialCss}</style>
</head>
<body>
  <!-- PAGE 1 -->
  <div class="doc-header">
    <img src="data:image/png;base64,${logoBase64}" class="doc-logo" alt="SWD">
    <div class="doc-meta">
      <strong>PROJECT PROPOSAL</strong><br>
      Ref: SWD-PROP-2026-XXXX<br>
      Validity: 14 Calendar Days
    </div>
  </div>

  <h1>Bespoke Digital Flagship Proposal</h1>
  <div class="doc-subtitle">Engineered for Brand Authority, Sub-Second Performance & Maximum Conversion</div>

  <div class="card-item" style="margin-bottom: 10px; background: #fafafa;">
    <div class="grid-2" style="margin-bottom: 0;">
      <div>
        <p style="font-size: 8pt; margin-bottom: 1px;"><strong>Client Organization:</strong> [Client Company / Brand Name]</p>
        <p style="font-size: 8pt; margin-bottom: 0;"><strong>Attention:</strong> [Client Contact Name & Title]</p>
      </div>
      <div>
        <p style="font-size: 8pt; margin-bottom: 1px;"><strong>Prepared By:</strong> Shivam Purohit, Creative Director</p>
        <p style="font-size: 8pt; margin-bottom: 0;"><strong>Date of Issuance:</strong> [YYYY-MM-DD]</p>
      </div>
    </div>
  </div>

  <h2>1. Executive Summary & Strategic Vision</h2>
  <p><strong>[Client Company Name]</strong> is recognized for delivering high-caliber products and services. To reinforce this reputation and capture premium client inquiries, your digital presence must project identical craftsmanship and authority.</p>
  <p><strong>ShivamWebDesigns</strong> proposes to architect and build a bespoke digital flagship that eliminates legacy friction, elevates visual credibility through Swiss typography and bespoke art direction, and delivers instant sub-second page loads across all modern devices.</p>

  <h2>2. Problem Diagnosis & Strategic Objectives</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 30%;">Current Friction Point</th>
        <th style="width: 35%;">Strategic Solution</th>
        <th>Commercial Impact</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Outdated Visual Presence:</strong> Template appearance fails to convey market leadership.</td>
        <td><strong>Bespoke Swiss Editorial Design:</strong> Custom typography, high-contrast layouts, tailored design tokens.</td>
        <td>Instant visitor credibility, elevated brand prestige, higher pricing power.</td>
      </tr>
      <tr>
        <td><strong>Mobile Layout Friction:</strong> Slow tap responses and unoptimized mobile viewports.</td>
        <td><strong>Mobile-First Architecture:</strong> Fluid viewport scaling, 44px+ touch targets, zero layout shift.</td>
        <td>Reduced bounce rate, increased mobile consultation inquiries.</td>
      </tr>
      <tr>
        <td><strong>Sluggish Page Loads:</strong> Heavy plugins dragging down SEO and user engagement.</td>
        <td><strong>Sub-Second Edge Engineering:</strong> Clean code, zero bloat, 95+ Google Lighthouse scores.</td>
        <td>Superior Google rankings, instant page navigation, seamless UX.</td>
      </tr>
    </tbody>
  </table>

  <h2>3. Scope of Work (Phases 1 & 2)</h2>
  <div class="grid-2">
    <div class="card-item">
      <strong>Phase 1: Brand Discovery & Art Direction</strong>
      <p>&bull; Comprehensive technical and visual brand audit.<br>
      &bull; Custom Figma interactive wireframes and layout grids.<br>
      &bull; Typographic scale, color palette, and component tokens.<br>
      &bull; Formal design review and prototype approval milestone.</p>
    </div>
    <div class="card-item">
      <strong>Phase 2: Frontend Engineering & Staging</strong>
      <p>&bull; Clean-code build using modern HTML5, CSS, and ES2022.<br>
      &bull; Fluid 60fps micro-interactions and responsive tuning.<br>
      &bull; Custom inquiry intake form with spam protection.<br>
      &bull; Deployment to private staging URL for client testing.</p>
    </div>
  </div>

  <div class="doc-footer">
    <div>ShivamWebDesigns &bull; Proposal: [Client Company Name]</div>
    <div>Page 1 of 2 &bull; <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 2 -->
  <div class="doc-header">
    <img src="data:image/png;base64,${logoBase64}" class="doc-logo" alt="SWD">
    <div class="doc-meta">
      <strong>PROJECT PROPOSAL</strong><br>
      Ref: SWD-PROP-2026-XXXX<br>
      Phase 3–4, Timeline & Commercials
    </div>
  </div>

  <h2>3. Scope of Work (Phases 3 & 4)</h2>
  <div class="grid-2">
    <div class="card-item">
      <strong>Phase 3: QA, Accessibility & SEO</strong>
      <p>&bull; Cross-browser audits (Safari, Chrome, Firefox, iOS, Android).<br>
      &bull; Core Web Vitals optimization (<1.2s LCP, zero CLS).<br>
      &bull; Open Graph and Twitter Card social previews.<br>
      &bull; XML sitemap, robots.txt, and canonical SEO tags.</p>
    </div>
    <div class="card-item">
      <strong>Phase 4: Production Launch & Handover</strong>
      <p>&bull; Zero-downtime DNS cutover and custom domain SSL setup.<br>
      &bull; Google Search Console sitemap submission.<br>
      &bull; Full source code handover and deployment documentation.<br>
      &bull; 30-day post-launch technical warranty.</p>
    </div>
  </div>

  <h2>4. Sprint Schedule & Delivery Timeline</h2>
  <div class="step-row">
    <div class="step-badge">W1</div>
    <div class="step-body">
      <strong>Discovery, Onboarding & Information Architecture</strong>
      <p>Asset collection, competitor audit, user journey mapping, and structural wireframing.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">W2–3</div>
    <div class="step-body">
      <strong>Figma Art Direction, Prototyping & Design Sign-Off</strong>
      <p>Interactive high-fidelity prototypes, typography system, and formal client design approval.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">W4–5</div>
    <div class="step-body">
      <strong>Frontend Engineering, Staging Deployment & Review</strong>
      <p>Production coding, responsive calibration, staging preview, and consolidated revisions.</p>
    </div>
  </div>
  <div class="step-row">
    <div class="step-badge">W6</div>
    <div class="step-body">
      <strong>Pre-Flight QA, DNS Cutover & Official Handover</strong>
      <p>35-point QA checklist verification, live domain cutover, and repository/asset transfer.</p>
    </div>
  </div>

  <h2>5. Commercial Investment & Payment Terms</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 30%;">Milestone</th>
        <th style="width: 45%;">Deliverables Covered</th>
        <th class="right">Allocation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Milestone 1 (Deposit)</strong></td>
        <td>Project kickoff, discovery, Figma art direction, and prototype sign-off.</td>
        <td class="right"><strong>50% Deposit</strong> ([Currency Amount])</td>
      </tr>
      <tr>
        <td><strong>Milestone 2 (Settlement)</strong></td>
        <td>Staging completion, revisions, and approval prior to production DNS cutover.</td>
        <td class="right"><strong>50% Balance</strong> ([Currency Amount])</td>
      </tr>
      <tr class="total-row">
        <td colspan="2">TOTAL PROJECT INVESTMENT</td>
        <td class="right"><strong>[Total Investment Placeholder]</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>6. Acceptance & Authorization</h2>
  <p style="margin-bottom: 6px;">To accept this proposal and reserve our upcoming sprint schedule, please sign below or confirm via email to <strong>shivamwebdesigns23@gmail.com</strong>.</p>

  <div class="sig-section">
    <div class="sig-box">
      <strong>For [Client Company Name]:</strong>
      Signature: ________________________________<br>
      Name & Title: [Client Signatory Name & Title]<br>
      Date: ____________________________________
    </div>
    <div class="sig-box">
      <strong>For ShivamWebDesigns (SWD):</strong>
      Signature: ________________________________<br>
      Name & Title: Shivam Purohit, Lead Developer<br>
      Date: ____________________________________
    </div>
  </div>

  <div class="doc-footer">
    <div>ShivamWebDesigns &bull; Proposal: [Client Company Name]</div>
    <div>Page 2 of 2 &bull; <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></div>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// 4. QUOTATION-TEMPLATE.pdf (Exactly 1 Master Financial Page)
// -------------------------------------------------------------
const quotationTemplateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ShivamWebDesigns — Commercial Quotation</title>
<style>${baseEditorialCss}</style>
</head>
<body>
  <div class="doc-header">
    <img src="data:image/png;base64,${logoBase64}" class="doc-logo" alt="SWD">
    <div class="doc-meta">
      <strong>COMMERCIAL QUOTATION</strong><br>
      Ref: SWD-QUO-2026-XXXX<br>
      Validity: 14 Calendar Days
    </div>
  </div>

  <h1>Itemized Commercial Quotation</h1>
  <div class="doc-subtitle">Transparent Project Scope, Milestone Deliverables & Investment Breakdown</div>

  <div class="card-item" style="margin-bottom: 9px; background: #fafafa;">
    <div class="grid-2" style="margin-bottom: 0;">
      <div>
        <p style="font-size: 8pt; margin-bottom: 1px;"><strong>Client Organization:</strong> [Client Company Name]</p>
        <p style="font-size: 8pt; margin-bottom: 1px;"><strong>Attention:</strong> [Client Contact Name & Title]</p>
        <p style="font-size: 8pt; margin-bottom: 0;"><strong>Billing Address:</strong> [Client City, Country]</p>
      </div>
      <div>
        <p style="font-size: 8pt; margin-bottom: 1px;"><strong>Service Provider:</strong> ShivamWebDesigns (SWD)</p>
        <p style="font-size: 8pt; margin-bottom: 1px;"><strong>Date of Issuance:</strong> [YYYY-MM-DD]</p>
        <p style="font-size: 8pt; margin-bottom: 0;"><strong>Contact Desk:</strong> shivamwebdesigns23@gmail.com</p>
      </div>
    </div>
  </div>

  <h2>1. Itemized Deliverables Schedule</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 8%;">Item</th>
        <th style="width: 32%;">Service Description</th>
        <th style="width: 42%;">Scope & Deliverable Specifications</th>
        <th class="right">Total ([Curr])</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>01</strong></td>
        <td><strong>Bespoke Website Design & Art Direction</strong></td>
        <td>Custom Figma prototype, modular grid system, editorial typography pairing, responsive mobile/tablet specs.</td>
        <td class="right">[Amount]</td>
      </tr>
      <tr>
        <td><strong>02</strong></td>
        <td><strong>Clean Frontend Engineering</strong></td>
        <td>Standards-compliant semantic HTML5, modern CSS, vanilla ES2022 / Next.js, sub-second edge speeds.</td>
        <td class="right">[Amount]</td>
      </tr>
      <tr>
        <td><strong>03</strong></td>
        <td><strong>Interactive Inquiry Configurator</strong></td>
        <td>Custom lead intake form, serverless email routing, spam honeypot, and confirmation feedback.</td>
        <td class="right">[Amount]</td>
      </tr>
      <tr>
        <td><strong>04</strong></td>
        <td><strong>Performance & SEO Architecture</strong></td>
        <td>100/100 Core Web Vitals calibration (<1s LCP), Open Graph social cards, JSON-LD schema, sitemap.</td>
        <td class="right">[Amount]</td>
      </tr>
      <tr>
        <td><strong>05</strong></td>
        <td><strong>DNS Cutover & 30-Day Warranty</strong></td>
        <td>Zero-downtime domain cutover, SSL setup, source code handover, and 30-day post-launch warranty.</td>
        <td class="right">Included</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: right; font-weight: 600;">SUBTOTAL:</td>
        <td class="right"><strong>[Subtotal]</strong></td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: right; font-weight: 600;">APPLICABLE TAXES:</td>
        <td class="right"><strong>[Tax Amount]</strong></td>
      </tr>
      <tr class="total-row">
        <td colspan="3" style="text-align: right; font-weight: 700;">TOTAL PROJECT INVESTMENT:</td>
        <td class="right"><strong>[Total Investment]</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>2. Milestone Payment Schedule</h2>
  <div class="grid-2">
    <div class="card-item">
      <strong>Milestone 1: 50% Kickoff Deposit</strong>
      <p style="font-size: 8pt; color: #52525b;">Amount: <strong>[50% Amount Placeholder]</strong><br>Due upon contract execution prior to sprint kickoff.</p>
    </div>
    <div class="card-item">
      <strong>Milestone 2: 50% Final Settlement</strong>
      <p style="font-size: 8pt; color: #52525b;">Amount: <strong>[50% Amount Placeholder]</strong><br>Due upon staging approval prior to production DNS cutover.</p>
    </div>
  </div>

  <h2>3. Acceptance & Client Sign-Off</h2>
  <div class="sig-section" style="margin-top: 8px;">
    <div class="sig-box">
      <strong>Accepted by Client:</strong>
      Signature: ________________________________<br>
      Printed Name: [Client Full Name]<br>
      Date: ____________________________________
    </div>
    <div class="sig-box">
      <strong>Authorized for ShivamWebDesigns:</strong>
      Signature: ________________________________<br>
      Printed Name: Shivam Purohit (Lead Developer)<br>
      Date: ____________________________________
    </div>
  </div>

  <div class="doc-footer">
    <div>ShivamWebDesigns &bull; Quotation Ref: SWD-QUO-2026-XXXX</div>
    <div>Official Commercial Quote &bull; <a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a></div>
  </div>
</body>
</html>`;

// Render all 4 PDFs
renderPdf(agencyProfileHtml, path.join(rootDir, 'ShivamWebDesigns-Business-System', '01-BRAND-IDENTITY', 'AGENCY-PROFILE.pdf'));
renderPdf(welcomeKitHtml, path.join(rootDir, 'ShivamWebDesigns-Business-System', '04-CLIENT-WELCOME-KIT', 'WELCOME-KIT.pdf'));
renderPdf(projectProposalHtml, path.join(rootDir, 'ShivamWebDesigns-Business-System', '06-PROPOSALS-AND-QUOTATIONS', 'PROJECT-PROPOSAL.pdf'));
renderPdf(quotationTemplateHtml, path.join(rootDir, 'ShivamWebDesigns-Business-System', '06-PROPOSALS-AND-QUOTATIONS', 'QUOTATION-TEMPLATE.pdf'));

console.log('All 4 clean editorial PDFs successfully re-generated!');
