import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, FileText, CheckCircle2, Mail } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service and Engagement for ShivamWebDesigns. Transparent milestone contracts, intellectual property transfer, and post-launch warranty.',
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-36 sm:pb-32 bg-black min-h-screen text-neutral-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white bg-neutral-900/70 border border-neutral-800 rounded-full transition-all duration-200 hover:border-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4 mb-10 pb-8 border-b border-neutral-900">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300">
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>LEGAL &amp; COMMERCIAL ENGAGEMENT TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
            <span>Effective Date: January 1, 2026</span>
            <span>&bull;</span>
            <span>Last Updated: November 25, 2026</span>
            <span>&bull;</span>
            <span>ShivamWebDesigns</span>
          </div>
        </div>

        {/* Summary Highlight Box */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl shadow-black/50">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-white">
                Engagement Philosophy: Clear Gates, Zero Ambiguity
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We partner with ambitious founders to build exceptional digital experiences. Our agreements are built on fixed milestones, 100% intellectual property transfer upon final settlement, and a guaranteed 30-day post-launch warranty.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Policy Content */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-neutral-300">
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              1. Scope of Services
            </h2>
            <p className="text-neutral-400">
              ShivamWebDesigns provides bespoke digital design, UI/UX architecture, frontend engineering, WebGL / 3D spatial development, and performance optimization. Each engagement is governed by an approved Statement of Work (SOW) or proposal specifying deliverables, milestone schedules, and investment tiers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              2. Intellectual Property Transfer
            </h2>
            <p className="text-neutral-400">
              Upon receipt of full and final payment, all custom design files, frontend source code, bespoke 3D assets, and project deliverables transfer 100% to the client. ShivamWebDesigns retains the right to display the completed work in its portfolio, case studies, and awards unless an explicit non-disclosure agreement (NDA) is executed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              3. Milestone Gates &amp; Payments
            </h2>
            <p className="text-neutral-400">
              Engagements are structured under milestone-based gates (typically 50% deposit upon kickoff, 25% upon design approval, and 25% prior to production code deployment). Invoices are payable within 14 days of presentation. Milestone sign-offs ensure continuous alignment before moving to subsequent development phases.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              4. 30-Day Post-Launch Warranty
            </h2>
            <p className="text-neutral-400">
              Every flagship build includes a complimentary 30-day post-launch warranty window. During this period, any browser rendering regressions, performance bottlenecks, or defects identified against the approved specifications are remediated immediately at zero added cost.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              5. Client Collaboration &amp; Timelines
            </h2>
            <p className="text-neutral-400">
              To ensure on-time delivery, clients agree to provide necessary assets, branding material, and feedback within reasonable review windows (typically 3 business days).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              6. Governing Jurisdiction
            </h2>
            <p className="text-neutral-400">
              These terms and any related agreements are governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
            </p>
          </section>

          {/* Legal Notice Card */}
          <section className="pt-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">
                Legal &amp; Contractual Notices
              </h3>
              <p className="text-sm text-neutral-400">
                For formal contract inquiries, statements of work, or NDA requests, contact studio leadership directly:
              </p>
              <div className="text-sm font-mono space-y-1 text-neutral-300">
                <p className="font-bold text-white">Shivam Purohit</p>
                <p className="text-neutral-400">Studio Lead &amp; Creative Director</p>
                <p className="text-neutral-400">ShivamWebDesigns</p>
                <p>Email: <a href="mailto:shivamwebdesigns23@gmail.com" className="text-white hover:underline">shivamwebdesigns23@gmail.com</a></p>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:shivamwebdesigns23@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold rounded-md hover:bg-neutral-200 transition-all active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Legal Notice</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
