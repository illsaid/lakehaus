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
          Join women who receive clear, science-aware wellness guidance every
          week. No spam, no hype.
        </p>
        <div className="mt-8 flex justify-center">
          <Script
            src="https://subscribe-forms.beehiiv.com/embed.js"
            strategy="lazyOnload"
          />
          <iframe
            src="https://subscribe-forms.beehiiv.com/70f902e9-4563-41b4-88ae-b0771a2b289b"
            className="beehiiv-embed"
            data-test-id="beehiiv-embed"
            frameBorder={0}
            scrolling="no"
            style={{
              width: '560px',
              height: '480px',
              maxWidth: '100%',
              margin: '0',
              borderRadius: '0px',
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}
