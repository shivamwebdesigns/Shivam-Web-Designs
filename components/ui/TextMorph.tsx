'use client';

import React, { useState, useEffect } from 'react';

interface TextMorphProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * TextMorph - ForgeUI-inspired word morphing component.
 * Cycles smoothly through an array of phrases using hardware-accelerated blur, scale, and opacity physics.
 */
export function TextMorph({
  words,
  interval = 3200,
  className = '',
}: TextMorphProps) {
  const [index, setIndex] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);
  const [currentWord, setCurrentWord] = useState(words[0] || '');

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      setIsMorphing(true);
      setTimeout(() => {
        setIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % words.length;
          setCurrentWord(words[nextIndex]);
          return nextIndex;
        });
        setIsMorphing(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span
      className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isMorphing
          ? 'opacity-0 blur-md scale-95 -translate-y-1'
          : 'opacity-100 blur-0 scale-100 translate-y-0'
      } ${className}`}
      aria-label={currentWord}
    >
      {currentWord}
    </span>
  );
}
