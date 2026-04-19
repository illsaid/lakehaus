import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: '/admin/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
