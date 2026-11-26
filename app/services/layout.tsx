import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering & Design Services',
  description:
    'Explore the design and engineering services offered by ShivamWebDesigns — Website Design, Frontend Development, UI/UX Architecture, Redesigns, and Maintenance.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
