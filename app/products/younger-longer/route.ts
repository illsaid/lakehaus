import { SITE_URL, YOUNGER_LONGER_CHECKOUT_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export function GET() {
  const content = `# Younger, Longer
by LAKEHAUS Health

## What It Is

Younger, Longer is an 8-chapter digital guide to healthy aging for women. It covers the six evidence-based pillars of longevity — skin, strength, metabolism, sleep, hormones, and energy — plus a complete implementation protocol. Written and curated by the LAKEHAUS Health editorial team.

## Format

Digital guide (PDF). Instant delivery on purchase.

## Who It Is For

- Women in their 30s, 40s, 50s, and beyond who want a clear, modern map to aging well
- Women experiencing early signs of hormonal transition (perimenopause, menopause)
- Anyone who has followed wellness trends but wants a more evidence-grounded foundation
- Women who want practical protocols, not just information
- Readers of LAKEHAUS Health who want to go deeper than the free editorial content

## Who It Is Not For

- People seeking a clinical medical program or a substitute for healthcare
- Those looking for quick-fix or miracle-cure framing
- Men (the guide is specifically researched and written for female biology and midlife)

## What's Included

1. The New Science of Aging Well
2. Skin Longevity: What Actually Works
3. Building Strength for Decades
4. Metabolic Health and Body Composition
5. Sleep as a Longevity Practice
6. Hormonal Health Through Transition
7. Energy, Stress, and Recovery
8. The LAKEHAUS Protocol: Putting It All Together

## Key Differentiators

- Built on the same editorial standards as LAKEHAUS Health (peer-reviewed evidence, no hype)
- Covers all six longevity pillars in one guide rather than requiring multiple purchases
- Written in clear, accessible language — not clinical jargon
- Includes actionable daily, weekly, and seasonal protocols
- Specifically designed for female biology and midlife experience

## Lead Magnet

A free preview chapter (Chapter 4: Skin, Collagen & Cosmetic Longevity) is available at:
${SITE_URL}/free-chapter

## Offer

Current offer page: ${YOUNGER_LONGER_CHECKOUT_URL}
Product page: ${SITE_URL}/younger-longer

# TODO: Add canonical price once confirmed (e.g. "$29" or "$49"). Do not hardcode a price without confirming the current source of truth at the checkout URL above.

## Publisher

LAKEHAUS Health — ${SITE_URL}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
