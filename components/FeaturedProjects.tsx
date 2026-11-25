import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';

export const FeaturedProjects: React.FC = () => {
  const featured = projectsData.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 border-b border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group self-start md:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((project, idx) => (
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
                
                {/* Category badge */}
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
                      0{idx + 1} // {project.year}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {project.role.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="text-2xl font-light tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                {/* Key Metrics / Highlights */}
                <div className="pt-6 border-t border-neutral-900 grid grid-cols-2 gap-4 mb-6">
                  {project.metrics.slice(0, 2).map((metric, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-lg font-light text-white font-mono tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
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
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA to all projects */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-800 text-white hover:bg-white hover:text-black hover:border-white transition-all text-sm font-medium tracking-wide uppercase font-mono group"
          >
            <span>Explore Complete Archive</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
