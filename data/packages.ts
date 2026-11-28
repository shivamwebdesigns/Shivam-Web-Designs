export interface PackageTier {
  id: 'starter' | 'growth' | 'pro';
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  scope: string;
  delivery: string;
  stackTags: string[];
  features: string[];
  recommended?: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: 'branding' | 'content' | 'maintenance';
  monthly?: boolean;
  badge?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'A digital profile page & quick identity launch',
    price: 499,
    scope: '1 scrolling page',
    delivery: '1–2 days',
    stackTags: ['HTML5 Semantic', 'Mobile First', 'Free Subdomain', 'Fast CDN'],
    features: [
      'Mobile-first custom responsive design',
      'Your logo, brand photos, bio & links',
      'Instant WhatsApp and direct call buttons',
      'Contact details, business hours & map location',
      'Live on a free high-speed subdomain',
      '3 free revision rounds included',
      '7 days dedicated post-launch support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'A complete one-page business flagship',
    price: 999,
    badge: 'Popular Package',
    recommended: true,
    scope: '1 page, 4–5 sections',
    delivery: '3–5 days',
    stackTags: ['Flagship UI', 'Lead Engine', 'Custom Domain', 'SEO Standard'],
    features: [
      'Everything included in Starter',
      'Hero, about, services, gallery & contact sections',
      'Lead inquiry form with instant email alerts',
      'Search engine basics: meta titles & descriptions',
      'Your own custom domain connected (.com, .in, etc.)',
      '3 free revision rounds included',
      '15 days dedicated post-launch support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'A high-performance multi-page digital flagship',
    price: 1499,
    scope: 'Up to 3 full pages',
    delivery: '5–7 days',
    stackTags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Spatial 3D Matrix', 'PWA Ready'],
    features: [
      'Everything included in Growth',
      'Up to 3 bespoke pages (Home, Services, Case Studies)',
      'Sub-second edge speed & 100/100 Core Web Vitals',
      'Google Analytics 4 setup & conversion event routing',
      'Full XML sitemap & search console indexation',
      'Free subdomain setup included (Saves ₹149)',
      '3 free revision rounds included',
      '30 days dedicated post-launch support',
    ],
  },
];

export const ADDONS: AddonItem[] = [
  {
    id: 'subdomain',
    name: 'Free subdomain and setup',
    desc: 'We configure DNS, SSL, and launch your site on a free subdomain',
    price: 149,
    category: 'branding',
    badge: 'Free with Pro',
  },
  {
    id: 'logo',
    name: 'Logo design',
    desc: 'A clean, modern brand logo and vector identity for your business',
    price: 99,
    category: 'branding',
    badge: 'From ₹99',
  },
  {
    id: 'copy',
    name: 'Copywriting, per page',
    desc: 'Compelling, conversion-focused marketing copy written for one page',
    price: 199,
    category: 'content',
  },
  {
    id: 'rev',
    name: 'Extra revisions',
    desc: '3 rounds included free, then per additional feedback cycle',
    price: 199,
    category: 'content',
  },
  {
    id: 'page',
    name: 'Extra page',
    desc: 'Add another fully custom, responsive page to your web project',
    price: 299,
    category: 'content',
  },
  {
    id: 'maint',
    name: 'Monthly maintenance',
    desc: 'Continuous security patches, automated backups, and bug fixes',
    price: 299,
    category: 'maintenance',
    monthly: true,
    badge: 'Ongoing',
  },
];

export const FAQS: FAQItem[] = [
  {
    q: 'What does each package price include?',
    a: 'Design, hand-crafted frontend development, responsive tuning, domain/subdomain connection, and the dedicated post-launch support period listed. There are zero hidden fees.',
  },
  {
    q: 'Can I order just add-ons if I already have a website?',
    a: 'Yes, absolutely! You can choose any add-ons (like Logo Design for ₹99, Copywriting, or Subdomain Setup) without selecting a package. Just paste your website link in the cart box so we can review your existing website.',
  },
  {
    q: 'How does payment and milestone billing work?',
    a: 'Starter is paid upon kickoff. Growth and Pro follow a 50% upfront commitment and 50% final settlement prior to production DNS launch. Final source code and credentials are transferred upon full clearance.',
  },
  {
    q: 'How do revision cycles work?',
    a: 'Every package includes 3 structured revision rounds free of charge. A round consists of your consolidated feedback items. Extra rounds can be added for ₹199.',
  },
  {
    q: 'Do I retain 100% ownership of my website?',
    a: 'Yes. Upon final settlement, all custom frontend source code, design assets, and content are assigned 100% to you without restrictive vendor lock-in.',
  },
  {
    q: 'What content do I need to provide?',
    a: 'Please share your logo, photos, and basic text. If you need assistance with brand writing or logo creation, our add-ons start at just ₹99.',
  },
];
