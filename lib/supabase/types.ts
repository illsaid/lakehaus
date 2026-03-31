export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  accent_color: string;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  headshot_url: string;
  role: string;
  social_links: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  deck: string;
  hero_image_url: string;
  hero_image_alt: string;
  body: string;
  category_id: string | null;
  author_id: string | null;
  tags: string[];
  status: 'draft' | 'published';
  published_at: string | null;
  featured: boolean;
  reading_time: number;
  seo_title: string;
  seo_description: string;
  og_image_url: string;
  affiliate_disclosure: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  author?: Author;
}

export interface RecommendedItem {
  id: string;
  title: string;
  slug: string;
  short_summary: string;
  editorial_body: string;
  product_image_url: string;
  brand: string;
  category_id: string | null;
  who_its_for: string;
  caveats: string;
  affiliate_url: string;
  secondary_url: string;
  disclosure_note: string;
  featured: boolean;
  status: 'draft' | 'published';
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface NewsletterIssue {
  id: string;
  title: string;
  slug: string;
  issue_date: string;
  summary: string;
  body: string;
  cta_text: string;
  cta_url: string;
  featured_image_url: string;
  external_url: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  default_seo_title: string;
  default_meta_description: string;
  social_links: Record<string, string>;
  footer_copy: string;
  newsletter_cta_copy: string;
  legal_disclosure: string;
  homepage_hero: {
    headline?: string;
    subheadline?: string;
    description?: string;
    primary_cta_text?: string;
    primary_cta_url?: string;
    secondary_cta_text?: string;
    secondary_cta_url?: string;
  };
  homepage_sections: Record<string, unknown>;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  page_type: string;
  hero_content: Record<string, unknown>;
  blocks: unknown[];
  seo_title: string;
  seo_description: string;
  og_image_url: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}
