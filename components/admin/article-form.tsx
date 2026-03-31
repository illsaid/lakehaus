'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Article, Category, Author } from '@/lib/supabase/types';

interface ArticleFormProps {
  article?: Article;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!article;
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [form, setForm] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    deck: article?.deck || '',
    hero_image_url: article?.hero_image_url || '',
    hero_image_alt: article?.hero_image_alt || '',
    body: article?.body || '',
    category_id: article?.category_id || '',
    author_id: article?.author_id || '',
    status: article?.status || 'draft',
    featured: article?.featured || false,
    reading_time: article?.reading_time || 5,
    seo_title: article?.seo_title || '',
    seo_description: article?.seo_description || '',
    affiliate_disclosure: article?.affiliate_disclosure || false,
  });

  useEffect(() => {
    const fetch = async () => {
      const [c, a] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('authors').select('*').order('name'),
      ]);
      setCategories(c.data || []);
      setAuthors(a.data || []);
    };
    fetch();
  }, []);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (title: string) => {
    updateField('title', title);
    if (!isEdit) updateField('slug', slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      category_id: form.category_id || null,
      author_id: form.author_id || null,
      published_at:
        form.status === 'published'
          ? article?.published_at || new Date().toISOString()
          : null,
    };

    if (isEdit) {
      await supabase.from('articles').update(payload).eq('id', article.id);
    } else {
      await supabase.from('articles').insert(payload);
    }

    setSaving(false);
    router.push('/admin/articles');
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
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
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
        <label className={labelClass}>Deck / Subheading</label>
        <input
          type="text"
          value={form.deck}
          onChange={(e) => updateField('deck', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => updateField('excerpt', e.target.value)}
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Hero Image URL</label>
          <input
            type="text"
            value={form.hero_image_url}
            onChange={(e) => updateField('hero_image_url', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Hero Image Alt Text</label>
          <input
            type="text"
            value={form.hero_image_alt}
            onChange={(e) => updateField('hero_image_alt', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Body (HTML)</label>
        <textarea
          value={form.body}
          onChange={(e) => updateField('body', e.target.value)}
          rows={16}
          className={`${inputClass} font-mono text-xs leading-relaxed`}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
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
        <div>
          <label className={labelClass}>Author</label>
          <select
            value={form.author_id}
            onChange={(e) => updateField('author_id', e.target.value)}
            className={inputClass}
          >
            <option value="">None</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
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

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Reading Time (min)</label>
          <input
            type="number"
            value={form.reading_time}
            onChange={(e) => updateField('reading_time', Number(e.target.value))}
            min={1}
            className={inputClass}
          />
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
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="affiliate"
            checked={form.affiliate_disclosure}
            onChange={(e) =>
              updateField('affiliate_disclosure', e.target.checked)
            }
            className="w-4 h-4 rounded border-soft-border"
          />
          <label htmlFor="affiliate" className="text-sm text-charcoal/60">
            Affiliate Disclosure
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
          {saving ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="px-6 py-2.5 border border-soft-border text-charcoal/60 rounded text-sm hover:border-charcoal/30 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
