import Link from 'next/link';
import Image from 'next/image';
import { RecommendedItem } from '@/lib/supabase/types';

interface RecommendedItemCardProps {
  item: RecommendedItem;
}

export function RecommendedItemCard({ item }: RecommendedItemCardProps) {
  return (
    <Link
      href={`/recommended/${item.slug}`}
      className="group block bg-card-warm rounded-lg border border-soft-border/60 overflow-hidden hover:shadow-sm transition-all duration-300"
    >
      <div className="aspect-square relative overflow-hidden bg-oat">
        {item.product_image_url ? (
          <Image
            src={item.product_image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-lg text-charcoal/15">
              {item.brand}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-muted-rose mb-1">
          {item.brand}
        </p>
        <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-deep-sage transition-colors duration-200 leading-snug">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-charcoal/50 leading-relaxed line-clamp-2">
          {item.short_summary}
        </p>
        {item.category && (
          <p className="mt-3 text-[10px] font-sans uppercase tracking-[0.12em] text-charcoal/30">
            {item.category.name}
          </p>
        )}
      </div>
    </Link>
  );
}
