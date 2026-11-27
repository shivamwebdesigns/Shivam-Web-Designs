import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'The ShivamWebDesigns project portfolio is being updated. Check back soon for selected work.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col">
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
              Projects are updating soon.
            </h1>
            <p className="mt-6 text-lg text-neutral-400 font-light leading-relaxed">
              The project portfolio is being refreshed. Please check back soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
