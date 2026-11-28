'use client';

import { useEffect } from 'react';

/**
 * Locks background page scroll while `locked` is true.
 *
 * - Reference-counted: if the "Your Order" panel and the order-status modal
 *   are open at the same time, the page stays locked until BOTH are closed.
 * - Wheel / touch scrolling is blocked everywhere except inside elements
 *   marked `data-lenis-prevent` that live in an `aria-modal` dialog.
 *   Those events are hidden from Lenis (or any other window listener),
 *   so the dialog scrolls natively and the page behind never moves.
 */

type LenisLike = { stop?: () => void; start?: () => void };

const ALLOWED_SCROLL_AREA = '[aria-modal="true"] [data-lenis-prevent]';

let lockCount = 0;
let unlockFn: (() => void) | null = null;

function blockBackgroundScroll(e: Event) {
  const target = e.target as Element | null;

  if (target?.closest?.(ALLOWED_SCROLL_AREA)) {
    // Native scroll inside the dialog; keep smooth-scroll libraries out of it.
    e.stopPropagation();
    return;
  }

  if (e.cancelable) e.preventDefault();
  e.stopPropagation();
}

function lock() {
  const html = document.documentElement;
  const body = document.body;
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - html.clientWidth;
  const lenis = (window as unknown as { lenis?: LenisLike }).lenis;

  const prev = {
    htmlOverflow: html.style.overflow,
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    paddingRight: body.style.paddingRight,
  };

  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

  const opts = { passive: false, capture: true } as const;
  window.addEventListener('wheel', blockBackgroundScroll, opts);
  window.addEventListener('touchmove', blockBackgroundScroll, opts);

  // If Lenis is exposed on window (window.lenis), pause it too.
  lenis?.stop?.();

  unlockFn = () => {
    window.removeEventListener('wheel', blockBackgroundScroll, opts);
    window.removeEventListener('touchmove', blockBackgroundScroll, opts);

    html.style.overflow = prev.htmlOverflow;
    body.style.overflow = prev.overflow;
    body.style.position = prev.position;
    body.style.top = prev.top;
    body.style.left = prev.left;
    body.style.right = prev.right;
    body.style.width = prev.width;
    body.style.paddingRight = prev.paddingRight;

    window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
    lenis?.start?.();
  };
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) lock();
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        unlockFn?.();
        unlockFn = null;
      }
    };
  }, [locked]);
}
