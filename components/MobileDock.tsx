'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Briefcase, CreditCard, MessageSquare, Zap } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export function MobileDock() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Studio', href: '/', icon: Home, isExternal: false },
    { label: '3D Stack', href: '/#3d-stack', icon: Layers, isExternal: false },
    { label: 'Projects', href: '/projects', icon: Briefcase, isExternal: false },
    { label: '3D Card', href: '/businesscard', icon: CreditCard, isExternal: false },
    { label: 'WhatsApp', href: siteConfig.contact.whatsapp, icon: MessageSquare, isExternal: true },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-neutral-800/80 px-2 py-2 safe-area-bottom shadow-2xl shadow-black"
      aria-label="Mobile Bottom App Dock"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-neutral-400 hover:text-white transition-all active:scale-95 group"
                aria-label={item.label}
              >
                <div className="w-5 h-5 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono tracking-tight mt-1 text-emerald-400/90">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all active:scale-95 ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              aria-label={item.label}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center transition-transform ${
                  isActive ? 'scale-110 text-white' : 'text-neutral-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono tracking-tight mt-1 ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Start Project CTA Button */}
        <Link
          href="/start-project"
          className="flex flex-col items-center justify-center py-1 px-3 bg-white text-black rounded-lg active:scale-95 shadow-md shadow-white/10"
          aria-label="Start Project Brief"
        >
          <div className="w-5 h-5 flex items-center justify-center text-black">
            <Zap className="w-4 h-4 fill-black" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-tight mt-1">
            Brief
          </span>
        </Link>
      </div>
    </nav>
  );
}
