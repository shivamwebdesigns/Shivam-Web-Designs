import React from 'react';
import { TextShimmer } from '@/components/ui/TextShimmer';

export const WorkingProcess: React.FC = () => {
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
    <section className="py-14 sm:py-20 lg:py-24 border-b border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                <TextShimmer>05 // METHODOLOGY &amp; SPRINT DISCIPLINE</TextShimmer>
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2">
              Our Working Process
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl">
              A transparent, disciplined four-stage engineering cycle designed to deliver excellence without delays or surprises.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest border border-neutral-800 px-3 py-1.5 self-start md:self-auto">
            Sprint-Driven • Fixed Timeline
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="border border-neutral-900 bg-black p-8 flex flex-col justify-between hover:border-neutral-800 transition-colors relative"
            >
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-3xl font-light font-mono text-white">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 border border-neutral-800">
                    {item.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-light text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-900">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
                  Key Deliverables
                </div>
                <ul className="space-y-1.5">
                  {item.deliverables.map((del, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-neutral-300 font-mono flex items-start gap-2"
                    >
                      <span className="text-neutral-400 select-none">›</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
