import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Share your project goals with ShivamWebDesigns through the project inquiry form.',
  alternates: { canonical: '/start-project' },
};

export default function StartProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}