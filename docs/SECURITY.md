# Security Guidelines
# 05 / SECURITY.md

## 1. Authentication & Authorization
- Public Access: All studio portfolio pages and business card features are accessible publicly without login barriers.
- Admin Protection: `/admin` is a private owner dashboard, unlinked from public navigation and marked `noindex`; obscurity is not an access control.
- Authorization: The server verifies Firebase ID tokens and allows only the configured owner email (`shivamwebdesigns23@gmail.com`). Client-side state never grants access to inquiry data.
- Data Access: Admin SDK reads and writes run server-side. Firestore client rules deny all direct client reads and writes.

## 2. Secrets Management
- Zero Secrets in Frontend: No private API tokens, database passwords, or secret keys are stored in the client codebase or git repository.
- Public Configuration: Only public constants (e.g., domain `https://shivamwebdesigns.devs.li`, contact email `shivamwebdesigns23@gmail.com`) are embedded.
- Environment Variables: Firebase Admin service-account values, the owner allowlist, and Resend credentials are configured only in local ignored `.env.local` and Vercel server environment settings.
- Public Firebase web configuration may use `NEXT_PUBLIC_FIREBASE_*`; private key and client email must never use the `NEXT_PUBLIC_` prefix.

## 3. Input Validation & XSS Prevention
- Project and contact inputs are validated on the server and saved to Firestore before notification dispatch.
- Inquiry field values are not written to application logs. Logs may contain status codes and non-sensitive document IDs only.
- Resend API credentials are stored in server environment variables and are never exposed to client code.
- Inquiry API reads require a verified Firebase ID token and exact owner email match; responses are private and non-cacheable.
- Firestore rules deny all browser reads and writes. The Firebase Admin SDK bypasses those rules and is used only in server routes.
- No Dangerous DOM APIs: Disallow `eval()`, `document.write()`, and unvalidated `innerHTML`. Use `textContent` and `createElement` for DOM updates.

## 4. Content Security & Headers
- HTTPS Enforcement: Strict Transport Security (HSTS) enforced by Vercel.
- Clickjacking Defense: `X-Frame-Options: SAMEORIGIN` applied across all web endpoints.
- Content Type Protection: `X-Content-Type-Options: nosniff`.
- Referrer Policy: `strict-origin-when-cross-origin`.

## 5. Privacy & Legal Compliance
- DPDP Act 2023 (India) & GDPR Compliance:
  - Transparent Privacy Policy published at `/privacy`.
  - Terms of Service published at `/terms`.
  - Zero third-party behavioral cookies or telemetry tracking pixels.
  - Project briefs and contact messages are processed by Firebase Firestore and, when configured, Resend; retention is limited to follow-up and legal needs.
  - Direct email line to Studio Data Officer (`shivamwebdesigns23@gmail.com`).

## 6. Security Checklist
- [x] No API keys or private secrets in frontend repository.
- [x] Project inquiry inputs validated server-side and sent as plain text.
- [x] Zero sensitive data logged to `console.log`.
- [x] Admin inquiry API requires server-side Firebase authentication and owner allowlist authorization.
- [x] Firestore client rules deny direct browser access.
- [x] HTTPS enforced globally on `shivamwebdesigns.devs.li`.
- [x] Error handling displays user-friendly notices without leaking stack traces.
- [x] Dependencies audited after Firebase SDK installation; patched transitive gRPC and PostCSS versions are pinned without a major framework upgrade.
- [x] File downloads restricted to safe MIME type (`text/vcard`).
