import { createServerClient } from '@/lib/supabase/server';
import { TOPICS } from '@/lib/constants';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { TopicsGrid } from '@/components/sections/topics-grid';
import { FlagshipProduct } from '@/components/sections/flagship-product';
import { LatestArticles } from '@/components/sections/latest-articles';
import { RecommendedPicks } from '@/components/sections/recommended-picks';
import { TrustSection } from '@/components/sections/trust-section';
import { EmailCapture } from '@/components/sections/email-capture';

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
      <main>
        <Hero
          headline={hero.headline || 'Age With Intelligence'}
          subheadline={
            hero.subheadline ||
            'Evidence-informed wellness for women who refuse to settle for less.'
          }
          description={
            hero.description ||
            'LAKEHAUS Health is a premium editorial guide to skin, strength, energy, sleep, metabolism, and hormones. Built for women who want real answers, not wellness theater.'
          }
          primaryCtaText={hero.primary_cta_text || 'Get the Free Chapter'}
          primaryCtaUrl={hero.primary_cta_url || '/free-chapter'}
          secondaryCtaText={hero.secondary_cta_text || 'Explore Articles'}
          secondaryCtaUrl={hero.secondary_cta_url || '/articles'}
        />
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
