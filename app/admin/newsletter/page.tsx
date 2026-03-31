'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import type { NewsletterIssue } from '@/lib/supabase/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminNewsletterPage() {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    const { data } = await supabase
      .from('newsletter_issues')
      .select('*')
      .order('issue_date', { ascending: false });
    setIssues(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this newsletter issue?')) return;
    await supabase.from('newsletter_issues').delete().eq('id', id);
    fetchIssues();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light text-charcoal">
          Newsletter Issues
        </h1>
        <Link
          href="/admin/newsletter/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Issue
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal/30 text-sm">Loading...</p>
      ) : issues.length === 0 ? (
        <p className="text-charcoal/30 text-sm">No newsletter issues yet.</p>
      ) : (
        <div className="bg-card-warm rounded-lg border border-soft-border/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-soft-border/40">
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/30 font-normal hidden md:table-cell">
                  Date
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
              {issues.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-b border-soft-border/20 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {issue.title}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-charcoal/40">
                    {issue.issue_date
                      ? new Date(issue.issue_date).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        issue.status === 'published'
                          ? 'bg-sage/15 text-deep-sage'
                          : 'bg-oat text-charcoal/40'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/newsletter/${issue.id}`}
                        className="p-2 text-charcoal/30 hover:text-charcoal transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(issue.id)}
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
