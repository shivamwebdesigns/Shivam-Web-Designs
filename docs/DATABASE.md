# Database & Data Models
# 04 / DATABASE.md

## 1. Storage Engine
- Architecture: Client-Side Ephemeral Storage + vCard 3.0 Standard + Schema.org Structured Data
- Local Storage: Browser `localStorage` for ephemeral brief draft preservation
- Backend Database: None (Static Jamstack architecture eliminates database security vectors)

## 2. Naming Conventions
- Fields: `snake_case` (e.g., `client_name`, `project_budget`, `created_at`)
- Keys: Unique string identifiers (e.g., `shivam_brief_draft`)
- Schemas: PascalCase (e.g., `ProjectBrief`, `ContactVCard`, `CaseStudy`)

## 3. Data Schemas

### Schema 1: ProjectBrief (Client Intake Form)
```typescript
interface ProjectBrief {
  client_name: string;        // Full name of inquiring party
  client_email: string;       // Work email (validated format)
  company_name: string;       // Brand or organization name
  timeline: string;           // "urgent_2w" | "standard_4w" | "flexible"
  budget_range: string;       // "3k_5k" | "5k_8k" | "8k_plus" | "retainer"
  project_scope: string;      // Detailed description of requirements
  created_at: string;         // ISO 8601 timestamp
}
```

### Schema 2: ContactVCard (vCard 3.0 Specification)
```
BEGIN:VCARD
VERSION:3.0
N:Purohit;Shivam;;;
FN:Shivam Purohit
ORG:Shivam Web Designs
TITLE:Founder & Creative Director
EMAIL;TYPE=WORK,INTERNET:shivam@shivamwebdesigns.com
TEL;TYPE=WORK,VOICE:+919876543210
URL:https://shivamwebdesigns.devs.li
URL;TYPE=LinkedIn:https://www.linkedin.com/company/shivamwebdesigns/
URL;TYPE=GitHub:https://github.com/PurohitBhagyesh/Shivam-Web-Designs
URL;TYPE=Instagram:https://www.instagram.com/shivamwebdesigns/
NOTE:Designing and building modern websites with a focus on UI/UX, creativity and performance.
END:VCARD
```

### Schema 3: CaseStudy (Studio Portfolio Entity)
```typescript
interface CaseStudy {
  id: string;                 // e.g., "lumina", "aurora", "strata"
  title: string;              // Client project title
  subtitle: string;           // One-line summary
  category: string;           // "COMMERCE / PLATFORM" | "FINTECH" | "3D SPATIAL"
  metrics: Array<{
    value: string;            // "+310%", "60fps", "0.4s"
    label: string;            // Metric label
  }>;
  challenge: string;          // Challenge description
  solution: string;           // Technical & spatial solution
  stack: string[];            // ["WebGL", "TypeScript", "Vercel Edge"]
  deliverables: string[];     // ["Art Direction", "Shader Architecture"]
}
```

## 4. Relationships
- CaseStudy (1) → Metrics (many)
- Client → ProjectBrief (1:1 per session)
- Founder → ContactVCard (1:1 static source of truth)

## 5. Constraints
- Required Fields: `client_name`, `client_email`, `project_scope`.
- Email Validation: RFC 5322 compliant regex before processing.
- Input Limits: `project_scope` maximum 2,000 characters to prevent buffer abuse.

## 6. Data Validation Rules
1. All client inputs must be stripped of HTML tags (`<`, `>`, `&`, `"`) prior to formatting.
2. Email inputs must contain valid domain with standard TLD.
3. Local storage drafts must be flushed after successful brief dispatch.

## 7. Sensitive Data Handling
- No client passwords, credit card numbers, or government IDs are ever collected or processed.
- Brief contents are never stored in third-party ad databases.
