export interface FounderProfile {
  name: string;
  role: string;
  company: string;
  image: string;
  intro: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  philosophy: {
    title: string;
    principles: {
      headline: string;
      description: string;
    }[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  founderNote: {
    title: string;
    quote: string;
    body: string[];
    signoff: string;
  };
  social: {
    linkedin: string;
    github: string;
    instagram: string;
    email: string;
    whatsapp: string;
    businessCard: string;
  };
}

export const founderData: FounderProfile = {
  name: 'Shivam Purohit',
  role: 'Founder & CEO',
  company: 'ShivamWebDesigns',
  image: '/assets/founder-hd.jpg',
  intro:
    'Designer, frontend engineer, and founder dedicated to building purposeful digital flagships that fuse Swiss aesthetic restraint with uncompromising technical performance.',
  story: {
    title: 'The Journey Behind ShivamWebDesigns',
    paragraphs: [
      'ShivamWebDesigns was founded on a simple observation: the modern web has become loud, cluttered, and bloated with unnecessary frameworks and generic templates. Too many businesses invest heavily in websites that look like clones of each other, take seconds to load, and fail to generate real commercial results.',
      'My journey began with a relentless curiosity about how digital interfaces work under the hood. I immersed myself in visual communication, Swiss typography, and frontend engineering. I realized that the greatest digital experiences are not defined by flashy gimmicks or heavy libraries—they are defined by clarity, intention, and precision engineering.',
      'I built SWD as an independent studio where every client works directly with the person designing and writing the code. There are no account managers, no layers of bureaucracy, and no junior handoffs. Just rigorous design, clean code, and direct collaboration from day one.',
    ],
  },
  philosophy: {
    title: 'Guiding Principles',
    principles: [
      {
        headline: 'Design Must Have a Purpose',
        description:
          'Aesthetics without utility is mere decoration. Every color choice, spacing token, and typography scale should guide the user, clarify the message, and serve a tangible objective.',
      },
      {
        headline: 'Websites Should Solve Real Problems',
        description:
          'A website is not an ornament—it is a critical business asset. Whether it is reducing bounce rates, improving inquiry conversions, or communicating premium brand value, measurable business impact comes first.',
      },
      {
        headline: 'Simplicity and Functionality Matter Above All',
        description:
          'Simplicity is the ultimate sophistication. By stripping away visual clutter, redundant code, and slow plugins, we create websites that are effortlessly fast, accessible, and enduring.',
      },
      {
        headline: 'Craftsmanship in Every Pixel and Line of Code',
        description:
          'Great digital craft exists at the intersection of design and engineering. Clean semantic HTML, fluid responsiveness, and 60fps micro-interactions create an intangible sense of premium quality.',
      },
    ],
  },
  skills: [
    {
      category: 'Website Design & Art Direction',
      items: [
        'Creative Direction & Concept Ideation',
        'Swiss Grid & Editorial Layout Systems',
        'Typography Hierarchy & Color Architecture',
        'Design Systems & Component Tokenization',
        'High-Fidelity Figma Prototyping',
      ],
    },
    {
      category: 'Frontend & Spatial Engineering',
      items: [
        'Next.js, React & TypeScript Architecture',
        'Tailwind CSS & Modern Responsive Systems',
        'CSS 3D Spatial Transforms & Real-Time Physics',
        'Sub-second Core Web Vitals Optimization',
        'WCAG 2.1 AA Accessibility Standards',
      ],
    },
    {
      category: 'UI/UX & Conversion Architecture',
      items: [
        'User Journey Mapping & Information Architecture',
        'High-Converting Landing Page Layouts',
        'Inquiry Funnel Optimization & Form UX',
        'Usability Auditing & Heuristic Evaluation',
      ],
    },
    {
      category: 'Branding & Digital Experience',
      items: [
        'Brand Identity Guidelines & Vector Assets',
        'Digital Flagship Architecture',
        'Interactive 3D Business Cards',
        'Technical Strategy & Creative Consulting',
      ],
    },
  ],
  founderNote: {
    title: 'A Personal Note from Shivam',
    quote: 'We don’t build templates. We craft tailored digital flagships for founders who care deeply about their reputation.',
    body: [
      'When you partner with ShivamWebDesigns, you are placing your digital reputation in our hands. That is a responsibility I take with the utmost seriousness.',
      'Every project we accept receives obsessive attention to detail. We do not rush through conveyor-belt templates or outsource to nameless third parties. We treat your vision with the care, curiosity, and technical rigor it deserves.',
      'Whether you are launching a new venture, revamping an established brand, or need an engineering partner to solve a complex digital challenge, I look forward to working together to build something extraordinary.',
    ],
    signoff: 'Shivam Purohit — Founder & CEO, ShivamWebDesigns',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/purohit-bhagyesh-193766413/',
    github: 'https://github.com/PurohitBhagyesh',
    instagram: 'https://www.instagram.com/purohitshivam23/',
    email: 'purohitunofficialbhagyesh@gmail.com',
    whatsapp: 'https://wa.me/917861965480',
    businessCard: '/businesscard',
  },
};
