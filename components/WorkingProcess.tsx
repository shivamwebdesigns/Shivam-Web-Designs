import React from 'react';

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
    <section className="py-12 sm:py-16 lg:py-20 border-b border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="mb-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Methodology
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-3">
            Our Working Process
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            A transparent, disciplined four-stage engineering cycle designed to deliver excellence without delays or surprises.
          </p>
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
