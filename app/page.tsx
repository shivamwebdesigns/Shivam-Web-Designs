import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { SpatialStack } from '@/components/SpatialStack';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { WorkingProcess } from '@/components/WorkingProcess';
import { FounderPreview } from '@/components/FounderPreview';
import { InquiryCTA } from '@/components/InquiryCTA';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.assets.bannerDesktop,
        width: 1920,
        height: 640,
        alt: `${siteConfig.name} — Digital Agency Banner`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shivamwebdesigns',
    creator: '@shivamwebdesigns',
    title: siteConfig.seo.twitterTitle,
    description: siteConfig.seo.twitterDescription,
    images: [siteConfig.assets.bannerDesktop],
  },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesSection />
      <SpatialStack />
      <FeaturedProjects />
      <WhyChooseUs />
      <WorkingProcess />
      <FounderPreview />
      <InquiryCTA />
    </div>
  );
}
