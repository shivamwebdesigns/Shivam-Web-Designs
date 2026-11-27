import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const logoPath = path.join(rootDir, 'public', 'assets', 'logo-trimmed.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const baseCss = `
  @page {
    size: A4;
    margin: 16mm 14mm 16mm 14mm;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #000000;
    color: #ededed;
    line-height: 1.55;
    font-size: 10pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #222222;
    padding-bottom: 12px;
    margin-bottom: 22px;
  }
  .logo-img { height: 38px; mix-blend-mode: screen; }
  .header-meta {
    text-align: right;
    font-family: ui-monospace, Menlo, monospace;
    font-size: 8.5pt;
    color: #888888;
  }
  .header-meta strong { color: #ffffff; }
  h1 { font-size: 22pt; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 4px; }
  .subtitle { font-family: Georgia, serif; font-style: italic; font-size: 11.5pt; color: #a1a1aa; margin-bottom: 18px; }
  h2 { font-size: 12pt; font-weight: 600; color: #ffffff; border-bottom: 1px solid #1f1f1f; padding-bottom: 6px; margin: 18px 0 10px 0; letter-spacing: -0.01em; }
  p { color: #a1a1aa; margin-bottom: 10px; font-size: 9.5pt; line-height: 1.6; }
  .card {
    background: #0a0a0c;
    border: 1px solid #1f1f23;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 8px;
  }
  table { width: 100%; border-collapse: collapse; margin: 10px 0 14px 0; font-size: 9pt; }
  th, td { border: 1px solid #1f1f23; padding: 7px 10px; text-align: left; }
  th { background: #0c0c0e; color: #ffffff; font-weight: 600; font-family: ui-monospace, Menlo, monospace; font-size: 8pt; text-transform: uppercase; }
  td { color: #a1a1aa; background: #060608; }
  td strong { color: #ffffff; }
  .footer {
    border-top: 1px solid #1f1f1f;
    padding-top: 12px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    font-size: 8.5pt;
    font-family: ui-monospace, Menlo, monospace;
    color: #666666;
  }
  .footer a { color: #888888; text-decoration: none; }
`;

export function renderPdf(html, outputPath) {
  const tempFile = path.join(rootDir, `.temp_${Date.now()}.html`);
  fs.writeFileSync(tempFile, html);
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  execSync(`"${chromePath}" --headless --disable-gpu --print-to-pdf="${outputPath}" --no-pdf-header-footer "${tempFile}"`);
  fs.unlinkSync(tempFile);
  console.log(`Rendered PDF: ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
}

// 1. WELCOME-KIT.pdf
const welcomeKitHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  ${baseCss}
  .step-box {
    background: #0a0a0c;
    border: 1px solid #1f1f23;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .step-num {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 9pt;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 4px;
    padding: 2px 6px;
  }
  .step-content strong { color: #ffffff; font-size: 10pt; }
  .step-content p { margin: 2px 0 0 0; font-size: 9pt; color: #888888; }
</style>
</head>
<body>
  <div class="header">
    <img src="data:image/png;base64,${logoBase64}" class="logo-img" alt="SWD">
    <div class="header-meta">
      <strong>ShivamWebDesigns</strong> &bull; Client Welcome Kit<br>
      Onboarding & Communication Framework
    </div>
  </div>

  <h1>Client Welcome Kit & Onboarding Guide</h1>
  <div class="subtitle">Welcome to our design studio. Let's create something extraordinary.</div>
  
  <p>Thank you for partnering with <strong>ShivamWebDesigns</strong>. We are committed to delivering an exceptional, sub-second digital flagship that elevates your brand perception and drives commercial growth.</p>

  <h2>Your 4 Onboarding Steps</h2>
  <div class="step-box">
    <div class="step-num">01</div>
    <div class="step-content">
      <strong>Complete the Onboarding Form</strong>
      <p>Submit your brand stakeholders, primary contact, and initial objectives via our secure digital brief.</p>
    </div>
  </div>
  <div class="step-box">
    <div class="step-num">02</div>
    <div class="step-content">
      <strong>Upload Brand Assets to Shared Drive</strong>
      <p>Deposit vector logos (.SVG, .EPS), font files, high-res photography, and written text into your private Google Drive folder.</p>
    </div>
  </div>
  <div class="step-box">
    <div class="step-num">03</div>
    <div class="step-content">
      <strong>Grant Domain / Technical Access</strong>
      <p>Authorize delegated DNS access (GoDaddy, Cloudflare, etc.) or prepare for direct DNS cutover guidance at launch.</p>
    </div>
  </div>
  <div class="step-box">
    <div class="step-num">04</div>
    <div class="step-content">
      <strong>Attend the 30-Minute Sprint Kickoff Call</strong>
      <p>Meet via Google Meet to review interactive design references, confirm milestones, and establish sprint velocity.</p>
    </div>
  </div>

  <h2>Studio Communication Channels & Protocols</h2>
  <table>
    <tr><th>Channel</th><th>Purpose</th><th>Response Time</th></tr>
    <tr><td><strong>Email</strong> (shivamwebdesigns23@gmail.com)</td><td>Formal approvals, scope agreements, milestone invoices.</td><td>Within 24 business hours</td></tr>
    <tr><td><strong>WhatsApp Desk</strong> (+91 78619 65480)</td><td>Rapid tactical questions, scheduling links, quick updates.</td><td>Within 2–4 business hours</td></tr>
    <tr><td><strong>Google Meet</strong></td><td>Sprint kickoff, prototype review, and production launch handover.</td><td>Scheduled 24h in advance</td></tr>
  </table>

  <h2>Studio Operating Commitments</h2>
  <p>&bull; <strong>100% Intellectual Property Ownership:</strong> All custom design assets, Figma files, and source code belong to you upon final settlement.<br>
  &bull; <strong>Sub-Second Loading Speeds:</strong> Engineered for 100/100 Core Web Vitals to maximize SEO and client conversions.<br>
  &bull; <strong>30-Day Launch Warranty:</strong> Full bug-fix and performance monitoring support included post-launch.</p>

  <div class="footer">
    <div>ShivamWebDesigns &bull; Creative Director: Shivam Purohit</div>
    <div><a href="https://shivamwebdesigns.devs.li">shivamwebdesigns.devs.li</a> &bull; +91 78619 65480</div>
  </div>
</body>
</html>`;

renderPdf(welcomeKitHtml, path.join(rootDir, 'ShivamWebDesigns-Business-System', '04-CLIENT-WELCOME-KIT', 'WELCOME-KIT.pdf'));
