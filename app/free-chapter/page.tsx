import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { faqPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import FreeChapterClient from './client';

export const metadata: Metadata = {
  title: 'Read a Free Chapter — Younger, Longer',
  description:
    'Get instant access to Chapter 4 of Younger, Longer: Skin, Collagen & Cosmetic Longevity. Free when you join Younger, Longer Weekly.',
  alternates: {
    canonical: `${SITE_URL}/free-chapter`,
  },
};

const faqs = [
  {
    question: 'Is this chapter really free?',
    answer:
      'Yes. Chapter 4 of Younger, Longer — Skin, Collagen & Cosmetic Longevity — is available at no cost when you subscribe to the Younger, Longer Weekly newsletter. There is no payment required.',
  },
  {
    question: 'Which chapter is included in the free preview?',
    answer:
      'The free preview is Chapter 4 of Younger, Longer: "Skin, Collagen & Cosmetic Longevity." It covers the science of skin aging, what collagen loss actually means for your skin over time, and which interventions have evidence behind them.',
  },
  {
    question: 'Do I need to buy the full guide to access the free chapter?',
    answer:
      'No. The free chapter is delivered separately as a preview. You receive it by joining the Younger, Longer Weekly newsletter. The full 8-chapter guide is a separate one-time purchase if you want the complete framework.',
  },
  {
    question: 'How is the chapter delivered?',
    answer:
      'After you subscribe, the chapter is delivered to your email inbox. You will also receive the Younger, Longer Weekly newsletter going forward. You can unsubscribe at any time.',
  },
];

export default function FreeChapterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Younger, Longer', url: `${SITE_URL}/younger-longer` },
              { name: 'Free Chapter', url: `${SITE_URL}/free-chapter` },
            ])
          ),
        }}
      />
      <FreeChapterClient faqs={faqs} />
    </>
  );
}
