import React from 'react';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { WorkingProcess } from '@/components/WorkingProcess';
import { FounderPreview } from '@/components/FounderPreview';
import { InquiryCTA } from '@/components/InquiryCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesSection />
      <FeaturedProjects />
      <WhyChooseUs />
      <WorkingProcess />
      <FounderPreview />
      <InquiryCTA />
    </div>
  );
}
