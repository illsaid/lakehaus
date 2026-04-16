import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import FreeChapterClient from './client';

export const metadata: Metadata = {
  title: 'Read a Free Chapter — Younger, Longer',
  description:
    'Get instant access to Chapter 4 of Younger, Longer: Skin, Collagen & Cosmetic Longevity. Free when you join Younger, Longer Weekly.',
  alternates: {
    canonical: `${SITE_URL}/free-chapter`,
  },
};

export default function FreeChapterPage() {
  return <FreeChapterClient />;
}
