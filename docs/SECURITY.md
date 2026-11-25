# Security Guidelines
# 05 / SECURITY.md

## 1. Authentication & Authorization
- Public Access: All studio portfolio pages and business card features are accessible publicly without login barriers.
- Admin Protection: Zero administrative dashboards or backdoors are exposed in client code.
- Authorization: Client-side role spoofing is impossible because no privileged operations exist on the client.

## 2. Secrets Management
- Zero Secrets in Frontend: No private API tokens, database passwords, or secret keys are stored in the client codebase or git repository.
- Public Configuration: Only public constants (e.g., domain `https://shivamwebdesigns.devs.li`, contact email `shivamwebdesigns23@gmail.com`) are embedded.
- Environment Variables: Handled securely via Vercel platform dashboard if serverless extensions are added.

## 3. Input Validation & XSS Prevention
- Form Input Sanitization: All inputs in the Project Brief dialog are handled with explicit text encoding before inclusion in mailto links or clipboard payloads:
  ```javascript
  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  ```
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
  - Direct email line to Studio Data Officer (`shivamwebdesigns23@gmail.com`).

## 6. Security Checklist
- [x] No API keys or private secrets in frontend repository.
- [x] All user inputs validated and sanitized client-side.
- [x] Zero sensitive data logged to `console.log`.
- [x] No administrative routes or debug endpoints exposed.
- [x] HTTPS enforced globally on `shivamwebdesigns.devs.li`.
- [x] Error handling displays user-friendly notices without leaking stack traces.
- [x] Dependencies audited (Zero third-party npm runtime dependencies).
- [x] File downloads restricted to safe MIME type (`text/vcard`).
