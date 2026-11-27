import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';

export const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 border-y border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              03 // SELECTED PORTFOLIO
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Featured Works &amp; Architecture
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Curated web flagships, interactive 3D spatial engines, and high-performance design systems built with Next.js 15, strict Swiss typography, and zero framework bloat.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white uppercase tracking-wider transition-colors flex-shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projectsData.slice(0, 4).map((project) => (
            <article
              key={project.id}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg shadow-black/60"
            >
              <div className="space-y-4">
                {/* Meta Line */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-neutral-900 text-white border border-neutral-800 text-[11px] font-semibold">
                    {project.category}
                  </span>
                  <span className="text-neutral-500">{project.year}</span>
                </div>

                {/* Title & Narrative */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-light">
                    {project.subtitle}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div
                      key={metric.label}
                      className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80"
                    >
                      <span className="text-sm font-bold font-mono text-white block">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono text-neutral-400 bg-neutral-900/60 border border-neutral-800/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live Experience
                </span>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-neutral-300 transition-colors"
                >
                  <span>Launch Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
