import React from 'react';

interface TextShimmerProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  duration?: number;
}

/**
 * TextShimmer - ForgeUI-inspired pure CSS3 hardware-accelerated text shimmer component.
 * Sweeps a subtle, high-contrast light beam across text without external libraries or JS runtime cost.
 */
export function TextShimmer({
  children,
  as: Component = 'span',
  className = '',
  duration = 3,
}: TextShimmerProps) {
  return (
    <Component
      className={`inline-flex bg-[linear-gradient(110deg,#a3a3a3_15%,#ffffff_45%,#ffffff_55%,#a3a3a3_85%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-text-shimmer ${className}`}
      style={{
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </Component>
  );
}
