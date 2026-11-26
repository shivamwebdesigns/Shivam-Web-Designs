import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for ShivamWebDesigns. Transparent, minimal data collection, zero third-party tracking, and DPDP Act / GDPR compliance.',
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>LEGAL &amp; COMPLIANCE // DPDP ACT &amp; GDPR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
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
              <Lock className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-white">
                Privacy Summary: Zero Slop, Zero Surveillance
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We believe in total transparency. We do not sell your personal data, we do not deploy invasive third-party advertising cookies, and we only collect information you actively provide when contacting us or submitting a project brief.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Policy Content */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-neutral-300">
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              1. Information We Collect
            </h2>
            <p className="text-neutral-400">
              ShivamWebDesigns collects only the minimal information required to deliver high-quality digital design, 3D web engineering, and client communication:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li>
                <strong className="text-white">Voluntary Contact Information:</strong> Name, email address, company name, project brief details, budget tier, and message contents submitted through our contact configurators or sent directly to us.
              </li>
              <li>
                <strong className="text-white">Technical &amp; Telemetry Data:</strong> Standard server access logs (IP address, browser user-agent, operating system) collected automatically by our hosting platform (Vercel) for DDoS protection, traffic security, and uptime monitoring.
              </li>
              <li>
                <strong className="text-white">Zero Third-Party Advertising Cookies:</strong> We do not deploy advertising tracking pixels, cross-site identity trackers, or behavioral cookies.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-neutral-400">
              The information we collect is strictly used to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li>Review, scope, and formulate custom proposals for your website or digital product.</li>
              <li>Communicate with you regarding active contracts, milestones, and project deliverables.</li>
              <li>Maintain the security, integrity, and performance of our web infrastructure.</li>
            </ul>
            <p className="text-neutral-400">
              When you submit a project brief or contact message, its details are stored in our secure Firebase Firestore database so the studio can review and respond. If email notifications are configured, a copy is routed through Resend to our studio inbox under strict encryption protocols.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              3. Legal Bases &amp; DPDP Act Compliance
            </h2>
            <p className="text-neutral-400">
              We process personal data in compliance with applicable global data privacy regulations, including the Digital Personal Data Protection (DPDP) Act 2023 of India and General Data Protection Regulation (GDPR) standards. Our processing relies on:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li>
                <strong className="text-white">Consent:</strong> When you voluntarily submit a project inquiry or contact us.
              </li>
              <li>
                <strong className="text-white">Contractual Necessity:</strong> To fulfill design and engineering obligations for client engagements.
              </li>
              <li>
                <strong className="text-white">Legitimate Interests:</strong> To maintain server security, prevent abusive bot requests, and maintain reliable service availability.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              4. Data Retention &amp; Security
            </h2>
            <p className="text-neutral-400">
              Inquiry records in Firestore and notification emails are retained only as long as needed to review and respond, maintain a professional relationship, or meet accounting obligations. Stored data is encrypted at rest and in transit, and access is strictly restricted to the studio owner.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
              5. Your Privacy Rights
            </h2>
            <p className="text-neutral-400">
              You have the right to request access to the personal data we hold about you, request corrections or updates, or request complete deletion of your records from our systems. To exercise any of these rights, contact our Data Officer directly.
            </p>
          </section>

          {/* Contact Officer Card */}
          <section className="pt-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">
                Contact &amp; Grievance Officer
              </h3>
              <p className="text-sm text-neutral-400">
                If you have questions, requests, or privacy concerns regarding this policy, reach our studio lead directly:
              </p>
              <div className="text-sm font-mono space-y-1 text-neutral-300">
                <p className="font-bold text-white">Shivam Purohit</p>
                <p className="text-neutral-400">Creative Director &amp; Data Officer</p>
                <p className="text-neutral-400">ShivamWebDesigns</p>
                <p>Email: <a href="mailto:shivamwebdesigns23@gmail.com" className="text-white hover:underline">shivamwebdesigns23@gmail.com</a></p>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:shivamwebdesigns23@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold rounded-md hover:bg-neutral-200 transition-all active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Data Officer</span>
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
