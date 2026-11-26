'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import { founderData } from '@/data/founder';
import { TiltedCard } from '@/components/ui/TiltedCard';
import { CapabilitiesRadar } from '@/components/ui/CapabilitiesRadar';
import { ShinyText } from '@/components/ui/ShinyText';
import { SlideTextButton } from '@/components/ui/SlideTextButton';

export function FounderPreview() {
  return (
    <section className="py-24 border-t border-neutral-900 bg-neutral-950 relative" id="founder-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column with TiltedCard */}
          <div className="lg:col-span-5">
            <TiltedCard className="p-3 bg-black">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 rounded-lg">
                <Image
                  src={founderData.image}
                  alt={founderData.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/95 to-transparent pointer-events-none" />

                {/* Overlay Name Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/90 backdrop-blur-md border border-neutral-800 rounded-lg">
                  <div className="text-sm font-semibold text-white">
                    {founderData.name}
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    {founderData.role} — {founderData.company}
                  </div>
                </div>
              </div>
            </TiltedCard>
          </div>

          {/* Bio & Philosophy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>06 // LEADERSHIP &amp; PHILOSOPHY</ShinyText>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Meet the Founder
            </h2>

            <blockquote className="border-l-2 border-white pl-6 py-1">
              <p className="text-lg md:text-xl font-light text-neutral-200 leading-snug italic">
                &ldquo;{founderData.founderNote.quote}&rdquo;
              </p>
            </blockquote>

            <p className="text-base text-neutral-400 leading-relaxed font-light">
              {founderData.intro}
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Shivam established ShivamWebDesigns to dismantle agency bloat. Instead of dealing with intermediaries, you collaborate directly with the architect who designs the visual language and writes the production code.
            </p>

            {/* Studio Capabilities Radar Chart */}
            <div className="pt-2">
              <CapabilitiesRadar />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <SlideTextButton
                href="/founder"
                primaryText="Full Founder Profile"
                secondaryText="Read Shivam's Story"
                variant="primary"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              />

              <Link
                href="/businesscard"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 rounded-md transition-all text-xs font-mono uppercase tracking-wider font-semibold active:scale-95"
              >
                <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                <span>3D Business Card</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
