'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Box, Code2, Layers, Zap, Sparkles } from 'lucide-react';

interface StackLayer {
  index: number;
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  proofLabel: string;
  proofLink: string;
  previewType: '3d-card' | 'terminal' | 'typography' | 'performance';
}

const layers: StackLayer[] = [
  {
    index: 1,
    id: 'layer-spatial',
    badge: '01 // SPATIAL 3D & PHYSICS',
    title: 'Zero-Bloat Spatial 3D & Touch Inertia',
    subtitle: 'Silky 60fps mobile interaction with zero Three.js library overhead',
    desc: 'We engineer tactile 3D perspectives, Euler angle rotations, and inertia drag physics directly using hardware-accelerated CSS 3D transforms. By avoiding heavy 30MB+ WebGL dependencies, our spatial experiences load instantaneously and run smoothly on any smartphone.',
    tags: ['CSS 3D Engine', 'Euler Physics', 'Touch Inertia', '60 FPS Mobile', 'vCard 3.0 Export'],
    proofLabel: 'Inspect 3D Business Card Engine',
    proofLink: '/businesscard',
    previewType: '3d-card',
  },
  {
    index: 2,
    id: 'layer-frontend',
    badge: '02 // FRONTEND ARCHITECTURE',
    title: 'Modern Next.js 15 & TypeScript Core',
    subtitle: 'Zero runtime clutter, sub-second TTFB, and strict type safety',
    desc: 'We build digital flagships from scratch using Next.js 15 App Router, React 19, and TypeScript. No sluggish page builders, no spaghetti plugins. Just clean, semantic HTML5, fluid responsive styling, and modular component design.',
    tags: ['Next.js 15 App Router', 'React 19', 'TypeScript', 'Tailwind CSS', 'Accessible DOM'],
    proofLabel: 'View Flagship Architecture',
    proofLink: '/projects/swd-flagship',
    previewType: 'terminal',
  },
  {
    index: 3,
    id: 'layer-typography',
    badge: '03 // SWISS TYPOGRAPHIC DISCIPLINE',
    title: 'International Typographic Style',
    subtitle: 'Strict monochrome hierarchy, proportional grids, and zero visual slop',
    desc: 'We reject cookie-cutter AI templates and generic purple gradients. Our work is grounded in classical Swiss design: intentional contrast, disciplined whitespace, and razor-sharp type scales that establish immediate credibility for serious brands.',
    tags: ['Swiss Grid Architecture', 'Golden-Ratio Scales', 'Monochrome Contrast', 'Zero AI Slop'],
    proofLabel: 'Explore Editorial Case Study',
    proofLink: '/projects/editorial-typography',
    previewType: 'typography',
  },
  {
    index: 4,
    id: 'layer-performance',
    badge: '04 // EDGE PERFORMANCE & SEO',
    title: 'Sub-Second Global Edge Delivery',
    subtitle: '100/100 Core Web Vitals, zero Cumulative Layout Shift, and instant indexability',
    desc: 'Every millisecond of delay costs client trust. We optimize asset pipelines, compress WebP/AVIF imagery, implement JSON-LD schemas, and deploy to Vercel edge networks to guarantee instant sub-second page loads worldwide.',
    tags: ['100/100 Lighthouse', 'Sub-1s LCP', '0.000 CLS', 'Schema.org JSON-LD', 'Edge Caching'],
    proofLabel: 'Start Your High-Speed Flagship',
    proofLink: '/start-project',
    previewType: 'performance',
  },
];

export function SpatialStack() {
  const [activeTab, setActiveTab] = useState(1);

  const scrollToLayer = (idx: number) => {
    setActiveTab(idx);
    const element = document.getElementById(`stack-card-${idx}`);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="3d-stack" className="py-14 sm:py-20 bg-black border-t border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-4">
            <span>02 // THE 3D ARCHITECTURE STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Four Layers of Engineering Precision
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Scroll down to watch our engineering stack unfold layer by layer. Every layer is backed by real, production code built directly into this studio platform.
          </p>

          {/* Interactive Layer Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8" role="tablist" aria-label="Architecture Layer Switcher">
            {layers.map((layer) => (
              <button
                key={layer.index}
                type="button"
                role="tab"
                aria-selected={activeTab === layer.index}
                onClick={() => scrollToLayer(layer.index)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeTab === layer.index
                    ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
                    : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                0{layer.index} / {layer.badge.split('//')[1]?.trim() || `Layer ${layer.index}`}
              </button>
            ))}
          </div>
        </div>

        {/* Stacking Deck Container */}
        <div className="relative flex flex-col gap-8 sm:gap-12 pb-24">
          {layers.map((layer) => (
            <article
              key={layer.index}
              id={`stack-card-${layer.index}`}
              style={{
                top: `calc(76px + ${(layer.index - 1) * 22}px)`,
                zIndex: layer.index,
              }}
              className="sticky bg-neutral-950/95 backdrop-blur-xl border border-neutral-800/90 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 transition-all duration-300 group hover:border-neutral-700 transform-gpu will-change-transform"
            >
              {/* Subtle top edge glow highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Card Header Bar */}
              <div className="flex flex-wrap items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-neutral-800/70 gap-3">
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-300">
                  {layer.badge}
                </span>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  SWD STUDIO CORE // LAYER 0{layer.index}
                </span>
              </div>

              {/* Card Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Description Column */}
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-neutral-100 transition-colors">
                    {layer.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-wider">
                    {layer.subtitle}
                  </div>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                    {layer.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {layer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-black border border-neutral-800 rounded text-xs font-mono text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Proof Link Action */}
                  <div className="pt-4">
                    <Link
                      href={layer.proofLink}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 font-semibold group/link"
                    >
                      <span>{layer.proofLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Spatial Preview Column */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-xl bg-black border border-neutral-800 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                    {layer.previewType === '3d-card' && (
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>CSS 3D TRANSFORM</span>
                          <span>ROTATION: [R_x, R_y]</span>
                        </div>
                        {/* Interactive Visual Card Miniature */}
                        <div className="relative mx-auto w-48 h-28 rounded-lg bg-neutral-900 border border-neutral-700 p-3 shadow-2xl flex flex-col justify-between transform rotate-[-4deg] group-hover:rotate-[0deg] transition-transform duration-500">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-white tracking-widest">SWD</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <div className="text-[9px] font-mono text-neutral-400">
                            3D Spatial Business Card Engine
                          </div>
                        </div>
                        <div className="text-center text-[10px] font-mono text-neutral-400">
                          60 FPS • Real-time Euler Math
                        </div>
                      </div>
                    )}

                    {layer.previewType === 'terminal' && (
                      <div className="flex flex-col justify-between h-full font-mono text-xs">
                        <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-800">
                          <span className="w-2 h-2 rounded-full bg-neutral-700" />
                          <span className="w-2 h-2 rounded-full bg-neutral-700" />
                          <span className="w-2 h-2 rounded-full bg-neutral-700" />
                          <span className="ml-2 text-[10px] text-neutral-400">architecture.ts</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-neutral-300 py-3">
                          <p><span className="text-neutral-400">export const</span> <span className="text-white">stack</span> = &#123;</p>
                          <p className="pl-4">framework: <span className="text-neutral-400">&apos;Next.js 15&apos;</span>,</p>
                          <p className="pl-4">rendering: <span className="text-neutral-400">&apos;RSC + Static SSG&apos;</span>,</p>
                          <p className="pl-4">performance: <span className="text-emerald-400">&apos;100/100&apos;</span>,</p>
                          <p>&#125;;</p>
                        </div>
                        <div className="text-[10px] text-neutral-400 pt-2 border-t border-neutral-800 flex justify-between">
                          <span>TypeScript 5.7</span>
                          <span>Zero Bloat</span>
                        </div>
                      </div>
                    )}

                    {layer.previewType === 'typography' && (
                      <div className="flex flex-col justify-between h-full">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                          International Style // Baseline
                        </div>
                        <div className="space-y-1.5 py-2">
                          <div className="text-3xl font-light tracking-tight text-white leading-none">
                            Aa Bb Zz
                          </div>
                          <div className="text-xs font-mono text-neutral-400">
                            Inter • JetBrains Mono
                          </div>
                          <div className="h-px bg-neutral-800 my-2" />
                          <div className="text-[11px] text-neutral-400 leading-relaxed font-light">
                            Strict horizontal alignment, modular column grids &amp; zero superficial decor.
                          </div>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          Pure Swiss Monochrome Palette
                        </div>
                      </div>
                    )}

                    {layer.previewType === 'performance' && (
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>AUDIT SCORES</span>
                          <span className="text-emerald-400">VERIFIED PASS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 py-2 text-center">
                          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded">
                            <div className="text-xl font-bold font-mono text-white">100</div>
                            <div className="text-[9px] font-mono text-neutral-400 uppercase">Performance</div>
                          </div>
                          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded">
                            <div className="text-xl font-bold font-mono text-white">100</div>
                            <div className="text-[9px] font-mono text-neutral-400 uppercase">Accessibility</div>
                          </div>
                          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded">
                            <div className="text-xl font-bold font-mono text-white">&lt; 0.8s</div>
                            <div className="text-[9px] font-mono text-neutral-400 uppercase">LCP Speed</div>
                          </div>
                          <div className="p-2.5 bg-neutral-900/60 border border-neutral-800 rounded">
                            <div className="text-xl font-bold font-mono text-white">0.000</div>
                            <div className="text-[9px] font-mono text-neutral-400 uppercase">CLS Shift</div>
                          </div>
                        </div>
                        <div className="text-center text-[10px] font-mono text-neutral-400">
                          Vercel Global Edge Network
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
