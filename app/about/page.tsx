import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Sparkles, UserCheck, Zap } from 'lucide-react';
import { founderData } from '@/data/founder';
import { InquiryCTA } from '@/components/InquiryCTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about ShivamWebDesigns (SWD) — our philosophy, mission, values, and how we build bespoke digital flagships without agency overhead.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Aesthetic Restraint',
      subtitle: 'Zero visual slop or gratuitous clutter',
      desc: 'We adhere to the timeless principles of Swiss international typographic style. Every margin, typeface, and color value exists for a reason: to communicate clearly and elevate brand credibility.',
    },
    {
      title: 'Direct Founder Access',
      subtitle: 'No account handlers or junior handoffs',
      desc: 'When you work with SWD, you speak and collaborate directly with Shivam Purohit. Strategy, interface design, and frontend code flow through a single cohesive vision.',
    },
    {
      title: 'Sub-Second Performance',
      subtitle: '99+ Core Web Vitals benchmark',
      desc: 'Speed is an essential feature. We build with clean semantic code, optimized assets, and modern edge infrastructure to guarantee instant load times across all real-world mobile connections.',
    },
    {
      title: 'Commercial Intent',
      subtitle: 'Websites engineered to move business',
      desc: 'A beautiful site that fails to generate client inquiries is an expensive paperweight. We architect user journeys that turn casual visitors into committed inquiries.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              An independent studio dedicated to the craft of the modern web.
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              ShivamWebDesigns (SWD) is an independent digital studio founded by Shivam Purohit. We partner with founders, brands, and forward-thinking enterprises to design and engineer bespoke web flagships that combine aesthetic distinction with technical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Agency Story */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                01 // Origin
              </div>
              <h2 className="text-3xl font-light text-white tracking-tight sticky top-28">
                The Story Behind SWD
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
              <p>
                In recent years, web design has fallen into a state of homogenization. Page builders and AI-generated cookie-cutter templates flood the internet with bloated code, sluggish load times, and indistinguishable aesthetics. Most websites look, feel, and function like the template next door.
              </p>
              <p>
                ShivamWebDesigns was founded in response to this trend. We believe a website should be as unique and rigorously crafted as a physical architectural building. It is the primary digital flagship of your company—the single place where prospective clients, partners, and investors evaluate your credibility.
              </p>
              <p>
                By maintaining an independent, boutique studio model, we eliminate agency overhead and bureaucratic layers. Every project receives deep strategic immersion, bespoke visual direction in Figma, and clean-slate frontend engineering in Next.js and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 border border-neutral-900 bg-black flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  02 // Mission
                </div>
                <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                  To liberate ambitious brands from generic templates by engineering bespoke, lightning-fast digital flagships that communicate authority, evoke emotional resonance, and generate measurable commercial results.
                </p>
              </div>
              <ul className="space-y-2 pt-6 border-t border-neutral-900 text-xs font-mono text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Bespoke craftsmanship for every client</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Sub-second page loading speed as standard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Zero unnecessary runtime framework bloat</span>
                </li>
              </ul>
            </div>

            <div className="p-10 border border-neutral-900 bg-black flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  03 // Vision
                </div>
                <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                  To become the preeminent independent design & engineering studio for businesses that value aesthetic integrity, technical excellence, and genuine digital distinction.
                </p>
              </div>
              <ul className="space-y-2 pt-6 border-t border-neutral-900 text-xs font-mono text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Setting new benchmarks for minimalist digital craft</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Long-term technical partnerships over one-off transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Global reach with boutique agency care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              04 // Principles
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
              What Defines Our Work
            </h2>
            <p className="text-sm text-neutral-400">
              The foundational values embedded in every wireframe, typography pairing, and line of code we write.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-8 border border-neutral-900 bg-neutral-950/60 hover:border-neutral-800 transition-colors"
              >
                <div className="text-xs font-mono text-neutral-500 mb-4">
                  VALUE 0{i + 1}
                </div>
                <h3 className="text-xl font-light text-white mb-1 tracking-tight">
                  {v.title}
                </h3>
                <div className="text-xs font-mono text-neutral-400 mb-3 uppercase tracking-wider">
                  {v.subtitle}
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Preview Section */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="relative aspect-[3/4] w-full border border-neutral-800 bg-neutral-900 overflow-hidden">
                <Image
                  src={founderData.image}
                  alt={founderData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                05 // Leadership
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
                Led by Shivam Purohit
              </h2>
              <p className="text-sm font-mono text-neutral-400 mb-6">
                Founder, Creative Director & Full-Stack Engineer
              </p>
              <blockquote className="border-l-2 border-white pl-6 py-2 mb-6">
                <p className="text-lg text-neutral-200 font-light italic">
                  &ldquo;{founderData.founderNote.quote}&rdquo;
                </p>
              </blockquote>
              <p className="text-sm text-neutral-400 leading-relaxed mb-8 font-light">
                {founderData.intro}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/founder"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  <span>Explore Founder Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/businesscard"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 text-white hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <span>Interactive 3D Card</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <InquiryCTA />
    </div>
  );
}
