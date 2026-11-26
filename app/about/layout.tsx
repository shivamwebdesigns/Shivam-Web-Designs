import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Agency & Studio Dossier',
  description:
    'Learn about ShivamWebDesigns (SWD) — our philosophy, mission, values, and how we build bespoke digital flagships without agency overhead.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
