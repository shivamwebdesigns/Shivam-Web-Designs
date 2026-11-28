import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export function Hero() {
  return (
    <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Suggested Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
            {siteConfig.headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed text-balance">
            {siteConfig.supportingText}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 sm:pt-4">
            <Link
              href="/start-project"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded-md transition-all duration-200 shadow-lg shadow-white/5 active:scale-95"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm uppercase tracking-wider font-semibold text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-md transition-all duration-200 active:scale-95"
            >
              Project Updates
              <ArrowUpRight className="ml-2 h-4 w-4 opacity-70" />
            </Link>
          </div>

          {/* Studio Hallmarks / Proof Badges */}
          <div className="pt-8 sm:pt-12 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">100%</span>
              <p className="text-xs text-neutral-400 font-medium">Bespoke Design &amp; Code</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">&lt; 1.2s</span>
              <p className="text-xs text-neutral-400 font-medium">Sub-Second Core Web Vitals</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">Direct</span>
              <p className="text-xs text-neutral-400 font-medium">Founder-Led Collaboration</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">Zero</span>
              <p className="text-xs text-neutral-400 font-medium">Framework &amp; Plugin Bloat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
