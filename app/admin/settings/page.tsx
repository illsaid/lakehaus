'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [form, setForm] = useState({
    site_name: '',
    default_seo_title: '',
    default_meta_description: '',
    footer_copy: '',
    newsletter_cta_copy: '',
    legal_disclosure: '',
    homepage_hero_headline: '',
    homepage_hero_subheadline: '',
    homepage_hero_description: '',
    homepage_hero_primary_cta_text: '',
    homepage_hero_primary_cta_url: '',
    homepage_hero_secondary_cta_text: '',
    homepage_hero_secondary_cta_url: '',
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .maybeSingle();
      if (data) {
        setSettingsId(data.id);
        const hero = data.homepage_hero || {};
        setForm({
          site_name: data.site_name || '',
          default_seo_title: data.default_seo_title || '',
          default_meta_description: data.default_meta_description || '',
          footer_copy: data.footer_copy || '',
          newsletter_cta_copy: data.newsletter_cta_copy || '',
          legal_disclosure: data.legal_disclosure || '',
          homepage_hero_headline: hero.headline || '',
          homepage_hero_subheadline: hero.subheadline || '',
          homepage_hero_description: hero.description || '',
          homepage_hero_primary_cta_text: hero.primary_cta_text || '',
          homepage_hero_primary_cta_url: hero.primary_cta_url || '',
          homepage_hero_secondary_cta_text: hero.secondary_cta_text || '',
          homepage_hero_secondary_cta_url: hero.secondary_cta_url || '',
        });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      site_name: form.site_name,
      default_seo_title: form.default_seo_title,
      default_meta_description: form.default_meta_description,
      footer_copy: form.footer_copy,
      newsletter_cta_copy: form.newsletter_cta_copy,
      legal_disclosure: form.legal_disclosure,
      homepage_hero: {
        headline: form.homepage_hero_headline,
        subheadline: form.homepage_hero_subheadline,
        description: form.homepage_hero_description,
        primary_cta_text: form.homepage_hero_primary_cta_text,
        primary_cta_url: form.homepage_hero_primary_cta_url,
        secondary_cta_text: form.homepage_hero_secondary_cta_text,
        secondary_cta_url: form.homepage_hero_secondary_cta_url,
      },
    };

    if (settingsId) {
      await supabase
        .from('site_settings')
        .update(payload)
        .eq('id', settingsId);
    } else {
      await supabase.from('site_settings').insert(payload);
    }

    setSaving(false);
    setSaved(true);
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
        Site Settings
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <section>
          <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-4">
            General
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Site Name</label>
              <input
                type="text"
                value={form.site_name}
                onChange={(e) => updateField('site_name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Default SEO Title</label>
              <input
                type="text"
                value={form.default_seo_title}
                onChange={(e) =>
                  updateField('default_seo_title', e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Default Meta Description</label>
              <textarea
                value={form.default_meta_description}
                onChange={(e) =>
                  updateField('default_meta_description', e.target.value)
                }
                rows={2}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-soft-border/40 pt-8">
          <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-4">
            Homepage Hero
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Headline</label>
              <input
                type="text"
                value={form.homepage_hero_headline}
                onChange={(e) =>
                  updateField('homepage_hero_headline', e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subheadline</label>
              <input
                type="text"
                value={form.homepage_hero_subheadline}
                onChange={(e) =>
                  updateField('homepage_hero_subheadline', e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={form.homepage_hero_description}
                onChange={(e) =>
                  updateField('homepage_hero_description', e.target.value)
                }
                rows={3}
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Primary CTA Text</label>
                <input
                  type="text"
                  value={form.homepage_hero_primary_cta_text}
                  onChange={(e) =>
                    updateField(
                      'homepage_hero_primary_cta_text',
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Primary CTA URL</label>
                <input
                  type="text"
                  value={form.homepage_hero_primary_cta_url}
                  onChange={(e) =>
                    updateField(
                      'homepage_hero_primary_cta_url',
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Secondary CTA Text</label>
                <input
                  type="text"
                  value={form.homepage_hero_secondary_cta_text}
                  onChange={(e) =>
                    updateField(
                      'homepage_hero_secondary_cta_text',
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Secondary CTA URL</label>
                <input
                  type="text"
                  value={form.homepage_hero_secondary_cta_url}
                  onChange={(e) =>
                    updateField(
                      'homepage_hero_secondary_cta_url',
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-soft-border/40 pt-8">
          <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/30 mb-4">
            Copy
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Footer Copy</label>
              <textarea
                value={form.footer_copy}
                onChange={(e) => updateField('footer_copy', e.target.value)}
                rows={3}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Newsletter CTA Copy</label>
              <textarea
                value={form.newsletter_cta_copy}
                onChange={(e) =>
                  updateField('newsletter_cta_copy', e.target.value)
                }
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Legal / Affiliate Disclosure
              </label>
              <textarea
                value={form.legal_disclosure}
                onChange={(e) =>
                  updateField('legal_disclosure', e.target.value)
                }
                rows={4}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-charcoal text-bone rounded text-sm hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <span className="text-sm text-deep-sage">Settings saved.</span>
          )}
        </div>
      </form>
    </div>
  );
}
