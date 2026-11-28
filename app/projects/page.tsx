import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, UserCheck, Layers } from 'lucide-react';
import { CoreWebVitalsCard } from '@/components/CoreWebVitalsCard';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Projects | ShivamWebDesigns',
  description:
    'Production client builds and digital flagships engineered by ShivamWebDesigns. Case studies currently updating under NDA clearance.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | ShivamWebDesigns',
    description:
      'Production client builds and digital flagships engineered by ShivamWebDesigns. Case studies currently updating under NDA clearance.',
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/github-social-preview.png`,
        width: 1280,
        height: 640,
        alt: 'ShivamWebDesigns Projects',
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-28 pb-10 sm:pt-32 sm:pb-14 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
              Projects are updating soon!
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Our production client builds and flagship case studies are currently undergoing NDA clearance and documentation. We publish detailed architecture audits, Core Web Vitals reports, and production case studies as each client agreement permits.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 bg-black flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Engineering Standards We Guarantee */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Standard Across Every Build
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                <Layers className="w-5 h-5 text-white mb-1" />
                <span className="text-sm font-bold text-white block">100% Bespoke Code</span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Handwritten semantic HTML5, Next.js 15, and Tailwind CSS. Never templates or site builder baggage.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                <Zap className="w-5 h-5 text-white mb-1" />
                <span className="text-sm font-bold text-white block">&lt; 1.2s Core Web Vitals</span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Sub-second LCP and 100/100 performance scores tuned directly for Google indexation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                <UserCheck className="w-5 h-5 text-white mb-1" />
                <span className="text-sm font-bold text-white block">Direct Founder Access</span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Shivam Purohit personally engineers and directs your project without intermediary account managers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                <ShieldCheck className="w-5 h-5 text-white mb-1" />
                <span className="text-sm font-bold text-white block">Transparent Milestones</span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Fixed pricing starting from ₹499 with clear deliverables, guaranteed timelines, and zero surprises.
                </p>
              </div>
            </div>
          </div>

          {/* Live Mobile Core Web Vitals Audit Protocol */}
          <div className="space-y-6 pt-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Audit Benchmark
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Live 7-Step Mobile Core Web Vitals Protocol
              </h2>
            </div>
            <div className="max-w-2xl">
              <CoreWebVitalsCard />
            </div>
          </div>

          {/* Intake Call to Action */}
          <div className="p-8 sm:p-12 rounded-2xl border border-neutral-900 bg-neutral-950 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to engineer your website?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed font-light">
              Explore our fixed-price transparent packages starting from ₹499 or submit a custom project brief.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/packages"
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                View Packages &amp; Pricing
              </Link>
              <Link
                href="/start-project"
                className="px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-95"
              >
                Start a Project Brief &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
