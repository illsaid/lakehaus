export const BRAND = {
  name: 'LAKEHAUS Health',
  tagline: 'The modern guide to aging well.',
  description:
    'A premium women\u2019s wellness publication focused on helping women stay younger longer through credible, modern, science-aware guidance.',
};

export const NAV_ITEMS = [
  { label: 'Articles', href: '/articles' },
  { label: 'Younger, Longer', href: '/younger-longer' },
  { label: 'Recommended', href: '/recommended' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'About', href: '/about' },
];

export const TOPICS = [
  {
    name: 'Skin',
    slug: 'skin',
    description: 'Radiance, protection, and long-term skin health.',
    icon: 'Sparkles' as const,
  },
  {
    name: 'Strength',
    slug: 'strength',
    description: 'Muscle, bone density, and physical resilience.',
    icon: 'Dumbbell' as const,
  },
  {
    name: 'Energy',
    slug: 'energy',
    description: 'Sustainable vitality without the crash.',
    icon: 'Zap' as const,
  },
  {
    name: 'Sleep',
    slug: 'sleep',
    description: 'Deep rest and overnight recovery.',
    icon: 'Moon' as const,
  },
  {
    name: 'Metabolism',
    slug: 'metabolism',
    description: 'Metabolic flexibility and body composition.',
    icon: 'Flame' as const,
  },
  {
    name: 'Hormones',
    slug: 'hormones',
    description: 'Balance, transition, and hormonal clarity.',
    icon: 'Heart' as const,
  },
];

// TODO: replace with real checkout URL before go-live (e.g. Gumroad, Lemon Squeezy, or Stripe Payment Link)
export const YOUNGER_LONGER_CHECKOUT_URL = 'https://lookbetterlonger.com';

export const RECOMMENDATION_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Wearables', value: 'wearables' },
  { label: 'Skincare', value: 'skincare' },
  { label: 'Supplements', value: 'supplements' },
  { label: 'Fitness', value: 'fitness' },
  { label: 'Sleep & Recovery', value: 'sleep-recovery' },
  { label: 'Books', value: 'books' },
  { label: 'Kitchen & Nutrition', value: 'kitchen-nutrition' },
];
