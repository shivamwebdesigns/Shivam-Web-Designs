'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export function SplitText({ text, className = '', delay = 30, wordMode = false }: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (wordMode) {
    const words = text.split(' ');
    return (
      <span ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
        {words.map((word, idx) => (
          <span
            key={idx}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
              filter: isVisible ? 'blur(0)' : 'blur(4px)',
              transitionDelay: `${idx * delay}ms`,
            }}
          >
            {word}&nbsp;
          </span>
        ))}
      </span>
    );
  }

  const chars = text.split('');
  return (
    <span ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
      {chars.map((char, idx) => (
        <span
          key={idx}
          className="inline-block transition-all duration-500 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
            filter: isVisible ? 'blur(0)' : 'blur(3px)',
            transitionDelay: `${idx * delay}ms`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
