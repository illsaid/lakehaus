import { SITE_URL, BRAND } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const content = `# ${BRAND.name}
> ${BRAND.tagline}

${BRAND.description}

## What LAKEHAUS Health Is

LAKEHAUS Health is an independent editorial wellness publication for women who want evidence-aware, practical guidance on aging well. The site covers six core topics: skin, strength, energy, sleep, metabolism, and hormones. All content is written by an editorial team, grounded in peer-reviewed science, and free from brand influence or hype.

## Who It Serves

Women in their 30s, 40s, 50s, and beyond who want honest, modern health guidance — especially around the biological and cosmetic changes that accompany midlife. The audience values intelligence, nuance, and specificity over trends.

## Core Topics

- Skin: radiance, collagen, protection, and long-term skin health
- Strength: muscle mass, bone density, and physical resilience
- Energy: sustainable vitality and mitochondrial health
- Sleep: deep rest, overnight recovery, and circadian regulation
- Metabolism: metabolic flexibility, body composition, and insulin sensitivity
- Hormones: perimenopause, menopause, hormonal balance, and transition

## Key Pages

- Homepage: ${SITE_URL}/
- About: ${SITE_URL}/about
- How We Review: ${SITE_URL}/how-we-review
- Articles: ${SITE_URL}/articles
- Newsletter: ${SITE_URL}/newsletter
- Younger, Longer (flagship guide): ${SITE_URL}/younger-longer
- Free Chapter (Chapter 4 preview): ${SITE_URL}/free-chapter
- Free Skin Audit (lead magnet): ${SITE_URL}/free-skin-audit
- Recommended Products: ${SITE_URL}/recommended

## Flagship Product

Younger, Longer is an 8-chapter digital guide covering the full landscape of healthy aging for women. It includes science-backed protocols on skin longevity, strength, metabolic health, sleep, hormonal transition, energy, and a complete implementation framework. Available at: ${SITE_URL}/younger-longer

## Editorial Standards

All content on LAKEHAUS Health is editorial in nature, not medical advice. The site maintains strict editorial independence: affiliate relationships are always disclosed, recommendations are never influenced by commercial partnerships, and articles are updated when meaningful new evidence emerges. See full standards at: ${SITE_URL}/how-we-review

## Important Notes

- Content is women-first and designed for a midlife and perimenopause-aware audience
- Not a medical provider; no diagnoses, prescriptions, or clinical advice
- Evidence-aware means content references credible research but is not clinical literature
- All product recommendations have been personally evaluated by the editorial team
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
