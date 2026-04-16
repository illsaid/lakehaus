import { createServerClient } from '@/lib/supabase/server';
import { TOPICS } from '@/lib/constants';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { SkinAuditFeature } from '@/components/sections/skin-audit-feature';
import { TopicsGrid } from '@/components/sections/topics-grid';
import { FlagshipProduct } from '@/components/sections/flagship-product';
import { LatestArticles } from '@/components/sections/latest-articles';
import { RecommendedPicks } from '@/components/sections/recommended-picks';
import { TrustSection } from '@/components/sections/trust-section';
import { EmailCapture } from '@/components/sections/email-capture';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LAKEHAUS Health \u2014 The Modern Guide to Aging Well',
  description:
    'Evidence-informed wellness guidance for women who want to age beautifully, stay strong, and live with vitality. Covering skin, strength, energy, sleep, metabolism, and hormones.',
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
          headline={hero.headline || 'What Your Skin Is Telling You About Your Hormones'}
          subheadline={
            hero.subheadline ||
            'Evidence-forward guidance for women who refuse to age blindly'
          }
          description={
            hero.description ||
            'Get the free 6-marker Skin Audit and join Younger, Longer Weekly. A fast, evidence-led scorecard for the visible changes many women notice first: firmness, dryness, slower healing, texture, pigmentation, and hair shift.'
          }
          primaryCtaText={hero.primary_cta_text || 'Get the Free Skin Audit'}
          primaryCtaUrl={hero.primary_cta_url || '/free-skin-audit'}
          secondaryCtaText={hero.secondary_cta_text || 'Explore Articles'}
          secondaryCtaUrl={hero.secondary_cta_url || '/articles'}
          microcopy="Delivered instantly when you subscribe."
        />
        <SkinAuditFeature />
        <TopicsGrid topics={TOPICS} />
        <FlagshipProduct />
        <LatestArticles articles={articles} />
        <RecommendedPicks items={recommended} />
        <TrustSection />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
