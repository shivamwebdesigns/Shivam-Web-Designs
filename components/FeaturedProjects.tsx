import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 border-y border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            PROJECTS
          </p>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Updating soon
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed mb-6">
            Our production client builds and flagship case studies are currently undergoing NDA clearance and documentation. We publish detailed architecture audits, performance benchmarks, and interactive source code breakdowns as releases are cleared.
          </p>
        </div>

        {/* Informational Callout Card */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800/80 max-w-4xl space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Private Demos Available Upon Request</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
                Evaluating ShivamWebDesigns for an upcoming project? We can share private design files, code architectures, and live staging previews directly under NDA.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                href="/start-project"
                className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Start a Project
              </Link>

              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
