import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink, ArrowUpRight, Zap, Layers, Sparkles } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Selected Works & Case Studies | ShivamWebDesigns',
  description:
    'Explore featured web applications, spatial 3D interfaces, and digital editorial systems engineered by ShivamWebDesigns. Built with Next.js 15, sub-second speed, and Swiss typography.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Selected Works & Case Studies | ShivamWebDesigns',
    description:
      'Explore featured web applications, spatial 3D interfaces, and digital editorial systems engineered by ShivamWebDesigns.',
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/github-social-preview.png`,
        width: 1280,
        height: 640,
        alt: 'ShivamWebDesigns Projects Portfolio',
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
              Selected Works &amp; Architecture.
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              A curated record of production web flagships, interactive 3D spatial engines, and editorial design systems engineered with Next.js 15, strict Swiss typography, and zero framework bloat.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="py-12 sm:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {projectsData.map((project, idx) => (
              <article
                key={project.id}
                className="p-6 sm:p-10 border border-neutral-900 hover:border-neutral-700 bg-neutral-950/70 rounded-3xl transition-all duration-300 shadow-xl shadow-black/80 space-y-6"
              >
                {/* Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-900">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-900 text-white border border-neutral-800">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-neutral-400 bg-neutral-900/60 border border-neutral-800/80">
                      {project.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {project.year} • {project.role}
                  </span>
                </div>

                {/* Title & Narrative */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    {project.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                    {project.summary}
                  </p>
                </div>

                {/* Key Technical Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-1 text-left"
                    >
                      <span className="text-base sm:text-lg font-bold font-mono text-white block">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                    Core Disciplines &amp; Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-mono text-neutral-400">
                    Status: <span className="text-emerald-400 font-semibold">Production Verified</span>
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold transition-all shadow-md active:scale-95"
                  >
                    <span>Launch Live Experience</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Project Intake CTA */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl border border-neutral-800 bg-neutral-950 text-center space-y-6">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to engineer your digital flagship?
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Explore our fixed-price transparent packages starting from ₹499 or initiate a tailored project brief.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/packages"
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                View Packages &amp; Pricing
              </Link>
              <Link
                href="/start-project"
                className="px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-95"
              >
                Start a Project Brief &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
