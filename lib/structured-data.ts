import { SITE_URL, BRAND } from '@/lib/constants';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: SITE_URL,
    description: BRAND.description,
    logo: `${SITE_URL}/image.png`,
    sameAs: [],
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt?: string;
  hero_image_url?: string;
  published_at?: string;
  updated_at?: string;
  slug: string;
  author?: { name: string } | null;
  reading_time?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    image: article.hero_image_url || undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    url: `${SITE_URL}/articles/${article.slug}`,
    wordCount: article.reading_time ? article.reading_time * 200 : undefined,
    author: article.author
      ? { '@type': 'Person', name: article.author.name }
      : { '@type': 'Organization', name: BRAND.name },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/image.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}`,
    },
  };
}

export function productJsonLd(item: {
  title: string;
  short_summary?: string;
  product_image_url?: string;
  brand?: string;
  slug: string;
  category?: { name: string } | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    description: item.short_summary || '',
    image: item.product_image_url || undefined,
    brand: item.brand
      ? { '@type': 'Brand', name: item.brand }
      : undefined,
    category: item.category?.name || undefined,
    url: `${SITE_URL}/recommended/${item.slug}`,
    review: {
      '@type': 'Review',
      author: { '@type': 'Organization', name: BRAND.name },
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE_URL,
    description: BRAND.description,
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
    },
  };
}
