import { createServerClient } from '@/lib/supabase/server';
import { TOPICS, SITE_URL } from '@/lib/constants';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { SkinAuditFeature } from '@/components/sections/skin-audit-feature';
import { JourneySteps } from '@/components/sections/journey-steps';
import { TopicsGrid } from '@/components/sections/topics-grid';
import { FlagshipProduct } from '@/components/sections/flagship-product';
import { CostOfDrift } from '@/components/sections/cost-of-drift';
import { LatestArticles } from '@/components/sections/latest-articles';
import { RecommendedPicks } from '@/components/sections/recommended-picks';
import { TrustSection } from '@/components/sections/trust-section';
import { EmailCapture } from '@/components/sections/email-capture';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LAKEHAUS Health \u2014 The Modern Guide to Aging Well',
  description:
    'Evidence-informed wellness guidance for women who want to age beautifully, stay strong, and live with vitality. Covering skin, strength, energy, sleep, metabolism, and hormones.',
  alternates: {
    canonical: SITE_URL,
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createServerClient();

  const [settingsRes, articlesRes, recommendedRes] = await Promise.all([
    supabase.from('site_settings').select('*').maybeSingle(),
    supabase
      .from('articles')
      .select('*, category:categories(*), author:authors(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(6),
    supabase
      .from('recommended_items')
      .select('*, category:categories(*)')
      .eq('status', 'published')
      .limit(4),
  ]);

  const settings = settingsRes.data;
  const articles = articlesRes.data || [];
  const recommended = recommendedRes.data || [];

  const hero = settings?.homepage_hero || {};

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero
          headline={hero.headline || 'Something is changing. Here is how to know what it means.'}
          subheadline={
            hero.subheadline ||
            'A clear, evidence-aware path through the noise of modern wellness'
          }
          description={
            hero.description ||
            'LAKEHAUS Health is an independent editorial wellness publication for women. Notice what is changing. Assess what it may mean. Get a structured framework for what to do next. We cover the six pillars of healthy aging: skin, strength, energy, sleep, metabolism, and hormones.'
          }
          primaryCtaText={hero.primary_cta_text || 'Get the Free Skin Audit'}
          primaryCtaUrl={hero.primary_cta_url || '/free-skin-audit'}
          secondaryCtaText={hero.secondary_cta_text || 'See How the Guide Works'}
          secondaryCtaUrl={hero.secondary_cta_url || '/younger-longer'}
          microcopy="Free. Instant. No payment required."
        />
        <SkinAuditFeature />
        <JourneySteps />
        <FlagshipProduct />
        <CostOfDrift />
        <TopicsGrid topics={TOPICS} />
        <LatestArticles articles={articles} />
        <RecommendedPicks items={recommended} />
        <TrustSection />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
