export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Spatial 3D' | 'Web Application' | 'Digital Editorial' | 'E-Commerce';
  badge: 'Studio Flagship' | 'Internal R&D' | 'Concept Exploration';
  client: string;
  year: string;
  role: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
  liveUrl: string;
  featured: boolean;
  thumbnail: string;
}

export const projectsData: Project[] = [
  {
    id: 'spatial-3d-card',
    slug: 'spatial-3d-card',
    title: 'Dual-Aspect 3D Spatial Business Card',
    subtitle: 'Tactile 3D business card engine with live Euler physics, aspect morphing, and vCard generation.',
    category: 'Spatial 3D',
    badge: 'Studio Flagship',
    client: 'ShivamWebDesigns (Self-Initiated)',
    year: '2026',
    role: 'Spatial Mathematics, CSS 3D Engine & Frontend Architecture',
    summary:
      'Real-time interactive 3D business card running at silky 60fps on mobile with zero heavy 3D library overhead. Supports live orientation morphing and instant vCard 3.0 export.',
    overview:
      'Engineered to prove that high-end interactive 3D does not require 30MB+ WebGL runtimes or bloated page builders. The digital card delivers a responsive, physics-smoothed experience that adapts dynamically between landscape and portrait formats.',
    challenge:
      'Traditional 3D web engines like Three.js introduce heavy bundle sizes, slow battery drain, and sluggish frame rates on budget smartphones. We wanted instantaneous loading and silky 60fps gesture response.',
    solution:
      'We architected an ultra-lean spatial transformation matrix powered purely by CSS 3D Transforms, pointer inertia physics, and dynamic 260ms aspect-ratio morphing between landscape (3.5x2 in) and portrait (2x3.5 in) viewports.',
    technologies: ['CSS 3D Transforms', 'Vanilla ES2022', 'Euler Physics', 'vCard 3.0 Protocol', 'Touch Inertia Engine'],
    metrics: [
      { label: 'Mobile Frame Rate', value: '60 FPS' },
      { label: '3D Engine Footprint', value: '< 45 KB' },
      { label: 'External 3D Bloat', value: 'Zero Libraries' },
      { label: 'Morph Transition', value: '260ms Fluid' },
    ],
    deliverables: [
      'Dual-Aspect Ratio Spatial 3D Engine',
      'Physics-Damped Euler Rotation System',
      'Instant Client-Side vCard 3.0 Generation',
      'Mobile-First Touch Gesture Handling',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li/businesscard',
    featured: true,
    thumbnail: '/assets/projects/aura-audio.png',
  },
  {
    id: 'swd-flagship',
    slug: 'swd-flagship',
    title: 'ShivamWebDesigns Digital Flagship',
    subtitle: 'Official studio web application, editorial design system, and sub-second edge deployment.',
    category: 'Web Application',
    badge: 'Studio Flagship',
    client: 'ShivamWebDesigns (Self-Initiated)',
    year: '2026',
    role: 'Art Direction, Architecture, Design System & Full-Stack Development',
    summary:
      'The official digital presence of ShivamWebDesigns, designed with strict Swiss monochrome typography, zero AI slop, and production Next.js 15 App Router architecture.',
    overview:
      'Built as the definitive showcase of our studio standards. Stripped of generic template conventions and third-party script bloat, the website delivers an authoritative, focused experience that converts prospective clients.',
    challenge:
      'Modern agency websites often suffer from cognitive overload, sluggish third-party trackers, and generic purple gradients that look like templates. We wanted uncompromising distinction and sub-second speed.',
    solution:
      'Constructed with Next.js 15 App Router, TypeScript, and Tailwind CSS. Engineered with semantic HTML5, accessible form intake validation, structured JSON-LD schemas, and zero unneeded runtime baggage.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel Edge Network'],
    metrics: [
      { label: 'Lighthouse Performance', value: '100/100' },
      { label: 'Core Web Vitals', value: 'Pass (Sub-second)' },
      { label: 'Third-Party Trackers', value: '0 Trackers' },
      { label: 'Accessibility Standard', value: 'WCAG 2.1 AA' },
    ],
    deliverables: [
      'Complete Agency Architecture & Design System',
      'Client Intake Specification API & Validation',
      'Automated Sitemap & Schema.org JSON-LD Infrastructure',
      'Responsive Mobile App-Shell Architecture',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li',
    featured: true,
    thumbnail: '/assets/projects/nexus-analytics.png',
  },
  {
    id: 'editorial-typography',
    slug: 'editorial-typography',
    title: 'Swiss Editorial & Typography Engine',
    subtitle: 'Distraction-free reading experience and proportional international grid system study.',
    category: 'Digital Editorial',
    badge: 'Internal R&D',
    client: 'Studio Concept Exploration',
    year: '2026',
    role: 'Editorial Direction, Typographic Hierarchy & Layout Prototyping',
    summary:
      'An internal studio exploration demonstrating how classical Swiss typography and generous whitespace elevate digital reading into an authoritative, calm experience.',
    overview:
      'Exploration into proportional Swiss grid systems, strict monochrome typography, and distraction-free digital publishing without invasive ads, trackers, or noisy animations.',
    challenge:
      'Digital longform content is usually surrounded by aggressive popups and cluttered sidebars that fracture reader attention and degrade brand authority.',
    solution:
      'Designed an ultra-clean layout system based on classical typographic scale ratios, generous editorial margins, fluid responsive line lengths, and distraction-free reading modes.',
    technologies: ['Swiss Grid Architecture', 'Typography Hierarchy', 'Next.js', 'Responsive Layouts'],
    metrics: [
      { label: 'Design Discipline', value: 'Swiss International' },
      { label: 'Cumulative Layout Shift', value: '0.000 (Zero Shift)' },
      { label: 'Readability Contrast', value: 'WCAG AAA Compliant' },
      { label: 'Third-Party Ads/Trackers', value: 'Zero' },
    ],
    deliverables: [
      'Proportional Editorial Typographic Scale',
      'Distraction-Free Reading Layout',
      'Modular Swiss Grid Components',
      'Fluid Responsive Baseline Engine',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li',
    featured: true,
    thumbnail: '/assets/projects/revista-magazine.png',
  },
  {
    id: 'chrono-showcase',
    slug: 'chrono-showcase',
    title: 'Haute Horlogerie Showcase Concept',
    subtitle: 'Concept showcase exploration for high-craft mechanical watchmaking and artisan products.',
    category: 'E-Commerce',
    badge: 'Concept Exploration',
    client: 'Studio Concept Exploration',
    year: '2026',
    role: 'Concept UI/UX, Editorial Art Direction & Component Architecture',
    summary:
      'A conceptual luxury showcase exploring macro-photography presentation, minimalist luxury aesthetics, and private consultation flows.',
    overview:
      'An internal design exploration created to test aesthetic trust patterns for ultra-luxury goods. Emphasizes stark black-and-white contrast, macro inspection, and serene whitespace.',
    challenge:
      'Communicating artisan craftsmanship through a digital screen without relying on tacky gold gradients or generic e-commerce templates.',
    solution:
      'Engineered high-density image presentation with progressive blur-up, minimal technical specification grids, and a discreet consultation intake architecture.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Editorial Grid Architecture'],
    metrics: [
      { label: 'Aesthetic Focus', value: 'Monochrome Luxury' },
      { label: 'Image Delivery', value: 'Progressive WebP/AVIF' },
      { label: 'Typography Pairing', value: 'Inter & JetBrains Mono' },
      { label: 'Project Scope', value: 'Concept Prototype' },
    ],
    deliverables: [
      'Editorial Product Showcase Layout',
      'Technical Specification Grid System',
      'Discreet Consultation Flow Architecture',
      'Design Token Documentation',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li',
    featured: true,
    thumbnail: '/assets/projects/chrono-luxury.png',
  },
];
