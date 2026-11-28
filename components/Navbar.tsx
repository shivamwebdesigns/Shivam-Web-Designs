'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { PACKAGES, ADDONS } from '@/data/packages';
import { Menu, X, ArrowUpRight, ShoppingCart, ArrowLeft } from 'lucide-react';

const fmt = (num: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync cart count and total from local DB
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const saved = localStorage.getItem('swd-cart');
        if (!saved) {
          setCartCount(0);
          setCartTotal(0);
          return;
        }
        const parsed = JSON.parse(saved);
        let count = parsed?.pkg ? 1 : 0;
        let total = 0;

        if (parsed?.pkg) {
          const pkgObj = PACKAGES.find((p) => p.id === parsed.pkg);
          if (pkgObj) total += pkgObj.price;
        }

        if (parsed?.add && typeof parsed.add === 'object') {
          Object.entries(parsed.add).forEach(([id, qty]) => {
            const q = Number(qty) || 0;
            if (q > 0) {
              count += q;
              const addon = ADDONS.find((a) => a.id === id);
              if (addon) total += addon.price * q;
            }
          });
        }

        setCartCount(count);
        setCartTotal(total);
      } catch (_) {
        setCartCount(0);
        setCartTotal(0);
      }
    };

    updateCartCount();
    window.addEventListener('swd-cart-change', updateCartCount);
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('swd-cart-change', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleCartClick = () => {
    window.dispatchEvent(new CustomEvent('swd-open-cart'));
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800/80 pb-3 sm:pb-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent pb-4 sm:pb-5'
      }`}
      style={{
        paddingTop: 'max(0.85rem, env(safe-area-inset-top, 0px))',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity & Mobile Back Button when on Subpages (e.g. /packages) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            {pathname !== '/' && (
              <button
                type="button"
                onClick={handleBack}
                className="w-9 h-9 inline-flex md:hidden items-center justify-center text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800/80 hover:border-neutral-700 rounded-lg transition-all active:scale-90 flex-shrink-0"
                aria-label="Back to previous page"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-lg p-0.5 min-w-0"
              aria-label="ShivamWebDesigns — Home"
            >
              <div className="relative flex items-center flex-shrink-0">
                <Image
                  src={siteConfig.assets.logoPng}
                  alt="ShivamWebDesigns Bespoke Monogram"
                  width={66}
                  height={44}
                  className="h-8 sm:h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs sm:text-sm text-white tracking-tight leading-tight group-hover:text-neutral-200 transition-colors truncate">
                  ShivamWebDesigns
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest leading-none mt-0.5 hidden min-[360px]:block">
                  Digital Studio
                </span>
              </div>
            </Link>
          </div>

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
            <button
              type="button"
              onClick={handleCartClick}
              className="relative inline-flex items-center justify-center min-h-[44px] px-3.5 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all duration-200 shadow-sm active:scale-95 font-mono gap-2 group"
              aria-label="Your Orders"
              title="Open Your Orders"
            >
              <ShoppingCart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Orders</span>
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                cartCount > 0 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {cartCount}
              </span>
            </button>

            <Link
              href="/start-project"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 font-mono group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Action Cluster: Clean Inquire button + Three Lines (Menu) with Live Item Count */}
          <div className="flex md:hidden items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center min-h-[38px] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-all duration-200 active:scale-95 shadow-sm font-mono group"
            >
              <span>Inquire</span>
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Three Lines Button with item count indicator */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[38px] px-2.5 py-1.5 inline-flex items-center justify-center text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800/80 hover:border-neutral-700 rounded-lg transition-all duration-200 active:scale-90 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 relative"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : `Open navigation menu${cartCount > 0 ? `, ${cartCount} items in orders` : ''}`}
            >
              <div className={`transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </div>
              {cartCount > 0 && (
                <span className="font-mono text-[10px] font-bold bg-white text-black px-1.5 py-0.5 rounded-full leading-none shadow-sm flex items-center justify-center min-w-[18px]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 backdrop-blur-2xl border-b border-neutral-800/90 px-4 pt-3.5 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Dedicated "Your Orders" in Three Lines Menu with live items & total on right side */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleCartClick();
            }}
            className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all active:scale-98 group mb-1 shadow-inner"
            aria-label="Open Your Orders"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black border border-neutral-800 flex items-center justify-center group-hover:border-neutral-700 transition-colors">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-white block">
                  Your Orders
                </span>
                <span className="text-[10px] font-mono text-neutral-400 block">
                  {cartCount === 0 ? 'No items in order' : 'Tap to review spec & dispatch'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                cartCount > 0 ? 'bg-white text-black shadow-sm' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
              {cartTotal > 0 && (
                <span className="text-xs font-mono font-extrabold text-white">
                  {fmt(cartTotal)}
                </span>
              )}
            </div>
          </button>

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
