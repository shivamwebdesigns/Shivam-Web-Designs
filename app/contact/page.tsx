'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Mail, MapPin, MessageSquare, Send, AlertCircle, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SplitText } from '@/components/ui/SplitText';
import { ShinyText } from '@/components/ui/ShinyText';

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
          honeypot: formData.honeypot,
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
      <section className="pt-32 pb-20 border-b border-neutral-900 bg-neutral-950/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <ShinyText>DIRECT COMMUNICATION // CHANNELS</ShinyText>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              <SplitText text="Let's start a conversation." wordMode delay={35} />
            </h1>
            <p className="text-lg text-neutral-400 font-light leading-relaxed">
              Have a question, need an architectural consultation, or want to discuss a prospective digital flagship? Reach out below. We respond within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Channels Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Agency Coordinates
                </h2>
                <p className="text-sm text-neutral-400 font-light">
                  For formal project inquiries with budget and timeline specifications, please use our{' '}
                  <Link href="/start-project" className="text-white underline hover:text-neutral-300 font-medium">
                    Project Intake Funnel
                  </Link>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <SpotlightCard className="p-5">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-neutral-800 bg-black flex items-center justify-center text-neutral-300 group-hover:border-white group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                        Direct Agency Email
                      </div>
                      <div className="text-sm font-medium text-white group-hover:underline">
                        {siteConfig.contact.email}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Guaranteed response within 24 hours
                      </div>
                    </div>
                  </a>
                </SpotlightCard>

                {siteConfig.social.whatsapp && (
                  <SpotlightCard className="p-5">
                    <a
                      href={siteConfig.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-full border border-neutral-800 bg-black flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                          WhatsApp Priority Channel
                        </div>
                        <div className="text-sm font-medium text-white group-hover:underline">
                          Message the studio directly
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">
                          Direct real-time WhatsApp connection
                        </div>
                      </div>
                    </a>
                  </SpotlightCard>
                )}

                <SpotlightCard className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-neutral-800 bg-black flex items-center justify-center text-neutral-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                        Location &amp; Reach
                      </div>
                      <div className="text-sm font-medium text-white">
                        {siteConfig.contact.location}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Serving ambitious brands globally
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <SpotlightCard className="p-8 md:p-12">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Send a Message
                </div>
                <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">
                  General Contact &amp; Inquiries
                </h2>

                {status === 'success' ? (
                  <div className="p-8 bg-black border border-neutral-800 text-center space-y-4 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Received</h3>
                    <p className="text-sm text-neutral-400 max-w-md mx-auto font-light">
                      Thank you for contacting ShivamWebDesigns. Your message has been saved for review. We will respond within 24 business hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white rounded-md transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot */}
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
                      <div className="p-4 bg-red-950/30 border border-red-900/60 text-red-300 text-xs font-mono flex items-start gap-2 rounded-lg">
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
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
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
                          className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
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
                        placeholder="Project Consultation, Partnership, etc."
                        className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
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
                        placeholder="Tell us about your brand, timeline, or inquiry..."
                        className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-white text-sm transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 px-6 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all rounded-lg active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>{status === 'loading' ? 'Dispatching...' : 'Send Message'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
