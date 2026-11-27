import React from 'react';
import type { Metadata } from 'next';
import { PackagesSection } from '@/components/PackagesSection';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Websites Price Starts From ₹499 | Shivam Web Designs',
  description:
    'Websites price starts from ₹499. Choose your favourite packages and modular add-ons. Direct founder execution with guaranteed sub-second speed.',
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
    title: 'Websites Price Starts From ₹499 | Shivam Web Designs',
    description:
      'Websites price starts from ₹499. Choose your favourite packages and modular add-ons. Direct founder execution with guaranteed sub-second speed.',
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
    title: 'Websites Price Starts From ₹499 | Shivam Web Designs',
    description:
      'Websites price starts from ₹499. Choose your favourite packages and modular add-ons with zero hidden fees.',
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
        price: '1500',
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
        {/* Packages Dedicated Hero */}
        <section className="pt-28 pb-10 sm:pt-32 sm:pb-12 border-b border-neutral-900 bg-neutral-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-800 bg-neutral-900/80 text-xs font-mono text-neutral-300 mb-4">
                <span>PACKAGES // FIXED PRICES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
                Websites price starts from ₹499
              </h1>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                Choose your favourite packages below. Mix and match modular add-ons or order standalone for your existing website. We review your order and reach out within 24–48 hours to confirm kickoff and next steps.
              </p>
            </div>
          </div>
        </section>

        <PackagesSection isPage={true} />
      </main>
    </>
  );
}
