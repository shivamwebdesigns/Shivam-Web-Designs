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
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  url: string;
  assets: {
    logoPng: string;
    favicon: string;
    bannerDesktop: string;
    bannerMobile: string;
    founderImage: string;
    socialPreview: string;
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
    'We craft premium websites and immersive digital experiences that elevate brands and bring ideas to life.',
  seo: {
    title: 'Shivam Web Designs | Digital Experiences, Crafted with Precision',
    description:
      'We craft premium websites and immersive digital experiences that elevate brands and bring ideas to life.',
    ogTitle: 'Shivam Web Designs | Where Design Meets Digital Excellence.',
    ogDescription:
      'Thoughtfully designed websites, seamless digital experiences and creative web solutions built to elevate your brand.',
    twitterTitle: 'Shivam Web Designs | Digital Design & Development',
    twitterDescription:
      'Crafting exceptional digital experiences through design, innovation and technology.',
  },
  url: 'https://shivamwebdesigns.devs.li',
  assets: {
    logoPng: '/assets/logo-trimmed.png',
    favicon: '/assets/favicon-512.png',
    bannerDesktop: '/assets/banner-desktop.png',
    bannerMobile: '/assets/banner-mobile.png',
    founderImage: '/assets/founder-hd.jpg',
    socialPreview: '/assets/github-social-preview.png',
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
    github: 'https://github.com/shivamwebdesigns',
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
