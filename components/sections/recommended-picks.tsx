import { RecommendedItem } from '@/lib/supabase/types';
import { RecommendedItemCard } from '@/components/content/recommended-item-card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RecommendedPicksProps {
  items: RecommendedItem[];
}

export function RecommendedPicks({ items }: RecommendedPicksProps) {
  if (!items.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-card-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              Curated
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
              Current favorites
            </h2>
            <p className="mt-3 text-base text-charcoal/40 max-w-lg">
              Products and tools we genuinely use and recommend, editorially
              selected and honestly reviewed.
            </p>
          </div>
          <Link
            href="/recommended"
            className="hidden md:inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors duration-200 group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {items.slice(0, 4).map((item) => (
            <RecommendedItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/recommended"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors"
          >
            View all recommendations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
