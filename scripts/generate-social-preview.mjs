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
  .bg-glow-1 {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 720px;
    height: 480px;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 70%);
    pointer-events: none;
  }
  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 28px 28px;
    opacity: 0.55;
    pointer-events: none;
  }

  /* Outer Framed Container */
  .card-frame {
    position: relative;
    width: 1204px;
    height: 564px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(180deg, rgba(16, 16, 20, 0.88) 0%, rgba(9, 9, 12, 0.96) 100%);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 38px 46px;
    z-index: 2;
  }

  /* Header Row */
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .repo-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 15px;
    color: #a1a1aa;
    letter-spacing: 0.02em;
    background: rgba(255, 255, 255, 0.04);
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .repo-badge svg {
    fill: #ffffff;
    opacity: 0.95;
  }
  .repo-badge .org { color: #d4d4d8; font-weight: 500; }
  .repo-badge .slash { color: #52525b; margin: 0 2px; }
  .repo-badge .repo { color: #ffffff; font-weight: 600; }

  .status-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    font-weight: 500;
    color: #e4e4e7;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px 16px;
    border-radius: 999px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
  }

  /* Center Content */
  .center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -6px;
  }
  .logo-wrap {
    margin-bottom: 16px;
    filter: drop-shadow(0 8px 24px rgba(255, 255, 255, 0.12));
  }
  .logo-img {
    height: 98px;
    width: auto;
    object-fit: contain;
    mix-blend-mode: screen;
  }
  .title-brand {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #ffffff;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .tagline {
    font-size: 20px;
    font-style: italic;
    color: #e4e4e7;
    font-family: Georgia, Cambria, "Times New Roman", serif;
    letter-spacing: 0.02em;
    margin-bottom: 12px;
  }
  .desc {
    font-size: 15px;
    color: #a1a1aa;
    max-width: 820px;
    line-height: 1.5;
    letter-spacing: 0.01em;
  }

  /* Bottom Row */
  .bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 20px;
  }
  .tech-pills {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .pill {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    color: #d4d4d8;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    padding: 6px 14px;
    border-radius: 999px;
    letter-spacing: 0.03em;
  }
  .domain-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 7px 18px;
    border-radius: 999px;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  .domain-pill svg {
    stroke: #ffffff;
  }
</style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-grid"></div>

  <div class="card-frame">
    <!-- Top Row -->
    <div class="header-row">
      <div class="repo-badge">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        <span class="org">shivamwebdesigns</span>
        <span class="slash">/</span>
        <span class="repo">Shivam-Web-Designs</span>
      </div>

      <div class="status-pill">
        <div class="status-dot"></div>
        <span>Production Studio &bull; Next.js 15</span>
      </div>
    </div>

    <!-- Center Hero -->
    <div class="center-content">
      <div class="logo-wrap">
        <img class="logo-img" src="data:image/png;base64,${logoBase64}" alt="SWD Monogram">
      </div>
      <h1 class="title-brand">Shivam Web Designs</h1>
      <p class="tagline">Where Design Meets Digital Excellence.</p>
      <p class="desc">Bespoke Web Design &bull; Spatial 3D Business Card &bull; UI/UX Architecture &bull; Next.js 15 App Router &bull; 100/100 Core Web Vitals</p>
    </div>

    <!-- Bottom Features & Link -->
    <div class="bottom-row">
      <div class="tech-pills">
        <span class="pill">Next.js 15</span>
        <span class="pill">React 19</span>
        <span class="pill">TypeScript</span>
        <span class="pill">Tailwind CSS</span>
        <span class="pill">Spatial 3D Matrix</span>
        <span class="pill">PWA Ready</span>
      </div>

      <div class="domain-pill">
        <span>shivamwebdesigns.devs.li</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempHtml = path.join(rootDir, '.temp_social_preview.html');
fs.writeFileSync(tempHtml, htmlContent);

const outputPng = path.join(rootDir, 'public', 'assets', 'github-social-preview.png');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

console.log('Rendering 1280x640 GitHub Social Media Preview with Chrome Headless...');
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

console.log('Successfully generated and mirrored 1280x640 GitHub Social Media Preview!');
