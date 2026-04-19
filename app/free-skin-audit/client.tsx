'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CircleCheck as CheckCircle } from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';
import { YOUNGER_LONGER_CHECKOUT_URL } from '@/lib/constants';

const markers = [
  'Skin density and bounce',
  'Slower wound healing',
  'Moisture retention',
  'Texture and resting lines',
  'Hair thickness and texture',
  'Hyperpigmentation persistence',
];

const outcomes = [
  'Which changes may be signaling something deeper',
  'What patterns are worth monitoring over the coming weeks',
  'Whether the full evidence-aware framework would be a useful next step',
];

export default function FreeSkinAuditClient() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone py-20 lg:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-muted-rose mb-4">
                  Your starting point
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-[1.1]">
                  The 6-Marker Skin Audit
                </h1>
                <p className="mt-3 font-serif text-lg text-charcoal/40 font-light">
                  A fast, structured way to assess what your skin may be telling you
                </p>
                <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
                  Most women notice changes before they get clear answers. This self-assessment helps you score six visible signals&nbsp;&mdash; firmness, dryness, wound healing, texture, hair, and pigmentation&nbsp;&mdash; and understand what they may be signaling about what is happening underneath.
                </p>

                <div className="mt-8 space-y-3">
                  <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/35 mb-3">
                    What you will score
                  </p>
                  {markers.map((marker) => (
                    <div key={marker} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/60">{marker}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/35 mb-3">
                    What you will understand after
                  </p>
                  {outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-muted-rose shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/60">{outcome}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-xs text-charcoal/35 tracking-wide">
                  Free. Instant delivery. No payment required.
                </p>
              </div>

              <div className="flex items-center justify-center w-full">
                <Script
                  src="https://subscribe-forms.beehiiv.com/embed.js"
                  strategy="lazyOnload"
                />
                <iframe
                  src="https://subscribe-forms.beehiiv.com/70f902e9-4563-41b4-88ae-b0771a2b289b"
                  title="Skin Audit signup form"
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

        <section className="bg-card-warm py-16 lg:py-20 border-t border-soft-border/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
                After the audit
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
                What comes next
              </h2>
              <p className="mt-3 text-sm text-charcoal/40 max-w-md mx-auto">
                The audit is free, instant, and takes less than two minutes. If what you find raises questions, here is the next layer.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-bone rounded-sm p-8">
                <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/30 mb-4">
                  Step 2
                </p>
                <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                  Read a free chapter
                </h3>
                <p className="text-sm text-charcoal/50 leading-relaxed mb-6">
                  Chapter 4 of <em>Younger, Longer</em>&nbsp;&mdash; &ldquo;Skin, Collagen &amp; Cosmetic Longevity&rdquo;&nbsp;&mdash; explores the foundational science behind what you scored in the audit.
                </p>
                <Link
                  href="/free-chapter"
                  className="inline-flex items-center justify-center px-6 py-3 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors duration-200"
                >
                  Get the Free Chapter
                </Link>
              </div>

              <div className="bg-bone rounded-sm p-8">
                <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/30 mb-4">
                  Step 3
                </p>
                <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                  Get the full guide
                </h3>
                <p className="text-sm text-charcoal/50 leading-relaxed mb-6">
                  <em>Younger, Longer</em> is the 8-chapter implementation layer. It connects everything the audit surfaces into one structured, evidence-aware framework.
                </p>
                <a
                  href={YOUNGER_LONGER_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors duration-200"
                >
                  Explore the Guide
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
