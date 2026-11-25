# Architecture
# 03 / ARCHITECTURE.md

## 1. System Overview
Shivam Web Designs combines its high-performance public site with Next.js serverless form APIs deployed on Vercel. Public content uses semantic HTML and CSS 3D transforms; inquiry processing uses Firebase Admin SDK and Firestore on the server.

## 2. Architecture Pattern
- Pattern: Jamstack public site with serverless API routes and a private authenticated admin surface
- Reason: Keep public content fast while persisting inquiries server-side and limiting private data access to the authorized studio owner.

## 3. Technology Stack
- Presentation: Semantic HTML5, CSS Grid, Flexbox, CSS 3D Transforms
- Graphics & Physics: Hardware-accelerated CSS 3D rendering, WebGL Canvas progressive enhancement, requestAnimationFrame physics loop
- Scripting: React/TypeScript for Next.js routes; vanilla JavaScript (ES2022+) for the static mirrored experience
- Hosting & CDN: Vercel Global Edge Network
- Inquiry Storage: Firebase Firestore through the server-only Firebase Admin SDK
- Owner Authentication: Firebase Google Authentication with server-verified ID tokens and an email allowlist
- Email Notifications: Resend as a separate optional notification channel
- Routing: `vercel.json` declarative rewrites and clean URLs
- Standards: vCard 3.0 specification for digital business cards, Schema.org JSON-LD

## 4. System Components
### Component 1: Core Flagship Shell (`index.html`, `styles.css`)
- Responsibilities: Renders the primary studio narrative, 8 sequential showcase sections, hero interactive stage, interactive case studies, and workable project brief dialog.

### Component 2: 3D Business Card Engine (`businesscard.html`)
- Responsibilities: 360-degree interactive 3D spatial card simulation, orientation switcher (Portrait / Landscape), dynamic foil specular shader, micro-grain paper texture, and vCard generator.

### Component 3: Inquiry Intake (`app/api/inquiry/route.ts`, `app/api/contact/route.ts`)
- Responsibilities: Validates project and contact submissions, stores them in Firestore, and records the separate Resend notification outcome.

### Component 4: Private Inquiry Dashboard (`app/admin`, `app/api/admin/inquiries/route.ts`)
- Responsibilities: Signs in the studio owner with Google Authentication, requires a server-side password check with Firestore-backed attempt limiting, and returns paginated inquiries only after both checks pass.

### Component 5: Edge Routing & File Mirrors
- Responsibilities: `vercel.json` maps friendly routes (`/businesscard`, `/card`, `/privacy`, `/terms`, `/sitemap.xml`, `/robots.txt`) to optimized canonical resources.

## 5. Architecture Diagram
```mermaid
flowchart TD
  User([Client / User]) -->|HTTPS Request| CDN[Vercel Global Edge CDN]
  
  subgraph Routing [Edge Rewrite Layer]
    CDN -->|GET /| IndexPage[website/index.html]
    CDN -->|GET /businesscard| CardPage[website/businesscard.html]
    CDN -->|GET /privacy| PrivacyPage[website/privacy.html]
    CDN -->|GET /terms| TermsPage[website/terms.html]
    CDN -->|GET /sitemap.xml| Sitemap[website/sitemap.xml]
  end

  subgraph ClientEngine [Client-Side Execution]
    IndexPage --> DOM[Semantic HTML5 DOM]
    IndexPage --> CSS[CSS3 Custom Properties & Grid]
    IndexPage --> JS[script.js Vanilla Engine]
    
    CardPage --> Card3D[Card 3D Physics & Orientation Engine]
    Card3D --> VCard[vCard 3.0 Blob Generator]
    Card3D --> Specular[Specular Sheen & Grain Shader]
  end

  subgraph Conversion [Client Conversion Actions]
    StartProject[Start Project Form] --> InquiryAPI[POST /api/inquiry]
    ContactForm[Contact Form] --> ContactAPI[POST /api/contact]
    InquiryAPI --> Firestore[Firestore Inquiry Store]
    ContactAPI --> Firestore
    InquiryAPI --> Resend[Optional Resend Notification]
    ContactAPI --> Resend
    Resend --> StudioInbox[shivamwebdesigns23@gmail.com]
    VCard --> MobileContacts[iOS / Android Contacts App]
  end

  subgraph Admin [Private Admin Access]
    AdminUI[/admin] --> GoogleAuth[Firebase Google Sign-in]
    AdminUI --> UnlockAPI[POST /api/admin/unlock]
    AdminUI --> AdminAPI[GET /api/admin/inquiries]
    UnlockAPI -->|Verify owner token + password; rate limit attempts| Firestore
    AdminAPI -->|Verify owner token + password session| GoogleAuth
    AdminAPI --> Firestore
  end
```

## 6. Data Flow
1. User requests URL → Vercel Edge CDN resolves route in < 50ms.
2. Browser parses semantic HTML and renders first paint in < 400ms.
3. 3D physics loop initializes with RAF and listens for Pointer Events.
4. User clicks "Add to Contacts" → JavaScript generates RFC 2426 vCard string, creates ephemeral object URL, and triggers instant OS download.
5. User submits a project brief or contact message → the API validates and saves it to Firestore before attempting a Resend notification.
6. `/admin` signs in with Google, verifies the server-only password, and receives a short-lived HttpOnly session cookie. The API verifies the owner ID token and password session before returning inquiry records; failed password attempts are rate-limited in Firestore.

## 7. Project Structure
```
Shivam-Web-Designs/
├── index.html                      # Root mirror for static hosts
├── styles.css                      # Root stylesheet mirror
├── script.js                       # Root script mirror
├── businesscard.html               # 3D Business card root mirror
├── card.html                       # Alternate card route mirror
├── business-card.html              # Alternate hyphenated route mirror
├── privacy.html                    # Legal Privacy Policy
├── terms.html                      # Legal Terms of Service
├── sitemap.xml                     # Search engine sitemap
├── robots.txt                      # Bot crawl directives
├── vercel.json                     # Edge rewrite configuration
├── Brand Logo.PNG                  # Studio brand identity
├── business-card-front.png         # High-res front card texture
├── business-card-back.png          # High-res back card texture
├── banner-balanced.png             # Social OG banner
├── docs/                           # The Vibe Coding Blueprint suite
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── CODE_STYLE.md
│   ├── TESTING.md
│   ├── AGENTS.md
│   ├── UX_FLOWS.md
│   └── API.md
├── website/                        # Canonical source directory
└── AGENTS.md                       # Root AI instructions entrypoint
```

## 8. Dependency Rules
- Firebase client and Admin SDK packages are limited to authentication and inquiry persistence; no unrelated runtime frameworks are added.
- All styles must use CSS Custom Properties defined in `:root`.
- No raw string DOM injection (`innerHTML` with unescaped input).
- All image assets must include explicit dimensions and descriptive `alt` tags.

## 9. Key Technical Decisions
- **Decision 1: Pure CSS 3D & Vanilla JS vs Three.js/React**:
  - Context: Delivering a 3D business card and spatial portfolio.
  - Reason: Dropping Three.js/React shaved 600KB of JavaScript, eliminated bundle build steps, and achieved instant sub-second mobile loading with 60fps native GPU acceleration.
- **Decision 2: vCard 3.0 Blob Generation vs 3rd Party Contact Services**:
  - Context: Providing digital business card contact saving.
  - Reason: Pure client-side Blob generation works 100% offline, requires zero external API keys, has zero tracking, and opens natively in iOS and Android Contacts.

## 10. Performance Considerations
- Critical CSS inlined where appropriate or loaded asynchronously.
- Responsive images with lazy-loading and hardware acceleration (`will-change: transform`).
- RequestAnimationFrame throttled physics simulation that sleeps during idle states.

## 11. Scalability Considerations
- Public content scales through the Vercel edge; inquiry storage and reads use Firebase Firestore server-side.

## 12. Failure Scenarios
- JavaScript Disabled: All core text, portfolio works, and direct email links remain 100% readable and functional via semantic HTML.
- Slow Network / Offline: Cached assets allow viewing; vCard generation occurs locally without internet access.
- Firebase Configuration Missing: The API reports a storage failure; no successful inquiry receipt is shown unless persistence succeeds.
- Resend Failure: The saved inquiry remains in Firestore and its email status is shown in the owner dashboard.
- Unauthorized Admin Request: `/api/admin/inquiries` returns `401` or `403` without exposing inquiry data.
