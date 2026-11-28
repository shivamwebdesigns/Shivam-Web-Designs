import React from 'react';
import type { Metadata } from 'next';
import { PackagesSection } from '@/components/PackagesSection';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Website Packages Starting at ₹499 | Shivam Web Designs',
  description:
    'Website Packages Starting at ₹499. Flexible solutions for businesses, creators and growing brands. Choose a package that fits your goals.',
  keywords: [
    'website packages',
    'web design pricing',
    'affordable web development',
    'freelance web designer',
    'website redesign',
    'landing page development',
    'shivam web designs',
    'web design india',
  ],
  alternates: {
    canonical: '/packages',
  },
  openGraph: {
    title: 'Website Packages Starting at ₹499 | Shivam Web Designs',
    description:
      'Website Packages Starting at ₹499. Flexible solutions for businesses, creators and growing brands. Choose a package that fits your goals.',
    url: `${siteConfig.url}/packages`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/github-social-preview.png`,
        width: 1280,
        height: 640,
        alt: 'ShivamWebDesigns Packages & Transparent Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Packages Starting at ₹499 | Shivam Web Designs',
    description:
      'Website Packages Starting at ₹499. Flexible solutions for businesses, creators and growing brands. Choose a package that fits your goals.',
    images: [`${siteConfig.url}/assets/github-social-preview.png`],
  },
};

export default function PackagesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'ShivamWebDesigns Website Packages & Transparent Pricing',
    description:
      'Hand-crafted website packages and modular add-ons with transparent, fixed pricing and zero hidden fees.',
    url: `${siteConfig.url}/packages`,
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Starter Package',
          description:
            'A digital profile page with 1 scrolling page, mobile-first custom design, live on free subdomain.',
        },
        price: '499',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Growth Package',
          description:
            'A complete one-page website with 4–5 sections, custom domain connection, inquiry form, and basic SEO.',
        },
        price: '999',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pro Package',
          description:
            'A high-performance multi-page website up to 3 pages with Next.js 15 architecture, analytics, and speed optimization.',
        },
        price: '1499',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Free Subdomain and Setup',
          description: 'Configure DNS, SSL, and launch on a free subdomain.',
        },
        price: '149',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Logo Design',
          description: 'A clean, modern brand logo and vector identity for your business.',
        },
        price: '99',
        priceCurrency: 'INR',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col min-h-screen">
        <PackagesSection isPage={true} />
      </main>
    </>
  );
}
