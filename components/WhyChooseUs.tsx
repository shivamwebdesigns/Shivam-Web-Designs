'use client';

import React from 'react';
import { Shield, Zap, Sparkles, UserCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { PerformanceChart } from '@/components/ui/PerformanceChart';
import { ShinyText } from '@/components/ui/ShinyText';

export function WhyChooseUs() {
  const pillars = [
    {
      icon: Sparkles,
      number: '01',
      title: 'Bespoke Craftsmanship',
      subtitle: 'Zero generic templates or AI slop',
      description:
        'Every website is built custom from scratch. We design with intentional Swiss typographical scales, generous whitespace, and purposeful interactions that represent your brand with genuine distinction.',
    },
    {
      icon: UserCheck,
      number: '02',
      title: 'Direct Founder Collaboration',
      subtitle: 'No account managers or junior handoffs',
      description:
        'You work directly with Shivam Purohit from initial concept strategy through architecture, design, and code deployment. Clear communication, radical accountability, and rapid decision-making.',
    },
    {
      icon: Zap,
      number: '03',
      title: 'Sub-Second Speed & Engineering Rigor',
      subtitle: '99+ Core Web Vitals standard',
      description:
        'We engineer lean Next.js applications stripped of heavy third-party baggage. Lightning-fast load times, semantic accessibility, and edge delivery that boost SEO rankings and visitor retention.',
    },
    {
      icon: Shield,
      number: '04',
      title: 'Commercial Business Impact',
      subtitle: 'Websites engineered to convert',
      description:
        'We do not treat websites as mere digital art. We architect navigation, inquiry funnels, and value propositions that build trust with high-value clients and drive measurable commercial inquiries.',
    },
  ];

  return (
    <section className="py-24 border-t border-neutral-900 bg-neutral-950 relative" id="why-swd">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <ShinyText>04 // THE AGENCY ADVANTAGE</ShinyText>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Why Work With ShivamWebDesigns
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed font-light">
            In an era of cookie-cutter templates and bloated page builders, ShivamWebDesigns takes the opposing path: disciplined craftsmanship, direct founder ownership, and quantified technical superiority.
          </p>
        </div>

        {/* Top Feature: Interactive Apache ECharts Performance Benchmark */}
        <div className="mb-12">
          <PerformanceChart />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <SpotlightCard
                key={pillar.number}
                className="flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-neutral-500">
                      {pillar.number} //
                    </span>
                    <div className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900/60 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>SWD STANDARD</span>
                  <span className="text-white">VERIFIED</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
