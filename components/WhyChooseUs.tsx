import React from 'react';
import { Shield, Zap, Sparkles, UserCheck } from 'lucide-react';
import { ScrollTextReveal } from '@/components/ui/ScrollTextReveal';

export const WhyChooseUs: React.FC = () => {
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
    <section className="py-12 sm:py-16 lg:py-20 border-b border-neutral-900 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="mb-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              The Agency Advantage
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-3">
            Why Work With SWD
          </h2>
          <ScrollTextReveal
            text="In an era of cookie-cutter templates and bloated page builders, ShivamWebDesigns takes the opposing path: disciplined craftsmanship, direct founder ownership, and technical excellence."
            className="text-base text-neutral-400 leading-relaxed"
          />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-900 border border-neutral-900">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="bg-black p-8 flex flex-col justify-between hover:bg-neutral-950/80 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-neutral-400">
                      {pillar.number}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-light text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                    {pillar.subtitle}
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>SWD STANDARD</span>
                  <span>VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
