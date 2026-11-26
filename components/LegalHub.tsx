'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Shield, FileText, Scale } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export type LegalTab = 'privacy' | 'terms' | 'license';

interface LegalHubProps {
  initialTab: LegalTab;
}

export function LegalHub({ initialTab }: LegalHubProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    // Update browser URL silently without reloading
    const newPath = tab === 'license' ? '/license' : tab === 'terms' ? '/terms' : '/privacy';
    window.history.replaceState(null, '', newPath);
    // Update document title dynamically
    const tabTitles: Record<LegalTab, string> = {
      privacy: `Privacy Policy | ${siteConfig.name}`,
      terms: `Terms of Service | ${siteConfig.name}`,
      license: `License | ${siteConfig.name}`,
    };
    document.title = tabTitles[tab];
  };

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

        {/* Unified Tab Switcher */}
        <div className="mb-10">
          <div className="inline-flex p-1.5 bg-neutral-950 border border-neutral-800/80 rounded-xl sm:rounded-2xl gap-1 max-w-full overflow-x-auto shadow-xl shadow-black/40">
            <button
              type="button"
              onClick={() => handleTabChange('license')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'license'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>MIT License</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('privacy')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'privacy'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('terms')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'terms'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-3 mb-10 pb-8 border-b border-neutral-900">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {activeTab === 'license' && 'Open Source License'}
            {activeTab === 'privacy' && 'Privacy Policy'}
            {activeTab === 'terms' && 'Terms of Service'}
          </h1>
          <p className="text-sm font-mono text-neutral-400">
            {siteConfig.name} &bull; Effective 2026 &bull; Clear, human terms with zero ambiguity
          </p>
        </div>

        {/* Tab 1: MIT License */}
        {activeTab === 'license' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-semibold text-white">Software License Agreement</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                The original software code powering this web application is open source and released under the terms of the MIT License. You are free to inspect, learn from, fork, and adapt the underlying technical architecture.
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-300">Note on Brand Assets:</strong> The MIT License applies to the source code. All studio trademarks, logos, client case study assets, photography, and proprietary brand graphics are strictly reserved under studio ownership.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  LICENSE TEXT // MIT
                </span>
                <a
                  href="https://github.com/shivamwebdesigns/Shivam-Web-Designs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  GitHub Repository
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <pre className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap select-all overflow-x-auto">
{`MIT License

Copyright (c) 2026 Shivam Purohit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                1. Minimal, Honest Data Collection
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                We collect only what is strictly necessary to communicate and deliver client work. We do not sell your personal data, and we do not use invasive third-party tracking pixels or cross-site advertising networks.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-neutral-400">
                <li><strong className="text-neutral-200">Inquiry Data:</strong> Your name, email, project brief, and budget tier submitted through our forms.</li>
                <li><strong className="text-neutral-200">Technical Logs:</strong> Standard web server access logs (IP address, browser user-agent) managed by Vercel for DDoS prevention and reliability.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                2. How We Store &amp; Use Data
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Project inquiries are securely stored in our encrypted Google Firebase Firestore database and forwarded to our studio inbox via Resend. Information is used solely to respond to your request, draft proposals, and fulfill project agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                3. Your Rights &amp; Data Control
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                In compliance with the Digital Personal Data Protection (DPDP) Act 2023 and GDPR standards, you retain full ownership of your personal information. You can request immediate inspection, correction, or permanent deletion of your inquiry records at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                4. Studio Privacy Contact
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                For any privacy requests or data inquiries, contact Shivam Purohit directly at{' '}
                <a href={siteConfig.social.email} className="text-white hover:underline font-mono">
                  {siteConfig.contact.email}
                </a>.
              </p>
            </section>
          </div>
        )}

        {/* Tab 3: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                1. Studio Engagements &amp; Proposals
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Every project begins with a clear Statement of Work (SOW) outlining specifications, milestone schedules, deliverables, and fixed fees. Work proceeds through formal milestones so expectations remain transparent at every stage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                2. 100% Intellectual Property Transfer
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Upon settlement of the final project invoice, all custom design files, frontend source code, 3D assets, and deliverables transfer 100% to you. ShivamWebDesigns reserves the right to showcase the completed work in its studio portfolio unless a non-disclosure agreement (NDA) is executed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                3. Milestone Structure &amp; Invoices
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Payments are typically structured around milestones (e.g. 50% kickoff deposit, 25% design sign-off, and 25% prior to production deployment). Invoices are payable within 14 days of issue.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                4. 30-Day Post-Launch Warranty
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Every bespoke flagship website includes a 30-day post-launch warranty period at zero extra charge. Any browser rendering bugs or defects matching the agreed scope are remediated immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white border-b border-neutral-900 pb-2">
                5. Governing Law
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                These terms are governed by the laws of India. Both parties agree to resolve any disagreements in good faith through direct consultation prior to formal legal proceedings.
              </p>
            </section>
          </div>
        )}

        {/* Studio Direct Contact Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>Questions regarding our policies or open source code?</p>
          <a
            href={siteConfig.social.email}
            className="text-white hover:underline font-mono inline-flex items-center gap-1"
          >
            {siteConfig.contact.email}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
