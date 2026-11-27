import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const logoPath = path.join(rootDir, 'public', 'assets', 'logo-trimmed.png');
if (!fs.existsSync(logoPath)) {
  console.error('Logo file missing at:', logoPath);
  process.exit(1);
}

const logoBase64 = fs.readFileSync(logoPath).toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1280px;
    height: 640px;
    overflow: hidden;
    background-color: #050507;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  /* Ambient background glows & micro-grid */
  .bg-glow {
    position: absolute;
    top: -60px;
    left: 20%;
    width: 600px;
    height: 500px;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 70%);
    pointer-events: none;
  }
  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.45;
    pointer-events: none;
  }

  /* Main Container */
  .main-container {
    position: relative;
    width: 1200px;
    height: 564px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(14, 14, 18, 0.92) 0%, rgba(8, 8, 10, 0.98) 100%);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    display: flex;
    padding: 44px 48px;
    gap: 48px;
    z-index: 2;
  }

  /* Left Column: Brand & Identity */
  .left-col {
    flex: 1.05;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 12px;
  }

  .brand-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .logo-box {
    margin-bottom: 20px;
    filter: drop-shadow(0 6px 18px rgba(255, 255, 255, 0.1));
  }
  .logo-img {
    height: 68px;
    width: auto;
    object-fit: contain;
    mix-blend-mode: screen;
  }
  .studio-name {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #ffffff;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .studio-tagline {
    font-size: 19px;
    font-style: italic;
    color: #e4e4e7;
    font-family: Georgia, Cambria, "Times New Roman", serif;
    letter-spacing: 0.015em;
    margin-bottom: 16px;
  }
  .studio-bio {
    font-size: 14.5px;
    color: #a1a1aa;
    line-height: 1.6;
    letter-spacing: 0.01em;
    max-width: 440px;
  }

  .left-footer {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .meta-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #a1a1aa;
  }
  .meta-tag .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
  }

  .domain-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 8px 18px;
    border-radius: 999px;
    letter-spacing: 0.02em;
  }
  .domain-pill svg {
    stroke: #ffffff;
  }

  /* Vertical Divider */
  .col-divider {
    width: 1px;
    background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.12) 20%, rgba(255, 255, 255, 0.12) 80%, transparent 100%);
  }

  /* Right Column: Studio Services Bento */
  .right-col {
    flex: 1.35;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .section-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .section-title {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #71717a;
  }
  .section-badge {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 11px;
    color: #a1a1aa;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 4px 10px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  /* 2x2 Services Grid */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    flex: 1;
  }
  .service-card {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .card-title {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: #ffffff;
  }
  .card-num {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 11px;
    color: #52525b;
  }
  .card-desc {
    font-size: 12.5px;
    color: #a1a1aa;
    line-height: 1.55;
    letter-spacing: 0.005em;
    margin-bottom: 12px;
  }
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tag {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 10.5px;
    color: #d4d4d8;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.02em;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="bg-grid"></div>

  <div class="main-container">
    <!-- Left Column: Studio Brand -->
    <div class="left-col">
      <div class="brand-header">
        <div class="logo-box">
          <img class="logo-img" src="data:image/png;base64,${logoBase64}" alt="SWD Monogram">
        </div>
        <h1 class="studio-name">Shivam Web Designs</h1>
        <p class="studio-tagline">Where Design Meets Digital Excellence.</p>
        <p class="studio-bio">
          Independent design & engineering studio crafting tailored digital flagships, considered UI/UX, and sub-second web experiences.
        </p>
      </div>

      <div class="left-footer">
        <div class="meta-tag">
          <div class="status-dot"></div>
          <span>Accepting New Projects &bull; Worldwide</span>
        </div>
        <div class="domain-pill">
          <span>shivamwebdesigns.devs.li</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="col-divider"></div>

    <!-- Right Column: Core Services -->
    <div class="right-col">
      <div class="section-label">
        <span class="section-title">Core Studio Capabilities</span>
        <span class="section-badge">Client Deliverables</span>
      </div>

      <div class="services-grid">
        <!-- 01: Website Design -->
        <div class="service-card">
          <div>
            <div class="card-top">
              <h3 class="card-title">Website Design</h3>
              <span class="card-num">01</span>
            </div>
            <p class="card-desc">Bespoke visual identity, editorial Swiss typography, art direction & comprehensive design systems.</p>
          </div>
          <div class="card-tags">
            <span class="tag">Figma Prototyping</span>
            <span class="tag">Design Systems</span>
            <span class="tag">Art Direction</span>
          </div>
        </div>

        <!-- 02: Frontend Development -->
        <div class="service-card">
          <div>
            <div class="card-top">
              <h3 class="card-title">Frontend Engineering</h3>
              <span class="card-num">02</span>
            </div>
            <p class="card-desc">Modern web engineering, fluid 60fps animations, accessible semantic HTML, and zero bloat.</p>
          </div>
          <div class="card-tags">
            <span class="tag">Web Development</span>
            <span class="tag">Clean Code</span>
            <span class="tag">Interactive UI</span>
          </div>
        </div>

        <!-- 03: UI/UX Architecture -->
        <div class="service-card">
          <div>
            <div class="card-top">
              <h3 class="card-title">UI/UX Architecture</h3>
              <span class="card-num">03</span>
            </div>
            <p class="card-desc">Intuitive user journeys, conversion-focused wireframing, and streamlined product workflows.</p>
          </div>
          <div class="card-tags">
            <span class="tag">User Flows</span>
            <span class="tag">Wireframing</span>
            <span class="tag">Conversion UX</span>
          </div>
        </div>

        <!-- 04: Redesign & Spatial 3D -->
        <div class="service-card">
          <div>
            <div class="card-top">
              <h3 class="card-title">Redesign & Spatial 3D</h3>
              <span class="card-num">04</span>
            </div>
            <p class="card-desc">Transforming legacy sites into modern flagships with 3D physical card simulation & 100 CWV.</p>
          </div>
          <div class="card-tags">
            <span class="tag">Website Modernization</span>
            <span class="tag">Spatial 3D</span>
            <span class="tag">100/100 CWV</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempHtml = path.join(rootDir, '.temp_social_preview.html');
fs.writeFileSync(tempHtml, htmlContent);

const outputPng = path.join(rootDir, 'public', 'assets', 'github-social-preview.png');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

console.log('Rendering Un-slopped 1280x640 Services Social Media Preview...');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${outputPng}" --window-size=1280,640 --default-background-color=050507 "${tempHtml}"`);

fs.unlinkSync(tempHtml);

// Mirror files
const targets = [
  path.join(rootDir, 'public', 'assets', 'social-preview.png'),
  path.join(rootDir, 'website', 'assets', 'github-social-preview.png'),
  path.join(rootDir, 'website', 'assets', 'social-preview.png'),
  path.join(rootDir, 'website', 'brand-kit', '1_Banners', 'Shivamwebdesigns_Social_Preview_1280x640.png')
];

for (const target of targets) {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(outputPng, target);
  console.log('Mirrored to:', target);
}

console.log('Successfully generated and mirrored un-slopped services social preview!');
