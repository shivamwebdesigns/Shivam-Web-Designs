'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles, Shield, Zap, Code } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { SplitText } from '@/components/ui/SplitText';
import { ShinyText } from '@/components/ui/ShinyText';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SlideTextButton } from '@/components/ui/SlideTextButton';
import { CountUp } from '@/components/ui/CountUp';
import { InteractiveGrid } from '@/components/ui/InteractiveGrid';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-36 overflow-hidden">
      {/* Interactive Cursor Grid Background */}
      <InteractiveGrid />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Watermelon UI Style Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <ShinyText className="text-xs font-mono uppercase tracking-widest font-semibold">
              Available for Q1/Q2 Projects • Direct Founder Access
            </ShinyText>
          </div>

          {/* Animated Hero Headline via React Bits SplitText */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
            <SplitText text={siteConfig.headline} wordMode delay={40} />
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed text-balance font-light">
            {siteConfig.supportingText}
          </p>

          {/* Dual Kokonut UI Slide Text Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SlideTextButton
              href="/start-project"
              primaryText="Start a Project"
              secondaryText="Initiate Inquiry"
              variant="primary"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" />}
            />

            <SlideTextButton
              href="/projects"
              primaryText="Explore Work"
              secondaryText="Studio Portfolio"
              variant="secondary"
              className="w-full sm:w-auto"
              icon={<ArrowUpRight className="h-4 w-4 opacity-70" />}
            />
          </div>

          {/* Studio Hallmarks / Proof Badges in SpotlightCards */}
          <div className="pt-12 sm:pt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <SpotlightCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                  <CountUp end={100} suffix="%" />
                </span>
                <Code className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-300 font-medium">Bespoke Design &amp; Code</p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Zero copy-paste templates</p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                  &lt; 0.8s
                </span>
                <Zap className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-300 font-medium">Sub-Second LCP Speed</p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">100/100 Core Web Vitals</p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                  Direct
                </span>
                <Shield className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-300 font-medium">Founder-Led Collaboration</p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Zero junior account handoffs</p>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                  Zero
                </span>
                <Sparkles className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-300 font-medium">Framework &amp; Plugin Bloat</p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Pure semantic speed</p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
