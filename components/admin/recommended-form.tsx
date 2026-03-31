'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { RecommendedItem, Category } from '@/lib/supabase/types';

interface RecommendedFormProps {
  item?: RecommendedItem;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function RecommendedForm({ item }: RecommendedFormProps) {
  const router = useRouter();
  const isEdit = !!item;
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    short_summary: item?.short_summary || '',
    editorial_body: item?.editorial_body || '',
    product_image_url: item?.product_image_url || '',
    brand: item?.brand || '',
    category_id: item?.category_id || '',
    who_its_for: item?.who_its_for || '',
    caveats: item?.caveats || '',
    affiliate_url: item?.affiliate_url || '',
    secondary_url: item?.secondary_url || '',
    disclosure_note: item?.disclosure_note || '',
    featured: item?.featured || false,
    status: item?.status || 'draft',
    seo_title: item?.seo_title || '',
    seo_description: item?.seo_description || '',
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      setCategories(data || []);
    };
    fetch();
  }, []);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      category_id: form.category_id || null,
    };

    if (isEdit) {
      await supabase
        .from('recommended_items')
        .update(payload)
        .eq('id', item.id);
    } else {
      await supabase.from('recommended_items').insert(payload);
    }

    setSaving(false);
    router.push('/admin/recommended');
    router.refresh();
  };

  const labelClass =
    'block text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40 mb-1.5';
  const inputClass =
    'w-full px-3 py-2.5 bg-card-warm border border-soft-border rounded text-sm text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Product Name</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              updateField('title', e.target.value);
              if (!isEdit) updateField('slug', slugify(e.target.value));
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

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Brand</label>
          <input
            type="text"
            value={form.brand}
            onChange={(e) => updateField('brand', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select
            value={form.category_id}
            onChange={(e) => updateField('category_id', e.target.value)}
            className={inputClass}
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Summary</label>
        <textarea
          value={form.short_summary}
          onChange={(e) => updateField('short_summary', e.target.value)}
          rows={2}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Editorial Review (HTML)</label>
        <textarea
          value={form.editorial_body}
          onChange={(e) => updateField('editorial_body', e.target.value)}
          rows={10}
          className={`${inputClass} font-mono text-xs leading-relaxed`}
        />
      </div>

      <div>
        <label className={labelClass}>Product Image URL</label>
        <input
          type="text"
          value={form.product_image_url}
          onChange={(e) => updateField('product_image_url', e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Who It Is For</label>
          <textarea
            value={form.who_its_for}
            onChange={(e) => updateField('who_its_for', e.target.value)}
            rows={2}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Caveats / Worth Noting</label>
          <textarea
            value={form.caveats}
            onChange={(e) => updateField('caveats', e.target.value)}
            rows={2}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Affiliate URL</label>
          <input
            type="text"
            value={form.affiliate_url}
            onChange={(e) => updateField('affiliate_url', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Secondary URL</label>
          <input
            type="text"
            value={form.secondary_url}
            onChange={(e) => updateField('secondary_url', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Disclosure Note</label>
        <input
          type="text"
          value={form.disclosure_note}
          onChange={(e) => updateField('disclosure_note', e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
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
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => updateField('featured', e.target.checked)}
            className="w-4 h-4 rounded border-soft-border"
          />
          <label htmlFor="featured" className="text-sm text-charcoal/60">
            Featured
          </label>
        </div>
      </div>

      <div className="border-t border-soft-border/40 pt-6">
        <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-4">
          SEO
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input
              type="text"
              value={form.seo_title}
              onChange={(e) => updateField('seo_title', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <input
              type="text"
              value={form.seo_description}
              onChange={(e) => updateField('seo_description', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors disabled:opacity-50"
        >
          {saving
            ? 'Saving...'
            : isEdit
            ? 'Update Recommendation'
            : 'Create Recommendation'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/recommended')}
          className="px-6 py-2.5 border border-soft-border text-charcoal/60 rounded text-sm hover:border-charcoal/30 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
