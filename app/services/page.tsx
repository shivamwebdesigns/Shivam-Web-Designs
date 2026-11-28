import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Layers, Sparkles } from 'lucide-react';
import { servicesData } from '@/data/services';
import { InquiryCTA } from '@/components/InquiryCTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore the design and engineering services offered by ShivamWebDesigns — Website Design, Frontend Development, UI/UX Architecture, Redesigns, and Maintenance.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Services Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Bespoke digital disciplines tailored to ambitious brands.
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              We provide six focused services that cover the full lifecycle of a digital flagship—from strategic interface design and user psychology to sub-second Next.js engineering and ongoing evolution.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detailed Breakdown */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 border border-neutral-900 bg-neutral-950/40 p-8 md:p-12 transition-all hover:border-neutral-800"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Service Meta Left */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                          0{index + 1} // DISCIPLINE
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          {service.timeline}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
                        {service.title}
                      </h2>
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6">
                        {service.subtitle}
                      </div>

                      <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="p-4 bg-neutral-900/50 border border-neutral-800/80 mb-6">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                          Ideal For:
                        </div>
                        <p className="text-xs text-neutral-300 font-light">
                          {service.idealFor}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-900">
                      <Link
                        href={`/start-project?service=${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold w-full sm:w-auto justify-center"
                      >
                        <span>Inquire About {service.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Deliverables & Stack Right */}
                  <div className="lg:col-span-7 flex flex-col justify-between lg:border-l lg:border-neutral-900 lg:pl-10">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Included Deliverables</span>
                      </div>

                      <div className="space-y-3 mb-8">
                        {service.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-3 p-3 bg-black border border-neutral-900"
                          >
                            <CheckCircle2 className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-neutral-300 font-light">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                        Technologies & Methodologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <InquiryCTA />
    </div>
  );
}
