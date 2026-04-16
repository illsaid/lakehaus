import { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  const [{ data: articles }, { data: recommended }] = await Promise.all([
    supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('status', 'published'),
    supabase
      .from('recommended_items')
      .select('slug, updated_at')
      .eq('status', 'published'),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/free-skin-audit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/younger-longer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/recommended`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/free-chapter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/how-we-review`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const recommendedRoutes: MetadataRoute.Sitemap = (recommended ?? []).map((r) => ({
    url: `${SITE_URL}/recommended/${r.slug}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes, ...recommendedRoutes];
}
