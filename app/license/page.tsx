import type { Metadata } from 'next';
import { LegalHub } from '@/components/LegalHub';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'License',
  description:
    'Open source MIT License terms and conditions for ShivamWebDesigns software source code.',
  alternates: {
    canonical: `${siteConfig.url}/license`,
  },
};

export default function LicensePage() {
  return <LegalHub initialTab="license" />;
}
