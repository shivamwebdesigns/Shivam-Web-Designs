'use client';

import dynamic from 'next/dynamic';

const GlobalCart = dynamic(() => import('@/components/GlobalCart').then((m) => m.GlobalCart), {
  ssr: false,
});
const BackToTop = dynamic(() => import('@/components/BackToTop').then((m) => m.BackToTop), {
  ssr: false,
});
const OrderSuccessToast = dynamic(
  () => import('@/components/OrderSuccessToast').then((m) => m.OrderSuccessToast),
  { ssr: false }
);
const IOSInstallPrompt = dynamic(
  () => import('@/components/IOSInstallPrompt').then((m) => m.IOSInstallPrompt),
  { ssr: false }
);
const ServiceWorkerRegister = dynamic(
  () => import('@/components/ServiceWorkerRegister').then((m) => m.ServiceWorkerRegister),
  { ssr: false }
);

/**
 * ClientOverlays
 * Bundles and lazily loads all client-only modals, drawers, prompts, and listeners
 * completely off the server rendering path and initial critical JS bundle.
 */
export function ClientOverlays() {
  return (
    <>
      <GlobalCart />
      <BackToTop />
      <OrderSuccessToast />
      <IOSInstallPrompt />
      <ServiceWorkerRegister />
    </>
  );
}
