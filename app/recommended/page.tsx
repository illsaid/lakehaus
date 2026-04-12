import { createServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RecommendedItemCard } from '@/components/content/recommended-item-card';
import { EmailCapture } from '@/components/sections/email-capture';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Recommended',
  description:
    'Editorially curated products and tools we genuinely use and recommend for women focused on healthy aging and vitality.',
};

export default async function RecommendedPage() {
  const supabase = createServerClient();

  const [itemsRes, categoriesRes] = await Promise.all([
    supabase
      .from('recommended_items')
      .select('*, category:categories(*)')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false }),
    supabase
      .from('categories')
      .select('*')
      .in('slug', [
        'wearables',
        'skincare',
        'supplements',
        'fitness-tools',
        'sleep-recovery',
        'books',
      ])
      .order('name'),
  ]);

  const items = itemsRes.data || [];
  const categories = categoriesRes.data || [];

  const groupedItems: Record<string, typeof items> = {};
  items.forEach((item) => {
    const catName = item.category?.name || 'Other';
    if (!groupedItems[catName]) groupedItems[catName] = [];
    groupedItems[catName].push(item);
  });

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone pt-12 pb-8 lg:pt-20 lg:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              Curated
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Recommended
            </h1>
            <p className="mt-4 text-base text-charcoal/50 max-w-2xl leading-relaxed">
              Products and tools we genuinely use and recommend. Every item is
              editorially selected, independently reviewed, and chosen because it
              actually works &mdash; not because someone paid us to say so.
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
                    className="text-[11px] font-sans uppercase tracking-[0.12em] px-4 py-2 rounded-full border border-soft-border/60 text-charcoal/40"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-bone py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {Object.entries(groupedItems).map(([categoryName, categoryItems]) => (
              <div key={categoryName} className="mb-16 last:mb-0">
                <div className="border-t border-soft-border/60 pt-8 mb-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
                    {categoryName}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                  {categoryItems.map((item) => (
                    <RecommendedItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-20">
                <p className="text-charcoal/30 font-serif text-xl">
                  Recommendations coming soon.
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="bg-bone py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="p-5 bg-card-warm rounded-lg border border-soft-border/40 text-xs text-charcoal/35 leading-relaxed">
              Some links on this page are affiliate links. We may earn a small
              commission if you purchase through our links, at no additional cost
              to you. Our editorial recommendations are never influenced by
              affiliate partnerships. We only recommend products we have
              personally evaluated and believe in.
            </div>
          </div>
        </div>

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
