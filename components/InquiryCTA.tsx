'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { ShinyText } from '@/components/ui/ShinyText';
import { SlideTextButton } from '@/components/ui/SlideTextButton';
import { InteractiveGrid } from '@/components/ui/InteractiveGrid';

export function InquiryCTA() {
  return (
    <section className="py-24 border-t border-neutral-900 bg-black relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <ShinyText>NEXT STEPS • DIRECT INQUIRY</ShinyText>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight text-balance">
          Ready to build a digital experience that moves your business forward?
        </h2>

        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light text-balance">
          Whether launching a new venture, revamping an established brand flagship, or engineering an interactive web product, let&apos;s build something extraordinary together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <SlideTextButton
            href="/start-project"
            primaryText="Start a Project"
            secondaryText="Initiate Inquiry"
            variant="primary"
            className="w-full sm:w-auto"
            icon={<ArrowRight className="w-4 h-4" />}
          />

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 rounded-md transition-all text-xs font-mono uppercase tracking-wider font-semibold active:scale-95"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>General Inquiry</span>
          </Link>

          {siteConfig.social.whatsapp && (
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900/60 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-all text-xs font-mono uppercase tracking-wider font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>

        <div className="pt-10 border-t border-neutral-900 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-neutral-500">
          <div>Direct Founder Access</div>
          <div className="hidden sm:inline">•</div>
          <div>Zero Outsourcing</div>
          <div className="hidden sm:inline">•</div>
          <div>Fixed Price Sprints</div>
          <div className="hidden sm:inline">•</div>
          <div>Sub-Second Performance</div>
        </div>
      </div>
    </section>
  );
}
