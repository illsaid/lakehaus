import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import FreeSkinAuditClient from './client';

export const metadata: Metadata = {
  title: 'Free 6-Marker Skin Audit',
  description:
    'Score the six visible signs of hormonal skin change — density, wound healing, moisture, texture, hair, and pigmentation — and get your results instantly when you join Younger, Longer Weekly.',
  alternates: {
    canonical: `${SITE_URL}/free-skin-audit`,
  },
};

export default function FreeSkinAuditPage() {
  return <FreeSkinAuditClient />;
}
