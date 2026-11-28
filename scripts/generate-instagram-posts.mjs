import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const logoPath = path.join(rootDir, 'public', 'assets', 'swd-monogram.png');
const logoBase64 = fs.existsSync(logoPath)
  ? fs.readFileSync(logoPath).toString('base64')
  : '';

const outDir = path.join(rootDir, 'public', 'assets', 'instagram');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const posts = [
  {
    filename: 'post-1-bespoke-flagship.png',
    eyebrow: '01 // ARCHITECTURAL MANIFESTO',
    headline: 'The Death of Template Websites.',
    subheadline: 'Why generic 5MB WordPress templates are costing you high-ticket clients — and how bespoke Next.js architecture changes everything.',
    cards: [
      {
        tag: 'PERFORMANCE BENCHMARK',
        title: '< 1.2s Core Web Vitals',
        desc: 'Sub-second Largest Contentful Paint with zero Cumulative Layout Shift across mobile 4G.',
        metric: '100/100',
        metricLabel: 'SPEED SCORE'
      },
      {
        tag: 'ENGINEERING CRAFT',
        title: 'Zero Third-Party Bloat',
        desc: 'Hand-crafted semantic HTML5, modern Tailwind CSS, and pure TypeScript with zero plugin vulnerabilities.',
        metric: '0.000',
        metricLabel: 'CLS DRIFT'
      },
      {
        tag: 'COLLABORATION',
        title: 'Direct Founder Access',
        desc: 'Work directly with Shivam Purohit. Zero account managers, zero outsourcing, zero game of telephone.',
        metric: '1-on-1',
        metricLabel: 'FOUNDER LED'
      }
    ],
    footerTag: 'SHIVAMWEBDESIGNS // BESPOKE DIGITAL FLAGSHIPS'
  },
  {
    filename: 'post-2-spatial-card.png',
    eyebrow: '02 // SPATIAL IDENTITY & 3D INTERFACES',
    headline: 'Paper Business Cards Are Obsolete.',
    subheadline: 'The future of executive networking is an interactive 3D spatial card that responds to physics and lives right on your client\'s phone.',
    cards: [
      {
        tag: 'REAL-TIME 3D PHYSICS',
        title: 'Euler Spatial Geometry',
        desc: 'Hardware-accelerated CSS 3D transforms responding to finger drags and smartphone gyroscope tilt.',
        metric: '60 FPS',
        metricLabel: 'GPU KINETICS'
      },
      {
        tag: 'CONVERSION FLOW',
        title: '1-Tap vCard 3.0 Import',
        desc: 'Instant native contact saving directly into Apple Contacts & Android Address Book with zero manual typing.',
        metric: '1-TAP',
        metricLabel: 'VCF 3.0'
      },
      {
        tag: 'CROSS PLATFORM',
        title: 'Standalone Web Clip (PWA)',
        desc: 'Runs flawlessly in iOS Safari standalone mode with zero notch clipping and instant offline access.',
        metric: '100%',
        metricLabel: 'STANDALONE'
      }
    ],
    footerTag: 'SHIVAMWEBDESIGNS // SPATIAL 3D IDENTITY • /BUSINESSCARD'
  },
  {
    filename: 'post-3-fixed-sprints.png',
    eyebrow: '03 // TRANSPARENT COMMERCIAL ARCHITECTURE',
    headline: 'Fixed Sprints. Zero Hidden Fees.',
    subheadline: 'We eliminated the dreaded 45-minute discovery call and opaque agency pricing. Transparent bespoke packages starting at ₹499.',
    cards: [
      {
        tag: 'STARTER TIER',
        title: 'Starter Package • ₹499',
        desc: 'Complete high-performance digital profile page with contact triggers. Delivered in 2–3 business days.',
        metric: '₹499',
        metricLabel: 'FIXED PRICE'
      },
      {
        tag: 'GROWTH TIER (MOST POPULAR)',
        title: 'Growth Package • ₹999',
        desc: 'Complete one-page business flagship with 4–5 sections, custom inquiry form & basic SEO. 3–5 days turnaround.',
        metric: '₹999',
        metricLabel: 'ONE-TIME'
      },
      {
        tag: 'PRO FLAGSHIP',
        title: 'Pro Flagship • ₹1,499',
        desc: 'Expansive multi-page flagship up to 3 pages with advanced Core Web Vitals tuning & free subdomain setup.',
        metric: '₹1,499',
        metricLabel: 'PRO SPRINT'
      }
    ],
    footerTag: 'SHIVAMWEBDESIGNS // TRANSPARENT SPRINT PRICING • SHIVAMWEBDESIGNS.DEVS.LI'
  }
];

function generateHtml(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1350px;
    overflow: hidden;
    background-color: #050507;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 76px;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  /* Ambient dark luxury radial glows */
  .bg-glow-top {
    position: absolute;
    top: -120px;
    left: 25%;
    width: 600px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 70%);
    pointer-events: none;
  }
  .bg-glow-emerald {
    position: absolute;
    bottom: 140px;
    right: 5%;
    width: 450px;
    height: 350px;
    background: radial-gradient(ellipse at center, rgba(52, 211, 153, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.35;
    pointer-events: none;
  }

  /* Outer Border Frame */
  .border-frame {
    position: absolute;
    inset: 28px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    pointer-events: none;
  }

  /* Content wrapper */
  .header-zone {
    position: relative;
    z-index: 10;
  }
  .brand-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .logo-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .logo-img {
    height: 48px;
    width: auto;
    object-fit: contain;
  }
  .brand-titles {
    display: flex;
    flex-direction: column;
  }
  .brand-name {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .brand-subtitle {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 11px;
    color: #a3a3a3;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    margin-top: 2px;
  }
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 11px;
    color: #e5e5e5;
    letter-spacing: 0.08em;
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 10px #34d399;
  }

  .eyebrow {
    display: inline-block;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.24em;
    color: #34d399;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .headline {
    font-size: 54px;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.035em;
    color: #ffffff;
    margin-bottom: 22px;
    max-width: 900px;
  }
  .subheadline {
    font-size: 20px;
    line-height: 1.5;
    color: #a3a3a3;
    max-width: 860px;
    font-weight: 400;
  }

  /* Cards Grid */
  .cards-zone {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 40px 0;
  }
  .card-item {
    background: rgba(18, 18, 22, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    padding: 26px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(16px);
  }
  .card-info {
    max-width: 660px;
  }
  .card-tag {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #737373;
    margin-bottom: 8px;
  }
  .card-title {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 8px;
  }
  .card-desc {
    font-size: 15px;
    line-height: 1.45;
    color: #a3a3a3;
  }
  .card-metric-block {
    text-align: right;
    min-width: 140px;
    flex-shrink: 0;
  }
  .card-metric-num {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 32px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
  }
  .card-metric-label {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-size: 10px;
    font-weight: 700;
    color: #34d399;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  /* Footer Zone */
  .footer-zone {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }
  .footer-tag {
    font-size: 12px;
    color: #737373;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .footer-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .footer-cta span {
    color: #34d399;
  }
</style>
</head>
<body>
  <div class="bg-glow-top"></div>
  <div class="bg-glow-emerald"></div>
  <div class="bg-grid"></div>
  <div class="border-frame"></div>

  <div class="header-zone">
    <div class="brand-row">
      <div class="logo-group">
        ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" class="logo-img" alt="SWD Monogram">` : ''}
        <div class="brand-titles">
          <div class="brand-name">ShivamWebDesigns</div>
          <div class="brand-subtitle">Web Agency</div>
        </div>
      </div>
      <div class="status-pill">
        <div class="status-dot"></div>
        <span>BESPOKE ENGINEERING</span>
      </div>
    </div>

    <div class="eyebrow">${post.eyebrow}</div>
    <h1 class="headline">${post.headline}</h1>
    <p class="subheadline">${post.subheadline}</p>
  </div>

  <div class="cards-zone">
    ${post.cards.map(c => `
      <div class="card-item">
        <div class="card-info">
          <div class="card-tag">${c.tag}</div>
          <div class="card-title">${c.title}</div>
          <div class="card-desc">${c.desc}</div>
        </div>
        <div class="card-metric-block">
          <div class="card-metric-num">${c.metric}</div>
          <div class="card-metric-label">${c.metricLabel}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="footer-zone">
    <div class="footer-tag">${post.footerTag}</div>
    <div class="footer-cta">SWD STUDIO <span>→</span> LINK IN BIO</div>
  </div>
</body>
</html>`;
}

console.log('Generating 3 Ultra-Premium Instagram Posts (1080x1350)...');

for (const post of posts) {
  const tempHtml = path.join(rootDir, `.temp_ig_${post.filename}.html`);
  fs.writeFileSync(tempHtml, generateHtml(post));

  const outputPng = path.join(outDir, post.filename);
  console.log(`Rendering ${post.filename}...`);
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${outputPng}" --window-size=1080,1350 --default-background-color=050507 "${tempHtml}"`);

  fs.unlinkSync(tempHtml);
  console.log(`✓ Saved: ${outputPng}`);
}

console.log('All 3 Instagram posts successfully generated in public/assets/instagram/');
