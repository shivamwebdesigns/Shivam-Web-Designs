import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { ArrowUpRight, Check } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              01 // CAPABILITIES &amp; EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              End-to-End Digital Engineering Services
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              From initial architectural concept to production-grade deployment, we engineer every digital asset with precision, speed, and business utility.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-neutral-300 hover:text-white transition-colors group"
          >
            Explore all service details
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="bg-black/60 border border-neutral-800/80 hover:border-neutral-600/80 rounded-xl p-8 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 tracking-wider">
                    {(index + 1).toString().padStart(2, '0')} //
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                    {service.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 border-t border-neutral-900 space-y-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Core Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-3.5 w-3.5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 2).map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-400 border border-neutral-800/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/start-project?service=${service.slug}`}
                  className="text-xs font-semibold text-white hover:underline inline-flex items-center"
                >
                  Inquire &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
