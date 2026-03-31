'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function NewNewsletterPage() {
  const router = useRouter();
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

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('newsletter_issues').insert(form);
    setSaving(false);
    router.push('/admin/newsletter');
  };

  const labelClass =
    'block text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40 mb-1.5';
  const inputClass =
    'w-full px-3 py-2.5 bg-card-warm border border-soft-border rounded text-sm text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors';

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        New Newsletter Issue
      </h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                updateField('title', e.target.value);
                updateField('slug', slugify(e.target.value));
              }}
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
            {saving ? 'Saving...' : 'Create Issue'}
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
