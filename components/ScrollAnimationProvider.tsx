'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

/**
 * ScrollAnimationProvider
 * 1. Desktop Inertia Scrolling: Lenis pinned v1.3.29 for desktop wheel/trackpad.
 *    Mobile devices (touch screens) use 100% native 120Hz ProMotion touch scrolling.
 * 2. Hairline Scroll Progress Bar: 2px top indicator with smooth scaleX.
 * 3. Section Reveal Observer:
 *    - Threshold [0, 0.1] with 50px rootMargin so sections reveal immediately upon entering view.
 *    - No disappearing while user scrolls through tall sections.
 *    - Replays when scrolled back up above the section.
 *    - Immediate check on load to prevent any initial blank state.
 */
export function ScrollAnimationProvider() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    // 1. Desktop-only Lenis Inertia (Touch screens keep pristine native scrolling)
    let lenis: Lenis | null = null;
    let rafId: number;

    if (!prefersReducedMotion && !isTouch) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // 2. Scroll Progress Bar Tracking
    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY;
        setScrollProgress(Math.min(Math.max(current / totalScroll, 0), 1));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // 3. Section Reveal IntersectionObserver
    let observer: IntersectionObserver | null = null;

    if (!prefersReducedMotion) {
      const sections = document.querySelectorAll('section');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Reveal section as soon as it enters view
              entry.target.setAttribute('data-revealed', 'true');
            } else if (entry.boundingClientRect.top > window.innerHeight) {
              // Only reset when user scrolls back UP above the section
              entry.target.setAttribute('data-revealed', 'false');
            }
          });
        },
        {
          threshold: [0, 0.08],
          rootMargin: '0px 0px -40px 0px',
        }
      );

      sections.forEach((section) => {
        section.setAttribute('data-reveal-section', 'true');

        // Immediately reveal any section in view on mount (no flash or blank space)
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          section.setAttribute('data-revealed', 'true');
        } else {
          section.setAttribute('data-revealed', 'false');
        }

        observer?.observe(section);
      });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener('scroll', updateProgress);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-white origin-left shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        style={{
          transform: `scaleX(${scrollProgress})`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
