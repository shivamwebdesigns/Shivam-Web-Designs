import type { Metadata } from 'next';
import { founderData } from '@/data/founder';

export const metadata: Metadata = {
  title: `Founder Profile — ${founderData.name}`,
  description: `${founderData.name}, ${founderData.role} of ${founderData.company}. Discover his story, design philosophy, technical skills, and vision for the modern web.`,
  openGraph: {
    title: `${founderData.name} — Founder & CEO, ${founderData.company}`,
    description: founderData.intro,
    images: [{ url: founderData.image }],
  },
  alternates: { canonical: '/founder' },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
