'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Article, Category, Author } from '@/lib/supabase/types';
import { ImageUpload } from './image-upload';
import { ArticlePreview } from './article-preview';
import { Eye, EyeOff, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Loader as Loader2 } from 'lucide-react';

interface ArticleFormProps {
  article?: Article;
}

type SlugStatus = 'idle' | 'checking' | 'available' | 'taken' | 'error';
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function calcReadingTime(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!article;

  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('idle');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');
  const [autoReadingTime, setAutoReadingTime] = useState(!isEdit);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    status: (article?.status as 'draft' | 'published') || 'draft',
    featured: article?.featured || false,
    reading_time: article?.reading_time || 1,
    seo_title: article?.seo_title || '',
    seo_description: article?.seo_description || '',
    affiliate_disclosure: article?.affiliate_disclosure || false,
  });

  const slugDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load categories + authors
  useEffect(() => {
    const load = async () => {
      const [c, a] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('authors').select('*').order('name'),
      ]);
      setCategories(c.data || []);
      setAuthors(a.data || []);
    };
    load();
  }, []);

  // Debounced slug uniqueness check
  useEffect(() => {
    if (!form.slug) {
      setSlugStatus('idle');
      return;
    }
    if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
    setSlugStatus('checking');
    slugDebounceRef.current = setTimeout(async () => {
      try {
        let query = supabase
          .from('articles')
          .select('id')
          .eq('slug', form.slug);
        if (isEdit && article?.id) {
          query = query.neq('id', article.id);
        }
        const { data } = await query.maybeSingle();
        setSlugStatus(data ? 'taken' : 'available');
      } catch {
        setSlugStatus('error');
      }
    }, 500);
    return () => {
      if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
    };
  }, [form.slug, isEdit, article?.id]);

  // Auto reading time calculation from body
  useEffect(() => {
    if (autoReadingTime && form.body) {
      setForm((prev) => ({
        ...prev,
        reading_time: calcReadingTime(form.body),
      }));
    }
  }, [form.body, autoReadingTime]);

  const updateField = useCallback((field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [errors]);

  const handleTitleChange = (title: string) => {
    updateField('title', title);
    if (!isEdit) updateField('slug', slugify(title));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.slug.trim()) next.slug = 'Slug is required.';
    if (form.slug && !/^[a-z0-9-]+$/.test(form.slug))
      next.slug = 'Slug must be lowercase letters, numbers, and hyphens only.';
    if (slugStatus === 'taken') next.slug = 'This slug is already in use.';
    if (slugStatus === 'checking') next.slug = 'Wait for slug check to finish.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaveStatus('saving');
    setSaveError('');

    const payload = {
      ...form,
      category_id: form.category_id || null,
      author_id: form.author_id || null,
      published_at:
        form.status === 'published'
          ? article?.published_at || new Date().toISOString()
          : null,
    };

    const { error } = isEdit
      ? await supabase.from('articles').update(payload).eq('id', article!.id)
      : await supabase.from('articles').insert(payload);

    if (error) {
      setSaveStatus('error');
      setSaveError(error.message);
      return;
    }

    setSaveStatus('saved');
    router.refresh();
  };

  const selectedCategory = categories.find((c) => c.id === form.category_id);
  const wordCount = form.body
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const labelClass =
    'block text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40 mb-1.5';
  const inputClass =
    'w-full px-3 py-2.5 bg-card-warm border border-soft-border rounded text-sm text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors';
  const inputErrorClass =
    'w-full px-3 py-2.5 bg-card-warm border border-muted-rose/50 rounded text-sm text-charcoal focus:outline-none focus:border-muted-rose/70 transition-colors';
  const sectionHeadingClass =
    'text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-4';

  return (
    <div>
      {/* Mode toggle + save bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-soft-border/40">
        <div className="flex items-center gap-1 bg-oat rounded-lg p-1">
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
              mode === 'edit'
                ? 'bg-card-warm text-charcoal shadow-sm'
                : 'text-charcoal/40 hover:text-charcoal/60'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
              mode === 'preview'
                ? 'bg-card-warm text-charcoal shadow-sm'
                : 'text-charcoal/40 hover:text-charcoal/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="flex items-center gap-1.5 text-xs text-deep-sage">
              <CheckCircle className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-1.5 text-xs text-muted-rose">
              <AlertCircle className="w-3.5 h-3.5" />
              {saveError || 'Save failed'}
            </span>
          )}
          {saveStatus === 'saved' && (
            <button
              type="button"
              onClick={() => router.push('/admin/articles')}
              className="text-xs text-charcoal/40 hover:text-charcoal transition-colors"
            >
              Back to articles
            </button>
          )}
        </div>
      </div>

      {mode === 'preview' ? (
        <ArticlePreview
          title={form.title}
          deck={form.deck}
          body={form.body}
          hero_image_url={form.hero_image_url}
          hero_image_alt={form.hero_image_alt}
          reading_time={form.reading_time}
          categoryName={selectedCategory?.name}
        />
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
          {/* — Content — */}
          <section>
            <p className={sectionHeadingClass}>Content</p>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  Title <span className="text-muted-rose">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article title"
                  className={errors.title ? inputErrorClass : inputClass}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-muted-rose/80">{errors.title}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40">
                    Slug <span className="text-muted-rose">*</span>
                  </label>
                  <SlugStatusBadge status={slugStatus} />
                </div>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => updateField('slug', e.target.value.toLowerCase())}
                  placeholder="article-slug"
                  className={errors.slug ? inputErrorClass : inputClass}
                />
                {errors.slug && (
                  <p className="mt-1 text-xs text-muted-rose/80">{errors.slug}</p>
                )}
                {!errors.slug && form.slug && (
                  <p className="mt-1 text-[11px] text-charcoal/25">
                    /articles/{form.slug}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Deck / Subheading</label>
                <input
                  type="text"
                  value={form.deck}
                  onChange={(e) => updateField('deck', e.target.value)}
                  placeholder="Short supporting line shown below the title"
                  className={inputClass}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40">
                    Excerpt
                  </label>
                  <span className="text-[10px] text-charcoal/25">
                    {form.excerpt.length} chars
                  </span>
                </div>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  rows={2}
                  placeholder="Short description for article cards and meta tags"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* — Hero Image — */}
          <section className="border-t border-soft-border/40 pt-6">
            <p className={sectionHeadingClass}>Hero Image</p>
            <div className="space-y-4">
              <ImageUpload
                value={form.hero_image_url}
                onChange={(url) => updateField('hero_image_url', url)}
              />
              <div>
                <label className={labelClass}>Alt Text</label>
                <input
                  type="text"
                  value={form.hero_image_alt}
                  onChange={(e) => updateField('hero_image_alt', e.target.value)}
                  placeholder="Describe the image for accessibility"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* — Body — */}
          <section className="border-t border-soft-border/40 pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className={sectionHeadingClass}>Body (HTML)</p>
              <div className="flex items-center gap-3 text-[11px] text-charcoal/30">
                <span>{wordCount} words</span>
                <span className="w-px h-3 bg-soft-border/60" />
                <span>~{calcReadingTime(form.body)} min read</span>
              </div>
            </div>
            <textarea
              value={form.body}
              onChange={(e) => updateField('body', e.target.value)}
              rows={20}
              placeholder="<p>Start writing your article HTML here…</p>"
              className={`${inputClass} font-mono text-xs leading-relaxed`}
            />
          </section>

          {/* — Publishing — */}
          <section className="border-t border-soft-border/40 pt-6">
            <p className={sectionHeadingClass}>Publishing</p>
            <div className="space-y-4">
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
                    onChange={(e) =>
                      updateField(
                        'status',
                        e.target.value as 'draft' | 'published'
                      )
                    }
                    className={inputClass}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 items-end">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40">
                      Reading Time (min)
                    </label>
                    <button
                      type="button"
                      onClick={() => setAutoReadingTime((v) => !v)}
                      className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                        autoReadingTime
                          ? 'bg-sage/15 text-deep-sage'
                          : 'bg-oat text-charcoal/30 hover:text-charcoal/50'
                      }`}
                    >
                      {autoReadingTime ? 'Auto' : 'Manual'}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={form.reading_time}
                    onChange={(e) => {
                      setAutoReadingTime(false);
                      updateField('reading_time', Number(e.target.value));
                    }}
                    min={1}
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-3 pb-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                    className="w-4 h-4 rounded border-soft-border accent-charcoal"
                  />
                  <label htmlFor="featured" className="text-sm text-charcoal/60">
                    Featured article
                  </label>
                </div>

                <div className="flex items-center gap-3 pb-2">
                  <input
                    type="checkbox"
                    id="affiliate"
                    checked={form.affiliate_disclosure}
                    onChange={(e) =>
                      updateField('affiliate_disclosure', e.target.checked)
                    }
                    className="w-4 h-4 rounded border-soft-border accent-charcoal"
                  />
                  <label htmlFor="affiliate" className="text-sm text-charcoal/60">
                    Affiliate disclosure
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* — SEO — */}
          <section className="border-t border-soft-border/40 pt-6">
            <p className={sectionHeadingClass}>SEO</p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40">
                    SEO Title
                  </label>
                  <span
                    className={`text-[10px] ${
                      form.seo_title.length > 60
                        ? 'text-muted-rose/70'
                        : 'text-charcoal/25'
                    }`}
                  >
                    {form.seo_title.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={form.seo_title}
                  onChange={(e) => updateField('seo_title', e.target.value)}
                  placeholder={form.title || 'Defaults to article title'}
                  className={inputClass}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-sans uppercase tracking-[0.12em] text-charcoal/40">
                    SEO Description
                  </label>
                  <span
                    className={`text-[10px] ${
                      form.seo_description.length > 160
                        ? 'text-muted-rose/70'
                        : 'text-charcoal/25'
                    }`}
                  >
                    {form.seo_description.length}/160
                  </span>
                </div>
                <textarea
                  value={form.seo_description}
                  onChange={(e) =>
                    updateField('seo_description', e.target.value)
                  }
                  rows={2}
                  placeholder={form.excerpt || 'Defaults to excerpt'}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* — Actions — */}
          <div className="border-t border-soft-border/40 pt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={saveStatus === 'saving' || slugStatus === 'checking'}
              className="flex items-center gap-2 px-6 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors disabled:opacity-50"
            >
              {saveStatus === 'saving' && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              {saveStatus === 'saving'
                ? 'Saving…'
                : isEdit
                ? 'Update Article'
                : 'Create Article'}
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
      )}
    </div>
  );
}

function SlugStatusBadge({ status }: { status: SlugStatus }) {
  if (status === 'idle') return null;
  const map: Record<SlugStatus, { label: string; className: string }> = {
    idle: { label: '', className: '' },
    checking: {
      label: 'Checking…',
      className: 'text-charcoal/30',
    },
    available: {
      label: 'Available',
      className: 'text-deep-sage',
    },
    taken: {
      label: 'Already taken',
      className: 'text-muted-rose',
    },
    error: {
      label: 'Check failed',
      className: 'text-charcoal/30',
    },
  };
  const { label, className } = map[status];
  return (
    <span className={`text-[10px] font-sans ${className}`}>{label}</span>
  );
}
