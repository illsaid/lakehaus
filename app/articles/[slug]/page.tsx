import { createServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArticleCard } from '@/components/content/article-card';
import { EmailCapture } from '@/components/sections/email-capture';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { sanitizeHtml } from '@/lib/sanitize';
import { SITE_URL } from '@/lib/constants';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: article } = await supabase
    .from('articles')
    .select('title, seo_title, seo_description, excerpt, og_image_url, hero_image_url, published_at, slug')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!article) return { title: 'Article Not Found' };

  const imageUrl = article.og_image_url || article.hero_image_url;

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    alternates: {
      canonical: `${SITE_URL}/articles/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || '',
      url: `${SITE_URL}/articles/${article.slug}`,
      publishedTime: article.published_at || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || '',
      images: imageUrl ? [imageUrl] : undefined,
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

  const updatedDate =
    article.updated_at &&
    article.published_at &&
    new Date(article.updated_at).getTime() - new Date(article.published_at).getTime() > 86400000
      ? new Date(article.updated_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Articles', url: `${SITE_URL}/articles` },
              { name: article.title, url: `${SITE_URL}/articles/${article.slug}` },
            ])
          ),
        }}
      />
      <Header />
      <main id="main-content">
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
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-charcoal/40">
                {article.author && <span>{article.author.name}</span>}
                {publishDate && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-charcoal/20" />
                    <span>Published {publishDate}</span>
                  </>
                )}
                {updatedDate && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-charcoal/20" />
                    <span>Updated {updatedDate}</span>
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
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg bg-oat">
                <Image
                  src={article.hero_image_url}
                  alt={article.hero_image_alt || article.title}
                  fill
                  className="object-cover"
                  priority
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

            {/* TODO: If a `key_takeaways` column (text[] or jsonb) is added to the articles table,
                render a "Key Takeaways" block here before the body. This improves AI citation and
                snippet extraction significantly. */}

            <div
              className="prose-editorial"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.body) }}
            />

            {article.author && (
              <div className="mt-12 pt-8 border-t border-soft-border/40 flex items-start gap-5">
                {article.author.headshot_url && (
                  <Image
                    src={article.author.headshot_url}
                    alt={article.author.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover shrink-0"
                  />
                )}
                <div>
                  <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-deep-sage mb-1">
                    Written by
                  </p>
                  <p className="font-serif text-base font-medium text-charcoal">
                    {article.author.name}
                  </p>
                  {article.author.role && (
                    <p className="text-xs text-charcoal/40 mt-0.5">{article.author.role}</p>
                  )}
                  {article.author.bio && (
                    <p className="mt-2 text-sm text-charcoal/50 leading-relaxed">
                      {article.author.bio}
                    </p>
                  )}
                </div>
              </div>
            )}
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
