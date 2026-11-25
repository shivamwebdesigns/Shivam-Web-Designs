import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project in line
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Header */}
      <section className="pt-32 pb-12 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6">
            <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-neutral-500">
              {project.year} • {project.client}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Main Hero Media */}
      <section className="border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="relative aspect-[16/9] w-full border border-neutral-800 overflow-hidden bg-neutral-950">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Project Meta Bar */}
      <section className="py-8 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <div className="text-neutral-500 uppercase tracking-widest mb-1">Role & Discipline</div>
              <div className="text-neutral-200">{project.role}</div>
            </div>
            <div>
              <div className="text-neutral-500 uppercase tracking-widest mb-1">Partner / Client</div>
              <div className="text-neutral-200">{project.client}</div>
            </div>
            <div>
              <div className="text-neutral-500 uppercase tracking-widest mb-1">Timeline & Year</div>
              <div className="text-neutral-200">{project.year}</div>
            </div>
            <div>
              <div className="text-neutral-500 uppercase tracking-widest mb-1">Project Status</div>
              <div className="text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Production Flagship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Core Content */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Narrative Column */}
            <div className="lg:col-span-8 space-y-16">
              {/* Overview */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  01 // Overview
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-tight">
                  The Strategic Vision
                </h2>
                <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* The Challenge */}
              <div className="p-8 border border-neutral-900 bg-neutral-950/60">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  02 // The Problem
                </div>
                <h2 className="text-2xl font-light text-white mb-4 tracking-tight">
                  The Technical & Aesthetic Challenge
                </h2>
                <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* The Architectural Solution */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  03 // Architecture & Execution
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-tight">
                  The Engineering Solution
                </h2>
                <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-6">
                  {project.solution}
                </p>
              </div>

              {/* Deliverables List */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                  04 // Delivered Components
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 bg-neutral-950 border border-neutral-900 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-neutral-300 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Measurable Impact Metrics */}
              <div className="p-6 border border-neutral-900 bg-neutral-950">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Measurable Outcomes</span>
                </div>
                <div className="space-y-6">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="pb-4 border-b border-neutral-900 last:border-b-0 last:pb-0">
                      <div className="text-3xl font-light font-mono text-white tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="p-6 border border-neutral-900 bg-neutral-950">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Technology Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black border border-neutral-800 text-xs font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Link & Action */}
              <div className="p-6 border border-neutral-900 bg-neutral-950 text-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold mb-3"
                >
                  <span>Launch Live Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  href={`/start-project?reference=${project.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <span>Request Similar Architecture</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Nav Banner */}
      <section className="py-16 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                Next Case Study
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">
                {nextProject.title}
              </h3>
            </div>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold group"
            >
              <span>View Next Project</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
