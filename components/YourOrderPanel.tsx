'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';

export interface OrderItem {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface YourOrderPanelProps {
  isOpen: boolean;
  items: OrderItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  currency?: string; // e.g. 'INR', 'USD'
}

/**
 * TEMPLATE: a "Your Order" side panel.
 * The page behind stays visible but cannot scroll; only the items list scrolls.
 * Rename props / wire in your own cart state to match your project.
 */
export function YourOrderPanel({
  isOpen,
  items,
  onClose,
  onRemove,
  onCheckout,
  currency = 'INR',
}: YourOrderPanelProps) {
  // Stops the background page from scrolling while the panel is open
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  // Rendered in <body> so no parent transform/filter can trap the overlay
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Order"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col bg-neutral-950 border-l border-neutral-800 shadow-2xl shadow-black"
      >
        {/* Header (fixed) */}
        <header className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-neutral-900">
          <div className="flex items-center gap-2 text-white font-bold">
            <ShoppingBag className="w-4 h-4" />
            <span>Your Order</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close your order"
            title="Close"
            className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-950/40 hover:bg-red-500/20 text-red-400 hover:text-red-200 border border-red-900/50 hover:border-red-500/60 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm hover:shadow-[0_0_16px_rgba(239,68,68,0.25)] flex-shrink-0 cursor-pointer [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80"
          >
            {/* 3D Flipping X Icon */}
            <div
              aria-hidden="true"
              className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)] group-active:[transform:rotateY(360deg)]"
            >
              <X className="w-4 h-4 stroke-[2.2] transition-colors duration-200" />
            </div>
          </button>
        </header>

        {/* Items (the ONLY part that scrolls) */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4 space-y-3"
        >
          {items.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-10">
              Your order is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  {item.description && (
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className="text-sm font-mono text-white">{fmt(item.price)}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (fixed) */}
        <footer className="shrink-0 px-5 py-4 border-t border-neutral-900 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400">Total</span>
            <span className="font-mono font-bold text-white">{fmt(total)}</span>
          </div>
          <button
            type="button"
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm font-bold transition-colors"
          >
            Place order
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
