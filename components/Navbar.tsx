'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800/80 py-3 sm:py-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official SWD Monogram Only - Pure, Seamless & HD */}
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-lg p-0.5"
            aria-label="ShivamWebDesigns — Home"
          >
            <div className="relative flex items-center">
              <Image
                src={siteConfig.assets.logoPng}
                alt="ShivamWebDesigns Bespoke Monogram"
                width={66}
                height={44}
                className="h-9 sm:h-11 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Primary Navigation">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-white bg-neutral-900 border border-neutral-700/70 shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 font-mono group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Action Cluster */}
          <div className="flex md:hidden items-center gap-2.5 sm:gap-3">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-all duration-200 active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 font-mono group"
            >
              <span>Inquire</span>
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 inline-flex items-center justify-center text-neutral-300 hover:text-white bg-neutral-900/70 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-neutral-700 rounded-lg transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <div className={`transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 backdrop-blur-2xl border-b border-neutral-800/90 px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-neutral-900 font-semibold border border-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2.5">
            <Link
              href="/start-project"
              className="w-full min-h-[48px] flex items-center justify-center px-4 py-3 text-sm font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors font-mono shadow-sm active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
            <div className="flex items-center justify-between pt-2 text-xs text-neutral-400 px-2 font-mono">
              <a href={siteConfig.social.email} className="hover:text-white transition-colors">
                Email
              </a>
              <Link href="/businesscard" className="hover:text-white transition-colors">
                3D Card &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
