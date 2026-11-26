'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Layers, Box, Terminal } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ShinyText } from '@/components/ui/ShinyText';

export function FeaturedProjects() {
  const projects = [
    {
      id: 'swd-flagship',
      title: 'ShivamWebDesigns Digital Flagship',
      category: 'Agency Platform & Core Web Vitals',
      badge: 'Internal Studio Flagship',
      desc: 'High-performance agency flagship engineered on Next.js 15, React 19, and Tailwind CSS. Features sub-second Core Web Vitals, accessible semantic DOM, and zero third-party framework bloat.',
      tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Sub-second LCP'],
      link: '/',
      linkLabel: 'Inspect Architecture',
      icon: Layers,
    },
    {
      id: 'spatial-business-card',
      title: 'Interactive 3D Spatial Business Card',
      category: 'Spatial Physics & Touch Engine',
      badge: 'Interactive Product',
      desc: 'Mobile-first 3D digital business card with hardware-accelerated CSS 3D transforms, Euler angle physics, touch inertia, vCard 3.0 generation, and QR sharing without heavy 30MB WebGL dependencies.',
      tech: ['CSS 3D Transforms', 'Euler Physics', 'vCard 3.0', 'PWA Offline'],
      link: '/businesscard',
      linkLabel: 'Experience 3D Card',
      icon: Box,
    },
    {
      id: 'swiss-editorial-system',
      title: 'Swiss Typographic Grid Architecture',
      category: 'Design Systems & Brand Identity',
      badge: 'Design System Case Study',
      desc: 'Disciplined International Typographic Style implementation featuring strict monochromatic contrast, golden-ratio type scales, modular column grids, and zero AI-generated visual slop.',
      tech: ['Design Tokens', 'Swiss Grid', 'Monochrome Aesthetic', 'Figma'],
      link: '/about',
      linkLabel: 'View Design System',
      icon: Terminal,
    },
  ];

  return (
    <section className="py-24 border-t border-neutral-900 bg-black relative" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>03 // SELECTED WORK &amp; CASE STUDIES</ShinyText>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Selected Studio Flagships
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed font-light">
              Real projects engineered directly within our studio. We label every project transparently with zero fabricated testimonials or invented case studies.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-semibold text-neutral-300 hover:text-white transition-colors group"
          >
            All studio initiatives
            <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <SpotlightCard
                key={proj.id}
                className="flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800">
                      {proj.badge}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                    {proj.title}
                  </h3>

                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {proj.category}
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {proj.desc}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-neutral-900 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-black text-neutral-400 border border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={proj.link}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-neutral-300 group/link"
                  >
                    <span>{proj.linkLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
