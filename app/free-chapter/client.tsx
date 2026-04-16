'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CircleCheck as CheckCircle } from 'lucide-react';
import Script from 'next/script';

export default function FreeChapterClient() {
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
                <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
                  Get instant access to Chapter 4 of Younger, Longer: &ldquo;Skin, Collagen &amp; Cosmetic Longevity&rdquo; Discover the foundational principles that frame every protocol in the guide.
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
      </main>
      <Footer />
    </>
  );
}
