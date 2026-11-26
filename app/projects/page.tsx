'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Box, Code2, Layers, ShieldCheck, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SplitText } from '@/components/ui/SplitText';
import { ShinyText } from '@/components/ui/ShinyText';
import { SlideTextButton } from '@/components/ui/SlideTextButton';
import { InquiryCTA } from '@/components/InquiryCTA';

const projects = [
  {
    id: 'swd-flagship',
    title: 'ShivamWebDesigns Digital Flagship',
    category: 'Agency Platform & Core Web Vitals',
    type: 'Studio Flagship',
    summary:
      'High-performance independent agency flagship engineered from scratch on Next.js 15, React 19, and Tailwind CSS. Features sub-second Core Web Vitals, accessible semantic DOM, and zero third-party framework bloat.',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vercel Edge', 'Schema.org JSON-LD'],
    metrics: [
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Sub-Second LCP', value: '< 0.8s' },
      { label: 'Layout Shift', value: '0.000 CLS' },
      { label: 'Framework Overhead', value: '0% Bloat' },
    ],
    link: '/',
    linkLabel: 'Inspect Flagship',
    featured: true,
  },
  {
    id: 'spatial-business-card',
    title: 'Interactive 3D Spatial Business Card',
    category: 'Spatial Physics & Touch Engine',
    type: 'Interactive Product',
    summary:
      'Mobile-first 3D digital business card engineered with hardware-accelerated CSS 3D transforms, Euler angle physics, touch inertia, vCard 3.0 generation, and QR sharing without heavy 30MB WebGL dependencies.',
    tech: ['CSS 3D Transforms', 'Euler Angles', 'vCard 3.0', 'PWA Offline', 'QR Sharing'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Library Size', value: '0 KB WebGL' },
      { label: 'Touch Physics', value: 'Tactile Inertia' },
      { label: 'Export Format', value: 'vCard 3.0' },
    ],
    link: '/businesscard',
    linkLabel: 'Launch 3D Card',
    featured: true,
  },
  {
    id: 'swiss-editorial-system',
    title: 'Swiss Typographic Grid Architecture',
    category: 'Design Systems & Brand Identity',
    type: 'Design System',
    summary:
      'Disciplined International Typographic Style implementation featuring strict monochromatic contrast, golden-ratio type scales, modular column grids, and zero AI-generated visual slop.',
    tech: ['Design Tokens', 'Swiss Grid', 'Monochrome Aesthetic', 'Figma Prototyping'],
    metrics: [
      { label: 'Color Palette', value: 'Monochrome B&W' },
      { label: 'Grid Standard', value: 'Modular Columns' },
      { label: 'Accessibility', value: 'WCAG 2.1 AA' },
      { label: 'Visual Decoration', value: 'Zero Slop' },
    ],
    link: '/about',
    linkLabel: 'Explore System',
    featured: false,
  },
  {
    id: 'subsecond-performance',
    title: 'Sub-Second Performance & Edge Pipeline',
    category: 'Frontend Engineering & SEO',
    type: 'Engineering Benchmark',
    summary:
      'Global edge deployment architecture tuned for instant indexability, automated XML sitemaps, robots protocol enforcement, and sub-second delivery to mobile devices worldwide.',
    tech: ['Vercel Edge', 'AVIF / WebP Compression', 'Sub-second TTFB', 'SEO Optimization'],
    metrics: [
      { label: 'Global CDN', value: 'Vercel Edge' },
      { label: 'Payload Reduction', value: '92% Leaner' },
      { label: 'SEO Schema', value: 'Structured LD' },
      { label: 'Mobile Score', value: '100% Pass' },
    ],
    link: '/services#website-development',
    linkLabel: 'View Benchmark',
    featured: false,
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'flagship' | 'spatial' | 'system'>('all');

  const filtered = projects.filter((p) => {
    if (filter === 'flagship') return p.type.includes('Flagship');
    if (filter === 'spatial') return p.type.includes('Interactive');
    if (filter === 'system') return p.type.includes('System') || p.type.includes('Benchmark');
    return true;
  });

  return (
    <div className="flex flex-col">
      {/* Portfolio Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>SELECTED WORKS // STUDIO FLAGSHIPS</ShinyText>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              <SplitText text="Disciplined engineering. Measurable distinction." wordMode delay={35} />
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Explore digital flagships, spatial products, and engineering benchmarks crafted by ShivamWebDesigns. Every project is real, tested, and backed by production code.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-8">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'flagship', label: 'Studio Flagships' },
                { id: 'spatial', label: 'Spatial 3D Products' },
                { id: 'system', label: 'Systems & Benchmarks' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as typeof filter)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    filter === f.id
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid with SpotlightCards */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((proj) => (
              <SpotlightCard
                key={proj.id}
                className="flex flex-col justify-between p-8 sm:p-10 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800">
                      {proj.type}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      SWD // PROD
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                      {proj.title}
                    </h2>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {proj.category}
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {proj.summary}
                  </p>

                  {/* Quantitative Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-900">
                    {proj.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2.5 rounded bg-black/60 border border-neutral-800/80 text-center">
                        <div className="text-xs font-bold font-mono text-white">{m.value}</div>
                        <div className="text-[10px] font-mono text-neutral-500 uppercase mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-0.5 bg-neutral-900 text-neutral-400 border border-neutral-800 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">Live &amp; Verified</span>
                  <Link
                    href={proj.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-neutral-300 group/link"
                  >
                    <span>{proj.linkLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <InquiryCTA />
    </div>
  );
}
