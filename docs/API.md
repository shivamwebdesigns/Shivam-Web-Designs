# API Contracts & Protocols
# 10 / API.md

## 1. Conventions
- Base URL: `https://shivamwebdesigns.devs.li`
- Architecture: Static Edge Rewrites + Client Protocol Handlers
- Data Formats: MIME `text/vcard; charset=utf-8` (vCard), MIME `application/ld+json` (Schema.org), RFC 6068 `mailto:` URI scheme
- Clean URLs: Enforced by Vercel (`cleanUrls: true`)

## 2. Edge Routing Matrix (`vercel.json`)
| Route Source | Destination Target | Status | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `/website/index.html` | 200 OK | Studio Flagship Landing Page |
| `/businesscard` | `/website/businesscard.html` | 200 OK | Dedicated 3D Business Card |
| `/card` | `/website/businesscard.html` | 200 OK | Short alias for business card |
| `/business-card` | `/website/businesscard.html` | 200 OK | Hyphenated alias for business card |
| `/privacy` | `/website/privacy.html` | 200 OK | Privacy Policy (DPDP / GDPR) |
| `/terms` | `/website/terms.html` | 200 OK | Terms of Service & Engagement |
| `/sitemap.xml` | `/website/sitemap.xml` | 200 OK | XML Sitemap for search engines |
| `/robots.txt` | `/website/robots.txt` | 200 OK | Bot crawling directives |

## 3. Protocol 1: vCard Download Contract
- MIME Type: `text/vcard;charset=utf-8;`
- Trigger: Client click on `#btn-contact`
- File Name: `Shivam_WebDesigns.vcf`
- Payload Schema: RFC 2426 vCard v3.0

## 4. Protocol 2: Project Brief Dispatch Schema
- Endpoint: `POST /api/inquiry`
- Target Recipient: `shivamwebdesigns23@gmail.com`
- Delivery: Resend; requires `RESEND_API_KEY` and a Resend-verified `CONTACT_FROM_EMAIL`
- Reply-To: The inquiring client's validated email address
- Budget: INR-denominated ranges
- Success: Returned only after Resend accepts the message
- Delivery Errors: `503` when email configuration is missing; `502` when Resend delivery fails
- Subject Line: `[Project Quotation Request] [Inquiry ID]`
- Body Structure:
  ```
  New Project Quotation Request
  Inquiry ID: [Inquiry ID]
  Client: [Name]
  Email: [Email]
  Company: [Company Name]
  Service: [Selected Service]
  Estimated investment (INR): [Selected Budget]
  Timeline: [Selected Timeline]
  Reference URL: [Optional URL]

  Project description:
  [User's project description]

  Additional notes:
  [Optional notes]

  Submitted via https://shivamwebdesigns.devs.li/start-project
  ```

## 5. Protocol 3: Schema.org JSON-LD Knowledge Graph
- Location: `<script type="application/ld+json">` in `index.html`
- Entities:
  - `@type: ["Organization", "ProfessionalService"]`
  - `@type: "WebSite"`
  - `@type: "FAQPage"` (5 questions with structured answers)
