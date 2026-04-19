import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCapture } from '@/components/sections/email-capture';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'LAKEHAUS Health is an independent editorial wellness publication built for women who want to age well, backed by science and free from hype.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'About', url: `${SITE_URL}/about` },
            ])
          ),
        }}
      />
      <Header />
      <main id="main-content">
        <section className="bg-bone pt-12 pb-6 lg:pt-20 lg:pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              About
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Why LAKEHAUS exists
            </h1>
          </div>
        </section>

        <section className="bg-bone py-10 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="prose-editorial">
              <p className="text-lg leading-relaxed text-charcoal/60">
                The wellness industry is worth hundreds of billions of dollars,
                and yet most of it is noise. Influencer-driven trends cycle every
                few months. Supplement companies make promises they cannot
                support. And women navigating their 30s, 40s, 50s, and beyond
                are left sifting through contradictory advice, wondering what
                actually works.
              </p>

              <h2>The problem we saw</h2>
              <p>
                There is no shortage of health information available to women
                today. What is missing is curation, credibility, and clarity.
                Most wellness content falls into one of two categories: clinical
                research that is impenetrable to non-experts, or marketing
                dressed up as advice. Neither serves women well.
              </p>

              <h2>What we built instead</h2>
              <p>
                LAKEHAUS Health is an independent editorial wellness publication.
                We cover the six pillars of healthy aging &mdash; skin, strength,
                energy, sleep, metabolism, and hormones &mdash; through the lens
                of credible science, practical application, and editorial
                integrity.
              </p>
              <p>
                Every article, recommendation, and guide on this site is
                researched by our editorial team, grounded in peer-reviewed
                evidence, and written in clear, accessible language. We do not
                sell hype. We do not chase trends. We do not pretend that any
                single product or protocol is a miracle.
              </p>

              <h2>Our editorial principles</h2>
              <p>
                We believe that trustworthy health guidance must be editorially
                independent, evidence-aware, and transparent about its
                limitations. Our content is never influenced by brand
                partnerships or affiliate relationships. When we recommend a
                product, it is because we genuinely believe in it &mdash; and we
                always disclose affiliate relationships.
              </p>

              <h2>Who this is for</h2>
              <p>
                LAKEHAUS Health is for women who care about how they feel, how
                they look, and how they age &mdash; and who want honest, modern
                guidance that respects their intelligence. Whether you are 35 or
                65, beginning your wellness journey or refining it, we are here
                to help you make informed decisions about your health.
              </p>

              <blockquote>
                We are not anti-aging. We are pro-aging-well. There is an
                important difference.
              </blockquote>
            </div>

            <div className="mt-12 pt-8 border-t border-soft-border/40 flex gap-4">
              <Link
                href="/how-we-review"
                className="text-sm text-charcoal/50 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/30 pb-0.5 transition-colors"
              >
                How we review products
              </Link>
              <Link
                href="/articles"
                className="text-sm text-charcoal/50 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/30 pb-0.5 transition-colors"
              >
                Read our articles
              </Link>
            </div>
          </div>
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
