import { createServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArticleCard } from '@/components/content/article-card';
import { EmailCapture } from '@/components/sections/email-capture';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: article } = await supabase
    .from('articles')
    .select('title, seo_title, seo_description, excerpt, og_image_url, hero_image_url')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      images: article.og_image_url || article.hero_image_url
        ? [{ url: article.og_image_url || article.hero_image_url }]
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const supabase = createServerClient();

  const { data: article } = await supabase
    .from('articles')
    .select('*, category:categories(*), author:authors(*)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!article) notFound();

  const { data: related } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('category_id', article.category_id)
    .neq('id', article.id)
    .order('published_at', { ascending: false })
    .limit(3);

  const relatedArticles = related || [];

  const publishDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <>
      <Header />
      <main>
        <article>
          <header className="bg-bone pt-12 pb-10 lg:pt-20 lg:pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              {article.category && (
                <Link
                  href={`/articles?category=${article.category.slug}`}
                  className="text-[11px] font-sans uppercase tracking-[0.2em] text-deep-sage hover:text-sage transition-colors"
                >
                  {article.category.name}
                </Link>
              )}
              <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-[1.15]">
                {article.title}
              </h1>
              {article.deck && (
                <p className="mt-4 text-lg text-charcoal/50 leading-relaxed">
                  {article.deck}
                </p>
              )}
              <div className="mt-6 flex items-center gap-4 text-sm text-charcoal/40">
                {article.author && <span>{article.author.name}</span>}
                {publishDate && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-charcoal/20" />
                    <span>{publishDate}</span>
                  </>
                )}
                {article.reading_time > 0 && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-charcoal/20" />
                    <span>{article.reading_time} min read</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {article.hero_image_url && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-oat">
                <img
                  src={article.hero_image_url}
                  alt={article.hero_image_alt || article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
            {article.affiliate_disclosure && (
              <div className="mb-8 p-4 bg-card-warm rounded border border-soft-border/40 text-xs text-charcoal/40 leading-relaxed">
                This article contains affiliate links. We may earn a small
                commission at no additional cost to you. Our editorial
                recommendations are never influenced by affiliate partnerships.
              </div>
            )}

            <div
              className="prose-editorial"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="bg-card-warm py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
                Keep Reading
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-10">
                Related articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.id} article={a} />
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
