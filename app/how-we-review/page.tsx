import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Review',
  description:
    'Our editorial standards, recommendation criteria, and affiliate disclosure policies at LAKEHAUS Health.',
};

export default function HowWeReviewPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone pt-12 pb-6 lg:pt-20 lg:pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              Standards
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight">
              How we review
            </h1>
            <p className="mt-4 text-base text-charcoal/50 leading-relaxed">
              Transparency is foundational to trust. Here is exactly how we
              evaluate products, select recommendations, and maintain editorial
              independence.
            </p>
          </div>
        </section>

        <section className="bg-bone py-10 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="prose-editorial">
              <h2>Our review process</h2>
              <p>
                Every product or tool recommended on LAKEHAUS Health goes through
                a consistent evaluation process. We do not accept payment for
                reviews or recommendations, and our editorial team has final say
                on what appears on this site.
              </p>
              <p>Our evaluation criteria include:</p>
              <ul>
                <li>
                  <strong>Evidence basis:</strong> Is there credible research
                  supporting the product or its core ingredients?
                </li>
                <li>
                  <strong>Practical value:</strong> Does it meaningfully improve
                  the experience or outcome it claims to address?
                </li>
                <li>
                  <strong>Quality and safety:</strong> Is the product
                  well-manufactured, transparent about ingredients, and safe for
                  the intended use case?
                </li>
                <li>
                  <strong>Value for investment:</strong> Is it worth the price
                  relative to the benefit it provides?
                </li>
                <li>
                  <strong>Personal testing:</strong> Has at least one member of
                  our editorial team personally used the product?
                </li>
              </ul>

              <h2>Editorial independence</h2>
              <p>
                Our editorial recommendations are never influenced by brand
                relationships, sponsorships, or affiliate commissions. We select
                products based on merit and our evaluation criteria. If a product
                does not meet our standards, it does not appear on this site,
                regardless of potential commercial value.
              </p>

              <h2>Affiliate disclosure</h2>
              <p>
                Some links on this site are affiliate links. This means we may
                earn a small commission if you purchase a product through our
                link, at no additional cost to you. Affiliate revenue helps
                support our editorial operations and keeps our content free.
              </p>
              <p>
                The presence or absence of an affiliate relationship never
                influences which products we recommend or how we review them. We
                frequently recommend products for which we earn no commission,
                and we decline affiliate relationships with products that do not
                meet our editorial standards.
              </p>

              <h2>Content accuracy</h2>
              <p>
                Health information evolves. We make every effort to ensure our
                content reflects current scientific understanding, and we update
                articles when significant new evidence emerges. However, our
                content is editorial in nature and should not be considered
                medical advice. Always consult a qualified healthcare provider
                before making changes to your health regimen.
              </p>

              <h2>Corrections policy</h2>
              <p>
                If we make an error, we correct it promptly and transparently. If
                you believe any content on this site contains an inaccuracy,
                please contact us and we will review and address it.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-soft-border/40">
              <Link
                href="/recommended"
                className="text-sm text-charcoal/50 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/30 pb-0.5 transition-colors"
              >
                View our recommendations
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
