'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

function StartProjectForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    projectType: initialService || 'Website Design',
    customProjectType: '',
    budget: '₹2,000 – ₹3,000',
    timeline: '1 Month',
    description: '',
    referenceUrl: '',
    additionalRequirements: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const projectTypes = [
    'Website Design',
    'Website Development',
    'UI/UX Design',
    'Website Redesign',
    'Landing Page Development',
    'Website Maintenance',
    'Full-Stack Flagship',
    'Other / Custom',
  ];

  const budgetTiers = [
    '₹500 – ₹1,000',
    '₹1,000 – ₹2,000',
    '₹2,000 – ₹3,000',
    '₹3,000 – ₹4,000',
    '₹4,000 – ₹5,000',
  ];

  const timelines = [
    'Urgent (< 2 Weeks)',
    '1 Month',
    '2 – 3 Months',
    'Flexible / Planning Phase',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      setStatus('success');
      setInquiryId('SWD-' + Math.floor(100000 + Math.random() * 900000));
      return;
    }

    if (!formData.fullName || !formData.email || !formData.description) {
      setStatus('error');
      setErrorMessage('Please provide your name, email, and a description of your project.');
      return;
    }

    if (formData.projectType === 'Other / Custom' && !formData.customProjectType.trim()) {
      setStatus('error');
      setErrorMessage('Please describe the service or project type you need.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { customProjectType, ...submissionData } = formData;
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...submissionData,
          projectType:
            formData.projectType === 'Other / Custom'
              ? `Other / Custom: ${customProjectType.trim()}`
              : formData.projectType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project inquiry. Please try again.');
      }

      if (typeof data.inquiryId !== 'string' || !data.inquiryId) {
        throw new Error('Email delivery could not be confirmed. Please try again.');
      }

      setInquiryId(data.inquiryId);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 pb-10 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Client Intake System
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Initiate a Project Brief
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Complete the intake specification below. Shivam personally reviews every brief, conducts preliminary technical feasibility research, and delivers a tailored proposal within 24 to 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Intake Section */}
      <section className="pt-10 pb-24 border-b border-neutral-900 bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {status === 'success' ? (
            <div className="p-10 md:p-16 border border-neutral-800 bg-neutral-950 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  Email Delivery Confirmed
                </span>
                <h2 className="text-3xl font-light text-white tracking-tight mt-1">
                  Brief Sent for Quotation
                </h2>
                <div className="mt-3 inline-block px-4 py-1.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                  Tracking ID: {inquiryId}
                </div>
              </div>

              <div className="space-y-3 text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed pt-4 border-t border-neutral-900">
                <p>
                  Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Your brief for a{' '}
                  <span className="text-white font-medium">
                    {formData.projectType === 'Other / Custom'
                      ? formData.customProjectType
                      : formData.projectType}
                  </span>{' '}
                  project has been sent to the studio for quotation.
                </p>
                <p className="text-neutral-400 text-xs">
                  Shivam Purohit will review your timeline and requirements, assess our sprint capacity, and respond directly to <span className="text-white font-mono">{formData.email}</span> within 24 to 48 hours.
                </p>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 border border-neutral-800 text-white hover:bg-neutral-900 transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  Browse Case Studies
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-neutral-900 bg-neutral-950/40 p-8 md:p-12 space-y-12">
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="intake_hp">Do not fill this field</label>
                <input
                  id="intake_hp"
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-950/30 border border-red-900/60 text-red-300 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {errorMessage}{' '}
                    <Link
                      href="/contact"
                      className="text-white underline underline-offset-2"
                    >
                      Contact us
                    </Link>
                    .
                  </span>
                </div>
              )}

              {/* 1. Identity */}
              <div className="space-y-6">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <span>01</span>
                  <span className="text-neutral-600">//</span>
                  <span>Contact Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Company or Brand Name <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company or brand"
                    className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                  />
                </div>
              </div>

              {/* 2. Scope & Project Type */}
              <div className="space-y-6 pt-6 border-t border-neutral-900">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <span>02</span>
                  <span className="text-neutral-600">//</span>
                  <span>Project Classification</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                    Primary Service Needed <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-3 text-xs font-mono uppercase tracking-wider text-left transition-all border ${
                          formData.projectType === type
                            ? 'bg-white text-black border-white font-semibold'
                            : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {formData.projectType === 'Other / Custom' && (
                    <div className="mt-4">
                      <label
                        htmlFor="custom-project-type"
                        className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        Describe the service or project type <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="custom-project-type"
                        type="text"
                        required
                        maxLength={80}
                        value={formData.customProjectType}
                        onChange={(e) =>
                          setFormData({ ...formData, customProjectType: e.target.value })
                        }
                        placeholder="What would you like to build?"
                        className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Budget & Timeline */}
              <div className="space-y-6 pt-6 border-t border-neutral-900">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <span>03</span>
                  <span className="text-neutral-600">//</span>
                  <span>Parameters & Investment</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Estimated Investment Budget (INR)
                    </label>
                    <div className="space-y-2">
                      {budgetTiers.map((tier) => (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={`w-full p-3 text-xs font-mono uppercase tracking-wider text-left transition-all border ${
                            formData.budget === tier
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                      Expected Timeline
                    </label>
                    <div className="space-y-2">
                      {timelines.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setFormData({ ...formData, timeline: time })}
                          className={`w-full p-3 text-xs font-mono uppercase tracking-wider text-left transition-all border ${
                            formData.timeline === time
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Details & References */}
              <div className="space-y-6 pt-6 border-t border-neutral-900">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <span>04</span>
                  <span className="text-neutral-600">//</span>
                  <span>Project Specification</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Project Description & Objectives <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about what you want to build, the key problems to solve, target audience, and primary objectives..."
                    className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Reference Website <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={formData.referenceUrl}
                      onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Additional Notes <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                      placeholder="e.g. Existing brand assets available"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-neutral-900 space-y-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold disabled:opacity-50 shadow-2xl"
                >
                  {status === 'loading' ? (
                    <span>Sending Brief for Quotation...</span>
                  ) : (
                    <>
                      <span>Send Brief for Quotation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Strict Confidentiality • No Spam • Direct Founder Review</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default function StartProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xs font-mono text-neutral-500">Loading intake form...</div>}>
      <StartProjectForm />
    </Suspense>
  );
}
