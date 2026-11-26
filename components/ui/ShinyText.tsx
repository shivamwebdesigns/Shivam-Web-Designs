'use client';

import React from 'react';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShinyText({ children, className = '' }: ShinyTextProps) {
  return (
    <span
      className={`relative inline-flex items-center font-medium bg-[linear-gradient(110deg,#a1a1aa,35%,#ffffff,50%,#a1a1aa,65%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-shine ${className}`}
    >
      {children}
    </span>
  );
}
