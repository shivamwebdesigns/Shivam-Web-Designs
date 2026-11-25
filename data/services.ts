export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  idealFor: string;
}

export const servicesData: Service[] = [
  {
    id: 'web-design',
    slug: 'website-design',
    title: 'Website Design',
    subtitle: 'Bespoke visual identity and aesthetic digital craftsmanship.',
    description:
      'We craft tailored digital interfaces that communicate your brand values with precision. Every layout, typography decision, and interaction is engineered to captivate visitors and reinforce trust without superficial ornamentation.',
    deliverables: [
      'Custom Figma art direction & high-fidelity interactive prototypes',
      'Editorial typography pairing and modular layout system',
      'Comprehensive design system (color tokens, component library, spacing scales)',
      'Responsive design specifications across mobile, tablet, and ultra-wide displays',
      'Asset export suite (SVG icons, optimized imagery, typography guidelines)',
    ],
    techStack: ['Figma', 'Design Systems', 'Swiss Grid Architecture', 'Vector Graphics'],
    timeline: '2–4 Weeks',
    idealFor: 'Brands, digital agencies, and luxury products seeking a distinctive visual presence.',
  },
  {
    id: 'web-development',
    slug: 'website-development',
    title: 'Website Development',
    subtitle: 'High-performance, accessible, and clean frontend engineering.',
    description:
      'We build production-ready digital flagships and modern web applications with zero unnecessary runtime bloat. Engineered for sub-second loading, semantic accessibility, and frictionless user flows.',
    deliverables: [
      'Production Next.js / TypeScript clean architecture',
      'Mobile-first responsive layouts with fluid scaling',
      'Full WCAG 2.1 AA accessibility compliance',
      'SEO metadata architecture, Open Graph, and JSON-LD schema',
      'Edge deployment setup on Vercel with zero-downtime CI/CD pipelines',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    timeline: '3–6 Weeks',
    idealFor: 'Companies needing ultra-fast, scalable, and maintainable web platforms.',
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'User-centered product design grounded in human psychology.',
    description:
      'We solve complex interaction challenges by streamlining user journeys. From wireframing critical conversion funnels to refining micro-interactions, we turn intricate workflows into intuitive, engaging experiences.',
    deliverables: [
      'User journey mapping & information architecture blueprints',
      'Wireframing & low-fidelity user flow validation',
      'Interactive micro-interactions & feedback states',
      'Usability heuristic audits & conversion bottleneck diagnostics',
      'Developer handoff documentation with component state matrices',
    ],
    techStack: ['UX Research', 'Information Architecture', 'Figma Prototyping', 'Usability Auditing'],
    timeline: '2–5 Weeks',
    idealFor: 'SaaS products, web applications, and digital platforms requiring intuitive UX.',
  },
  {
    id: 'web-redesign',
    slug: 'website-redesign',
    title: 'Website Redesign',
    subtitle: 'Modernizing outdated websites into modern digital flagships.',
    description:
      'Transform legacy, clunky websites into high-converting, modern digital assets. We audit your existing analytics, preserve valuable SEO equity, and rebuild your platform with modern aesthetics and modern code standards.',
    deliverables: [
      'Comprehensive audit of current site performance and UX pain points',
      'SEO preservation strategy (301 redirect map and URL structure migration)',
      'Full visual makeover aligned with modern industry benchmarks',
      'Performance overhaul targeting sub-1.5s Largest Contentful Paint (LCP)',
      'Cross-browser and mobile device verification suite',
    ],
    techStack: ['Performance Auditing', 'SEO Migration', 'Next.js', 'Tailwind CSS'],
    timeline: '3–5 Weeks',
    idealFor: 'Established businesses with outdated websites that no longer match their caliber.',
  },
  {
    id: 'landing-page-dev',
    slug: 'landing-page-development',
    title: 'Landing Page Development',
    subtitle: 'High-conversion sales funnels and product launch pages.',
    description:
      'Precision-engineered single-page experiences built to convert traffic into qualified inquiries and customers. We combine punchy editorial copy hierarchy, social proof presentation, and lightning-fast form submissions.',
    deliverables: [
      'Conversion-optimized layout structure (Hero, Value Prop, Proof, CTA)',
      'Sub-second page load speeds optimized for Google Ads / social traffic',
      'Functional inquiry forms with spam protection and webhook notifications',
      'Custom animations and spatial interactive elements that retain attention',
      'Analytics event tracking and conversion goal integration',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Form Handlers', 'Conversion Engineering'],
    timeline: '1–2 Weeks',
    idealFor: 'Product launches, marketing campaigns, and service businesses seeking client inquiries.',
  },
  {
    id: 'maintenance',
    slug: 'website-maintenance',
    title: 'Website Maintenance',
    subtitle: 'Continuous performance optimization, security, and updates.',
    description:
      'Ensure your digital flagship remains fast, secure, and up to date. We handle dependency maintenance, performance monitoring, continuous backups, and proactive optimizations so you can focus on running your business.',
    deliverables: [
      'Monthly software updates and dependency security patches',
      'Core Web Vitals monitoring and performance tuning',
      'Uptime surveillance and rapid response SLA',
      'Content updates, blog/project publishing assistance',
      'Regular security audits and automated edge backups',
    ],
    techStack: ['Vercel Monitoring', 'Performance Profiling', 'Security Audits', 'CI/CD Maintenance'],
    timeline: 'Monthly Retainer',
    idealFor: 'Businesses wanting peace of mind and an ongoing technical partner.',
  },
];
