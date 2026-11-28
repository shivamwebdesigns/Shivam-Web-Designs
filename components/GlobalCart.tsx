'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Check,
  Plus,
  Minus,
  X,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Globe,
  MessageSquare,
  Zap,
  GripVertical,
  Trash2,
} from 'lucide-react';
import { PACKAGES, ADDONS, PackageTier, AddonItem } from '@/data/packages';
import { siteConfig } from '@/data/siteConfig';
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
  const [cartWindowOpen, setCartWindowOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalStatus, setOrderModalStatus] = useState<'loading' | 'success' | 'cancelled'>('loading');
  const [waOrderUrl, setWaOrderUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Movable Floating Widget States
  const [widgetPos, setWidgetPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Sync cart from Local DB (localStorage)
  const syncCartFromStorage = () => {
    try {
      const saved = localStorage.getItem('swd-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed?.pkg === 'string') setSelectedPkg(parsed.pkg);
        else if (parsed?.pkg === null) setSelectedPkg(null);

        if (parsed?.add && typeof parsed.add === 'object') setAddons(parsed.add);
        else if (!parsed?.add) setAddons({});

        if (typeof parsed?.existingSite === 'string') setExistingSite(parsed.existingSite);
        if (typeof parsed?.clientName === 'string') setClientName(parsed.clientName);
        if (typeof parsed?.clientEmail === 'string') setClientEmail(parsed.clientEmail);
        if (typeof parsed?.clientPhone === 'string') setClientPhone(parsed.clientPhone);
      } else {
        setSelectedPkg(null);
        setAddons({});
      }

      // Check persistent profile
      const savedProfile = localStorage.getItem('swd-client-profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p?.name && !clientName) setClientName(p.name);
        if (p?.email && !clientEmail) setClientEmail(p.email);
        if (p?.phone && !clientPhone) setClientPhone(p.phone);
        if (p?.existingSite && !existingSite) setExistingSite(p.existingSite);
      }
    } catch (_) {}
  };

  useEffect(() => {
    syncCartFromStorage();

    // Restore desktop widget dragged position
    try {
      const savedPos = sessionStorage.getItem('swd-widget-pos');
      if (savedPos && typeof window !== 'undefined' && window.innerWidth >= 640) {
        const parsed = JSON.parse(savedPos);
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          setWidgetPos(parsed);
        }
      }
    } catch (_) {}

    const handleCartChangeEvent = () => syncCartFromStorage();
    const handleOpenCartEvent = () => setCartWindowOpen(true);
    const handleCloseCartEvent = () => setCartWindowOpen(false);

    window.addEventListener('swd-cart-change', handleCartChangeEvent);
    window.addEventListener('storage', handleCartChangeEvent);
    window.addEventListener('swd-open-cart', handleOpenCartEvent);
    window.addEventListener('swd-close-cart', handleCloseCartEvent);

    return () => {
      window.removeEventListener('swd-cart-change', handleCartChangeEvent);
      window.removeEventListener('storage', handleCartChangeEvent);
      window.removeEventListener('swd-open-cart', handleOpenCartEvent);
      window.removeEventListener('swd-close-cart', handleCloseCartEvent);
    };
  }, []);

  // Body scroll locking when Cart Modal is active
  useEffect(() => {
    if (cartWindowOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setCartWindowOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = origOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [cartWindowOpen]);

  // Window resize handler for desktop movable widget bounds
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Use responsive bottom dock on mobile
        setWidgetPos(null);
      } else if (widgetPos && widgetRef.current) {
        const widgetWidth = widgetRef.current.offsetWidth || 380;
        const widgetHeight = widgetRef.current.offsetHeight || 130;
        const clampedX = Math.max(16, Math.min(window.innerWidth - widgetWidth - 16, widgetPos.x));
        const clampedY = Math.max(16, Math.min(window.innerHeight - widgetHeight - 16, widgetPos.y));
        if (clampedX !== widgetPos.x || clampedY !== widgetPos.y) {
          setWidgetPos({ x: clampedX, y: clampedY });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [widgetPos]);

  // Drag handlers on desktop
  const handleDragMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
    if (!widgetRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = widgetRef.current.getBoundingClientRect();
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: rect.left,
      initY: rect.top,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !widgetRef.current) return;
      e.preventDefault();
      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;

      const widgetWidth = widgetRef.current.offsetWidth || 380;
      const widgetHeight = widgetRef.current.offsetHeight || 130;

      const newX = Math.max(16, Math.min(window.innerWidth - widgetWidth - 16, dragStartRef.current.initX + deltaX));
      const newY = Math.max(16, Math.min(window.innerHeight - widgetHeight - 16, dragStartRef.current.initY + deltaY));

      setWidgetPos({ x: newX, y: newY });
      try {
        sessionStorage.setItem('swd-widget-pos', JSON.stringify({ x: newX, y: newY }));
      } catch (_) {}
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Calculations
  const calc = useMemo(() => {
    const pkgItem = PACKAGES.find((p) => p.id === selectedPkg);
    let totalOneTime = pkgItem?.price || 0;
    let monthly = 0;

    const activeAddons: { item: AddonItem; qty: number }[] = [];

    ADDONS.forEach((addon) => {
      const qty = addons[addon.id] || 0;
      if (qty > 0) {
        activeAddons.push({ item: addon, qty });
        if (addon.monthly) {
          monthly += addon.price * qty;
        } else {
          totalOneTime += addon.price * qty;
        }
      }
    });

    const itemCount = (pkgItem ? 1 : 0) + activeAddons.reduce((sum, a) => sum + a.qty, 0);

    return {
      pkgItem,
      totalOneTime,
      monthly,
      activeAddons,
      itemCount,
    };
  }, [selectedPkg, addons]);

  // Cart operations
  const updateCartState = (newPkg: string | null, newAddons: Record<string, number>) => {
    setSelectedPkg(newPkg);
    setAddons(newAddons);
    try {
      localStorage.setItem(
        'swd-cart',
        JSON.stringify({
          pkg: newPkg,
          add: newAddons,
          existingSite,
          clientName,
          clientEmail,
          clientPhone,
        })
      );
      window.dispatchEvent(new Event('swd-cart-change'));
    } catch (_) {}
  };

  const removePackage = () => {
    updateCartState(null, addons);
  };

  const updateAddonQty = (addonId: string, delta: number) => {
    const current = addons[addonId] || 0;
    const next = Math.max(0, current + delta);
    const updated = { ...addons };
    if (next === 0) {
      delete updated[addonId];
    } else {
      updated[addonId] = next;
    }
    updateCartState(selectedPkg, updated);
  };

  const clearCart = () => {
    setSelectedPkg(null);
    setAddons({});
    try {
      localStorage.removeItem('swd-cart');
      window.dispatchEvent(new Event('swd-cart-change'));
    } catch (_) {}
    setCartWindowOpen(false);
  };

  // Client profile changes
  const handleProfileChange = (field: 'name' | 'email' | 'phone' | 'site', val: string) => {
    let nextName = clientName;
    let nextEmail = clientEmail;
    let nextPhone = clientPhone;
    let nextSite = existingSite;

    if (field === 'name') {
      nextName = val;
      setClientName(val);
    } else if (field === 'email') {
      nextEmail = val;
      setClientEmail(val);
    } else if (field === 'phone') {
      nextPhone = val;
      setClientPhone(val);
    } else if (field === 'site') {
      nextSite = val;
      setExistingSite(val);
    }

    try {
      localStorage.setItem(
        'swd-client-profile',
        JSON.stringify({
          name: nextName,
          email: nextEmail,
          phone: nextPhone,
          existingSite: nextSite,
        })
      );
      localStorage.setItem(
        'swd-cart',
        JSON.stringify({
          pkg: selectedPkg,
          add: addons,
          existingSite: nextSite,
          clientName: nextName,
          clientEmail: nextEmail,
          clientPhone: nextPhone,
        })
      );
    } catch (_) {}
  };

  // Build WhatsApp order message
  const buildOrderMessage = () => {
    const lines = [
      'Hi ShivamWebDesigns, I would like to initiate an order for:',
      '',
    ];

    if (calc.pkgItem) {
      lines.push(`• Package: ${calc.pkgItem.name} (${fmt(calc.pkgItem.price)})`);
      lines.push(`  Scope: ${calc.pkgItem.scope}`);
      lines.push(`  Delivery: ${calc.pkgItem.delivery}`);
    } else {
      lines.push('• Package: None (Add-ons only order)');
    }

    if (calc.activeAddons.length > 0) {
      lines.push('', 'Selected Add-ons:');
      calc.activeAddons.forEach(({ item, qty }) => {
        lines.push(
          `  - ${item.name} (${fmt(item.price)}${item.monthly ? '/mo' : ''}) x ${qty}`
        );
      });
    }

    if (clientName) lines.push('', `Client Name: ${clientName}`);
    if (clientEmail) lines.push(`Client Email: ${clientEmail}`);
    if (clientPhone) lines.push(`Client Phone/WA: ${clientPhone}`);
    if (existingSite) lines.push(`Existing Website: ${existingSite}`);

    lines.push(
      '',
      `Estimated Total: ${fmt(calc.totalOneTime)}${
        calc.monthly > 0 ? ` + ${fmt(calc.monthly)} / month` : ''
      }`
    );
    lines.push('', 'Please confirm and share the next steps.');

    return lines.join('\n');
  };

  // Dispatch Order
  const handleDispatchOrder = async () => {
    if (calc.itemCount === 0 || isSubmitting) return;

    const trimmedName = clientName.trim();
    const trimmedEmail = clientEmail.trim();
    const trimmedPhone = clientPhone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setContactError('Please enter your Name, Email, and Phone number to proceed.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setContactError('Please enter a valid email address.');
      return;
    }

    if (trimmedPhone.replace(/\D/g, '').length < 8) {
      setContactError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    setContactError('');
    setIsSubmitting(true);
    const orderText = buildOrderMessage();
    const waUrl = `https://wa.me/917861965480?text=${encodeURIComponent(orderText)}`;
    setWaOrderUrl(waUrl);

    setOrderModalStatus('loading');
    setOrderModalOpen(true);
    setCartWindowOpen(false);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          subject: `[Package Order] ${
            calc.pkgItem ? `${calc.pkgItem.name} Package` : 'Add-ons Only'
          } (${fmt(calc.totalOneTime)}) - ${trimmedName}`,
          message: `${orderText}${
            existingSite ? `\n\nClient Existing Website:\n${existingSite}` : ''
          }`,
        }),
      });
    } catch (e) {
      console.warn('Order sync notice:', e);
    }

    setTimeout(() => {
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup notice:', err);
      }
      setIsSubmitting(false);
      setOrderModalStatus('success');
    }, 700);
  };

  return (
    <>
      {/* Movable Floating Cart Widget (Desktop & Mobile) - Persistent on screen until Cart Cleared */}
      {calc.itemCount > 0 && (
        <div
          ref={widgetRef}
          onMouseDown={handleDragMouseDown}
          onWheel={(e) => e.stopPropagation()}
          style={
            widgetPos && typeof window !== 'undefined' && window.innerWidth >= 640
              ? {
                  position: 'fixed',
                  left: `${widgetPos.x}px`,
                  top: `${widgetPos.y}px`,
                  bottom: 'auto',
                  right: 'auto',
                  zIndex: 9990,
                }
              : undefined
          }
          className={`fixed z-[9990] transition-shadow duration-200 select-none ${
            isDragging ? 'cursor-grabbing scale-[1.02] shadow-2xl shadow-emerald-500/10' : 'cursor-grab'
          } bottom-20 left-3 right-3 sm:left-auto sm:right-8 sm:bottom-8 sm:w-[380px] max-w-md mx-auto sm:mx-0 animate-fade-in`}
          aria-label="Floating Cart Widget"
        >
          <div className="bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800/90 hover:border-neutral-700/90 rounded-2xl p-4 shadow-2xl shadow-black/95 space-y-3">
            {/* Top Bar: Grip, Title, Count, Total */}
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-900">
              <div className="flex items-center gap-2.5">
                {/* Drag Grip Handle on Desktop */}
                <div
                  className="hidden sm:flex items-center text-neutral-500 hover:text-neutral-300 p-0.5 cursor-grab"
                  title="Click and drag to move anywhere on screen"
                >
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                  {calc.itemCount}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                      Your Cart
                    </span>
                    <span className="hidden sm:inline-block text-[9px] font-mono text-neutral-500 uppercase">
                      (Movable)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 block truncate max-w-[150px] sm:max-w-[180px]">
                    {calc.pkgItem?.name ? `${calc.pkgItem.name} Package` : 'Add-ons Selected'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-sm sm:text-base font-extrabold text-white block">
                  {fmt(calc.totalOneTime)}
                </span>
                {calc.monthly > 0 && (
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    +{fmt(calc.monthly)}/mo
                  </span>
                )}
              </div>
            </div>

            {/* Profile persistence notice */}
            {clientName && (
              <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-between px-0.5">
                <span>✓ Profile active: {clientName.split(' ')[0]}</span>
                <span className="text-neutral-500">Local DB</span>
              </div>
            )}

            {/* The Two Main Action Buttons: View Full Cart & Order */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCartWindowOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-neutral-700 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-white" />
                <span>View Cart</span>
              </button>

              <button
                type="button"
                onClick={handleDispatchOrder}
                disabled={isSubmitting}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 shadow-lg shadow-white/10 disabled:opacity-50"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated "Your Cart" Window Modal (Mobile & Desktop) */}
      {cartWindowOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCartWindowOpen(false);
          }}
        >
          <div
            className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col shadow-2xl shadow-black overflow-hidden animate-scale-up"
            role="dialog"
            aria-modal="true"
            aria-label="Your Cart Modal"
          >
            {/* Modal Window Top Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight leading-none">
                    Your Cart &amp; Order Spec
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400 mt-0.5 block">
                    {calc.itemCount} {calc.itemCount === 1 ? 'item' : 'items'} selected
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCartWindowOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                aria-label="Close cart window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Cart Content Area */}
            <div className="overflow-y-auto overscroll-contain flex-1 p-6 space-y-6">
              {/* Selected Package Breakdown */}
              {calc.pkgItem ? (
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                          Base Package
                        </span>
                        {calc.pkgItem.badge && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-white text-black">
                            {calc.pkgItem.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {calc.pkgItem.name} Package
                      </h4>
                      <p className="text-xs text-neutral-400">{calc.pkgItem.tagline}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-mono font-bold text-white block">
                        {fmt(calc.pkgItem.price)}
                      </span>
                      <button
                        type="button"
                        onClick={removePackage}
                        className="text-[11px] font-mono text-neutral-500 hover:text-rose-400 transition-colors mt-1 inline-flex items-center gap-1"
                        title="Remove package from cart"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
                    <div>Scope: <span className="text-white">{calc.pkgItem.scope}</span></div>
                    <div>Delivery: <span className="text-white">{calc.pkgItem.delivery}</span></div>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl p-5 text-center space-y-2">
                  <span className="text-xs font-mono text-neutral-400 block uppercase tracking-wider">
                    No Base Package Selected
                  </span>
                  <p className="text-xs text-neutral-400">
                    You can order add-ons alone, or browse our standard packages starting at ₹499.
                  </p>
                  <Link
                    href="/packages"
                    onClick={() => setCartWindowOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:underline pt-1"
                  >
                    <span>Browse Packages</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Selected Add-ons List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Selected Add-on Services ({calc.activeAddons.length})
                  </span>
                </div>

                {calc.activeAddons.length > 0 ? (
                  <div className="space-y-2">
                    {calc.activeAddons.map(({ item, qty }) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-3.5"
                      >
                        <div className="pr-3">
                          <span className="text-xs font-semibold text-white block">
                            {item.name}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400 block">
                            {fmt(item.price)} {item.monthly ? '/ month' : 'one-time'}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-neutral-800 rounded-lg bg-black/60 p-0.5">
                            <button
                              type="button"
                              onClick={() => updateAddonQty(item.id, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                              aria-label={`Decrease ${item.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs font-bold text-white">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateAddonQty(item.id, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                              aria-label={`Increase ${item.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-mono text-xs font-bold text-white min-w-[60px] text-right">
                            {fmt(item.price * qty)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 font-mono italic">
                    No extra services selected yet.
                  </p>
                )}
              </div>

              {/* Client Profile Input Form (Persisted to Local DB) */}
              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Your Information (Saved to Local DB)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Auto-saved
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-black/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      placeholder="e.g. john@business.com"
                      className="w-full bg-black/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-black/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      Existing Website Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={existingSite}
                      onChange={(e) => handleProfileChange('site', e.target.value)}
                      placeholder="e.g. https://mybrand.com"
                      className="w-full bg-black/80 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {contactError && (
                  <p className="text-xs text-rose-400 font-mono mt-2">{contactError}</p>
                )}
              </div>
            </div>

            {/* Modal Bottom Footer Actions */}
            <div className="px-6 py-4 border-t border-neutral-800 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-mono text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
                  title="Discard all items and clear cart"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cart</span>
                </button>

                <div className="text-right sm:text-left">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                    Estimated Total
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-mono font-extrabold text-white">
                      {fmt(calc.totalOneTime)}
                    </span>
                    {calc.monthly > 0 && (
                      <span className="text-xs font-mono text-neutral-400">
                        +{fmt(calc.monthly)}/mo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setCartWindowOpen(false)}
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors active:scale-95"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleDispatchOrder}
                  disabled={calc.itemCount === 0 || isSubmitting}
                  className="flex-1 sm:flex-none py-2.5 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-white/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>Inquire Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Status Feedback Modal */}
      <OrderStatusModal
        isOpen={orderModalOpen}
        status={orderModalStatus}
        waUrl={waOrderUrl}
        onClose={() => setOrderModalOpen(false)}
        onBuyAgain={() => {
          setSelectedPkg(null);
          setAddons({});
          setExistingSite('');
          setOrderModalOpen(false);
          try {
            localStorage.removeItem('swd-cart');
            window.dispatchEvent(new Event('swd-cart-change'));
          } catch (_) {}
        }}
        onCancelOrder={() => setOrderModalStatus('cancelled')}
        onResumeCart={() => {
          setOrderModalOpen(false);
          setCartWindowOpen(true);
        }}
      />
    </>
  );
}
