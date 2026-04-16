import { createServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NewsletterCard } from '@/components/content/newsletter-card';
import { EmailCapture } from '@/components/sections/email-capture';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Newsletter — Younger, Longer Weekly',
  description:
    'Subscribe to Younger, Longer Weekly for evidence-informed wellness guidance delivered to your inbox every Thursday.',
  alternates: {
    canonical: `${SITE_URL}/newsletter`,
  },
};

export default async function NewsletterPage() {
  const supabase = createServerClient();

  const { data: issues } = await supabase
    .from('newsletter_issues')
    .select('*')
    .eq('status', 'published')
    .order('issue_date', { ascending: false });

  const newsletterIssues = issues || [];

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone pt-12 pb-8 lg:pt-20 lg:pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
              Newsletter
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Younger, Longer Weekly
            </h1>
            <p className="mt-6 text-lg text-charcoal/50 leading-relaxed max-w-xl mx-auto">
              Weekly evidence-informed wellness guidance for women who care about
              aging well. Clear, credible, and completely free.
            </p>
          </div>
        </section>

        <EmailCapture />

        {newsletterIssues.length > 0 && (
          <section className="bg-bone py-16 lg:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-charcoal/30 mb-8">
                Recent Issues
              </p>
              <div className="space-y-4">
                {newsletterIssues.map((issue) => (
                  <NewsletterCard key={issue.id} issue={issue} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-card-warm py-16 lg:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
              What to expect
            </h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-serif text-4xl font-light text-deep-sage mb-2">
                  1x
                </p>
                <p className="text-sm text-charcoal/40">
                  Weekly delivery, every Thursday morning
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl font-light text-deep-sage mb-2">
                  5 min
                </p>
                <p className="text-sm text-charcoal/40">
                  Quick, focused reads you can act on
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl font-light text-deep-sage mb-2">
                  0
                </p>
                <p className="text-sm text-charcoal/40">
                  Spam, hype, or filler content
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
