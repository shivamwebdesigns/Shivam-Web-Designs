import React from 'react';
import { Check } from 'lucide-react';

export interface CoreWebVitalItem {
  id: number;
  title: string;
  subtitle: string;
  highlight?: boolean;
}

export const CORE_WEB_VITALS_CHECKS: CoreWebVitalItem[] = [
  {
    id: 1,
    title: 'Compress hero to WebP or AVIF',
    subtitle: 'right quality · srcset widths',
  },
  {
    id: 2,
    title: 'Right image sizes + lazy loading',
    subtitle: 'width/height set · lazy below fold',
  },
  {
    id: 3,
    title: 'Remove unused JavaScript',
    subtitle: 'split bundles · drop dead code',
  },
  {
    id: 4,
    title: 'Preload fonts, stop layout shift',
    subtitle: 'font-display: swap · reserve space',
  },
  {
    id: 5,
    title: 'Delay third-party scripts',
    subtitle: 'load after interaction or idle',
  },
  {
    id: 6,
    title: 'Caching + CDN',
    subtitle: 'long cache headers on static files',
  },
  {
    id: 7,
    title: 'Measure Core Web Vitals on mobile',
    subtitle: 'LCP · INP · CLS · real users',
    highlight: true,
  },
];

export function CoreWebVitalsCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl bg-white text-neutral-900 p-5 sm:p-7 shadow-2xl shadow-black/40 border border-neutral-200/90 w-full transition-all duration-300 ${className}`}
    >
      <div className="space-y-4 sm:space-y-5">
        {CORE_WEB_VITALS_CHECKS.slice(0, 6).map((item) => (
          <div key={item.id} className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#34a853] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[3.5]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight leading-tight">
                {item.title}
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 tracking-tight mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Item 7 Highlighted Card */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#e5f5e9] border border-[#cbe9d3]/80 flex items-center gap-3.5 sm:gap-4 shadow-sm">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-neutral-800 font-sans font-semibold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-sm border border-neutral-200/90">
            7
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight leading-tight">
              Measure Core Web Vitals on mobile
            </div>
            <p className="text-xs sm:text-sm text-[#2e7d32] font-semibold tracking-tight mt-0.5">
              LCP · INP · CLS · real users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
