'use client';

import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { ArrowUpRight, Check } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ShinyText } from '@/components/ui/ShinyText';

export function ServicesSection() {
  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>01 // CAPABILITIES &amp; EXPERTISE</ShinyText>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              End-to-End Digital Engineering Services
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed font-light">
              From initial architectural concept to production-grade deployment, we engineer every digital flagship with precision, speed, and commercial utility.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-neutral-300 hover:text-white transition-colors group"
          >
            Explore all service specifications
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Services Grid with Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <SpotlightCard
              key={service.id}
              className="flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500 tracking-wider">
                    {(index + 1).toString().padStart(2, '0')} //
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-300 border border-neutral-800">
                    {service.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="pt-3 border-t border-neutral-900 space-y-2">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
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

              <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 2).map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-black text-neutral-400 border border-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/start-project?service=${service.slug}`}
                  className="text-xs font-mono font-semibold text-white hover:underline inline-flex items-center gap-1 group/link"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
