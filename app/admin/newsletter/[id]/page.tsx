'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { NewsletterIssue } from '@/lib/supabase/types';

export default function EditNewsletterPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    body: '',
    cta_text: '',
    cta_url: '',
    status: 'draft',
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('newsletter_issues')
        .select('*')
        .eq('id', params.id as string)
        .maybeSingle();
      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          summary: data.summary || '',
          body: data.body || '',
          cta_text: data.cta_text || '',
          cta_url: data.cta_url || '',
          status: data.status || 'draft',
        });
      }
      setLoading(false);
    };
    fetch();
  }, [params.id]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase
      .from('newsletter_issues')
      .update(form)
      .eq('id', params.id as string);
    setSaving(false);
    router.push('/admin/newsletter');
  };

  if (loading) {
    return <p className="text-charcoal/30 text-sm">Loading...</p>;
  }

  const labelClass =
    'block text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40 mb-1.5';
  const inputClass =
    'w-full px-3 py-2.5 bg-card-warm border border-soft-border rounded text-sm text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors';

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        Edit Newsletter Issue
      </h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Summary</label>
          <textarea
            value={form.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Body (HTML)</label>
          <textarea
            value={form.body}
            onChange={(e) => updateField('body', e.target.value)}
            rows={12}
            className={`${inputClass} font-mono text-xs`}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>CTA Text</label>
            <input
              type="text"
              value={form.cta_text}
              onChange={(e) => updateField('cta_text', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>CTA URL</label>
            <input
              type="text"
              value={form.cta_url}
              onChange={(e) => updateField('cta_url', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={(e) => updateField('status', e.target.value)}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Issue'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/newsletter')}
            className="px-6 py-2.5 border border-soft-border text-charcoal/60 rounded text-sm hover:border-charcoal/30 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
