'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * StudioManifesto - 300vh Scroll-Scrubbed Text Reveal
 * - Section is 300vh tall with sticky centered content.
 * - Words revealed one-by-one from opacity 0.15 + blur(6px) to opacity 1 + blur(0) with slight upward slide.
 * - Progress eased toward real scroll position with a 0.08 lerp loop.
 * - Key words highlighted in accent color.
 * - Honors prefers-reduced-motion.
 */
export function StudioManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  const manifestoText =
    'No templates. No page builders. No bloat. Just hand-built, lightning-fast websites that turn visitors into clients worth keeping.';
  const words = manifestoText.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayProgress(1);
      return;
    }

    let rafId: number;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollable;
      targetProgressRef.current = Math.min(Math.max(rawProgress, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Lerp update loop (0.08 factor for silky inertia ease)
    const updateLerp = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current = current + diff * 0.08;
        setDisplayProgress(currentProgressRef.current);
      } else if (current !== target) {
        currentProgressRef.current = target;
        setDisplayProgress(target);
      }

      rafId = requestAnimationFrame(updateLerp);
    };

    rafId = requestAnimationFrame(updateLerp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative h-[300vh] bg-black border-t border-neutral-900"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                MANIFESTO // CODE WITH PURPOSE
              </span>
            </div>

            {/* Scroll-Scrubbed Text Reveal */}
            <h2 className="scroll-scrub-text text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.22] sm:leading-[1.18] text-balance">
              {words.map((word, i) => {
                const wordStart = i / words.length;
                const wordEnd = (i + 1) / words.length;
                const wordProgress = Math.min(
                  Math.max((displayProgress - wordStart) / (wordEnd - wordStart), 0),
                  1
                );

                const opacity = 0.15 + 0.85 * wordProgress;
                const blur = 6 * (1 - wordProgress);
                const translateY = 8 * (1 - wordProgress);
                const isAccent =
                  word.includes('hand-built') || word.includes('lightning-fast');

                return (
                  <span
                    key={`${word}-${i}`}
                    className={`scroll-scrub-word inline-block mr-[0.28em] transform-gpu will-change-[transform,opacity,filter] ${
                      wordProgress > 0.55
                        ? isAccent
                          ? 'text-emerald-400 font-normal drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                          : 'text-white'
                        : 'text-neutral-500'
                    }`}
                    style={{
                      opacity,
                      filter: `blur(${blur.toFixed(2)}px)`,
                      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>

            {/* Bottom Indicator */}
            <div className="pt-10 sm:pt-14 flex items-center gap-6 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <span>SCROLL</span>
                <span className="animate-bounce">↓</span>
              </span>
              <span className="h-px w-12 bg-neutral-800" />
              <span>&lt; 0.8s Mobile Standard</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
