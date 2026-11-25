# Testing Strategy
# 07 / TESTING.md

## 1. Testing Goals
- Ensure 100% functional reliability across all core user journeys.
- Verify 60fps hardware-accelerated 3D card rotation and orientation switching.
- Validate sub-2.0s page load times on standard 4G mobile connections.
- Ensure zero broken links or 404 routing errors across all aliases.

## 2. Test Types
### Manual & Visual Verification
- 3D Business Card: Drag to rotate 360°, tap to flip, click Front/Back buttons, toggle Portrait/Landscape mode, and verify vCard download.
- Project Brief Form: Submit valid details and verify Firestore persistence; verify the user is not told that email was sent unless Resend accepts it.
- Contact Form: Submit valid details and verify Firestore persistence; verify the server no longer logs message contents.
- Admin Dashboard: Verify the owner Google account can unlock with the configured password and load inquiries, invalid passwords receive `401`, five failed attempts receive `429`, a different account receives `403`, and missing/invalid tokens receive `401`.
- Firestore Rules: Verify browser clients cannot directly read or write inquiry documents.
- Case Study Inspector: Open each case study modal, verify dynamic content population and responsive layout.

### Automated Syntax & Build Verification
- JavaScript Syntax Validation: `node -c website/script.js`
- Embedded Card Script Syntax: Validate script blocks with Node.js parser.
- HTML Structure Validation: Verify valid closing tags, doctypes, and semantic hierarchy.
- Next.js Build and Type Check: `npm run build` and `npx tsc --noEmit`
- API Access Control: `GET /api/admin/inquiries` without a bearer token returns `401`; an authenticated non-owner returns `403`.

### Edge Route & HTTP Status Verification
- Test all Vercel clean URL routes and mirrors:
  - `GET /` → `200 OK`
  - `GET /businesscard` → `200 OK`
  - `GET /card` → `200 OK`
  - `GET /privacy` → `200 OK`
  - `GET /terms` → `200 OK`
  - `GET /sitemap.xml` → `200 OK`
  - `GET /robots.txt` → `200 OK`

## 3. Testing Commands
```bash
# 1. Start local dev server
python3 -m http.server 8000

# 2. Syntax check core JavaScript
node -c website/script.js

# 3. Verify all local endpoints
python3 -c "
import urllib.request
routes = ['', 'businesscard.html', 'card.html', 'privacy.html', 'terms.html', 'sitemap.xml', 'robots.txt']
for r in routes:
    res = urllib.request.urlopen(f'http://localhost:8000/{r}')
    print(f'{r:25} -> {res.status} OK')
"

# 4. Verify live production deployment
python3 -c "
import urllib.request
routes = ['', 'businesscard', 'card', 'privacy', 'terms', 'sitemap.xml', 'robots.txt']
for r in routes:
    res = urllib.request.urlopen(f'https://shivamwebdesigns.devs.li/{r}')
    print(f'{r:25} -> {res.status} OK')
"
```

## 4. Definition of Done Checklist
- [x] JavaScript syntax passes `node -c`.
- [x] All 7 production routes return HTTP 200 OK.
- [x] Mobile portrait mode verified on viewport < 540px.
- [x] vCard download creates valid RFC 2426 `.vcf` file.
- [x] Project brief form validates inputs and formats output cleanly.
- [x] Zero console errors during interaction.
