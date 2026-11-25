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
  whatsapp: string;
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
    bannerDesktop: string;
    bannerMobile: string;
    founderImage: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
  social: SocialLinks;
  navigation: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: 'ShivamWebDesigns',
  shortName: 'SWD',
  tagline: 'Web Design & Development Studio',
  headline: 'Building Digital Experiences That Move Businesses Forward.',
  supportingText:
    'We design and develop thoughtful digital experiences that help individuals, brands and businesses establish a stronger online presence.',
  description:
    'ShivamWebDesigns is a web design and development studio based in India, creating custom websites, considered UI/UX, and digital experiences for businesses.',
  url: 'https://shivamwebdesigns.devs.li',
  assets: {
    logoPng: '/assets/logo.png',
    bannerDesktop: '/assets/banner-desktop.png',
    bannerMobile: '/assets/banner-mobile.png',
    founderImage: '/assets/founder-hd.jpg',
  },
  contact: {
    email: 'shivamwebdesigns23@gmail.com',
    phone: '+91 78619 65480',
    whatsapp: 'https://wa.me/917861965480?s=p',
    location: 'India • Serving Clients Worldwide',
  },
  social: {
    website: 'https://shivamwebdesigns.devs.li',
    linkedin: 'https://www.linkedin.com/company/shivamwebdesigns/',
    github: 'https://github.com/shivamwebdesigns/Shivam-Web-Designs',
    instagram: 'https://www.instagram.com/shivamwebdesigns/',
    whatsapp: 'https://wa.me/917861965480?s=p',
    email: 'mailto:shivamwebdesigns23@gmail.com',
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
