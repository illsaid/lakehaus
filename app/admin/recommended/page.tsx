'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { RecommendedItem } from '@/lib/supabase/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminRecommendedPage() {
  const [items, setItems] = useState<RecommendedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data } = await supabase
      .from('recommended_items')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this recommendation?')) return;
    await supabase.from('recommended_items').delete().eq('id', id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light text-charcoal">
          Recommended
        </h1>
        <Link
          href="/admin/recommended/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Recommendation
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal/30 text-sm">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-charcoal/30 text-sm">No recommendations yet.</p>
      ) : (
        <div className="bg-card-warm rounded-lg border border-soft-border/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-soft-border/40">
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal hidden md:table-cell">
                  Brand
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
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-soft-border/20 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal">{item.title}</p>
                    <p className="text-xs text-charcoal/30 mt-0.5">
                      {item.category?.name || '—'}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-charcoal/40">
                    {item.brand || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'published'
                          ? 'bg-sage/15 text-deep-sage'
                          : 'bg-oat text-charcoal/40'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/recommended/${item.id}`}
                        className="p-2 text-charcoal/30 hover:text-charcoal transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
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
