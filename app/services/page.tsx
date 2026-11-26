'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Layers, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { servicesData } from '@/data/services';
import { InquiryCTA } from '@/components/InquiryCTA';
import { SplitText } from '@/components/ui/SplitText';
import { ShinyText } from '@/components/ui/ShinyText';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SlideTextButton } from '@/components/ui/SlideTextButton';

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Services Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>STUDIO CAPABILITIES // ARCHITECTURE &amp; CRAFT</ShinyText>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              <SplitText text="Bespoke digital disciplines tailored to ambitious brands." wordMode delay={35} />
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              We provide six focused services covering the full lifecycle of a digital flagship—from strategic interface design and user psychology to sub-second Next.js engineering and ongoing evolution.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detailed Breakdown with SpotlightCards */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {servicesData.map((service, index) => (
              <SpotlightCard
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 p-8 md:p-12 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Service Meta Left */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                          0{index + 1} // DISCIPLINE
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300 rounded-full">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          {service.timeline}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                        {service.title}
                      </h2>
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6">
                        {service.subtitle}
                      </div>

                      <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="p-4 bg-black/60 border border-neutral-800 rounded-lg mb-6">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Ideal For:
                        </div>
                        <p className="text-xs text-neutral-300 font-light">
                          {service.idealFor}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-900">
                      <SlideTextButton
                        href={`/start-project?service=${service.slug}`}
                        primaryText={`Inquire: ${service.title}`}
                        secondaryText="Initiate Project"
                        variant="primary"
                        icon={<ArrowRight className="w-4 h-4" />}
                      />
                    </div>
                  </div>

                  {/* Deliverables & Stack Right */}
                  <div className="lg:col-span-7 flex flex-col justify-between lg:border-l lg:border-neutral-900 lg:pl-10 space-y-6">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-white" />
                        <span>Included Deliverables</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3 bg-neutral-900/50 border border-neutral-800/80 rounded-lg text-xs text-neutral-300 font-light flex items-start gap-2"
                          >
                            <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-900">
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                        Technology Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-mono px-3 py-1 bg-black border border-neutral-800 text-neutral-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <InquiryCTA />
    </div>
  );
}
