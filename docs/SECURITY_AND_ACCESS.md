# Security & Access Control Document (SAD)
**Project:** Shivam Web Designs Studio Platform  
**Classification:** Internal Engineering Standard  
**Security Tier:** Zero-Trust Client / Principle of Least Privilege (PoLP)  
**Compliance Mandates:** Digital Personal Data Protection (DPDP) Act 2023 (India), GDPR (EU)  

---

## 1. Authentication & Access Control Architecture

### 1.1 Public Surface (Zero Authentication Barrier)
The public studio platform (`/`, `/packages`, `/services`, `/projects`, `/founder`, `/businesscard`, `/contact`, `/start-project`) operates with zero authentication hurdles. Visitors are never coerced into creating user accounts, maintaining passwords, or accepting intrusive tracking cookies to evaluate work or place inquiries.

### 1.2 Private Owner Administration Portal (`/admin`)
- **Restricted Access Boundary:** The administration dashboard is an unlinked, private owner interface marked with `<meta name="robots" content="noindex, nofollow" />`.
- **Identity Provider:** Authentication is exclusively powered by **Google OAuth 2.0** via Firebase Authentication.
- **Server-Side Authorization Allowlist:** Client-side authentication tokens (`idToken`) are transmitted via authorization headers to `/api/admin/inquiries` and verified using the Firebase Admin SDK:
  ```typescript
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const allowedOwnerEmail = process.env.ADMIN_OWNER_EMAIL || 'shivamwebdesigns23@gmail.com';
  if (decodedToken.email !== allowedOwnerEmail || !decodedToken.email_verified) {
    return NextResponse.json({ error: 'Unauthorized: Access restricted to studio owner' }, { status: 403 });
  }
  ```
- **Session Lifespan & Token Revocation:** Firebase ID tokens expire automatically after 60 minutes. Any revoked or tampered token triggers an immediate 401/403 rejection.

---

## 2. Secrets Management & Environment Isolation

### 2.1 Zero Client Secrets Standard
- No secret API tokens, private signing keys, database connection strings, or cloud provider credentials may ever be committed to git or exposed to the client bundle.
- Only variables explicitly designated for browser execution may utilize the `NEXT_PUBLIC_` prefix (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`).
- Private secrets (`FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `RESEND_API_KEY`) reside exclusively in server runtime memory via encrypted Vercel Environment Secrets and local ignored `.env.local`.

### 2.2 Private Key Formatting & Secret Ingestion
Firebase private keys containing newline characters (`\n`) are sanitized and decoded safely server-side to prevent parse failures:
```typescript
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
```

---

## 3. Threat Modeling & Mitigation Matrix

| Threat Vector | Severity | Vulnerability Description | Enforced Studio Countermeasure |
| :--- | :--- | :--- | :--- |
| **XSS (Cross-Site Scripting)** | High | Client-rendered inputs injecting malicious scripts | React JSX auto-escaping, strict prohibition of `dangerouslySetInnerHTML`, avoidance of `eval()` / `document.write()`, and rigorous server-side string trimming. |
| **Direct DB Exfiltration** | Critical | Unauthorized client queries to Firestore | Firestore Security Rules enforce global denial: `allow read, write: if false;`. Browser clients have zero direct database access. |
| **Spam & Automated Bots** | Medium | Automated script flooding contact/brief forms | Invisible honeypot field (`website_url` / `fax_number`). If populated, server immediately drops the payload with a silent fake 200 OK. |
| **Clickjacking / UI Redressing** | Medium | Embedding studio pages inside malicious iframes | `X-Frame-Options: SAMEORIGIN` applied across all HTTP responses via edge configuration. |
| **MIME Sniffing Attacks** | Medium | Executing uploaded or served media as scripts | `X-Content-Type-Options: nosniff` header strictly enforced. |
| **Man-In-The-Middle (MITM)** | High | Packet interception or downgrade attacks | Strict Transport Security (`HSTS`) with `max-age=63072000; includeSubDomains; preload` and TLS 1.3 encryption. |

---

## 4. HTTP Security Headers Specification

Every edge response emitted by the Vercel CDN incorporates the following baseline security headers:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

---

## 5. Data Privacy & Compliance (DPDP Act 2023 & GDPR)

### 5.1 Zero Tracking Cookies Standard
- **No Third-Party Pixels:** No Google Analytics, Meta Pixel, Hotjar, or external behavioral tracking scripts are embedded.
- **No Cookie Consent Fatigue:** Because the studio utilizes zero non-essential tracking cookies, intrusive cookie consent banners that degrade user experience are completely eliminated under GDPR Article 6(1)(b) and India's DPDP Act 2023.

### 5.2 Client Data Minimization & Retention
- **Collected Fields:** Only details necessary to execute commercial client contracts are collected (Client Name, Email Address, Phone/WhatsApp Number, and optional existing website link).
- **Client-Controlled Persistence:** Local storage persistence (`localStorage['swd-client-profile']`) is strictly optional and governed by the user-controlled *"Remember my details for next visit"* checkbox in the "Your Orders" drawer.
- **Right to Erasure & Data Officer:** Clients can request immediate deletion of their inquiry records by contacting the Studio Data Officer at `shivamwebdesigns23@gmail.com`. Records older than 180 days without an active contract are purged automatically.
