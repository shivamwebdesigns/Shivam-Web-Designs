# Database & Data Models
# 04 / DATABASE.md

## 1. Storage Engine
- Architecture: Firebase Firestore for submitted inquiries + client-side ephemeral drafts + vCard 3.0 + Schema.org Structured Data
- Local Storage: Browser `localStorage` for ephemeral brief draft preservation
- Backend Database: Firebase Firestore, accessed only by the server-side Firebase Admin SDK
- Browser access: Firestore client reads and writes are denied by `firestore.rules`; authenticated reads go through `/api/admin/inquiries`

## 2. Naming Conventions
- Firestore fields: `camelCase` to match the server API models (e.g., `projectType`, `emailStatus`, `createdAt`)
- Keys: Unique string identifiers (e.g., `shivam_brief_draft`)
- Schemas: PascalCase (e.g., `ProjectBrief`, `ContactVCard`, `CaseStudy`)

## 3. Data Schemas

### Schema 1: InquiryDocument (Firestore `inquiries` collection)
```typescript
type InquiryDocument = ProjectInquiry | ContactInquiry;

interface SharedInquiryFields {
  kind: "project" | "contact";
  name: string;
  email: string;
  emailStatus: "pending" | "sent" | "not_configured" | "failed";
  createdAt: FirebaseFirestore.Timestamp;
}

interface ProjectInquiry extends SharedInquiryFields {
  kind: "project";
  company: string;
  projectType: string;
  budget: string; // Current UI options: ₹500–₹1,000 through ₹4,000–₹5,000
  timeline: string; // Urgent, 1 month, 2–3 months, or flexible
  description: string;
  referenceUrl: string;
  additionalRequirements: string;
}

interface ContactInquiry extends SharedInquiryFields {
  kind: "contact";
  subject: string;
  message: string;
}
```

Each submission receives a Firestore-generated document ID. `emailStatus` records the separate Resend outcome; a saved inquiry remains available when notification delivery is unconfigured or fails.

### Schema 2: ContactVCard (vCard 3.0 Specification)
```
BEGIN:VCARD
VERSION:3.0
N:Purohit;Shivam;;;
FN:Shivam Purohit
ORG:Shivam Web Designs
TITLE:Founder & Creative Director
EMAIL;TYPE=WORK,INTERNET:shivamwebdesigns23@gmail.com
TEL;TYPE=WORK,VOICE:+919876543210
URL:https://shivamwebdesigns.devs.li
URL;TYPE=LinkedIn:https://www.linkedin.com/company/shivamwebdesigns/
URL;TYPE=GitHub:https://github.com/shivamwebdesigns/Shivam-Web-Designs
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
- InquiryDocument (1) → one project brief or contact message
- Founder → ContactVCard (1:1 static source of truth)

## 5. Constraints
- Required project fields: `name`, `email`, and `description`.
- Required contact fields: `name`, `email`, and `message`.
- Email Validation: RFC 5322 compliant regex before processing.
- Input Limits: project description maximum 2,000 characters; contact message maximum 3,000 characters.

## 6. Data Validation Rules
1. All client inputs are length-limited and validated server-side; content is rendered as text, not HTML.
2. Email inputs must contain valid domain with standard TLD.
3. Local storage drafts must be flushed after successful inquiry persistence.

## 7. Sensitive Data Handling
- No client passwords, credit card numbers, or government IDs are ever collected or processed.
- Brief and contact contents are stored in the studio's Firebase Firestore project and are never placed in advertising databases.
- Admin SDK credentials remain server-only. Browser Firestore access is denied; dashboard access is authorized by the server against the configured owner email.
- Inquiry records are retained only as long as needed for studio follow-up or legal obligations and must be deleted when no longer needed.

## 8. Firebase Project Setup
1. Create a Firebase project and a Web App; copy its API key, auth domain, project ID, and app ID into the matching `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local` and Vercel.
2. Enable Google as a sign-in provider in Firebase Authentication and add `shivamwebdesigns.devs.li` to Authorized domains.
3. Create a Cloud Firestore database, then paste the contents of `firestore.rules` into the Firestore Rules editor and publish them. These rules deny all direct browser access.
4. Create a service-account key in Firebase Project Settings. Set its `project_id`, `client_email`, and `private_key` as `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` in server-only environment variables.
5. Set `FIREBASE_ADMIN_EMAIL` to `shivamwebdesigns23@gmail.com`. Configure `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL` only if email notifications are desired.
6. Add variables to the Vercel Production environment and redeploy. `NEXT_PUBLIC_FIREBASE_*` values must be present at build time; private service-account values must never use the `NEXT_PUBLIC_` prefix.

Submissions made before Firestore is configured are not stored and cannot be backfilled by this feature. Only new submissions after a successful deployment appear in the dashboard.
