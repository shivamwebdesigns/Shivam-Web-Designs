'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollTextRevealProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  wordClassName?: string;
  enable3D?: boolean;
}

/**
 * ScrollTextReveal - Progressive 3D Scroll Text Reveal Component.
 * Words smoothly lift, rotate, and illuminate in 3D perspective as the user scrolls.
 * Completely GPU-composited, zero runtime libraries, WCAG accessible.
 */
export function ScrollTextReveal({
  text,
  as: Component = 'p',
  className = '',
  wordClassName = '',
  enable3D = true,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
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

      // Start revealing when element enters 88% of viewport, finish at 38%
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.38;
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
    <Component
      ref={containerRef}
      className={`leading-relaxed text-balance [perspective:1000px] [transform-style:preserve-3d] ${className}`}
    >
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        const isRevealed = progress >= wordStart;
        const isFullyRevealed = progress >= wordEnd;

        const opacity = isRevealed ? (isFullyRevealed ? 1 : 0.65) : 0.18;
        const transform = enable3D
          ? isRevealed
            ? 'rotateX(0deg) translate3d(0, 0, 0) scale(1)'
            : 'rotateX(22deg) translate3d(0, 8px, -12px) scale(0.96)'
          : 'none';
        const filter = isRevealed ? 'blur(0px)' : 'blur(0.8px)';

        return (
          <span
            key={`${word}-${i}`}
            className={`inline-block mr-[0.28em] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity,filter] ${
              isRevealed ? 'text-white font-normal' : 'text-neutral-500 font-light'
            } ${wordClassName}`}
            style={{
              opacity,
              transform,
              filter,
            }}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
}
