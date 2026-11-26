'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SlideTextButtonProps {
  href: string;
  primaryText: string;
  secondaryText?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export function SlideTextButton({
  href,
  primaryText,
  secondaryText,
  className = '',
  variant = 'primary',
  icon,
}: SlideTextButtonProps) {
  const displaySecondary = secondaryText || primaryText;

  const baseStyles =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-md text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 active:scale-95';

  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-200 border border-white shadow-lg shadow-white/5',
    secondary: 'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700/70',
    outline: 'bg-transparent text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600',
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative flex items-center px-6 py-3.5">
        <span className="relative flex flex-col overflow-hidden h-[1.1rem]">
          <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full flex items-center">
            {primaryText}
          </span>
          <span className="absolute inset-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 flex items-center">
            {displaySecondary}
          </span>
        </span>
        {icon ? (
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        ) : (
          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </Link>
  );
}
