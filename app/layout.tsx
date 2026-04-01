import './globals.css';
import type { Metadata } from 'next';

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
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
