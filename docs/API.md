# API Contracts & Protocols
# 10 / API.md

## 1. Conventions
- Base URL: `https://shivamwebdesigns.devs.li`
- Architecture: Next.js App Router APIs + Vercel static edge rewrites
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

## 4. Protocol 2: Project Brief Persistence & Notification
- Endpoint: `POST /api/inquiry`
- Persistence: Firestore `inquiries` collection through Firebase Admin SDK; requires server-side Firebase service-account configuration
- Notification: Optional Resend notification to `CONTACT_EMAIL` (defaults to the studio inbox); requires `RESEND_API_KEY` and a Resend-verified `CONTACT_FROM_EMAIL`
- Reply-To: The inquiring client's validated email address
- Budget: INR-denominated ranges
- Success: Returned only after Firestore saves the inquiry; email outcome is stored separately as `sent`, `failed`, or `not_configured`
- Storage Error: `503` when the inquiry cannot be saved; no success response is returned
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

## 5. Protocol 3: Contact Message Persistence & Notification
- Endpoint: `POST /api/contact`
- Persistence: Same Firestore `inquiries` collection with `kind: "contact"`
- Notification: Optional Resend email; result is stored on the inquiry record
- Success: Returned only after Firestore saves the message
- Validation: Name (1–120), email, subject (up to 150), message (5–3,000 characters)

## 6. Protocol 4: Private Inquiry Read API
- Endpoint: `GET /api/admin/inquiries`
- Authentication: `Authorization: Bearer <Firebase ID token>` and the HttpOnly password session cookie set by `POST /api/admin/unlock`
- Authorization: Server verifies the token and requires a verified email matching `FIREBASE_ADMIN_EMAIL` (configured as `shivamwebdesigns23@gmail.com`), then verifies the password session
- Pagination: 50 newest records per request; pass the returned `nextCursor` as `?cursor=...`
- Cache: `Cache-Control: private, no-store`
- Errors: `401` missing/invalid token or password session, `403` unauthorized account, `400` invalid cursor, `503` missing Firebase/password configuration or storage failure

## 7. Protocol 5: Admin Password Unlock
- Endpoint: `POST /api/admin/unlock`
- Authentication: `Authorization: Bearer <Firebase ID token>`; only the configured owner account can submit a password
- Body: `{ "password": "<12–128 characters>" }`
- Rate limit: Five incorrect attempts per owner account; further attempts receive `429` for 15 minutes. The counter is stored in Firestore so it persists across serverless instances.
- Success: Sets an HttpOnly, SameSite=Strict cookie with a 30-minute lifetime. In production the cookie is Secure.
- Sign-out: `DELETE /api/admin/unlock` clears the password session cookie.
- Configuration: Set `ADMIN_PASSWORD` and `ADMIN_PASSWORD_SESSION_SECRET` only in server environment settings. The password must be 12–128 characters and the session secret must be at least 32 bytes.
- Errors: `400` invalid password format, `401` incorrect password or invalid token, `403` non-owner account, `429` temporarily locked, `503` missing configuration or storage failure

## 8. Protocol 6: Schema.org JSON-LD Knowledge Graph
- Location: `<script type="application/ld+json">` in `index.html`
- Entities:
  - `@type: ["Organization", "ProfessionalService"]`
  - `@type: "WebSite"`
  - `@type: "FAQPage"` (5 questions with structured answers)
