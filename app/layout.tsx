import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'LAKEHAUS Health \u2014 The Modern Guide to Aging Well',
    template: '%s | LAKEHAUS Health',
  },
  description:
    'Evidence-informed wellness guidance for women who want to age beautifully, stay strong, and live with vitality. Covering skin, strength, energy, sleep, metabolism, and hormones.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RQ7M1DFXBN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RQ7M1DFXBN');
          `}
        </Script>
      </head>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
