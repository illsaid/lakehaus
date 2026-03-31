import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
