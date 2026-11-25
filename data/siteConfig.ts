export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLinks {
  website: string;
  linkedin: string;
  github: string;
  instagram: string;
  email: string;
  whatsapp?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  headline: string;
  supportingText: string;
  description: string;
  url: string;
  assets: {
    logoPng: string;
    logoSvg: string;
    bannerDesktop: string;
    bannerMobile: string;
    founderImage: string;
  };
  contact: {
    email: string;
    location: string;
    availability: string;
    phone?: string;
  };
  social: SocialLinks;
  navigation: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: 'ShivamWebDesigns',
  shortName: 'SWD',
  tagline: 'Independent Web Design & Development Agency',
  headline: 'Building Digital Experiences That Move Businesses Forward.',
  supportingText:
    'We design and develop thoughtful digital experiences that help individuals, brands and businesses establish a stronger online presence.',
  description:
    'ShivamWebDesigns (SWD) is an independent digital studio specializing in bespoke website design, UI/UX architecture, frontend engineering, and high-performance digital flagships.',
  url: 'https://shivamwebdesigns.devs.li',
  assets: {
    logoPng: '/assets/logo.png',
    logoSvg: '/assets/logo.svg',
    bannerDesktop: '/assets/banner-desktop.png',
    bannerMobile: '/assets/banner-mobile.png',
    founderImage: '/assets/founder.jpg',
  },
  contact: {
    email: 'shivam@shivamwebdesigns.com',
    location: 'India • Serving Clients Worldwide',
    availability: 'Accepting select new projects',
  },
  social: {
    website: 'https://shivamwebdesigns.devs.li',
    linkedin: 'https://www.linkedin.com/company/shivamwebdesigns/',
    github: 'https://github.com/shivamwebdesigns/Shivam-Web-Designs',
    instagram: 'https://www.instagram.com/shivamwebdesigns/',
    email: 'mailto:shivam@shivamwebdesigns.com',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Founder', href: '/founder' },
    { label: 'Contact', href: '/contact' },
  ],
};
