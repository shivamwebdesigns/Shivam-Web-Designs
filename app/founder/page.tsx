'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CreditCard, Github, Instagram, Linkedin, Mail, MessageCircle, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { founderData } from '@/data/founder';
import { siteConfig } from '@/data/siteConfig';
import { SplitText } from '@/components/ui/SplitText';
import { ShinyText } from '@/components/ui/ShinyText';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TiltedCard } from '@/components/ui/TiltedCard';
import { CapabilitiesRadar } from '@/components/ui/CapabilitiesRadar';
import { SlideTextButton } from '@/components/ui/SlideTextButton';

export default function FounderPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Founder Hero */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Column with TiltedCard */}
            <div className="lg:col-span-5">
              <TiltedCard className="p-3 bg-black">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 rounded-lg">
                  <Image
                    src={founderData.image}
                    alt={founderData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/95 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/90 backdrop-blur-md border border-neutral-800 rounded-lg">
                    <div className="text-sm font-semibold text-white">
                      {founderData.name}
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                      {founderData.role} — {founderData.company}
                    </div>
                  </div>
                </div>
              </TiltedCard>
            </div>

            {/* Intro Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <ShinyText>EXECUTIVE DOSSIER // STUDIO FOUNDER</ShinyText>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                <SplitText text={founderData.name} wordMode delay={40} />
              </h1>
              <div className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-widest">
                {founderData.role} • {founderData.company}
              </div>

              <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                {founderData.intro}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <SlideTextButton
                  href="/start-project"
                  primaryText="Work With Shivam"
                  secondaryText="Initiate Project"
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                />

                <Link
                  href="/businesscard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 rounded-md transition-all text-xs font-mono uppercase tracking-wider font-semibold active:scale-95"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                01 // Genesis
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sticky top-28">
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

      {/* 3. My Philosophy with SpotlightCards */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              02 // Creed
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {founderData.philosophy.title}
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Principles forged through relentless design critique and production engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founderData.philosophy.principles.map((principle, idx) => (
              <SpotlightCard
                key={idx}
                className="p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-xs font-mono text-neutral-500 mb-4">
                  PRINCIPLE 0{idx + 1} //
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {principle.headline}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {principle.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Skills & Interactive Radar */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              03 // Capabilities Matrix
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Areas of Specialization
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              A rare combination of high-level art direction, user psychology, and modern frontend engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-5">
              <CapabilitiesRadar />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {founderData.skills.map((skillGroup, sIdx) => (
                <SpotlightCard key={sIdx} className="p-6">
                  <div className="text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest">
                    DOMAIN 0{sIdx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white mb-4 tracking-tight">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2.5">
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
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Founder Note */}
      <section className="py-24 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightCard className="p-8 md:p-14 border border-neutral-800 bg-black">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
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
          </SpotlightCard>
        </div>
      </section>

      {/* 6. Connect With Shivam (Strict Founder Links) */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              05 // Direct Founder Channels
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
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
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-600 hover:bg-neutral-900 rounded-md transition-all text-xs font-mono uppercase tracking-wider active:scale-95"
            >
              <Linkedin className="w-4 h-4 text-neutral-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={founderData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-600 hover:bg-neutral-900 rounded-md transition-all text-xs font-mono uppercase tracking-wider active:scale-95"
            >
              <Github className="w-4 h-4 text-neutral-400" />
              <span>GitHub</span>
            </a>

            <a
              href={founderData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-600 hover:bg-neutral-900 rounded-md transition-all text-xs font-mono uppercase tracking-wider active:scale-95"
            >
              <Instagram className="w-4 h-4 text-neutral-400" />
              <span>Instagram</span>
            </a>

            <a
              href={founderData.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-600 hover:bg-neutral-900 rounded-md transition-all text-xs font-mono uppercase tracking-wider active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${founderData.social.email}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 border border-neutral-800 text-white hover:border-neutral-600 hover:bg-neutral-900 rounded-md transition-all text-xs font-mono uppercase tracking-wider active:scale-95"
            >
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>Direct Email</span>
            </a>

            <Link
              href={founderData.social.businessCard}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black hover:bg-neutral-200 rounded-md transition-all text-xs font-mono uppercase tracking-wider font-semibold active:scale-95"
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
