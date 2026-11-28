import React from 'react';
import Link from 'next/link';
import { CoreWebVitalsCard } from '@/components/CoreWebVitalsCard';

export const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 border-y border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Projects Notice & Brief */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              03 // PRODUCTION AUDIT STANDARD
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Projects are updating soon!
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Our production client builds and flagship case studies are currently undergoing NDA clearance and documentation. In the meantime, every digital experience we engineer strictly adheres to our live 7-step mobile Core Web Vitals optimization protocol.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/start-project"
                className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Start a Project
              </Link>
              <Link
                href="/packages"
                className="px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-mono font-semibold uppercase tracking-wider transition-all active:scale-95"
              >
                View Packages &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: 7-Step Core Web Vitals Card */}
          <div className="lg:col-span-5 w-full">
            <CoreWebVitalsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

