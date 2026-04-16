'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CircleCheck as CheckCircle } from 'lucide-react';
import Script from 'next/script';

const markers = [
  'Skin density and bounce',
  'Slower wound healing',
  'Moisture retention',
  'Texture and resting lines',
  'Hair thickness and texture',
  'Hyperpigmentation persistence',
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
                  Free Resource
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-[1.1]">
                  The 6-Marker Skin Audit
                </h1>
                <p className="mt-3 font-serif text-lg text-charcoal/40 font-light">
                  What Your Skin Is Actually Telling You About Your Hormones
                </p>
                <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
                  Many women notice skin changes before they get clear answers.
                  This quick self-assessment helps you score what you are
                  actually seeing and understand what may be shifting underneath.
                </p>
                <div className="mt-8 space-y-3">
                  {markers.map((marker) => (
                    <div key={marker} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/60">{marker}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-xs text-charcoal/35 tracking-wide">
                  Delivered instantly when you join Younger, Longer Weekly.
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
      </main>
      <Footer />
    </>
  );
}
