import { createServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCapture } from '@/components/sections/email-capture';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { sanitizeHtml } from '@/lib/sanitize';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: item } = await supabase
    .from('recommended_items')
    .select('title, seo_title, seo_description, short_summary')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!item) return { title: 'Not Found' };

  return {
    title: item.seo_title || item.title,
    description: item.seo_description || item.short_summary,
  };
}

export default async function RecommendedItemPage({ params }: PageProps) {
  const supabase = createServerClient();

  const { data: item } = await supabase
    .from('recommended_items')
    .select('*, category:categories(*)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!item) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="bg-bone pt-8 pb-6 lg:pt-16 lg:pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              href="/recommended"
              className="inline-flex items-center gap-1.5 text-sm text-charcoal/40 hover:text-charcoal transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Recommendations
            </Link>
          </div>
        </section>

        <section className="bg-bone pb-16 lg:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-oat">
                {item.product_image_url ? (
                  <Image
                    src={item.product_image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-2xl text-charcoal/15">
                      {item.brand}
                    </span>
                  </div>
                )}
              </div>

              <div>
                {item.category && (
                  <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-deep-sage mb-2">
                    {item.category.name}
                  </p>
                )}
                <p className="text-[11px] font-sans uppercase tracking-[0.12em] text-muted-rose mb-3">
                  {item.brand}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight">
                  {item.title}
                </h1>
                <p className="mt-4 text-base text-charcoal/50 leading-relaxed">
                  {item.short_summary}
                </p>

                {item.who_its_for && (
                  <div className="mt-6 p-4 bg-card-warm rounded border border-soft-border/40">
                    <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-1">
                      Best For
                    </p>
                    <p className="text-sm text-charcoal/60 leading-relaxed">
                      {item.who_its_for}
                    </p>
                  </div>
                )}

                {item.caveats && (
                  <div className="mt-3 p-4 bg-card-warm rounded border border-soft-border/40">
                    <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-1">
                      Worth Noting
                    </p>
                    <p className="text-sm text-charcoal/60 leading-relaxed">
                      {item.caveats}
                    </p>
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {item.affiliate_url && (
                    <a
                      href={item.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
                    >
                      View Product
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.secondary_url && (
                    <a
                      href={item.secondary_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
                    >
                      Official Site
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {item.disclosure_note && (
                  <p className="mt-4 text-[11px] text-charcoal/25 leading-relaxed">
                    {item.disclosure_note}
                  </p>
                )}
              </div>
            </div>

            {item.editorial_body && (
              <div className="mt-16 pt-12 border-t border-soft-border/40">
                <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-6">
                  Our Review
                </h2>
                <div
                  className="prose-editorial max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.editorial_body) }}
                />
              </div>
            )}
          </div>
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
