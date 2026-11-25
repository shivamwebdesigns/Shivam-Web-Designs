'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'General Inquiry via SWD Contact Form',
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch message. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please email us directly.'
      );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Direct Communication
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Let&apos;s start a conversation.
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Have a question, need a consultation, or want to discuss a prospective partnership? Reach out directly to our team. We respond within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Channels Column */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-2xl font-light text-white mb-2 tracking-tight">
                  Agency Coordinates
                </h2>
                <p className="text-sm text-neutral-400 font-light">
                  For formal project inquiries with budget and timeline, please use our{' '}
                  <Link href="/start-project" className="text-white underline hover:text-neutral-300">
                    Project Inquiry System
                  </Link>
                  .
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-6">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-4 p-5 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:border-white group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                      Direct Email
                    </div>
                    <div className="text-sm font-medium text-white group-hover:underline">
                      {siteConfig.contact.email}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Guaranteed reply within 24 hours
                    </div>
                  </div>
                </a>

                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-sm font-medium text-white group-hover:underline">
                      Start Direct WhatsApp Conversation
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Direct link to founder chat
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-neutral-950 border border-neutral-900">
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                      Location & Reach
                    </div>
                    <div className="text-sm font-medium text-white">
                      {siteConfig.contact.location}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Operating in IST (UTC+5:30) with global overlap
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-neutral-950 border border-neutral-900">
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                      Current Availability
                    </div>
                    <div className="text-sm font-medium text-emerald-400">
                      {siteConfig.contact.availability}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Booking sprints 2–4 weeks in advance
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-12 border border-neutral-900 bg-neutral-950/40">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Send a Message
                </div>
                <h2 className="text-2xl font-light text-white mb-8 tracking-tight">
                  General Contact & Inquiries
                </h2>

                {status === 'success' ? (
                  <div className="p-8 bg-black border border-neutral-800 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-light text-white">Message Dispatched Successfully</h3>
                    <p className="text-sm text-neutral-400 max-w-md mx-auto">
                      Thank you for contacting ShivamWebDesigns. Shivam has received your note and will review it shortly. You can expect a response within 24 business hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot anti-spam */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website_hp">Do not fill this</label>
                      <input
                        id="website_hp"
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
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alexander Vance"
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
                          placeholder="alexander@company.com"
                          className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Design consultation / Partnership inquiry"
                        className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your question, goals, or what you'd like to explore..."
                        className="w-full px-4 py-3 bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-wider font-semibold disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
