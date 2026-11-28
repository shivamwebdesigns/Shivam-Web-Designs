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
            className="group relative flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600/80 text-neutral-300 hover:text-white transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md hover:shadow-black/60 flex-shrink-0 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
            />
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] font-medium text-neutral-400 group-hover:text-white transition-colors duration-200 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_rgba(248,113,113,0.8)] transition-all duration-300" />
              Close
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800/90 group-hover:bg-neutral-700 text-neutral-400 group-hover:text-neutral-200 border border-neutral-700/50 transition-colors">
              ESC
            </span>
            <div
              aria-hidden="true"
              className="relative w-6 h-6 rounded-full bg-neutral-800/90 group-hover:bg-neutral-700/90 border border-neutral-700/60 group-hover:border-neutral-500/80 flex items-center justify-center transition-all duration-200 flex-shrink-0"
            >
              <span className="absolute w-2.5 h-[1.5px] bg-neutral-300 group-hover:bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-[3px] group-hover:translate-y-0 group-hover:rotate-45" />
              <span className="absolute w-2.5 h-[1.5px] bg-neutral-300 group-hover:bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[3px] group-hover:translate-y-0 group-hover:-rotate-45" />
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
