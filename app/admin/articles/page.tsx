'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { Article } from '@/lib/supabase/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    const { data } = await supabase
      .from('articles')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false });
    setArticles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await supabase.from('articles').delete().eq('id', id);
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

      {loading ? (
        <p className="text-charcoal/30 text-sm">Loading...</p>
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
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-charcoal/30 hover:text-muted-rose transition-colors"
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
