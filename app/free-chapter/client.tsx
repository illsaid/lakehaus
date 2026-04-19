'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CircleCheck as CheckCircle } from 'lucide-react';
import Script from 'next/script';

interface Faq {
  question: string;
  answer: string;
}

interface FreeChapterClientProps {
  faqs: Faq[];
}

export default function FreeChapterClient({ faqs }: FreeChapterClientProps) {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone py-20 lg:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-muted-rose mb-4">
                  Free Preview
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-[1.1]">
                  Read a chapter free
                </h1>
                <p className="mt-4 text-base text-charcoal/50 leading-relaxed">
                  Chapter 4 of <em>Younger, Longer</em> &mdash; &ldquo;Skin, Collagen &amp; Cosmetic Longevity&rdquo; &mdash; delivered free to your inbox when you join Younger, Longer Weekly. No payment required.
                </p>
                <p className="mt-4 text-base text-charcoal/50 leading-relaxed">
                  Get instant access to Chapter 4 of Younger, Longer: &ldquo;Skin, Collagen &amp; Cosmetic Longevity.&rdquo; Discover the foundational principles that frame every protocol in the guide.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'The longevity mindset shift most women miss',
                    'Why the health advice you grew up with may be wrong',
                    'The six pillars framework for aging well',
                    'How to audit your current health trajectory',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center w-full">
                <Script
                  src="https://subscribe-forms.beehiiv.com/embed.js"
                  strategy="lazyOnload"
                />
                <iframe
                  src="https://subscribe-forms.beehiiv.com/70f902e9-4563-41b4-88ae-b0771a2b289b"
                  title="Free chapter signup form"
                  className="beehiiv-embed w-full sm:w-[560px]"
                  data-test-id="beehiiv-embed"
                  frameBorder={0}
                  scrolling="no"
                  style={{
                    height: '320px',
                    maxWidth: '100%',
                    margin: '0',
                    borderRadius: '0px',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-card-warm py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
                Common Questions
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
                About the free chapter
              </h2>
            </div>
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`py-6 ${index < faqs.length - 1 ? 'border-b border-soft-border/40' : ''}`}
                >
                  <h3 className="font-serif text-base font-medium text-charcoal mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
