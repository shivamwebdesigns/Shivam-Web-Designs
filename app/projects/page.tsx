'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Filter } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { InquiryCTA } from '@/components/InquiryCTA';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Spatial 3D',
    'E-Commerce',
    'Web Application',
    'Digital Editorial',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col">
      {/* Projects Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Selected Works Archive
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Case studies in aesthetic restraint and digital engineering.
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Explore our portfolio of bespoke digital flagships, high-throughput web applications, and immersive 3D interfaces. Every project is documented with real challenges, architectures, and measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar & Grid */}
      <section className="py-16 border-b border-neutral-900 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-neutral-900">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mr-2 uppercase tracking-widest">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className="group flex flex-col border border-neutral-900 bg-neutral-950 hover:border-neutral-800 transition-all duration-300"
              >
                {/* Media Container */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border-b border-neutral-900 block"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white">
                      {project.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>

                {/* Project Details */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span className="text-xs font-mono text-neutral-500">
                        ARCHIVE 0{idx + 1} // {project.year}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {project.client}
                      </span>
                    </div>

                    <h2 className="text-2xl font-light tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-6 font-light">
                      {project.summary}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="pt-6 border-t border-neutral-900 grid grid-cols-2 gap-4 mb-6">
                    {project.metrics.slice(0, 2).map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-xl font-light text-white font-mono tracking-tight">
                          {metric.value}
                        </div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies & CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-900/60">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 bg-neutral-900 border border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
                    >
                      <span>Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <InquiryCTA />
    </div>
  );
}
