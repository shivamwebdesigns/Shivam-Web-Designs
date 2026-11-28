'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

/**
 * ScrollAnimationProvider
 * 1. Inertia smooth scrolling via Lenis (pinned v1.3.29).
 * 2. Ultra-thin scroll progress bar at the top of the page.
 * 3. Section reveal IntersectionObserver (threshold 0.3, replaying on scroll back up).
 */
export function ScrollAnimationProvider() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Smooth Inertia Scrolling
    let lenis: Lenis | null = null;
    let rafId: number;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // 2. Top Scroll Progress Bar
    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY;
        setScrollProgress(Math.min(Math.max(current / totalScroll, 0), 1));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // 3. Section Reveal Observer (threshold ~0.3 with replay on scroll back up)
    let observer: IntersectionObserver | null = null;

    if (!prefersReducedMotion) {
      const sections = document.querySelectorAll('section');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-revealed', 'true');
            } else {
              // Replay animation when user scrolls back up / exits view
              entry.target.setAttribute('data-revealed', 'false');
            }
          });
        },
        {
          threshold: 0.28,
          rootMargin: '0px 0px -5% 0px',
        }
      );

      sections.forEach((section) => {
        section.setAttribute('data-reveal-section', 'true');

        // Immediate check for elements already in view on mount (e.g. Hero)
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
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
        className="h-full bg-white origin-left shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        style={{
          transform: `scaleX(${scrollProgress})`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
