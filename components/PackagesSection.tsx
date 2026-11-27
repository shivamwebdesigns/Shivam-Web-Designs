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
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { OrderStatusModal } from '@/components/OrderStatusModal';

export interface PackageTier {
  id: 'starter' | 'growth' | 'pro';
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  scope: string;
  delivery: string;
  stackTags: string[];
  features: string[];
  recommended?: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: 'branding' | 'content' | 'maintenance';
  monthly?: boolean;
  badge?: string;
}

const PACKAGES: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'A digital profile page & quick identity launch',
    price: 499,
    scope: '1 scrolling page',
    delivery: '1–2 days',
    stackTags: ['HTML5 Semantic', 'Mobile First', 'Free Subdomain', 'Fast CDN'],
    features: [
      'Mobile-first custom responsive design',
      'Your logo, brand photos, bio & links',
      'Instant WhatsApp and direct call buttons',
      'Contact details, business hours & map location',
      'Live on a free high-speed subdomain',
      '3 free revision rounds included',
      '7 days dedicated post-launch support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'A complete one-page business flagship',
    price: 999,
    badge: 'Popular Package',
    recommended: true,
    scope: '1 page, 4–5 sections',
    delivery: '3–5 days',
    stackTags: ['Flagship UI', 'Lead Engine', 'Custom Domain', 'SEO Standard'],
    features: [
      'Everything included in Starter',
      'Hero, about, services, gallery & contact sections',
      'Lead inquiry form with instant email alerts',
      'Search engine basics: meta titles & descriptions',
      'Your own custom domain connected (.com, .in, etc.)',
      '3 free revision rounds included',
      '15 days dedicated post-launch support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'A high-performance multi-page digital flagship',
    price: 1499,
    scope: 'Up to 3 full pages',
    delivery: '5–7 days',
    stackTags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Spatial 3D Matrix', 'PWA Ready'],
    features: [
      'Everything included in Growth',
      'Up to 3 bespoke pages (Home, Services, Case Studies)',
      'Sub-second edge speed & 100/100 Core Web Vitals',
      'Google Analytics 4 setup & conversion event routing',
      'Full XML sitemap & search console indexation',
      'Free subdomain setup included (Saves ₹149)',
      '3 free revision rounds included',
      '30 days dedicated post-launch support',
    ],
  },
];

const ADDONS: AddonItem[] = [
  {
    id: 'subdomain',
    name: 'Free subdomain and setup',
    desc: 'We configure DNS, SSL, and launch your site on a free subdomain',
    price: 149,
    category: 'branding',
    badge: 'Free with Pro',
  },
  {
    id: 'logo',
    name: 'Logo design',
    desc: 'A clean, modern brand logo and vector identity for your business',
    price: 99,
    category: 'branding',
    badge: 'From ₹99',
  },
  {
    id: 'copy',
    name: 'Copywriting, per page',
    desc: 'Compelling, conversion-focused marketing copy written for one page',
    price: 199,
    category: 'content',
  },
  {
    id: 'rev',
    name: 'Extra revisions',
    desc: '3 rounds included free, then per additional feedback cycle',
    price: 199,
    category: 'content',
  },
  {
    id: 'page',
    name: 'Extra page',
    desc: 'Add another fully custom, responsive page to your web project',
    price: 299,
    category: 'content',
  },
  {
    id: 'maint',
    name: 'Monthly maintenance',
    desc: 'Continuous security patches, automated backups, and bug fixes',
    price: 299,
    category: 'maintenance',
    monthly: true,
    badge: 'Ongoing',
  },
];

const FAQS = [
  {
    q: 'What does each package price include?',
    a: 'Design, hand-crafted frontend development, responsive tuning, domain/subdomain connection, and the dedicated post-launch support period listed. There are zero hidden fees.',
  },
  {
    q: 'Can I order just add-ons if I already have a website?',
    a: 'Yes, absolutely! You can choose any add-ons (like Logo Design for ₹99, Copywriting, or Subdomain Setup) without selecting a package. Just paste your website link in the cart box so we can review your existing website.',
  },
  {
    q: 'How does payment and milestone billing work?',
    a: 'Starter is paid upon kickoff. Growth and Pro follow a 50% upfront commitment and 50% final settlement prior to production DNS launch. Final source code and credentials are transferred upon full clearance.',
  },
  {
    q: 'How do revision cycles work?',
    a: 'Every package includes 3 structured revision rounds free of charge. A round consists of your consolidated feedback items. Extra rounds can be added for ₹199.',
  },
  {
    q: 'Do I retain 100% ownership of my website?',
    a: 'Yes. Upon final settlement, all custom frontend source code, design assets, and content are assigned 100% to you without restrictive vendor lock-in.',
  },
  {
    q: 'What content do I need to provide?',
    a: 'Please share your logo, photos, and basic text. If you need assistance with brand writing or logo creation, our add-ons start at just ₹99.',
  },
  {
    q: 'I need something custom or enterprise. What now?',
    a: 'For custom web applications or multi-page flagships, visit our Start a Project page to submit a tailored brief.',
  },
];

interface PackagesSectionProps {
  isPage?: boolean;
}

export function PackagesSection({ isPage = false }: PackagesSectionProps) {
  const [selectedPkg, setSelectedPkg] = useState<'starter' | 'growth' | 'pro' | null>(null);
  const [addons, setAddons] = useState<{ [id: string]: number }>({});
  const [existingSite, setExistingSite] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [contactError, setContactError] = useState('');
  const [isCartHidden, setIsCartHidden] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalStatus, setOrderModalStatus] = useState<'loading' | 'success' | 'cancelled'>('loading');
  const [waOrderUrl, setWaOrderUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cartContainerRef = useRef<HTMLDivElement>(null);

  // Restore cart and contact from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('swd-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.pkg && ['starter', 'growth', 'pro'].includes(parsed.pkg)) {
          setSelectedPkg(parsed.pkg);
        }
        if (parsed.existingSite && typeof parsed.existingSite === 'string') {
          setExistingSite(parsed.existingSite);
        }
        if (parsed.add && typeof parsed.add === 'object') {
          setAddons(parsed.add);
        }
        if (parsed.clientName && typeof parsed.clientName === 'string') {
          setClientName(parsed.clientName);
        }
        if (parsed.clientEmail && typeof parsed.clientEmail === 'string') {
          setClientEmail(parsed.clientEmail);
        }
        if (parsed.clientPhone && typeof parsed.clientPhone === 'string') {
          setClientPhone(parsed.clientPhone);
        }
      }
    } catch (_) {}
  }, []);

  // Save cart and contact to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'swd-cart',
        JSON.stringify({
          pkg: selectedPkg,
          add: addons,
          existingSite,
          clientName,
          clientEmail,
          clientPhone,
        })
      );
    } catch (_) {}
  }, [selectedPkg, addons, existingSite, clientName, clientEmail, clientPhone]);

  // Pricing calculations
  const calc = useMemo(() => {
    const pkgItem = selectedPkg ? PACKAGES.find((p) => p.id === selectedPkg) : null;
    let addSub = 0;
    let monthly = 0;
    let qAll = 0;

    Object.entries(addons).forEach(([id, qty]) => {
      const item = ADDONS.find((a) => a.id === id);
      if (!item || qty <= 0) return;
      qAll += qty;
      if (item.monthly) {
        monthly += item.price * qty;
      } else {
        addSub += item.price * qty;
      }
    });

    // Pro perk: free subdomain setup if selected
    const freeSubdomain =
      selectedPkg === 'pro' && addons.subdomain
        ? ADDONS.find((a) => a.id === 'subdomain')?.price || 0
        : 0;

    // Bundle: 10% off add-ons when 2 or more add-on items are selected
    const bundleDiscount = qAll >= 2 ? Math.round((addSub - freeSubdomain) * 0.1) : 0;
    const basePrice = pkgItem ? pkgItem.price : 0;
    const totalOneTime = Math.max(0, basePrice + addSub - freeSubdomain - bundleDiscount);

    return {
      pkgItem,
      basePrice,
      addSub,
      monthly,
      qAll,
      freeSubdomain,
      bundleDiscount,
      totalDiscounts: freeSubdomain + bundleDiscount,
      subtotal: basePrice + addSub,
      totalOneTime,
      itemCount: (pkgItem ? 1 : 0) + qAll,
    };
  }, [selectedPkg, addons]);

  const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  // Toggle package in cart
  const togglePackage = (pkgId: 'starter' | 'growth' | 'pro') => {
    setSelectedPkg((prev) => {
      const next = prev === pkgId ? null : pkgId;
      if (next) setIsCartHidden(false);
      return next;
    });
  };

  // Add / increment addon
  const addAddon = (id: string) => {
    setIsCartHidden(false);
    setAddons((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Decrement addon
  const decrementAddon = (id: string) => {
    setAddons((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  // Remove addon completely
  const removeAddon = (id: string) => {
    setAddons((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setSelectedPkg(null);
    setAddons({});
    setExistingSite('');
    setContactError('');
  };

  // Build formatted order message
  const buildOrderMessage = () => {
    const lines: string[] = [];

    if (!calc.pkgItem && Object.keys(addons).length === 0) {
      return 'Hi Shivam, I’d like to know more about your website packages and add-ons.';
    }

    if (calc.pkgItem) {
      lines.push('Hi Shivam, I’d like to order:', '');
      lines.push(`• ${calc.pkgItem.name} Package – ${fmt(calc.pkgItem.price)}`);
    } else {
      lines.push('Hi Shivam, I’d like to order standalone add-ons:', '');
    }

    Object.entries(addons).forEach(([id, qty]) => {
      const item = ADDONS.find((a) => a.id === id);
      if (!item || qty <= 0) return;
      lines.push(
        `• ${item.name}${qty > 1 ? ` × ${qty}` : ''} – ${fmt(item.price * qty)}${
          item.monthly ? ' / month' : ''
        }`
      );
    });

    if (clientName.trim() || clientEmail.trim() || clientPhone.trim()) {
      lines.push('', '*Client Contact Details:*');
      if (clientName.trim()) lines.push(`• Name: ${clientName.trim()}`);
      if (clientEmail.trim()) lines.push(`• Email: ${clientEmail.trim()}`);
      if (clientPhone.trim()) lines.push(`• Phone: ${clientPhone.trim()}`);
    }

    if (existingSite.trim()) {
      lines.push('', `• Existing website: ${existingSite.trim()}`);
    }

    if (calc.totalDiscounts > 0) {
      lines.push('', 'Offers Applied:');
      if (calc.freeSubdomain > 0) {
        lines.push(`• Pro Perk: Subdomain setup free (−${fmt(calc.freeSubdomain)})`);
      }
      if (calc.bundleDiscount > 0) {
        lines.push(`• Bundle: 10% off add-ons (−${fmt(calc.bundleDiscount)})`);
      }
    }

    lines.push(
      '',
      `Total: ${fmt(calc.totalOneTime)}${
        calc.monthly > 0 ? ` + ${fmt(calc.monthly)} / month` : ''
      }`
    );
    lines.push('', 'Please confirm and share the next steps.');

    return lines.join('\n');
  };

  // Dual Dispatch: WhatsApp + Studio Admin API
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

    // Immediately open the animated order status modal in loading state
    setOrderModalStatus('loading');
    setOrderModalOpen(true);
    setCartOpen(false);

    // 1. Post to internal /api/contact for Firestore & Admin review
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

    // 2. Attempt WhatsApp dispatch and transition to success view
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
    <section
      id="packages"
      className={`relative bg-black text-white ${
        isPage ? 'pt-24 pb-16 sm:pt-28 sm:pb-24' : 'py-14 sm:py-20 border-t border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Package label follows the introductory copy */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          {isPage ? (
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
              Websites price starts from ₹499
            </h1>
          ) : (
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
              Websites price starts from ₹499
            </h2>
          )}
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Choose your favourite packages below. Mix and match modular add-ons or order standalone for your existing website. We review your order and reach out within 24–48 hours to confirm kickoff and next steps.
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-4">
            PACKAGES // FIXED PRICES
          </p>
        </div>

        {/* Main Layout Grid: Packages & Add-ons on Left, Sticky Cart on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Cards, Add-ons, FAQ */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* Package Cards 3D Deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <span>In Cart (Selected)</span>
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
                        className="w-full py-4 px-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-semibold text-white">{faq.q}</span>
                        <span className="font-mono text-neutral-400 text-base flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-900 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Cart Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <aside
              ref={cartContainerRef}
              className="bg-neutral-950/95 border border-neutral-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-6"
              aria-label="Your Cart Summary"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  <h3 className="text-base font-bold text-white tracking-tight">Your Cart</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-white text-black">
                    {calc.itemCount}
                  </span>
                </div>
                {calc.itemCount > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3 pr-1">
                {calc.itemCount === 0 ? (
                  <div className="text-center py-8 px-4 border border-dashed border-neutral-800 rounded-xl text-neutral-400 text-xs leading-relaxed">
                    Your cart is currently empty.
                    <br />
                    Pick a package or select add-ons to build your website order.
                  </div>
                ) : (
                  <>
                    {/* Selected Package Row */}
                    {calc.pkgItem && (
                      <div className="flex items-start justify-between p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 gap-3">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-white block">
                            {calc.pkgItem.name} Package
                          </span>
                          <span className="text-[11px] text-neutral-400 block">
                            {calc.pkgItem.scope}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-white">
                            {fmt(calc.pkgItem.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedPkg(null)}
                            className="text-neutral-400 hover:text-white p-1"
                            aria-label="Remove package"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Selected Add-ons */}
                    {Object.entries(addons).map(([id, qty]) => {
                      const item = ADDONS.find((a) => a.id === id);
                      if (!item || qty <= 0) return null;
                      const linePrice = item.price * qty;
                      const isFreePro = selectedPkg === 'pro' && id === 'subdomain';

                      return (
                        <div
                          key={id}
                          className="flex items-start justify-between p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 gap-3"
                        >
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-white block">
                              {item.name}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => decrementAddon(id)}
                                className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-neutral-800"
                                aria-label="Less"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-mono text-xs text-white px-1">{qty}</span>
                              <button
                                type="button"
                                onClick={() => addAddon(id)}
                                className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-neutral-800"
                                aria-label="More"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-white">
                              {isFreePro ? (
                                <span className="text-emerald-400">FREE</span>
                              ) : (
                                `${fmt(linePrice)}${item.monthly ? '/mo' : ''}`
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAddon(id)}
                              className="text-neutral-400 hover:text-white p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Client Contact Info */}
              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Your Contact Details</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (contactError) setContactError('');
                    }}
                    placeholder="Full Name"
                    className="w-full h-8 px-3 rounded-lg text-xs font-sans bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      if (contactError) setContactError('');
                    }}
                    placeholder="Email Address"
                    className="w-full h-8 px-3 rounded-lg text-xs font-sans bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      if (contactError) setContactError('');
                    }}
                    placeholder="Phone / WhatsApp Number"
                    className="w-full h-8 px-3 rounded-lg text-xs font-mono bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {contactError && (
                  <p className="text-[11px] font-mono text-red-400 bg-red-950/40 border border-red-900/50 rounded-md p-1.5 leading-tight">
                    {contactError}
                  </p>
                )}
              </div>

              {/* Already Have a Website Input */}
              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Already have a website?</span>
                  </div>
                  {existingSite.length > 3 && (
                    <span className="text-[10px] font-mono text-emerald-400">✓ Saved</span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 leading-tight">
                  Paste your URL so we can review your existing site for add-ons or updates:
                </p>
                <input
                  type="url"
                  value={existingSite}
                  onChange={(e) => setExistingSite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full h-8 px-3 rounded-lg text-xs font-mono bg-black border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Explicit Math Breakdown */}
              <div className="pt-4 border-t border-neutral-900 space-y-2 text-xs">
                {/* Base Package Line */}
                {calc.pkgItem && (
                  <div className="flex justify-between text-neutral-300">
                    <span>{calc.pkgItem.name} Package</span>
                    <span className="font-mono font-semibold">{fmt(calc.basePrice)}</span>
                  </div>
                )}

                {/* Add-ons line with explicit '+' sign */}
                {calc.addSub > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span>
                      + Add-ons ({calc.qAll} item{calc.qAll > 1 ? 's' : ''})
                    </span>
                    <span className="font-mono font-bold text-white">+{fmt(calc.addSub)}</span>
                  </div>
                )}

                {/* Discounts with explicit '−' sign */}
                {calc.totalDiscounts > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>− Offers applied</span>
                    <span className="font-mono font-bold">−{fmt(calc.totalDiscounts)}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-dashed border-neutral-800 pt-2" />

                {/* Grand Total */}
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-sm font-bold text-white">Total Amount</span>
                  <span className="font-mono text-2xl font-extrabold text-white">
                    {fmt(calc.totalOneTime)}
                  </span>
                </div>

                {calc.monthly > 0 && (
                  <p className="text-[11px] text-neutral-400 font-mono text-right">
                    Plus {fmt(calc.monthly)} / month for maintenance.
                  </p>
                )}
              </div>

              {/* Order Submission CTA */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleDispatchOrder}
                  disabled={calc.itemCount === 0 || isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                    calc.itemCount === 0
                      ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed opacity-60'
                      : 'bg-white text-black hover:bg-neutral-200 shadow-white/10'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Cart on WhatsApp</span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Minimized Floating Pill when Cart is Hidden on Mobile - ONLY if items in cart */}
      {calc.itemCount > 0 && isCartHidden && (
        <div className="lg:hidden fixed bottom-16 right-4 z-40 animate-fade-in">
          <button
            type="button"
            onClick={() => {
              setIsCartHidden(false);
              setCartOpen(true);
            }}
            className="h-10 px-4 bg-white text-black rounded-full shadow-2xl shadow-black flex items-center gap-2 font-mono text-xs font-bold transition-all active:scale-95 border border-neutral-300"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-black" />
            <span>View Cart &gt;</span>
            <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
              {calc.itemCount}
            </span>
          </button>
        </div>
      )}

      {/* Floating Bottom Bar on Mobile Devices (Expanded) - ONLY if items in cart */}
      {calc.itemCount > 0 && !isCartHidden && (
        <div className="lg:hidden fixed bottom-16 left-4 right-4 z-40 max-w-lg mx-auto animate-fade-in">
          <div className="w-full h-14 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-full px-4 py-2 flex items-center justify-between shadow-2xl shadow-black/95">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex-1 flex items-center justify-between pr-3 group text-left"
              aria-label="View Cart Summary"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                  {calc.itemCount}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {calc.itemCount} item{calc.itemCount > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {fmt(calc.totalOneTime)}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-white group-hover:underline flex items-center gap-1">
                View Cart &gt;
              </span>
            </button>

            {/* Dedicated Hide Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartHidden(true)}
              className="px-3 py-1.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 text-[11px] font-mono flex items-center gap-1 transition-colors border border-neutral-800 active:scale-95 flex-shrink-0"
              aria-label="Hide Cart"
              title="Hide Cart"
            >
              <span>Hide Cart</span>
              <span className="font-bold">&gt;</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Cart Sheet Drawer */}
      {cartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-neutral-950 border-t border-neutral-800 rounded-t-3xl max-h-[85vh] flex flex-col p-6 space-y-4 shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Cart Summary"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-white" />
                <h3 className="text-base font-bold text-white">Your Cart ({calc.itemCount})</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    setIsCartHidden(true);
                  }}
                  className="px-3 py-1 rounded-full border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-600 flex items-center gap-1 transition-colors"
                >
                  <span>Hide Cart</span>
                  <span className="font-bold">&gt;</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Items List */}
            <div className="space-y-3 divide-y divide-neutral-900">
              {calc.itemCount === 0 ? (
                <div className="text-center py-6 text-neutral-400 text-xs">Your cart is empty.</div>
              ) : (
                <>
                  {calc.pkgItem && (
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {calc.pkgItem.name} Package
                        </span>
                        <span className="text-[11px] text-neutral-400 block">
                          {calc.pkgItem.scope}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">
                          {fmt(calc.pkgItem.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedPkg(null)}
                          className="text-neutral-400 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {Object.entries(addons).map(([id, qty]) => {
                    const item = ADDONS.find((a) => a.id === id);
                    if (!item || qty <= 0) return null;
                    const linePrice = item.price * qty;
                    const isFreePro = selectedPkg === 'pro' && id === 'subdomain';

                    return (
                      <div key={id} className="flex justify-between items-center pt-2">
                        <div>
                          <span className="text-xs font-semibold text-white block">{item.name}</span>
                          <span className="text-[11px] text-neutral-400 block">Qty: {qty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white">
                            {isFreePro ? 'FREE' : fmt(linePrice)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeAddon(id)}
                            className="text-neutral-400 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Contact in Mobile */}
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Your Contact Details</span>
              </div>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (contactError) setContactError('');
                }}
                placeholder="Full Name"
                className="w-full h-8 px-3 rounded-lg text-xs font-sans bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none"
              />
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => {
                  setClientEmail(e.target.value);
                  if (contactError) setContactError('');
                }}
                placeholder="Email Address"
                className="w-full h-8 px-3 rounded-lg text-xs font-sans bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none"
              />
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => {
                  setClientPhone(e.target.value);
                  if (contactError) setContactError('');
                }}
                placeholder="Phone / WhatsApp Number"
                className="w-full h-8 px-3 rounded-lg text-xs font-mono bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none"
              />
              {contactError && (
                <p className="text-[11px] font-mono text-red-400 bg-red-950/40 border border-red-900/50 rounded-md p-1.5 leading-tight">
                  {contactError}
                </p>
              )}
            </div>

            {/* Existing Website in Mobile */}
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
              <span className="text-xs font-semibold text-white block">
                Already have a website?
              </span>
              <input
                type="url"
                value={existingSite}
                onChange={(e) => setExistingSite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full h-8 px-3 rounded-lg text-xs font-mono bg-black border border-neutral-800 text-white placeholder-neutral-400 focus:outline-none"
              />
            </div>

            {/* Explicit Arithmetic Math in Mobile */}
            <div className="pt-3 border-t border-neutral-900 space-y-1.5 text-xs">
              {calc.pkgItem && (
                <div className="flex justify-between text-neutral-300">
                  <span>{calc.pkgItem.name} Package</span>
                  <span className="font-mono">{fmt(calc.basePrice)}</span>
                </div>
              )}
              {calc.addSub > 0 && (
                <div className="flex justify-between text-neutral-300">
                  <span>+ Add-ons ({calc.qAll} items)</span>
                  <span className="font-mono font-bold text-white">+{fmt(calc.addSub)}</span>
                </div>
              )}
              {calc.totalDiscounts > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>− Offers applied</span>
                  <span className="font-mono font-bold">−{fmt(calc.totalDiscounts)}</span>
                </div>
              )}
              <div className="border-t border-dashed border-neutral-800 pt-2 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="font-mono text-xl font-extrabold text-white">
                  {fmt(calc.totalOneTime)}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleDispatchOrder}
              disabled={calc.itemCount === 0 || isSubmitting}
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black shadow-lg"
            >
              Send Cart on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Order Status & Confirmation Modal */}
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
        }}
        onCancelOrder={() => setOrderModalStatus('cancelled')}
        onResumeCart={() => {
          setOrderModalOpen(false);
          setCartOpen(true);
        }}
      />
    </section>
  );
}
