export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLinks {
  website: string;
  linkedin: string;
  github: string;
  instagram: string;
  whatsapp: string;
  email: string;
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
    phone: string;
    location: string;
    availability: string;
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
    phone: '+91 98765 43210',
    location: 'India • Serving Clients Worldwide',
    availability: 'Accepting select new projects for Q1 2027',
  },
  social: {
    website: 'https://shivamwebdesigns.devs.li',
    linkedin: 'https://www.linkedin.com/company/shivamwebdesigns/',
    github: 'https://github.com/shivamwebdesigns/Shivam-Web-Designs',
    instagram: 'https://www.instagram.com/shivamwebdesigns/',
    whatsapp: 'https://wa.me/919876543210?text=Hi%20Shivam%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20ShivamWebDesigns.',
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
