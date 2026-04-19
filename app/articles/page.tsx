import { createServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArticleCard } from '@/components/content/article-card';
import { EmailCapture } from '@/components/sections/email-capture';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Evidence-informed editorial articles on skin, strength, energy, sleep, metabolism, and hormones for women who want to age well.',
  alternates: {
    canonical: `${SITE_URL}/articles`,
  },
};

export default async function ArticlesPage() {
  const supabase = createServerClient();

  const [articlesRes, categoriesRes] = await Promise.all([
    supabase
      .from('articles')
      .select('*, category:categories(*), author:authors(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false }),
    supabase
      .from('categories')
      .select('*')
      .in('slug', [
        'skin',
        'strength',
        'energy',
        'sleep',
        'metabolism',
        'hormones',
      ])
      .order('name'),
  ]);

  const articles = articlesRes.data || [];
  const categories = categoriesRes.data || [];

  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone pt-12 pb-6 lg:pt-20 lg:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              Editorial
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Articles
            </h1>
            <p className="mt-4 text-base text-charcoal/50 max-w-xl leading-relaxed">
              Clear, evidence-informed guidance on the topics that matter most
              for women who want to age well.
            </p>
          </div>
        </section>

        {categories.length > 0 && (
          <section className="bg-bone pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-[11px] font-sans uppercase tracking-[0.12em] px-4 py-2 rounded-full border border-soft-border/60 text-charcoal/40 hover:text-charcoal hover:border-charcoal/20 transition-colors cursor-default"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {featured.length > 0 && (
          <section className="bg-bone py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted-rose mb-6">
                Featured
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {featured.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section className="bg-bone py-10 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {featured.length > 0 && (
                <div className="border-t border-soft-border/60 pt-10 lg:pt-14 mb-8">
                  <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-charcoal/30 mb-6">
                    All Articles
                  </p>
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {rest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
