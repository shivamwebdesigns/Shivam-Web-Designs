import type { Metadata } from 'next';
import { LegalHub } from '@/components/LegalHub';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for ShivamWebDesigns. Direct studio engagements, milestone delivery, full IP transfer, and post-launch warranty.',
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return <LegalHub initialTab="terms" />;
}
