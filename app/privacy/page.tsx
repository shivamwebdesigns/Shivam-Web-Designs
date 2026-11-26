import type { Metadata } from 'next';
import { LegalHub } from '@/components/LegalHub';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for ShivamWebDesigns. Minimal, honest data collection with zero third-party advertising tracking.',
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return <LegalHub initialTab="privacy" />;
}
