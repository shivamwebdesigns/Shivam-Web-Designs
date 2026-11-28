'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus,
  Minus,
  X,
  ShoppingCart,
  ArrowRight,
  Trash2,
  ChevronDown,
  Check,
} from 'lucide-react';
import { PACKAGES, ADDONS, AddonItem } from '@/data/packages';
import { OrderStatusModal } from '@/components/OrderStatusModal';

const fmt = (num: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);

export function GlobalCart() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [addons, setAddons] = useState<Record<string, number>>({});
  const [existingSite, setExistingSite] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [contactError, setContactError] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalStatus, setOrderModalStatus] = useState<'loading' | 'success' | 'cancelled'>('loading');
  const [waOrderUrl, setWaOrderUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [rememberDetails, setRememberDetails] = useState(true);
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  /* ── Sync cart from localStorage ── */
  const syncCartFromStorage = () => {
    try {
      const saved = localStorage.getItem('swd-cart');
      if (saved) {
        const p = JSON.parse(saved);
        if (typeof p?.pkg === 'string') setSelectedPkg(p.pkg);
        else if (p?.pkg === null) setSelectedPkg(null);
        if (p?.add && typeof p.add === 'object') setAddons(p.add);
        else if (!p?.add) setAddons({});
        if (typeof p?.existingSite === 'string') setExistingSite(p.existingSite);
        if (typeof p?.clientName === 'string') setClientName(p.clientName);
        if (typeof p?.clientEmail === 'string') setClientEmail(p.clientEmail);
        if (typeof p?.clientPhone === 'string') setClientPhone(p.clientPhone);
      } else {
        setSelectedPkg(null);
        setAddons({});
      }
      const rem = localStorage.getItem('swd-remember-profile');
      if (rem === 'false') setRememberDetails(false);
      const prof = localStorage.getItem('swd-client-profile');
      if (prof && rem !== 'false') {
        const q = JSON.parse(prof);
        if (q?.name && !clientName) setClientName(q.name);
        if (q?.email && !clientEmail) setClientEmail(q.email);
        if (q?.phone && !clientPhone) setClientPhone(q.phone);
        if (q?.existingSite && !existingSite) setExistingSite(q.existingSite);
      }
    } catch (_) {}
  };

  useEffect(() => {
    syncCartFromStorage();
    const onChange = () => syncCartFromStorage();
    const onOpen = () => setCartOpen(true);
    const onClose = () => setCartOpen(false);
    window.addEventListener('swd-cart-change', onChange);
    window.addEventListener('storage', onChange);
    window.addEventListener('swd-open-cart', onOpen);
    window.addEventListener('swd-close-cart', onClose);
    return () => {
      window.removeEventListener('swd-cart-change', onChange);
      window.removeEventListener('storage', onChange);
      window.removeEventListener('swd-open-cart', onOpen);
      window.removeEventListener('swd-close-cart', onClose);
    };
  }, []);

  /* ── Background scroll lock (iOS & desktop safe) + Escape key ── */
  useEffect(() => {
    if (!cartOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;

    // Pause Lenis smooth scrolling so wheel/trackpad events inside drawer scroll natively
    lenis?.stop?.();

    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCartOpen(false); };
    window.addEventListener('keydown', onKey);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', onKey);
      lenis?.start?.();
    };
  }, [cartOpen]);

  /* ── Detect scroll clearance for "Scroll down for details" prompt ── */
  const checkScroll = useCallback(() => {
    const el = scrollBodyRef.current;
    if (!el) return;
    const hasMore = el.scrollHeight - (el.scrollTop + el.clientHeight) > 20;
    setCanScrollDown(hasMore);
  }, []);

  useEffect(() => {
    if (!cartOpen) return;
    const el = scrollBodyRef.current;
    if (!el) return;

    checkScroll();
    const timer1 = setTimeout(checkScroll, 60);
    const timer2 = setTimeout(checkScroll, 200);
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [cartOpen, checkScroll, selectedPkg, addons]);

  /* ── Calculations ── */
  const calc = useMemo(() => {
    const pkgItem = PACKAGES.find((p) => p.id === selectedPkg);
    let totalOneTime = pkgItem?.price || 0;
    let monthly = 0;
    const activeAddons: { item: AddonItem; qty: number }[] = [];
    ADDONS.forEach((addon) => {
      const qty = addons[addon.id] || 0;
      if (qty > 0) {
        activeAddons.push({ item: addon, qty });
        if (addon.monthly) monthly += addon.price * qty;
        else totalOneTime += addon.price * qty;
      }
    });
    const itemCount = (pkgItem ? 1 : 0) + activeAddons.reduce((s, a) => s + a.qty, 0);
    return { pkgItem, totalOneTime, monthly, activeAddons, itemCount };
  }, [selectedPkg, addons]);

  /* ── Cart mutations ── */
  const persist = (pkg: string | null, add: Record<string, number>) => {
    try {
      localStorage.setItem('swd-cart', JSON.stringify({ pkg, add, existingSite, clientName, clientEmail, clientPhone }));
      window.dispatchEvent(new Event('swd-cart-change'));
    } catch (_) {}
  };

  const removePackage = () => { setSelectedPkg(null); persist(null, addons); };

  const updateAddonQty = (id: string, delta: number) => {
    const next = Math.max(0, (addons[id] || 0) + delta);
    const updated = { ...addons };
    if (next === 0) delete updated[id]; else updated[id] = next;
    setAddons(updated);
    persist(selectedPkg, updated);
  };

  const clearCart = () => {
    setSelectedPkg(null); setAddons({});
    try { localStorage.removeItem('swd-cart'); window.dispatchEvent(new Event('swd-cart-change')); } catch (_) {}
    setCartOpen(false);
  };

  const handleToggleRemember = (next: boolean) => {
    setRememberDetails(next);
    try {
      localStorage.setItem('swd-remember-profile', String(next));
      if (!next) {
        localStorage.removeItem('swd-client-profile');
      } else {
        localStorage.setItem(
          'swd-client-profile',
          JSON.stringify({ name: clientName, email: clientEmail, phone: clientPhone, existingSite })
        );
      }
    } catch (_) {}
  };

  /* ── Profile fields ── */
  const handleProfile = (field: 'name' | 'email' | 'phone' | 'site', val: string) => {
    const n = field === 'name' ? val : clientName;
    const e = field === 'email' ? val : clientEmail;
    const ph = field === 'phone' ? val : clientPhone;
    const s = field === 'site' ? val : existingSite;
    if (field === 'name') setClientName(val);
    if (field === 'email') setClientEmail(val);
    if (field === 'phone') setClientPhone(val);
    if (field === 'site') setExistingSite(val);
    try {
      if (rememberDetails) {
        localStorage.setItem('swd-client-profile', JSON.stringify({ name: n, email: e, phone: ph, existingSite: s }));
      } else {
        localStorage.removeItem('swd-client-profile');
      }
      localStorage.setItem('swd-cart', JSON.stringify({ pkg: selectedPkg, add: addons, existingSite: s, clientName: n, clientEmail: e, clientPhone: ph }));
    } catch (_) {}
  };

  /* ── WhatsApp message builder ── */
  const buildOrderMessage = () => {
    const lines = ['Hi ShivamWebDesigns, I would like to initiate an order for:', ''];
    if (calc.pkgItem) {
      lines.push(`• Package: ${calc.pkgItem.name} (${fmt(calc.pkgItem.price)})`);
      lines.push(`  Scope: ${calc.pkgItem.scope}`);
      lines.push(`  Delivery: ${calc.pkgItem.delivery}`);
    } else lines.push('• Package: None (Add-ons only order)');
    if (calc.activeAddons.length > 0) {
      lines.push('', 'Selected Add-ons:');
      calc.activeAddons.forEach(({ item, qty }) => lines.push(`  - ${item.name} (${fmt(item.price)}${item.monthly ? '/mo' : ''}) x ${qty}`));
    }
    if (clientName) lines.push('', `Client Name: ${clientName}`);
    if (clientEmail) lines.push(`Client Email: ${clientEmail}`);
    if (clientPhone) lines.push(`Client Phone/WA: ${clientPhone}`);
    if (existingSite) lines.push(`Existing Website: ${existingSite}`);
    lines.push('', `Estimated Total: ${fmt(calc.totalOneTime)}${calc.monthly > 0 ? ` + ${fmt(calc.monthly)} / month` : ''}`);
    lines.push('', 'Please confirm and share the next steps.');
    return lines.join('\n');
  };

  /* ── Dispatch order ── */
  const handleDispatchOrder = async () => {
    if (calc.itemCount === 0 || isSubmitting) return;
    const name = clientName.trim(), email = clientEmail.trim(), phone = clientPhone.trim();
    if (!name || !email || !phone) {
      setContactError('Please enter your Name, Email, and Phone to proceed.');
      if (!name) {
        document.getElementById('cart-name')?.focus();
        document.getElementById('cart-name')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (!email) {
        document.getElementById('cart-email')?.focus();
        document.getElementById('cart-email')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (!phone) {
        document.getElementById('cart-phone')?.focus();
        document.getElementById('cart-phone')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setContactError('Please enter a valid email address.');
      document.getElementById('cart-email')?.focus();
      document.getElementById('cart-email')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    if (phone.replace(/\D/g, '').length < 8) {
      setContactError('Please enter a valid phone or WhatsApp number.');
      document.getElementById('cart-phone')?.focus();
      document.getElementById('cart-phone')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    setContactError(''); setIsSubmitting(true);
    const orderText = buildOrderMessage();
    const waUrl = `https://wa.me/917861965480?text=${encodeURIComponent(orderText)}`;
    setWaOrderUrl(waUrl);
    setOrderModalStatus('loading'); setOrderModalOpen(true); setCartOpen(false);
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject: `[Package Order] ${calc.pkgItem ? `${calc.pkgItem.name} Package` : 'Add-ons Only'} (${fmt(calc.totalOneTime)}) - ${name}`, message: orderText }),
      });
    } catch (_) {}
    setTimeout(() => {
      try { window.open(waUrl, '_blank', 'noopener,noreferrer'); } catch (_) {}
      setIsSubmitting(false); setOrderModalStatus('success');
    }, 700);
  };

  /* ══════════════════════════════════════════════════════════
     RENDER — Drawer only, no floating widget
  ══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Backdrop — subtle dim, page visible behind drawer ── */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
        onTouchMove={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      {/* ── Cart Drawer — slides in from RIGHT edge ── */}
      <div
        data-lenis-prevent
        className={`fixed inset-y-0 right-0 w-full sm:w-[460px] z-[9999] bg-neutral-950 border-l border-neutral-800/80 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ height: '100dvh', maxHeight: '100dvh', boxShadow: '-24px 0 80px rgba(0,0,0,0.9)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Your Orders"
      >

        {/* ── Drawer Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800/80 bg-black/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-none tracking-tight">
                Your Orders
              </h2>
              <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                {calc.itemCount === 0
                  ? 'No items yet'
                  : `${calc.itemCount} ${calc.itemCount === 1 ? 'item' : 'items'} · ${fmt(calc.totalOneTime)}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/40 hover:bg-red-500/20 text-red-400 hover:text-red-200 border border-red-900/50 hover:border-red-500/60 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm hover:shadow-[0_0_16px_rgba(239,68,68,0.25)] flex-shrink-0 cursor-pointer [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80"
            aria-label="Close orders panel"
            title="Close"
          >
            {/* 3D Flipping X Icon */}
            <div
              aria-hidden="true"
              className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)] group-active:[transform:rotateY(360deg)]"
            >
              <X className="w-4 h-4 stroke-[2.2] transition-colors duration-200" />
            </div>
          </button>
        </div>

        {/* ── Relative Scroll Area with Floating Scroll-Down Helper ── */}
        <div className="relative flex-1 min-h-0 flex flex-col">
          {/* ── Scrollable Body ── */}
          <div
            ref={scrollBodyRef}
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-5 py-4 space-y-4 drawer-scrollbar overscroll-contain"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
          >

            {/* Empty State */}
            {calc.itemCount === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-400">Your cart is empty</p>
                  <p className="text-xs text-neutral-600 mt-1 font-mono">Add a package or add-ons to get started.</p>
                </div>
                <Link
                  href="/packages"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-xl px-5 py-2.5 transition-all active:scale-95 shadow-md shadow-white/10"
                >
                  <span>Browse Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* ── Selected Package ── */}
            {calc.pkgItem && (
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                        Base Package
                      </span>
                      {calc.pkgItem.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-black">
                          {calc.pkgItem.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {calc.pkgItem.name} Package
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed line-clamp-2">
                      {calc.pkgItem.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-mono font-bold text-white block">
                      {fmt(calc.pkgItem.price)}
                    </span>
                    <button
                      type="button"
                      onClick={removePackage}
                      className="text-[10px] font-mono text-neutral-600 hover:text-rose-400 transition-colors mt-1 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 pt-2 border-t border-neutral-800/60 text-[11px] font-mono text-neutral-500">
                  <span>Scope: <span className="text-neutral-300">{calc.pkgItem.scope}</span></span>
                  <span>Delivery: <span className="text-neutral-300">{calc.pkgItem.delivery}</span></span>
                </div>
              </div>
            )}

            {/* ── Add-ons ── */}
            {calc.activeAddons.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 block px-0.5">
                  Add-on Services
                </span>
                {calc.activeAddons.map(({ item, qty }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-neutral-900/40 border border-neutral-800/60 rounded-xl px-3 py-2.5 gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-white block leading-tight truncate">{item.name}</span>
                      <span className="text-[10px] font-mono text-neutral-500 block mt-0.5">
                        {fmt(item.price)}{item.monthly ? '/mo' : ' one-time'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center bg-black/60 border border-neutral-800/60 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateAddonQty(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-white select-none">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateAddonQty(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-mono text-xs font-bold text-white w-14 text-right">
                        {fmt(item.price * qty)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Client Profile ── */}
            {calc.itemCount > 0 && (
              <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Your Details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="cart-name" className="text-[10px] font-mono text-neutral-400 block mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="cart-name"
                      name="name"
                      type="text"
                      value={clientName}
                      autoComplete="name"
                      inputMode="text"
                      onChange={(e) => handleProfile('name', e.target.value)}
                      onFocus={(e) => {
                        setTimeout(() => {
                          e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 80);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const nextEl = document.getElementById('cart-phone');
                          nextEl?.focus();
                          nextEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                      }}
                      placeholder="e.g. John Doe"
                      className="w-full bg-black/60 border border-neutral-800/80 rounded-lg px-3 py-2 text-[16px] sm:text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label htmlFor="cart-phone" className="text-[10px] font-mono text-neutral-400 block mb-1">
                      Phone / WhatsApp <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="cart-phone"
                      name="tel"
                      type="tel"
                      value={clientPhone}
                      autoComplete="tel"
                      inputMode="tel"
                      onChange={(e) => handleProfile('phone', e.target.value)}
                      onFocus={(e) => {
                        setTimeout(() => {
                          e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 80);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const nextEl = document.getElementById('cart-email');
                          nextEl?.focus();
                          nextEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                      }}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-black/60 border border-neutral-800/80 rounded-lg px-3 py-2 text-[16px] sm:text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="cart-email" className="text-[10px] font-mono text-neutral-400 block mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="cart-email"
                      name="email"
                      type="email"
                      value={clientEmail}
                      autoComplete="email"
                      inputMode="email"
                      onChange={(e) => handleProfile('email', e.target.value)}
                      onFocus={(e) => {
                        setTimeout(() => {
                          e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 80);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const nextEl = document.getElementById('cart-site');
                          nextEl?.focus();
                          nextEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                      }}
                      placeholder="e.g. john@business.com"
                      className="w-full bg-black/60 border border-neutral-800/80 rounded-lg px-3 py-2 text-[16px] sm:text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Existing Website */}
                  <div className="sm:col-span-2">
                    <label htmlFor="cart-site" className="text-[10px] font-mono text-neutral-400 block mb-1">
                      Existing Website <span className="text-neutral-600">(Optional)</span>
                    </label>
                    <input
                      id="cart-site"
                      name="url"
                      type="url"
                      value={existingSite}
                      autoComplete="url"
                      inputMode="url"
                      onChange={(e) => handleProfile('site', e.target.value)}
                      onFocus={(e) => {
                        setTimeout(() => {
                          e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 80);
                      }}
                      placeholder="e.g. https://mybrand.com"
                      className="w-full bg-black/60 border border-neutral-800/80 rounded-lg px-3 py-2 text-[16px] sm:text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>
                </div>

                {contactError && (
                  <p className="text-xs text-rose-400 font-mono leading-relaxed">{contactError}</p>
                )}

                {/* Remember details tick button */}
                <button
                  type="button"
                  onClick={() => handleToggleRemember(!rememberDetails)}
                  className="flex items-center gap-2 pt-1 text-left cursor-pointer group select-none"
                  aria-pressed={rememberDetails}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      rememberDetails
                        ? 'bg-emerald-500 border-emerald-400 text-black shadow-sm shadow-emerald-500/20'
                        : 'bg-neutral-900 border-neutral-700 text-transparent group-hover:border-neutral-500'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors">
                    Remember my details for next visit
                  </span>
                </button>
              </div>
            )}

            {/* Generous bottom clearance so all inputs and status indicators clear the fixed footer */}
            <div className="h-20" aria-hidden="true" />
          </div>

          {/* ── Floating 'Scroll down for details' pill whenever more content is below ── */}
          {canScrollDown && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none z-30 transition-all duration-300">
              <button
                type="button"
                onClick={() => {
                  const el = scrollBodyRef.current;
                  if (!el) return;
                  el.scrollBy({ top: 220, behavior: 'smooth' });
                }}
                className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/95 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-500 text-[11px] font-mono text-neutral-200 hover:text-white shadow-2xl backdrop-blur-md transition-all active:scale-95"
              >
                <span>Scroll down for details</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
              </button>
            </div>
          )}
        </div>

        {/* ── Drawer Footer — always visible ── */}
        {calc.itemCount > 0 && (
          <div className="flex-shrink-0 border-t border-neutral-800/80 bg-black/60 px-5 py-4 space-y-3">
            {/* Total row */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block">Estimated Total</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-mono font-extrabold text-white">{fmt(calc.totalOneTime)}</span>
                  {calc.monthly > 0 && (
                    <span className="text-[11px] font-mono text-neutral-500">+{fmt(calc.monthly)}/mo</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] font-mono text-neutral-600 hover:text-rose-400 transition-colors flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg hover:bg-neutral-900"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleDispatchOrder}
                disabled={isSubmitting}
                className="py-3 rounded-xl bg-white hover:bg-neutral-100 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-lg shadow-white/10 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Inquire
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Order Status Modal ── */}
      <OrderStatusModal
        isOpen={orderModalOpen}
        status={orderModalStatus}
        waUrl={waOrderUrl}
        onClose={() => setOrderModalOpen(false)}
        onBuyAgain={() => {
          setSelectedPkg(null); setAddons({}); setExistingSite('');
          setOrderModalOpen(false);
          try { localStorage.removeItem('swd-cart'); window.dispatchEvent(new Event('swd-cart-change')); } catch (_) {}
        }}
        onCancelOrder={() => setOrderModalStatus('cancelled')}
        onResumeCart={() => { setOrderModalOpen(false); setCartOpen(true); }}
      />
    </>
  );
}
