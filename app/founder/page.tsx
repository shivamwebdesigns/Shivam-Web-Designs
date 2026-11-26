import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CreditCard, Github, Instagram, Linkedin, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { founderData } from '@/data/founder';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Founder Profile — ${founderData.name}`,
  description: `${founderData.name}, ${founderData.role} of ${founderData.company}. Discover his story, design philosophy, technical skills, and vision for the modern web.`,
  openGraph: {
    title: `${founderData.name} — Founder & CEO, ${founderData.company}`,
    description: founderData.intro,
    images: [{ url: founderData.image }],
  },
  alternates: { canonical: '/founder' },
};

export default function FounderPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Founder Hero */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-5">
              <div className="relative border border-neutral-800 bg-black p-2 sm:p-3">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={founderData.image}
                    alt={founderData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/90 backdrop-blur-md border border-neutral-800">
                    <div className="text-sm font-medium text-white">
                      {founderData.name}
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                      {founderData.role} — {founderData.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Executive Profile
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
                {founderData.name}
              </h1>
              <div className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-6">
                {founderData.role} • {founderData.company}
              </div>

              <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-8">
                {founderData.intro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  <span>Work With Shivam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/businesscard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 border border-neutral-800 text-white hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                  <span>3D Digital Business Card</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. My Story */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                01 // Genesis
              </div>
              <h2 className="text-3xl font-light text-white tracking-tight sticky top-28">
                {founderData.story.title}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-neutral-300 font-light text-base md:text-lg leading-relaxed">
              {founderData.story.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. My Philosophy */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              02 // Creed
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
              {founderData.philosophy.title}
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Principles forged through relentless design critique and production engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founderData.philosophy.principles.map((principle, idx) => (
              <div
                key={idx}
                className="p-8 border border-neutral-900 bg-black hover:border-neutral-800 transition-colors"
              >
                <div className="text-xs font-mono text-neutral-500 mb-4">
                  PRINCIPLE 0{idx + 1}
                </div>
                <h3 className="text-xl font-light text-white mb-3 tracking-tight">
                  {principle.headline}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. My Skills */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              03 // Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
              Areas of Specialization
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              A rare combination of high-level art direction, user psychology, and modern frontend engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {founderData.skills.map((skillGroup, sIdx) => (
              <div
                key={sIdx}
                className="p-6 border border-neutral-900 bg-neutral-950 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-neutral-500 mb-3 uppercase tracking-widest">
                    DOMAIN 0{sIdx + 1}
                  </div>
                  <h3 className="text-lg font-light text-white mb-6 tracking-tight">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="text-xs text-neutral-400 font-mono flex items-start gap-2"
                      >
                        <span className="text-neutral-600 select-none">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Founder Note */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-10 md:p-16 border border-neutral-800 bg-black relative">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{founderData.founderNote.title}</span>
            </div>

            <blockquote className="border-l-2 border-white pl-6 py-2 mb-8">
              <p className="text-xl md:text-2xl font-light text-white italic leading-snug">
                &ldquo;{founderData.founderNote.quote}&rdquo;
              </p>
            </blockquote>

            <div className="space-y-4 text-sm md:text-base text-neutral-300 font-light leading-relaxed mb-10">
              {founderData.founderNote.body.map((para, bIdx) => (
                <p key={bIdx}>{para}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-400">
                {founderData.founderNote.signoff}
              </div>
              <div className="text-xs font-mono text-neutral-600">
                SWD LEADERSHIP ARCHIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Connect With Me */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              05 // Direct Channels
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
              Connect With Shivam
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Reach out directly for strategic consultations, speaking inquiries, or new project collaborations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={founderData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <Linkedin className="w-4 h-4 text-neutral-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={founderData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <Github className="w-4 h-4 text-neutral-400" />
              <span>GitHub</span>
            </a>

            <a
              href={founderData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4 text-neutral-400" />
              <span>Instagram</span>
            </a>

            <a
              href={founderData.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-neutral-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${founderData.social.email}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>Direct Email</span>
            </a>

            <Link
              href={founderData.social.businessCard}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold"
            >
              <CreditCard className="w-4 h-4" />
              <span>3D Business Card</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
