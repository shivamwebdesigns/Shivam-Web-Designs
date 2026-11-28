'use client';

import React from 'react';
import { ScrollTextReveal } from '@/components/ui/ScrollTextReveal';
import { TextShimmer } from '@/components/ui/TextShimmer';

export function StudioManifesto() {
  const manifestoText =
    'In an era of generic templates, drag-and-drop page builders, and bloated JavaScript frameworks, ShivamWebDesigns takes the opposing path: 100% handwritten bespoke code, intentional Swiss typography, and sub-second performance engineered to turn visitors into high-value clients.';

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-black border-t border-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              <TextShimmer>STUDIO MANIFESTO // PURPOSEFUL CODE</TextShimmer>
            </span>
          </div>
          
          <ScrollTextReveal
            text={manifestoText}
            className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.25] sm:leading-[1.22]"
          />

          <div className="pt-10 sm:pt-14 flex items-center gap-6 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <span>Scroll to explore capabilities</span>
            <span className="h-px w-12 bg-neutral-800" />
            <span className="text-white">Sub-Second Mobile Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
