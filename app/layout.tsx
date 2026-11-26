import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
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
    default: 'ShivamWebDesigns | Website Design & Development Agency',
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'ShivamWebDesigns is an independent web design and development studio creating modern, responsive and professional websites for individuals, creators and businesses.',
  keywords: [
    'ShivamWebDesigns',
    'SWD',
    'Shivam Purohit',
    'web design studio India',
    'custom website design',
    'website development',
    'UI/UX design',
    'frontend development',
  ],
  authors: [{ name: 'Shivam Purohit', url: siteConfig.url }],
  creator: 'Shivam Purohit',
  publisher: siteConfig.name,
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
    title: 'ShivamWebDesigns | Website Design & Development Agency',
    description:
      'ShivamWebDesigns is an independent web design and development studio creating modern, responsive and professional websites for individuals, creators and businesses.',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.assets.bannerDesktop,
        width: 1920,
        height: 640,
        alt: `${siteConfig.name} — Digital Agency Banner`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShivamWebDesigns | Website Design & Development Agency',
    description:
      'ShivamWebDesigns is an independent web design and development studio creating modern, responsive and professional websites for individuals, creators and businesses.',
    images: [siteConfig.assets.bannerDesktop],
    creator: '@shivamwebdesigns',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '256x256', type: 'image/x-icon' },
      { url: siteConfig.assets.favicon, sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: siteConfig.assets.favicon, sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}>
      <head>
        {/* Structured JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: siteConfig.name,
              image: `${siteConfig.url}${siteConfig.assets.logoPng}`,
              url: siteConfig.url,
              telephone: siteConfig.contact.phone,
              email: siteConfig.contact.email,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
              founder: {
                '@type': 'Person',
                name: 'Shivam Purohit',
                jobTitle: 'Founder & CEO',
                image: `${siteConfig.url}${siteConfig.assets.founderImage}`,
                sameAs: [
                  founderData.social.linkedin,
                  founderData.social.github,
                  founderData.social.instagram,
                  founderData.social.whatsapp,
                ],
              },
              sameAs: [
                siteConfig.social.linkedin,
                siteConfig.social.github,
                siteConfig.social.instagram,
                siteConfig.contact.whatsapp,
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
        <IOSInstallPrompt />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
