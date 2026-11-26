'use client';

import React from 'react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ShinyText } from '@/components/ui/ShinyText';

export function WorkingProcess() {
  const steps = [
    {
      step: '01',
      title: 'Discovery & Strategic Direction',
      timeline: 'Days 1 – 5',
      summary:
        'We dissect your business goals, target audience, competitive landscape, and digital positioning. We define the technical architecture, content outline, and visual benchmarks.',
      deliverables: ['Creative Brief', 'Information Architecture', 'Competitor Analysis', 'Tech Stack Specification'],
    },
    {
      step: '02',
      title: 'Design Architecture & Prototyping',
      timeline: 'Weeks 1 – 2',
      summary:
        'We design high-fidelity Figma layouts using Swiss grid principles, typographic hierarchy, and bespoke component systems. You review interactive prototypes before code is written.',
      deliverables: ['Design System Tokens', 'Figma Prototypes (Mobile & Desktop)', 'Motion & Micro-interactions'],
    },
    {
      step: '03',
      title: 'Precision Engineering & Optimization',
      timeline: 'Weeks 2 – 4',
      summary:
        'We implement clean, semantic Next.js and TypeScript code. We rigorously tune Core Web Vitals, implement responsive fluid scaling, and connect production inquiry APIs.',
      deliverables: ['Next.js Codebase', 'Sub-second Page Speeds', 'WCAG 2.1 AA Accessibility', 'Backend Inquiry System'],
    },
    {
      step: '04',
      title: 'Deployment, Testing & Launch',
      timeline: 'Week 4+',
      summary:
        'We conduct exhaustive cross-browser audits, configure custom domains, set up SSL, submit sitemaps to search engines, and hand over clean documentation with ongoing support options.',
      deliverables: ['Zero-Downtime Vercel Deploy', 'Full SEO Setup & Analytics', 'DNS & SSL Verification', 'Ongoing Retainer Support'],
    },
  ];

  return (
    <section className="py-24 border-t border-neutral-900 bg-black relative" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>05 // METHODOLOGY &amp; SPRINTS</ShinyText>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Our Working Process
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl font-light">
              A transparent, disciplined four-stage engineering cycle designed to deliver digital excellence on fixed timelines.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest border border-neutral-800 bg-neutral-950 px-3.5 py-2 rounded-full self-start md:self-auto">
            Sprint-Driven • Fixed Timeline
          </div>
        </div>

        {/* Process Steps with SpotlightCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <SpotlightCard
              key={item.step}
              className="flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-3xl font-light font-mono text-white">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 bg-black px-2.5 py-1 rounded-full border border-neutral-800">
                    {item.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                  {item.summary}
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-900">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  Key Deliverables
                </div>
                <ul className="space-y-1.5">
                  {item.deliverables.map((del, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-neutral-300 font-mono flex items-start gap-2"
                    >
                      <span className="text-neutral-600 select-none">›</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
