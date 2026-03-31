import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/supabase/types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-oat mb-4">
        {article.hero_image_url ? (
          <Image
            src={article.hero_image_url}
            alt={article.hero_image_alt || article.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-2xl text-charcoal/20">
              LAKEHAUS
            </span>
          </div>
        )}
      </div>
      <div>
        {article.category && (
          <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-deep-sage">
            {article.category.name}
          </span>
        )}
        <h3 className="mt-1.5 font-serif text-xl lg:text-2xl font-medium text-charcoal leading-snug group-hover:text-deep-sage transition-colors duration-200">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-charcoal/50 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-charcoal/35">
          {date && <span>{date}</span>}
          {article.reading_time > 0 && (
            <>
              <span className="w-0.5 h-0.5 rounded-full bg-charcoal/20" />
              <span>{article.reading_time} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
