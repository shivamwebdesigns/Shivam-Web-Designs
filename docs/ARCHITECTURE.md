# Architecture
# 03 / ARCHITECTURE.md

## 1. System Overview
Shivam Web Designs is engineered as a zero-bloat, high-performance static web platform deployed globally via Vercel Edge CDN. The architecture combines semantic server-renderable HTML5, hardware-accelerated CSS 3D transforms, and modular vanilla JavaScript.

## 2. Architecture Pattern
- Pattern: Jamstack / Static Architecture with Edge Serverless Rewrites
- Reason: Maximizes performance (sub-2.0s load time worldwide), guarantees zero downtime, eliminates server database attack surfaces, and provides instant edge routing.

## 3. Technology Stack
- Presentation: Semantic HTML5, CSS Grid, Flexbox, CSS 3D Transforms
- Graphics & Physics: Hardware-accelerated CSS 3D rendering, WebGL Canvas progressive enhancement, requestAnimationFrame physics loop
- Scripting: Vanilla JavaScript (ES2022+), zero runtime frameworks
- Hosting & CDN: Vercel Global Edge Network
- Routing: `vercel.json` declarative rewrites and clean URLs
- Standards: vCard 3.0 specification for digital business cards, Schema.org JSON-LD

## 4. System Components
### Component 1: Core Flagship Shell (`index.html`, `styles.css`)
- Responsibilities: Renders the primary studio narrative, 8 sequential showcase sections, hero interactive stage, interactive case studies, and workable project brief dialog.

### Component 2: 3D Business Card Engine (`businesscard.html`)
- Responsibilities: 360-degree interactive 3D spatial card simulation, orientation switcher (Portrait / Landscape), dynamic foil specular shader, micro-grain paper texture, and vCard generator.

### Component 3: Project Brief & Client Intake (`app/start-project/page.tsx`, `app/api/inquiry/route.ts`)
- Responsibilities: Collects and validates project details, including INR budget ranges, then sends quotation requests through Resend to the studio inbox. Delivery failures are surfaced to the client with a link to the contact form.

### Component 4: Edge Routing & File Mirrors
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
    InquiryAPI --> Resend[Resend Email Delivery]
    Resend --> StudioInbox[shivamwebdesigns23@gmail.com]
    VCard --> MobileContacts[iOS / Android Contacts App]
  end
```

## 6. Data Flow
1. User requests URL → Vercel Edge CDN resolves route in < 50ms.
2. Browser parses semantic HTML and renders first paint in < 400ms.
3. 3D physics loop initializes with RAF and listens for Pointer Events.
4. User clicks "Add to Contacts" → JavaScript generates RFC 2426 vCard string, creates ephemeral object URL, and triggers instant OS download.
5. User submits a project brief → `/api/inquiry` validates the request and sends it through Resend; the page confirms only after provider acceptance.

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
- Zero third-party npm runtime libraries.
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
- Serverless static edge delivery scales effortlessly to millions of hits with zero database load or cold starts.

## 12. Failure Scenarios
- JavaScript Disabled: All core text, portfolio works, and direct email links remain 100% readable and functional via semantic HTML.
- Slow Network / Offline: Cached assets allow viewing; vCard generation occurs locally without internet access.
