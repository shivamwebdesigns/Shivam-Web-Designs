'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/**
 * ScrollTextReveal - ForgeUI-inspired progressive scroll text reveal component.
 * Progressively reveals and illuminates text word-by-word as the user scrolls into view.
 */
export function ScrollTextReveal({
  text,
  className = '',
  wordClassName = '',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion: if user prefers reduced motion, reveal 100% immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the viewport the element is
      // Start revealing when the element is 85% down the viewport, finish when it's at 35%
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.35;
      const current = rect.top;

      const rawProgress = (start - current) / (start - end);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed text-balance transition-colors ${className}`}
    >
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        const isRevealed = progress >= wordStart;
        const opacity = isRevealed ? (progress >= wordEnd ? 1 : 0.6) : 0.2;

        return (
          <span
            key={`${word}-${i}`}
            className={`inline-block mr-[0.28em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'text-white font-normal' : 'text-neutral-500 font-light'
            } ${wordClassName}`}
            style={{
              opacity,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
