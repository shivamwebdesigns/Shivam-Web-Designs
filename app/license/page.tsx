import type { Metadata } from 'next';
import { LegalHub } from '@/components/LegalHub';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Legal Documentation',
  description:
    'Studio legal documentation, licensing terms (MIT), privacy policy, and terms of service for ShivamWebDesigns.',
  alternates: {
    canonical: `${siteConfig.url}/license`,
  },
};

export default function LicensePage() {
  return <LegalHub initialTab="license" />;
}
