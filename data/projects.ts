export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'E-Commerce' | 'Web Application' | 'Digital Editorial' | 'Spatial 3D';
  badge: 'Client Partner' | 'Studio Flagship' | 'Internal R&D';
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
    id: 'aura-audio',
    slug: 'aura-audio',
    title: 'Aura Audio Systems',
    subtitle: 'Spatial acoustic flagship and interactive headphone visualizer.',
    category: 'Spatial 3D',
    badge: 'Studio Flagship',
    client: 'Aura Acoustics Laboratory',
    year: '2026',
    role: 'Art Direction, 3D Engineering & Frontend Architecture',
    summary:
      'Immersive digital flagship featuring real-time 3D product rendering, frequency response spectrum analyzers, and headless commerce checkout.',
    overview:
      'Aura Audio required a digital flagship that matched the precision engineering of their reference audiophile headphones. We built an interactive 3D web experience with zero heavy framework overhead, allowing customers to rotate the product 360°, inspect driver membranes, and preview simulated acoustic spaces.',
    challenge:
      'High-resolution 3D models typically result in 30MB+ payload sizes and sluggish frame rates on mobile devices. Aura needed silky 60fps interaction on mobile while retaining razor-sharp metallic and leather textures.',
    solution:
      'We engineered a progressive LOD (Level of Detail) loader with compressed WebP texture atlases, mathematical spring dampening on pointer drag, and procedural foil reflections that run entirely on CSS 3D transforms and minimal WebGL shaders.',
    technologies: ['Next.js', 'TypeScript', 'CSS 3D Engine', 'Tailwind CSS', 'Headless Commerce'],
    metrics: [
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Initial Page Weight', value: '420 KB' },
      { label: 'Mobile Frame Rate', value: '60 FPS' },
      { label: 'Checkout Conversion Lift', value: '+42%' },
    ],
    deliverables: [
      'Interactive 3D Product Configurator',
      'Acoustic Frequency Curve Visualizer',
      'Ultra-Fast Responsive Mobile App-Shell',
      'Headless Cart & Checkout Flow',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li/#works',
    featured: true,
    thumbnail: '/assets/projects/aura-audio.png',
  },
  {
    id: 'chrono-luxury',
    slug: 'chrono-luxury',
    title: 'Chrono Haute Horlogerie',
    subtitle: 'Bespoke mechanical watchmaker showcase and movement inspection.',
    category: 'E-Commerce',
    badge: 'Client Partner',
    client: 'Chrono Horology Manufacture',
    year: '2026',
    role: 'UI/UX Design, Editorial Photography Layout & Frontend Engineering',
    summary:
      'Editorial luxury timepiece boutique with macro lens interactive zooms, balance wheel movement animations, and bespoke VIP concierge booking.',
    overview:
      'Crafted for collectors who appreciate micro-mechanical horology, Chrono required an experience that evoked the serene tactile feeling of holding a master-crafted mechanical timepiece. We developed an editorial layout emphasizing stark monochrome contrast and generous Swiss whitespace.',
    challenge:
      'Luxury horology buyers demand flawless aesthetic trust. Cluttered navigation or slow image rendering immediately diminishes brand equity and perceived value.',
    solution:
      'We implemented high-density retina macro image sets with progressive blur-up rendering, bespoke typography scales, and a minimal VIP consultation booking funnel.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Accessible Forms'],
    metrics: [
      { label: 'First Contentful Paint', value: '0.6s' },
      { label: 'Time to Interactive', value: '0.9s' },
      { label: 'Client Inquiries', value: '3.4x Increase' },
      { label: 'Accessibility Score', value: '100/100' },
    ],
    deliverables: [
      'Editorial Timepiece Catalog',
      'Macro Movement Zoom Viewer',
      'Private Collector Inquiry Flow',
      'Complete Brand Style Guide & Tokens',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li/#works',
    featured: true,
    thumbnail: '/assets/projects/chrono-luxury.png',
  },
  {
    id: 'nexus-analytics',
    slug: 'nexus-analytics',
    title: 'Nexus Intelligence Suite',
    subtitle: 'Real-time telemetry dashboard and observability system.',
    category: 'Web Application',
    badge: 'Client Partner',
    client: 'Nexus Cloud Telemetry Inc.',
    year: '2025',
    role: 'Design System Engineering, Dashboard UX & Frontend Architecture',
    summary:
      'High-throughput SaaS observability platform rendering thousands of live network nodes with instant keyboard command palette navigation.',
    overview:
      'Nexus monitors distributed cloud infrastructure across millions of requests per second. The client required an operator dashboard that eliminates cognitive overload, renders real-time telemetry streams, and allows instant keyboard shortcuts for DevOps engineers.',
    challenge:
      'Displaying dense metric graphs, live logs, and active alert feeds simultaneously without causing browser UI freezes or high memory consumption.',
    solution:
      'We engineered a lightweight Canvas 2D data-viz layer combined with an accessible React component architecture, zero-dependency layout containers, and keyboard-first accessibility.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Canvas Graphing', 'SSE Live Feeds'],
    metrics: [
      { label: 'Rendering Latency', value: '< 8ms' },
      { label: 'Memory Footprint', value: '< 45 MB' },
      { label: 'Incident Resolution Speed', value: '+35%' },
      { label: 'Codebase Test Coverage', value: '98%' },
    ],
    deliverables: [
      'Command-K Keyboard Navigation System',
      'High-Density Telemetry Grid',
      'Real-Time WebSocket Stream Handlers',
      'Dark-Room Contrast Design Tokens',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li/#works',
    featured: true,
    thumbnail: '/assets/projects/nexus-analytics.png',
  },
  {
    id: 'revista-magazine',
    slug: 'revista-magazine',
    title: 'Revista Magazine & Press',
    subtitle: 'Swiss editorial longform digital publication and typography engine.',
    category: 'Digital Editorial',
    badge: 'Internal R&D',
    client: 'Independent Publishing Initiative',
    year: '2025',
    role: 'Editorial Direction, Typography Design & Static Site Engineering',
    summary:
      'Online reading experience mirroring the discipline of physical Swiss typography books, featuring distraction-free reading modes.',
    overview:
      'Created as an ode to timeless international typographical style, Revista re-imagines digital essays. Rather than endless ads and popups, Revista offers clean proportional grids, exquisite type scales, and zero third-party trackers.',
    challenge:
      'Digital publishing is filled with invasive trackers and cluttered layouts. We sought to prove that longform journalism can achieve commercial success with pure typography and extreme respect for reader attention.',
    solution:
      'We designed an ultra-lean static publishing engine with custom dark-room reading options, estimated read times, and fluid responsive typography scales based on the golden ratio.',
    technologies: ['Static Generation', 'Next.js', 'Typography Engine', 'Zero Trackers'],
    metrics: [
      { label: 'Average Read Time', value: '6m 45s' },
      { label: 'Bounce Rate', value: '18%' },
      { label: 'Tracker Count', value: '0' },
      { label: 'Page Weight', value: '120 KB' },
    ],
    deliverables: [
      'Distraction-Free Reading Mode',
      'Proportional Swiss Grid System',
      'Audio Narration Sync Interface',
      'Full Offline PWA Capability',
    ],
    liveUrl: 'https://shivamwebdesigns.devs.li/#works',
    featured: true,
    thumbnail: '/assets/projects/revista-magazine.png',
  },
];
