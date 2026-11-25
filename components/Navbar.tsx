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
    window.addEventListener('scroll', handleScroll);
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
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Logo Only - Proportions strictly preserved */}
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 active:scale-95"
            aria-label="ShivamWebDesigns Home"
          >
            <div className="relative h-8 sm:h-9 w-auto flex items-center">
              <Image
                src={siteConfig.assets.logoPng}
                alt="ShivamWebDesigns Logo"
                width={130}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
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
                  className={`px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? 'text-white bg-neutral-900 border border-neutral-700/60'
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
              className="inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded-md transition-all duration-200 shadow-sm active:scale-95"
            >
              Start a Project
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/start-project"
              className="px-3 py-1.5 text-xs font-semibold text-black bg-white rounded-md active:scale-95"
            >
              Inquire
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 backdrop-blur-xl border-b border-neutral-800 px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-white bg-neutral-900 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
            <Link
              href="/start-project"
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white rounded-md transition-colors"
            >
              Start a Project
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
            <div className="flex items-center justify-between pt-2 text-xs text-neutral-400 px-2 font-mono">
              <a href={siteConfig.social.email} className="hover:text-white transition-colors">
                {siteConfig.contact.email}
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
