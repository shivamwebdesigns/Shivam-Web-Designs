import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-36 sm:pb-32 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block" aria-label="ShivamWebDesigns Home">
              <div className="relative flex items-center">
                <Image
                  src={siteConfig.assets.logoPng}
                  alt="Shivam Web Designs"
                  width={84}
                  height={56}
                  className="h-12 sm:h-14 w-auto object-contain transition-opacity duration-200 hover:opacity-90"
                />
              </div>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {siteConfig.supportingText}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-200 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  Packages &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Agency
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-white transition-colors">
                  Founder Profile
                </Link>
              </li>
              <li>
                <Link href="/businesscard" className="hover:text-white transition-colors flex items-center">
                  3D Business Card
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-200 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#website-design" className="hover:text-white transition-colors">
                  Website Design
                </Link>
              </li>
              <li>
                <Link href="/services#website-development" className="hover:text-white transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services#ui-ux-design" className="hover:text-white transition-colors">
                  UI/UX Architecture
                </Link>
              </li>
              <li>
                <Link href="/services#website-redesign" className="hover:text-white transition-colors">
                  Website Redesign
                </Link>
              </li>
              <li>
                <Link href="/services#landing-page-development" className="hover:text-white transition-colors">
                  Landing Page Funnels
                </Link>
              </li>
              <li>
                <Link href="/services#website-maintenance" className="hover:text-white transition-colors">
                  Website Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Channels & Inquiries */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-200 mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.social.email}
                  className="hover:text-white transition-colors flex items-center"
                >
                  Direct Email
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  LinkedIn
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  GitHub
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  Instagram
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-60" />
                </a>
              </li>
              {siteConfig.social.whatsapp && (
                <li>
                  <a
                    href={siteConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    WhatsApp
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-60" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/license" className="hover:text-neutral-300 transition-colors">
              Legal Documentation
            </Link>
            <Link href="/start-project" className="text-white hover:underline font-medium">
              Start a Project &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
