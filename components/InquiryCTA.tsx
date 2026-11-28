import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const InquiryCTA: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
          Ready to build a digital experience that moves your business forward?
        </h2>

        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Whether launching a new venture, revamping an established brand flagship, or engineering an interactive web product, let&apos;s build something extraordinary together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/start-project"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-medium tracking-wide uppercase font-mono shadow-2xl"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-neutral-800 text-white hover:bg-neutral-900 hover:border-neutral-700 transition-colors text-sm font-medium tracking-wide uppercase font-mono"
          >
            <Mail className="w-4 h-4 text-neutral-400" />
            <span>General Inquiry</span>
          </Link>

          {siteConfig.social.whatsapp ? (
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-sm font-mono tracking-wide"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          ) : (
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-sm font-mono tracking-wide"
            >
              <span>Explore Works</span>
            </Link>
          )}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2.5 text-xs font-mono text-neutral-400 text-center">
          <span className="whitespace-nowrap">Direct Founder Access</span>
          <span className="hidden sm:inline text-neutral-700 select-none">/</span>
          <span className="whitespace-nowrap">Zero Outsourcing</span>
          <span className="hidden sm:inline text-neutral-700 select-none">/</span>
          <span className="whitespace-nowrap">Fixed Price Sprints</span>
          <span className="hidden sm:inline text-neutral-700 select-none">/</span>
          <span className="whitespace-nowrap">Sub-Second Performance</span>
        </div>
      </div>
    </section>
  );
};
