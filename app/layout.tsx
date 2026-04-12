import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_URL, BRAND } from '@/lib/constants';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} \u2014 The Modern Guide to Aging Well`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'Evidence-informed wellness guidance for women who want to age beautifully, stay strong, and live with vitality. Covering skin, strength, energy, sleep, metabolism, and hormones.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BRAND.name,
    url: SITE_URL,
    title: `${BRAND.name} \u2014 The Modern Guide to Aging Well`,
    description:
      'Evidence-informed wellness guidance for women who want to age beautifully, stay strong, and live with vitality.',
    images: [{ url: '/image.png', width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} \u2014 The Modern Guide to Aging Well`,
    description:
      'Evidence-informed wellness guidance for women who want to age beautifully, stay strong, and live with vitality.',
    images: ['/image.png'],
  },
  icons: {
    icon: '/image.png',
    apple: '/image.png',
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RQ7M1DFXBN';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#F6F0E8" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd()),
          }}
        />
      </head>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
