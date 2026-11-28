import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CreditCard } from 'lucide-react';
import { founderData } from '@/data/founder';
import { ScrollTextReveal } from '@/components/ui/ScrollTextReveal';

export const FounderPreview: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 border-b border-neutral-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative border border-neutral-800 bg-neutral-950 p-2 sm:p-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={founderData.image}
                  alt={founderData.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                
                {/* Overlay Name Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md border border-neutral-800">
                  <div className="text-sm font-medium text-white">
                    {founderData.name}
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    {founderData.role} — {founderData.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Philosophy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Leadership & Philosophy
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6">
              Meet the Founder
            </h2>

            <blockquote className="border-l-2 border-white pl-6 py-1 mb-8">
              <ScrollTextReveal
                text={`“${founderData.founderNote.quote}”`}
                className="text-lg md:text-xl font-light text-neutral-200 leading-snug italic"
              />
            </blockquote>

            <p className="text-base text-neutral-400 leading-relaxed mb-6">
              {founderData.intro}
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed mb-8">
              Shivam established ShivamWebDesigns to dismantle agency bloat. Instead of dealing with intermediaries, you collaborate directly with the architect who designs the visual language and writes the production code.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/founder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold"
              >
                <span>Read Full Founder Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/businesscard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
              >
                <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                <span>3D Digital Business Card</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
