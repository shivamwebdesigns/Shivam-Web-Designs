'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed z-40 bottom-20 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-90 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto shadow-black/80'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
