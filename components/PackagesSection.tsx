'use client';

import React, { useState, useEffect } from 'react';
import {
  Check,
  Plus,
  Minus,
} from 'lucide-react';
import { PACKAGES, ADDONS, FAQS } from '@/data/packages';

interface PackagesSectionProps {
  isPage?: boolean;
}

const fmt = (num: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);

export function PackagesSection({ isPage = false }: PackagesSectionProps) {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [addons, setAddons] = useState<Record<string, number>>({});
  const [existingSite, setExistingSite] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sync state from localStorage
  const syncFromStorage = () => {
    try {
      const saved = localStorage.getItem('swd-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed?.pkg === 'string') setSelectedPkg(parsed.pkg);
        else if (parsed?.pkg === null) setSelectedPkg(null);

        if (parsed?.add && typeof parsed.add === 'object') setAddons(parsed.add);
        else if (!parsed?.add) setAddons({});

        if (typeof parsed?.existingSite === 'string') setExistingSite(parsed.existingSite);
      } else {
        setSelectedPkg(null);
        setAddons({});
      }
    } catch (_) {}
  };

  useEffect(() => {
    syncFromStorage();
    const handleCartChange = () => syncFromStorage();
    window.addEventListener('swd-cart-change', handleCartChange);
    window.addEventListener('storage', handleCartChange);
    return () => {
      window.removeEventListener('swd-cart-change', handleCartChange);
      window.removeEventListener('storage', handleCartChange);
    };
  }, []);

  const persistCart = (newPkg: string | null, newAddons: Record<string, number>) => {
    setSelectedPkg(newPkg);
    setAddons(newAddons);
    try {
      const saved = localStorage.getItem('swd-cart');
      const existing = saved ? JSON.parse(saved) : {};
      localStorage.setItem(
        'swd-cart',
        JSON.stringify({
          ...existing,
          pkg: newPkg,
          add: newAddons,
          existingSite,
        })
      );
      window.dispatchEvent(new Event('swd-cart-change'));
    } catch (_) {}
  };

  const togglePackage = (pkgId: string) => {
    if (selectedPkg === pkgId) {
      // Open cart modal if already selected
      window.dispatchEvent(new CustomEvent('swd-open-cart'));
    } else {
      persistCart(pkgId, addons);
    }
  };

  const addAddon = (addonId: string) => {
    const current = addons[addonId] || 0;
    const updated = { ...addons, [addonId]: current + 1 };
    persistCart(selectedPkg, updated);
  };

  const decrementAddon = (addonId: string) => {
    const current = addons[addonId] || 0;
    const next = Math.max(0, current - 1);
    const updated = { ...addons };
    if (next === 0) {
      delete updated[addonId];
    } else {
      updated[addonId] = next;
    }
    persistCart(selectedPkg, updated);
  };

  return (
    <section
      id="packages"
      className={`relative bg-black text-white ${
        isPage ? 'pt-24 pb-16 sm:pt-28 sm:pb-24' : 'py-14 sm:py-20 border-t border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          {isPage ? (
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
              Website Packages Starting at ₹499
            </h1>
          ) : (
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
              Website Packages Starting at ₹499
            </h2>
          )}
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed mb-4">
            Flexible solutions for businesses, creators and growing brands. Choose a package that fits your goals.
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            PACKAGES // FIXED PRICES
          </p>
        </div>

        {/* Main Layout: Full width cards, add-ons, and FAQ */}
        <div className="space-y-12 sm:space-y-16">
          {/* Package Cards 3D Deck */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              const isPro = pkg.id === 'pro';
              const isGrowth = pkg.id === 'growth';

              return (
                <article
                  key={pkg.id}
                  className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 transform-gpu group backdrop-blur-xl ${
                    isSelected
                      ? 'border-2 border-white shadow-2xl shadow-white/20 bg-neutral-900/90 -translate-y-1'
                      : isPro
                      ? 'border border-neutral-600 hover:border-white shadow-xl shadow-white/10 hover:shadow-white/20 bg-neutral-950/90 hover:-translate-y-1'
                      : isGrowth
                      ? 'border border-neutral-700 hover:border-white shadow-lg shadow-white/5 hover:shadow-white/15 bg-neutral-950/90 hover:-translate-y-1'
                      : 'border border-neutral-800 hover:border-neutral-500 shadow-md bg-neutral-950/90 hover:-translate-y-1'
                  }`}
                >
                  {/* Top edge glow line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  {/* Badge */}
                  {pkg.badge && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-white text-black shadow-md shadow-white/20">
                      {pkg.badge}
                    </span>
                  )}

                  {/* Card Title & Tagline */}
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white">{pkg.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px] leading-snug">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mt-4 pt-4 border-t border-neutral-900">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                      Starting at
                    </span>
                    <div className="text-4xl font-extrabold tracking-tight text-white mt-0.5">
                      {fmt(pkg.price)}
                    </div>
                    <span className="text-[11px] text-neutral-400 block mt-1">
                      Domain billed separately
                    </span>
                  </div>

                  {/* Scope & Delivery Meta */}
                  <div className="mt-4 py-3 border-y border-neutral-900/80 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between text-neutral-400">
                      <span>Scope:</span>
                      <span className="text-neutral-200 font-medium">{pkg.scope}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Delivery:</span>
                      <span className="text-neutral-200 font-medium">{pkg.delivery}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 text-xs text-neutral-300 flex-1 my-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => togglePackage(pkg.id)}
                      className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 ${
                        isSelected
                          ? 'bg-neutral-800 text-white border border-white shadow-inner'
                          : 'bg-white text-black hover:bg-neutral-200 shadow-md shadow-white/10'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Cart (View)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/917861965480?text=${encodeURIComponent(
                        `Hi Shivam, I’m interested in the ${pkg.name} Package (${fmt(
                          pkg.price
                        )}). Can we discuss?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors block"
                    >
                      Ask on WhatsApp ›
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Modular Add-ons */}
          <div className="pt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-white">Modular Add-ons</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Select any add-on with a package, or order add-ons standalone for your existing website.
              </p>
            </div>

            {/* Add-on Items List */}
            <div className="divide-y divide-neutral-900 border-y border-neutral-900">
              {ADDONS.map((item) => {
                const qty = addons[item.id] || 0;
                const isAdded = qty > 0;
                const isFreePro = selectedPkg === 'pro' && item.id === 'subdomain';

                return (
                  <div
                    key={item.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-950/60 px-2 rounded-xl transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                              isFreePro
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                                : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-400 max-w-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                      <div className="text-right">
                        <span className="font-mono text-sm font-semibold text-white">
                          {isFreePro ? (
                            <span className="flex items-center gap-1.5">
                              <span className="line-through text-neutral-400 text-xs">
                                {fmt(item.price)}
                              </span>
                              <span className="text-emerald-400 font-bold">FREE</span>
                            </span>
                          ) : (
                            `${fmt(item.price)}${item.monthly ? ' / mo' : ''}`
                          )}
                        </span>
                      </div>

                      {/* Add / Quantity Button */}
                      {isAdded ? (
                        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-full px-2 py-1">
                          <button
                            type="button"
                            onClick={() => decrementAddon(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-white min-w-[16px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addAddon(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addAddon(item.id)}
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 hover:bg-white text-neutral-200 hover:text-black border border-neutral-700 hover:border-white transition-all active:scale-95"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Everything you need to know about our packages, delivery, and deliverables.
            </p>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-neutral-800/80 bg-neutral-950/70 rounded-xl overflow-hidden transition-colors hover:border-neutral-700"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-4 px-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors">
                        {faq.q}
                      </span>
                      <span
                        className={`font-mono text-neutral-400 text-base flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-900 pt-3 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
