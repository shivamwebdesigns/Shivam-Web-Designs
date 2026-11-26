import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selected Projects & Studio Flagships',
  description:
    'Explore production digital flagships, 3D spatial products, and engineering benchmarks crafted by ShivamWebDesigns.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
