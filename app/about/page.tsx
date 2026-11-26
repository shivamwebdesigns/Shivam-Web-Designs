'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Sparkles, UserCheck, Zap, Layers, Box, Terminal, Compass } from 'lucide-react';
import { founderData } from '@/data/founder';
import { InquiryCTA } from '@/components/InquiryCTA';
import { SplitText } from '@/components/ui/SplitText';
import { ShinyText } from '@/components/ui/ShinyText';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TiltedCard } from '@/components/ui/TiltedCard';
import { CapabilitiesRadar } from '@/components/ui/CapabilitiesRadar';
import { SlideTextButton } from '@/components/ui/SlideTextButton';

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: 'Aesthetic Restraint',
      subtitle: 'Zero visual slop or gratuitous clutter',
      desc: 'We adhere to the timeless principles of Swiss international typographic style. Every margin, typeface, and color value exists for a reason: to communicate clearly and elevate brand credibility.',
    },
    {
      icon: UserCheck,
      title: 'Direct Founder Access',
      subtitle: 'No account handlers or junior handoffs',
      desc: 'When you work with SWD, you collaborate directly with Shivam Purohit. Strategy, interface design, and frontend code flow through a single cohesive, uncompromised vision.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Speed',
      subtitle: '100/100 Core Web Vitals benchmark',
      desc: 'Speed is an essential feature. We build with clean semantic code, optimized assets, and modern edge infrastructure to guarantee instant load times across all real-world mobile connections.',
    },
    {
      icon: Shield,
      title: 'Commercial Intent',
      subtitle: 'Websites engineered to move business',
      desc: 'A beautiful site that fails to generate client inquiries is an expensive paperweight. We architect user journeys and friction-free inquiry funnels that turn visitors into partners.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>AGENCY DOSSIER // SWD STUDIO</ShinyText>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              <SplitText text="An independent studio dedicated to the craft of the modern web." wordMode delay={35} />
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              ShivamWebDesigns (SWD) is an independent digital studio founded by Shivam Purohit. We partner with founders, brands, and forward-thinking enterprises to design and engineer bespoke web flagships that combine aesthetic distinction with technical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Agency Story */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                01 // Origin
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sticky top-28">
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

      {/* Mission & Vision Bento */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpotlightCard className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  02 // Mission
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">
                  To eliminate digital mediocrity by engineering websites that fuse Swiss aesthetic restraint with uncompromising frontend performance, helping founders establish an enduring and authoritative online presence.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-900 flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Compass className="w-4 h-4 text-white" />
                <span>Purposeful Design • Zero AI Slop</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  03 // Vision
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">
                  To be the trusted engineering partner for founders who value their digital reputation, setting a global benchmark for sub-second page performance, tactile spatial interaction, and editorial typography.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-900 flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Zap className="w-4 h-4 text-white" />
                <span>100/100 Core Web Vitals • Global Edge</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Core Studio Values in Spotlight Cards */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              04 // Operating Principles
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Core Studio Values
            </h2>
            <p className="text-neutral-400 font-light">
              Four fundamental rules that govern every line of code we ship and every interface layout we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <SpotlightCard key={idx} className="flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono text-neutral-500">
                        0{idx + 1} //
                      </span>
                      <div className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900/60 flex items-center justify-center text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                      {val.title}
                    </h3>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      {val.subtitle}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {val.desc}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Capabilities & Radar */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <ShinyText>05 // TECHNICAL BENCHMARK</ShinyText>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Studio Engineering Competency Matrix
              </h2>
              <p className="text-base text-neutral-400 font-light leading-relaxed">
                We combine creative direction with hardcore frontend engineering. We write clean, testable TypeScript, architect fluid CSS 3D physics without heavy bloated dependencies, and deploy worldwide on Vercel Edge.
              </p>
              <div className="pt-2">
                <SlideTextButton
                  href="/services"
                  primaryText="Explore Services"
                  secondaryText="View Specifications"
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <CapabilitiesRadar />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Callout */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 border border-neutral-800 bg-neutral-950/80 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Founder Leadership
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Crafted &amp; Directed by Shivam Purohit
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Discover Shivam&apos;s story, design philosophy, technical skills, and commitment to building the modern web.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <SlideTextButton
                href="/founder"
                primaryText="Founder Profile"
                secondaryText="Read Full Bio"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              />
              <Link
                href="/businesscard"
                className="px-6 py-3.5 rounded-md border border-neutral-800 text-xs font-mono uppercase tracking-wider text-white hover:bg-neutral-900 transition-colors font-semibold"
              >
                3D Business Card
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InquiryCTA />
    </div>
  );
}
