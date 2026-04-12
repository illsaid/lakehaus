'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { Article } from '@/lib/supabase/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

function TableSkeleton() {
  return (
    <div className="bg-card-warm rounded-lg border border-soft-border/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-soft-border/40">
        <div className="h-3 w-40 bg-oat rounded animate-pulse" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="px-4 py-4 border-b border-soft-border/20 last:border-0 flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-oat rounded animate-pulse" />
            <div className="h-3 w-1/3 bg-oat rounded animate-pulse" />
          </div>
          <div className="h-6 w-16 bg-oat rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*, category:categories(*)')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setArticles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    const { error: deleteError } = await supabase.from('articles').delete().eq('id', id);
    if (deleteError) {
      setError('Failed to delete article');
      return;
    }
    fetchArticles();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light text-charcoal">
          Articles
        </h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-muted-rose/10 border border-muted-rose/20 rounded-lg text-sm text-muted-rose flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchArticles} className="text-xs underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : articles.length === 0 ? (
        <p className="text-charcoal/30 text-sm">No articles yet.</p>
      ) : (
        <div className="bg-card-warm rounded-lg border border-soft-border/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-soft-border/40">
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-soft-border/20 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal">{article.title}</p>
                    <p className="text-xs text-charcoal/30 mt-0.5">
                      /{article.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-charcoal/40">
                      {article.category?.name || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        article.status === 'published'
                          ? 'bg-sage/15 text-deep-sage'
                          : 'bg-oat text-charcoal/40'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="p-2 text-charcoal/30 hover:text-charcoal transition-colors"
                        aria-label={`Edit ${article.title}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-charcoal/30 hover:text-muted-rose transition-colors"
                        aria-label={`Delete ${article.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
