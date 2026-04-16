'use client';

import Script from 'next/script';

export function EmailCapture() {
  return (
    <section className="bg-charcoal py-20 lg:py-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-bone leading-tight">
          Stay in the conversation
        </h2>
        <p className="mt-4 text-base text-bone/50 leading-relaxed max-w-lg mx-auto">
          Join women who want clearer, calmer guidance on skin, hormones,
          metabolism, sleep, and strength. Get the free 6-Marker Skin Audit on
          signup.
        </p>
        <p className="mt-2 text-[11px] font-sans uppercase tracking-[0.2em] text-bone/30">
          Get the Free Skin Audit
        </p>
        <div className="mt-6">
          <div className="flex justify-center">
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
          <p className="mt-3 text-xs text-bone/30 tracking-wide">
            Instant delivery plus Younger, Longer Weekly.
          </p>
        </div>
      </div>
    </section>
  );
}
