import { Article } from '@/lib/supabase/types';
import { ArticleCard } from '@/components/content/article-card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              Latest
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
              From the editorial desk
            </h2>
            <p className="mt-3 text-sm text-charcoal/40 leading-relaxed max-w-md">
              Clear thinking, not noise. Start with free editorial guidance, then go deeper with the guide.
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden md:inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors duration-200 group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-charcoal transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
