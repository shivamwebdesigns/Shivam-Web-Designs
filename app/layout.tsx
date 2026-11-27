import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { BackToTop } from '@/components/BackToTop';
import { IOSInstallPrompt } from '@/components/IOSInstallPrompt';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';
import { siteConfig } from '@/data/siteConfig';
import { founderData } from '@/data/founder';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [
    'ShivamWebDesigns',
    'SWD',
    'Shivam Purohit',
    'web design studio India',
    'custom website design',
    'website development',
    'UI/UX design',
    'frontend development',
    'Next.js 15 developer',
    '3D web design',
    'high performance web design',
    'creative agency India',
  ],
  authors: [{ name: 'Shivam Purohit', url: siteConfig.url }],
  creator: 'Shivam Purohit',
  publisher: siteConfig.name,
  applicationName: 'ShivamWebDesigns',
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.assets.bannerDesktop,
        width: 1920,
        height: 640,
        alt: `${siteConfig.name} — Digital Agency Banner`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shivamwebdesigns',
    creator: '@shivamwebdesigns',
    title: siteConfig.seo.twitterTitle,
    description: siteConfig.seo.twitterDescription,
    images: [siteConfig.assets.bannerDesktop],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=5', sizes: 'any' },
      { url: '/favicon-16x16.png?v=5', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=5', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png?v=5', sizes: '48x48', type: 'image/png' },
      { url: '/assets/favicon-192.png?v=5', sizes: '192x192', type: 'image/png' },
      { url: `${siteConfig.assets.favicon}?v=5`, sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.ico?v=5', sizes: 'any' },
      { url: '/favicon-32x32.png?v=5', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=5', sizes: '180x180', type: 'image/png' },
      { url: `${siteConfig.assets.favicon}?v=5`, sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google5fefb455a4f252a7.html',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}>
      <head>
        {/* Preconnect & DNS-Prefetch for Fast Third-Party Dispatch */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />

        {/* Favicon & Apple Web App Link Declarations for Safari and Taskbars */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=5" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
        <meta name="apple-mobile-web-app-title" content="ShivamWebDesigns" />
        <meta name="application-name" content="ShivamWebDesigns" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Structured JSON-LD Knowledge Graph Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: siteConfig.name,
                  alternateName: siteConfig.shortName,
                  description: siteConfig.description,
                  publisher: {
                    '@id': `${siteConfig.url}/#organization`,
                  },
                  inLanguage: 'en-US',
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': `${siteConfig.url}/#organization`,
                  name: siteConfig.name,
                  alternateName: [siteConfig.shortName, 'Shivam Web Designs'],
                  url: siteConfig.url,
                  logo: `${siteConfig.url}${siteConfig.assets.logoPng}`,
                  image: `${siteConfig.url}${siteConfig.assets.bannerDesktop}`,
                  telephone: siteConfig.contact.phone,
                  email: siteConfig.contact.email,
                  priceRange: '$$',
                  currenciesAccepted: 'USD, INR, EUR, GBP',
                  paymentAccepted: 'Bank Transfer, UPI, Credit Card, Stripe, PayPal',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'IN',
                  },
                  areaServed: {
                    '@type': 'Country',
                    name: 'Worldwide',
                  },
                  founder: {
                    '@id': `${siteConfig.url}/#founder`,
                  },
                  sameAs: [
                    siteConfig.social.linkedin,
                    siteConfig.social.github,
                    siteConfig.social.instagram,
                    siteConfig.contact.whatsapp,
                  ],
                },
                {
                  '@type': 'Person',
                  '@id': `${siteConfig.url}/#founder`,
                  name: 'Shivam Purohit',
                  jobTitle: 'Founder & Creative Director',
                  worksFor: {
                    '@id': `${siteConfig.url}/#organization`,
                  },
                  image: `${siteConfig.url}${siteConfig.assets.founderImage}`,
                  knowsAbout: [
                    'Website Design',
                    'Website Development',
                    'UI/UX Architecture',
                    'Next.js Engineering',
                    'Spatial 3D Web Interfaces',
                    'Core Web Vitals Optimization',
                    'Search Engine Optimization (SEO)',
                  ],
                  sameAs: [
                    founderData.social.linkedin,
                    founderData.social.github,
                    founderData.social.instagram,
                    founderData.social.whatsapp,
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black flex flex-col">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileDock />
        <BackToTop />
        <IOSInstallPrompt />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
